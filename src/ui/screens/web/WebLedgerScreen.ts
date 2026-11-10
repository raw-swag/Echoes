import { GameStateModel } from '@core/GameState';

export function renderWebLedger(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<main class="relative pt-20 bg-background min-h-screen"><div class="flex flex-col w-full">
<div class="px-margin py-space-xl flex flex-col gap-space-xl max-w-[1720px] mx-auto w-full">
<!-- Whispers Banner -->
<div class="relative overflow-hidden rounded bg-surface-container-low px-space-lg py-space-md shadow-sm">
<div class="flex flex-wrap items-center justify-between gap-space-md relative z-10">
<div class="flex items-center gap-space-md min-w-0">
<div class="w-8 h-8 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">history_edu</span>
</div>
<div class="flex flex-wrap items-baseline gap-x-space-sm gap-y-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Whisper Active:</span>
<span class="font-headline-sm text-headline-sm italic text-on-surface">"${state.activeWhisper}"</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">— LEDGER #40 [SUB-TRANSCRIPT]</span>
</div>
</div>
<div class="flex items-center gap-space-md shrink-0">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">ARCHIVAL INTEGRITY: NOMINAL</span>
<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
</div>
</div>
<div class="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-surface-container-high/20 to-transparent pointer-events-none"></div>
</div>
<!-- Summary Metrics & Archivist Dispatcher -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
<!-- Metric 1: Total Remnants -->
<div class="lg:col-span-4 rounded bg-surface-container-low p-space-lg flex flex-col justify-between shadow-sm relative overflow-hidden group">
<div class="flex items-center justify-between mb-space-md">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Archived Remnant Balance</span>
<span class="material-symbols-outlined text-secondary text-[18px]">toll</span>
</div>
<div class="flex flex-col gap-space-xs my-space-xs">
<div class="flex items-baseline gap-space-sm">
<span class="font-display-lg text-display-lg text-secondary tracking-tight" id="metric-remnants-val">${state.remnants}</span>
<span class="font-title-md text-title-md text-secondary/70">REMNANTS</span>
</div>
<span class="font-body-sm text-body-sm text-tertiary flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[14px]">north_east</span>
<span>+75 accumulated past cycle</span>
</span>
</div>
<div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant/60">
<span class="font-label-sm text-label-sm uppercase tracking-wider">Epoch Threshold: 1,500</span>
<span class="font-label-sm text-label-sm">93.8%</span>
</div>
<div class="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-space-xs">
<div class="bg-secondary h-full rounded-full transition-all duration-500" style="width: 93.8%"></div>
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
<span>Veil Unbroken • State: Pristine</span>
</span>
</div>
<div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant/60">
<span class="font-label-sm text-label-sm uppercase tracking-wider">Fracture Risk: 0.00%</span>
<span class="font-label-sm text-label-sm">Folio IV Restored</span>
</div>
<div class="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-space-xs">
<div class="bg-tertiary h-full rounded-full" style="width: 100%"></div>
</div>
</div>
<!-- Metric 3: Sync Status & Protocol -->
<div class="lg:col-span-4 rounded bg-surface-container-low p-space-lg flex flex-col justify-between shadow-sm">
<div class="flex items-center justify-between mb-space-md">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Synchronizer Pipeline</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" id="sync-icon">cloud_done</span>
</div>
<div class="flex flex-col gap-space-xs my-space-xs">
<div class="flex items-center gap-space-sm">
<span class="font-headline-md text-headline-md text-tertiary tracking-wide uppercase" id="sync-status-badge">SYNCED</span>
<span class="font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-tertiary-container text-tertiary uppercase" id="sync-status-mode">ONLINE</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant font-mono">
            24ms latency • TLS v1.3 [AES-GCM]
          </span>
</div>
<div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant/60">
<span class="font-label-sm text-label-sm font-mono text-secondary-fixed-dim">POST /api/remnants/earn</span>
<span class="font-label-sm text-label-sm">PID: #4819</span>
</div>
<div class="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-space-xs">
<div class="bg-tertiary h-full rounded-full transition-all duration-300" id="sync-bar" style="width: 100%"></div>
</div>
</div>
</div>
<!-- Archivist Dispatcher Control Strip -->
<div class="rounded bg-surface-container-high px-space-lg py-space-md flex flex-wrap items-center justify-between gap-space-md shadow-sm">
<div class="flex items-center gap-space-md">
<span class="material-symbols-outlined text-secondary text-[20px]">tune</span>
<div class="flex flex-col">
<span class="font-label-md text-label-md uppercase tracking-wider text-on-surface">Archivist Dispatcher Bar</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Ledger state mutations and simulated network pipeline events</span>
</div>
</div>
<div class="flex flex-wrap items-center gap-space-sm">
<button class="px-space-md py-space-sm bg-surface-variant text-secondary hover:bg-secondary-container hover:text-secondary-fixed rounded font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-space-xs" id="btn-earn" onclick="simulateEarn()">
<span class="material-symbols-outlined text-[16px]">add_circle</span>
<span>Earn +25</span>
</button>
<button class="px-space-md py-space-sm bg-surface-variant text-on-surface-variant hover:text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-space-xs" id="btn-toggle-offline" onclick="toggleOfflineMode()">
<span class="material-symbols-outlined text-[16px]">wifi_off</span>
<span id="btn-offline-label">Toggle Offline</span>
</button>
<button class="px-space-md py-space-sm bg-surface-variant text-on-surface-variant hover:text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-space-xs" id="btn-mock-harness" onclick="triggerMockHarness()">
<span class="material-symbols-outlined text-[16px]">terminal</span>
<span>Mock Harness</span>
</button>
<button class="px-space-md py-space-sm bg-surface-container text-on-surface-variant/70 hover:text-error rounded font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-space-xs" onclick="clearLedgerHistory()">
<span class="material-symbols-outlined text-[16px]">delete_sweep</span>
<span>Clear History</span>
</button>
</div>
</div>
<!-- 2-Column Split Workspace -->
<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-xl">
<!-- Left Column: Memory Ledger Transcripts (Archived Folio #89) -->
<div class="xl:col-span-7 flex flex-col gap-space-lg">
<!-- Ledger Header & Category Filters -->
<div class="flex flex-col gap-space-md">
<div class="flex flex-wrap items-baseline justify-between gap-space-sm">
<div class="flex items-center gap-space-sm">
<span class="font-headline-md text-headline-md text-on-surface">Memory Ledger Transcripts</span>
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest px-space-sm py-space-xs bg-surface-container rounded">Folio #89</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Client Ledger Sync Sequence: #0928</span>
</div>
<!-- Filter Navigation Tabs -->
<div class="flex flex-wrap items-center gap-space-xs bg-surface-container-lowest p-space-xs rounded">
<button class="filter-tab px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider bg-surface-container text-secondary transition-colors" data-filter="all" onclick="filterEntries('all')">
              All Earns (4)
            </button>
<button class="filter-tab px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors" data-filter="chapter" onclick="filterEntries('chapter')">
              Chapter Completions
            </button>
<button class="filter-tab px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors" data-filter="beacon" onclick="filterEntries('beacon')">
              Beacons
            </button>
<button class="filter-tab px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors" data-filter="discovery" onclick="filterEntries('discovery')">
              Discoveries
            </button>
</div>
</div>
<!-- Ledger Entries Stream -->
<div class="flex flex-col gap-space-md" id="ledger-stream">
<!-- Entry 1: Fragment #042 Restored -->
<div class="ledger-item rounded bg-surface-container-low p-space-lg flex flex-col gap-space-md transition-all duration-300 hover:bg-surface-container cursor-pointer shadow-sm" data-category="chapter" onclick="selectLedgerEntry(1)">
<div class="flex flex-wrap items-start justify-between gap-space-sm">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Entry #042</span>
<span class="font-label-sm text-label-sm text-on-surface-variant/60">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">CHAPTER I • Codex Folio VII</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">FRAGMENT #042 RESTORED</h3>
</div>
<div class="flex flex-col items-end gap-space-xs">
<span class="font-title-md text-title-md text-secondary tracking-tight">+25 REMNANTS</span>
<span class="px-space-sm py-space-xs rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                  200 OK SYNCED
                </span>
</div>
</div>
<div class="rounded bg-surface-container-lowest/60 p-space-md">
<span class="font-body-md text-body-md italic text-on-surface-variant">"Some doors only lock from the inside."</span>
</div>
<div class="flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant/60 pt-space-xs">
<div class="flex items-center gap-space-md font-mono text-[11px]">
<span>HASH: 8e91fa40b</span>
<span>EVENT: FRAGMENT_REPAIR</span>
</div>
<span class="font-body-sm text-body-sm">4 mins ago • Archivist Folio</span>
</div>
</div>
<!-- Entry 2: Beacon 03 Lighting -->
<div class="ledger-item rounded bg-surface-container-low p-space-lg flex flex-col gap-space-md transition-all duration-300 hover:bg-surface-container cursor-pointer shadow-sm" data-category="beacon" onclick="selectLedgerEntry(2)">
<div class="flex flex-wrap items-start justify-between gap-space-sm">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Entry #041</span>
<span class="font-label-sm text-label-sm text-on-surface-variant/60">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">CHAPTER II • The Drowned Belfry</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">BEACON 03 LIGHTING</h3>
</div>
<div class="flex flex-col items-end gap-space-xs">
<span class="font-title-md text-title-md text-secondary tracking-tight">+15 REMNANTS</span>
<span class="px-space-sm py-space-xs rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                  200 OK SYNCED
                </span>
</div>
</div>
<div class="rounded bg-surface-container-lowest/60 p-space-md">
<span class="font-body-md text-body-md italic text-on-surface-variant">"Warmth returns before sight."</span>
</div>
<div class="flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant/60 pt-space-xs">
<div class="flex items-center gap-space-md font-mono text-[11px]">
<span>HASH: 44b7d120a</span>
<span>EVENT: BEACON_IGNITE</span>
</div>
<span class="font-body-sm text-body-sm">18 mins ago • Signal Hub</span>
</div>
</div>
<!-- Entry 3: Hidden Memory Discovered -->
<div class="ledger-item rounded bg-surface-container-low p-space-lg flex flex-col gap-space-md transition-all duration-300 hover:bg-surface-container cursor-pointer shadow-sm" data-category="discovery" onclick="selectLedgerEntry(3)">
<div class="flex flex-wrap items-start justify-between gap-space-sm">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Entry #040</span>
<span class="font-label-sm text-label-sm text-on-surface-variant/60">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">CHAPTER II • Under-Keel Vault</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">HIDDEN MEMORY DISCOVERED</h3>
</div>
<div class="flex flex-col items-end gap-space-xs">
<span class="font-title-md text-title-md text-secondary tracking-tight">+50 REMNANTS</span>
<span class="px-space-sm py-space-xs rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                  200 OK SYNCED
                </span>
</div>
</div>
<div class="rounded bg-surface-container-lowest/60 p-space-md">
<span class="font-body-md text-body-md italic text-on-surface-variant">"You were looking where no one else looked."</span>
</div>
<div class="flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant/60 pt-space-xs">
<div class="flex items-center gap-space-md font-mono text-[11px]">
<span>HASH: 991cd68ef</span>
<span>EVENT: SECRET_UNLOCKED</span>
</div>
<span class="font-body-sm text-body-sm">42 mins ago • Sub-Vault</span>
</div>
</div>
<!-- Entry 4: Hero Ability Veil Sight First Cast -->
<div class="ledger-item rounded bg-surface-container-low p-space-lg flex flex-col gap-space-md transition-all duration-300 hover:bg-surface-container cursor-pointer shadow-sm" data-category="chapter" onclick="selectLedgerEntry(4)">
<div class="flex flex-wrap items-start justify-between gap-space-sm">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Entry #039</span>
<span class="font-label-sm text-label-sm text-on-surface-variant/60">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">CHAPTER I • The Obsidian Threshold</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">HERO ABILITY: VEIL SIGHT FIRST CAST</h3>
</div>
<div class="flex flex-col items-end gap-space-xs">
<span class="font-title-md text-title-md text-secondary tracking-tight">+10 REMNANTS</span>
<span class="px-space-sm py-space-xs rounded bg-surface-container-high text-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider" id="status-queued-badge">
                  QUEUED FOR SYNC
                </span>
</div>
</div>
<div class="rounded bg-surface-container-lowest/60 p-space-md">
<span class="font-body-md text-body-md italic text-on-surface-variant">"The dark was never empty."</span>
</div>
<div class="flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant/60 pt-space-xs">
<div class="flex items-center gap-space-md font-mono text-[11px]">
<span>HASH: 12af77d01</span>
<span>EVENT: TALENT_DISCHARGE</span>
</div>
<span class="font-body-sm text-body-sm">1 hour ago • Threshold Gates</span>
</div>
</div>
</div>
<!-- Archival Integrity & Privacy Mandate Card -->
<div class="rounded bg-surface-container-high p-space-lg flex flex-col gap-space-md shadow-sm">
<div class="flex items-center gap-space-md">
<span class="material-symbols-outlined text-secondary text-[22px]">verified_user</span>
<div class="flex flex-col">
<span class="font-label-md text-label-md uppercase tracking-widest text-secondary">Archival Integrity &amp; Privacy Mandate</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Cryptographic Remnant Standard • Folio Spec v4.0</span>
</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant/90 leading-relaxed">
            The Remnant API is strictly optional and transmits zero personal data or unique hardware signatures. All memory transcripts remain signed locally inside the client ledger using ChaCha20-Poly1305. Network attestation provides peer whisper consensus without storing external state.
          </p>
<div class="flex flex-wrap items-center gap-space-lg text-on-surface-variant/70 text-body-sm">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-tertiary text-[16px]">lock</span>
<span>Zero-Knowledge Signatures</span>
</div>
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-tertiary text-[16px]">sync_disabled</span>
<span>Offline Durable SQLite Vault</span>
</div>
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[16px]">vpn_key</span>
<span>Ed25519 Local Ledger Key</span>
</div>
</div>
</div>
</div>
<!-- Right Column: Developer API Echo Console -->
<div class="xl:col-span-5 flex flex-col gap-space-lg">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[20px]">code</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">Developer API Echo Console</h2>
</div>
<div class="flex items-center gap-space-xs">
<span class="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-mono">STREAMING</span>
</div>
</div>
<!-- Request Payload Inspector -->
<div class="rounded bg-surface-container-lowest p-space-lg flex flex-col gap-space-md shadow-sm">
<div class="flex items-center justify-between pb-space-sm">
<div class="flex items-center gap-space-sm">
<span class="px-space-sm py-0.5 rounded bg-surface-container font-mono text-[11px] text-secondary font-bold">POST</span>
<span class="font-mono text-body-sm text-on-surface">/api/remnants/earn</span>
</div>
<button class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-secondary flex items-center gap-1 transition-colors" onclick="copyToClipboard('request-payload')">
<span class="material-symbols-outlined text-[14px]">content_copy</span>
<span>Copy</span>
</button>
</div>
<div class="rounded bg-primary-container p-space-md overflow-x-auto">
<pre class="font-mono text-body-sm text-surface-tint leading-relaxed select-all" id="request-payload"><code>{
  "client_timestamp": 1714528920,
  "ledger_id": "LDG-408-A",
  "archivist_sig": "ed25519:7b30c14f...",
  "event": {
    "action": "FRAGMENT_RESTORE",
    "fragment_id": "FRAG_042",
    "chapter": "CHAPTER_I",
    "remnants_awarded": 25,
    "hash_proof": "8e91fa40b3c102a9"
  },
  "attunement": {
    "depth": 12,
    "veil_broken": false
  }
}</code></pre>
</div>
</div>
<!-- Response Payload Inspector -->
<div class="rounded bg-surface-container-lowest p-space-lg flex flex-col gap-space-md shadow-sm">
<div class="flex items-center justify-between pb-space-sm">
<div class="flex items-center gap-space-sm">
<span class="px-space-sm py-0.5 rounded bg-tertiary-container text-tertiary font-mono text-[11px] font-bold" id="response-status-code">HTTP 200 OK</span>
<span class="font-mono text-body-sm text-on-surface-variant">Echoed Whisper Stream</span>
</div>
<span class="font-mono text-label-sm text-label-sm text-on-surface-variant" id="response-latency">24ms roundtrip</span>
</div>
<div class="rounded bg-primary-container p-space-md overflow-x-auto">
<pre class="font-mono text-body-sm text-surface-tint leading-relaxed select-all" id="response-payload"><code>{
  "status": "ATTESTED",
  "server_epoch": 1714528921,
  "new_balance": 1408,
  "delta": +25,
  "echo_whisper": {
    "id": "WHISPER_042",
    "quote": "Some doors only lock from the inside.",
    "resonance_weight": 0.892,
    "peer_validations": 64
  },
  "client_queue_exhausted": true,
  "next_sync_window_ms": 60000
}</code></pre>
</div>
</div>
<!-- Live Diagnostics & Terminal Telemetry -->
<div class="rounded bg-surface-container-low p-space-lg flex flex-col gap-space-md shadow-sm">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md uppercase tracking-wider text-on-surface">Archivist Telemetry Logs</span>
<span class="font-mono text-label-sm text-label-sm text-on-surface-variant">NODE: US-EAST-01</span>
</div>
<div class="flex flex-col gap-space-xs font-mono text-[11px] text-on-surface-variant/80">
<div class="flex items-center justify-between py-1">
<span class="text-tertiary">[14:02:00.104] POST /api/remnants/earn</span>
<span class="text-on-surface-variant/60">200 OK (22ms)</span>
</div>
<div class="flex items-center justify-between py-1">
<span class="text-tertiary">[14:02:18.420] POST /api/remnants/earn</span>
<span class="text-on-surface-variant/60">200 OK (26ms)</span>
</div>
<div class="flex items-center justify-between py-1">
<span class="text-tertiary">[14:02:42.890] POST /api/remnants/earn</span>
<span class="text-on-surface-variant/60">200 OK (24ms)</span>
</div>
<div class="flex items-center justify-between py-1 text-secondary" id="telemetry-live-row">
<span>[14:03:01.012] SYNC QUEUE: 1 PENDING DISPATCH</span>
<span>STATE: AWAIT_ACK</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
`;
}

export function bindWebLedgerEvents(_onNavigate: (route: string) => void): void {
  const syncBtn = document.getElementById('manualSyncBtn');
  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      const banner = document.getElementById('syncPulseBanner');
      if (banner) {
        banner.classList.remove('hidden');
        setTimeout(() => banner.classList.add('hidden'), 2500);
      }
    });
  }

  // Row selection in registry
  const rows = document.querySelectorAll('tbody tr');
  rows.forEach((row) => {
    row.addEventListener('click', () => {
      rows.forEach(r => r.classList.remove('bg-surface-container-high/60'));
      row.classList.add('bg-surface-container-high/60');
    });
  });
}
