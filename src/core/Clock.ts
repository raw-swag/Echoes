/**
 * Scheduler interface abstraction allowing headless tests to drive the loop
 * without window.requestAnimationFrame.
 */
export interface FrameScheduler {
  now(): number;
  requestFrame(callback: (timestamp: number) => void): number;
  cancelFrame(handle: number): void;
}

/**
 * Standard browser-based frame scheduler using window.requestAnimationFrame and performance.now().
 */
export class BrowserFrameScheduler implements FrameScheduler {
  public now(): number {
    return typeof performance !== 'undefined' ? performance.now() : Date.now();
  }

  public requestFrame(callback: (timestamp: number) => void): number {
    return window.requestAnimationFrame(callback);
  }

  public cancelFrame(handle: number): void {
    window.cancelAnimationFrame(handle);
  }
}
