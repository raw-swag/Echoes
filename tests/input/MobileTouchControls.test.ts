import { describe, it, expect, beforeEach } from 'vitest';
import { inputService } from '@input/InputService';

describe('M4.6 Mobile Touch Controls & Pointer Cancellation', () => {
  beforeEach(() => {
    inputService.reset();
  });

  it('sets touch move axes and resets properly on release/cancel', () => {
    inputService.setTouchMove(-1, 0);
    let snapshot = inputService.poll();
    expect(snapshot.moveX).toBe(-1);
    expect(snapshot.moveY).toBe(0);

    inputService.setTouchMove(1, 0);
    snapshot = inputService.poll();
    expect(snapshot.moveX).toBe(1);

    // Release / Cancel
    inputService.setTouchMove(0, 0);
    snapshot = inputService.poll();
    expect(snapshot.moveX).toBe(0);
  });

  it('handles virtual jump pressed and canceled states', () => {
    inputService.setTouchJump(true);
    let snapshot = inputService.poll();
    expect(snapshot.jump).toBe(true);

    // Cancel / Release
    inputService.setTouchJump(false);
    snapshot = inputService.poll();
    expect(snapshot.jump).toBe(false);
  });

  it('safely resets all touch inputs on blur/reset', () => {
    inputService.setTouchMove(1, 1);
    inputService.setTouchJump(true);
    inputService.setTouchAbility(true);
    inputService.setTouchTrace(true);

    let snapshot = inputService.poll();
    expect(snapshot.moveX).toBe(1);
    expect(snapshot.jump).toBe(true);

    inputService.reset();
    snapshot = inputService.poll();
    expect(snapshot.moveX).toBe(0);
    expect(snapshot.moveY).toBe(0);
    expect(snapshot.jump).toBe(false);
    expect(snapshot.ability).toBe(false);
    expect(snapshot.trace).toBe(false);
  });
});
