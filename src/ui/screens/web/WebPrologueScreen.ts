import { GameStateModel } from '@core/GameState';

export function renderWebPrologue(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<main class="relative pt-20 bg-background min-h-screen"><div class="flex flex-col w-full">
<div class="w-full px-margin py-space-lg flex flex-col gap-space-xl">
<!-- Breadcrumb & Top Status Bar -->
<div class="w-full flex flex-wrap items-center justify-between gap-space-md">
<div class="flex items-center gap-space-md">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest px-space-sm py-space-xs bg-surface-container-high rounded">PRLG // 00</span>
<span class="font-body-sm text-body-sm text-on-surface-variant/80">Recollection Stratum : Threshold of Ash &amp; Salt</span>
</div>
<div class="flex items-center gap-space-lg">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Acoustic Drift : ${state.acousticDriftHz} Hz</span>
</div>
<div class="h-3 w-[1px] bg-outline-variant/40"></div>
<span class="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">Chronicle Intact</span>
</div>
</div>
<!-- Main Asymmetric Stage: Atmospheric Cinematic Canvas + Right Folio Column -->
<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start">
<!-- Left & Center Cinematic Stage (Columns 1-7 / 12) -->
<div class="xl:col-span-7 flex flex-col gap-space-lg">
<div class="relative w-full rounded-xl overflow-hidden bg-surface-container-low min-h-[640px] flex flex-col justify-between p-space-xl shadow-xl">
<!-- Atmospheric Photographic Background -->
<div class="absolute inset-0 bg-cover bg-center mix-blend-lighten opacity-80 pointer-events-none" data-alt="A cinematic atmospheric landscape shrouded in low midnight fog and ancient towering pine silhouettes. A solitary hooded traveler in weathered charcoal wool stands on a winding gravel trail, facing away into the glowing misty woods. Ethereal faint amber and moonlit blue particle motes float in the chilly air, evocative of memory loss, quiet melancholia, and forgotten paths. High fine-art photography, muted void navy tones with faint gold atmospheric luminance." style="background-image: url('/assets/ui/prologue_traveler.jpg')"></div>
<!-- Deep Ink Radial Vignette & Gradient Overlays -->
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent pointer-events-none"></div>
<div class="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/80 via-transparent to-surface-container-lowest/40 pointer-events-none"></div>
<!-- Top Stage Metadata Overlay -->
<div class="relative z-10 flex items-center justify-between w-full">
<div class="flex items-center gap-space-sm bg-surface-container-lowest/70 backdrop-blur-md px-space-md py-space-xs rounded shadow-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">explore</span>
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Sector IV // Valley of Inaudible Bells</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant/70 tracking-widest uppercase">Folio Sheet 01-A</span>
</div>
<!-- Central Typographic Echo & Haunting Prose -->
<div class="relative z-10 my-auto flex flex-col pt-space-xl">
<!-- Ghosted Serif Display Title -->
<div class="relative">
<span class="absolute -top-10 -left-2 font-display-lg text-[100px] leading-none text-surface-variant/20 select-none pointer-events-none font-normal italic tracking-tight">
                Echoes
              </span>
<h1 class="font-display-lg text-display-lg text-on-surface tracking-tight leading-none mb-space-xs">
                ECHOES
              </h1>
</div>
<p class="font-label-md text-label-md uppercase text-secondary tracking-[0.25em] mb-space-lg">
              The Things We Chose to Forget
            </p>
<div class="max-w-md bg-surface-container-high/40 backdrop-blur-md p-space-md rounded-lg shadow-sm">
<blockquote class="font-headline-sm text-headline-sm text-on-surface italic font-normal mb-space-xs leading-relaxed" id="prologue-quote">
                “Some things are lost. Others are left behind.”
              </blockquote>
<cite class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block not-italic">
                — Marginalia found in the margins of Ledger #04
              </cite>
</div>
</div>
<!-- Bottom Interaction Prompt & Atmospheric Audio Pulse -->
<div class="relative z-10 pt-space-lg flex flex-wrap items-center justify-between gap-space-md">
<button class="group flex items-center gap-space-md px-space-lg py-space-md bg-surface-container-high/90 hover:bg-surface-bright text-on-surface rounded transition-all duration-300 shadow-md cursor-pointer" id="begin-remembering-btn">
<div class="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></div>
<span class="font-label-md text-label-md uppercase tracking-widest group-hover:text-secondary transition-colors">
                Press [SPACE] or Click to Begin Remembering
              </span>
<span class="material-symbols-outlined text-[18px] text-secondary group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
</button>
<!-- Subtle Audio / Resonance Waveform Widget -->
<div class="flex items-center gap-space-sm bg-surface-container-lowest/80 px-space-md py-space-xs rounded backdrop-blur-sm cursor-pointer" id="waveform-toggle-btn" title="Click to modulate acoustic drift">
<span class="material-symbols-outlined text-[16px] text-on-surface-variant" id="waveform-icon">graphic_eq</span>
<div class="flex items-end gap-1 h-4 w-16" id="audio-bars">
<span class="w-1 bg-secondary rounded-full h-2 animate-[pulse_1.5s_ease-in-out_infinite]"></span>
<span class="w-1 bg-secondary/80 rounded-full h-4 animate-[pulse_1.2s_ease-in-out_infinite_200ms]"></span>
<span class="w-1 bg-secondary/60 rounded-full h-1 animate-[pulse_1.8s_ease-in-out_infinite_400ms]"></span>
<span class="w-1 bg-secondary rounded-full h-3 animate-[pulse_1.4s_ease-in-out_infinite_100ms]"></span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant tracking-widest" id="tether-status">TETHERED</span>
</div>
</div>
</div>
<!-- Footnote / Archival Inscription Section -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div class="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Chronicle Method</span>
<p class="font-body-sm text-body-sm text-on-surface-variant">Non-destructive memory excavation through sensory remnants.</p>
</div>
<div class="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Veil Thickness</span>
<p class="font-body-sm text-body-sm text-on-surface-variant">0.42 mm attenuation across the current temporal perimeter.</p>
</div>
<div class="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Ledger Integrity</span>
<p class="font-body-sm text-body-sm text-on-surface-variant">All five chapters catalogued. Fragment 42 remains unverified.</p>
</div>
</div>
</div>
<!-- Right Side Archival Dossier (Columns 8-12 / 12) -->
<div class="xl:col-span-5 flex flex-col gap-space-lg">
<!-- Archivist Field Note Card -->
<div class="bg-surface-container-low p-space-xl rounded-xl flex flex-col gap-space-md shadow-md border-l-2 border-secondary">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[20px]">menu_book</span>
<span class="font-label-md text-label-md text-secondary uppercase tracking-widest">Archival Fragment // 00</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant/60 font-mono">HASH: 4b29-e09</span>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface">The Threshold of Ash &amp; Salt</h2>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We did not lose the world all at once. We gave it away in small surrenders: first the names of the smaller birds, then the second verse of songs we sung at the dockside, then the sound of water against stone when everyone has left the harbour.
            </p>
<div class="h-[1px] w-full bg-surface-container-high my-space-xs"></div>
<p class="font-body-sm text-body-sm text-on-surface-variant/80 italic leading-relaxed">
              “If you find this folio before the ink turns fully to ash, look for the second bell. It rings whether anyone strikes it or not.”
            </p>
<div class="flex items-center justify-between pt-space-xs">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Recovered by: Archivist 09</span>
<span class="font-label-sm text-label-sm text-on-surface-variant/50 uppercase">Stratum IV • Depths</span>
</div>
</div>
<!-- Narrative Navigation Bento Group -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<!-- Chapter Jump Tile -->
<div class="p-space-lg bg-surface-container-low hover:bg-surface-container rounded-xl flex flex-col justify-between gap-space-md transition-all duration-300 shadow-sm group cursor-pointer" data-route="chapters">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Folio Index</span>
<span class="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-secondary group-hover:translate-x-0.5 transition-all">arrow_forward</span>
</div>
<div>
<h3 class="font-title-md text-title-md text-on-surface mb-space-xs">Chapters Index</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">5 distinct recollection strata available for navigation.</p>
</div>
<div class="flex items-center gap-space-xs text-on-surface-variant/60 font-label-sm text-label-sm uppercase">
<span>Ch. 01 – 05</span>
<span>•</span>
<span>Complete</span>
</div>
</div>
<!-- Archival Records Tile -->
<div class="p-space-lg bg-surface-container-low hover:bg-surface-container rounded-xl flex flex-col justify-between gap-space-md transition-all duration-300 shadow-sm group cursor-pointer" data-route="archive">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Memory Vault</span>
<span class="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-secondary group-hover:translate-x-0.5 transition-all">arrow_forward</span>
</div>
<div>
<h3 class="font-title-md text-title-md text-on-surface mb-space-xs">Memory Archive</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Examine 18 recovered fragments and catalogued relics.</p>
</div>
<div class="flex items-center gap-space-xs text-on-surface-variant/60 font-label-sm text-label-sm uppercase">
<span>18 / 24 Collected</span>
</div>
</div>
</div>
<!-- Diegetic Attunement Indicator Panel -->
<div class="p-space-lg bg-surface-container-lowest rounded-xl flex flex-col gap-space-md shadow-inner border border-surface-container-high/30">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-[18px] text-tertiary">tune</span>
<span class="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">Echo Tether Resonance</span>
</div>
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">99.8% Coherent</span>
</div>
<div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div class="bg-gradient-to-r from-secondary to-tertiary h-full rounded-full w-[99.8%]"></div>
</div>
<div class="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span>Synchronous Replay Buffer</span>
<span class="text-secondary font-mono">0.00s drift</span>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
`;
}

export function bindWebPrologueEvents(onNavigate: (route: string) => void): void {
  const beginBtn = document.getElementById('begin-remembering-btn');
  if (beginBtn) {
    beginBtn.addEventListener('click', () => {
      beginBtn.classList.add('bg-secondary', 'text-on-secondary');
      setTimeout(() => {
        onNavigate('hud');
      }, 200);
    });
  }

  const spaceHandler = (e: KeyboardEvent) => {
    if (e.code === 'Space' && (e.target === document.body || (e.target as HTMLElement)?.tagName === 'DIV')) {
      window.removeEventListener('keydown', spaceHandler);
      onNavigate('hud');
    }
  };
  window.addEventListener('keydown', spaceHandler);

  // Waveform click modulation
  const waveBtn = document.getElementById('waveform-toggle-btn');
  if (waveBtn) {
    waveBtn.addEventListener('click', () => {
      const tether = document.getElementById('tether-status');
      if (tether) {
        tether.textContent = tether.textContent === 'TETHERED' ? 'RESONATING' : 'TETHERED';
        tether.classList.toggle('text-secondary');
      }
    });
  }

  // Poetic Marginalia cycling
  const quoteEl = document.getElementById('prologue-quote');
  if (quoteEl) {
    quoteEl.style.cursor = 'pointer';
    quoteEl.title = 'Click to attune memory whisper';
    const quotes = [
      '“Some things are lost. Others are left behind.”',
      '“We did not forget. We simply buried the key.”',
      '“An echo is a sound that refuses to become silence.”',
      '“The dust remembers where the light fell.”'
    ];
    let qIdx = 0;
    quoteEl.addEventListener('click', () => {
      quoteEl.style.opacity = '0';
      quoteEl.style.transition = 'opacity 0.25s ease';
      setTimeout(() => {
        qIdx = (qIdx + 1) % quotes.length;
        quoteEl.textContent = quotes[qIdx];
        quoteEl.style.opacity = '1';
      }, 250);
    });
  }

  // Right bento card navigations
  const navTiles = document.querySelectorAll('main [data-route]');
  navTiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
      const route = (e.currentTarget as HTMLElement).getAttribute('data-route');
      if (route) onNavigate(route);
    });
  });
}
