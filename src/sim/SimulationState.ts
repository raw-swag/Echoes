/**
 * Read-only snapshot of simulation state at a specific tick.
 * Used by renderers and test suites to inspect or interpolate state.
 */
export interface SimulationState {
  readonly tick: number;
  readonly running: boolean;
  // Future state fields (entities, player position, trace buffers) will be added here
}

export function createInitialSimulationState(): SimulationState {
  return {
    tick: 0,
    running: true
  };
}
