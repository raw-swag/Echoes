# 04 — Mechanics and Puzzle Specification

Numeric defaults live in `00B` §6 (IDs like TR-01). **F** = functional requirement (must hold). **T** = tunable parameter. Tags per `00B` §1. Nothing here has been prototyped.

## 1. Puzzle fairness rules (apply to every puzzle)
- **PF-1** The goal of the room is visible on entry (exit gate, locked door, target object).
- **PF-2** Every rule a puzzle uses has been introduced in an earlier, lower-stakes room.
- **PF-3** Every mechanism gives feedback on state change (light, sound, animation).
- **PF-4** Failure is readable: the player can see *why* it failed.
- **PF-5** Reset in under 3 s with no walk-back; puzzle state resets, solved state persists.
- **PF-6** No pixel-perfect or frame-perfect requirement; minimum timing slack 0.25 s on Standard.
- **PF-7** No hidden information that is required but not revealable (Veil Sight can always expose it).
- **PF-8** A puzzle is never unsolvable after a reset or after player death; validated by `15`.
- **PF-9** At most one new rule per room.
- **PF-10** Each room has a documented intended solution and at least one tested alternate or an explicit "single solution" note.

## 2. Echo Trace (core) `[PROTOTYPE]`

### 2.1 Model (D-005, D-013, D-035, D-038)
Trace is **recorded-transform playback**, not input replay and not a physics re-simulation. The ghost follows recorded positions kinematically and fires recorded action events at recorded ticks. `[PROVEN-PATTERN]` as a technique; determinism with moving platforms is `[PROTOTYPE]`.

**Per tick record (60 Hz):** stored in compact pre-allocated typed arrays (e.g. `Int32Array` holding fixed-point world positions, facing, animation state id, hero id, and bitmasked event flags for ability_start, ability_end, interact, pulse, noise_event). To prevent browser garbage collection spikes, no object allocations occur during per-tick recording or playback.

### 2.2 Rules
| Rule | Spec |
|---|---|
| F-T1 Start | Press Trace while idle: set Origin Mark at the character's current position; begin recording. HUD shows time ring |
| F-T2 End | Press Trace again (or TR-01 reached): stop and **launch** playback from the Origin Mark. The real character stays where it is |
| F-T3 Cancel | Hold Trace TR-09: discard the recording; no cooldown |
| F-T4 Discard short | Recordings < TR-02 are discarded with a "too short" cue |
| F-T5 Playback | Plays once at speed 1.0, ends in a final pose, then **holds** for TR-03, then dissolves over TR-06 |
| F-T6 Loop | If the room contains a Loop Resonator, the trace loops until dissolved by a rule |
| F-T7 Slots | Up to TR-05 simultaneous traces; recording a new one with all slots full replaces the **oldest** |
| F-T8 Cooldown | TR-04 after a recording ends |
| F-T9 Weight | A trace counts as TR-08 weight on pressure plates |
| F-T10 Collision | Trace passes through the player, enemies, and solid geometry (it follows a recorded path) but **triggers** plates, levers, Resonant Objects, and enemy sensors |
| F-T11 Hazards | Traces ignore hazards. **Static Fields** dissolve them; Seam changes dissolve them |
| F-T12 Death/reset | Player death, room reset, checkpoint reload, hero swap *do not* clear a trace except death and reset; swap keeps it |
| F-T13 Scene change | Traces never persist across rooms |
| F-T14 Replay of abilities | Dash/flight = positional; shield = suppress noise only; hack = re-fires if target valid; Veil = remote reveal `[PROTOTYPE]`; interact = re-fires if target valid; pulse = stun in range |
| F-T15 Invalid replay events | If a target is invalid at playback (already destroyed, state changed), the event is skipped and a "broken echo" cue plays; the trace continues |

**T (tunable):** TR-01 … TR-09. Per-room overrides for hold, slots, loop.

### 2.3 Example puzzle (Ch1, Room 1.3 "Pressure Gallery")
Plate P holds a door D open only while pressed. D is at the far end; plate P is 12 BH from D.
- **Intended solution:** press Trace at the start, walk to P, stand 1 s, press Trace (launch). Trace holds P for TR-03 while the player walks to D.
- **Failure modes:** (a) recording too short (cue); (b) player runs before trace arrives (visible lag by design: trace *starts at the Origin Mark*, so plan the route); (c) hold time expires before the player passes — reset with a hold-time indicator on the plate.
- **Fairness:** TR-03 ≥ twice the walk time to D; plate has a visible countdown ring when held by a trace.

### 2.4 Edge cases to prototype (see `15`)
1. Trace dissolves while a player stands on a plate it was holding. → Plate releases; door closes; player gets a 0.5 s "closing" warning light.
2. Hero swap mid-playback. → Trace continues; it keeps its recorded hero's abilities.
3. Moving platform: recorded in world space; platform clocks are deterministic from room start, **not** from trace start. Puzzles using moving platforms with traces are `[PROTOTYPE]` and avoided in the slice.
4. Player records while standing on a moving platform → recorded world-space path; replays correctly only if platform phase matches. Mitigation: Origin Mark shows platform phase glyph; designers avoid platform-dependent traces in Ch1.

## 3. Pressure plates and synchronized switches
- **F:** Plate active while ≥ threshold weight present. Sync Switch = N elements that must be active inside a Sync Window.
- **T:** threshold (1–2), Sync Window (SV-06), latch (stay-on vs momentary).
- **Example (Ch1 Boss, Ch4 mirror rooms):** two switches with a 2.0 s Sync Window. **Solution:** trace strikes B while player strikes A. **Failure:** striking one then walking to the other — too slow. **Fair because:** window and ring animation are visible; Assist widens it.

## 4. Hidden platforms and Echo's Veil Sight
- **F:** Hidden platforms are not solid until revealed; revealed platforms are solid for the duration + 0.5 s grace; the platform visibly flickers during the final 1.0 s.
- **T:** CH-05 radius, duration, cooldown.
- **Example (Ch2 Room 2.4):** a gap with three hidden platforms spaced for single jumps. **Solution:** Veil Sight, cross. **Failure:** jumping while reveal expires — flicker warning. **Fair because:** a faint outline hint is present for players with Hint tier 1.

## 5. Blitz's dash
- **F:** Fixed distance and duration; passes through Pulse Traps; stops at walls; no mid-dash steering; escalating cooldown (CH-02).
- **Example (Ch1 Room 1.2):** a 6 BH gap with a pulse trap in the middle. **Solution:** jump + dash. **Failure:** dash into a wall short of the gap; **Fair:** gap is ≤ dash + jump reach by a margin; a ghost marker shows dash range on Hint tier 1.

## 6. Nova's flight
- **F:** Energy drains while thrust is held; recharges on ground; no flight in Static Fields; EMP floor zones disable/shock grounded characters, and flight bypasses them.
- **Example (Ch2 Room 2.3):** EMP Cell floor zone with a lever at height. Grounded characters cannot cross the floor without taking damage / being disabled. **Solution:** fly over, pull lever. **Failure:** energy runs out above the floor; **Fair:** energy bar visible; a landing ledge sits at the 75% energy mark.

## 7. Grim's shield and noise suppression
- **F:** Shield blocks front-arc projectiles; while active, noise events produced = 0; move speed 60%.
- **Example (Ch3 Room 3.5):** Alert already at 40; a rolling boulder path covers a route. **Solution:** shield-walk past scarab sensors. **Failure:** shield expires mid-path; **Fair:** the safe segment length ≤ shield duration × slow speed with 25% margin.

## 8. Volt's hacking and energy routing
- **F:** Hack needs line of sight and range; target types: turret, drone, door, relay, jet part. **Energy routing:** relays connect nodes by lines; a hacked relay sends power to its connected node for a fixed duration.
- **Example (Ch2 Room 2.6 Jet Assembly):** three jet parts must receive power in order. **Solution:** hack relay A → B → C while Nova places parts. **Failure:** order wrong → parts "chirp" and reset; **Fair:** order is shown by numbered lights.

## 9. Dynamic corridors (Seams)
- **F:** Crossing a Seam toggles a deterministic layout state (A/B/C). Only the live character triggers Seams. Traces dissolve on layout change. Layout states are visible as dim "ghost outlines" of other states.
- **T:** none beyond which Seams exist per room.
- **Example (Ch1 Room 1.5):** layout A has a wall; layout B opens a bridge; a plate in B opens an exit. **Solution:** cross Seam, walk bridge, trigger plate. **Failure:** trace dissolve (cue); **Fair:** Seam glyph with arrow shows state; no layout is a dead end — each state has a return path.

## 10. Gravity zones
- **F:** Zone sets gravity vector/scale, with a visible boundary; entry/exit preserves velocity clamp; Nova's flight overrides gravity direction inside.
- **T:** gravity scale (−1 … 1), clamp speed.
- **Example (Ch2 Room 2.5):** ceiling route under flipped gravity. **Solution:** enter zone at jump apex; **Fail:** spike field below at start; **Fair:** a Safe Ledge on each side.

## 11. Visual noise meter and giant alert states
- **F:** Noise events (SV-03) add NU to the meter; meter decays at SV-04 rate; thresholds Stir/Alert/Wake map to Titan states; visible bar + rumble indicator; no microphone.
- **T:** NU values, decay, thresholds, sensitivity multiplier (Assist 0.5×).
- **Example (Ch3 Room 3.3):** buried switch behind a sensor field with the meter at 0. **Solution:** walk, don't run; **Fail:** run triggers Stir; **Fair:** meter shows live NU gain; walk never reaches Stir alone.

## 12. Memory portals
- **F:** Portals are paired teleporters; the live character only; entering sets exit velocity to zero; portals can be *activated* by a trace holding a plate; they do not teleport traces.
- **Example (Ch1 Room 1.4b):** portal linked to a plate in an enemy zone. **Solution:** trace holds plate; player uses portal. **Fair:** link line visible between pair.

## 13. Reflection behavior
- **F:** Clones/reflection read a bounded Behavior Ledger or the last N solution classes. They never read inputs that the player has not generated in this save. Authored default exists.
- **Privacy & Consent (D-046):** Ledger storage is strictly local (stored inside IndexedDB; never transmitted across the network). When the Behavior Ledger is first unlocked, an in-world prompt appears: *"The Archive requests permission to observe your patterns to calibrate future encounters; no records leave this device."* The player may opt out at any time. In Settings, selecting **"Forget"** permanently wipes the ledger along with local saves.
- **Example (Ch4 Room 4.4):** clone blocks the "jump route" because the previous room was solved that way. **Solution:** use the "dash route." **Fair:** clone's block is visible *before* the player commits; the other route is always open.

## 14. Boss pattern-replay logic
- **F:** Replay windows are bounded (SV-05); replay hazards have a telegraph; they cannot start inside a safe zone; the recorded path is smoothed by nothing (exact ticks); if the recorded path overlaps unavoidable damage, it's skipped.
- **Example (Corruptor Shade):** player runs a figure-eight, Shade replays it; **Solution:** stand on a Safe Ledge or break the pattern. **Fair:** Shade has an outline and a 1.5 s delay.

## 15. Puzzle hints and accessibility
- **Hint tiers:** (1) highlight the relevant objects, (2) show the rule icon, (3) show a short animated demo of the solution's first step.
- Hints are free and unlimited; they never solve a puzzle in one step.
- Assist options: widen Sync Window; extend trace length; extend hold time; slow replay speed of boss telegraphs; auto-reset on failure.
- No puzzle requires color alone; shape/icon redundancy.

## 16. Puzzle documentation template
```
Room ID / Name / Chapter
Rules used (introduced where)
Goal and exit
Intended solution (numbered)
Alternate solutions
Failure modes and feedback
Reset behavior
Hints (tier 1/2/3)
Fairness check (PF-1…PF-10)
Test cases (link to 15)
```
