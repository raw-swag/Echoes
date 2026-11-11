import { GameStateModel } from '@core/GameState';
import { soundService } from '@audio/SoundService';

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
<div class="flex items-baseline gap-space-xs">
<span class="font-headline-lg text-headline-lg text-secondary font-normal" id="chapter-remnants-display">1,408</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">/ 2,400</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Remnants Archived</span>
<div class="w-48 h-1.5 bg-surface-container-high rounded-full overflow-hidden mt-space-xs">
<div class="bg-secondary h-full rounded-full transition-all duration-500" id="chapter-progress-bar" style="width: 58.6%;"></div>
</div>
</div>
<!-- Quick Navigation Action -->
<button class="flex items-center gap-space-xs font-label-md text-label-md uppercase px-space-md py-space-xs rounded bg-surface-container-high text-secondary hover:bg-surface-variant transition-colors shadow-sm cursor-pointer" id="claim-all-remnants-btn">
<span class="material-symbols-outlined text-[16px]">hourglass_empty</span>
<span>Ledger Attested</span>
</button>
</div>
</section>
<!-- Stratum Filter Tags -->
<div class="flex items-center justify-between border-b border-surface-container-high pb-space-md">
<div class="flex items-center gap-space-sm">
<button class="chapter-filter-btn font-label-sm text-label-sm uppercase px-space-md py-space-xs bg-surface-container text-secondary rounded cursor-pointer" data-filter="all">All Chapters (05)</button>
<button class="chapter-filter-btn font-label-sm text-label-sm uppercase px-space-md py-space-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-filter="unlocked">Restored (03)</button>
<button class="chapter-filter-btn font-label-sm text-label-sm uppercase px-space-md py-space-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-filter="locked">Dormant (02)</button>
</div>
<div class="hidden sm:flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm uppercase">
<span>Chronological Sequence</span>
<span class="material-symbols-outlined text-[14px]">unfold_more</span>
</div>
</div>
<!-- Chapters Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg" id="chapters-card-grid">
<!-- Chapter 01: Active Playable -->
<article class="chapter-card group flex flex-col justify-between bg-surface-container-low rounded-xl overflow-hidden shadow-lg border border-secondary/20 hover:border-secondary/40 transition-all duration-300 cursor-pointer" data-chapter="01" data-status="unlocked">
<div>
<!-- Atmospheric Chapter Illustration -->
<div class="relative w-full h-48 bg-surface-container-lowest overflow-hidden">
<img alt="Chapter 01 Artwork" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" src="/assets/ui/clockwork_clearing.jpg"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
<div class="absolute top-space-md left-space-md px-space-sm py-space-xs rounded bg-surface-container-lowest/80 backdrop-blur-md">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-mono">CH // 01</span>
</div>
<div class="absolute top-space-md right-space-md flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-lowest/80 backdrop-blur-md text-tertiary">
<span class="material-symbols-outlined text-[14px]">lock_open</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Playable</span>
</div>
</div>
<!-- Narrative Summary -->
<div class="p-space-lg flex flex-col gap-space-sm">
<div class="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase">
<span>Stratum: Deep Woods</span>
<span>•</span>
<span>420 Remnants</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                  The Sound of Leaving
                </h2>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                  Footsteps across cold river mud. The sound of cedar trees in the autumn gale, dropping seeds that will never see the light of the upper terrace.
                </p>
</div>
</div>
<!-- Card Action Footer -->
<div class="p-space-lg pt-0 flex items-center gap-space-sm">
<button class="flex-1 flex items-center justify-center gap-space-sm px-space-lg py-space-md rounded bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors shadow-md group cursor-pointer" id="enter-chapter-01">
<span class="font-label-md text-label-md uppercase tracking-wider font-semibold">Enter Memory</span>
<span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<button class="w-12 h-11 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors shadow-sm cursor-pointer audio-preview-btn" title="Inspect Audio Archive">
<span class="material-symbols-outlined text-[18px]">volume_up</span>
</button>
</div>
</article>

<!-- Chapter 02: Restored -->
<article class="chapter-card group flex flex-col justify-between bg-surface-container-low rounded-xl overflow-hidden shadow-lg border border-surface-container-high hover:border-secondary/30 transition-all duration-300 cursor-pointer" data-chapter="02" data-status="unlocked">
<div>
<div class="relative w-full h-48 bg-surface-container-lowest overflow-hidden">
<img alt="Chapter 02 Artwork" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" src="/assets/ui/departure_gate.jpg"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
<div class="absolute top-space-md left-space-md px-space-sm py-space-xs rounded bg-surface-container-lowest/80 backdrop-blur-md">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-mono">CH // 02</span>
</div>
<div class="absolute top-space-md right-space-md flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-lowest/80 backdrop-blur-md text-tertiary">
<span class="material-symbols-outlined text-[14px]">lock_open</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Restored</span>
</div>
</div>
<div class="p-space-lg flex flex-col gap-space-sm">
<div class="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase">
<span>Stratum: Clockwork Clearing</span>
<span>•</span>
<span>380 Remnants</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                  The Clockwork Clearing
                </h2>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                  Cogs grounded down to silent brass teeth. A pendulum stopped mid-arc at the thirty-fourth second of an hour no one remains to name.
                </p>
</div>
</div>
<div class="p-space-lg pt-0 flex items-center gap-space-sm">
<button class="flex-1 flex items-center justify-center gap-space-sm px-space-lg py-space-md rounded bg-surface-container-high text-on-surface hover:bg-surface-bright transition-colors shadow-md group cursor-pointer" data-chapter="02">
<span class="font-label-md text-label-md uppercase tracking-wider">Enter Recollection</span>
<span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<button class="w-12 h-11 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors shadow-sm cursor-pointer audio-preview-btn" title="Inspect Audio Archive">
<span class="material-symbols-outlined text-[18px]">volume_up</span>
</button>
</div>
</article>

<!-- Chapter 03: Sunken Bell -->
<article class="chapter-card group flex flex-col justify-between bg-surface-container-low rounded-xl overflow-hidden shadow-lg border border-surface-container-high hover:border-secondary/30 transition-all duration-300 cursor-pointer" data-chapter="03" data-status="unlocked">
<div>
<div class="relative w-full h-48 bg-surface-container-lowest overflow-hidden">
<img alt="Chapter 03 Artwork" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" src="/assets/ui/sunken_bell.jpg"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
<div class="absolute top-space-md left-space-md px-space-sm py-space-xs rounded bg-surface-container-lowest/80 backdrop-blur-md">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-mono">CH // 03</span>
</div>
<div class="absolute top-space-md right-space-md flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-lowest/80 backdrop-blur-md text-tertiary">
<span class="material-symbols-outlined text-[14px]">lock_open</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Restored</span>
</div>
</div>
<div class="p-space-lg flex flex-col gap-space-sm">
<div class="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase">
<span>Stratum: Submerged Colonnade</span>
<span>•</span>
<span>608 Remnants</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                  The Sunken Bell
                </h2>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                  Water preserves only cold truths. The bell rings twice each solstice beneath the black peat, echoing through drowned cathedrals.
                </p>
</div>
</div>
<div class="p-space-lg pt-0 flex items-center gap-space-sm">
<button class="flex-1 flex items-center justify-center gap-space-sm px-space-lg py-space-md rounded bg-surface-container-high text-on-surface hover:bg-surface-bright transition-colors shadow-md group cursor-pointer" data-chapter="03">
<span class="font-label-md text-label-md uppercase tracking-wider">Enter Recollection</span>
<span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<button class="w-12 h-11 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors shadow-sm cursor-pointer audio-preview-btn" title="Inspect Audio Archive">
<span class="material-symbols-outlined text-[18px]">volume_up</span>
</button>
</div>
</article>

<!-- Chapter 04: Dormant -->
<article class="chapter-card group flex flex-col justify-between bg-surface-container-low/60 rounded-xl overflow-hidden shadow-sm border border-surface-container-high opacity-70 hover:opacity-100 transition-all duration-300" data-chapter="04" data-status="locked">
<div>
<div class="relative w-full h-48 bg-surface-container-lowest flex items-center justify-center">
<span class="material-symbols-outlined text-[48px] text-on-surface-variant/30">lock</span>
<div class="absolute top-space-md left-space-md px-space-sm py-space-xs rounded bg-surface-container-lowest/80 backdrop-blur-md">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest font-mono">CH // 04</span>
</div>
<div class="absolute top-space-md right-space-md flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-lowest/80 backdrop-blur-md text-on-surface-variant">
<span class="font-label-sm text-label-sm uppercase tracking-wider">Dormant</span>
</div>
</div>
<div class="p-space-lg flex flex-col gap-space-sm">
<div class="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase">
<span>Stratum: Mirror Laboratory</span>
<span>•</span>
<span>500 Remnants Required</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface/80">
                  The Mirror Laboratory
                </h2>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                  Reflections that arrive three seconds after the observer turns away. Silver halide dissolved in mercury vats.
                </p>
</div>
</div>
<div class="p-space-lg pt-0">
<button class="w-full py-space-md rounded bg-surface-container-high/50 text-on-surface-variant font-label-md uppercase tracking-wider cursor-not-allowed">
                Attune Remaining Remnants
              </button>
</div>
</article>

<!-- Chapter 05: Nexus Gate -->
<article class="chapter-card group flex flex-col justify-between bg-surface-container-low/60 rounded-xl overflow-hidden shadow-sm border border-surface-container-high opacity-70 hover:opacity-100 transition-all duration-300" data-chapter="05" data-status="locked">
<div>
<div class="relative w-full h-48 bg-surface-container-lowest flex items-center justify-center">
<span class="material-symbols-outlined text-[48px] text-on-surface-variant/30">key_off</span>
<div class="absolute top-space-md left-space-md px-space-sm py-space-xs rounded bg-surface-container-lowest/80 backdrop-blur-md">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest font-mono">CH // 05</span>
</div>
<div class="absolute top-space-md right-space-md flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-lowest/80 backdrop-blur-md text-on-surface-variant">
<span class="font-label-sm text-label-sm uppercase tracking-wider">Locked</span>
</div>
</div>
<div class="p-space-lg flex flex-col gap-space-sm">
<div class="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase">
<span>Stratum: The Final Nexus</span>
<span>•</span>
<span>1,000 Remnants Required</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface/80">
                  The Nexus Gate
                </h2>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                  The threshold where forgetting stops and deliberate erasure begins. The final unwritten ledger awaiting attunement.
                </p>
</div>
</div>
<div class="p-space-lg pt-0">
<button class="w-full py-space-md rounded bg-surface-container-high/50 text-on-surface-variant font-label-md uppercase tracking-wider cursor-not-allowed">
                Requires Full Ledger Seal
              </button>
</div>
</article>
</div>
</div>
</div>
</main>
`;
}

export function bindWebChaptersEvents(onNavigate: (route: string) => void): void {
  // Navigation into chapter 1 or any unlocked chapter
  const enterBtns = document.querySelectorAll('#enter-chapter-01, [data-chapter="01"], [data-chapter="02"], [data-chapter="03"]');
  enterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      onNavigate('hud');
    });
  });

  // Filter tag buttons (All, Restored, Dormant)
  const filterBtns = document.querySelectorAll('.chapter-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => {
        b.className = 'chapter-filter-btn font-label-sm text-label-sm uppercase px-space-md py-space-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer';
      });
      const target = e.currentTarget as HTMLElement;
      target.className = 'chapter-filter-btn font-label-sm text-label-sm uppercase px-space-md py-space-xs bg-surface-container text-secondary rounded cursor-pointer';
      
      const filter = target.getAttribute('data-filter');
      const cards = document.querySelectorAll<HTMLElement>('.chapter-card');
      cards.forEach(card => {
        const status = card.getAttribute('data-status');
        if (filter === 'all' || (filter === 'unlocked' && status === 'unlocked') || (filter === 'locked' && status === 'locked')) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Audio preview buttons
  const audioBtns = document.querySelectorAll('.audio-preview-btn');
  audioBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundService.playShardCollect();
      btn.classList.add('text-secondary', 'scale-110');
      setTimeout(() => btn.classList.remove('text-secondary', 'scale-110'), 600);
    });
  });

  // Claim all remnants ledger button
  const claimBtn = document.getElementById('claim-all-remnants-btn');
  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      soundService.playBeaconActivate();
      claimBtn.innerHTML = '<span class="material-symbols-outlined text-[16px] text-tertiary">check</span><span class="text-tertiary">Synced</span>';
      setTimeout(() => {
        claimBtn.innerHTML = '<span class="material-symbols-outlined text-[16px]">hourglass_empty</span><span>Ledger Attested</span>';
      }, 2000);
    });
  }
}
