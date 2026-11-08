# 10 — Technical Design Document

Web browser target (HTML5 Canvas 2D default, WebGL profile-gated), TypeScript + Vite, no third-party game engine. **Decided in D-031**. Nothing here has been built or benchmarked.

## 1. Principles
- **Strict Decoupling of Simulation & Rendering:** The core simulation (movement, collision, Trace playback, enemies, puzzles, bosses) is pure TypeScript with ZERO DOM or rendering dependencies. Headless Vitest runs the exact same sim as the browser.
- **Adapters for Browser APIs:** Rendering (Canvas 2D), Audio (Web Audio API), Input (`KeyboardEvent.code` / Gamepad API), and Storage (IndexedDB) are thin adapters around the simulation. React/preact may be used only for external overlay menus/settings, never inside the simulation loop.
- **Deterministic Fixed-Step Loop:** Fixed 60 Hz simulation tick using an accumulator loop driven by `requestAnimationFrame`. Simulation updates in discrete integer ticks. High-refresh monitors (120/144 Hz) interpolate rendering and do NOT change simulation speed.
- **Predictable Garbage Collection:** Zero allocations in per-tick loops. Fixed trace buffers (typed arrays), object pools for ghosts and particles.
- **Fail-Soft Runtime:** Invalid references or corrupt frames are caught and logged; save systems use temp-swap write patterns; audio falls back gracefully.

## 2. Repository tree
```
echoes/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  README.md
  docs/                      # this specification package
  public/
    assets/
      art/{characters,enemies,environment,ui,vfx}/
      audio/{music,sfx,ambience}/
      fonts/
    version.txt
  data/                      # Validated JSON schemas: abilities, enemies, trace, noise, rooms
  src/
    sim/                     # Pure TypeScript simulation (zero DOM/render imports)
      core/                  # FixedStepLoop, GameClock, SeededPRNG, MathFixed
      entities/              # Player, Hero, TraceGhost, Sentry, Corruptor, BossBase
      physics/               # AABB, TilemapCollision, OverlapSensors
      trace/                 # TraceRecorder, TracePlayer, TraceBuffer (Int32Array)
      puzzle/                # Plates, Switches, Seams, Doors, Resettable
      world/                 # RoomController, SeamController, NoiseBus, GravityZone
      events/                # TypedEventEmitter (sim event hub)
    render/                  # Canvas 2D renderer adapter (interpolates between sim ticks)
      canvas/                # CanvasRenderer, Camera, LayerManager, TilemapRenderer
      shaders/               # WebGL fallback shaders (if profiled necessary)
      fx/                    # Glitch, Trace outlines, ParticlePool
    audio/                   # Web Audio API adapter (GainNode buses, cue triggers)
    input/                   # InputService (KeyboardEvent.code, Gamepad API, input_source)
    storage/                 # SaveService (IndexedDB, localStorage fallback, JSON file import/export)
    ui/                      # DOM/Canvas HUD, Dialogue bubbles, Settings menu
    debug/                   # DebugOverlay (tick counter, trace buffer length, noise meter)
  tests/
    unit/                    # Pure logic tests (Vitest)
    sim/                     # Golden determinism tests (Vitest headless recorded replay)
    e2e/                     # Smoke tests (Playwright)
  tools/                     # Level validators, schema checkers, license bundler
  licenses/                  # Asset license copies and dependency notices
```

## 3. Scene organization and room transitions
- `RoomController`: Holds the room's tilemap, entity instances, and puzzle triggers; implements the **Resettable contract** (`reset_room()`, `get_state()`, `restore_state()`).
- Rooms are defined by validated JSON data files (compatible with Tiled JSON export `[VERIFY]`). Rooms never reference adjacent rooms by hardcoded dependencies; they emit `exit_requested(exit_id)`.
- `SceneRouter` (singleton service): Coordinates room loading, screen wipes/fades, and positions the player entity at the designated entrance marker.

## 4. Singleton services (Concept mapping from Autoloads)
| Service | Purpose |
|---|---|
| `EventBus` | Typed event emitter hub (`room_entered`, `trace_launched`, `noise_emitted`, `boss_phase_changed` …) |
| `GameState` | Central simulation state: current chapter, unlocked heroes, solved puzzle IDs, Witness Clauses, serialization |
| `SaveService` | IndexedDB operations, slots, autosave, versioning, migrations, JSON file export/import |
| `Settings` | Accessibility flags, audio bus gains, input bindings; persists in storage |
| `Debug` | Logger and debug metrics overlay (stripped in production Vite builds) |

## 5. Player controller and hero abilities
- `Player` entity: Driven by a pure TypeScript finite state machine (`StateMachine`) with discrete state classes: `IdleState`, `RunState`, `JumpState`, `FallState`, `DashState`, `HurtState`, `InteractState`, `AbilityActiveState`.
- `HeroData` schema: Validated configuration (speed, jump velocity, ability configuration, theme colors, voice ID).
- `AbilityBase` class: Contract for abilities (`can_activate()`, `activate()`, `tick(tickNumber)`, `cooldown_left`, `replay_event(e)`). Subclasses: `BlitzDash`, `NovaFlight`, `GrimShield`, `EchoVeil`, `VoltHack`. Uniform HUD exposure and headless testing.
- **Hero swap:** `HeroController` swaps active `HeroData` and active ability handler; cooldown timers persist on per-hero instances.

## 6. Physics and collision
- **Tilemap & AABB Collision:** Custom, deterministic Axis-Aligned Bounding Box (AABB) vs. tile grid resolution. No external physics engine (e.g. Matter.js) to guarantee deterministic simulation across all browsers and environments.
- **Layers & Bitmasks:** World, Player, OneWay, Hazard, Interactable, EnemySensor, TraceSensor, Hidden, Static.
- Hidden platforms toggle collision bitmask, not rendering visibility.
- Moving platforms: Kinematically moved by `RoomClock` (integer ticks since room start) so platform position is a pure function of tick number `[PROTOTYPE]`.

## 7. Echo Trace architecture `[PROTOTYPE]`
```
TraceRecorder (component of Player)
  - buffer: TraceBuffer (typed Int32Array for position, facing, anim, hero_id, bitmasked events)
  - start(), stop() -> TraceData, cancel()
TraceData (immutable value object): origin, duration_ticks, typed buffer, hero_id
TracePlayer (sim controller): spawn(TraceData) -> TraceGhost; manages slots, dissolve, hold
TraceGhost (sensor entity): sets position from buffer[tick]; emits replay events
```
- **Determinism design (D-034, D-035):** Record in fixed 60 Hz ticks; playback in fixed 60 Hz ticks. All event dispatches are keyed by integer tick; zero wall-clock dependencies; no floating-point accumulators. Fixed-point integer positions (`x * 1000`) prototype to eliminate any cross-browser floating-point rounding quirks `[PROTOTYPE]`.
- **Sensors:** Ghost has an AABB sensor query that triggers pressure plates; plates count both Player bodies and `TraceGhost` via a `weight_provider` interface, avoiding solid collision calculations.
- **Memory & Allocations (D-038):** 8 s × 60 ticks = 480 ticks per trace. Trace buffers are pre-allocated `Int32Array` instances. Zero garbage collection allocation during recording or playback.
- **Edge-case handling:** Hit-stop, moving platforms, gravity zones, hero swap during playback. Moving platform trace dependencies are avoided in the slice.

## 8. Puzzle and environment state
- Interactive elements implement `Resettable`: `reset()`, `snapshot()`, `restore(snapshot)`.
- `PuzzleController`: Listens to element events, checks completion conditions, emits `solved`. Persisted by ID in `GameState`.
- Dynamic corridors: `SeamController` toggles active tile groups and collision bitmasks; emits `layout_changed` (TracePlayer listens to dissolve active traces).
- Gravity zones: AABB query volumes that set an effective gravity vector on overlapping bodies; player reads `effective_gravity`.

## 9. Enemy AI and boss state machines
- Pure TS hierarchical state machines (~60-80 lines of TypeScript); no heavyweight external AI trees.
- Perception components: AABB queries, raycast line-of-sight against tilemap, `NoiseBus` subscription.
- Bosses: `BossBase` driven by `PhaseData` configuration. Boss logic computes decisions in pure `decide(tickNumber)` functions so test harnesses can drive them deterministically with mock ticks.
- `Replayer` component: Replays recorded trace paths (used by Corruptor Shade and Reflection).

## 10. Signals and reusable components
Pure TypeScript event components: `Hurtbox`, `Hitbox`, `Interactable`, `WeightSensor`, `Resettable`, `NoiseEmitter`, `Telegraph`. Components expose typed event hooks (`on`, `off`, `emit`) with narrow APIs.

## 11. Save/load, checkpoints, and browser storage
- **IndexedDB with localStorage fallback (D-041):** Asynchronous transaction storage; uses a temp-then-swap key pattern (`slot_N_temp` -> commit -> `slot_N`) to prevent corruption during tab closure.
- **Backup slot:** Each slot maintains an automatic `.bak` copy of the previous checkpoint.
- **Storage eviction defense:** Calls `navigator.storage.persist()` on supported browsers; provides manual **Export Save** and **Import Save** buttons in Settings to download/upload JSON save files (`echoes_save_slot_N.json`).
- **"Forget" & Privacy (D-046):** Dedicated Settings button to wipe all IndexedDB/localStorage records and Behavior Ledger data.
- **Checkpoints:** Beacons trigger `SaveService.autosave()`; reload restores Integrity and resets room via `RoomController.reset_room()`.

## 12. Input abstraction (D-039)
- `InputService` abstracts browser `KeyboardEvent.code` (layout-independent physical keys) and the standard Gamepad API.
- Supports configurable hold/toggle behavior and input buffering (0.10 s jump buffer).
- Future co-op support: All inputs route through an `input_source` ID (e.g. `keyboard_0`, `gamepad_0`).

## 13. Audio and VFX
- **Web Audio API (D-040):** A single master `AudioContext` with gain-node buses: Master, Music, SFX, Ambience, UI.
- **Autoplay compliance:** Browser blocks audio until user interaction. The game displays an initial "Press any key to begin" screen which resumes the `AudioContext`.
- **Music cross-fading:** Layered audio tracks cross-fade by adjusting gain nodes according to gameplay tension state.
- **Canvas 2D / VFX:** Outline passes, glitch effects, fog particles, and scanlines rendered on Canvas 2D (or optional post-processing shader canvas). Respects `Settings.reduced_effects` and `prefers-reduced-motion`.

## 14. UI architecture
- HUD and dialogue rendered via lightweight Canvas overlays (or decoupled HTML overlay for high-DPI text).
- HUD listens to `EventBus` signals, never polls simulation entities.
- Settings menu built with clean HTML/CSS or canvas widgets with full keyboard/gamepad navigation.

## 15. Logging and debug tools
- `Debug.log(category, msg)`; categories: `trace`, `input`, `puzzle`, `ai`, `save`.
- Debug overlay (toggle with `F3` or backtick): Displays current tick, trace buffer usage, active entities, noise level, memory estimate.
- Tree-shaken out of release Vite builds via conditional compilation flags (`import.meta.env.DEV`).

## 16. Performance and frame budget `[VERIFY]`
- Target: Solid 60 Hz simulation and 60 FPS rendering on modern standard web browsers (Chrome, Edge, Firefox, Safari) at 1080p canvas resolution.
- Frame budget: 16.67 ms per frame. Simulation allocation target: < 4 ms; rendering target: < 8 ms; headroom: > 4 ms.
- Zero allocations in inner loops to prevent garbage collection frame drops. Object pooling for ghosts, particles, and temporary math vectors.
- Profile with Chrome DevTools Performance panel and Safari Web Inspector at each milestone.

## 17. Error handling
- Fail-soft architecture: Entity errors or invalid references log warnings and skip execution rather than crashing the loop.
- Corrupted trace events emit a "broken echo" cue and skip without interrupting playback.
- If storage operations fail (quota or disabled cookies), notify player and offer manual JSON export.

## 18. Testing strategy (D-042)
- **Vitest Unit Tests:** Headless unit tests for sim math, state machines, trace buffers, noise decay, and save schema migrations.
- **Golden Determinism Test:** Scripted inputs replayed 100 times in headless Vitest; asserts zero-tick position drift.
- **Playwright E2E Tests:** Headless browser smoke tests validating canvas initialization, user gesture audio unlock, room transition, and save/load roundtrips across Chromium, WebKit (Safari), and Firefox.

## 19. Build, export, and distribution
- **Vite static build:** Produces minified, optimized JS/CSS bundles (`dist/`) suitable for static hosting (GitHub Pages, Cloudflare Pages, itch.io HTML5) `[PROPOSAL]`.
- Optional PWA manifest and service worker for complete offline caching and playability.
- Automated build script embeds `version.txt` and packages open-source third-party license notices.

## 20. Technical risks and web mitigations
| # | Risk | Impact | Mitigation |
|---|---|---|---|
| T1 | Trace determinism | Replays drift across machines | Integer ticks; fixed-point positions; no float accumulators; Vitest golden tests |
| T2 | Moving platforms | Platform phase desync with Trace | `RoomClock` integer ticks from room start; avoid moving platforms in slice |
| T3 | Collision edge cases | Tunneling or stuck states | Discrete AABB sweep with conservative step; sensor-only ghost queries |
| T4 | Gravity zones | Sim differences in inverted gravity | Discrete integer gravity modifiers; recorded paths store absolute world coords |
| T5 | Hero swap state | Ability timer desync during replay | Independent ability timer instances per hero; events stamped with `hero_id` |
| T6 | Reflection ledger fairness | Behavior ledger prediction desync | Bounded counter array + authored deterministic fallback; in-world consent |
| T7 | Save corruption | Browser crash mid-write | IndexedDB transaction safety, temp-then-swap pattern, backup slot, JSON export |
| T8 | Tab background throttling | rAF halts when tab hidden | Listen to `visibilitychange`; pause sim when hidden; cap catch-up ticks to 5 |
| T9 | Audio autoplay policy | Browser silences audio on start | "Press any key to begin" user-gesture gate before unlocking `AudioContext` |
| T10 | Browser storage eviction | Browser purges IndexedDB under space pressure | Request `storage.persist()`; prominent Export/Import save file feature |
| T11 | GC hitching / frame drops | Periodic GC pauses break 60 FPS | Pre-allocated typed arrays (Int32Array); pool ghosts, VFX, and vector math |
| T12 | Cross-browser float quirks | Safari vs V8 float precision differences | Prototype integer fixed-point sim positions; eliminate Math.sin/cos in sim |
