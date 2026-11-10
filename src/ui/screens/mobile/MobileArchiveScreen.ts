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
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Folio Ref. 08-B</span>
<div class="flex items-center gap-space-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[14px]">lock_open</span>
<span class="font-label-sm text-label-sm uppercase">Unlocked 18/24</span>
</div>
</div>
<h2 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Archive 08 — Vault of Surrender</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant italic">Recovered remnants from the flooded terrace. Handle with care; paper brittle and ink prone to fading.</p>
</section>
<!-- Filter Index Strip -->
<div class="flex items-center gap-space-xs overflow-x-auto pb-space-xs -mx-gutter-mobile px-gutter-mobile no-scrollbar" role="tablist">
<button aria-selected="true" class="shrink-0 px-space-md py-space-xs rounded bg-surface-container-high text-secondary font-label-sm text-label-sm uppercase tracking-wider transition-colors" role="tab" type="button">
      All Shards (18)
    </button>
<button aria-selected="false" class="shrink-0 px-space-md py-space-xs rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm uppercase tracking-wider transition-colors" role="tab" type="button">
      Photographs (7)
    </button>
<button aria-selected="false" class="shrink-0 px-space-md py-space-xs rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm uppercase tracking-wider transition-colors" role="tab" type="button">
      Recorded Whispers (6)
    </button>
<button aria-selected="false" class="shrink-0 px-space-md py-space-xs rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm uppercase tracking-wider transition-colors" role="tab" type="button">
      Forgotten (5)
    </button>
</div>
<!-- Featured Inspection Plate: Fragment #042 -->
<section class="flex flex-col bg-surface-container rounded-xl p-space-md gap-space-md shadow-md relative overflow-hidden">
<!-- Rivet Accents -->
<div class="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-secondary/40 shadow-inner"></div>
<div class="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-secondary/40 shadow-inner"></div>
<!-- Metadata Banner -->
<div class="flex items-center justify-between mt-space-xs">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[16px]">bookmark_manager</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Fragment #042</span>
</div>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant bg-surface-container-lowest px-space-sm py-0.5 rounded">Dated: [ ERASED ]</span>
</div>
<!-- Polaroid Plate -->
<div class="flex flex-col bg-surface-container-lowest p-space-sm rounded-lg shadow-sm">
<div class="relative w-full aspect-square rounded overflow-hidden bg-surface-container-highest">
<img alt="Silhouette of a traveler enveloped in twilight mist, vintage archival plate tone" class="w-full h-full object-cover grayscale-[30%] contrast-[110%] brightness-90" src="/assets/ui/mobile_avatar.jpg"/>
<!-- Archival pinhole & stamp overlay -->
<div class="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center">
<div class="w-1 h-1 rounded-full bg-surface-container-high"></div>
</div>
<div class="absolute bottom-2 right-2 bg-surface-container-lowest/85 px-space-xs py-0.5 rounded text-[9px] font-label-sm tracking-widest text-secondary uppercase">
          Plate 042-α
        </div>
</div>
<!-- Handwritten Margin Note -->
<div class="pt-space-sm pb-space-xs px-space-xs flex items-center justify-between">
<p class="font-headline-sm italic text-[15px] leading-snug text-secondary/90 tracking-wide">
          "We left it where sunlight couldn't find it."
        </p>
<span class="material-symbols-outlined text-on-surface-variant text-[16px] shrink-0 ml-space-xs">auto_fix</span>
</div>
</div>
<!-- Restoration Gauge -->
<div class="flex flex-col gap-space-xs">
<div class="flex justify-between items-center text-on-surface-variant">
<span class="font-label-sm text-label-sm uppercase tracking-wider">Restoration Fidelity</span>
<span class="font-label-sm text-label-sm uppercase font-semibold text-tertiary-fixed-dim" id="restoration-val">85% Restored</span>
</div>
<div class="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
<div class="h-full bg-tertiary-fixed-dim rounded-full transition-all duration-700" id="restoration-bar" style="width: 85%;"></div>
</div>
</div>
<!-- Redacted Transcript File -->
<div class="flex flex-col bg-surface-container-low rounded p-space-md gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[14px]">transcribe</span>
          Transcript Entry
        </span>
<span class="font-label-sm text-[9px] uppercase tracking-wider text-secondary">Tap redacted ink</span>
</div>
<p class="font-body-md text-body-md text-on-surface leading-relaxed select-none">
        The silver latch gave way under salt-crust. Inside the chamber, the brass key lay resting upon the cold sill, untouched since 
        <button class="redaction-chip inline-block bg-surface-container-highest hover:bg-secondary-container text-transparent px-space-xs rounded transition-all duration-300 cursor-pointer" onclick="revealRedaction(this)" title="Reveal memory fragment" type="button">
          the winter tides
        </button> 
        claimed the eastern causeway. A scent of dried 
        <button class="redaction-chip inline-block bg-surface-container-highest hover:bg-secondary-container text-transparent px-space-xs rounded transition-all duration-300 cursor-pointer" onclick="revealRedaction(this)" title="Reveal memory fragment" type="button">
          rosemary and paraffin
        </button> 
        still clung to the velvet lining.
      </p>
</div>
<!-- Action Prompt: Restore Shard -->
<div class="flex items-center justify-between pt-space-xs">
<div class="flex flex-col">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Restoration Cost</span>
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[16px]">token</span>
<span class="font-title-md text-title-md text-secondary">25 Remnants</span>
</div>
</div>
<button class="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface active:scale-[0.98] rounded transition-all" id="restore-btn" onclick="handleRestoration()" type="button">
<span class="material-symbols-outlined text-secondary text-[18px]" id="restore-icon">flare</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface" id="restore-label">Clarify Remnant</span>
</button>
</div>
</section>
<!-- Cryptic Undiscovered Shards -->
<section class="flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Uncataloged Shards in Vicinity</span>
<span class="font-label-sm text-label-sm text-secondary uppercase">2 Encrypted</span>
</div>
<div class="grid grid-cols-1 gap-space-sm">
<!-- Shard #043 -->
<div class="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low gap-space-md">
<div class="flex items-center gap-space-md min-w-0">
<div class="w-12 h-12 rounded bg-surface-container-highest flex items-center justify-center relative overflow-hidden shrink-0">
<span class="material-symbols-outlined text-outline-variant text-[24px] blur-[1px]">blur_on</span>
<div class="absolute inset-0 bg-surface-container-lowest/30 backdrop-blur-[2px]"></div>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Shard #043</span>
<span class="font-label-sm text-[9px] uppercase px-1 rounded bg-surface-container-highest text-on-surface-variant">Audio Plate</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant italic truncate mt-0.5">
              "Heard near the second water basin..."
            </p>
</div>
</div>
<button class="shrink-0 p-space-xs text-on-surface-variant hover:text-secondary rounded" type="button">
<span class="material-symbols-outlined text-[20px]">explore</span>
</button>
</div>
<!-- Shard #044 -->
<div class="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low gap-space-md">
<div class="flex items-center gap-space-md min-w-0">
<div class="w-12 h-12 rounded bg-surface-container-highest flex items-center justify-center relative overflow-hidden shrink-0">
<span class="material-symbols-outlined text-outline-variant text-[24px] blur-[2px]">draft</span>
<div class="absolute inset-0 bg-surface-container-lowest/30 backdrop-blur-[2px]"></div>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Shard #044</span>
<span class="font-label-sm text-[9px] uppercase px-1 rounded bg-surface-container-highest text-on-surface-variant">Parchment</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant italic truncate mt-0.5">
              "Submerged between two slate steps..."
            </p>
</div>
</div>
<button class="shrink-0 p-space-xs text-on-surface-variant hover:text-secondary rounded" type="button">
<span class="material-symbols-outlined text-[20px]">explore</span>
</button>
</div>
</div>
</section>
</div>
</main>
`;
}

export function bindMobileArchiveEvents(_onNavigate: (route: string) => void): void {
  const filterBtns = document.querySelectorAll('main [data-filter], main .rounded-full button');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('bg-surface-container-high', 'text-secondary'));
      btn.classList.add('bg-surface-container-high', 'text-secondary');
    });
  });
}
