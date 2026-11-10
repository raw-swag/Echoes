import { InputSnapshot } from '@sim/InputSnapshot';
import {
  InputAction,
  KeyBindings,
  DEFAULT_KEY_BINDINGS,
  DEFAULT_GAMEPAD_BUTTONS
} from './InputActions';

export interface InputServiceOptions {
  keyBindings?: KeyBindings;
  deadzone?: number;
}

/**
 * Browser input adapter service.
 *
 * Responsibilities:
 * - Listen to KeyboardEvent.code.
 * - Poll standard Gamepad API.
 * - Safely reset stuck keys on window blur.
 * - Generate immutable, pure InputSnapshots consumed by the simulation.
 */
export class InputService {
  private readonly keyBindings: KeyBindings;
  private readonly deadzone: number;

  private readonly activeKeys = new Set<string>();
  private readonly activeActions = new Set<InputAction>();

  private attached = false;

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    // Only capture game keys if not in an input field
    const target = event.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }

    this.activeKeys.add(event.code);
    const action = this.keyBindings[event.code];
    if (action) {
      this.activeActions.add(action);
      // Prevent browser default scroll for game controls
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault();
      }
    }
  };

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    this.activeKeys.delete(event.code);
    const action = this.keyBindings[event.code];
    if (action) {
      // Check if any other pressed key maps to the same action
      let stillActive = false;
      for (const code of this.activeKeys) {
        if (this.keyBindings[code] === action) {
          stillActive = true;
          break;
        }
      }
      if (!stillActive) {
        this.activeActions.delete(action);
      }
    }
  };

  private readonly onBlur = (): void => {
    this.reset();
  };

  constructor(options: InputServiceOptions = {}) {
    this.keyBindings = options.keyBindings ?? DEFAULT_KEY_BINDINGS;
    this.deadzone = options.deadzone ?? 0.2;
  }

  public attach(target: EventTarget = window): void {
    if (this.attached || !target) {
      return;
    }
    target.addEventListener('keydown', this.onKeyDown as EventListener);
    target.addEventListener('keyup', this.onKeyUp as EventListener);
    target.addEventListener('blur', this.onBlur as EventListener);
    this.attached = true;
  }

  public detach(target: EventTarget = window): void {
    if (!this.attached || !target) {
      return;
    }
    target.removeEventListener('keydown', this.onKeyDown as EventListener);
    target.removeEventListener('keyup', this.onKeyUp as EventListener);
    target.removeEventListener('blur', this.onBlur as EventListener);
    this.reset();
    this.attached = false;
  }

  public reset(): void {
    this.activeKeys.clear();
    this.activeActions.clear();
  }

  public isActionActive(action: InputAction): boolean {
    return this.activeActions.has(action);
  }

  /**
   * Sample the combined keyboard and gamepad state to produce an InputSnapshot for this tick.
   */
  public poll(): InputSnapshot {
    let moveX = 0;
    let moveY = 0;

    let jump = this.activeActions.has(InputAction.Jump);
    let ability = this.activeActions.has(InputAction.Ability);
    let pulse = this.activeActions.has(InputAction.Pulse);
    let interact = this.activeActions.has(InputAction.Interact);
    let trace = this.activeActions.has(InputAction.Trace);
    let pause = this.activeActions.has(InputAction.Pause);

    if (this.activeActions.has(InputAction.MoveLeft)) moveX -= 1;
    if (this.activeActions.has(InputAction.MoveRight)) moveX += 1;
    if (this.activeActions.has(InputAction.MoveUp)) moveY -= 1;
    if (this.activeActions.has(InputAction.MoveDown)) moveY += 1;

    // Poll Gamepad if supported and connected
    if (typeof navigator !== 'undefined' && typeof navigator.getGamepads === 'function') {
      const gamepads = navigator.getGamepads();
      for (let i = 0; i < gamepads.length; i++) {
        const gp = gamepads[i];
        if (!gp || !gp.connected) continue;

        // Stick axes
        const axisX = gp.axes[0] ?? 0;
        const axisY = gp.axes[1] ?? 0;

        if (Math.abs(axisX) > this.deadzone) {
          moveX = axisX > 0 ? 1 : -1;
        }
        if (Math.abs(axisY) > this.deadzone) {
          moveY = axisY > 0 ? 1 : -1;
        }

        // Standard buttons
        for (const [btnIndexStr, action] of Object.entries(DEFAULT_GAMEPAD_BUTTONS)) {
          const btnIndex = Number(btnIndexStr);
          const btn = gp.buttons[btnIndex];
          if (btn && (btn.pressed || btn.value > 0.5)) {
            switch (action) {
              case InputAction.Jump:
                jump = true;
                break;
              case InputAction.Ability:
                ability = true;
                break;
              case InputAction.Pulse:
                pulse = true;
                break;
              case InputAction.Interact:
                interact = true;
                break;
              case InputAction.Trace:
                trace = true;
                break;
              case InputAction.Pause:
                pause = true;
                break;
              case InputAction.MoveLeft:
                moveX = -1;
                break;
              case InputAction.MoveRight:
                moveX = 1;
                break;
              case InputAction.MoveUp:
                moveY = -1;
                break;
              case InputAction.MoveDown:
                moveY = 1;
                break;
            }
          }
        }

        // First active gamepad is sufficient for single-player
        break;
      }
    }

    return {
      moveX,
      moveY,
      jump,
      ability,
      pulse,
      interact,
      trace,
      pause
    };
  }
}
