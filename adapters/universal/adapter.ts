/**
 * Universal Adapter Interface
 * 
 * Framework-agnostic adapter for generating components from specifications
 */

import type { ComponentSpec } from '../../types/component-spec.js';

export type Framework = 'react' | 'vue' | 'svelte' | 'angular' | 'vanilla';

export interface AdapterConfig {
  framework: Framework;
  outputDir: string;
  importPath?: string;
}

export interface GeneratedComponent {
  name: string;
  code: string;
  imports: string[];
  dependencies: string[];
}

export interface UniversalAdapter {
  /**
   * Generate component code from specification
   */
  generate(spec: ComponentSpec, config: AdapterConfig): GeneratedComponent;

  /**
   * Generate all parts of a composite component
   */
  generateParts?(spec: ComponentSpec, config: AdapterConfig): GeneratedComponent[];

  /**
   * Get required dependencies for this adapter
   */
  getDependencies(spec: ComponentSpec): string[];
}

/**
 * Get AIBOS classes for a variant
 */
export function getVariantClasses(
  spec: ComponentSpec,
  variant: string
): string[] {
  return spec.variants[variant]?.aibosClasses || [];
}

/**
 * Get AIBOS classes for a state
 */
export function getStateClasses(
  spec: ComponentSpec,
  state: string
): string[] {
  return spec.states?.[state]?.aibosClasses || [];
}

/**
 * Get all AIBOS classes for a component variant and state
 */
export function getAllClasses(
  spec: ComponentSpec,
  variant: string,
  state?: string
): string[] {
  const variantClasses = getVariantClasses(spec, variant);
  const stateClasses = state ? getStateClasses(spec, state) : [];
  return [...variantClasses, ...stateClasses];
}

/**
 * Check if component uses Radix UI
 */
export function usesRadixUI(spec: ComponentSpec): boolean {
  return spec.radixPrimitive !== null;
}

/**
 * Check if component has parts (composite component)
 */
export function hasParts(spec: ComponentSpec): boolean {
  return spec.parts !== undefined && Object.keys(spec.parts).length > 0;
}

