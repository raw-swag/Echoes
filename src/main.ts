import './ui/styles/main.css';
import { GameApp } from './core/GameApp';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement | null;
  const uiContainer = document.getElementById('ui-root') as HTMLElement | null;

  if (!canvas) {
    throw new Error('Canvas element #game-canvas not found in document');
  }

  const app = new GameApp({
    canvas,
    uiContainer: uiContainer ?? undefined
  });

  app.start();

  window.addEventListener('echoes:restart-level', () => {
    app.restartLevel();
  });

  // Register PWA service worker if supported
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('PWA service worker registration failed:', err);
      });
    });
  }
});
