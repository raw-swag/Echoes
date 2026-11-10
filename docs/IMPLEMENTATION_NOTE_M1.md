# ECHOES: Implementation Note — Phase 1 Foundation

## 1. Existing Repository Structure
- **Current State:** The repository contains comprehensive specifications and documentation in `docs/` (`00A` through `17_DECISION_LOG.md`) and a high-level `README.md`.
- **Branching:** Work is established on `feat/phase-1-foundation`.
- **Precedence:** `docs/00B_CANONICAL_SPEC.md` followed by `docs/17_DECISION_LOG.md` (specifically D-031 through D-043 regarding the web pivot from Godot to TypeScript + Canvas 2D + Vite).

## 2. Important Architectural Constraints
- **Simulation Isolation (`src/sim/`):** Pure deterministic TypeScript. Zero imports from browser/DOM APIs (`window`, `document`, Canvas, Web Audio, etc.). Headless testability via Vitest.
- **Fixed-Step Loop:** Exactly 60 Hz simulation ticks ($dt = 1/60$ s $\approx 16.6667$ ms). Driven by `requestAnimationFrame` using an accumulator with a hard cap of 5 catch-up ticks per frame. Large frame deltas (e.g. background tab return or tab pause) are clamped/sanitized to prevent spiral of death.
- **Interpolation:** Rendering consumes previous and current simulation states with an interpolation alpha factor $\alpha \in [0, 1)$ without affecting simulation state.
- **Input Boundaries:** Browser inputs (`KeyboardEvent.code` and Gamepad API) are captured by `InputService` in `src/input/` and mapped to pure input snapshots with an `input_source` identifier. Simulation only consumes input snapshots.
- **Renderer Adapter (`src/renderer/`):** HTML5 Canvas 2D default with device pixel ratio scaling, clean lifecycle, and restrained ethereal visual tone.
- **Dependency Boundaries:** Pure simulation must never depend on rendering or DOM. We will enforce this with an automated architectural test.

## 3. Planned Project Structure
```text
echoes/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  eslint.config.js
  .prettierrc
  src/
    core/             # App initialization, main game loop orchestration, lifecycle
      FixedStepLoop.ts
      Clock.ts
      GameApp.ts
    sim/              # Pure deterministic simulation (ZERO DOM/Canvas imports)
      Simulation.ts
      SimulationState.ts
      InputSnapshot.ts
    renderer/         # Canvas 2D rendering adapter
      CanvasRenderer.ts
      DebugOverlay.ts
      Viewport.ts
    input/            # Input management (KeyboardEvent.code, Gamepad API)
      InputService.ts
      InputActions.ts
    scenes/           # Scene abstractions
    assets/           # Asset loading infrastructure
    ui/               # UI overlays
  tests/
    core/             # Loop & clock tests
    sim/              # Deterministic simulation tests
    input/            # Input service tests
    architecture/     # Dependency boundary checks (ensures src/sim has 0 DOM/Canvas refs)
```

## 4. Identified Decisions & Clarifications
- **Directory naming in docs:** `docs/10_TECHNICAL_DESIGN.md` uses `src/render/` whereas the user prompt specifies `src/renderer/`. We adopt `src/renderer/` and provide compatible path aliases (`@sim`, `@renderer`, `@input`, `@core`).
- **Coordinate representation (Q-017):** For M1 foundation, the loop and clock advance discrete integer simulation ticks. Spatial coordinates in future physics will use deterministic integer fixed-point math.
- **No Gameplay Mechanics in M1:** As specified, M1 establishes the fixed-step loop, deterministic simulation shell, input snapshot abstraction, and Canvas 2D renderer with debug HUD. Player movement, collision, Echo Trace, enemies, and puzzles will be built in subsequent milestones.
