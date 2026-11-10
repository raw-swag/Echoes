import { InputSnapshot } from './InputSnapshot';
import { SimulationState, createInitialSimulationState } from './SimulationState';

/**
 * Pure deterministic simulation engine.
 *
 * Rules:
 * - ZERO DOM, Canvas, window, or document dependencies.
 * - Updates only in fixed integer ticks.
 * - Receives input strictly via InputSnapshot.
 */
export class Simulation {
  private currentTick: number = 0;
  private isPaused: boolean = false;

  private previousState: SimulationState;
  private currentState: SimulationState;

  constructor(initialTick: number = 0) {
    this.currentTick = initialTick;
    this.currentState = {
      tick: initialTick,
      running: true
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

    // Handle pause request from input
    if (input.pause) {
      // In a full game, pause toggles or enters pause menu
    }

    this.currentState = {
      tick: this.currentTick,
      running: !this.isPaused
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
    this.currentState = createInitialSimulationState();
    this.previousState = { ...this.currentState };
  }
}
