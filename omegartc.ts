// OmegaRTC is a class that provides a uniform interface to manage multiple WebRTC connections.
// This class can be used for both voice connections and data connections with multiple channels.
class OmegaRTC {
    dataConnections: Map<string, RTCPeerConnection>
    voiceConnections: Map<string, RTCPeerConnection>
    iceStorage: Map<string, Array<RTCIceCandidate>>
    iceGatheringDone: Map<string, boolean>
    dataStorage: Map<string, Map<string, boolean | number | object>>
    configuration: RTCConfiguration

    constructor() {
        this.dataConnections = new Map()
        this.voiceConnections = new Map()
        this.dataStorage = new Map()
        this.configuration = {
            iceServers: [
              { urls: 'stun:vpn.mikedev101.cc:3478' },
              {
                urls: 'turn:vpn.mikedev101.cc:3478',
                username: 'free',
                credential: 'free'
              },
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:freeturn.net:3478' },
              { urls: 'stun:freeturn.net:5349' },
              {
                urls: 'turn:freeturn.net:3478',
                username: 'free',
                credential: 'free'
              },
              {
                urls: 'turns:freeturn.net:5349',
                username: 'free',
                credential: 'free'
              }
            ],
            iceTransportPolicy: 'all'
        }
    }

    // Changes the ICE transport policy to 'relay' or 'all' if 'mode' is true or false. 
    relayOnly(mode: boolean) {
        this.configuration.iceTransportPolicy = mode ? 'relay' : 'all'
    }

    // Returns a promise that resolves when the condition function returns true. Useful for waiting for ICE gathering to complete.
    until(conditionFunction: () => boolean) : Promise<void> {
        const poll = (resolve: () => void) => {
            if(conditionFunction()) resolve()
            else setTimeout(() => poll(resolve), 100)
        }
        return new Promise(poll)
    }

    // Given a client ID as well as a specified mode (0 - data, 1 - voice),
    // it will create an RTCSessionDescriptionInit object. If the client ID
    // does not exist, it will create a new one.
    createOffer(id: string, mode: number) : RTCSessionDescriptionInit | void {
        return;
    }

    // Given a client ID as well as a specified mode (0 - data, 1 - voice),
    // it will create a RTCPeerConnection instance and store it. If the
    // client ID already exists, it will return the existing instance.
    createConnection(id: string, mode: number) : RTCPeerConnection | void {
        switch (mode) {
            case 0: // Data

                

                break
            case 1: // Voice

                // If the connection already exists, return it
                if (this.voiceConnections.has(id)) { 
                    return this.voiceConnections.get(id)
                }

                break
            default:
                console.error('Invalid mode')
                return
        }

        return
    }

    createDataConnection(id: string) : RTCPeerConnection | void {

        // If the connection already exists, return it
        if (this.dataConnections.has(id)) { 
            return this.dataConnections.get(id)
        }

        // Create connection and properties
        const conn = new RTCPeerConnection(this.configuration)
        this.iceStorage[id] = new Array<RTCIceCandidate>()
        this.iceGatheringDone[id] = false;

        // Handle ICE gathering
        conn.onicecandidate = (event : RTCPeerConnectionIceEvent ) => {
            if (event.candidate) {
                this.iceStorage[id].push(event.candidate)
            }
            if (conn.iceGatheringState === 'complete') {
                this.iceGatheringDone[id] = true;
            }
        }

        return conn;
    }
}