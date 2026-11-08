# 00B — Canonical Specification (Master Reference)

**Status:** Draft v0.1. **Precedence:** if any document disagrees with this one, 00B wins, then `17_DECISION_LOG.md`. Fix the other document.

## 1. Tags

| Tag | Meaning |
|---|---|
| `[SOURCE]` | Taken from the original three files |
| `[CANON]` | Decided story/world fact for the revived project |
| `[PROVEN-PATTERN]` | A well-established technique in the genre or engine. **Not** proven in ECHOES until built and tested |
| `[PROPOSAL]` | Design decision made, not yet validated by play |
| `[PROTOTYPE]` | Must be validated by a prototype before dependent content is built |
| `[VERIFY]` | External fact or license that must be checked by a human; not verified here |

Nothing in this package has been playtested, benchmarked, or legally reviewed.

## 2. Glossary

| Term | Definition |
|---|---|
| **Echo Realm** | Dreamlike dimension where forgotten memories become places `[SOURCE][CANON]` |
| **The Archive** | System that preserves experiences that would vanish; Prime Echo is its Warden `[CANON]` |
| **Prime Echo** | Archive's Warden. Absolutist about restoration: "If it happened, it belongs here." `[CANON]` |
| **First Silence** | The collapse event. Mass restore-all requests collided with deliberately released memories `[CANON]` |
| **Neural Shards (I–V)** | Five divided restoration authorities (Verification, Retrieval, Sealing, Identification, Arbitration) `[SOURCE][CANON]` |
| **Nexus / Pillars** | Final chamber with five pillars, one per Shard `[SOURCE][CANON]` |
| **Final Draft** | Prime Echo's last attempt: five parallel strategies (Urgency, Possibility, Protection, Perception, Logic) that became the five heroes `[CANON]` |
| **Quiet Stacks** | Storage of deliberately released memories (Release Seals) `[CANON]` |
| **Voidcaller** | Public name for the Boundary Keeper, the protection system for released memories `[CANON]` |
| **Release Seal** | A person's recorded choice not to be shown a memory again `[CANON]` |
| **Tether** | Each hero's link to the Archive; faint in dormant heroes `[CANON]` |
| **Echo Trace / Trace** | The player's recorded and replayed ghost of a character `[CANON]` |
| **Origin Mark** | Where a Trace starts; set when recording begins |
| **Seam** | Floor glyph line; crossing it switches a Ch1 corridor layout |
| **Static Field** | Zone that dissolves traces and disables hacks/flight |
| **Pulse** | Shared short-range non-lethal stun; basis of "Release" of stunned enemies |
| **Beacon** | Checkpoint |
| **Integrity** | Health (pips) |
| **Memory Fragment** | Optional lore collectible (no mechanical reward) |
| **Witness Chamber / Witness Clause** | Optional puzzle room per chapter / the evidence item it yields; all five assemble the Witness Protocol (Ending C) |
| **Behavior Ledger** | Local, bounded record of player habits used by Reflection |
| **BH** | Body-heights: the unit for all distances in design docs until art/camera is locked |
| **Tick** | A discrete 1/60 s simulation step; the fundamental deterministic unit of game time `[CANON]` |
| **Simulation** | The pure TypeScript game model (entities, collision, trace, puzzles) with zero DOM/render dependencies `[CANON]` |
| **Fixed-step loop** | An accumulator-based update cycle driven by `requestAnimationFrame` running the Simulation at exactly 60 Hz `[CANON]` |

## 3. Canonical cast mapping

| Hero | Response | Ability name | Spotlight chapter | Theme | Pillar trial (Ch5) | Voice |
|---|---|---|---|---|---|---|
| Blitz | Urgency | Dash | 1 Fragmented Core | Trust | Pillar I | Clipped, impatient, jokes under pressure, avoids stillness |
| Nova | Possibility | Flight | 2 Lost Sky | Possibility | Pillar II | Curious, wry, speaks in "what if" |
| Grim | Protection | Shield | 3 Giant's Tomb | Fear | Pillar III | Terse, dry, states commitments, rarely asks questions |
| Echo | Perception | Veil Sight | 4 Mirror Lab | Identity | Pillar IV | Soft, precise, notices details, trails off |
| Volt | Logic | Hack | 5 Nexus Gate | Choice | Pillar V | Literal, analytical, learns metaphor slowly, uses IDs |

All five heroes are present narratively from the start. Playable unlocks: Ch1 Blitz + Echo; Ch2 + Nova + Volt; Ch3 + Grim. Dormant heroes speak as faint Tether voices. `[PROPOSAL]` (D-004)

## 4. Shard / boss / chapter mapping

| Ch | Boss | Shard (authority) | Pillar | Found when | Boss resolution |
|---|---|---|---|---|---|
| 1 | Corruptor | I Verification | I | End of Ch1 | Pylon sync; verification loop released |
| 2 | Stormhawk | II Retrieval | II | End of Ch2 (inside assembled jet core) | Engine stall; pilot lands |
| 3 | Titan Echo | III Sealing | III | End of Ch3 (Titan's brain chamber) | Titan settles after Vault Walk |
| 4 | Reflection | IV Identification | IV | End of Ch4 (fused after Reflection) | Three non-repeating approaches |
| 5 | Voidcaller | V Arbitration | V | Ch5 Act 3 | Resolved by choice, not HP |

## 5. Canonical story in one page

Prime Echo kept the Archive. People could **release** memories; the Archive honored this by storing Release Seals in the Quiet Stacks, guarded by the Boundary Keeper. At the First Silence, mass restore-all requests arrived; many lost memories were accidental, many were chosen. Prime Echo could not tell them apart and began restoring everything. The Boundary Keeper blocked him. Their conflict dissolved the boundaries between memories.

Prime Echo split restoration authority into five Shards, sealed them in five dangerous regions, and ran the Final Draft: five parallel strategies, externalized. They were meant to deliberate and then **merge back**. He did not ask them. He vanished into the Nexus Core. The five strategies kept running, gained histories, and became Blitz, Nova, Grim, Echo, Volt. They awaken with gaps and believe they must recover the Shards and rescue him.

Each chapter shows that abandonment was real and that restoration can hurt. Ch4 reveals the heroes' origin and the planned merge. Ch5 reveals that the Voidcaller guards Release Seals, including seals tied to the heroes' own separate existence. Neither Prime Echo nor the Voidcaller is simply right.

Endings: **A Total Recall** (restore all; heroes merge; released memories return), **B The Quiet World** (preserve the Voidcaller; stable but closed), **C The Witness Protocol** (offer, never force; heroes keep their identities). Closing line: *"A memory is not yours just because you can restore it."*

## 6. Canonical gameplay parameters (all tunable unless marked fixed)

Starting values only; tuned during M2–M3. Distances in BH. `[PROPOSAL]`

### Echo Trace
| ID | Parameter | Start | Range |
|---|---|---|---|
| TR-01 | Max record time | 8.0 s | 6–12 |
| TR-02 | Min record time (shorter is discarded) | 0.5 s | fixed |
| TR-03 | Hold time after playback ends | 12 s | 6–20, per-room override |
| TR-04 | Record cooldown after trace ends | 1.0 s | 0–3 |
| TR-05 | Trace slots | 1 (Ch1–3), 2 (Ch4+) | per-room override |
| TR-06 | Dissolve fade | 1.0 s | fixed |
| TR-07 | Sample rate | physics tick (60 Hz) | fixed |
| TR-08 | Trace weight on plates | 1 | fixed |
| TR-09 | Cancel recording (hold) | 0.5 s | 0.3–1.0 |

### Characters
| ID | Parameter | Start |
|---|---|---|
| CH-01 | Dash distance / duration | 4 BH / 0.18 s |
| CH-02 | Dash base cooldown; +per use inside 4 s; cap; reset after idle | 1.2 s; +0.4 s; 3.0 s; 5 s |
| CH-03 | Flight energy; ground recharge | 3.0 s; 1.5× rate |
| CH-04 | Shield duration / cooldown / move speed while active | 2.5 s / 6.0 s / 60% |
| CH-05 | Veil Sight radius / duration / cooldown | 6 BH / 4 s / 5 s |
| CH-06 | Hack range / channel / ally duration / cooldown | 6 BH / 0.6 s / 8 s / 4 s |
| CH-07 | Pulse range / stun / cooldown | 1.5 BH / 1.5 s / 0.8 s |
| CH-08 | Hero swap cooldown | 1.5 s |

### Survival and noise
| ID | Parameter | Start |
|---|---|---|
| SV-01 | Integrity pips | 3 (full restore at Beacon) |
| SV-02 | Pit fall | −1 pip, return to last Safe Ledge, 1.5 s invulnerable |
| SV-03 | Noise units (NU): walk step 1, run step 3, soft land 2, hard land 6, dash 8, interact 3, switch 5 | — |
| SV-04 | Noise meter decay; Stir / Alert / Wake thresholds | 4 NU/s; 25 / 50 / 75 |
| SV-05 | Corruptor replay window | 8 s (range 6–10; original 10 s retained as upper bound) |
| SV-06 | Pylon Sync Window | 2.0 s (3.0 s assist) |

## 7. Ending gates (fixed)

| Ending | Requirement |
|---|---|
| A Total Recall | Reach Nexus Core; choose Restore All |
| B The Quiet World | Reach Nexus Core; choose Preserve Boundary |
| C The Witness Protocol | Hold all five Witness Clauses **and** solve the Protocol Assembly puzzle in Nexus Core |

Witness Chambers stay revisitable until the Nexus Core choice (no missable gates). `[PROPOSAL]`
