# 16 — Risk Register

P = probability, I = impact (L/M/H). Ratings are judgments, not data. Owner roles (a solo developer holds multiple).

| ID | Risk | P | I | Mitigation | Early warning signs | Owner role |
|---|---|---|---|---|---|---|
| R-01 | Scope creep (5 heroes × 5 chapters) | H | H | Slice-first; cut list in `13`; one new rule per room | Backlog grows faster than it closes; new heroes before Gate B | Producer |
| R-02 | Story contradictions | M | M | `00B` precedence; continuity checklist; decision log | Two docs disagree on a fact | Narrative lead |
| R-03 | Echo Trace technical complexity/determinism | M | H | M3 prototype; kinematic ghost; golden tests; avoid moving platforms early | Replays drift; special cases multiply | Tech lead |
| R-04 | Excessive level gimmicks | M | M | PF-9; each chapter limited to 1–2 new rules | Rooms need explanation text | Design lead |
| R-05 | Unclear/unfair puzzle solutions | H | H | PF rules; playtest unaided; hint tiers | Testers stuck > 3 min; brute-force solving | Design lead |
| R-06 | Art and animation workload | H | M | Placeholder-first; shared hitboxes; reduced animation set; reuse | Sprite backlog exceeds budget | Art lead |
| R-07 | Asset licensing | M | H | Register in `12`; evidence files; original fallback | Asset without evidence in project | Producer |
| R-08 | Historical contribution provenance | M | H | `12` §6; seek professional advice; transparent credits | Dispute or unanswered Q-001–Q-010 | Project lead |
| R-09 | Insufficient testing | M | H | Automated determinism tests; milestone playtests | Bugs found only at the end | QA lead |
| R-10 | Over-design before first playable | H | M | Docs capped; M2 starts after M1; prototype before more writing | Design edits > code commits | Producer |
| R-11 | Burnout/solo capacity | M | H | Realistic RU calibration; cut list; pace | Missed small milestones | Project lead |
| R-12 | Reflection feels creepy or unfair | L | M | Local-only bounded ledger; authored fallback; opt-out toggle | Tester discomfort | Design lead |
| R-13 | Accessibility retrofitted late | M | M | Baseline in M6; assist parameters in Resources from M2 | Hard-coded timings | Tech lead |
| R-14 | Name clash for "ECHOES" | M | M | Search before branding `[VERIFY]` | Prior titles found | Producer |
| R-15 | Web platform / browser variance | M | M | Multi-browser test matrix (Chrome/Edge/Firefox/Safari); avoid engine churn | Rendering glitches on Safari / WebKit | Tech lead |
| R-16 | Ending C feels like a hidden-collectible chore | M | M | Chambers are puzzles; revisitable; clause hints | Players hunting instead of reasoning | Narrative lead |
| R-17 | Browser tab throttling & timing spiral | M | H | Listen to `visibilitychange`; pause sim when tab hidden; cap catch-up ticks to 5 | Physics runs away after tab focus returns | Tech lead |
| R-18 | Browser storage eviction | M | H | Request `storage.persist()`; manual JSON file export/import in Settings; backup slot | Player reports lost save data | Tech lead |
| R-19 | Web Audio autoplay policy blocking | H | M | Initial "Press any key to begin" screen unlocks AudioContext on user gesture | Game starts completely silent | Audio lead |
| R-20 | Garbage collection hitching | M | H | Zero-allocation sim loop; typed arrays (Int32Array); entity and particle pooling | Periodic frame drops during Trace playback | Tech lead |
| R-21 | Cross-browser floating point drift | M | H | Integer ticks; prototype integer fixed-point sim positions; eliminate Math.sin/cos in sim | Golden test passes on Chrome but drifts on Safari | Tech lead |

## Critical-risk actions
| Risk | Owner role | Action | Due |
|---|---|---|---|
| R-03 | Tech lead | Build Trace prototype and golden test | M3 |
| R-05 | Design lead | Document solutions for every slice room; unaided playtest | M4/M5 |
| R-07, R-08 | Producer/Project lead | Begin register and answer Q-001…Q-010 | M1 |
| R-01, R-10 | Producer | Enforce Gate A/B | M3/M5 |
