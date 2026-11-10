import { GameStateModel } from '@core/GameState';

export function renderMobilePrologue(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<div class="flex flex-col w-full relative px-gutter-mobile py-space-md gap-space-lg screen-fade-enter-active">
  <!-- Cinematic Cover Card -->
  <div class="relative w-full rounded-2xl overflow-hidden bg-surface-container-lowest min-h-[460px] flex flex-col justify-between p-space-lg shadow-2xl border border-surface-container-high/30">
    <div class="absolute inset-0 bg-cover bg-center opacity-85" style="background-image: url('/assets/ui/prologue_traveler.jpg')"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>

    <!-- Header Meta -->
    <div class="relative z-10 flex items-center justify-between">
      <span class="font-label-sm text-secondary uppercase tracking-widest bg-surface-container-lowest/80 px-space-sm py-0.5 rounded">PRLG // MOBILE</span>
      <span class="font-label-sm text-tertiary uppercase tracking-widest">Tethered</span>
    </div>

    <!-- Title & Quote -->
    <div class="relative z-10 flex flex-col gap-space-xs mt-auto mb-space-md">
      <span class="font-display-lg text-[36px] text-on-surface leading-none">ECHOES</span>
      <span class="font-label-sm text-secondary tracking-widest uppercase text-[10px]">The Things We Chose to Forget</span>
      <blockquote class="font-headline-sm text-[16px] text-on-surface italic mt-space-sm leading-snug">
        “Some things are lost. Others are left behind.”
      </blockquote>
    </div>

    <!-- Primary Action Button -->
    <div class="relative z-10">
      <button id="mobile-begin-btn" class="w-full py-space-md bg-secondary text-on-secondary rounded-xl font-label-md uppercase tracking-widest font-semibold flex items-center justify-center gap-space-sm shadow-lg active:scale-95 transition-all">
        <span>Enter Memory HUD</span>
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  </div>

  <!-- Quick Status Strip -->
  <div class="grid grid-cols-2 gap-space-sm">
    <div class="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-1 border border-surface-container-high/20">
      <span class="font-label-sm text-secondary uppercase tracking-wider text-[9px]">Archived Remnants</span>
      <span class="font-title-md text-secondary text-[16px]">${state.remnants}</span>
    </div>
    <div class="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-1 border border-surface-container-high/20">
      <span class="font-label-sm text-tertiary uppercase tracking-wider text-[9px]">Mind Tether</span>
      <span class="font-title-md text-tertiary text-[16px]">Stable 60 Hz</span>
    </div>
  </div>
</div>
`;
}

export function bindMobilePrologueEvents(onNavigate: (route: string) => void): void {
  const btn = document.getElementById('mobile-begin-btn');
  if (btn) {
    btn.addEventListener('click', () => onNavigate('hud'));
  }
}
