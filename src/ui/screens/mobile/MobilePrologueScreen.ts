import { GameStateModel } from '@core/GameState';

export function renderMobilePrologue(
  _state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div class="flex flex-col w-full relative overflow-hidden select-none">
<!-- Interactive Canvas Particles / Ambience -->
<div class="absolute inset-0 pointer-events-none opacity-40 z-0 overflow-hidden" id="dust-ambient">
<div class="absolute -top-10 left-1/4 w-72 h-72 rounded-full bg-secondary-container/20 blur-3xl"></div>
<div class="absolute top-1/2 -right-16 w-80 h-80 rounded-full bg-surface-container-high/40 blur-3xl"></div>
</div>
<!-- Whisper Toast (Dismissible interactive moment of delight) -->
<div class="px-gutter-mobile pt-space-xs relative z-20">
<div class="w-full bg-surface-container-low/95 text-on-surface p-space-sm rounded-lg flex items-center justify-between shadow-md transition-all duration-500 ease-out" id="whisper-banner">
<div class="flex items-center gap-space-sm min-w-0">
<span class="material-symbols-outlined text-secondary text-[18px] shrink-0" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-space-xs">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest leading-none">Transmission Decoded</span>
<span class="font-label-sm text-[9px] text-on-surface-variant/70 font-mono">200 OK</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant truncate italic mt-0.5">
            "The dust remembers where the light fell."
          </p>
</div>
</div>
<div class="flex items-center gap-space-xs shrink-0 pl-space-xs">
<span class="font-label-sm text-label-sm text-secondary bg-surface-container-highest px-space-xs py-0.5 rounded font-mono">+3 Remnants</span>
<button class="w-7 h-7 flex items-center justify-center rounded text-on-surface-variant hover:text-on-surface cursor-pointer" id="btn-close-whisper">
<span class="material-symbols-outlined text-[16px]">close</span>
</button>
</div>
</div>
</div>
<!-- Hero Cinematic Narrative Foil -->
<div class="relative px-gutter-mobile pt-space-md pb-space-lg flex flex-col z-10">
<!-- Archival Index Pin -->
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm tracking-widest text-secondary uppercase font-mono">[ ARCHIVE REGISTRY: 00-OMISSION ]</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant font-mono">VER. 1.09.4</span>
</div>
<!-- Double Exposure Silhouette & Giant Ghosted Title Stack -->
<div class="relative w-full rounded-xl bg-surface-container-lowest overflow-hidden shadow-xl p-space-md mb-space-md">
<!-- Background Double-Exposure Vignette -->
<div class="absolute inset-0 z-0">
<img alt="Mysterious hooded traveler silhouette in misty forgotten twilight" class="w-full h-full object-cover opacity-25 mix-blend-screen scale-105 filter grayscale contrast-125" src="/assets/ui/mobile_avatar.jpg"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
<div class="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-surface-container-lowest/80"></div>
</div>
<!-- Forefront Editorial Header Elements -->
<div class="relative z-10 flex flex-col justify-end pt-space-xl">
<span class="font-display-lg-mobile text-display-lg-mobile text-on-surface/10 tracking-[0.25em] font-headline-lg absolute top-0 left-0 pointer-events-none select-none">
          ECHOES
        </span>
<div class="relative mt-space-lg">
<h2 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-headline-lg tracking-wider leading-none">
            ECHOES
          </h2>
<p class="font-label-sm text-label-sm text-secondary tracking-[0.2em] uppercase mt-space-xs font-title-md">
            The Things We Chose To Forget
          </p>
</div>
<div class="mt-space-md pt-space-sm flex items-center justify-between gap-space-sm bg-surface-container-high/40 backdrop-blur-md px-space-sm py-space-xs rounded-lg cursor-pointer" id="narrative-cycle-box">
<p class="font-body-sm text-body-sm text-on-surface-variant italic transition-opacity duration-500" id="fading-narrative">
            "Some things are lost. Others are left behind."
          </p>
<span class="material-symbols-outlined text-[14px] text-secondary shrink-0">cached</span>
</div>
</div>
</div>
<!-- Active Memory Lens Preview (Diegetic Artifact) -->
<div class="bg-surface-container-low rounded-xl p-space-md mb-space-md shadow-md flex items-center gap-space-md relative overflow-hidden cursor-pointer" id="lens-preview-box">
<div class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 text-secondary relative">
<span class="material-symbols-outlined text-[24px]">lens_blur</span>
<span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
</div>
<div class="flex flex-col min-w-0 flex-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Active Resonance Focal</span>
<span class="font-label-sm text-[10px] text-tertiary font-mono">CH. 01 RESTORED</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface truncate">The Threshold of Ash &amp; Salt</p>
<div class="flex items-center gap-space-xs text-[10px] text-on-surface-variant font-mono mt-0.5">
<span>TETHER: 99.8%</span>
<span>•</span>
<span>420 REMNANTS</span>
</div>
</div>
</div>
<!-- Quick Navigation Folio Jump Cards -->
<div class="grid grid-cols-2 gap-space-sm mb-space-md">
<button class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container flex flex-col justify-between text-left transition-colors shadow-sm cursor-pointer" data-route="chapters">
<div class="flex items-center justify-between w-full mb-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Folios</span>
<span class="material-symbols-outlined text-[16px] text-secondary">arrow_forward</span>
</div>
<span class="font-headline-sm text-headline-sm text-on-surface">Chapters</span>
<span class="font-label-sm text-[10px] text-on-surface-variant">5 Strata Catalogued</span>
</button>
<button class="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container flex flex-col justify-between text-left transition-colors shadow-sm cursor-pointer" data-route="archive">
<div class="flex items-center justify-between w-full mb-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Vault</span>
<span class="material-symbols-outlined text-[16px] text-secondary">arrow_forward</span>
</div>
<span class="font-headline-sm text-headline-sm text-on-surface">Archive</span>
<span class="font-label-sm text-[10px] text-on-surface-variant">18 Folio Plates</span>
</button>
</div>
<!-- Enter Primary Journey Button -->
<button class="w-full py-space-md px-space-lg rounded-xl bg-secondary text-on-secondary font-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-space-sm shadow-xl active:scale-95 transition-all cursor-pointer" id="btn-enter-recollection">
<span>Enter Resonance HUD</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
</main>
`;
}

export function bindMobilePrologueEvents(onNavigate: (route: string) => void): void {
  // Enter button
  const enterBtn = document.getElementById('btn-enter-recollection');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => onNavigate('hud'));
  }

  // Lens preview box
  const lensBox = document.getElementById('lens-preview-box');
  if (lensBox) {
    lensBox.addEventListener('click', () => onNavigate('hud'));
  }

  // Close whisper banner
  const closeBtn = document.getElementById('btn-close-whisper');
  const banner = document.getElementById('whisper-banner');
  if (closeBtn && banner) {
    closeBtn.addEventListener('click', () => {
      banner.classList.add('opacity-0', '-translate-y-2');
      setTimeout(() => banner.remove(), 400);
    });
  }

  // Narrative poetic cycle
  const narratives = [
    '"Some things are lost. Others are left behind."',
    '"We did not forget. We simply buried the key."',
    '"An echo is a sound that refuses to become silence."',
    '"The dust remembers where the light fell."'
  ];
  let quoteIndex = 0;
  const cycleBox = document.getElementById('narrative-cycle-box');
  const narrativeText = document.getElementById('fading-narrative');
  if (cycleBox && narrativeText) {
    cycleBox.addEventListener('click', () => {
      narrativeText.style.opacity = '0';
      setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % narratives.length;
        narrativeText.textContent = narratives[quoteIndex];
        narrativeText.style.opacity = '1';
      }, 300);
    });
  }

  // Navigation tiles
  const navTiles = document.querySelectorAll('main [data-route]');
  navTiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
      const route = (e.currentTarget as HTMLElement).getAttribute('data-route');
      if (route) onNavigate(route);
    });
  });
}
