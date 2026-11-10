/**
 * Movement & Physics Configuration.
 *
 * Distances based on Body-Height (BH) = 48px:
 * - Max run speed: ~6 BH/s = 288 px/s = 4.8 px/tick
 * - Acceleration: 24 px/tick^2 (reaches top speed in ~12 ticks / 0.2s)
 * - Deceleration / Friction: 16 px/tick^2 (stops in ~18 ticks / 0.3s)
 * - Jump Apex: ~2.2 BH = ~105 px
 * - Gravity: ~0.45 px/tick^2
 * - Jump initial velocity: -9.5 px/tick (gives apex ~100px in ~21 ticks)
 * - Variable jump cancel gravity multiplier: 2.2x
 * - Coyote time: 6 ticks (100 ms)
 * - Jump buffer: 6 ticks (100 ms)
 */
export interface MovementConfig {
  readonly bodyHeight: number; // 48 px
  readonly width: number; // 24 px
  readonly height: number; // 48 px

  readonly maxRunSpeed: number; // px/tick
  readonly groundAccel: number; // px/tick^2
  readonly groundDecel: number; // px/tick^2
  readonly airAccel: number; // px/tick^2 (≥ 70% of ground)
  readonly airDecel: number; // px/tick^2

  readonly jumpVelocity: number; // px/tick (negative = up)
  readonly jumpCancelFactor: number; // velocity cut factor on early release
  readonly gravity: number; // px/tick^2
  readonly maxFallSpeed: number; // px/tick

  readonly coyoteTimeTicks: number; // 6 ticks = 100 ms at 60 Hz
  readonly jumpBufferTicks: number; // 6 ticks = 100 ms at 60 Hz
  readonly dropThroughIgnoreTicks: number; // ticks to ignore one-way floor after drop
}

export const DEFAULT_MOVEMENT_CONFIG: MovementConfig = Object.freeze({
  bodyHeight: 48,
  width: 24,
  height: 48,

  maxRunSpeed: 4.8, // ~6 BH/s (288 px/s)
  groundAccel: 0.6,
  groundDecel: 0.5,
  airAccel: 0.45, // 75% ground accel
  airDecel: 0.2,

  jumpVelocity: -9.5, // Apex ~100 px (~2.1 BH)
  jumpCancelFactor: 0.5, // Halves upward velocity when jump is released early
  gravity: 0.45, // ~1620 px/s^2
  maxFallSpeed: 12.0, // Terminal velocity

  coyoteTimeTicks: 6, // 100 ms
  jumpBufferTicks: 6, // 100 ms
  dropThroughIgnoreTicks: 12 // 200 ms to clear one-way platform
});
