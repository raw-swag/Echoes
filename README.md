# ECHOES: THE THINGS WE CHOSE TO FORGET

An original 2D puzzle-platformer built for the **Web (browser)** with TypeScript and Vite, without a heavy game engine. Revival and pre-production of a previously abandoned concept. **Platform:** Web (browser), TypeScript. **Designated project lead / creative director:** Saugat Rauniyar (an operational designation, not a verified statement of IP ownership; see `docs/12_ASSET_PROVENANCE_AND_LICENSES.md` §6).

**Pitch:** record your own past as a ghost, use it to solve puzzles in a dream-realm of forgotten memories, then decide whether every memory deserves to come back.

## Status
Documentation phase. No production code yet. Nothing in `/docs` has been playtested, benchmarked, or legally reviewed.

## Documentation index
| File | Contents |
|---|---|
| `docs/00A_SOURCE_AUDIT.md` | What was kept/refined/replaced from the three source files |
| `docs/00B_CANONICAL_SPEC.md` | Glossary, mappings, parameters; wins over other docs |
| `docs/00_PROJECT_OVERVIEW.md` | Pitch, goals, risks |
| `docs/01_NARRATIVE_BIBLE.md` | World, characters, endings, continuity |
| `docs/02_GAME_DESIGN_DOCUMENT.md` | Systems, controls, MVP scope |
| `docs/03_CHARACTER_ENEMY_BOSS_BIBLE.md` | Heroes, enemies, bosses with acceptance criteria |
| `docs/04_MECHANICS_AND_PUZZLES.md` | Exact mechanic rules, fairness rules |
| `docs/05`–`09` | Chapter design documents |
| `docs/10_TECHNICAL_DESIGN.md` | Web architecture (TS + Vite, Canvas 2D, Web Audio, IndexedDB) |
| `docs/11_ART_UI_AUDIO_BIBLE.md` | Visual/audio direction, slice asset list |
| `docs/12_ASSET_PROVENANCE_AND_LICENSES.md` | Licensing register and provenance checklist |
| `docs/13_PRODUCTION_ROADMAP.md` | Milestones and effort |
| `docs/14_DEVELOPMENT_BACKLOG.md` | Tasks BL-001 onward |
| `docs/15_QA_AND_TEST_PLAN.md` | Tests and slice acceptance |
| `docs/16_RISK_REGISTER.md` | Risks and mitigations |
| `docs/17_DECISION_LOG.md` | Decisions D-001…, open questions |

## How decisions are tracked
Every change to canon or design goes into `docs/17_DECISION_LOG.md` with an ID, reasoning, alternatives, and consequences. If any doc conflicts with `00B`, fix the doc.

## Tags
`[SOURCE]`, `[CANON]`, `[PROVEN-PATTERN]`, `[PROPOSAL]`, `[PROTOTYPE]`, `[VERIFY]` (defined in `00B` §1).

## Start with
**Milestone M1 (concept and design lock)**, then **M2 (movement prototype)**, then **M3 (Echo Trace prototype)**. Begin with backlog tasks BL-001 to BL-020.

## START HERE
1. Answer the provenance questions Q-001–Q-010 and seek qualified advice on historical contributions.
2. Create the repo, configure TypeScript and Vite, and set up the fixed 60 Hz simulation loop (BL-001, BL-002).
3. Build the movement prototype and fix scale/camera (BL-004–BL-006).
4. Build the Echo Trace prototype with the determinism golden test (BL-010–BL-015) and decide at Gate A.
5. Start the asset register with evidence files before importing any third-party asset (`docs/12`).
