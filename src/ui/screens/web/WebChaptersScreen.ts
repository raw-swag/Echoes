import { GameStateModel } from '@core/GameState';

export function renderWebChapters(
  _state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<main class="relative pt-20 bg-background min-h-screen"><div class="flex flex-col w-full">
<div class="px-margin py-space-xl flex flex-col gap-space-xl">
<!-- Top Progress Ledger Bar -->
<section class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg bg-surface-container-low p-space-xl rounded-xl shadow-md">
<div class="flex flex-col gap-space-xs max-w-xl">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Archival Folio // Volume II</span>
<span class="w-1 h-1 rounded-full bg-outline"></span>
<span class="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">Sync State: Coherent</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-on-surface">Chapter Index</h1>
<p class="font-body-md text-body-md text-on-surface-variant">
          Fragments of collective recollection extracted from Deep Fog stratum. Recover remnants to reconstruct the unwritten ledgers.
        </p>
</div>
<div class="flex flex-col sm:flex-row items-start sm:items-center gap-space-xl">
<!-- Recovery Ratio Counter -->
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between gap-space-md">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Restoration</span>
<span class="font-title-md text-title-md text-secondary">03 / 06 Recovered</span>
</div>
<div class="w-48 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-secondary transition-all duration-700" style="width: 50%;"></div>
</div>
</div>
<!-- Remnants Progress Gauge -->
<div class="flex items-center gap-space-md bg-surface-container px-space-lg py-space-md rounded-lg shadow-sm">
<div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-secondary text-[22px]">hourglass_empty</span>
</div>
<div class="flex flex-col">
<div class="flex items-baseline gap-space-xs">
<span class="font-title-md text-title-md text-secondary leading-none">180</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">/ 320</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-0.5">Remnants Preserved</span>
</div>
</div>
</div>
</section>
<!-- Filter & Resonance Status Line -->
<div class="flex items-center justify-between px-space-sm">
<div class="flex items-center gap-space-md">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Chronology Tier:</span>
<button class="font-label-sm text-label-sm uppercase px-space-md py-space-xs bg-surface-container text-secondary rounded">All Stratum</button>
<button class="font-label-sm text-label-sm uppercase px-space-md py-space-xs text-on-surface-variant hover:text-on-surface transition-colors">Surface Ink</button>
<button class="font-label-sm text-label-sm uppercase px-space-md py-space-xs text-on-surface-variant hover:text-on-surface transition-colors">Abyssal Murmur</button>
</div>
<div class="hidden md:flex items-center gap-space-sm text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-tertiary">tune</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Resonance HUD: Optimal Sensitivity (0.84 Hz)</span>
</div>
</div>
<!-- Editorial Asymmetric Grid of Archival Shards -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
<!-- Card 1: Restored Shard (Width 7 cols desktop) -->
<article class="lg:col-span-7 bg-surface-container-low rounded-xl p-space-xl flex flex-col gap-space-lg shadow-md group hover:bg-surface-container transition-all duration-300">
<div class="flex items-center justify-between gap-space-md">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-surface-container-highest text-tertiary uppercase tracking-widest">
              [RESTORED]
            </span>
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">+45 Remnants Claimed</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant/70 tracking-widest uppercase">Index // R-01</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-12 gap-space-lg items-center">
<!-- Polaroid / Specimen Archival Mount Frame -->
<div class="sm:col-span-5 bg-surface-container-highest p-space-sm rounded-lg shadow-lg flex flex-col gap-space-xs">
<div class="overflow-hidden rounded relative aspect-[4/5] bg-surface-container-lowest">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" data-alt="Monochrome atmospheric cinematic photograph of a lone hooded wanderer walking through thick rolling morning fog into a barren desolate pine clearing, soft muted silver ink wash style, warm ivory grain overlay, archival documentation aesthetic." src="/assets/ui/clockwork_clearing.jpg"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent"></div>
<div class="absolute bottom-2 left-2 flex items-center gap-1 text-on-surface/80">
<span class="material-symbols-outlined text-[14px] text-tertiary">lock_open</span>
<span class="font-label-sm text-label-sm tracking-widest">SYNCHRONIZED</span>
</div>
</div>
<div class="text-center py-1">
<span class="font-label-sm text-label-sm text-on-surface-variant/70 italic tracking-wider">Plate #01 — Departure Gate</span>
</div>
</div>
<!-- Editorial Details -->
<div class="sm:col-span-7 flex flex-col justify-between h-full gap-space-md">
<div class="flex flex-col gap-space-sm">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Folio Fragment 01</span>
<h2 class="font-headline-md text-headline-md text-on-surface leading-tight">
                RECOLLECTION 01 — <span class="italic font-normal">The Sound of Leaving</span>
</h2>
<blockquote class="font-body-md text-body-md text-secondary italic pl-space-md bg-surface-container-lowest/40 py-space-xs rounded-sm">
                “We packed nothing of weight. Only the copper tea tin and the promise that neither would look back when the clockwork tower fell silent.”
              </blockquote>
</div>
<div class="flex flex-col gap-space-sm pt-space-sm">
<div class="flex items-center justify-between text-on-surface-variant">
<span class="font-label-sm text-label-sm uppercase tracking-wider">Integrity</span>
<span class="font-label-sm text-label-sm text-tertiary font-medium">6 / 6 Shards Restored</span>
</div>
<div class="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-tertiary rounded-full" style="width: 100%;"></div>
</div>
<div class="flex items-center justify-between pt-space-xs">
<span class="font-body-sm text-body-sm text-on-surface-variant/70">Recorded: First Frost</span>
<button class="flex items-center gap-space-xs font-label-md text-label-md uppercase px-space-md py-space-xs rounded bg-surface-container-high text-secondary hover:bg-surface-variant transition-colors shadow-sm">
<span>Revisit</span>
<span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
</article>
<!-- Card 2: Active Recollection (Width 5 cols desktop, higher prominence) -->
<article class="lg:col-span-5 bg-surface-container rounded-xl p-space-xl flex flex-col justify-between gap-space-lg shadow-xl relative overflow-hidden">
<div class="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
<div class="flex flex-col gap-space-md">
<div class="flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-secondary-container text-secondary">
<span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
<span class="font-label-sm text-label-sm uppercase tracking-widest font-semibold">[BEACON 02 ACTIVE]</span>
</div>
<div class="flex items-center gap-space-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-secondary">graphic_eq</span>
<span class="font-label-sm text-label-sm tracking-widest uppercase">Audio Feed // 44.1kHz</span>
</div>
</div>
<div class="flex flex-col gap-space-xs">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">In Progress — Chapter II</span>
<h2 class="font-headline-md text-headline-md text-on-surface">
              RECOLLECTION 02 — <span class="italic font-normal">The Archive of Withering</span>
</h2>
</div>
<div class="relative bg-surface-container-lowest p-space-md rounded-lg shadow-inner">
<p class="font-body-md text-body-md text-on-surface-variant italic">
              “The ink had already dissolved before we spoke. What remained was only the indentations left upon the ledger paper.”
            </p>
<div class="mt-space-sm flex items-center gap-space-sm">
<span class="material-symbols-outlined text-[16px] text-on-surface-variant/50">history_edu</span>
<span class="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest">Marginalia: Scribe C-14</span>
</div>
</div>
<!-- Sparkline Waveform / Resonance Telemetry -->
<div class="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs">
<div class="flex justify-between items-center text-on-surface-variant">
<span class="font-label-sm text-label-sm uppercase tracking-wider">Resonance Drift</span>
<span class="font-label-sm text-label-sm text-secondary">Delta: -1.24%</span>
</div>
<svg class="w-full h-8 text-secondary/60" fill="none" viewbox="0 0 240 32">
<path d="M0 16 Q20 4, 40 16 T80 24 T120 8 T160 22 T200 12 T240 16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path>
<circle class="text-secondary" cx="160" cy="22" fill="currentColor" r="3"></circle>
</svg>
</div>
</div>
<div class="flex flex-col gap-space-md pt-space-md">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Shard Extraction</span>
<span class="font-title-md text-title-md text-secondary">3 / 8 Found</span>
</div>
<div class="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
<div class="h-full bg-secondary rounded-full" style="width: 37.5%;"></div>
</div>
</div>
<div class="flex items-center gap-space-sm">
<button class="flex-1 flex items-center justify-center gap-space-sm px-space-lg py-space-md rounded bg-surface-container-high text-on-surface hover:bg-surface-bright transition-colors shadow-md group">
<span class="material-symbols-outlined text-secondary text-[20px] group-hover:scale-110 transition-transform">play_arrow</span>
<span class="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">Resume Memory</span>
</button>
<button class="w-12 h-11 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors shadow-sm" title="Inspect Audio Archive">
<span class="material-symbols-outlined text-[20px]">volume_up</span>
</button>
</div>
</div>
</article>
<!-- Card 3: Unvisited Shard (Width 6 cols desktop) -->
<article class="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-xl flex flex-col justify-between gap-space-lg shadow-sm group">
<div class="flex items-center justify-between gap-space-sm">
<span class="font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-surface-container-high text-on-surface-variant uppercase tracking-widest flex items-center gap-1">
<span class="material-symbols-outlined text-[13px]">lock</span>
            [UNVISITED SHARD]
          </span>
<span class="font-label-sm text-label-sm text-on-surface-variant/40 tracking-widest uppercase">Folio 03 // Tier IV</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-12 gap-space-md items-center">
<div class="sm:col-span-5 h-44 rounded-lg bg-surface-container-low overflow-hidden relative shadow-inner">
<div class="w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity filter blur-[0.5px]" data-alt="Dim cinematic illustration of an ancient obsidian hollow gothic spire jutting through thick nocturnal fog, muted Prussian blues and charcoal ink textures, mysterious, desolate atmosphere, minimal light hitting weathered masonry." style="background-image: url('/assets/ui/departure_gate.jpg')"></div>
<div class="absolute inset-0 bg-surface-container-lowest/60 flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface-variant/40 text-[36px]">visibility_off</span>
</div>
</div>
<div class="sm:col-span-7 flex flex-col gap-space-sm">
<span class="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest">Stratum Altitude: 420m</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface-variant">
              RECOLLECTION 03 — <span class="italic font-normal">The Hollow Spire</span>
</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant/80">
              A tall tower standing above the waterline, where bells were rung backward to summon forgotten messengers.
            </p>
</div>
</div>
<div class="bg-surface-container-low/60 p-space-md rounded-lg flex items-center justify-between gap-space-md">
<div class="flex items-center gap-space-sm text-on-surface-variant">
<span class="material-symbols-outlined text-secondary-container text-[18px]">key</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">
              Condition: Requires <span class="text-secondary font-medium">120 Remnants</span> or Chapter II completion.
            </span>
</div>
<span class="font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-surface-container-highest text-on-surface-variant uppercase tracking-widest">Locked</span>
</div>
</article>
<!-- Card 4: Forgotten / Redacted (Width 6 cols desktop) -->
<article class="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-xl flex flex-col justify-between gap-space-lg shadow-sm relative overflow-hidden">
<!-- Subtle noise background feeling -->
<div class="flex items-center justify-between gap-space-sm">
<span class="font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-error-container text-on-error-container uppercase tracking-widest flex items-center gap-1">
<span class="material-symbols-outlined text-[13px]">block</span>
            [FORGOTTEN]
          </span>
<span class="font-label-sm text-label-sm text-on-surface-variant/40 tracking-widest uppercase">Classified Expunged</span>
</div>
<div class="flex flex-col gap-space-md">
<div class="flex flex-col gap-space-xs">
<span class="font-label-sm text-label-sm text-error/80 uppercase tracking-widest">Severe Cognitive Dissolution</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface-variant/70">
              RECOLLECTION 04 — <span class="italic font-normal">What We Buried</span>
</h2>
</div>
<!-- Redaction Visual Bars -->
<div class="space-y-2 bg-surface-container-low p-space-md rounded-lg">
<div class="flex items-center gap-space-sm">
<div class="h-4 bg-surface-container-highest rounded w-24"></div>
<div class="h-4 bg-on-surface-variant/20 rounded flex-1"></div>
<div class="h-4 bg-surface-container-highest rounded w-16"></div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant/90 italic">
              “Some names were not meant to endure. <span class="bg-on-surface-variant/20 px-4 py-0.5 rounded text-transparent select-none inline-block">The council swore</span> before the last pyre dissolved into the marsh.”
            </p>
<div class="flex items-center gap-space-sm">
<div class="h-4 bg-on-surface-variant/20 rounded w-1/2"></div>
<div class="h-4 bg-surface-container-highest rounded w-1/4"></div>
</div>
</div>
</div>
<div class="flex items-center justify-between pt-space-xs">
<div class="flex items-center gap-space-xs text-on-surface-variant/60">
<span class="material-symbols-outlined text-[16px]">cloud_off</span>
<span class="font-body-sm text-body-sm">Concealed in deep fog • 0 / 12 Traces</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant/50 uppercase tracking-widest">Censored by Synod</span>
</div>
</article>
</div>
<!-- Archival Folio Footer Quote -->
<footer class="mt-space-xl mb-space-lg pt-space-xl flex flex-col items-center justify-center text-center gap-space-sm bg-surface-container-low p-space-xl rounded-xl shadow-inner">
<div class="w-12 h-1 bg-surface-container-highest rounded-full mb-space-xs"></div>
<blockquote class="font-headline-sm text-headline-sm text-on-surface italic max-w-2xl">
        “Memory is not stone; it is water held inside cupped hands.”
      </blockquote>
<div class="flex items-center gap-space-sm mt-space-xs">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">THE HIGH ARCHIVIST</span>
<span class="w-1 h-1 rounded-full bg-outline"></span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">REGISTRY YEAR 180</span>
<span class="w-1 h-1 rounded-full bg-outline"></span>
<span class="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">ANNAL OF THE FORMER WORLD</span>
</div>
</footer>
</div>
</div></main>
`;
}

export function bindWebChaptersEvents(onNavigate: (route: string) => void): void {
  const enterBtns = document.querySelectorAll('#enter-chapter-01, #continue-journey-btn, [data-chapter="01"]');
  enterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      onNavigate('hud');
    });
  });

  const cards = document.querySelectorAll('.chapter-card, [data-chapter]');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      onNavigate('hud');
    });
  });
}
