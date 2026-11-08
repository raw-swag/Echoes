# 15 — Quality Assurance and Test Plan

No tests have been run and no benchmarks exist. Performance numbers below are **targets with assumptions**, not results. Test IDs: `T-<area>-n`.

## 1. Approach
- **Automated Testing:** Vitest for headless unit tests (simulation math, finite state machines, noise decay) and the deterministic golden test suite; Playwright for multi-browser end-to-end smoke tests (canvas init, audio gesture unlock, IndexedDB save/load).
- **Manual Testing:** Feel, readability, fairness, and controller responsiveness. Playtests scheduled at Gate A, Gate B, and Gate C (`13`). Every discovered bug is logged using the template in §14.

## 2. Browser compatibility matrix `[VERIFY]`
All tests must execute against the latest two major releases of each target browser:
- **Google Chrome** (V8, Blink)
- **Microsoft Edge** (V8, Blink)
- **Mozilla Firefox** (Gecko, SpiderMonkey)
- **Apple Safari** (WebKit, JavaScriptCore on macOS / iOS desktop-mode)

Key browser verification targets:
1. AudioContext unlock on initial user gesture (pointer/key event).
2. Canvas 2D frame stability and crisp pixel rendering without blur on high-DPI displays.
3. IndexedDB persistence across sessions without silent data purge.
4. Gamepad API standard mapping across different browser implementations.

## 2. Gameplay tests
| ID | Test | Expected |
|---|---|---|
| T-GP-1 | Complete rooms 1.1–1.6 without hints | Completable; times logged |
| T-GP-2 | Each room's intended solution (per `04` §16) | Solves |
| T-GP-3 | Each room's reset | Returns to authored state <3 s |
| T-GP-4 | Fairness checklist PF-1…PF-10 per room | All pass |
| T-GP-5 | New tester observation (no instructions) | Goal understood in < 30 s |

## 3. Physics and collision tests
| ID | Test | Expected |
|---|---|---|
| T-PH-1 | Same scripted input twice → same position per tick | Identical |
| T-PH-2 | Jump apex, coyote, buffer values | Within ±5% of config |
| T-PH-3 | Dash into wall/ledge/one-way | No tunneling |
| T-PH-4 | Moving platform carry | Player stays on platform; no jitter |
| T-PH-5 | Framerate independence (simulate 30/60/144 render) | Same result (physics fixed 60 Hz) |

## 5. Echo Trace determinism tests
| ID | Test | Expected |
|---|---|---|
| T-TR-1 | Golden run: record scripted inputs, replay 100× in Vitest | Zero tick deviation across all recorded ticks |
| T-TR-2 | Trace length = TR-01; stops automatically | Yes |
| T-TR-3 | Short (<0.5 s) recording | Discarded with cue |
| T-TR-4 | Cancel (hold) | Nothing spawned; no cooldown |
| T-TR-5 | Slot replacement (2 slots) | Oldest replaced |
| T-TR-6 | Hold then dissolve timings | TR-03/TR-06 |
| T-TR-7 | Record while on moving platform `[PROTOTYPE]` | Documented behavior |
| T-TR-8 | Cross-browser determinism verification | Compare hash of state array across Chromium, WebKit, and Gecko |

## 5. Puzzle reset and fail-state tests (edge cases)
| ID | Case | Expected |
|---|---|---|
| T-PZ-1 | Trace dissolves while player stands on plate it was holding | Plate releases; warning cue; no soft-lock |
| T-PZ-2 | Hero swap during replay | Trace continues with recorded hero abilities |
| T-PZ-3 | Player dies during boss phase | Respawn at boss Beacon; phase reset; no stuck state |
| T-PZ-4 | Puzzle becomes unsolvable after reset | Never; reset restores authored state (automated solve-after-reset test) |
| T-PZ-5 | Trace launched when target invalid | Event skipped, "broken echo" cue |
| T-PZ-6 | Seam crossing with live trace | Trace dissolves; layout toggles |
| T-PZ-7 | Replay overlapping player on switch | Weight sums correctly |
| T-PZ-8 | Quit mid-puzzle then continue | Puzzle state restored per spec (reset to room start) |

## 6. Character ability tests
Per ability: duration, cooldown, limits, interaction with Static Fields, replay behavior (AC lists in `03`). Examples: T-AB-1 dash cooldown escalation and reset; T-AB-2 flight energy; T-AB-3 shield noise suppression; T-AB-4 veil reveal radius; T-AB-5 hack target validity.

## 7. Boss behavior tests
| ID | Test |
|---|---|
| T-BS-1 | Scripted boss run: each state reachable; transitions follow `03` |
| T-BS-2 | Corruptor Shade path equals recorded path |
| T-BS-3 | Sync Window passes with trace strike and manual strike |
| T-BS-4 | Telegraph ≥ 0.5 s for all attacks |
| T-BS-5 | No unavoidable damage (frame-step audit) |
| T-BS-6 | Reflection default script deterministic with a fixed ledger |

## 8. Save/load and browser storage tests
Round-trip all fields in IndexedDB; fallback to localStorage if IndexedDB blocked; corrupt file → backup → new game flow; version migration test; save during boss prohibited (Beacon-only); three slots independent; manual JSON file Export and Import verification; "Forget" wipes all storage completely.

## 9. Checkpoint tests
Respawn state (Integrity, room reset), Beacon between boss phases, Beacon placement ≤ 60 s of progress.

## 10. Accessibility tests
Remapping all actions; hold/toggle; colorblind palettes (simulated); reduced glitch/flash (no >3 flashes/s); subtitles; independent audio sliders; Assist presets (Sync Window, trace length, noise sensitivity); no mic dependency; automatic query response to `prefers-reduced-motion` and `prefers-contrast`.

## 11. Performance and web runtime targets (assumptions)
- Stable 60 FPS Canvas 2D render with 60 Hz simulation tick on target desktop browsers.
- Frame spikes: investigate any frame time > 16.67 ms (simulation budget < 4 ms, render budget < 8 ms).
- Zero per-frame memory allocation in simulation loop (zero GC hitching during Trace playback).
- Background tab switching: verify `visibilitychange` listener pauses simulation and does not produce a catch-up tick storm when returning.
- Load between rooms: target < 1 s in browser.
Record actual measurements per milestone in `docs/perf/`.

## 12. Regression testing
Run the automated Vitest suite on every commit/merge; run the Playwright browser smoke tests; run the T-TR golden test and slice acceptance checklist before every milestone exit; keep a "known fixed bugs" list with a test per bug.

## 13. Chapter 1 vertical slice acceptance tests

| # | Criterion | Pass condition |
|---|---|---|
| S-1 | Movement and jumping feel | 5/5 testers rate "responsive" (≥ 4/5) |
| S-2 | Blitz dash | Gap + pulse trap crossable; cooldown escalates |
| S-3 | Echo Trace | Records, launches, holds plate; determinism test green |
| S-4 | Complete environmental puzzle | Room 1.3 and 1.5 solvable unaided by ≥ 4/5 testers |
| S-5 | Enemy interaction | Sentry baited, stunned, released |
| S-6 | Boss prototype | Corruptor P1–P2 beatable in ≤ 3 min median |
| S-7 | Checkpoints and recovery | Death restores correctly; ≤ 60 s lost |
| S-8 | Progression | 1.1 → 1.6 with autosave |
| S-9 | Visual/audio sample | Representative palette, parallax, 1 ambient + 1 boss cue |
| S-10 | Length | 10–15 min median `[VERIFY]` |
| S-11 | Accessibility baseline | Remap + hold/toggle + reduced effects + system media queries |
| S-12 | Web performance | Sustained 60 FPS without GC frame drops on baseline browser |

## 14. Bug report template
```
Title:
Build/version + commit:
Browser + OS version (e.g. Chrome 124 / macOS 14.4):
Platform + input device:
Steps to reproduce (numbered, exact):
Expected:
Actual:
Reproduction rate (x/10):
Room ID / chapter / Beacon:
Hero + cooldown state:
Trace state (slots, hold timers):
Attachments (screen recording, exported save JSON, browser console log):
Severity: Blocker / Major / Minor / Cosmetic
```
