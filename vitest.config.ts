import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setupTests.ts'],
    includeSource: ['src/**/*.{ts,tsx}'],
    css: true,
    ui: true,
    inspectBrk: true,
    fileParallelism: false,
    browser: {
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
  esbuild: {
    sourcemap: 'inline',
  },
  server: {
    open: '/__vitest__/',
    sourcemapIgnoreList: () => false, // 모든 sourcemap 포함
  },
});
