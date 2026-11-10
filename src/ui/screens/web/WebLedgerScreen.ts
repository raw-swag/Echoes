import { globalGameState, GameStateModel } from '@core/GameState';

export function renderWebLedger(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<div class="px-margin py-space-xl flex flex-col gap-space-xl max-w-[1720px] mx-auto w-full screen-fade-enter-active">
  <!-- Whispers Banner -->
  <div class="relative overflow-hidden rounded bg-surface-container-low px-space-lg py-space-md shadow-sm">
    <div class="flex flex-wrap items-center justify-between gap-space-md relative z-10">
      <div class="flex items-center gap-space-md min-w-0">
        <div class="w-8 h-8 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-secondary text-[18px]">history_edu</span>
        </div>
        <div class="flex flex-wrap items-baseline gap-x-space-sm gap-y-space-xs">
          <span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Whisper Active:</span>
          <span class="font-headline-sm text-headline-sm italic text-on-surface">“${state.activeWhisper}”</span>
          <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">— ${state.activeWhisperLedger}</span>
        </div>
      </div>
      <div class="flex items-center gap-space-md shrink-0">
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">ARCHIVAL INTEGRITY: NOMINAL</span>
        <span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
      </div>
    </div>
  </div>

  <!-- Summary Metrics -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
    <!-- Metric 1: Remnants -->
    <div class="lg:col-span-4 rounded bg-surface-container-low p-space-lg flex flex-col justify-between shadow-sm">
      <div class="flex items-center justify-between mb-space-md">
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Archived Remnants</span>
        <span class="material-symbols-outlined text-secondary text-[18px]">toll</span>
      </div>
      <div class="flex flex-col gap-space-xs my-space-xs">
        <div class="flex items-baseline gap-space-sm">
          <span class="font-display-lg text-display-lg text-secondary tracking-tight">${state.remnants}</span>
          <span class="font-title-md text-title-md text-secondary/70">REMNANTS</span>
        </div>
        <span class="font-body-sm text-body-sm text-tertiary flex items-center gap-space-xs">
          <span class="material-symbols-outlined text-[14px]">north_east</span>
          <span>+75 accumulated past cycle</span>
        </span>
      </div>
      <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant/60">
        <span class="font-label-sm text-label-sm uppercase tracking-wider">Epoch Threshold: ${state.epochThreshold}</span>
        <span class="font-label-sm text-label-sm">${((state.remnants / state.epochThreshold) * 100).toFixed(1)}%</span>
      </div>
    </div>

    <!-- Metric 2: Attunement Depth -->
    <div class="lg:col-span-4 rounded bg-surface-container-low p-space-lg flex flex-col justify-between shadow-sm">
      <div class="flex items-center justify-between mb-space-md">
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Attunement Depth</span>
        <span class="material-symbols-outlined text-tertiary text-[18px]">psychology_alt</span>
      </div>
      <div class="flex flex-col gap-space-xs my-space-xs">
        <div class="flex items-baseline gap-space-sm">
          <span class="font-display-lg text-display-lg text-on-surface tracking-tight">12</span>
          <span class="font-title-md text-title-md text-on-surface-variant">RECOLLECTIONS</span>
        </div>
        <span class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-xs">
          <span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
          <span>Mind Tether • State: Stable</span>
        </span>
      </div>
      <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant/60">
        <span class="font-label-sm text-label-sm uppercase tracking-wider">Fracture Risk: 0.00%</span>
        <span class="font-label-sm text-label-sm">Folio IV Restored</span>
      </div>
    </div>

    <!-- Metric 3: Synchronizer Pipeline -->
    <div class="lg:col-span-4 rounded bg-surface-container-low p-space-lg flex flex-col justify-between shadow-sm">
      <div class="flex items-center justify-between mb-space-md">
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Synchronizer Pipeline</span>
        <span class="material-symbols-outlined text-tertiary text-[18px]">cloud_done</span>
      </div>
      <div class="flex flex-col gap-space-xs my-space-xs">
        <div class="flex items-center gap-space-sm">
          <span class="font-headline-md text-headline-md text-tertiary tracking-wide uppercase">SYNCED</span>
          <span class="font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-tertiary-container text-tertiary uppercase">ONLINE</span>
        </div>
        <span class="font-body-sm text-body-sm text-on-surface-variant font-mono">
          24ms latency • TLS v1.3 [AES-GCM]
        </span>
      </div>
      <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant/60">
        <span class="font-label-sm text-label-sm font-mono text-secondary-fixed-dim">POST /api/remnants/earn</span>
        <span class="font-label-sm text-label-sm">PID: #4819</span>
      </div>
    </div>
  </div>

  <!-- Interactive Ledger Action Strip -->
  <div class="bg-surface-container-low rounded-xl p-space-xl flex flex-col gap-space-md shadow-md">
    <div class="flex items-center justify-between">
      <span class="font-title-md text-on-surface">Memory Trace Sync & Consent</span>
      <button id="add-remnants-btn" class="px-space-md py-space-xs rounded bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-secondary font-label-sm uppercase tracking-wider transition-colors cursor-pointer">
        +50 Simulated Remnants
      </button>
    </div>
    <p class="font-body-md text-body-md text-on-surface-variant">
      In-world Archive consent prompt (D-046). All behavior logs and recorded trace fragments are held in memory only, respecting the player's choice not to be recorded.
    </p>
  </div>
</div>
`;
}

export function bindWebLedgerEvents(_onNavigate: (route: string) => void): void {
  const addBtn = document.getElementById('add-remnants-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      globalGameState.addRemnants(50);
    });
  }
}
