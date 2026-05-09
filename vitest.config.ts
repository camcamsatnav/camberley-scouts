import path from 'node:path';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [viteReact()],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    projects: [
      {
        test: {
          name: 'client',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/server/**/*.test.ts', 'src/routes/api/**/*.test.ts'],
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./src/setup/setupTests.ts'],
        },
      },
      {
        test: {
          name: 'server',
          include: ['src/server/**/*.test.ts', 'src/routes/api/**/*.test.ts'],
          environment: 'node',
          globals: true,
        },
      },
    ],
  },
});
