# 17 — Decision Log and Open Questions

Status: **Decided** (in force), **Proposed** (needs confirmation), **Open**. IDs referenced across docs.

## Decisions

| ID | Topic | Decision | Reasoning | Alternatives | Consequences | Status |
|---|---|---|---|---|---|---|
| D-001 | Ownership designation | Saugat Rauniyar = designated project lead; not a statement of verified IP ownership | Brief instruction; provenance unresolved | Silent assumption of full ownership | `12` §6 tracks Qs; credits separate current/historical | Decided |
| D-002 | Engine/language | Godot 4.x (pinned at M1), GDScript | Brief default; small team fit | Unity, custom | Pin version; upgrade between milestones | Superseded by D-031 |
| D-003 | "Echo" naming | Hero = **Echo**; ability = **Veil Sight**; mechanic = **Echo Trace**; boss = **Titan Echo**; Warden = **Prime Echo** | Reduce confusion; retain source names | Rename hero | UI uses "Veil Sight", "Trace" | Decided |
| D-004 | Party model | One hero in world; unlock Ch1 Blitz+Echo, Ch2 Nova+Volt, Ch3 Grim; dormant heroes speak via Tether | Teach abilities gradually; single-player | All five from start; AI companions | Chapter design uses unlocked sets | Proposed |
| D-005 | Trace model | Recorded-transform playback with tick events; traces affect sensors, not hazards | Determinism; testability | Input replay; physics resim | Moving-platform risk; hazards ignored by traces | Decided `[PROTOTYPE]` |
| D-006 | Shifting corridors | Seam-triggered layout states; traces dissolve on change | Single-player adaptation of "players split" | Distance-based tether | Clear visual states; no dead ends | Decided |
| D-007 | Blitz ability | Dash with escalating cooldown (map.docx) over 30 s speed boost (story doc) | Fits puzzle platforming | Speed boost | `00B` CH-01/02 | Decided |
| D-008 | Cooldowns | Short cooldowns (seconds), not minutes | Puzzle pacing | "Once every few minutes" | Abilities used frequently | Decided |
| D-009 | Noise | Visual Noise Meter driven by game events; no mic | Accessibility; brief rule | Mic input | `04` §11 | Decided |
| D-010 | When Shards are found | Shards I–IV at the end of Ch1–4; Shard V in Ch5 Act 3 | Resolve source contradiction | All at Ch5 | Chapter exits tied to Shards | Decided |
| D-011 | Shards ↔ pillars | One-to-one; pillar N trial recombines chapter N's rule; Pillar V (Volt) last | Clean structure | Free mapping | `09` | Decided |
| D-012 | Hero ↔ Prime Echo | Heroes are the Final Draft's five strategies, independent after running | Fits twist | Fragments; clones | Revealed Ch4 | Decided |
| D-013 | Trace lifetime | Play once, hold TR-03, dissolve; Loop Resonator for looping | Predictable; simple | Always loop | Plate holds readable | Decided |
| D-014 | Corruptor weakness | Pylon sync with Sync Window; trace replaces second player | Preserves "dual attack" | HP bar | `03` C1 | Decided |
| D-015 | Combat model | Non-lethal Pulse + Release; bosses puzzle-resolved | Theme and scope | Lethal combat | No weapons/loot | Proposed |
| D-016 | Stormhawk | Preserved flight-record of pilot Kesh Arandor `[PROPOSAL]` | Original "old friend" retained | Generic AI | Release request found Ch2 | Proposed |
| D-017 | Titan Echo | Guardian of the Vault; reacts to noise; not born of the hero's fear | Resolve source conflict | Echo-fear monster | Fear theme still present | Decided |
| D-018 | Reflection | Division Log self-image of Prime Echo; non-lethal; approach variety | "Mirror Prime Echo" retained | Pure combat | Behavior Ledger | Decided |
| D-019 | Voidcaller | Boundary Keeper protecting Release Seals | Brief | Corrupted mind | Mid-boss framing; choice ending | Decided |
| D-020 | Pillar defense | Five pillar trials + 90 s Stability Hold (tunable) | Single-player puzzle fit | 3-min wave defense | `09` | Proposed `[PROTOTYPE]` |
| D-021 | Ending C gating | Five Witness Clauses + Protocol Assembly; chambers revisitable | Not a trivial count | Collectible total | No missable gate | Decided |
| D-022 | Slice scope | Blitz + Trace + Pulse + Sentry + Seam + Corruptor P1–P2; Echo Veil stretch | Validates fun | Include swap | `13` M5 | Decided |
| D-023 | Co-op | Deferred; no co-op dependencies | Brief | Include | `input_source` abstraction | Decided |
| D-024 | Reboot Memory | Replaced by post-MVP "New Cycle" | Scope | Replay button now | `02` §16 | Decided |
| D-025 | Health/death | 3 pips; Beacon respawn; no game over | Failure cheap | Hardcore | `02` §8 | Proposed |
| D-026 | Behavior Ledger | Local, bounded, optional, authored fallback | Privacy and fairness | Raw input recording | Toggle in Settings | Proposed |
| D-027 | Opening line | "This isn't the beginning. It's the return." reused as opening | Preserve source | Drop | Foreshadows Draft | Decided |
| D-028 | Rewards | No gold/gear/XP | Theme | Currency | Memory Fragments/Clauses | Decided |
| D-029 | Asset policy | Original or verified-license only; evidence stored | Licensing risk | Use blanket claim | `12` | Decided |
| D-030 | Units | Use BH until M2 fixes scale | Avoid arbitrary px | Fixed px now | Close at BL-006 | Decided |
| D-031 | Web platform pivot | TypeScript + Vite, static build, no game engine, browser target | Reach, instant play, zero install, complete architectural control | Godot Web export, PixiJS, Phaser | Pure TS sim; static hosting; replaces D-002 | Decided `[PROPOSAL]` |
| D-032 | Rendering backend | HTML5 Canvas 2D default; WebGL only if profiling proves necessary | Determinism, low complexity, universal compatibility | Canvas-only, WebGL-first, WebGPU | Canvas 2D adapter; WebGL gated by benchmark `[VERIFY]` | Proposed `[PROPOSAL]` |
| D-033 | Sim/Render decoupling | Pure TypeScript simulation with zero DOM/render deps; thin adapters | Determinism, headless testing, separation of concerns | Coupled game-loop / DOM nodes | Headless Vitest runs same sim as browser | Decided `[PROPOSAL]` |
| D-034 | Loop & timing | Fixed 60 Hz simulation tick with rAF accumulator; catch-up capped at 5; pause on visibilitychange | High-refresh screen consistency (120/144 Hz safe); prevent tab-switch spiral | Variable delta, unconstrained catch-up | Deterministic simulation independent of display rate | Decided `[PROPOSAL]` |
| D-035 | Simulation determinism | Integer ticks, integer fixed-point positions [PROTOTYPE], seeded PRNG; ban transcendental math in sim | JS basic arithmetic (+, -, *, /, Math.sqrt) is strictly IEEE-754 deterministic across all browser JS engines; cross-browser divergence arises from transcendental functions (Math.sin, cos, pow, exp). Integer fixed-point (power-of-two e.g. 1/256 px) provides exact bitwise golden tests | Float coords, Math.random, performance.now, unconstrained Math.sin/cos | Prototype fixed-point math with power-of-two scale; eliminate transcendental functions in sim `[PROTOTYPE]` | Decided `[PROPOSAL]` |
| D-036 | Collision & sensors | Custom deterministic AABB-vs-tilemap; sensors as AABB overlap queries | Replaces Area2D / CharacterBody2D without physics engine bloat | Matter.js, Planck.js | Pure TS collision module | Decided `[PROPOSAL]` |
| D-037 | Data & level format | Typed TS/JSON data schemas validated at load; level format JSON (Tiled candidate) | Replaces Godot `.tres` Resources | Custom binary, XML | Strict schema validation at build/runtime `[VERIFY]` | Decided `[PROPOSAL]` |
| D-038 | Trace buffers & GC | Typed arrays (Int32Array etc.), 480 ticks / 8 s trace, zero per-tick allocations, pooling | Prevent GC pauses / frame drops during Echo Trace playback | Plain JS objects allocated per frame | Pre-allocated buffers; object pooling for ghosts/VFX | Decided `[PROPOSAL]` |
| D-039 | Web input mapping | `KeyboardEvent.code` + Gamepad API via `InputService`; retain `input_source` | Browser cross-platform keyboard/gamepad; co-op readiness | Mouse-only, touch-first | Touch / mobile browsers deferred post-MVP | Decided `[PROPOSAL]` |
| D-040 | Audio architecture | Web Audio API with gain-node buses; start screen user-gesture unlock; visual pairing | Browser autoplay policy compliance; engine-free audio routing | HTML5 `<audio>` tags, Howler.js | "Press any key to begin" screen; 1:1 visual cues | Decided `[PROPOSAL]` |
| D-041 | Save storage | IndexedDB with localStorage fallback, temp-then-swap, backup slot, JSON file export/import | Browser storage eviction resilience; replaces `user://` FileAccess | LocalStorage only, cloud DB | Request persistent storage; manual backup file | Decided `[PROPOSAL]` |
| D-042 | Automated testing | Vitest headless for sim & golden determinism test; Playwright for browser smoke | Engine-free web pipeline; replaces GUT/gdUnit4 | Jest, Cypress | Fast headless unit/sim CI; browser integration | Decided `[PROPOSAL]` |
| D-043 | Web accessibility | Respect `prefers-reduced-motion` and `prefers-contrast`; retain all gameplay assist toggles | Native browser/OS integration | Custom toggles only | Auto-defaults from OS with manual overrides | Decided `[PROPOSAL]` |
| D-044 | Unanswered requests beat | Add unanswered request beats in Ch3 (3.7) and Ch4 (4.6; separated from Division Log rooms) sealed by Voidcaller | Shows restoration cost/value balance; makes Prime Echo's case real; keeps Division Log focused on R4 | Keep one-sided hurt only; place inside 4.5 | Pays off Ending B "room of unanswered requests" `[PROPOSAL]` | Proposed |
| D-045 | Prime Echo recorded fragments | Add short text fragments (≤ 25 words) from Prime Echo in each chapter (Ch1–Ch5) | Humanizes Prime Echo before Ch5 confrontation; measured, never menacing | First reveal only in Ch5 | Establishes sympathetic philosophical counterpoint `[PROPOSAL]` | Proposed |
| D-046 | In-world ledger consent & "Forget" | In-world Archive consent prompt for Ledger; "Forget" button in Settings to purge all local data | Native web theme embodiment; respect user privacy | Silent recording, no local wipe | Embodies "Release" theme in the web client `[PROPOSAL]` | Proposed |
| D-047 | Witness Link (post-MVP) | Share recorded Trace via URL hash / code for another player to replay | Web-native social feature matching "offered, never forced" (Ending C) | Real-time multiplayer, global leaderboard | Strictly opt-in; post-MVP column only `[PROPOSAL]` | Proposed |
| D-048 | Hero memory gap vignettes | Each hero's final vignette in all 3 endings references their concrete Final Draft gap | Emotional payoff for origin twist; reinforces their individuality | Generic triumph/dissolution | Narrative requirement across all three endings `[PROPOSAL]` | Proposed |

## Original contradictions explicitly resolved
| Contradiction | Resolved by |
|---|---|
| When Shards are found | D-010 |
| How Nexus pillars relate to Shards | D-011 |
| How each hero connects to Prime Echo | D-012 |
| How the final Voidcaller encounter works | D-019, `03` C5, `09` |
| Titan Echo origin | D-017 |
| Blitz ability | D-007 |

## Parked non-canon ideas (from the source expansion hooks)
Ice realm, underwater city, "digital hell", PVP arena, betrayal among the five. Not planned; revisit only after release. Witness Link (opt-in Trace sharing via URL/code) is parked in the post-MVP column (D-047).

## Open questions
| ID | Question | Needed by |
|---|---|---|
| Q-001…Q-010 | Provenance questions in `12` §6 | M1 |
| Q-011 | Confirm Stormhawk pilot name/backstory | M7 |
| Q-012 | Do we want voiced lines or text only? | M5 |
| Q-013 | Final Ending-C clause order and puzzle design | M8 |
| Q-014 | Minimum browser / hardware spec (Canvas 2D fallback baseline) | M5 |
| Q-015 | Static hosting target (GitHub Pages vs Cloudflare Pages vs itch.io HTML5) | M9 |
| Q-016 | Level format tooling choice (Tiled JSON export vs custom JSON schema) | M2 |
| Q-017 | Sim coordinate representation: integer fixed-point with power-of-two scale (e.g. 1/256 px) vs IEEE-754 float | M2 |
