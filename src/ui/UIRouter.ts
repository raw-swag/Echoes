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
  private manualModeOverride = false;
  private unsubscribeState: (() => void) | null = null;

  constructor(options: UIRouterOptions) {
    this.container = options.container;
    this.canvas = options.canvas;

    this.detectExperienceMode();
    window.addEventListener('resize', this.onResize);
  }

  private onResize = (): void => {
    if (!this.manualModeOverride) {
      const prevMode = this.mode;
      this.detectExperienceMode();
      if (prevMode !== this.mode) {
        this.render();
      }
    }
  };

  private detectExperienceMode(): void {
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
      window.scrollTo(0, 0);
    }
  }

  public getMode(): ExperienceMode {
    return this.mode;
  }

  public setMode(mode: ExperienceMode): void {
    this.manualModeOverride = true;
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
  <!-- Top Navigation Header (Exact official layout) -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-primary-container/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
    <div class="h-20 w-full px-margin flex items-center justify-between gap-space-lg">
      <div class="flex items-center gap-space-xl">
        <div class="flex flex-col cursor-pointer" id="brand-home-btn">
          <div class="flex items-center gap-space-sm">
            <span class="font-headline-sm text-headline-sm text-secondary tracking-widest uppercase">ECHOES</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant/40 tracking-widest">// VER.4.08</span>
          </div>
          <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-[9px]">The Things We Chose to Forget</span>
        </div>
        <div class="hidden xl:flex items-center gap-space-sm px-space-md py-space-xs rounded bg-surface-container-low">
          <span class="material-symbols-outlined text-secondary text-[16px]">auto_stories</span>
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Whisper:</span>
          <span class="font-body-sm text-body-sm text-on-surface-variant italic truncate max-w-xs">${state.activeWhisper}</span>
          <span class="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest">[${state.activeWhisperLedger}]</span>
        </div>
      </div>

      <nav class="hidden lg:flex items-center gap-space-xs" data-active-classes="bg-surface-container-high text-secondary">
        <a class="${navItemClass('prologue')}" data-route="prologue" href="#">Prologue</a>
        <a class="${navItemClass('archive')}" data-route="archive" href="#">Archive</a>
        <a class="${navItemClass('chapters')}" data-route="chapters" href="#">Chapters</a>
        <a class="${navItemClass('hud')}" data-route="hud" href="#">HUD</a>
        <a class="${navItemClass('ledger')}" data-route="ledger" href="#">Ledger</a>
      </nav>

      <div class="flex items-center gap-space-lg">
        <div class="flex items-center gap-space-sm px-space-md py-space-xs rounded bg-surface-container-low">
          <span class="material-symbols-outlined text-secondary text-[18px]">hourglass_empty</span>
          <div class="flex flex-col text-right">
            <span class="font-title-md text-title-md text-secondary leading-none">${state.remnants}</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase text-[9px]">Remnants</span>
          </div>
        </div>

        <button id="toggle-experience-mode" class="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-bright text-secondary text-[10px] uppercase tracking-wider transition-colors cursor-pointer" title="Toggle Experience Mode">
          Mobile View
        </button>

        <div class="flex items-center gap-space-sm pl-space-md">
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

  <!-- Left Folio Sidebar (Exact official layout) -->
  <aside class="fixed left-0 top-20 bottom-0 w-64 bg-surface-container-lowest z-40 flex flex-col justify-between py-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
    <div class="flex flex-col gap-space-lg">
      <div class="px-space-lg">
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block mb-space-xs">Folio Index</span>
        <div class="h-[1px] w-full bg-surface-container-high"></div>
      </div>
      <nav class="flex flex-col px-space-md gap-space-xs" data-active-classes="bg-surface-container-high text-secondary">
        <a class="${sidebarItemClass('prologue')}" data-route="prologue" href="#">
          <span class="font-label-sm text-label-sm text-secondary/60">01</span><span>Prologue</span>
        </a>
        <a class="${sidebarItemClass('archive')}" data-route="archive" href="#">
          <span class="font-label-sm text-label-sm text-secondary/60">02</span><span>Archive Records</span>
        </a>
        <a class="${sidebarItemClass('chapters')}" data-route="chapters" href="#">
          <span class="font-label-sm text-label-sm text-secondary/60">03</span><span>Memory Chapters</span>
        </a>
        <a class="${sidebarItemClass('hud')}" data-route="hud" href="#">
          <span class="font-label-sm text-label-sm text-secondary/60">04</span><span>Resonance HUD</span>
        </a>
        <a class="${sidebarItemClass('ledger')}" data-route="ledger" href="#">
          <span class="font-label-sm text-label-sm text-secondary/60">05</span><span>Archival Ledger</span>
        </a>
      </nav>
    </div>

    <div class="px-space-lg flex flex-col gap-space-xs">
      <span class="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest">Condition</span>
      <div class="flex items-center gap-space-sm">
        <div class="w-2 h-2 rounded-full bg-tertiary"></div>
        <span class="font-body-sm text-body-sm text-on-surface-variant">Mind Tether Stable</span>
      </div>
    </div>
  </aside>

  <!-- Main Viewport Area (Offset by left sidebar w-64) -->
  <div class="pl-64">
    ${screenContent}
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

    const screenTitles: Record<ScreenRoute, string> = {
      prologue: 'Prologue',
      archive: 'Archive',
      chapters: 'Chapters',
      hud: 'Resonance HUD',
      ledger: 'Ledger'
    };

    const bottomTabClass = (route: ScreenRoute) =>
      this.currentRoute === route
        ? 'flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-space-xs py-space-xs rounded transition-colors text-secondary bg-surface-container-high/60'
        : 'flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-space-xs py-space-xs rounded text-on-surface-variant hover:text-on-surface transition-colors';

    this.container.innerHTML = `
<div class="min-h-screen bg-surface text-on-surface font-body-md select-none">
  <!-- Official Mobile Top App Bar -->
  <header class="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.12)]">
    <div class="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm">
      <div class="flex items-center gap-space-sm min-w-0 cursor-pointer" id="brand-home-btn">
        <img alt="Echoes Archival Fragment Emblem" class="h-8 w-auto object-contain shrink-0" src="/assets/ui/echoes_emblem.svg"/>
        <div class="flex flex-col min-w-0">
          <span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant truncate">Echoes</span>
          <h1 class="font-headline-sm text-headline-sm text-on-surface truncate leading-tight">${screenTitles[this.currentRoute]}</h1>
        </div>
      </div>
      <div class="flex items-center gap-space-md shrink-0">
        <div class="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container-low/80 rounded-lg animate-remnant">
          <span class="material-symbols-outlined text-secondary text-[16px]">token</span>
          <div class="flex flex-col items-end">
            <span class="font-title-md text-title-md text-secondary leading-none">${state.remnants}</span>
            <span class="font-label-sm text-[8px] uppercase tracking-widest text-on-surface-variant leading-tight">Remnants</span>
          </div>
        </div>
        <button id="toggle-experience-mode" class="px-2 py-1 rounded bg-surface-container-high text-secondary text-[9px] uppercase tracking-wider">
          Web
        </button>
        <div class="relative flex items-center">
          <img alt="Profile" class="w-8 h-8 rounded-full object-cover shrink-0" src="/assets/ui/mobile_avatar.jpg"/>
          <span class="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-secondary/80"></span>
        </div>
      </div>
    </div>
    <div class="px-gutter-mobile pb-space-xs flex justify-center">
      <div class="w-full max-w-sm px-space-md py-space-xs rounded bg-surface-container-lowest/60 backdrop-blur-sm flex items-center justify-between gap-space-sm">
        <div class="flex items-center gap-space-xs min-w-0">
          <span class="material-symbols-outlined text-secondary text-[14px] shrink-0">history_edu</span>
          <span class="font-body-sm text-body-sm text-on-surface-variant italic truncate">Whisper: "${state.activeWhisper}"</span>
        </div>
        <span class="font-label-sm text-label-sm text-secondary uppercase shrink-0">[${state.activeWhisperLedger}]</span>
      </div>
    </div>
  </header>

  <!-- Mobile Screen Content Body -->
  ${screenContent}

  <!-- Official Mobile Bottom Navigation -->
  <nav class="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.3)]">
    <div class="flex justify-around items-center h-16 px-space-xs">
      <a class="${bottomTabClass('prologue')}" data-route="prologue" href="#">
        <span class="material-symbols-outlined text-[20px]">auto_stories</span>
        <span class="font-label-sm text-label-sm mt-space-xs">Prologue</span>
      </a>
      <a class="${bottomTabClass('archive')}" data-route="archive" href="#">
        <span class="material-symbols-outlined text-[20px]">inventory_2</span>
        <span class="font-label-sm text-label-sm mt-space-xs">Archive</span>
      </a>
      <a class="${bottomTabClass('chapters')}" data-route="chapters" href="#">
        <span class="material-symbols-outlined text-[20px]">map</span>
        <span class="font-label-sm text-label-sm mt-space-xs">Chapters</span>
      </a>
      <a class="${bottomTabClass('hud')}" data-route="hud" href="#">
        <span class="material-symbols-outlined text-[20px]">visibility</span>
        <span class="font-label-sm text-label-sm mt-space-xs">HUD</span>
      </a>
      <a class="${bottomTabClass('ledger')}" data-route="ledger" href="#">
        <span class="material-symbols-outlined text-[20px]">receipt_long</span>
        <span class="font-label-sm text-label-sm mt-space-xs">Ledger</span>
      </a>
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
      this.canvas.style.position = 'absolute';
      this.canvas.style.inset = '0';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.zIndex = '1';
    } else {
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
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
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

    // Navigation buttons
    const navButtons = document.querySelectorAll('[data-route]');
    navButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
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
