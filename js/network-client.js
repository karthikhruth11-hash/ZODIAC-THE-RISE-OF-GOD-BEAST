/* ==========================================================================
   ZODIAC: RISE OF THE GOD BEAST — REAL-TIME NETWORK MULTIPLAYER CLIENT
   ========================================================================== */

class NetworkMultiplayerClient {
    constructor() {
        this.socket = null;
        this.localPlayerId = null;
        this.inputSeq = 0;
        this.remotePlayers = new Map(); // id -> THREE.Group
        this.isServerConnected = false;
        this.pingMs = 12;
        this.lastPingTime = Date.now();

        this.initConnection();
    }

    initConnection() {
        try {
            // Connect to server (Fallback gracefully if server offline for local offline preview)
            this.socket = new WebSocket('ws://127.0.0.1:3001');

            this.socket.onopen = () => {
                this.isServerConnected = true;
                this.lastPingTime = Date.now();
                console.log('[NETWORK] Connected to ZODIAC Dedicated Game Server!');
                this.updateNetworkUIStatus(true);
            };

            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.handleServerPacket(data);
            };

            this.socket.onclose = () => {
                this.isServerConnected = false;
                console.log('[NETWORK] Connection closed. Running in offline standalone simulation mode.');
                this.updateNetworkUIStatus(false);
            };

            this.socket.onerror = (err) => {
                this.isServerConnected = false;
                this.updateNetworkUIStatus(false);
            };
        } catch (e) {
            this.isServerConnected = false;
            this.updateNetworkUIStatus(false);
        }
    }

    updateNetworkUIStatus(connected) {
        const statusText = document.querySelector('.status-indicator');
        if (statusText) {
            if (connected) {
                const displayPing = (this.pingMs > 0 && this.pingMs < 1000) ? this.pingMs : 12;
                statusText.innerHTML = `<span class="status-dot"></span> MULTIPLAYER SERVER CONNECTED (${displayPing}ms)`;
            } else {
                statusText.innerHTML = `<span class="status-dot" style="background:#ffb700;box-shadow:0 0 10px #ffb700;"></span> LOCAL SIMULATION MODE`;
            }
        }
    }

    sendInputPacket(position, rotationY) {
        if (!this.isServerConnected || !this.socket || this.socket.readyState !== WebSocket.OPEN) return;

        this.inputSeq++;
        this.lastPingTime = Date.now();

        const packet = {
            type: 'INPUT',
            seq: this.inputSeq,
            x: position.x,
            y: position.y,
            z: position.z,
            rotY: rotationY
        };

        this.socket.send(JSON.stringify(packet));
    }

    sendAttackPacket(damageAmount) {
        if (!this.isServerConnected || !this.socket || this.socket.readyState !== WebSocket.OPEN) return;

        const packet = {
            type: 'ATTACK',
            damage: damageAmount
        };

        this.socket.send(JSON.stringify(packet));
    }

    handleServerPacket(data) {
        if (data.type === 'INIT_PLAYER') {
            this.localPlayerId = data.playerId;
            console.log(`[NETWORK] Assigned Local Player ID: ${this.localPlayerId}`);
        } else if (data.type === 'WORLD_STATE') {
            if (this.lastPingTime > 0) {
                const rawPing = Date.now() - this.lastPingTime;
                this.pingMs = (rawPing > 0 && rawPing < 1000) ? rawPing : 12;
            } else {
                this.pingMs = 12;
            }
            this.updateNetworkUIStatus(true);

            // Synchronize 3D Safe Zone Storm Ring
            if (window.game3D && data.safeZone) {
                window.game3D.updateSafeZoneRing(data.safeZone);
            }

            // Synchronize Remote Multiplayer Players
            if (window.game3D && data.players) {
                data.players.forEach((pState) => {
                    if (pState.id !== this.localPlayerId) {
                        window.game3D.updateRemotePlayer(pState);
                    }
                });
            }
        } else if (data.type === 'RECONCILE') {
            // Server Position Reconciliation
            if (window.game3D && window.game3D.characterGroup) {
                console.log(`[NETWORK RECONCILIATION] Correcting position to X:${data.x.toFixed(2)}, Z:${data.z.toFixed(2)}`);
                window.game3D.characterGroup.position.set(data.x, data.y, data.z);
            }
        }
    }
}

window.netClient = new NetworkMultiplayerClient();
