import { soundService } from '@audio/SoundService';
import { globalGameState } from '@core/GameState';

export interface SettingsState {
  masterVolume: number;
  sfxVolume: number;
  isMuted: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

const SETTINGS_STORAGE_KEY = 'echoes_settings_v1';

export class ModalController {
  private static instance: ModalController;
  private activeModal: 'pause' | 'settings' | 'reading' | 'confirm' | null = null;
  private previousModal: 'pause' | null = null;
  private confirmCallback: (() => void) | null = null;
  private activeReadingShard: {
    id: string;
    title: string;
    quote: string;
    body: string;
    classification: string;
    chapter: string;
  } | null = null;

  private settings: SettingsState = {
    masterVolume: 0.8,
    sfxVolume: 0.8,
    isMuted: false,
    reducedMotion: false,
    highContrast: false
  };

  private constructor() {
    this.loadSettings();
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.handleEscape();
        }
      });
    }
  }

  public static getInstance(): ModalController {
    if (!ModalController.instance) {
      ModalController.instance = new ModalController();
    }
    return ModalController.instance;
  }

  private loadSettings(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          this.settings = { ...this.settings, ...parsed };
          soundService.setMasterVolume(this.settings.masterVolume);
          soundService.setSfxVolume(this.settings.sfxVolume);
          soundService.setMuted(this.settings.isMuted);
          this.applyVisualPreferences();
        }
      } catch {
        // Fallback
      }
    }
  }

  public saveSettings(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
      } catch {
        // Ignore
      }
    }
    soundService.setMasterVolume(this.settings.masterVolume);
    soundService.setSfxVolume(this.settings.sfxVolume);
    soundService.setMuted(this.settings.isMuted);
    this.applyVisualPreferences();
  }

  private applyVisualPreferences(): void {
    if (typeof document !== 'undefined') {
      if (this.settings.reducedMotion) {
        document.documentElement.classList.add('reduced-motion');
      } else {
        document.documentElement.classList.remove('reduced-motion');
      }
      if (this.settings.highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    }
  }

  public getSettings(): Readonly<SettingsState> {
    return this.settings;
  }

  public updateSettings(partial: Partial<SettingsState>): void {
    this.settings = { ...this.settings, ...partial };
    this.saveSettings();
  }

  public getActiveModal(): string | null {
    return this.activeModal;
  }

  public openPause(): void {
    this.activeModal = 'pause';
    globalGameState.setPaused(true);
    this.render();
  }

  public openSettings(): void {
    if (this.activeModal === 'pause') {
      this.previousModal = 'pause';
    }
    this.activeModal = 'settings';
    this.render();
  }

  public openReadingModal(shard: {
    id: string;
    title: string;
    quote: string;
    body: string;
    classification: string;
    chapter: string;
  }): void {
    this.activeReadingShard = shard;
    this.activeModal = 'reading';
    this.render();
  }

  public openConfirmModal(title: string, message: string, onConfirm: () => void): void {
    this.confirmCallback = onConfirm;
    this.activeModal = 'confirm';
    this.renderConfirm(title, message);
  }

  public confirmAction(): void {
    if (this.confirmCallback) {
      this.confirmCallback();
    }
    this.close();
  }

  public close(): void {
    const wasPause = this.activeModal === 'pause';
    const hadPreviousPause = this.previousModal === 'pause';
    const wasSettings = this.activeModal === 'settings';

    this.activeModal = null;
    this.activeReadingShard = null;
    this.confirmCallback = null;
    this.removeModalElement();

    if (wasSettings && hadPreviousPause) {
      // Re-open pause modal if closed from settings
      this.previousModal = null;
      this.openPause();
      return;
    }

    this.previousModal = null;
    if (wasPause) {
      globalGameState.setPaused(false);
    }
  }

  private handleEscape(): void {
    if (this.activeModal) {
      this.close();
    } else {
      // If no modal is active and user is in gameplay HUD, ESC triggers pause
      const route = globalGameState.getState();
      if (!route.isPaused && document.getElementById('gameplay-viewport')) {
        this.openPause();
      }
    }
  }

  private removeModalElement(): void {
    if (typeof document === 'undefined') return;
    const el = document.getElementById('echoes-modal-root');
    if (el) {
      el.remove();
    }
  }

  public render(onNavigate?: (route: string) => void, onRestart?: () => void): void {
    this.removeModalElement();
    if (!this.activeModal || typeof document === 'undefined') return;

    const modalRoot = document.createElement('div');
    modalRoot.id = 'echoes-modal-root';
    modalRoot.className =
      'fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md select-none transition-opacity duration-300';

    if (this.activeModal === 'pause') {
      modalRoot.innerHTML = this.getPauseHTML();
      document.body.appendChild(modalRoot);
      this.bindPauseEvents(modalRoot, onNavigate, onRestart);
    } else if (this.activeModal === 'settings') {
      modalRoot.innerHTML = this.getSettingsHTML();
      document.body.appendChild(modalRoot);
      this.bindSettingsEvents(modalRoot);
    } else if (this.activeModal === 'reading' && this.activeReadingShard) {
      modalRoot.innerHTML = this.getReadingHTML(this.activeReadingShard);
      document.body.appendChild(modalRoot);
      this.bindReadingEvents(modalRoot);
    }
  }

  private renderConfirm(title: string, message: string): void {
    this.removeModalElement();
    if (typeof document === 'undefined') return;
    const modalRoot = document.createElement('div');
    modalRoot.id = 'echoes-modal-root';
    modalRoot.className =
      'fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md select-none';

    modalRoot.innerHTML = `
      <div class="relative w-full max-w-md bg-surface-container-low p-space-xl rounded-2xl shadow-2xl border border-error/30 flex flex-col gap-space-md">
        <div class="flex items-center gap-space-sm">
          <span class="material-symbols-outlined text-error text-[24px]">warning</span>
          <h2 class="font-headline-sm text-headline-sm text-on-surface">${title}</h2>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">${message}</p>
        <div class="flex items-center justify-end gap-space-md pt-space-sm">
          <button id="modal-cancel-btn" class="px-space-lg py-space-sm rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md uppercase tracking-wider cursor-pointer">
            Cancel
          </button>
          <button id="modal-confirm-btn" class="px-space-lg py-space-sm rounded bg-error text-on-error font-label-md uppercase tracking-wider cursor-pointer shadow-md">
            Confirm
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalRoot);

    modalRoot.querySelector('#modal-cancel-btn')?.addEventListener('click', () => {
      this.close();
    });

    modalRoot.querySelector('#modal-confirm-btn')?.addEventListener('click', () => {
      if (this.confirmCallback) {
        this.confirmCallback();
      }
      this.close();
    });

    modalRoot.addEventListener('click', (e) => {
      if (e.target === modalRoot) {
        this.close();
      }
    });
  }

  private getPauseHTML(): string {
    return `
      <div class="relative w-full max-w-md bg-surface-container-low p-space-xl rounded-2xl shadow-2xl border border-secondary/30 flex flex-col gap-space-lg animate-scale-up">
        <!-- Pause Header -->
        <div class="flex items-center justify-between border-b border-surface-container-high pb-space-sm">
          <div class="flex items-center gap-space-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
            <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-mono">Tether Suspended</span>
          </div>
          <span class="font-label-sm text-label-sm text-on-surface-variant font-mono">[ESC to Resume]</span>
        </div>

        <div class="text-center py-space-xs">
          <h2 class="font-headline-lg text-headline-lg text-on-surface">Recollection Paused</h2>
          <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
            The mind tether holds steady. Physical time is arrested.
          </p>
        </div>

        <!-- Menu Action Stack -->
        <div class="flex flex-col gap-space-sm">
          <button id="pause-resume-btn" class="w-full py-space-md px-space-lg rounded-xl bg-secondary text-on-secondary font-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-space-sm shadow-md hover:bg-secondary/90 transition-all cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">play_arrow</span>
            <span>Resume Journey</span>
          </button>
          
          <button id="pause-restart-btn" class="w-full py-space-md px-space-lg rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md uppercase tracking-wider flex items-center justify-center gap-space-sm transition-all cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">replay</span>
            <span>Restart Stratum</span>
          </button>

          <button id="pause-settings-btn" class="w-full py-space-md px-space-lg rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md uppercase tracking-wider flex items-center justify-center gap-space-sm transition-all cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">tune</span>
            <span>Audio & Controls</span>
          </button>

          <button id="pause-title-btn" class="w-full py-space-md px-space-lg rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md uppercase tracking-wider flex items-center justify-center gap-space-sm transition-all cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">home</span>
            <span>Return to Title</span>
          </button>
        </div>
      </div>
    `;
  }

  private bindPauseEvents(
    modalRoot: HTMLElement,
    onNavigate?: (route: string) => void,
    onRestart?: () => void
  ): void {
    modalRoot.querySelector('#pause-resume-btn')?.addEventListener('click', () => {
      soundService.playUIClick();
      this.close();
    });

    modalRoot.querySelector('#pause-restart-btn')?.addEventListener('click', () => {
      soundService.playUIClick();
      this.openConfirmModal(
        'Restart Level',
        'Restarting this recollection stratum will reset player position and current echo records. Attested remnants are preserved. Proceed?',
        () => {
          if (onRestart) onRestart();
          this.close();
        }
      );
    });

    modalRoot.querySelector('#pause-settings-btn')?.addEventListener('click', () => {
      soundService.playUIClick();
      this.openSettings();
    });

    modalRoot.querySelector('#pause-title-btn')?.addEventListener('click', () => {
      soundService.playUIClick();
      this.close();
      if (onNavigate) {
        onNavigate('prologue');
      }
    });

    modalRoot.addEventListener('click', (e) => {
      if (e.target === modalRoot) {
        this.close();
      }
    });
  }

  private getSettingsHTML(): string {
    return `
      <div class="relative w-full max-w-lg bg-surface-container-low p-space-xl rounded-2xl shadow-2xl border border-surface-container-high flex flex-col gap-space-lg max-h-[90vh] overflow-y-auto">
        <!-- Settings Header -->
        <div class="flex items-center justify-between border-b border-surface-container-high pb-space-sm">
          <div class="flex items-center gap-space-sm">
            <span class="material-symbols-outlined text-secondary text-[22px]">tune</span>
            <h2 class="font-headline-md text-headline-md text-on-surface">Configuration & Attunement</h2>
          </div>
          <button id="settings-close-btn" class="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Audio Settings Group -->
        <div class="flex flex-col gap-space-md">
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-mono">Acoustic Balance</span>
          
          <!-- Master Volume -->
          <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between text-body-sm text-on-surface">
              <span>Master Gain</span>
              <span class="font-mono text-secondary" id="val-master">${Math.round(this.settings.masterVolume * 100)}%</span>
            </div>
            <input type="range" id="slider-master" min="0" max="1" step="0.05" value="${this.settings.masterVolume}" class="w-full accent-secondary bg-surface-container-highest h-2 rounded cursor-pointer" />
          </div>

          <!-- SFX Volume -->
          <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between text-body-sm text-on-surface">
              <span>Resonance & SFX</span>
              <span class="font-mono text-secondary" id="val-sfx">${Math.round(this.settings.sfxVolume * 100)}%</span>
            </div>
            <input type="range" id="slider-sfx" min="0" max="1" step="0.05" value="${this.settings.sfxVolume}" class="w-full accent-secondary bg-surface-container-highest h-2 rounded cursor-pointer" />
          </div>

          <!-- Mute Toggle -->
          <div class="flex items-center justify-between p-space-sm rounded bg-surface-container">
            <div class="flex flex-col">
              <span class="font-label-md text-on-surface">Silence All Audio</span>
              <span class="font-body-sm text-[11px] text-on-surface-variant">Mutes both acoustic synthesizer and chime responses</span>
            </div>
            <input type="checkbox" id="check-mute" ${this.settings.isMuted ? 'checked' : ''} class="w-5 h-5 accent-secondary cursor-pointer" />
          </div>
        </div>

        <!-- Accessibility / Visual Preferences -->
        <div class="flex flex-col gap-space-md border-t border-surface-container-high pt-space-md">
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-mono">Sensory Attunement</span>

          <!-- Reduced Motion -->
          <div class="flex items-center justify-between p-space-sm rounded bg-surface-container">
            <div class="flex flex-col">
              <span class="font-label-md text-on-surface">Reduced Motion</span>
              <span class="font-body-sm text-[11px] text-on-surface-variant">Disables pulsing particles, animated waves, and camera shake</span>
            </div>
            <input type="checkbox" id="check-motion" ${this.settings.reducedMotion ? 'checked' : ''} class="w-5 h-5 accent-secondary cursor-pointer" />
          </div>

          <!-- High Contrast -->
          <div class="flex items-center justify-between p-space-sm rounded bg-surface-container">
            <div class="flex flex-col">
              <span class="font-label-md text-on-surface">Enhanced Archival Contrast</span>
              <span class="font-body-sm text-[11px] text-on-surface-variant">Brightens text boundaries against midnight navy layers</span>
            </div>
            <input type="checkbox" id="check-contrast" ${this.settings.highContrast ? 'checked' : ''} class="w-5 h-5 accent-secondary cursor-pointer" />
          </div>
        </div>

        <!-- Controls Reference -->
        <div class="border-t border-surface-container-high pt-space-md flex flex-col gap-space-xs text-[11px] text-on-surface-variant font-mono">
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Input Tether Map</span>
          <div class="flex justify-between py-0.5"><span>Movement</span><span class="text-on-surface font-semibold">A / D or Arrow Keys</span></div>
          <div class="flex justify-between py-0.5"><span>Jump</span><span class="text-on-surface font-semibold">Space</span></div>
          <div class="flex justify-between py-0.5"><span>Echo Trace Cast</span><span class="text-secondary font-semibold">F Key</span></div>
          <div class="flex justify-between py-0.5"><span>Veil Sight (Hold)</span><span class="text-on-surface font-semibold">Q Key</span></div>
          <div class="flex justify-between py-0.5"><span>Interact / Tether</span><span class="text-on-surface font-semibold">E Key</span></div>
          <div class="flex justify-between py-0.5"><span>Pause</span><span class="text-on-surface font-semibold">ESC</span></div>
        </div>

        <div class="flex justify-end pt-space-sm">
          <button id="settings-save-done-btn" class="px-space-xl py-space-sm rounded-xl bg-secondary text-on-secondary font-label-md uppercase tracking-wider font-semibold cursor-pointer">
            Save & Close
          </button>
        </div>
      </div>
    `;
  }

  private bindSettingsEvents(modalRoot: HTMLElement): void {
    const sliderMaster = modalRoot.querySelector('#slider-master') as HTMLInputElement | null;
    const sliderSfx = modalRoot.querySelector('#slider-sfx') as HTMLInputElement | null;
    const checkMute = modalRoot.querySelector('#check-mute') as HTMLInputElement | null;
    const checkMotion = modalRoot.querySelector('#check-motion') as HTMLInputElement | null;
    const checkContrast = modalRoot.querySelector('#check-contrast') as HTMLInputElement | null;

    sliderMaster?.addEventListener('input', () => {
      const val = parseFloat(sliderMaster.value);
      this.updateSettings({ masterVolume: val });
      const label = modalRoot.querySelector('#val-master');
      if (label) label.textContent = `${Math.round(val * 100)}%`;
    });

    sliderSfx?.addEventListener('input', () => {
      const val = parseFloat(sliderSfx.value);
      this.updateSettings({ sfxVolume: val });
      const label = modalRoot.querySelector('#val-sfx');
      if (label) label.textContent = `${Math.round(val * 100)}%`;
      soundService.playJump(); // Audible test ping
    });

    checkMute?.addEventListener('change', () => {
      this.updateSettings({ isMuted: checkMute.checked });
      if (!checkMute.checked) {
        soundService.playUIClick();
      }
    });

    checkMotion?.addEventListener('change', () => {
      this.updateSettings({ reducedMotion: checkMotion.checked });
    });

    checkContrast?.addEventListener('change', () => {
      this.updateSettings({ highContrast: checkContrast.checked });
    });

    const closeBtn = modalRoot.querySelector('#settings-close-btn');
    const doneBtn = modalRoot.querySelector('#settings-save-done-btn');

    closeBtn?.addEventListener('click', () => {
      soundService.playUIClick();
      this.close();
    });

    doneBtn?.addEventListener('click', () => {
      soundService.playUIClick();
      this.close();
    });

    modalRoot.addEventListener('click', (e) => {
      if (e.target === modalRoot) {
        this.close();
      }
    });
  }

  private getReadingHTML(shard: {
    id: string;
    title: string;
    quote: string;
    body: string;
    classification: string;
    chapter: string;
  }): string {
    return `
      <div class="relative w-full max-w-2xl bg-surface-container-low p-space-xl rounded-2xl shadow-2xl border border-secondary/30 flex flex-col gap-space-lg max-h-[90vh] overflow-y-auto">
        <!-- Reading Header -->
        <div class="flex items-center justify-between border-b border-surface-container-high pb-space-sm">
          <div class="flex items-center gap-space-sm">
            <span class="material-symbols-outlined text-secondary text-[22px]">auto_stories</span>
            <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-mono">${shard.classification}</span>
          </div>
          <button id="reading-close-btn" class="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div class="flex flex-col gap-space-xs">
          <span class="font-label-sm text-[10px] text-tertiary uppercase tracking-wider">${shard.chapter}</span>
          <h2 class="font-headline-lg text-headline-lg text-on-surface">${shard.title}</h2>
        </div>

        <blockquote class="p-space-md rounded-lg bg-surface-container-lowest font-headline-sm text-headline-sm italic text-secondary-fixed leading-relaxed border-l-2 border-secondary">
          “${shard.quote}”
        </blockquote>

        <div class="font-body-md text-body-md text-on-surface-variant leading-relaxed space-y-space-md">
          <p>${shard.body}</p>
        </div>

        <div class="border-t border-surface-container-high pt-space-md flex items-center justify-between text-on-surface-variant/70 font-label-sm text-label-sm">
          <span>Attested by Archivist #09</span>
          <span class="font-mono text-secondary">Fidelity 100% Crystalline</span>
        </div>
      </div>
    `;
  }

  private bindReadingEvents(modalRoot: HTMLElement): void {
    const closeBtn = modalRoot.querySelector('#reading-close-btn');
    closeBtn?.addEventListener('click', () => {
      soundService.playUIClick();
      this.close();
    });

    modalRoot.addEventListener('click', (e) => {
      if (e.target === modalRoot) {
        this.close();
      }
    });
  }
}

export const modalController = ModalController.getInstance();
