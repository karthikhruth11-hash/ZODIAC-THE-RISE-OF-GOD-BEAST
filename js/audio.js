/* ==========================================================================
   ZODIAC: RISE OF THE GOD BEAST — PROCEDURAL WEB AUDIO SYNTHESIZER
   ========================================================================== */

class GameAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.initAudio();
    }

    initAudio() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            this.ctx = new AudioContext();
        }
    }

    ensureContext() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playAttackSwing() {
        if (this.isMuted || !this.ctx) return;
        this.ensureContext();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }

    playSerumInject() {
        if (this.isMuted || !this.ctx) return;
        this.ensureContext();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.4);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.4);
    }

    playSpecialAbility(path) {
        if (this.isMuted || !this.ctx) return;
        this.ensureContext();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        if (path === 'physical') {
            // Low sub bass slam
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.5);
        } else if (path === 'arcana') {
            // Laser blast
            osc.type = 'sine';
            osc.frequency.setValueAtTime(900, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.3);
        } else {
            // Fire crackle burst
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(500, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.4);
        }

        gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
    }

    playGodBeastAscension() {
        if (this.isMuted || !this.ctx) return;
        this.ensureContext();

        // Dual oscillator chord for celestial ascension
        const freqs = [220, 330, 440, 660];
        freqs.forEach((f, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, this.ctx.currentTime + index * 0.05);
            osc.frequency.exponentialRampToValueAtTime(f * 1.5, this.ctx.currentTime + 0.8);

            gain.gain.setValueAtTime(0.2, this.ctx.currentTime + index * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + index * 0.05);
            osc.stop(this.ctx.currentTime + 1.2);
        });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }
}

window.gameAudio = new GameAudioEngine();
