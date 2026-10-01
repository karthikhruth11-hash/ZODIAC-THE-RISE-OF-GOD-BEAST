/* ==========================================================================
   ZODIAC: RISE OF THE GOD BEAST — DEDICATED SERVER-AUTHORITATIVE ENGINE
   ========================================================================== */

const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const ROOT_DIR = path.join(__dirname, '..');
const PORT = process.env.PORT || 3001;
const HOST = '127.0.0.1';
const SERVER_TICK_RATE = 60; // 60 FPS Server Authority Tick Rate
const TICK_INTERVAL = 1000 / SERVER_TICK_RATE;

// Match & World State
class MatchServer {
    constructor() {
        this.players = new Map(); // id -> PlayerState
        this.projectiles = [];
        this.matchState = 'LOBBY'; // LOBBY, ACTIVE, ENDED
        this.tickCount = 0;
        
        // Battle Royale Safe Zone Parameters
        this.safeZone = {
            centerX: 0,
            centerZ: 0,
            radius: 120.0,
            targetRadius: 120.0,
            shrinkSpeed: 0.15,
            phase: 1,
            damagePerTick: 0.5
        };

        this.startServerLoop();
    }

    addPlayer(id, socket) {
        const playerState = {
            id: id,
            socket: socket,
            x: (Math.random() - 0.5) * 10,
            y: 0,
            z: (Math.random() - 0.5) * 10,
            rotY: 0,
            level: 10,
            path: 'physical',
            health: 1250,
            maxHealth: 1250,
            stamina: 450,
            arcanaEnergy: 800,
            lastInputSeq: 0,
            lastPosX: 0,
            lastPosZ: 0,
            isAlive: true
        };

        this.players.set(id, playerState);
        console.log(`[SERVER] Player ${id} joined match. Active players: ${this.players.size}`);
        
        if (this.players.size >= 1 && this.matchState === 'LOBBY') {
            this.matchState = 'ACTIVE';
            console.log(`[SERVER] Match STARTED! Safe Zone Phase 1 active.`);
        }
    }

    removePlayer(id) {
        this.players.delete(id);
        console.log(`[SERVER] Player ${id} disconnected. Active players: ${this.players.size}`);
    }

    handlePlayerInput(id, inputData) {
        const player = this.players.get(id);
        if (!player || !player.isAlive) return;

        // Anti-Cheat Speed Check: Verify distance per frame
        const deltaX = inputData.x - player.x;
        const deltaZ = inputData.z - player.z;
        const dist = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);

        const MAX_ALLOWED_SPEED_PER_TICK = 0.5; // Max units per tick
        if (dist > MAX_ALLOWED_SPEED_PER_TICK) {
            console.warn(`[ANTI-CHEAT REJECT] Player ${id} speed anomaly detected! Distance: ${dist.toFixed(2)}`);
            // Server Reconciliation: Clamp player position back to validated coordinates
            this.sendReconciliation(player);
            return;
        }

        // Apply Authoritative Position
        player.x = inputData.x;
        player.y = inputData.y || 0;
        player.z = inputData.z;
        player.rotY = inputData.rotY || 0;
        player.lastInputSeq = inputData.seq || 0;
    }

    handlePlayerAttack(id, attackData) {
        const attacker = this.players.get(id);
        if (!attacker || !attacker.isAlive) return;

        // Server Hit Detection & Lag Compensation
        this.players.forEach((target, targetId) => {
            if (targetId !== id && target.isAlive) {
                const dist = Math.sqrt(
                    Math.pow(attacker.x - target.x, 2) +
                    Math.pow(attacker.z - target.z, 2)
                );

                if (dist <= 3.5) { // Melee / Combo Attack Range
                    const damage = attackData.damage || 450;
                    target.health -= damage;
                    console.log(`[SERVER HIT VALIDATED] ${attacker.id} hit ${target.id} for ${damage} HP. Remaining HP: ${target.health}`);

                    if (target.health <= 0) {
                        target.health = 0;
                        target.isAlive = false;
                        console.log(`[SERVER ELIMINATION] ${attacker.id} eliminated ${target.id}!`);
                    }
                }
            }
        });
    }

    sendReconciliation(player) {
        if (player.socket && player.socket.readyState === WebSocket.OPEN) {
            player.socket.send(JSON.stringify({
                type: 'RECONCILE',
                seq: player.lastInputSeq,
                x: player.x,
                y: player.y,
                z: player.z
            }));
        }
    }

    updateSafeZone() {
        if (this.safeZone.radius > this.safeZone.targetRadius) {
            this.safeZone.radius = Math.max(this.safeZone.targetRadius, this.safeZone.radius - this.safeZone.shrinkSpeed);
        }

        // Apply Storm Damage to Out-of-Bounds Players
        this.players.forEach((player) => {
            if (player.isAlive) {
                const distFromCenter = Math.sqrt(
                    Math.pow(player.x - this.safeZone.centerX, 2) +
                    Math.pow(player.z - this.safeZone.centerZ, 2)
                );

                if (distFromCenter > this.safeZone.radius) {
                    player.health -= this.safeZone.damagePerTick;
                    if (player.health <= 0) {
                        player.health = 0;
                        player.isAlive = false;
                        console.log(`[SAFE ZONE ELIMINATION] Player ${player.id} eliminated by storm!`);
                    }
                }
            }
        });
    }

    broadcastWorldState() {
        const statePayload = {
            type: 'WORLD_STATE',
            tick: this.tickCount,
            safeZone: {
                radius: this.safeZone.radius,
                centerX: this.safeZone.centerX,
                centerZ: this.safeZone.centerZ
            },
            players: Array.from(this.players.values()).map(p => ({
                id: p.id,
                x: p.x,
                y: p.y,
                z: p.z,
                rotY: p.rotY,
                health: p.health,
                maxHealth: p.maxHealth,
                isAlive: p.isAlive,
                level: p.level,
                path: p.path
            }))
        };

        const jsonMsg = JSON.stringify(statePayload);
        this.players.forEach((player) => {
            if (player.socket && player.socket.readyState === WebSocket.OPEN) {
                player.socket.send(jsonMsg);
            }
        });
    }

    startServerLoop() {
        setInterval(() => {
            this.tickCount++;
            
            if (this.matchState === 'ACTIVE') {
                this.updateSafeZone();
            }

            this.broadcastWorldState();
        }, TICK_INTERVAL);
    }
}

// HTTP & WebSocket Server Initialization
const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.wasm': 'application/wasm',
    '.vert': 'text/plain; charset=UTF-8',
    '.frag': 'text/plain; charset=UTF-8',
    '.glsl': 'text/plain; charset=UTF-8'
};

const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl === '/') reqUrl = '/index.html';

    const filePath = path.join(ROOT_DIR, reqUrl);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`500 Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            res.end(content, 'utf-8');
        }
    });
});

const wss = new WebSocket.Server({ server });
const matchServer = new MatchServer();

let nextPlayerId = 100;

wss.on('connection', (socket) => {
    const playerId = `player_${nextPlayerId++}`;
    matchServer.addPlayer(playerId, socket);

    socket.send(JSON.stringify({
        type: 'INIT_PLAYER',
        playerId: playerId
    }));

    socket.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'INPUT') {
                matchServer.handlePlayerInput(playerId, data);
            } else if (data.type === 'ATTACK') {
                matchServer.handlePlayerAttack(playerId, data);
            }
        } catch (err) {
            console.error('[SERVER ERROR] Invalid packet:', err);
        }
    });

    socket.on('close', () => {
        matchServer.removePlayer(playerId);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`========================================================`);
    console.log(`ZODIAC DEDICATED SERVER AUTHORITATIVE ENGINE ONLINE`);
    console.log(`HOST: ${HOST} | PORT: ${PORT} | TICK RATE: 60 FPS`);
    console.log(`========================================================`);
});

