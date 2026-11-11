# ECHOES — UI Interaction Inventory

**Milestone:** M4.6 UI Functionality & Interaction Polish  
**Audit Date:** 2026-11-11  
**Source of Truth:** `docs/reference_ui/web/` & `docs/reference_ui/mobile/`  

---

## 1. Top Navigation & App Bars

| Screen / Area | Component Name | Web Implementation | Mobile Implementation | Current Behavior | Expected Behavior | Event / State Connection | Status | Defect Discovered |
|---|---|---|---|---|---|---|---|---|
| Global Header | Brand Logo / Title (`#brand-home-btn`) | Header click | App Bar click | Navigates to `prologue` | Navigates to `prologue` | `UIRouter.navigate('prologue')` | PASS | None |
| Global Header | Whisper Display | Text header with ledger tag | Sub-header banner | Shows `state.activeWhisper` | Displays active narrative whisper | `GameState.activeWhisper` | PASS | Static text unless updated by game |
| Global Header | Top Navigation Links (`[data-route]`) | Prologue, Archive, Chapters, HUD, Ledger | Bottom navigation tabs | Switches current route | Switches screen smoothly with active styles | `UIRouter.navigate(route)` | PASS | Needs Settings access shortcut |
| Global Header | Remnants Display | Badge showing total remnants | Badge in header bar | Renders numeric counter | Real-time counter from game state | `GameState.remnants` | PASS | None |
| Global Header | Experience Mode Toggle (`#toggle-experience-mode`) | "Mobile View" button | "Web" button | Toggles web <-> mobile mode | Seamlessly swaps presentation modes | `UIRouter.setMode()` | PASS | None |
| Global Header | Archivist Avatar & Profile | Avatar circle & status | Profile avatar with indicator | Decorative display | Can open Settings/Profile modal | Needs event listener | PARTIAL | Clicking avatar did nothing |

---

## 2. Prologue / Title Screen

| Component Name | Web Implementation | Mobile Implementation | Current Behavior | Expected Behavior | Event / State Connection | Status | Defect Discovered |
|---|---|---|---|---|---|---|---|
| Start / Begin Button | `#begin-remembering-btn` | `#btn-enter-recollection` | Navigates to `hud` | Starts gameplay session & resets/loads state | `UIRouter.navigate('hud')` | PASS | Working; can hook into save load |
| Keyboard Start | Spacebar listener on window | N/A | Navigates to `hud` | Starts gameplay on Space key press | Keydown listener | PASS | None |
| Poetic Marginalia / Narrative Cycle | `#prologue-quote` | `#narrative-cycle-box` | Static quote (Web) / Interactive cycle (Mobile) | Clicking cycles poetic fragments | Quote state array | PARTIAL | Web quote was non-interactive; Mobile had cycle |
| Acoustic Waveform / Resonance Toggle | `#waveform-toggle-btn` | N/A | Toggles "TETHERED" / "RESONATING" | Modulates sound/music drift | SoundService / UI state | PASS | Working visual feedback |
| Navigation Bento Cards | `[data-route="chapters"]`, `[data-route="archive"]` | Two grid buttons | Navigates to chapters / archive | Direct route jumps | `UIRouter.navigate()` | PASS | None |
| Whisper Toast Notification | N/A | `#whisper-banner` + `#btn-close-whisper` | Dismisses banner | Dismisses and awards remnant | DOM event | PASS | Works smoothly |
| Active Resonance Focal (Mobile) | N/A | `#lens-preview-box` | Navigates to `hud` | Navigates directly into active chapter | `UIRouter.navigate('hud')` | PASS | None |

---

## 3. Chapter Selection Screen

| Component Name | Web Implementation | Mobile Implementation | Current Behavior | Expected Behavior | Event / State Connection | Status | Defect Discovered |
|---|---|---|---|---|---|---|---|
| Chapter Cards | `.chapter-card` (`data-chapter`) | `article[data-chapter]` | Click opens `hud` | Opens gameplay with selected chapter | `UIRouter.navigate('hud')` | PASS | Works |
| Enter Chapter Buttons | `#enter-chapter-01` etc. | `button[data-action="play"]` | Navigates to `hud` | Starts simulation for level | `UIRouter.navigate('hud')` | PASS | Works |
| Chapter Filters | `.chapter-filter-btn` (All, Restored, Dormant) | N/A | Filters cards by data-status | Toggles card display | DOM dataset filtering | PASS | Works |
| Milestone Sync Buttons | N/A | `.milestone-btn` | Displays toast notification | Records milestone & updates state | Toast DOM animation | PASS | Works |
| Audio Preview Buttons | `.audio-preview-btn` | N/A | Bounces with gold accent | Plays preview chime | `soundService` | PARTIAL | Was only visual; should play audio chime |
| Claim All Remnants Button | `#claim-all-remnants-btn` | N/A | Toggles "Synced" confirmation | Syncs all uncollected remnants | State update | PASS | Works |

---

## 4. Gameplay HUD & Viewport

| Component Name | Web Implementation | Mobile Implementation | Current Behavior | Expected Behavior | Event / State Connection | Status | Defect Discovered |
|---|---|---|---|---|---|---|---|
| Gameplay Viewport (`#gameplay-viewport`) | Mounts `canvas` element | Mounts `canvas` element | Canvas renders at 60 FPS | Living playfield with canvas | `CanvasRenderer` | PASS | Correctly mounted |
| Pause Button | ESC button / `#hud-pause-btn` | `#btn-pause` | Sets `isPaused` in GameState | Opens Pause Overlay, stops simulation | `globalGameState.setPaused()` | PARTIAL | Pauses simulation, but lacked full modal menu overlay |
| Echo Trace Indicator | `#recCounter`, `#recProgressBar` | `#echo-ring-svg`, `#echo-timer` | Updated by GameApp step | Shows live trace ticks and state | `GameState.echoTrace*` | PASS | Synchronized with pure simulation |
| Mind Integrity Display | 3 diamond glyphs | 3 stability pips | Rendered in DOM | Reflects `GameState.mindIntegrity` | `GameState.mindIntegrity` | PARTIAL | Was static in HTML template, needs dynamic sync |
| Remnants Counter | Text display in HUD | Header badge | Rendered in DOM | Reflects real collected remnants | `GameState.remnants` | PASS | Works |
| Jump Control (Mobile) | N/A | `#btn-jump` | Dispatches Space keydown/keyup | Character jumps in simulation | InputService | PASS | Works with touch |
| Veil Sight Control (Mobile) | N/A | `#btn-recall` | Dispatches KeyQ keydown/keyup | Activates Veil Sight in simulation | InputService | PASS | Works with touch & progress bar |
| Echo Trace Cast | `#btnEchoCast` | `#btn-activate-echo` | Dispatches KeyF keydown/keyup | Records or casts Echo Trace | Simulation trace system | PASS | Works |
| Simulation State Debug Buttons | `.state-btn` | `.hud-state-btn` | Selects active pill | Switches test emulation states | State harness | PASS | Visual toggle works |

---

## 5. Memory Archive Screen

| Component Name | Web Implementation | Mobile Implementation | Current Behavior | Expected Behavior | Event / State Connection | Status | Defect Discovered |
|---|---|---|---|---|---|---|---|
| Category Filter Tabs | `.filter-tab` (All, Manuscripts, Relics, Acoustics) | `.filter-pill` | Filters cards by category | Shows matching entries | DOM dataset filtering | PASS | Works |
| Search Input | `#archive-search-input` | N/A | Live search text filter | Hides non-matching items | Input event | PASS | Works |
| Inscription Redaction Reveals | `#redacted-1`, `#redacted-2` | `.redaction-tag` | Unblurs text & updates bar | Reveals truth & updates attunement % | DOM click | PASS | Works |
| Clarify All Button | `#clarify-all-btn` | N/A | Reveals all redactions | 100% attunement status | DOM click | PASS | Works |
| Attune Relic Button | `.decode-btn` | N/A | Plays attuning animation | Attunes relic and saves | DOM click | PASS | Works |
| Fragment Detail Modal | N/A (planned) | N/A (planned) | Fragment card click | Opens reading modal for transcript | Modal component | PARTIAL | Needs full overlay modal on card click |

---

## 6. Remnant Ledger & Diagnostics

| Component Name | Web Implementation | Mobile Implementation | Current Behavior | Expected Behavior | Event / State Connection | Status | Defect Discovered |
|---|---|---|---|---|---|---|---|
| Filter Tabs | `.filter-tab` (All, Fragments, Beacons, Secrets) | `.filter-tab-btn` | Filters ledger items | Toggles event visibility | DOM dataset filtering | PASS | Works |
| Simulate Earn Button | `#btn-simulate-earn` | `#btnSimulate` | Adds new row & +25 remnants | Increments tally and prepends row | DOM + State | PASS | Works |
| Toggle Offline Button | `#btn-toggle-offline` | `#btnOffline` | Swaps status between Synced & Desynced | Emulates offline queue | DOM state | PASS | Works |
| Clear Ledger View Button | `#btn-clear-ledger` | `#btnClear` | Replaces stream with pruned notice | Clears UI cache safely | DOM mutation | PASS | Safe; does not wipe save data |
| Test Harness Button | `#btn-trigger-harness` | N/A | Injects verified JSON payload | Runs verification suite emulation | DOM mutation | PASS | Works |
| Configuration Export | N/A | N/A | Planned | Exports telemetry as JSON file | Blob download | PARTIAL | To be added for fullIndie game feel |

---

## 7. Modal & Settings Systems

| Component Name | Web Implementation | Mobile Implementation | Current Behavior | Expected Behavior | Event / State Connection | Status | Defect Discovered |
|---|---|---|---|---|---|---|---|
| Pause Menu Overlay | Missing full modal | Missing full modal | Pauses game loop only | Displays Resume, Restart, Settings, Title | `globalGameState.isPaused` | PARTIAL | Need official pause modal overlay |
| Settings Modal | Missing | Missing | N/A | Audio volumes, mute, motion, controls | Settings state | NOT IMPLEMENTED | Requires modal UI |
| Reading Modal (Archive) | Missing | Missing | N/A | Expands fragment reading view | Selected fragment | PARTIAL | Need accessible modal dialog |
