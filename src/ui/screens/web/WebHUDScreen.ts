import { GameStateModel, globalGameState } from '@core/GameState';

export function renderWebHUD(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<main class="relative pt-20 bg-background min-h-screen"><div class="flex flex-col w-full">
<!-- Widescreen Diegetic Simulation Viewport -->
<div id="gameplay-viewport" class="relative w-full h-[720px] bg-surface-container-lowest overflow-hidden select-none">
<!-- Cinematic Scene Backdrop (Atmospheric Mist, Hooded Wanderer, Distant Monoliths) -->
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out" data-alt="Cinematic atmospheric dark widescreen game scene, a lone hooded wanderer with a faint glowing lantern stands in a melancholic misty pine forest facing crumbling stone ruins and monolithic obsidian arches under a cold moonlight, deep ink navy shadows, muted gold embers drifting, ethereal fog, moody art direction in style of Limbo and Shadow of the Colossus, photographic 8k render." id="viewportBackdrop" style="background-image: url('/assets/ui/hud_gameplay_scene.jpg')">
</div>
<!-- Vignette, Grain & Diegetic Film Scrim -->
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest/80 pointer-events-none"></div>
<div class="absolute inset-0 bg-radial from-transparent via-surface-container-lowest/40 to-surface-container-lowest/90 pointer-events-none"></div>
<!-- Active Atmospheric Particle Overlay (SVG) -->
<svg class="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialgradient cx="50%" cy="50%" id="ember" r="50%">
<stop offset="0%" stop-color="#dcc39b" stop-opacity="0.8"></stop>
<stop offset="100%" stop-color="#dcc39b" stop-opacity="0"></stop>
</radialgradient>
</defs>
<circle class="animate-pulse" cx="15%" cy="32%" fill="url(#ember)" r="2.5"></circle>
<circle cx="28%" cy="65%" fill="url(#ember)" r="1.5"></circle>
<circle class="animate-ping" cx="44%" cy="40%" fill="url(#ember)" r="2" style="animation-duration: 4s;"></circle>
<circle cx="68%" cy="25%" fill="url(#ember)" r="3"></circle>
<circle class="animate-pulse" cx="82%" cy="58%" fill="url(#ember)" r="1.8" style="animation-duration: 2.5s;"></circle>
<circle cx="91%" cy="35%" fill="url(#ember)" r="2.2"></circle>
<!-- Subtle Compass Crosshair Marks -->
<line stroke="#dcc39b" stroke-opacity="0.3" stroke-width="0.75" x1="50%" x2="50%" y1="46%" y2="48%"></line>
<line stroke="#dcc39b" stroke-opacity="0.3" stroke-width="0.75" x1="50%" x2="50%" y1="52%" y2="54%"></line>
<line stroke="#dcc39b" stroke-opacity="0.3" stroke-width="0.75" x1="48%" x2="49%" y1="50%" y2="50%"></line>
<line stroke="#dcc39b" stroke-opacity="0.3" stroke-width="0.75" x1="51%" x2="52%" y1="50%" y2="50%"></line>
</svg>
<!-- Top Diegetic HUD Bar -->
<div class="absolute top-0 left-0 right-0 p-space-lg flex items-start justify-between z-20 pointer-events-auto">
<!-- Left: Recording / Echo Buffer Status -->
<div class="flex items-center gap-space-md bg-surface-container-low/85 backdrop-blur-md px-space-md py-space-sm rounded-lg shadow-xl">
<div class="flex items-center gap-space-xs">
<span class="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
<span class="font-label-sm text-label-sm text-error uppercase tracking-widest font-semibold">● REC</span>
</div>
<div class="h-3 w-[1px] bg-outline-variant/60"></div>
<div class="flex flex-col">
<div class="flex items-center gap-space-xs font-label-md text-label-md text-secondary">
<span class="tabular-nums font-semibold" id="recCounter">02.4s</span>
<span class="text-on-surface-variant/50">/</span>
<span class="text-on-surface-variant/70">05.0s</span>
</div>
<!-- Real-time dynamic buffer bar -->
<div class="w-28 h-1 bg-surface-container-highest rounded-full overflow-hidden mt-1">
<div class="h-full bg-secondary transition-all duration-300" id="recProgressBar" style="width: 48%;"></div>
</div>
</div>
</div>
<!-- Center: Active Whisper Stream (Synced) -->
<div class="hidden md:flex flex-col items-center max-w-md text-center bg-surface-container-low/75 backdrop-blur-md px-space-lg py-space-xs rounded-lg shadow-xl">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[14px]">graphic_eq</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-medium">Whisper Stream // Synced</span>
</div>
<p class="font-headline-sm text-headline-sm text-on-surface italic mt-space-xs">
          “${state.activeWhisper}”
        </p>
</div>
<!-- Right: Integrity Diamonds, Remnants Tally, Pause ESC -->
<div class="flex items-center gap-space-md">
<!-- Integrity Pips -->
<div class="flex flex-col items-end gap-1 bg-surface-container-low/85 backdrop-blur-md px-space-md py-space-sm rounded-lg shadow-xl">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Mind Integrity</span>
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[16px]" style="font-variation-settings: 'FILL' 1;">diamond</span>
<span class="material-symbols-outlined text-secondary text-[16px]" style="font-variation-settings: 'FILL' 1;">diamond</span>
<span class="material-symbols-outlined text-secondary/40 text-[16px]" style="font-variation-settings: 'FILL' 0;">diamond</span>
</div>
</div>
<!-- Remnants Counter -->
<div class="hidden sm:flex items-center gap-space-sm bg-surface-container-low/85 backdrop-blur-md px-space-md py-space-sm rounded-lg shadow-xl">
<span class="material-symbols-outlined text-secondary text-[18px]">grain</span>
<div class="flex flex-col text-right">
<span class="font-title-md text-title-md text-secondary leading-tight">1,408</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Fragments</span>
</div>
</div>
<!-- Pause Key Button -->
<button class="group flex items-center justify-center w-10 h-10 bg-surface-container-low/85 hover:bg-surface-container-high transition-colors backdrop-blur-md rounded-lg shadow-xl cursor-pointer" title="Pause System [ESC]" type="button">
<span class="font-label-sm text-label-sm text-secondary group-hover:text-on-surface tracking-wider font-semibold">ESC</span>
</button>
</div>
</div>
<!-- Center Floating Diegetic Prompt -->
<div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
<div class="relative flex flex-col items-center">
<!-- Pulsing Geometric Memory Reticle -->
<div class="relative w-36 h-36 flex items-center justify-center mb-space-sm">
<div class="absolute inset-0 rounded-full border border-secondary/20 animate-ping" style="animation-duration: 3.5s;"></div>
<div class="absolute inset-3 rounded-full border border-secondary/40"></div>
<div class="w-12 h-12 rounded-full bg-surface-container-highest/60 backdrop-blur-sm flex items-center justify-center shadow-lg">
<span class="material-symbols-outlined text-secondary text-[24px]">history_edu</span>
</div>
</div>
<!-- Diegetic Text Banner Card -->
<div class="bg-surface-container-low/90 backdrop-blur-lg px-space-xl py-space-md rounded-xl shadow-2xl flex flex-col items-center text-center max-w-sm pointer-events-auto transition-transform hover:scale-105 cursor-pointer">
<div class="flex items-center gap-space-xs mb-space-xs">
<span class="w-1.5 h-1.5 bg-secondary rounded-full"></span>
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Resonance Anchor #047</span>
<span class="w-1.5 h-1.5 bg-secondary rounded-full"></span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
            Memory Trace Detected
          </h2>
<div class="inline-flex items-center gap-space-sm mt-space-xs px-space-md py-space-xs bg-surface-container-high rounded text-secondary">
<kbd class="font-label-md text-label-md px-1.5 py-0.5 rounded bg-surface-container-lowest text-secondary-fixed font-semibold shadow-inner">HOLD E</kbd>
<span class="font-body-sm text-body-sm tracking-wide text-on-surface">to Recollect</span>
</div>
</div>
</div>
</div>
<!-- Bottom Desktop Game Controls & Diegetic HUD Overlay -->
<div class="absolute bottom-0 left-0 right-0 p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md z-20 pointer-events-auto">
<!-- Left: Veil Sight Ability -->
<div class="flex items-center gap-space-md bg-surface-container-low/85 backdrop-blur-md px-space-lg py-space-sm rounded-lg shadow-xl w-full md:w-auto justify-between md:justify-start">
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<kbd class="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-lowest text-secondary-fixed font-semibold">Q</kbd>
<span class="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Veil Sight</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Hold to manifest intangible paths</span>
</div>
</div>
<!-- Center Movement & Primary Prompts -->
<div class="flex items-center gap-space-md bg-surface-container-low/85 backdrop-blur-md px-space-xl py-space-sm rounded-lg shadow-xl">
<div class="flex items-center gap-space-sm">
<kbd class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-semibold shadow-inner">SPACE</kbd>
<span class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Jump</span>
</div>
<div class="h-3 w-[1px] bg-surface-container-highest"></div>
<div class="flex items-center gap-space-sm">
<kbd class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-lowest text-secondary-fixed font-semibold shadow-inner">E</kbd>
<span class="font-label-md text-label-md uppercase tracking-wider text-secondary">Action / Tether</span>
</div>
</div>
<!-- Right HUD: Echo Trace Cast [F] -->
<button class="w-full md:w-auto flex items-center justify-between md:justify-start gap-space-md bg-secondary-container hover:bg-secondary-container/90 px-space-lg py-space-sm rounded-lg shadow-2xl transition-all cursor-pointer group active:scale-95" id="btnEchoCast" type="button">
<div class="flex flex-col text-left">
<div class="flex items-center gap-space-xs">
<span class="font-title-md text-title-md text-secondary-fixed tracking-wide leading-none font-semibold">ECHO TRACE</span>
<span class="font-label-sm text-label-sm text-on-secondary-container bg-surface-container-lowest/60 px-1 rounded uppercase">Ready</span>
</div>
<span class="font-body-sm text-body-sm text-on-secondary-container">Materialize past 5.0s phantom</span>
</div>
<div class="w-10 h-10 rounded bg-secondary flex items-center justify-center text-on-secondary shadow-md group-hover:rotate-12 transition-transform">
<span class="font-title-md text-title-md font-bold">F</span>
</div>
</button>
</div>
</div>
<!-- Bottom Diegetic Control Panel & Interactive Simulation Debug Harness -->
<div class="w-full bg-surface-container-lowest px-space-lg md:px-margin py-space-xl flex flex-col gap-space-xl shadow-inner">
<!-- Header & Status Toggles -->
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div class="flex flex-col">
<div class="flex items-center gap-space-sm mb-space-xs">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Diegetic Debug Harness</span>
<span class="font-label-sm text-label-sm text-on-surface-variant/40">// TRACE-SIM-4.08</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface">
          Active Trace State Emulation
        </h3>
</div>
<!-- Simulation State Buttons -->
<div class="inline-flex flex-wrap p-1 bg-surface-container rounded-lg gap-1 shadow-inner" id="stateSelector">
<button class="state-btn px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-state="idle" type="button">
          [IDLE]
        </button>
<button class="state-btn px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider bg-surface-container-high text-secondary font-semibold transition-colors cursor-pointer shadow-sm" data-state="rec" type="button">
          [REC (Active)]
        </button>
<button class="state-btn px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-state="play" type="button">
          [PLAY]
        </button>
<button class="state-btn px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-state="hold" type="button">
          [HOLD]
        </button>
<button class="state-btn px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-state="fade" type="button">
          [FADE]
        </button>
</div>
</div>
<!-- Bento Grid: Telemetry, Architectural Mechanics, and Environmental Metrics -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-space-lg">
<!-- 7 Columns: Diegetic Recollection Parameters & Waveform Visualizer -->
<div class="md:col-span-7 bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between shadow-md">
<div>
<div class="flex items-center justify-between mb-space-md">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Phenomenological Ledger // Rule 09</span>
<span class="font-label-sm text-label-sm text-on-surface-variant/70 uppercase">Temporal Drift ±0.04%</span>
</div>
<h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-sm">
            Recollection Mechanics &amp; Veil Dissolution
          </h4>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
            Echo Traces reproduce your previous <span class="text-secondary font-semibold">5.0 seconds of movement</span> across the physical plane. While <span class="text-on-surface font-semibold">Veil Sight [Q]</span> is maintained, faded ancestral structures solidify and spectral platforms become traversable, permitting paradoxical double-levers and spatial bridges.
          </p>
</div>
<!-- Simulated Resonance Waveform SVG -->
<div class="p-space-md bg-surface-container-lowest rounded-lg mt-space-sm">
<div class="flex items-center justify-between mb-space-xs">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Temporal Resonance Density</span>
<span class="font-label-sm text-label-sm text-secondary tabular-nums">482.6 MHz</span>
</div>
<svg class="w-full h-16" fill="none" viewbox="0 0 600 64" xmlns="http://www.w3.org/2000/svg">
<path d="M 0 32 Q 50 10, 100 32 T 200 32 T 300 12 T 400 52 T 500 24 T 600 32" fill="none" stroke="#46464c" stroke-dasharray="4 4" stroke-width="1.5"></path>
<path class="opacity-80" d="M 0 32 Q 60 52, 120 32 T 240 18 T 360 48 T 480 20 T 600 32" fill="none" stroke="#dcc39b" stroke-width="2"></path>
<!-- Current Needle Head -->
<line stroke="#f9dfb6" stroke-width="1.5" x1="288" x2="288" y1="4" y2="60"></line>
<circle cx="288" cy="32" fill="#f9dfb6" r="3.5"></circle>
</svg>
</div>
</div>
<!-- 5 Columns: Engine Status & Telemetry Slates -->
<div class="md:col-span-5 flex flex-col gap-space-md">
<!-- Latency / Sync slate -->
<div class="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between shadow-md">
<div class="flex items-center gap-space-md">
<div class="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[20px]">speed</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Tether Latency</span>
<span class="font-title-md text-title-md text-on-surface font-semibold">14ms <span class="font-label-sm text-label-sm text-tertiary ml-1">[OPTIMAL]</span></span>
</div>
</div>
<span class="material-symbols-outlined text-tertiary text-[20px]">check_circle</span>
</div>
<!-- Parallax Dissolve Slate -->
<div class="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between shadow-md">
<div class="flex items-center gap-space-md">
<div class="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[20px]">layers</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Parallax Dissolve</span>
<span class="font-title-md text-title-md text-on-surface font-semibold">Enabled <span class="font-body-sm text-body-sm text-on-surface-variant font-normal">(Depth Buffer v2)</span></span>
</div>
</div>
<div class="w-2.5 h-2.5 rounded-full bg-secondary"></div>
</div>
<!-- Haptic Resonance Slate -->
<div class="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between shadow-md">
<div class="flex items-center gap-space-md">
<div class="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[20px]">vibration</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Haptic Resonance</span>
<span class="font-title-md text-title-md text-on-surface font-semibold">Active <span class="font-body-sm text-body-sm text-secondary font-normal">(Pulse: Sub-harmonic)</span></span>
</div>
</div>
<span class="material-symbols-outlined text-secondary text-[20px]">graphic_eq</span>
</div>
</div>
</div>
</div>
</div>
</main>
`;
}

export function bindWebHUDEvents(_onNavigate: (route: string) => void): void {
  // ESC button
  const pauseBtns = document.querySelectorAll('[title="Pause System [ESC]"], #hud-pause-btn');
  pauseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      globalGameState.setPaused(!globalGameState.getState().isPaused);
    });
  });

  // Echo Trace Cast [F]
  const echoCastBtn = document.getElementById('btnEchoCast');
  if (echoCastBtn) {
    echoCastBtn.addEventListener('click', () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyF' }));
    });
  }

  // Diagnostic harness state selector
  const stateBtns = document.querySelectorAll('.state-btn');
  stateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stateBtns.forEach(b => {
        b.className = 'state-btn px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer';
      });
      btn.className = 'state-btn px-space-md py-space-xs rounded font-label-md text-label-md uppercase tracking-wider bg-surface-container-high text-secondary font-semibold transition-colors cursor-pointer shadow-sm';
    });
  });
}
