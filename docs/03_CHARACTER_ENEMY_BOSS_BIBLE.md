# 03 — Characters, Enemies, and Bosses

Acceptance criteria use IDs `AC-<entity>-n`. "Telegraph" = visible/audible warning ≥ 0.5 s unless noted.

## Part A — Protagonists

Shared: Integrity 3, Pulse, Echo Trace, 60 Hz tick. Silhouettes must be distinguishable at 25% scale (see `11`).

### A1 Blitz
- **Visual:** lean, forward-leaning silhouette; cyan streak trail; fragmented scarf.
- **Narrative role:** Urgency. Fear of stillness. Ch1 spotlight.
- **Gameplay:** Dash across gaps, through Pulse Traps (brief invulnerability), beats timed doors.
- **Ability:** Dash 4 BH / 0.18 s; cooldown 1.2 s +0.4 per consecutive use within 4 s (cap 3.0 s; reset after 5 s idle). Cannot dash while shielded or in a Static Field.
- **States:** Idle, Run, Jump, Fall, Dash, Hurt, Pulse, Interact, Record (overlay), Swap.
- **Trace interaction:** Dash replays as recorded movement; dash cooldown is not consumed by playback.
- **Combos:** Blitz records a long run; Nova plays the aerial route in parallel; Grim holds a plate while a Blitz trace crosses.
- **Variants:** Assist—dash cooldown flat 1.2 s.
- **Animation/sound:** idle, run, jump, fall, land, dash start/streak/end, hurt, pulse, interact. SFX: dash whoosh, footstep set (affects noise).
- **AC:** AC-BL-1 dash distance within ±5% of parameter; AC-BL-2 cooldown escalates and resets as specified; AC-BL-3 invulnerable only during dash frames.

### A2 Nova
- **Visual:** wide cape silhouette, soft pink glow; weightless idle.
- **Narrative:** Possibility. Ch2 spotlight; joins at Ch2.
- **Ability:** Flight energy 3.0 s; thrust + glide; recharges at 1.5× rate on ground. Disabled in Static Fields.
- **States:** Idle, Run, Jump, Fall, Fly, Hurt, Pulse, Interact.
- **Trace:** Flight replays as recorded path; the energy meter is not consumed by playback.
- **Combos:** Nova flies to a Veil-revealed platform to place an Origin Mark; Volt holds a relay.
- **AC:** AC-NO-1 energy depletes/recharges as specified; AC-NO-2 no flight in Static Field.

### A3 Grim
- **Visual:** heavy, rounded silhouette, violet plated shoulders.
- **Narrative:** Protection. Ch3 spotlight; joins at Ch3.
- **Ability:** Shield 2.5 s, cooldown 6.0 s; blocks projectiles; noise events produced = 0 while active; move speed 60%; cannot dash/fly.
- **States:** Idle, Walk, Jump, Fall, Shield, Hurt, Pulse, Interact.
- **Trace:** Shield replays (visual + noise suppression); **does not** block projectiles from a trace (D-005 corollary: traces affect sensors, not hazards).
- **AC:** AC-GR-1 noise suppressed during shield; AC-GR-2 projectiles blocked from front arc only.

### A4 Echo
- **Visual:** thin, translucent edges, blue-white; subtle double-vision outline.
- **Narrative:** Perception. Ch4 spotlight; playable from Ch1.
- **Ability:** Veil Sight, 6 BH radius, 4 s, cooldown 5 s. Reveals Hidden Platforms and Veil-only paths; clears fog.
- **States:** Idle, Run, Jump, Fall, Veil, Hurt, Pulse, Interact.
- **Trace:** If a Trace replays Veil Sight, platforms stay revealed at the trace's location for the duration (remote reveal). `[PROTOTYPE]`
- **AC:** AC-EC-1 reveal radius and timing; AC-EC-2 hidden platforms solid only while revealed.

### A5 Volt
- **Visual:** angular, electric-blue highlights; hovering fragment halo.
- **Narrative:** Logic. Ch5 spotlight; joins at Ch2.
- **Ability:** Hack: range 6 BH, line of sight, channel 0.6 s; targets turrets, drones, jet parts, doors; turrets/drones become allies for 8 s; cooldown 4 s. Not usable in Static Fields; not on organic/Remnant targets.
- **States:** Idle, Run, Jump, Fall, Hack-channel, Hurt, Pulse, Interact.
- **Trace:** Replayed hack re-triggers on the same target if valid.
- **AC:** AC-VO-1 channel can be interrupted by damage; AC-VO-2 target validity checked at both start and end.

## Part B — Enemy types

| ID | Name | Chapter | Theme link | Behavior | Counterplay |
|---|---|---|---|---|---|
| E1 | Memory Sentry | 1 | Trust | Patrols a route; sees in a cone; stares at "unrecorded" objects (Trace = duplicate record) | Bait with Trace, Pulse from behind, Blitz dash through gap |
| E2 | Corrupted Drone | 1 | Trust | Hovers, flies the player's last 3 s of movement | Move predictably, then break the pattern |
| E3 | Seam Warden | 1 | Trust | Stationary; punishes crossing a Seam with a pulse | Cross when pulse is down; Trace dissolves |
| E4 | Memory Crow | 2 | Possibility | Carries loose objects/fragments to nests | Bait with Trace; pursue its route |
| E5 | Fighter Drone | 2 | Possibility | Laser pattern; Volt can hack | Hack or hide behind debris |
| E6 | EMP Cell | 2 | Possibility | Floor zone that shocks or disables grounded characters; flight passes safely above | Route high with Nova flight; ground path dangerous |
| E7 | Scarab Mech | 3 | Fear | Responds to noise; investigates source | Noise decoys; Shield muffle |
| E8 | Echo Worm | 3 | Fear | Detects ground footsteps only | Fly, shield, or stay on stone |
| E9 | Rolling Boulder | 3 | Fear | Hazard triggered by noise events | Timing and quiet routes |
| E10 | Shadow Clone | 4 | Identity | Learns last 2 solutions' style and blocks them | Vary approach |
| E11 | Echo-Fusion | 5 | Choice | Combines two earlier behaviors (e.g., Sentry + Crow) | Apply both counters |

Each enemy needs: Idle/Patrol, Alert, Attack, Stunned, Released states; telegraphs ≥ 0.5 s; non-lethal damage only (1 Integrity); Trace sensitivity flag (sees trace: yes/no); variants: Assist reduces speed 20%.
**Enemy AC (all):** AC-EN-1 visible telegraph; AC-EN-2 deterministic patrol timing given the same inputs; AC-EN-3 reset to authored state on room reset; AC-EN-4 Pulse stuns for CH-07 value.

## Part C — Bosses

### C1 Corruptor (Ch1)
- **Identity:** a verification routine corrupted by lost trust; flickering body of broken code; wide central eye; can only copy what it recorded.
- **Role:** teaches Trace with a timed sync.
- **Arena:** Verification Atrium: two Resonance Pylons (A left, B right), central hover zone, three Safe Ledges.
- **States:** Hover → Record (observes 8 s) → ReplayLock (launches Shade) → Vulnerable (Pylon Sync Window) → Stagger → PhaseShift → Collapse.
- **Attacks:** Shade (replays the last 8 s of player movement as a damaging hazard after 1.5 s telegraph); Static Burst (ring on floor, 2.0 s telegraph).
- **Vulnerability:** During ReplayLock, pylons energize. Strike one pylon; strike the other within Sync Window (2.0 s). A Trace can strike the second.
- **Phases:** P1 one Shade; P2 two Shades staggered + Static Burst; P3 arena Seams toggle at intervals (3 total hits).
- **Echo Trace:** The Trace is not affected by Shade; but Shade will mimic *the player's last movement including a Trace launch gesture* (visual only).
- **Variants:** Assist: Sync Window 3.0 s, Shade speed −20%. Challenge: window 1.5 s.
- **Anim/sound:** hover, record flicker, launch, stagger, collapse; SFX: record-hiss, Shade whoosh, pylon chime pitch rises on partial strike.
- **AC:** AC-CO-1 Shade path equals recorded path ±0 tick; AC-CO-2 sync resolves identically with trace or manual strike; AC-CO-3 no unavoidable damage; AC-CO-4 beatable without Assist in ≤ 3 minutes by an average tester `[VERIFY by playtest]`.

### C2 Stormhawk (Ch2)
- **Identity:** a preserved flight-record of a pilot called **Kesh Arandor** `[PROPOSAL]`; angular jet silhouette with human-shaped canopy glow.
- **Role:** Volt/Nova puzzle boss.
- **Arena:** circular air arena with three Engine Relays on islands.
- **States:** Patrol → Strafe → Dive → Ring → Stall (after relays) → Land → Resolve.
- **Pattern Cycle:** Strafe (3 lasers), Dive (targeted at player's x), Ring (circles arena); repeats in fixed order.
- **Mechanic:** Volt hacks Relay 1/2/3 in sequence within one Pattern Cycle; each hacked relay leaves a lit node. Nova's flight reaches high relays. A Trace may hold a relay's hold-switch to free the player for the next.
- **Phases:** P1 three relays; P2 gravity flips in a zone, adds crows; P3 reduced time between attacks.
- **Resolution:** engine stalls, Stormhawk lands, pilot's Release request is found.
- **AC:** AC-ST-1 fixed cycle order; AC-ST-2 relays reset if the cycle breaks; AC-ST-3 no soft-lock if player dies mid-sequence.

### C3 Titan Echo (Ch3)
- **Identity:** a sleeping giant with sand-draped plating; its chest hosts the Vault; it guards, it does not hunt.
- **Role:** Noise meter mastery.
- **States:** Dormant → Stir (≥25) → Alert (≥50) → Wake (≥75) → Strike → Settle.
- **Attacks:** Slam at the noise source location (3 s telegraph via dust and rumble; also on-screen indicator); Breath (sand wave; Shield or high ground).
- **Resolution:** Vault Walk: a quiet route (noise < Stir) across the chest vault using Echo's Veil Sight and Grim's muffle; Titan settles.
- **Echo Trace:** A Trace emits its recorded noise (decoy), pulling Titan's Slam to the Trace's location.
- **AC:** AC-TI-1 noise values match `00B`; AC-TI-2 Strike always targets last noise source; AC-TI-3 every strike has a ≥ 3 s telegraph.

### C4 Reflection (Ch4)
- **Identity:** a polished silhouette of Prime Echo's form made of mirrored shards; speaks little.
- **Role:** challenges assumptions; mechanical test of varied approaches.
- **Arena:** loop room with three Mirror Anchors.
- **States:** Mimic (replays player's route) → Contradict (does the opposite of the Behavior Ledger's top habit) → Decline (no attack; asks a question) → Break.
- **Win condition:** Break each Anchor using a *different category* (movement, ability, trace). Repeating a category makes the next Anchor invulnerable until another category is used.
- **Behavior Ledger:** local, bounded counters (ability use frequencies, most used route class, trace usage rate). If data is absent, authored default script. No online data.
- **AC:** AC-RE-1 default script reproduces identical behavior given same ledger; AC-RE-2 never requires information the player cannot see; AC-RE-3 solvable with any hero set.

### C5 Voidcaller (Ch5)
- **Identity:** a hollow sphere of dark glass; faces appear in it; it hums rather than roars.
- **Role:** final encounter; narrative resolution.
- **Phases:** (0) Remnants at pillars; (1) The Fold; (2) Closing Doors; (3) The Question.
- **Remnants:** Corruptor-remnant (Pylon sync), Stormhawk-remnant (relay), Titan-remnant (noise), Reflection-remnant (approach variety); each resolved without killing.
- **The Fold:** telegraphed Fold Lines swap the player with their Trace's position (deterministic, shown 1.5 s ahead).
- **Closing Doors:** doors seal paths; Trace holds doors open while the player passes.
- **The Question:** the fight cannot be won by damage; terminals present Restore All / Preserve Boundary / Witness Protocol.
- **AC:** AC-VC-1 fight cannot be "won" via Pulse; AC-VC-2 every phase has a Beacon; AC-VC-3 Fold always telegraphed ≥ 1.5 s.

## Part D — Cross-references
Echo Trace rules: `04` §2. Chapter placement: `05`–`09`. Art/audio: `11`.
