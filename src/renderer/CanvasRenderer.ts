import { SimulationState } from '@sim/SimulationState';
import { Viewport, ViewportTransform } from './Viewport';
import { DebugOverlay, DebugMetrics } from './DebugOverlay';

export interface RendererOptions {
  canvas: HTMLCanvasElement;
  virtualWidth?: number;
  virtualHeight?: number;
}

/**
 * HTML5 Canvas 2D Renderer for ECHOES.
 *
 * Responsibilities:
 * - Handle canvas sizing and device pixel ratio adjustments without flicker.
 * - Clear canvas and present a dark, ethereal visual identity.
 * - Render title, status indicators, and technical debug HUD.
 * - Clean lifecycle disposal.
 */
export class CanvasRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly viewport: Viewport;
  private readonly debugOverlay: DebugOverlay;

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
    this.viewport = new Viewport({
      virtualWidth: options.virtualWidth ?? 1920,
      virtualHeight: options.virtualHeight ?? 1080
    });
    this.debugOverlay = new DebugOverlay();

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

    // Physical pixel dimensions
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
   * Main render method called by FixedStepLoop with interpolation alpha.
   */
  public render(
    currentState: SimulationState,
    _previousState: SimulationState,
    _alpha: number,
    fps: number,
    frameTime: number
  ): void {
    const { ctx, canvas } = this;
    const dpr = this.currentDpr;

    // Reset transform and clear entire physical canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Deep ethereal void background
    ctx.fillStyle = '#06090e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render letterboxed virtual world content
    ctx.save();
    // Apply viewport scale + DPR transform
    ctx.scale(dpr, dpr);
    ctx.translate(this.currentTransform.offsetX, this.currentTransform.offsetY);

    // Clip to virtual aspect area
    ctx.beginPath();
    ctx.rect(0, 0, this.currentTransform.cssWidth, this.currentTransform.cssHeight);
    ctx.clip();

    // Subtle dark ambient gradient in game viewport
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.currentTransform.cssHeight);
    bgGrad.addColorStop(0, '#0a0f18');
    bgGrad.addColorStop(0.5, '#0d131d');
    bgGrad.addColorStop(1, '#080c13');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.currentTransform.cssWidth, this.currentTransform.cssHeight);

    // Render faint ethereal grid lines
    this.renderAtmosphericBackground(
      ctx,
      this.currentTransform.cssWidth,
      this.currentTransform.cssHeight
    );

    // Title and Narrative Typography
    this.renderTitle(ctx, this.currentTransform.cssWidth, this.currentTransform.cssHeight);

    ctx.restore();

    // Render Debug Overlay in screen coordinates
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

  private renderAtmosphericBackground(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void {
    ctx.save();
    ctx.strokeStyle = 'rgba(74, 98, 138, 0.07)';
    ctx.lineWidth = 1;

    const gridSize = 64;
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Outer viewport border
    ctx.strokeStyle = 'rgba(100, 181, 246, 0.15)';
    ctx.strokeRect(0, 0, width, height);

    ctx.restore();
  }

  private renderTitle(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = width / 2;
    const centerY = height / 2;

    // Glowing ethereal subtext / quote
    ctx.font = 'italic 16px "Georgia", serif';
    ctx.fillStyle = 'rgba(144, 164, 174, 0.6)';
    ctx.fillText('“A memory is not yours just because you can restore it.”', centerX, centerY - 60);

    // Main Title: ECHOES
    ctx.font = '900 64px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '12px';
    ctx.fillStyle = '#E0F2FE';
    ctx.shadowColor = 'rgba(56, 189, 248, 0.45)';
    ctx.shadowBlur = 24;
    ctx.fillText('E C H O E S', centerX, centerY);

    // Subtitle
    ctx.shadowBlur = 0;
    ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillStyle = '#7DD3FC';
    ctx.fillText('THE THINGS WE CHOSE TO FORGET', centerX, centerY + 50);

    // Engine status indicator
    ctx.font = '12px "Courier New", Courier, monospace';
    ctx.letterSpacing = '2px';
    ctx.fillStyle = 'rgba(125, 211, 252, 0.4)';
    ctx.fillText('DETERMINISTIC SIMULATION CORE • 60 HZ FIXED TIMESTEP', centerX, centerY + 100);

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
