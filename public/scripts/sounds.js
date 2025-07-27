// Sound Effects Manager for Terminal
class SoundManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.3;
        this.initializeSounds();
    }

    initializeSounds() {
        // Create audio objects using Web Audio API for better performance
        this.audioContext = null;
        this.isInitialized = false;
        
        // Mechanical keyboard sound frequencies and patterns
        this.keyPressSounds = [
            { freq: 800, duration: 0.05 },
            { freq: 1000, duration: 0.04 },
            { freq: 1200, duration: 0.06 },
            { freq: 900, duration: 0.05 }
        ];
        
        this.enterSound = { freq: 600, duration: 0.1 };
        this.backspaceSound = { freq: 400, duration: 0.08 };
        this.tabSound = { freq: 1500, duration: 0.03 };
        this.errorSound = { freq: 200, duration: 0.2 };
    }

    async initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            this.isInitialized = true;
        }
    }

    async generateTone(frequency, duration, type = 'square') {
        if (!this.enabled) return;
        
        try {
            await this.initAudioContext();
            if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        // Envelope for more realistic sound
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (error) {
            console.log('Audio context error:', error);
        }
    }

    playKeyPress() {
        const sound = this.keyPressSounds[Math.floor(Math.random() * this.keyPressSounds.length)];
        this.generateTone(sound.freq, sound.duration);
    }

    playEnter() {
        this.generateTone(this.enterSound.freq, this.enterSound.duration);
        // Add a slight delay for a "thock" sound
        setTimeout(() => {
            this.generateTone(this.enterSound.freq * 0.7, this.enterSound.duration * 0.5);
        }, 20);
    }

    playBackspace() {
        this.generateTone(this.backspaceSound.freq, this.backspaceSound.duration);
    }

    playTab() {
        this.generateTone(this.tabSound.freq, this.tabSound.duration);
    }

    playError() {
        this.generateTone(this.errorSound.freq, this.errorSound.duration, 'sawtooth');
    }

    playStartup() {
        // Boot up sound sequence
        const notes = [440, 554, 659, 880];
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.generateTone(freq, 0.15, 'sine');
            }, index * 100);
        });
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
    }
}

// Initialize sound manager
const soundManager = new SoundManager();

// Initialize sound on first user interaction
let soundInitialized = false;

function initializeSoundOnInteraction() {
    if (!soundInitialized) {
        soundInitialized = true;
        soundManager.playStartup();
        console.log('🎵 Sound effects enabled!');
    }
}

// Listen for first user interaction to enable sound
document.addEventListener('click', initializeSoundOnInteraction, { once: true });
document.addEventListener('keydown', initializeSoundOnInteraction, { once: true });
document.addEventListener('touchstart', initializeSoundOnInteraction, { once: true });
