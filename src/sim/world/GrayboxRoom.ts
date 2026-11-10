import { Tilemap, createTilemap, setTile, TileType } from '../physics/Tilemap';

/**
 * Creates the dedicated graybox movement test room:
 * - Dimensions: 60 columns x 25 rows (1920 x 800 px at 32px per tile)
 * - Ground floor with varied stepped platforms.
 * - Platform gaps of different widths (3, 4, 6 tiles).
 * - Multi-tiered elevation ledges (single jump, double tier).
 * - One-way platforms (drop-through enabled).
 * - Spike / hazard pits.
 * - Clear starting spawn point and visible end gateway marker.
 */
export function createGrayboxRoom(): Tilemap {
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

  // 1. Starting Flat Ground: Columns 1 to 14, Row 20
  for (let c = 1; c <= 14; c++) {
    setTile(map, c, 20, TileType.Solid);
    for (let r = 21; r < rows - 1; r++) {
      setTile(map, c, r, TileType.Solid);
    }
  }

  // 2. Stepped Ledges (testing small jump heights): Columns 10, 11, 12
  setTile(map, 10, 19, TileType.Solid);
  setTile(map, 11, 18, TileType.Solid);
  setTile(map, 12, 17, TileType.Solid);

  // 3. Gap 1 (width 3 tiles: 15, 16, 17) with hazard pit at bottom
  for (let c = 15; c <= 17; c++) {
    setTile(map, c, rows - 2, TileType.Hazard);
  }

  // 4. Middle Island: Columns 18 to 26, Row 20
  for (let c = 18; c <= 26; c++) {
    setTile(map, c, 20, TileType.Solid);
    for (let r = 21; r < rows - 1; r++) {
      setTile(map, c, r, TileType.Solid);
    }
  }

  // 5. Elevated Solid Platforms:
  // Height 1 (~2 BH above ground): Row 16, cols 20 to 24
  for (let c = 20; c <= 24; c++) {
    setTile(map, c, 16, TileType.Solid);
  }

  // 6. One-Way Platforms (Drop-through test): Row 13, cols 22 to 27
  for (let c = 22; c <= 27; c++) {
    setTile(map, c, 13, TileType.OneWay);
  }

  // Additional One-Way Platform: Row 10, cols 24 to 29
  for (let c = 24; c <= 29; c++) {
    setTile(map, c, 10, TileType.OneWay);
  }

  // 7. Gap 2 (width 4 tiles: 27, 28, 29, 30) with hazard pit
  for (let c = 27; c <= 30; c++) {
    setTile(map, c, rows - 2, TileType.Hazard);
  }

  // 8. Higher Tiered Section: Columns 31 to 42, Row 18
  for (let c = 31; c <= 42; c++) {
    setTile(map, c, 18, TileType.Solid);
    for (let r = 19; r < rows - 1; r++) {
      setTile(map, c, r, TileType.Solid);
    }
  }

  // High Wall & Ledge on column 36 (Row 14 to 17)
  for (let r = 14; r <= 17; r++) {
    setTile(map, 36, r, TileType.Solid);
  }

  // 9. Gap 3 (Challenging gap: width 5 tiles: 43 to 47)
  for (let c = 43; c <= 47; c++) {
    setTile(map, c, rows - 2, TileType.Hazard);
  }

  // 10. Goal Section: Columns 48 to 58, Row 19
  for (let c = 48; c <= 58; c++) {
    setTile(map, c, 19, TileType.Solid);
    for (let r = 20; r < rows - 1; r++) {
      setTile(map, c, r, TileType.Solid);
    }
  }

  return map;
}
