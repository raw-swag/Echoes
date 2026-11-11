import { TraceBuffer } from './TraceBuffer';
import { TraceGhost } from './TraceGhost';
import { TraceLifecycleState, TraceStatus } from './TraceState';
import { TRACE_TICKS } from './TraceConfig';

/**
 * TracePlayer:
 * Manages the deterministic playback, holding, and dissolving of an Echo Ghost.
 *
 * Sequence (F-T5):
 * 1. Playback: reads frames 0 to validFrames-1 at exactly 1 frame per 60 Hz tick.
 * 2. Holding: stays locked at final pose for TR-03 (720 ticks = 12.0 s).
 * 3. Dissolve: smoothly fades out over TR-06 (60 ticks = 1.0 s).
 * 4. Cooldown: prevents immediate recording for TR-04 (60 ticks = 1.0 s).
 */
export class TracePlayer {
  private readonly buffer: TraceBuffer;
  private readonly ghost: TraceGhost;

  private state: TraceLifecycleState = 'idle';
  private playbackTick: number = 0;
  private holdTick: number = 0;
  private dissolveTick: number = 0;
  private cooldownTick: number = 0;

  constructor(buffer: TraceBuffer, ghost: TraceGhost) {
    this.buffer = buffer;
    this.ghost = ghost;
  }

  public getState(): TraceLifecycleState {
    return this.state;
  }

  public getGhost(): TraceGhost {
    return this.ghost;
  }

  public getStatus(recordTicks: number = 0): TraceStatus {
    return {
      state: this.state,
      recordTicks,
      maxRecordTicks: TRACE_TICKS.MAX_RECORD_TICKS,
      playbackTick: this.playbackTick,
      holdTick: this.holdTick,
      dissolveTick: this.dissolveTick,
      cooldownTick: this.cooldownTick,
      validSampleCount: this.buffer.getValidFrames()
    };
  }

  /**
   * Launch playback from the recorded origin (F-T2).
   */
  public launch(): boolean {
    if (this.buffer.getValidFrames() < TRACE_TICKS.MIN_RECORD_TICKS) {
      return false;
    }

    this.state = 'playback';
    this.playbackTick = 0;
    this.holdTick = 0;
    this.dissolveTick = 0;
    this.cooldownTick = 0;

    // Set ghost at frame 0
    this.ghost.setFrame(this.buffer, 0, 0.65, false, false);
    return true;
  }

  /**
   * Advance playback by one deterministic simulation tick (60 Hz).
   * Hot path: Zero allocations.
   */
  public update(): void {
    const totalFrames = this.buffer.getValidFrames();

    switch (this.state) {
      case 'playback': {
        if (this.playbackTick < totalFrames) {
          this.ghost.setFrame(this.buffer, this.playbackTick, 0.65, false, false);
          this.playbackTick += 1;
        } else {
          // Reached end of recorded transforms -> Transition to HOLD (F-T5)
          this.state = 'holding';
          this.holdTick = 0;
          this.ghost.setFrame(this.buffer, totalFrames - 1, 0.65, true, false);
        }
        break;
      }

      case 'holding': {
        this.holdTick += 1;
        if (this.holdTick >= TRACE_TICKS.HOLD_TICKS) {
          // Hold duration expired -> Transition to DISSOLVE
          this.state = 'dissolving';
          this.dissolveTick = 0;
          this.ghost.setFrame(this.buffer, totalFrames - 1, 0.65, false, true);
        } else {
          // Keep final pose active
          this.ghost.setFrame(this.buffer, totalFrames - 1, 0.65, true, false);
        }
        break;
      }

      case 'dissolving': {
        this.dissolveTick += 1;
        const progress = this.dissolveTick / TRACE_TICKS.DISSOLVE_TICKS;
        const opacity = Math.max(0, 0.65 * (1 - progress));

        this.ghost.setFrame(this.buffer, totalFrames - 1, opacity, false, true);

        if (this.dissolveTick >= TRACE_TICKS.DISSOLVE_TICKS) {
          // Dissolve complete -> Ghost disappears -> Cooldown starts
          this.ghost.deactivate();
          this.state = 'cooldown';
          this.cooldownTick = 0;
        }
        break;
      }

      case 'cooldown': {
        this.cooldownTick += 1;
        if (this.cooldownTick >= TRACE_TICKS.COOLDOWN_TICKS) {
          this.state = 'idle';
          this.cooldownTick = 0;
        }
        break;
      }

      case 'idle':
      case 'recording':
      default:
        // Inactive ghost during idle or recording
        break;
    }
  }

  public dissolveImmediately(): void {
    this.ghost.deactivate();
    this.state = 'idle';
    this.playbackTick = 0;
    this.holdTick = 0;
    this.dissolveTick = 0;
    this.cooldownTick = 0;
  }

  public reset(): void {
    this.dissolveImmediately();
    this.buffer.clear();
  }
}
