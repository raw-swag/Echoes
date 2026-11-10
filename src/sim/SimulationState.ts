import { PlayerSnapshot } from './entities/Player';
import { Tilemap } from './physics/Tilemap';
import { GhostSnapshot } from './echo/TraceGhost';
import { TraceStatus } from './echo/TraceState';
import { WeightSensorSnapshot } from './echo/WeightSensor';
import { EchoDoorSnapshot } from './echo/EchoDoor';
import { BeaconSnapshot } from './world/BeaconEntity';
import { MemoryShardSnapshot } from './world/MemoryShardEntity';
import { ExitGatewaySnapshot } from './world/ExitGatewayEntity';
import { TRACE_TICKS } from './echo/TraceConfig';

/**
 * Full snapshot of simulation state at a specific tick.
 * Completely deterministic and serializable.
 */
export interface SimulationState {
  readonly tick: number;
  readonly running: boolean;
  readonly player: PlayerSnapshot;
  readonly ghost: GhostSnapshot;
  readonly traceStatus: TraceStatus;
  readonly sensors: readonly WeightSensorSnapshot[];
  readonly doors: readonly EchoDoorSnapshot[];
  readonly beacons: readonly BeaconSnapshot[];
  readonly shards: readonly MemoryShardSnapshot[];
  readonly exitGateway: ExitGatewaySnapshot;
  readonly integrity: number; // SV-01: 3 pips
  readonly maxIntegrity: number; // 3
  readonly invulnerableTicks: number; // 1.5 s = 90 ticks after damage
  readonly isLevelCompleted: boolean;
  readonly isDead: boolean;
  readonly collectedShardCount: number;
  readonly totalShardCount: number;
}

export function createInitialSimulationState(
  _tilemap?: Tilemap,
  spawnX: number = 120,
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
    },
    ghost: {
      active: false,
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      facing: 'right',
      state: 'idle',
      isGrounded: false,
      width: 24,
      height: 48,
      opacity: 0,
      isHolding: false,
      isDissolving: false
    },
    traceStatus: {
      state: 'idle',
      recordTicks: 0,
      maxRecordTicks: TRACE_TICKS.MAX_RECORD_TICKS,
      playbackTick: 0,
      holdTick: 0,
      dissolveTick: 0,
      cooldownTick: 0,
      validSampleCount: 0
    },
    sensors: [],
    doors: [],
    beacons: [],
    shards: [],
    exitGateway: {
      x: 2336,
      y: 512,
      width: 64,
      height: 96,
      isTriggered: false
    },
    integrity: 3,
    maxIntegrity: 3,
    invulnerableTicks: 0,
    isLevelCompleted: false,
    isDead: false,
    collectedShardCount: 0,
    totalShardCount: 4
  };
}
