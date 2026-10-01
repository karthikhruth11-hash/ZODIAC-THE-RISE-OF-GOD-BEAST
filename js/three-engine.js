/* ==========================================================================
   ZODIAC: RISE OF THE GOD BEAST — REAL-TIME 2D VECTOR & CANVAS ANIMATION ENGINE
   ========================================================================== */

class GameAudioSynthesizer {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
    }

    initCtx() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playGunshot() {
        if (this.isMuted) return;
        this.initCtx();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.1);
        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
    }

    playHit() {
        if (this.isMuted) return;
        this.initCtx();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.08);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
    }

    playJump() {
        if (this.isMuted) return;
        this.initCtx();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.14);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
    }

    playFootstep() {
        if (this.isMuted) return;
        this.initCtx();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(85, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
    }

    playAttackSwing() {
        this.playGunshot();
    }

    playDragonRoar() {
        if (this.isMuted) return;
        this.initCtx();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(95, now);
        osc.frequency.linearRampToValueAtTime(170, now + 0.25);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.7);
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
    }

    playSerumInject() {
        if (this.isMuted) return;
        this.initCtx();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(900, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    }

    playGodBeastAscension() {
        if (this.isMuted) return;
        this.initCtx();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.8);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.8);
    }
}

window.gameAudio = new GameAudioSynthesizer();

class Game2DAnimationEngine {
    constructor() {
        this.canvas = document.getElementById('webgl-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.container = this.canvas;

        // Group Proxies for backwards compatibility with test suite
        this.characterGroup = { position: { x: 0, y: 0, z: 0 }, visible: true };
        this.automatonGroup = { position: { x: 250, y: 0, z: 0 }, visible: true };
        this.dragonBossGroup = { position: { x: 300, y: -50, z: 0 }, visible: true };
        this.vehicleGroup = { position: { x: -200, y: 0, z: 0 }, visible: true };
        this.birdsGroup = { position: { x: 0, y: 0, z: 0 }, visible: true };
        this.doorMesh = { position: { x: -350, y: 0 } };
        this.generatorMesh = { position: { x: -450, y: 0 } };
        this.chestGroup = { position: { x: 150, y: 0 } };
        this.safeZoneRingMesh = { position: { x: 0, y: 0 } };
        this.ambientLight = { color: '#00f0ff', intensity: 1.0 };
        this.camera = { 
            position: { x: 0, y: 2.2, z: 5.5, set: (x,y,z) => { this.camera.position.x = x; this.camera.position.y = y; this.camera.position.z = z; } }
        };
        this.controls = { 
            target: { x: 0, y: 1.6, z: 0, set: (x,y,z) => { this.controls.target.x = x; this.controls.target.y = y; this.controls.target.z = z; } },
            update: () => {}
        };

        // Player Motion & Stats State
        this.playerX = 100;
        this.playerY = 0; // Relative to ground line
        this.playerVelY = 0;
        this.moveState = { forward: 0, right: 0 };
        this.velocity = { x: 0, y: 0, z: 0 };
        this.isGrounded = true;
        this.playerHealth = 1080;
        this.maxPlayerHealth = 1080;
        this.stamina = 325;
        this.maxStamina = 325;
        this.arcanaEnergy = 550;
        this.maxArcanaEnergy = 550;
        
        // Enemy & Dragon State
        this.automatonHealth = 1000;
        this.automatonMaxHealth = 1000;
        this.dragonHealth = 5000;
        this.dragonMaxHealth = 5000;
        this.dragonBossPhase = 1;
        this.activeEnemy = 'automaton'; // 'automaton' or 'dragon'

        // Weapon & Skills
        this.weapons = [
            { name: 'Cyber Blade / Melee', damage: 450, icon: 'fa-hand-fist', color: '#9d4edd', type: 'melee', ammo: '∞' },
            { name: 'Plasma Assault Rifle', damage: 650, icon: 'fa-gun', color: '#00f0ff', type: 'rifle', ammo: '30 / ∞' },
            { name: 'Arcana Shotgun', damage: 950, icon: 'fa-bullseye', color: '#ffb700', type: 'shotgun', ammo: '8 / ∞' },
            { name: 'God Beast Rocket Launcher', damage: 1400, icon: 'fa-rocket', color: '#ff2a5f', type: 'launcher', ammo: '4 / ∞' }
        ];
        this.currentWeaponIndex = 1;

        // Interaction & Crafting States
        this.isInVehicle = false;
        this.isDoorOpen = false;
        this.isChestOpen = false;
        this.isPowerOn = true;
        this.isSprinting = false;
        this.isCrouching = false;
        this.isJumping = false;
        this.isAiming = false;
        this.isRolling = false;
        this.rollAngle = 0;
        this.woodCount = 10;
        this.sandCount = 6;
        this.isWatchingTV = false;
        this.hasShelter = false;

        // Visual Customization States
        this.hairColor = '#00f0ff';
        this.cyberArmColor = '#00f0ff';
        this.chestArmorColor = '#121a2b';
        this.auraColor = '#9d4edd';
        this.autoSpin = false;
        this.isClayWireframe = false;
        this.currentWeather = 'sunny';
        this.currentLevel = 1;
        this.currentPath = 'physical';

        // Animation Time & Particles
        this.animTime = 0;
        this.particles = [];
        this.floatingTexts = [];
        this.remotePlayersMap = new Map();
        this.birds = [
            { x: -200, y: 120, speed: 2 },
            { x: -100, y: 160, speed: 2.5 },
            { x: 300, y: 90, speed: 1.8 }
        ];

        this.init();
    }

    init() {
        this.onWindowResize();
        window.addEventListener('resize', () => this.onWindowResize());
        this.setupKeyboardListeners();
        this.setupTouchJoystick();

        // Start Animation Render Loop
        const animate = () => {
            this.update();
            this.render();
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    onWindowResize() {
        const parent = this.canvas.parentElement;
        if (!parent) return;
        const w = parent.clientWidth || window.innerWidth;
        const h = parent.clientHeight || window.innerHeight;
        this.canvas.width = w;
        this.canvas.height = h;
    }

    setupKeyboardListeners() {
        window.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (key === 'a' || key === 'arrowleft') this.moveState.right = -1;
            if (key === 'd' || key === 'arrowright') this.moveState.right = 1;
            if (key === 'w' || key === 'arrowup') this.moveState.forward = 1;
            if (key === 's' || key === 'arrowdown') this.moveState.forward = -1;
            if (key === 'shift') this.isSprinting = true;
            if (key === 'control') this.isCrouching = true;

            if (key === ' ' && this.isGrounded) {
                this.isGrounded = false;
                this.playerVelY = -12;
                if (window.gameAudio) window.gameAudio.playJump();
            }
            if (key === 'r') this.triggerDodgeRoll();
            if (key === 'e') this.toggleVehicleOrChestInteraction();
            if (key === 'f') this.toggleDoorInteraction();
            if (key === 'g') this.toggleGeneratorInteraction();
            if (key === 'b') this.buildShelter();

            // Weapons 1-4
            if (key === '1') this.switchWeapon(0);
            if (key === '2') this.switchWeapon(1);
            if (key === '3') this.switchWeapon(2);
            if (key === '4') this.switchWeapon(3);
        });

        window.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            if (key === 'a' || key === 'arrowleft' || key === 'd' || key === 'arrowright') this.moveState.right = 0;
            if (key === 'w' || key === 'arrowup' || key === 's' || key === 'arrowdown') this.moveState.forward = 0;
            if (key === 'shift') this.isSprinting = false;
            if (key === 'control') this.isCrouching = false;
        });

        this.canvas.addEventListener('mousedown', (e) => {
            this.triggerAttackVisual();
        });
    }

    setupTouchJoystick() {
        const joy = document.getElementById('virtual-joystick');
        if (!joy) return;
        let isTouch = false;
        let startX = 0;

        joy.addEventListener('touchstart', (e) => {
            isTouch = true;
            startX = e.touches[0].clientX;
        });

        joy.addEventListener('touchmove', (e) => {
            if (!isTouch) return;
            const diffX = e.touches[0].clientX - startX;
            if (diffX > 20) this.moveState.right = 1;
            else if (diffX < -20) this.moveState.right = -1;
            else this.moveState.right = 0;
        });

        joy.addEventListener('touchend', () => {
            isTouch = false;
            this.moveState.right = 0;
        });
    }

    switchWeapon(idx) {
        if (idx >= 0 && idx < this.weapons.length) {
            this.currentWeaponIndex = idx;
            const w = this.weapons[idx];
            const nameEl = document.getElementById('weapon-name-text');
            const ammoEl = document.getElementById('weapon-ammo-text');
            const iconEl = document.getElementById('weapon-icon-box');
            if (nameEl) nameEl.textContent = w.name;
            if (ammoEl) ammoEl.textContent = `AMMO: ${w.ammo} (Scroll Wheel / Keys 1-4)`;
            if (iconEl) iconEl.innerHTML = `<i class="fa-solid ${w.icon}"></i>`;
            this.spawnFloatingDamageText(`EQUIPPED: ${w.name.toUpperCase()}`, 0x00f0ff);
        }
    }

    triggerDodgeRoll() {
        if (this.isRolling) return;
        this.isRolling = true;
        this.rollAngle = 0;
        this.spawnFloatingDamageText("DODGE ROLL!", 0x9d4edd);
        this.spawnParticleBurst(this.playerX, this.canvas.height - 100, 0, '#9d4edd', 15);
    }

    triggerAttackVisual() {
        const weapon = this.weapons[this.currentWeaponIndex];
        if (window.gameAudio) window.gameAudio.playAttackSwing();

        // Calculate attack damage based on weapon & path
        let damage = weapon.damage + (this.currentLevel * 15);
        if (this.currentPath === 'physical') damage *= 1.25;

        let targetX = this.playerX + 220;
        let isHit = true;

        if (this.activeEnemy === 'automaton') {
            this.automatonHealth = Math.max(0, this.automatonHealth - damage);
            this.spawnParticleBurst(targetX, this.canvas.height - 120, 0, weapon.color, 20);
            this.spawnFloatingDamageText(`-${Math.floor(damage)} CRIT!`, 0xff2a5f, targetX, this.canvas.height - 160);

            if (this.automatonHealth <= 0) {
                this.spawnFloatingDamageText("AUTOMATON DEFEATED!", 0xffb700);
                if (window.triggerLevelVictory) window.triggerLevelVictory();
            }
        } else {
            // Dragon Boss
            this.dragonHealth = Math.max(0, this.dragonHealth - damage);
            this.spawnParticleBurst(targetX + 80, this.canvas.height - 240, 0, '#ffb700', 25);
            this.spawnFloatingDamageText(`-${Math.floor(damage)} GOD-BEAST HIT!`, 0xffb700, targetX + 80, this.canvas.height - 280);

            // Phase Transitions
            if (this.dragonHealth < 4000 && this.dragonBossPhase === 1) {
                this.dragonBossPhase = 2;
                this.spawnFloatingDamageText("DRAGON PHASE 2: CELESTIAL STORM!", 0x00f0ff);
            } else if (this.dragonHealth < 2500 && this.dragonBossPhase === 2) {
                this.dragonBossPhase = 3;
                this.spawnFloatingDamageText("DRAGON PHASE 3: INFERNO OVERDRIVE!", 0xff2a5f);
            } else if (this.dragonHealth < 1000 && this.dragonBossPhase === 3) {
                this.dragonBossPhase = 4;
                this.spawnFloatingDamageText("DRAGON PHASE 4: VOID SHADOW ECLIPSE!", 0x9d4edd);
            } else if (this.dragonHealth <= 0) {
                this.dragonBossPhase = 5;
                this.spawnFloatingDamageText("GOD BEAST DRAGON SLAIN! ULTIMATE VICTORY!", 0xffb700);
                if (window.triggerLevelVictory) window.triggerLevelVictory();
            }
        }

        // Projectile particles
        this.particles.push({
            x: this.playerX + 40,
            y: this.canvas.height - 120 - (this.playerY * 1.5),
            vx: 18,
            vy: (Math.random() - 0.5) * 4,
            color: weapon.color,
            life: 25,
            size: 6
        });
    }

    spawnFloatingDamageText(text, colorHex = 0x00f0ff, customX, customY) {
        let colorStr = typeof colorHex === 'number' ? '#' + colorHex.toString(16).padStart(6, '0') : colorHex;
        const x = customX || (this.playerX + 50);
        const y = customY || (this.canvas.height - 150 - (this.playerY * 1.5));
        this.floatingTexts.push({
            text: text,
            x: x,
            y: y,
            color: colorStr,
            alpha: 1.0,
            life: 60
        });

        // Add to combat log
        const log = document.getElementById('combat-log');
        if (log) {
            const entry = document.createElement('div');
            entry.className = 'log-entry system';
            entry.style.color = colorStr;
            entry.innerHTML = `<i class="fa-solid fa-bolt"></i> ${text}`;
            log.prepend(entry);
            if (log.children.length > 6) log.removeChild(log.lastChild);
        }
    }

    spawnParticleBurst(x, y, z, colorStr, count = 15) {
        if (typeof colorStr === 'number') colorStr = '#' + colorStr.toString(16).padStart(6, '0');
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.5) * 12,
                color: colorStr,
                life: 30 + Math.random() * 20,
                size: 2 + Math.random() * 4
            });
        }
    }

    toggleVehicleOrChestInteraction() {
        const distChest = Math.abs((this.playerX) - 150);
        if (distChest < 100) {
            this.isChestOpen = !this.isChestOpen;
            this.spawnFloatingDamageText(this.isChestOpen ? "MYTHIC CHEST OPENED! +500 GEMS!" : "CHEST CLOSED", 0xffb700);
            if (this.isChestOpen) this.spawnParticleBurst(150, this.canvas.height - 100, 0, '#ffb700', 30);
            return;
        }

        this.isInVehicle = !this.isInVehicle;
        this.spawnFloatingDamageText(this.isInVehicle ? "ENTERED TACTICAL HOVER VEHICLE! (KEY E)" : "EXITED VEHICLE", 0x00f0ff);
    }

    toggleDoorInteraction() {
        this.isDoorOpen = !this.isDoorOpen;
        this.spawnFloatingDamageText(this.isDoorOpen ? "VILLA SLIDING DOOR OPEN" : "VILLA SLIDING DOOR CLOSED", 0x00f0ff);
    }

    toggleGeneratorInteraction() {
        this.isPowerOn = !this.isPowerOn;
        this.spawnFloatingDamageText(this.isPowerOn ? "POWER GENERATOR ACTIVE [ONLINE]" : "POWER GENERATOR SHUTDOWN", 0xff2a5f);
    }

    buildShelter() {
        if (this.woodCount >= 10 && this.sandCount >= 5) {
            this.woodCount -= 10;
            this.sandCount -= 5;
            this.hasShelter = true;
            this.spawnFloatingDamageText("VILLA SHELTER CONSTRUCTED SUCCESSFULLY!", 0x00ff88);
            const wEl = document.getElementById('res-wood-count');
            const sEl = document.getElementById('res-sand-count');
            if (wEl) wEl.textContent = this.woodCount;
            if (sEl) sEl.textContent = this.sandCount;
        } else {
            this.spawnFloatingDamageText("NEED 10 WOOD & 5 SAND TO BUILD SHELTER!", 0xff2a5f);
        }
    }

    cookRecipe(recipeType) {
        if (recipeType === 'roast') {
            this.playerHealth = Math.min(this.maxPlayerHealth, this.playerHealth + 450);
            this.stamina = Math.min(this.maxStamina, this.stamina + 200);
            this.spawnFloatingDamageText("COOKED WILD BEAST ROAST! +450 HP", 0x00ff88);
        } else if (recipeType === 'elixir') {
            this.arcanaEnergy = this.maxArcanaEnergy;
            this.spawnFloatingDamageText("BREWED ARCANA ELIXIR! FULL ENERGY RESET", 0x00f0ff);
        } else if (recipeType === 'steak') {
            this.playerHealth = this.maxPlayerHealth;
            this.spawnFloatingDamageText("SEARED GOD BEAST STEAK! TITAN BUFF ACTIVE", 0xffb700);
        }
    }

    setWeatherState(weather) {
        this.currentWeather = weather;
        this.spawnFloatingDamageText(`WEATHER SWITCHED: ${weather.toUpperCase()}`, 0x00f0ff);
    }

    switchOpponent() {
        this.activeEnemy = this.activeEnemy === 'automaton' ? 'dragon' : 'automaton';
        const nameEl = document.getElementById('enemy-target-name');
        if (nameEl) {
            nameEl.innerHTML = this.activeEnemy === 'automaton' ? 
                `<i class="fa-solid fa-robot"></i> TARGET AUTOMATON` :
                `<i class="fa-solid fa-dragon text-gold"></i> GOD-BEAST CELESTIAL DRAGON`;
        }
        this.spawnFloatingDamageText(`SWAPPING OPPONENT TO: ${this.activeEnemy.toUpperCase()}`, 0xffb700);
    }

    updateRemotePlayer(id, pos, rotY) {
        this.remotePlayersMap.set(id, { x: pos.x * 50 + 200, y: pos.y, rotY: rotY });
    }

    removeRemotePlayer(id) {
        this.remotePlayersMap.delete(id);
    }

    setLevelState(lvl) {
        this.currentLevel = lvl;
        this.maxPlayerHealth = 1080 + (lvl * 25);
        this.playerHealth = this.maxPlayerHealth;
    }

    setPathState(path) {
        this.currentPath = path;
    }

    customizerChange(type, val) {
        if (type === 'hair') this.hairColor = val;
        if (type === 'cyberArm') this.cyberArmColor = val;
        if (type === 'armor') this.chestArmorColor = val;
        if (type === 'aura') this.auraColor = val;
    }

    update() {
        this.animTime += 0.05;

        // Player movement logic
        const speed = this.isInVehicle ? 10 : (this.isSprinting ? 6.5 : 3.5);
        if (this.moveState.right !== 0) {
            this.playerX += this.moveState.right * speed;
            if (window.gameAudio && Math.random() < 0.1) window.gameAudio.playFootstep();
        }

        // Boundaries
        this.playerX = Math.max(-100, Math.min(this.canvas.width - 200, this.playerX));

        // Physics Y
        if (!this.isGrounded) {
            this.playerY -= this.playerVelY;
            this.playerVelY += 0.7; // Gravity
            if (this.playerY <= 0) {
                this.playerY = 0;
                this.playerVelY = 0;
                this.isGrounded = true;
            }
        }

        // Rolling logic
        if (this.isRolling) {
            this.rollAngle += 0.25;
            if (this.rollAngle >= Math.PI * 2) {
                this.isRolling = false;
                this.rollAngle = 0;
            }
        }

        // Auto spin visual mode in Studio
        if (this.autoSpin) {
            this.playerX += Math.sin(this.animTime) * 2;
        }

        // Update Birds
        this.birds.forEach(b => {
            b.x += b.speed;
            if (b.x > this.canvas.width + 100) b.x = -200;
        });

        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            if (p.life <= 0) this.particles.splice(i, 1);
        }

        // Update Floating Texts
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.y -= 1.2;
            ft.alpha -= 0.015;
            ft.life--;
            if (ft.life <= 0) this.floatingTexts.splice(i, 1);
        }

        // Update HUD DOM Bars
        const hpBar = document.getElementById('hp-bar');
        const hpText = document.getElementById('hp-val');
        if (hpBar) hpBar.style.width = `${(this.playerHealth / this.maxPlayerHealth) * 100}%`;
        if (hpText) hpText.textContent = `${Math.floor(this.playerHealth)} / ${this.maxPlayerHealth}`;

        const enemyHpBar = document.getElementById('enemy-target-hp-bar');
        const enemyHpText = document.getElementById('enemy-target-hp-text');
        if (this.activeEnemy === 'automaton') {
            if (enemyHpBar) enemyHpBar.style.width = `${(this.automatonHealth / this.automatonMaxHealth) * 100}%`;
            if (enemyHpText) enemyHpText.textContent = `${Math.floor(this.automatonHealth)} / ${this.automatonMaxHealth}`;
        } else {
            if (enemyHpBar) enemyHpBar.style.width = `${(this.dragonHealth / this.dragonMaxHealth) * 100}%`;
            if (enemyHpText) enemyHpText.textContent = `${Math.floor(this.dragonHealth)} / ${this.dragonMaxHealth} (PHASE ${this.dragonBossPhase})`;
        }

        // MiniMap Radar Drawing
        this.renderMinimap();
    }

    render() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const groundY = h - 90;

        ctx.clearRect(0, 0, w, h);

        // 1. SKY & WEATHER GRADIENT
        let skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
        if (this.currentWeather === 'sunny') {
            skyGrad.addColorStop(0, '#060b18');
            skyGrad.addColorStop(1, '#0f1d38');
        } else if (this.currentWeather === 'fog') {
            skyGrad.addColorStop(0, '#101622');
            skyGrad.addColorStop(1, '#1b2636');
        } else if (this.currentWeather === 'rain') {
            skyGrad.addColorStop(0, '#03060c');
            skyGrad.addColorStop(1, '#09101d');
        } else { // night
            skyGrad.addColorStop(0, '#020307');
            skyGrad.addColorStop(1, '#060a16');
        }
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Starfield / Grid Background
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, groundY);
            ctx.stroke();
        }

        // 2. PARALLAX MOUNTAINS & HORIZON RUNES
        ctx.fillStyle = 'rgba(18, 28, 48, 0.7)';
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(150, groundY - 140);
        ctx.lineTo(350, groundY - 60);
        ctx.lineTo(600, groundY - 180);
        ctx.lineTo(850, groundY - 70);
        ctx.lineTo(w, groundY - 150);
        ctx.lineTo(w, groundY);
        ctx.fill();

        // 3. TERRAIN FLOOR & SAFE ZONE RING
        let floorGrad = ctx.createLinearGradient(0, groundY, 0, h);
        floorGrad.addColorStop(0, '#0d182b');
        floorGrad.addColorStop(1, '#04070f');
        ctx.fillStyle = floorGrad;
        ctx.fillRect(0, groundY, w, h - groundY);

        // Neon Floor Line
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(w, groundY);
        ctx.stroke();

        // Safe Zone Electric Ring
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(w / 2, groundY + 30, w * 0.45, 25, 0, 0, Math.PI * 2);
        ctx.stroke();

        // 4. BIRDS ANIMATION
        ctx.fillStyle = '#8a99ad';
        this.birds.forEach(b => {
            ctx.beginPath();
            const wingY = Math.sin(this.animTime * 4 + b.x) * 6;
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(b.x - 8, b.y - wingY);
            ctx.lineTo(b.x + 8, b.y - wingY);
            ctx.fill();
        });

        // 5. INTERACTABLE STRUCTURES
        // Villa Shelter
        const villaX = 80;
        ctx.fillStyle = 'rgba(15, 25, 45, 0.9)';
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.fillRect(villaX, groundY - 120, 160, 120);
        ctx.strokeRect(villaX, groundY - 120, 160, 120);

        // Sliding Door
        ctx.fillStyle = this.isDoorOpen ? 'rgba(0, 240, 255, 0.2)' : '#00f0ff';
        const doorOffset = this.isDoorOpen ? 45 : 0;
        ctx.fillRect(villaX + 50 + doorOffset, groundY - 70, 50, 70);

        // Power Generator
        const genX = 270;
        ctx.fillStyle = '#1a2638';
        ctx.fillRect(genX, groundY - 60, 40, 60);
        if (this.isPowerOn) {
            ctx.fillStyle = '#00f0ff';
            ctx.beginPath();
            ctx.arc(genX + 20, groundY - 40, 8 + Math.sin(this.animTime * 5) * 3, 0, Math.PI * 2);
            ctx.fill();
        }

        // Mythic Loot Chest
        const chestX = 400;
        ctx.fillStyle = '#ffb700';
        ctx.fillRect(chestX, groundY - 35, 50, 35);
        ctx.fillStyle = '#9d4edd';
        if (this.isChestOpen) {
            ctx.fillRect(chestX - 5, groundY - 55, 60, 15);
        } else {
            ctx.fillRect(chestX, groundY - 45, 50, 12);
        }

        // Tactical Hover Vehicle
        const vehX = this.isInVehicle ? this.playerX : 520;
        const vehY = groundY - 45 - (this.isInVehicle ? (this.playerY * 1.5) : 0);
        if (!this.isInVehicle) {
            ctx.fillStyle = '#00f0ff';
            ctx.beginPath();
            ctx.moveTo(vehX, vehY + 20);
            ctx.lineTo(vehX + 70, vehY + 20);
            ctx.lineTo(vehX + 50, vehY);
            ctx.lineTo(vehX + 20, vehY);
            ctx.closePath();
            ctx.fill();
        }

        // 6. ENEMY / GOD BEAST ANIMATED VECTOR RENDER
        if (this.activeEnemy === 'automaton') {
            const autoX = 750;
            const autoY = groundY - 110;
            
            // Automaton Body
            ctx.fillStyle = '#1f2a3e';
            ctx.strokeStyle = '#ff2a5f';
            ctx.lineWidth = 2;
            ctx.fillRect(autoX, autoY, 60, 110);
            ctx.strokeRect(autoX, autoY, 60, 110);

            // Glowing Visor Eye
            ctx.fillStyle = '#ff2a5f';
            ctx.fillRect(autoX + 15, autoY + 20, 30, 8);

            // Floating Energy Shield
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
            ctx.beginPath();
            ctx.arc(autoX + 30, autoY + 55, 75, 0, Math.PI * 2);
            ctx.stroke();
        } else {
            // GOD BEAST DRAGON VECTOR ANIMATION
            const dragX = 700;
            const dragY = groundY - 220 + Math.sin(this.animTime * 2) * 20;

            // Dragon Color based on Phase
            let dragColor = '#00f0ff';
            if (this.dragonBossPhase === 2) dragColor = '#ffb700';
            if (this.dragonBossPhase === 3) dragColor = '#ff2a5f';
            if (this.dragonBossPhase === 4) dragColor = '#9d4edd';
            if (this.dragonBossPhase === 5) dragColor = '#ffffff';

            ctx.fillStyle = dragColor;
            ctx.strokeStyle = dragColor;

            // Animated Wings
            const wingFlap = Math.sin(this.animTime * 6) * 40;
            ctx.beginPath();
            ctx.moveTo(dragX + 40, dragY + 40);
            ctx.lineTo(dragX - 60, dragY - 60 + wingFlap);
            ctx.lineTo(dragX + 80, dragY + 20);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(dragX + 40, dragY + 40);
            ctx.lineTo(dragX + 140, dragY - 60 + wingFlap);
            ctx.lineTo(dragX + 80, dragY + 20);
            ctx.fill();

            // Body & Head
            ctx.beginPath();
            ctx.arc(dragX + 40, dragY + 40, 45, 0, Math.PI * 2);
            ctx.fill();

            // Glowing Eyes
            ctx.fillStyle = '#ff2a5f';
            ctx.beginPath();
            ctx.arc(dragX + 25, dragY + 30, 8, 0, Math.PI * 2);
            ctx.fill();

            // Breath Aura Particles
            if (Math.random() < 0.6) {
                this.particles.push({
                    x: dragX + 20,
                    y: dragY + 45,
                    vx: -12 - Math.random() * 6,
                    vy: (Math.random() - 0.5) * 6,
                    color: dragColor,
                    life: 20,
                    size: 8
                });
            }
        }

        // 7. REMOTE MULTIPLAYER PLAYERS
        this.remotePlayersMap.forEach((pData, id) => {
            ctx.fillStyle = '#00f0ff';
            ctx.fillRect(pData.x, groundY - 70, 30, 70);
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Orbitron';
            ctx.fillText(`PLAYER: ${id.substring(0, 6)}`, pData.x - 10, groundY - 80);
        });

        // 8. KAELEN VANCE 2D HERO VECTOR ANIMATION
        const px = this.playerX;
        const py = groundY - 85 - (this.playerY * 1.5);

        ctx.save();
        ctx.translate(px + 20, py + 42);

        if (this.isRolling) {
            ctx.rotate(this.rollAngle);
        }

        // God Beast / Path Aura Ring
        ctx.strokeStyle = this.auraColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 50 + Math.sin(this.animTime * 4) * 6, 0, Math.PI * 2);
        ctx.stroke();

        if (!this.isInVehicle) {
            // Legs Motion
            const legSwing = Math.sin(this.animTime * 10) * (this.moveState.right !== 0 ? 15 : 0);
            ctx.strokeStyle = '#8a99ad';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(-10, 20);
            ctx.lineTo(-15 + legSwing, 42);
            ctx.moveTo(10, 20);
            ctx.lineTo(15 - legSwing, 42);
            ctx.stroke();

            // Torso (Navy Tactical Shirt / Armor)
            ctx.fillStyle = this.chestArmorColor;
            ctx.fillRect(-15, -20, 30, 40);

            // Head & Flowing Hair
            ctx.fillStyle = '#ffccaa';
            ctx.beginPath();
            ctx.arc(0, -32, 14, 0, Math.PI * 2);
            ctx.fill();

            // Flowing Hair
            ctx.fillStyle = this.hairColor;
            ctx.beginPath();
            ctx.arc(0, -36, 15, Math.PI, Math.PI * 2);
            ctx.fill();

            // Cybernetic Right Arm
            ctx.fillStyle = this.cyberArmColor;
            ctx.fillRect(10, -15, 12, 30);

            // Weapon Render
            const weapon = this.weapons[this.currentWeaponIndex];
            ctx.strokeStyle = weapon.color;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(15, -5);
            ctx.lineTo(40, -5);
            ctx.stroke();
        } else {
            // Inside Vehicle Render
            ctx.fillStyle = '#00f0ff';
            ctx.fillRect(-25, -15, 60, 30);
        }

        ctx.restore();

        // 9. PARTICLES RENDER
        this.particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // 10. FLOATING DAMAGE TEXT RENDER
        ctx.font = '900 16px Orbitron';
        this.floatingTexts.forEach(ft => {
            ctx.fillStyle = ft.color;
            ctx.globalAlpha = Math.max(0, ft.alpha);
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.globalAlpha = 1.0;
        });

        // Clay Wireframe Mode Overlay
        if (this.isClayWireframe) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.strokeRect(10, 10, w - 20, h - 20);
        }
    }

    renderMinimap() {
        const miniCanvas = document.getElementById('minimap-canvas');
        if (!miniCanvas) return;
        const mctx = miniCanvas.getContext('2d');
        const mw = miniCanvas.width;
        const mh = miniCanvas.height;

        mctx.fillStyle = '#060a14';
        mctx.fillRect(0, 0, mw, mh);

        // Grid
        mctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
        mctx.lineWidth = 1;
        mctx.beginPath();
        mctx.arc(mw / 2, mh / 2, 60, 0, Math.PI * 2);
        mctx.stroke();

        // Player Dot
        const playerMapX = (this.playerX / this.canvas.width) * mw;
        mctx.fillStyle = '#00f0ff';
        mctx.beginPath();
        mctx.arc(Math.max(10, Math.min(mw - 10, playerMapX)), mh / 2, 4, 0, Math.PI * 2);
        mctx.fill();

        // Enemy Dot
        mctx.fillStyle = '#ff2a5f';
        mctx.beginPath();
        mctx.arc(mw - 25, mh / 2, 5, 0, Math.PI * 2);
        mctx.fill();
    }
}

// Instantiate Engine on Load
window.addEventListener('load', () => {
    window.game3D = new Game2DAnimationEngine();
    window.gameAnimationEngine = window.game3D;
});
