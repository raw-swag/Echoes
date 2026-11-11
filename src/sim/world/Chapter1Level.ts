import { Tilemap, createTilemap, setTile, TileType } from '../physics/Tilemap';

/**
 * Chapter 1 Level: "The Threshold of Ash & Salt"
 *
 * Dimensions: 80 cols x 25 rows (2560 x 800 px).
 * A complete, seamless, connected first playable level:
 *
 * 1. Area 1 (Cols 1-18, x: 32 - 576):
 *    - Starting Pedestal: Player Spawn at x = 120, y = 550.
 *    - Stepped practice ledges and first Memory Shard (Col 14, Row 15).
 *    - Teaches fundamental horizontal running, deceleration, variable jump height.
 *
 * 2. Area 2 (Cols 19-32, x: 608 - 1024):
 *    - Traversal Gaps & Hazard Pits (Cols 20-22, 28-30).
 *    - One-way platforms overhead (Row 16) with drop-through (Down + Jump).
 *    - Second Memory Shard tucked on an elevated observation perch (Col 26, Row 13).
 *
 * 3. Area 3 (Cols 33-40, x: 1056 - 1280):
 *    - The Central Beacon Checkpoint (Col 35, x = 1120, Row 19, ground at Row 20).
 *    - Restores Integrity to full (3 pips), establishes active respawn point before puzzle.
 *
 * 4. Area 4 (Cols 41-65, x: 1312 - 2080):
 *    - The Canonical Pressure Gallery Puzzle:
 *    - Pressure Plate P at Col 48 (x = 1536, y = 628).
 *    - Echo Door D at Col 64 (x = 2048, y = 544, width = 24, height = 96) blocking corridor.
 *    - Distance: 16 Body Heights. Walking time exceeds door closure grace.
 *    - Solution: Record Echo Trace walking to plate P, stand 1 s, launch playback.
 *      Living player sprints to Door D. Ghost steps on plate P and holds (12 s).
 *      Door D opens, living player steps through!
 *    - Third Memory Shard located on an upper ledge above the puzzle (Col 54, Row 14).
 *
 * 5. Area 5 (Cols 66-78, x: 2112 - 2496):
 *    - The Exit Chamber & Nexus Arch Gateway (Col 72-74, x = 2304-2368, y = 512).
 *    - Fourth Memory Shard (Col 69, Row 16).
 *    - Walking into the Nexus Arch triggers Level Completion!
 */
export function createChapter1Level(): Tilemap {
  const cols = 80;
  const rows = 25;
  const tileSize = 32;
  const map = createTilemap(cols, rows, tileSize);

  // Outer border: Solid boundary ceiling and foundation
  for (let c = 0; c < cols; c++) {
    setTile(map, c, 0, TileType.Solid); // Ceiling
    setTile(map, c, rows - 1, TileType.Solid); // Foundation
  }
  for (let r = 0; r < rows; r++) {
    setTile(map, 0, r, TileType.Solid); // Left world boundary
    setTile(map, cols - 1, r, TileType.Solid); // Right world boundary
  }

  // ----------------------------------------------------
  // AREA 1: STARTING ARCH & TRAINING LEDGES (Cols 1 - 18)
  // ----------------------------------------------------
  // Ground floor at Row 20
  for (let c = 1; c <= 18; c++) {
    setTile(map, c, 20, TileType.Solid);
    for (let r = 21; r < rows - 1; r++) {
      setTile(map, c, r, TileType.Solid);
    }
  }
  // Starting Pedestal: Cols 2-5, Row 19
  for (let c = 2; c <= 5; c++) {
    setTile(map, c, 19, TileType.Solid);
  }
  // Stepped practice ledges: Cols 11, 12, 13
  setTile(map, 11, 19, TileType.Solid);
  setTile(map, 12, 18, TileType.Solid);
  setTile(map, 13, 17, TileType.Solid);
  setTile(map, 14, 17, TileType.Solid); // Shard 1 sits here (Col 14, Row 16)

  // ----------------------------------------------------
  // AREA 2: TRAVERSAL GAPS & HAZARD PITS (Cols 19 - 32)
  // ----------------------------------------------------
  // Gap 1 (Cols 19-21): Spikes in the pit at bottom
  for (let c = 19; c <= 21; c++) {
    setTile(map, c, rows - 2, TileType.Hazard);
  }

  // Island 1: Cols 22 - 25, Row 20
  for (let c = 22; c <= 25; c++) {
    setTile(map, c, 20, TileType.Solid);
    for (let r = 21; r < rows - 1; r++) {
      setTile(map, c, r, TileType.Solid);
    }
  }

  // High Overpass Platform (One-way): Cols 25 - 28, Row 15
  for (let c = 25; c <= 28; c++) {
    setTile(map, c, 15, TileType.OneWay);
  }

  // Gap 2 (Cols 26 - 28): Spikes in pit
  for (let c = 26; c <= 28; c++) {
    setTile(map, c, rows - 2, TileType.Hazard);
  }

  // Island 2: Cols 29 - 32, Row 20
  for (let c = 29; c <= 32; c++) {
    setTile(map, c, 20, TileType.Solid);
    for (let r = 21; r < rows - 1; r++) {
      setTile(map, c, r, TileType.Solid);
    }
  }

  // ----------------------------------------------------
  // AREA 3: THE BEACON CHECKPOINT SANCTUARY (Cols 33 - 40)
  // ----------------------------------------------------
  for (let c = 33; c <= 40; c++) {
    setTile(map, c, 20, TileType.Solid);
    for (let r = 21; r < rows - 1; r++) {
      setTile(map, c, r, TileType.Solid);
    }
  }
  // Beacon pedestal: Cols 35 - 37, Row 19
  for (let c = 35; c <= 37; c++) {
    setTile(map, c, 19, TileType.Solid);
  }
  // Beacon entity sits at Col 36, Row 17 (x = 1152, y = 544)

  // ----------------------------------------------------
  // AREA 4: PRESSURE GALLERY CHAMBER (Cols 41 - 65)
  // ----------------------------------------------------
  // Solid continuous floor from Col 41 to 65, Row 20
  for (let c = 41; c <= 65; c++) {
    setTile(map, c, 20, TileType.Solid);
    for (let r = 21; r < rows - 1; r++) {
      setTile(map, c, r, TileType.Solid);
    }
  }
  // Pressure plate sits at Col 48 (x = 1536, y = 628)

  // Observation canopy / one-way ledge: Cols 52 - 56, Row 15 (Shard 3 sits at Col 54, Row 14)
  for (let c = 52; c <= 56; c++) {
    setTile(map, c, 15, TileType.OneWay);
  }

  // Door frame lintel extending down from ceiling at Col 64 (x = 2048, Rows 1-16)
  for (let r = 1; r <= 16; r++) {
    setTile(map, 64, r, TileType.Solid);
  }
  // Echo Door sits at Col 64, Rows 17-19 (x = 2048, y = 544, width = 24, height = 96)

  // ----------------------------------------------------
  // AREA 5: EXIT SANCTUARY & NEXUS ARCH (Cols 66 - 78)
  // ----------------------------------------------------
  for (let c = 66; c <= 78; c++) {
    setTile(map, c, 20, TileType.Solid);
    for (let r = 21; r < rows - 1; r++) {
      setTile(map, c, r, TileType.Solid);
    }
  }

  // Elevated gateway dais: Cols 71 - 76, Row 19
  for (let c = 71; c <= 76; c++) {
    setTile(map, c, 19, TileType.Solid);
  }
  // Exit Gateway arch sits at Col 73 (x = 2336, y = 512)

  return map;
}
