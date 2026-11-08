# 09 — Chapter 5: The Nexus Gate

**Theme:** Choice · **Spotlight:** Volt · **Playable:** all five · **Boss:** Voidcaller · **Shard:** V Arbitration

## 1. Narrative purpose
Recombine every rule, resolve the mystery, and put the choice in the player's hands. Defeating the Voidcaller physically is not a requirement for resolving the story.

## 2. Visual direction
A neural chamber with five floating pillars, a neural lightning storm, faces in clouds, glowing neuron crystals reacting to proximity; the outer ring of portal gates opens as Shards are returned. The Quiet Stacks are low, silent, pale. Palette is the full set (blue/purple/pink/cyan) at higher saturation, then drained for the Stacks.

## 3. Level progression

```mermaid
flowchart TD
  A[5.1 Nexus Ring] --> P1[5.2 Pillar I Blitz]
  A --> P2[5.3 Pillar II Nova]
  A --> P3[5.4 Pillar III Grim]
  A --> P4[5.5 Pillar IV Echo]
  P1 --> S[5.6 Stability Hold]
  P2 --> S
  P3 --> S
  P4 --> S
  S --> Q[5.7 Quiet Stacks]
  Q --> R[5.8 Remnants]
  R --> V[5.9 Voidcaller]
  V --> C[5.10 Nexus Core]
  C --> E1[Ending A]
  C --> E2[Ending B]
  C --> E3[Ending C]
```

Pillar order is free for I–IV; Pillar V (Volt) opens after the Stability Hold.

| Room | Purpose | Rules |
|---|---|---|
| 5.1 Nexus Ring | Hub; portals to the four chapters (revisit) | — |
| 5.2 Pillar I (Blitz) | Dash + Trace sync under Corruptor-remnant | Ch1 rules |
| 5.3 Pillar II (Nova) | Gravity + relay with Stormhawk-remnant | Ch2 rules |
| 5.4 Pillar III (Grim) | Noise route with Titan-remnant | Ch3 rules |
| 5.5 Pillar IV (Echo) | Variety door with Reflection-remnant | Ch4 rules |
| 5.6 Stability Hold | All pillars drain; keep ≥ 70% for 90 s via short tasks | Mixed |
| 5.7 Quiet Stacks | Quiet traversal; Release Seals; heroes' seals | Noise + Veil |
| 5.8 Remnants | Pillar V trial (Volt): hack a rule-switch while remnants circle | Combined |
| 5.9 Voidcaller | Fold, Closing Doors, The Question | New: Fold |
| 5.10 Nexus Core | Prime Echo; the choice; Protocol Assembly | — |

## 4. Abilities introduced/tested
All. New rule: **Fold** (position swap with Trace, telegraphed).

## 5. Puzzles
- **Pillar trials:** each recombines its chapter's rule with one twist (Pillar I: two Pylons plus a Seam; II: relay plus reversed gravity; III: noise plus a trace decoy; IV: variety plus two traces).
- **Stability Hold (replaces the original 70%/3 min wave defense):** pillars lose integrity in pulses; players restore via nearby switches using Trace + abilities. Hold ≥ 70% for 90 s (tunable; Assist 60 s). `[PROTOTYPE]` for balance.
- **Protocol Assembly (Ending C):** five clause tablets (Offer, Identify the owner, Confirm consent, Reveal, Release) must be ordered. Hints draw from Witness Chamber testimonies; wrong orders show a *preview* of harm.

## 6. Enemies and boss
Echo-Fusions (two behaviors combined), Remnants, Voidcaller.

```mermaid
stateDiagram-v2
  [*] --> Remnants
  Remnants --> Fold: 4 remnants resolved
  Fold --> ClosingDoors
  ClosingDoors --> Question
  Question --> EndingA: Restore All
  Question --> EndingB: Preserve Boundary
  Question --> EndingC: Witness Protocol (needs 5 clauses + assembly)
```

## 7. Environmental storytelling
Stacks walls of Release Seals; one wall of five seals carries the heroes' marks and reads, in plain text: "RELEASED FROM: PRIME ECHO." Prime Echo's recorded fragments play at the Core: "If it happened, it belongs here." The Voidcaller's faces include accidental-loss faces and chosen-leave faces; the game does not tell which is which.
- **Prime Echo Fragment 5 (Room 5.1 Nexus Ring entrance console) `[PROPOSAL]` (D-045):** *"To forget is a mercy; to forbid remembrance is an exile. Who among us holds the scale?"* (18 words)
- **Ending Vignettes — Hero Concrete Memory Gaps `[PROPOSAL]` (D-048):** In all three endings (A, B, C), each hero's final scene is set within the dream-realm and explores their specific memory gap across three thematic variants (Ending A: gap closes, hero's separate self dissolves into Prime Echo; Ending B: gap stays open in the quiet realm; Ending C: gap is offered back and the hero chooses):
  - **Blitz:** Gap = sprinting across a shattered sky-bridge, unable to recall whose hand he was running to catch. (A: catches hand as sky turns white, dissolves into Prime Echo; B: sits at bridge edge in dream-fog, accepting the unknown; C: reads offered memory tablet on his own terms).
  - **Nova:** Gap = hovering above a luminous cloud-sea at sunrise, unable to name the dream-landscape beneath. (A: coordinates flood in, wings fold into Prime Echo; B: glides through unnamed sky-haze in peace; C: accepts the offered name softly without losing freedom).
  - **Grim:** Gap = weight of shield locking into place over a blank face. (A: face clears as armor dissolves into Prime Echo's pillar; B: rests shield in desert sand, content without a debt; C: verifies identity in Witness Stacks with a nod).
  - **Echo:** Gap = gazing through the veil at a murmuring crowd without memory of being touched. (A: physical touch floods back as veil tears, merging into Warden; B: lowers veil in lab twilight, whole in herself; C: reaches across veil to accept offered touch).
  - **Volt:** Gap = tracing machine circuits with no record of why the work began. (A: computes purpose as logic thread terminates into Core; B: lets the uncomputable remain a serene null; C: inputs his own reason, lending logic while keeping identity).

## 8. Checkpoints and difficulty
Beacon at each pillar entrance, after each pillar, before 5.7, between Remnants, and between phases. Difficulty: highest in the game, but with mostly known rules.

## 9. Assets
Pillar set (5), neuron crystals, storm VFX, cloud faces, Remnant sprites (4), Echo-Fusion variants, Stacks tileset, Seal walls, Voidcaller (large), Prime Echo figure, Core terminals, ending vignettes (3 sets × 5 heroes).

## 10. Entry/exit knowledge
- **Entry:** four Shards, the Draft, the planned merge.
- **Exit:** the player's choice and its consequences.

## 11. Mystery contribution
R5 and resolution.

## 12. Exit and completion
Exit: the Nexus Core choice. Complete: any ending; Ending C requires five clauses and Assembly. Witness Chambers remain revisitable via the Nexus Ring until the choice.
