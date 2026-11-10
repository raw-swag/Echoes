import { InputSnapshot } from './InputSnapshot';
import { SimulationState } from './SimulationState';
import { Player } from './entities/Player';
import { Tilemap } from './physics/Tilemap';
import { createChapter1Level } from './world/Chapter1Level';
import { TraceBuffer } from './echo/TraceBuffer';
import { TraceRecorder } from './echo/TraceRecorder';
import { TraceGhost } from './echo/TraceGhost';
import { TracePlayer } from './echo/TracePlayer';
import { WeightSensor } from './echo/WeightSensor';
import { EchoDoor } from './echo/EchoDoor';
import { BeaconEntity } from './world/BeaconEntity';
import { MemoryShardEntity } from './world/MemoryShardEntity';
import { ExitGatewayEntity } from './world/ExitGatewayEntity';
import { TRACE_TICKS } from './echo/TraceConfig';

export interface SimulationEvents {
  onDamage?: (integrity: number) => void;
  onDeath?: () => void;
  onRespawn?: (x: number, y: number) => void;
  onShardCollect?: (shardId: string, count: number) => void;
  onBeaconActivate?: (beaconId: string) => void;
  onDoorStateChange?: (isOpen: boolean) => void;
  onLevelComplete?: () => void;
  onTraceStart?: () => void;
  onTraceLaunch?: () => void;
  onJump?: () => void;
}

/**
 * Pure deterministic simulation engine for Chapter 1 Playable Level.
 *
 * Rules:
 * - ZERO DOM, Canvas, window, or document dependencies.
 * - Updates strictly at 60 Hz fixed integer ticks.
 * - Receives input strictly via InputSnapshot.
 * - Zero allocations on per-tick update/record/playback paths.
 */
export class Simulation {
  private currentTick: number = 0;
  private isPaused: boolean = false;

  private readonly tilemap: Tilemap;
  private readonly player: Player;

  // Echo Trace Systems
  private readonly traceBuffer: TraceBuffer;
  private readonly traceRecorder: TraceRecorder;
  private readonly traceGhost: TraceGhost;
  private readonly tracePlayer: TracePlayer;

  // Level Entities
  private readonly pressurePlate: WeightSensor;
  private readonly echoDoor: EchoDoor;
  private readonly beacon: BeaconEntity;
  private readonly shards: MemoryShardEntity[];
  private readonly exitGateway: ExitGatewayEntity;

  // Active Respawn Coordinates (starts at level spawn)
  private respawnX: number = 120;
  private respawnY: number = 550;

  // Integrity & Survival (SV-01: 3 pips, 90 ticks = 1.5s invulnerability)
  private integrity: number = 3;
  private readonly maxIntegrity: number = 3;
  private invulnerableTicks: number = 0;
  private isLevelCompleted: boolean = false;
  private isDead: boolean = false;

  // Track button transitions for deterministic edge-triggering & cancel holds
  private prevTraceButton: boolean = false;
  private traceHoldTicks: number = 0;
  private prevDoorOpen: boolean = false;
  private prevJumpButton: boolean = false;

  public events: SimulationEvents = {};

  private previousState: SimulationState;
  private currentState: SimulationState;

  constructor(initialTick: number = 0) {
    this.currentTick = initialTick;
    this.tilemap = createChapter1Level();

    // Spawn player on starting gallery ledge: x = 120, y = 550
    this.player = new Player(120, 550);

    // Preallocated Echo Trace components
    this.traceBuffer = new TraceBuffer();
    this.traceRecorder = new TraceRecorder(this.traceBuffer);
    this.traceGhost = new TraceGhost();
    this.tracePlayer = new TracePlayer(this.traceBuffer, this.traceGhost);

    // Pressure Gallery Entities:
    // Pressure Plate at Col 48 (x = 1536, y = 628, width = 64, height = 12)
    this.pressurePlate = new WeightSensor('plate_1', 1536, 628, 64, 12);

    // Echo Door at Col 64 (x = 2048, y = 544, width = 24, height = 96)
    this.echoDoor = new EchoDoor('door_1', 2048, 544, 24, 96);

    // Beacon Checkpoint at Col 36 (x = 1152, y = 544)
    this.beacon = new BeaconEntity(
      'beacon_central',
      1152,
      544,
      1152,
      550,
      'Central Sanctuary Beacon'
    );

    // 4 Memory Shards distributed through level:
    this.shards = [
      new MemoryShardEntity('shard_1', 14 * 32, 16 * 32, 'Fragment I // Sound of Leaving'),
      new MemoryShardEntity(
        'shard_2',
        26 * 32,
        13 * 32,
        'Fragment II // Valley of Inaudible Bells'
      ),
      new MemoryShardEntity(
        'shard_3',
        54 * 32,
        14 * 32,
        'Fragment III // Chamber of Broken Clocks'
      ),
      new MemoryShardEntity('shard_4', 69 * 32, 16 * 32, 'Fragment IV // Salt & Threshold')
    ];

    // Exit Gateway at Col 73 (x = 2336, y = 512, width = 64, height = 96)
    this.exitGateway = new ExitGatewayEntity(2336, 512, 64, 96);

    this.currentState = this.buildSnapshot();
    this.previousState = { ...this.currentState };
  }

  private buildSnapshot(): SimulationState {
    const currentTraceState = this.traceRecorder.isRecording()
      ? 'recording'
      : this.tracePlayer.getState();

    let collectedCount = 0;
    for (let i = 0; i < this.shards.length; i++) {
      if (this.shards[i].isCollected()) collectedCount++;
    }

    return {
      tick: this.currentTick,
      running: !this.isPaused,
      player: this.player.getSnapshot(),
      ghost: this.traceGhost.getSnapshot(),
      traceStatus: {
        ...this.tracePlayer.getStatus(this.traceRecorder.getRecordedTicks()),
        state: currentTraceState
      },
      sensors: [this.pressurePlate.getSnapshot()],
      doors: [this.echoDoor.getSnapshot()],
      beacons: [this.beacon.getSnapshot()],
      shards: this.shards.map((s) => s.getSnapshot()),
      exitGateway: this.exitGateway.getSnapshot(),
      integrity: this.integrity,
      maxIntegrity: this.maxIntegrity,
      invulnerableTicks: this.invulnerableTicks,
      isLevelCompleted: this.isLevelCompleted,
      isDead: this.isDead,
      collectedShardCount: collectedCount,
      totalShardCount: this.shards.length
    };
  }

  /**
   * Advance the simulation by exactly one 60 Hz tick.
   * @param input Input snapshot for this tick.
   */
  public step(input: InputSnapshot): void {
    if (this.isPaused || this.isLevelCompleted) {
      return;
    }

    // Capture previous state for interpolation
    this.previousState = { ...this.currentState };
    this.currentTick += 1;

    // Check jump audio event
    if (input.jump && !this.prevJumpButton && this.player.isGrounded) {
      this.events.onJump?.();
    }
    this.prevJumpButton = input.jump;

    // Tick invulnerability timer
    if (this.invulnerableTicks > 0) {
      this.invulnerableTicks -= 1;
    }

    // 1. Process Echo Trace Input / Lifecycle
    this.handleTraceInput(input);

    // 2. Advance Ghost Playback / Hold / Dissolve
    this.tracePlayer.update();

    // 3. Update Player Physics (with dynamic solid obstacles, e.g. closed doors)
    this.player.update(input, this.tilemap, [this.echoDoor]);

    // 4. Sample Transform if Recording (Zero allocations)
    if (this.traceRecorder.isRecording()) {
      const autoFinished = this.traceRecorder.recordFrame(this.player);
      if (autoFinished) {
        // Reached max duration (480 ticks = 8.0 s, TR-01) -> Auto launch playback (F-T2)
        this.tracePlayer.launch();
        this.events.onTraceLaunch?.();
      }
    }

    // 5. Environmental Sensors & Puzzle Evaluation
    const playerBounds = this.player.getBounds();
    const ghostBounds = this.traceGhost.getBounds();
    const wasPlateActive = this.pressurePlate.isActive();
    const isPlateActive = this.pressurePlate.evaluate(
      playerBounds,
      this.traceGhost.active,
      ghostBounds
    );

    // Audio trigger on plate activation
    if (!wasPlateActive && isPlateActive) {
      // Plate newly activated
    }

    // Update Door state based on sensor
    this.echoDoor.update(isPlateActive);
    const isDoorOpen = this.echoDoor.isOpen();
    if (!this.prevDoorOpen && isDoorOpen) {
      this.events.onDoorStateChange?.(true);
    }
    this.prevDoorOpen = isDoorOpen;

    // 6. Check Beacon Proximity & Activation
    if (this.beacon.checkActivation(playerBounds)) {
      this.respawnX = this.beacon.respawnX;
      this.respawnY = this.beacon.respawnY;
      this.integrity = this.maxIntegrity; // Full restore at Beacon (SV-01)
      this.events.onBeaconActivate?.(this.beacon.id);
    }

    // 7. Check Memory Shard Collections
    for (let i = 0; i < this.shards.length; i++) {
      const shard = this.shards[i];
      if (shard.checkCollection(playerBounds)) {
        let collectedCount = 0;
        for (let j = 0; j < this.shards.length; j++) {
          if (this.shards[j].isCollected()) collectedCount++;
        }
        this.events.onShardCollect?.(shard.id, collectedCount);
      }
    }

    // 8. Hazard contact or Pit fall logic (SV-02, D-025)
    const isBelowWorld = this.player.y > (this.tilemap.rows - 1) * this.tilemap.tileSize;
    if (isBelowWorld && this.invulnerableTicks === 0) {
      this.takeDamage(1, true);
    }

    // 9. Exit Gateway level completion check
    if (this.exitGateway.checkTrigger(playerBounds)) {
      this.isLevelCompleted = true;
      this.events.onLevelComplete?.();
    }

    // 10. Update current snapshot
    this.currentState = this.buildSnapshot();
  }

  /**
   * Apply damage and handle death / respawn (SV-01, SV-02, D-025).
   */
  public takeDamage(amount: number = 1, fromPit: boolean = false): void {
    if (this.invulnerableTicks > 0 || this.isDead) {
      return;
    }

    this.integrity = Math.max(0, this.integrity - amount);
    this.invulnerableTicks = 90; // 1.5 s invulnerable window (SV-02)
    this.events.onDamage?.(this.integrity);

    if (this.integrity <= 0) {
      // Integrity 0: Death event (D-025)
      this.isDead = true;
      this.events.onDeath?.();

      // Clean up active trace
      this.traceRecorder.cancel();
      this.tracePlayer.reset();

      // Respawn at last Beacon with full integrity
      this.player.teleport(this.respawnX, this.respawnY);
      this.integrity = this.maxIntegrity;
      this.isDead = false;
      this.invulnerableTicks = 60; // 1.0 s grace after respawn

      // Transient room reset: reset puzzle doors & plates
      this.pressurePlate.reset();
      this.echoDoor.reset();

      this.events.onRespawn?.(this.respawnX, this.respawnY);
    } else if (fromPit) {
      // Pit fall with remaining integrity: return to active checkpoint ledge (SV-02)
      this.player.teleport(this.respawnX, this.respawnY);
      // Clean up active trace
      this.traceRecorder.cancel();
      this.tracePlayer.reset();
    }

    this.currentState = this.buildSnapshot();
  }

  private handleTraceInput(input: InputSnapshot): void {
    const traceDown = input.trace;
    const justPressed = traceDown && !this.prevTraceButton;

    if (traceDown) {
      this.traceHoldTicks += 1;
    } else {
      this.traceHoldTicks = 0;
    }

    // Cancel Recording or Playback check: Hold button for TR-05 (30 ticks = 0.5s) (F-T3)
    if (this.traceHoldTicks >= TRACE_TICKS.MIN_RECORD_TICKS) {
      if (this.traceRecorder.isRecording()) {
        this.traceRecorder.cancel();
        this.traceHoldTicks = 0;
        this.prevTraceButton = traceDown;
        return;
      } else if (
        this.tracePlayer.getState() === 'playback' ||
        this.tracePlayer.getState() === 'holding'
      ) {
        this.tracePlayer.dissolveImmediately();
        this.traceHoldTicks = 0;
        this.prevTraceButton = traceDown;
        return;
      }
    }

    if (justPressed) {
      if (this.traceRecorder.isRecording()) {
        // Toggle Stop Recording -> Launch Playback (F-T2)
        if (this.traceRecorder.getRecordedTicks() >= TRACE_TICKS.MIN_RECORD_TICKS) {
          this.traceRecorder.stop();
          this.tracePlayer.launch();
          this.events.onTraceLaunch?.();
        } else {
          // Under minimum duration (0.5 s, TR-02) -> Cancelled without replay
          this.traceRecorder.cancel();
        }
      } else if (this.tracePlayer.getState() === 'idle') {
        // Start recording
        this.traceRecorder.start(this.player);
        this.events.onTraceStart?.();
      }
    }

    this.prevTraceButton = traceDown;
  }

  public getTick(): number {
    return this.currentTick;
  }

  public getCurrentState(): SimulationState {
    return this.currentState;
  }

  public getPreviousState(): SimulationState {
    return this.previousState;
  }

  public getTilemap(): Tilemap {
    return this.tilemap;
  }

  public getPlayer(): Player {
    return this.player;
  }

  public getTraceGhost(): TraceGhost {
    return this.traceGhost;
  }

  public getTraceBuffer(): TraceBuffer {
    return this.traceBuffer;
  }

  public getTracePlayer(): TracePlayer {
    return this.tracePlayer;
  }

  public getTraceRecorder(): TraceRecorder {
    return this.traceRecorder;
  }

  public getPressurePlate(): WeightSensor {
    return this.pressurePlate;
  }

  public getEchoDoor(): EchoDoor {
    return this.echoDoor;
  }

  public getBeacon(): BeaconEntity {
    return this.beacon;
  }

  public getShards(): readonly MemoryShardEntity[] {
    return this.shards;
  }

  public getExitGateway(): ExitGatewayEntity {
    return this.exitGateway;
  }

  public getIntegrity(): number {
    return this.integrity;
  }

  public setPaused(paused: boolean): void {
    this.isPaused = paused;
    this.currentState = {
      ...this.currentState,
      running: !this.isPaused
    };
  }

  public isSimulationPaused(): boolean {
    return this.isPaused;
  }

  public reset(tick: number = 0): void {
    this.currentTick = tick;
    this.isPaused = false;
    this.isLevelCompleted = false;
    this.isDead = false;
    this.integrity = this.maxIntegrity;
    this.invulnerableTicks = 0;
    this.respawnX = 120;
    this.respawnY = 550;

    this.player.teleport(120, 550);
    this.traceRecorder.cancel();
    this.tracePlayer.reset();
    this.pressurePlate.reset();
    this.echoDoor.reset();
    this.beacon.reset();
    this.exitGateway.reset();
    for (let i = 0; i < this.shards.length; i++) {
      this.shards[i].reset(true);
    }

    this.traceHoldTicks = 0;
    this.prevTraceButton = false;
    this.currentState = this.buildSnapshot();
    this.previousState = { ...this.currentState };
  }
}
