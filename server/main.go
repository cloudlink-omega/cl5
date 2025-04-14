package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"slices"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/websocket/v2"
	"github.com/oklog/ulid/v2"
	"github.com/pion/webrtc/v3"

	"crypto/rand"

	peer "github.com/muka/peerjs-go"
)

/*
	PROTOCOL DOCUMENTATION

	KEEPALIVE {} -> KEEPALIVE_ACK {random value (16 bytes)}
	Ping/pong. Generates a random value to spoof the connection as alive.

	INIT {payload} -> INIT_OK {game_id, dev_id, user_id, username}
	Initializes the session with the server.

	LIST_LOBBIES {} -> LIST_ACK {lobbies}
	Retrieves a list of lobbies currently available.

	FIND_LOBBY {name} -> FIND_ACK {host{user_id, username, pubkey}, current_players, max_players, password_required, currently_locked}
	Finds a lobby based on a name.

	CREATE_LOBBY {name, max_players, password, locked} -> CREATE_ACK {}
	Creates a new lobby.

	NEW_LOBBY {name}
	Notifies new lobby creation.

	RELAY {name}
	Notifies that a relay is present.

	LOBBY_CLOSED {name}
	Notifies lobby closure.

	JOIN_LOBBY {name, password} -> JOIN_ACK {response}
	Joins a lobby.

	PEER_JOIN {user_id, username, pubkey}
	Notifies members of the lobby that a peer has joined.

	PEER_LEFT {user_id}
	Notifies members of the lobby that a peer has left.

	MANAGE_LOBBY {method, args} -> MANAGE_ACK {response}
	Manages a lobby.

	WARNING {message}
	Non-critical message from the server.

	VIOLATION {message}
	Critical message from the server with mandatory disconnection.

	TRANSITION {mode}
	Notifies a peer that they have transitioned to a new mode.

	NEW_HOST {user_id, username, pubkey}
	Notifies lobby members that a new host has been selected.
*/

type Packet struct {
	Opcode  string `json:"opcode"`
	Payload any    `json:"payload,omitempty"`
}

type CreateLobbyArgs struct {
	Name        string `json:"name"`
	MaxPlayers  int64  `json:"max_players"`
	Password    string `json:"password"`
	Locked      bool   `json:"locked"`
	EnableRelay bool   `json:"enable_relay"`
}

type FindLobbyArgs struct {
	Host             NewPeer `json:"host"`
	MaxPlayers       int64   `json:"max_players"`
	CurrentPlayers   uint64  `json:"current_players"`
	CurrentlyLocked  bool    `json:"currently_locked"`
	PasswordRequired bool    `json:"password_required"`
	RelayEnabled     bool    `json:"relay_enabled"`
}

type ManageLobbyArgs struct {
	Method string `json:"method"`
	Args   any    `json:"args"`
}

type JoinLobbyArgs struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

type InitArgs struct {
	Token     string `json:"token"`
	PublicKey string `json:"pubkey,omitempty"`
	Username  string `json:"username"`
}

type InitResponse struct {
	GameID   string `json:"game_id"`
	UserID   string `json:"user_id"`
	DevID    string `json:"dev_id"`
	Username string `json:"username"`
}

type NewPeer struct {
	UserID    string `json:"user_id"`
	Username  string `json:"username"`
	PublicKey string `json:"pubkey,omitempty"`
}

type Client struct {
	conn              *websocket.Conn
	lock              *sync.Mutex
	transmit_lock     *sync.Mutex
	id                string
	token             string
	token_was_present bool
	valid             bool
	state             int8 // -1 - destroyed, 0 - uninitialized, 1 - host, 2 - member
	last_state        int8
	lobby             string
	public_key        string
	name              string
	game_id           string
}

type Relay struct {
	Handler   *peer.Peer
	Id        string
	Close     chan bool
	CloseDone chan bool
}

type Lobby struct {
	Name         string
	RelayEnabled bool
	Lock         *sync.RWMutex
	Host         *Client
	Clients      []*Client
	Password     string
	MaxPlayers   int64
	Locked       bool
	GameID       string
	RelayKey     string
}

type GlobalState struct {
	Lock               *sync.RWMutex
	Relays             map[string]map[string]*Relay
	Lobbies            map[string]map[string]*Lobby
	UninitializedPeers map[string][]*Client
}

func _() {
	peer1, _ := peer.NewPeer("peer1", peer.NewOptions())
	defer peer1.Close()

	peer2, _ := peer.NewPeer("peer2", peer.NewOptions())
	defer peer2.Close()

	peer2.On("connection", func(data any) {
		conn2 := data.(*peer.DataConnection)
		conn2.On("data", func(data any) {
			// Will print 'hi!'
			log.Printf("Received: %#v: %s\n", data, data)
		})
	})

	conn1, _ := peer1.Connect("peer2", nil)
	conn1.On("open", func(data any) {
		for {
			conn1.Send([]byte("hi!"), false)
			<-time.After(time.Millisecond * 1000)
		}
	})
}

func validateToken(token string) bool {
	// TODO
	return token == "let me in"
}

func registerClient(state *GlobalState, c *Client) {
	state.Lock.Lock()

	if state.UninitializedPeers[c.game_id] == nil {
		log.Printf("Game ID %s uninitialized peers storage has been created", c.game_id)
		state.UninitializedPeers[c.game_id] = make([]*Client, 0)
	}

	state.UninitializedPeers[c.game_id] = append(state.UninitializedPeers[c.game_id], c)
	state.Lock.Unlock()
}

func updateState(state *GlobalState, lobby *Lobby, c *Client, newstate int8) {

	// Add to new state with lock. Both locks MUST be acquired and released at the same time!
	state.Lock.Lock()
	c.lock.Lock()
	defer func(c *Client, state *GlobalState) {
		c.lock.Unlock()
		state.Lock.Unlock()
	}(c, state)
	func(c *Client, state *GlobalState) {

		log.Printf("Peer %s was in state %d and is now in state %d\n", c.id, c.state, newstate)

		if lobby == nil {
			// Try to find the lobby given the peer's lobby
			if c.lobby != "" {
				lobby = state.Lobbies[c.game_id][c.lobby]
			}
		}

		// First, remove from old global state
		switch c.state {

		case -1:
			log.Println("WARNING: Peer", c.id, "last state was -1")

		// The client is uninitialized and is either being destroyed or joining a lobby
		case 0:

			// Remove the client from the uninitialized Clients
			state.UninitializedPeers[c.game_id] = without(state.UninitializedPeers[c.game_id], c)

		// The client was a host and the server needs to pick a new host
		case 1:
			if lobby != nil {
				if len(lobby.Clients) >= 1 {

					// Pick the next host
					newHost := lobby.Clients[0]
					log.Printf("Peer %s was in state %d and will become state 1\n", newHost.id, newHost.state)
					newHost.state = 1
					lobby.Host = newHost
					lobby.Clients = without(lobby.Clients, newHost)
					writeMessage(newHost, Packet{Opcode: "TRANSITION", Payload: "host"})
					broadcast(lobby.Clients, Packet{Opcode: "NEW_HOST", Payload: NewPeer{
						UserID:    newHost.id,
						PublicKey: newHost.public_key,
						Username:  newHost.name,
					}})
				} else {
					log.Printf("Lobby %s has no more members, it will be destroyed", lobby.Name)
					lobby.Host = nil
				}
			}

		// The client was a member and needs to be removed
		case 2:
			if lobby != nil {

				// Remove the client from the lobby Clients
				lobby.Clients = without(lobby.Clients, c)
			}
		}

		// Then, update the client's state
		c.last_state = c.state

		if lobby == nil {
			c.lobby = ""
		} else {
			c.lobby = lobby.Name
		}

		c.state = newstate

		// Finally, add to new global state
		switch c.state {

		// Intended to finalize the destruction of the client
		case -1:
			// Remove the client from the uninitialized Clients
			state.UninitializedPeers[c.game_id] = without(state.UninitializedPeers[c.game_id], c)

			// Notify members the client is leaving
			if lobby != nil {

				// Does nothing if there are no peers
				broadcast(without(and(lobby.Clients, lobby.Host), c), Packet{Opcode: "PEER_LEFT", Payload: c.id})

				// Destroy the lobby if it's empty
				if c.last_state == 1 && lobby.Host == nil && len(lobby.Clients) == 0 {
					delete(state.Lobbies[c.game_id], lobby.Name)
					log.Printf("Lobby %s has been destroyed", lobby.Name)

					if lobby.RelayEnabled {
						state.Relays[c.game_id][lobby.Name].Close <- true
						<-state.Relays[c.game_id][lobby.Name].CloseDone
						log.Printf("Game ID %s lobby %s relay has been destroyed", c.game_id, c.lobby)
						delete(state.Relays[c.game_id], lobby.Name)
					}

					broadcast(state.UninitializedPeers[c.game_id], Packet{Opcode: "LOBBY_CLOSED", Payload: lobby.Name})
				}
			}

		// Client is now uninitialized
		case 0:
			state.UninitializedPeers[c.game_id] = and(state.UninitializedPeers[c.game_id], c)

		// Client needs to become a host
		case 1:

			// Get the old host
			oldHost := lobby.Host

			// Move the old host to the lobby Clients
			if oldHost != nil {
				log.Printf("Peer %s was in state %d and will become state 2\n", oldHost.id, oldHost.state)
				oldHost.state = 2
				lobby.Clients = and(lobby.Clients, oldHost)
				writeMessage(oldHost, Packet{Opcode: "TRANSITION", Payload: "peer"})
			}

			// Set the new host
			lobby.Host = c
			writeMessage(c, Packet{Opcode: "TRANSITION", Payload: "host"})

		// Client needs to become a member
		case 2:
			lobby.Clients = and(lobby.Clients, c)
			writeMessage(c, Packet{Opcode: "TRANSITION", Payload: "peer"})
		}

		// Destroy all game storage if there are no lobbies
		log.Printf("Game ID %s has %d lobbies, %d uninitialized peers, and %d relays", c.game_id, len(state.Lobbies[c.game_id]), len(state.UninitializedPeers[c.game_id]), len(state.Relays[c.game_id]))
		if (len(state.UninitializedPeers[c.game_id]) == 0) && (len(state.Lobbies[c.game_id]) == 0) && (len(state.Relays[c.game_id]) == 0) {
			log.Printf("All Game ID %s storage has been destroyed due to no lobbies, relays, or uninitialized peers", c.game_id)
			delete(state.Lobbies, c.game_id)
			delete(state.UninitializedPeers, c.game_id)
			delete(state.Relays, c.game_id)
		}

	}(c, state)
}

func closeWithViolationMessage(c *Client, message string) {
	c.conn.WriteJSON(Packet{Opcode: "VIOLATION", Payload: message})
	c.conn.WriteControl(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseGoingAway, message), time.Now().Add(time.Second))
	c.conn.Close()
}

func closeWithWarningMessage(c *Client, message string) {
	c.conn.WriteJSON(Packet{Opcode: "WARNING", Payload: message})
	c.conn.WriteControl(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseGoingAway, message), time.Now().Add(time.Second))
	c.conn.Close()
}

func handleMessage(state *GlobalState, c *Client, wsMsg Packet) {
	switch wsMsg.Opcode {

	case "KEEPALIVE":
		random_value := make([]byte, 16)
		rand.Read(random_value)
		writeMessage(c, Packet{Opcode: "KEEPALIVE_ACK", Payload: random_value})

	case "INIT":
		if c.valid {
			writeMessage(c, Packet{Opcode: "WARNING", Payload: "already authorized"})
			return
		}

		// Try to parse the Payload into args
		var args InitArgs
		rawMessage, err := json.Marshal(wsMsg.Payload)
		if err != nil {
			closeWithViolationMessage(c, err.Error())
			return
		}
		if err := json.Unmarshal(rawMessage, &args); err != nil {
			closeWithViolationMessage(c, err.Error())
			return
		}

		// Require read lock to check token
		if !c.token_was_present {
			c.token = args.Token
		}
		if !validateToken(c.token) {
			closeWithViolationMessage(c, "unauthorized")
			return
		}

		// Require write lock to set valid
		c.lock.Lock()
		defer c.lock.Unlock()
		c.valid = true
		c.name = args.Username
		c.public_key = args.PublicKey

		// Create game storage if it doesn't exist
		if state.Lobbies[c.game_id] == nil {
			log.Printf("Game ID %s lobby storage has been created", c.game_id)
			state.Lobbies[c.game_id] = make(map[string]*Lobby)
		}

		// Return INIT_OK
		writeMessage(c, Packet{Opcode: "INIT_OK", Payload: InitResponse{
			UserID:   c.id,
			DevID:    "debug_id",
			Username: c.name,
		}})

	case "LIST_LOBBIES":
		if !c.valid {
			writeMessage(c, Packet{Opcode: "WARNING", Payload: "unauthorized"})
			return
		}

		// Return list of lobbies
		var lobbies []string
		for name := range state.Lobbies[c.game_id] {
			lobbies = append(lobbies, name)
		}

		if len(lobbies) == 0 {
			writeMessage(c, Packet{Opcode: "LIST_ACK", Payload: []string{}})
			return
		}

		writeMessage(c, Packet{Opcode: "LIST_ACK", Payload: lobbies})

	case "FIND_LOBBY":
		if !c.valid {
			writeMessage(c, Packet{Opcode: "WARNING", Payload: "unauthorized"})
			return
		}

		// Check if the lobby exists
		lobby := state.Lobbies[c.game_id][wsMsg.Payload.(string)]
		if lobby == nil {
			writeMessage(c, Packet{Opcode: "FIND_ACK", Payload: "not found"})
			return
		}

		// Return info about the lobby
		writeMessage(c, Packet{Opcode: "FIND_ACK", Payload: &FindLobbyArgs{
			Host: NewPeer{
				UserID:    lobby.Host.id,
				PublicKey: lobby.Host.public_key,
				Username:  lobby.Host.name,
			},
			MaxPlayers:       lobby.MaxPlayers,
			CurrentPlayers:   uint64(len(lobby.Clients)),
			CurrentlyLocked:  lobby.Locked,
			PasswordRequired: lobby.Password != "",
		}})

	case "CREATE_LOBBY":
		if !c.valid {
			writeMessage(c, Packet{Opcode: "WARNING", Payload: "unauthorized"})
			return
		}

		// Try to parse the Payload into args
		var args CreateLobbyArgs
		raw, err := json.Marshal(wsMsg.Payload)
		if err != nil {
			closeWithViolationMessage(c, err.Error())
			return
		}
		if err := json.Unmarshal(raw, &args); err != nil {
			closeWithViolationMessage(c, err.Error())
			return
		}

		// Check if the lobby already exists
		if state.Lobbies[args.Name] != nil {
			writeMessage(c, Packet{Opcode: "CREATE_ACK", Payload: "exists"})
			return
		}

		// Create the lobby
		state.Lobbies[c.game_id][args.Name] = &Lobby{
			Name:         args.Name,
			Lock:         &sync.RWMutex{},
			Password:     args.Password,
			MaxPlayers:   args.MaxPlayers,
			Locked:       args.Locked,
			RelayEnabled: args.EnableRelay,
			Clients:      make([]*Client, 0),
		}
		log.Printf("Lobby %s was created and %s will become the first host", args.Name, c.id)

		// Set the client as the host
		updateState(state, state.Lobbies[c.game_id][args.Name], c, 1)
		writeMessage(c, Packet{Opcode: "CREATE_ACK", Payload: "ok"})

		// Just tell the client that they are the host
		writeMessage(c, Packet{Opcode: "NEW_HOST", Payload: c.id})

		// Tell other peers about the new lobby
		broadcast(state.UninitializedPeers[c.game_id], Packet{Opcode: "NEW_LOBBY", Payload: args.Name})

		// Create a relay
		if args.EnableRelay {
			relay, err := spawnRelay(c, state, args.Name)
			if err != nil {
				return
			}
			state.Lobbies[c.game_id][args.Name].RelayKey = relay.Id
			writeMessage(c, Packet{Opcode: "RELAY", Payload: relay.Id})
		}

	case "JOIN_LOBBY":
		if !c.valid {
			writeMessage(c, Packet{Opcode: "WARNING", Payload: "unauthorized"})
			return
		}

		// Marshal the arguments into JSON
		var args JoinLobbyArgs
		raw, err := json.Marshal(wsMsg.Payload)
		if err != nil {
			closeWithViolationMessage(c, err.Error())
			return
		}
		if err := json.Unmarshal(raw, &args); err != nil {
			closeWithViolationMessage(c, err.Error())
			return
		}

		// Check if the lobby exists
		lobby := state.Lobbies[c.game_id][args.Name]
		if lobby == nil {
			writeMessage(c, Packet{Opcode: "JOIN_ACK", Payload: "not found"})
			return
		}

		// Check if the lobby is locked
		if lobby.Locked {
			writeMessage(c, Packet{Opcode: "JOIN_ACK", Payload: "locked"})
			return
		}

		// Check if the lobby is full (ignore if lobby.MaxPlayers == -1)
		if lobby.MaxPlayers != -1 && int64(len(lobby.Clients)) >= lobby.MaxPlayers {
			writeMessage(c, Packet{Opcode: "JOIN_ACK", Payload: "full"})
			return
		}

		// Check if the password is correct
		if lobby.Password != "" && lobby.Password != args.Password {
			writeMessage(c, Packet{Opcode: "JOIN_ACK", Payload: "password"})
			return
		}

		// Set the client as a member
		updateState(state, lobby, c, 2)
		writeMessage(c, Packet{Opcode: "JOIN_ACK", Payload: "ok"})

		// Tell the peer about the current host
		writeMessage(c, Packet{Opcode: "NEW_HOST", Payload: lobby.Host.id})

		// Tell the host and other peers about the new client
		writeMessage(lobby.Host, Packet{Opcode: "NEW_PEER", Payload: NewPeer{
			UserID:    c.id,
			PublicKey: c.public_key,
			Username:  c.name,
		}})
		broadcast(without(lobby.Clients, c), Packet{Opcode: "PEER_JOIN", Payload: NewPeer{
			UserID:    c.id,
			PublicKey: c.public_key,
			Username:  c.name,
		}})

		if lobby.RelayEnabled {
			writeMessage(c, Packet{Opcode: "RELAY", Payload: lobby.RelayKey})
		}

	case "MANAGE_LOBBY":
		if !c.valid {
			writeMessage(c, Packet{Opcode: "WARNING", Payload: "unauthorized"})
			return
		}

		// Must be the lobby host to manage the lobby
		if c.state != 1 {
			writeMessage(c, Packet{Opcode: "WARNING", Payload: "unauthorized"})
			return
		}

		// Get lobby
		lobby := state.Lobbies[c.game_id][c.lobby]

		// Try to parse the Payload into args
		var args ManageLobbyArgs
		raw, err := json.Marshal(wsMsg.Payload)
		if err != nil {
			closeWithViolationMessage(c, err.Error())
			return
		}
		if err := json.Unmarshal(raw, &args); err != nil {
			closeWithViolationMessage(c, err.Error())
			return
		}

		switch args.Method {
		case "lock":
			lobby.Locked = true
		case "unlock":
			lobby.Locked = false
		case "kick":
			id, ok := args.Args.(string)
			if !ok {
				writeMessage(c, Packet{Opcode: "MANAGE_ACK", Payload: "type error: argument (peer id) should be a string"})
				return
			}

			// Get the client to kick
			client := get(lobby.Clients, id)
			if client == nil {
				writeMessage(c, Packet{Opcode: "MANAGE_ACK", Payload: "no peer found"})
				return
			}

			// Kick the client
			closeWithWarningMessage(client, "You have been kicked from the lobby")
			writeMessage(c, Packet{Opcode: "MANAGE_ACK", Payload: "ok"})
		case "change_password":
			newPassword, ok := args.Args.(string)
			if !ok {
				writeMessage(c, Packet{Opcode: "MANAGE_ACK", Payload: "type error: argument (new password) should be a string"})
				return
			}

			lobby.Password = newPassword
			writeMessage(c, Packet{Opcode: "MANAGE_ACK", Payload: "ok"})
		case "change_max_players":
			maxPlayers, ok := args.Args.(int64)
			if !ok {
				writeMessage(c, Packet{Opcode: "MANAGE_ACK", Payload: "type error: argument (max players) should be an integer"})
				return
			}

			if maxPlayers < -1 {
				writeMessage(c, Packet{Opcode: "MANAGE_ACK", Payload: "value error: argument (max players) should at least be -1 (unlimited), greater than or equal to than the current number of peers in the lobby"})
				return
			}

			// Don't update the size to be smaller than the current size (ignore if setting to unlimited)
			if maxPlayers != -1 && len(lobby.Clients) > int(maxPlayers) {
				writeMessage(c, Packet{Opcode: "MANAGE_ACK", Payload: "value error: new size is smaller than the current number of peers in the lobby"})
			}

			lobby.MaxPlayers = int64(maxPlayers)
			writeMessage(c, Packet{Opcode: "MANAGE_ACK", Payload: "ok"})
		}

	default:
		writeMessage(c, Packet{Opcode: "WARNING", Payload: "unknown or unimplemented opcode"})
	}
}

func readMessage(c *Client) (Packet, error) {
	_, raw, err := c.conn.ReadMessage()
	if err != nil {
		log.Println("Client read error:", err)
		return Packet{}, err
	}

	var clientMsg Packet
	if err := json.Unmarshal(raw, &clientMsg); err != nil {
		log.Println("Invalid message format")
		return Packet{}, err
	}
	return clientMsg, nil
}

func runClient(state *GlobalState, c *Client) {
	for {
		clientMsg, err := readMessage(c)
		if err != nil {
			log.Printf("WARNING: Client %s read error: %s", c.id, err.Error())
			return
		}
		handleMessage(state, c, clientMsg)
	}
}

func broadcast(peers []*Client, wsMsg Packet) {
	for _, peer := range peers {
		writeMessage(peer, wsMsg)
	}
}

func closeClient(state *GlobalState, c *Client) {
	updateState(state, nil, c, -1)
}

func writeMessage(c *Client, wsMsg Packet) {
	if c == nil {
		return
	}
	c.transmit_lock.Lock()
	defer c.transmit_lock.Unlock()
	c.conn.WriteJSON(wsMsg)
}

// get returns the client with the given id from the given slice of clients.
// Returns nil if no client with the given id is found.
func get(peers []*Client, id string) *Client {
	for _, peer := range peers {
		if peer.id == id {
			return peer
		}
	}
	return nil
}

// without returns a slice of clients that excludes the given client.
//
// It creates a new slice and filters out the given client. If the given client is
// not in the original slice, it returns the original slice unchanged.
func without(peers []*Client, c *Client) []*Client {

	// Create a new slice
	copy := make([]*Client, 0)

	// Scan through the original slice and filter out the client
	for _, peer := range peers {
		if peer != c {
			copy = append(copy, peer)
		}
	}
	return copy
}

// and returns a slice of clients that includes the given client.
//
// If the given client is already in the slice, it is returned unchanged.
// Otherwise, the given client is appended to the slice and the new slice is returned.
func and(peers []*Client, c *Client) []*Client {

	// Create a copy
	copy := slices.Clone(peers)

	// Do nothing if it already contains the client
	if slices.Contains(copy, c) {
		return copy
	}

	// Add the client to the slice
	copy = append(copy, c)
	return copy
}

func spawnRelay(c *Client, state *GlobalState, lobby_name string) (*Relay, error) {
	if state.Relays[c.game_id] != nil {
		return state.Relays[c.game_id][lobby_name], nil
	}

	config := peer.NewOptions()
	config.Configuration.ICEServers = []webrtc.ICEServer{
		{
			URLs: []string{"stun:vpn.mikedev101.cc:3478", "stun:vpn.mikedev101.cc:5349"},
		},
		{
			URLs:       []string{"turn:vpn.mikedev101.cc:5349", "turn:vpn.mikedev101.cc:3478"},
			Username:   "free",
			Credential: "free",
		},
	}
	config.Debug = 2

	// generate a random string to reduce collisions
	random_value := make([]byte, 5)
	rand.Read(random_value)
	base64_value := base64.StdEncoding.EncodeToString(random_value)
	relayid := fmt.Sprintf("relay_%s_%s-[%s]", c.game_id, lobby_name, base64_value)
	relayPeer, err := peer.NewPeer(relayid, config)
	if err != nil {
		log.Printf("Failed to create relay peer: %s", err)
		state.Lobbies[c.game_id][lobby_name].RelayEnabled = false
		return nil, err
	}

	relayObj := &Relay{
		Handler:   relayPeer,
		Id:        relayid,
		Close:     make(chan bool),
		CloseDone: make(chan bool),
	}

	if state.Relays[c.game_id] == nil {
		log.Printf("Game %s relay storage has been created\n", c.game_id)
		state.Relays[c.game_id] = make(map[string]*Relay)
	}

	if state.Relays[c.game_id][lobby_name] == nil {
		log.Printf("Game %s lobby %s relay storage has been created\n", c.game_id, lobby_name)
		state.Relays[c.game_id][lobby_name] = relayObj
	}

	log.Printf("Created relay peer for game %s lobby %s", c.game_id, lobby_name)

	go handleRelay(state, relayObj)
	return relayObj, nil
}

func handleRelay(state *GlobalState, r *Relay) {
	p := r.Handler
	defer p.Destroy()

	p.On("connection", func(data any) {
		conn := data.(*peer.DataConnection)

		conn.On("open", func(data any) {
			log.Printf("Peer %s connected to relay", conn.GetPeerID())
		})

		conn.On("data", func(data any) {
			log.Printf("Received data from peer %s: %s", conn.GetPeerID(), data)

			packet, ok := data.(map[string]any)
			if !ok {
				log.Printf("Packet casting failed: %s", data)
			}
			opcode, ok := packet["opcode"]
			if !ok {
				return
			}

			switch opcode {
			case "gmsg":
				// TODO: handle relay messages
				break
			}

		})

		conn.On("close", func(data any) {
			log.Printf("Peer %s disconnected from relay", conn.GetPeerID())
		})

		conn.On("error", func(data any) {
			log.Printf("Peer %s error: %v", conn.GetPeerID(), data)
		})
	})

	p.On("error", func(data any) {
		log.Printf("Relay peer error: %v", data)
	})

	p.On("close", func(data any) {
		log.Printf("Relay peer closed")
	})

	<-r.Close
	log.Printf("Relay peer got close signal.")
	r.CloseDone <- true
}

func main() {
	app := fiber.New()
	app.Use(cors.New())

	global_state := &GlobalState{
		Lock:               &sync.RWMutex{},
		Relays:             make(map[string]map[string]*Relay),
		Lobbies:            make(map[string]map[string]*Lobby),
		UninitializedPeers: make(map[string][]*Client),
	}

	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		client := &Client{
			conn:              c,
			id:                ulid.MustNew(ulid.Timestamp(time.Now()), rand.Reader).String(),
			token:             c.Query("token"),
			token_was_present: c.Query("token") != "",
			lock:              &sync.Mutex{},
			state:             0,
			transmit_lock:     &sync.Mutex{},
			game_id:           c.Query("ugi"),
		}

		if c.Query("ugi") == "" {
			closeWithViolationMessage(client, "no UGI provided")
			return
		}

		registerClient(global_state, client)
		defer closeClient(global_state, client)
		runClient(global_state, client)
	}))

	log.Fatal(app.Listen("localhost:3000"))
}
