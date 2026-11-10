import { InputSnapshot } from './InputSnapshot';
import { SimulationState, createInitialSimulationState } from './SimulationState';
import { Player } from './entities/Player';
import { Tilemap } from './physics/Tilemap';
import { createGrayboxRoom } from './world/GrayboxRoom';

/**
 * Pure deterministic simulation engine.
 *
 * Rules:
 * - ZERO DOM, Canvas, window, or document dependencies.
 * - Updates only in fixed integer ticks at 60 Hz.
 * - Receives input strictly via InputSnapshot.
 */
export class Simulation {
  private currentTick: number = 0;
  private isPaused: boolean = false;

  private readonly tilemap: Tilemap;
  private readonly player: Player;

  private previousState: SimulationState;
  private currentState: SimulationState;

  constructor(initialTick: number = 0) {
    this.currentTick = initialTick;
    this.tilemap = createGrayboxRoom();

    // Spawn player safely on the flat starting platform (x = 120, y = 550)
    this.player = new Player(120, 550);

    this.currentState = {
      tick: initialTick,
      running: true,
      player: this.player.getSnapshot()
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

    // Advance deterministic player physics
    this.player.update(input, this.tilemap);

    // Hazard reset logic: if fallen below bounds or hit hazard, respawn at ledge
    if (this.player.y > (this.tilemap.rows - 1) * this.tilemap.tileSize) {
      this.player.teleport(120, 550);
    }

    this.currentState = {
      tick: this.currentTick,
      running: !this.isPaused,
      player: this.player.getSnapshot()
    };
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
    this.currentState = createInitialSimulationState(this.tilemap, 120, 550);
    this.previousState = { ...this.currentState };
  }
}
