/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components-generic/index.tsx'),
      name: `Irma's Preact form components`,
      fileName: format => `irmas-preact-form-components.${format}.js`,
    },
    rollupOptions: {
      external: ['preact', 'preact/compat'],
    },
  },
  test: {
    include: ['**/*.test.tsx'],
    coverage: {
      provider: 'v8',
    },
    environment: 'jsdom',
    globals: true,
  },
  plugins: [preact(), dts({ rollupTypes: true })],
});
