import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Le site est servi par GitHub Pages sous https://mbensacq.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  build: {
    target: 'es2022',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
  },
});
