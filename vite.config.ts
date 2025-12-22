/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: [
        '**/*.less',
        'vite-env.d.ts',
        'src/setupTests.ts',
        'pomodoro-app',
      ],
    },
    typecheck: {
      tsconfig: './tsconfig.vitest.json',
    },
    setupFiles: './src/setupTests.ts',
  },
});
