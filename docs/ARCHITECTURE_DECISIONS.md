# ECHOES: Architecture Decisions Record (ADR)

## ADR-001: Simulation and Rendering Separation
- **Context:** The game requires determinism for replay features (Echo Trace) and headless unit/regression testing.
- **Decision:** Strict isolation of `src/sim/`. No DOM, window, document, CanvasRenderingContext2D, or web API references are permitted in `src/sim/`.
- **Enforcement:** Enforced at build time via `tests/architecture/boundary.test.ts`.
- **Consequences:** Rendering code in `src/renderer/` acts solely as an observer/adapter that receives state snapshots and interpolation factor $\alpha \in [0, 1)$ without altering simulation state.

## ADR-002: Fixed-Step Accumulator Loop with Strict Catch-Up Ceiling
- **Context:** Variable display refresh rates (60 Hz, 120 Hz, 144 Hz, 240 Hz) and browser tab throttling can lead to inconsistent physics steps and spiral of death under heavy load.
- **Decision:** Implement a canonical accumulator loop running at exactly 60 ticks/s ($dt = 1/60$ s).
  - Maximum sub-steps per frame is capped at 5.
  - Maximum delta time ingested per frame is clamped to 200 ms.
  - If excess accumulated time remains after 5 sub-steps, it is safely drained to avoid frame cascade.
  - Pausing (e.g. on `visibilitychange`) resets the accumulator and timing base on resume.
- **Consequences:** High-refresh monitors run smooth visual interpolations while physics calculations remain locked at 60 Hz across all platforms.

## ADR-003: Input Snapshot Pipeline
- **Context:** Direct browser event listeners (`keydown`, `keyup`) can cause stuck keys on focus loss and create non-deterministic race conditions when querying input midway through simulation ticks.
- **Decision:** `InputService` abstracts `KeyboardEvent.code` and the Gamepad API. Input is sampled into immutable `InputSnapshot` objects per simulation tick. `blur` events immediately flush active actions.
- **Consequences:** The simulation logic has no awareness of keyboard hardware or gamepad connection state, only consuming pure data snapshots.

## ADR-004: Responsive 16:9 Virtual Resolution with Canvas 2D
- **Context:** Web displays have arbitrary aspect ratios and device pixel ratios (Retina, 4K, 1080p).
- **Decision:** Base target virtual resolution is 1920x1080 with automatic aspect-preserving letterboxing/pillarboxing managed by `Viewport`. The HTML5 canvas physical buffer scales with `window.devicePixelRatio` while CSS dimensions match the container, eliminating blurry rendering and unnecessary canvas buffer resizes.
