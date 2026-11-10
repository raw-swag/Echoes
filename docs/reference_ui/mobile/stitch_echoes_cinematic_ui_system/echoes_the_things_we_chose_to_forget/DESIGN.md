---
name: 'Echoes: The Things We Chose to Forget'
colors:
  surface: '#0f1225'
  surface-dim: '#0f1225'
  surface-bright: '#35384d'
  surface-container-lowest: '#090d20'
  surface-container-low: '#171a2e'
  surface-container: '#1b1e32'
  surface-container-high: '#25293d'
  surface-container-highest: '#303349'
  on-surface: '#dfe1fc'
  on-surface-variant: '#c7c5cd'
  inverse-surface: '#dfe1fc'
  inverse-on-surface: '#2c2f44'
  outline: '#919097'
  outline-variant: '#46464c'
  surface-tint: '#c4c5da'
  primary: '#c4c5da'
  on-primary: '#2d2f40'
  primary-container: '#111322'
  on-primary-container: '#7c7d90'
  inverse-primary: '#5c5d6f'
  secondary: '#dcc39b'
  on-secondary: '#3d2e12'
  secondary-container: '#584628'
  on-secondary-container: '#cdb58e'
  tertiary: '#bdcabb'
  on-tertiary: '#283329'
  tertiary-container: '#0c160d'
  on-tertiary-container: '#768275'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e1f6'
  primary-fixed-dim: '#c4c5da'
  on-primary-fixed: '#191a2a'
  on-primary-fixed-variant: '#444657'
  secondary-fixed: '#f9dfb6'
  secondary-fixed-dim: '#dcc39b'
  on-secondary-fixed: '#261902'
  on-secondary-fixed-variant: '#554426'
  tertiary-fixed: '#d9e6d7'
  tertiary-fixed-dim: '#bdcabb'
  on-tertiary-fixed: '#141e15'
  on-tertiary-fixed-variant: '#3e4a3e'
  background: '#0f1225'
  on-background: '#dfe1fc'
  surface-variant: '#303349'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.01em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: -0.005em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0.01em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.12em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a quiet, atmospheric aesthetic centered on narrative recovery, loss, and archival recollection. It draws from cinematic dark minimalism and editorial publishing rather than traditional game interface conventions. The visual tone evokes private journals, dim memory chambers, and restored artifacts.

### Key Characteristics
- **Cinematic Dark Minimalism**: The canvas avoids aggressive game-HUD aesthetics, opting for breathing room, measured negative space, and disciplined typography.
- **Archival Tactility**: Visual elements borrow cues from preserved manuscripts, aged records, and archival mounting without becoming cartoonishly distressed.
- **Editorial Subtlety**: High-contrast, elegant serif headlines paired with utilitarian body typography anchor the narrative weight.
- **Restraint Over Spectacle**: No bloom, neon luminescence, or arcade flare. Every surface is matte, grounded, and physically plausible within an ink-and-parchment context.

## Colors

The palette is tuned around deep archival ink tones, worn paper whites, and faded mineral pigments. It enforces an introspective, low-glare visual hierarchy.

- **Deep Ink (`#111322`) & Void Navy (`#0B0C1F`)**: Serve as base canvas surfaces and deep void containers.
- **Forgotten Indigo (`#25263F`) & Muted Slate (`#41445A`)**: Form structural tiers, elevated panels, card backgrounds, and hairline delimiters.
- **Faded Gold (`#A18B67`)**: Reserved for narrative anchors, recovered remnants, selected states, and core currency. It remains strictly matte and muted, avoiding golden gloss or bright yellow flares.
- **Muted Sage (`#788477`) & Dusty Lavender (`#858096`)**: Auxiliary markers denoting psychological states, environmental cues, and tertiary categorization.
- **Aged Ivory (`#E8E1D5`) & Warm Paper (`#D1C6B4`)**: High-fidelity reading text, primary narrative transcriptions, and interactive focal points.
- **Memory Grey (`#AAA6A0`)**: Structural metadata, timestamps, disabled nodes, and catalog indexing labels.

## Typography

The typographic hierarchy balances literary reflection with pragmatic clarity.

- **Playfair Display**: Used for chapters, journal headers, memory titles, and narrative revelations. It should always be set with generous line heights to preserve an open, unhurried literary cadence.
- **Inter**: Provides clean, functional execution for game systems, item inventories, transcript text, dialog choice mechanics, and ledger readings.
- **Labeling Rules**: All functional labels (`label-md`, `label-sm`) are rendered in uppercase with expanded letter-spacing to evoke archival cataloging and indexed records.

## Layout & Spacing

The interface employs a disciplined 12-column grid on desktop and tablet displays, collapsing to a single-column or 4-column flow on mobile viewports.

### Architectural Rules
- **Canvas Discipline**: Outer margins remain intentionally wide (`margin: 3rem`) to frame narrative screens like pages within an open archival folio.
- **Rhythmic Gaps**: Content groups utilize fixed multiples of `0.25rem`. Section separators and panel enclosures rely on vertical negative space rather than heavy structural dividers.
- **Asymmetry**: Key narrative dossiers, dialogue trees, and memory artifacts are intentionally offset from center-alignment to suggest hand-placed historical documents.

## Elevation & Depth

Depth is established through subtle tonal stratification and soft low-opacity outlines, strictly avoiding harsh drop shadows or luminous halos.

### Visual Layering
- **Layer 0 (Canvas)**: Background surface set to Void Navy (`#0B0C1F`) or Deep Ink (`#111322`).
- **Layer 1 (Substratum Panels)**: Forgotten Indigo (`#25263F`) applied to dossiers, side drawers, and memory containers.
- **Layer 2 (Raised Artifacts)**: Muted Slate (`#41445A`) surfaces for inspectable items, dialogue choice boxes, and modal plates.
- **Outlines & Delimiters**: 1px structural borders tinted with Muted Slate (`#41445A`) at 40%–60% opacity. For selected memory fragments, outlines shift to Faded Gold (`#A18B67`) at 50% opacity.
- **Shadow Treatment**: Minimal, wide-diffusion contact shadows (`rgba(5, 6, 15, 0.45)` with 24px blur and 0px spread) are used only when an interactive document floats over existing narrative prose.

## Shapes

The design system enforces a soft, near-square boundary radius (`roundedness: 1`), evoking trimmed bond paper, slides, and vintage filing cards.

- **Base Elements**: Buttons, inputs, and interactive tags use a 0.25rem (4px) corner radius.
- **Cards & Modals**: Larger dossiers and narrative cards scale up to `rounded-lg` (0.5rem / 8px).
- **No Full Rounded Pills**: Pill shapes are prohibited to maintain the serious, archival character of the interface.
- **Edge Detailing**: Key archival documents may feature clean, straight-edged 45-degree corner notches (2px to 4px) for special recovered items.

## Components

### Buttons & Interactive Choices
- **Primary Action**: Background of Forgotten Indigo (`#25263F`), 1px border of Faded Gold (`#A18B67`), text in Aged Ivory (`#E8E1D5`). Hover states subtly brighten the border opacity and tint the background toward Muted Slate (`#41445A`).
- **Secondary / Ghost Action**: Transparent fill, 1px border of Muted Slate (`#41445A`), text in Warm Paper (`#D1C6B4`).
- **Dialogue Choice Prompt**: Left-aligned, quiet typographic buttons preceded by a subtle em-dash or catalog index (`01`, `02`). Hovering fades in a delicate Faded Gold indicator on the left margin.

### Cards & Narrative Dossiers
- Bound by a 1px border of Muted Slate (`#41445A`) over Forgotten Indigo (`#25263F`).
- Padding is generous (`space-lg` to `space-xl`).
- Headings are set in `headline-sm` (Playfair Display), paired with `body-sm` (Inter) for accompanying archival metadata.

### Chips & Remnant Tags
- Compact tags for classifying memories, locations, or psychological resonance.
- 0.25rem radius, padded with `space-xs` vertically and `space-sm` horizontally.
- Rendered in deep ink tones with uppercase `label-sm` typography in Memory Grey (`#AAA6A0`) or Faded Gold (`#A18B67`).

### Input Fields & Search Ledgers
- Flat surfaces in Void Navy (`#0B0C1F`) with a recessed 1px outline in Muted Slate (`#41445A`).
- Placeholder text set in Memory Grey (`#AAA6A0`) with an italic tint.
- Focus state gently illuminates the border with a matte Faded Gold (`#A18B67`) without glow or focus rings.

### Checkboxes & Segmented Toggles
- Custom square markers with a 0.25rem corner radius.
- Checked state fills with Forgotten Indigo (`#25263F`) and displays an inner Faded Gold accent pip.

### Currency & Remnant Counter
- Displayed as an understated persistent ledger component.
- Numerical values use `title-md` in Faded Gold (`#A18B67`), accompanied by a muted archival label in `label-sm` (Memory Grey).