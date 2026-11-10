import { GameStateModel } from '@core/GameState';

export function renderWebArchive(
  _state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<main class="relative pt-20 bg-background min-h-screen"><div class="flex flex-col w-full">
<!-- Archival Context Atmospheric Underglow -->
<div class="relative w-full px-margin py-space-xl flex flex-col gap-space-xl">
<!-- Top Dossier Meta Bar & Vault Sub-header -->
<header class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg pb-space-lg">
<div class="flex flex-col max-w-2xl gap-space-xs">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary bg-surface-container-high px-space-sm py-space-xs rounded">Folio Section VIII</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">Registry Hash: 0x88F-VOID</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-secondary-fixed tracking-tight">Archive 08 — Vault of Surrender</h1>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Recovered remnants from the flooded terrace. Handle with care; paper brittle and ink prone to fading under uncalibrated light.
        </p>
</div>
<!-- Archival Tabs Filter -->
<nav aria-label="Archive Classification" class="flex flex-wrap items-center gap-space-xs p-space-xs rounded bg-surface-container-low shadow-sm">
<button class="filter-tab active font-label-md text-label-md uppercase px-space-md py-space-sm rounded bg-surface-container-high text-secondary transition-all flex items-center gap-space-xs">
<span>All Shards</span>
<span class="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-lowest text-secondary-fixed">18</span>
</button>
<button class="filter-tab font-label-md text-label-md uppercase px-space-md py-space-sm rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-space-xs">
<span>Photographs</span>
<span class="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant">7</span>
</button>
<button class="filter-tab font-label-md text-label-md uppercase px-space-md py-space-sm rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-space-xs">
<span>Recorded Whispers</span>
<span class="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant">5</span>
</button>
<button class="filter-tab font-label-md text-label-md uppercase px-space-md py-space-sm rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-space-xs">
<span>Letters</span>
<span class="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant">6</span>
</button>
</nav>
</header>
<!-- 2-Column Archival Inspection Workbench -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
<!-- LEFT COLUMN: Main Focused Fragment #042 (8 Cols) -->
<section class="lg:col-span-8 flex flex-col gap-space-lg bg-surface-container-low p-space-xl rounded-xl shadow-xl relative overflow-hidden">
<!-- Subtle Archive Paper Texture & Watermark -->
<div class="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>
<div class="absolute right-8 top-8 opacity-10 select-none pointer-events-none">
<span class="material-symbols-outlined text-[140px] text-secondary">token</span>
</div>
<!-- Specimen Index Header -->
<div class="flex flex-wrap items-center justify-between gap-space-md">
<div class="flex items-center gap-space-md">
<span class="font-headline-sm text-headline-sm text-secondary-fixed">FRAGMENT #042</span>
<span class="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase bg-surface-container-highest px-space-sm py-space-xs rounded">Plate 042-A</span>
</div>
<div class="flex items-center gap-space-sm font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase">
<span class="material-symbols-outlined text-[16px] text-error">visibility_off</span>
<span>DATED: [ ERASED ]</span>
<span class="text-on-surface-variant/40">// SPECIMEN IMMERSED</span>
</div>
</div>
<!-- Archival Photographic Plate Container with Vintage Polaroid Mount -->
<div class="relative bg-surface-container-highest p-space-md rounded shadow-inner flex flex-col gap-space-md group">
<!-- Archival Tape / Mounting Tabs at Corners -->
<div class="absolute -top-2 left-6 w-12 h-4 bg-secondary-fixed-dim/20 backdrop-blur-sm -rotate-2 rounded-xs shadow-xs z-10 pointer-events-none"></div>
<div class="absolute -top-2 right-8 w-14 h-4 bg-secondary-fixed-dim/20 backdrop-blur-sm rotate-3 rounded-xs shadow-xs z-10 pointer-events-none"></div>
<!-- The Artifact Image Frame -->
<div class="relative w-full h-[420px] rounded overflow-hidden bg-surface-container-lowest">
<img class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]" data-alt="A moody atmospheric archival photograph from an expedition in the mist. A lone cloaked wanderer stands amongst ancient moss-choked pines beside a sunken marble colonnade. Low dynamic range, faint silver halide grain, weathered emulsion scratches, pinhole light leak at the top-left edge, monochromatic twilight tones with deep sepia shadow accents and damp fog." src="/assets/ui/sunken_bell.jpg"/>
<!-- Vignette & Pinhole Specimen Overlay -->
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80 pointer-events-none"></div>
<div class="absolute inset-0 bg-radial from-transparent via-transparent to-surface-container-lowest/70 pointer-events-none"></div>
<!-- Archival Coordinate Stamp & Exposure Meta -->
<div class="absolute top-4 left-4 bg-surface-container-lowest/80 backdrop-blur-md px-space-sm py-space-xs rounded flex items-center gap-space-xs">
<span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
<span class="font-label-sm text-label-sm text-secondary tracking-widest uppercase text-[9px]">Terrace North-By-West // Exp. 0.04s</span>
</div>
<!-- Pinhole Stamp Motif Bottom Left -->
<div class="absolute bottom-4 left-4 flex items-center gap-space-sm text-on-surface-variant/80 bg-surface-container-lowest/80 backdrop-blur-md px-space-sm py-space-xs rounded">
<span class="material-symbols-outlined text-[14px] text-secondary">filter_vintage</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-[9px]">Silver Emulsion Retained</span>
</div>
</div>
<!-- Handwritten / Inscribed Folio Caption -->
<div class="px-space-md py-space-xs flex items-center justify-between">
<p class="font-headline-sm text-headline-sm italic text-secondary-fixed tracking-wide font-normal">
              “We left it where sunlight couldn't find it.”
            </p>
<span class="font-label-sm text-label-sm text-on-surface-variant/60 tracking-widest uppercase">Note #14</span>
</div>
</div>
<!-- Restoration Fidelity Diagnostic Bar -->
<div class="flex flex-col gap-space-xs bg-surface-container p-space-md rounded">
<div class="flex items-center justify-between font-label-sm text-label-sm">
<span class="text-secondary tracking-widest uppercase flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[14px]">timelapse</span>
              Restoration Fidelity
            </span>
<span class="text-secondary font-semibold" id="fidelity-percent">85% RESTORED</span>
</div>
<div class="w-full h-1.5 bg-surface-container-lowest rounded overflow-hidden">
<div class="h-full bg-secondary transition-all duration-1000 ease-out" id="fidelity-bar" style="width: 85%;"></div>
</div>
<div class="flex justify-between items-center text-[10px] text-on-surface-variant/70 font-label-sm uppercase pt-1">
<span>Sub-lattice: Stabilized</span>
<span>Unresolved Phrasing: 2 Nodes</span>
</div>
</div>
<!-- Interactive Restored Transcript Dossier -->
<div class="flex flex-col gap-space-sm bg-surface-container-high/60 p-space-lg rounded">
<div class="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<span class="flex items-center gap-space-xs text-secondary">
<span class="material-symbols-outlined text-[15px]">description</span>
              Linguistic Decryption
            </span>
<span class="text-on-surface-variant/50">Audio/Parchment Hybrid Specimen</span>
</div>
<blockquote class="font-body-lg text-body-lg text-on-surface leading-loose relative pl-space-md">
            The silver latch gave way under salt-crust. Inside the chamber, the brass key lay resting upon the cold sill, untouched since 
            
            <!-- Redacted Block 1 -->
<button class="group inline-flex items-center mx-1 px-2 py-0.5 rounded bg-surface-container-lowest hover:bg-secondary-container transition-colors cursor-pointer select-none" id="redacted-1" onclick="clarifyRedaction(1)">
<span class="font-label-sm text-label-sm text-secondary/40 group-hover:text-secondary tracking-widest font-mono">[REDACTED: THE SURGE]</span>
</button>
            
            claimed the eastern causeway. A scent of dried 
            
            <!-- Redacted Block 2 -->
<button class="group inline-flex items-center mx-1 px-2 py-0.5 rounded bg-surface-container-lowest hover:bg-secondary-container transition-colors cursor-pointer select-none" id="redacted-2" onclick="clarifyRedaction(2)">
<span class="font-label-sm text-label-sm text-secondary/40 group-hover:text-secondary tracking-widest font-mono">[REDACTED: HYACINTH]</span>
</button>
            
            still clung to the velvet lining.
          </blockquote>
</div>
<!-- Archival Action Footer Bar -->
<div class="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
<div class="flex items-center gap-space-md">
<div class="flex items-center gap-space-xs px-space-md py-space-sm rounded bg-surface-container">
<span class="material-symbols-outlined text-[16px] text-secondary">hourglass_top</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase text-[9px] leading-tight">Decryption Price</span>
<span class="font-title-md text-title-md text-secondary leading-none">25 Remnants</span>
</div>
</div>
<div class="hidden sm:flex flex-col text-on-surface-variant text-[11px] font-body-sm">
<span>Remaining Vault Reserves: 1,408</span>
<span class="text-tertiary">Safe to decrypt without neural drift</span>
</div>
</div>
<div class="flex items-center gap-space-sm w-full sm:w-auto">
<button class="w-full sm:w-auto flex items-center justify-center gap-space-sm px-space-xl py-space-md rounded bg-surface-container-high hover:bg-surface-variant text-secondary-fixed transition-all shadow-md group" onclick="clarifyAll()">
<span class="material-symbols-outlined text-[18px] text-secondary group-hover:rotate-45 transition-transform">light_mode</span>
<span class="font-label-md text-label-md uppercase tracking-widest font-semibold">☼ Clarify Remnant</span>
</button>
</div>
</div>
</section>
<!-- RIGHT COLUMN: Uncataloged Shards & Folio Index (4 Cols) -->
<aside class="lg:col-span-4 flex flex-col gap-space-lg">
<!-- Section Header -->
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest flex items-center gap-space-xs">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Folio Vicinity Matrix
            </span>
<span class="font-label-sm text-label-sm text-error bg-surface-container-high px-space-xs py-0.5 rounded uppercase">2 Encrypted</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface">Uncataloged Shards in Vicinity</h2>
</div>
<!-- Shard Card 1: SHARD #043 [AUDIO PLATE] -->
<article class="bg-surface-container-low p-space-lg rounded-xl shadow-lg relative flex flex-col gap-space-md hover:bg-surface-container transition-colors">
<!-- Physical Tape Mark Aesthetic -->
<div class="absolute -top-2 right-8 w-12 h-3.5 bg-secondary-fixed-dim/20 backdrop-blur-xs -rotate-1 rounded-xs pointer-events-none"></div>
<div class="flex items-start justify-between">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-title-md text-title-md text-secondary-fixed">SHARD #043</span>
<span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-highest px-space-xs py-0.5 rounded">[AUDIO PLATE]</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest mt-0.5">Origin: Sub-Aqueduct II</span>
</div>
<div class="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[18px]">graphic_eq</span>
</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant italic">
            “Heard near the second water basin... low vibration resembling rhythmic chime strikes before the silt rose.”
          </p>
<!-- Audio Waveform Visualization (Inline Vector) -->
<div class="w-full bg-surface-container-lowest p-space-sm rounded flex items-center gap-1 h-10 overflow-hidden">
<div class="w-1 h-2 bg-secondary/40 rounded-full"></div>
<div class="w-1 h-4 bg-secondary/50 rounded-full"></div>
<div class="w-1 h-6 bg-secondary rounded-full"></div>
<div class="w-1 h-8 bg-secondary rounded-full animate-pulse"></div>
<div class="w-1 h-3 bg-secondary/60 rounded-full"></div>
<div class="w-1 h-5 bg-secondary rounded-full"></div>
<div class="w-1 h-7 bg-secondary rounded-full"></div>
<div class="w-1 h-2 bg-secondary/30 rounded-full"></div>
<div class="w-1 h-4 bg-secondary/60 rounded-full"></div>
<div class="w-1 h-6 bg-secondary/80 rounded-full"></div>
<div class="w-1 h-3 bg-secondary/40 rounded-full"></div>
<div class="w-1 h-7 bg-secondary rounded-full"></div>
<div class="w-1 h-5 bg-secondary/70 rounded-full"></div>
<div class="w-1 h-2 bg-secondary/30 rounded-full"></div>
<div class="w-1 h-4 bg-secondary/50 rounded-full"></div>
<div class="w-1 h-3 bg-secondary/30 rounded-full"></div>
<div class="w-1 h-1 bg-secondary/20 rounded-full"></div>
<div class="w-1 h-4 bg-secondary/50 rounded-full"></div>
</div>
<div class="flex items-center justify-between pt-space-xs">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sync: 12 Remnants</span>
<button class="px-space-md py-space-xs rounded bg-surface-container-high hover:bg-secondary-container hover:text-secondary-fixed text-secondary font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-space-xs" onclick="simulateDecode(this, 'SHARD #043')">
<span class="material-symbols-outlined text-[14px]">lock_open</span>
<span>Decode</span>
</button>
</div>
</article>
<!-- Shard Card 2: SHARD #044 [PARCHMENT] -->
<article class="bg-surface-container-low p-space-lg rounded-xl shadow-lg relative flex flex-col gap-space-md hover:bg-surface-container transition-colors">
<!-- Physical Archival Stamp Motif -->
<div class="absolute -top-2 left-10 w-10 h-3 bg-secondary-fixed-dim/20 backdrop-blur-xs rotate-2 rounded-xs pointer-events-none"></div>
<div class="flex items-start justify-between">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-title-md text-title-md text-secondary-fixed">SHARD #044</span>
<span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-highest px-space-xs py-0.5 rounded">[PARCHMENT]</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest mt-0.5">Found: Slate Causeway</span>
</div>
<div class="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[18px]">history_edu</span>
</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant italic">
            “Submerged between two slate steps. Salt-bleached cursive reads: 'Tell him we did not turn back until the lantern died...'”
          </p>
<!-- Micro Parchment Thumbnail Plate -->
<div class="w-full h-24 rounded bg-surface-container-lowest relative overflow-hidden flex items-center justify-center p-space-sm">
<img class="w-full h-full object-cover rounded opacity-75" data-alt="Macro archival document view of water-damaged vellum script parchment. Fine calligraphy ink washed into pale charcoal tendrils, antique torn fiber margins, delicate crackle textures, deep ink tones under cool archival laboratory illumination." src="/assets/ui/archive_fragment_42.jpg"/>
<div class="absolute inset-0 bg-surface-container-lowest/40 backdrop-blur-[0.5px]"></div>
<div class="absolute text-center flex flex-col items-center">
<span class="material-symbols-outlined text-secondary text-[20px]">water_drop</span>
<span class="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-widest text-[9px]">Moisture Damage: 44%</span>
</div>
</div>
<div class="flex items-center justify-between pt-space-xs">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sync: 18 Remnants</span>
<button class="px-space-md py-space-xs rounded bg-surface-container-high hover:bg-secondary-container hover:text-secondary-fixed text-secondary font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-space-xs" onclick="simulateDecode(this, 'SHARD #044')">
<span class="material-symbols-outlined text-[14px]">lock_open</span>
<span>Decode</span>
</button>
</div>
</article>
<!-- Preserved Historical Notes & Physical Folio Seal -->
<div class="p-space-lg rounded-xl bg-surface-container-lowest flex flex-col gap-space-sm shadow-inner relative">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[16px]">verified</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Archival Field Seal</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            All shards indexed in this drawer share resonant frequency with Ledger Registry 40. Mind tether degradation risk remains negligible under current salt-tide conditions.
          </p>
<div class="flex items-center justify-between text-[10px] text-on-surface-variant/50 font-label-sm uppercase pt-space-xs">
<span>Sealed By: Archivist 09</span>
<span>Vault 08 / Level -4</span>
</div>
</div>
</aside>
</div>
</div>
<!-- Client-side Interactive Behaviors -->
<script>
    function clarifyRedaction(id) {
      const el = document.getElementById('redacted-' + id);
      if (!el) return;
      if (id === 1) {
        el.innerHTML = '<span class="font-body-md text-body-md text-secondary-fixed font-semibold underline decoration-secondary decoration-wavy">the great flood tide</span>';
      } else if (id === 2) {
        el.innerHTML = '<span class="font-body-md text-body-md text-secondary-fixed font-semibold underline decoration-secondary decoration-wavy">mountain sage</span>';
      }
      checkFidelity();
    }

    function clarifyAll() {
      clarifyRedaction(1);
      clarifyRedaction(2);
      const bar = document.getElementById('fidelity-bar');
      const label = document.getElementById('fidelity-percent');
      if (bar && label) {
        bar.style.width = '100%';
        label.innerText = '100% RESTORED (CRYSTALLINE)';
        label.classList.add('text-tertiary');
      }
    }

    function checkFidelity() {
      const r1 = document.getElementById('redacted-1');
      const r2 = document.getElementById('redacted-2');
      const bar = document.getElementById('fidelity-bar');
      const label = document.getElementById('fidelity-percent');
      
      const done1 = !r1.innerText.includes('REDACTED');
      const done2 = !r2.innerText.includes('REDACTED');

      if (done1 && done2) {
        clarifyAll();
      } else if (done1 || done2) {
        if (bar && label) {
          bar.style.width = '92%';
          label.innerText = '92% RESTORED';
        }
      }
    }

    function simulateDecode(btn, shardName) {
      btn.disabled = true;
      btn.innerHTML = '<span class="material-symbols-outlined text-[14px] animate-spin">refresh</span><span>Deciphering...</span>';
      setTimeout(() => {
        btn.innerHTML = '<span class="material-symbols-outlined text-[14px] text-tertiary">check</span><span class="text-tertiary">Unlocked</span>';
        btn.classList.add('bg-tertiary-container');
      }, 800);
    }

    // Filter tab toggle behavior
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.filter-tab').forEach(t => {
          t.classList.remove('bg-surface-container-high', 'text-secondary');
          t.classList.add('text-on-surface-variant');
        });
        this.classList.add('bg-surface-container-high', 'text-secondary');
        this.classList.remove('text-on-surface-variant');
      });
    });
  </script>
</div></main>
`;
}

export function bindWebArchiveEvents(_onNavigate: (route: string) => void): void {
  // Interactivity for filter tags or fragment selection if present
  const tags = document.querySelectorAll('.archival-tag');
  tags.forEach((tag) => {
    tag.addEventListener('click', () => {
      tags.forEach(t => t.classList.remove('bg-surface-container-highest', 'text-secondary'));
      tag.classList.add('bg-surface-container-highest', 'text-secondary');
    });
  });
}
