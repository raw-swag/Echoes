import { globalGameState, GameStateModel } from '@core/GameState';
import { uiEchoController } from './components/UIEchoController';

// Web Screens
import { renderWebPrologue, bindWebPrologueEvents } from './screens/web/WebPrologueScreen';
import { renderWebChapters, bindWebChaptersEvents } from './screens/web/WebChaptersScreen';
import { renderWebArchive, bindWebArchiveEvents } from './screens/web/WebArchiveScreen';
import { renderWebHUD, bindWebHUDEvents } from './screens/web/WebHUDScreen';
import { renderWebLedger, bindWebLedgerEvents } from './screens/web/WebLedgerScreen';

// Mobile Screens
import {
  renderMobilePrologue,
  bindMobilePrologueEvents
} from './screens/mobile/MobilePrologueScreen';
import {
  renderMobileChapters,
  bindMobileChaptersEvents
} from './screens/mobile/MobileChaptersScreen';
import { renderMobileArchive, bindMobileArchiveEvents } from './screens/mobile/MobileArchiveScreen';
import { renderMobileHUD, bindMobileHUDEvents } from './screens/mobile/MobileHUDScreen';
import { renderMobileLedger, bindMobileLedgerEvents } from './screens/mobile/MobileLedgerScreen';

export type ScreenRoute = 'prologue' | 'chapters' | 'archive' | 'hud' | 'ledger';
export type ExperienceMode = 'web' | 'mobile';

export interface UIRouterOptions {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
}

export class UIRouter {
  private readonly container: HTMLElement;
  private readonly canvas: HTMLCanvasElement;

  private currentRoute: ScreenRoute = 'prologue';
  private mode: ExperienceMode = 'web';
  private unsubscribeState: (() => void) | null = null;

  constructor(options: UIRouterOptions) {
    this.container = options.container;
    this.canvas = options.canvas;

    this.detectExperienceMode();
    window.addEventListener('resize', this.onResize);
  }

  private onResize = (): void => {
    const prevMode = this.mode;
    this.detectExperienceMode();
    if (prevMode !== this.mode) {
      this.render();
    }
  };

  private detectExperienceMode(): void {
    // Breakpoint < 1024px triggers mobile PWA experience
    this.mode = window.innerWidth < 1024 ? 'mobile' : 'web';
  }

  public init(): void {
    uiEchoController.startTraceCycle();
    this.unsubscribeState = globalGameState.subscribe((_state) => {
      // Re-render UI upon state mutations if active
      this.render();
    });
  }

  public navigate(route: string): void {
    if (['prologue', 'chapters', 'archive', 'hud', 'ledger'].includes(route)) {
      this.currentRoute = route as ScreenRoute;
      this.render();
    }
  }

  public getMode(): ExperienceMode {
    return this.mode;
  }

  public setMode(mode: ExperienceMode): void {
    this.mode = mode;
    this.render();
  }

  public getCurrentRoute(): ScreenRoute {
    return this.currentRoute;
  }

  public render(): void {
    const state = globalGameState.getState();
    const isMobile = this.mode === 'mobile';

    if (isMobile) {
      this.renderMobileLayout(state);
    } else {
      this.renderWebLayout(state);
    }

    this.mountCanvasIfNeeded();
    this.bindEvents();
  }

  private renderWebLayout(state: Readonly<GameStateModel>): void {
    let screenContent = '';
    switch (this.currentRoute) {
      case 'prologue':
        screenContent = renderWebPrologue(state, (r) => this.navigate(r));
        break;
      case 'chapters':
        screenContent = renderWebChapters(state, (r) => this.navigate(r));
        break;
      case 'archive':
        screenContent = renderWebArchive(state, (r) => this.navigate(r));
        break;
      case 'hud':
        screenContent = renderWebHUD(state, (r) => this.navigate(r));
        break;
      case 'ledger':
        screenContent = renderWebLedger(state, (r) => this.navigate(r));
        break;
    }

    const navItemClass = (route: ScreenRoute) =>
      this.currentRoute === route
        ? 'font-label-md uppercase px-space-md py-space-sm rounded transition-colors bg-surface-container-high text-secondary'
        : 'font-label-md text-label-md uppercase px-space-md py-space-sm rounded transition-colors text-on-surface-variant hover:bg-surface-container hover:text-on-surface';

    const sidebarItemClass = (route: ScreenRoute) =>
      this.currentRoute === route
        ? 'flex items-center gap-space-md px-space-md py-space-sm rounded font-body-sm transition-colors bg-surface-container-high text-secondary'
        : 'flex items-center gap-space-md px-space-md py-space-sm rounded font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors';

    this.container.innerHTML = `
<div class="min-h-screen bg-background text-on-surface font-body-md selection:bg-secondary-container selection:text-secondary-fixed">
  <!-- Top Navigation Header -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-primary-container/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-surface-container-high/40">
    <div class="h-20 w-full px-margin flex items-center justify-between gap-space-lg">
      <div class="flex items-center gap-space-xl">
        <div class="flex flex-col cursor-pointer" id="brand-home-btn">
          <div class="flex items-center gap-space-sm">
            <span class="font-headline-sm text-headline-sm text-secondary tracking-widest uppercase">ECHOES</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant/40 tracking-widest">// VER.4.08</span>
          </div>
          <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-[9px]">The Things We Chose to Forget</span>
        </div>
        <div class="hidden xl:flex items-center gap-space-sm px-space-md py-space-xs rounded bg-surface-container-low border border-surface-container-high/30">
          <span class="material-symbols-outlined text-secondary text-[16px]">auto_stories</span>
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Whisper:</span>
          <span class="font-body-sm text-body-sm text-on-surface-variant italic truncate max-w-xs">${state.activeWhisper}</span>
          <span class="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest">[${state.activeWhisperLedger}]</span>
        </div>
      </div>

      <nav class="hidden lg:flex items-center gap-space-xs">
        <button class="${navItemClass('prologue')}" data-route="prologue">Prologue</button>
        <button class="${navItemClass('archive')}" data-route="archive">Archive</button>
        <button class="${navItemClass('chapters')}" data-route="chapters">Chapters</button>
        <button class="${navItemClass('hud')}" data-route="hud">Resonance HUD</button>
        <button class="${navItemClass('ledger')}" data-route="ledger">Ledger</button>
      </nav>

      <div class="flex items-center gap-space-lg">
        <div class="flex items-center gap-space-sm px-space-md py-space-xs rounded bg-surface-container-low border border-surface-container-high/30">
          <span class="material-symbols-outlined text-secondary text-[18px]">hourglass_empty</span>
          <div class="flex flex-col text-right">
            <span class="font-title-md text-title-md text-secondary leading-none">${state.remnants}</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase text-[9px]">Remnants</span>
          </div>
        </div>

        <button id="toggle-experience-mode" class="px-3 py-1.5 rounded bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-secondary text-xs uppercase tracking-wider font-semibold transition-colors" title="Switch between Desktop Web and Mobile PWA modes">
          Mobile PWA View
        </button>

        <div class="flex items-center gap-space-sm pl-space-sm">
          <div class="hidden md:flex flex-col text-right">
            <span class="font-label-md text-label-md text-on-surface">${state.archivistId}</span>
            <span class="font-label-sm text-label-sm text-tertiary tracking-widest uppercase text-[9px]">Recollection Sync</span>
          </div>
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Left Folio Sidebar -->
  <aside class="fixed left-0 top-20 bottom-0 w-64 bg-surface-container-lowest z-40 flex flex-col justify-between py-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.3)] border-r border-surface-container-high/30">
    <div class="flex flex-col gap-space-lg">
      <div class="px-space-lg">
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block mb-space-xs">Folio Index</span>
        <div class="h-[1px] w-full bg-surface-container-high"></div>
      </div>
      <nav class="flex flex-col px-space-md gap-space-xs">
        <button class="${sidebarItemClass('prologue')}" data-route="prologue">
          <span class="font-label-sm text-label-sm text-secondary/60">01</span><span>Prologue</span>
        </button>
        <button class="${sidebarItemClass('archive')}" data-route="archive">
          <span class="font-label-sm text-label-sm text-secondary/60">02</span><span>Archive Records</span>
        </button>
        <button class="${sidebarItemClass('chapters')}" data-route="chapters">
          <span class="font-label-sm text-label-sm text-secondary/60">03</span><span>Memory Chapters</span>
        </button>
        <button class="${sidebarItemClass('hud')}" data-route="hud">
          <span class="font-label-sm text-label-sm text-secondary/60">04</span><span>Resonance HUD</span>
        </button>
        <button class="${sidebarItemClass('ledger')}" data-route="ledger">
          <span class="font-label-sm text-label-sm text-secondary/60">05</span><span>Archival Ledger</span>
        </button>
      </nav>
    </div>
    <div class="px-space-lg flex flex-col gap-space-xs">
      <span class="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest">Condition</span>
      <div class="flex items-center gap-space-sm">
        <div class="w-2 h-2 rounded-full ${state.mindTetherStable ? 'bg-tertiary' : 'bg-error'}"></div>
        <span class="font-body-sm text-body-sm text-on-surface-variant">Mind Tether Stable</span>
      </div>
    </div>
  </aside>

  <!-- Main Content Stage -->
  <div class="pl-64">
    <main class="relative pt-20 bg-background min-h-screen">
      <div class="flex flex-col w-full">
        ${screenContent}
      </div>
    </main>
  </div>
</div>
`;
  }

  private renderMobileLayout(state: Readonly<GameStateModel>): void {
    let screenContent = '';
    switch (this.currentRoute) {
      case 'prologue':
        screenContent = renderMobilePrologue(state, (r) => this.navigate(r));
        break;
      case 'chapters':
        screenContent = renderMobileChapters(state, (r) => this.navigate(r));
        break;
      case 'archive':
        screenContent = renderMobileArchive(state, (r) => this.navigate(r));
        break;
      case 'hud':
        screenContent = renderMobileHUD(state, (r) => this.navigate(r));
        break;
      case 'ledger':
        screenContent = renderMobileLedger(state, (r) => this.navigate(r));
        break;
    }

    const bottomTabClass = (route: ScreenRoute) =>
      this.currentRoute === route
        ? 'flex flex-col items-center gap-1 text-secondary font-medium'
        : 'flex flex-col items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors';

    this.container.innerHTML = `
<div class="min-h-screen bg-surface text-on-surface font-body-md flex flex-col selection:bg-secondary-container selection:text-secondary-fixed">
  <!-- Mobile Header -->
  <header class="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/30 shadow-md">
    <div class="h-14 px-gutter-mobile flex items-center justify-between gap-space-sm">
      <div class="flex items-center gap-space-sm min-w-0">
        <img alt="Echoes Emblem" class="h-6 w-auto object-contain shrink-0" src="/assets/ui/echoes_emblem.png" />
        <div class="flex flex-col min-w-0">
          <span class="font-label-sm text-[8px] uppercase tracking-widest text-on-surface-variant truncate">Echoes</span>
          <h1 class="font-headline-sm text-[16px] text-on-surface truncate leading-none uppercase">${this.currentRoute}</h1>
        </div>
      </div>

      <div class="flex items-center gap-space-sm">
        <div class="flex items-center gap-space-xs px-2 py-1 bg-surface-container-low/80 rounded-lg">
          <span class="material-symbols-outlined text-secondary text-[14px]">token</span>
          <span class="font-title-md text-[12px] text-secondary leading-none">${state.remnants}</span>
        </div>

        <button id="toggle-experience-mode" class="px-2 py-1 rounded bg-surface-container-high text-secondary text-[10px] uppercase tracking-wider font-semibold">
          Desktop View
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Screen Content Stage -->
  <main class="flex flex-col relative w-full pt-14 pb-20 bg-surface min-h-screen">
    ${screenContent}
  </main>

  <!-- Mobile Bottom Tab Navigation Bar -->
  <nav class="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container-high/40 shadow-2xl">
    <div class="h-16 px-4 flex items-center justify-around">
      <button class="${bottomTabClass('prologue')}" data-route="prologue">
        <span class="material-symbols-outlined text-[20px]">explore</span>
        <span class="text-[9px] uppercase tracking-wider">Prologue</span>
      </button>
      <button class="${bottomTabClass('chapters')}" data-route="chapters">
        <span class="material-symbols-outlined text-[20px]">auto_stories</span>
        <span class="text-[9px] uppercase tracking-wider">Chapters</span>
      </button>
      <button class="${bottomTabClass('hud')}" data-route="hud">
        <span class="material-symbols-outlined text-[22px] text-secondary">adjust</span>
        <span class="text-[9px] uppercase tracking-wider font-semibold text-secondary">HUD</span>
      </button>
      <button class="${bottomTabClass('archive')}" data-route="archive">
        <span class="material-symbols-outlined text-[20px]">inventory_2</span>
        <span class="text-[9px] uppercase tracking-wider">Archive</span>
      </button>
      <button class="${bottomTabClass('ledger')}" data-route="ledger">
        <span class="material-symbols-outlined text-[20px]">history_edu</span>
        <span class="text-[9px] uppercase tracking-wider">Ledger</span>
      </button>
    </div>
  </nav>
</div>
`;
  }

  private mountCanvasIfNeeded(): void {
    const mountTarget = document.getElementById('gameplay-viewport');
    if (mountTarget) {
      if (this.canvas.parentElement !== mountTarget) {
        mountTarget.appendChild(this.canvas);
      }
      this.canvas.style.display = 'block';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
    } else {
      // Keep canvas mounted offscreen or in body if not in HUD screen
      if (
        this.canvas.parentElement !== this.container &&
        this.canvas.parentElement !== document.body
      ) {
        document.body.appendChild(this.canvas);
      }
      this.canvas.style.display = 'none';
    }
  }

  private bindEvents(): void {
    // Mode toggle button
    const toggleBtn = document.getElementById('toggle-experience-mode');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.setMode(this.mode === 'web' ? 'mobile' : 'web');
      });
    }

    // Brand logo home click
    const brandBtn = document.getElementById('brand-home-btn');
    if (brandBtn) {
      brandBtn.addEventListener('click', () => {
        this.navigate('prologue');
      });
    }

    // Top and sidebar navigation buttons
    const navButtons = document.querySelectorAll('[data-route]');
    navButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const route = target.getAttribute('data-route');
        if (route) {
          this.navigate(route);
        }
      });
    });

    // Delegate screen-specific event binders
    const isMobile = this.mode === 'mobile';
    switch (this.currentRoute) {
      case 'prologue':
        if (isMobile) bindMobilePrologueEvents((r) => this.navigate(r));
        else bindWebPrologueEvents((r) => this.navigate(r));
        break;
      case 'chapters':
        if (isMobile) bindMobileChaptersEvents((r) => this.navigate(r));
        else bindWebChaptersEvents((r) => this.navigate(r));
        break;
      case 'archive':
        if (isMobile) bindMobileArchiveEvents((r) => this.navigate(r));
        else bindWebArchiveEvents((r) => this.navigate(r));
        break;
      case 'hud':
        if (isMobile) bindMobileHUDEvents((r) => this.navigate(r));
        else bindWebHUDEvents((r) => this.navigate(r));
        break;
      case 'ledger':
        if (isMobile) bindMobileLedgerEvents((r) => this.navigate(r));
        else bindWebLedgerEvents((r) => this.navigate(r));
        break;
    }
  }

  public dispose(): void {
    window.removeEventListener('resize', this.onResize);
    uiEchoController.stopTraceCycle();
    if (this.unsubscribeState) {
      this.unsubscribeState();
      this.unsubscribeState = null;
    }
  }
}
