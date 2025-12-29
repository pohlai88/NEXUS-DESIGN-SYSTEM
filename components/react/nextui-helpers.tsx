/**
 * NextUI Integration Helpers
 * 
 * Utility functions and HOCs for seamless NextUI + AIBOS integration
 */

import React from 'react';
import { cn } from '../utils.js';

/**
 * Combines AIBOS classes with NextUI component className
 * 
 * @example
 * ```tsx
 * <Card className={withAIBOS('na-card', 'na-p-6', customClass)} />
 * ```
 */
export function withAIBOS(...classes: (string | undefined | null | false)[]): string {
  return cn(...classes);
}

/**
 * HOC to add AIBOS classes to any component
 * 
 * @example
 * ```tsx
 * const AIBOSCard = withAIBOSClasses(NextUICard, 'na-card', 'na-p-6');
 * ```
 */
export function withAIBOSClasses<P extends { className?: string }>(
  Component: React.ComponentType<P>,
  ...aibosClasses: string[]
) {
  return function AIBOSEnhancedComponent(props: P) {
    const className = cn(...aibosClasses, props.className);
    return <Component {...props} className={className} />;
  };
}

/**
 * Typography helper for NextUI components
 * 
 * @example
 * ```tsx
 * <CardHeader>
 *   <h2 className={aibosTypography('h4')}>Title</h2>
 * </CardHeader>
 * ```
 */
export function aibosTypography(
  variant: 'h1' | 'h2' | 'h4' | 'data' | 'data-large' | 'metadata'
): string {
  const classMap = {
    h1: 'na-h1',
    h2: 'na-h2',
    h4: 'na-h4',
    data: 'na-data',
    'data-large': 'na-data-large',
    metadata: 'na-metadata',
  } as const;

  return classMap[variant];
}

/**
 * Spacing helper for consistent padding/margins
 * 
 * @example
 * ```tsx
 * <div className={aibosSpacing('p-6', 'mt-4')}>Content</div>
 * ```
 */
export function aibosSpacing(...spacing: string[]): string {
  return cn(...spacing.map(s => `na-${s}`));
}

/**
 * Typography class map for reference
 */
export const typographyClasses = {
  h1: 'na-h1',
  h2: 'na-h2',
  h4: 'na-h4',
  data: 'na-data',
  'data-large': 'na-data-large',
  metadata: 'na-metadata',
} as const;

