import { GameStateModel } from '@core/GameState';

export function renderMobileChapters(
  _state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div class="flex flex-col w-full pb-10">
<!-- Toast Notification Overlay -->
<div class="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm pointer-events-none transition-all duration-300 opacity-0 -translate-y-2" id="archival-toast">
<div class="flex items-center gap-space-sm p-space-md bg-surface-container-highest shadow-xl rounded-xl">
<span class="material-symbols-outlined text-secondary text-[20px] shrink-0" style="font-variation-settings: 'FILL' 1;">auto_fix_high</span>
<div class="flex flex-col min-w-0">
<span class="font-title-md text-title-md text-on-surface leading-tight">Remnant Resonance Synced</span>
<span class="font-body-sm text-body-sm text-secondary-fixed leading-normal mt-0.5" id="toast-message">+45 Remnants transferred to active Ledger</span>
</div>
</div>
</div>
<!-- Editorial Chapter Header & Memory Metrics -->
<section class="sticky top-16 z-30 px-gutter-mobile py-space-sm bg-surface/95 backdrop-blur-md">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Folio IX — Recalled</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Archivist #094</span>
</div>
<h2 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Chapter Index</h2>
<div class="flex items-center justify-between pt-space-xs">
<div class="flex items-baseline gap-1.5">
<span class="font-title-md text-title-md text-on-surface">03</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">/ 06 Recovered</span>
</div>
<div class="flex items-center gap-space-xs px-space-sm py-0.5 rounded bg-surface-container-high">
<span class="material-symbols-outlined text-[13px] text-secondary">token</span>
<span class="font-label-sm text-label-sm text-secondary tracking-normal">180 / 320 Remnants</span>
</div>
</div>
<!-- Subtle Progress Track without borders -->
<div class="w-full h-1 bg-surface-container-lowest rounded-full overflow-hidden mt-1">
<div class="h-full bg-secondary rounded-full" style="width: 56%;"></div>
</div>
</div>
</section>
<!-- Fragmented Recollections Stream -->
<div class="flex flex-col gap-space-lg px-gutter-mobile pt-space-md">
<!-- Card 1: CHAPTER I — COMPLETED -->
<article class="relative flex flex-col w-full bg-surface-container rounded-xl overflow-hidden shadow-lg transition-transform active:scale-[0.99]">
<!-- Archival Torn Edge Accent -->
<div class="relative w-full h-44 overflow-hidden">
<img alt="ECHOES narrative indie game user avatar, mysterious hooded traveler silhouette in misty forgotten twilight, archival vintage tone, muted dark slate indigo and faded gold atmospheric lighting, soft grain cinematic photorealistic indie game character portrait" class="w-full h-full object-cover" src="/assets/ui/mobile_avatar.jpg"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/40 to-transparent"></div>
<!-- Status Badge / Archival Wax Stamp Style -->
<div class="absolute top-space-sm right-space-sm flex items-center gap-1 px-space-sm py-1 bg-secondary-container/90 backdrop-blur-sm rounded">
<span class="material-symbols-outlined text-secondary-fixed text-[14px]">verified</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed">Restored</span>
</div>
<div class="absolute bottom-space-xs left-space-md">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Recollection 01</span>
</div>
</div>
<div class="flex flex-col p-space-md gap-space-sm">
<div class="flex items-baseline justify-between gap-space-sm">
<h3 class="font-headline-sm text-headline-sm text-on-surface">The Sound of Leaving</h3>
<span class="font-label-sm text-label-sm text-secondary shrink-0">+45 Remnants</span>
</div>
<!-- Handwritten Archival Field Note -->
<blockquote class="px-space-md py-space-sm bg-surface-container-low rounded italic font-headline-sm text-body-md text-secondary-fixed-dim">
          “we packed nothing of weight.”
        </blockquote>
<div class="flex items-center justify-between text-on-surface-variant pt-space-xs">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[16px] text-tertiary">inventory_2</span>
<span class="font-body-sm text-body-sm">6 / 6 Shards Restored</span>
</div>
<button class="flex items-center gap-1 px-space-sm py-1 rounded bg-surface-container-high text-on-surface hover:text-secondary transition-colors" onclick="inspectMilestone('The Sound of Leaving', 45)">
<span class="font-label-sm text-label-sm uppercase">Revisit</span>
<span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
</article>
<!-- Card 2: CHAPTER II — UNLOCKED / ACTIVE -->
<article class="relative flex flex-col w-full bg-surface-container-high rounded-xl overflow-hidden shadow-xl">
<!-- Tape / Clip Motif Header -->
<div class="h-1.5 w-16 bg-secondary/70 self-center -mt-0.5 rounded-b-sm"></div>
<div class="flex flex-col p-space-lg gap-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Active Recollection</span>
</div>
<span class="font-label-sm text-label-sm px-space-xs py-0.5 bg-surface-container-lowest text-on-surface-variant rounded">Beacon 02</span>
</div>
<div class="flex flex-col gap-0.5">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Recollection 02</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface">The Archive of Withering</h3>
</div>
<!-- Poetic Prompt Box -->
<div class="p-space-md bg-surface-container-low rounded">
<p class="font-body-md text-body-md text-on-surface italic leading-relaxed">
            “The ink had already dissolved before we spoke. What remained was only the indentations left upon the ledger paper.”
          </p>
</div>
<!-- Archival Progress Metric Bar -->
<div class="flex flex-col gap-1.5 pt-space-xs">
<div class="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Fragments Decoded</span>
<span class="text-on-surface font-title-md text-body-sm">3 / 8 Found</span>
</div>
<div class="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
<div class="h-full bg-secondary-fixed rounded-full" style="width: 37.5%;"></div>
</div>
</div>
<!-- Action Choice Buttons -->
<div class="flex items-center gap-space-sm pt-space-xs">
<button class="flex-1 flex items-center justify-center gap-space-xs py-space-sm px-space-md bg-secondary text-on-secondary rounded font-label-sm text-label-sm uppercase tracking-wider transition-opacity active:opacity-90" onclick="resumeRecollection()">
<span class="material-symbols-outlined text-[16px]">play_arrow</span>
<span>Resume Memory</span>
</button>
<button class="flex items-center justify-center p-space-sm bg-surface-container text-on-surface hover:text-secondary rounded transition-colors" onclick="inspectMilestone('Archive of Withering', 20)" title="Claim Stored Echo">
<span class="material-symbols-outlined text-[18px]">toll</span>
</button>
</div>
</div>
</article>
<!-- Card 3: CHAPTER III — UNVISITED -->
<article class="relative flex flex-col w-full bg-surface-container-low rounded-xl overflow-hidden opacity-90 shadow-md">
<!-- Tape Mark Archival Tab -->
<div class="absolute -top-1 left-6 w-12 h-4 bg-surface-container-highest/80 rotate-2 rounded-xs"></div>
<div class="flex flex-col p-space-lg gap-space-sm">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[14px] text-on-surface-variant">lock_clock</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Unvisited Shard</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">Recollection 03</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface-variant">The Hollow Spire</h3>
<div class="relative w-full h-24 bg-surface-container-lowest rounded overflow-hidden flex items-center justify-center">
<div class="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-high/20 to-surface-container-lowest"></div>
<span class="material-symbols-outlined text-[36px] text-surface-container-highest select-none">foggy</span>
</div>
<!-- Requirement Footnote -->
<div class="flex items-center gap-space-xs pt-space-xs">
<span class="material-symbols-outlined text-[14px] text-secondary shrink-0">info</span>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Requires 120 Remnants or Chapter II completion.
          </p>
</div>
</div>
</article>
<!-- Card 4: CHAPTER IV — LOCKED / FORGOTTEN -->
<article class="relative flex flex-col w-full bg-surface-container-lowest rounded-xl overflow-hidden shadow-inner">
<div class="flex flex-col p-space-lg gap-space-sm">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[14px] text-outline">lock</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Forgotten</span>
</div>
<span class="font-label-sm text-label-sm text-outline">Recollection 04</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-outline">What We Buried</h3>
<!-- Redacted Sentence Display -->
<div class="p-space-md bg-surface-container rounded select-none">
<div class="flex flex-wrap items-center gap-1.5 font-body-sm text-body-sm">
<span class="px-2 py-0.5 bg-surface-container-highest text-surface-container-highest rounded">REDACTED</span>
<span class="text-on-surface-variant italic">“Some names were not meant to endure.”</span>
<span class="px-4 py-0.5 bg-surface-container-highest text-surface-container-highest rounded">SHADOW</span>
</div>
</div>
<div class="flex items-center justify-between pt-space-xs text-outline">
<span class="font-body-sm text-body-sm">Concealed in deep fog</span>
<span class="font-label-sm text-label-sm uppercase">0 / 12 Traces</span>
</div>
</div>
</article>
<!-- Footer Archival Curator Signature -->
<div class="flex flex-col items-center justify-center py-space-md gap-space-xs text-center opacity-70">
<span class="material-symbols-outlined text-[20px] text-secondary">history_edu</span>
<p class="font-body-sm text-body-sm text-on-surface-variant italic max-w-xs">
        “Memory is not stone; it is water held inside cupped hands.”
      </p>
<span class="font-label-sm text-[9px] uppercase tracking-widest text-outline">The High Archivist • Year 180</span>
</div>
</div>
</div>
</main>
`;
}

export function bindMobileChaptersEvents(onNavigate: (route: string) => void): void {
  const cards = document.querySelectorAll('main [data-chapter], main .cursor-pointer, #enter-chapter');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      onNavigate('hud');
    });
  });

  const toast = document.getElementById('archival-toast');
  if (toast) {
    setTimeout(() => {
      toast.classList.remove('opacity-0', '-translate-y-2');
      setTimeout(() => {
        toast.classList.add('opacity-0', '-translate-y-2');
      }, 3000);
    }, 500);
  }
}
