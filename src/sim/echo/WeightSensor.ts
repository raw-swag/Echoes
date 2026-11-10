import { AABB, overlapsAABB } from '../physics/AABB';

export interface WeightSensorSnapshot {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly isActive: boolean;
  readonly activationCount: number;
}

/**
 * WeightSensor (TR-08, F-T11):
 * Environmental trigger that responds to the living player OR compatible Trace Ghost.
 * When either or both are within bounds, the sensor is actively depressed (weight >= 1).
 */
export class WeightSensor {
  public readonly id: string;
  public readonly x: number;
  public readonly y: number;
  public readonly width: number;
  public readonly height: number;

  private active: boolean = false;
  private activationCount: number = 0;

  // Cached AABB to avoid per-tick allocations
  private readonly bounds: AABB;

  constructor(id: string, x: number, y: number, width: number = 48, height: number = 12) {
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

  public getBounds(): AABB {
    return this.bounds;
  }

  public isActive(): boolean {
    return this.active;
  }

  public getActivationCount(): number {
    return this.activationCount;
  }

  /**
   * Evaluates occupancy for the current tick. Zero allocations.
   */
  public evaluate(playerBounds: AABB, ghostActive: boolean, ghostBounds: AABB): boolean {
    const playerOn = overlapsAABB(this.bounds, playerBounds);
    const ghostOn = ghostActive && overlapsAABB(this.bounds, ghostBounds);

    const wasActive = this.active;
    this.active = playerOn || ghostOn;

    if (!wasActive && this.active) {
      this.activationCount += 1;
    }

    return this.active;
  }

  public getSnapshot(): WeightSensorSnapshot {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      isActive: this.active,
      activationCount: this.activationCount
    };
  }

  public reset(): void {
    this.active = false;
    this.activationCount = 0;
  }
}
