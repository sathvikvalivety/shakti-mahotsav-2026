// Subtle celestial ambient synth using browser Web Audio API
class CelestialAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3); // ultra-soft ambient level
      this.gainNode.connect(this.ctx.destination);

      // Sacred Tanpura / Celestial chord frequencies (Sa - Pa - Sa octave: C# root ~ 138.6 Hz, 207.65 Hz, 277.2 Hz)
      const freqs = [138.59, 207.65, 277.18, 415.3, 554.37];

      this.oscillators = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime);

        const oscGain = this.ctx!.createGain();
        oscGain.gain.setValueAtTime(0.15 / (i + 1), this.ctx!.currentTime);

        osc.connect(oscGain);
        oscGain.connect(this.gainNode!);
        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch (err) {
      console.warn('Audio not allowed or supported', err);
    }
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      if (this.gainNode) {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      }
      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
        this.oscillators = [];
        this.isPlaying = false;
      }, 1600);
    } catch (e) {
      this.isPlaying = false;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const celestialAudio = new CelestialAudioEngine();
