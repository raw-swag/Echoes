import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@sim': path.resolve(__dirname, './src/sim'),
      '@renderer': path.resolve(__dirname, './src/renderer'),
      '@input': path.resolve(__dirname, './src/input'),
      '@core': path.resolve(__dirname, './src/core'),
      '@scenes': path.resolve(__dirname, './src/scenes'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@audio': path.resolve(__dirname, './src/audio'),
      '@storage': path.resolve(__dirname, './src/storage')
    }
  },
  server: {
    port: 3000,
    open: false
  },
  build: {
    target: 'es2022',
    sourcemap: true
  }
});
