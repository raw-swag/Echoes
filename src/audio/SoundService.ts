/**
 * Web Audio API synthesizer for lightweight, zero-dependency game sound effects.
 * Fails gracefully if Web Audio is unsupported or audio context is blocked.
 * Respects user mute state.
 */
export class SoundService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.8;
  private sfxVolume: number = 0.8;

  constructor() {
    // Lazy initialized on first user interaction to conform to browser autoplay policies
    this.loadSettings();
  }

  private loadSettings(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem('echoes_audio_settings');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (typeof parsed.masterVolume === 'number') this.masterVolume = parsed.masterVolume;
          if (typeof parsed.sfxVolume === 'number') this.sfxVolume = parsed.sfxVolume;
          if (typeof parsed.isMuted === 'boolean') this.isMuted = parsed.isMuted;
        }
      } catch {
        // Fallback to default
      }
    }
  }

  public saveSettings(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(
          'echoes_audio_settings',
          JSON.stringify({
            masterVolume: this.masterVolume,
            sfxVolume: this.sfxVolume,
            isMuted: this.isMuted
          })
        );
      } catch {
        // Ignore storage errors
      }
    }
  }

  public setMasterVolume(vol: number): void {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    this.saveSettings();
  }

  public getMasterVolume(): number {
    return this.masterVolume;
  }

  public setSfxVolume(vol: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    this.saveSettings();
  }

  public getSfxVolume(): number {
    return this.sfxVolume;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getEffectiveGain(baseGain: number): number {
    if (this.isMuted) return 0;
    return baseGain * this.masterVolume * this.sfxVolume;
  }

  private initContext(): void {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    this.saveSettings();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.saveSettings();
    return this.isMuted;
  }

  /**
   * Jump sound: light rising frequency blip (280 -> 480 Hz)
   */
  public playJump(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(480, t + 0.12);

      gain.gain.setValueAtTime(this.getEffectiveGain(0.12), t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.12);
    } catch (err) {
      void err;
    }
  }

  /**
   * Memory Shard collected: resonant harmonic chime (two harmonic bells)
   */
  public playShardCollect(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [659.25, 987.77].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + i * 0.06);

        gain.gain.setValueAtTime(this.getEffectiveGain(0.15), t + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t + i * 0.06);
        osc.stop(t + i * 0.06 + 0.45);
      });
    } catch (err) {
      void err;
    }
  }

  /**
   * Beacon Checkpoint activated: deep harmonic chord of renewal
   */
  public playBeaconActivate(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [220, 329.63, 440].forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(this.getEffectiveGain(0.1), t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + 0.8);
      });
    } catch (err) {
      void err;
    }
  }

  /**
   * Trace recording started: subtle recording tick
   */
  public playTraceRecord(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.setValueAtTime(660, t + 0.04);

      gain.gain.setValueAtTime(this.getEffectiveGain(0.08), t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.1);
    } catch (err) {
      void err;
    }
  }

  /**
   * Trace playback launched: ethereal resonance
   */
  public playTraceLaunch(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, t);
      osc.frequency.exponentialRampToValueAtTime(550, t + 0.25);

      gain.gain.setValueAtTime(this.getEffectiveGain(0.12), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.25);
    } catch (err) {
      void err;
    }
  }

  /**
   * Pressure plate depressed: mechanical click
   */
  public playPlateClick(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'square';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.linearRampToValueAtTime(80, t + 0.05);

      gain.gain.setValueAtTime(this.getEffectiveGain(0.08), t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.05);
    } catch (err) {
      void err;
    }
  }

  /**
   * Echo Door opening: low frequency hydraulic hum
   */
  public playDoorOpen(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, t);
      osc.frequency.linearRampToValueAtTime(140, t + 0.3);

      gain.gain.setValueAtTime(this.getEffectiveGain(0.1), t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.3);
    } catch (err) {
      void err;
    }
  }

  /**
   * Damage taken: low impact thud
   */
  public playDamage(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.18);

      gain.gain.setValueAtTime(this.getEffectiveGain(0.2), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.18);
    } catch (err) {
      void err;
    }
  }

  /**
   * Death / Dissolve sound
   */
  public playDeath(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.4);

      gain.gain.setValueAtTime(this.getEffectiveGain(0.25), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.4);
    } catch (err) {
      void err;
    }
  }

  /**
   * Level Complete: triumphant ethereal progression
   */
  public playLevelComplete(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.12);

        gain.gain.setValueAtTime(this.getEffectiveGain(0.15), t + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t + idx * 0.12);
        osc.stop(t + idx * 0.12 + 0.6);
      });
    } catch (err) {
      void err;
    }
  }

  /**
   * UI Click / Subtle bell chime
   */
  public playUIClick(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, t); // D5
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.05);

      gain.gain.setValueAtTime(this.getEffectiveGain(0.06), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch (err) {
      void err;
    }
  }
}

export const soundService = new SoundService();
