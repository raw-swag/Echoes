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
<header class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg pb-space-lg border-b border-surface-container-high/60">
<div class="flex flex-col max-w-2xl gap-space-xs">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary bg-surface-container-high px-space-sm py-space-xs rounded">Folio Section VIII</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">Registry Hash: 0x88F-VOID</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-secondary-fixed tracking-tight">Archive 08 — Vault of Surrender</h1>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Recovered remnants from the flooded terrace. Handle with care; paper brittle and ink prone to atmospheric evaporation. 
          Total recovered weight: <span class="text-secondary font-semibold">1,408 Remnants</span>.
        </p>
</div>
<!-- Progress / Filter Dossier Actions -->
<div class="flex flex-col sm:flex-row items-start sm:items-center gap-space-md">
<div class="flex flex-col gap-1 min-w-[200px]">
<div class="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<span>Attunement Fidelity</span>
<span class="text-secondary font-mono" id="fidelity-percent">84% RESTORED</span>
</div>
<div class="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div class="bg-gradient-to-r from-secondary-fixed-dim via-secondary to-tertiary h-full rounded-full transition-all duration-700" id="fidelity-bar" style="width: 84%;"></div>
</div>
</div>
<button class="px-space-lg py-space-sm rounded bg-surface-container-high hover:bg-surface-bright text-secondary text-label-md font-label-md uppercase tracking-widest border border-outline-variant/30 transition-all shadow-sm flex items-center gap-space-sm cursor-pointer" id="clarify-all-btn">
<span class="material-symbols-outlined text-[16px]">visibility</span>
<span>Clarify All</span>
</button>
</div>
</header>
<!-- Categorization & Sub-filter Ribbon -->
<div class="flex flex-wrap items-center justify-between gap-space-md">
<div class="flex items-center gap-space-xs bg-surface-container-low p-1 rounded-lg">
<button class="filter-tab px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider bg-surface-container-high text-secondary transition-colors cursor-pointer" data-filter="all">All Folios (18)</button>
<button class="filter-tab px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-filter="script">Manuscripts (08)</button>
<button class="filter-tab px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-filter="artifacts">Relics (06)</button>
<button class="filter-tab px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-filter="audio">Acoustics (04)</button>
</div>
<div class="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm uppercase">
<span class="material-symbols-outlined text-[16px]">sort</span>
<span>Catalog: Index Stratum III</span>
</div>
</div>
<!-- Dual-Column Archival Layout: Selected Primary Master Plate & Catalog Cards -->
<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start">
<!-- Left Column: Primary Relic Deep-Dive Dossier (Col 1-7) -->
<section class="xl:col-span-7 flex flex-col gap-space-lg bg-surface-container-low p-space-xl rounded-xl shadow-xl border border-surface-container-high/40">
<div class="flex flex-wrap items-center justify-between gap-space-sm">
<div class="flex items-center gap-space-sm">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-mono">PLATE #042 // RECOVERED RECORD</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant font-mono">ARCHIVED: 1842.10.14</span>
</div>
<!-- Large High-Fidelity Historical Plate Image -->
<div class="relative w-full aspect-[16/10] bg-surface-container-lowest rounded-lg overflow-hidden group shadow-inner">
<img alt="Archival Relic" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]" src="/assets/ui/sunken_bell.jpg"/>
<!-- Vignette, Grain & Scratches Overlay -->
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent pointer-events-none"></div>
<div class="absolute bottom-space-md left-space-md right-space-md flex items-end justify-between pointer-events-none">
<div class="bg-surface-container-lowest/80 backdrop-blur-md px-space-md py-space-xs rounded flex flex-col">
<span class="font-label-sm text-[10px] uppercase tracking-widest text-secondary font-mono">Stratum: Submerged Colonnade</span>
<span class="font-body-sm text-body-sm text-on-surface font-serif italic">“The bell strikes only in deep frost.”</span>
</div>
<span class="bg-surface-container-high/80 backdrop-blur-md px-space-sm py-0.5 rounded font-mono text-[10px] text-on-surface-variant">DEPTH: -142m</span>
</div>
</div>
<!-- Archival Inscription & Redacted Translation Manuscript -->
<div class="flex flex-col gap-space-md">
<div class="flex items-center justify-between border-b border-surface-container-high pb-space-xs">
<h2 class="font-headline-sm text-headline-sm text-on-surface">Folio Marginalia Transcription</h2>
<span class="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">Status: 2 Redactions Clarified</span>
</div>
<!-- Narrative Prose with Interactive Clarification Highlights -->
<div class="bg-surface-container-lowest p-space-lg rounded-lg font-body-md text-body-md text-on-surface leading-relaxed flex flex-col gap-space-sm shadow-inner">
<p>
                ...we carried what could be gathered before <span class="bg-surface-container-high px-1 py-0.5 rounded text-secondary font-mono cursor-pointer hover:bg-surface-bright transition-colors select-none" id="redacted-1" title="Click to decipher glyphs">[REDACTED // INK BLOT]</span> swallowed the lower courtyard. The cedar chests were abandoned first; they were too heavy for the horses on the gravel incline. What remained were the account books, three copper plumb-lines, and a bundle of dried <span class="bg-surface-container-high px-1 py-0.5 rounded text-secondary font-mono cursor-pointer hover:bg-surface-bright transition-colors select-none" id="redacted-2" title="Click to decipher glyphs">[REDACTED // MOISTURE VOID]</span> wrapped in linen parchment...
              </p>
<p class="font-body-sm text-body-sm text-on-surface-variant/80 italic">
                “If you seek the ledger key, remember: the tide does not erase the footprints, it only fills them with salt.”
              </p>
</div>
<!-- Forensic Field Metadata Grid -->
<div class="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-xs">
<div class="p-space-sm bg-surface-container rounded flex flex-col">
<span class="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant">Material</span>
<span class="font-label-md text-label-md text-secondary mt-0.5">Vellum Parchment</span>
</div>
<div class="p-space-sm bg-surface-container rounded flex flex-col">
<span class="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant">Ink Base</span>
<span class="font-label-md text-label-md text-secondary mt-0.5">Iron Gall / Ash</span>
</div>
<div class="p-space-sm bg-surface-container rounded flex flex-col">
<span class="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant">Resonance</span>
<span class="font-label-md text-label-md text-tertiary mt-0.5">Harmonic (48Hz)</span>
</div>
<div class="p-space-sm bg-surface-container rounded flex flex-col">
<span class="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant">Folio Lock</span>
<span class="font-label-md text-label-md text-on-surface mt-0.5">Seal Broken</span>
</div>
</div>
</div>
</section>
<!-- Right Column: Secondary Folio Collection Catalog (Col 8-12) -->
<section class="xl:col-span-5 flex flex-col gap-space-md">
<!-- Search & Filter Small Utility -->
<div class="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-lg border border-surface-container-high/40">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
<input class="bg-transparent border-none text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none w-full" id="archive-search-input" placeholder="Search transcripts by keyword..." type="text"/>
</div>
<!-- Scrollable Fragment Cards Stack -->
<div class="flex flex-col gap-space-md max-h-[750px] overflow-y-auto pr-1" id="archive-items-stack">
<!-- Item Card 1: Fragment 42 -->
<article class="archive-item-card p-space-md bg-surface-container-low hover:bg-surface-container rounded-xl flex gap-space-md transition-all duration-300 shadow-md border-l-2 border-secondary group cursor-pointer" data-category="script" data-id="42">
<div class="w-24 h-24 rounded-lg bg-surface-container-lowest overflow-hidden shrink-0 relative">
<img alt="Fragment 42" class="w-full h-full object-cover rounded opacity-75 group-hover:scale-105 transition-transform" src="/assets/ui/archive_fragment_42.jpg"/>
</div>
<div class="flex flex-col justify-between flex-1 min-w-0">
<div>
<div class="flex items-center justify-between mb-0.5">
<span class="font-label-sm text-[10px] uppercase tracking-widest text-secondary font-mono">REMNANT #42</span>
<span class="font-label-sm text-[10px] text-tertiary">RESTORED</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface truncate group-hover:text-secondary transition-colors">Water-Damaged Vellum Script</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 italic">“...the names of smaller birds were lost first...”</p>
</div>
<div class="flex items-center justify-between pt-space-xs text-on-surface-variant/70 font-label-sm text-[10px]">
<span>Ch. 01 • Deep Woods</span>
<span class="text-secondary font-mono">+25 Remnants</span>
</div>
</div>
</article>

<!-- Item Card 2: Fragment 14 -->
<article class="archive-item-card p-space-md bg-surface-container-low hover:bg-surface-container rounded-xl flex gap-space-md transition-all duration-300 shadow-md border-l-2 border-surface-container-high group cursor-pointer" data-category="artifacts" data-id="14">
<div class="w-24 h-24 rounded-lg bg-surface-container-lowest overflow-hidden shrink-0 relative flex items-center justify-center">
<span class="material-symbols-outlined text-[36px] text-secondary">explore</span>
</div>
<div class="flex flex-col justify-between flex-1 min-w-0">
<div>
<div class="flex items-center justify-between mb-0.5">
<span class="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">RELIC #14</span>
<span class="font-label-sm text-[10px] text-secondary">DECIPHERING</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface truncate group-hover:text-secondary transition-colors">Brass Chrono-Astrolabe</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 italic">Mechanical compass calibrated to acoustic frequencies.</p>
</div>
<div class="flex items-center justify-between pt-space-xs">
<span class="text-on-surface-variant/70 font-label-sm text-[10px]">Ch. 02 • Clockwork</span>
<button class="decode-btn px-space-sm py-0.5 rounded bg-surface-container-high text-secondary hover:bg-secondary hover:text-on-secondary transition-all font-label-sm text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer">
<span class="material-symbols-outlined text-[12px]">key</span>
<span>Attune Relic</span>
</button>
</div>
</div>
</article>

<!-- Item Card 3: Fragment 09 -->
<article class="archive-item-card p-space-md bg-surface-container-low hover:bg-surface-container rounded-xl flex gap-space-md transition-all duration-300 shadow-md border-l-2 border-surface-container-high group cursor-pointer" data-category="audio" data-id="09">
<div class="w-24 h-24 rounded-lg bg-surface-container-lowest overflow-hidden shrink-0 relative flex items-center justify-center">
<span class="material-symbols-outlined text-[36px] text-tertiary">graphic_eq</span>
</div>
<div class="flex flex-col justify-between flex-1 min-w-0">
<div>
<div class="flex items-center justify-between mb-0.5">
<span class="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">ACOUSTIC #09</span>
<span class="font-label-sm text-[10px] text-tertiary">CATALOGUED</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface truncate group-hover:text-secondary transition-colors">Peat Bog Bell Resonance</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 italic">Recorded frequency of solitary submerged bronze bell.</p>
</div>
<div class="flex items-center justify-between pt-space-xs text-on-surface-variant/70 font-label-sm text-[10px]">
<span>Ch. 03 • Sunken Bell</span>
<span class="text-secondary font-mono">14.8 Hz Drift</span>
</div>
</div>
</article>
</div>
</section>
</div>
</div>
</div>
</main>
`;
}

export function bindWebArchiveEvents(_onNavigate: (route: string) => void): void {
  // Redactions clarification interactive features
  const r1 = document.getElementById('redacted-1');
  const r2 = document.getElementById('redacted-2');
  const bar = document.getElementById('fidelity-bar');
  const label = document.getElementById('fidelity-percent');

  const clarifyOne = () => {
    if (r1) {
      r1.innerHTML = '<span class="font-body-md text-body-md text-secondary-fixed font-semibold underline decoration-secondary decoration-wavy">the great flood tide</span>';
    }
    checkFidelity();
  };

  const clarifyTwo = () => {
    if (r2) {
      r2.innerHTML = '<span class="font-body-md text-body-md text-secondary-fixed font-semibold underline decoration-secondary decoration-wavy">mountain sage</span>';
    }
    checkFidelity();
  };

  const checkFidelity = () => {
    const done1 = r1 && !r1.innerText.includes('REDACTED');
    const done2 = r2 && !r2.innerText.includes('REDACTED');
    if (done1 && done2) {
      if (bar) bar.style.width = '100%';
      if (label) {
        label.innerText = '100% RESTORED (CRYSTALLINE)';
        label.classList.add('text-tertiary');
      }
    } else if (done1 || done2) {
      if (bar) bar.style.width = '92%';
      if (label) label.innerText = '92% RESTORED';
    }
  };

  if (r1) r1.addEventListener('click', clarifyOne);
  if (r2) r2.addEventListener('click', clarifyTwo);

  const clarifyAllBtn = document.getElementById('clarify-all-btn');
  if (clarifyAllBtn) {
    clarifyAllBtn.addEventListener('click', () => {
      clarifyOne();
      clarifyTwo();
    });
  }

  // Filter tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      filterTabs.forEach(t => {
        t.className = 'filter-tab px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer';
      });
      const target = e.currentTarget as HTMLElement;
      target.className = 'filter-tab px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider bg-surface-container-high text-secondary transition-colors cursor-pointer';
      
      const filter = target.getAttribute('data-filter');
      const cards = document.querySelectorAll<HTMLElement>('.archive-item-card');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Decode relic buttons
  const decodeBtns = document.querySelectorAll('.decode-btn');
  decodeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.innerHTML = '<span class="material-symbols-outlined text-[12px] animate-spin">refresh</span><span>Attuning...</span>';
      setTimeout(() => {
        btn.innerHTML = '<span class="material-symbols-outlined text-[12px] text-tertiary">check</span><span class="text-tertiary">Attuned</span>';
        btn.classList.add('bg-tertiary-container');
      }, 700);
    });
  });

  // Search filter
  const searchInput = document.getElementById('archive-search-input') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      const cards = document.querySelectorAll<HTMLElement>('.archive-item-card');
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? 'flex' : 'none';
      });
    });
  }
}
