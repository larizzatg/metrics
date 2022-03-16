/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), visualizer()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    setupFiles: './src/setup-test.ts',
  },
})
