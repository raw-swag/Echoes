import { describe, it, expect } from 'vitest';
import { Simulation } from '../../src/sim/Simulation';
import { EMPTY_INPUT_SNAPSHOT, InputSnapshot } from '../../src/sim/InputSnapshot';

describe('Simulation Engine', () => {
  it('advances tick count strictly by 1 on each step', () => {
    const sim = new Simulation();
    expect(sim.getTick()).toBe(0);

    sim.step(EMPTY_INPUT_SNAPSHOT);
    expect(sim.getTick()).toBe(1);

    for (let i = 0; i < 59; i++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }
    expect(sim.getTick()).toBe(60);
  });

  it('preserves previous state for interpolation across steps', () => {
    const sim = new Simulation();
    sim.step(EMPTY_INPUT_SNAPSHOT);

    expect(sim.getPreviousState().tick).toBe(0);
    expect(sim.getCurrentState().tick).toBe(1);

    sim.step(EMPTY_INPUT_SNAPSHOT);
    expect(sim.getPreviousState().tick).toBe(1);
    expect(sim.getCurrentState().tick).toBe(2);
  });

  it('does not advance when paused', () => {
    const sim = new Simulation();
    sim.step(EMPTY_INPUT_SNAPSHOT);
    expect(sim.getTick()).toBe(1);

    sim.setPaused(true);
    expect(sim.isSimulationPaused()).toBe(true);

    sim.step(EMPTY_INPUT_SNAPSHOT);
    expect(sim.getTick()).toBe(1);

    sim.setPaused(false);
    sim.step(EMPTY_INPUT_SNAPSHOT);
    expect(sim.getTick()).toBe(2);
  });

  it('is completely deterministic across runs given identical inputs', () => {
    const runSimulation = (inputs: InputSnapshot[]): number[] => {
      const sim = new Simulation();
      const ticks: number[] = [];
      for (const input of inputs) {
        sim.step(input);
        ticks.push(sim.getTick());
      }
      return ticks;
    };

    const inputs: InputSnapshot[] = [
      EMPTY_INPUT_SNAPSHOT,
      { ...EMPTY_INPUT_SNAPSHOT, jump: true },
      { ...EMPTY_INPUT_SNAPSHOT, moveX: 1 },
      { ...EMPTY_INPUT_SNAPSHOT, ability: true }
    ];

    const run1 = runSimulation(inputs);
    const run2 = runSimulation(inputs);

    expect(run1).toEqual(run2);
    expect(run1).toEqual([1, 2, 3, 4]);
  });
});
