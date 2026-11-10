import { AABB, createAABB } from '../physics/AABB';
import { TraceBuffer } from './TraceBuffer';
import { MovementState, FacingDirection } from '../entities/Player';

export interface GhostSnapshot {
  readonly active: boolean;
  readonly x: number;
  readonly y: number;
  readonly prevX: number;
  readonly prevY: number;
  readonly facing: FacingDirection;
  readonly state: MovementState;
  readonly isGrounded: boolean;
  readonly width: number;
  readonly height: number;
  readonly opacity: number;
  readonly isHolding: boolean;
  readonly isDissolving: boolean;
}

function idToMovementState(id: number): MovementState {
  switch (id) {
    case 0:
      return 'idle';
    case 1:
      return 'running';
    case 2:
      return 'jumping';
    case 3:
      return 'falling';
    default:
      return 'idle';
  }
}

/**
 * TraceGhost:
 * Kinematic entity that follows recorded transforms.
 *
 * Collision & Physics Rules (F-T10, F-T11):
 * - Ignores ordinary solid-world geometry and passes through solid blocks.
 * - Does not push or block the living player.
 * - DOES provide weight to compatible environmental sensors (WeightSensor, PressurePlate).
 * - Translucent and ethereal in appearance.
 */
export class TraceGhost {
  public x: number = 0;
  public y: number = 0;
  public prevX: number = 0;
  public prevY: number = 0;
  public facing: FacingDirection = 'right';
  public state: MovementState = 'idle';
  public isGrounded: boolean = false;

  public active: boolean = false;
  public opacity: number = 0.65;
  public isHolding: boolean = false;
  public isDissolving: boolean = false;

  public readonly width: number = 24;
  public readonly height: number = 48;

  public getBounds(): AABB {
    return createAABB(this.x, this.y, this.width, this.height);
  }

  public setFrame(
    buffer: TraceBuffer,
    frameIndex: number,
    opacity: number = 0.65,
    isHolding: boolean = false,
    isDissolving: boolean = false
  ): void {
    this.prevX = this.x;
    this.prevY = this.y;

    this.x = buffer.getX(frameIndex);
    this.y = buffer.getY(frameIndex);
    this.facing = buffer.getFacing(frameIndex);
    this.state = idToMovementState(buffer.getStateId(frameIndex));
    this.isGrounded = buffer.isGrounded(frameIndex);

    this.active = true;
    this.opacity = opacity;
    this.isHolding = isHolding;
    this.isDissolving = isDissolving;
  }

  public deactivate(): void {
    this.active = false;
    this.opacity = 0;
    this.isHolding = false;
    this.isDissolving = false;
  }

  public getSnapshot(): GhostSnapshot {
    return {
      active: this.active,
      x: this.x,
      y: this.y,
      prevX: this.prevX,
      prevY: this.prevY,
      facing: this.facing,
      state: this.state,
      isGrounded: this.isGrounded,
      width: this.width,
      height: this.height,
      opacity: this.opacity,
      isHolding: this.isHolding,
      isDissolving: this.isDissolving
    };
  }
}
