import { defineConfig, devices } from '@playwright/test';
import { cpus } from 'os';

/**
 * Playwright E2E Testing Configuration - OPTIMIZED
 * 
 * Based on best practices from:
 * - Vuesion (comprehensive Storybook setup)
 * - Stencil.js (multi-framework testing)
 * - Playwright official best practices
 * 
 * Optimized for Web Components testing with:
 * - Cross-browser support (conditional)
 * - Visual regression testing
 * - Accessibility testing
 * - Component interaction testing
 * - Performance optimizations
 * - Smart parallelization
 */
export default defineConfig({
  testDir: './tests/e2e',
  
  // Test timeout: 30s default, 60s for slow operations
  timeout: 30 * 1000,
  expect: {
    // Assertion timeout
    timeout: 5 * 1000,
  },
  
  // Test execution - optimized for performance
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  
  // Smart worker allocation:
  // - CI: 1 worker (stability)
  // - Local: Use 50% of CPU cores (performance)
  // - Max 4 workers to avoid resource exhaustion
  workers: process.env.CI 
    ? 1 
    : Math.min(Math.floor(cpus().length * 0.5), 4),
  
  // Reporter configuration - optimized output
  reporter: [
    ['html', { outputFolder: 'test-results/html-report', open: 'never' }],
    ['json', { outputFile: 'test-results/e2e-results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    process.env.CI ? ['github'] : ['list'],
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL for tests
    baseURL: 'http://localhost:3000',
    
    // Headless mode: true in CI, false locally for debugging
    headless: process.env.CI ? true : false,
    
    // Viewport size - standard desktop
    viewport: { width: 1280, height: 720 },
    
    // Collect trace on failure only (saves disk space)
    trace: 'on-first-retry',
    
    // Screenshot on failure only
    screenshot: 'only-on-failure',
    
    // Video on failure only (saves disk space)
    video: 'retain-on-failure',
    
    // Action timeout
    actionTimeout: 10 * 1000,
    
    // Navigation timeout
    navigationTimeout: 30 * 1000,
    
    // Ignore HTTPS errors (for local dev)
    ignoreHTTPSErrors: true,
  },

  // Configure projects - optimized browser selection
  projects: [
    // Primary: Chromium (fastest, most compatible)
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Performance optimizations
        launchOptions: {
          args: [
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-sandbox',
          ],
        },
      },
    },
    
    // Secondary browsers - only in CI or when explicitly requested
    ...(process.env.CI || process.env.TEST_ALL_BROWSERS ? [
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
    ] : []),
    
    // Mobile testing - only in CI or when explicitly requested
    ...(process.env.CI || process.env.TEST_MOBILE ? [
      {
        name: 'Mobile Chrome',
        use: { ...devices['Pixel 5'] },
      },
      {
        name: 'Mobile Safari',
        use: { ...devices['iPhone 12'] },
      },
    ] : []),
  ],

  // Run local dev server before tests
  // Aligned with Next.js best practices: use webServer feature
  // Next.js pattern: Auto-start server, reuse in dev, clean shutdown
  webServer: {
    command: 'pnpm run dev:test-server',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI, // Reuse in dev, always start fresh in CI
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  
  // Global setup/teardown hooks
  globalSetup: undefined, // Can be added if needed
  globalTeardown: undefined, // Can be added if needed
});

