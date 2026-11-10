import { FrameScheduler, BrowserFrameScheduler } from './Clock';

export interface FixedStepLoopOptions {
  /**
   * Simulation frequency in Hz.
   * Default: 60.
   */
  readonly tickRate?: number;

  /**
   * Maximum catch-up updates allowed per rendered frame to avoid spiral of death.
   * Default: 5.
   */
  readonly maxSubSteps?: number;

  /**
   * Max delta time (in seconds) to ingest in a single frame.
   * Prevents accumulator explosion when returning from background tabs.
   * Default: 0.2 (200 ms).
   */
  readonly maxDeltaTime?: number;

  /**
   * Pluggable frame scheduler for testing / headless execution.
   */
  readonly scheduler?: FrameScheduler;

  /**
   * Fixed simulation update callback.
   * Executed exactly once per 1/tickRate seconds.
   */
  readonly update: (dt: number) => void;

  /**
   * Render callback.
   * Executed once per scheduled animation frame with interpolation factor [0, 1).
   */
  readonly render: (alpha: number) => void;
}

export class FixedStepLoop {
  private readonly fixedTimestep: number;
  private readonly maxSubSteps: number;
  private readonly maxDeltaTime: number;
  private readonly scheduler: FrameScheduler;
  private readonly updateFn: (dt: number) => void;
  private readonly renderFn: (alpha: number) => void;

  private accumulator: number = 0;
  private lastTime: number = 0;
  private frameId: number | null = null;
  private isRunning: boolean = false;
  private isPaused: boolean = false;

  // Diagnostics
  private fps: number = 0;
  private frameTime: number = 0;
  private frameCount: number = 0;
  private fpsTimer: number = 0;

  constructor(options: FixedStepLoopOptions) {
    const tickRate = options.tickRate ?? 60;
    this.fixedTimestep = 1 / tickRate;
    this.maxSubSteps = options.maxSubSteps ?? 5;
    this.maxDeltaTime = options.maxDeltaTime ?? 0.2;
    this.scheduler = options.scheduler ?? new BrowserFrameScheduler();
    this.updateFn = options.update;
    this.renderFn = options.render;
  }

  public start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = this.scheduler.now();
    this.accumulator = 0;
    this.frameCount = 0;
    this.fpsTimer = this.lastTime;

    this.scheduleNextFrame();
  }

  public stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    this.isPaused = false;
    if (this.frameId !== null) {
      this.scheduler.cancelFrame(this.frameId);
      this.frameId = null;
    }
    this.accumulator = 0;
  }

  public pause(): void {
    this.isPaused = true;
  }

  public resume(): void {
    if (!this.isRunning) {
      return;
    }

    if (this.isPaused) {
      this.isPaused = false;
      // Reset lastTime to current time and clear accumulator
      // so resuming after tab pause never triggers catch-up ticks
      this.lastTime = this.scheduler.now();
      this.accumulator = 0;
    }
  }

  public isActive(): boolean {
    return this.isRunning;
  }

  public isLoopPaused(): boolean {
    return this.isPaused;
  }

  public getAccumulator(): number {
    return this.accumulator;
  }

  public getFixedTimestep(): number {
    return this.fixedTimestep;
  }

  public getFPS(): number {
    return this.fps;
  }

  public getFrameTime(): number {
    return this.frameTime;
  }

  /**
   * Internal frame loop tick. Can also be called directly in headless tests.
   */
  public frame(currentTime: number): void {
    if (!this.isRunning) {
      return;
    }

    if (this.isPaused) {
      this.lastTime = currentTime;
      if (this.isRunning) {
        this.scheduleNextFrame();
      }
      return;
    }

    // Measure delta time in seconds
    let dt = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Sanitize abnormal delta times (negative, NaN, or excessively large deltas)
    if (isNaN(dt) || dt < 0) {
      dt = 0;
    } else if (dt > this.maxDeltaTime) {
      dt = this.maxDeltaTime;
    }

    this.frameTime = dt * 1000;

    // Track FPS
    this.frameCount += 1;
    if (currentTime - this.fpsTimer >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.fpsTimer = currentTime;
    }

    // Accumulate time
    this.accumulator += dt;

    // Fixed updates (up to maxSubSteps)
    let subSteps = 0;
    while (this.accumulator >= this.fixedTimestep && subSteps < this.maxSubSteps) {
      this.updateFn(this.fixedTimestep);
      this.accumulator -= this.fixedTimestep;
      subSteps += 1;
    }

    // If accumulator is still larger than fixedTimestep after maxSubSteps,
    // discard the excess to prevent the spiral of death.
    if (this.accumulator >= this.fixedTimestep) {
      this.accumulator = 0;
    }

    // Render with interpolation factor alpha in range [0, 1)
    const alpha = this.accumulator / this.fixedTimestep;
    this.renderFn(alpha);

    if (this.isRunning) {
      this.scheduleNextFrame();
    }
  }

  private scheduleNextFrame(): void {
    this.frameId = this.scheduler.requestFrame((timestamp: number) => {
      this.frame(timestamp);
    });
  }
}
