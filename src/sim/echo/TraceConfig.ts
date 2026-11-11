/**
 * Canonical Echo Trace Configuration & Tunables.
 * References: docs/00B_CANONICAL_SPEC.md §6 & docs/04_MECHANICS_AND_PUZZLES.md §2.
 */
export interface TraceConfig {
  /** Maximum recording duration in seconds (TR-01). Default: 8.0 s */
  readonly maxRecordTime: number;
  /** Minimum recording duration in seconds (TR-02). Default: 0.5 s (shorter is discarded) */
  readonly minRecordTime: number;
  /** Hold duration after playback ends in seconds (TR-03). Default: 12.0 s */
  readonly holdTime: number;
  /** Cooldown duration after a trace ends in seconds (TR-04). Default: 1.0 s */
  readonly recordCooldown: number;
  /** Simultaneous trace slots (TR-05). Default: 1 (Ch1-3), 2 (Ch4+) */
  readonly traceSlots: number;
  /** Dissolve duration in seconds (TR-06). Default: 1.0 s */
  readonly dissolveTime: number;
  /** Hold time to cancel recording in seconds (TR-09). Default: 0.5 s */
  readonly cancelHoldTime: number;
  /** Simulation rate in Hz (TR-07). Default: 60 */
  readonly sampleRate: number;
  /** Fixed-point scale factor (1 px = 256 units = 2^8) */
  readonly fixedPointScale: number;
}

export const DEFAULT_TRACE_CONFIG: TraceConfig = Object.freeze({
  maxRecordTime: 8.0,
  minRecordTime: 0.5,
  holdTime: 12.0,
  recordCooldown: 1.0,
  traceSlots: 1,
  dissolveTime: 1.0,
  cancelHoldTime: 0.5,
  sampleRate: 60,
  fixedPointScale: 256
});

/**
 * Derived tick constants at 60 Hz.
 */
export const TRACE_TICKS = Object.freeze({
  MAX_RECORD_TICKS: 480, // 8.0 s * 60 Hz
  MIN_RECORD_TICKS: 30, // 0.5 s * 60 Hz
  HOLD_TICKS: 720, // 12.0 s * 60 Hz
  DISSOLVE_TICKS: 60, // 1.0 s * 60 Hz
  COOLDOWN_TICKS: 60, // 1.0 s * 60 Hz
  CANCEL_HOLD_TICKS: 30 // 0.5 s * 60 Hz
});
