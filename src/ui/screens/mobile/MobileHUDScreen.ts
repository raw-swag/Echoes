import { globalGameState, GameStateModel } from '@core/GameState';
import { inputService } from '@input/InputService';

export function renderMobileHUD(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
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

    <!-- MIDDLE LAYER: Diegetic Spatial Movement Control Layer (D-Pad & Jump) -->
    <div class="relative z-20 flex-1 flex items-end justify-between px-4 pb-2 pointer-events-auto">
      <!-- Left D-Pad Touch Cluster -->
      <div class="flex items-center gap-2 bg-surface-container-lowest/75 backdrop-blur-md p-1.5 rounded-2xl border border-surface-container-high/40 shadow-xl">
        <button id="touch-left-btn" class="w-12 h-12 rounded-xl bg-surface-container-low/90 active:bg-secondary active:text-on-secondary flex items-center justify-center text-on-surface border border-surface-container-high/30 transition-all active:scale-95">
          <span class="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <button id="touch-down-btn" class="w-12 h-12 rounded-xl bg-surface-container-low/90 active:bg-secondary active:text-on-secondary flex items-center justify-center text-on-surface border border-surface-container-high/30 transition-all active:scale-95" title="Drop through platform (Down + Jump)">
          <span class="material-symbols-outlined text-[24px]">arrow_downward</span>
        </button>
        <button id="touch-right-btn" class="w-12 h-12 rounded-xl bg-surface-container-low/90 active:bg-secondary active:text-on-secondary flex items-center justify-center text-on-surface border border-surface-container-high/30 transition-all active:scale-95">
          <span class="material-symbols-outlined text-[24px]">arrow_forward</span>
        </button>
      </div>

      <!-- Right Jump Touch Button -->
      <div class="flex items-center gap-2">
        <button id="touch-jump-btn" class="w-16 h-16 rounded-2xl bg-secondary text-on-secondary active:brightness-95 flex flex-col items-center justify-center shadow-2xl border border-secondary/60 active:scale-95 transition-all">
          <span class="material-symbols-outlined text-[28px]">arrow_upward</span>
          <span class="text-[9px] uppercase tracking-wider font-bold -mt-1">JUMP</span>
        </button>
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
        <button id="touch-trace-btn" class="flex-1 py-space-sm px-space-md rounded-xl bg-surface-container-high text-secondary border border-secondary/40 flex items-center justify-center gap-space-xs font-semibold transition-all active:scale-95 shadow-xl">
          <span class="material-symbols-outlined text-[18px]">history</span>
          <span class="font-label-sm text-[10px] uppercase tracking-wider">Trace (M3)</span>
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
  const leftBtn = document.getElementById('touch-left-btn');
  const rightBtn = document.getElementById('touch-right-btn');
  const downBtn = document.getElementById('touch-down-btn');
  const jumpBtn = document.getElementById('touch-jump-btn');
  const traceBtn = document.getElementById('touch-trace-btn');
  const veilBtn = document.getElementById('touch-veil-btn');
  const pulseBtn = document.getElementById('touch-pulse-btn');

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      const s = globalGameState.getState();
      globalGameState.setPaused(!s.isPaused);
    });
  }

  // Helper for touch press/release handling
  const setupTouch = (el: HTMLElement | null, onPress: () => void, onRelease: () => void) => {
    if (!el) return;
    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      onPress();
    });
    el.addEventListener('pointerup', (e) => {
      e.preventDefault();
      onRelease();
    });
    el.addEventListener('pointercancel', (e) => {
      e.preventDefault();
      onRelease();
    });
    el.addEventListener('pointerleave', (e) => {
      e.preventDefault();
      onRelease();
    });
  };

  let curX = 0;
  let curY = 0;

  setupTouch(
    leftBtn,
    () => {
      curX = -1;
      inputService.setTouchMove(curX, curY);
    },
    () => {
      if (curX === -1) curX = 0;
      inputService.setTouchMove(curX, curY);
    }
  );

  setupTouch(
    rightBtn,
    () => {
      curX = 1;
      inputService.setTouchMove(curX, curY);
    },
    () => {
      if (curX === 1) curX = 0;
      inputService.setTouchMove(curX, curY);
    }
  );

  setupTouch(
    downBtn,
    () => {
      curY = 1;
      inputService.setTouchMove(curX, curY);
    },
    () => {
      curY = 0;
      inputService.setTouchMove(curX, curY);
    }
  );

  setupTouch(
    jumpBtn,
    () => {
      inputService.setTouchJump(true);
    },
    () => {
      inputService.setTouchJump(false);
    }
  );

  setupTouch(
    traceBtn,
    () => {
      inputService.setTouchTrace(true);
    },
    () => {
      inputService.setTouchTrace(false);
    }
  );

  setupTouch(
    veilBtn,
    () => {
      inputService.setTouchAbility(true);
    },
    () => {
      inputService.setTouchAbility(false);
    }
  );

  setupTouch(
    pulseBtn,
    () => {
      inputService.setTouchPulse(true);
    },
    () => {
      inputService.setTouchPulse(false);
    }
  );
}
