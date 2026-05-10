import netlify from '@netlify/vite-plugin-tanstack-start';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tanstackStart(),
    viteReact(),
    netlify({
      dev: {
        edgeFunctions: { enabled: false },
        functions: { enabled: false },
      },
    }),
  ],
});

export default config;
