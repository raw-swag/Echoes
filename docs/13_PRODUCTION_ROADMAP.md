# 13 — Production Roadmap

**No release date is promised.** Effort is expressed in **RU** (relative units). *Assumption:* 1 RU ≈ one focused week of solo work. Calibrate after M2 and adjust all estimates. Ranges are guesses with wide uncertainty. Team multipliers are rough (assuming 3 people: programmer, artist, audio/design), not commitments.

## Milestones

| # | Milestone | Dependencies | Deliverables | Exit criteria | Risks | Solo RU | Small team RU |
|---|---|---|---|---|---|---|---|
| M1 | Concept & design lock | — | These docs reviewed; provenance Qs triaged; repo created; web stack (Node/Vite/TS) pinned; asset policy | D-001–D-048 reviewed; BL-001–BL-003 done | Over-design (R-10) | 1–2 | 1 |
| M2 | Movement & physics prototype | M1 | Graybox player, jump feel, camera, dash, test room; BH→units decided | 5 testers can run/jump/dash without frustration; parameters in TS data schemas; D-030 closed | Feel tuning rabbit hole | 2–3 | 1–2 |
| M3 | Echo Trace prototype | M2 | Recorder, ghost, plate, door, reset; determinism test; HUD | Golden test passes in Vitest; 3 graybox puzzles solvable; edge cases in `15` §5 covered | Determinism (R-03) | 3–4 | 2–3 |
| M4 | Chapter 1 graybox | M3 | Rooms 1.1–1.6 graybox, Sentry, Pulse, Seams, Corruptor prototype | Complete run with placeholders; all rooms pass PF checks | Puzzle clarity (R-05) | 3–5 | 2–3 |
| M5 | Chapter 1 vertical slice | M4 | Representative art/audio/VFX, polish, Beacons, save, UI | `15` §13 slice acceptance tests pass; playtest notes; fun verdict | Art workload (R-06) | 4–6 | 3–4 |
| M6 | Core-system stabilization | M5 | Refactor, tests, hero swap, accessibility baseline, save v1 | Regression suite green; slice still passes; tech debt list | Hidden debt | 2–3 | 1–2 |
| M7 | Chapter 1 production | M6 | Rooms 1.7–1.11, Veil, Witness Chamber, final assets | Ch1 complete & polished | Scope creep (R-01) | 4–6 | 3–4 |
| M8 | Subsequent chapters | M7 | Ch2–Ch5 (each ~M5-sized sans engine work) | Each chapter passes its completion criteria | Gimmick overload (R-04) | 20–32 | 12–20 |
| M9 | Complete-game integration | M8 | Hub, endings, Witness Protocol, credits, settings | End-to-end playthrough, all 3 endings | Story contradictions (R-02) | 4–6 | 3–4 |
| M10 | Test, optimize, accessibility, release prep | M9 | Perf pass, accessibility audit, license audit, web static build | Release checklist complete; license evidence for every asset; clean multi-browser smoke test | Licensing (R-07), browser variance (R-15) | 4–6 | 3–4 |

**Critical path:** M1 → M2 → M3 → M4 → M5 (decision point) → M6 → M7 → M8 → M9 → M10.

## Decision gates
- **Gate A (end M3):** Is Trace fun and reliable? If not, redesign Trace before any content.
- **Gate B (end M5):** Does the slice deliver the promised experience? If not, cut chapters or redesign rather than scale up.
- **Gate C (end M7):** Is Ch1 production cost per room known? Use it to re-estimate M8.

## Assumptions
1. Single developer, part-time; no outsourced art (otherwise add budget).
2. Placeholder art until M5.
3. Original or verified-license audio.
4. Static web hosting; no mobile/console ports in scope for MVP.
5. Estimates exclude marketing, storefront, localization, and legal review.

## Cut list (if scope must shrink, in order)
Fragment gallery → Witness Chambers in Ch2–3 → Echo-Fusion variants → 2nd trace slot → Chapter 3 or 4 compressed (not removed; the story needs them).
