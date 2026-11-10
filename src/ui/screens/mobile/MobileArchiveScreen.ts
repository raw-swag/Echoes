import { GameStateModel } from '@core/GameState';

export function renderMobileArchive(
  _state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div class="flex flex-col w-full px-gutter-mobile gap-space-lg pb-space-xl">
<!-- Archival Collection Dossier Header -->
<section class="flex flex-col gap-space-xs mt-space-sm">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-mono">Folio Ref. 08-B</span>
<div class="flex items-center gap-space-xs text-on-surface-variant font-mono text-[11px]">
<span class="material-symbols-outlined text-[14px]">lock_open</span>
<span class="font-label-sm text-label-sm uppercase" id="archive-unlocked-status">Unlocked 18/24</span>
</div>
</div>
<h2 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Archive 08 — Vault of Surrender</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant italic">Recovered remnants from the flooded terrace. Handle with care; paper brittle and ink prone to fading.</p>
</section>
<!-- Filter Index Strip -->
<div class="flex items-center gap-space-xs overflow-x-auto pb-1 no-scrollbar">
<button class="filter-pill px-space-md py-space-xs rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm uppercase shrink-0 transition-colors cursor-pointer" data-filter="all">All Folios</button>
<button class="filter-pill px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase shrink-0 hover:text-on-surface transition-colors cursor-pointer" data-filter="script">Scripts</button>
<button class="filter-pill px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase shrink-0 hover:text-on-surface transition-colors cursor-pointer" data-filter="relic">Relics</button>
<button class="filter-pill px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase shrink-0 hover:text-on-surface transition-colors cursor-pointer" data-filter="audio">Acoustic</button>
</div>
<!-- Primary Folio Plate -->
<div class="rounded-2xl bg-surface-container-low p-space-md shadow-xl border border-surface-container-high/40 flex flex-col gap-space-sm" id="primary-folio-plate">
<div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-lowest">
<img alt="Archival plate" class="w-full h-full object-cover" src="/assets/ui/sunken_bell.jpg"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
<div class="absolute bottom-space-sm left-space-sm right-space-sm flex items-center justify-between">
<span class="font-label-sm text-[10px] uppercase tracking-widest text-secondary font-mono">PLATE #042</span>
<span class="px-2 py-0.5 rounded bg-surface-container-lowest/80 text-tertiary font-mono text-[10px]">VERIFIED</span>
</div>
</div>
<!-- Interactive Redacted Text -->
<div class="p-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm leading-relaxed flex flex-col gap-space-xs">
<p>
        ...what remained was the cedar chests, three plumb-lines, and a bundle of dried 
        <span class="redaction-tag inline-block px-1.5 py-0.5 rounded bg-surface-container-highest text-transparent select-none cursor-pointer hover:bg-surface-bright transition-all" data-revealed="false" data-text="mountain sage" title="Tap to decipher">
          [REDACTION VOID]
        </span>
        wrapped in linen...
      </p>
<span class="font-label-sm text-[10px] text-secondary tracking-wide uppercase pt-1 font-mono">Tap redacted voids to decipher</span>
</div>
</div>
<!-- Folio Secondary Items Stack -->
<div class="flex flex-col gap-space-sm" id="mobile-archive-stack">
<article class="p-space-sm rounded-xl bg-surface-container-low flex items-center gap-space-md shadow-sm border-l-2 border-secondary cursor-pointer mobile-archive-item" data-category="script">
<div class="w-16 h-16 rounded-lg bg-surface-container-lowest overflow-hidden shrink-0">
<img alt="Fragment 42" class="w-full h-full object-cover" src="/assets/ui/archive_fragment_42.jpg"/>
</div>
<div class="flex flex-col flex-1 min-w-0">
<span class="font-label-sm text-[10px] uppercase text-secondary font-mono">FRAG // 042</span>
<h3 class="font-title-md text-title-md text-on-surface truncate">Water-Damaged Vellum</h3>
<span class="font-body-sm text-[11px] text-on-surface-variant truncate italic">“...the names of smaller birds were lost...”</span>
</div>
</article>

<article class="p-space-sm rounded-xl bg-surface-container-low flex items-center gap-space-md shadow-sm border-l-2 border-tertiary cursor-pointer mobile-archive-item" data-category="audio">
<div class="w-16 h-16 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 text-tertiary">
<span class="material-symbols-outlined text-[28px]">graphic_eq</span>
</div>
<div class="flex flex-col flex-1 min-w-0">
<span class="font-label-sm text-[10px] uppercase text-tertiary font-mono">ACOUSTIC // 09</span>
<h3 class="font-title-md text-title-md text-on-surface truncate">Peat Bog Resonance</h3>
<span class="font-body-sm text-[11px] text-on-surface-variant truncate italic">“Recorded 14.8 Hz solitary bronze bell”</span>
</div>
</article>
</div>
</div>
</main>
`;
}

export function bindMobileArchiveEvents(_onNavigate: (route: string) => void): void {
  // Redaction deciphering
  const redactions = document.querySelectorAll('.redaction-tag');
  const unlockedStatus = document.getElementById('archive-unlocked-status');
  redactions.forEach(tag => {
    tag.addEventListener('click', () => {
      const text = tag.getAttribute('data-text') || 'decoded truth';
      tag.classList.remove('text-transparent', 'bg-surface-container-highest');
      tag.classList.add('text-secondary-fixed', 'font-semibold', 'underline', 'bg-surface-container-high');
      tag.textContent = text;
      if (unlockedStatus) {
        unlockedStatus.textContent = 'Unlocked 19/24';
        unlockedStatus.classList.add('text-tertiary');
      }
    });
  });

  // Filter pills
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      pills.forEach(p => {
        p.className = 'filter-pill px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase shrink-0 hover:text-on-surface transition-colors cursor-pointer';
      });
      const target = e.currentTarget as HTMLElement;
      target.className = 'filter-pill px-space-md py-space-xs rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm uppercase shrink-0 transition-colors cursor-pointer';

      const filter = target.getAttribute('data-filter');
      const items = document.querySelectorAll<HTMLElement>('.mobile-archive-item');
      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}
