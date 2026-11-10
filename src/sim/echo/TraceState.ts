/**
 * Canonical lifecycle states of the Echo Trace system.
 */
export type TraceLifecycleState =
  | 'idle' // Waiting for player to start recording
  | 'recording' // Currently recording player transforms
  | 'playback' // Ghost is actively retracing the recorded transform path
  | 'holding' // Ghost has reached final pose and holds position (TR-03)
  | 'dissolving' // Ghost is fading out over TR-06
  | 'cooldown'; // Trace dissolved; cooldown active before new recording permitted

export interface TraceStatus {
  readonly state: TraceLifecycleState;
  readonly recordTicks: number;
  readonly maxRecordTicks: number;
  readonly playbackTick: number;
  readonly holdTick: number;
  readonly dissolveTick: number;
  readonly cooldownTick: number;
  readonly validSampleCount: number;
}
