import { GameStateModel } from '@core/GameState';

export function renderMobileLedger(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div class="flex flex-col w-full px-gutter-mobile py-space-sm space-y-space-md">
<!-- Micro Archival Protocol Header -->
<div class="flex items-center justify-between px-space-sm py-space-xs rounded bg-surface-container-lowest">
<div class="flex items-center gap-space-xs min-w-0">
<span class="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0"></span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary truncate">Telemetry Registry — Node 0x7B</span>
</div>
<div class="flex items-center gap-space-xs shrink-0">
<span class="font-label-sm text-label-sm uppercase text-on-surface-variant">Mode:</span>
<span class="font-label-sm text-label-sm text-secondary uppercase font-semibold" id="connBadgeText">ONLINE</span>
</div>
</div>
<!-- Top Summary Metrics Grid -->
<div class="grid grid-cols-2 gap-space-sm">
<!-- Remnant Metric Card -->
<div class="relative overflow-hidden rounded-xl bg-surface-container-low p-space-sm shadow-md border-l-2 border-secondary flex flex-col justify-between">
<span class="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider">Archived Remnants</span>
<div class="flex items-baseline gap-space-xs my-space-xs">
<span class="font-headline-md text-headline-md text-secondary" id="totalRemnants">${state.remnants}</span>
<span class="font-label-sm text-[10px] text-on-surface-variant uppercase font-mono">rem</span>
</div>
<span class="font-label-sm text-[9px] text-tertiary font-mono">Ledger Validated</span>
</div>
<!-- Continuity Health Card -->
<div class="relative overflow-hidden rounded-xl bg-surface-container-low p-space-sm shadow-md border-l-2 border-tertiary flex flex-col justify-between">
<span class="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider">Tether Sync</span>
<div class="flex items-baseline gap-space-xs my-space-xs">
<span class="font-headline-md text-headline-md text-tertiary">100%</span>
<span class="font-label-sm text-[10px] text-on-surface-variant uppercase font-mono">drift 0s</span>
</div>
<span class="font-label-sm text-[9px] text-tertiary font-mono">Deterministic State</span>
</div>
</div>
<!-- Quick Ledger Controls -->
<div class="flex items-center justify-between gap-space-sm">
<button class="flex-1 py-space-xs px-space-sm rounded-lg bg-secondary text-on-secondary font-label-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer" id="btnSimulate">
<span class="material-symbols-outlined text-[14px]">add</span>
<span>Simulate Fragment</span>
</button>
<button class="py-space-xs px-space-sm rounded-lg bg-surface-container-high text-secondary font-label-sm uppercase tracking-wider flex items-center justify-center cursor-pointer" id="btnOffline">
<span id="offlineBtnText">Toggle Offline</span>
</button>
<button class="py-space-xs px-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-sm uppercase tracking-wider flex items-center justify-center cursor-pointer" id="btnClear">
<span class="material-symbols-outlined text-[16px]">delete_sweep</span>
</button>
</div>
<!-- Filter Tabs Strip -->
<div class="flex items-center gap-space-xs overflow-x-auto pb-1 no-scrollbar">
<button class="filter-tab-btn px-space-sm py-1 rounded bg-surface-container-highest text-secondary font-label-sm text-[10px] uppercase shrink-0 transition-colors cursor-pointer" data-filter="all">All Events</button>
<button class="filter-tab-btn px-space-sm py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-[10px] uppercase shrink-0 transition-colors cursor-pointer" data-filter="chapter">Fragments</button>
<button class="filter-tab-btn px-space-sm py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-[10px] uppercase shrink-0 transition-colors cursor-pointer" data-filter="beacon">Beacons</button>
<button class="filter-tab-btn px-space-sm py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-[10px] uppercase shrink-0 transition-colors cursor-pointer" data-filter="secret">Secrets</button>
</div>
<!-- Real-Time Activity Feed -->
<div class="space-y-space-sm" id="ledgerContainer">
<!-- Ledger Row 1 -->
<article class="ledger-row p-space-sm rounded-xl bg-surface-container-low shadow-sm border-l-2 border-secondary flex flex-col gap-space-xs" data-category="chapter">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-mono">REMNANT // 042</span>
<span class="font-label-sm text-[10px] text-tertiary font-mono">200 OK SYNCED</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface">Fragment 042 Excavated</h3>
<p class="font-body-sm text-body-sm italic text-on-surface-variant">"Some doors only lock from the inside."</p>
<div class="flex items-center justify-between pt-space-xs text-[10px] text-on-surface-variant font-mono">
<span>SIG: 7b30c14f...</span>
<span class="text-secondary font-semibold">+25 Remnants</span>
</div>
</article>

<!-- Ledger Row 2 -->
<article class="ledger-row p-space-sm rounded-xl bg-surface-container-low shadow-sm border-l-2 border-tertiary flex flex-col gap-space-xs" data-category="beacon">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[10px] uppercase tracking-wider text-tertiary font-mono">BEACON // 03</span>
<span class="font-label-sm text-[10px] text-tertiary font-mono">200 OK SYNCED</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface">Beacon of Withering Ignited</h3>
<p class="font-body-sm text-body-sm italic text-on-surface-variant">"Warmth returns before sight."</p>
<div class="flex items-center justify-between pt-space-xs text-[10px] text-on-surface-variant font-mono">
<span>SIG: 3c90df11...</span>
<span class="text-tertiary font-semibold">+15 Remnants</span>
</div>
</article>
</div>
</div>
</main>
`;
}

export function bindMobileLedgerEvents(_onNavigate: (route: string) => void): void {
  let isOffline = false;
  let remnants = 1408;

  const totalEl = document.getElementById('totalRemnants');
  const connText = document.getElementById('connBadgeText');
  const btnOffline = document.getElementById('btnOffline');
  const offlineBtnText = document.getElementById('offlineBtnText');
  const btnSimulate = document.getElementById('btnSimulate');
  const btnClear = document.getElementById('btnClear');
  const container = document.getElementById('ledgerContainer');

  // Toggle offline mode
  if (btnOffline && connText && offlineBtnText) {
    btnOffline.addEventListener('click', () => {
      isOffline = !isOffline;
      if (isOffline) {
        connText.textContent = 'OFFLINE';
        connText.className = 'font-label-sm text-label-sm text-error uppercase font-semibold';
        offlineBtnText.textContent = 'Go Online';
      } else {
        connText.textContent = 'ONLINE';
        connText.className = 'font-label-sm text-label-sm text-secondary uppercase font-semibold';
        offlineBtnText.textContent = 'Toggle Offline';
      }
    });
  }

  // Simulate fragment
  if (btnSimulate && container) {
    btnSimulate.addEventListener('click', () => {
      remnants += 25;
      if (totalEl) totalEl.textContent = remnants.toLocaleString();

      const newRow = document.createElement('article');
      newRow.className = 'ledger-row p-space-sm rounded-xl bg-surface-container-low shadow-sm border-l-2 border-secondary flex flex-col gap-space-xs animate-pulse';
      newRow.setAttribute('data-category', 'chapter');
      newRow.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-mono">SIM // ${Date.now().toString().slice(-4)}</span>
          <span class="font-label-sm text-[10px] ${isOffline ? 'text-secondary' : 'text-tertiary'} font-mono">${isOffline ? 'QUEUED' : '200 OK'}</span>
        </div>
        <h3 class="font-title-md text-title-md text-on-surface">Synapse Echo Recorded</h3>
        <p class="font-body-sm text-body-sm italic text-on-surface-variant">"Echoes gather where silence is preserved."</p>
        <div class="flex items-center justify-between pt-space-xs text-[10px] text-on-surface-variant font-mono">
          <span>SIG: sim_${Date.now().toString().slice(-6)}</span>
          <span class="text-secondary font-semibold">+25 Remnants</span>
        </div>
      `;
      container.insertBefore(newRow, container.firstChild);
      setTimeout(() => newRow.classList.remove('animate-pulse'), 1000);
    });
  }

  // Clear ledger
  if (btnClear && container) {
    btnClear.addEventListener('click', () => {
      container.innerHTML = `
        <div class="p-space-lg rounded-xl bg-surface-container-low text-center flex flex-col items-center justify-center space-y-space-xs">
          <span class="material-symbols-outlined text-on-surface-variant text-[32px]">folder_off</span>
          <span class="font-title-md text-title-md text-on-surface">Ledger Cleared</span>
          <span class="font-body-sm text-body-sm text-on-surface-variant">Memory transcripts purged from local cache.</span>
        </div>
      `;
    });
  }

  // Filter tabs
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => {
        b.className = 'filter-tab-btn px-space-sm py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-[10px] uppercase shrink-0 transition-colors cursor-pointer';
      });
      const target = e.currentTarget as HTMLElement;
      target.className = 'filter-tab-btn px-space-sm py-1 rounded bg-surface-container-highest text-secondary font-label-sm text-[10px] uppercase shrink-0 transition-colors cursor-pointer';

      const filter = target.getAttribute('data-filter');
      const rows = document.querySelectorAll<HTMLElement>('.ledger-row');
      rows.forEach(row => {
        const cat = row.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          row.style.display = 'flex';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}
