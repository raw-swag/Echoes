export interface ViewportConfig {
  /** Target virtual width */
  readonly virtualWidth: number;
  /** Target virtual height */
  readonly virtualHeight: number;
}

export interface ViewportTransform {
  readonly scale: number;
  readonly offsetX: number;
  readonly offsetY: number;
  readonly cssWidth: number;
  readonly cssHeight: number;
  readonly dpr: number;
}

/**
 * Manages virtual 1920x1080 canvas scaling, letterboxing/pillarboxing, and devicePixelRatio scaling.
 */
export class Viewport {
  public readonly virtualWidth: number;
  public readonly virtualHeight: number;

  constructor(config: ViewportConfig = { virtualWidth: 1920, virtualHeight: 1080 }) {
    this.virtualWidth = config.virtualWidth;
    this.virtualHeight = config.virtualHeight;
  }

  public calculateTransform(
    containerWidth: number,
    containerHeight: number,
    dpr: number = 1
  ): ViewportTransform {
    const scale = Math.min(
      containerWidth / this.virtualWidth,
      containerHeight / this.virtualHeight
    );
    const cssWidth = Math.floor(this.virtualWidth * scale);
    const cssHeight = Math.floor(this.virtualHeight * scale);
    const offsetX = Math.floor((containerWidth - cssWidth) / 2);
    const offsetY = Math.floor((containerHeight - cssHeight) / 2);

    return {
      scale,
      offsetX,
      offsetY,
      cssWidth,
      cssHeight,
      dpr
    };
  }
}
