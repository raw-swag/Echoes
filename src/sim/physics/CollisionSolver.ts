import { AABB, overlapsAABB } from './AABB';
import { Tilemap, TileType, getTile } from './Tilemap';

export interface CollisionResult {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isGrounded: boolean;
  hitCeiling: boolean;
  hitWallLeft: boolean;
  hitWallRight: boolean;
  hitHazard: boolean;
}

export interface DynamicObstacle {
  readonly isPassable: boolean;
  getBounds(): AABB;
}

/**
 * Deterministic AABB vs Tilemap + dynamic obstacles collision solver.
 */
export function resolveMovement(
  box: AABB,
  vx: number,
  vy: number,
  tilemap: Tilemap,
  ignoreOneWay: boolean = false,
  dynamicObstacles: readonly DynamicObstacle[] = []
): CollisionResult {
  let x = box.x;
  let y = box.y;
  const w = box.width;
  const h = box.height;
  const ts = tilemap.tileSize;

  let isGrounded = false;
  let hitCeiling = false;
  let hitWallLeft = false;
  let hitWallRight = false;
  let hitHazard = false;

  // ----------------------------------------------------
  // 1. HORIZONTAL RESOLUTION (X-axis)
  // ----------------------------------------------------
  x += vx;

  // Check tilemap walls
  const startRowX = Math.floor((y + 0.01) / ts);
  const endRowX = Math.floor((y + h - 0.01) / ts);

  if (vx > 0) {
    const targetCol = Math.floor((x + w) / ts);
    for (let row = startRowX; row <= endRowX; row++) {
      const tile = getTile(tilemap, targetCol, row);
      if (tile === TileType.Hazard) hitHazard = true;
      if (tile === TileType.Solid) {
        x = targetCol * ts - w;
        vx = 0;
        hitWallRight = true;
        break;
      }
    }
  } else if (vx < 0) {
    const targetCol = Math.floor(x / ts);
    for (let row = startRowX; row <= endRowX; row++) {
      const tile = getTile(tilemap, targetCol, row);
      if (tile === TileType.Hazard) hitHazard = true;
      if (tile === TileType.Solid) {
        x = (targetCol + 1) * ts;
        vx = 0;
        hitWallLeft = true;
        break;
      }
    }
  }

  // Check dynamic solid obstacles (e.g. EchoDoor when closed)
  for (let i = 0; i < dynamicObstacles.length; i++) {
    const obs = dynamicObstacles[i];
    if (obs.isPassable) continue;

    const obsBounds = obs.getBounds();
    const currentBox: AABB = {
      x,
      y,
      width: w,
      height: h
    };

    if (overlapsAABB(currentBox, obsBounds)) {
      if (vx > 0) {
        x = obsBounds.x - w;
        vx = 0;
        hitWallRight = true;
      } else if (vx < 0) {
        x = obsBounds.x + obsBounds.width;
        vx = 0;
        hitWallLeft = true;
      }
    }
  }

  // ----------------------------------------------------
  // 2. VERTICAL RESOLUTION (Y-axis)
  // ----------------------------------------------------
  const prevBottom = box.y + h;
  y += vy;

  const startColY = Math.floor((x + 0.01) / ts);
  const endColY = Math.floor((x + w - 0.01) / ts);

  if (vy > 0) {
    // Falling Down
    const targetRow = Math.floor((y + h) / ts);
    for (let col = startColY; col <= endColY; col++) {
      const tile = getTile(tilemap, col, targetRow);
      if (tile === TileType.Hazard) hitHazard = true;

      const tileTop = targetRow * ts;

      // Solid floor collision
      if (tile === TileType.Solid) {
        y = tileTop - h;
        vy = 0;
        isGrounded = true;
        break;
      }

      // One-way platform collision
      if (tile === TileType.OneWay && !ignoreOneWay) {
        if (prevBottom <= tileTop + 0.1 && y + h >= tileTop) {
          y = tileTop - h;
          vy = 0;
          isGrounded = true;
          break;
        }
      }
    }
  } else if (vy < 0) {
    // Moving Up (Ceiling hit)
    const targetRow = Math.floor(y / ts);
    for (let col = startColY; col <= endColY; col++) {
      const tile = getTile(tilemap, col, targetRow);
      if (tile === TileType.Hazard) hitHazard = true;
      if (tile === TileType.Solid) {
        y = (targetRow + 1) * ts;
        vy = 0;
        hitCeiling = true;
        break;
      }
    }
  }

  return {
    x,
    y,
    vx,
    vy,
    isGrounded,
    hitCeiling,
    hitWallLeft,
    hitWallRight,
    hitHazard
  };
}
