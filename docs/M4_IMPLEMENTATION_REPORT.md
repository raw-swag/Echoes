# ECHOES — Milestone 4 (M4) Implementation Report: First Fully Playable Game

**Milestone:** M4 — First Fully Playable Game  
**Branch:** `feat/m4-first-playable-game`  
**Base:** `feat/m3-echo-trace` (`3d5a9cf`)  
**Date:** 2026-11-10  
**Engine:** TypeScript + Vite + HTML5 Canvas 2D + Vitest (No Phaser, Pixi, Matter.js, or Box2D)  

---

## 1. Executive Summary

Milestone 4 transitions **ECHOES: THE THINGS WE CHOSE TO FORGET** from a set of isolated technical demonstrations into an authentic, unified, browser-native 2D puzzle-platformer. A human player can now open the web application or mobile PWA, begin at the prologue, launch the living memory simulation, traverse a complete 80-column level ("The Threshold of Ash & Salt"), collect 4 Memory Shards, activate the Sanctuary Beacon checkpoint, survive lethal hazards with 3-pip Integrity, solve the Pressure Gallery puzzle via deterministic Echo Trace, and cross the Nexus Arch to complete the recollection.

---

## 2. Systems Implemented & Key Architectural Decisions

### 2.1 Complete Connected Level 1 (`src/sim/world/Chapter1Level.ts`)
- **Dimensions:** 80 columns x 25 rows (2560 x 800 px at 32px per tile).
- **Five Seamless Coherent Zones:**
  1. **Zone 1 (Cols 1–18):** Starting Pedestal ($x = 120, y = 550$), stepped elevation practice ledges, and first collectible Memory Shard (Col 14, Row 16).
  2. **Zone 2 (Cols 19–32):** Hazard spike beds and multi-tier platforms with drop-through one-way bridges (`Down + Jump`). Second Memory Shard tucked on an upper observation perch (Col 26, Row 13).
  3. **Zone 3 (Cols 33–40):** Central Sanctuary Beacon Checkpoint ($x = 1152, y = 544$).
  4. **Zone 4 (Cols 41–65):** The Canonical Pressure Gallery Puzzle Chamber. Pressure plate at Col 48 ($x = 1536$), Echo Door at Col 64 ($x = 2048$, 16 Body Heights separation). Third Memory Shard located on an upper observation canopy (Col 54, Row 14).
  5. **Zone 5 (Cols 66–78):** Exit Chamber, Fourth Memory Shard (Col 69, Row 16), and the Nexus Arch completion gateway (Col 73, $x = 2336, y = 512$).

### 2.2 Integrity & Survival System (`src/sim/Simulation.ts`)
- **Pips (SV-01):** Player starts with 3 Integrity pips.
- **Damage & Invulnerability Window (SV-02):** Hazard collisions subtract 1 Integrity pip and grant a 90-tick (1.5 s) invulnerability window, preventing duplicate damage on a single contact.
- **Pit Fall Recovery (SV-02):** Falling into lower world pits subtracts 1 Integrity and safely teleports the player back to the active checkpoint ledge.
- **Fatal Death & Respawn (D-025):** When Integrity reaches 0, the active Echo Trace is cleaned up, transient room puzzles (plate & door) reset, and the player respawns at the active Beacon with full Integrity restored.

### 2.3 Functional Beacon Checkpoint System (`src/sim/world/BeaconEntity.ts`)
- Active proximity detection: Walking near the Beacon activates it, establishes the new level respawn coordinate ($x = 1152, y = 550$), fully restores Integrity, triggers the renewal sound effect, and triggers an autosave.

### 2.4 Functional Memory Shard Collection (`src/sim/world/MemoryShardEntity.ts`)
- 4 Memory Shards distributed at intentional exploration checkpoints throughout the level.
- Player collision collects the shard, disappears from the active world, awards 25 Remnants, plays a resonant harmonic chime, and immediately updates the HUD counter (`0 / 4` $\rightarrow$ `4 / 4`).
- Shards cannot be repeatedly collected and survive checkpoint respawns.

### 2.5 Diegetic Sound Effects Synthesizer (`src/audio/SoundService.ts`)
- Zero external MP3/WAV dependencies; uses browser native Web Audio API oscillators and gain nodes.
- Synthesizes:
  - Jump blip (triangle wave frequency sweep $280\rightarrow 480\text{ Hz}$).
  - Shard collect (resonant dual harmonic bells $659.25\text{ Hz}$ and $987.77\text{ Hz}$).
  - Beacon activation (deep harmonic chord $220/330/440\text{ Hz}$).
  - Echo Trace recording tick ($440/660\text{ Hz}$) and launch resonance ($330\rightarrow 550\text{ Hz}$).
  - Pressure plate mechanical click ($160\rightarrow 80\text{ Hz}$) and door opening hydraulic hum.
  - Damage impact thud, death dissolve sweep, and level complete progression.
- Graceful fail-soft handling and mute support.

### 2.6 Persistence Service (`src/storage/PersistenceService.ts`)
- Saves versioned JSON snapshot to `localStorage` (with headless in-memory fallback) storing: active checkpoint ID, respawn coordinates, collected shard IDs, integrity, remnants, and level completion status.

### 2.7 Official HUD & Menu Lifecycle Integration
- **Web & Mobile HUD:** Real simulation state synchronization—no fake timers or mock values.
- Real Integrity diamond indicators (3 pips).
- Live Shard collection counter (`0 / 4`).
- Real simulation-driven Echo Ring and lifecycle status badge (`IDLE`, `RECORDING`, `PLAYBACK`, `HOLDING`, `DISSOLVING`, `COOLDOWN`).
- Real-time level completion modal with "Replay Recollection" button.
- Global event listener (`echoes:restart-level`) wired for seamless level restarts without reloading the browser.

---

## 3. Files Created & Modified

### Created:
- `src/sim/world/Chapter1Level.ts` — 80-column connected first playable level tilemap.
- `src/sim/world/BeaconEntity.ts` — Checkpoint entity with deterministic proximity activation.
- `src/sim/world/MemoryShardEntity.ts` — Shard collectible entity with single-collection guarantee.
- `src/sim/world/ExitGatewayEntity.ts` — Level completion exit archway entity.
- `src/audio/SoundService.ts` — Zero-dependency Web Audio API sound synthesizer.
- `src/storage/PersistenceService.ts` — Canonical progression persistence service.
- `tests/sim/PlayableLevelIntegration.test.ts` — Comprehensive test suite for Integrity, Beacons, Shards, and Exit.
- `docs/M4_IMPLEMENTATION_REPORT.md` — This report.
- `docs/M4_PLAYTEST_REPORT.md` — Detailed test and playtest validation breakdown.

### Modified:
- `src/sim/Simulation.ts` — Integrated Chapter 1 Level, Integrity, Shards, Beacon, Exit Gateway, and event callbacks.
- `src/sim/SimulationState.ts` — Expanded snapshot schema to include Beacons, Shards, Integrity, and Completion state.
- `src/renderer/CanvasRenderer.ts` — Added rendering for Beacons, floating Memory Shards, Nexus Arch, and expanded camera world bounds to 2560 px.
- `src/core/GameState.ts` — Added live properties for Integrity, collected shards, and level completion state.
- `src/core/GameApp.ts` — Wired simulation audio events, persistence saves, and level restart pipeline.
- `src/main.ts` — Registered global level restart event listener.
- `src/ui/screens/web/WebHUDScreen.ts` — Rendered live shard counter, updated controls bar, and added completion modal.
- `src/ui/screens/mobile/MobileHUDScreen.ts` — Rendered live shard counter, updated touch HUD, and added completion modal.
- `tests/sim/EchoTrace.test.ts` — Updated test coordinates for Chapter 1 level dimensions.
- `tests/sim/PressureGalleryE2E.test.ts` — Updated puzzle test coordinates for Chapter 1 level dimensions.

---

## 4. Verification & Quality Gates

- **Unit & Integration Tests:**
  - `npm test`: **10 test files passed, 45 / 45 tests passed (100%)**
  - Architecture boundary test: **PASS** (Zero DOM imports in `src/sim/`)
  - Golden Determinism test: **PASS** (50+ replays, 0.000000 px drift, 0 buffer mutations)
  - Playable Level Integration test: **PASS** (7 / 7 tests passed)
  - Pressure Gallery E2E test: **PASS**
- **Type Checking:**
  - `npm run typecheck`: **0 errors** (`tsc --noEmit`)
- **Linting:**
  - `npm run lint`: **0 warnings, 0 errors** (`eslint . --ext .ts`)
- **Production Build:**
  - `npm run build`: **PASS** (`tsc && vite build`, 117.86 kB bundle)
- **Formatting:**
  - `npm run format`: **Clean** (`prettier --write`)
