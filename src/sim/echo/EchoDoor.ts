import { AABB } from '../physics/AABB';

export type EchoDoorState = 'closed' | 'opening' | 'open' | 'closing';

export interface EchoDoorSnapshot {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly state: EchoDoorState;
  readonly openProgress: number; // 0.0 (fully closed) to 1.0 (fully open)
  readonly isPassable: boolean;
}

/**
 * EchoDoor:
 * Solid obstacle that opens when its linked sensor is active.
 * Retracts vertically or dissolves open in fixed deterministic ticks.
 */
export class EchoDoor {
  public readonly id: string;
  public readonly x: number;
  public readonly y: number;
  public readonly width: number;
  public readonly height: number;

  private state: EchoDoorState = 'closed';
  private openProgress: number = 0.0; // 0 (closed) -> 1 (open)
  private readonly transitionTicks: number = 15; // 0.25s at 60 Hz
  private transitionTimer: number = 0;

  // Dynamic collision bounds
  private readonly bounds: AABB;

  constructor(id: string, x: number, y: number, width: number = 24, height: number = 96) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bounds = {
      x,
      y,
      width,
      height
    };
  }

  public getState(): EchoDoorState {
    return this.state;
  }

  public isOpen(): boolean {
    return this.state === 'open';
  }

  public get isPassable(): boolean {
    return this.openProgress >= 0.85;
  }

  public getBounds(): AABB {
    return this.bounds;
  }

  /**
   * Deterministic update step linked to sensor active state.
   */
  public update(sensorActive: boolean): void {
    if (sensorActive) {
      if (this.state === 'closed' || this.state === 'closing') {
        this.state = 'opening';
      }
    } else {
      if (this.state === 'open' || this.state === 'opening') {
        this.state = 'closing';
      }
    }

    if (this.state === 'opening') {
      this.transitionTimer += 1;
      this.openProgress = Math.min(1.0, this.transitionTimer / this.transitionTicks);
      if (this.openProgress >= 1.0) {
        this.state = 'open';
        this.transitionTimer = this.transitionTicks;
      }
    } else if (this.state === 'closing') {
      this.transitionTimer = Math.max(0, this.transitionTimer - 1);
      this.openProgress = Math.max(0.0, this.transitionTimer / this.transitionTicks);
      if (this.openProgress <= 0.0) {
        this.state = 'closed';
        this.transitionTimer = 0;
      }
    }
  }

  public getSnapshot(): EchoDoorSnapshot {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      state: this.state,
      openProgress: this.openProgress,
      isPassable: this.isPassable
    };
  }

  public reset(): void {
    this.state = 'closed';
    this.openProgress = 0.0;
    this.transitionTimer = 0;
  }
}
