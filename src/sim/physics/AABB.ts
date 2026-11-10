/**
 * Axis-Aligned Bounding Box (AABB) in 2D space.
 */
export interface AABB {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export function createAABB(x: number, y: number, width: number, height: number): AABB {
  return { x, y, width, height };
}

export function overlapsAABB(a: AABB, b: AABB): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
