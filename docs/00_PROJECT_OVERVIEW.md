# 00 — Project Overview

**Game:** ECHOES: THE THINGS WE CHOSE TO FORGET · **Status:** Pre-production (revival of an abandoned concept)
**Project owner / creative director (designated):** Saugat Rauniyar · See `00B_CANONICAL_SPEC.md` for terms and parameters.

## 1. One-sentence pitch
A 2D puzzle-platformer where you record your own past actions as a ghost and use them to solve puzzles in a dream-realm made of forgotten memories, then decide whether every memory deserves to come back.

## 2. Elevator pitch
In the Echo Realm, regret becomes desert, broken promises become bridges, and fear rearranges architecture. Five awakened beings (Blitz, Nova, Grim, Echo, Volt) travel through five broken regions to recover the Neural Shards of Prime Echo, the Archive's Warden. Their signature tool is **Echo Trace**: record a few seconds of play, then watch a translucent copy of yourself hold switches, bait enemies, and trigger machines while the real you acts elsewhere. As the mystery unfolds, the heroes learn that restoring everything may mean erasing what others chose to leave behind, and that they themselves are not simply parts waiting to be reunited.

## 3. Genre and audience
- **Genre:** 2D side-scrolling puzzle-platformer with atmospheric exploration and selective action.
- **Audience:** Players who enjoy reasoning-driven platformers and narrative mystery told through environments; comfortable with moderate platforming; not primarily seeking combat. `[PROPOSAL]`
- **Session shape:** 10–20 minute chunks; chapters designed to be completed in 1–2 sittings. `[PROPOSAL]`

## 4. Core player fantasy
*"I can reach into the past and use it."* The player feels clever when a plan assembled from timing, geometry, and character abilities works. They feel haunted and curious when the past they interact with turns out to belong to someone.

## 5. Platform and engine
Web (browser), TypeScript + Vite, HTML5 Canvas 2D (WebGL profile-gated if necessary), no third-party game engine. Offline single-player, static build, keyboard and controller via Gamepad API. See `10_TECHNICAL_DESIGN.md` and D-031.

## 6. Goals and non-goals

| Goals | Non-goals (for now) |
|---|---|
| A polished 10–15 min Chapter 1 vertical slice that proves Echo Trace is fun | Online multiplayer or required co-op |
| A coherent five-chapter mystery with three honest endings | Open world; procedural generation |
| Puzzles solved by reasoning, with recoverable failure | Large combat system, loot, currency, character leveling |
| Accessible: no microphone, remappable, assist options, prefers-reduced-motion/contrast | Mobile browsers / touch controls (post-release evaluation) |
| Clear provenance and licensing for every asset | Shipping before assets and ownership are verified |

## 7. Unique selling points
1. **Echo Trace:** the past is something you *operate*, not just read.
2. **Theme in mechanics:** release, restoration, and consent appear as rules (Release, Witness Protocol, Behavior Ledger).
3. **Antagonist with a case:** neither Prime Echo nor the Voidcaller is simply right.
4. **Five heroes as five problem-solving verbs**, combined through trace-swapping (record as one hero, act as another).
5. **Endings earned by reasoning**, not collectible counts.

## 8. Development philosophy
- Validate fun before building content: the slice precedes everything.
- Every mechanic must teach, test, or combine a rule.
- Design for small, testable systems; no framework without a stated purpose.
- Never let narrative ambiguity become mechanical ambiguity.
- Track provenance and licenses from day one.
- Assume one developer unless stated otherwise.

## 9. Current ownership designation
Saugat Rauniyar is the **designated present-day project lead and creative director**. Prem Soni and Mohammad Zaid are not active team members and are not assigned roles. This designation is an operational decision, **not** a verified statement of intellectual-property ownership. Historical credits exist in the source files; unresolved questions are tracked in `12_ASSET_PROVENANCE_AND_LICENSES.md` §6 and `17_DECISION_LOG.md`. This package is not legal advice; consult a qualified professional before commercial release.

## 10. Biggest risks
| Risk | Why it matters |
|---|---|
| Echo Trace determinism and interaction edge cases | The whole game rests on it (R-03) |
| Scope creep from five characters × five chapters | Solo capacity (R-01) |
| Puzzles unclear or unfair | Reasoning game fails if solutions feel arbitrary (R-05) |
| Asset licensing and provenance gaps | Release blocker (R-07, R-08) |
| Over-designing before a playable prototype | Documents ≠ game (R-10) |

Full list: `16_RISK_REGISTER.md`.

## 11. Decisions required before implementation

| # | Decision | Where |
|---|---|---|
| 1 | Configure web stack (TS + Vite); create repo | D-031, BL-001 |
| 2 | Confirm Echo Trace as recorded-transform playback (not input replay) | D-005 |
| 3 | Confirm art scale/camera via a movement prototype (BH → real units) | D-030 |
| 4 | Confirm slice scope (Blitz + Trace + Corruptor prototype) | D-022 |
| 5 | Resolve provenance questions about historical contributions | Q-001–Q-004 |
| 6 | Choose art/music sourcing (original vs licensed) | D-029 |

## 12. Document map
See root `README.md`.
