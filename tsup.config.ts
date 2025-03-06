import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  clean: true,
  outDir: 'dist',
  sourcemap: true,
});
