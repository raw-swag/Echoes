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
<span class="font-label-sm text-label-sm text-on-surface-variant/70 uppercase tracking-widest">[LEDGER #40]</span>
</div>
</div>
<div class="flex items-center gap-space-md shrink-0">
<span class="font-label-sm text-label-sm uppercase tracking-widest px-space-sm py-0.5 rounded bg-surface-container-high text-tertiary">Cryptographic Sync Coherent</span>
<span class="font-body-sm text-body-sm text-on-surface-variant/60 font-mono">HASH: 7b30c14f</span>
</div>
</div>
</div>
<!-- Header: Dossier Identity & Global Remnant Tally -->
<header class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg pb-space-lg border-b border-surface-container-high">
<div class="flex flex-col gap-space-xs max-w-2xl">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary bg-surface-container-high px-space-sm py-space-xs rounded">Folio Section 09</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">Terminal ID: LDG-408-A</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-on-surface">Remnant Ledger &amp; Whisper Registry</h1>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Cryptographic journal verifying memory fragments, proof-of-recovery transactions, and decrypted audio whispers across all archival strata.
        </p>
</div>
<!-- Quick Stat Modules -->
<div class="grid grid-cols-2 sm:grid-cols-3 gap-space-md">
<div class="rounded bg-surface-container-low p-space-md flex flex-col justify-between shadow-sm border-l-2 border-secondary">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Attested Remnants</span>
<div class="flex items-baseline gap-space-xs mt-space-xs">
<span class="font-headline-md text-headline-md text-secondary" id="metric-remnants-val">${state.remnants}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">total</span>
</div>
</div>
<div class="rounded bg-surface-container-low p-space-md flex flex-col justify-between shadow-sm border-l-2 border-tertiary">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Tether Health</span>
<div class="flex items-baseline gap-space-xs mt-space-xs">
<span class="font-headline-md text-headline-md text-tertiary">100%</span>
<span class="font-label-sm text-label-sm text-tertiary">Zero Loss</span>
</div>
</div>
<div class="col-span-2 sm:col-span-1 rounded bg-surface-container-low p-space-md flex flex-col justify-between shadow-sm border-l-2 border-outline-variant">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Signed Hashes</span>
<div class="flex items-baseline gap-space-xs mt-space-xs">
<span class="font-headline-md text-headline-md text-on-surface">1,408</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">proofs</span>
</div>
</div>
</div>
</header>
<!-- Main Content Bento: Ledger Stream (Left) + Interactive Console/Inspector (Right) -->
<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start">
<!-- Left Column: The Live Attestation Ledger (Col 1-7) -->
<section class="xl:col-span-7 flex flex-col gap-space-lg">
<!-- Filter & Live Attestation Status Bar -->
<div class="flex flex-wrap items-center justify-between gap-space-md bg-surface-container-low p-space-sm rounded shadow-sm">
<div class="flex items-center gap-space-xs">
<button class="filter-tab px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider bg-surface-container text-secondary transition-colors cursor-pointer" data-filter="all">All Events</button>
<button class="filter-tab px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-filter="chapter">Fragments</button>
<button class="filter-tab px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-filter="beacon">Beacons</button>
<button class="filter-tab px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" data-filter="secret">Secrets</button>
</div>
<div class="flex items-center gap-space-sm pr-space-sm">
<button class="font-label-sm text-label-sm uppercase px-space-sm py-1 rounded bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors shadow-sm flex items-center gap-1 cursor-pointer" id="btn-simulate-earn">
<span class="material-symbols-outlined text-[14px]">add_circle</span>
<span>Simulate Earn</span>
</button>
<button class="font-label-sm text-label-sm uppercase px-space-sm py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer" id="btn-clear-ledger">
                Clear View
              </button>
</div>
</div>
<!-- Historical Record Cards Stack -->
<div class="flex flex-col gap-space-md" id="ledger-stream">
<!-- Ledger Item 1 -->
<article class="ledger-item rounded bg-surface-container-low p-space-lg flex flex-col gap-space-md transition-all duration-300 hover:bg-surface-container cursor-pointer shadow-sm border-l-2 border-secondary" data-category="chapter" data-id="1">
<div class="flex flex-wrap items-start justify-between gap-space-sm">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Entry #044</span>
<span class="font-label-sm text-label-sm text-on-surface-variant/60">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">CHAPTER I • Flooded Terrace</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">FRAGMENT 042 EXCAVATED</h3>
</div>
<div class="flex flex-col items-end gap-space-xs">
<span class="font-title-md text-title-md text-secondary tracking-tight">+25 REMNANTS</span>
<span class="px-space-sm py-space-xs rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm uppercase tracking-wider">200 OK SYNCED</span>
</div>
</div>
<div class="rounded bg-surface-container-lowest/60 p-space-md">
<span class="font-body-md text-body-md italic text-on-surface-variant">"Some doors only lock from the inside."</span>
</div>
<div class="flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant/60 font-mono text-[11px] pt-space-xs">
<div class="flex items-center gap-space-md">
<span>HASH: 8e91fa40b</span>
<span>SIG: ed25519:7b30c14f</span>
</div>
<span class="font-body-sm text-body-sm font-sans">2m ago • Verified</span>
</div>
</article>

<!-- Ledger Item 2 -->
<article class="ledger-item rounded bg-surface-container-low p-space-lg flex flex-col gap-space-md transition-all duration-300 hover:bg-surface-container cursor-pointer shadow-sm border-l-2 border-tertiary" data-category="beacon" data-id="2">
<div class="flex flex-wrap items-start justify-between gap-space-sm">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">Entry #043</span>
<span class="font-label-sm text-label-sm text-on-surface-variant/60">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">CHAPTER II • Iron Arch</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">BEACON OF WITHERING IGNITED</h3>
</div>
<div class="flex flex-col items-end gap-space-xs">
<span class="font-title-md text-title-md text-tertiary tracking-tight">+15 REMNANTS</span>
<span class="px-space-sm py-space-xs rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm uppercase tracking-wider">200 OK SYNCED</span>
</div>
</div>
<div class="rounded bg-surface-container-lowest/60 p-space-md">
<span class="font-body-md text-body-md italic text-on-surface-variant">"Warmth returns before sight."</span>
</div>
<div class="flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant/60 font-mono text-[11px] pt-space-xs">
<div class="flex items-center gap-space-md">
<span>HASH: 44b7d120a</span>
<span>SIG: ed25519:3c90df11</span>
</div>
<span class="font-body-sm text-body-sm font-sans">14m ago • Verified</span>
</div>
</article>

<!-- Ledger Item 3 -->
<article class="ledger-item rounded bg-surface-container-low p-space-lg flex flex-col gap-space-md transition-all duration-300 hover:bg-surface-container cursor-pointer shadow-sm border-l-2 border-secondary" data-category="secret" data-id="3">
<div class="flex flex-wrap items-start justify-between gap-space-sm">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Entry #042</span>
<span class="font-label-sm text-label-sm text-on-surface-variant/60">•</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">CHAPTER II • Under-Keel</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">SPECTRAL EMBLEM UNCOVERED</h3>
</div>
<div class="flex flex-col items-end gap-space-xs">
<span class="font-title-md text-title-md text-secondary tracking-tight">+50 REMNANTS</span>
<span class="px-space-sm py-space-xs rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm uppercase tracking-wider">200 OK SYNCED</span>
</div>
</div>
<div class="rounded bg-surface-container-lowest/60 p-space-md">
<span class="font-body-md text-body-md italic text-on-surface-variant">"You were looking where no one else looked."</span>
</div>
<div class="flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant/60 font-mono text-[11px] pt-space-xs">
<div class="flex items-center gap-space-md">
<span>HASH: 991cd68ef</span>
<span>SIG: ed25519:6a12bf70</span>
</div>
<span class="font-body-sm text-body-sm font-sans">48m ago • Verified</span>
</div>
</article>
</div>
</section>

<!-- Right Column: API Contract Inspector & Diagnostics Shell (Col 8-12) -->
<section class="xl:col-span-5 flex flex-col gap-space-lg">
<!-- Ledger Diagnostics Slate -->
<div class="rounded-xl bg-surface-container-low p-space-xl flex flex-col gap-space-md shadow-xl border border-surface-container-high/40">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-mono">Telemetry Registry // Diagnostic</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant font-mono" id="response-latency">24ms roundtrip</span>
</div>
<div class="flex items-center justify-between bg-surface-container-lowest p-space-md rounded-lg">
<div class="flex flex-col">
<span class="font-label-sm text-label-sm uppercase text-on-surface-variant">Sync State</span>
<span class="font-headline-md text-headline-md text-tertiary" id="sync-status-badge">SYNCED</span>
</div>
<button class="px-space-md py-space-xs rounded bg-surface-container-high hover:bg-surface-bright text-secondary text-label-md font-label-md uppercase tracking-wider transition-colors cursor-pointer" id="btn-toggle-offline">
<span id="btn-offline-label">Toggle Offline</span>
</button>
</div>

<!-- Raw Payload View -->
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Decoded Attestation Payload</span>
<span class="px-space-sm py-0.5 rounded bg-tertiary-container text-tertiary font-mono text-[11px] font-bold" id="response-status-code">HTTP 200 OK</span>
</div>
<div class="p-space-md rounded bg-surface-container-lowest font-mono text-[11px] text-on-surface overflow-x-auto max-h-60 border border-surface-container-high/20">
<pre id="request-payload">{
  "ledger_id": "LDG-408-A",
  "client_timestamp": 1714528920,
  "action": "FRAGMENT_RESTORE",
  "fragment_id": "FRAG_042",
  "hash_proof": "8e91fa40b3c102a9"
}</pre>
</div>
</div>

<div class="flex flex-col gap-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Cryptographic Response Proof</span>
<div class="p-space-md rounded bg-surface-container-lowest font-mono text-[11px] text-secondary font-medium overflow-x-auto max-h-60 border border-surface-container-high/20">
<pre id="response-payload">{
  "status": "ATTESTED",
  "echo_whisper": {
    "id": "WHISPER_042",
    "quote": "Some doors only lock from the inside.",
    "peer_validations": 64
  }
}</pre>
</div>
</div>

<div class="flex items-center justify-between pt-space-xs">
<button class="px-space-md py-space-xs rounded bg-surface-container-high hover:bg-surface-bright text-secondary text-label-sm font-label-sm uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer" id="btn-trigger-harness">
<span class="material-symbols-outlined text-[14px]">play_arrow</span>
<span>Run Harness Verification</span>
</button>
<span class="font-label-sm text-[10px] text-tertiary" id="telemetry-live-row">200 OK • Live</span>
</div>
</div>
</section>
</div>
</div>
</div>
</main>
`;
}

export function bindWebLedgerEvents(_onNavigate: (route: string) => void): void {
  let isOffline = false;
  let counter = 1408;

  // Toggle offline mode
  const offlineBtn = document.getElementById('btn-toggle-offline');
  const syncBadge = document.getElementById('sync-status-badge');
  const offlineLabel = document.getElementById('btn-offline-label');
  if (offlineBtn && syncBadge && offlineLabel) {
    offlineBtn.addEventListener('click', () => {
      isOffline = !isOffline;
      if (isOffline) {
        syncBadge.textContent = 'DESYNCED';
        syncBadge.className = 'font-headline-md text-headline-md text-secondary';
        offlineLabel.textContent = 'Go Online';
      } else {
        syncBadge.textContent = 'SYNCED';
        syncBadge.className = 'font-headline-md text-headline-md text-tertiary';
        offlineLabel.textContent = 'Toggle Offline';
      }
    });
  }

  // Simulate Earn
  const earnBtn = document.getElementById('btn-simulate-earn');
  const stream = document.getElementById('ledger-stream');
  const metricVal = document.getElementById('metric-remnants-val');
  if (earnBtn && stream) {
    earnBtn.addEventListener('click', () => {
      counter += 25;
      if (metricVal) metricVal.textContent = counter.toLocaleString();

      const newEntry = document.createElement('article');
      newEntry.className = 'ledger-item rounded bg-surface-container-low p-space-lg flex flex-col gap-space-md transition-all duration-300 hover:bg-surface-container cursor-pointer shadow-sm border-l-2 border-secondary animate-pulse';
      newEntry.setAttribute('data-category', 'chapter');
      newEntry.innerHTML = `
        <div class="flex flex-wrap items-start justify-between gap-space-sm">
          <div class="flex flex-col gap-space-xs">
            <div class="flex items-center gap-space-sm">
              <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Entry #045</span>
              <span class="font-label-sm text-label-sm text-on-surface-variant/60">•</span>
              <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">CHAPTER II • Chrono Sanctum</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm text-on-surface">SYNAPSE ECHO CONDENSED</h3>
          </div>
          <div class="flex flex-col items-end gap-space-xs">
            <span class="font-title-md text-title-md text-secondary tracking-tight">+25 REMNANTS</span>
            <span class="px-space-sm py-space-xs rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm uppercase tracking-wider">${isOffline ? 'QUEUED OFFLINE' : '200 OK SYNCED'}</span>
          </div>
        </div>
        <div class="rounded bg-surface-container-lowest/60 p-space-md">
          <span class="font-body-md text-body-md italic text-on-surface-variant">"Echoes gather where silence is preserved."</span>
        </div>
      `;
      stream.insertBefore(newEntry, stream.firstChild);
      setTimeout(() => newEntry.classList.remove('animate-pulse'), 1000);
    });
  }

  // Clear view
  const clearBtn = document.getElementById('btn-clear-ledger');
  if (clearBtn && stream) {
    clearBtn.addEventListener('click', () => {
      stream.innerHTML = `
        <div class="rounded bg-surface-container-low p-space-xl flex flex-col items-center justify-center text-center gap-space-sm">
          <span class="material-symbols-outlined text-on-surface-variant/40 text-[36px]">auto_stories</span>
          <span class="font-headline-sm text-headline-sm text-on-surface">Client Ledger Memory Pruned</span>
          <p class="font-body-md text-body-md text-on-surface-variant max-w-md">Local transcripts archived to cold storage. Attested balance remains intact.</p>
        </div>
      `;
    });
  }

  // Filter tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      filterTabs.forEach(t => {
        t.className = 'filter-tab px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer';
      });
      const target = e.currentTarget as HTMLElement;
      target.className = 'filter-tab px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider bg-surface-container text-secondary transition-colors cursor-pointer';
      
      const filter = target.getAttribute('data-filter');
      const items = document.querySelectorAll<HTMLElement>('.ledger-item');
      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Harness verification run
  const harnessBtn = document.getElementById('btn-trigger-harness');
  const reqPayload = document.getElementById('request-payload');
  const resPayload = document.getElementById('response-payload');
  const codeEl = document.getElementById('response-status-code');
  if (harnessBtn && reqPayload && resPayload && codeEl) {
    harnessBtn.addEventListener('click', () => {
      codeEl.textContent = 'TEST HARNESS PASSED';
      codeEl.className = 'px-space-sm py-0.5 rounded bg-tertiary-container text-tertiary font-mono text-[11px] font-bold';
      reqPayload.textContent = JSON.stringify({ harness: 'LOCAL_VERIFY', entropy_bits: 256, timestamp: Date.now() }, null, 2);
      resPayload.textContent = JSON.stringify({ status: 'ALL_PASSED', integrity: '1.000', verified: 1408 }, null, 2);
    });
  }
}
