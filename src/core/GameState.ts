/**
 * Central Game Progression and Session State.
 * Shared across pure simulation, Desktop Web UI, and Mobile PWA UI.
 */

export interface ChapterProgress {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  restored: boolean;
  shardsCurrent: number;
  shardsTotal: number;
  remnantsClaimed: number;
  remnantsTotal: number;
  syncState: 'Nominal' | 'Coherent' | 'Locked';
  thumbnailUrl: string;
}

export interface MemoryShard {
  id: string;
  chapterId: string;
  index: string;
  title: string;
  quote: string;
  folioNote: string;
  type: 'photograph' | 'whisper' | 'letter';
  restored: boolean;
  fidelityPercent: number;
  imageUrl?: string;
  classification: string;
  dateStr: string;
}

export interface GameStateModel {
  // Session & Archetype
  remnants: number;
  epochThreshold: number;
  mindIntegrity: number; // 0 to 3
  mindIntegrityMax: number;
  mindTetherStable: boolean;
  archivistId: string;

  // Progression
  activeChapterId: string;
  chapters: ChapterProgress[];
  activeWhisper: string;
  activeWhisperLedger: string;

  // Audio & HUD
  acousticDriftHz: number;
  isPaused: boolean;
  echoTraceTimer: number; // current seconds
  echoTraceMaxTimer: number; // 8.0s (TR-01)
  echoTraceState: 'idle' | 'recording' | 'playback' | 'holding' | 'dissolving' | 'cooldown';

  // Archive items
  selectedShardId: string;
  shards: MemoryShard[];
}

export const INITIAL_GAME_STATE: GameStateModel = {
  remnants: 1408,
  epochThreshold: 1500,
  mindIntegrity: 2,
  mindIntegrityMax: 3,
  mindTetherStable: true,
  archivistId: 'Archivist #09',

  activeChapterId: 'ch1',
  activeWhisper: 'Some doors only swing inward...',
  activeWhisperLedger: 'LEDGER #40',

  acousticDriftHz: 14.8,
  isPaused: false,
  echoTraceTimer: 0.0,
  echoTraceMaxTimer: 8.0,
  echoTraceState: 'idle',

  selectedShardId: 'fragment-42',
  chapters: [
    {
      id: 'ch1',
      number: 1,
      title: 'RECOLLECTION 01',
      subtitle: 'The Sound of Leaving',
      restored: true,
      shardsCurrent: 6,
      shardsTotal: 6,
      remnantsClaimed: 45,
      remnantsTotal: 45,
      syncState: 'Nominal',
      thumbnailUrl: '/assets/ui/departure_gate.jpg'
    },
    {
      id: 'ch2',
      number: 2,
      title: 'RECOLLECTION 02',
      subtitle: 'Clockwork Silence',
      restored: true,
      shardsCurrent: 4,
      shardsTotal: 6,
      remnantsClaimed: 60,
      remnantsTotal: 60,
      syncState: 'Coherent',
      thumbnailUrl: '/assets/ui/clockwork_clearing.jpg'
    },
    {
      id: 'ch3',
      number: 3,
      title: 'RECOLLECTION 03',
      subtitle: 'Sunken Colonnade',
      restored: false,
      shardsCurrent: 2,
      shardsTotal: 6,
      remnantsClaimed: 15,
      remnantsTotal: 55,
      syncState: 'Coherent',
      thumbnailUrl: '/assets/ui/sunken_bell.jpg'
    },
    {
      id: 'ch4',
      number: 4,
      title: 'RECOLLECTION 04',
      subtitle: 'Mirror Lab & Veil',
      restored: false,
      shardsCurrent: 0,
      shardsTotal: 6,
      remnantsClaimed: 0,
      remnantsTotal: 70,
      syncState: 'Locked',
      thumbnailUrl: '/assets/ui/archive_fragment_42.jpg'
    },
    {
      id: 'ch5',
      number: 5,
      title: 'RECOLLECTION 05',
      subtitle: 'Nexus Gate & Arbitration',
      restored: false,
      shardsCurrent: 0,
      shardsTotal: 6,
      remnantsClaimed: 0,
      remnantsTotal: 90,
      syncState: 'Locked',
      thumbnailUrl: '/assets/ui/prologue_traveler.jpg'
    }
  ],
  shards: [
    {
      id: 'fragment-42',
      chapterId: 'ch3',
      index: 'FRAGMENT #042',
      title: 'Vault of Surrender',
      quote: "“We left it where sunlight couldn't find it.”",
      folioNote: 'Note #14 — Terrace North-By-West',
      type: 'photograph',
      restored: true,
      fidelityPercent: 85,
      imageUrl: '/assets/ui/archive_fragment_42.jpg',
      classification: 'Plate 042-A',
      dateStr: '[ ERASED ]'
    },
    {
      id: 'fragment-18',
      chapterId: 'ch1',
      index: 'FRAGMENT #018',
      title: 'Threshold of Salt',
      quote: '“The tide came for our names first.”',
      folioNote: 'Note #03 — Gatehouse Log',
      type: 'photograph',
      restored: true,
      fidelityPercent: 100,
      imageUrl: '/assets/ui/departure_gate.jpg',
      classification: 'Plate 018-C',
      dateStr: 'YEAR 402'
    },
    {
      id: 'fragment-29',
      chapterId: 'ch2',
      index: 'FRAGMENT #029',
      title: 'The Silent Gear',
      quote: '“No pendulum swings without grief.”',
      folioNote: 'Note #09 — Tower Attic',
      type: 'whisper',
      restored: false,
      fidelityPercent: 40,
      imageUrl: '/assets/ui/clockwork_clearing.jpg',
      classification: 'Audio Remnant 29',
      dateStr: 'YEAR 408'
    }
  ]
};

export class GameStateManager {
  private state: GameStateModel;
  private readonly listeners = new Set<(state: Readonly<GameStateModel>) => void>();

  constructor(initialState: GameStateModel = INITIAL_GAME_STATE) {
    this.state = { ...initialState };
  }

  public getState(): Readonly<GameStateModel> {
    return this.state;
  }

  public subscribe(listener: (state: Readonly<GameStateModel>) => void): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public update(patch: Partial<GameStateModel>): void {
    this.state = { ...this.state, ...patch };
    this.notify();
  }

  public addRemnants(amount: number): void {
    this.update({ remnants: this.state.remnants + amount });
  }

  public setPaused(paused: boolean): void {
    this.update({ isPaused: paused });
  }

  public setEchoTraceState(state: GameStateModel['echoTraceState'], timer: number = 0): void {
    this.update({
      echoTraceState: state,
      echoTraceTimer: timer
    });
  }

  public restoreShard(id: string): void {
    const shards = this.state.shards.map((s) => {
      if (s.id === id) {
        return { ...s, restored: true, fidelityPercent: 100 };
      }
      return s;
    });
    this.update({ shards });
  }

  private notify(): void {
    const s = this.state;
    for (const listener of this.listeners) {
      try {
        listener(s);
      } catch (err) {
        console.error('Error in GameStateManager listener:', err);
      }
    }
  }
}

export const globalGameState = new GameStateManager();
