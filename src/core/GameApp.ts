import { Simulation } from '@sim/Simulation';
import { inputService, InputService } from '@input/InputService';
import { CanvasRenderer } from '@renderer/CanvasRenderer';
import { FixedStepLoop } from './FixedStepLoop';
import { globalGameState } from './GameState';
import { UIRouter } from '../ui/UIRouter';

export interface GameAppOptions {
  canvas: HTMLCanvasElement;
  uiContainer?: HTMLElement;
}

export class GameApp {
  private readonly simulation: Simulation;
  private readonly inputService: InputService;
  private readonly renderer: CanvasRenderer;
  private readonly loop: FixedStepLoop;
  private readonly uiRouter?: UIRouter;

  private isStarted = false;

  constructor(options: GameAppOptions) {
    this.simulation = new Simulation();
    this.inputService = inputService;
    this.renderer = new CanvasRenderer({ canvas: options.canvas });

    if (options.uiContainer) {
      this.uiRouter = new UIRouter({
        container: options.uiContainer,
        canvas: options.canvas
      });
    }

    this.loop = new FixedStepLoop({
      tickRate: 60,
      maxSubSteps: 5,
      maxDeltaTime: 0.2,
      update: (_dt: number) => {
        // Sync simulation pause state with UI game state
        const appState = globalGameState.getState();
        if (appState.isPaused !== this.simulation.isSimulationPaused()) {
          this.simulation.setPaused(appState.isPaused);
        }

        const inputSnapshot = this.inputService.poll();
        this.simulation.step(inputSnapshot);

        // Sync real simulation trace status back to UI GameState
        const simState = this.simulation.getCurrentState();
        const trace = simState.traceStatus;
        let traceSeconds = 0;
        if (trace.state === 'recording') {
          traceSeconds = trace.recordTicks / 60;
        } else if (trace.state === 'playback') {
          traceSeconds = trace.playbackTick / 60;
        } else if (trace.state === 'holding') {
          traceSeconds = trace.holdTick / 60;
        } else if (trace.state === 'dissolving') {
          traceSeconds = trace.dissolveTick / 60;
        }

        if (
          appState.echoTraceState !== trace.state ||
          Math.abs(appState.echoTraceTimer - traceSeconds) >= 0.05
        ) {
          globalGameState.update({
            echoTraceState: trace.state,
            echoTraceTimer: traceSeconds,
            echoTraceMaxTimer: trace.maxRecordTicks / 60
          });
        }
      },
      render: (alpha: number) => {
        const fps = this.loop.getFPS();
        const frameTime = this.loop.getFrameTime();
        this.renderer.render(
          this.simulation.getCurrentState(),
          this.simulation.getPreviousState(),
          alpha,
          fps,
          frameTime,
          this.simulation.getTilemap()
        );
      }
    });

    this.setupPageVisibility();
  }

  private setupPageVisibility(): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.loop.pause();
      } else {
        this.loop.resume();
      }
    });

    window.addEventListener('blur', () => {
      this.inputService.reset();
    });
  }

  public start(): void {
    if (this.isStarted) {
      return;
    }
    this.isStarted = true;
    this.inputService.attach(window);
    this.uiRouter?.init();
    this.loop.start();
  }

  public stop(): void {
    if (!this.isStarted) {
      return;
    }
    this.isStarted = false;
    this.loop.stop();
    this.uiRouter?.dispose();
    this.inputService.detach(window);
    this.renderer.dispose();
  }

  public getSimulation(): Simulation {
    return this.simulation;
  }

  public getLoop(): FixedStepLoop {
    return this.loop;
  }

  public getUIRouter(): UIRouter | undefined {
    return this.uiRouter;
  }
}
