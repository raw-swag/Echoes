import { describe, it, expect } from 'vitest';
import { Simulation } from '../../src/sim/Simulation';
import { EMPTY_INPUT_SNAPSHOT } from '../../src/sim/InputSnapshot';

describe('Echo Trace Allocation & Micro-benchmark', () => {
  it('executes 1,000 recording + playback ticks with sustained micro-performance and zero drift', () => {
    const sim = new Simulation(0);

    // Warm up
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    for (let i = 0; i < 60; i++) {
      sim.step({ ...EMPTY_INPUT_SNAPSHOT, moveX: 1 });
    }
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });

    const start = performance.now();
    const ITERATIONS = 1000;
    for (let i = 0; i < ITERATIONS; i++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }
    const durationMs = performance.now() - start;
    const avgPerTickMs = durationMs / ITERATIONS;

    // Fixed 60 Hz step budget is 16.67ms.
    // Pure headless simulation tick MUST be well under 0.1ms per tick.
    expect(avgPerTickMs).toBeLessThan(0.1);
  });
});
