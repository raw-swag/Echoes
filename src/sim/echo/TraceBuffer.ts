import { TRACE_TICKS } from './TraceConfig';

/**
 * Preallocated typed storage buffer for Echo Trace transforms.
 *
 * Fixed layout per tick frame (4 x 32-bit integers = 16 bytes per frame):
 * - Word 0: Fixed-point X coordinate (value * 256)
 * - Word 1: Fixed-point Y coordinate (value * 256)
 * - Word 2: Facing direction (1 = right, -1 = left)
 * - Word 3: Bitmasked State & Action flags:
 *     Bits 0-3: Movement state id (0: idle, 1: running, 2: jumping, 3: falling)
 *     Bit 4: Grounded flag (1 if grounded)
 *     Bit 5: Action flag: jump
 *     Bit 6: Action flag: ability
 *     Bit 7: Action flag: interact
 *     Bit 8: Action flag: pulse
 *
 * Capacity: 480 frames * 4 words = 1920 elements (7,680 bytes).
 * Allocated ONCE at startup. Zero allocations in recording or playback loops.
 */
export class TraceBuffer {
  public static readonly WORDS_PER_FRAME = 4;
  public static readonly MAX_FRAMES = TRACE_TICKS.MAX_RECORD_TICKS; // 480
  public static readonly FIXED_POINT_SCALE = 256;

  private readonly storage: Int32Array;
  private validFrames: number = 0;

  constructor() {
    this.storage = new Int32Array(TraceBuffer.MAX_FRAMES * TraceBuffer.WORDS_PER_FRAME);
  }

  public clear(): void {
    this.validFrames = 0;
  }

  public getValidFrames(): number {
    return this.validFrames;
  }

  public setValidFrames(count: number): void {
    this.validFrames = Math.max(0, Math.min(TraceBuffer.MAX_FRAMES, count));
  }

  /**
   * Write one frame sample into the buffer at index `frameIndex`.
   * Hot path: Zero allocations.
   */
  public writeFrame(
    frameIndex: number,
    worldX: number,
    worldY: number,
    facing: 'left' | 'right',
    stateId: number,
    isGrounded: boolean,
    actionsBitmask: number = 0
  ): void {
    if (frameIndex < 0 || frameIndex >= TraceBuffer.MAX_FRAMES) {
      return;
    }

    const offset = frameIndex * TraceBuffer.WORDS_PER_FRAME;
    this.storage[offset] = Math.round(worldX * TraceBuffer.FIXED_POINT_SCALE);
    this.storage[offset + 1] = Math.round(worldY * TraceBuffer.FIXED_POINT_SCALE);
    this.storage[offset + 2] = facing === 'right' ? 1 : -1;

    let meta = (stateId & 0x0f) | (isGrounded ? 0x10 : 0);
    meta |= (actionsBitmask & 0x0f) << 5;
    this.storage[offset + 3] = meta;

    if (frameIndex >= this.validFrames) {
      this.validFrames = frameIndex + 1;
    }
  }

  /**
   * Read transform values for a given frame.
   * Hot path: Zero allocations (returns primitives via output parameters or direct query).
   */
  public getX(frameIndex: number): number {
    const idx = Math.max(0, Math.min(this.validFrames - 1, frameIndex));
    return this.storage[idx * TraceBuffer.WORDS_PER_FRAME] / TraceBuffer.FIXED_POINT_SCALE;
  }

  public getY(frameIndex: number): number {
    const idx = Math.max(0, Math.min(this.validFrames - 1, frameIndex));
    return this.storage[idx * TraceBuffer.WORDS_PER_FRAME + 1] / TraceBuffer.FIXED_POINT_SCALE;
  }

  public getFacing(frameIndex: number): 'left' | 'right' {
    const idx = Math.max(0, Math.min(this.validFrames - 1, frameIndex));
    return this.storage[idx * TraceBuffer.WORDS_PER_FRAME + 2] >= 0 ? 'right' : 'left';
  }

  public getStateId(frameIndex: number): number {
    const idx = Math.max(0, Math.min(this.validFrames - 1, frameIndex));
    return this.storage[idx * TraceBuffer.WORDS_PER_FRAME + 3] & 0x0f;
  }

  public isGrounded(frameIndex: number): boolean {
    const idx = Math.max(0, Math.min(this.validFrames - 1, frameIndex));
    return (this.storage[idx * TraceBuffer.WORDS_PER_FRAME + 3] & 0x10) !== 0;
  }

  public getRawStorage(): Int32Array {
    return this.storage;
  }

  public getRawData(): Int32Array {
    return this.storage;
  }
}
