export enum InputAction {
  MoveLeft = 'MoveLeft',
  MoveRight = 'MoveRight',
  MoveUp = 'MoveUp',
  MoveDown = 'MoveDown',
  Jump = 'Jump',
  Ability = 'Ability',
  Pulse = 'Pulse',
  Interact = 'Interact',
  Trace = 'Trace',
  Pause = 'Pause'
}

export type KeyBindings = Record<string, InputAction>;

/**
 * Default Keyboard bindings per docs/02_GAME_DESIGN_DOCUMENT.md §5
 */
export const DEFAULT_KEY_BINDINGS: KeyBindings = {
  KeyA: InputAction.MoveLeft,
  ArrowLeft: InputAction.MoveLeft,
  KeyD: InputAction.MoveRight,
  ArrowRight: InputAction.MoveRight,
  KeyW: InputAction.MoveUp,
  ArrowUp: InputAction.MoveUp,
  KeyS: InputAction.MoveDown,
  ArrowDown: InputAction.MoveDown,
  Space: InputAction.Jump,
  ShiftLeft: InputAction.Ability,
  KeyJ: InputAction.Pulse,
  KeyF: InputAction.Interact,
  KeyE: InputAction.Trace,
  Escape: InputAction.Pause
};

/**
 * Default Gamepad button mapping (Standard Gamepad)
 */
export const DEFAULT_GAMEPAD_BUTTONS: Record<number, InputAction> = {
  0: InputAction.Jump, // Button 0 (A / Cross)
  1: InputAction.Ability, // Button 1 (B / Circle)
  2: InputAction.Pulse, // Button 2 (X / Square)
  3: InputAction.Interact, // Button 3 (Y / Triangle)
  7: InputAction.Trace, // Right trigger
  9: InputAction.Pause, // Start
  12: InputAction.MoveUp, // D-pad up
  13: InputAction.MoveDown, // D-pad down
  14: InputAction.MoveLeft, // D-pad left
  15: InputAction.MoveRight // D-pad right
};
