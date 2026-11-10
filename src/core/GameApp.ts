import { Simulation } from '@sim/Simulation';
import { inputService, InputService } from '@input/InputService';
import { CanvasRenderer } from '@renderer/CanvasRenderer';
import { FixedStepLoop } from './FixedStepLoop';
import { globalGameState } from './GameState';
import { UIRouter } from '../ui/UIRouter';
import { soundService } from '../audio/SoundService';
import { PersistenceService } from '../storage/PersistenceService';

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

    // Wire simulation events to audio & persistence
    this.simulation.events = {
      onJump: () => soundService.playJump(),
      onTraceStart: () => soundService.playTraceRecord(),
      onTraceLaunch: () => soundService.playTraceLaunch(),
      onDoorStateChange: (open) => {
        if (open) soundService.playDoorOpen();
      },
      onBeaconActivate: (beaconId) => {
        soundService.playBeaconActivate();
        const simState = this.simulation.getCurrentState();
        PersistenceService.save({
          version: 1,
          activeBeaconId: beaconId,
          respawnX: 1152,
          respawnY: 550,
          collectedShardIds: simState.shards.filter((s) => s.collected).map((s) => s.id),
          integrity: simState.integrity,
          remnants: globalGameState.getState().remnants,
          levelCompleted: simState.isLevelCompleted
        });
      },
      onShardCollect: (_id, count) => {
        soundService.playShardCollect();
        globalGameState.update({
          collectedShardsCurrent: count,
          remnants: globalGameState.getState().remnants + 25
        });
      },
      onDamage: () => soundService.playDamage(),
      onDeath: () => soundService.playDeath(),
      onLevelComplete: () => {
        soundService.playLevelComplete();
        globalGameState.update({ isLevelCompleted: true });
        const simState = this.simulation.getCurrentState();
        PersistenceService.save({
          version: 1,
          activeBeaconId: 'beacon_central',
          respawnX: 1152,
          respawnY: 550,
          collectedShardIds: simState.shards.filter((s) => s.collected).map((s) => s.id),
          integrity: simState.integrity,
          remnants: globalGameState.getState().remnants,
          levelCompleted: true
        });
      }
    };

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
          Math.abs(appState.echoTraceTimer - traceSeconds) >= 0.05 ||
          appState.mindIntegrity !== simState.integrity ||
          appState.collectedShardsCurrent !== simState.collectedShardCount ||
          appState.isLevelCompleted !== simState.isLevelCompleted
        ) {
          globalGameState.update({
            echoTraceState: trace.state,
            echoTraceTimer: traceSeconds,
            echoTraceMaxTimer: trace.maxRecordTicks / 60,
            mindIntegrity: simState.integrity,
            collectedShardsCurrent: simState.collectedShardCount,
            isLevelCompleted: simState.isLevelCompleted
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

  public restartLevel(): void {
    this.simulation.reset();
    globalGameState.update({
      mindIntegrity: 3,
      collectedShardsCurrent: 0,
      isLevelCompleted: false,
      echoTraceState: 'idle',
      echoTraceTimer: 0
    });
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
