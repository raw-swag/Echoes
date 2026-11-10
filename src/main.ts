import { GameApp } from './core/GameApp';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error('Canvas element #game-canvas not found in document');
  }

  const app = new GameApp({ canvas });
  app.start();
});
