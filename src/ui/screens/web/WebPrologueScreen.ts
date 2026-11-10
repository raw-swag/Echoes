import { GameStateModel } from '@core/GameState';

export function renderWebPrologue(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  return `
<div class="w-full px-margin py-space-lg flex flex-col gap-space-xl screen-fade-enter-active">
  <!-- Breadcrumb & Top Status Bar -->
  <div class="w-full flex flex-wrap items-center justify-between gap-space-md">
    <div class="flex items-center gap-space-md">
      <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest px-space-sm py-space-xs bg-surface-container-high rounded">PRLG // 00</span>
      <span class="font-body-sm text-body-sm text-on-surface-variant/80">Recollection Stratum : Threshold of Ash & Salt</span>
    </div>
    <div class="flex items-center gap-space-lg">
      <div class="flex items-center gap-space-sm">
        <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Acoustic Drift : ${state.acousticDriftHz} Hz</span>
      </div>
      <div class="h-3 w-[1px] bg-outline-variant/40"></div>
      <span class="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">Chronicle Intact</span>
    </div>
  </div>

  <!-- Main Asymmetric Stage: Atmospheric Cinematic Canvas + Right Folio Column -->
  <div class="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start">
    <!-- Left & Center Cinematic Stage (Columns 1-7 / 12) -->
    <div class="xl:col-span-7 flex flex-col gap-space-lg">
      <div class="relative w-full rounded-xl overflow-hidden bg-surface-container-low min-h-[600px] flex flex-col justify-between p-space-xl shadow-xl">
        <!-- Atmospheric Photographic Background -->
        <div class="absolute inset-0 bg-cover bg-center mix-blend-lighten opacity-80 pointer-events-none" style="background-image: url('/assets/ui/prologue_traveler.jpg')"></div>
        <!-- Deep Ink Radial Vignette & Gradient Overlays -->
        <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent pointer-events-none"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/80 via-transparent to-surface-container-lowest/40 pointer-events-none"></div>

        <!-- Top Stage Metadata Overlay -->
        <div class="relative z-10 flex items-center justify-between w-full">
          <div class="flex items-center gap-space-sm bg-surface-container-lowest/70 backdrop-blur-md px-space-md py-space-xs rounded shadow-sm">
            <span class="material-symbols-outlined text-[16px] text-secondary">explore</span>
            <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Sector IV // Valley of Inaudible Bells</span>
          </div>
          <span class="font-label-sm text-label-sm text-on-surface-variant/70 tracking-widest uppercase">Folio Sheet 01-A</span>
        </div>

        <!-- Central Typographic Echo & Haunting Prose -->
        <div class="relative z-10 my-auto flex flex-col pt-space-xl">
          <div class="relative">
            <span class="absolute -top-10 -left-2 font-display-lg text-[100px] leading-none text-surface-variant/20 select-none pointer-events-none font-normal italic tracking-tight">
              Echoes
            </span>
            <h1 class="font-display-lg text-display-lg text-on-surface tracking-tight leading-none mb-space-xs">
              ECHOES
            </h1>
          </div>
          <p class="font-label-md text-label-md uppercase text-secondary tracking-[0.25em] mb-space-lg">
            The Things We Chose to Forget
          </p>
          <div class="max-w-md bg-surface-container-high/40 backdrop-blur-md p-space-md rounded-lg shadow-sm">
            <blockquote class="font-headline-sm text-headline-sm text-on-surface italic font-normal mb-space-xs leading-relaxed">
              “Some things are lost. Others are left behind.”
            </blockquote>
            <cite class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block not-italic">
              — Marginalia found in the margins of Ledger #04
            </cite>
          </div>
        </div>

        <!-- Bottom Interaction Prompt & Atmospheric Audio Pulse -->
        <div class="relative z-10 pt-space-lg flex flex-wrap items-center justify-between gap-space-md">
          <button id="begin-remembering-btn" class="group flex items-center gap-space-md px-space-lg py-space-md bg-surface-container-high/90 hover:bg-surface-bright text-on-surface rounded transition-all duration-300 shadow-md cursor-pointer">
            <div class="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></div>
            <span class="font-label-md text-label-md uppercase tracking-widest group-hover:text-secondary transition-colors">
              Press [SPACE] or Click to Enter Resonance HUD
            </span>
            <span class="material-symbols-outlined text-[18px] text-secondary group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
          
          <div class="flex items-center gap-space-sm bg-surface-container-lowest/80 px-space-md py-space-xs rounded backdrop-blur-sm">
            <span class="material-symbols-outlined text-[16px] text-on-surface-variant">graphic_eq</span>
            <div class="flex items-end gap-1 h-4 w-16">
              <span class="w-1 bg-secondary rounded-full h-2 animate-[pulse_1.5s_ease-in-out_infinite]"></span>
              <span class="w-1 bg-secondary/80 rounded-full h-4 animate-[pulse_1.2s_ease-in-out_infinite_200ms]"></span>
              <span class="w-1 bg-secondary/60 rounded-full h-1 animate-[pulse_1.8s_ease-in-out_infinite_400ms]"></span>
              <span class="w-1 bg-secondary rounded-full h-3 animate-[pulse_1.4s_ease-in-out_infinite_100ms]"></span>
              <span class="w-1 bg-secondary/70 rounded-full h-2 animate-[pulse_1.6s_ease-in-out_infinite_300ms]"></span>
            </div>
            <span class="font-label-sm text-label-sm text-on-surface-variant tracking-widest">TETHERED</span>
          </div>
        </div>
      </div>

      <!-- Footnote / Archival Inscription Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <div class="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Chronicle Method</span>
          <p class="font-body-sm text-body-sm text-on-surface-variant">Non-destructive memory excavation through sensory remnants.</p>
        </div>
        <div class="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Temporal Marker</span>
          <p class="font-body-sm text-body-sm text-on-surface-variant">Circa the Final Autumn, before the lighthouse darkened.</p>
        </div>
        <div class="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Divergence Index</span>
          <p class="font-body-sm text-body-sm text-on-surface-variant">3 distinct confessions recorded across 5 notebooks.</p>
        </div>
      </div>
    </div>

    <!-- Right Folio Column (Columns 8-12 / 12) -->
    <div class="xl:col-span-5 flex flex-col gap-space-lg">
      <div class="bg-surface-container-low rounded-xl p-space-xl flex flex-col gap-space-lg shadow-md">
        <div class="flex items-center justify-between pb-space-xs border-b border-surface-container-high">
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Archival Folio II</span>
          <span class="font-label-sm text-label-sm text-on-surface-variant">1,408 REMNANTS</span>
        </div>

        <div class="flex flex-col gap-space-md">
          <span class="font-headline-sm text-headline-sm text-on-surface">The First Silence</span>
          <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            The Archive honors release requests stored in the Quiet Stacks. When mass restoration requests collided with released seals, Prime Echo split restoration authority into five Shards across the Echo Realm.
          </p>
        </div>

        <div class="flex flex-col gap-space-sm pt-space-xs">
          <button id="quick-enter-hud-btn" class="w-full py-space-md bg-secondary text-on-secondary rounded font-label-md uppercase tracking-widest hover:brightness-110 transition-all font-semibold cursor-pointer">
            Launch Simulation [HUD]
          </button>
          <button id="open-chapters-btn" class="w-full py-space-md bg-surface-container hover:bg-surface-container-high text-secondary rounded font-label-md uppercase tracking-widest transition-all cursor-pointer">
            Browse Memory Chapters
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

export function bindWebPrologueEvents(onNavigate: (route: string) => void): void {
  const beginBtn = document.getElementById('begin-remembering-btn');
  const quickEnter = document.getElementById('quick-enter-hud-btn');
  const openChapters = document.getElementById('open-chapters-btn');

  if (beginBtn) {
    beginBtn.addEventListener('click', () => onNavigate('hud'));
  }
  if (quickEnter) {
    quickEnter.addEventListener('click', () => onNavigate('hud'));
  }
  if (openChapters) {
    openChapters.addEventListener('click', () => onNavigate('chapters'));
  }

  // Handle Space key shortcut
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      onNavigate('hud');
    }
  };
  window.addEventListener('keydown', handleKeyDown, { once: true });
}
