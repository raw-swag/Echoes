import { globalGameState, GameStateModel } from '@core/GameState';

/**
 * UIEchoController:
 * Synchronizes HUD elements with real game state.
 *
 * NOTE (M2 Audit):
 * Artificially auto-cycling between recording and playback has been removed.
 * Echo Trace will only advance when the actual Trace mechanic is invoked.
 */
export class UIEchoController {
  public startTraceCycle(): void {
    // Left as passive listener / hook for future M3 trace events.
    // Does not forge fake periodic trace cycles.
  }

  public stopTraceCycle(): void {
    // No-op
  }

  public bindState(renderCallback: (state: Readonly<GameStateModel>) => void): () => void {
    return globalGameState.subscribe(renderCallback);
  }
}

export const uiEchoController = new UIEchoController();
