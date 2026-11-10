import { globalGameState, GameStateModel } from '@core/GameState';

export function renderWebHUD(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  const tracePercent = Math.min(
    100,
    Math.round((state.echoTraceTimer / state.echoTraceMaxTimer) * 100)
  );

  return `
<div class="relative w-full h-[720px] bg-surface-container-lowest overflow-hidden select-none screen-fade-enter-active">
  <!-- Interactive Canvas 2D Mount Target -->
  <div id="gameplay-viewport" class="absolute inset-0 z-0 flex items-center justify-center bg-black">
    <!-- Active Game Canvas is dynamically reparented or mounted here -->
  </div>

  <!-- Diegetic Overlays & Ambient Gradient Vignette -->
  <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-surface-container-lowest/80 pointer-events-none z-10"></div>
  <div class="absolute inset-0 bg-radial from-transparent via-transparent to-surface-container-lowest/80 pointer-events-none z-10"></div>

  <!-- Top Diegetic HUD Bar -->
  <div class="absolute top-0 left-0 right-0 p-space-lg flex items-start justify-between z-20 pointer-events-auto">
    <!-- Left: Echo Buffer Status -->
    <div class="flex items-center gap-space-md bg-surface-container-low/85 backdrop-blur-md px-space-md py-space-sm rounded-lg shadow-xl border border-surface-container-high/40">
      <div class="flex items-center gap-space-xs">
        <span class="w-2.5 h-2.5 rounded-full ${
          state.echoTraceState === 'recording'
            ? 'bg-error animate-ping'
            : 'bg-secondary animate-pulse'
        }"></span>
        <span class="font-label-sm text-label-sm ${
          state.echoTraceState === 'recording' ? 'text-error' : 'text-secondary'
        } uppercase tracking-widest font-semibold">
          ● ${state.echoTraceState.toUpperCase()}
        </span>
      </div>
      <div class="h-3 w-[1px] bg-outline-variant/60"></div>
      <div class="flex flex-col">
        <div class="flex items-center gap-space-xs font-label-md text-label-md text-secondary">
          <span class="tabular-nums font-semibold" id="recCounter">${state.echoTraceTimer.toFixed(
            1
          )}s</span>
          <span class="text-on-surface-variant/50">/</span>
          <span class="text-on-surface-variant/70">${state.echoTraceMaxTimer.toFixed(1)}s</span>
        </div>
        <div class="w-28 h-1 bg-surface-container-highest rounded-full overflow-hidden mt-1">
          <div class="h-full bg-secondary transition-all duration-300" id="recProgressBar" style="width: ${tracePercent}%;"></div>
        </div>
      </div>
    </div>

    <!-- Center: Whisper Stream -->
    <div class="hidden md:flex flex-col items-center max-w-md text-center bg-surface-container-low/75 backdrop-blur-md px-space-lg py-space-xs rounded-lg shadow-xl border border-surface-container-high/40">
      <div class="flex items-center gap-space-xs">
        <span class="material-symbols-outlined text-secondary text-[14px]">graphic_eq</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-medium">Whisper Stream // Synced</span>
      </div>
      <p class="font-headline-sm text-headline-sm text-on-surface italic mt-space-xs text-[16px]">
        “${state.activeWhisper}”
      </p>
    </div>

    <!-- Right: Mind Integrity & Pause Key -->
    <div class="flex items-center gap-space-md">
      <!-- Integrity Pips -->
      <div class="flex flex-col items-end gap-1 bg-surface-container-low/85 backdrop-blur-md px-space-md py-space-sm rounded-lg shadow-xl border border-surface-container-high/40">
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Mind Integrity</span>
        <div class="flex items-center gap-space-xs">
          ${Array.from({ length: state.mindIntegrityMax })
            .map((_, i) => {
              const active = i < state.mindIntegrity;
              return `<span class="material-symbols-outlined ${
                active ? 'text-secondary' : 'text-secondary/30'
              } text-[16px]">diamond</span>`;
            })
            .join('')}
        </div>
      </div>

      <!-- Pause Button -->
      <button id="web-pause-btn" class="group flex items-center justify-center w-10 h-10 bg-surface-container-low/85 hover:bg-surface-container-high transition-colors backdrop-blur-md rounded-lg shadow-xl border border-surface-container-high/40 cursor-pointer" title="Pause System [ESC]" type="button">
        <span class="font-label-sm text-label-sm text-secondary group-hover:text-on-surface tracking-wider font-semibold">
          ${state.isPaused ? 'RES' : 'ESC'}
        </span>
      </button>
    </div>
  </div>

  <!-- Bottom Interactive Quick Bar -->
  <div class="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
    <div class="flex items-center gap-space-sm bg-surface-container-lowest/80 backdrop-blur-md px-space-md py-space-xs rounded text-on-surface-variant font-body-sm text-[11px]">
      <span>[A][D] Move</span>
      <span>•</span>
      <span>[SPACE] Jump</span>
      <span>•</span>
      <span>[E] Echo Trace</span>
      <span>•</span>
      <span>[SHIFT] Dash</span>
      <span>•</span>
      <span>[F] Interact</span>
    </div>

    <button id="trigger-trace-btn" class="px-space-md py-space-xs bg-secondary text-on-secondary rounded font-label-sm uppercase tracking-wider hover:brightness-110 transition-all font-semibold cursor-pointer">
      ${state.echoTraceState === 'recording' ? 'Stop & Launch Trace [E]' : 'Record Echo Trace [E]'}
    </button>
  </div>
</div>
`;
}

export function bindWebHUDEvents(_onNavigate: (route: string) => void): void {
  const pauseBtn = document.getElementById('web-pause-btn');
  const traceBtn = document.getElementById('trigger-trace-btn');

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      const currentState = globalGameState.getState();
      globalGameState.setPaused(!currentState.isPaused);
    });
  }

  if (traceBtn) {
    traceBtn.addEventListener('click', () => {
      const s = globalGameState.getState();
      const nextState = s.echoTraceState === 'recording' ? 'replaying' : 'recording';
      globalGameState.setEchoTraceState(nextState, 0);
    });
  }
}
