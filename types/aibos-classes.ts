/**
 * AIBOS Design System - TypeScript Types for CSS Classes
 * 
 * Provides type-safe class names for AIBOS design system
 * Based on NEXTJS_DESIGN_SYSTEM_IMPROVEMENTS.md requirements
 */

/**
 * Status variant classes
 * Uses space-separated modifier classes (e.g., "na-status ok")
 */
export type AIBOSStatusVariant = 'ok' | 'bad' | 'warn' | 'pending';

/**
 * Typography classes
 */
export type AIBOSTypographyClass = 
  | 'na-h1' 
  | 'na-h2' 
  | 'na-h4' 
  | 'na-data' 
  | 'na-data-large' 
  | 'na-metadata';

/**
 * Component classes
 */
export type AIBOSComponentClass =
  | 'na-card'
  | 'na-btn'
  | 'na-btn-primary'
  | 'na-status'
  | 'na-container';

/**
 * Status class builder
 * Returns space-separated classes as per AIBOS guidelines
 */
export type StatusClass = `na-status ${AIBOSStatusVariant}`;

/**
 * All AIBOS classes
 */
export type AIBOSClass = 
  | AIBOSTypographyClass 
  | AIBOSComponentClass 
  | StatusClass
  | `na-status ${AIBOSStatusVariant}`;

/**
 * Helper type for building status classes
 */
export function getStatusClass(variant: AIBOSStatusVariant): StatusClass {
  return `na-status ${variant}` as StatusClass;
}

/**
 * Type guard for status variants
 */
export function isStatusVariant(value: string): value is AIBOSStatusVariant {
  return ['ok', 'bad', 'warn', 'pending'].includes(value);
}

/**
 * Type guard for typography classes
 */
export function isTypographyClass(value: string): value is AIBOSTypographyClass {
  return ['na-h1', 'na-h2', 'na-h4', 'na-data', 'na-data-large', 'na-metadata'].includes(value);
}

