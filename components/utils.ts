/**
 * Utility Functions for AIBOS Design System Components
 * 
 * Provides className merging and other utility functions
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with Tailwind conflict resolution
 * 
 * Combines clsx for conditional classes and tailwind-merge for
 * resolving Tailwind class conflicts.
 * 
 * @example
 * ```tsx
 * cn('na-status', 'ok', isActive && 'active')
 * // => 'na-status ok active'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Type-safe AIBOS class name builder
 * 
 * @example
 * ```tsx
 * buildAIBOSClass('status', 'ok') // => 'na-status ok'
 * ```
 */
export function buildAIBOSClass(base: string, modifier?: string): string {
  if (!modifier) return `na-${base}`;
  return `na-${base} ${modifier}`;
}

