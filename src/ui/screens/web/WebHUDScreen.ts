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
    <!-- Active Game Canvas is dynamically mounted here -->
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

    <!-- Right: Mind Integrity, Shards & Pause Key -->
    <div class="flex items-center gap-space-md">
      <!-- Memory Shards Collected -->
      <div class="flex flex-col items-end gap-1 bg-surface-container-low/85 backdrop-blur-md px-space-md py-space-sm rounded-lg shadow-xl border border-surface-container-high/40">
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Shards</span>
        <div class="flex items-center gap-space-xs font-label-md text-secondary font-semibold">
          <span class="material-symbols-outlined text-secondary text-[16px]">token</span>
          <span>${state.collectedShardsCurrent} / ${state.collectedShardsTotal}</span>
        </div>
      </div>

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

  ${
    state.isLevelCompleted
      ? `
  <!-- Level Completed Modal Overlay -->
  <div class="absolute inset-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl flex flex-col items-center justify-center p-space-xl">
    <div class="max-w-md w-full bg-surface-container-low border border-secondary/40 rounded-2xl p-space-xl flex flex-col items-center text-center shadow-2xl gap-space-md">
      <span class="material-symbols-outlined text-[48px] text-secondary">verified</span>
      <span class="font-display-lg text-[28px] text-on-surface font-semibold tracking-wide">RECOLLECTION RESTORED</span>
      <p class="font-body-md text-on-surface-variant text-[14px]">
        You have solved the Pressure Gallery, activated the Sanctuary Beacon, and crossed the Nexus Arch.
      </p>
      <div class="flex items-center gap-space-md py-space-sm">
        <span class="text-secondary font-semibold font-label-md">Shards Recovered: ${state.collectedShardsCurrent} / ${state.collectedShardsTotal}</span>
      </div>
      <button id="web-replay-btn" class="w-full py-space-md bg-secondary text-on-secondary rounded-xl font-label-md uppercase tracking-widest font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
        Replay Recollection
      </button>
    </div>
  </div>
  `
      : ''
  }

  <!-- Bottom Interactive Quick Controls Telemetry Bar -->
  <div class="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
    <div class="flex items-center gap-space-sm bg-surface-container-lowest/85 backdrop-blur-md px-space-md py-space-xs rounded-lg text-on-surface border border-surface-container-high/40 font-body-sm text-[12px] shadow-lg">
      <span class="text-secondary font-semibold">[A] [D]</span>
      <span>Run</span>
      <span class="text-on-surface-variant/40">•</span>
      <span class="text-secondary font-semibold">[SPACE]</span>
      <span>Jump</span>
      <span class="text-on-surface-variant/40">•</span>
      <span class="text-secondary font-semibold">[S] + [SPACE]</span>
      <span>Drop-through</span>
      <span class="text-on-surface-variant/40">•</span>
      <span class="text-secondary font-semibold">[E]</span>
      <span>Echo Trace (Hold to cancel)</span>
    </div>

    <div class="flex items-center gap-space-sm bg-surface-container-lowest/85 backdrop-blur-md px-space-md py-space-xs rounded-lg border border-surface-container-high/40 font-label-sm text-[11px] text-on-surface-variant">
      <span>Beacon Checkpoint: Active</span>
    </div>
  </div>
</div>
`;
}

export function bindWebHUDEvents(_onNavigate: (route: string) => void): void {
  const pauseBtn = document.getElementById('web-pause-btn');
  const replayBtn = document.getElementById('web-replay-btn');

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      const currentState = globalGameState.getState();
      globalGameState.setPaused(!currentState.isPaused);
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      // Trigger level restart via window dispatch event
      window.dispatchEvent(new CustomEvent('echoes:restart-level'));
    });
  }
}
