import { PlayerSnapshot } from './entities/Player';
import { Tilemap } from './physics/Tilemap';

/**
 * Full snapshot of simulation state at a specific tick.
 * Completely deterministic and serializable.
 */
export interface SimulationState {
  readonly tick: number;
  readonly running: boolean;
  readonly player: PlayerSnapshot;
}

export function createInitialSimulationState(
  _tilemap?: Tilemap,
  spawnX: number = 96,
  spawnY: number = 550
): SimulationState {
  return {
    tick: 0,
    running: true,
    player: {
      x: spawnX,
      y: spawnY,
      prevX: spawnX,
      prevY: spawnY,
      vx: 0,
      vy: 0,
      isGrounded: false,
      facing: 'right',
      state: 'idle',
      width: 24,
      height: 48
    }
  };
}
