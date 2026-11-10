# ECHOES: Official UI Integration Audit

**Document Reference:** UI-AUDIT-01  
**Project:** ECHOES: The Things We Chose to Forget  
**Branch:** `feat/ui-integration-web-pwa`  
**Date:** November 2026

---

## 1. Archives Inspected

| Archive File | Size | Destination | Platform Target | Design Archetype |
|---|---|---|---|---|
| `docs/echoes_web_ui.zip` | 148,819 KB (uncompressed) | `temp_ui_inspect/web` | Modern Desktop Web Browsers (>= 1024px) | Cinematic Archival Folio, 12-column editorial asymmetric grid, deep ink void & warm ivory/gold accents |
| `docs/echoes_mobile_ui.zip` | 74,923 KB (uncompressed) | `temp_ui_inspect/mobile` | Mobile-First Progressive Web App (PWA) | Mobile tab navigation, touch-action bar (Veil Sight, Trace, Pulse), diegetic HUD with SVG Echo Ring |

Both archives originate from the Stitch Echoes Cinematic UI System and are preserved in `docs/` as the design authority.

---

## 2. Technologies & Original Dependencies Discovered

- **Design System Tokens:** Defined in `DESIGN.md` in both archives.
  - Base theme: Void Navy `#0f1225`, Dark Surface Container `#171a2e` / `#1b1e32`, Amber Gold Accent `#dcc39b`, Mist Sage `#bdcabb`, Cool Ink Text `#dfe1fc`.
  - Typography: `Playfair Display` (editorial serif titles) and `Inter` (neutral data, transcripts, HUD telemetry).
  - Icons: Google Material Symbols Outlined.
- **Original Format:** High-fidelity HTML prototypes with Tailwind CSS utility classes and vanilla ECMAScript DOM controllers.
- **Integration Strategy:** Integrated directly into the existing Vite + TypeScript engine via `@tailwindcss/postcss` and a centralized reactive `GameStateManager` (`src/core/GameState.ts`).

---

## 3. Screen Inventory & Integration Mapping

| Screen / Feature | Web Implementation (`src/ui/screens/web/`) | Mobile PWA Implementation (`src/ui/screens/mobile/`) | Interactive State Connection |
|---|---|---|---|
| **Prologue / Title** | `WebPrologueScreen.ts` | `MobilePrologueScreen.ts` | Navigates to HUD, Chapter selection; displays acoustic drift telemetry |
| **Chapters** | `WebChaptersScreen.ts` | `MobileChaptersScreen.ts` | Displays 5 canonical chapter folios, restoration progress, shard count, and selects active chapter |
| **Archive Records** | `WebArchiveScreen.ts` | `MobileArchiveScreen.ts` | Inspects photographic plates, reads inscribed quotes, reviews restoration fidelity percentages |
| **Resonance HUD** | `WebHUDScreen.ts` | `MobileHUDScreen.ts` | Mounts active Canvas 2D engine into `#gameplay-viewport`, binds Echo Trace ring/buffer bar, integrity pips, and pause toggle |
| **Archival Ledger** | `WebLedgerScreen.ts` | `MobileLedgerScreen.ts` | Displays real-time remnant counters, attunement depth, and local consent prompt |

---

## 4. Asset Inventory & Provenance

All external artwork dependencies were localized into the project build under `public/assets/ui/` to ensure offline PWA compliance:
- `departure_gate.jpg`: Chapter 1 / Fragment #018 Departure Gate
- `clockwork_clearing.jpg`: Chapter 2 / Clockwork Clearing
- `sunken_bell.jpg`: Chapter 3 / Sunken Colonnade
- `archive_fragment_42.jpg`: Chapter 4 / Fragment #042 Vault of Surrender
- `prologue_traveler.jpg`: Prologue Cinematic Atmospheric Background
- `hud_gameplay_scene.jpg`: Cinematic viewport backdrop
- `echoes_emblem.png`: Official archival fragment emblem & PWA icon
- `mobile_avatar.jpg`: Archivist identity portrait

---

## 5. Web & PWA Architecture

- **Single Engine, Two Experiences:**
  - `src/sim/`: Pure TypeScript simulation (discrete 60 Hz integer ticks). Strictly isolated from DOM and Canvas.
  - `src/core/GameState.ts`: Shared reactive state holding player remnants, integrity pips, active whisper, chapter progress, and trace buffer state.
  - `src/ui/UIRouter.ts`: Screen router dynamically switching between Desktop Web (sidebar + top header) and Mobile PWA (app header + bottom navigation tabs) with an instant viewport preview toggle.
  - `src/ui/components/UIEchoController.ts`: Synchronizes the diegetic Echo Ring and buffer bar with fixed-frequency trace cycles.
  - `public/manifest.webmanifest` & `public/sw.js`: PWA web manifest and service worker providing offline application shell caching.

---

## 6. Components Reused vs. Adapted

- **Reused:** Complete color palette, typography hierarchy, SVG icon sets, diegetic HUD overlays, folio quotes, and layout geometry.
- **Adapted:** Converted static inline prototype scripts into strongly-typed TypeScript screen modules; bound all interactive buttons to `globalGameState`; replaced external CDN image URLs with local bundled assets; reparented the running HTML5 Canvas element into the diegetic gameplay viewports.
- **Deferred / Pending:** Audio playback via Web Audio API (M3/M4); full AABB physics player collision (M2).

---

## 7. Quality & Verification Summary

- `npm run typecheck`: Passed (zero TypeScript errors).
- `npm run lint`: Passed (ESLint clean).
- `npm run test`: Passed (18/18 tests passing across 5 test suites).
- `npm run build`: Passed (clean Vite production bundle generated).
