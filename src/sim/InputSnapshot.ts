export interface InputSnapshot {
  readonly moveX: number; // -1 (left), 0 (none), 1 (right)
  readonly moveY: number; // -1 (up), 0 (none), 1 (down)
  readonly jump: boolean;
  readonly ability: boolean;
  readonly pulse: boolean;
  readonly interact: boolean;
  readonly trace: boolean;
  readonly pause: boolean;
}

export const EMPTY_INPUT_SNAPSHOT: InputSnapshot = Object.freeze({
  moveX: 0,
  moveY: 0,
  jump: false,
  ability: false,
  pulse: false,
  interact: false,
  trace: false,
  pause: false
});
