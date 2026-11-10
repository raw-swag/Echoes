import { Player } from '../entities/Player';
import { TraceBuffer } from './TraceBuffer';
import { TRACE_TICKS } from './TraceConfig';

function movementStateToId(state: string): number {
  switch (state) {
    case 'idle':
      return 0;
    case 'running':
      return 1;
    case 'jumping':
      return 2;
    case 'falling':
      return 3;
    default:
      return 0;
  }
}

/**
 * TraceRecorder:
 * Captures authoritative player transforms tick-by-tick into the preallocated TraceBuffer.
 *
 * Rules:
 * - Sampling rate: strictly 60 Hz fixed tick.
 * - Zero allocations during recording.
 * - Caps recording at TR-01 (480 ticks = 8.0 s).
 * - Enforces minimum duration TR-02 (30 ticks = 0.5 s).
 */
export class TraceRecorder {
  private readonly buffer: TraceBuffer;
  private isRecordingActive: boolean = false;
  private recordedTicks: number = 0;

  // Origin mark (starting point of trace)
  private originX: number = 0;
  private originY: number = 0;

  constructor(buffer: TraceBuffer) {
    this.buffer = buffer;
  }

  public isRecording(): boolean {
    return this.isRecordingActive;
  }

  public getRecordedTicks(): number {
    return this.recordedTicks;
  }

  public getOrigin(): { x: number; y: number } {
    return { x: this.originX, y: this.originY };
  }

  /**
   * Start recording from player current position (F-T1).
   */
  public start(player: Player): void {
    this.buffer.clear();
    this.recordedTicks = 0;
    this.originX = player.x;
    this.originY = player.y;
    this.isRecordingActive = true;
  }

  /**
   * Capture a single authoritative simulation tick transform.
   * Hot path: Zero allocations.
   */
  public recordSample(player: Player): boolean {
    if (!this.isRecordingActive) {
      return false;
    }

    if (this.recordedTicks >= TRACE_TICKS.MAX_RECORD_TICKS) {
      // Reached max duration (TR-01) -> Auto stop
      this.isRecordingActive = false;
      return false;
    }

    const stateId = movementStateToId(player.state);
    this.buffer.writeFrame(
      this.recordedTicks,
      player.x,
      player.y,
      player.facing,
      stateId,
      player.isGrounded,
      0
    );

    this.recordedTicks += 1;

    // Check if cap reached on this frame
    if (this.recordedTicks >= TRACE_TICKS.MAX_RECORD_TICKS) {
      this.isRecordingActive = false;
      this.buffer.setValidFrames(this.recordedTicks);
      return true; // auto finished
    }

    return false;
  }

  /**
   * Alias for recordSample that returns true when max cap is reached.
   */
  public recordFrame(player: Player): boolean {
    return this.recordSample(player);
  }

  /**
   * Stop recording.
   * Returns true if recording meets minimum length TR-02 (30 ticks = 0.5 s), false if too short.
   */
  public stop(): boolean {
    if (!this.isRecordingActive && this.recordedTicks === 0) {
      return false;
    }

    this.isRecordingActive = false;

    // Enforce TR-02 (min 0.5 s)
    if (this.recordedTicks < TRACE_TICKS.MIN_RECORD_TICKS) {
      this.buffer.clear();
      this.recordedTicks = 0;
      return false;
    }

    this.buffer.setValidFrames(this.recordedTicks);
    return true;
  }

  /**
   * Cancel and discard recording immediately (F-T3).
   */
  public cancel(): void {
    this.isRecordingActive = false;
    this.buffer.clear();
    this.recordedTicks = 0;
  }
}
