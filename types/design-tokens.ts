/**
 * AIBOS Design System - Enhanced Design Tokens
 * 
 * Type-safe design tokens for use in TypeScript/React applications
 * Based on NEXTJS_DESIGN_SYSTEM_IMPROVEMENTS.md requirements
 */

/**
 * Color tokens
 */
export const colors = {
  success: 'var(--color-success)',
  error: 'var(--color-error)',
  warning: 'var(--color-warning)',
  info: 'var(--color-info)',
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  foreground: 'var(--color-foreground)',
  background: 'var(--color-background)',
  muted: 'var(--color-muted)',
  border: 'var(--color-border)',
} as const;

/**
 * Spacing tokens
 */
export const spacing = {
  xs: 'var(--spacing-1)',
  sm: 'var(--spacing-2)',
  md: 'var(--spacing-4)',
  lg: 'var(--spacing-6)',
  xl: 'var(--spacing-8)',
  '2xl': 'var(--spacing-12)',
} as const;

/**
 * Typography tokens
 */
export const typography = {
  h1: { 
    size: '32px', 
    weight: 'semibold',
    class: 'na-h1' as const,
  },
  h2: { 
    size: '24px', 
    weight: 'semibold',
    class: 'na-h2' as const,
  },
  h4: { 
    size: '18px', 
    weight: 'semibold',
    class: 'na-h4' as const,
  },
  data: { 
    size: '14px', 
    family: 'monospace',
    class: 'na-data' as const,
  },
  dataLarge: {
    size: '30px',
    family: 'serif',
    class: 'na-data-large' as const,
  },
  metadata: {
    size: '11px',
    weight: '500',
    transform: 'uppercase',
    class: 'na-metadata' as const,
  },
} as const;

/**
 * Design tokens object
 */
export const designTokens = {
  colors,
  spacing,
  typography,
} as const;

export type DesignTokens = typeof designTokens;

