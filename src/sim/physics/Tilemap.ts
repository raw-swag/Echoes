import { AABB, createAABB } from './AABB';

export enum TileType {
  Empty = 0,
  Solid = 1,
  OneWay = 2,
  Hazard = 3
}

export interface Tilemap {
  readonly tileSize: number;
  readonly cols: number;
  readonly rows: number;
  readonly data: Int32Array;
}

export function createTilemap(cols: number, rows: number, tileSize: number = 32): Tilemap {
  return {
    tileSize,
    cols,
    rows,
    data: new Int32Array(cols * rows)
  };
}

export function setTile(tilemap: Tilemap, col: number, row: number, type: TileType): void {
  if (col >= 0 && col < tilemap.cols && row >= 0 && row < tilemap.rows) {
    tilemap.data[row * tilemap.cols + col] = type;
  }
}

export function getTile(tilemap: Tilemap, col: number, row: number): TileType {
  if (col < 0 || col >= tilemap.cols || row < 0 || row >= tilemap.rows) {
    // Outside boundary is treated as Solid walls on left, right, and top; bottom can be hazard/empty
    if (row >= tilemap.rows) {
      return TileType.Hazard;
    }
    return TileType.Solid;
  }
  return tilemap.data[row * tilemap.cols + col] as TileType;
}

export function getTileAABB(tilemap: Tilemap, col: number, row: number): AABB {
  return createAABB(
    col * tilemap.tileSize,
    row * tilemap.tileSize,
    tilemap.tileSize,
    tilemap.tileSize
  );
}
