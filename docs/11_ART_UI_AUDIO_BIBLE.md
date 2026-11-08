# 11 — Art, Animation, UI, and Audio Bible

Hex values are `[PROPOSAL]` and must pass contrast checks. **No pixel dimensions are prescribed**; scale is expressed in BH until the M2 prototype fixes camera, units-per-pixel, and sprite resolution (D-030). All music/SFX/art sources are unverified until logged in `12`.

## 1. Art direction and visual identity
"Dreaming World": ethereal light, floating geometry, translucent terrain, fog, restrained glitch. Strong silhouettes, layered parallax, fractured geometry. Mood evolves: unsettled (Ch1) → open (Ch2) → heavy (Ch3) → clinical-reflective (Ch4) → saturated then drained (Ch5).

## 2. Color and lighting rules
| Role | Color (proposal) | Use |
|---|---|---|
| Void base | `#0B0C1F` | Backgrounds |
| Deep indigo | `#1B1F4B` | Far layers |
| Violet fog | `#5B3FA0` | Atmosphere |
| Cyan trace | `#4FE6E6` | Echo Trace, circuitry |
| Blue ability | `#4C7DFF` | Hero effects |
| Pink accent | `#FF6FB5` | Beacons, warnings of *good* interaction |
| Warm warning | `#FFB347` | Hazard telegraph |
| White glow | `#EDEBFF` | Light sources, text |
Rules: hazards use *shape + animation* in addition to color; at most 3 hues dominate a room; interactive elements always brighter than background; no more than one bloom source per screen region.

## 3. Environment composition
Foreground (debris, 10% opacity), play layer (high contrast), mid (structures), far (fog/sky). Safe/solid surfaces have clean edges; hidden/ghost surfaces have dotted edges.

## 4. Sprite and animation standards
- Sprites authored on a common grid derived from BH after M1; each hero shares the same hitbox.
- Frame budgets (guideline): idle 4–6, run 6–8, jump/fall 2–4 each, dash 3–4, hurt 2.
- Animation names: `idle`, `run`, `jump`, `fall`, `land`, `ability_<name>`, `hurt`, `interact`, `swap_in`, `swap_out`.
- Animations must not change collision shape except via explicit states.

## 5. Character silhouette rules
Each hero recognizable at 25% scale: Blitz (forward lean + streak), Nova (wide cape), Grim (heavy rounded), Echo (thin, double outline), Volt (angular + halo). Colors differ, but silhouette does the work.

## 6. Enemy and boss readability
Enemies: dominant shape, one eye/focus point, single attack color. Telegraphs: shape on the ground/air, ≥ 0.5 s, accompanied by a sound. Bosses: weak points glow in the pink-cyan pair, hazards in warm warning. Never overlap a telegraph with similar-valued background.

## 7. Background parallax
4–5 layers per chapter; slow movement; fog layers shift with player speed; reduced-motion setting freezes background drift.

## 8. Glitch and distortion effects
Restricted use: Seam crossing, Corruptor, gravity-zone edges, Division Log. Duration ≤ 0.3 s; no full-screen flicker; `Settings.reduced_effects` replaces with soft fade. No flashes above 3 per second.

## 9. VFX for abilities
Dash: cyan streak + brief afterimages. Flight: pink particle trail. Shield: violet hex bubble. Veil: expanding thin ring that thins background. Hack: blue lines connecting to target. Pulse: white ring.

## 10. Echo Trace visual language
Translucent cyan silhouette with a brighter outline; Origin Mark = small cyan diamond; recording = thin timer ring around the character; hold phase = slow pulse; dissolve = pixel-fade. A trace never looks like an enemy or a player.

## 11. Menus, HUD, dialogue, indicators
- HUD: Integrity (3 pips, top-left), hero portrait + ability ring (bottom-left), Trace state icon (bottom-center), Noise Meter (top-center, only when relevant).
- Puzzle indicators: plate countdown rings, Sync Window arc, link lines for portals.
- Dialogue: small bubble near the speaker, speaker-colored border, ≤ 2 lines.
- Menus: Continue, New Game, Chapters, Settings, Credits.

## 12. Typography and iconography
A readable sans-serif for UI; a distinct display face for titles `[VERIFY font license and web-font / WOFF2 redistribution terms before choosing]`. Icons: simple geometric, one stroke weight, shape-coded (circle = ability, square = switch, triangle = hazard, diamond = trace).

## 13. Sound design and music
- Music: ambient, slow, layered, with sparse melodic motifs; chapter timbres — Ch1 digital pulse, Ch2 airy pads, Ch3 low drones + sparse percussion, Ch4 glass/reverse tones, Ch5 convergence of all motifs.
- Music states: explore, tension (enemy/noise), boss, resolution; cross-fades only via Web Audio API GainNodes.
- SFX: footstep sets per surface (they determine noise feel), ability whooshes, plate clicks, door sweeps, Trace record/launch/dissolve cues.
- Audio cues for hazards: rising tone for telegraph, descending on expiry. Every cue paired with a visual cue.
- Browser Audio Buses: Master, Music, SFX, Ambience, UI gain nodes routed into destination. AudioContext starts suspended until unlocked by initial user gesture (start overlay).

## 14. Accessibility settings (visual/audio alternatives)
Colorblind variants for cyan/pink/warm; high-contrast outlines; reduce glitch; reduce parallax; subtitles for all voice-like cues; visual noise ripples for audio; independent volume sliders for all audio buses; screen-shake slider; respects `prefers-reduced-motion` and `prefers-contrast` system media queries.

## 15. Asset naming and export conventions
`<category>_<chapter>_<name>_<variant>_<frame>.png` (or `.webp` for web payload optimization), e.g. `env_ch01_platform_broken_a.png`; audio `sfx_<name>_<nn>.ogg` with `.mp3` fallbacks for older Safari versions, `mus_<chapter>_<state>.ogg`. Lowercase, underscores. Source files (`.aseprite`/`.kra`) kept in `art_src/` outside the web distribution bundle. Sprite atlases and JSON metadata generated during Vite build step.

## 16. First assets for the Chapter 1 vertical slice

| Category | Asset | Source plan |
|---|---|---|
| Hero | Blitz sprite set (idle/run/jump/fall/dash/hurt/pulse/interact) | Original (placeholder first) |
| Echo | Echo (stretch) idle/veil | Original |
| Trace | Ghost shader/outline, Origin Mark, timer ring | Original |
| Environment | Circuit tileset (floor, walls, one-way), broken block platforms, code-rain, fog layers | Original or licensed `[VERIFY]` |
| Interactables | Plate, door, pylon, Beacon, terminal | Original |
| Enemies | Memory Sentry, Corruptor (sprite sheet) | Original |
| VFX | Dash streak, Pulse ring, Seam glyph, glitch (soft) | Original |
| UI | Pips, ability ring, trace icon, dialogue bubble | Original |
| Audio | 1 ambient loop, 1 boss loop (proposal), footsteps, jump/land, dash, plate, door, trace cues, Corruptor cues | Original or licensed `[VERIFY]` |

Rule: graybox with placeholders until M4 exit; do not produce volume art before the M3 Trace prototype passes.
