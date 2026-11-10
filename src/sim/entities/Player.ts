import { InputSnapshot } from '../InputSnapshot';
import { AABB, createAABB } from '../physics/AABB';
import { Tilemap } from '../physics/Tilemap';
import { resolveMovement, DynamicObstacle } from '../physics/CollisionSolver';
import { MovementConfig, DEFAULT_MOVEMENT_CONFIG } from './MovementConfig';

export type MovementState = 'idle' | 'running' | 'jumping' | 'falling';
export type FacingDirection = 'left' | 'right';

export interface PlayerSnapshot {
  readonly x: number;
  readonly y: number;
  readonly prevX: number;
  readonly prevY: number;
  readonly vx: number;
  readonly vy: number;
  readonly isGrounded: boolean;
  readonly facing: FacingDirection;
  readonly state: MovementState;
  readonly width: number;
  readonly height: number;
}

export class Player {
  public x: number;
  public y: number;
  public prevX: number;
  public prevY: number;
  public vx: number = 0;
  public vy: number = 0;

  public isGrounded: boolean = false;
  public facing: FacingDirection = 'right';
  public state: MovementState = 'idle';

  private coyoteTimer: number = 0;
  private jumpBufferTimer: number = 0;
  private dropThroughTimer: number = 0;
  private jumpHeld: boolean = false;

  public readonly config: MovementConfig;

  constructor(x: number, y: number, config: MovementConfig = DEFAULT_MOVEMENT_CONFIG) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.config = config;
  }

  public getBounds(): AABB {
    return createAABB(this.x, this.y, this.config.width, this.config.height);
  }

  public getSnapshot(): PlayerSnapshot {
    return {
      x: this.x,
      y: this.y,
      prevX: this.prevX,
      prevY: this.prevY,
      vx: this.vx,
      vy: this.vy,
      isGrounded: this.isGrounded,
      facing: this.facing,
      state: this.state,
      width: this.config.width,
      height: this.config.height
    };
  }

  /**
   * Deterministic simulation tick update (60 Hz).
   */
  public update(
    input: InputSnapshot,
    tilemap: Tilemap,
    dynamicObstacles: readonly DynamicObstacle[] = []
  ): void {
    this.prevX = this.x;
    this.prevY = this.y;

    const cfg = this.config;

    // 1. Timers
    if (this.isGrounded) {
      this.coyoteTimer = cfg.coyoteTimeTicks;
    } else if (this.coyoteTimer > 0) {
      this.coyoteTimer -= 1;
    }

    if (input.jump && !this.jumpHeld) {
      this.jumpBufferTimer = cfg.jumpBufferTicks;
    } else if (this.jumpBufferTimer > 0) {
      this.jumpBufferTimer -= 1;
    }
    this.jumpHeld = input.jump;

    if (this.dropThroughTimer > 0) {
      this.dropThroughTimer -= 1;
    }

    // 2. Drop-through one-way platform: Down + Jump
    if (input.moveY > 0 && input.jump) {
      this.dropThroughTimer = cfg.dropThroughIgnoreTicks;
      this.isGrounded = false;
      this.coyoteTimer = 0;
    }

    // 3. Horizontal Acceleration / Deceleration
    const targetMove = input.moveX;
    if (targetMove !== 0) {
      this.facing = targetMove > 0 ? 'right' : 'left';
      const accel = this.isGrounded ? cfg.groundAccel : cfg.airAccel;
      if (targetMove > 0) {
        this.vx = Math.min(cfg.maxRunSpeed, this.vx + accel);
      } else {
        this.vx = Math.max(-cfg.maxRunSpeed, this.vx - accel);
      }
    } else {
      // Decelerate toward 0
      const decel = this.isGrounded ? cfg.groundDecel : cfg.airDecel;
      if (this.vx > 0) {
        this.vx = Math.max(0, this.vx - decel);
      } else if (this.vx < 0) {
        this.vx = Math.min(0, this.vx + decel);
      }
    }

    // 4. Jumping
    const canJump = this.coyoteTimer > 0 && this.dropThroughTimer === 0;
    let justJumped = false;
    if (this.jumpBufferTimer > 0 && canJump) {
      this.vy = cfg.jumpVelocity;
      this.isGrounded = false;
      this.coyoteTimer = 0;
      this.jumpBufferTimer = 0;
      justJumped = true;
    }

    // Variable jump height: cut upward velocity if jump button is released early
    if (!input.jump && this.vy < 0 && !justJumped) {
      this.vy *= cfg.jumpCancelFactor;
    }

    // 5. Gravity & Terminal Velocity (apply unless jumped on this exact tick)
    if (!justJumped) {
      this.vy = Math.min(cfg.maxFallSpeed, this.vy + cfg.gravity);
    }

    // 6. Collision Resolution
    const box = this.getBounds();
    const collision = resolveMovement(
      box,
      this.vx,
      this.vy,
      tilemap,
      this.dropThroughTimer > 0,
      dynamicObstacles
    );

    this.x = collision.x;
    this.y = collision.y;
    this.vx = collision.vx;
    this.vy = collision.vy;
    this.isGrounded = collision.isGrounded;

    // Reset drop-through when safely past or landed
    if (this.isGrounded && this.dropThroughTimer > 0) {
      this.dropThroughTimer = 0;
    }

    // 7. Determine Movement State
    if (!this.isGrounded) {
      this.state = this.vy < 0 ? 'jumping' : 'falling';
    } else if (Math.abs(this.vx) > 0.1) {
      this.state = 'running';
    } else {
      this.state = 'idle';
    }
  }

  public teleport(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.vx = 0;
    this.vy = 0;
    this.isGrounded = false;
  }
}
