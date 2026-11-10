import { InputSnapshot } from './InputSnapshot';
import { SimulationState, createInitialSimulationState } from './SimulationState';
import { Player } from './entities/Player';
import { Tilemap } from './physics/Tilemap';
import { createPressureGalleryRoom } from './world/PressureGalleryRoom';
import { TraceBuffer } from './echo/TraceBuffer';
import { TraceRecorder } from './echo/TraceRecorder';
import { TraceGhost } from './echo/TraceGhost';
import { TracePlayer } from './echo/TracePlayer';
import { WeightSensor } from './echo/WeightSensor';
import { EchoDoor } from './echo/EchoDoor';
import { TRACE_TICKS } from './echo/TraceConfig';

/**
 * Pure deterministic simulation engine with Echo Trace (M3).
 *
 * Rules:
 * - ZERO DOM, Canvas, window, or document dependencies.
 * - Updates only in fixed integer ticks at 60 Hz.
 * - Receives input strictly via InputSnapshot.
 * - Zero memory allocations on per-tick update/record/playback paths.
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

  // Environmental Puzzle Entities
  private readonly pressurePlate: WeightSensor;
  private readonly echoDoor: EchoDoor;

  // Track button transitions for deterministic edge-triggering & cancel holds
  private prevTraceButton: boolean = false;
  private traceHoldTicks: number = 0;

  private previousState: SimulationState;
  private currentState: SimulationState;

  constructor(initialTick: number = 0) {
    this.currentTick = initialTick;
    this.tilemap = createPressureGalleryRoom();

    // Spawn player on starting gallery ledge: x = 120, y = 550
    this.player = new Player(120, 550);

    // Preallocated Echo Trace components
    this.traceBuffer = new TraceBuffer();
    this.traceRecorder = new TraceRecorder(this.traceBuffer);
    this.traceGhost = new TraceGhost();
    this.tracePlayer = new TracePlayer(this.traceBuffer, this.traceGhost);

    // Pressure Gallery Entities:
    // Pressure Plate at Col 20 (x = 640, y = 628, width = 64, height = 12)
    this.pressurePlate = new WeightSensor('plate_1', 640, 628, 64, 12);

    // Echo Door at Col 38 (x = 1216, y = 544, width = 24, height = 96)
    this.echoDoor = new EchoDoor('door_1', 1216, 544, 24, 96);

    this.currentState = {
      tick: initialTick,
      running: true,
      player: this.player.getSnapshot(),
      ghost: this.traceGhost.getSnapshot(),
      traceStatus: this.tracePlayer.getStatus(this.traceRecorder.getRecordedTicks()),
      sensors: [this.pressurePlate.getSnapshot()],
      doors: [this.echoDoor.getSnapshot()]
    };
    this.previousState = { ...this.currentState };
  }

  /**
   * Advance the simulation by exactly one 60 Hz tick.
   * @param input Input snapshot for this tick.
   */
  public step(input: InputSnapshot): void {
    if (this.isPaused) {
      return;
    }

    // Capture previous state for interpolation
    this.previousState = { ...this.currentState };

    this.currentTick += 1;

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
      }
    }

    // 5. Environmental Sensors & Puzzle Evaluation
    const playerBounds = this.player.getBounds();
    const ghostBounds = this.traceGhost.getBounds();
    const isPlateActive = this.pressurePlate.evaluate(
      playerBounds,
      this.traceGhost.active,
      ghostBounds
    );

    // Update Door state based on sensor
    this.echoDoor.update(isPlateActive);

    // 6. Hazard reset logic
    if (this.player.y > (this.tilemap.rows - 1) * this.tilemap.tileSize) {
      this.player.teleport(120, 550);
    }

    // 7. Update current snapshot
    const currentTraceState = this.traceRecorder.isRecording()
      ? 'recording'
      : this.tracePlayer.getState();

    this.currentState = {
      tick: this.currentTick,
      running: !this.isPaused,
      player: this.player.getSnapshot(),
      ghost: this.traceGhost.getSnapshot(),
      traceStatus: {
        ...this.tracePlayer.getStatus(this.traceRecorder.getRecordedTicks()),
        state: currentTraceState
      },
      sensors: [this.pressurePlate.getSnapshot()],
      doors: [this.echoDoor.getSnapshot()]
    };
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
        } else {
          // Under minimum duration (0.5 s, TR-02) -> Cancelled without replay
          this.traceRecorder.cancel();
        }
      } else if (this.tracePlayer.getState() === 'idle') {
        // Start recording
        this.traceRecorder.start(this.player);
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
    this.player.teleport(120, 550);
    this.traceRecorder.cancel();
    this.tracePlayer.reset();
    this.pressurePlate.reset();
    this.echoDoor.reset();
    this.traceHoldTicks = 0;
    this.prevTraceButton = false;
    this.currentState = createInitialSimulationState(this.tilemap, 120, 550);
    this.previousState = { ...this.currentState };
  }
}
