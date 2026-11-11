export interface DebugMetrics {
  tick: number;
  fps: number;
  frameTime: number;
  isPaused: boolean;
  dpr: number;
  canvasSize: { width: number; height: number };
}

/**
 * Technical debug overlay rendering diagnostic telemetry with an ethereal terminal aesthetic.
 */
export class DebugOverlay {
  private visible = false;

  public toggle(): void {
    this.visible = !this.visible;
  }

  public setVisible(visible: boolean): void {
    this.visible = visible;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public render(ctx: CanvasRenderingContext2D, metrics: DebugMetrics): void {
    if (!this.visible) {
      return;
    }

    ctx.save();

    const padding = 20;
    const boxWidth = 320;
    const boxHeight = 170;
    const x = padding;
    const y = padding;

    // Semi-transparent dark slate backdrop
    ctx.fillStyle = 'rgba(11, 15, 23, 0.85)';
    ctx.strokeStyle = 'rgba(74, 98, 138, 0.4)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.roundRect(x, y, boxWidth, boxHeight, 6);
    ctx.fill();
    ctx.stroke();

    // Title / Header
    ctx.font = 'bold 12px "Courier New", Courier, monospace';
    ctx.fillStyle = '#64B5F6'; // Cyan accent
    ctx.fillText('ECHOES SYSTEM DIAGNOSTICS [60 Hz]', x + 14, y + 26);

    ctx.strokeStyle = 'rgba(100, 181, 246, 0.2)';
    ctx.beginPath();
    ctx.moveTo(x + 14, y + 34);
    ctx.lineTo(x + boxWidth - 14, y + 34);
    ctx.stroke();

    // Data rows
    ctx.font = '12px "Courier New", Courier, monospace';
    ctx.fillStyle = '#CFD8DC';

    const lineHeight = 20;
    let textY = y + 54;

    // Simulation tick
    ctx.fillText(`SIM TICK:      ${metrics.tick.toLocaleString()}`, x + 14, textY);
    textY += lineHeight;

    // Simulation status
    const stateStr = metrics.isPaused ? 'PAUSED' : 'RUNNING (60.0 Hz fixed)';
    ctx.fillStyle = metrics.isPaused ? '#FFB74D' : '#81C784';
    ctx.fillText(`SIM STATE:     ${stateStr}`, x + 14, textY);
    ctx.fillStyle = '#CFD8DC';
    textY += lineHeight;

    // FPS & Frame time
    ctx.fillText(`RENDER FPS:    ${metrics.fps} fps`, x + 14, textY);
    textY += lineHeight;

    ctx.fillText(`FRAME TIME:    ${metrics.frameTime.toFixed(2)} ms`, x + 14, textY);
    textY += lineHeight;

    // Resolution & DPR
    ctx.fillText(
      `VIEWPORT:      ${metrics.canvasSize.width}x${metrics.canvasSize.height} (DPR ${metrics.dpr.toFixed(1)})`,
      x + 14,
      textY
    );
    textY += lineHeight;

    // Hotkey tip
    ctx.fillStyle = '#78909C';
    ctx.font = '10px "Courier New", Courier, monospace';
    ctx.fillText('[F3] Toggle Overlay  |  [Esc] Pause', x + 14, textY + 4);

    ctx.restore();
  }
}
