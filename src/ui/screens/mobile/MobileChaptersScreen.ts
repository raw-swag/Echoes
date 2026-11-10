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
<section class="sticky top-16 z-30 px-gutter-mobile py-space-sm bg-surface/90 backdrop-blur-md border-b border-surface-container-high/40 flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[18px]">auto_stories</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">Folio 02 // Strata</span>
</div>
<div class="flex items-center gap-space-xs font-mono text-[11px] text-secondary">
<span>1,408</span>
<span class="text-on-surface-variant/50">/</span>
<span class="text-on-surface-variant">2,400</span>
</div>
</section>
<!-- Chapters Feed -->
<div class="px-gutter-mobile pt-space-md flex flex-col gap-space-md">
<!-- Chapter 01: The Sound of Leaving -->
<article class="p-space-md rounded-2xl bg-surface-container-low shadow-lg border border-secondary/30 flex flex-col gap-space-sm cursor-pointer" data-chapter="01">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="px-2 py-0.5 rounded bg-surface-container-high font-mono text-[10px] text-secondary uppercase font-semibold">CH // 01</span>
<span class="font-label-sm text-[10px] uppercase tracking-wider text-tertiary">Playable</span>
</div>
<span class="font-mono text-[11px] text-secondary">420 Remnants</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface">The Sound of Leaving</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Footsteps across cold river mud. The sound of cedar trees in the autumn gale, dropping seeds that will never see the light.
        </p>
<div class="flex items-center justify-between pt-space-xs">
<button class="flex-1 py-space-xs px-space-md rounded-lg bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-1 shadow-md cursor-pointer" data-action="play">
<span>Enter Chapter</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
<button class="ml-space-sm p-space-xs rounded-lg bg-surface-container text-secondary flex items-center justify-center cursor-pointer milestone-btn" data-chapter-name="The Sound of Leaving" data-remnants="45" title="Synchronize Milestone">
<span class="material-symbols-outlined text-[18px]">verified</span>
</button>
</div>
</article>

<!-- Chapter 02: Clockwork Clearing -->
<article class="p-space-md rounded-2xl bg-surface-container-low shadow-md border border-surface-container-high flex flex-col gap-space-sm cursor-pointer" data-chapter="02">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="px-2 py-0.5 rounded bg-surface-container-high font-mono text-[10px] text-on-surface-variant uppercase font-semibold">CH // 02</span>
<span class="font-label-sm text-[10px] uppercase tracking-wider text-secondary">Restored</span>
</div>
<span class="font-mono text-[11px] text-secondary">380 Remnants</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface">The Clockwork Clearing</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Cogs ground down to silent brass teeth. A pendulum stopped mid-arc at the thirty-fourth second of an unwritten hour.
        </p>
<div class="flex items-center justify-between pt-space-xs">
<button class="flex-1 py-space-xs px-space-md rounded-lg bg-surface-container-high text-secondary font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer" data-action="play">
<span>Enter Chapter</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
<button class="ml-space-sm p-space-xs rounded-lg bg-surface-container text-secondary flex items-center justify-center cursor-pointer milestone-btn" data-chapter-name="The Clockwork Clearing" data-remnants="30" title="Synchronize Milestone">
<span class="material-symbols-outlined text-[18px]">verified</span>
</button>
</div>
</article>

<!-- Chapter 03: Sunken Bell -->
<article class="p-space-md rounded-2xl bg-surface-container-low shadow-md border border-surface-container-high flex flex-col gap-space-sm cursor-pointer" data-chapter="03">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="px-2 py-0.5 rounded bg-surface-container-high font-mono text-[10px] text-on-surface-variant uppercase font-semibold">CH // 03</span>
<span class="font-label-sm text-[10px] uppercase tracking-wider text-secondary">Restored</span>
</div>
<span class="font-mono text-[11px] text-secondary">608 Remnants</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface">The Sunken Bell</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Water preserves only cold truths. The bell rings twice each solstice beneath the black peat colonnade.
        </p>
<div class="flex items-center justify-between pt-space-xs">
<button class="flex-1 py-space-xs px-space-md rounded-lg bg-surface-container-high text-secondary font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer" data-action="play">
<span>Enter Chapter</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
<button class="ml-space-sm p-space-xs rounded-lg bg-surface-container text-secondary flex items-center justify-center cursor-pointer milestone-btn" data-chapter-name="The Sunken Bell" data-remnants="20" title="Synchronize Milestone">
<span class="material-symbols-outlined text-[18px]">verified</span>
</button>
</div>
</article>
</div>
</div>
</main>
`;
}

export function bindMobileChaptersEvents(onNavigate: (route: string) => void): void {
  // Navigation into chapter
  const enterBtns = document.querySelectorAll('main [data-action="play"], main [data-chapter]');
  enterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      onNavigate('hud');
    });
  });

  // Milestone sync buttons
  const milestoneBtns = document.querySelectorAll('.milestone-btn');
  const toast = document.getElementById('archival-toast');
  const toastMsg = document.getElementById('toast-message');
  milestoneBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const chapter = btn.getAttribute('data-chapter-name') || 'Chapter';
      const rem = btn.getAttribute('data-remnants') || '25';
      if (toast && toastMsg) {
        toastMsg.textContent = `+${rem} Remnants synchronized from "${chapter}"`;
        toast.classList.remove('opacity-0', '-translate-y-2');
        toast.classList.add('opacity-100', 'translate-y-0');
        setTimeout(() => {
          toast.classList.remove('opacity-100', 'translate-y-0');
          toast.classList.add('opacity-0', '-translate-y-2');
        }, 2500);
      }
    });
  });
}
