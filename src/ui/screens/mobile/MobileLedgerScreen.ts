import { globalGameState, GameStateModel } from '@core/GameState';

export function renderMobileLedger(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<div class="flex flex-col w-full relative px-gutter-mobile py-space-md gap-space-md screen-fade-enter-active">
  <div class="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-space-xs border border-surface-container-high/30">
    <span class="font-label-sm text-secondary uppercase tracking-widest text-[9px]">Active Whisper</span>
    <span class="font-headline-sm text-[16px] text-on-surface italic">“${state.activeWhisper}”</span>
    <span class="font-label-sm text-on-surface-variant uppercase text-[10px]">— ${state.activeWhisperLedger}</span>
  </div>

  <div class="grid grid-cols-2 gap-space-sm">
    <div class="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-1">
      <span class="font-label-sm text-on-surface-variant uppercase text-[9px]">Remnant Balance</span>
      <span class="font-title-md text-secondary text-[20px]">${state.remnants}</span>
      <span class="font-label-sm text-tertiary text-[9px]">Synchronized</span>
    </div>
    <div class="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-1">
      <span class="font-label-sm text-on-surface-variant uppercase text-[9px]">Attunement</span>
      <span class="font-title-md text-on-surface text-[20px]">12 Shards</span>
      <span class="font-label-sm text-on-surface-variant text-[9px]">Mind Tether Active</span>
    </div>
  </div>

  <div class="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-space-sm border border-surface-container-high/30">
    <div class="flex items-center justify-between">
      <span class="font-title-md text-[13px] text-on-surface">Simulated Remnants</span>
      <button id="mobile-add-remnants-btn" class="px-3 py-1 bg-secondary text-on-secondary rounded text-[10px] uppercase font-semibold">
        +50 Remnants
      </button>
    </div>
    <p class="font-body-sm text-on-surface-variant text-[11px]">
      Release Seal Consent: Memory recordings are kept locally within your current session.
    </p>
  </div>
</div>
`;
}

export function bindMobileLedgerEvents(_onNavigate: (route: string) => void): void {
  const btn = document.getElementById('mobile-add-remnants-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      globalGameState.addRemnants(50);
    });
  }
}
