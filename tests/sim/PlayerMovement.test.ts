import { describe, it, expect, beforeEach } from 'vitest';
import { Player } from '../../src/sim/entities/Player';
import { DEFAULT_MOVEMENT_CONFIG } from '../../src/sim/entities/MovementConfig';
import { createTilemap, setTile, TileType } from '../../src/sim/physics/Tilemap';
import { EMPTY_INPUT_SNAPSHOT, InputSnapshot } from '../../src/sim/InputSnapshot';

describe('Player Movement & Deterministic Physics', () => {
  let player: Player;
  let tilemap: ReturnType<typeof createTilemap>;

  beforeEach(() => {
    // 20 cols x 15 rows of 32px tiles
    tilemap = createTilemap(20, 15, 32);

    // Flat floor at row 10 (y = 320px)
    for (let c = 0; c < 20; c++) {
      setTile(tilemap, c, 10, TileType.Solid);
    }
    // Solid left and right walls
    for (let r = 0; r < 15; r++) {
      setTile(tilemap, 0, r, TileType.Solid);
      setTile(tilemap, 19, r, TileType.Solid);
    }

    // Spawn player standing on floor: y = 320 - 48 = 272
    player = new Player(100, 272, DEFAULT_MOVEMENT_CONFIG);
    // Initial grounded settle
    player.update(EMPTY_INPUT_SNAPSHOT, tilemap);
  });

  it('accelerates horizontally up to maxRunSpeed and decelerates to zero', () => {
    const moveRight: InputSnapshot = { ...EMPTY_INPUT_SNAPSHOT, moveX: 1 };

    // 1 tick right
    player.update(moveRight, tilemap);
    expect(player.vx).toBeGreaterThan(0);
    expect(player.facing).toBe('right');
    expect(player.x).toBeGreaterThan(100);

    // Run for 30 ticks
    for (let i = 0; i < 29; i++) {
      player.update(moveRight, tilemap);
    }
    expect(player.vx).toBeCloseTo(DEFAULT_MOVEMENT_CONFIG.maxRunSpeed, 5);

    // Release input: player must decelerate to 0
    for (let i = 0; i < 20; i++) {
      player.update(EMPTY_INPUT_SNAPSHOT, tilemap);
    }
    expect(player.vx).toBe(0);
    expect(player.state).toBe('idle');
  });

  it('initiates a jump with correct apex and returns to grounded state', () => {
    const jumpInput: InputSnapshot = { ...EMPTY_INPUT_SNAPSHOT, jump: true };

    player.update(jumpInput, tilemap);
    expect(player.isGrounded).toBe(false);
    expect(player.vy).toBe(DEFAULT_MOVEMENT_CONFIG.jumpVelocity);
    expect(player.state).toBe('jumping');

    const startY = 272;
    let minPosY = startY;

    // Simulate jump arc while holding jump
    for (let i = 0; i < 60; i++) {
      player.update(jumpInput, tilemap);
      if (player.y < minPosY) {
        minPosY = player.y;
      }
    }

    // Jump apex height check (approx 100px difference)
    const apexHeight = startY - minPosY;
    expect(apexHeight).toBeGreaterThanOrEqual(95);
    expect(apexHeight).toBeLessThanOrEqual(110);

    // Player should land back on ground
    expect(player.isGrounded).toBe(true);
    expect(player.y).toBe(272);
  });

  it('cuts upward velocity when jump button is released early (variable jump height)', () => {
    // Jump with full hold
    const fullJumpPlayer = new Player(100, 272, DEFAULT_MOVEMENT_CONFIG);
    fullJumpPlayer.update({ ...EMPTY_INPUT_SNAPSHOT, jump: true }, tilemap);
    for (let i = 0; i < 5; i++) {
      fullJumpPlayer.update({ ...EMPTY_INPUT_SNAPSHOT, jump: true }, tilemap);
    }

    // Jump with early release at tick 2
    const shortJumpPlayer = new Player(100, 272, DEFAULT_MOVEMENT_CONFIG);
    shortJumpPlayer.update({ ...EMPTY_INPUT_SNAPSHOT, jump: true }, tilemap);
    shortJumpPlayer.update({ ...EMPTY_INPUT_SNAPSHOT, jump: true }, tilemap);
    // Release jump
    shortJumpPlayer.update({ ...EMPTY_INPUT_SNAPSHOT, jump: false }, tilemap);
    for (let i = 0; i < 3; i++) {
      shortJumpPlayer.update({ ...EMPTY_INPUT_SNAPSHOT, jump: false }, tilemap);
    }

    // Short jump player has higher Y (lower height) and lower upward velocity
    expect(shortJumpPlayer.y).toBeGreaterThan(fullJumpPlayer.y);
  });

  it('supports coyote time (jumping shortly after walking off a ledge)', () => {
    // Create a ledge: clear floor after col 5 (x = 160)
    for (let c = 6; c < 19; c++) {
      setTile(tilemap, c, 10, TileType.Empty);
    }

    // Place player at edge so one step puts them in the air
    player.x = 191; // Col 5 ends at 192, so next tick x >= 192 (off floor)
    player.update(EMPTY_INPUT_SNAPSHOT, tilemap);
    expect(player.isGrounded).toBe(true);

    // Step off ledge for 2 ticks (within 6-tick coyote time)
    const moveRight: InputSnapshot = { ...EMPTY_INPUT_SNAPSHOT, moveX: 1 };
    player.update(moveRight, tilemap);
    player.update(moveRight, tilemap);
    expect(player.isGrounded).toBe(false);

    // Press jump during coyote window
    player.update({ ...moveRight, jump: true }, tilemap);
    expect(player.vy).toBe(DEFAULT_MOVEMENT_CONFIG.jumpVelocity);
  });

  it('supports jump buffering (pressing jump shortly before landing)', () => {
    // Start falling in air 15px above ground
    player.y = 250;
    player.vy = 4;
    player.update(EMPTY_INPUT_SNAPSHOT, tilemap);
    expect(player.isGrounded).toBe(false);

    // Press jump before landing (within 6-tick buffer)
    player.update({ ...EMPTY_INPUT_SNAPSHOT, jump: true }, tilemap);
    // Continue falling until landing
    while (!player.isGrounded && player.vy > 0) {
      player.update({ ...EMPTY_INPUT_SNAPSHOT, jump: true }, tilemap);
    }

    // Upon landing, buffered jump triggers immediately
    expect(player.vy).toBe(DEFAULT_MOVEMENT_CONFIG.jumpVelocity);
  });

  it('collides stably against solid walls without tunneling', () => {
    // Run into solid wall at col 0 (x = 32px boundary)
    player.x = 40;
    const moveLeft: InputSnapshot = { ...EMPTY_INPUT_SNAPSHOT, moveX: -1 };

    for (let i = 0; i < 30; i++) {
      player.update(moveLeft, tilemap);
    }

    // Left wall ends at col 0 * 32 + 32 = 32
    expect(player.x).toBe(32);
    expect(player.vx).toBe(0);
  });

  it('lands on one-way platforms and drops through with Down + Jump', () => {
    // Add one-way platform at row 7 (y = 224px), cols 3 to 6
    for (let c = 3; c <= 6; c++) {
      setTile(tilemap, c, 7, TileType.OneWay);
    }

    // Fall onto one-way platform from above (y = 150)
    player.x = 120;
    player.y = 150;
    player.vy = 4;

    for (let i = 0; i < 20; i++) {
      player.update(EMPTY_INPUT_SNAPSHOT, tilemap);
    }

    // Should land on top of one-way platform (y = 224 - 48 = 176)
    expect(player.y).toBe(176);
    expect(player.isGrounded).toBe(true);

    // Drop through with Down + Jump
    const dropThroughInput: InputSnapshot = {
      ...EMPTY_INPUT_SNAPSHOT,
      moveY: 1,
      jump: true
    };
    player.update(dropThroughInput, tilemap);

    // In air, falling below platform
    expect(player.isGrounded).toBe(false);

    // Continue falling down to main ground floor (y = 272)
    for (let i = 0; i < 30; i++) {
      player.update(EMPTY_INPUT_SNAPSHOT, tilemap);
    }
    expect(player.y).toBe(272);
    expect(player.isGrounded).toBe(true);
  });

  it('is bit-level deterministic when replaying identical input sequences', () => {
    const runScriptedSimulation = (): { x: number; y: number; vx: number; vy: number } => {
      const p = new Player(100, 272, DEFAULT_MOVEMENT_CONFIG);

      // 15 ticks run right
      for (let i = 0; i < 15; i++) {
        p.update({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1 }, tilemap);
      }
      // 10 ticks jump right
      for (let i = 0; i < 10; i++) {
        p.update({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1, jump: true }, tilemap);
      }
      // 25 ticks air control left
      for (let i = 0; i < 25; i++) {
        p.update({ ...EMPTY_INPUT_SNAPSHOT, moveX: -1 }, tilemap);
      }
      // 20 ticks idle
      for (let i = 0; i < 20; i++) {
        p.update(EMPTY_INPUT_SNAPSHOT, tilemap);
      }

      return { x: p.x, y: p.y, vx: p.vx, vy: p.vy };
    };

    const run1 = runScriptedSimulation();
    const run2 = runScriptedSimulation();
    const run3 = runScriptedSimulation();

    expect(run1).toEqual(run2);
    expect(run2).toEqual(run3);
  });
});
