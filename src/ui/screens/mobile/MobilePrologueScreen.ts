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
<button class="w-7 h-7 flex items-center justify-center rounded text-on-surface-variant hover:text-on-surface" onclick="document.getElementById('whisper-banner').classList.add('opacity-0', '-translate-y-2'); setTimeout(() =&gt; document.getElementById('whisper-banner').remove(), 500);">
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
<div class="mt-space-md pt-space-sm flex items-center justify-between gap-space-sm bg-surface-container-high/40 backdrop-blur-md px-space-sm py-space-xs rounded-lg">
<p class="font-body-sm text-body-sm text-on-surface-variant italic cursor-pointer transition-opacity duration-700" id="fading-narrative" onclick="cycleNarrative()">
            "Some things are lost. Others are left behind."
          </p>
<span class="material-symbols-outlined text-[14px] text-secondary shrink-0">cached</span>
</div>
</div>
</div>
<!-- Active Memory Lens Preview (Diegetic Artifact) -->
<div class="bg-surface-container-low rounded-xl p-space-md mb-space-md shadow-md flex items-center gap-space-md relative overflow-hidden">
<div class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 text-secondary relative">
<span class="material-symbols-outlined text-[24px]">lens_blur</span>
<span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
</div>
<div class="flex flex-col min-w-0 flex-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Active Resonance Focal</span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-mono">STABLE (94%)</span>
</div>
<p class="font-title-md text-title-md text-on-surface truncate">Chapter I: The Sound of Leaving</p>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Last synchronized ledger entry: 04:12 AM</span>
</div>
</div>
<!-- Asymmetrical Cinematic Navigation Menu -->
<div class="flex flex-col gap-space-xs w-full">
<span class="font-label-sm text-label-sm text-on-surface-variant/80 uppercase tracking-widest px-space-xs mb-space-xs">
        Recollection Folio
      </span>
<!-- 1. BEGIN REMEMBERING -->
<button class="group w-full min-h-[52px] px-space-md py-space-sm rounded-lg bg-surface-container text-left flex items-center justify-between hover:bg-surface-container-high transition-all active:scale-[0.99] shadow-sm">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-1.5 h-5 bg-secondary rounded-full group-hover:h-6 transition-all duration-300"></span>
<div class="flex flex-col min-w-0">
<span class="font-title-md text-title-md text-on-surface group-hover:text-secondary-fixed transition-colors">Begin Remembering</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Initiate first unspooling sequence</span>
</div>
</div>
<div class="flex items-center gap-space-xs text-secondary shrink-0">
<span class="font-label-sm text-label-sm font-mono uppercase tracking-wider">Act I</span>
<span class="material-symbols-outlined text-[18px]">play_arrow</span>
</div>
</button>
<!-- 2. RESUME RECOLLECTION -->
<button class="group w-full min-h-[52px] px-space-md py-space-sm rounded-lg bg-surface-container text-left flex items-center justify-between hover:bg-surface-container-high transition-all active:scale-[0.99]">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-1.5 h-1.5 bg-on-surface-variant/60 rounded-full group-hover:bg-secondary"></span>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-space-xs">
<span class="font-title-md text-title-md text-on-surface">Resume Recollection</span>
<span class="font-label-sm text-[9px] px-1 bg-surface-container-highest rounded text-on-surface-variant font-mono">AUTOSAVE</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">04:12 AM • 24 Remnants in vault</span>
</div>
</div>
<div class="flex items-center gap-space-xs text-on-surface-variant group-hover:text-secondary shrink-0">
<span class="material-symbols-outlined text-[18px]">history</span>
</div>
</button>
<!-- 3. CHAPTER CATALOGUE -->
<button class="group w-full min-h-[48px] px-space-md py-space-sm rounded-lg bg-surface-container text-left flex items-center justify-between hover:bg-surface-container-high transition-all active:scale-[0.99]">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-1.5 h-1.5 bg-on-surface-variant/60 rounded-full group-hover:bg-secondary"></span>
<div class="flex flex-col min-w-0">
<span class="font-title-md text-title-md text-on-surface">Chapter Catalogue</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">4 memories indexed • 1 uncharted</span>
</div>
</div>
<div class="flex items-center gap-space-xs text-on-surface-variant group-hover:text-on-surface shrink-0">
<span class="font-label-sm text-label-sm font-mono text-on-surface-variant">04 / 05</span>
<span class="material-symbols-outlined text-[18px]">menu_book</span>
</div>
</button>
<!-- 4. ARCHIVAL VAULT -->
<button class="group w-full min-h-[48px] px-space-md py-space-sm rounded-lg bg-surface-container text-left flex items-center justify-between hover:bg-surface-container-high transition-all active:scale-[0.99]">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-1.5 h-1.5 bg-on-surface-variant/60 rounded-full group-hover:bg-secondary"></span>
<div class="flex flex-col min-w-0">
<span class="font-title-md text-title-md text-on-surface">Archival Vault</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">18 fragments filed &amp; preserved</span>
</div>
</div>
<div class="flex items-center gap-space-xs text-on-surface-variant group-hover:text-on-surface shrink-0">
<span class="material-symbols-outlined text-[18px]">inventory_2</span>
</div>
</button>
<!-- 5. SYSTEM & MEMORY PRIVACY -->
<button class="group w-full min-h-[48px] px-space-md py-space-sm rounded-lg bg-surface-container text-left flex items-center justify-between hover:bg-surface-container-high transition-all active:scale-[0.99]">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-1.5 h-1.5 bg-on-surface-variant/60 rounded-full group-hover:bg-secondary"></span>
<div class="flex flex-col min-w-0">
<span class="font-title-md text-title-md text-on-surface">System &amp; Memory Privacy</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Reduced motion, sync, intentional forgetting</span>
</div>
</div>
<div class="flex items-center gap-space-xs text-on-surface-variant group-hover:text-on-surface shrink-0">
<span class="material-symbols-outlined text-[18px]">tune</span>
</div>
</button>
</div>
<!-- Hidden Delight: Cracked Archival Seal -->
<div class="mt-space-lg pt-space-xs flex flex-col items-center">
<div class="cursor-pointer group flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-low hover:bg-surface-container transition-all active:scale-95 shadow-sm" id="secret-seal" onclick="unsealMemory()">
<span class="material-symbols-outlined text-secondary text-[16px] group-hover:rotate-12 transition-transform">lock_clock</span>
<span class="font-label-sm text-label-sm text-on-surface-variant group-hover:text-secondary transition-colors uppercase tracking-widest" id="seal-text">
          Tap wax seal to unspool secret record #09
        </span>
</div>
<!-- Revealed Memory Box (Initially Hidden) -->
<div class="hidden w-full mt-space-sm p-space-md bg-secondary-container/30 text-on-surface rounded-xl shadow-md transition-all duration-500" id="secret-card">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[18px]">verified</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Recovered Echo #09</span>
</div>
<span class="font-label-sm text-label-sm text-secondary font-mono">+10 REMNANTS</span>
</div>
<p class="font-body-md text-body-md text-on-surface mt-space-xs italic font-headline-sm">
          "We wrapped the silver spoons in linen and buried them beneath the greenhouse flagstones, swearing never to speak of that winter again."
        </p>
<div class="flex items-center justify-between mt-space-sm pt-space-xs">
<span class="font-label-sm text-label-sm text-on-surface-variant">Filed under: Suppressed domesticity</span>
<span class="font-label-sm text-label-sm text-secondary uppercase font-semibold">Ledger Updated</span>
</div>
</div>
</div>
</div>
</div>
</main>
`;
}

export function bindMobilePrologueEvents(onNavigate: (route: string) => void): void {
  const actionBtn = document.querySelector('main button, #btn-begin, [data-path="hud"]');
  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      onNavigate('hud');
    });
  }

  const focal = document.querySelector('.bg-surface-container-low.rounded-xl.p-space-md');
  if (focal) {
    focal.addEventListener('click', () => {
      onNavigate('hud');
    });
  }
}
