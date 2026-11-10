import { GameStateModel } from '@core/GameState';

export function renderMobileLedger(
  _state: Readonly<GameStateModel>,
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
<span class="font-label-sm text-label-sm uppercase text-on-surface-variant">Archivist Mode:</span>
<span class="font-label-sm text-label-sm text-secondary uppercase font-semibold">Active</span>
</div>
</div>
<!-- Top Summary Metrics Grid -->
<div class="grid grid-cols-2 gap-space-sm">
<!-- Remnant Metric Card -->
<div class="relative overflow-hidden rounded bg-surface-container-low p-space-md shadow-sm">
<div class="absolute -right-4 -bottom-4 opacity-5 pointer-events-none text-secondary">
<span class="material-symbols-outlined text-[80px]">toll</span>
</div>
<div class="flex flex-col space-y-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Total Accumulated</span>
<div class="flex items-baseline gap-space-xs">
<span class="font-headline-lg-mobile text-headline-lg-mobile text-secondary font-headline-lg tracking-tight" id="totalRemnants">485</span>
<span class="font-label-sm text-label-sm uppercase text-secondary/70">Remnants</span>
</div>
<div class="flex items-center gap-space-xs pt-space-xs">
<span class="material-symbols-outlined text-[14px] text-tertiary">trending_up</span>
<span class="font-body-sm text-body-sm text-tertiary">+75 past cycle</span>
</div>
</div>
</div>
<!-- Active Streak Card -->
<div class="relative overflow-hidden rounded bg-surface-container-low p-space-md shadow-sm">
<div class="absolute -right-4 -bottom-4 opacity-5 pointer-events-none text-on-surface">
<span class="material-symbols-outlined text-[80px]">auto_stories</span>
</div>
<div class="flex flex-col space-y-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Attunement Depth</span>
<div class="flex items-baseline gap-space-xs">
<span class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-headline-lg tracking-tight" id="streakCount">12</span>
<span class="font-label-sm text-label-sm uppercase text-on-surface-variant">Recollections</span>
</div>
<div class="flex items-center gap-space-xs pt-space-xs">
<span class="material-symbols-outlined text-[14px] text-secondary">flare</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Veil Unbroken</span>
</div>
</div>
</div>
</div>
<!-- API Connection Status Banner -->
<div class="rounded bg-surface-container-high px-space-md py-space-sm flex items-center justify-between gap-space-sm shadow-sm transition-colors duration-200" id="connectionBanner">
<div class="flex items-center gap-space-sm min-w-0">
<span class="material-symbols-outlined text-secondary text-[18px] shrink-0" id="connPulseIcon">wifi_tethering</span>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-space-xs">
<span class="font-label-sm text-label-sm uppercase font-semibold text-secondary" id="connBadgeText">SYNCED (ONLINE)</span>
<span class="font-label-sm text-[9px] text-on-surface-variant opacity-60">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant" id="latencyTag">24ms latency</span>
</div>
<span class="font-body-sm text-[11px] text-on-surface-variant truncate font-mono">/api/remnants/earn [TLS v1.3]</span>
</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-[16px] shrink-0">terminal</span>
</div>
<!-- API Control Bar & Interactive Simulation Buttons -->
<div class="rounded bg-surface-container-low p-space-sm space-y-space-sm shadow-sm">
<div class="flex items-center justify-between px-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Archivist Dispatcher</span>
<span class="font-label-sm text-[9px] text-secondary uppercase bg-surface-container-highest px-space-xs py-0.5 rounded">Mock Harness</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
<button class="w-full flex items-center justify-center gap-space-xs py-space-sm px-space-sm rounded bg-surface-container-high hover:bg-surface-bright active:bg-secondary-container text-on-surface transition-all" id="btnSimulate" type="button">
<span class="material-symbols-outlined text-[16px] text-secondary">add_circle</span>
<span class="font-label-md text-label-md uppercase tracking-wider font-semibold text-secondary">Earn +25</span>
</button>
<button class="w-full flex items-center justify-center gap-space-xs py-space-sm px-space-sm rounded bg-surface-container hover:bg-surface-container-high active:bg-surface-container-highest text-on-surface-variant transition-all" id="btnOffline" type="button">
<span class="material-symbols-outlined text-[16px]" id="offlineIcon">wifi_off</span>
<span class="font-label-md text-label-md uppercase tracking-wider" id="offlineBtnText">Toggle Offline</span>
</button>
<button class="w-full flex items-center justify-center gap-space-xs py-space-sm px-space-sm rounded bg-surface-container hover:bg-surface-container-high active:bg-error-container text-on-surface-variant hover:text-error transition-all" id="btnClear" type="button">
<span class="material-symbols-outlined text-[16px]">delete_sweep</span>
<span class="font-label-md text-label-md uppercase tracking-wider">Clear History</span>
</button>
</div>
</div>
<!-- Filter Chips (Horizontal Scrollable) -->
<div class="flex items-center gap-space-xs overflow-x-auto pb-space-xs pt-space-xs no-scrollbar">
<button class="filter-chip active-filter shrink-0 px-space-sm py-space-xs rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm uppercase tracking-wider font-medium transition-colors" data-filter="all">
      All Earns (4)
    </button>
<button class="filter-chip shrink-0 px-space-sm py-space-xs rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-medium transition-colors" data-filter="chapters">
      Chapter Completions
    </button>
<button class="filter-chip shrink-0 px-space-sm py-space-xs rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-medium transition-colors" data-filter="beacons">
      Beacons
    </button>
<button class="filter-chip shrink-0 px-space-sm py-space-xs rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-medium transition-colors" data-filter="discoveries">
      Discoveries
    </button>
<button class="filter-chip shrink-0 px-space-sm py-space-xs rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-medium transition-colors" data-filter="queued">
      Queued (Offline)
    </button>
</div>
<!-- Archival Ledger Registry Section -->
<div class="flex flex-col space-y-space-sm">
<div class="flex items-center justify-between px-space-xs">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[16px]">history_edu</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface font-medium">Memory Ledger Transcripts</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">Archived Folio #89</span>
</div>
<!-- Registry Container (Styled like vintage registry paper with pinhole edge strip) -->
<div class="flex flex-col space-y-space-xs" id="ledgerEntriesContainer">
<!-- Ledger Row 1 -->
<div class="ledger-row relative overflow-hidden rounded bg-surface-container-low p-space-md shadow-sm transition-all" data-category="chapters">
<!-- Visual pinhole strip indicator on left -->
<div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary/80"></div>
<div class="flex flex-col space-y-space-xs pl-space-xs">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col min-w-0">
<span class="font-title-md text-title-md text-on-surface truncate font-semibold">FRAGMENT #042 RESTORED</span>
<div class="flex items-center gap-space-xs mt-0.5">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Chapter I</span>
<span class="text-on-surface-variant text-[10px]">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Codex Folio VII</span>
</div>
</div>
<div class="flex flex-col items-end shrink-0">
<span class="font-title-md text-title-md text-secondary font-bold">+25</span>
<span class="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">Remnants</span>
</div>
</div>
<!-- Poetic Whisper Recalled -->
<div class="mt-space-xs p-space-xs rounded bg-surface-container-lowest/60 flex items-start gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[14px] shrink-0 mt-0.5">format_quote</span>
<p class="font-body-sm text-body-sm italic text-on-surface/90">"Some doors only lock from the inside."</p>
</div>
<!-- Network Protocol Stamp -->
<div class="flex items-center justify-between pt-space-xs">
<span class="font-label-sm text-[10px] font-mono text-on-surface-variant">ID: rec_09491a2</span>
<div class="flex items-center gap-space-xs px-space-xs py-0.5 rounded bg-surface-container-high">
<span class="material-symbols-outlined text-tertiary text-[12px]">done_all</span>
<span class="font-label-sm text-[10px] uppercase font-mono tracking-wider text-tertiary">200 OK SYNCED</span>
</div>
</div>
</div>
</div>
<!-- Ledger Row 2 -->
<div class="ledger-row relative overflow-hidden rounded bg-surface-container-low p-space-md shadow-sm transition-all" data-category="beacons">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary/80"></div>
<div class="flex flex-col space-y-space-xs pl-space-xs">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col min-w-0">
<span class="font-title-md text-title-md text-on-surface truncate font-semibold">BEACON 03 LIGHTING</span>
<div class="flex items-center gap-space-xs mt-0.5">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Chapter II</span>
<span class="text-on-surface-variant text-[10px]">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">The Drowned Belfry</span>
</div>
</div>
<div class="flex flex-col items-end shrink-0">
<span class="font-title-md text-title-md text-secondary font-bold">+15</span>
<span class="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">Remnants</span>
</div>
</div>
<div class="mt-space-xs p-space-xs rounded bg-surface-container-lowest/60 flex items-start gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[14px] shrink-0 mt-0.5">format_quote</span>
<p class="font-body-sm text-body-sm italic text-on-surface/90">"Warmth returns before sight."</p>
</div>
<div class="flex items-center justify-between pt-space-xs">
<span class="font-label-sm text-[10px] font-mono text-on-surface-variant">ID: rec_09491a3</span>
<div class="flex items-center gap-space-xs px-space-xs py-0.5 rounded bg-surface-container-high">
<span class="material-symbols-outlined text-tertiary text-[12px]">done_all</span>
<span class="font-label-sm text-[10px] uppercase font-mono tracking-wider text-tertiary">200 OK SYNCED</span>
</div>
</div>
</div>
</div>
<!-- Ledger Row 3 -->
<div class="ledger-row relative overflow-hidden rounded bg-surface-container-low p-space-md shadow-sm transition-all" data-category="discoveries">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary/80"></div>
<div class="flex flex-col space-y-space-xs pl-space-xs">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col min-w-0">
<span class="font-title-md text-title-md text-on-surface truncate font-semibold">HIDDEN MEMORY DISCOVERED</span>
<div class="flex items-center gap-space-xs mt-0.5">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Chapter II</span>
<span class="text-on-surface-variant text-[10px]">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Under-Keel Vault</span>
</div>
</div>
<div class="flex flex-col items-end shrink-0">
<span class="font-title-md text-title-md text-secondary font-bold">+50</span>
<span class="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">Remnants</span>
</div>
</div>
<div class="mt-space-xs p-space-xs rounded bg-surface-container-lowest/60 flex items-start gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[14px] shrink-0 mt-0.5">format_quote</span>
<p class="font-body-sm text-body-sm italic text-on-surface/90">"You were looking where no one else looked."</p>
</div>
<div class="flex items-center justify-between pt-space-xs">
<span class="font-label-sm text-[10px] font-mono text-on-surface-variant">ID: rec_09491a4</span>
<div class="flex items-center gap-space-xs px-space-xs py-0.5 rounded bg-surface-container-high">
<span class="material-symbols-outlined text-tertiary text-[12px]">done_all</span>
<span class="font-label-sm text-[10px] uppercase font-mono tracking-wider text-tertiary">200 OK SYNCED</span>
</div>
</div>
</div>
</div>
<!-- Ledger Row 4 (Queued Offline State) -->
<div class="ledger-row relative overflow-hidden rounded bg-surface-container-low p-space-md shadow-sm transition-all" data-category="queued">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container"></div>
<div class="flex flex-col space-y-space-xs pl-space-xs">
<div class="flex items-start justify-between gap-space-sm">
<div class="flex flex-col min-w-0">
<span class="font-title-md text-title-md text-on-surface truncate font-semibold">HERO ABILITY: VEIL SIGHT FIRST USE</span>
<div class="flex items-center gap-space-xs mt-0.5">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Chapter I</span>
<span class="text-on-surface-variant text-[10px]">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">The Obsidian Threshold</span>
</div>
</div>
<div class="flex flex-col items-end shrink-0">
<span class="font-title-md text-title-md text-secondary font-bold">+10</span>
<span class="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">Remnants</span>
</div>
</div>
<div class="mt-space-xs p-space-xs rounded bg-surface-container-lowest/60 flex items-start gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[14px] shrink-0 mt-0.5">format_quote</span>
<p class="font-body-sm text-body-sm italic text-on-surface/90">"The dark was never empty."</p>
</div>
<div class="flex items-center justify-between pt-space-xs">
<span class="font-label-sm text-[10px] font-mono text-on-surface-variant">ID: rec_09491a5 (local)</span>
<div class="flex items-center gap-space-xs px-space-xs py-0.5 rounded bg-secondary-container">
<span class="material-symbols-outlined text-secondary-fixed text-[12px] animate-spin">sync</span>
<span class="font-label-sm text-[10px] uppercase font-mono tracking-wider text-secondary-fixed font-semibold">QUEUED FOR SYNC</span>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Developer API Echo Debug Drawer -->
<div class="rounded bg-surface-container-lowest p-space-md shadow-sm space-y-space-sm">
<div class="flex items-center justify-between cursor-pointer select-none" id="debugToggle">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[18px]">data_object</span>
<span class="font-title-md text-title-md text-on-surface font-semibold">Developer API Echo Console</span>
</div>
<div class="flex items-center gap-space-xs">
<span class="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container-high px-space-xs py-0.5 rounded">Inspect Payload</span>
<span class="material-symbols-outlined text-on-surface-variant text-[18px] transition-transform" id="drawerChevron">expand_less</span>
</div>
</div>
<!-- Monospace Payload Echo Area -->
<div class="space-y-space-sm transition-all duration-200" id="debugContent">
<!-- Outgoing Transmission -->
<div class="flex flex-col space-y-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">POST /api/remnants/earn [Request Payload]</span>
<span class="font-label-sm text-[9px] text-tertiary font-mono">HTTP/2 Secure</span>
</div>
<pre class="bg-surface-container-lowest p-space-sm rounded text-[11px] font-mono leading-relaxed text-primary overflow-x-auto selection:bg-secondary-container"><code>{
  "event": "checkpoint_light",
  "amount": 15,
  "chapter": 2,
  "session_id": "anon_994a",
  "timestamp": 1718294021
}</code></pre>
</div>
<!-- Server Echoed Response -->
<div class="flex flex-col space-y-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[10px] uppercase tracking-widest text-secondary font-mono">REPLY [HTTP 200 / Echoed Whisper Stream]</span>
<span class="font-label-sm text-[9px] text-secondary font-mono">24ms Roundtrip</span>
</div>
<pre class="bg-surface-container-lowest p-space-sm rounded text-[11px] font-mono leading-relaxed text-secondary overflow-x-auto selection:bg-secondary-container"><code>{
  "status": 200,
  "code": "OK",
  "whisper": "Warmth returns before sight.",
  "remnants_balance": 485,
  "ledger_seal": "0x78ab12e_signed"
}</code></pre>
</div>
</div>
</div>
<!-- Privacy & Local Vault Assurance Note -->
<div class="p-space-md rounded bg-surface-container-lowest flex items-start gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">verified_user</span>
<div class="flex flex-col space-y-space-xs min-w-0">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Archival Integrity &amp; Privacy Mandate</span>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
        Remnant API is strictly optional and transmits zero personal data. Disable in Settings to count offline. All memory transcripts remain signed locally inside the client ledger.
      </p>
</div>
</div>
</div>
</main>
`;
}

export function bindMobileLedgerEvents(_onNavigate: (route: string) => void): void {
  const tabs = document.querySelectorAll('main [data-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('bg-surface-container-high', 'text-secondary'));
      tab.classList.add('bg-surface-container-high', 'text-secondary');
    });
  });
}
