import { fileURLToPath, URL } from 'node:url';
import { analyzer } from 'vite-bundle-analyzer';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), tailwindcss(), analyzer({ enabled: !!process.env.DOCKER === false })],
  server: {
    strictPort: true,
    host: true,
    open: process.env.DOCKER ? false : '/startup',
    watch: {
      usePolling: true,
    },
  },
  preview: {
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
