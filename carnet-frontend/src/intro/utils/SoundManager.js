class SoundManager {
  constructor() {
    this.ctx = null;
    this.sounds = {};
    this.frequencies = {
      boot: [220, 440, 880, 1760],
      turbo: [800, 1600, 2400],
      success: [523.25, 659.25, 783.99, 1046.50] // C-E-G-C Arpeggio Matrix
    };
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playOscillatorSequence(type, duration = 0.15, gainVal = 0.1) {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    const freqs = this.frequencies[type] || [440];
    const now = this.ctx.currentTime;
    
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      
      osc.type = type === 'turbo' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      if (type === 'turbo') {
        osc.frequency.exponentialRampToValueAtTime(freq * 2.5, now + idx * 0.08 + duration);
      }

      gainNode.gain.setValueAtTime(gainVal, now + idx * 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + duration);
      
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + duration);
    });
  }

  playEngineHum(duration = 2.0) {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now); // Low RPM Bass Rumble
    osc.frequency.linearRampToValueAtTime(180, now + duration); // Ramping up speed
    
    // Low pass filter adding heavy metal mechanical weight dampening
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, now);

    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + duration);
  }
}

export const audioSystem = new SoundManager();