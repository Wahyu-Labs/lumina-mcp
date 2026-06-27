import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'website/**',
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        'test/**'
      ],
    },
  },
});
