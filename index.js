/*
    CloudLink 5 Protocol extension (PeerJS-based)

    Copyright (C) 2025 Mike Renaker "MikeDEV".

    MIT License

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

(function (Scratch) {
    'use strict';
    const version = "1.0.1";
    const blockIconURI =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc3IiBoZWlnaHQ9IjEyMyIgdmlld0JveD0iMCAwIDE3NyAxMjMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xXzE5KSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTM0LjMyIDM4LjUxMjlDMTU3LjU2MSAzOC41MTI5IDE3Ni4zOTkgNTcuMzUyMyAxNzYuMzk5IDgwLjU5MThDMTc2LjM5OSAxMDMuODMxIDE1Ny41NjEgMTIyLjY3MSAxMzQuMzIgMTIyLjY3MUg0Mi4wNzg5QzE4LjgzOCAxMjIuNjcxIDAgMTAzLjgzMSAwIDgwLjU5MThDMCA1Ny4zNTIzIDE4LjgzOCAzOC41MTI5IDQyLjA3ODkgMzguNTEyOUg0Ni4yNjc4QzQ4LjA3OTMgMTYuOTQyMyA2Ni4xNjEzIDAgODguMTk5MyAwQzExMC4yMzcgMCAxMjguMzE5IDE2Ljk0MjMgMTMwLjEzMSAzOC41MTI5SDEzNC4zMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik04Ny40MTk4IDEwNS4zMzNDODIuOTM3OCAxMDUuMzMzIDc4Ljc4NzggMTA0LjQ3NSA3NC45Njk4IDEwMi43NkM3MS4xNTE4IDEwMC45ODkgNjcuOTQyNSA5OC42NjUgNjUuMzQxOCA5NS43ODc3TDcxLjg5ODggODcuNTcwNkM3NC4yNzgyIDg5LjgzOTMgNzYuNzQwNSA5MS41ODIzIDc5LjI4NTggOTIuNzk5NkM4MS44ODY1IDk0LjAxNyA4NC40ODcyIDk0LjYyNTYgODcuMDg3OCA5NC42MjU2Qzg5LjUyMjUgOTQuNjI1NiA5MS42ODA1IDk0LjIzODMgOTMuNTYxOCA5My40NjM2Qzk1LjQ0MzIgOTIuNjMzNiA5Ni44ODE4IDkxLjQ5OTMgOTcuODc3OCA5MC4wNjA2Qzk4LjkyOTIgODguNTY2NiA5OS40NTQ4IDg2LjgyMzYgOTkuNDU0OCA4NC44MzE2Qzk5LjQ1NDggODIuOTUwMyA5OC45MjkyIDgxLjI5MDMgOTcuODc3OCA3OS44NTE2Qzk2LjgyNjUgNzguNDEzIDk1LjM4NzggNzcuMjc4NiA5My41NjE4IDc2LjQ0ODZDOTEuNzM1OCA3NS42MTg2IDg5LjY4ODUgNzUuMjAzNiA4Ny40MTk4IDc1LjIwMzZDODUuMzE3MiA3NS4yMDM2IDgzLjQzNTggNzUuMzk3MyA4MS43NzU4IDc1Ljc4NDZDODAuMTE1OCA3Ni4xNzIgNzguNjIxOCA3Ni42NDIzIDc3LjI5MzggNzcuMTk1NkM3NS45NjU4IDc3LjY5MzYgNzQuNzc2MiA3OC4yNDcgNzMuNzI0OCA3OC44NTU2TDY4LjA4MDggNzEuNjM0Nkw3MS42NDk4IDQ2LjMxOTZIMTA2LjUxVjU3LjAyNjZINzcuOTU3OEw4MC45NDU4IDUzLjM3NDZMNzguMjA2OCA3MS44MDA2TDc0LjMwNTggNjkuODkxNkM3NS4yNDY1IDY5LjExNyA3Ni41NDY4IDY4LjM5NzYgNzguMjA2OCA2Ny43MzM2Qzc5Ljg2NjggNjcuMDY5NiA4MS43MjA1IDY2LjUxNjMgODMuNzY3OCA2Ni4wNzM2Qzg1LjgxNTIgNjUuNjMxIDg3LjgzNDggNjUuNDA5NiA4OS44MjY4IDY1LjQwOTZDOTMuNzAwMiA2NS40MDk2IDk3LjI0MTUgNjYuMjM5NiAxMDAuNDUxIDY3Ljg5OTZDMTAzLjY2IDY5LjUwNDMgMTA2LjIzMyA3MS43NzMgMTA4LjE3IDc0LjcwNTZDMTEwLjEwNiA3Ny42MzgzIDExMS4wNzUgODEuMDY5IDExMS4wNzUgODQuOTk3NkMxMTEuMDc1IDg4LjgxNTYgMTEwLjAyMyA5Mi4yNzQgMTA3LjkyMSA5NS4zNzI3QzEwNS44MTggOTguNDE2IDEwMi45NjggMTAwLjg1MSA5OS4zNzE4IDEwMi42NzdDOTUuODMwNSAxMDQuNDQ3IDkxLjg0NjUgMTA1LjMzMyA4Ny40MTk4IDEwNS4zMzNaIiBmaWxsPSIjMEZCRDhDIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMV8xOSI+CjxyZWN0IHdpZHRoPSIxNzYuMzk5IiBoZWlnaHQ9IjEyMi42NzEiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
    const menuIconURI =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjIyNiIgdmlld0JveD0iMCAwIDIyNiAyMjYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xXzEzKSI+CjxwYXRoIGQ9Ik0wIDExMi42NzdDMCA1MC40NDc0IDUwLjQ0NzQgMCAxMTIuNjc3IDBDMTc0LjkwNyAwIDIyNS4zNTUgNTAuNDQ3NCAyMjUuMzU1IDExMi42NzdDMjI1LjM1NSAxNzQuOTA3IDE3NC45MDcgMjI1LjM1NSAxMTIuNjc3IDIyNS4zNTVDNTAuNDQ3NCAyMjUuMzU1IDAgMTc0LjkwNyAwIDExMi42NzdaIiBmaWxsPSIjMEZCRDhDIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTU4LjUzNSA4My43NjEyQzE4MS43NzYgODMuNzYxMiAyMDAuNjE0IDEwMi42MDEgMjAwLjYxNCAxMjUuODRDMjAwLjYxNCAxNDkuMDggMTgxLjc3NiAxNjcuOTE5IDE1OC41MzUgMTY3LjkxOUg2Ni4yOTQxQzQzLjA1MzIgMTY3LjkxOSAyNC4yMTUyIDE0OS4wOCAyNC4yMTUyIDEyNS44NEMyNC4yMTUyIDEwMi42MDEgNDMuMDUzMiA4My43NjEyIDY2LjI5NDEgODMuNzYxMkg3MC40ODNDNzIuMjk0NSA2Mi4xOTA3IDkwLjM3NjUgNDUuMjQ4NCAxMTIuNDE0IDQ1LjI0ODRDMTM0LjQ1MiA0NS4yNDg0IDE1Mi41MzQgNjIuMTkwNyAxNTQuMzQ2IDgzLjc2MTJIMTU4LjUzNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMTEuNjM1IDE1MC41ODFDMTA3LjE1MyAxNTAuNTgxIDEwMy4wMDMgMTQ5LjcyMyA5OS4xODUgMTQ4LjAwOEM5NS4zNjcgMTQ2LjIzNyA5Mi4xNTc3IDE0My45MTMgODkuNTU3IDE0MS4wMzZMOTYuMTE0IDEzMi44MTlDOTguNDkzMyAxMzUuMDg4IDEwMC45NTYgMTM2LjgzMSAxMDMuNTAxIDEzOC4wNDhDMTA2LjEwMiAxMzkuMjY1IDEwOC43MDIgMTM5Ljg3NCAxMTEuMzAzIDEzOS44NzRDMTEzLjczOCAxMzkuODc0IDExNS44OTYgMTM5LjQ4NyAxMTcuNzc3IDEzOC43MTJDMTE5LjY1OCAxMzcuODgyIDEyMS4wOTcgMTM2Ljc0OCAxMjIuMDkzIDEzNS4zMDlDMTIzLjE0NCAxMzMuODE1IDEyMy42NyAxMzIuMDcyIDEyMy42NyAxMzAuMDhDMTIzLjY3IDEyOC4xOTkgMTIzLjE0NCAxMjYuNTM5IDEyMi4wOTMgMTI1LjFDMTIxLjA0MiAxMjMuNjYxIDExOS42MDMgMTIyLjUyNyAxMTcuNzc3IDEyMS42OTdDMTE1Ljk1MSAxMjAuODY3IDExMy45MDQgMTIwLjQ1MiAxMTEuNjM1IDEyMC40NTJDMTA5LjUzMiAxMjAuNDUyIDEwNy42NTEgMTIwLjY0NiAxMDUuOTkxIDEyMS4wMzNDMTA0LjMzMSAxMjEuNDIgMTAyLjgzNyAxMjEuODkxIDEwMS41MDkgMTIyLjQ0NEMxMDAuMTgxIDEyMi45NDIgOTguOTkxMyAxMjMuNDk1IDk3Ljk0IDEyNC4xMDRMOTIuMjk2IDExNi44ODNMOTUuODY1IDkxLjU2OEgxMzAuNzI1VjEwMi4yNzVIMTAyLjE3M0wxMDUuMTYxIDk4LjYyM0wxMDIuNDIyIDExNy4wNDlMOTguNTIxIDExNS4xNEM5OS40NjE3IDExNC4zNjUgMTAwLjc2MiAxMTMuNjQ2IDEwMi40MjIgMTEyLjk4MkMxMDQuMDgyIDExMi4zMTggMTA1LjkzNiAxMTEuNzY1IDEwNy45ODMgMTExLjMyMkMxMTAuMDMgMTEwLjg3OSAxMTIuMDUgMTEwLjY1OCAxMTQuMDQyIDExMC42NThDMTE3LjkxNSAxMTAuNjU4IDEyMS40NTcgMTExLjQ4OCAxMjQuNjY2IDExMy4xNDhDMTI3Ljg3NSAxMTQuNzUzIDEzMC40NDggMTE3LjAyMSAxMzIuMzg1IDExOS45NTRDMTM0LjMyMiAxMjIuODg3IDEzNS4yOSAxMjYuMzE3IDEzNS4yOSAxMzAuMjQ2QzEzNS4yOSAxMzQuMDY0IDEzNC4yMzkgMTM3LjUyMiAxMzIuMTM2IDE0MC42MjFDMTMwLjAzMyAxNDMuNjY0IDEyNy4xODQgMTQ2LjA5OSAxMjMuNTg3IDE0Ny45MjVDMTIwLjA0NiAxNDkuNjk2IDExNi4wNjIgMTUwLjU4MSAxMTEuNjM1IDE1MC41ODFaIiBmaWxsPSIjMEZCRDhDIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMV8xMyI+CjxyZWN0IHdpZHRoPSIyMjUuMzU1IiBoZWlnaHQ9IjIyNS4zNTUiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";

    // Require the extension to be unsandboxed
    if (!Scratch.extensions.unsandboxed) {
        return alert(
            "The CL5 extension must be loaded in an unsandboxed environment. Make sure to enable the \"Run without Sandbox\" option when loading the extension. Refresh the page and try again."
        );
    }

    // Require access to the VM and/or runtime
    if (!Scratch.vm || !Scratch.vm.runtime) {
        return alert(
            "The CL5 extension could not detect access to the Scratch VM and/or runtime. Please use a Turbowarp-based Scratch environment."
        );
    }

    // Require browser to support Web Locks API (used for concurrency)
    if (!navigator.locks) {
        return alert(
            "The CL5 extension could not detect Web Locks support; this extension won't work. Please update your browser or use a different one like Google Chrome, Mozilla Firefox, or Microsoft Edge."
        );
    }

    // Check if the browser supports the WebCrypto API (used for E2EE)
    if (!window.crypto || !window.crypto.subtle) {
        alert(
            "The CL5 extension could not detect Web Cryptography support; the extension will continue to work but you will not have end-to-end encryption."
        );
    }

    // Helper function for parsing custom PeerJS server URLs.
    function parsePeerJSURL(wsUrl) {
        try {
            const url = new URL(wsUrl);
            return {
                host: url.hostname,
                secure: url.protocol === 'wss:',
                port: url.port ? parseInt(url.port) : (url.protocol === 'wss:' ? 443 : 80),
            };
        } catch (err) {
            alert('Invalid URL:', err);
            return null;
        }
    }

    // Ah yes, Perry the Platypus! It seems you have found my Callback-inator!
    class CallbackInator {
        constructor() {
            this.calls = new Map();
            this.debug = 0;
        }

        /**
         * Sets the debug level for the CallbackInator.
         *
         * @param {number} level - The desired debug level. Higher numbers enable more verbose logging.
         * 
         * Adjust the verbosity of logging for debugging purposes. A higher level means more detailed logs.
         */
        set_debug_level(level) {
            this.debug = level;
        }

        /**
         * Unbinds a callback function from a specified event name.
         * @param {string} name - The name of the event to unbind the callback from.
         * @param {string} id - The ID of the callback to unbind. If set to "*", all callbacks for the event will be unbound.
         * @returns {void}
         * 
         * Does nothing if the callback was never bound.
         */
        unbind(name, id) {
            if (id == "*") {
                this.calls.delete(name);
                if (this.debug > 2) console.log(`Unbound all callbacks for "${name}"`);
                return;
            }
            if (!this.calls[name] || !this.calls[name].has(id)) return;
            this.calls[name].delete(id);
            if (this.debug > 2) console.log(`Unbound callback for "${name}" with ID "${id}"`);
        }

        /**
         * Binds a callback function to a specified event name.
         *
         * @param {string} name - The name of the event to bind the callback to.
         * @param {function} callback - The function to be called when the event is triggered.
         * @param {string} [id="default"] - An optional identifier for the callback.
         * @throws {TypeError} If the provided callback is not a function.
         */
        bind(name, callback, id = "default") {
            if (!this.calls[name]) {
                this.calls[name] = new Map();
            }
            if (typeof callback !== 'function') {
                if (self.debug > 0) console.error('Callback must be a function');
                return;
            }
            this.calls[name].set(id, callback);
            if (this.debug > 2) console.log(`Bound callback for "${name}" with ID "${id}"`);
        }

        /**
         * Executes all registered callbacks for a given event name with the provided arguments.
         *
         * @param {string} name - The name of the event whose callbacks should be executed.
         * @param {...*} args - Arguments to pass to the callbacks.
         * @returns {void}
         *
         * Logs warnings if there are no callbacks registered, if the callbacks map is null,
         * if the callbacks map is empty, or if any callback is not a function. Logs an error
         * if the registered callback is not a map.
         */
        call(name, ...args) {
            if (!this.calls[name]) {
                if (this.debug > 1) console.warn(`No callbacks registered for "${name}"`);
                return;
            };
            if (this.calls[name] === null) {
                if (this.debug > 1) console.warn(`No callbacks registered for "${name}"`);
                return;
            }
            if (this.calls[name].size === 0) {
                if (this.debug > 1) console.warn(`No callbacks registered for "${name}"`);
                return;
            }
            if (!(this.calls[name] instanceof Map)) {
                if (this.debug > 0) console.error("Callback was not a map! Got ", typeof this.calls[name], "instead.");
                return;
            }
            if (this.debug > 2) console.log(`Executing callbacks for "${name}"`);
            for (const callback of this.calls[name].values()) {
                if (callback === null || typeof callback !== 'function') {
                    if (this.debug > 1) console.warn(`Callback registered for "${name}" is null or not a function`);
                    continue;
                }
                try {
                    if (this.debug > 2) console.log(`Executing callback ${callback}"`);
                    callback(...args);
                } catch (error) {
                    if (this.debug > 0) console.error(`Error executing callback for "${name}"`, error);
                }
            }
        }
    }

    // Initialize the CallbackInator!
    const callbacks = new CallbackInator();

    /*
          https://github.com/peers/peerjs
          
          (source: https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js)
  
          Copyright (c) 2015 Michelle Bu and Eric Zhang, http://peerjs.com
  
          The MIT License
      */

    /* eslint-disable */
    // prettier-ignore
    (() => {
        function e(e, t, n, r) { Object.defineProperty(e, t, { get: n, set: r, enumerable: !0, configurable: !0 }) } function t(e) { return e && e.__esModule ? e.default : e } class n { constructor() { this.chunkedMTU = 16300, this._dataCount = 1, this.chunk = e => { let t = [], n = e.byteLength, r = Math.ceil(n / this.chunkedMTU), i = 0, o = 0; for (; o < n;) { let s = Math.min(n, o + this.chunkedMTU), a = e.slice(o, s), c = { __peerData: this._dataCount, n: i, data: a, total: r }; t.push(c), o = s, i++ } return this._dataCount++, t } } } class r { append_buffer(e) { this.flush(), this._parts.push(e) } append(e) { this._pieces.push(e) } flush() { if (this._pieces.length > 0) { let e = new Uint8Array(this._pieces); this._parts.push(e), this._pieces = [] } } toArrayBuffer() { let e = []; for (let t of this._parts) e.push(t); return function (e) { let t = 0; for (let n of e) t += n.byteLength; let n = new Uint8Array(t), r = 0; for (let t of e) { let e = new Uint8Array(t.buffer, t.byteOffset, t.byteLength); n.set(e, r), r += t.byteLength } return n }(e).buffer } constructor() { this.encoder = new TextEncoder, this._pieces = [], this._parts = [] } } function i(e) { return new s(e).unpack() } function o(e) { let t = new a, n = t.pack(e); return n instanceof Promise ? n.then(() => t.getBuffer()) : t.getBuffer() } class s { unpack() { let e; let t = this.unpack_uint8(); if (t < 128) return t; if ((224 ^ t) < 32) return (224 ^ t) - 32; if ((e = 160 ^ t) <= 15) return this.unpack_raw(e); if ((e = 176 ^ t) <= 15) return this.unpack_string(e); if ((e = 144 ^ t) <= 15) return this.unpack_array(e); if ((e = 128 ^ t) <= 15) return this.unpack_map(e); switch (t) { case 192: return null; case 193: case 212: case 213: case 214: case 215: return; case 194: return !1; case 195: return !0; case 202: return this.unpack_float(); case 203: return this.unpack_double(); case 204: return this.unpack_uint8(); case 205: return this.unpack_uint16(); case 206: return this.unpack_uint32(); case 207: return this.unpack_uint64(); case 208: return this.unpack_int8(); case 209: return this.unpack_int16(); case 210: return this.unpack_int32(); case 211: return this.unpack_int64(); case 216: return e = this.unpack_uint16(), this.unpack_string(e); case 217: return e = this.unpack_uint32(), this.unpack_string(e); case 218: return e = this.unpack_uint16(), this.unpack_raw(e); case 219: return e = this.unpack_uint32(), this.unpack_raw(e); case 220: return e = this.unpack_uint16(), this.unpack_array(e); case 221: return e = this.unpack_uint32(), this.unpack_array(e); case 222: return e = this.unpack_uint16(), this.unpack_map(e); case 223: return e = this.unpack_uint32(), this.unpack_map(e) } } unpack_uint8() { let e = 255 & this.dataView[this.index]; return this.index++, e } unpack_uint16() { let e = this.read(2), t = (255 & e[0]) * 256 + (255 & e[1]); return this.index += 2, t } unpack_uint32() { let e = this.read(4), t = ((256 * e[0] + e[1]) * 256 + e[2]) * 256 + e[3]; return this.index += 4, t } unpack_uint64() { let e = this.read(8), t = ((((((256 * e[0] + e[1]) * 256 + e[2]) * 256 + e[3]) * 256 + e[4]) * 256 + e[5]) * 256 + e[6]) * 256 + e[7]; return this.index += 8, t } unpack_int8() { let e = this.unpack_uint8(); return e < 128 ? e : e - 256 } unpack_int16() { let e = this.unpack_uint16(); return e < 32768 ? e : e - 65536 } unpack_int32() { let e = this.unpack_uint32(); return e < 2147483648 ? e : e - 4294967296 } unpack_int64() { let e = this.unpack_uint64(); return e < 0x7fffffffffffffff ? e : e - 18446744073709552e3 } unpack_raw(e) { if (this.length < this.index + e) throw Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`); let t = this.dataBuffer.slice(this.index, this.index + e); return this.index += e, t } unpack_string(e) { let t, n; let r = this.read(e), i = 0, o = ""; for (; i < e;)(t = r[i]) < 160 ? (n = t, i++) : (192 ^ t) < 32 ? (n = (31 & t) << 6 | 63 & r[i + 1], i += 2) : (224 ^ t) < 16 ? (n = (15 & t) << 12 | (63 & r[i + 1]) << 6 | 63 & r[i + 2], i += 3) : (n = (7 & t) << 18 | (63 & r[i + 1]) << 12 | (63 & r[i + 2]) << 6 | 63 & r[i + 3], i += 4), o += String.fromCodePoint(n); return this.index += e, o } unpack_array(e) { let t = Array(e); for (let n = 0; n < e; n++)t[n] = this.unpack(); return t } unpack_map(e) { let t = {}; for (let n = 0; n < e; n++)t[this.unpack()] = this.unpack(); return t } unpack_float() { let e = this.unpack_uint32(); return (0 == e >> 31 ? 1 : -1) * (8388607 & e | 8388608) * 2 ** ((e >> 23 & 255) - 127 - 23) } unpack_double() { let e = this.unpack_uint32(), t = this.unpack_uint32(), n = (e >> 20 & 2047) - 1023; return (0 == e >> 31 ? 1 : -1) * ((1048575 & e | 1048576) * 2 ** (n - 20) + t * 2 ** (n - 52)) } read(e) { let t = this.index; if (t + e <= this.length) return this.dataView.subarray(t, t + e); throw Error("BinaryPackFailure: read index out of range") } constructor(e) { this.index = 0, this.dataBuffer = e, this.dataView = new Uint8Array(this.dataBuffer), this.length = this.dataBuffer.byteLength } } class a { getBuffer() { return this._bufferBuilder.toArrayBuffer() } pack(e) { if ("string" == typeof e) this.pack_string(e); else if ("number" == typeof e) Math.floor(e) === e ? this.pack_integer(e) : this.pack_double(e); else if ("boolean" == typeof e) !0 === e ? this._bufferBuilder.append(195) : !1 === e && this._bufferBuilder.append(194); else if (void 0 === e) this._bufferBuilder.append(192); else if ("object" == typeof e) { if (null === e) this._bufferBuilder.append(192); else { let t = e.constructor; if (e instanceof Array) { let t = this.pack_array(e); if (t instanceof Promise) return t.then(() => this._bufferBuilder.flush()) } else if (e instanceof ArrayBuffer) this.pack_bin(new Uint8Array(e)); else if ("BYTES_PER_ELEMENT" in e) this.pack_bin(new Uint8Array(e.buffer, e.byteOffset, e.byteLength)); else if (e instanceof Date) this.pack_string(e.toString()); else if (e instanceof Blob) return e.arrayBuffer().then(e => { this.pack_bin(new Uint8Array(e)), this._bufferBuilder.flush() }); else if (t == Object || t.toString().startsWith("class")) { let t = this.pack_object(e); if (t instanceof Promise) return t.then(() => this._bufferBuilder.flush()) } else throw Error(`Type "${t.toString()}" not yet supported`) } } else throw Error(`Type "${typeof e}" not yet supported`); this._bufferBuilder.flush() } pack_bin(e) { let t = e.length; if (t <= 15) this.pack_uint8(160 + t); else if (t <= 65535) this._bufferBuilder.append(218), this.pack_uint16(t); else if (t <= 4294967295) this._bufferBuilder.append(219), this.pack_uint32(t); else throw Error("Invalid length"); this._bufferBuilder.append_buffer(e) } pack_string(e) { let t = this._textEncoder.encode(e), n = t.length; if (n <= 15) this.pack_uint8(176 + n); else if (n <= 65535) this._bufferBuilder.append(216), this.pack_uint16(n); else if (n <= 4294967295) this._bufferBuilder.append(217), this.pack_uint32(n); else throw Error("Invalid length"); this._bufferBuilder.append_buffer(t) } pack_array(e) { let t = e.length; if (t <= 15) this.pack_uint8(144 + t); else if (t <= 65535) this._bufferBuilder.append(220), this.pack_uint16(t); else if (t <= 4294967295) this._bufferBuilder.append(221), this.pack_uint32(t); else throw Error("Invalid length"); let n = r => { if (r < t) { let t = this.pack(e[r]); return t instanceof Promise ? t.then(() => n(r + 1)) : n(r + 1) } }; return n(0) } pack_integer(e) { if (e >= -32 && e <= 127) this._bufferBuilder.append(255 & e); else if (e >= 0 && e <= 255) this._bufferBuilder.append(204), this.pack_uint8(e); else if (e >= -128 && e <= 127) this._bufferBuilder.append(208), this.pack_int8(e); else if (e >= 0 && e <= 65535) this._bufferBuilder.append(205), this.pack_uint16(e); else if (e >= -32768 && e <= 32767) this._bufferBuilder.append(209), this.pack_int16(e); else if (e >= 0 && e <= 4294967295) this._bufferBuilder.append(206), this.pack_uint32(e); else if (e >= -2147483648 && e <= 2147483647) this._bufferBuilder.append(210), this.pack_int32(e); else if (e >= -0x8000000000000000 && e <= 0x7fffffffffffffff) this._bufferBuilder.append(211), this.pack_int64(e); else if (e >= 0 && e <= 18446744073709552e3) this._bufferBuilder.append(207), this.pack_uint64(e); else throw Error("Invalid integer") } pack_double(e) { let t = 0; e < 0 && (t = 1, e = -e); let n = Math.floor(Math.log(e) / Math.LN2), r = Math.floor((e / 2 ** n - 1) * 4503599627370496), i = t << 31 | n + 1023 << 20 | r / 4294967296 & 1048575; this._bufferBuilder.append(203), this.pack_int32(i), this.pack_int32(r % 4294967296) } pack_object(e) { let t = Object.keys(e), n = t.length; if (n <= 15) this.pack_uint8(128 + n); else if (n <= 65535) this._bufferBuilder.append(222), this.pack_uint16(n); else if (n <= 4294967295) this._bufferBuilder.append(223), this.pack_uint32(n); else throw Error("Invalid length"); let r = n => { if (n < t.length) { let i = t[n]; if (e.hasOwnProperty(i)) { this.pack(i); let t = this.pack(e[i]); if (t instanceof Promise) return t.then(() => r(n + 1)) } return r(n + 1) } }; return r(0) } pack_uint8(e) { this._bufferBuilder.append(e) } pack_uint16(e) { this._bufferBuilder.append(e >> 8), this._bufferBuilder.append(255 & e) } pack_uint32(e) { let t = 4294967295 & e; this._bufferBuilder.append((4278190080 & t) >>> 24), this._bufferBuilder.append((16711680 & t) >>> 16), this._bufferBuilder.append((65280 & t) >>> 8), this._bufferBuilder.append(255 & t) } pack_uint64(e) { let t = e / 4294967296, n = e % 4294967296; this._bufferBuilder.append((4278190080 & t) >>> 24), this._bufferBuilder.append((16711680 & t) >>> 16), this._bufferBuilder.append((65280 & t) >>> 8), this._bufferBuilder.append(255 & t), this._bufferBuilder.append((4278190080 & n) >>> 24), this._bufferBuilder.append((16711680 & n) >>> 16), this._bufferBuilder.append((65280 & n) >>> 8), this._bufferBuilder.append(255 & n) } pack_int8(e) { this._bufferBuilder.append(255 & e) } pack_int16(e) { this._bufferBuilder.append((65280 & e) >> 8), this._bufferBuilder.append(255 & e) } pack_int32(e) { this._bufferBuilder.append(e >>> 24 & 255), this._bufferBuilder.append((16711680 & e) >>> 16), this._bufferBuilder.append((65280 & e) >>> 8), this._bufferBuilder.append(255 & e) } pack_int64(e) { let t = Math.floor(e / 4294967296), n = e % 4294967296; this._bufferBuilder.append((4278190080 & t) >>> 24), this._bufferBuilder.append((16711680 & t) >>> 16), this._bufferBuilder.append((65280 & t) >>> 8), this._bufferBuilder.append(255 & t), this._bufferBuilder.append((4278190080 & n) >>> 24), this._bufferBuilder.append((16711680 & n) >>> 16), this._bufferBuilder.append((65280 & n) >>> 8), this._bufferBuilder.append(255 & n) } constructor() { this._bufferBuilder = new r, this._textEncoder = new TextEncoder } } let c = !0, l = !0; function p(e, t, n) { let r = e.match(t); return r && r.length >= n && parseInt(r[n], 10) } function d(e, t, n) { if (!e.RTCPeerConnection) return; let r = e.RTCPeerConnection.prototype, i = r.addEventListener; r.addEventListener = function (e, r) { if (e !== t) return i.apply(this, arguments); let o = e => { let t = n(e); t && (r.handleEvent ? r.handleEvent(t) : r(t)) }; return this._eventMap = this._eventMap || {}, this._eventMap[t] || (this._eventMap[t] = new Map), this._eventMap[t].set(r, o), i.apply(this, [e, o]) }; let o = r.removeEventListener; r.removeEventListener = function (e, n) { if (e !== t || !this._eventMap || !this._eventMap[t] || !this._eventMap[t].has(n)) return o.apply(this, arguments); let r = this._eventMap[t].get(n); return this._eventMap[t].delete(n), 0 === this._eventMap[t].size && delete this._eventMap[t], 0 === Object.keys(this._eventMap).length && delete this._eventMap, o.apply(this, [e, r]) }, Object.defineProperty(r, "on" + t, { get() { return this["_on" + t] }, set(e) { this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]), e && this.addEventListener(t, this["_on" + t] = e) }, enumerable: !0, configurable: !0 }) } function h(e) { return "boolean" != typeof e ? Error("Argument type: " + typeof e + ". Please use a boolean.") : (c = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled") } function u(e) { return "boolean" != typeof e ? Error("Argument type: " + typeof e + ". Please use a boolean.") : (l = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled")) } function f() { "object" != typeof window || c || "undefined" == typeof console || "function" != typeof console.log || console.log.apply(console, arguments) } function m(e, t) { l && console.warn(e + " is deprecated, please use " + t + " instead.") } function g(e) { return "[object Object]" === Object.prototype.toString.call(e) } function y(e, t, n) { let r = n ? "outbound-rtp" : "inbound-rtp", i = new Map; if (null === t) return i; let o = []; return e.forEach(e => { "track" === e.type && e.trackIdentifier === t.id && o.push(e) }), o.forEach(t => { e.forEach(n => { n.type === r && n.trackId === t.id && function e(t, n, r) { !n || r.has(n.id) || (r.set(n.id, n), Object.keys(n).forEach(i => { i.endsWith("Id") ? e(t, t.get(n[i]), r) : i.endsWith("Ids") && n[i].forEach(n => { e(t, t.get(n), r) }) })) }(e, n, i) }) }), i } var _, C, b, v, k, T, S, R, P, w, E, D, x, I, M, O, j = {}; function L(e, t) { let n = e && e.navigator; if (!n.mediaDevices) return; let r = function (e) { if ("object" != typeof e || e.mandatory || e.optional) return e; let t = {}; return Object.keys(e).forEach(n => { if ("require" === n || "advanced" === n || "mediaSource" === n) return; let r = "object" == typeof e[n] ? e[n] : { ideal: e[n] }; void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact); let i = function (e, t) { return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t }; if (void 0 !== r.ideal) { t.optional = t.optional || []; let e = {}; "number" == typeof r.ideal ? (e[i("min", n)] = r.ideal, t.optional.push(e), (e = {})[i("max", n)] = r.ideal) : e[i("", n)] = r.ideal, t.optional.push(e) } void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", n)] = r.exact) : ["min", "max"].forEach(e => { void 0 !== r[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, n)] = r[e]) }) }), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t }, i = function (e, i) { if (t.version >= 61) return i(e); if ((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) { let t = function (e, t, n) { t in e && !(n in e) && (e[n] = e[t], delete e[t]) }; t((e = JSON.parse(JSON.stringify(e))).audio, "autoGainControl", "googAutoGainControl"), t(e.audio, "noiseSuppression", "googNoiseSuppression"), e.audio = r(e.audio) } if (e && "object" == typeof e.video) { let o = e.video.facingMode; o = o && ("object" == typeof o ? o : { ideal: o }); let s = t.version < 66; if (o && ("user" === o.exact || "environment" === o.exact || "user" === o.ideal || "environment" === o.ideal) && !(n.mediaDevices.getSupportedConstraints && n.mediaDevices.getSupportedConstraints().facingMode && !s)) { let t; if (delete e.video.facingMode, "environment" === o.exact || "environment" === o.ideal ? t = ["back", "rear"] : ("user" === o.exact || "user" === o.ideal) && (t = ["front"]), t) return n.mediaDevices.enumerateDevices().then(n => { let s = (n = n.filter(e => "videoinput" === e.kind)).find(e => t.some(t => e.label.toLowerCase().includes(t))); return !s && n.length && t.includes("back") && (s = n[n.length - 1]), s && (e.video.deviceId = o.exact ? { exact: s.deviceId } : { ideal: s.deviceId }), e.video = r(e.video), f("chrome: " + JSON.stringify(e)), i(e) }) } e.video = r(e.video) } return f("chrome: " + JSON.stringify(e)), i(e) }, o = function (e) { return t.version >= 64 ? e : { name: ({ PermissionDeniedError: "NotAllowedError", PermissionDismissedError: "NotAllowedError", InvalidStateError: "NotAllowedError", DevicesNotFoundError: "NotFoundError", ConstraintNotSatisfiedError: "OverconstrainedError", TrackStartError: "NotReadableError", MediaDeviceFailedDueToShutdown: "NotAllowedError", MediaDeviceKillSwitchOn: "NotAllowedError", TabCaptureError: "AbortError", ScreenCaptureError: "AbortError", DeviceCaptureError: "AbortError" })[e.name] || e.name, message: e.message, constraint: e.constraint || e.constraintName, toString() { return this.name + (this.message && ": ") + this.message } } }; if (n.getUserMedia = (function (e, t, r) { i(e, e => { n.webkitGetUserMedia(e, t, e => { r && r(o(e)) }) }) }).bind(n), n.mediaDevices.getUserMedia) { let e = n.mediaDevices.getUserMedia.bind(n.mediaDevices); n.mediaDevices.getUserMedia = function (t) { return i(t, t => e(t).then(e => { if (t.audio && !e.getAudioTracks().length || t.video && !e.getVideoTracks().length) throw e.getTracks().forEach(e => { e.stop() }), new DOMException("", "NotFoundError"); return e }, e => Promise.reject(o(e)))) } } } function A(e) { e.MediaStream = e.MediaStream || e.webkitMediaStream } function B(e) { if ("object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype) d(e, "track", e => (e.transceiver || Object.defineProperty(e, "transceiver", { value: { receiver: e.receiver } }), e)); else { Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", { get() { return this._ontrack }, set(e) { this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e) }, enumerable: !0, configurable: !0 }); let t = e.RTCPeerConnection.prototype.setRemoteDescription; e.RTCPeerConnection.prototype.setRemoteDescription = function () { return this._ontrackpoly || (this._ontrackpoly = t => { t.stream.addEventListener("addtrack", n => { let r; r = e.RTCPeerConnection.prototype.getReceivers ? this.getReceivers().find(e => e.track && e.track.id === n.track.id) : { track: n.track }; let i = new Event("track"); i.track = n.track, i.receiver = r, i.transceiver = { receiver: r }, i.streams = [t.stream], this.dispatchEvent(i) }), t.stream.getTracks().forEach(n => { let r; r = e.RTCPeerConnection.prototype.getReceivers ? this.getReceivers().find(e => e.track && e.track.id === n.id) : { track: n }; let i = new Event("track"); i.track = n, i.receiver = r, i.transceiver = { receiver: r }, i.streams = [t.stream], this.dispatchEvent(i) }) }, this.addEventListener("addstream", this._ontrackpoly)), t.apply(this, arguments) } } } function F(e) { if ("object" == typeof e && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) { let t = function (e, t) { return { track: t, get dtmf() { return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null), this._dtmf }, _pc: e } }; if (!e.RTCPeerConnection.prototype.getSenders) { e.RTCPeerConnection.prototype.getSenders = function () { return this._senders = this._senders || [], this._senders.slice() }; let n = e.RTCPeerConnection.prototype.addTrack; e.RTCPeerConnection.prototype.addTrack = function (e, r) { let i = n.apply(this, arguments); return i || (i = t(this, e), this._senders.push(i)), i }; let r = e.RTCPeerConnection.prototype.removeTrack; e.RTCPeerConnection.prototype.removeTrack = function (e) { r.apply(this, arguments); let t = this._senders.indexOf(e); -1 !== t && this._senders.splice(t, 1) } } let n = e.RTCPeerConnection.prototype.addStream; e.RTCPeerConnection.prototype.addStream = function (e) { this._senders = this._senders || [], n.apply(this, [e]), e.getTracks().forEach(e => { this._senders.push(t(this, e)) }) }; let r = e.RTCPeerConnection.prototype.removeStream; e.RTCPeerConnection.prototype.removeStream = function (e) { this._senders = this._senders || [], r.apply(this, [e]), e.getTracks().forEach(e => { let t = this._senders.find(t => t.track === e); t && this._senders.splice(this._senders.indexOf(t), 1) }) } } else if ("object" == typeof e && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) { let t = e.RTCPeerConnection.prototype.getSenders; e.RTCPeerConnection.prototype.getSenders = function () { let e = t.apply(this, []); return e.forEach(e => e._pc = this), e }, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", { get() { return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf } }) } } function U(e) { if (!("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender && e.RTCRtpReceiver)) return; if (!("getStats" in e.RTCRtpSender.prototype)) { let t = e.RTCPeerConnection.prototype.getSenders; t && (e.RTCPeerConnection.prototype.getSenders = function () { let e = t.apply(this, []); return e.forEach(e => e._pc = this), e }); let n = e.RTCPeerConnection.prototype.addTrack; n && (e.RTCPeerConnection.prototype.addTrack = function () { let e = n.apply(this, arguments); return e._pc = this, e }), e.RTCRtpSender.prototype.getStats = function () { let e = this; return this._pc.getStats().then(t => y(t, e.track, !0)) } } if (!("getStats" in e.RTCRtpReceiver.prototype)) { let t = e.RTCPeerConnection.prototype.getReceivers; t && (e.RTCPeerConnection.prototype.getReceivers = function () { let e = t.apply(this, []); return e.forEach(e => e._pc = this), e }), d(e, "track", e => (e.receiver._pc = e.srcElement, e)), e.RTCRtpReceiver.prototype.getStats = function () { let e = this; return this._pc.getStats().then(t => y(t, e.track, !1)) } } if (!("getStats" in e.RTCRtpSender.prototype && "getStats" in e.RTCRtpReceiver.prototype)) return; let t = e.RTCPeerConnection.prototype.getStats; e.RTCPeerConnection.prototype.getStats = function () { if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) { let e, t, n; let r = arguments[0]; return (this.getSenders().forEach(t => { t.track === r && (e ? n = !0 : e = t) }), this.getReceivers().forEach(e => (e.track === r && (t ? n = !0 : t = e), e.track === r)), n || e && t) ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : e ? e.getStats() : t ? t.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError")) } return t.apply(this, arguments) } } function z(e) { e.RTCPeerConnection.prototype.getLocalStreams = function () { return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map(e => this._shimmedLocalStreams[e][0]) }; let t = e.RTCPeerConnection.prototype.addTrack; e.RTCPeerConnection.prototype.addTrack = function (e, n) { if (!n) return t.apply(this, arguments); this._shimmedLocalStreams = this._shimmedLocalStreams || {}; let r = t.apply(this, arguments); return this._shimmedLocalStreams[n.id] ? -1 === this._shimmedLocalStreams[n.id].indexOf(r) && this._shimmedLocalStreams[n.id].push(r) : this._shimmedLocalStreams[n.id] = [n, r], r }; let n = e.RTCPeerConnection.prototype.addStream; e.RTCPeerConnection.prototype.addStream = function (e) { this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e.getTracks().forEach(e => { if (this.getSenders().find(t => t.track === e)) throw new DOMException("Track already exists.", "InvalidAccessError") }); let t = this.getSenders(); n.apply(this, arguments); let r = this.getSenders().filter(e => -1 === t.indexOf(e)); this._shimmedLocalStreams[e.id] = [e].concat(r) }; let r = e.RTCPeerConnection.prototype.removeStream; e.RTCPeerConnection.prototype.removeStream = function (e) { return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[e.id], r.apply(this, arguments) }; let i = e.RTCPeerConnection.prototype.removeTrack; e.RTCPeerConnection.prototype.removeTrack = function (e) { return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e && Object.keys(this._shimmedLocalStreams).forEach(t => { let n = this._shimmedLocalStreams[t].indexOf(e); -1 !== n && this._shimmedLocalStreams[t].splice(n, 1), 1 === this._shimmedLocalStreams[t].length && delete this._shimmedLocalStreams[t] }), i.apply(this, arguments) } } function N(e, t) { if (!e.RTCPeerConnection) return; if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return z(e); let n = e.RTCPeerConnection.prototype.getLocalStreams; e.RTCPeerConnection.prototype.getLocalStreams = function () { let e = n.apply(this); return this._reverseStreams = this._reverseStreams || {}, e.map(e => this._reverseStreams[e.id]) }; let r = e.RTCPeerConnection.prototype.addStream; e.RTCPeerConnection.prototype.addStream = function (t) { if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, t.getTracks().forEach(e => { if (this.getSenders().find(t => t.track === e)) throw new DOMException("Track already exists.", "InvalidAccessError") }), !this._reverseStreams[t.id]) { let n = new e.MediaStream(t.getTracks()); this._streams[t.id] = n, this._reverseStreams[n.id] = t, t = n } r.apply(this, [t]) }; let i = e.RTCPeerConnection.prototype.removeStream; function o(e, t) { let n = t.sdp; return Object.keys(e._reverseStreams || []).forEach(t => { let r = e._reverseStreams[t], i = e._streams[r.id]; n = n.replace(RegExp(i.id, "g"), r.id) }), new RTCSessionDescription({ type: t.type, sdp: n }) } e.RTCPeerConnection.prototype.removeStream = function (e) { this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, i.apply(this, [this._streams[e.id] || e]), delete this._reverseStreams[this._streams[e.id] ? this._streams[e.id].id : e.id], delete this._streams[e.id] }, e.RTCPeerConnection.prototype.addTrack = function (t, n) { if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError"); let r = [].slice.call(arguments, 1); if (1 !== r.length || !r[0].getTracks().find(e => e === t)) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError"); if (this.getSenders().find(e => e.track === t)) throw new DOMException("Track already exists.", "InvalidAccessError"); this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}; let i = this._streams[n.id]; if (i) i.addTrack(t), Promise.resolve().then(() => { this.dispatchEvent(new Event("negotiationneeded")) }); else { let r = new e.MediaStream([t]); this._streams[n.id] = r, this._reverseStreams[r.id] = n, this.addStream(r) } return this.getSenders().find(e => e.track === t) }, ["createOffer", "createAnswer"].forEach(function (t) { let n = e.RTCPeerConnection.prototype[t]; e.RTCPeerConnection.prototype[t] = ({ [t]() { let e = arguments, t = arguments.length && "function" == typeof arguments[0]; return t ? n.apply(this, [t => { let n = o(this, t); e[0].apply(null, [n]) }, t => { e[1] && e[1].apply(null, t) }, arguments[2]]) : n.apply(this, arguments).then(e => o(this, e)) } })[t] }); let s = e.RTCPeerConnection.prototype.setLocalDescription; e.RTCPeerConnection.prototype.setLocalDescription = function () { var e, t; let n; return arguments.length && arguments[0].type && (arguments[0] = (e = this, t = arguments[0], n = t.sdp, Object.keys(e._reverseStreams || []).forEach(t => { let r = e._reverseStreams[t], i = e._streams[r.id]; n = n.replace(RegExp(r.id, "g"), i.id) }), new RTCSessionDescription({ type: t.type, sdp: n }))), s.apply(this, arguments) }; let a = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription"); Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", { get() { let e = a.get.apply(this); return "" === e.type ? e : o(this, e) } }), e.RTCPeerConnection.prototype.removeTrack = function (e) { let t; if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError"); if (!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError"); if (e._pc !== this) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError"); this._streams = this._streams || {}, Object.keys(this._streams).forEach(n => { this._streams[n].getTracks().find(t => e.track === t) && (t = this._streams[n]) }), t && (1 === t.getTracks().length ? this.removeStream(this._reverseStreams[t.id]) : t.removeTrack(e.track), this.dispatchEvent(new Event("negotiationneeded"))) } } function $(e, t) { !e.RTCPeerConnection && e.webkitRTCPeerConnection && (e.RTCPeerConnection = e.webkitRTCPeerConnection), e.RTCPeerConnection && t.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (t) { let n = e.RTCPeerConnection.prototype[t]; e.RTCPeerConnection.prototype[t] = ({ [t]() { return arguments[0] = new ("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments) } })[t] }) } function J(e, t) { d(e, "negotiationneeded", e => { let n = e.target; if (!(t.version < 72) && (!n.getConfiguration || "plan-b" !== n.getConfiguration().sdpSemantics) || "stable" === n.signalingState) return e }) } e(j, "shimMediaStream", () => A), e(j, "shimOnTrack", () => B), e(j, "shimGetSendersWithDtmf", () => F), e(j, "shimSenderReceiverGetStats", () => U), e(j, "shimAddTrackRemoveTrackWithNative", () => z), e(j, "shimAddTrackRemoveTrack", () => N), e(j, "shimPeerConnection", () => $), e(j, "fixNegotiationNeeded", () => J), e(j, "shimGetUserMedia", () => L); var V = {}; function G(e, t) { let n = e && e.navigator, r = e && e.MediaStreamTrack; if (n.getUserMedia = function (e, t, r) { m("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n.mediaDevices.getUserMedia(e).then(t, r) }, !(t.version > 55 && "autoGainControl" in n.mediaDevices.getSupportedConstraints())) { let e = function (e, t, n) { t in e && !(n in e) && (e[n] = e[t], delete e[t]) }, t = n.mediaDevices.getUserMedia.bind(n.mediaDevices); if (n.mediaDevices.getUserMedia = function (n) { return "object" == typeof n && "object" == typeof n.audio && (e((n = JSON.parse(JSON.stringify(n))).audio, "autoGainControl", "mozAutoGainControl"), e(n.audio, "noiseSuppression", "mozNoiseSuppression")), t(n) }, r && r.prototype.getSettings) { let t = r.prototype.getSettings; r.prototype.getSettings = function () { let n = t.apply(this, arguments); return e(n, "mozAutoGainControl", "autoGainControl"), e(n, "mozNoiseSuppression", "noiseSuppression"), n } } if (r && r.prototype.applyConstraints) { let t = r.prototype.applyConstraints; r.prototype.applyConstraints = function (n) { return "audio" === this.kind && "object" == typeof n && (e(n = JSON.parse(JSON.stringify(n)), "autoGainControl", "mozAutoGainControl"), e(n, "noiseSuppression", "mozNoiseSuppression")), t.apply(this, [n]) } } } } function W(e, t) { e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || !e.navigator.mediaDevices || (e.navigator.mediaDevices.getDisplayMedia = function (n) { if (!(n && n.video)) { let e = new DOMException("getDisplayMedia without video constraints is undefined"); return e.name = "NotFoundError", e.code = 8, Promise.reject(e) } return !0 === n.video ? n.video = { mediaSource: t } : n.video.mediaSource = t, e.navigator.mediaDevices.getUserMedia(n) }) } function H(e) { "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", { get() { return { receiver: this.receiver } } }) } function Y(e, t) { if ("object" != typeof e || !(e.RTCPeerConnection || e.mozRTCPeerConnection)) return; !e.RTCPeerConnection && e.mozRTCPeerConnection && (e.RTCPeerConnection = e.mozRTCPeerConnection), t.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (t) { let n = e.RTCPeerConnection.prototype[t]; e.RTCPeerConnection.prototype[t] = ({ [t]() { return arguments[0] = new ("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments) } })[t] }); let n = { inboundrtp: "inbound-rtp", outboundrtp: "outbound-rtp", candidatepair: "candidate-pair", localcandidate: "local-candidate", remotecandidate: "remote-candidate" }, r = e.RTCPeerConnection.prototype.getStats; e.RTCPeerConnection.prototype.getStats = function () { let [e, i, o] = arguments; return r.apply(this, [e || null]).then(e => { if (t.version < 53 && !i) try { e.forEach(e => { e.type = n[e.type] || e.type }) } catch (t) { if ("TypeError" !== t.name) throw t; e.forEach((t, r) => { e.set(r, Object.assign({}, t, { type: n[t.type] || t.type })) }) } return e }).then(i, o) } } function K(e) { if (!("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender) || e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype) return; let t = e.RTCPeerConnection.prototype.getSenders; t && (e.RTCPeerConnection.prototype.getSenders = function () { let e = t.apply(this, []); return e.forEach(e => e._pc = this), e }); let n = e.RTCPeerConnection.prototype.addTrack; n && (e.RTCPeerConnection.prototype.addTrack = function () { let e = n.apply(this, arguments); return e._pc = this, e }), e.RTCRtpSender.prototype.getStats = function () { return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map) } } function X(e) { if (!("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender) || e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype) return; let t = e.RTCPeerConnection.prototype.getReceivers; t && (e.RTCPeerConnection.prototype.getReceivers = function () { let e = t.apply(this, []); return e.forEach(e => e._pc = this), e }), d(e, "track", e => (e.receiver._pc = e.srcElement, e)), e.RTCRtpReceiver.prototype.getStats = function () { return this._pc.getStats(this.track) } } function q(e) { !e.RTCPeerConnection || "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function (e) { m("removeStream", "removeTrack"), this.getSenders().forEach(t => { t.track && e.getTracks().includes(t.track) && this.removeTrack(t) }) }) } function Q(e) { e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel) } function Z(e) { if (!("object" == typeof e && e.RTCPeerConnection)) return; let t = e.RTCPeerConnection.prototype.addTransceiver; t && (e.RTCPeerConnection.prototype.addTransceiver = function () { this.setParametersPromises = []; let e = arguments[1] && arguments[1].sendEncodings; void 0 === e && (e = []); let n = (e = [...e]).length > 0; n && e.forEach(e => { if ("rid" in e && !/^[a-z0-9]{0,16}$/i.test(e.rid)) throw TypeError("Invalid RID value provided."); if ("scaleResolutionDownBy" in e && !(parseFloat(e.scaleResolutionDownBy) >= 1)) throw RangeError("scale_resolution_down_by must be >= 1.0"); if ("maxFramerate" in e && !(parseFloat(e.maxFramerate) >= 0)) throw RangeError("max_framerate must be >= 0.0") }); let r = t.apply(this, arguments); if (n) { let { sender: t } = r, n = t.getParameters(); "encodings" in n && (1 !== n.encodings.length || 0 !== Object.keys(n.encodings[0]).length) || (n.encodings = e, t.sendEncodings = e, this.setParametersPromises.push(t.setParameters(n).then(() => { delete t.sendEncodings }).catch(() => { delete t.sendEncodings }))) } return r }) } function ee(e) { if (!("object" == typeof e && e.RTCRtpSender)) return; let t = e.RTCRtpSender.prototype.getParameters; t && (e.RTCRtpSender.prototype.getParameters = function () { let e = t.apply(this, arguments); return "encodings" in e || (e.encodings = [].concat(this.sendEncodings || [{}])), e }) } function et(e) { if (!("object" == typeof e && e.RTCPeerConnection)) return; let t = e.RTCPeerConnection.prototype.createOffer; e.RTCPeerConnection.prototype.createOffer = function () { return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(() => t.apply(this, arguments)).finally(() => { this.setParametersPromises = [] }) : t.apply(this, arguments) } } function en(e) { if (!("object" == typeof e && e.RTCPeerConnection)) return; let t = e.RTCPeerConnection.prototype.createAnswer; e.RTCPeerConnection.prototype.createAnswer = function () { return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(() => t.apply(this, arguments)).finally(() => { this.setParametersPromises = [] }) : t.apply(this, arguments) } } e(V, "shimOnTrack", () => H), e(V, "shimPeerConnection", () => Y), e(V, "shimSenderGetStats", () => K), e(V, "shimReceiverGetStats", () => X), e(V, "shimRemoveStream", () => q), e(V, "shimRTCDataChannel", () => Q), e(V, "shimAddTransceiver", () => Z), e(V, "shimGetParameters", () => ee), e(V, "shimCreateOffer", () => et), e(V, "shimCreateAnswer", () => en), e(V, "shimGetUserMedia", () => G), e(V, "shimGetDisplayMedia", () => W); var er = {}; function ei(e) { if ("object" == typeof e && e.RTCPeerConnection) { if ("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function () { return this._localStreams || (this._localStreams = []), this._localStreams }), !("addStream" in e.RTCPeerConnection.prototype)) { let t = e.RTCPeerConnection.prototype.addTrack; e.RTCPeerConnection.prototype.addStream = function (e) { this._localStreams || (this._localStreams = []), this._localStreams.includes(e) || this._localStreams.push(e), e.getAudioTracks().forEach(n => t.call(this, n, e)), e.getVideoTracks().forEach(n => t.call(this, n, e)) }, e.RTCPeerConnection.prototype.addTrack = function (e, ...n) { return n && n.forEach(e => { this._localStreams ? this._localStreams.includes(e) || this._localStreams.push(e) : this._localStreams = [e] }), t.apply(this, arguments) } } "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function (e) { this._localStreams || (this._localStreams = []); let t = this._localStreams.indexOf(e); if (-1 === t) return; this._localStreams.splice(t, 1); let n = e.getTracks(); this.getSenders().forEach(e => { n.includes(e.track) && this.removeTrack(e) }) }) } } function eo(e) { if ("object" == typeof e && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function () { return this._remoteStreams ? this._remoteStreams : [] }), !("onaddstream" in e.RTCPeerConnection.prototype))) { Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", { get() { return this._onaddstream }, set(e) { this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e), this.addEventListener("track", this._onaddstreampoly = e => { e.streams.forEach(e => { if (this._remoteStreams || (this._remoteStreams = []), this._remoteStreams.includes(e)) return; this._remoteStreams.push(e); let t = new Event("addstream"); t.stream = e, this.dispatchEvent(t) }) }) } }); let t = e.RTCPeerConnection.prototype.setRemoteDescription; e.RTCPeerConnection.prototype.setRemoteDescription = function () { let e = this; return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function (t) { t.streams.forEach(t => { if (e._remoteStreams || (e._remoteStreams = []), e._remoteStreams.indexOf(t) >= 0) return; e._remoteStreams.push(t); let n = new Event("addstream"); n.stream = t, e.dispatchEvent(n) }) }), t.apply(e, arguments) } } } function es(e) { if ("object" != typeof e || !e.RTCPeerConnection) return; let t = e.RTCPeerConnection.prototype, n = t.createOffer, r = t.createAnswer, i = t.setLocalDescription, o = t.setRemoteDescription, s = t.addIceCandidate; t.createOffer = function (e, t) { let r = arguments.length >= 2 ? arguments[2] : arguments[0], i = n.apply(this, [r]); return t ? (i.then(e, t), Promise.resolve()) : i }, t.createAnswer = function (e, t) { let n = arguments.length >= 2 ? arguments[2] : arguments[0], i = r.apply(this, [n]); return t ? (i.then(e, t), Promise.resolve()) : i }; let a = function (e, t, n) { let r = i.apply(this, [e]); return n ? (r.then(t, n), Promise.resolve()) : r }; t.setLocalDescription = a, a = function (e, t, n) { let r = o.apply(this, [e]); return n ? (r.then(t, n), Promise.resolve()) : r }, t.setRemoteDescription = a, a = function (e, t, n) { let r = s.apply(this, [e]); return n ? (r.then(t, n), Promise.resolve()) : r }, t.addIceCandidate = a } function ea(e) { let t = e && e.navigator; if (t.mediaDevices && t.mediaDevices.getUserMedia) { let e = t.mediaDevices, n = e.getUserMedia.bind(e); t.mediaDevices.getUserMedia = e => n(ec(e)) } !t.getUserMedia && t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = (function (e, n, r) { t.mediaDevices.getUserMedia(e).then(n, r) }).bind(t)) } function ec(e) { return e && void 0 !== e.video ? Object.assign({}, e, { video: function e(t) { return g(t) ? Object.keys(t).reduce(function (n, r) { let i = g(t[r]), o = i ? e(t[r]) : t[r], s = i && !Object.keys(o).length; return void 0 === o || s ? n : Object.assign(n, { [r]: o }) }, {}) : t }(e.video) }) : e } function el(e) { if (!e.RTCPeerConnection) return; let t = e.RTCPeerConnection; e.RTCPeerConnection = function (e, n) { if (e && e.iceServers) { let t = []; for (let n = 0; n < e.iceServers.length; n++) { let r = e.iceServers[n]; void 0 === r.urls && r.url ? (m("RTCIceServer.url", "RTCIceServer.urls"), (r = JSON.parse(JSON.stringify(r))).urls = r.url, delete r.url, t.push(r)) : t.push(e.iceServers[n]) } e.iceServers = t } return new t(e, n) }, e.RTCPeerConnection.prototype = t.prototype, "generateCertificate" in t && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", { get: () => t.generateCertificate }) } function ep(e) { "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", { get() { return { receiver: this.receiver } } }) } function ed(e) { let t = e.RTCPeerConnection.prototype.createOffer; e.RTCPeerConnection.prototype.createOffer = function (e) { if (e) { void 0 !== e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio); let t = this.getTransceivers().find(e => "audio" === e.receiver.track.kind); !1 === e.offerToReceiveAudio && t ? "sendrecv" === t.direction ? t.setDirection ? t.setDirection("sendonly") : t.direction = "sendonly" : "recvonly" === t.direction && (t.setDirection ? t.setDirection("inactive") : t.direction = "inactive") : !0 !== e.offerToReceiveAudio || t || this.addTransceiver("audio", { direction: "recvonly" }), void 0 !== e.offerToReceiveVideo && (e.offerToReceiveVideo = !!e.offerToReceiveVideo); let n = this.getTransceivers().find(e => "video" === e.receiver.track.kind); !1 === e.offerToReceiveVideo && n ? "sendrecv" === n.direction ? n.setDirection ? n.setDirection("sendonly") : n.direction = "sendonly" : "recvonly" === n.direction && (n.setDirection ? n.setDirection("inactive") : n.direction = "inactive") : !0 !== e.offerToReceiveVideo || n || this.addTransceiver("video", { direction: "recvonly" }) } return t.apply(this, arguments) } } function eh(e) { "object" != typeof e || e.AudioContext || (e.AudioContext = e.webkitAudioContext) } e(er, "shimLocalStreamsAPI", () => ei), e(er, "shimRemoteStreamsAPI", () => eo), e(er, "shimCallbacksAPI", () => es), e(er, "shimGetUserMedia", () => ea), e(er, "shimConstraints", () => ec), e(er, "shimRTCIceServerUrls", () => el), e(er, "shimTrackEventTransceiver", () => ep), e(er, "shimCreateOfferLegacy", () => ed), e(er, "shimAudioContext", () => eh); var eu = {}; e(eu, "shimRTCIceCandidate", () => eg), e(eu, "shimRTCIceCandidateRelayProtocol", () => ey), e(eu, "shimMaxMessageSize", () => e_), e(eu, "shimSendThrowTypeError", () => eC), e(eu, "shimConnectionState", () => eb), e(eu, "removeExtmapAllowMixed", () => ev), e(eu, "shimAddIceCandidateNullOrEmpty", () => ek), e(eu, "shimParameterlessSetLocalDescription", () => eT); var ef = {}; let em = {}; function eg(e) { if (!e.RTCIceCandidate || e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype) return; let n = e.RTCIceCandidate; e.RTCIceCandidate = function (e) { if ("object" == typeof e && e.candidate && 0 === e.candidate.indexOf("a=") && ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substring(2)), e.candidate && e.candidate.length) { let r = new n(e), i = t(ef).parseCandidate(e.candidate); for (let e in i) e in r || Object.defineProperty(r, e, { value: i[e] }); return r.toJSON = function () { return { candidate: r.candidate, sdpMid: r.sdpMid, sdpMLineIndex: r.sdpMLineIndex, usernameFragment: r.usernameFragment } }, r } return new n(e) }, e.RTCIceCandidate.prototype = n.prototype, d(e, "icecandidate", t => (t.candidate && Object.defineProperty(t, "candidate", { value: new e.RTCIceCandidate(t.candidate), writable: "false" }), t)) } function ey(e) { !e.RTCIceCandidate || e.RTCIceCandidate && "relayProtocol" in e.RTCIceCandidate.prototype || d(e, "icecandidate", e => { if (e.candidate) { let n = t(ef).parseCandidate(e.candidate.candidate); "relay" === n.type && (e.candidate.relayProtocol = ({ 0: "tls", 1: "tcp", 2: "udp" })[n.priority >> 24]) } return e }) } function e_(e, n) { if (!e.RTCPeerConnection) return; "sctp" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", { get() { return void 0 === this._sctp ? null : this._sctp } }); let r = function (e) { if (!e || !e.sdp) return !1; let n = t(ef).splitSections(e.sdp); return n.shift(), n.some(e => { let n = t(ef).parseMLine(e); return n && "application" === n.kind && -1 !== n.protocol.indexOf("SCTP") }) }, i = function (e) { let t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/); if (null === t || t.length < 2) return -1; let n = parseInt(t[1], 10); return n != n ? -1 : n }, o = function (e) { let t = 65536; return "firefox" === n.browser && (t = n.version < 57 ? -1 === e ? 16384 : 2147483637 : n.version < 60 ? 57 === n.version ? 65535 : 65536 : 2147483637), t }, s = function (e, r) { let i = 65536; "firefox" === n.browser && 57 === n.version && (i = 65535); let o = t(ef).matchPrefix(e.sdp, "a=max-message-size:"); return o.length > 0 ? i = parseInt(o[0].substring(19), 10) : "firefox" === n.browser && -1 !== r && (i = 2147483637), i }, a = e.RTCPeerConnection.prototype.setRemoteDescription; e.RTCPeerConnection.prototype.setRemoteDescription = function () { if (this._sctp = null, "chrome" === n.browser && n.version >= 76) { let { sdpSemantics: e } = this.getConfiguration(); "plan-b" === e && Object.defineProperty(this, "sctp", { get() { return void 0 === this._sctp ? null : this._sctp }, enumerable: !0, configurable: !0 }) } if (r(arguments[0])) { let e; let t = i(arguments[0]), n = o(t), r = s(arguments[0], t); e = 0 === n && 0 === r ? Number.POSITIVE_INFINITY : 0 === n || 0 === r ? Math.max(n, r) : Math.min(n, r); let a = {}; Object.defineProperty(a, "maxMessageSize", { get: () => e }), this._sctp = a } return a.apply(this, arguments) } } function eC(e) { if (!(e.RTCPeerConnection && "createDataChannel" in e.RTCPeerConnection.prototype)) return; function t(e, t) { let n = e.send; e.send = function () { let r = arguments[0], i = r.length || r.size || r.byteLength; if ("open" === e.readyState && t.sctp && i > t.sctp.maxMessageSize) throw TypeError("Message too large (can send a maximum of " + t.sctp.maxMessageSize + " bytes)"); return n.apply(e, arguments) } } let n = e.RTCPeerConnection.prototype.createDataChannel; e.RTCPeerConnection.prototype.createDataChannel = function () { let e = n.apply(this, arguments); return t(e, this), e }, d(e, "datachannel", e => (t(e.channel, e.target), e)) } function eb(e) { if (!e.RTCPeerConnection || "connectionState" in e.RTCPeerConnection.prototype) return; let t = e.RTCPeerConnection.prototype; Object.defineProperty(t, "connectionState", { get() { return ({ completed: "connected", checking: "connecting" })[this.iceConnectionState] || this.iceConnectionState }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "onconnectionstatechange", { get() { return this._onconnectionstatechange || null }, set(e) { this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), e && this.addEventListener("connectionstatechange", this._onconnectionstatechange = e) }, enumerable: !0, configurable: !0 }), ["setLocalDescription", "setRemoteDescription"].forEach(e => { let n = t[e]; t[e] = function () { return this._connectionstatechangepoly || (this._connectionstatechangepoly = e => { let t = e.target; if (t._lastConnectionState !== t.connectionState) { t._lastConnectionState = t.connectionState; let n = new Event("connectionstatechange", e); t.dispatchEvent(n) } return e }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n.apply(this, arguments) } }) } function ev(e, t) { if (!e.RTCPeerConnection || "chrome" === t.browser && t.version >= 71 || "safari" === t.browser && t.version >= 605) return; let n = e.RTCPeerConnection.prototype.setRemoteDescription; e.RTCPeerConnection.prototype.setRemoteDescription = function (t) { if (t && t.sdp && -1 !== t.sdp.indexOf("\na=extmap-allow-mixed")) { let n = t.sdp.split("\n").filter(e => "a=extmap-allow-mixed" !== e.trim()).join("\n"); e.RTCSessionDescription && t instanceof e.RTCSessionDescription ? arguments[0] = new e.RTCSessionDescription({ type: t.type, sdp: n }) : t.sdp = n } return n.apply(this, arguments) } } function ek(e, t) { if (!(e.RTCPeerConnection && e.RTCPeerConnection.prototype)) return; let n = e.RTCPeerConnection.prototype.addIceCandidate; n && 0 !== n.length && (e.RTCPeerConnection.prototype.addIceCandidate = function () { return arguments[0] ? ("chrome" === t.browser && t.version < 78 || "firefox" === t.browser && t.version < 68 || "safari" === t.browser) && arguments[0] && "" === arguments[0].candidate ? Promise.resolve() : n.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve()) }) } function eT(e, t) { if (!(e.RTCPeerConnection && e.RTCPeerConnection.prototype)) return; let n = e.RTCPeerConnection.prototype.setLocalDescription; n && 0 !== n.length && (e.RTCPeerConnection.prototype.setLocalDescription = function () { let e = arguments[0] || {}; if ("object" != typeof e || e.type && e.sdp) return n.apply(this, arguments); if (!(e = { type: e.type, sdp: e.sdp }).type) switch (this.signalingState) { case "stable": case "have-local-offer": case "have-remote-pranswer": e.type = "offer"; break; default: e.type = "answer" }return e.sdp || "offer" !== e.type && "answer" !== e.type ? n.apply(this, [e]) : ("offer" === e.type ? this.createOffer : this.createAnswer).apply(this).then(e => n.apply(this, [e])) }) } em.generateIdentifier = function () { return Math.random().toString(36).substring(2, 12) }, em.localCName = em.generateIdentifier(), em.splitLines = function (e) { return e.trim().split("\n").map(e => e.trim()) }, em.splitSections = function (e) { return e.split("\nm=").map((e, t) => (t > 0 ? "m=" + e : e).trim() + "\r\n") }, em.getDescription = function (e) { let t = em.splitSections(e); return t && t[0] }, em.getMediaSections = function (e) { let t = em.splitSections(e); return t.shift(), t }, em.matchPrefix = function (e, t) { return em.splitLines(e).filter(e => 0 === e.indexOf(t)) }, em.parseCandidate = function (e) { let t; let n = { foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0], component: { 1: "rtp", 2: "rtcp" }[t[1]] || t[1], protocol: t[2].toLowerCase(), priority: parseInt(t[3], 10), ip: t[4], address: t[4], port: parseInt(t[5], 10), type: t[7] }; for (let e = 8; e < t.length; e += 2)switch (t[e]) { case "raddr": n.relatedAddress = t[e + 1]; break; case "rport": n.relatedPort = parseInt(t[e + 1], 10); break; case "tcptype": n.tcpType = t[e + 1]; break; case "ufrag": n.ufrag = t[e + 1], n.usernameFragment = t[e + 1]; break; default: void 0 === n[t[e]] && (n[t[e]] = t[e + 1]) }return n }, em.writeCandidate = function (e) { let t = []; t.push(e.foundation); let n = e.component; "rtp" === n ? t.push(1) : "rtcp" === n ? t.push(2) : t.push(n), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.address || e.ip), t.push(e.port); let r = e.type; return t.push("typ"), t.push(r), "host" !== r && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ") }, em.parseIceOptions = function (e) { return e.substring(14).split(" ") }, em.parseRtpMap = function (e) { let t = e.substring(9).split(" "), n = { payloadType: parseInt(t.shift(), 10) }; return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.channels = 3 === t.length ? parseInt(t[2], 10) : 1, n.numChannels = n.channels, n }, em.writeRtpMap = function (e) { let t = e.payloadType; void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType); let n = e.channels || e.numChannels || 1; return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== n ? "/" + n : "") + "\r\n" }, em.parseExtmap = function (e) { let t = e.substring(9).split(" "); return { id: parseInt(t[0], 10), direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv", uri: t[1], attributes: t.slice(2).join(" ") } }, em.writeExtmap = function (e) { return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") + " " + e.uri + (e.attributes ? " " + e.attributes : "") + "\r\n" }, em.parseFmtp = function (e) { let t; let n = {}, r = e.substring(e.indexOf(" ") + 1).split(";"); for (let e = 0; e < r.length; e++)n[(t = r[e].trim().split("="))[0].trim()] = t[1]; return n }, em.writeFmtp = function (e) { let t = "", n = e.payloadType; if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) { let r = []; Object.keys(e.parameters).forEach(t => { void 0 !== e.parameters[t] ? r.push(t + "=" + e.parameters[t]) : r.push(t) }), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n" } return t }, em.parseRtcpFb = function (e) { let t = e.substring(e.indexOf(" ") + 1).split(" "); return { type: t.shift(), parameter: t.join(" ") } }, em.writeRtcpFb = function (e) { let t = "", n = e.payloadType; return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(e => { t += "a=rtcp-fb:" + n + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n" }), t }, em.parseSsrcMedia = function (e) { let t = e.indexOf(" "), n = { ssrc: parseInt(e.substring(7, t), 10) }, r = e.indexOf(":", t); return r > -1 ? (n.attribute = e.substring(t + 1, r), n.value = e.substring(r + 1)) : n.attribute = e.substring(t + 1), n }, em.parseSsrcGroup = function (e) { let t = e.substring(13).split(" "); return { semantics: t.shift(), ssrcs: t.map(e => parseInt(e, 10)) } }, em.getMid = function (e) { let t = em.matchPrefix(e, "a=mid:")[0]; if (t) return t.substring(6) }, em.parseFingerprint = function (e) { let t = e.substring(14).split(" "); return { algorithm: t[0].toLowerCase(), value: t[1].toUpperCase() } }, em.getDtlsParameters = function (e, t) { return { role: "auto", fingerprints: em.matchPrefix(e + t, "a=fingerprint:").map(em.parseFingerprint) } }, em.writeDtlsParameters = function (e, t) { let n = "a=setup:" + t + "\r\n"; return e.fingerprints.forEach(e => { n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n" }), n }, em.parseCryptoLine = function (e) { let t = e.substring(9).split(" "); return { tag: parseInt(t[0], 10), cryptoSuite: t[1], keyParams: t[2], sessionParams: t.slice(3) } }, em.writeCryptoLine = function (e) { return "a=crypto:" + e.tag + " " + e.cryptoSuite + " " + ("object" == typeof e.keyParams ? em.writeCryptoKeyParams(e.keyParams) : e.keyParams) + (e.sessionParams ? " " + e.sessionParams.join(" ") : "") + "\r\n" }, em.parseCryptoKeyParams = function (e) { if (0 !== e.indexOf("inline:")) return null; let t = e.substring(7).split("|"); return { keyMethod: "inline", keySalt: t[0], lifeTime: t[1], mkiValue: t[2] ? t[2].split(":")[0] : void 0, mkiLength: t[2] ? t[2].split(":")[1] : void 0 } }, em.writeCryptoKeyParams = function (e) { return e.keyMethod + ":" + e.keySalt + (e.lifeTime ? "|" + e.lifeTime : "") + (e.mkiValue && e.mkiLength ? "|" + e.mkiValue + ":" + e.mkiLength : "") }, em.getCryptoParameters = function (e, t) { return em.matchPrefix(e + t, "a=crypto:").map(em.parseCryptoLine) }, em.getIceParameters = function (e, t) { let n = em.matchPrefix(e + t, "a=ice-ufrag:")[0], r = em.matchPrefix(e + t, "a=ice-pwd:")[0]; return n && r ? { usernameFragment: n.substring(12), password: r.substring(10) } : null }, em.writeIceParameters = function (e) { let t = "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"; return e.iceLite && (t += "a=ice-lite\r\n"), t }, em.parseRtpParameters = function (e) { let t = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] }, n = em.splitLines(e)[0].split(" "); t.profile = n[2]; for (let r = 3; r < n.length; r++) { let i = n[r], o = em.matchPrefix(e, "a=rtpmap:" + i + " ")[0]; if (o) { let n = em.parseRtpMap(o), r = em.matchPrefix(e, "a=fmtp:" + i + " "); switch (n.parameters = r.length ? em.parseFmtp(r[0]) : {}, n.rtcpFeedback = em.matchPrefix(e, "a=rtcp-fb:" + i + " ").map(em.parseRtcpFb), t.codecs.push(n), n.name.toUpperCase()) { case "RED": case "ULPFEC": t.fecMechanisms.push(n.name.toUpperCase()) } } } em.matchPrefix(e, "a=extmap:").forEach(e => { t.headerExtensions.push(em.parseExtmap(e)) }); let r = em.matchPrefix(e, "a=rtcp-fb:* ").map(em.parseRtcpFb); return t.codecs.forEach(e => { r.forEach(t => { e.rtcpFeedback.find(e => e.type === t.type && e.parameter === t.parameter) || e.rtcpFeedback.push(t) }) }), t }, em.writeRtpDescription = function (e, t) { let n = ""; n += "m=" + e + " " + (t.codecs.length > 0 ? "9" : "0") + " " + (t.profile || "UDP/TLS/RTP/SAVPF") + " " + t.codecs.map(e => void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType).join(" ") + "\r\nc=IN IP4 0.0.0.0\r\na=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(e => { n += em.writeRtpMap(e) + em.writeFmtp(e) + em.writeRtcpFb(e) }); let r = 0; return t.codecs.forEach(e => { e.maxptime > r && (r = e.maxptime) }), r > 0 && (n += "a=maxptime:" + r + "\r\n"), t.headerExtensions && t.headerExtensions.forEach(e => { n += em.writeExtmap(e) }), n }, em.parseRtpEncodingParameters = function (e) { let t; let n = [], r = em.parseRtpParameters(e), i = -1 !== r.fecMechanisms.indexOf("RED"), o = -1 !== r.fecMechanisms.indexOf("ULPFEC"), s = em.matchPrefix(e, "a=ssrc:").map(e => em.parseSsrcMedia(e)).filter(e => "cname" === e.attribute), a = s.length > 0 && s[0].ssrc, c = em.matchPrefix(e, "a=ssrc-group:FID").map(e => e.substring(17).split(" ").map(e => parseInt(e, 10))); c.length > 0 && c[0].length > 1 && c[0][0] === a && (t = c[0][1]), r.codecs.forEach(e => { if ("RTX" === e.name.toUpperCase() && e.parameters.apt) { let r = { ssrc: a, codecPayloadType: parseInt(e.parameters.apt, 10) }; a && t && (r.rtx = { ssrc: t }), n.push(r), i && ((r = JSON.parse(JSON.stringify(r))).fec = { ssrc: a, mechanism: o ? "red+ulpfec" : "red" }, n.push(r)) } }), 0 === n.length && a && n.push({ ssrc: a }); let l = em.matchPrefix(e, "b="); return l.length && (l = 0 === l[0].indexOf("b=TIAS:") ? parseInt(l[0].substring(7), 10) : 0 === l[0].indexOf("b=AS:") ? 950 * parseInt(l[0].substring(5), 10) - 16e3 : void 0, n.forEach(e => { e.maxBitrate = l })), n }, em.parseRtcpParameters = function (e) { let t = {}, n = em.matchPrefix(e, "a=ssrc:").map(e => em.parseSsrcMedia(e)).filter(e => "cname" === e.attribute)[0]; n && (t.cname = n.value, t.ssrc = n.ssrc); let r = em.matchPrefix(e, "a=rtcp-rsize"); t.reducedSize = r.length > 0, t.compound = 0 === r.length; let i = em.matchPrefix(e, "a=rtcp-mux"); return t.mux = i.length > 0, t }, em.writeRtcpParameters = function (e) { let t = ""; return e.reducedSize && (t += "a=rtcp-rsize\r\n"), e.mux && (t += "a=rtcp-mux\r\n"), void 0 !== e.ssrc && e.cname && (t += "a=ssrc:" + e.ssrc + " cname:" + e.cname + "\r\n"), t }, em.parseMsid = function (e) { let t; let n = em.matchPrefix(e, "a=msid:"); if (1 === n.length) return { stream: (t = n[0].substring(7).split(" "))[0], track: t[1] }; let r = em.matchPrefix(e, "a=ssrc:").map(e => em.parseSsrcMedia(e)).filter(e => "msid" === e.attribute); if (r.length > 0) return { stream: (t = r[0].value.split(" "))[0], track: t[1] } }, em.parseSctpDescription = function (e) { let t; let n = em.parseMLine(e), r = em.matchPrefix(e, "a=max-message-size:"); r.length > 0 && (t = parseInt(r[0].substring(19), 10)), isNaN(t) && (t = 65536); let i = em.matchPrefix(e, "a=sctp-port:"); if (i.length > 0) return { port: parseInt(i[0].substring(12), 10), protocol: n.fmt, maxMessageSize: t }; let o = em.matchPrefix(e, "a=sctpmap:"); if (o.length > 0) { let e = o[0].substring(10).split(" "); return { port: parseInt(e[0], 10), protocol: e[1], maxMessageSize: t } } }, em.writeSctpDescription = function (e, t) { let n = []; return n = "DTLS/SCTP" !== e.protocol ? ["m=" + e.kind + " 9 " + e.protocol + " " + t.protocol + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctp-port:" + t.port + "\r\n"] : ["m=" + e.kind + " 9 " + e.protocol + " " + t.port + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctpmap:" + t.port + " " + t.protocol + " 65535\r\n"], void 0 !== t.maxMessageSize && n.push("a=max-message-size:" + t.maxMessageSize + "\r\n"), n.join("") }, em.generateSessionId = function () { return Math.random().toString().substr(2, 22) }, em.writeSessionBoilerplate = function (e, t, n) { return "v=0\r\no=" + (n || "thisisadapterortc") + " " + (e || em.generateSessionId()) + " " + (void 0 !== t ? t : 2) + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n" }, em.getDirection = function (e, t) { let n = em.splitLines(e); for (let e = 0; e < n.length; e++)switch (n[e]) { case "a=sendrecv": case "a=sendonly": case "a=recvonly": case "a=inactive": return n[e].substring(2) }return t ? em.getDirection(t) : "sendrecv" }, em.getKind = function (e) { return em.splitLines(e)[0].split(" ")[0].substring(2) }, em.isRejected = function (e) { return "0" === e.split(" ", 2)[1] }, em.parseMLine = function (e) { let t = em.splitLines(e)[0].substring(2).split(" "); return { kind: t[0], port: parseInt(t[1], 10), protocol: t[2], fmt: t.slice(3).join(" ") } }, em.parseOLine = function (e) { let t = em.matchPrefix(e, "o=")[0].substring(2).split(" "); return { username: t[0], sessionId: t[1], sessionVersion: parseInt(t[2], 10), netType: t[3], addressType: t[4], address: t[5] } }, em.isValidSDP = function (e) { if ("string" != typeof e || 0 === e.length) return !1; let t = em.splitLines(e); for (let e = 0; e < t.length; e++)if (t[e].length < 2 || "=" !== t[e].charAt(1)) return !1; return !0 }, ef = em; let eS = function ({ window: e } = {}, t = { shimChrome: !0, shimFirefox: !0, shimSafari: !0 }) { let n = function (e) { let t = { browser: null, version: null }; if (void 0 === e || !e.navigator || !e.navigator.userAgent) return t.browser = "Not a browser.", t; let { navigator: n } = e; if (n.userAgentData && n.userAgentData.brands) { let e = n.userAgentData.brands.find(e => "Chromium" === e.brand); if (e) return { browser: "chrome", version: parseInt(e.version, 10) } } return n.mozGetUserMedia ? (t.browser = "firefox", t.version = p(n.userAgent, /Firefox\/(\d+)\./, 1)) : n.webkitGetUserMedia || !1 === e.isSecureContext && e.webkitRTCPeerConnection ? (t.browser = "chrome", t.version = p(n.userAgent, /Chrom(e|ium)\/(\d+)\./, 2)) : e.RTCPeerConnection && n.userAgent.match(/AppleWebKit\/(\d+)\./) ? (t.browser = "safari", t.version = p(n.userAgent, /AppleWebKit\/(\d+)\./, 1), t.supportsUnifiedPlan = e.RTCRtpTransceiver && "currentDirection" in e.RTCRtpTransceiver.prototype) : t.browser = "Not a supported browser.", t }(e), r = { browserDetails: n, commonShim: eu, extractVersion: p, disableLog: h, disableWarnings: u, sdp: ef }; switch (n.browser) { case "chrome": if (!j || !j.shimPeerConnection || !t.shimChrome) { f("Chrome shim is not included in this adapter release."); break } if (null === n.version) { f("Chrome shim can not determine version, not shimming."); break } f("adapter.js shimming chrome."), r.browserShim = j, ek(e, n), eT(e, n), j.shimGetUserMedia(e, n), j.shimMediaStream(e, n), j.shimPeerConnection(e, n), j.shimOnTrack(e, n), j.shimAddTrackRemoveTrack(e, n), j.shimGetSendersWithDtmf(e, n), j.shimSenderReceiverGetStats(e, n), j.fixNegotiationNeeded(e, n), eg(e, n), ey(e, n), eb(e, n), e_(e, n), eC(e, n), ev(e, n); break; case "firefox": if (!V || !V.shimPeerConnection || !t.shimFirefox) { f("Firefox shim is not included in this adapter release."); break } f("adapter.js shimming firefox."), r.browserShim = V, ek(e, n), eT(e, n), V.shimGetUserMedia(e, n), V.shimPeerConnection(e, n), V.shimOnTrack(e, n), V.shimRemoveStream(e, n), V.shimSenderGetStats(e, n), V.shimReceiverGetStats(e, n), V.shimRTCDataChannel(e, n), V.shimAddTransceiver(e, n), V.shimGetParameters(e, n), V.shimCreateOffer(e, n), V.shimCreateAnswer(e, n), eg(e, n), eb(e, n), e_(e, n), eC(e, n); break; case "safari": if (!er || !t.shimSafari) { f("Safari shim is not included in this adapter release."); break } f("adapter.js shimming safari."), r.browserShim = er, ek(e, n), eT(e, n), er.shimRTCIceServerUrls(e, n), er.shimCreateOfferLegacy(e, n), er.shimCallbacksAPI(e, n), er.shimLocalStreamsAPI(e, n), er.shimRemoteStreamsAPI(e, n), er.shimTrackEventTransceiver(e, n), er.shimGetUserMedia(e, n), er.shimAudioContext(e, n), eg(e, n), ey(e, n), e_(e, n), eC(e, n), ev(e, n); break; default: f("Unsupported browser!") }return r }({ window: "undefined" == typeof window ? void 0 : window }), eR = eS.default || eS, eP = new class {
            isWebRTCSupported() { return "undefined" != typeof RTCPeerConnection } isBrowserSupported() { let e = this.getBrowser(), t = this.getVersion(); return !!this.supportedBrowsers.includes(e) && ("chrome" === e ? t >= this.minChromeVersion : "firefox" === e ? t >= this.minFirefoxVersion : "safari" === e && !this.isIOS && t >= this.minSafariVersion) } getBrowser() { return eR.browserDetails.browser } getVersion() { return eR.browserDetails.version || 0 } isUnifiedPlanSupported() { let e; let t = this.getBrowser(), n = eR.browserDetails.version || 0; if ("chrome" === t && n < this.minChromeVersion) return !1; if ("firefox" === t && n >= this.minFirefoxVersion) return !0; if (!window.RTCRtpTransceiver || !("currentDirection" in RTCRtpTransceiver.prototype)) return !1; let r = !1; try { (e = new RTCPeerConnection).addTransceiver("audio"), r = !0 } catch (e) { } finally { e && e.close() } return r } toString() {
                return `Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`
            } constructor() { this.isIOS = "undefined" != typeof navigator && ["iPad", "iPhone", "iPod"].includes(navigator.platform), this.supportedBrowsers = ["firefox", "chrome", "safari"], this.minFirefoxVersion = 59, this.minChromeVersion = 72, this.minSafariVersion = 605 }
        }, ew = e => !e || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(e), eE = () => Math.random().toString(36).slice(2), eD = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: ["turn:eu-0.turn.peerjs.com:3478", "turn:us-0.turn.peerjs.com:3478"], username: "peerjs", credential: "peerjsp" }], sdpSemantics: "unified-plan" }, ex = new class extends n { noop() { } blobToArrayBuffer(e, t) { let n = new FileReader; return n.onload = function (e) { e.target && t(e.target.result) }, n.readAsArrayBuffer(e), n } binaryStringToArrayBuffer(e) { let t = new Uint8Array(e.length); for (let n = 0; n < e.length; n++)t[n] = 255 & e.charCodeAt(n); return t.buffer } isSecure() { return "https:" === location.protocol } constructor(...e) { super(...e), this.CLOUD_HOST = "0.peerjs.com", this.CLOUD_PORT = 443, this.chunkedBrowsers = { Chrome: 1, chrome: 1 }, this.defaultConfig = eD, this.browser = eP.getBrowser(), this.browserVersion = eP.getVersion(), this.pack = o, this.unpack = i, this.supports = function () { let e; let t = { browser: eP.isBrowserSupported(), webRTC: eP.isWebRTCSupported(), audioVideo: !1, data: !1, binaryBlob: !1, reliable: !1 }; if (!t.webRTC) return t; try { let n; e = new RTCPeerConnection(eD), t.audioVideo = !0; try { n = e.createDataChannel("_PEERJSTEST", { ordered: !0 }), t.data = !0, t.reliable = !!n.ordered; try { n.binaryType = "blob", t.binaryBlob = !eP.isIOS } catch (e) { } } catch (e) { } finally { n && n.close() } } catch (e) { } finally { e && e.close() } return t }(), this.validateId = ew, this.randomToken = eE } }; (_ = P || (P = {}))[_.Disabled = 0] = "Disabled", _[_.Errors = 1] = "Errors", _[_.Warnings = 2] = "Warnings", _[_.All = 3] = "All"; var eI = new class { get logLevel() { return this._logLevel } set logLevel(e) { this._logLevel = e } log(...e) { this._logLevel >= 3 && this._print(3, ...e) } warn(...e) { this._logLevel >= 2 && this._print(2, ...e) } error(...e) { this._logLevel >= 1 && this._print(1, ...e) } setLogFunction(e) { this._print = e } _print(e, ...t) { let n = ["PeerJS: ", ...t]; for (let e in n) n[e] instanceof Error && (n[e] = "(" + n[e].name + ") " + n[e].message); e >= 3 ? console.log(...n) : e >= 2 ? console.warn("WARNING", ...n) : e >= 1 && console.error("ERROR", ...n) } constructor() { this._logLevel = 0 } }, eM = {}, eO = Object.prototype.hasOwnProperty, ej = "~"; function eL() { } function eA(e, t, n) { this.fn = e, this.context = t, this.once = n || !1 } function eB(e, t, n, r, i) { if ("function" != typeof n) throw TypeError("The listener must be a function"); var o = new eA(n, r || e, i), s = ej ? ej + t : t; return e._events[s] ? e._events[s].fn ? e._events[s] = [e._events[s], o] : e._events[s].push(o) : (e._events[s] = o, e._eventsCount++), e } function eF(e, t) { 0 == --e._eventsCount ? e._events = new eL : delete e._events[t] } function eU() { this._events = new eL, this._eventsCount = 0 } Object.create && (eL.prototype = Object.create(null), new eL().__proto__ || (ej = !1)), eU.prototype.eventNames = function () { var e, t, n = []; if (0 === this._eventsCount) return n; for (t in e = this._events) eO.call(e, t) && n.push(ej ? t.slice(1) : t); return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n }, eU.prototype.listeners = function (e) { var t = ej ? ej + e : e, n = this._events[t]; if (!n) return []; if (n.fn) return [n.fn]; for (var r = 0, i = n.length, o = Array(i); r < i; r++)o[r] = n[r].fn; return o }, eU.prototype.listenerCount = function (e) { var t = ej ? ej + e : e, n = this._events[t]; return n ? n.fn ? 1 : n.length : 0 }, eU.prototype.emit = function (e, t, n, r, i, o) { var s = ej ? ej + e : e; if (!this._events[s]) return !1; var a, c, l = this._events[s], p = arguments.length; if (l.fn) { switch (l.once && this.removeListener(e, l.fn, void 0, !0), p) { case 1: return l.fn.call(l.context), !0; case 2: return l.fn.call(l.context, t), !0; case 3: return l.fn.call(l.context, t, n), !0; case 4: return l.fn.call(l.context, t, n, r), !0; case 5: return l.fn.call(l.context, t, n, r, i), !0; case 6: return l.fn.call(l.context, t, n, r, i, o), !0 }for (c = 1, a = Array(p - 1); c < p; c++)a[c - 1] = arguments[c]; l.fn.apply(l.context, a) } else { var d, h = l.length; for (c = 0; c < h; c++)switch (l[c].once && this.removeListener(e, l[c].fn, void 0, !0), p) { case 1: l[c].fn.call(l[c].context); break; case 2: l[c].fn.call(l[c].context, t); break; case 3: l[c].fn.call(l[c].context, t, n); break; case 4: l[c].fn.call(l[c].context, t, n, r); break; default: if (!a) for (d = 1, a = Array(p - 1); d < p; d++)a[d - 1] = arguments[d]; l[c].fn.apply(l[c].context, a) } } return !0 }, eU.prototype.on = function (e, t, n) { return eB(this, e, t, n, !1) }, eU.prototype.once = function (e, t, n) { return eB(this, e, t, n, !0) }, eU.prototype.removeListener = function (e, t, n, r) { var i = ej ? ej + e : e; if (!this._events[i]) return this; if (!t) return eF(this, i), this; var o = this._events[i]; if (o.fn) o.fn !== t || r && !o.once || n && o.context !== n || eF(this, i); else { for (var s = 0, a = [], c = o.length; s < c; s++)(o[s].fn !== t || r && !o[s].once || n && o[s].context !== n) && a.push(o[s]); a.length ? this._events[i] = 1 === a.length ? a[0] : a : eF(this, i) } return this }, eU.prototype.removeAllListeners = function (e) { var t; return e ? (t = ej ? ej + e : e, this._events[t] && eF(this, t)) : (this._events = new eL, this._eventsCount = 0), this }, eU.prototype.off = eU.prototype.removeListener, eU.prototype.addListener = eU.prototype.on, eU.prefixed = ej, eU.EventEmitter = eU, eM = eU, (C = w || (w = {})).Data = "data", C.Media = "media", (b = E || (E = {})).BrowserIncompatible = "browser-incompatible", b.Disconnected = "disconnected", b.InvalidID = "invalid-id", b.InvalidKey = "invalid-key", b.Network = "network", b.PeerUnavailable = "peer-unavailable", b.SslUnavailable = "ssl-unavailable", b.ServerError = "server-error", b.SocketError = "socket-error", b.SocketClosed = "socket-closed", b.UnavailableID = "unavailable-id", b.WebRTC = "webrtc", (v = D || (D = {})).NegotiationFailed = "negotiation-failed", v.ConnectionClosed = "connection-closed", (k = x || (x = {})).NotOpenYet = "not-open-yet", k.MessageToBig = "message-too-big", (T = I || (I = {})).Binary = "binary", T.BinaryUTF8 = "binary-utf8", T.JSON = "json", T.None = "raw", (S = M || (M = {})).Message = "message", S.Disconnected = "disconnected", S.Error = "error", S.Close = "close", (R = O || (O = {})).Heartbeat = "HEARTBEAT", R.Candidate = "CANDIDATE", R.Offer = "OFFER", R.Answer = "ANSWER", R.Open = "OPEN", R.Error = "ERROR", R.IdTaken = "ID-TAKEN", R.InvalidKey = "INVALID-KEY", R.Leave = "LEAVE", R.Expire = "EXPIRE"; var ez = {}; ez = JSON.parse('{"name":"peerjs","version":"1.5.4","keywords":["peerjs","webrtc","p2p","rtc"],"description":"PeerJS client","homepage":"https://peerjs.com","bugs":{"url":"https://github.com/peers/peerjs/issues"},"repository":{"type":"git","url":"https://github.com/peers/peerjs"},"license":"MIT","contributors":["Michelle Bu <michelle@michellebu.com>","afrokick <devbyru@gmail.com>","ericz <really.ez@gmail.com>","Jairo <kidandcat@gmail.com>","Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>","Jairo Caro-Accino Viciana <jairo@galax.be>","Carlos Caballero <carlos.caballero.gonzalez@gmail.com>","hc <hheennrryy@gmail.com>","Muhammad Asif <capripio@gmail.com>","PrashoonB <prashoonbhattacharjee@gmail.com>","Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>","akotynski <aleksanderkotbury@gmail.com>","lmb <i@lmb.io>","Jairooo <jairocaro@msn.com>","Moritz Stückler <moritz.stueckler@gmail.com>","Simon <crydotsnakegithub@gmail.com>","Denis Lukov <denismassters@gmail.com>","Philipp Hancke <fippo@andyet.net>","Hans Oksendahl <hansoksendahl@gmail.com>","Jess <jessachandler@gmail.com>","khankuan <khankuan@gmail.com>","DUODVK <kurmanov.work@gmail.com>","XiZhao <kwang1imsa@gmail.com>","Matthias Lohr <matthias@lohr.me>","=frank tree <=frnktrb@googlemail.com>","Andre Eckardt <aeckardt@outlook.com>","Chris Cowan <agentme49@gmail.com>","Alex Chuev <alex@chuev.com>","alxnull <alxnull@e.mail.de>","Yemel Jardi <angel.jardi@gmail.com>","Ben Parnell <benjaminparnell.94@gmail.com>","Benny Lichtner <bennlich@gmail.com>","fresheneesz <bitetrudpublic@gmail.com>","bob.barstead@exaptive.com <bob.barstead@exaptive.com>","chandika <chandika@gmail.com>","emersion <contact@emersion.fr>","Christopher Van <cvan@users.noreply.github.com>","eddieherm <edhermoso@gmail.com>","Eduardo Pinho <enet4mikeenet@gmail.com>","Evandro Zanatta <ezanatta@tray.net.br>","Gardner Bickford <gardner@users.noreply.github.com>","Gian Luca <gianluca.cecchi@cynny.com>","PatrickJS <github@gdi2290.com>","jonnyf <github@jonathanfoss.co.uk>","Hizkia Felix <hizkifw@gmail.com>","Hristo Oskov <hristo.oskov@gmail.com>","Isaac Madwed <i.madwed@gmail.com>","Ilya Konanykhin <ilya.konanykhin@gmail.com>","jasonbarry <jasbarry@me.com>","Jonathan Burke <jonathan.burke.1311@googlemail.com>","Josh Hamit <josh.hamit@gmail.com>","Jordan Austin <jrax86@gmail.com>","Joel Wetzell <jwetzell@yahoo.com>","xizhao <kevin.wang@cloudera.com>","Alberto Torres <kungfoobar@gmail.com>","Jonathan Mayol <mayoljonathan@gmail.com>","Jefferson Felix <me@jsfelix.dev>","Rolf Erik Lekang <me@rolflekang.com>","Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>","Pepijn de Vos <pepijndevos@gmail.com>","JooYoung <qkdlql@naver.com>","Tobias Speicher <rootcommander@gmail.com>","Steve Blaurock <sblaurock@gmail.com>","Kyrylo Shegeda <shegeda@ualberta.ca>","Diwank Singh Tomer <singh@diwank.name>","Sören Balko <Soeren.Balko@gmail.com>","Arpit Solanki <solankiarpit1997@gmail.com>","Yuki Ito <yuki@gnnk.net>","Artur Zayats <zag2art@gmail.com>"],"funding":{"type":"opencollective","url":"https://opencollective.com/peer"},"collective":{"type":"opencollective","url":"https://opencollective.com/peer"},"files":["dist/*"],"sideEffects":["lib/global.ts","lib/supports.ts"],"main":"dist/bundler.cjs","module":"dist/bundler.mjs","browser-minified":"dist/peerjs.min.js","browser-unminified":"dist/peerjs.js","browser-minified-msgpack":"dist/serializer.msgpack.mjs","types":"dist/types.d.ts","engines":{"node":">= 14"},"targets":{"types":{"source":"lib/exports.ts"},"main":{"source":"lib/exports.ts","sourceMap":{"inlineSources":true}},"module":{"source":"lib/exports.ts","includeNodeModules":["eventemitter3"],"sourceMap":{"inlineSources":true}},"browser-minified":{"context":"browser","outputFormat":"global","optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-unminified":{"context":"browser","outputFormat":"global","optimize":false,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-minified-msgpack":{"context":"browser","outputFormat":"esmodule","isLibrary":true,"optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 102, safari >= 15"},"source":"lib/dataconnection/StreamConnection/MsgPack.ts"}},"scripts":{"contributors":"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\"chore(contributors): update and sort contributors list\\"","check":"tsc --noEmit && tsc -p e2e/tsconfig.json --noEmit","watch":"parcel watch","build":"rm -rf dist && parcel build","prepublishOnly":"npm run build","test":"jest","test:watch":"jest --watch","coverage":"jest --coverage --collectCoverageFrom=\\"./lib/**\\"","format":"prettier --write .","format:check":"prettier --check .","semantic-release":"semantic-release","e2e":"wdio run e2e/wdio.local.conf.ts","e2e:bstack":"wdio run e2e/wdio.bstack.conf.ts"},"devDependencies":{"@parcel/config-default":"^2.9.3","@parcel/packager-ts":"^2.9.3","@parcel/transformer-typescript-tsc":"^2.9.3","@parcel/transformer-typescript-types":"^2.9.3","@semantic-release/changelog":"^6.0.1","@semantic-release/git":"^10.0.1","@swc/core":"^1.3.27","@swc/jest":"^0.2.24","@types/jasmine":"^4.3.4","@wdio/browserstack-service":"^8.11.2","@wdio/cli":"^8.11.2","@wdio/globals":"^8.11.2","@wdio/jasmine-framework":"^8.11.2","@wdio/local-runner":"^8.11.2","@wdio/spec-reporter":"^8.11.2","@wdio/types":"^8.10.4","http-server":"^14.1.1","jest":"^29.3.1","jest-environment-jsdom":"^29.3.1","mock-socket":"^9.0.0","parcel":"^2.9.3","prettier":"^3.0.0","semantic-release":"^21.0.0","ts-node":"^10.9.1","typescript":"^5.0.0","wdio-geckodriver-service":"^5.0.1"},"dependencies":{"@msgpack/msgpack":"^2.8.0","eventemitter3":"^4.0.7","peerjs-js-binarypack":"^2.1.0","webrtc-adapter":"^9.0.0"},"alias":{"process":false,"buffer":false}}'); class eN extends eM.EventEmitter { start(e, t) { this._id = e; let n = `${this._baseUrl}&id=${e}&token=${t}`; !this._socket && this._disconnected && (this._socket = new WebSocket(n + "&version=" + ez.version), this._disconnected = !1, this._socket.onmessage = e => { let t; try { t = JSON.parse(e.data), eI.log("Server message received:", t) } catch (t) { eI.log("Invalid server message", e.data); return } this.emit(M.Message, t) }, this._socket.onclose = e => { this._disconnected || (eI.log("Socket closed.", e), this._cleanup(), this._disconnected = !0, this.emit(M.Disconnected)) }, this._socket.onopen = () => { this._disconnected || (this._sendQueuedMessages(), eI.log("Socket open"), this._scheduleHeartbeat()) }) } _scheduleHeartbeat() { this._wsPingTimer = setTimeout(() => { this._sendHeartbeat() }, this.pingInterval) } _sendHeartbeat() { if (!this._wsOpen()) { eI.log("Cannot send heartbeat, because socket closed"); return } let e = JSON.stringify({ type: O.Heartbeat }); this._socket.send(e), this._scheduleHeartbeat() } _wsOpen() { return !!this._socket && 1 === this._socket.readyState } _sendQueuedMessages() { let e = [...this._messagesQueue]; for (let t of (this._messagesQueue = [], e)) this.send(t) } send(e) { if (this._disconnected) return; if (!this._id) { this._messagesQueue.push(e); return } if (!e.type) { this.emit(M.Error, "Invalid message"); return } if (!this._wsOpen()) return; let t = JSON.stringify(e); this._socket.send(t) } close() { this._disconnected || (this._cleanup(), this._disconnected = !0) } _cleanup() { this._socket && (this._socket.onopen = this._socket.onmessage = this._socket.onclose = null, this._socket.close(), this._socket = void 0), clearTimeout(this._wsPingTimer) } constructor(e, t, n, r, i, o = 5e3) { super(), this.pingInterval = o, this._disconnected = !0, this._messagesQueue = [], this._baseUrl = (e ? "wss://" : "ws://") + t + ":" + n + r + "peerjs?key=" + i } } class e$ { startConnection(e) { let t = this._startPeerConnection(); if (this.connection.peerConnection = t, this.connection.type === w.Media && e._stream && this._addTracksToConnection(e._stream, t), e.originator) { let n = this.connection, r = { ordered: !!e.reliable }, i = t.createDataChannel(n.label, r); n._initializeDataChannel(i), this._makeOffer() } else this.handleSDP("OFFER", e.sdp) } _startPeerConnection() { eI.log("Creating RTCPeerConnection."); let e = new RTCPeerConnection(this.connection.provider.options.config); return this._setupListeners(e), e } _setupListeners(e) { let t = this.connection.peer, n = this.connection.connectionId, r = this.connection.type, i = this.connection.provider; eI.log("Listening for ICE candidates."), e.onicecandidate = e => { e.candidate && e.candidate.candidate && (eI.log(`Received ICE candidates for ${t}:`, e.candidate), i.socket.send({ type: O.Candidate, payload: { candidate: e.candidate, type: r, connectionId: n }, dst: t })) }, e.oniceconnectionstatechange = () => { switch (e.iceConnectionState) { case "failed": eI.log("iceConnectionState is failed, closing connections to " + t), this.connection.emitError(D.NegotiationFailed, "Negotiation of connection to " + t + " failed."), this.connection.close(); break; case "closed": eI.log("iceConnectionState is closed, closing connections to " + t), this.connection.emitError(D.ConnectionClosed, "Connection to " + t + " closed."), this.connection.close(); break; case "disconnected": eI.log("iceConnectionState changed to disconnected on the connection with " + t); break; case "completed": e.onicecandidate = () => { } }this.connection.emit("iceStateChanged", e.iceConnectionState) }, eI.log("Listening for data channel"), e.ondatachannel = e => { eI.log("Received data channel"); let r = e.channel; i.getConnection(t, n)._initializeDataChannel(r) }, eI.log("Listening for remote stream"), e.ontrack = e => { eI.log("Received remote stream"); let r = e.streams[0], o = i.getConnection(t, n); o.type === w.Media && this._addStreamToMediaConnection(r, o) } } cleanup() { eI.log("Cleaning up PeerConnection to " + this.connection.peer); let e = this.connection.peerConnection; if (!e) return; this.connection.peerConnection = null, e.onicecandidate = e.oniceconnectionstatechange = e.ondatachannel = e.ontrack = () => { }; let t = "closed" !== e.signalingState, n = !1, r = this.connection.dataChannel; r && (n = !!r.readyState && "closed" !== r.readyState), (t || n) && e.close() } async _makeOffer() { let e = this.connection.peerConnection, t = this.connection.provider; try { let n = await e.createOffer(this.connection.options.constraints); eI.log("Created offer."), this.connection.options.sdpTransform && "function" == typeof this.connection.options.sdpTransform && (n.sdp = this.connection.options.sdpTransform(n.sdp) || n.sdp); try { await e.setLocalDescription(n), eI.log("Set localDescription:", n, `for:${this.connection.peer}`); let r = { sdp: n, type: this.connection.type, connectionId: this.connection.connectionId, metadata: this.connection.metadata }; if (this.connection.type === w.Data) { let e = this.connection; r = { ...r, label: e.label, reliable: e.reliable, serialization: e.serialization } } t.socket.send({ type: O.Offer, payload: r, dst: this.connection.peer }) } catch (e) { "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer" != e && (t.emitError(E.WebRTC, e), eI.log("Failed to setLocalDescription, ", e)) } } catch (e) { t.emitError(E.WebRTC, e), eI.log("Failed to createOffer, ", e) } } async _makeAnswer() { let e = this.connection.peerConnection, t = this.connection.provider; try { let n = await e.createAnswer(); eI.log("Created answer."), this.connection.options.sdpTransform && "function" == typeof this.connection.options.sdpTransform && (n.sdp = this.connection.options.sdpTransform(n.sdp) || n.sdp); try { await e.setLocalDescription(n), eI.log("Set localDescription:", n, `for:${this.connection.peer}`), t.socket.send({ type: O.Answer, payload: { sdp: n, type: this.connection.type, connectionId: this.connection.connectionId }, dst: this.connection.peer }) } catch (e) { t.emitError(E.WebRTC, e), eI.log("Failed to setLocalDescription, ", e) } } catch (e) { t.emitError(E.WebRTC, e), eI.log("Failed to create answer, ", e) } } async handleSDP(e, t) { t = new RTCSessionDescription(t); let n = this.connection.peerConnection, r = this.connection.provider; eI.log("Setting remote description", t); try { await n.setRemoteDescription(t), eI.log(`Set remoteDescription:${e} for:${this.connection.peer}`), "OFFER" === e && await this._makeAnswer() } catch (e) { r.emitError(E.WebRTC, e), eI.log("Failed to setRemoteDescription, ", e) } } async handleCandidate(e) { eI.log("handleCandidate:", e); try { await this.connection.peerConnection.addIceCandidate(e), eI.log(`Added ICE candidate for:${this.connection.peer}`) } catch (e) { this.connection.provider.emitError(E.WebRTC, e), eI.log("Failed to handleCandidate, ", e) } } _addTracksToConnection(e, t) { if (eI.log(`add tracks from stream ${e.id} to peer connection`), !t.addTrack) return eI.error("Your browser does't support RTCPeerConnection#addTrack. Ignored."); e.getTracks().forEach(n => { t.addTrack(n, e) }) } _addStreamToMediaConnection(e, t) { eI.log(`add stream ${e.id} to media connection ${t.connectionId}`), t.addStream(e) } constructor(e) { this.connection = e } } class eJ extends eM.EventEmitter { emitError(e, t) { eI.error("Error:", t), this.emit("error", new eV(`${e}`, t)) } } class eV extends Error { constructor(e, t) { "string" == typeof t ? super(t) : (super(), Object.assign(this, t)), this.type = e } } class eG extends eJ { get open() { return this._open } constructor(e, t, n) { super(), this.peer = e, this.provider = t, this.options = n, this._open = !1, this.metadata = n.metadata } } class eW extends eG { get type() { return w.Media } get localStream() { return this._localStream } get remoteStream() { return this._remoteStream } _initializeDataChannel(e) { this.dataChannel = e, this.dataChannel.onopen = () => { eI.log(`DC#${this.connectionId} dc connection success`), this.emit("willCloseOnRemote") }, this.dataChannel.onclose = () => { eI.log(`DC#${this.connectionId} dc closed for:`, this.peer), this.close() } } addStream(e) { eI.log("Receiving stream", e), this._remoteStream = e, super.emit("stream", e) } handleMessage(e) { let t = e.type, n = e.payload; switch (e.type) { case O.Answer: this._negotiator.handleSDP(t, n.sdp), this._open = !0; break; case O.Candidate: this._negotiator.handleCandidate(n.candidate); break; default: eI.warn(`Unrecognized message type:${t} from peer:${this.peer}`) } } answer(e, t = {}) { if (this._localStream) { eI.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?"); return } for (let n of (this._localStream = e, t && t.sdpTransform && (this.options.sdpTransform = t.sdpTransform), this._negotiator.startConnection({ ...this.options._payload, _stream: e }), this.provider._getMessages(this.connectionId))) this.handleMessage(n); this._open = !0 } close() { this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this._localStream = null, this._remoteStream = null, this.provider && (this.provider._removeConnection(this), this.provider = null), this.options && this.options._stream && (this.options._stream = null), this.open && (this._open = !1, super.emit("close")) } constructor(e, t, n) { super(e, t, n), this._localStream = this.options._stream, this.connectionId = this.options.connectionId || eW.ID_PREFIX + ex.randomToken(), this._negotiator = new e$(this), this._localStream && this._negotiator.startConnection({ _stream: this._localStream, originator: !0 }) } } eW.ID_PREFIX = "mc_"; class eH { _buildRequest(e) { let t = this._options.secure ? "https" : "http", { host: n, port: r, path: i, key: o } = this._options, s = new URL(`${t}://${n}:${r}${i}${o}/${e}`); return s.searchParams.set("ts", `${Date.now()}${Math.random()}`), s.searchParams.set("version", ez.version), fetch(s.href, { referrerPolicy: this._options.referrerPolicy }) } async retrieveId() { try { let e = await this._buildRequest("id"); if (200 !== e.status) throw Error(`Error. Status:${e.status}`); return e.text() } catch (t) { eI.error("Error retrieving ID", t); let e = ""; throw "/" === this._options.path && this._options.host !== ex.CLOUD_HOST && (e = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."), Error("Could not get an ID from the server." + e) } } async listAllPeers() { try { let e = await this._buildRequest("peers"); if (200 !== e.status) { if (401 === e.status) { let e = ""; throw e = this._options.host === ex.CLOUD_HOST ? "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key." : "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.", Error("It doesn't look like you have permission to list peers IDs. " + e) } throw Error(`Error. Status:${e.status}`) } return e.json() } catch (e) { throw eI.error("Error retrieving list peers", e), Error("Could not get list peers from the server." + e) } } constructor(e) { this._options = e } } class eY extends eG { get type() { return w.Data } _initializeDataChannel(e) { this.dataChannel = e, this.dataChannel.onopen = () => { eI.log(`DC#${this.connectionId} dc connection success`), this._open = !0, this.emit("open") }, this.dataChannel.onmessage = e => { eI.log(`DC#${this.connectionId} dc onmessage:`, e.data) }, this.dataChannel.onclose = () => { eI.log(`DC#${this.connectionId} dc closed for:`, this.peer), this.close() } } close(e) { if (e?.flush) { this.send({ __peerData: { type: "close" } }); return } this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this.provider && (this.provider._removeConnection(this), this.provider = null), this.dataChannel && (this.dataChannel.onopen = null, this.dataChannel.onmessage = null, this.dataChannel.onclose = null, this.dataChannel = null), this.open && (this._open = !1, super.emit("close")) } send(e, t = !1) { if (!this.open) { this.emitError(x.NotOpenYet, "Connection is not open. You should listen for the `open` event before sending messages."); return } return this._send(e, t) } async handleMessage(e) { let t = e.payload; switch (e.type) { case O.Answer: await this._negotiator.handleSDP(e.type, t.sdp); break; case O.Candidate: await this._negotiator.handleCandidate(t.candidate); break; default: eI.warn("Unrecognized message type:", e.type, "from peer:", this.peer) } } constructor(e, t, n) { super(e, t, n), this.connectionId = this.options.connectionId || eY.ID_PREFIX + eE(), this.label = this.options.label || this.connectionId, this.reliable = !!this.options.reliable, this._negotiator = new e$(this), this._negotiator.startConnection(this.options._payload || { originator: !0, reliable: this.reliable }) } } eY.ID_PREFIX = "dc_", eY.MAX_BUFFERED_AMOUNT = 8388608; class eK extends eY { get bufferSize() { return this._bufferSize } _initializeDataChannel(e) { super._initializeDataChannel(e), this.dataChannel.binaryType = "arraybuffer", this.dataChannel.addEventListener("message", e => this._handleDataMessage(e)) } _bufferedSend(e) { (this._buffering || !this._trySend(e)) && (this._buffer.push(e), this._bufferSize = this._buffer.length) } _trySend(e) { if (!this.open) return !1; if (this.dataChannel.bufferedAmount > eY.MAX_BUFFERED_AMOUNT) return this._buffering = !0, setTimeout(() => { this._buffering = !1, this._tryBuffer() }, 50), !1; try { this.dataChannel.send(e) } catch (e) { return eI.error(`DC#:${this.connectionId} Error when sending:`, e), this._buffering = !0, this.close(), !1 } return !0 } _tryBuffer() { if (!this.open || 0 === this._buffer.length) return; let e = this._buffer[0]; this._trySend(e) && (this._buffer.shift(), this._bufferSize = this._buffer.length, this._tryBuffer()) } close(e) { if (e?.flush) { this.send({ __peerData: { type: "close" } }); return } this._buffer = [], this._bufferSize = 0, super.close() } constructor(...e) { super(...e), this._buffer = [], this._bufferSize = 0, this._buffering = !1 } } class eX extends eK { close(e) { super.close(e), this._chunkedData = {} } _handleDataMessage({ data: e }) { let t = i(e), n = t.__peerData; if (n) { if ("close" === n.type) { this.close(); return } this._handleChunk(t); return } this.emit("data", t) } _handleChunk(e) { let t = e.__peerData, n = this._chunkedData[t] || { data: [], count: 0, total: e.total }; if (n.data[e.n] = new Uint8Array(e.data), n.count++, this._chunkedData[t] = n, n.total === n.count) { delete this._chunkedData[t]; let e = function (e) { let t = 0; for (let n of e) t += n.byteLength; let n = new Uint8Array(t), r = 0; for (let t of e) n.set(t, r), r += t.byteLength; return n }(n.data); this._handleDataMessage({ data: e }) } } _send(e, t) { let n = o(e); if (n instanceof Promise) return this._send_blob(n); if (!t && n.byteLength > this.chunker.chunkedMTU) { this._sendChunks(n); return } this._bufferedSend(n) } async _send_blob(e) { let t = await e; if (t.byteLength > this.chunker.chunkedMTU) { this._sendChunks(t); return } this._bufferedSend(t) } _sendChunks(e) { let t = this.chunker.chunk(e); for (let e of (eI.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`), t)) this.send(e, !0) } constructor(e, t, r) { super(e, t, r), this.chunker = new n, this.serialization = I.Binary, this._chunkedData = {} } } class eq extends eK { _handleDataMessage({ data: e }) { super.emit("data", e) } _send(e, t) { this._bufferedSend(e) } constructor(...e) { super(...e), this.serialization = I.None } } class eQ extends eK { _handleDataMessage({ data: e }) { let t = this.parse(this.decoder.decode(e)), n = t.__peerData; if (n && "close" === n.type) { this.close(); return } this.emit("data", t) } _send(e, t) { let n = this.encoder.encode(this.stringify(e)); if (n.byteLength >= ex.chunkedMTU) { this.emitError(x.MessageToBig, "Message too big for JSON channel"); return } this._bufferedSend(n) } constructor(...e) { super(...e), this.serialization = I.JSON, this.encoder = new TextEncoder, this.decoder = new TextDecoder, this.stringify = JSON.stringify, this.parse = JSON.parse } } class eZ extends eJ { get id() { return this._id } get options() { return this._options } get open() { return this._open } get socket() { return this._socket } get connections() { let e = Object.create(null); for (let [t, n] of this._connections) e[t] = n; return e } get destroyed() { return this._destroyed } get disconnected() { return this._disconnected } _createServerConnection() { let e = new eN(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval); return e.on(M.Message, e => { this._handleMessage(e) }), e.on(M.Error, e => { this._abort(E.SocketError, e) }), e.on(M.Disconnected, () => { this.disconnected || (this.emitError(E.Network, "Lost connection to server."), this.disconnect()) }), e.on(M.Close, () => { this.disconnected || this._abort(E.SocketClosed, "Underlying socket is already closed.") }), e } _initialize(e) { this._id = e, this.socket.start(e, this._options.token) } _handleMessage(e) { let t = e.type, n = e.payload, r = e.src; switch (t) { case O.Open: this._lastServerId = this.id, this._open = !0, this.emit("open", this.id); break; case O.Error: this._abort(E.ServerError, n.msg); break; case O.IdTaken: this._abort(E.UnavailableID, `ID "${this.id}" is taken`); break; case O.InvalidKey: this._abort(E.InvalidKey, `API KEY "${this._options.key}" is invalid`); break; case O.Leave: eI.log(`Received leave message from ${r}`), this._cleanupPeer(r), this._connections.delete(r); break; case O.Expire: this.emitError(E.PeerUnavailable, `Could not connect to peer ${r}`); break; case O.Offer: { let e = n.connectionId, t = this.getConnection(r, e); if (t && (t.close(), eI.warn(`Offer received for existing Connection ID:${e}`)), n.type === w.Media) { let i = new eW(r, this, { connectionId: e, _payload: n, metadata: n.metadata }); t = i, this._addConnection(r, t), this.emit("call", i) } else if (n.type === w.Data) { let i = new this._serializers[n.serialization](r, this, { connectionId: e, _payload: n, metadata: n.metadata, label: n.label, serialization: n.serialization, reliable: n.reliable }); t = i, this._addConnection(r, t), this.emit("connection", i) } else { eI.warn(`Received malformed connection type:${n.type}`); return } for (let n of this._getMessages(e)) t.handleMessage(n); break } default: { if (!n) { eI.warn(`You received a malformed message from ${r} of type ${t}`); return } let i = n.connectionId, o = this.getConnection(r, i); o && o.peerConnection ? o.handleMessage(e) : i ? this._storeMessage(i, e) : eI.warn("You received an unrecognized message:", e) } } } _storeMessage(e, t) { this._lostMessages.has(e) || this._lostMessages.set(e, []), this._lostMessages.get(e).push(t) } _getMessages(e) { let t = this._lostMessages.get(e); return t ? (this._lostMessages.delete(e), t) : [] } connect(e, t = {}) { if (t = { serialization: "default", ...t }, this.disconnected) { eI.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."), this.emitError(E.Disconnected, "Cannot connect to new Peer after disconnecting from server."); return } let n = new this._serializers[t.serialization](e, this, t); return this._addConnection(e, n), n } call(e, t, n = {}) { if (this.disconnected) { eI.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."), this.emitError(E.Disconnected, "Cannot connect to new Peer after disconnecting from server."); return } if (!t) { eI.error("To call a peer, you must provide a stream from your browser's `getUserMedia`."); return } let r = new eW(e, this, { ...n, _stream: t }); return this._addConnection(e, r), r } _addConnection(e, t) { eI.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`), this._connections.has(e) || this._connections.set(e, []), this._connections.get(e).push(t) } _removeConnection(e) { let t = this._connections.get(e.peer); if (t) { let n = t.indexOf(e); -1 !== n && t.splice(n, 1) } this._lostMessages.delete(e.connectionId) } getConnection(e, t) { let n = this._connections.get(e); if (!n) return null; for (let e of n) if (e.connectionId === t) return e; return null } _delayedAbort(e, t) { setTimeout(() => { this._abort(e, t) }, 0) } _abort(e, t) { eI.error("Aborting!"), this.emitError(e, t), this._lastServerId ? this.disconnect() : this.destroy() } destroy() { this.destroyed || (eI.log(`Destroy peer with ID:${this.id}`), this.disconnect(), this._cleanup(), this._destroyed = !0, this.emit("close")) } _cleanup() { for (let e of this._connections.keys()) this._cleanupPeer(e), this._connections.delete(e); this.socket.removeAllListeners() } _cleanupPeer(e) { let t = this._connections.get(e); if (t) for (let e of t) e.close() } disconnect() { if (this.disconnected) return; let e = this.id; eI.log(`Disconnect peer with ID:${e}`), this._disconnected = !0, this._open = !1, this.socket.close(), this._lastServerId = e, this._id = null, this.emit("disconnected", e) } reconnect() { if (this.disconnected && !this.destroyed) eI.log(`Attempting reconnection to server with ID ${this._lastServerId}`), this._disconnected = !1, this._initialize(this._lastServerId); else if (this.destroyed) throw Error("This peer cannot reconnect to the server. It has already been destroyed."); else if (this.disconnected || this.open) throw Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`); else eI.error("In a hurry? We're still trying to make the initial connection!") } listAllPeers(e = e => { }) { this._api.listAllPeers().then(t => e(t)).catch(e => this._abort(E.ServerError, e)) } constructor(e, t) { let n; if (super(), this._serializers = { raw: eq, json: eQ, binary: eX, "binary-utf8": eX, default: eX }, this._id = null, this._lastServerId = null, this._destroyed = !1, this._disconnected = !1, this._open = !1, this._connections = new Map, this._lostMessages = new Map, e && e.constructor == Object ? t = e : e && (n = e.toString()), t = { debug: 0, host: ex.CLOUD_HOST, port: ex.CLOUD_PORT, path: "/", key: eZ.DEFAULT_KEY, token: ex.randomToken(), config: ex.defaultConfig, referrerPolicy: "strict-origin-when-cross-origin", serializers: {}, ...t }, this._options = t, this._serializers = { ...this._serializers, ...this.options.serializers }, "/" === this._options.host && (this._options.host = window.location.hostname), this._options.path && ("/" !== this._options.path[0] && (this._options.path = "/" + this._options.path), "/" !== this._options.path[this._options.path.length - 1] && (this._options.path += "/")), void 0 === this._options.secure && this._options.host !== ex.CLOUD_HOST ? this._options.secure = ex.isSecure() : this._options.host == ex.CLOUD_HOST && (this._options.secure = !0), this._options.logFunction && eI.setLogFunction(this._options.logFunction), eI.logLevel = this._options.debug || 0, this._api = new eH(t), this._socket = this._createServerConnection(), !ex.supports.audioVideo && !ex.supports.data) { this._delayedAbort(E.BrowserIncompatible, "The current browser does not support WebRTC"); return } if (n && !ex.validateId(n)) { this._delayedAbort(E.InvalidID, `ID "${n}" is invalid`); return } n ? this._initialize(n) : this._api.retrieveId().then(e => this._initialize(e)).catch(e => this._abort(E.ServerError, e)) } } eZ.DEFAULT_KEY = "peerjs", window.peerjs = { Peer: eZ, util: ex }, window.Peer = eZ
    })();
    //# sourceMappingURL=peerjs.min.js.map

    /*
          Networked Variables Helper Class
  
          MIT License
  
          Copyright (C) 2023 Mike Renaker "MikeDEV".
      */
    class NetworkedVariables {

        /**
         * Initializes a new instance of the NetworkedVariables class.
         * Sets up the internal data structures to track variable and list events.
         * 
         * - blessedListBackup: A map to store the original targets and clone IDs of blessed lists.
         * - listEvents: A map to manage events related to lists.
         * - varEvents: A map to manage events related to variables.
         */
        constructor() {
            this.networkUpdateTracker = {
                global: new Map(),
                local: new Map(),
                clone: new Map()
            };
            this.varEvents = {
                global: new Map(),
                local: new Map(),
                clone: new Map()
            };
            this.listEvents = {
                global: new Map(),
                local: new Map(),
                clone: new Map()
            };
        }

        /**
         * Updates the value of a proxy variable while masking the event trigger.
         * Used to update the value of a networked variable without triggering events.
         * @param {Object} metadata - Metadata containing information about the proxy to access. Generated by the makeNetworkedVariable function.
         * @param {any} newvalue - The new value to assign to the proxy without event triggering.
         */
        updateProxyVariable(metadata, newvalue) {

            /* 
            metadata = {
                id: string,
                class: "global" | "local" | "clone",
                target: 0 | string
            }
            */

            if (!metadata) return;
            let proxy;

            switch (metadata.class) {
                case "global":
                    proxy = vm.runtime.targets[metadata.target].variables[metadata.id];
                    break;
                case "local":
                case "clone":
                    proxy = vm.runtime.getTargetById(metadata.target).variables[metadata.id];
                    break;
                default:
                    throw new Error("Unhandled class type.");
            }
            
            // If the variable is not blessed, return
            if (!proxy) return;

            // Set flag to mask event trigger
            this.networkUpdateTracker[metadata.class].get(metadata.id).current = true;
            
            // Set new value
            proxy.value = newvalue;
        }

        /**
         * Updates the value of a proxy array while masking the event trigger.
         * Used to update the value of a networked array without triggering events.
         * @param {Object} metadata - Metadata containing information about the proxy to access. Generated by the makeNetworkedList function.
         * @param {any} newvalue - The new value to assign to the proxy without event triggering.
         */
        updateProxyArray(metadata, method, newvalue) {

            /* 
            metadata = {
                id: string,
                class: "global" | "local" | "clone",
                target: 0 | string
            }
            */

            if (!metadata) return;
            let proxy;

            switch (metadata.class) {
                case "global":
                    proxy = vm.runtime.targets[metadata.target].variables[metadata.id];
                    break;
                case "local":
                case "clone":
                    proxy = vm.runtime.getTargetById(metadata.target).variables[metadata.id];
                    break;
                default:
                    throw new Error("Unhandled class type.");
            }
            
            // If the variable is not blessed, return
            if (!proxy) return;

            // Set flag to mask event trigger
            this.networkUpdateTracker[metadata.class].get(metadata.id).current = true;
            
            // Set new value
            switch (method) {
                case "reset":
                case "set":
                    proxy.value = newvalue;
                    break;
                case "length":
                    proxy.value.length = newvalue;
                    return;
                case "replace":
                    proxy.value[newvalue.property] = newvalue.value;
                    break;
            }

            // Refresh monitor for list
            proxy._monitorUpToDate = false;
        }

        /**
         * Overwrites a variable with a proxy that can track changes. It also marks the variable for overwrites so that
         * the runtime can recognize the change.
         * 
         * @param {Object} myVar - The object containing the variable to be proxied.
         * @param {string} classtype - Whether the variable is operating in a global/local/clone target.
         * @returns {Array[Proxy, String]} - An array containing a proxy object for the variable and the event handler name of the variable.
         */
        createVariableProxy(myVar, classtype) {
            if (!this.varEvents[classtype].has(myVar.id)) {
                this.varEvents[classtype].set(myVar.id, {
                    on: myVar.id + "_on",
                    off: myVar.id + "_off",
                });
            }

            if (!myVar.hasOwnProperty("bless")) {
                const proxy = new Proxy(myVar, {
                    set(target, property, value) {
                        if (property === "value") netvars.handle_var_update(myVar.id, classtype, value);
                        return Reflect.set(...arguments);
                    },
                });

                Object.defineProperty(proxy, "bless", {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: true,
                });

                return [proxy, this.varEvents[classtype].get(myVar.id)];
            }

            return [myVar, this.varEvents[classtype].get(myVar.id)];
        }

        /**
         * Creates a proxy for an array to monitor and handle changes.
         * Triggers event handlers on modifications, such as setting or replacing elements.
         * 
         * @param {Object} myList - The object containing the array to be proxied.
         * @param {string} classtype - Whether the array is operating in a global/local/clone target.
         * @returns {Array[Proxy, Object]} - An array containing a proxy object for the array and an object of event handler names for the array.
         */
        createArrayProxy(myList, classtype) {
            let list = myList.value;

            if (!this.listEvents[classtype].has(myList.id)) {
                this.listEvents[classtype].set(myList.id, {
                    off: myList.id + "_off",
                    length: myList.id + "_length",
                    replace: myList.id + "_replace",
                    set: myList.id + "_set",
                    reset: myList.id + "_reset"
                });
            }

            if (!list.hasOwnProperty("bless")) {
                let proxy = new Proxy(list, {
                    set(target, property, value) {
                        target[property] = value;
                        netvars.handle_list_update(myList.id, classtype, target, property, value);
                        return true;
                    },
                });
    
                Object.defineProperty(proxy, "bless", {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: true,
                });
    
                return [proxy, this.listEvents[classtype].get(myList.id)];
            }
            
            return [list, this.listEvents[classtype].get(myList.id)];
        }

        /**
         * Updates the internal state of the NetworkedVariables class to reflect
         * changes to variables and lists in the runtime. It checks for the existence
         * of variables and lists and marks them for updates if they don't exist
         * anymore. It also converts unblessed variables and lists to networked
         * variables and lists if they are found.
         */
        update() {
            this.networkUpdateTracker.global.keys().forEach((id) => {
                this.update_type(this.networkUpdateTracker.global.get(id), id);
            });

            this.networkUpdateTracker.local.keys().forEach((id) => {
                this.update_type(this.networkUpdateTracker.local.get(id), id);
            });

            this.networkUpdateTracker.clone.keys().forEach((id) => {
                this.update_type(this.networkUpdateTracker.clone.get(id), id);
            });
        }

        update_type(element, id) {
            switch (element.type) {
                case "var":
                    switch (element.classtype) {
                        case "global":

                            // Global variable was deleted
                            if (!vm.runtime.targets[0].variables[id]) {
                                console.log("Global variable", id, "was deleted");
                                callbacks.call(this.varEvents[element.classtype].get(id).off);
                                this.varEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;
                            }
                            break;

                        case "clone":

                            // Clone holdin the variable was deleted
                            if (!vm.runtime.getTargetById(element.clone_id)) {
                                console.log("Clone that was holding clone variable", id, "was deleted");
                                callbacks.call(this.varEvents[element.classtype].get(id).off);
                                this.varEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;

                                // Variable was deleted
                            } else if (!vm.runtime.getTargetById(element.clone_id).variables[id]) {
                                console.log("Clone variable", id, "was deleted");
                                callbacks.call(this.varEvents[element.classtype].get(id).off);
                                this.varEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;
                            }
                            break;

                        case "local":

                            // Variable was deleted
                            if (!vm.runtime.getTargetById(element.target_id).variables[id]) {
                                console.log("Local variable", id, "was deleted");
                                callbacks.call(this.varEvents[element.classtype].get(id).off);
                                this.varEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;
                            }
                            break;
                    }
                    break;

                case "list":
                    switch (element.classtype) {
                        case "global":

                            // Global list was deleted
                            if (!vm.runtime.targets[0].variables[id]) {
                                console.log("Global list", id, "was deleted");
                                callbacks.call(this.listEvents[element.classtype].get(id).off);
                                this.listEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;

                            } else {

                                // Global list was reset and needs to be re-blessed
                                if (!vm.runtime.targets[0].variables[id].value.hasOwnProperty("bless")) {
                                    this.rebless_list(element, id, element.classtype);
                                    return;
                                }
                            }
                            break;

                        case "clone":

                            // If the sprite that was managing the list was deleted, destroy bindings
                            if (!vm.runtime.getTargetById(element.clone_id)) {
                                console.log("Clone that was holding list", id, "was deleted");
                                callbacks.call(this.listEvents[element.classtype].get(id).off);
                                this.listEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;

                                // If the list was deleted in the clone, destroy bindings
                            } else if (!vm.runtime.getTargetById(element.clone_id).variables[id]) {
                                console.log("Clone list", id, "was deleted");
                                callbacks.call(this.listEvents[element.classtype].get(id).off);
                                this.listEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;

                                // List was reset and needs to be re-blessed
                            } else {
                                if (!vm.runtime.getTargetById(element.clone_id).variables[id].value.hasOwnProperty("bless")) {
                                    this.rebless_list(element, id, element.classtype);
                                    return;
                                }
                            }
                            break;

                        case "local":

                            // The list was deleted, so destroy it
                            if (!vm.runtime.getTargetById(element.target_id).variables[id]) {
                                console.log("Local list", id, "was deleted");
                                callbacks.call(this.listEvents[element.classtype].get(id).off);
                                this.listEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;

                                // List was reset and needs to be re-blessed
                            } else {
                                if (!vm.runtime.getTargetById(element.target_id).variables[id].value.hasOwnProperty("bless")) {
                                    this.rebless_list(element, id, true);
                                    return;
                                }
                            }
                            break;
                    }
                    break;
            }
        }

        rebless_list(element, id, classtype) {
            let myList;
            switch (classtype) {
                case "global":
                    myList = vm.runtime.targets[0].variables[id];
                    break;

                case "clone":
                    myList = vm.runtime.getTargetById(element.clone_id).variables[id];
                    break;

                case "local":
                    myList = vm.runtime.getTargetById(element.target_id).variables[id];
                    break;
            }

            let [proxy, callback] = this.createArrayProxy(myList, classtype);

            switch (classtype) {
                case "global":
                    vm.runtime.targets[0].variables[id].value = proxy;
                    break;

                case "clone":
                    vm.runtime.getTargetById(element.clone_id).variables[id].value = proxy;
                    break;

                case "local":
                    vm.runtime.getTargetById(element.target_id).variables[id].value = proxy;
                    break;
            }

            let tracker = this.networkUpdateTracker[classtype].get(id);
            if (tracker.current) {
                tracker.current = false;
                tracker.last = true;
                return;
            }
            
            callbacks.call(callback.reset, proxy);
        }

        /**
         * Overwrites a variable with a proxy that can track changes. It also marks the variable for overwrites so that
         * the runtime can recognize the change.
         * 
         * @param {Object} myVar - The object containing the variable to be proxied.
         * @param {string } target_id - The target ID the variable was bound to.
         * @param {string | undefined} clone_id - Whether the variable is operating in a sprite clone, specify the ID. Otherwise it will be undefined.
         * @returns {Array[Proxy, string, Object]} - An array containing a proxy object for the variable, event handler IDs for the proxy, and metadata.
         */
        makeNetworkedVariable(myVar, target_id, clone_id = undefined) {
            var classtype = "";

            if (clone_id != undefined) {
                classtype = "clone";

            } else if (vm.runtime.getTargetById(target_id).variables[myVar.id]) {
                classtype = "local";

            } else if (vm.runtime.targets[0].variables[myVar.id]) {
                classtype = "global";

            } else {
                throw new Error("Unhandled variable state. Couldn't determine if variable is global, local, or clone-only.");
            }

            let metadata = {
                id: myVar.id,
                class: classtype,
                // target: 0 | string
                type: "var",
            }

            if (!this.networkUpdateTracker[classtype].has(myVar.id)) {
                this.networkUpdateTracker[classtype].set(myVar.id, {
                    current: false,
                    type: "var",
                    proxy: undefined,
                    classtype,
                    events: undefined,
                    is_clone: clone_id != undefined,
                    clone_id: clone_id,
                    target_id: target_id
                });
            }

            const [varProxy, events] = this.createVariableProxy(myVar, classtype);
            const tracker = this.networkUpdateTracker[classtype].get(myVar.id);
            tracker.proxy = varProxy;
            tracker.events = events;

            switch (classtype) {
                case "global":
                    vm.runtime.targets[0].variables[myVar.id] = varProxy;
                    metadata.target = 0;
                    break;

                case "local":
                    vm.runtime.getTargetById(target_id).variables[myVar.id] = varProxy;
                    metadata.target = target_id;
                    break;

                case "clone":
                    vm.runtime.getTargetById(clone_id).variables[myVar.id] = varProxy;
                    metadata.target = target_id;
                    break;
            }

            return [varProxy, events, metadata];
        }

        /**
         * Creates a proxy for an array to monitor and handle changes.
         * Triggers event handlers on modifications, such as setting or replacing elements.
         * 
         * @param {Object} myList - The object containing the array to be proxied.
         * @param {string} target_id - The target ID the array was bound to.
         * @param {string | undefined} clone_id - Whether the array is operating in a sprite clone, specify the ID. Otherwise it will be undefined.
         * @returns {Array[Proxy, Object, Object]} - An array containing a proxy object for the array, an object of event IDs for the array, and an object for metadata.
         */
        makeNetworkedList(myList, target_id, clone_id = undefined) {
            var classtype = "";

            if (clone_id != undefined) {
                classtype = "clone";

            } else if (vm.runtime.getTargetById(target_id).variables[myList.id]) {
                classtype = "local";

            } else if (vm.runtime.targets[0].variables[myList.id]) {
                classtype = "global";

            } else {
                throw new Error("Unhandled list state. Couldn't determine if variable is global, local, or clone-only.");
            }

            let metadata = {
                id: myList.id,
                class: classtype,
                // target: 0 | string
                type: "list"
            }

            if (!this.networkUpdateTracker[classtype].has(myList.id)) {
                this.networkUpdateTracker[classtype].set(myList.id, {
                    current: false,
                    type: "list",
                    proxy: undefined,
                    events: undefined,
                    classtype,
                    last: false,
                    is_clone: clone_id != undefined,
                    clone_id: clone_id,
                    target_id: target_id
                });
            }

            const [arrayProxy, events] = this.createArrayProxy(myList, classtype);
            const tracker = this.networkUpdateTracker[classtype].get(myList.id);
            tracker.proxy = arrayProxy;
            tracker.events = events;

            switch (classtype) {
                case "global":
                    vm.runtime.targets[0].variables[myList.id].value = arrayProxy;
                    metadata.target = 0;
                    break;

                case "local":
                    vm.runtime.getTargetById(target_id).variables[myList.id].value = arrayProxy;
                    metadata.target = target_id;
                    break;

                case "clone":
                    vm.runtime.getTargetById(clone_id).variables[myList.id].value = arrayProxy;
                    metadata.target = clone_id;
                    break;
            }

            return [arrayProxy, events, metadata];
        }

        handle_list_update(myListId, classtype, target, property, value) {
            const tracker = this.networkUpdateTracker[classtype].get(myListId);
            const events = this.listEvents[classtype].get(myListId);

            if (tracker.current) {
                tracker.current = false;
                tracker.last = true;
                return;
            
            } else {
                if (tracker.last) {
                    tracker.last = false;
                    return;
                }
                
                let eventType;
                if (property === "_monitorUpToDate") {
                    eventType = "set";
                } else if (property === "length") {
                    eventType = "length";
                } else if (!isNaN(property)) {
                    if (property < target.length) {
                        eventType = "replace";
                    } else {
                        eventType = "set";
                    }
                }

                switch (eventType) {
                    case "set":
                        callbacks.call(events.set, { property, value });
                        break;
                    case "replace":
                        callbacks.call(events.replace, { property, value });
                        break;
                    case "length":
                        callbacks.call(events.length, value);
                        break;
                    default:
                        throw new Error("Unhandled event type.");
                }
            }
        }

        handle_var_update(myVarId, classtype, value) {
            const tracker = this.networkUpdateTracker[classtype].get(myVarId);
            const events = this.varEvents[classtype].get(myVarId);
            if (tracker.current) {
                tracker.current = false;
            } else {
                callbacks.call(events.on, value);
            }
        }
    }

    // Init extension-global instance because of the way proxies work
    // TODO: fix this?
    const netvars = new NetworkedVariables();

    /*
          General-purpose E2EE extension
  
          MIT License
  
          Copyright (C) 2024 Mike Renaker "MikeDEV".
      */
    class Encryption {

        /**
         * Initializes an instance of the Encryption class.
         * 
         * @property {string} publicKey - The public key of this peer.
         * @property {string} privateKey - The private key of this peer.
         * @property {Map<string, string>} sharedKeys - A map of shared keys
         * with other peers. The keys are the peer IDs and the values are the
         * base64 encoded shared keys.
         */
        constructor() {
            this.publicKey = "";
            this.privateKey = "";
            this.sharedKeys = new Map();
        }

        hasKeyPair() {
            return this.publicKey != "" && this.privateKey != "";
        }

        /**
         * Generates a key pair consisting of a public and private key.
         * @returns {Promise<void>}
         */
        async generateKeyPair() {
            if (!window.crypto || !window.crypto.subtle)
                throw new Error("Web Crypto API is not supported in this browser. Attempted to generate key pair, but it is not possible.");
            let keyPair = await window.crypto.subtle.generateKey(
                {
                    name: "ECDH",
                    namedCurve: "P-256",
                },
                true,
                ["deriveKey", "deriveBits"]
            );
            this.publicKey = await this.exportPublicKey(keyPair.publicKey);
            this.privateKey = await this.exportPrivateKey(keyPair.privateKey);
            console.log("Key pair generated");
        }

        /**
         * Exports a given public key as a base64 encoded string.
         * 
         * @param {CryptoKey} pubKey - The public key to be exported.
         * @returns {Promise<string>} A promise that resolves to the base64 
         * encoded representation of the exported public key.
         */
        async exportPublicKey(pubKey) {
            if (!window.crypto || !window.crypto.subtle)
                throw new Error("Web Crypto API is not supported in this browser. Attempted to export a public key, but it is not possible.");
            let exportedKey = await window.crypto.subtle.exportKey("spki", pubKey);
            return this.arrayBufferToBase64(new Uint8Array(exportedKey));
        }

        /**
         * Imports a given base64 encoded string as a public key.
         * 
         * @param {string} exportedKey - The base64 encoded representation of the public key to be imported.
         * @returns {Promise<CryptoKey>} A promise that resolves to the imported public key.
         */
        async importPublicKey(exportedKey) {
            if (!window.crypto || !window.crypto.subtle)
                throw new Error("Web Crypto API is not supported in this browser. Attempted to import a public key, but it is not possible.");
            const exportedKeyArray = this.base64ToArrayBuffer(exportedKey);
            return await window.crypto.subtle.importKey(
                "spki",
                exportedKeyArray,
                {
                    name: "ECDH",
                    namedCurve: "P-256",
                },
                true,
                []
            );
        }

        /**
         * Exports a given private key as a base64 encoded string.
         * 
         * @param {CryptoKey} privKey - The private key to be exported.
         * @returns {Promise<string>} A promise that resolves to the base64 
         * encoded representation of the exported private key.
         */
        async exportPrivateKey(privKey) {
            if (!window.crypto || !window.crypto.subtle)
                throw new Error("Web Crypto API is not supported in this browser. Attempted to export a private key, but it is not possible.");
            let exportedKey = await window.crypto.subtle.exportKey("pkcs8", privKey);
            return this.arrayBufferToBase64(new Uint8Array(exportedKey));
        }

        /**
         * Imports a given base64 encoded string as a private key.
         * 
         * @param {string} exportedKey - The base64 encoded representation of the private key to be imported.
         * @returns {Promise<CryptoKey>} A promise that resolves to the imported private key.
         */
        async importPrivateKey(exportedKey) {
            if (!window.crypto || !window.crypto.subtle)
                throw new Error("Web Crypto API is not supported in this browser. Attempted to import a private key, but it is not possible.");
            const exportedKeyArray = this.base64ToArrayBuffer(exportedKey);
            return await window.crypto.subtle.importKey(
                "pkcs8",
                exportedKeyArray,
                {
                    name: "ECDH",
                    namedCurve: "P-256",
                },
                true,
                ["deriveKey", "deriveBits"]
            );
        }

        /**
         * Derives a shared key from a given public key and the client's private key, and
         * stores the derived key in the shared key store under the given ID.
         * 
         * @param {string} publicKey - The public key to be used for key derivation.
         * @param {string} id - The ID under which the derived key should be stored.
         * @returns {Promise<void>} A promise that resolves when the key has been derived and stored.
         */
        async deriveSharedKey(publicKey, id) {
            if (!window.crypto || !window.crypto.subtle)
                throw new Error("Web Crypto API is not supported in this browser. Attempted to derive a shared key, but it is not possible.");
            let pubkey = await this.importPublicKey(publicKey);
            let privkey = await this.importPrivateKey(this.privateKey);
            let shared = await window.crypto.subtle.deriveKey(
                {
                    name: "ECDH",
                    public: pubkey,
                },
                privkey,
                {
                    name: "AES-GCM",
                    length: 256,
                },
                true,
                ["encrypt", "decrypt"]
            );
            this.sharedKeys.set(id, await this.exportSharedKey(shared));
        }

        /**
         * Exports a given shared key as a base64 encoded string.
         * 
         * @param {CryptoKey} sharedKey - The shared key to be exported.
         * @returns {Promise<string>} A promise that resolves to the base64 
         * encoded representation of the exported shared key.
         */
        async exportSharedKey(sharedKey) {
            if (!window.crypto || !window.crypto.subtle)
                throw new Error("Web Crypto API is not supported in this browser. Attempted to export a shared key, but it is not possible.");
            let exportedKey = await window.crypto.subtle.exportKey("raw", sharedKey);
            return this.arrayBufferToBase64(new Uint8Array(exportedKey));
        }

        /**
         * Imports a given base64 encoded string as a shared key.
         * 
         * @param {string} exportedKey - The base64 encoded representation of the shared key to be imported.
         * @returns {Promise<CryptoKey>} A promise that resolves to the imported shared key.
         */
        async importSharedKey(exportedKey) {
            if (!window.crypto || !window.crypto.subtle)
                throw new Error("Web Crypto API is not supported in this browser. Attempted to import a shared key, but it is not possible.");
            const exportedKeyArray = this.base64ToArrayBuffer(exportedKey);
            return await window.crypto.subtle.importKey(
                "raw",
                exportedKeyArray,
                {
                    name: "AES-GCM",
                    length: 256,
                },
                true,
                ["encrypt", "decrypt"]
            );
        }

        /**
         * Encrypts a message using the shared key associated with the given ID.
         * 
         * @param {string} message - The message to be encrypted.
         * @param {string} id - The ID used to retrieve the corresponding shared key.
         * @returns {Promise<Array<string>>} A promise that resolves to an array 
         * containing the base64 encoded encrypted message and the base64 encoded 
         * initialization vector (IV).
         */
        async encrypt(message, id) {
            if (!window.crypto || !window.crypto.subtle)
                throw new Error("Web Crypto API is not supported in this browser. Attempted to encrypt a message but it is not possible  (How did you get here?!? This message should never show since a key pair didn't generate).");

            let shared = await this.importSharedKey(this.sharedKeys.get(id));
            let encodedMessage = new TextEncoder().encode(message);
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            const encryptedMessage = await window.crypto.subtle.encrypt(
                {
                    name: "AES-GCM",
                    iv: iv,
                },
                shared,
                encodedMessage
            );
            const encryptedMessageArray = new Uint8Array(encryptedMessage);
            const encryptedMessageBase64 = this.arrayBufferToBase64(
                encryptedMessageArray
            );
            const ivBase64 = this.arrayBufferToBase64(iv);
            return [encryptedMessageBase64, ivBase64];
        }

        /**
         * Decrypts a message using the shared key associated with the given ID.
         * 
         * @param {string} encryptedMessageBase64 - The base64 encoded encrypted message.
         * @param {string} ivBase64 - The base64 encoded initialization vector (IV) used for encryption.
         * @param {string} id - The ID used to retrieve the corresponding shared key.
         * @returns {Promise<string>} A promise that resolves to the decrypted message.
         */
        async decrypt(encryptedMessageBase64, ivBase64, id) {
            if (!window.crypto || !window.crypto.subtle)
                throw new Error("Web Crypto API is not supported in this browser. Attempted to decrypt a message but it is not possible (How did you get here?!? This message should never show since a key pair didn't generate).");

            let shared = await this.importSharedKey(this.sharedKeys.get(id));
            let encryptedMessageArray = this.base64ToArrayBuffer(
                encryptedMessageBase64
            );
            const iv = this.base64ToArrayBuffer(ivBase64);
            const decryptedMessage = await window.crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: iv,
                },
                shared,
                encryptedMessageArray
            );
            const decodedMessage = new TextDecoder().decode(decryptedMessage);
            return decodedMessage;
        }

        /**
         * Converts an array buffer to a base64 encoded string.
         * 
         * @param {ArrayBuffer} buffer - The array buffer to be converted.
         * @returns {string} The base64 encoded string representation of the array buffer.
         */
        arrayBufferToBase64(buffer) {
            let binary = "";
            let bytes = new Uint8Array(buffer);
            for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
        }

        /**
         * Converts a base64 encoded string to an array buffer.
         * 
         * @param {string} base64 - The base64 encoded string to be converted.
         * @returns {ArrayBuffer} The array buffer representation of the base64 encoded string.
         */
        base64ToArrayBuffer(base64) {
            let binary_string = window.atob(base64);
            let len = binary_string.length;
            let bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }
    }

    /*
          PeerJS Helper class
  
          MIT License
  
          Copyright (C) 2025 Mike Renaker "MikeDEV".
      */
    class PeerJS_Helper {
        /**
         * Initializes a PeerJS_Helper instance.
         * 
         */
        constructor() {
            this.peer;
            this.id;
            this.can_reconnect = false;
            this.data_connections = new Map();
            this.voice_connections = new Map();
            this.newest_connected = "";
            this.last_disconnected = "";
            this.hasMicPerms = false;
            this.verbose_logs = false;
            this.ringing_peers = new Map();
            this.localStreams = new Map();
            this.globalChannelData = new Map();
        }

        /**
         * Broadcasts a message to all connected peers on the given channel.
         * 
         * @param {object} message - The message to broadcast to all connected peers.
         * @param {string} channel - The name of the channel to broadcast the message to.
         * @param {boolean} wait - Whether or not to wait for all promises to resolve before returning.
         * @returns {Promise} A promise that resolves once all messages have been sent. If wait is false, the promise will always resolve immediately.
         */
        async broadcast_message_to_peers(message, channel, wait) {
            if (wait) {
                promises = new Array();
                for (const peer of this.all_connected_peers()) {
                    promises.push(this.send_message_to_peer(message, peer, channel));
                }
                await Promise.all(promises);

            } else {
                for (const peer of this.all_connected_peers()) {
                    this.send_message_to_peer(message, peer, channel);
                }
            }
        }

        /**
         * Retrieves the data associated with the given channel from a peer.
         * 
         * @param {string} peer - The ID of the peer to retrieve data from.
         * @param {string} channel - The name of the channel to retrieve data for.
         * @returns {string} The data associated with the channel, or an empty string if the channel does not exist.
         */
        get_private_channel_data(peer, channel) {
            if (this.data_connections.has(peer)) {
                if (this.data_connections.get(peer).channels.has(channel)) {
                    return this.data_connections.get(peer).channels.get(channel).data;
                }
            }
            return "";
        }

        /**
         * Retrieves the data associated with the given global channel.
         * 
         * @param {string} channel - The name of the global channel to retrieve data for.
         * @returns {string} The data associated with the global channel, or an empty string if the channel does not exist.
         */
        get_global_channel_data(channel) {
            if (this.globalChannelData.has(channel)) {
                return this.globalChannelData.get(channel);
            }
            return "";
        }

        /**
         * Handles a newly opened data channel.
         * @param {Peer} conn - The connection that opened the channel.
         * @param {RTCDataChannel} chan - The newly opened data channel.
         * @returns {void}
         *
         * Sets the data channel in the connection's channel map.
         */
        handle_channel_open(conn, chan) {
            conn.channels.set(chan.label, { chan, data: "" });
        }

        /**
         * Handles a newly closed data channel.
         * @param {Peer} conn - The connection that closed the channel.
         * @param {RTCDataChannel} chan - The newly closed data channel.
         * @returns {void}
         *
         * Removes the data channel from the connection's channel map.
         */
        handle_channel_close(conn, chan) {
            conn.channels.delete(chan.label);
        }

        /**
         * Handles an error that occurred on a data channel.
         * @param {Peer} conn - The connection that the error occurred on.
         * @param {RTCDataChannel} chan - The data channel that the error occurred on.
         * @param {Error} err - The error that occurred.
         * @returns {void}
         *
         * Logs a warning with the error message and calls the "onerror" callback with the error.
         */
        handle_channel_error(conn, chan, err) {
            console.warn(
                "Channel " + chan.label + " error with peer " + conn.peer + ":",
                err
            );
            callbacks.call("onerror", {peer: conn.peer, err});
        }

        /**
         * Handles a message received on a data channel.
         * @param {Peer} conn - The connection that the message was received on.
         * @param {RTCDataChannel} chan - The data channel that the message was received on.
         * @param {object} data - A JSON object containing the opcode and payload of the message.
         * @returns {Promise<void>}
         *
         * Switches on the opcode in the data object and calls the appropriate callback with the
         * peer ID, channel label, and payload as arguments. If the opcode is "NEW_CHAN", it
         * creates a new data channel with the specified label and synchronizes the channel ID
         * counter. If the opcode is unknown, it logs a warning.
         */
        async handle_channel_data(conn, chan, data) {
            const { opcode, payload } = data;
            if (this.verbose_logs) console.log(conn.peer, chan.label, data);
            switch (opcode) {
                case "G_MSG":
                    this.globalChannelData.set(chan.label, payload);
                    callbacks.call("gmsg", conn.peer, chan.label, payload);
                    break;
                case "G_VAR":
                    callbacks.call("gvar", conn.peer, chan.label, data);
                    break;
                case "G_LIST":
                    callbacks.call("glist", conn.peer, chan.label, data);
                    break;
                case "P_MSG":
                    conn.channels.get(chan.label).data = payload;
                    callbacks.call("pmsg", conn.peer, chan.label, payload);
                    break;
                case "P_VAR":
                    callbacks.call("pvar", conn.peer, chan.label, data);
                    break;
                case "P_LIST":
                    callbacks.call("plist", conn.peer, chan.label, data);
                    break;
                
                case "HANGUP":
                case "DECLINE":
                    this.hangup_call(conn.peer);
                    break;
                
                case "NEW_CHAN":
                    if (chan.label !== "default") {
                        console.warn(
                            "Attempted to call NEW_CHAN on non-default channel " +
                            chan.label +
                            " with peer " +
                            conn.peer
                        );
                        return;
                    }

                    const { id, label, ordered } = payload;

                    // Don't allow duplicate channel labels
                    if (conn.channels.has(label)) return;

                    // Acquire WebLock to prevent other peers from opening channels while we're creating this one
                    const lock_id = "mikedevcl5_" + conn.peer + "_" + chan.label;
                    await navigator.locks.request(lock_id, { ifAvailable: true }, () => {
                        const newchan = conn.peerConnection.createDataChannel(label, {
                            ordered: ordered,
                            negotiated: true,
                            id: id,
                        });

                        // Synchronize channel ID counter
                        conn.idCounter = id;

                        newchan.onopen = () => {
                            console.log(`Channel ${label} opened with ${conn.peer}`);
                            this.handle_channel_open(conn, newchan);
                            callbacks.call("on_chan_open");
                        };

                        newchan.onclose = () => {
                            console.log(`Channel ${label} with ${conn.peer} closed`);
                            this.handle_channel_close(conn, newchan);
                            callbacks.call("on_chan_close");
                        };

                        newchan.onerror = (err) => {
                            this.handle_channel_error(conn, newchan, err);
                        };

                        newchan.onmessage = async (msg) => {
                            await this.handle_channel_data(conn, newchan, JSON.parse(msg.data));
                        };

                        // Store channel reference
                        conn.channels.set(label, {
                            data: "",
                            chan: newchan,
                        });
                    });
                    break;
                default:
                    console.warn("Unknown or unimplemented opcode: " + opcode);
                    break;
            }
        }

        /**
         * Sets up event listeners for a data connection to handle channel lifecycle events and data.
         *
         * @param {Peer} conn - The data connection to set up event handlers on.
         *
         * The function listens for the following connection events:
         * - "open": Handles the opening of a channel and triggers the "onpeerconnect" callback if it is the default channel.
         * - "close": Handles the closing of a channel, removes the connection, and triggers the "onpeerdisconnect" callback if it is the default channel.
         * - "error": Handles errors occurring on the channel.
         * - "data": Processes incoming data messages on the channel.
         */
        handle_data_connection(conn) {

            conn.on("open", () => {
                console.log(`Channel ${conn.label} opened with ${conn.peer.id}`);
                this.handle_channel_open(conn, conn);
                if (conn.label === "default") {
                    this.newest_connected = conn.peer;
                    callbacks.call("onpeerconnect", conn.peer);
                } else {
                    
                    callbacks.call("on_chan_open");
                }
            });

            conn.on("close", () => {
                console.log(`Channel ${conn.label} with ${conn.peer.id} closed`);
                this.handle_channel_close(conn, conn);
                if (conn.label === "default") {
                    this.last_disconnected = conn.peer;
                    this.data_connections.delete(conn.peer);
                    if (this.voice_connections.has(conn.peer)) {
                        this.voice_connections.get(conn.peer).call.close();
                    }
                    callbacks.call("onpeerdisconnect", conn.peer);
                } else {
                    callbacks.call("on_chan_close");
                }
            });

            conn.on("error", (err) => {
                this.handle_channel_error(conn, conn, err);
            });

            conn.on("data", async (data) => {
                await this.handle_channel_data(conn, conn, JSON.parse(data));
            });
        }

        /**
         * Creates a new peer connection with the given ID and configures it to send and receive data.
         *
         * @param {string} ID - The ID of the peer to create.
         * @param {Object} config - PeerJS-compatible configuration options. See https://peerjs.com/docs/.
         * @returns {void}
         *
         * The function sets up event listeners for the peer to listen for the following events:
         * - "open": Triggers the "oncreate" callback when the peer is created and ready.
         * - "connection": Handles new data connections and sets up event listeners to handle channel lifecycle events and data.
         * - "call": Handles incoming voice calls and triggers the "onring" callback. If the call is accepted, a new voice connection is created.
         * - "close": Triggers the "ondestroy" callback when the peer is closed.
         * - "disconnected": Triggers the "ondisconnect" callback when the peer is disconnected.
         * - "error": Triggers the "onerror" callback with the error message when an error occurs on the peer.
         */
        create_peer(ID, config) {
            this.peer = new Peer(ID, config);
            this.peer.on("open", (id) => {
                if (id === ID) {
                    this.peer_id = id;
                    if (this.can_reconnect) {
                        this.can_reconnect = false;
                        callbacks.call("onreconnect");
                    } else {
                        callbacks.call("oncreate");
                    }
                }
            });
            this.peer.on("connection", (conn) => {
                conn.idCounter = 2;
                conn.channels = new Map();
                this.data_connections.set(conn.peer, conn);
                this.handle_data_connection(conn);
            });
            this.peer.on("call", async (call) => {
                this.ringing_peers.set(call.peer, call);
                this.handle_call(call.peer, call);
                callbacks.call("onring", call.peer);
            });
            this.peer.on("close", () => {
                callbacks.call("ondestroy");
            });
            this.peer.on("disconnected", () => {
                callbacks.call("ondisconnect");
            });
            this.peer.on("error", (err) => {
                console.log("Peer error: " + err);
                callbacks.call("onerror", {peer: this.peer, err});
            });
        }

        /**
         * Establishes a data connection to a peer with the specified ID.
         *
         * @param {string} ID - The ID of the peer to connect to.
         * @returns {void}
         *
         * The function checks if the peer is already connected or if a connection
         * already exists. If not, it initiates a new connection with default settings
         * and sets up event handlers to manage the connection lifecycle.
         */
        connect_to_peer(ID) {
            if (!this.is_connected()) return;
            if (this.data_connections.has(ID)) return;
            const conn = this.peer.connect(ID, {
                label: "default",
                reliable: true,
            });
            this.data_connections.set(conn.peer, conn);
            conn.idCounter = 2;
            conn.channels = new Map();
            this.handle_data_connection(conn);
        }

        /**
         * Disconnects from a peer with the given ID. If the peer does not exist or is not connected, this function is a no-op.
         *
         * @param {string} ID - The ID of the peer to disconnect from.
         * @returns {void}
         */
        disconnect_peer(ID) {
            if (!this.peer) return;
            if (!this.data_connections.has(ID)) return;
            this.data_connections.get(ID).close();
            this.data_connections.delete(ID);
            this.hangup_call(ID);
        }

        /**
         * Checks if a peer is connected to us.
         *
         * @param {string} ID - The ID of the peer to check.
         * @returns {boolean} - True if the peer is connected, false otherwise.
         */
        is_other_peer_connected(ID) {
            if (!this.peer) return false;
            if (!this.data_connections.has(ID)) return false;
            return !this.data_connections.get(ID).disconnected;
        }

        /**
         * Checks if a peer is currently ringing (has an open incoming voice connection that we have not yet accepted).
         *
         * @param {string} ID - The ID of the peer to check.
         * @returns {boolean} - True if the peer is ringing, false otherwise.
         */
        when_peer_rings_me(ID) {
            return this.is_other_peer_connected(ID);
        }

        /**
         * Opens a new data channel with a peer with the specified ID and channel name.
         * 
         * @param {string} ID - The ID of the peer to open a channel with.
         * @param {string} CHANNEL - The name of the channel to open.
         * @param {boolean} ORDERED - Whether the channel should be ordered (true) or unordered (false).
         * @returns {void}
         */
        async open_data_channel(ID, CHANNEL, ORDERED) {
            if (!this.is_connected()) return;
            if (!this.data_connections.has(ID)) return;
            if (this.data_connections.get(ID).channels.has(CHANNEL)) return;

            const lock_id = "mikedevcl5_" + ID + "_" + CHANNEL;
            await navigator.locks.request(lock_id, { ifAvailable: true }, () => {
                // Create a new channel with PeerJS
                const conn = this.data_connections.get(ID);
                const id = conn.idCounter++;

                // Since PeerJS doesn't natively support multiple channels, we have to create a new one manually
                const chan = conn.peerConnection.createDataChannel(CHANNEL, {
                    ordered: ORDERED,
                    negotiated: true,
                    id: id,
                });

                chan.onopen = () => {
                    console.log(`Channel ${CHANNEL} opened with ${ID}`);
                    this.handle_channel_open(conn, chan);
                    callbacks.call("on_chan_open",);
                };

                chan.onclose = () => {
                    console.log(`Channel ${CHANNEL} with ${ID} closed`);
                    this.handle_channel_close(conn, chan);
                    callbacks.call("on_chan_close");
                };

                chan.onerror = (err) => {
                    this.handle_channel_error(conn, chan, err);
                };

                chan.onmessage = async (msg) => {
                    await this.handle_channel_data(conn, chan, JSON.parse(msg.data));
                };

                // Store channel reference
                conn.channels.set(CHANNEL, {
                    data: "",
                    chan: chan,
                });

                // Tell the peer about the new channel
                conn.channels.get("default").chan.send(
                    JSON.stringify({
                        opcode: "NEW_CHAN",
                        payload: {
                            id: id,
                            label: CHANNEL,
                            ordered: ORDERED,
                        },
                    })
                );
            });
        }

        /**
         * Sends a message to another peer over a specific channel.
         * @param {Object} payload - The data to send to the peer.
         * @param {String} ID - The ID of the peer to send the message to.
         * @param {String} channel - The label of the channel to send the message over.
         * @returns {Promise<void>}
         */
        async send_message_to_peer(payload, ID, channel) {
            if (!this.peer) return;
            if (!this.data_connections.has(ID)) return;
            const conn = this.data_connections.get(ID);
            if (!conn.channels.has(channel)) return;
            return new Promise((resolve) => {
                const packet = JSON.stringify(payload);
                conn.channels.get(channel).chan.send(packet);
                resolve();
            });
        }

        /**
         * Disconnects from the current peer connection. Does nothing if the connection is already disconnected.
         * 
         * @returns {void}
         */
        disconnect() {
            if (!this.peer) return;
            if (this.peer.open) {
                this.can_reconnect = true;
                this.peer.disconnect();
            }
        }

        /**
         * Reconnects the peer connection. Does nothing if the connection is already connected.
         * 
         * @returns {void}
         */
        reconnect() {
            if (!this.peer) return;
            if (!this.peer.open && this.can_reconnect) {
                this.peer.reconnect();
            }
        }

        /**
        * Disconnects the current peer connection and destroys it, allowing the ID to be reclaimed by the PeerJS cloud server. Does nothing if the connection is already destroyed.
        * 
        * @returns {void}
        */
        destroy() {
            if (!this.peer) return;
            this.can_reconnect = false;
            this.peer.destroy();
            this.disconnect_all_peers();
        }

        disconnect_all_peers() {
            // Close all data connections
            this.data_connections.forEach((conn) => {
                if (conn.peerConnection) conn.peerConnection.close();
            })

            // Disconnect from all voice connections
            this.voice_connections.forEach((conn) => {
                if (conn.peerConnection) conn.peerConnection.close();
            });

            // Cleanup
            this.data_connections.clear();
            this.voice_connections.clear();
        }

        /**
         * Checks if the current peer connection is connected and not destroyed.
         * 
         * @returns {boolean} - True if the connection is connected and not destroyed, false otherwise.
         */
        is_connected() {
            if (!this.peer) return false;
            return !this.peer.disconnected && !this.peer.destroyed;
        }

        /**
         * Used to handle events when a specific peer gets a message on a specific channel.
         * 
         * @param {string} ID - The ID of the peer to check.
         * @param {string} CHANNEL - The name of the channel to check.
         * @returns {boolean} - True if the peer has the channel, false otherwise.
         */
        when_peer_gives_me_message(ID, CHANNEL) {
            return this.does_peer_have_channel({ ID, CHANNEL });
        }

        /**
         * Used to handle events when a specific peer connects to this peer.
         * 
         * @param {string} ID - The ID of the peer to check.
         * @returns {boolean} - True if the peer exists, false otherwise.
         */
        when_other_peer_connects(ID) {
            return this.is_other_peer_connected(ID);
        }

        /**
         * Used to handle events when a specific peer disconnects from this peer.
         * 
         * @param {string} ID - The ID of the peer to check.
         * @returns {boolean} - True if the peer doesn't exist, false otherwise.
         */
        when_other_peer_disconnects(ID) {
            return !this.is_other_peer_connected(ID);
        }

        /**
         * Used to check if a peer has an open data channel.
         * 
         * @param {string} ID - The ID of the peer to check.
         * @param {string} CHANNEL - The name of the channel to check.
         * @returns {boolean} - True if the peer has the channel, false otherwise.
         */
        does_peer_have_channel(ID, CHANNEL) {
           if (this.data_connections.has(ID)) {
                if (this.data_connections.get(peer).channels.has(CHANNEL)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Closes a data channel with a peer. Does nothing if the channel or peer doesn't exist.
         * 
         * @param {string} ID - The ID of the peer.
         * @param {string} CHANNEL - The name of the channel to close.
         * @returns {void}
         */
        close_data_channel(ID, CHANNEL) {
            if (!this.does_peer_have_channel(ID, CHANNEL)) return;
            const chan = this.data_connections.get(ID).channels.get(CHANNEL).chan;
            chan.close();
            this.data_connections.get(ID).channels.delete(CHANNEL);
        }

        /**
         * Reads the currently stored message in a peer's channel.
         * 
         * @param {string} ID - The ID of the peer.
         * @param {string} CHANNEL - The name of the channel to read from.
         * @returns {any}
         */
        read_private_message(ID, CHANNEL) {
            if (!this.peer) return "";
            const conn = this.data_connections.get(ID);
            if (!conn) return "";
            if (!conn.channels.has(CHANNEL)) return "";
            return conn.channels.get(CHANNEL).data;
        }

        /**
         * Retrieves the ID of the most recently connected peer.
         * 
         * @returns {string} - The ID of the newest peer connected.
         */
        newest_peer_connected() {
            return this.newest_connected;
        }

        async request_microphone_permissions() {
            if (!this.hasMicPerms && await Scratch.canRecordAudio()) this.hasMicPerms = true;
        }

        /**
         * Retrieves the ID of the most recently disconnected peer.
         * 
         * @returns {string} - The ID of the last peer disconnected.
         */
        last_peer_disconnected() {
            return this.last_disconnected;
        }
        
        /**
         * Determines if the microphone corresponding to the given ID is muted.
         *
         * @param {string} ID - The ID of the stream to check.
         * @returns {boolean} - True if the microphone is muted, false otherwise.
         */
        is_microphone_muted(ID) {
            if (!this.localStreams.has(ID)) return false;
            const localStream = this.localStreams.get(ID);
            return localStream.getAudioTracks().every((track) => !track.enabled);
        }

        /**
         * Sets the microphone mute state for a peer's voice connection.
         *
         * @param {string} ID - The ID of the peer to set the microphone state for.
         * @param {boolean} STATE - The state to set the microphone to. True - mute, False - unmute.
         * @returns {void}
         */
        set_microphone_state(ID, STATE) {
            if (!this.localStreams.has(ID)) return;
            const localStream = this.localStreams.get(ID);
            localStream.getAudioTracks().forEach((track) => {track.enabled = STATE;});
        }

        /**
         * Checks if a voice connection with the specified peer ID is connected.
         *
         * @param {string} ID - The ID of the peer to check the voice connection status for.
         * @returns {boolean} - True if the voice connection is connected, false otherwise or if the peer doesn't exist.
         */
        is_peer_voice_connected(ID) {
            return this.voice_connections.has(ID);
        }

        /**
         * Initiates a voice call to a peer with the specified ID, using the locally acquired microphone stream.
         *
         * @param {string} ID - The ID of the peer to call.
         * @returns {Promise<void>}
         *
         * The function first checks if the peer is connected and if we have microphone permissions. If not, it requests
         * permissions and returns if they are still not granted. If the peer is already connected via voice, it does not
         * do anything.
         *
         * It then uses the PeerJS API to create a new call to the peer with the specified ID and the locally acquired
         * microphone stream. The call object is then passed to the handleCall function to set up event listeners.
         */
        async call_peer(ID) {
            if (!this.is_connected()) return;
            if (!this.is_other_peer_connected(ID)) return;
            if (this.voice_connections.has(ID)) return;

            // Redirect the function call if the peer is already ringing
            if (this.ringing_peers.has(ID)) {
                return await this.answer_call(ID);
            };

            if (!this.hasMicPerms && await Scratch.canRecordAudio()) this.hasMicPerms = true;
            if (!this.hasMicPerms) return;

            const lock_id = "mikedevcl5_" + ID + "_call";
            await navigator.locks.request(
                lock_id,
                { ifAvailable: true },
                async () => {
                    await navigator.mediaDevices
                    .getUserMedia({ audio: true })
                    .then(async(localStream) => {
                        if (!this.localStreams.has(ID)) this.localStreams.set(ID, localStream);
                        if (this.verbose_logs) console.log("Obtained local stream: ", localStream);
                        if (this.verbose_logs) console.log("Calling peer", ID);
                        const call = await this.peer.call(ID, localStream);
                        this.handle_call(ID, call);
                    })
                    .catch((e) => {
                        if (this.verbose_logs) console.warn(`Failed to get local stream: ${e}`);
                    });
                }
            );
        }

        /**
         * Hangs up an active voice call with a peer.
         *
         * @param {string} ID - The ID of the peer to hang up the call with.
         * @returns {void}
         *
         * The function checks if there is an active voice connection with the specified peer ID.
         * If a connection exists, it closes the call associated with that peer.
         */
        hangup_call(ID) {
            if (this.voice_connections.has(ID)) {
                this.voice_connections.get(ID).call.close();
                this.voice_connections.delete(ID);
            };

            if (this.ringing_peers.has(ID)) {
                this.ringing_peers.get(ID).close();
                this.voice_connections.delete(ID);
            };
        }

        /**
         * Answers an incoming voice call from a peer with the specified ID, using the locally acquired microphone stream.
         *
         * @param {string} ID - The ID of the peer to answer the call from.
         * @returns {Promise<void>}
         *
         * The function first checks if the peer is connected and if we have microphone permissions. If not, it requests
         * permissions and returns if they are still not granted. If the peer is not ringing, it does not do anything.
         *
         * It then uses the PeerJS API to answer the call with the locally acquired microphone stream. The call object is
         * then passed to the handleCall function to set up event listeners.
         */
        async answer_call(ID) {
            if (!this.peer) return;
            if (!this.is_other_peer_connected(ID)) return;
            if (!this.ringing_peers.has(ID)) return;

            if (!this.hasMicPerms && await Scratch.canRecordAudio()) this.hasMicPerms = true;
            if (!this.hasMicPerms) return;
            
            const call = this.ringing_peers.get(ID);
            const lock_id = "mikedevcl5_" + ID + "_call";
            await navigator.locks.request(
                lock_id,
                { ifAvailable: true },
                async () => {
                    await navigator.mediaDevices
                    .getUserMedia({ audio: true })
                    .then(async(localStream) => {
                        if (!this.localStreams.has(ID)) this.localStreams.set(ID, localStream);
                        if (this.verbose_logs) console.log("Obtained local stream: ", localStream);
                        if (this.verbose_logs) console.log("Answering call from peer", ID);
                        call.answer(localStream);
                    })
                    .catch((e) => {
                        if (this.verbose_logs) console.warn(`Failed to get local stream: ${e}`);
                    });
                }
            );
        }

        async decline_call(ID) {
            if (!this.peer) return;
            if (!this.is_other_peer_connected(ID)) return;
            if (!this.ringing_peers.has(ID)) return;
            
            if (this.verbose_logs) console.log("Declining call from peer", ID);
            this.send_message_to_peer({opcode: "DECLINE"}, ID, "default");
        }

        /**
         * Handles a call from a peer, setting up event listeners for the call and creating an audio element to play the
         * remote stream.
         *
         * @param {string} id - The ID of the peer to handle the call from.
         * @param {PeerJS.Call} call - The call object to handle.
         */
        handle_call(id, call) {

            if (!call) {
                throw new Error("Got undefined call argument!");
            }

            call.on("stream", (remoteStream) => {
                this.build_audio_flow(id, remoteStream);
            });

            call.on("close", () => {
                if (this.localStreams.has(id)) {
                    this.localStreams.delete(id);
                }
                if (this.ringing_peers.has(id)) {
                    if (this.verbose_logs) console.log("Peer", id, "hung up while ringing");
                    this.ringing_peers.delete(id);
                } else {
                    if (this.verbose_logs) console.log("Peer", id, "hung up the call");
                    this.voice_connections.delete(id);
                }
            });

            call.on("error", (err) => {
                console.warn("Call with peer " + id + " error: " + err);
            });
        }

        build_audio_flow(id, stream) {
            if (!this.audioContext) {
                this.audioContext = vm.runtime.audioEngine.audioContext;
                if (!this.audioContext) throw new Error("Audio context not found or not yet initialized!");
            }

            if (this.ringing_peers.has(id)) this.ringing_peers.delete(id);

            // Initialize source
            const source = this.audioContext.createMediaStreamSource(stream);
            if (this.verbose_logs) console.log("Initialized Media Stream Source", source);
            
            // Initialize panner
            const panner = this.audioContext.createPanner();
            panner.panningModel = "HRTF";
            panner.distanceModel = "inverse";
            panner.refDistance = 1;
            panner.maxDistance = 10000;
            panner.rolloffFactor = 1;
            panner.coneInnerAngle = 360;
            panner.coneOuterAngle = 0;
            panner.coneOuterGain = 0;
            panner.positionX.value = 0;
            panner.positionY.value = 0;
            panner.positionZ.value = 0;
            if (this.verbose_logs) console.log("Initialized Panner", panner);

            // Initialize gain
            const gain = this.audioContext.createGain();
            gain.gain.value = 1; 
            if (this.verbose_logs) console.log("Initialized Gain", gain);

            // Connect elements
            source.connect(panner);
            panner.connect(gain);
            gain.connect(this.audioContext.destination);

            // Store elements
            this.voice_connections.set(id, {
                call: call,
                audio: stream,
                gain,
                panner
            });
            if (this.verbose_logs) console.log("Stored elements for call with peer", id, " - ", this.voice_connections.get(id));

            // Log to console
            if (this.verbose_logs) console.log("Opening audio stream for call with peer", id);

            if (this.audioContext.state === "suspended") {
                if (this.verbose_logs) console.log("Resuming audio context");
                this.audioContext.resume();
            }
        }

        /**
         * Sets the x-coordinate of the peer's audio in the spatial audio scene.
         *
         * @param {string} id - The ID of the peer to set the x-coordinate for.
         * @param {number} x - The x-coordinate.
         * @returns {void}
         */
        set_call_x(id, x) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            connection.panner.positionX.value = x;
        }

        get_call_x(id) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            return connection.panner.positionX.value;
        }

        change_call_x(id, steps) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            connection.panner.positionX.value = connection.panner.positionX.value + steps;
        }

        /**
         * Sets the y-coordinate of the peer's audio in the spatial audio scene.
         *
         * @param {string} id - The ID of the peer to set the y-coordinate for.
         * @param {number} y - The y-coordinate.
         * @returns {void}
         */
        set_call_y(id, y) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            connection.panner.positionY.value = y;
        }

        get_call_y(id) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            return connection.panner.positionY.value;
        }

        change_call_y(id, steps) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            connection.panner.positionY.value = connection.panner.positionY.value + steps;
        }

        /**
         * Sets the y-coordinate of the peer's audio in the spatial audio scene.
         *
         * @param {string} id - The ID of the peer to set the y-coordinate for.
         * @param {number} y - The y-coordinate.
         * @returns {void}
         */
        set_call_z(id, z) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            connection.panner.positionZ.value = z;
        }

        get_call_z(id) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            return connection.panner.positionZ.value;
        }
        
        change_call_z(id, steps) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            connection.panner.positionZ.value = connection.panner.positionZ.value + steps;
        }

        /**
         * Sets the volume of the peer's audio in the spatial audio scene.
         *
         * @param {string} id - The ID of the peer to set the volume for.
         * @param {number} volume - The volume, in the range [0-100].
         * @returns {void}
         */
        set_call_volume(id, volume) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            connection.gain.gain.value = (volume / 100).toFixed(2);
        }

        get_call_volume(id) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            return (connection.gain.gain.value * 100).toFixed(2);
        }

        change_call_volume(id, steps) {
            if (!this.voice_connections.has(id)) return;
            const connection = this.voice_connections.get(id);
            connection.gain.gain.value = connection.gain.gain.value + steps;
        }

        /**
         * Returns an array of all peer IDs that are currently connected to the local peer.
         *
         * @returns {Array<string>}
         */
        all_connected_peers() {
            // Take an array of all peer objects, filter it out based on peer.open, and return an array of ids
            return Array.from(this.data_connections.keys()).filter((id) => this.data_connections.get(id).open);
        }

        /**
         * Returns an array of all channel labels that are currently open with the given peer.
         *
         * @param {string} peer - The ID of the peer to get the channel labels for.
         * @returns {Array<string>}
         */
        get_peer_channels(peer) {
            if (!this.data_connections.has(peer)) return [];
            return Array.from(this.data_connections.get(peer).channels.keys());
        }
    }

    class CloudLink5 {
        constructor() {
            this.encryption = new Encryption();
            this.net = new PeerJS_Helper();
            this.peer_usernames = new Map();
            this.peer_accountids = new Map();
            this.ice_servers = [];
            this.conn_builder = {};
            this.conn = null;
            this.instance_id, this.username, this.user_id, this.lobbyhost = "";
            this.initialized = false;
            this.lastErrorMessage = "";
            this.lastPeerError = "";
            this.mode = "";
            this.relay_peer = "";
            this.lobbylist = [];
            this.lobbyinfo = {};
            this.netid_proxies = new Map();
            this.netid_meta = new Map();
            this.verbose_logs = false;

            // for passthrough
            this.callbacks = callbacks;
            this.netvars = netvars;
        }

        getInfo() {
            return {
                blockIconURI: blockIconURI,
                menuIconURI: menuIconURI,
                color1: "#0FBD8C",
                color2: "#80C6B2",
                color3: "#0A7255",
                id: 'mikedevcl5',
                name: 'CL5',
                blocks: [
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate(`ℹ️ Version ${version}`),
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("👤 Session"),
                    },
                    {
                        opcode: "on_player_session_spawned",
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate("when my player session is created"),
                        isEdgeActivated: false,
                    },
                    {
                        opcode: "on_player_session_destroyed",
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate("when my player session is destroyed"),
                        isEdgeActivated: false,
                    },
                    {
                        opcode: "on_player_session_disconnected",
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate("when my player session is disconnected"),
                        isEdgeActivated: false,
                    },
                    {
                        opcode: "on_player_session_reconnected",
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate("when my player session gets reconnected"),
                        isEdgeActivated: false,
                    },
                    {
                        opcode: "on_player_mode_changed",
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate("when my player mode changes"),
                        isEdgeActivated: false,
                    },
                    "---",
                    {
                        opcode: "is_session_connected",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate("connected to session server?"),
                    },
                    {
                        opcode: "my_ID",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("my instance id"),
                    },
                    {
                        opcode: "my_ID_account",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("my account id"),
                    },
                    {
                        opcode: "my_Username",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("my username"),
                    },
                    {
                        opcode: "get_client_mode",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("my current player mode"),
                    },
                    "---",
                    {
                        opcode: "disconnect",
                        text: Scratch.translate('disconnect from session server'),
                        blockType: Scratch.BlockType.COMMAND,
                    },
                    {
                        opcode: "reconnect",
                        text: Scratch.translate('reconnect to session server'),
                        blockType: Scratch.BlockType.COMMAND,
                    },
                    "---",
                    {
                        opcode: "on_player_session_error",
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate("when my player session gets an error"),
                        isEdgeActivated: false,
                    },
                    {
                        opcode: "get_client_error",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("last error message"),
                    },
                    {
                        opcode: "get_client_error_peer",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("last error peer"),
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("🔌 Connectivity"),
                    },
                    {
                        opcode: "on_connect",
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate("when connected to game server"),
                        isEdgeActivated: false,
                    },
                    {
                        opcode: "on_disconnect",
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate("when disconnected from game server"),
                        isEdgeActivated: false,
                    },
                    {
                        opcode: "is_signalling_connected",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate("connected to game server?"),
                    },
                    {
                        opcode: "destroy",
                        text: Scratch.translate('destroy connections and disconnect'),
                        blockType: Scratch.BlockType.COMMAND,
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("🛠️ Connection Builder"),
                    },
                    {
                        opcode: "connection_builder",
                        text: [Scratch.translate("create connection"), Scratch.translate("then connect")],
                        blockType: Scratch.BlockType.CONDITIONAL,
                        branchCount: 1,
                    },
                    {
                        opcode: "set_game_server",
                        text: Scratch.translate('using game server [SERVER]'),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            SERVER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "wss://cl5-peerjs.mikedev101.cc?ugi=debug",
                            }
                        }
                    },
                    {
                        opcode: "set_keepalive",
                        text: Scratch.translate('keepalive connection to game server? [ALIVE] and ping every [PING] seconds'),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            ALIVE: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false,
                            },
                            PING: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5,
                            }
                        }
                    },
                    {
                        opcode: "set_verbose",
                        text: Scratch.translate('set logging level to [LEVEL]'),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            LEVEL: {
                                type: Scratch.ArgumentType.NUMBER,
                                menu: "verbose_levels",
                                defaultValue: "0",
                            }
                        }
                    },
                    {
                        opcode: "auth_with_token",
                        text: Scratch.translate('authenticate game server with token [TOKEN]'),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            TOKEN: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "",
                            }
                        }
                    },
                    {
                        opcode: "auth_with_cookie",
                        text: Scratch.translate('authenticate game server with cookie'),
                        blockType: Scratch.BlockType.COMMAND
                    },
                    {
                        opcode: "auth_with_name",
                        text: Scratch.translate('authenticate game server with default token and set username to [USERNAME]'),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            USERNAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "",
                            }
                        }
                    },
                    {
                        opcode: "set_peerjs_server",
                        text: Scratch.translate('using session server [SERVER] with key: [KEY] and ping every [PING] seconds'),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            SERVER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "wss://0.peerjs.com/",
                            },
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "",
                            },
                            PING: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "5",
                            },
                        }
                    },
                    {
                        opcode: "ice_list_builder",
                        text: ["with ICE options"],
                        blockType: Scratch.BlockType.CONDITIONAL,
                        branchCount: 1,
                    },
                    {
                        opcode: "set_stun_server",
                        text: Scratch.translate('add STUN server [SERVER]'),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            SERVER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "stun:vpn.mikedev101.cc:5349",
                            }
                        }
                    },
                    {
                        opcode: "set_turn_server",
                        text: Scratch.translate('add TURN server [SERVER] with username [USER] and password [PASSWORD]'),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            SERVER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "turn:vpn.mikedev101.cc:5349",
                            },
                            USER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "free",
                            },
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "free",
                            }
                        }
                    },
                    {
                        opcode: "set_relay_only",
                        text: Scratch.translate('force TURN-based relay only mode'),
                        blockType: Scratch.BlockType.COMMAND,
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("🕹️ Lobbies"),
                    },
                    {
                        opcode: "get_relay_peer",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("relay peer ID"),
                    },
                    {
                        opcode: "lobby_host",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("current lobby host"),
                    },
                    {
                        opcode: "lobby_list",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("all public lobbies"),
                    },
                    {
                        opcode: "query_lobbies",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("refresh public lobbies list"),
                    },
                    "---",
                    {
                        opcode: "lobby_info",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("lobby info"),
                    },
                    {
                        opcode: "query_lobby",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("get info about public lobby [LOBBY]"),
                        arguments: {
                            LOBBY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "DemoLobby",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "init_peer_mode",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "join lobby [LOBBY] with password [PASSWORD]"
                        ),
                        arguments: {
                            LOBBY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "DemoLobby",
                            },
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "",
                            },
                        },
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("⚙️ Lobby hosting"),
                    },
                    {
                        opcode: "is_lobby_host",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate("am I the lobby host?"),
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("Set the limit to -1 to"),
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("allow unlimited players."),
                    },
                    {
                        opcode: "init_host_mode",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "host a lobby named [LOBBY] set the player limit to [PEERS] players, set password to [PASSWORD] lock access? [LOCK] enable server relay? [RELAY]"
                        ),
                        arguments: {
                            LOBBY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "DemoLobby",
                            },
                            PEERS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "-1",
                            },
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "",
                            },
                            LOCK: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false,
                            },
                            RELAY: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false,
                            },
                        },
                    },
                    {
                        opcode: "set_lock_flag",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "set locked access to [LOCK]"
                        ),
                        arguments: {
                            LOCK: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: false,
                            },
                        },
                    },
                    {
                        opcode: "set_player_limit_value",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "set the player limit to [PEERS]"
                        ),
                        arguments: {
                            PEERS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "-1",
                            },
                        },
                    },
                    {
                        opcode: "set_password_value",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "set the lobby password to [PASSWORD]"
                        ),
                        arguments: {
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "change me",
                            },
                        },
                    },
                    {
                        opcode: "kick_peer_from_lobby",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "kick [PEER] from the lobby"
                        ),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "transfer_ownership",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "transfer ownership of the lobby to [PEER]"
                        ),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "close_lobby",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "close lobby"
                        ),
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("🎭 Players"),
                    },
                    {
                        opcode: "on_new_peer",
                        blockType: Scratch.BlockType.EVENT,
                        isEdgeActivated: false,
                        text: Scratch.translate("when a new player connects"),
                    },
                    {
                        opcode: "get_new_peer",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("newest player connected"),
                    },
                    "---",
                    {
                        opcode: "on_peer_left",
                        blockType: Scratch.BlockType.EVENT,
                        isEdgeActivated: false,
                        text: Scratch.translate("when player [ID] disconnects"),
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        }
                    },
                    {
                        opcode: "get_last_peer",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("last player disconnected"),
                    },
                    "---",
                    {
                        opcode: "get_peers",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("connected players"),
                    },
                    {
                        opcode: "get_peer_username",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("player [ID] username"),
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        }
                    },
                    {
                        opcode: "get_peer_accountid",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("player [ID] account ID"),
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        }
                    },
                    {
                        opcode: "get_peer_channels",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("player [PEER] channels"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "is_peer_connected",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate("connected to peer [PEER]?"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "disconnect_peer",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("disconnect peer [PEER]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("📡 Channels"),
                    },
                    {
                        opcode: "on_new_dchan",
                        blockType: Scratch.BlockType.EVENT,
                        isEdgeActivated: false,
                        text: Scratch.translate("when channel [CHANNEL] is created with peer [PEER]"),
                        arguments: {
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "foobar",
                            },
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        }
                    },
                    {
                        opcode: "new_dchan",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "open a new channel named [CHANNEL] with player [PEER] and prefer [ORDERED]"
                        ),
                        arguments: {
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "foobar",
                            },
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            ORDERED: {
                                menu: "ordered_menu",
                                acceptReporters: true,
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: "true",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "on_close_dchan",
                        blockType: Scratch.BlockType.EVENT,
                        isEdgeActivated: false,
                        text: Scratch.translate("when channel [CHANNEL] is closed with peer [PEER]"),
                        arguments: {
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "foobar",
                            },
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        }
                    },
                    {
                        opcode: "close_dchan",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "close channel named [CHANNEL] with player [PEER]"
                        ),
                        arguments: {
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "foobar",
                            },
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "on_broadcast_message",
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate(
                            "when I get a broadcast in channel [CHANNEL]"
                        ),
                        isEdgeActivated: false,
                        arguments: {
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                        },
                    },
                    {
                        opcode: "get_global_channel_data",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("broadcast channel [CHANNEL]"),
                        arguments: {
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                        },
                    },
                    {
                        opcode: "broadcast",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "broadcast [DATA] to all players using channel [CHANNEL] and wait until done sending? [WAIT]"
                        ),
                        arguments: {
                            DATA: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello",
                            },
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                            WAIT: {
                                type: "Boolean",
                                defaultValue: false,
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "on_private_message",
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate(
                            "when I get a message from player [PEER] in channel [CHANNEL]"
                        ),
                        isEdgeActivated: false,
                        arguments: {
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "get_private_channel_data",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate(
                            "message from player [PEER] in channel [CHANNEL]"
                        ),
                        arguments: {
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "send",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "send message [DATA] to player [PEER] using channel [CHANNEL] and wait for message to finish sending? [WAIT]"
                        ),
                        arguments: {
                            DATA: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello",
                            },
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                            WAIT: {
                                type: "Boolean",
                                defaultValue: false,
                            },
                        },
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("🔃 Data sync"),
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("Lists"),
                    },
                    {
                        opcode: "make_global_networked_list",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("sync list [LIST] with everyone using channel [CHANNEL] with [ID] as the network ID"),
                        arguments: {
                            LIST: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "my list",
                            },
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "netid",
                            },
                        },
                    },
                    {
                        opcode: "make_private_networked_list",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "sync list [LIST] with player [PEER] using channel [CHANNEL] with [ID] as the network ID"
                        ),
                        arguments: {
                            LIST: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "my list",
                            },
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "netid",
                            },
                        },
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("Variables"),
                    },
                    {
                        opcode: "make_global_networked_var",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("sync [VAR] with everyone using channel [CHANNEL] with [ID] as the network ID"),
                        arguments: {
                            VAR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "my variable",
                            },
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "netid",
                            },
                        },
                    },
                    {
                        opcode: "make_private_networked_var",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "sync variable [VAR] with player [PEER] using channel [CHANNEL] with [ID] as the network ID"
                        ),
                        arguments: {
                            VAR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "my variable",
                            },
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "netid",
                            },
                        },
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("🎙️ Voice Chat"),
                    },
                    {
                        opcode: "get_mic_perms",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate("do I have microphone access?"),
                    },
                    {
                        opcode: "is_peer_vchan_open",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate(
                            "connected to voice chat with player [PEER]?"
                        ),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "get_mic_mute_state",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate(
                            "is my microphone with player [PEER] muted?"
                        ),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "request_mic_perms",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("request microphone access"),
                    },
                    {
                        opcode: "change_mic_state",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "[MICSTATE] my microphone with player [PEER]"
                        ),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            MICSTATE: {
                                type: Scratch.ArgumentType.NUMBER,
                                menu: "mic_state",
                                defaultValue: "0",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "when_peer_rings",
                        blockType: Scratch.BlockType.EVENT,
                        isEdgeActivated: false,
                        text: Scratch.translate("when peer [ID] wants to voice call me"),
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "when_peer_answers",
                        blockType: Scratch.BlockType.EVENT,
                        isEdgeActivated: false,
                        text: Scratch.translate("when peer [ID] answers my voice call"),
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "when_peer_declines",
                        blockType: Scratch.BlockType.EVENT,
                        isEdgeActivated: false,
                        text: Scratch.translate("when peer [ID] declines my voice call"),
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "new_vchan",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("call player [PEER]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "answer_vchan",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "answer call from [PEER]"
                        ),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "decline_vchan",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "decline call from [PEER]"
                        ),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "close_vchan",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("hangup [PEER]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("🔊 Volume"),
                    },
                    {
                        opcode: "get_vchan_volume",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("player [PEER] voice volume"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "set_vchan_volume",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("set player [PEER] voice volume to [VOLUME]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            VOLUME: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "100",
                            },
                        },
                    },
                    {
                        opcode: "change_vchan_volume",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("change player [PEER] voice volume by [STEPS]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            STEPS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "10",
                            },
                        },
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("🗺️ X coordinate"),
                    },
                    {
                        opcode: "get_vchan_x",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("player [PEER] voice x position"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "set_vchan_x",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("set player [PEER] voice x position to [X]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "0",
                            },
                        },
                    },
                    {
                        opcode: "change_vchan_x",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("change player [PEER] voice x position by [STEPS]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            STEPS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "10",
                            },
                        },
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("🗺️ Y coordinate"),
                    },
                    {
                        opcode: "get_vchan_y",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("player [PEER] voice y position"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "set_vchan_y",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("set player [PEER] voice y position to [Y]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "0",
                            },
                        },
                    },
                    {
                        opcode: "change_vchan_y",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("change player [PEER] voice y position by [STEPS]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            STEPS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "10",
                            },
                        },
                    },
                    "---",
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: Scratch.translate("🗺️ Z coordinate"),
                    },
                    {
                        opcode: "get_vchan_z",
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate("player [PEER] voice z position"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                        },
                    },
                    {
                        opcode: "set_vchan_z",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("set player [PEER] voice z position to [Z]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            Z: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "0",
                            },
                        },
                    },
                    {
                        opcode: "change_vchan_z",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("change player [PEER] voice z position by [STEPS]"),
                        arguments: {
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "instance ID",
                            },
                            STEPS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "10",
                            },
                        },
                    },
                ],
                menus: {
                    ordered_menu: {
                        items: [
                            { text: Scratch.translate("speed over ordered messages"), value: "false" },
                            { text: Scratch.translate("order over speedy messages"), value: "true" },
                        ]
                    },
                    verbose_levels: {
                        items: [
                            { text: Scratch.translate("nothing"), value: "0" },
                            { text: Scratch.translate("errors"), value: "1" },
                            { text: Scratch.translate("warnings and errors"), value: "2" },
                            { text: Scratch.translate("everything"), value: "3" }
                        ]
                    },
                    mic_state: {
                        items: [
                            {
                                text: Scratch.translate("mute"),
                                value: "0",
                            },
                            {
                                text: Scratch.translate("unmute"),
                                value: "1",
                            },
                        ],
                    }
                },
            };
        }

        set_game_server(args) {
            if (this.conn_builder) {
                try {
                    const server = Scratch.Cast.toString(args.SERVER);
                    const parsed = new URL(server);
                    if (["ws:", "wss:"].includes(parsed.protocol)) this.conn_builder.server_url = server;
                    else alert("Invalid protocol for game server URL argument. Expected ws: or wss:, got " + parsed.protocol);
                } catch (e) {
                    alert(e);
                }
            }
        }

        set_keepalive(args) {
            if (this.conn_builder) this.conn_builder.keepalive = {
                state: Scratch.Cast.toBoolean(args.ALIVE),
                delay: Scratch.Cast.toNumber(args.PING),
            }
        }

        set_verbose(args) {
            if (this.conn_builder) {
                callbacks.set_debug_level(Scratch.Cast.toNumber(args.LEVEL));
                this.conn_builder.logs = Scratch.Cast.toNumber(args.LEVEL);
                this.net.verbose_logs = Scratch.Cast.toNumber(args.LEVEL) > 2;
                this.verbose_logs = Scratch.Cast.toNumber(args.LEVEL) > 2;
            }
        }

        auth_with_token(args) {
            if (this.conn_builder) this.conn_builder.auth = {
                mode: "token",
                token: Scratch.Cast.toString(args.TOKEN),
            };
        }

        auth_with_name(args) {
            if (this.conn_builder) this.conn_builder.auth = {
                mode: "name",
                name: Scratch.Cast.toString(args.USERNAME),
            };
        }

        auth_with_cookie() {
            if (this.conn_builder) this.conn_builder.auth = { mode: "cookie" };
        }

        set_peerjs_server(args) {
            if (this.conn_builder) {
                this.conn_builder.peerjs = {
                    host: Scratch.Cast.toString(args.SERVER),
                    key: Scratch.Cast.toString(args.KEY),
                    pingInterval: Scratch.Cast.toNumber(args.PING) * 1000,
                }
            }
        }

        set_stun_server(args) {
            if (this.conn_builder) {
                try {
                    const server = Scratch.Cast.toString(args.SERVER);
                    const parsed = new URL(server);
                    if (["stun:", "stuns:"].includes(parsed.protocol)) this.ice_servers.push({ urls: server });
                    else alert("Invalid protocol for STUN server URL argument. Expected stun: or stuns:, got " + parsed.protocol);
                } catch (e) {
                    alert(e);
                }
            }
        }

        set_turn_server(args) {
            if (this.conn_builder) {
                try {
                    const server = Scratch.Cast.toString(args.SERVER);
                    const parsed = new URL(server);
                    if (["turn:", "turns:"].includes(parsed.protocol)) this.ice_servers.push({
                        urls: server,
                        username: Scratch.Cast.toString(args.USER),
                        credential: Scratch.Cast.toString(args.PASSWORD),
                    });
                    else alert("Invalid protocol for TURN server URL argument. Expected turn: or turns:, got " + parsed.protocol);
                } catch (e) {
                    alert(e);
                }
            }
        }

        set_relay_only() {
            if (this.conn_builder) {
                this.conn_builder.relay_only = true;
            }
        }

        async connection_builder(_, util) {
            if (util.stackFrame.undo_conn_builder) {
                util.stackFrame.undo_conn_builder = false;
                const builder = util.stackFrame.conn_builder;
                if (!builder.server_url) return alert('No game server address was specified. Please use the "using game server" block.');

                // Clean up
                util.stackFrame.conn_builder = undefined;
                this.conn_builder = undefined;

                // Generate a keypair
                if (!mikedevcl5_extension.encryption.hasKeyPair()) await mikedevcl5_extension.encryption.generateKeyPair();

                // Do a thing
                return this.initialize(builder);

            } else {
                util.stackFrame.undo_conn_builder = true;
                this.conn_builder = {};
                util.stackFrame.conn_builder = this.conn_builder;
                util.startBranch(1, true);
            }
        }

        ice_list_builder(_, util) {
            if (!this.conn_builder) return;
            if (util.stackFrame.undo_ice_builder) {
                util.stackFrame.undo_ice_builder = false;
                this.conn_builder.ice_servers = util.stackFrame.ice_builder;
                util.stackFrame.ice_builder = undefined;
                this.ice_servers = undefined;
            } else {
                util.stackFrame.undo_ice_builder = true;
                this.ice_servers = [];
                util.stackFrame.ice_builder = this.ice_servers;
                util.startBranch(1, true);
            }
        }

        async destroy() {
            if (!this.is_signalling_connected()) return;
            return new Promise((resolve) => {
                callbacks.bind("on_server_disconnect", () => {
                    callbacks.unbind("on_server_disconnect", "once");
                    resolve()
                }, "once");
                if (this.conn) this.conn.close();
                this.net.destroy();
            })
        }


        async reconnect() {
            if (!this.net.can_reconnect) return;
            return new Promise((resolve) => {
                callbacks.bind("onreconnect", () => {
                    callbacks.unbind("onreconnect", "once");
                    resolve()
                }, "once");
                if (this.net) this.net.reconnect();
            })
        }

        async disconnect() {
            if (!this.net.is_connected()) return;
            return new Promise((resolve) => {
                callbacks.bind("ondisconnect", () => {
                    callbacks.unbind("ondisconnect", "once");
                    resolve();
                }, "once");
                this.net.disconnect();
            })
        }

        async initialize(args) {
            if (this.is_signalling_connected()) return;

            callbacks.bind("on_transition", () => {
                Scratch.vm.runtime.startHats("mikedevcl5_on_player_mode_changed");
            })

            callbacks.bind("oncreate", () => {
                Scratch.vm.runtime.startHats("mikedevcl5_on_player_session_spawned");
            })

            callbacks.bind("ondestroy", () => {
                Scratch.vm.runtime.startHats("mikedevcl5_on_player_session_destroyed");
            })

            callbacks.bind("ondisconnect", () => {
                Scratch.vm.runtime.startHats("mikedevcl5_on_player_session_disconnected");
            })

            callbacks.bind("onreconnect", () => {
                Scratch.vm.runtime.startHats("mikedevcl5_on_player_session_reconnected");
            })

            callbacks.bind("on_server_connect", () => {
                Scratch.vm.runtime.startHats("mikedevcl5_on_connect");
            })

            callbacks.bind("on_server_disconnect", () => {
                Scratch.vm.runtime.startHats("mikedevcl5_on_disconnect");
            })

            callbacks.bind("onpeerconnect", (peer) => {
                this.newest_connected = peer;
                Scratch.vm.runtime.startHats("mikedevcl5_on_new_peer");
            })

            callbacks.bind("onpeerdisconnect", (peer) => {
                this.last_disconnected = peer;
                Scratch.vm.runtime.startHats("mikedevcl5_on_peer_left")
            })

            callbacks.bind("on_chan_open", () => {
                Scratch.vm.runtime.startHats("mikedevcl5_on_new_dchan");
            })

            callbacks.bind("on_chan_close", () => {
                Scratch.vm.runtime.startHats("mikedevcl5_on_close_dchan");
            })

            callbacks.bind("onring", () => {
                Scratch.vm.runtime.startHats("mikedevcl5_when_peer_rings")
            })

            callbacks.bind("gmsg", () => {
                Scratch.vm.runtime.startHats('mikedevcl5_on_broadcast_message');
            })

            callbacks.bind("pmsg", () => {
                Scratch.vm.runtime.startHats('mikedevcl5_on_private_message');
            })

            callbacks.bind("gvar", (_, __, packet) => {
                if (packet.id && this.netid_meta.has(packet.id)) {
                    let metadata = this.netid_meta.get(packet.id);
                    this.netvars.updateProxyVariable(metadata, packet.payload);
                }
            });
            
            callbacks.bind("pvar", (_, __, packet) => {
                if (packet.id && this.netid_meta.has(packet.id)) {
                    let metadata = this.netid_meta.get(packet.id);
                    this.netvars.updateProxyVariable(metadata, packet.payload);
                }
            });

            callbacks.bind("glist", (_, __, packet) => {
                if (packet.id && this.netid_meta.has(packet.id)) {
                    let metadata = this.netid_meta.get(packet.id);
                    this.netvars.updateProxyArray(metadata, packet.method, packet.payload);
                }
            });
            
            callbacks.bind("plist", (_, __, packet) => {
                if (packet.id && this.netid_meta.has(packet.id)) {
                    let metadata = this.netid_meta.get(packet.id);
                    this.netvars.updateProxyArray(metadata, packet.method, packet.payload);
                }
            });

            callbacks.bind("onerror", ({peer, err}) => {
                this.lastErrorMessage = err.toString();
                this.lastPeerError = peer._lastServerId;
                Scratch.vm.runtime.startHats('mikedevcl5_on_player_session_error');
                if (err.toString().includes("Error: Could not connect to peer ")) {
                    if (this.verbose_logs) console.log("Attempting to reconnect to peer", peer._lastServerId, "in a second from now...");
                    this.net.disconnect_peer(peer._lastServerId);
                    setTimeout(() => {
                        this.net.connect_to_peer(peer._lastServerId);
                    }, 1000);    
                }
            })

            return new Promise(async (resolve, reject) => {
                this.conn = new WebSocket(args.server_url);

                this.conn.onopen = async () => {
                    console.log("WebSocket connection opened.");

                    Scratch.vm.runtime.startHats("mikedevcl5_on_connect");

                    if (args.keepalive && args.keepalive.state) {
                        this.emitMessage("KEEPALIVE", null);
                    }

                    switch (args.auth.mode) {
                        case "token":
                            this.emitMessage("INIT", {
                                token: args.auth.token,
                                pubkey: this.encryption.publicKey,
                            });
                            break;
                        case "cookie":
                            this.emitMessage("INIT", {
                                pubkey: this.encryption.publicKey,
                            });
                            break;
                        case "name":
                            this.emitMessage("INIT", {
                                token: "let me in",
                                username: args.auth.name,
                                pubkey: this.encryption.publicKey,
                            });
                            break;
                        default:
                            throw new Error("Unknown authentication mode: " + args.auth.mode);
                    }

                    callbacks.call("on_server_connect");
                    resolve();
                }

                this.conn.onmessage = async (event) => {
                    const packet = JSON.parse(event.data);
                    await this.handleMessage(args, packet.opcode, packet.payload);
                }

                this.conn.onerror = (error) => console.error("WebSocket error:", error);

                this.conn.onclose = async () => {
                    console.log("WebSocket connection closed.");
                    this.conn.close();
                    this.net.destroy();

                    this.conn = undefined;
                    this.mode = "";
                    this.username = "";
                    this.instance_id = "";
                    this.lobbyhost = "";
                    this.lobbylist = [];
                    this.lobbyinfo = {};
                    this.newest_connected = "";
                    this.last_disconnected = "";
                    this.relay_peer = "";
                    this.peer_usernames.clear();
                    this.peer_accountids.clear();

                    callbacks.call("on_server_disconnect");
                    Scratch.vm.runtime.startHats("mikedevcl5_on_disconnect");
                    reject();
                }
            })
        }

        emitMessage(opcode, payload) {
            if (this.is_signalling_connected()) {
                this.conn.send(JSON.stringify({ opcode, payload }));
            }
        }

        async handleMessage(args, opcode, payload) {
            switch (opcode) {

                case "LIST_ACK":
                    this.lobbylist = payload;
                    callbacks.call("on_lobby_list");
                    break;

                case "FIND_ACK":
                    callbacks.call("on_lobby_info", payload);
                    break;

                case "CREATE_ACK":
                    callbacks.call("on_host_mode", payload);
                    break;

                case "RELAY":
                    this.relay_peer = payload;
                    this.net.connect_to_peer(payload);
                    break;

                case "NEW_PEER":
                case "PEER_JOIN":
                    if (payload.pubkey) {
                        await this.encryption.deriveSharedKey(payload.pubkey, payload.instance_id);
                    }
                    this.peer_usernames.set(payload.instance_id, payload.username);
                    this.peer_accountids.set(payload.instance_id, payload.user_id);
                    this.net.connect_to_peer(payload.instance_id);
                    break;

                case "PEER_LEFT":
                    this.net.disconnect_peer(payload);
                    this.peer_usernames.delete(payload);
                    this.peer_accountids.delete(payload);
                    break;

                case "NEW_LOBBY":
                    if (!(payload in this.lobbylist)) {
                        this.lobbylist.push(payload);
                    }
                    break;

                case "LOBBY_CLOSED":
                    alert("The lobby was closed.");
                    this.net.disconnect_all_peers();
                    break;

                case "NEW_HOST":
                    if (payload.pubkey) {
                        await this.encryption.deriveSharedKey(payload.pubkey, payload.instance_id);
                    }
                    this.peer_usernames.set(payload.instance_id, payload.username);
                    this.peer_accountids.set(payload.instance_id, payload.user_id);
                    this.lobbyhost = payload.instance_id;
                    break;

                case "JOIN_ACK":
                    callbacks.call("on_peer_mode", payload);
                    break;

                case "TRANSITION":
                    this.mode = payload;
                    callbacks.call("on_transition", payload);
                    break;

                case "KEEPALIVE_ACK":
                    setTimeout(() => {
                        if (this.conn && this.conn.readyState === this.conn.OPEN) {
                            if (args.log && args.log > 2) console.log("Connection was kept alive.");
                            this.emitMessage("KEEPALIVE", null);
                        }
                    }, args.keepalive.delay * 1000);
                    break;

                case "WARNING":
                    alert(payload);
                    break;

                case "MANAGE_ACK":
                    callbacks.call("management", payload);
                    break;
                
                case "VIOLATION":
                    alert(payload);
                    break;

                case "INIT_OK":
                    this.instance_id = payload.instance_id;
                    this.user_id = payload.instance_id;
                    this.username = payload.username;
                    
                    let settings = {};
                    settings.config = {};
                    settings.config.sdpSemantics = "unified-plan";
                    if (args.peerjs) {
                        Object.assign(settings, parsePeerJSURL(args.peerjs.host));
                        settings.pingInterval = args.peerjs.pingInterval;
                    }

                    if (args.relay_only) settings.config.iceTransportPolicy = args.relay_only ? "relay" : "all";
                    if (args.ice_servers) settings.config.iceServers = args.ice_servers;
                    if (args.logs) settings.debug = args.logs;

                    this.net.create_peer(this.instance_id, settings);
                    break;
            }
        }

        is_signalling_connected() {
            return (this.conn != null && this.conn.readyState === this.conn.OPEN);
        }

        is_session_connected() {
            return this.net.is_connected();
        }

        get_client_error() {
            return Scratch.Cast.toString(this.lastErrorMessage);
        }

        get_client_error_peer() {
            return Scratch.Cast.toString(this.lastPeerError);
        }

        my_ID() {
            return this.instance_id;
        }

        my_ID_account() {
            return this.user_id;
        }

        my_Username() {
            return this.username;
        }

        get_client_mode() {
            return this.mode;
        }

        get_relay_peer() {
            return this.relay_peer;
        }

        lobby_host() {
            return this.lobbyhost;
        }

        lobby_list() {
            return JSON.stringify(this.lobbylist);
        }

        async query_lobbies() {
            return new Promise((resolve, reject) => {
                if ((!this.conn) || this.conn.readyState !== this.conn.OPEN) {
                    reject();
                }

                this.conn.send(JSON.stringify({ opcode: "LIST_LOBBIES" }));

                callbacks.bind("on_lobby_list", () => {
                    callbacks.unbind("on_lobby_list");
                    resolve();
                })
            })
        }

        lobby_info() {
            return JSON.stringify(this.lobbyinfo);
        }

        async query_lobby({ LOBBY }) {
            return new Promise((resolve) => {
                if ((!this.conn) || this.conn.readyState !== this.conn.OPEN) {
                    return resolve();
                }

                this.conn.send(JSON.stringify({ opcode: "FIND_LOBBY", payload: Scratch.Cast.toString(LOBBY) }));

                callbacks.bind("on_lobby_info", (result) => {
                    callbacks.unbind("on_lobby_info");

                    if (result == "not found") {
                        this.lobbyinfo = {};
                        return resolve();
                    }

                    this.lobbyinfo = result;

                    resolve();
                })
            })
        }

        is_lobby_host() {
            return this.mode == "host" && this.lobbyhost === this.instance_id;
        }

        async init_host_mode({ LOBBY, PEERS, PASSWORD, LOCK, RELAY }) {
            return new Promise((resolve) => {
                if ((!this.conn) || this.conn.readyState !== this.conn.OPEN) {
                    resolve();
                }

                this.conn.send(JSON.stringify({
                    opcode: "CREATE_LOBBY", payload: {
                        name: Scratch.Cast.toString(LOBBY),
                        max_players: Scratch.Cast.toNumber(PEERS),
                        password: Scratch.Cast.toString(PASSWORD),
                        locked: Scratch.Cast.toBoolean(LOCK),
                        enable_relay: Scratch.Cast.toBoolean(RELAY),
                    }
                }));

                callbacks.bind("on_host_mode", (result) => {
                    if (result == "ok") {
                        this.lobbylist = [];
                    }
                    callbacks.unbind("on_host_mode");
                    resolve();
                })
            })
        }

        async set_lock_flag({LOCK}) {
            if (!this.conn) return;
            this.emitMessage("MANAGE_LOBBY", {method: Scratch.Cast.toBoolean(LOCK) ? "lock" : "unlock"});
            return new Promise((resolve) => {
                callbacks.bind("management", (result) => {
                    callbacks.unbind("management", "*");
                    if (this.verbose_logs) console.log("Set lock flag result:", result);
                    resolve();
                })
            })
        }

        async set_player_limit_value({PEERS}) {
            if (!this.conn) return;
            this.emitMessage("MANAGE_LOBBY", {method: "change_max_players", args: Scratch.Cast.toNumber(PEERS)});
            return new Promise((resolve) => {
                callbacks.bind("management", (result) => {
                    callbacks.unbind("management", "*");
                    if (this.verbose_logs) console.log("Set player limit result:", result);
                    resolve();
                })
            })
        }

        async set_password_value({PASSWORD}) {
            if (!this.conn) return;
            this.emitMessage("MANAGE_LOBBY", {method: "change_password", args: Scratch.Cast.toString(PASSWORD)});
            return new Promise((resolve) => {
                callbacks.bind("management", (result) => {
                    callbacks.unbind("management", "*");
                    if (this.verbose_logs) console.log("Set lobby password result:", result);
                    resolve();
                })
            })
        }

        async kick_peer_from_lobby({PEER}) {
            if (!this.conn) return;
            this.emitMessage("MANAGE_LOBBY", {method: "kick", args: Scratch.Cast.toString(PEER)});
            return new Promise((resolve) => {
                callbacks.bind("management", (result) => {
                    callbacks.unbind("management", "*");
                    if (this.verbose_logs) console.log("Kick peer result:", result);
                    resolve();
                })
            })
        }

        async init_peer_mode({ LOBBY, PASSWORD }) {
            return new Promise((resolve) => {
                if ((!this.conn) || this.conn.readyState !== this.conn.OPEN) {
                    resolve();
                }

                this.conn.send(JSON.stringify({
                    opcode: "JOIN_LOBBY", payload: {
                        name: Scratch.Cast.toString(LOBBY),
                        password: Scratch.Cast.toString(PASSWORD),
                    }
                }));

                callbacks.bind("on_peer_mode", (result) => {
                    if (result == "ok") {
                        this.lobbylist = [];
                    }
                    callbacks.unbind("on_peer_mode");
                    resolve();
                })
            })
        }

        async close_lobby() {
            if (!this.conn) return;
            this.emitMessage("MANAGE_LOBBY", {method: "close_lobby"});
            return new Promise((resolve) => {
                callbacks.bind("management", (result) => {
                    callbacks.unbind("management", "*");
                    if (this.verbose_logs) console.log("Close lobby result:", result);
                    resolve();
                })
            })
        }

        async transfer_ownership({PEER}) {
            if (!this.conn) return;
            this.emitMessage("MANAGE_LOBBY", {method: "transfer_ownership", args: Scratch.Cast.toString(PEER)});
            return new Promise((resolve) => {
                callbacks.bind("management", (result) => {
                    callbacks.unbind("management", "*");
                    if (this.verbose_logs) console.log("Transfer ownership of lobby result:", result);
                    resolve();
                })
            })
        }

        get_new_peer() {
            return this.newest_connected;
        }

        get_last_peer() {
            return this.last_disconnected;
        }

        get_peers() {
            return JSON.stringify(this.net.all_connected_peers());
        }

        get_peer_username({ ID }) {
            const peer = Scratch.Cast.toString(ID);
            return this.net.is_other_peer_connected(peer) && this.peer_usernames.has(peer) ? this.peer_usernames.get(peer) : "";
        }

        get_peer_accountid({ ID }) {
            const peer = Scratch.Cast.toString(ID);
            return this.net.is_other_peer_connected(peer) && this.peer_accountids.has(peer) ? this.peer_accountids.get(peer) : "";
        }

        get_peer_channels({ PEER }) {
            return JSON.stringify(this.net.get_peer_channels(Scratch.Cast.toString(PEER)));
        }

        is_peer_connected({ PEER }) {
            return this.net.is_other_peer_connected(Scratch.Cast.toString(PEER));
        }

        disconnect_peer({ PEER }) {
            this.net.disconnect_peer(Scratch.Cast.toString(PEER));
        }

        new_dchan({ CHANNEL, PEER, ORDERED }) {
            this.net.open_data_channel(Scratch.Cast.toString(PEER), Scratch.Cast.toString(CHANNEL), Scratch.Cast.toBoolean(ORDERED));
        }

        on_new_dchan({CHANNEL, PEER}) {
            return this.net.does_peer_have_channel(Scratch.Cast.toString(PEER), Scratch.Cast.toString(CHANNEL));
        }

        on_close_dchan({CHANNEL, PEER}) {
            return !this.net.does_peer_have_channel(Scratch.Cast.toString(PEER), Scratch.Cast.toString(CHANNEL));
        }

        close_dchan({ CHANNEL, PEER }) {
            this.net.close_data_channel(Scratch.Cast.toString(PEER), Scratch.Cast.toString(CHANNEL));
        }

        get_global_channel_data({ CHANNEL }) {
            return Scratch.Cast.toString(this.net.get_global_channel_data(Scratch.Cast.toString(CHANNEL)));
        }

        async broadcast({ DATA, CHANNEL, WAIT }) {
            await this.net.broadcast_message_to_peers(
                {
                    opcode: "G_MSG",
                    payload: DATA,
                },
                Scratch.Cast.toString(CHANNEL),
                Scratch.Cast.toBoolean(WAIT),
            );
        }

        get_private_channel_data({ PEER, CHANNEL }) {
            return Scratch.Cast.toString(this.net.get_private_channel_data(Scratch.Cast.toString(PEER), Scratch.Cast.toString(CHANNEL)));
        }

        async send({ DATA, PEER, CHANNEL, WAIT }) {
            if (Scratch.Cast.toBoolean(WAIT)) {
                await this.net.send_message_to_peer(
                    {
                        opcode: "P_MSG",
                        payload: DATA,
                    },
                    Scratch.Cast.toString(PEER),
                    Scratch.Cast.toString(CHANNEL),
                )
            } else {
                this.net.send_message_to_peer(
                    {
                        opcode: "P_MSG",
                        payload: DATA,
                    },
                    Scratch.Cast.toString(PEER),
                    Scratch.Cast.toString(CHANNEL),
                )
            }
        }

        async request_mic_perms() {
            await this.net.request_microphone_permissions();
        }

        get_mic_perms() {
            return this.net.hasMicPerms;
        }

        is_peer_vchan_open({ PEER }) {
            return this.net.is_peer_voice_connected(Scratch.Cast.toString(PEER));
        }

        get_mic_mute_state({ PEER }) {
            return this.net.is_microphone_muted(Scratch.Cast.toString(PEER));
        }

        change_mic_state({ MICSTATE, PEER }) {
            this.net.set_microphone_state(Scratch.Cast.toString(PEER), Scratch.Cast.toNumber(MICSTATE) == 1);
        }

        new_vchan({ PEER }) {
            this.net.call_peer(Scratch.Cast.toString(PEER));
        }

        async close_vchan({ PEER }) {
            if (!this.net.is_peer_voice_connected(PEER)) return;
            await this.net.send_message_to_peer({opcode: "HANGUP"}, Scratch.Cast.toString(PEER), "default");
            this.net.hangup_call(Scratch.Cast.toString(PEER));
        }

        answer_vchan({ PEER }) {
            this.net.answer_call(Scratch.Cast.toString(PEER));
        }

        decline_vchan({PEER}) {
            this.net.decline_call(Scratch.Cast.toString(PEER));
        }

        get_vchan_x({PEER}) {
            return Scratch.Cast.toNumber(this.net.get_call_x(Scratch.Cast.toString(PEER)));
        }

        get_vchan_y({PEER}) {
            return Scratch.Cast.toNumber(this.net.get_call_y(Scratch.Cast.toString(PEER)));
        }

        get_vchan_z({PEER}) {
            return Scratch.Cast.toNumber(this.net.get_call_z(Scratch.Cast.toString(PEER)));
        }

        set_vchan_x({PEER, X}) {
            this.net.set_call_x(Scratch.Cast.toString(PEER), Scratch.Cast.toNumber(X));
        }

        set_vchan_y({PEER, Y}) {
            this.net.set_call_y(Scratch.Cast.toString(PEER), Scratch.Cast.toNumber(Y));
        }

        set_vchan_z({PEER, Z}) {
            this.net.set_call_z(Scratch.Cast.toString(PEER), Scratch.Cast.toNumber(Z));
        }

        change_vchan_x({PEER, STEPS}) {
            this.net.change_call_x(Scratch.Cast.toString(PEER), Scratch.Cast.toNumber(STEPS));
        }

        change_vchan_y({PEER, STEPS}) {
            this.net.change_call_y(Scratch.Cast.toString(PEER), Scratch.Cast.toNumber(STEPS));
        }

        change_vchan_z({PEER, STEPS}) {
            this.net.change_call_z(Scratch.Cast.toString(PEER), Scratch.Cast.toNumber(STEPS));
        }

        get_vchan_volume({PEER}) {
            return Scratch.Cast.toNumber(this.net.get_call_volume(Scratch.Cast.toString(PEER)));
        }

        set_vchan_volume({PEER, VOLUME}) {
            this.net.set_call_volume(Scratch.Cast.toString(PEER), Scratch.Cast.toNumber(VOLUME));
        }

        change_vchan_volume({PEER, STEPS}) {
            this.net.change_call_volume(Scratch.Cast.toString(PEER), Scratch.Cast.toNumber(STEPS));
        }

        make_global_networked_list({ LIST, CHANNEL, ID }, util) {
            const listname = Scratch.Cast.toString(LIST);
            var myList = util.target.lookupVariableByNameAndType(listname, "list");

            // Check if the list exists
            if (!myList) return;

            // Don't overwrite an existing network ID
            if (this.netid_proxies.has(ID)) {
                alert("The network ID " + ID + " is already in use by another variable or list. Please choose a different ID.");
                return;
            };

            const [netListProxy, netListEvents, metadata] = netvars.makeNetworkedList(myList, util.target.id, !util.target.isOriginal ? util.target.id : undefined);
            if (!netListProxy) return;

            // Add the list to the list of networked IDs
            this.netid_proxies.set(ID, netListProxy);
            this.netid_meta.set(ID, metadata);

            callbacks.bind(netListEvents.length, (data) => {
                this.net.broadcast_message_to_peers({
                    opcode: "G_LIST",
                    payload: data,
                    method: "length",
                    id: ID,
                }, Scratch.Cast.toString(CHANNEL));
            }, ID);

            callbacks.bind(netListEvents.replace, (data) => {
                this.net.broadcast_message_to_peers({
                    opcode: "G_LIST",
                    payload: data,
                    method: "replace",
                    id: ID,
                }, Scratch.Cast.toString(CHANNEL));
            }, ID);

            callbacks.bind(netListEvents.set, (data) => {
                this.net.broadcast_message_to_peers({
                    opcode: "G_LIST",
                    payload: data,
                    method: "set",
                    id: ID,
                }, Scratch.Cast.toString(CHANNEL));
            }, ID);

            callbacks.bind(netListEvents.reset, (data) => {
                this.net.broadcast_message_to_peers({
                    opcode: "G_LIST",
                    payload: data,
                    method: "reset",
                    id: ID,
                }, Scratch.Cast.toString(CHANNEL));
            }, ID);

            callbacks.bind(netListEvents.off, () => {
                this.netid_proxies.delete(ID);
                this.netid_meta.delete(ID);
                callbacks.unbind(netListEvents.length, "*");
                callbacks.unbind(netListEvents.replace, "*");
                callbacks.unbind(netListEvents.set, "*");
                callbacks.unbind(netListEvents.reset, "*");
                callbacks.unbind(netListEvents.off, "*");
            }, ID);
        }

        make_private_networked_list({ LIST, PEER, CHANNEL, ID }, util) {
            const listname = Scratch.Cast.toString(LIST);
            var myList = util.target.lookupVariableByNameAndType(listname, "list");

            // Check if the list exists
            if (!myList) return;

            // Don't overwrite an existing network ID
            if (this.netid_proxies.has(ID)) {
                alert("The network ID " + ID + " is already in use by another variable or list. Please choose a different ID.");
                return;
            };

            const [netListProxy, netListEvents, metadata] = netvars.makeNetworkedList(myList, util.target.id, !util.target.isOriginal ? util.target.id : undefined);
            if (!netListProxy) return;

            // Add the list to the list of networked IDs
            this.netid_proxies.set(ID, netListProxy);
            this.netid_meta.set(ID, metadata);

            callbacks.bind(netListEvents.length, (data) => {
                this.net.send_message_to_peer({
                    opcode: "P_LIST",
                    payload: data,
                    method: "set",
                    id: ID,
                }, Scratch.Cast.toString(PEER), Scratch.Cast.toString(CHANNEL));
            }, ID);

            callbacks.bind(netListEvents.replace, (data) => {
                this.net.send_message_to_peer({
                    opcode: "P_LIST",
                    payload: data,
                    method: "replace",
                    id: ID,
                }, Scratch.Cast.toString(PEER), Scratch.Cast.toString(CHANNEL));
            }, ID);

            callbacks.bind(netListEvents.set, (data) => {
                this.net.send_message_to_peer({
                    opcode: "P_LIST",
                    payload: data,
                    method: "set",
                    id: ID,
                }, Scratch.Cast.toString(PEER), Scratch.Cast.toString(CHANNEL));
            }, ID);

            callbacks.bind(netListEvents.reset, (data) => {
                this.net.send_message_to_peer({
                    opcode: "P_LIST",
                    payload: data,
                    method: "reset",
                    id: ID,
                }, Scratch.Cast.toString(PEER), Scratch.Cast.toString(CHANNEL));
            }, ID);

            callbacks.bind(netListEvents.off, () => {
                this.netid_proxies.delete(ID);
                this.netid_meta.delete(ID);
                callbacks.unbind(netListEvents.length, "*");
                callbacks.unbind(netListEvents.replace, "*");
                callbacks.unbind(netListEvents.set, "*");
                callbacks.unbind(netListEvents.reset, "*");
                callbacks.unbind(netListEvents.off, "*");
            }, ID);
        }

        make_global_networked_var({ VAR, CHANNEL, ID }, util) {
            const varname = Scratch.Cast.toString(VAR);
            var myVar = util.target.lookupVariableByNameAndType(varname, "");

            // Check if the variable exists
            if (!myVar) return;

            // Don't overwrite an existing network ID
            if (this.netid_proxies.has(ID)) {
                alert("The network ID " + ID + " is already in use by another variable or list. Please choose a different ID.");
                return;
            };

            // Convert the variable into a proxy
            const [netVarProxy, netVarEvents, metadata] = netvars.makeNetworkedVariable(myVar, util.target.id, !util.target.isOriginal ? util.target.id : undefined);
            if (!netVarProxy) return;

            // Add the variable to the list of networked IDs
            this.netid_proxies.set(ID, netVarProxy);
            this.netid_meta.set(ID, metadata);

            callbacks.bind(netVarEvents.on, (data) => {
                this.net.broadcast_message_to_peers({
                    opcode: "G_VAR",
                    payload: data,
                    id: ID,
                }, Scratch.Cast.toString(CHANNEL));
            }, ID);

            callbacks.bind(netVarEvents.off, () => {
                this.netid_proxies.delete(ID);
                this.netid_meta.delete(ID);
                callbacks.unbind(netVarEvents.on, "*");
                callbacks.unbind(netVarEvents.off, "*");
            }, ID);
        }

        make_private_networked_var({ VAR, PEER, CHANNEL, ID }, util) {
            const varname = Scratch.Cast.toString(VAR);
            var myVar = util.target.lookupVariableByNameAndType(varname, "");

            // Check if the variable exists
            if (!myVar) return;

            // Don't overwrite an existing network ID
            if (this.netid_proxies.has(ID)) {
                alert("The network ID " + ID + " is already in use by another variable or list. Please choose a different ID.");
                return;
            };

            const [netVarProxy, netVarEvents, metadata] = netvars.makeNetworkedVariable(myVar, util.target.id, !util.target.isOriginal ? util.target.id : undefined);
            if (!netVarProxy) return;

            // Add the variable to the list of networked IDs
            this.netid_proxies.set(ID, netVarProxy);
            this.netid_meta.set(ID, metadata);

            callbacks.bind(netVarEvents.on, (data) => {
                this.net.send_message_to_peer({
                    opcode: "G_VAR",
                    payload: data,
                    id: ID,
                }, Scratch.Cast.toString(PEER), Scratch.Cast.toString(CHANNEL));

            }, ID);

            callbacks.bind(netVarEvents.off, () => {
                this.netid_proxies.delete(ID);
                this.netid_meta.delete(ID);
                callbacks.unbind(netVarEvents.on, "*");
                callbacks.unbind(netVarEvents.off, "*");
            }, ID);
        }

        when_peer_rings({PEER}) {
            return this.net.is_other_peer_connected(Scratch.Cast.toString(PEER));
        }

        on_broadcast_message({CHANNEL}) {
            return this.net.globalChannelData.has(Scratch.Cast.toString(CHANNEL));
        }

        on_private_message({PEER, CHANNEL}) {
            return this.net.does_peer_have_channel(Scratch.Cast.toString(PEER), Scratch.Cast.toString(CHANNEL));
        }

        on_peer_left({PEER}) {
            // TODO: this isn't multi-thread compatable.
            return this.net.last_disconnected == Scratch.Cast.toString(PEER);
        }
    }

    // Initialize extension
    const mikedevcl5_extension = new CloudLink5();

    // Check if lists/variables need to be re-blessed or removed from the tracker
    Scratch.vm.runtime.on("BEFORE_EXECUTE", () => {
        netvars.update();
    });

    // Finally, register the extension and expose it so others can use it.
    Scratch.vm.runtime.ext_mikedev_cl5 = mikedevcl5_extension;
    Scratch.extensions.register(mikedevcl5_extension);
})(Scratch);