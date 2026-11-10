import { describe, it, expect } from 'vitest';
import { InputService } from '../../src/input/InputService';
import { InputAction } from '../../src/input/InputActions';

class MockEventTarget {
  private listeners: Record<string, ((e: Event) => void)[]> = {};

  public addEventListener(event: string, handler: (e: Event) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(handler);
  }

  public removeEventListener(event: string, handler: (e: Event) => void): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((h) => h !== handler);
    }
  }

  public dispatch(event: string, detail: Partial<KeyboardEvent> = {}): void {
    const list = this.listeners[event] || [];
    const eventObj = {
      preventDefault: () => {},
      ...detail
    } as unknown as Event;
    for (const h of list) {
      h(eventObj);
    }
  }
}

describe('InputService', () => {
  it('maps keyboard codes to actions and generates input snapshots', () => {
    const mockWindow = new MockEventTarget();
    const service = new InputService();
    service.attach(mockWindow as unknown as Window);

    // Initial state
    let snapshot = service.poll();
    expect(snapshot.moveX).toBe(0);
    expect(snapshot.jump).toBe(false);

    // Keydown KeyD -> move right
    mockWindow.dispatch('keydown', { code: 'KeyD' });
    expect(service.isActionActive(InputAction.MoveRight)).toBe(true);

    snapshot = service.poll();
    expect(snapshot.moveX).toBe(1);

    // Keydown Space -> jump
    mockWindow.dispatch('keydown', { code: 'Space' });
    snapshot = service.poll();
    expect(snapshot.jump).toBe(true);
    expect(snapshot.moveX).toBe(1);

    // Keyup KeyD
    mockWindow.dispatch('keyup', { code: 'KeyD' });
    snapshot = service.poll();
    expect(snapshot.moveX).toBe(0);
    expect(snapshot.jump).toBe(true);

    // Keyup Space
    mockWindow.dispatch('keyup', { code: 'Space' });
    snapshot = service.poll();
    expect(snapshot.jump).toBe(false);

    service.detach(mockWindow as unknown as Window);
  });

  it('resets stuck keys when window loses focus (blur event)', () => {
    const mockWindow = new MockEventTarget();
    const service = new InputService();
    service.attach(mockWindow as unknown as Window);

    mockWindow.dispatch('keydown', { code: 'KeyA' });
    mockWindow.dispatch('keydown', { code: 'Space' });

    let snapshot = service.poll();
    expect(snapshot.moveX).toBe(-1);
    expect(snapshot.jump).toBe(true);

    // Trigger blur event
    mockWindow.dispatch('blur');

    snapshot = service.poll();
    expect(snapshot.moveX).toBe(0);
    expect(snapshot.jump).toBe(false);
    expect(service.isActionActive(InputAction.MoveLeft)).toBe(false);
    expect(service.isActionActive(InputAction.Jump)).toBe(false);

    service.detach(mockWindow as unknown as Window);
  });
});
