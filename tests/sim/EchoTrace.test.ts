import { describe, it, expect, beforeEach } from 'vitest';
import { Simulation } from '../../src/sim/Simulation';
import { EMPTY_INPUT_SNAPSHOT, InputSnapshot } from '../../src/sim/InputSnapshot';
import { TRACE_TICKS } from '../../src/sim/echo/TraceConfig';

describe('M3: Echo Trace Deterministic Recording & Playback Engine', () => {
  let sim: Simulation;

  beforeEach(() => {
    sim = new Simulation(0);
  });

  it('starts in idle trace state with unallocated ghost', () => {
    const state = sim.getCurrentState();
    expect(state.traceStatus.state).toBe('idle');
    expect(state.ghost.active).toBe(false);
  });

  it('records initial transform at sample 0 upon trace toggle (F-T1)', () => {
    const tracePress: InputSnapshot = { ...EMPTY_INPUT_SNAPSHOT, trace: true };
    const traceRelease: InputSnapshot = { ...EMPTY_INPUT_SNAPSHOT, trace: false };

    sim.step(tracePress);
    expect(sim.getCurrentState().traceStatus.state).toBe('recording');

    // Buffer has 1 frame recorded at frame 0
    const buffer = sim.getTraceBuffer();
    expect(buffer.getValidFrames()).toBe(1);

    // Living player position matches recorded frame 0 position
    const player = sim.getPlayer();
    expect(buffer.getX(0)).toBeCloseTo(player.x, 2);
    expect(buffer.getY(0)).toBeCloseTo(player.y, 2);

    sim.step(traceRelease);
    expect(sim.getCurrentState().traceStatus.state).toBe('recording');
  });

  it('enforces maximum duration cap of 480 ticks (8.0 s) and transitions automatically (TR-01, F-T2)', () => {
    // Start recording
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: false });

    // Step 480 ticks with movement
    for (let i = 0; i < TRACE_TICKS.MAX_RECORD_TICKS - 1; i++) {
      sim.step({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1 });
    }

    // Now at tick 480: recorder should automatically cap and launch playback
    const state = sim.getCurrentState();
    expect(state.traceStatus.state).toBe('playback');
    expect(state.ghost.active).toBe(true);
    expect(sim.getTraceBuffer().getValidFrames()).toBe(TRACE_TICKS.MAX_RECORD_TICKS);
  });

  it('discards recordings under minimum duration (30 ticks / 0.5 s) (TR-02)', () => {
    // Start recording
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: false });

    // Advance only 10 ticks (< 30 ticks)
    for (let i = 0; i < 10; i++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }

    // Attempt to stop recording
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: false });

    // Should cancel and return to idle, ghost not spawned
    const state = sim.getCurrentState();
    expect(state.traceStatus.state).toBe('idle');
    expect(state.ghost.active).toBe(false);
  });

  it('cancels active recording when trace button is held for 30 ticks (F-T3)', () => {
    // Start recording
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: false });

    // Step 40 ticks
    for (let i = 0; i < 40; i++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }
    expect(sim.getCurrentState().traceStatus.state).toBe('recording');

    // Hold trace button for 30 continuous ticks
    for (let i = 0; i < 30; i++) {
      sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    }

    // Should be cancelled and return to idle
    const state = sim.getCurrentState();
    expect(state.traceStatus.state).toBe('idle');
    expect(state.ghost.active).toBe(false);
  });

  it('faithfully replays the recorded trajectory frame-by-frame (F-T4)', () => {
    // Start recording
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });

    const buffer = sim.getTraceBuffer();

    // Record 60 ticks of horizontal running
    for (let i = 0; i < 60; i++) {
      sim.step({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1 });
    }

    // Stop recording and launch playback
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    expect(sim.getCurrentState().traceStatus.state).toBe('playback');

    // Step through playback frames and verify exact transform reproduction
    for (let i = 0; i < buffer.getValidFrames(); i++) {
      const ghost = sim.getCurrentState().ghost;
      expect(ghost.active).toBe(true);
      expect(ghost.x).toBeCloseTo(buffer.getX(i), 1);
      expect(ghost.y).toBeCloseTo(buffer.getY(i), 1);
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }
  });

  it('transitions to holding pose for 720 ticks (12.0 s) after playback completes (TR-03, F-T5)', () => {
    // Record 40 ticks
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    for (let i = 0; i < 40; i++) {
      sim.step({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1 });
    }
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    expect(sim.getCurrentState().traceStatus.state).toBe('playback');

    const totalRecorded = sim.getTraceBuffer().getValidFrames();
    const finalGhostX = sim.getTraceBuffer().getX(totalRecorded - 1);
    const finalGhostY = sim.getTraceBuffer().getY(totalRecorded - 1);

    // Advance through playback (totalRecorded - 1 steps)
    for (let i = 1; i < totalRecorded; i++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }

    // Step that crosses into holding
    sim.step(EMPTY_INPUT_SNAPSHOT);
    expect(sim.getCurrentState().traceStatus.state).toBe('holding');
    expect(sim.getCurrentState().ghost.isHolding).toBe(true);

    // Ghost position stays rigidly locked at final pose during hold
    for (let h = 0; h < TRACE_TICKS.HOLD_TICKS - 1; h++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
      const ghost = sim.getCurrentState().ghost;
      expect(ghost.x).toBeCloseTo(finalGhostX, 1);
      expect(ghost.y).toBeCloseTo(finalGhostY, 1);
      expect(ghost.isHolding).toBe(true);
    }

    // Tick 720: Transitions to dissolving
    sim.step(EMPTY_INPUT_SNAPSHOT);
    expect(sim.getCurrentState().traceStatus.state).toBe('dissolving');
    expect(sim.getCurrentState().ghost.isDissolving).toBe(true);
  });

  it('fades out over 60 ticks (1.0 s) during dissolve and enters cooldown (TR-06, TR-04)', () => {
    // Record minimum duration
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    for (let i = 0; i < 35; i++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });

    const totalFrames = sim.getTraceBuffer().getValidFrames();

    // Advance playback to completion
    for (let i = 0; i < totalFrames; i++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }

    // Advance hold to completion
    for (let i = 0; i < TRACE_TICKS.HOLD_TICKS; i++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }

    expect(sim.getCurrentState().traceStatus.state).toBe('dissolving');

    // Step dissolve ticks (during dissolve, ghost remains active with decaying opacity)
    for (let d = 0; d < TRACE_TICKS.DISSOLVE_TICKS - 1; d++) {
      const ghost = sim.getCurrentState().ghost;
      expect(ghost.active).toBe(true);
      expect(ghost.opacity).toBeLessThanOrEqual(0.65);
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }

    // Complete the dissolve step
    sim.step(EMPTY_INPUT_SNAPSHOT);

    // Now in cooldown
    expect(sim.getCurrentState().traceStatus.state).toBe('cooldown');
    expect(sim.getCurrentState().ghost.active).toBe(false);

    // Cooldown lasts 60 ticks
    for (let c = 0; c < TRACE_TICKS.COOLDOWN_TICKS; c++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }

    expect(sim.getCurrentState().traceStatus.state).toBe('idle');
  });

  it('allows ghost to depress WeightSensor and open EchoDoor while living player moves independently (TR-08, F-T11)', () => {
    const plate = sim.getPressurePlate();
    const door = sim.getEchoDoor();

    // 1. Teleport player onto the pressure plate at plate.x + 10
    const plateX = plate.x + 10;
    const plateY = plate.y - 8;
    sim.getPlayer().teleport(plateX, plateY);

    // Start recording while standing on plate
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });

    // Hold position on the plate for 60 ticks
    for (let i = 0; i < 60; i++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }

    // Stop recording and launch playback
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    expect(sim.getCurrentState().traceStatus.state).toBe('playback');

    // Teleport living player away from the plate to starting ledge (x = 120, y = 550)
    sim.getPlayer().teleport(120, 550);

    // Ghost is at frame 0 (on the plate)!
    const ghost = sim.getCurrentState().ghost;
    expect(ghost.active).toBe(true);
    expect(ghost.x).toBeCloseTo(plateX, 1);

    // Verify plate is activated by ghost
    sim.step(EMPTY_INPUT_SNAPSHOT);
    expect(plate.isActive()).toBe(true);

    // Step forward 20 ticks for door to open fully (transitionTicks = 15)
    for (let d = 0; d < 20; d++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }

    expect(door.isOpen()).toBe(true);
    expect(door.isPassable).toBe(true);
  });

  it('GOLDEN DETERMINISM TEST: 50+ replays produce identical integer fixed-point positions with 0 drift', () => {
    // Record a 120-tick complex sequence (run, jump, land)
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    for (let i = 0; i < 40; i++) {
      sim.step({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1 });
    }
    for (let i = 0; i < 40; i++) {
      sim.step({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1, jump: true });
    }
    for (let i = 0; i < 40; i++) {
      sim.step({ ...EMPTY_INPUT_SNAPSHOT, moveX: -1 });
    }
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });

    const totalFrames = sim.getTraceBuffer().getValidFrames();
    expect(totalFrames).toBeGreaterThan(60);

    // Cache golden integer raw transforms directly from Int32Array
    const goldenBufferCopy = new Int32Array(sim.getTraceBuffer().getRawData());

    // Execute 50 independent playback iterations
    for (let replay = 0; replay < 50; replay++) {
      // Launch playback
      const playerController = sim.getTracePlayer();
      playerController.launch();

      for (let f = 0; f < totalFrames; f++) {
        // Assert ghost position equals fixed-point integer decoded value exactly
        const baseIndex = f * 4;
        const expectedX = goldenBufferCopy[baseIndex] / 256;
        const expectedY = goldenBufferCopy[baseIndex + 1] / 256;

        sim.getTracePlayer().update();

        expect(sim.getTraceGhost().x).toBe(expectedX);
        expect(sim.getTraceGhost().y).toBe(expectedY);
      }

      // Assert buffer memory was not mutated in any frame
      const currentRaw = sim.getTraceBuffer().getRawData();
      for (let word = 0; word < totalFrames * 4; word++) {
        expect(currentRaw[word]).toBe(goldenBufferCopy[word]);
      }
    }
  });
});
