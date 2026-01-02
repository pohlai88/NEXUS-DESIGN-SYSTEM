/**
 * React Adapter Utilities
 * 
 * Shared utilities for generated React components
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with AIBOS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validate variant against allowed values
 */
export function validateVariant<T extends string>(
  value: string | undefined,
  allowedVariants: readonly T[],
  defaultValue: T
): T {
  if (!value) return defaultValue;
  return allowedVariants.includes(value as T) ? (value as T) : defaultValue;
}

/**
 * Get state classes for a component
 */
export function getStateClasses(
  states: Record<string, { aibosClasses?: string[] }> | undefined,
  stateName: string
): string[] {
  return states?.[stateName]?.aibosClasses || [];
}

/**
 * Merge variant and state classes
 */
export function mergeClasses(
  variantClasses: string[],
  stateClasses: string[],
  additionalClasses?: string
): string {
  return cn(...variantClasses, ...stateClasses, additionalClasses);
}

