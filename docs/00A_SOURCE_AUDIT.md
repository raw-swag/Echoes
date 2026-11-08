# 00A — Source Material Audit

**Status:** Draft v0.1 · **Sources audited:** `Echoes-credit.pdf`, `map.docx`, `story line of ECHOES.docx`
**Tags used across the docs:** see `00B_CANONICAL_SPEC.md` §1.

## 1. What each source contains

| Source | Content | Authorship marks inside the file |
|---|---|---|
| `story line of ECHOES.docx` | Premise (Echo Realm, Prime Echo, five Neural Shards), five playable characters, five chapters with setting/goal/enemies/obstacle/boss, a "not final" ending, expansion hooks | Footer: "By Saugat Rauniyar for the delta grp" |
| `map.docx` | Global visual theme, per-chapter map/asset/logic notes, boss logic, ability-integration table, core systems list (parallax, fog-of-war, sound sensitivity, platform states), multiplayer sync logic | No byline found in extracted text; an "Asset Folder Structure Suggestion" heading exists with no content under it |
| `Echoes-credit.pdf` | Music/SFX source list (OpenGameArt, Kenney, SoundImage/Eric Matyas, Incompetech/Kevin MacLeod), team credits (Saugat Rauniyar, Prem Soni, Mohammad Zaid), a shared contact address, a blanket statement that all assets are public domain / CC / commercial-use | Header: "By: Saugat Rauniyar, Checked By: Prem Soni" |

## 2. Ideas RETAINED (unchanged in intent)

- Echo Realm, Prime Echo, five Neural Shards, Nexus with five pillars.
- Five characters and their five ability *concepts* (Blitz dash, Nova flight, Grim shield, Echo reveal, Volt hack).
- Five chapters, in order, with original names; five bosses with original names.
- Shifting corridors; floating islands + gravity flips; memory-jet assembly; noise-sensitive giant; reflective loops + shadow clones; neural pillars; enemies returning in altered form.
- "Dreaming World" visual theme: ethereal light, fog, translucent terrain, purple/blue/pink + glitch.
- Corruptor mirrors recent player movement; Stormhawk looping flight + Volt-disrupted engine; Titan Echo attacks only on sound events; Reflection uses the player's past moves; Voidcaller bends space and has mini-forms of earlier bosses.
- Memory portals; Echo-only invisible platforms; dynamic fog-of-war from Echo's reveal; platform states (normal / glitchy / invisible).

## 3. Ideas REFINED

| Original | Refinement | Decision |
|---|---|---|
| "Players split → map rearranges" (multiplayer) | Single-player: layouts change when the player crosses **Seams**; traces dissolve on a Seam change | D-006 |
| Corruptor "weak to dual attacks from both sides" | One player + one **Echo Trace** strike two Pylons in a Sync Window | D-014 |
| Giant wakes from loud movement (volume) | Visual **Noise Meter** driven by game events only; no microphone | D-009 |
| Ability use "once every few minutes" | Short cooldowns suited to puzzle-platforming | D-008 |
| Blitz "30 sec speed boost" vs map.docx "dash with rising cooldown" | Dash with escalating cooldown (map.docx version) | D-007 |
| Stormhawk = AI of Prime Echo's old friend | Preserved flight-record of a pilot who asked to forget a day | D-016 |
| Reflection = mirror Prime Echo who rejects restoration | The Division Log's self-image of Prime Echo; non-lethal "assumption" boss | D-018 |
| Voidcaller = corrupted piece that "doesn't want to wake" | Archive's forgotten-memory protection system (Boundary Keeper) | D-019 |
| Pillar defense by waves (70% for 3 min) | Five pillar trials combining chapter lessons + one short stability hold | D-020 |
| "Reboot Memory" replay button | Post-MVP "New Cycle" mode | D-024 |

## 4. Ideas REPLACED or DEFERRED

| Original | Outcome | Why |
|---|---|---|
| Online / local co-op, role swapping between players | Deferred (architecture stays co-op-ready) | Out of scope for first milestone |
| Gold, gear, "exclusive abilities" rewards | Replaced by Memory Fragments + Witness Clauses | Currency does not serve the theme |
| "This isn't the beginning… it's the return." ending tease + locked dimension | Line reused as opening text; tease dropped | Replaced by three-ending structure |
| Expansion hooks: ice realm, underwater city, digital hell, PVP arena, hero betrayal | Parked in `17_DECISION_LOG.md` as non-canon ideas | Not needed for core story |
| Memory crows "steal points" | Crows carry off loose objects (bait/puzzle element) | No point economy |
| Boulders/worms as generic desert threats | Re-themed to noise/tremor perception rules | Theme alignment |
| Players "drag/push jet components" while fighting | Jet assembly becomes a puzzle room sequence with limited enemy pressure | Fairness / scope |

## 5. Contradictions found in the sources (resolved in `17_DECISION_LOG.md`)

1. **When Shards are found:** story says Shard 1 is the Ch1 goal and Shard 2 sits in a jet, Shard 3 in a giant's brain, Shard 4 is "fused" after mirror fights; Ch5 only "activates" neurons. → **D-010**
2. **Shards vs. pillars:** never stated how five shards relate to five pillars. → **D-011**
3. **Hero ↔ Prime Echo link:** only "Godfather figure"; characters are never connected to him. → **D-012**
4. **Titan Echo:** story says born of *Echo's* (the character's) buried fears; map.docx treats it as a guardian. → **D-017**
5. **Voidcaller:** "corrupted piece of Echo's own mind" vs. generic final boss in map.docx. → **D-019**
6. **Echo (character) vs. "Echo" (everything):** name collision between the hero, Prime Echo, Titan Echo, Echo Trace. → **D-003**
7. **Credits claim** all assets are PD/CC/commercial-use with no asset list. → `12_ASSET_PROVENANCE_AND_LICENSES.md`

## 6. Gaps in the sources

- No asset list, no per-asset licenses, no asset folder structure content.
- No ending beyond a teaser; no character personalities beyond a one-line ability.
- No explanation of *why* the catastrophe happened (the "core truth" is promised but never defined).
- No technical stack in the sources (the initial master brief supplied Godot 4.x / GDScript; the project has since pivoted to an engine-free browser web stack with TypeScript + Vite per D-031).
