import { globalGameState, GameStateModel } from '@core/GameState';

export function renderMobileArchive(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  const currentShard = state.shards.find((s) => s.id === state.selectedShardId) ?? state.shards[0];

  return `
<div class="flex flex-col w-full relative px-gutter-mobile py-space-md gap-space-lg screen-fade-enter-active">
  <div class="flex items-center justify-between">
    <div class="flex flex-col">
      <span class="font-label-sm text-secondary uppercase tracking-widest text-[9px]">${currentShard.classification}</span>
      <h2 class="font-headline-sm text-headline-sm text-on-surface">${currentShard.title}</h2>
    </div>
    <span class="font-label-sm text-tertiary uppercase text-[10px]">${currentShard.fidelityPercent}% Restored</span>
  </div>

  <div class="relative w-full rounded-xl overflow-hidden bg-surface-container-lowest aspect-[4/3] shadow-lg border border-surface-container-high/40">
    <img src="${currentShard.imageUrl}" class="w-full h-full object-cover" alt="${currentShard.title}" />
    <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
    <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between">
      <span class="font-body-sm text-[12px] text-secondary italic">“${currentShard.quote}”</span>
    </div>
  </div>

  <div class="flex flex-col gap-space-sm">
    <span class="font-label-sm text-on-surface-variant uppercase tracking-wider text-[10px]">Archival Shards</span>
    <div class="grid grid-cols-1 gap-space-xs">
      ${state.shards
        .map(
          (s) => `
        <button class="mobile-shard-btn p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border ${
          s.id === currentShard.id ? 'border-secondary/50' : 'border-transparent'
        }" data-shard-id="${s.id}">
          <span class="font-label-sm text-on-surface text-[12px]">${s.title}</span>
          <span class="font-label-sm text-secondary text-[10px]">${s.fidelityPercent}%</span>
        </button>
      `
        )
        .join('')}
    </div>
  </div>
</div>
`;
}

export function bindMobileArchiveEvents(onNavigate: (route: string) => void): void {
  const buttons = document.querySelectorAll('.mobile-shard-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const shardId = target.getAttribute('data-shard-id');
      if (shardId) {
        globalGameState.update({ selectedShardId: shardId });
        onNavigate('archive');
      }
    });
  });
}
