import { Tilemap, createTilemap, setTile, TileType } from '../physics/Tilemap';

/**
 * Pressure Gallery:
 * The canonical Milestone 3 Echo Trace puzzle chamber.
 *
 * Dimensions: 60 cols x 25 rows (1920 x 800 px).
 * - Player Spawn: x = 120, y = 550 (Column 3-4, Row 17 on ground)
 * - Ground floor: Row 20 (y = 640)
 * - Pressure Plate: Column 20 (x = 640, y = 630), triggers EchoDoor
 * - Separation: Plate is ~12-14 Body Heights (500+ px) from EchoDoor
 * - Echo Door: Column 38 (x = 1216, y = 544 to 640), tall solid barrier
 * - Exit Gateway: Column 48-52 (x = 1536-1664) behind EchoDoor
 *
 * Puzzle Mechanism:
 * 1. Living player walks to Pressure Plate (col 20).
 * 2. Player stands on plate; EchoDoor opens at col 38.
 * 3. But the player cannot reach the door before stepping off the plate!
 * 4. Solution: Record Echo Trace walking to plate and holding for several seconds.
 * 5. Player triggers Trace playback, runs to EchoDoor.
 * 6. Echo Ghost retraces path to plate, steps on plate and holds.
 * 7. Door opens for living player; living player walks through to Exit Gateway.
 */
export function createPressureGalleryRoom(): Tilemap {
  const cols = 60;
  const rows = 25;
  const tileSize = 32;
  const map = createTilemap(cols, rows, tileSize);

  // Outer border: Solid walls and ceiling
  for (let c = 0; c < cols; c++) {
    setTile(map, c, 0, TileType.Solid); // Ceiling
    setTile(map, c, rows - 1, TileType.Solid); // Bottom foundation
  }
  for (let r = 0; r < rows; r++) {
    setTile(map, 0, r, TileType.Solid); // Left wall
    setTile(map, cols - 1, r, TileType.Solid); // Right wall
  }

  // 1. Continuous Main Floor: Columns 1 to 58, Row 20
  for (let c = 1; c < cols - 1; c++) {
    setTile(map, c, 20, TileType.Solid);
    for (let r = 21; r < rows - 1; r++) {
      setTile(map, c, r, TileType.Solid);
    }
  }

  // 2. Starting Gallery Pedestal (Columns 2-6, Row 19)
  for (let c = 2; c <= 6; c++) {
    setTile(map, c, 19, TileType.Solid);
  }

  // 3. Stepped observation ledge over plate (Columns 16-18, Row 15) - One-way
  for (let c = 16; c <= 18; c++) {
    setTile(map, c, 15, TileType.OneWay);
  }

  // 4. Overpass ledge between plate and door (Columns 27-31, Row 16) - One-way
  for (let c = 27; c <= 31; c++) {
    setTile(map, c, 16, TileType.OneWay);
  }

  // 5. Door frame lintel (Column 38, Rows 13-16 solid wall extending down from ceiling)
  for (let r = 1; r <= 16; r++) {
    setTile(map, 38, r, TileType.Solid);
  }

  // 6. Exit chamber platform (Columns 50-57, Row 18)
  for (let c = 50; c <= 57; c++) {
    setTile(map, c, 18, TileType.Solid);
  }

  return map;
}
