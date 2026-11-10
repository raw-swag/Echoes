import { describe, it, expect, beforeEach } from 'vitest';
import { GameStateManager, INITIAL_GAME_STATE } from '../../src/core/GameState';

describe('GameStateManager', () => {
  let manager: GameStateManager;

  beforeEach(() => {
    manager = new GameStateManager(INITIAL_GAME_STATE);
  });

  it('initializes with default state values', () => {
    const state = manager.getState();
    expect(state.remnants).toBe(1408);
    expect(state.epochThreshold).toBe(1500);
    expect(state.mindIntegrity).toBe(2);
    expect(state.chapters.length).toBe(5);
    expect(state.shards.length).toBe(3);
  });

  it('notifies subscribers on state updates', () => {
    let capturedRemnants = 0;
    const unsub = manager.subscribe((state) => {
      capturedRemnants = state.remnants;
    });

    expect(capturedRemnants).toBe(1408);

    manager.addRemnants(50);
    expect(capturedRemnants).toBe(1458);
    expect(manager.getState().remnants).toBe(1458);

    unsub();
    manager.addRemnants(10);
    expect(capturedRemnants).toBe(1458); // No update after unsub
  });

  it('updates echo trace states cleanly', () => {
    manager.setEchoTraceState('recording', 1.5);
    let state = manager.getState();
    expect(state.echoTraceState).toBe('recording');
    expect(state.echoTraceTimer).toBe(1.5);

    manager.setEchoTraceState('replaying', 0);
    state = manager.getState();
    expect(state.echoTraceState).toBe('replaying');
    expect(state.echoTraceTimer).toBe(0);
  });

  it('restores memory shards to 100% fidelity', () => {
    manager.restoreShard('fragment-29');
    const shard = manager.getState().shards.find((s) => s.id === 'fragment-29');
    expect(shard).toBeDefined();
    expect(shard?.restored).toBe(true);
    expect(shard?.fidelityPercent).toBe(100);
  });

  it('updates pause status across the application', () => {
    manager.setPaused(true);
    expect(manager.getState().isPaused).toBe(true);
    manager.setPaused(false);
    expect(manager.getState().isPaused).toBe(false);
  });
});
