import { describe, it, expect, beforeEach } from 'vitest';
import { modalController } from '@ui/components/ModalController';
import { globalGameState } from '@core/GameState';
import { soundService } from '@audio/SoundService';

describe('M4.6 UI Interaction & Modal Systems', () => {
  beforeEach(() => {
    modalController.close();
    globalGameState.setPaused(false);
  });

  it('opens and closes the Pause Modal, reflecting state in globalGameState', () => {
    expect(globalGameState.getState().isPaused).toBe(false);
    expect(modalController.getActiveModal()).toBeNull();

    modalController.openPause();
    expect(modalController.getActiveModal()).toBe('pause');
    expect(globalGameState.getState().isPaused).toBe(true);

    modalController.close();
    expect(modalController.getActiveModal()).toBeNull();
    expect(globalGameState.getState().isPaused).toBe(false);
  });

  it('updates and persists audio settings immediately', () => {
    modalController.updateSettings({
      masterVolume: 0.65,
      sfxVolume: 0.4,
      isMuted: true
    });

    const settings = modalController.getSettings();
    expect(settings.masterVolume).toBe(0.65);
    expect(settings.sfxVolume).toBe(0.4);
    expect(settings.isMuted).toBe(true);

    expect(soundService.getMasterVolume()).toBe(0.65);
    expect(soundService.getSfxVolume()).toBe(0.4);
    expect(soundService.getIsMuted()).toBe(true);
    expect(soundService.getEffectiveGain(1.0)).toBe(0);

    // Unmute
    modalController.updateSettings({ isMuted: false });
    expect(soundService.getEffectiveGain(1.0)).toBeCloseTo(0.65 * 0.4);
  });

  it('opens reading modal with complete fragment transcript metadata', () => {
    modalController.openReadingModal({
      id: 'frag-test',
      title: 'Echoed Bell Inscription',
      quote: 'The bells ring even underwater.',
      body: 'Detailed archival transcription text from stratum 03.',
      classification: 'REMNANT #999',
      chapter: 'Stratum 03'
    });

    expect(modalController.getActiveModal()).toBe('reading');
    modalController.close();
    expect(modalController.getActiveModal()).toBeNull();
  });

  it('triggers confirmation callback on confirm action', () => {
    let confirmed = false;
    modalController.openConfirmModal('Reset Test', 'Are you sure?', () => {
      confirmed = true;
    });

    expect(modalController.getActiveModal()).toBe('confirm');
    
    // Simulate confirm callback invocation
    modalController.confirmAction();
    expect(confirmed).toBe(true);
    expect(modalController.getActiveModal()).toBeNull();
  });
});
