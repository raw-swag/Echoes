# Echo Trace Deterministic Recording & Playback Engine (Milestone 3)

## Architectural Overview

The Echo Trace system is the defining mechanic of **ECHOES: THE THINGS WE CHOSE TO FORGET**.
In Milestone 3 (M3), this mechanic is implemented as a deterministic recorded-transform playback engine in pure TypeScript, residing strictly within `src/sim/echo/` with zero DOM or browser dependencies.

## Key Systems Implemented

### 1. Fixed-Point Preallocated Buffer (`TraceBuffer.ts`)
- Preallocated `Int32Array` of 1,920 32-bit integers (480 frames x 4 words/frame = 7,680 bytes allocated once at startup).
- Zero allocations during per-tick recording or playback hot paths.
- Transforms are encoded with power-of-two fixed-point scale factor `256` ($1/256$ px precision), ensuring bitwise deterministic cross-platform IEEE-754 reproduction.
- Bitmasked metadata packs facing direction, movement state, grounded flags, and interaction triggers into word 3.

### 2. Transform Sampling & Lifecycle Management (`TraceRecorder.ts`, `TracePlayer.ts`, `TraceGhost.ts`)
- **Sampling:** Authoritative player transforms sampled strictly at 60 Hz.
- **Duration Tuning:**
  - Maximum duration (TR-01): 480 ticks (8.0 s). Auto-caps and launches playback.
  - Minimum duration (TR-02): 30 ticks (0.5 s). Shorter recordings are discarded.
  - Holding pose (TR-03): 720 ticks (12.0 s). Ghost stays locked at final pose.
  - Cooldown (TR-04): 60 ticks (1.0 s).
  - Cancel hold (TR-05): Holding the trace button for 30 ticks cancels active recording or playback immediately.
  - Dissolve fade (TR-06): 60 ticks (1.0 s) linear alpha fade from 0.65 to 0.0.
- **Physical Rules:**
  - Ghost passes through solid world geometry (F-T10).
  - Ghost does not push or collide with living player (F-T10).
  - Ghost triggers compatible weight sensors (WeightSensor, PressurePlate) with weight value = 1.0 (TR-08, F-T11).

### 3. Environmental Puzzle Mechanics (`WeightSensor.ts`, `EchoDoor.ts`, `PressureGalleryRoom.ts`)
- **Pressure Gallery:** Dedicated test chamber where a Pressure Plate is located ~14 Body Heights away from a closed EchoDoor blocking the exit gateway.
- Player records movement to the plate and holds, launches Trace playback, and dashes to the door. As the ghost steps on the plate, the door retracts open, allowing the living player to traverse the gateway.

### 4. Golden Determinism Verification (`tests/sim/EchoTrace.test.ts`)
- 10 automated test suites covering all canonical requirements F-T1 through F-T15.
- Golden Determinism test executes 50+ playback loops of complex sequences (running, jumping, landing) verifying 0.0 positional drift and zero buffer mutation.
