import { globalGameState, GameStateModel } from '@core/GameState';

export function renderMobileChapters(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  const cardsHtml = state.chapters
    .map(
      (ch) => `
    <div class="p-space-md bg-surface-container-low rounded-xl flex items-center gap-space-md border border-surface-container-high/30 shadow-md">
      <img src="${ch.thumbnailUrl}" class="w-20 h-20 rounded-lg object-cover shrink-0" alt="${
        ch.title
      }" />
      <div class="flex flex-col min-w-0 flex-1">
        <div class="flex items-center justify-between">
          <span class="font-label-sm text-[9px] uppercase tracking-wider ${
            ch.restored ? 'text-tertiary' : 'text-on-surface-variant'
          }">
            ${ch.restored ? 'Restored' : 'Locked'}
          </span>
          <span class="font-label-sm text-[9px] text-secondary uppercase">+${
            ch.remnantsClaimed
          }</span>
        </div>
        <span class="font-title-md text-[14px] text-on-surface truncate">${ch.title}</span>
        <span class="font-body-sm text-[11px] text-on-surface-variant italic truncate">${
          ch.subtitle
        }</span>
        <button class="mobile-select-chapter-btn mt-2 py-1 px-3 bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-secondary rounded text-[10px] uppercase font-semibold self-start" data-chapter-id="${
          ch.id
        }">
          Launch
        </button>
      </div>
    </div>
  `
    )
    .join('');

  return `
<div class="flex flex-col w-full relative px-gutter-mobile py-space-md gap-space-md screen-fade-enter-active">
  <div class="flex items-center justify-between">
    <h2 class="font-headline-sm text-headline-sm text-on-surface">Memory Chapters</h2>
    <span class="font-label-sm text-secondary uppercase tracking-wider text-[10px]">${state.remnants} Remnants</span>
  </div>
  <div class="flex flex-col gap-space-sm">
    ${cardsHtml}
  </div>
</div>
`;
}

export function bindMobileChaptersEvents(onNavigate: (route: string) => void): void {
  const buttons = document.querySelectorAll('.mobile-select-chapter-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const chapterId = target.getAttribute('data-chapter-id');
      if (chapterId) {
        globalGameState.update({ activeChapterId: chapterId });
        onNavigate('hud');
      }
    });
  });
}
