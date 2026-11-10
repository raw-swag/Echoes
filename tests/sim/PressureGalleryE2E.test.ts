import { describe, it, expect } from 'vitest';
import { Simulation } from '../../src/sim/Simulation';
import { EMPTY_INPUT_SNAPSHOT } from '../../src/sim/InputSnapshot';

describe('Pressure Gallery End-to-End Puzzle Verification', () => {
  it('successfully solves the Pressure Gallery puzzle through authentic trace recording, playback holding, and living player door traversal', () => {
    const sim = new Simulation(0);
    const player = sim.getPlayer();
    const plate = sim.getPressurePlate();
    const door = sim.getEchoDoor();

    // 1. Initial State: Player at start ledge (x = 120, y = 550)
    expect(player.x).toBe(120);
    expect(player.y).toBe(550);
    expect(plate.isActive()).toBe(false);
    expect(door.isOpen()).toBe(false);
    expect(door.isPassable).toBe(false);

    // Living player attempts to walk directly through the door without Echo Trace
    // Door is at x = 1216, plate is at x = 640
    // Player cannot cross the closed door (solid barrier)
    player.teleport(1200, 640 - 48); // Right in front of door
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1 }); // Walk into door
    expect(player.x).toBeLessThanOrEqual(door.x);

    // Reset player back to starting position to perform the real solution
    sim.reset();
    expect(sim.getPlayer().x).toBe(120);
    expect(door.isPassable).toBe(false);

    // 2. Step 1: Start recording Echo Trace while at start
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    expect(sim.getCurrentState().traceStatus.state).toBe('recording');

    // Step 2: Walk player across floor toward the pressure plate at x = 640
    let reachedPlate = false;
    for (let t = 0; t < 240; t++) {
      sim.step({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1 });
      if (plate.isActive()) {
        reachedPlate = true;
        break;
      }
    }
    expect(reachedPlate).toBe(true);
    expect(plate.isActive()).toBe(true);

    // Step 3: Stand on the plate for 60 ticks (1.0 s) to ensure solid hold
    for (let t = 0; t < 60; t++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
      expect(plate.isActive()).toBe(true);
    }

    // Step 4: Press Trace again to end recording and launch playback
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    const traceState = sim.getCurrentState().traceStatus.state;
    expect(traceState).toBe('playback');

    // 3. Independent living player movement:
    // Real player sprints right toward the EchoDoor (x = 1216)
    // While living player is running, ghost starts from Origin Mark (x = 120) and walks to plate
    for (let t = 0; t < 120; t++) {
      sim.step({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1 });
    }

    // Living player arrives at door before the ghost has activated the plate
    // Door should still be closing/closed or opening once ghost arrives
    // Advance ticks until ghost reaches the plate and holds
    let ghostDepressedPlate = false;
    for (let t = 0; t < 240; t++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
      if (plate.isActive() && sim.getCurrentState().ghost.active) {
        ghostDepressedPlate = true;
        break;
      }
    }
    expect(ghostDepressedPlate).toBe(true);

    // 4. Verify Door opens while Ghost is on the plate
    for (let t = 0; t < 20; t++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }
    expect(door.isOpen()).toBe(true);
    expect(door.isPassable).toBe(true);

    // Ghost transitions to holding pose (720 ticks / 12s)
    // Living player now steps safely through the open door to the Exit Chamber (x >= 1250)
    sim.getPlayer().teleport(1210, 640 - 48); // Just before door
    for (let t = 0; t < 30; t++) {
      sim.step({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1 });
    }

    // Living player successfully passed the door!
    expect(sim.getPlayer().x).toBeGreaterThan(door.x + door.width);
  });
});
