# ECHOES: The Things We Chose to Forget

> *“A memory is not yours just because you can restore it.”*

**ECHOES** is a premium-quality, browser-native 2D puzzle-platformer exploring memory, loss, and the ethics of restoration. Built in TypeScript with a custom deterministic simulation core and HTML5 Canvas 2D.

---

## Architecture Principles

- **Zero Third-Party Game Engines:** No Phaser, PixiJS, Matter.js, Box2D, or Godot runtime. Lightweight static web application.
- **Pure Simulation Boundary (`src/sim/`):** The simulation is 100% pure TypeScript with zero DOM or rendering dependencies, enabling headless deterministic testing.
- **Deterministic 60 Hz Fixed-Step Loop (`src/core/FixedStepLoop.ts`):** Simulation advances strictly in 60 Hz fixed steps ($dt = 1/60$ s) with accumulator-based sub-stepping capped at 5 iterations to prevent spiral-of-death.
- **State Interpolation:** Visual rendering interpolates between previous and current simulation states ($\alpha \in [0, 1)$) for buttery smoothness across standard and high-refresh (120/144 Hz) displays.
- **Input Snapshots (`src/input/InputService.ts`):** Hardware events (`KeyboardEvent.code` & Gamepad API) are converted into immutable input snapshots sampled at tick boundaries.

---

## Directory Structure

```text
echoes/
  docs/                     # Master design and technical specifications
  src/
    core/                   # App lifecycle, FixedStepLoop, Clock schedulers
    sim/                    # Pure deterministic simulation (ZERO DOM/Canvas imports)
    renderer/               # Canvas 2D renderer, Viewport scaling, Debug overlay
    input/                  # InputService, KeyboardEvent.code & Gamepad mappings
    scenes/                 # Scene state interfaces (for future chapter scenes)
    assets/                 # Asset loader interfaces
    ui/                     # UI overlay interfaces
  tests/
    architecture/           # Automated boundary validation (zero DOM imports in sim)
    core/                   # FixedStepLoop timing and catch-up tests
    sim/                    # Deterministic simulation tests
    input/                  # InputService mapping and blur reset tests
```

---

## Getting Started

### Prerequisites
- Node.js (v20+ or v22+)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts the local Vite dev server at `http://localhost:3000`.

### Building for Production
```bash
npm run build
```
Generates production-ready static assets in `dist/`.

### Running Tests
```bash
npm run test
```
Runs headless Vitest unit, simulation, and architectural boundary tests.

### Code Quality & Formatting
```bash
npm run typecheck    # Strict TypeScript checks
npm run lint         # ESLint check
npm run format       # Prettier formatting
```

---

## Default Controls

| Action | Keyboard (`code`) | Gamepad (Standard API) |
|---|---|---|
| Move Left / Right | `KeyA` / `KeyD` or `ArrowLeft` / `ArrowRight` | Left Stick / D-Pad |
| Jump | `Space` | Button 0 (A / Cross) |
| Ability (Active Hero) | `ShiftLeft` | Button 1 (B / Circle) |
| Pulse | `KeyJ` | Button 2 (X / Square) |
| Interact | `KeyF` | Button 3 (Y / Triangle) |
| Echo Trace | `KeyE` | Right Trigger (Button 7) |
| Pause / Resume | `Escape` | Start (Button 9) |
| Toggle Diagnostics | `F3` or `` ` `` (Backtick) | — |
