import { SimulationState } from '@sim/SimulationState';
import { Tilemap, TileType } from '@sim/physics/Tilemap';
import { Viewport, ViewportTransform } from './Viewport';
import { DebugOverlay, DebugMetrics } from './DebugOverlay';
import { Camera } from './Camera';

export interface RendererOptions {
  canvas: HTMLCanvasElement;
  virtualWidth?: number;
  virtualHeight?: number;
}

/**
 * HTML5 Canvas 2D Renderer for ECHOES.
 *
 * Responsibilities:
 * - Canvas sizing & DPR scaling without flicker.
 * - Interpolated 2D Camera tracking.
 * - Graybox level geometry rendering (Solid, OneWay, Hazard, Exit Gateway).
 * - Player entity rendering with animation state & directional cue.
 * - Diagnostics HUD overlay.
 */
export class CanvasRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly viewport: Viewport;
  private readonly debugOverlay: DebugOverlay;
  private readonly camera: Camera;

  private currentTransform: ViewportTransform;
  private resizeObserver: ResizeObserver | null = null;
  private currentDpr: number = 1;

  constructor(options: RendererOptions) {
    this.canvas = options.canvas;
    const ctx = this.canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      throw new Error('Failed to acquire 2D rendering context');
    }
    this.ctx = ctx;

    const vw = options.virtualWidth ?? 1920;
    const vh = options.virtualHeight ?? 1080;

    this.viewport = new Viewport({
      virtualWidth: vw,
      virtualHeight: vh
    });
    this.debugOverlay = new DebugOverlay();

    // World size for Chapter 1 level: 80 cols * 32px = 2560, 25 rows * 32px = 800
    this.camera = new Camera({
      viewportWidth: vw,
      viewportHeight: vh,
      worldWidth: 2560,
      worldHeight: 800,
      smoothFactor: 0.1,
      lookaheadDistance: 64
    });

    this.currentTransform = this.viewport.calculateTransform(
      window.innerWidth,
      window.innerHeight,
      window.devicePixelRatio || 1
    );

    this.setupResizeHandling();
    this.setupKeyShortcuts();
    this.resizeCanvas();
  }

  private setupResizeHandling(): void {
    const parent = this.canvas.parentElement ?? document.body;
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.resizeCanvas();
      });
      this.resizeObserver.observe(parent);
    } else {
      window.addEventListener('resize', this.onWindowResize);
    }
  }

  private onWindowResize = (): void => {
    this.resizeCanvas();
  };

  private setupKeyShortcuts(): void {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'F3' || e.code === 'Backquote') {
        this.debugOverlay.toggle();
      }
    });
  }

  public resizeCanvas(): void {
    const parent = this.canvas.parentElement ?? document.body;
    const clientWidth = parent.clientWidth || window.innerWidth;
    const clientHeight = parent.clientHeight || window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    this.currentDpr = dpr;
    this.currentTransform = this.viewport.calculateTransform(clientWidth, clientHeight, dpr);

    const physicalWidth = Math.round(clientWidth * dpr);
    const physicalHeight = Math.round(clientHeight * dpr);

    if (this.canvas.width !== physicalWidth || this.canvas.height !== physicalHeight) {
      this.canvas.width = physicalWidth;
      this.canvas.height = physicalHeight;
      this.canvas.style.width = `${clientWidth}px`;
      this.canvas.style.height = `${clientHeight}px`;
    }
  }

  /**
   * Main render call interpolating between simulation ticks.
   */
  public render(
    currentState: SimulationState,
    previousState: SimulationState,
    alpha: number,
    fps: number,
    frameTime: number,
    tilemap?: Tilemap
  ): void {
    const { ctx, canvas } = this;
    const dpr = this.currentDpr;

    // 1. Interpolate Player Position
    const curP = currentState.player;
    const prevP = previousState.player ?? curP;
    const interpX = prevP.x + (curP.x - prevP.x) * alpha;
    const interpY = prevP.y + (curP.y - prevP.y) * alpha;

    // 2. Update Camera
    this.camera.update(interpX, interpY, curP.facing, curP.isGrounded);

    // 3. Clear Canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#06090e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. Render Virtual Game Viewport
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.translate(this.currentTransform.offsetX, this.currentTransform.offsetY);

    // Clip to virtual aspect boundary
    ctx.beginPath();
    ctx.rect(0, 0, this.currentTransform.cssWidth, this.currentTransform.cssHeight);
    ctx.clip();

    // Virtual resolution scale (maps virtual 1920x1080 to CSS box)
    const scaleFactor = this.currentTransform.cssWidth / this.viewport.virtualWidth;
    ctx.scale(scaleFactor, scaleFactor);

    // Subtle dark ambient backdrop
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.viewport.virtualHeight);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(0.5, '#0e1422');
    bgGrad.addColorStop(1, '#070a10');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.viewport.virtualWidth, this.viewport.virtualHeight);

    // Translate by Camera position
    ctx.save();
    ctx.translate(-Math.round(this.camera.x), -Math.round(this.camera.y));

    // Render Atmospheric Background Grid in World Space
    this.renderAtmosphericGrid(ctx, 1920, 800);

    // Render Tilemap Level Geometry
    if (tilemap) {
      this.renderTilemap(ctx, tilemap);
    }

    // Render Puzzle Entities (Pressure Plate & Echo Door)
    this.renderPuzzleEntities(ctx, currentState);

    // Render Echo Ghost (translucent, ethereal, distinct from player)
    if (currentState.ghost && currentState.ghost.active) {
      const prevG = previousState.ghost;
      const curG = currentState.ghost;
      const ghostInterpX = prevG.x + (curG.x - prevG.x) * alpha;
      const ghostInterpY = prevG.y + (curG.y - prevG.y) * alpha;
      this.renderGhost(ctx, ghostInterpX, ghostInterpY, curG);
    }

    // Render Player
    this.renderPlayer(ctx, interpX, interpY, curP);

    ctx.restore(); // Restore camera translation

    // Render Viewport Frame border
    ctx.strokeStyle = 'rgba(100, 181, 246, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, this.viewport.virtualWidth, this.viewport.virtualHeight);

    ctx.restore(); // Restore viewport scale

    // 5. Render Diagnostics Overlay
    ctx.save();
    ctx.scale(dpr, dpr);
    const metrics: DebugMetrics = {
      tick: currentState.tick,
      fps,
      frameTime,
      isPaused: !currentState.running,
      dpr,
      canvasSize: { width: canvas.width, height: canvas.height }
    };
    this.debugOverlay.render(ctx, metrics);
    ctx.restore();
  }

  private renderAtmosphericGrid(ctx: CanvasRenderingContext2D, w: number, h: number): void {
    ctx.save();
    ctx.strokeStyle = 'rgba(74, 98, 138, 0.08)';
    ctx.lineWidth = 1;
    const gridSize = 64;

    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  private renderTilemap(ctx: CanvasRenderingContext2D, map: Tilemap): void {
    const ts = map.tileSize;

    for (let r = 0; r < map.rows; r++) {
      for (let c = 0; c < map.cols; c++) {
        const tile = map.data[r * map.cols + c];
        if (tile === TileType.Empty) continue;

        const x = c * ts;
        const y = r * ts;

        if (tile === TileType.Solid) {
          // Dark obsidian stone slab
          ctx.fillStyle = '#171c2b';
          ctx.fillRect(x, y, ts, ts);

          // Top highlight
          ctx.fillStyle = '#2a334d';
          ctx.fillRect(x, y, ts, 2);

          // Subtle inner border
          ctx.strokeStyle = 'rgba(100, 181, 246, 0.12)';
          ctx.strokeRect(x + 0.5, y + 0.5, ts - 1, ts - 1);
        } else if (tile === TileType.OneWay) {
          // Lighter semi-transparent platform with amber accent
          ctx.fillStyle = 'rgba(220, 195, 155, 0.35)';
          ctx.fillRect(x, y, ts, 6);
          ctx.strokeStyle = '#dcc39b';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, ts, 6);
        } else if (tile === TileType.Hazard) {
          // Hazard spike bed
          ctx.fillStyle = '#e57373';
          ctx.beginPath();
          ctx.moveTo(x, y + ts);
          ctx.lineTo(x + ts / 2, y + ts / 2);
          ctx.lineTo(x + ts, y + ts);
          ctx.fill();
        }
      }
    }
  }

  private renderPuzzleEntities(ctx: CanvasRenderingContext2D, state: SimulationState): void {
    // 1. Pressure Plates (TR-08, F-T11)
    for (const sensor of state.sensors) {
      ctx.save();
      const isActive = sensor.isActive;

      // Diegetic palette: surface-container-high / secondary-fixed-dim (#dcc39b)
      ctx.fillStyle = isActive ? 'rgba(220, 195, 155, 0.45)' : '#1b1e32';
      ctx.strokeStyle = isActive ? '#dcc39b' : '#46464c';
      ctx.lineWidth = 1.5;

      if (isActive) {
        ctx.shadowColor = 'rgba(220, 195, 155, 0.35)';
        ctx.shadowBlur = 6;
      }

      ctx.beginPath();
      ctx.roundRect(sensor.x, sensor.y, sensor.width, sensor.height, 3);
      ctx.fill();
      ctx.stroke();

      // Mechanical contact pins
      ctx.fillStyle = isActive ? '#f9dfb6' : '#303349';
      ctx.fillRect(sensor.x + 8, sensor.y + 2, 6, sensor.height - 4);
      ctx.fillRect(sensor.x + sensor.width - 14, sensor.y + 2, 6, sensor.height - 4);

      // Diegetic label indicator in archival font
      ctx.shadowBlur = 0;
      ctx.fillStyle = isActive ? '#f9dfb6' : '#919097';
      ctx.font = '10px "Courier New", monospace';
      ctx.fillText(isActive ? 'RESONATING' : 'PRESSURE SENSOR', sensor.x, sensor.y - 8);
      ctx.restore();
    }

    // 2. Echo Doors
    for (const door of state.doors) {
      ctx.save();
      const openPct = door.openProgress;
      const closedH = door.height * (1.0 - openPct);

      if (closedH > 2) {
        // Door slab retracts upward - Dark Obsidian Slab with Muted Secondary Hue
        ctx.fillStyle = '#111322';
        ctx.strokeStyle = '#5c5d6f';
        ctx.lineWidth = 2;

        ctx.shadowColor = 'rgba(196, 197, 218, 0.2)';
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.roundRect(door.x, door.y, door.width, closedH, 3);
        ctx.fill();
        ctx.stroke();

        // Architectural lattice hashes
        ctx.strokeStyle = 'rgba(196, 197, 218, 0.15)';
        ctx.lineWidth = 1;
        for (let y = door.y + 8; y < door.y + closedH - 4; y += 12) {
          ctx.beginPath();
          ctx.moveTo(door.x + 4, y);
          ctx.lineTo(door.x + door.width - 4, y);
          ctx.stroke();
        }
      }

      // Arch frame top
      ctx.fillStyle = '#171a2e';
      ctx.fillRect(door.x - 4, door.y - 8, door.width + 8, 8);
      ctx.strokeStyle = '#46464c';
      ctx.strokeRect(door.x - 4, door.y - 8, door.width + 8, 8);

      // Status indicator light: Muted amber when closed, soft green when passable
      ctx.fillStyle = door.isPassable ? '#81C784' : '#dcc39b';
      ctx.beginPath();
      ctx.arc(door.x + door.width / 2, door.y - 4, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // 3. Beacons (Checkpoints)
    for (const b of state.beacons) {
      ctx.save();
      const isActive = b.isActive;

      // Base Pillar
      ctx.fillStyle = '#171a2e';
      ctx.strokeStyle = isActive ? '#dcc39b' : '#46464c';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.roundRect(b.x, b.y + 16, b.width, b.height - 16, 4);
      ctx.fill();
      ctx.stroke();

      // Beacon Resonant Crystal
      ctx.fillStyle = isActive ? '#f9dfb6' : '#5c5d6f';
      if (isActive) {
        ctx.shadowColor = 'rgba(249, 223, 182, 0.7)';
        ctx.shadowBlur = 12;
      }
      ctx.beginPath();
      ctx.moveTo(b.x + b.width / 2, b.y);
      ctx.lineTo(b.x + b.width - 4, b.y + 14);
      ctx.lineTo(b.x + 4, b.y + 14);
      ctx.closePath();
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.fillStyle = isActive ? '#f9dfb6' : '#919097';
      ctx.font = '10px "Courier New", monospace';
      ctx.fillText(isActive ? 'BEACON ACTIVE' : 'BEACON', b.x - 8, b.y - 6);
      ctx.restore();
    }

    // 4. Memory Shards
    for (const s of state.shards) {
      if (s.collected) continue;
      ctx.save();
      // Floating Shard Diamond
      ctx.fillStyle = '#dcc39b';
      ctx.strokeStyle = '#f9dfb6';
      ctx.lineWidth = 1.5;

      ctx.shadowColor = 'rgba(220, 195, 155, 0.6)';
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.moveTo(s.x + s.width / 2, s.y);
      ctx.lineTo(s.x + s.width, s.y + s.height / 2);
      ctx.lineTo(s.x + s.width / 2, s.y + s.height);
      ctx.lineTo(s.x, s.y + s.height / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#f9dfb6';
      ctx.font = '9px "Courier New", monospace';
      ctx.fillText('SHARD', s.x - 2, s.y - 4);
      ctx.restore();
    }

    // 5. Exit Gateway / Nexus Arch
    if (state.exitGateway) {
      const g = state.exitGateway;
      ctx.save();
      const isWon = state.isLevelCompleted;

      ctx.strokeStyle = isWon ? '#81C784' : '#dcc39b';
      ctx.lineWidth = 2;
      ctx.fillStyle = isWon ? 'rgba(129, 199, 132, 0.25)' : 'rgba(220, 195, 155, 0.15)';

      if (isWon) {
        ctx.shadowColor = 'rgba(129, 199, 132, 0.6)';
        ctx.shadowBlur = 16;
      }

      ctx.strokeRect(g.x, g.y, g.width, g.height);
      ctx.fillRect(g.x, g.y, g.width, g.height);

      ctx.shadowBlur = 0;
      ctx.fillStyle = isWon ? '#81C784' : '#dcc39b';
      ctx.font = 'bold 11px "Courier New", monospace';
      ctx.fillText(isWon ? 'COMPLETED' : 'NEXUS ARCH', g.x + 2, g.y - 8);
      ctx.restore();
    }
  }

  private renderGhost(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    ghost: SimulationState['ghost']
  ): void {
    ctx.save();
    const w = ghost.width;
    const h = ghost.height;
    ctx.globalAlpha = ghost.opacity;

    // Atmospheric warm memory haze (secondary token #dcc39b / tertiary #bdcabb)
    ctx.shadowColor = 'rgba(220, 195, 155, 0.4)';
    ctx.shadowBlur = 8;

    // Ghost body: Ethereal parchment outline with dark translucent fill
    ctx.fillStyle = 'rgba(23, 26, 46, 0.45)';
    ctx.strokeStyle = ghost.isHolding ? '#f9dfb6' : '#dcc39b';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 6);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Ghost Core (Holding pulses warm gold, regular pulses archival silver)
    ctx.fillStyle = ghost.isHolding ? '#f9dfb6' : '#bdcabb';
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h * 0.4, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Direction Visor
    ctx.fillStyle = '#dfe1fc';
    const eyeX = ghost.facing === 'right' ? x + w - 7 : x + 3;
    ctx.fillRect(eyeX, y + 10, 4, 4);

    // If holding pose, render subtle archival glyph ring above head
    if (ghost.isHolding) {
      ctx.strokeStyle = '#dcc39b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x + w / 2, y - 8, 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  private renderPlayer(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    player: SimulationState['player']
  ): void {
    ctx.save();
    const w = player.width;
    const h = player.height;

    // Glowing ethereal halo / shadow
    ctx.shadowColor = 'rgba(100, 181, 246, 0.6)';
    ctx.shadowBlur = 12;

    // Body Capsule (Dark Slate with Cyan border)
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#64B5F6';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 6);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Inner Core / Heart Indicator
    ctx.fillStyle = player.isGrounded ? '#81C784' : '#FFB74D';
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h * 0.4, 4, 0, Math.PI * 2);
    ctx.fill();

    // Eye / Direction Visor
    ctx.fillStyle = '#E0F2FE';
    const eyeX = player.facing === 'right' ? x + w - 7 : x + 3;
    ctx.fillRect(eyeX, y + 10, 4, 4);

    ctx.restore();
  }

  public dispose(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    window.removeEventListener('resize', this.onWindowResize);
  }
}
