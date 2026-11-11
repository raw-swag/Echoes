import { AABB, overlapsAABB } from '../physics/AABB';

export interface BeaconSnapshot {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly respawnX: number;
  readonly respawnY: number;
  readonly isActive: boolean;
  readonly name: string;
}

/**
 * BeaconEntity:
 * Canonical checkpoint and autosave node in the simulation world (SV-01, D-025).
 * When player approaches or intersects, activates the Beacon, restores Integrity to full,
 * and sets the active respawn location.
 */
export class BeaconEntity {
  public readonly id: string;
  public readonly x: number;
  public readonly y: number;
  public readonly width: number;
  public readonly height: number;
  public readonly respawnX: number;
  public readonly respawnY: number;
  public readonly name: string;

  private active: boolean = false;
  private readonly bounds: AABB;

  constructor(
    id: string,
    x: number,
    y: number,
    respawnX: number,
    respawnY: number,
    name: string = 'Beacon',
    width: number = 32,
    height: number = 48
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.respawnX = respawnX;
    this.respawnY = respawnY;
    this.name = name;
    this.width = width;
    this.height = height;
    this.bounds = { x, y, width, height };
  }

  public getBounds(): AABB {
    return this.bounds;
  }

  public isActive(): boolean {
    return this.active;
  }

  /**
   * Check player proximity to activate Beacon.
   */
  public checkActivation(playerBounds: AABB): boolean {
    if (this.active) {
      return false;
    }
    if (overlapsAABB(this.bounds, playerBounds)) {
      this.active = true;
      return true; // Just activated on this tick
    }
    return false;
  }

  public getSnapshot(): BeaconSnapshot {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      respawnX: this.respawnX,
      respawnY: this.respawnY,
      isActive: this.active,
      name: this.name
    };
  }

  public setActive(active: boolean): void {
    this.active = active;
  }

  public reset(): void {
    this.active = false;
  }
}
