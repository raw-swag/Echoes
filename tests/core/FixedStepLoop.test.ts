import { describe, it, expect, vi } from 'vitest';
import { FixedStepLoop } from '../../src/core/FixedStepLoop';
import { FrameScheduler } from '../../src/core/Clock';

class MockScheduler implements FrameScheduler {
  public currentTime = 0;
  private nextId = 1;
  private pendingCallbacks = new Map<number, (timestamp: number) => void>();

  public now(): number {
    return this.currentTime;
  }

  public requestFrame(callback: (timestamp: number) => void): number {
    const id = this.nextId++;
    this.pendingCallbacks.set(id, callback);
    return id;
  }

  public cancelFrame(handle: number): void {
    this.pendingCallbacks.delete(handle);
  }

  public advanceTime(ms: number): void {
    this.currentTime += ms;
    const callbacks = Array.from(this.pendingCallbacks.values());
    this.pendingCallbacks.clear();
    for (const cb of callbacks) {
      cb(this.currentTime);
    }
  }
}

describe('FixedStepLoop', () => {
  it('updates at fixed 60 ticks per second (1/60 s)', () => {
    const scheduler = new MockScheduler();
    const updateSpy = vi.fn();
    const renderSpy = vi.fn();

    const loop = new FixedStepLoop({
      scheduler,
      update: updateSpy,
      render: renderSpy,
      tickRate: 60
    });

    loop.start();

    // Advance 16.6667 ms (approx 1 tick)
    scheduler.advanceTime(16.7);
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(renderSpy).toHaveBeenCalledTimes(1);

    // Advance 1 second total (1000 ms = 60 ticks)
    for (let i = 0; i < 59; i++) {
      scheduler.advanceTime(1000 / 60);
    }

    expect(updateSpy).toHaveBeenCalledTimes(60);
    loop.stop();
  });

  it('handles multiple catch-up ticks when frame delta is large', () => {
    const scheduler = new MockScheduler();
    const updateSpy = vi.fn();
    const renderSpy = vi.fn();

    const loop = new FixedStepLoop({
      scheduler,
      update: updateSpy,
      render: renderSpy,
      tickRate: 60,
      maxSubSteps: 5
    });

    loop.start();

    // Advance 50 ms (~3 ticks at 16.667ms each)
    scheduler.advanceTime(50);

    expect(updateSpy).toHaveBeenCalledTimes(3);
    expect(renderSpy).toHaveBeenCalledTimes(1);
    loop.stop();
  });

  it('caps catch-up ticks to maxSubSteps to prevent spiral of death', () => {
    const scheduler = new MockScheduler();
    const updateSpy = vi.fn();
    const renderSpy = vi.fn();

    const loop = new FixedStepLoop({
      scheduler,
      update: updateSpy,
      render: renderSpy,
      tickRate: 60,
      maxSubSteps: 5,
      maxDeltaTime: 0.5
    });

    loop.start();

    // Advance 200 ms (would be 12 ticks without cap)
    scheduler.advanceTime(200);

    // Must be capped at exactly maxSubSteps (5)
    expect(updateSpy).toHaveBeenCalledTimes(5);
    // Residual accumulator exceeding fixedTimestep is reset to prevent spiral
    expect(loop.getAccumulator()).toBeLessThan(loop.getFixedTimestep());
    loop.stop();
  });

  it('clamps unusually large frame deltas to maxDeltaTime', () => {
    const scheduler = new MockScheduler();
    const updateSpy = vi.fn();
    const renderSpy = vi.fn();

    const loop = new FixedStepLoop({
      scheduler,
      update: updateSpy,
      render: renderSpy,
      maxDeltaTime: 0.2 // 200ms
    });

    loop.start();

    // Simulate 5000ms delay (e.g., computer went to sleep or heavy freeze)
    scheduler.advanceTime(5000);

    // Max delta clamped to 200ms, and maxSubSteps (5) ensures no massive jump
    expect(updateSpy).toHaveBeenCalledTimes(5);
    loop.stop();
  });

  it('correctly pauses and resumes without delta explosion', () => {
    const scheduler = new MockScheduler();
    const updateSpy = vi.fn();
    const renderSpy = vi.fn();

    const loop = new FixedStepLoop({
      scheduler,
      update: updateSpy,
      render: renderSpy
    });

    loop.start();
    scheduler.advanceTime(16.7);
    expect(updateSpy).toHaveBeenCalledTimes(1);

    // Pause the loop (e.g., browser tab hidden)
    loop.pause();
    expect(loop.isLoopPaused()).toBe(true);

    // Advance 10 seconds while paused
    scheduler.advanceTime(10000);
    expect(updateSpy).toHaveBeenCalledTimes(1); // No new updates while paused

    // Resume the loop
    loop.resume();
    expect(loop.isLoopPaused()).toBe(false);

    // Advance a standard frame of 16.7 ms
    scheduler.advanceTime(16.7);
    // Should execute exactly 1 more tick, not a massive backlog
    expect(updateSpy).toHaveBeenCalledTimes(2);
    loop.stop();
  });

  it('calculates interpolation alpha factor accurately', () => {
    const scheduler = new MockScheduler();
    let capturedAlpha = -1;

    const loop = new FixedStepLoop({
      scheduler,
      update: () => {},
      render: (alpha) => {
        capturedAlpha = alpha;
      },
      tickRate: 60
    });

    loop.start();

    // Advance by 1.5 ticks: 25 ms (1 tick = 16.6667 ms, remainder = 8.3333 ms -> alpha approx 0.5)
    scheduler.advanceTime(25);

    expect(capturedAlpha).toBeGreaterThanOrEqual(0.48);
    expect(capturedAlpha).toBeLessThanOrEqual(0.52);
    loop.stop();
  });
});
