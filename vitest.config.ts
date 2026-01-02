import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    // Optimize test execution
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 5000,
    // Isolate tests for better reliability
    isolate: true,
    // Pool options for better performance
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        minThreads: 1,
        maxThreads: 4
      }
    },
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/scripts/**',
        '**/schemas/**',
        '**/specs/**',
        '**/mocks/**',
        '**/themes/**'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      },
      // Report uncovered lines
      reportOnFailure: true,
      // Skip full coverage for faster runs
      skipFull: false
    },
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@/lib/utils': path.resolve(__dirname, './tests/mocks/utils.ts'),
      '@aibos/design-system/css': path.resolve(__dirname, './tests/mocks/css.ts')
    }
  }
});

