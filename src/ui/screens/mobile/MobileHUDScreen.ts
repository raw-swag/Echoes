import { GameStateModel } from '@core/GameState';
import { modalController } from '@ui/components/ModalController';

export function renderMobileHUD(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div class="flex flex-col w-full relative select-none">
<!-- Viewport Frame / Living Playfield Layer -->
<div id="gameplay-viewport" class="relative w-full h-[620px] rounded-xl overflow-hidden bg-surface-container-lowest shadow-2xl flex flex-col justify-between">
<!-- Diegetic Background World Canvas -->
<div class="absolute inset-0 z-0 bg-cover bg-center filter contrast-105 brightness-90 transition-transform duration-1000 ease-out" style="background-image: url('/assets/ui/mobile_avatar.jpg');">
<!-- Vignette and Ambient Gradient Overlays -->
<div class="absolute inset-0 bg-gradient-to-t from-background via-surface-container-lowest/40 to-background/90"></div>
<div class="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70"></div>
<!-- Subtle Atmospheric Mist Particle Layer (Simulated via SVG) -->
<svg class="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
<filter id="hud-fog">
<feturbulence basefrequency="0.015" numoctaves="3" result="noise" type="fractalNoise"></feturbulence>
<fecolormatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.4 0"></fecolormatrix>
</filter>
<rect filter="url(#hud-fog)" height="100%" width="100%"></rect>
</svg>
</div>
<!-- Top Floating Toast Notification (Rekindled Beacon Remnant Surge) -->
<div class="absolute top-2 right-4 z-40 flex items-center gap-space-sm px-space-md py-space-xs rounded bg-surface-container-lowest/80 backdrop-blur-md transition-all duration-700 transform translate-y-0 opacity-100 shadow-md" id="remnant-toast">
<span class="material-symbols-outlined text-secondary text-[16px] animate-pulse">auto_awesome</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-secondary font-semibold tracking-wider uppercase">+15 Remnants: Beacon Rekindled</span>
<span class="font-body-sm text-[10px] text-on-surface-variant italic">“A spark in the quiet.” — Synced</span>
</div>
</div>
<!-- TOP HUD LAYER: Diegetic Metrics & Echo Ring -->
<div class="relative z-30 pt-4 px-4 flex items-start justify-between">
<!-- Upper Left: The Archival Echo Ring Indicator -->
<div class="flex items-center gap-space-sm bg-surface-container-lowest/70 backdrop-blur-md px-space-sm py-space-xs rounded-xl shadow-lg">
<!-- SVG Ring Progress -->
<div class="relative w-12 h-12 flex items-center justify-center shrink-0">
<svg class="w-12 h-12 -rotate-90" viewbox="0 0 48 48">
<!-- Background Path -->
<circle class="text-surface-container-highest" cx="24" cy="24" fill="none" r="20" stroke="currentColor" stroke-dasharray="3 3" stroke-width="2.5"></circle>
<!-- Active Fill Path -->
<circle class="text-secondary transition-all duration-300" cx="24" cy="24" fill="none" id="echo-ring-svg" r="20" stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="65" stroke-linecap="round" stroke-width="2.5"></circle>
</svg>
<span class="material-symbols-outlined text-secondary text-[18px] absolute" id="echo-center-icon">adjust</span>
</div>
<!-- Echo Meta Details -->
<div class="flex flex-col min-w-0 pr-space-xs">
<div class="flex items-center gap-space-xs">
<span class="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" id="echo-status-dot"></span>
<span class="font-label-sm text-[10px] uppercase text-secondary font-semibold tracking-widest truncate" id="echo-state-label">RECORDING TRACE</span>
</div>
<span class="font-title-md text-[13px] text-on-surface tracking-wider font-mono" id="echo-timer">02.4s <span class="text-on-surface-variant/70 text-[10px]">/ 05.0s</span></span>
</div>
</div>
<!-- Top Center: Archival Hero Stability Integrity Pips -->
<div class="flex flex-col items-center bg-surface-container-lowest/60 backdrop-blur-sm px-space-md py-space-xs rounded-full">
<span class="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant mb-1">Stability (${state.collectedShardsCurrent}/${state.collectedShardsTotal})</span>
<div class="flex items-center gap-1.5" id="mobile-integrity-pips">
<!-- Pip 1 -->
<div class="w-3 h-3 rotate-45 ${state.mindIntegrity >= 1 ? 'bg-secondary' : 'bg-surface-container-highest'} flex items-center justify-center transition-all duration-300 shadow-sm" id="pip-1">
<div class="w-1 h-1 ${state.mindIntegrity >= 1 ? 'bg-surface-container-lowest' : 'bg-secondary/40'} rounded-full"></div>
</div>
<!-- Pip 2 -->
<div class="w-3 h-3 rotate-45 ${state.mindIntegrity >= 2 ? 'bg-secondary' : 'bg-surface-container-highest'} flex items-center justify-center transition-all duration-300 shadow-sm" id="pip-2">
<div class="w-1 h-1 ${state.mindIntegrity >= 2 ? 'bg-surface-container-lowest' : 'bg-secondary/40'} rounded-full"></div>
</div>
<!-- Pip 3 -->
<div class="w-3 h-3 rotate-45 ${state.mindIntegrity >= 3 ? 'bg-secondary' : 'bg-surface-container-highest'} flex items-center justify-center transition-all duration-300" id="pip-3">
<div class="w-1 h-1 ${state.mindIntegrity >= 3 ? 'bg-surface-container-lowest' : 'bg-secondary/40'} rounded-full"></div>
</div>
</div>
</div>
<!-- Upper Right: Ghost Checkpoint & Quick Pause -->
<div class="flex items-center gap-space-xs">
<div class="flex items-center gap-1 bg-surface-container-lowest/70 backdrop-blur-md px- space-sm px-2.5 py-1.5 rounded-lg text-tertiary">
<span class="material-symbols-outlined text-[15px]">flag_circle</span>
<span class="font-label-sm text-[9px] uppercase tracking-widest text-tertiary-fixed-dim">CP-14</span>
</div>
<button aria-label="Audio & Settings" class="w-8 h-8 rounded-lg bg-surface-container-lowest/70 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-secondary active:scale-95 transition-all" id="btn-mobile-settings">
<span class="material-symbols-outlined text-[18px]">tune</span>
</button>
<button aria-label="Pause Recollection" class="w-8 h-8 rounded-lg bg-surface-container-lowest/70 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-secondary active:scale-95 transition-all" id="btn-pause">
<span class="material-symbols-outlined text-[18px]">pause</span>
</button>
</div>
</div>
<!-- MIDDLE LAYER: Diegetic World Overlay Elements -->
<div class="relative z-20 flex-1 flex flex-col justify-end px-6 pb-4 pointer-events-none">
<!-- In-world Spatial Prompt (Appears over game environment) -->
<div class="self-center mb-6 flex flex-col items-center text-center animate-bounce duration-1000" id="spatial-interaction-prompt">
<div class="px-space-md py-space-xs rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-xl flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[16px]">fingerprint</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface">Memory Trace Detected [Press Recall]</span>
</div>
<div class="w-1.5 h-1.5 rotate-45 bg-surface-container-lowest/80 -mt-1"></div>
</div>
<!-- Environmental Narrative Whisper Bar (Discreet Sub-HUD text) -->
<div class="self-start max-w-xs bg-surface-container-lowest/60 backdrop-blur-sm px-3 py-1.5 rounded flex items-center gap-2">
<span class="material-symbols-outlined text-on-surface-variant text-[14px]">graphic_eq</span>
<span class="font-body-sm text-body-sm text-on-surface-variant/90 italic truncate">“${state.activeWhisper}”</span>
</div>
</div>
<!-- BOTTOM LAYER: Diegetic Touch Interaction Control Bar -->
<div class="relative z-30 px-4 pb-4 pt-2 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent">
<div class="flex items-center justify-between gap-4">
<!-- Left Thumb: HOLD TO RECALL [VEIL SIGHT] -->
<div class="flex flex-col items-start gap-1">
<button class="group relative flex items-center gap-space-sm px-space-md py-3 rounded-xl bg-surface-container-low/90 active:bg-secondary-container transition-all duration-200 active:scale-95 shadow-xl overflow-hidden min-w-[145px]" id="btn-recall">
<!-- Inner charging bar animation on press -->
<div class="absolute inset-y-0 left-0 w-0 bg-secondary/20 transition-all duration-150" id="recall-progress-bar"></div>
<div class="w-8 h-8 rounded bg-surface-container-highest/60 flex items-center justify-center text-secondary relative z-10">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</div>
<div class="flex flex-col text-left relative z-10">
<span class="font-label-sm text-[9px] uppercase tracking-widest text-secondary font-semibold">HOLD TO RECALL</span>
<span class="font-body-sm text-[11px] text-on-surface leading-tight font-medium">Veil Sight</span>
</div>
</button>
<span class="font-label-sm text-[8px] text-on-surface-variant/60 tracking-wider pl-1">LEFT ANCHOR</span>
</div>
<!-- Right Thumb: Action Pair (Jump & Echo Trace) -->
<div class="flex items-center gap-2">
<!-- Jump / Restore Action Button -->
<div class="flex flex-col items-center gap-1">
<button class="w-12 h-12 rounded-xl bg-surface-container-low/90 active:bg-surface-container-highest flex items-center justify-center text-on-surface active:scale-90 transition-all duration-150 shadow-xl" id="btn-jump">
<span class="material-symbols-outlined text-[22px]">north</span>
</button>
<span class="font-label-sm text-[8px] uppercase tracking-wider text-on-surface-variant/60">JUMP</span>
</div>
<!-- Primary Hero Ability: ECHO TRACE [ACTIVATE] -->
<div class="flex flex-col items-end gap-1">
<button class="relative flex items-center gap-space-sm px-space-md py-3 rounded-xl bg-secondary text-on-secondary active:scale-95 transition-all duration-200 shadow-xl min-w-[130px] justify-center" id="btn-activate-echo">
<span class="material-symbols-outlined text-[20px]">play_circle</span>
<div class="flex flex-col text-left">
<span class="font-label-sm text-[9px] uppercase tracking-widest text-on-secondary font-bold">ECHO TRACE</span>
<span class="font-body-sm text-[11px] text-on-secondary leading-tight font-medium">Activate</span>
</div>
</button>
<span class="font-label-sm text-[8px] text-on-surface-variant/60 tracking-wider pr-1">RIGHT ANCHOR</span>
</div>
</div>
</div>
</div>
</div>
<!-- Interactive HUD State Machine Switcher (Design Tooling / Gameplay Demo Controls) -->
<div class="mt-4 px-gutter-mobile flex flex-col gap-2">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-secondary text-[16px]">tune</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Trace State Simulation</span>
</div>
<span class="font-label-sm text-[10px] text-on-surface-variant font-mono">DEBUG HARNESS</span>
</div>
<!-- Toggle Selector Pill Group -->
<div class="grid grid-cols-5 gap-1.5 p-1 bg-surface-container-lowest rounded-xl">
<button class="hud-state-btn py-1.5 px-2 rounded-lg font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors flex justify-center items-center" data-state="idle">
        Idle
      </button>
<button class="hud-state-btn active-state py-1.5 px-2 rounded-lg font-label-sm text-[10px] uppercase tracking-wider bg-surface-container-high text-secondary font-semibold transition-colors flex justify-center items-center" data-state="recording">
        Rec
      </button>
<button class="hud-state-btn py-1.5 px-2 rounded-lg font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors flex justify-center items-center" data-state="playback">
        Play
      </button>
<button class="hud-state-btn py-1.5 px-2 rounded-lg font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors flex justify-center items-center" data-state="holding">
        Hold
      </button>
<button class="hud-state-btn py-1.5 px-2 rounded-lg font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors flex justify-center items-center" data-state="dissolving">
        Fade
      </button>
</div>
</div>
<!-- Archival Context / Diegetic HUD Specs Panel -->
<div class="mt-4 px-gutter-mobile">
<div class="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-2">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Diegetic Recollection Parameters</span>
<span class="font-label-sm text-[10px] text-tertiary">LATENCY: 14ms (OPTIMAL)</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
        Echo Traces reproduce your previous 5.0 seconds of movement across the physical plane. While Veil Sight is held, faded structures solidify and spectral platforms become traversable.
      </p>
<div class="flex items-center gap-space-md pt-2">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-label-sm text-[10px] text-on-surface">Parallax Dissolve: Enabled</span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span class="font-label-sm text-[10px] text-on-surface">Haptic Resonance: Active</span>
</div>
</div>
</div>
</div>
</div>
</main>
`;
}

export function bindMobileHUDEvents(onNavigate: (route: string) => void): void {
  // Pause button
  const pauseBtn = document.getElementById('btn-pause');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      modalController.openPause();
      modalController.render(onNavigate, () => {
        window.dispatchEvent(new CustomEvent('echoes:restart'));
      });
    });
  }

  // Settings button
  const settingsBtn = document.getElementById('btn-mobile-settings');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      modalController.openSettings();
      modalController.render(onNavigate);
    });
  }

  // Jump button -> simulate keyboard Space
  const jumpBtn = document.getElementById('btn-jump');
  if (jumpBtn) {
    jumpBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    }, { passive: false });
    jumpBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    }, { passive: false });
    jumpBtn.addEventListener('mousedown', () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    });
    jumpBtn.addEventListener('mouseup', () => {
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    });
  }

  // Recall button -> simulate Q (Veil Sight)
  const recallBtn = document.getElementById('btn-recall');
  const recallBar = document.getElementById('recall-progress-bar');
  if (recallBtn) {
    const startVeil = () => {
      if (recallBar) {
        recallBar.style.width = '100%';
        recallBar.style.transitionDuration = '1200ms';
      }
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyQ' }));
    };
    const endVeil = () => {
      if (recallBar) {
        recallBar.style.transitionDuration = '200ms';
        recallBar.style.width = '0%';
      }
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyQ' }));
    };

    recallBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startVeil();
    }, { passive: false });
    recallBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      endVeil();
    }, { passive: false });
    recallBtn.addEventListener('mousedown', startVeil);
    recallBtn.addEventListener('mouseup', endVeil);
  }

  // Echo Trace button -> simulate F
  const echoBtn = document.getElementById('btn-activate-echo');
  if (echoBtn) {
    const triggerEcho = () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyF' }));
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyF' }));
      }, 100);
    };
    echoBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      triggerEcho();
    }, { passive: false });
    echoBtn.addEventListener('click', triggerEcho);
  }

  // State buttons for simulation harness
  const stateButtons = document.querySelectorAll('.hud-state-btn');
  stateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stateButtons.forEach(b => {
        b.className = 'hud-state-btn py-1.5 px-2 rounded-lg font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors flex justify-center items-center';
      });
      btn.className = 'hud-state-btn active-state py-1.5 px-2 rounded-lg font-label-sm text-[10px] uppercase tracking-wider bg-surface-container-high text-secondary font-semibold transition-colors flex justify-center items-center';
    });
  });
}
