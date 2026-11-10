import { globalGameState, GameStateModel } from '@core/GameState';

export function renderWebArchive(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  const currentShard = state.shards.find((s) => s.id === state.selectedShardId) ?? state.shards[0];

  return `
<div class="relative w-full px-margin py-space-xl flex flex-col gap-space-xl screen-fade-enter-active">
  <!-- Top Dossier Meta Bar & Vault Sub-header -->
  <header class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg pb-space-lg border-b border-surface-container-high">
    <div class="flex flex-col max-w-2xl gap-space-xs">
      <div class="flex items-center gap-space-sm">
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary bg-surface-container-high px-space-sm py-space-xs rounded">Folio Section VIII</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">Registry Hash: 0x88F-VOID</span>
      </div>
      <h1 class="font-headline-lg text-headline-lg text-secondary-fixed tracking-tight">Archive 08 — Vault of Surrender</h1>
      <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
        Recovered remnants from the flooded terrace. Handle with care; paper brittle and ink prone to fading under uncalibrated light.
      </p>
    </div>

    <!-- Archival Tabs Filter -->
    <nav aria-label="Archive Classification" class="flex flex-wrap items-center gap-space-xs p-space-xs rounded bg-surface-container-low shadow-sm">
      <button class="font-label-md text-label-md uppercase px-space-md py-space-sm rounded bg-surface-container-high text-secondary flex items-center gap-space-xs">
        <span>All Shards</span>
        <span class="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-lowest text-secondary-fixed">${state.shards.length}</span>
      </button>
      <button class="font-label-md text-label-md uppercase px-space-md py-space-sm rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex items-center gap-space-xs">
        <span>Photographs</span>
        <span class="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant">2</span>
      </button>
      <button class="font-label-md text-label-md uppercase px-space-md py-space-sm rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex items-center gap-space-xs">
        <span>Whispers</span>
        <span class="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant">1</span>
      </button>
    </nav>
  </header>

  <!-- 2-Column Archival Inspection Workbench -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
    <!-- LEFT COLUMN: Main Focused Fragment (8 Cols) -->
    <section class="lg:col-span-8 flex flex-col gap-space-lg bg-surface-container-low p-space-xl rounded-xl shadow-xl relative overflow-hidden">
      <!-- Specimen Index Header -->
      <div class="flex flex-wrap items-center justify-between gap-space-md">
        <div class="flex items-center gap-space-md">
          <span class="font-headline-sm text-headline-sm text-secondary-fixed">${currentShard.index}</span>
          <span class="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase bg-surface-container-highest px-space-sm py-space-xs rounded">${currentShard.classification}</span>
        </div>
        <div class="flex items-center gap-space-sm font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase">
          <span class="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
          <span>DATED: ${currentShard.dateStr}</span>
        </div>
      </div>

      <!-- Photographic Plate Container -->
      <div class="relative bg-surface-container-highest p-space-md rounded shadow-inner flex flex-col gap-space-md group">
        <div class="relative w-full h-[400px] rounded overflow-hidden bg-surface-container-lowest">
          <img class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]" src="${currentShard.imageUrl}" alt="${currentShard.title}" />
          <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80 pointer-events-none"></div>
          <div class="absolute top-4 left-4 bg-surface-container-lowest/80 backdrop-blur-md px-space-sm py-space-xs rounded flex items-center gap-space-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            <span class="font-label-sm text-label-sm text-secondary tracking-widest uppercase text-[9px]">${currentShard.folioNote}</span>
          </div>
        </div>

        <div class="px-space-md py-space-xs flex items-center justify-between">
          <p class="font-headline-sm text-headline-sm italic text-secondary-fixed tracking-wide font-normal">
            ${currentShard.quote}
          </p>
          <span class="font-label-sm text-label-sm text-on-surface-variant/60 tracking-widest uppercase">${currentShard.title}</span>
        </div>
      </div>

      <!-- Restoration Fidelity Diagnostic Bar -->
      <div class="flex flex-col gap-space-xs bg-surface-container p-space-md rounded">
        <div class="flex items-center justify-between font-label-sm text-label-sm">
          <span class="text-secondary tracking-widest uppercase flex items-center gap-space-xs">
            <span class="material-symbols-outlined text-[14px]">timelapse</span>
            Restoration Fidelity
          </span>
          <span class="text-secondary font-semibold">${currentShard.fidelityPercent}% RESTORED</span>
        </div>
        <div class="w-full h-1.5 bg-surface-container-lowest rounded overflow-hidden">
          <div class="h-full bg-secondary transition-all duration-1000 ease-out" style="width: ${currentShard.fidelityPercent}%;"></div>
        </div>
      </div>
    </section>

    <!-- RIGHT COLUMN: Shard Folio Selection (4 Cols) -->
    <aside class="lg:col-span-4 flex flex-col gap-space-md">
      <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Select Shard Folio</span>
      <div class="flex flex-col gap-space-sm">
        ${state.shards
          .map(
            (shard) => `
          <button class="shard-item-btn text-left p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container border ${
            shard.id === currentShard.id
              ? 'border-secondary/50 bg-surface-container'
              : 'border-transparent'
          } transition-all cursor-pointer flex flex-col gap-space-xs" data-shard-id="${shard.id}">
            <div class="flex items-center justify-between">
              <span class="font-label-sm text-secondary font-semibold uppercase">${shard.index}</span>
              <span class="font-label-sm text-tertiary">${shard.fidelityPercent}%</span>
            </div>
            <span class="font-title-md text-on-surface text-[14px]">${shard.title}</span>
            <span class="font-body-sm text-on-surface-variant italic truncate">${shard.quote}</span>
          </button>
        `
          )
          .join('')}
      </div>
    </aside>
  </div>
</div>
`;
}

export function bindWebArchiveEvents(onNavigate: (route: string) => void): void {
  const shardBtns = document.querySelectorAll('.shard-item-btn');
  shardBtns.forEach((btn) => {
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
