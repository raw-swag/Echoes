import { describe, it, expect, beforeEach } from 'vitest';
import { Simulation } from '../../src/sim/Simulation';
import { EMPTY_INPUT_SNAPSHOT } from '../../src/sim/InputSnapshot';
import { PersistenceService } from '../../src/storage/PersistenceService';

describe('M4: First Playable Game — Mechanics & Systems Integration', () => {
  let sim: Simulation;

  beforeEach(() => {
    sim = new Simulation(0);
    PersistenceService.clear();
  });

  it('initializes with 3 Integrity pips and full 4 level Memory Shards', () => {
    const state = sim.getCurrentState();
    expect(state.integrity).toBe(3);
    expect(state.maxIntegrity).toBe(3);
    expect(state.shards.length).toBe(4);
    expect(state.shards.every((s) => !s.collected)).toBe(true);
    expect(state.beacons.length).toBe(1);
    expect(state.beacons[0].isActive).toBe(false);
  });

  it('collects Memory Shard upon contact, hides it, updates HUD count, and prevents re-collection', () => {
    const shard = sim.getShards()[0];
    const player = sim.getPlayer();

    // Teleport player directly onto shard_1
    player.teleport(shard.x, shard.y);
    sim.step(EMPTY_INPUT_SNAPSHOT);

    // Shard should be collected
    expect(shard.isCollected()).toBe(true);
    const state = sim.getCurrentState();
    expect(state.collectedShardCount).toBe(1);
    expect(state.shards[0].collected).toBe(true);

    // Stepping again does not re-collect or double increment
    sim.step(EMPTY_INPUT_SNAPSHOT);
    expect(sim.getCurrentState().collectedShardCount).toBe(1);
  });

  it('activates Beacon checkpoint on player proximity and restores Integrity', () => {
    const beacon = sim.getBeacon();
    const player = sim.getPlayer();

    // Damage player down to 1 pip
    sim.takeDamage(2);
    expect(sim.getIntegrity()).toBe(1);

    // Walk player onto Beacon at x = 1152, y = 544
    player.teleport(beacon.x, beacon.y);
    sim.step(EMPTY_INPUT_SNAPSHOT);

    expect(beacon.isActive()).toBe(true);
    expect(sim.getIntegrity()).toBe(3); // Full restore at Beacon (SV-01)
    expect(sim.getCurrentState().beacons[0].isActive).toBe(true);
  });

  it('handles damage, invulnerability window (1.5s), and pit fall ledge recovery', () => {
    expect(sim.getIntegrity()).toBe(3);

    // Take damage
    sim.takeDamage(1);
    expect(sim.getIntegrity()).toBe(2);
    expect(sim.getCurrentState().invulnerableTicks).toBe(90);

    // Immediate second hit during invulnerability is ignored (no duplicate damage)
    sim.takeDamage(1);
    expect(sim.getIntegrity()).toBe(2);

    // Clear invulnerability
    for (let t = 0; t < 91; t++) {
      sim.step(EMPTY_INPUT_SNAPSHOT);
    }
    expect(sim.getCurrentState().invulnerableTicks).toBe(0);

    // Falling into a pit: -1 Integrity and return to active ledge
    sim.getPlayer().teleport(700, 800); // Bottom pit
    sim.step(EMPTY_INPUT_SNAPSHOT);

    expect(sim.getIntegrity()).toBe(1);
    expect(sim.getPlayer().x).toBe(120); // Returned to spawn ledge
  });

  it('handles complete death (Integrity 0): cleans up active traces, respawns at Beacon, and restores Integrity', () => {
    const beacon = sim.getBeacon();

    // 1. Activate Beacon at x = 1152
    sim.getPlayer().teleport(beacon.x, beacon.y);
    sim.step(EMPTY_INPUT_SNAPSHOT);
    expect(beacon.isActive()).toBe(true);

    // 2. Start recording an Echo Trace
    sim.step({ ...EMPTY_INPUT_SNAPSHOT, trace: true });
    expect(sim.getCurrentState().traceStatus.state).toBe('recording');

    // 3. Take fatal damage
    sim.takeDamage(3);

    // Active trace discarded, player respawns at beacon with full 3 pips
    const state = sim.getCurrentState();
    expect(state.integrity).toBe(3);
    expect(state.traceStatus.state).toBe('idle');
    expect(sim.getPlayer().x).toBe(beacon.respawnX);
    expect(sim.getPlayer().y).toBe(beacon.respawnY);
  });

  it('triggers level completion when player enters the Nexus Arch exit gateway', () => {
    const exitGateway = sim.getExitGateway();
    expect(sim.getCurrentState().isLevelCompleted).toBe(false);

    // Teleport player into exit gateway (Col 73, x = 2336, y = 512)
    sim.getPlayer().teleport(exitGateway.x + 10, exitGateway.y + 10);
    sim.step(EMPTY_INPUT_SNAPSHOT);

    expect(exitGateway.isTriggered()).toBe(true);
    expect(sim.getCurrentState().isLevelCompleted).toBe(true);
  });

  it('persists and recovers valid checkpoint and shard progression state', () => {
    const saveData = {
      version: 1,
      activeBeaconId: 'beacon_central',
      respawnX: 1152,
      respawnY: 550,
      collectedShardIds: ['shard_1', 'shard_2'],
      integrity: 3,
      remnants: 1458,
      levelCompleted: false
    };

    expect(PersistenceService.save(saveData)).toBe(true);
    const loaded = PersistenceService.load();
    expect(loaded).not.toBeNull();
    expect(loaded?.activeBeaconId).toBe('beacon_central');
    expect(loaded?.collectedShardIds).toContain('shard_1');
    expect(loaded?.collectedShardIds).toContain('shard_2');
  });
});
