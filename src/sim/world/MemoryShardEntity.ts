import { AABB, overlapsAABB } from '../physics/AABB';

export interface MemoryShardSnapshot {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly collected: boolean;
  readonly title: string;
}

/**
 * MemoryShardEntity:
 * Narrative and mechanical collectible entity in the simulation world.
 * Pure deterministic state with zero allocations during per-tick collection checks.
 */
export class MemoryShardEntity {
  public readonly id: string;
  public readonly x: number;
  public readonly y: number;
  public readonly width: number;
  public readonly height: number;
  public readonly title: string;

  private collected: boolean = false;
  private readonly bounds: AABB;

  constructor(
    id: string,
    x: number,
    y: number,
    title: string = 'Memory Shard',
    width: number = 20,
    height: number = 24
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.title = title;
    this.bounds = { x, y, width, height };
  }

  public getBounds(): AABB {
    return this.bounds;
  }

  public isCollected(): boolean {
    return this.collected;
  }

  public checkCollection(playerBounds: AABB): boolean {
    if (this.collected) {
      return false;
    }
    if (overlapsAABB(this.bounds, playerBounds)) {
      this.collected = true;
      return true;
    }
    return false;
  }

  public getSnapshot(): MemoryShardSnapshot {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      collected: this.collected,
      title: this.title
    };
  }

  public reset(force: boolean = false): void {
    if (force) {
      this.collected = false;
    }
  }

  public markCollected(): void {
    this.collected = true;
  }
}
