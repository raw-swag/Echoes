export interface SaveDataModel {
  readonly version: number;
  readonly activeBeaconId: string;
  readonly respawnX: number;
  readonly respawnY: number;
  readonly collectedShardIds: string[];
  readonly integrity: number;
  readonly remnants: number;
  readonly levelCompleted: boolean;
}

const SAVE_STORAGE_KEY = 'echoes_save_v1';

// In-memory fallback for non-browser / headless node environments
let inMemoryStorage: Record<string, string> = {};

export class PersistenceService {
  public static load(): SaveDataModel | null {
    try {
      let serialized: string | null = null;
      if (typeof localStorage !== 'undefined') {
        serialized = localStorage.getItem(SAVE_STORAGE_KEY);
      } else {
        serialized = inMemoryStorage[SAVE_STORAGE_KEY] ?? null;
      }

      if (!serialized) {
        return null;
      }
      const parsed = JSON.parse(serialized) as SaveDataModel;
      if (parsed && typeof parsed.version === 'number') {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }

  public static save(data: SaveDataModel): boolean {
    try {
      const serialized = JSON.stringify(data);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(SAVE_STORAGE_KEY, serialized);
      } else {
        inMemoryStorage[SAVE_STORAGE_KEY] = serialized;
      }
      return true;
    } catch {
      return false;
    }
  }

  public static clear(): void {
    inMemoryStorage = {};
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem(SAVE_STORAGE_KEY);
      } catch (err) {
        void err;
      }
    }
  }
}
