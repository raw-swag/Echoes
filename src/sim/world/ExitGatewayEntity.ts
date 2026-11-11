import { AABB, overlapsAABB } from '../physics/AABB';

export interface ExitGatewaySnapshot {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly isTriggered: boolean;
}

/**
 * ExitGatewayEntity:
 * The level completion archway at the end of the first playable level.
 */
export class ExitGatewayEntity {
  public readonly x: number;
  public readonly y: number;
  public readonly width: number;
  public readonly height: number;

  private triggered: boolean = false;
  private readonly bounds: AABB;

  constructor(x: number, y: number, width: number = 64, height: number = 96) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bounds = { x, y, width, height };
  }

  public getBounds(): AABB {
    return this.bounds;
  }

  public isTriggered(): boolean {
    return this.triggered;
  }

  public checkTrigger(playerBounds: AABB): boolean {
    if (this.triggered) {
      return false;
    }
    if (overlapsAABB(this.bounds, playerBounds)) {
      this.triggered = true;
      return true;
    }
    return false;
  }

  public getSnapshot(): ExitGatewaySnapshot {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      isTriggered: this.triggered
    };
  }

  public reset(): void {
    this.triggered = false;
  }
}
