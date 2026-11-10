import { globalGameState, GameStateModel } from '@core/GameState';

export function renderWebChapters(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  const chaptersHtml = state.chapters
    .map(
      (ch) => `
    <article class="lg:col-span-12 bg-surface-container-low rounded-xl p-space-xl flex flex-col gap-space-lg shadow-md group hover:bg-surface-container transition-all duration-300">
      <div class="flex items-center justify-between gap-space-md">
        <div class="flex items-center gap-space-sm">
          <span class="font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-surface-container-highest ${
            ch.restored ? 'text-tertiary' : 'text-on-surface-variant'
          } uppercase tracking-widest">
            ${ch.restored ? '[RESTORED]' : '[SEALED]'}
          </span>
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">+${
            ch.remnantsClaimed
          } Remnants Claimed</span>
        </div>
        <span class="font-label-sm text-label-sm text-on-surface-variant/70 tracking-widest uppercase">Index // R-0${
          ch.number
        }</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-12 gap-space-lg items-center">
        <!-- Archival Image Mount Frame -->
        <div class="sm:col-span-4 bg-surface-container-highest p-space-sm rounded-lg shadow-lg flex flex-col gap-space-xs">
          <div class="overflow-hidden rounded relative aspect-[16/10] bg-surface-container-lowest">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" src="${
              ch.thumbnailUrl
            }" alt="${ch.title}" />
            <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-2 left-2 flex items-center gap-1 text-on-surface/80">
              <span class="material-symbols-outlined text-[14px] text-tertiary">${
                ch.restored ? 'lock_open' : 'lock'
              }</span>
              <span class="font-label-sm text-label-sm tracking-widest uppercase">${
                ch.syncState
              }</span>
            </div>
          </div>
          <div class="text-center py-1">
            <span class="font-label-sm text-label-sm text-on-surface-variant/70 italic tracking-wider">Plate #0${
              ch.number
            } — ${ch.subtitle}</span>
          </div>
        </div>

        <!-- Editorial Details -->
        <div class="sm:col-span-8 flex flex-col justify-between h-full gap-space-md">
          <div class="flex flex-col gap-space-sm">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Folio Fragment 0${
              ch.number
            }</span>
            <h2 class="font-headline-md text-headline-md text-on-surface leading-tight">
              ${ch.title} — <span class="italic font-normal">${ch.subtitle}</span>
            </h2>
            <blockquote class="font-body-md text-body-md text-secondary italic pl-space-md bg-surface-container-lowest/40 py-space-xs rounded-sm">
              “Memory is not yours just because you can restore it.”
            </blockquote>
          </div>

          <div class="flex items-center justify-between pt-space-sm border-t border-surface-container-highest">
            <div class="flex items-center gap-space-lg">
              <span class="font-label-sm text-label-sm text-on-surface-variant">Shards: ${
                ch.shardsCurrent
              } / ${ch.shardsTotal}</span>
              <span class="font-label-sm text-label-sm text-on-surface-variant">Remnants: ${
                ch.remnantsClaimed
              } / ${ch.remnantsTotal}</span>
            </div>
            <button class="chapter-play-btn font-label-sm text-label-sm uppercase px-space-md py-space-xs bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-secondary rounded transition-colors" data-chapter-id="${
              ch.id
            }">
              Select Chapter
            </button>
          </div>
        </div>
      </div>
    </article>
  `
    )
    .join('');

  return `
<div class="px-margin py-space-xl flex flex-col gap-space-xl screen-fade-enter-active">
  <!-- Top Progress Ledger Bar -->
  <section class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg bg-surface-container-low p-space-xl rounded-xl shadow-md">
    <div class="flex flex-col gap-space-xs max-w-xl">
      <div class="flex items-center gap-space-sm">
        <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Archival Folio // Volume II</span>
        <span class="w-1 h-1 rounded-full bg-outline"></span>
        <span class="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">Sync State: Coherent</span>
      </div>
      <h1 class="font-headline-lg text-headline-lg text-on-surface">Chapter Index</h1>
      <p class="font-body-md text-body-md text-on-surface-variant">
        Fragments of collective recollection extracted from Deep Fog stratum. Recover remnants to reconstruct the unwritten ledgers.
      </p>
    </div>

    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-space-xl">
      <div class="flex flex-col gap-space-xs">
        <div class="flex items-center justify-between gap-space-md">
          <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Restoration</span>
          <span class="font-title-md text-title-md text-secondary">02 / 05 Recovered</span>
        </div>
        <div class="w-48 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
          <div class="h-full bg-secondary transition-all duration-700" style="width: 40%;"></div>
        </div>
      </div>

      <div class="flex items-center gap-space-md bg-surface-container px-space-lg py-space-md rounded-lg shadow-sm">
        <div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-secondary text-[22px]">hourglass_empty</span>
        </div>
        <div class="flex flex-col">
          <div class="flex items-baseline gap-space-xs">
            <span class="font-title-md text-title-md text-secondary leading-none">${state.remnants}</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant">/ 320</span>
          </div>
          <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-0.5">Remnants Preserved</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Editorial Grid of Chapters -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
    ${chaptersHtml}
  </div>
</div>
`;
}

export function bindWebChaptersEvents(onNavigate: (route: string) => void): void {
  const buttons = document.querySelectorAll('.chapter-play-btn');
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
