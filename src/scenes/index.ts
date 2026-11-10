/**
 * Placeholder for scene abstractions and scene routing.
 */
export interface Scene {
  name: string;
  init(): void;
  dispose(): void;
}
