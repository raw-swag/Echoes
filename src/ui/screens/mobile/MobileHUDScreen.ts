import { globalGameState, GameStateModel } from '@core/GameState';

export function renderMobileHUD(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  // SVG Ring calculation: circumference = 2 * PI * 20 = 125.6
  const progressRatio = state.echoTraceTimer / state.echoTraceMaxTimer;
  const strokeOffset = 125.6 * (1 - progressRatio);

  return `
<div class="flex flex-col w-full relative select-none screen-fade-enter-active">
  <!-- Viewport Frame / Living Playfield Layer -->
  <div class="relative w-full h-[580px] rounded-xl overflow-hidden bg-surface-container-lowest shadow-2xl flex flex-col justify-between border border-surface-container-high/40">
    <!-- Active Simulation Canvas 2D Mount Target -->
    <div id="gameplay-viewport" class="absolute inset-0 z-0 flex items-center justify-center bg-black">
      <!-- Active Game Canvas is mounted here -->
    </div>

    <!-- Vignette & Gradient Overlays -->
    <div class="absolute inset-0 bg-gradient-to-t from-background/90 via-surface-container-lowest/30 to-background/90 pointer-events-none z-10"></div>

    <!-- TOP HUD LAYER: Diegetic Metrics & Echo Ring -->
    <div class="relative z-30 pt-4 px-4 flex items-start justify-between pointer-events-auto">
      <!-- Upper Left: Archival Echo Ring Indicator -->
      <div class="flex items-center gap-space-sm bg-surface-container-lowest/70 backdrop-blur-md px-space-sm py-space-xs rounded-xl shadow-lg border border-surface-container-high/30">
        <div class="relative w-12 h-12 flex items-center justify-center shrink-0">
          <svg class="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle class="text-surface-container-highest" cx="24" cy="24" fill="none" r="20" stroke="currentColor" stroke-dasharray="3 3" stroke-width="2.5"></circle>
            <circle class="text-secondary transition-all duration-300" cx="24" cy="24" fill="none" id="echo-ring-svg" r="20" stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="${strokeOffset.toFixed(
              1
            )}" stroke-linecap="round" stroke-width="2.5"></circle>
          </svg>
          <span class="material-symbols-outlined text-secondary text-[18px] absolute" id="echo-center-icon">
            ${state.echoTraceState === 'recording' ? 'radio_button_checked' : 'adjust'}
          </span>
        </div>
        <div class="flex flex-col min-w-0 pr-space-xs">
          <div class="flex items-center gap-space-xs">
            <span class="w-1.5 h-1.5 rounded-full ${
              state.echoTraceState === 'recording'
                ? 'bg-error animate-ping'
                : 'bg-secondary animate-pulse'
            }"></span>
            <span class="font-label-sm text-[10px] uppercase ${
              state.echoTraceState === 'recording' ? 'text-error' : 'text-secondary'
            } font-semibold tracking-widest truncate">
              ${state.echoTraceState.toUpperCase()}
            </span>
          </div>
          <span class="font-title-md text-[13px] text-on-surface tracking-wider font-mono">
            ${state.echoTraceTimer.toFixed(1)}s <span class="text-on-surface-variant/70 text-[10px]">/ 05.0s</span>
          </span>
        </div>
      </div>

      <!-- Top Center: Integrity Diamonds -->
      <div class="flex flex-col items-center bg-surface-container-lowest/70 backdrop-blur-sm px-space-md py-space-xs rounded-full border border-surface-container-high/30">
        <span class="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant mb-1">Integrity</span>
        <div class="flex items-center gap-1.5">
          ${Array.from({ length: state.mindIntegrityMax })
            .map((_, i) => {
              const active = i < state.mindIntegrity;
              return `<div class="w-3 h-3 rotate-45 ${
                active ? 'bg-secondary' : 'bg-surface-container-highest'
              } flex items-center justify-center transition-all duration-300 shadow-sm">
                <div class="w-1 h-1 ${
                  active ? 'bg-surface-container-lowest' : 'bg-secondary/40'
                } rounded-full"></div>
              </div>`;
            })
            .join('')}
        </div>
      </div>

      <!-- Upper Right: Pause Button -->
      <button id="mobile-pause-btn" aria-label="Pause" class="w-9 h-9 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-secondary active:scale-95 transition-all border border-surface-container-high/40">
        <span class="material-symbols-outlined text-[20px]">${
          state.isPaused ? 'play_arrow' : 'pause'
        }</span>
      </button>
    </div>

    <!-- MIDDLE LAYER: Diegetic Spatial Prompt -->
    <div class="relative z-20 flex-1 flex flex-col justify-end px-6 pb-4 pointer-events-none">
      <div class="self-center mb-4 flex flex-col items-center text-center animate-bounce duration-1000">
        <div class="px-space-md py-space-xs rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-xl flex items-center gap-space-xs border border-surface-container-high/30">
          <span class="material-symbols-outlined text-secondary text-[16px]">fingerprint</span>
          <span class="font-label-sm text-[10px] uppercase tracking-widest text-on-surface">Spatial Trace Sensor Active</span>
        </div>
      </div>
    </div>

    <!-- BOTTOM LAYER: Diegetic Touch Interaction Control Bar -->
    <div class="relative z-30 px-4 pb-4 pt-2 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent pointer-events-auto">
      <div class="flex items-center justify-between gap-4">
        <!-- Left Touch Button: VEIL SIGHT -->
        <button id="touch-veil-btn" class="flex-1 py-space-sm px-space-md rounded-xl bg-surface-container-low/85 backdrop-blur-md active:bg-surface-container-high border border-surface-container-high/40 flex items-center justify-center gap-space-xs text-on-surface transition-all active:scale-95 shadow-lg">
          <span class="material-symbols-outlined text-[18px] text-tertiary">visibility</span>
          <span class="font-label-sm text-[10px] uppercase tracking-wider">Veil Sight</span>
        </button>

        <!-- Center Touch Button: ECHO TRACE -->
        <button id="touch-trace-btn" class="flex-1 py-space-sm px-space-md rounded-xl bg-secondary text-on-secondary active:brightness-95 border border-secondary/60 flex items-center justify-center gap-space-xs font-semibold transition-all active:scale-95 shadow-xl">
          <span class="material-symbols-outlined text-[18px]">history</span>
          <span class="font-label-sm text-[10px] uppercase tracking-wider">${
            state.echoTraceState === 'recording' ? 'Launch' : 'Trace'
          }</span>
        </button>

        <!-- Right Touch Button: PULSE / RELEASE -->
        <button id="touch-pulse-btn" class="flex-1 py-space-sm px-space-md rounded-xl bg-surface-container-low/85 backdrop-blur-md active:bg-surface-container-high border border-surface-container-high/40 flex items-center justify-center gap-space-xs text-on-surface transition-all active:scale-95 shadow-lg">
          <span class="material-symbols-outlined text-[18px] text-secondary">flare</span>
          <span class="font-label-sm text-[10px] uppercase tracking-wider">Pulse</span>
        </button>
      </div>
    </div>
  </div>
</div>
`;
}

export function bindMobileHUDEvents(_onNavigate: (route: string) => void): void {
  const pauseBtn = document.getElementById('mobile-pause-btn');
  const traceBtn = document.getElementById('touch-trace-btn');
  const veilBtn = document.getElementById('touch-veil-btn');
  const pulseBtn = document.getElementById('touch-pulse-btn');

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      const s = globalGameState.getState();
      globalGameState.setPaused(!s.isPaused);
    });
  }

  if (traceBtn) {
    traceBtn.addEventListener('click', () => {
      const s = globalGameState.getState();
      const nextState = s.echoTraceState === 'recording' ? 'replaying' : 'recording';
      globalGameState.setEchoTraceState(nextState, 0);
    });
  }

  if (veilBtn) {
    veilBtn.addEventListener('click', () => {
      globalGameState.update({ activeWhisper: 'Veil Sight exposed hidden platform.' });
    });
  }

  if (pulseBtn) {
    pulseBtn.addEventListener('click', () => {
      globalGameState.update({ activeWhisper: 'Pulse emitted. Non-lethal stun applied.' });
    });
  }
}
