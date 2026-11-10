import { globalGameState, GameStateModel } from '@core/GameState';

export class UIEchoController {
  private updateInterval: number | null = null;

  public startTraceCycle(): void {
    let timer = 0;
    globalGameState.setEchoTraceState('recording', 0);

    if (this.updateInterval !== null) {
      window.clearInterval(this.updateInterval);
    }

    this.updateInterval = window.setInterval(() => {
      const state = globalGameState.getState();
      if (state.isPaused) return;

      timer += 0.1;
      if (timer > 5.0) {
        timer = 0;
        // Cycle between recording and replaying
        const nextState = state.echoTraceState === 'recording' ? 'replaying' : 'recording';
        globalGameState.setEchoTraceState(nextState, 0);
      } else {
        globalGameState.update({ echoTraceTimer: Number(timer.toFixed(1)) });
      }
    }, 100);
  }

  public stopTraceCycle(): void {
    if (this.updateInterval !== null) {
      window.clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  public bindState(renderCallback: (state: Readonly<GameStateModel>) => void): () => void {
    return globalGameState.subscribe(renderCallback);
  }
}

export const uiEchoController = new UIEchoController();
