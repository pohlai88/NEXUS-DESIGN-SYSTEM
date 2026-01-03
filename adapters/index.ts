/**
 * Adapter Registry
 * 
 * Central registry for framework adapters
 */

import { reactAdapter } from './react/adapter.js';
import { webAdapter } from './web/adapter.js';
import type { UniversalAdapter, Framework } from './universal/adapter.js';
import { UnsupportedFrameworkError } from './universal/errors.js';

/**
 * Registry of available framework adapters
 * 
 * Note: Only implemented frameworks are included.
 * Future frameworks (vue, svelte, angular, vanilla) will be added as they are implemented.
 */
const adapters: Partial<Record<Framework, UniversalAdapter>> = {
  react: reactAdapter,
  vanilla: webAdapter, // Web Components use 'vanilla' framework identifier
  // Future framework support:
  // vue: vueAdapter,
  // svelte: svelteAdapter,
  // angular: angularAdapter,
};

/**
 * Get adapter for a specific framework
 * 
 * @param framework - Framework identifier
 * @returns UniversalAdapter instance
 * @throws UnsupportedFrameworkError if framework not implemented
 */
export function getAdapter(framework: Framework): UniversalAdapter {
  const adapter = adapters[framework];

  if (!adapter) {
    throw new UnsupportedFrameworkError(framework);
  }

  return adapter;
}

/**
 * List all available frameworks
 */
export function getAvailableFrameworks(): Framework[] {
  return Object.keys(adapters) as Framework[];
}

/**
 * Check if a framework is supported
 */
export function isFrameworkSupported(framework: string): framework is Framework {
  return framework in adapters;
}

// Re-export types and utilities
export * from './universal/adapter.js';
export * from './universal/errors.js';
export { reactAdapter } from './react/adapter.js';
export { webAdapter } from './web/adapter.js';

