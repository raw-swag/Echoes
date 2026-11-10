export interface CameraConfig {
  readonly viewportWidth: number;
  readonly viewportHeight: number;
  readonly worldWidth: number;
  readonly worldHeight: number;
  readonly smoothFactor: number;
  readonly lookaheadDistance: number;
}

/**
 * 2D Gameplay Camera.
 *
 * Responsibilities:
 * - Focus on player target position with deterministic smoothing.
 * - Gentle horizontal lookahead in player facing direction.
 * - Clamp smoothly inside world bounds.
 * - Does NOT affect pure simulation state.
 */
export class Camera {
  public x: number = 0;
  public y: number = 0;

  private targetX: number = 0;
  private targetY: number = 0;

  public readonly config: CameraConfig;

  constructor(config: CameraConfig) {
    this.config = config;
    this.x = 0;
    this.y = 0;
  }

  public update(
    playerX: number,
    playerY: number,
    facing: 'left' | 'right',
    isGrounded: boolean
  ): void {
    const lookahead =
      facing === 'right' ? this.config.lookaheadDistance : -this.config.lookaheadDistance;

    // Desired center on player + lookahead
    let desiredX = playerX + lookahead - this.config.viewportWidth / 2;
    let desiredY = playerY - this.config.viewportHeight * 0.6; // Keep player in lower-middle section

    // Clamp within world bounds
    const maxX = Math.max(0, this.config.worldWidth - this.config.viewportWidth);
    const maxY = Math.max(0, this.config.worldHeight - this.config.viewportHeight);

    desiredX = Math.max(0, Math.min(maxX, desiredX));
    desiredY = Math.max(0, Math.min(maxY, desiredY));

    this.targetX = desiredX;
    this.targetY = desiredY;

    // Deterministic smoothing (exponential decay)
    const factor = isGrounded ? this.config.smoothFactor : this.config.smoothFactor * 0.8;
    this.x += (this.targetX - this.x) * factor;
    this.y += (this.targetY - this.y) * factor;
  }

  public reset(playerX: number, playerY: number): void {
    this.x = Math.max(0, playerX - this.config.viewportWidth / 2);
    this.y = Math.max(0, playerY - this.config.viewportHeight * 0.6);
  }
}
