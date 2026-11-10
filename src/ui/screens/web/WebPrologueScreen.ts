import { GameStateModel } from '@core/GameState';

export function renderWebPrologue(
  state: Readonly<GameStateModel>,
  _onNavigate: (route: string) => void
): string {
  // Return verbatim official main markup with live dynamic data
  return `
<main class="relative pt-20 bg-background min-h-screen"><div class="flex flex-col w-full">
<div class="w-full px-margin py-space-lg flex flex-col gap-space-xl">
<!-- Breadcrumb & Top Status Bar -->
<div class="w-full flex flex-wrap items-center justify-between gap-space-md">
<div class="flex items-center gap-space-md">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest px-space-sm py-space-xs bg-surface-container-high rounded">PRLG // 00</span>
<span class="font-body-sm text-body-sm text-on-surface-variant/80">Recollection Stratum : Threshold of Ash &amp; Salt</span>
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
<div class="relative w-full rounded-xl overflow-hidden bg-surface-container-low min-h-[640px] flex flex-col justify-between p-space-xl shadow-xl">
<!-- Atmospheric Photographic Background -->
<div class="absolute inset-0 bg-cover bg-center mix-blend-lighten opacity-80 pointer-events-none" data-alt="A cinematic atmospheric landscape shrouded in low midnight fog and ancient towering pine silhouettes. A solitary hooded traveler in weathered charcoal wool stands on a winding gravel trail, facing away into the glowing misty woods. Ethereal faint amber and moonlit blue particle motes float in the chilly air, evocative of memory loss, quiet melancholia, and forgotten paths. High fine-art photography, muted void navy tones with faint gold atmospheric luminance." style="background-image: url('/assets/ui/prologue_traveler.jpg')"></div>
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
<!-- Ghosted Serif Display Title -->
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
<button class="group flex items-center gap-space-md px-space-lg py-space-md bg-surface-container-high/90 hover:bg-surface-bright text-on-surface rounded transition-all duration-300 shadow-md cursor-pointer" id="begin-remembering-btn">
<div class="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></div>
<span class="font-label-md text-label-md uppercase tracking-widest group-hover:text-secondary transition-colors">
                Press [SPACE] or Click to Begin Remembering
              </span>
<span class="material-symbols-outlined text-[18px] text-secondary group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
</button>
<!-- Subtle Audio / Resonance Waveform Widget -->
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
<!-- Right Archival Registry Column / Folio Menu (Columns 8-12 / 12) -->
<div class="xl:col-span-5 flex flex-col gap-space-lg">
<!-- Header Badge -->
<div class="w-full flex items-center justify-between p-space-md bg-surface-container-low rounded-lg shadow-sm">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-[18px] text-secondary">inventory_2</span>
<span class="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">
              [ ARCHIVE REGISTRY: 00-OMISSION ]
            </span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant/70 tracking-widest uppercase">
            VER. 1.09.4
          </span>
</div>
<!-- Active Resonance Focal Card -->
<div class="relative overflow-hidden p-space-lg bg-surface-container rounded-xl shadow-md flex flex-col gap-space-md">
<!-- Subtle corner index marking -->
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span class="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">Resonance Active</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase">SYNC: 04:12 AM</span>
</div>
<div class="flex flex-col gap-space-xs">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Current Memory Anchor</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">
              Chapter I: The Sound of Leaving
            </h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">
              The platform at cold sunrise. An unopened envelope resting against the cast iron bench.
            </p>
</div>
<!-- Stability Gauge Bar -->
<div class="flex flex-col gap-space-xs mt-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Stability Quota</span>
<span class="font-title-md text-title-md text-secondary">94%</span>
</div>
<div class="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-secondary rounded-full w-[94%] transition-all duration-700"></div>
</div>
</div>
</div>
<!-- Folio Actions List (Editorial Choices) -->
<div class="flex flex-col gap-space-sm" role="menu">
<!-- Action 1: Begin Remembering [ACT I] -->
<button class="group w-full text-left p-space-md bg-surface-container-low hover:bg-surface-container transition-all duration-200 rounded-lg flex items-center justify-between shadow-sm cursor-pointer" role="menuitem">
<div class="flex items-start gap-space-md">
<span class="font-label-sm text-label-sm text-secondary pt-0.5 tracking-wider">01</span>
<div class="flex flex-col">
<div class="flex items-center gap-space-sm">
<span class="font-title-md text-title-md text-on-surface group-hover:text-secondary transition-colors">
                    Begin Remembering
                  </span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-[10px] font-label-sm uppercase tracking-widest text-secondary">ACT I</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                  Initiate first unspooling sequence from the threshold.
                </span>
</div>
</div>
<span class="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all">
              north_east
            </span>
</button>
<!-- Action 2: Resume Recollection [AUTOSAVE] -->
<button class="group w-full text-left p-space-md bg-surface-container-low hover:bg-surface-container transition-all duration-200 rounded-lg flex items-center justify-between shadow-sm cursor-pointer" role="menuitem">
<div class="flex items-start gap-space-md">
<span class="font-label-sm text-label-sm text-secondary pt-0.5 tracking-wider">02</span>
<div class="flex flex-col">
<div class="flex items-center gap-space-sm">
<span class="font-title-md text-title-md text-on-surface group-hover:text-secondary transition-colors">
                    Resume Recollection
                  </span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-[10px] font-label-sm uppercase tracking-widest text-tertiary">AUTOSAVE</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                  04:12 AM • 24 Remnants indexed in personal vault.
                </span>
</div>
</div>
<span class="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all">
              play_circle
            </span>
</button>
<!-- Action 3: Chapter Catalogue -->
<button class="group w-full text-left p-space-md bg-surface-container-low hover:bg-surface-container transition-all duration-200 rounded-lg flex items-center justify-between shadow-sm cursor-pointer" role="menuitem">
<div class="flex items-start gap-space-md">
<span class="font-label-sm text-label-sm text-secondary pt-0.5 tracking-wider">03</span>
<div class="flex flex-col">
<div class="flex items-center gap-space-sm">
<span class="font-title-md text-title-md text-on-surface group-hover:text-secondary transition-colors">
                    Chapter Catalogue
                  </span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                  4 memories indexed • 1 uncharted branch.
                </span>
</div>
</div>
<span class="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all">
              library_books
            </span>
</button>
<!-- Action 4: Archival Vault -->
<button class="group w-full text-left p-space-md bg-surface-container-low hover:bg-surface-container transition-all duration-200 rounded-lg flex items-center justify-between shadow-sm cursor-pointer" role="menuitem">
<div class="flex items-start gap-space-md">
<span class="font-label-sm text-label-sm text-secondary pt-0.5 tracking-wider">04</span>
<div class="flex flex-col">
<div class="flex items-center gap-space-sm">
<span class="font-title-md text-title-md text-on-surface group-hover:text-secondary transition-colors">
                    Archival Vault
                  </span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                  18 fragments filed &amp; physical relics preserved.
                </span>
</div>
</div>
<span class="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all">
              lock_clock
            </span>
</button>
<!-- Action 5: System & Memory Privacy -->
<button class="group w-full text-left p-space-md bg-surface-container-low hover:bg-surface-container transition-all duration-200 rounded-lg flex items-center justify-between shadow-sm cursor-pointer" role="menuitem">
<div class="flex items-start gap-space-md">
<span class="font-label-sm text-label-sm text-secondary pt-0.5 tracking-wider">05</span>
<div class="flex flex-col">
<div class="flex items-center gap-space-sm">
<span class="font-title-md text-title-md text-on-surface group-hover:text-secondary transition-colors">
                    System &amp; Memory Privacy
                  </span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">
                  Reduced motion, sync rhythm, intentional forgetting protocol.
                </span>
</div>
</div>
<span class="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all">
              settings
            </span>
</button>
</div>
<!-- Interactive Wax Seal Sealed Drawer / Secret Record #09 -->
<div class="relative p-space-lg bg-surface-container-high rounded-xl overflow-hidden cursor-pointer group shadow-lg transition-transform hover:-translate-y-0.5 duration-300" id="wax-seal-card">
<!-- Decorative parchment texture faint glow -->
<div class="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-secondary/10 blur-2xl pointer-events-none"></div>
<div class="flex items-start gap-space-md">
<!-- Simulated Wax Seal Stamp Component -->
<div class="relative w-12 h-12 flex-shrink-0 rounded-full bg-secondary-container flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
<span class="material-symbols-outlined text-secondary text-[24px]">verified</span>
<span class="absolute inset-0 rounded-full border border-secondary/30 scale-90"></span>
</div>
<div class="flex flex-col gap-space-xs flex-1">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                  RESTRICTED FOLIO
                </span>
<span class="material-symbols-outlined text-[14px] text-secondary">lock</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface group-hover:text-secondary transition-colors">
                Unspool Secret Record #09
              </h3>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Click wax seal to dissolve the black ribbon binding the testimony of the Stationmaster.
              </p>
</div>
</div>
<!-- Secret Drawer Reveal (Toggled via JS) -->
<div class="hidden mt-space-md pt-space-md bg-surface-container-lowest/90 p-space-md rounded text-on-surface flex flex-col gap-space-xs animate-fadeIn" id="secret-drawer">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">CONFESSION EXCERPT</span>
<span class="font-label-sm text-label-sm text-tertiary">SEAL BROKEN</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface italic">
              “I saw him throw the brass key into the frozen well at 03:40. He did not look back even once.”
            </p>
</div>
</div>
</div>
</div>
<!-- Bottom Curatorial Footer Status -->
<div class="w-full pt-space-xl pb-space-lg flex flex-wrap items-center justify-between gap-space-md">
<div class="flex items-center gap-space-md">
<span class="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest">
          PROJECT: ECHOES // ARCHIVAL MEMORY FRAMEWORK
        </span>
<span class="h-1 w-1 rounded-full bg-on-surface-variant/40"></span>
<span class="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest">
          RENDERED IN DEEP INK &amp; FADED GOLD
        </span>
</div>
<div class="flex items-center gap-space-md">
<span class="font-body-sm text-body-sm text-on-surface-variant/60">Audio Engine: Ambient Tape Loop Active</span>
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest px-space-sm py-0.5 bg-surface-container rounded">
          KEYBOARD NAV READY
        </span>
</div>
</div>
</div>
<script>
    (function initPrologueInteractions() {
      // Spacebar or Click listener for primary action
      const beginBtn = document.getElementById('begin-remembering-btn');
      function triggerBeginSequence() {
        if (!beginBtn) return;
        beginBtn.classList.add('bg-secondary', 'text-on-secondary');
        setTimeout(() => {
          beginBtn.classList.remove('bg-secondary', 'text-on-secondary');
        }, 300);
      }

      if (beginBtn) {
        beginBtn.addEventListener('click', triggerBeginSequence);
      }

      window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target === document.body) {
          e.preventDefault();
          triggerBeginSequence();
        }
      });

      // Wax Seal Secret Drawer toggle
      const waxCard = document.getElementById('wax-seal-card');
      const secretDrawer = document.getElementById('secret-drawer');
      if (waxCard && secretDrawer) {
        waxCard.addEventListener('click', () => {
          secretDrawer.classList.toggle('hidden');
        });
      }
    })();
  </script>
</div></main>
`;
}

export function bindWebPrologueEvents(onNavigate: (route: string) => void): void {
  const btn = document.getElementById('begin-remembering-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      onNavigate('hud');
    });
  }

  const spaceHandler = (e: KeyboardEvent) => {
    if (e.code === 'Space' && (e.target === document.body || (e.target as HTMLElement)?.tagName === 'DIV')) {
      window.removeEventListener('keydown', spaceHandler);
      onNavigate('hud');
    }
  };
  window.addEventListener('keydown', spaceHandler);
}
