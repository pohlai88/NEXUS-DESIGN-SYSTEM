/**
 * Button Component
 * 
 * AIBOS-enhanced NextUI Button component
 * Combines NextUI Button with AIBOS design system classes
 * 
 * @example
 * ```tsx
 * <Button variant="primary">Click me</Button>
 * <Button variant="secondary">Cancel</Button>
 * ```
 */

import React from 'react';
import { Button as NextUIButton, ButtonProps as NextUIButtonProps } from '@nextui-org/react';
import { cn } from '../utils.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps extends Omit<NextUIButtonProps, 'className' | 'variant'> {
  /**
   * Custom className - will be merged with AIBOS classes
   */
  className?: string;
  
  /**
   * Button variant
   * Maps to AIBOS button classes
   */
  variant?: ButtonVariant;
  
  /**
   * Apply AIBOS button styling
   * Default: true
   */
  withAIBOSStyles?: boolean;
}

/**
 * Maps Button variant to AIBOS classes
 */
const variantClassMap: Record<ButtonVariant, string> = {
  primary: 'na-btn-primary',
  secondary: 'na-btn-secondary',
  ghost: 'na-btn-ghost',
  danger: 'na-btn-danger',
} as const;

/**
 * Button Component
 * 
 * Enhanced NextUI Button with AIBOS design system integration.
 * Automatically applies AIBOS button classes for consistent styling.
 */
export function Button({
  className,
  variant = 'primary',
  withAIBOSStyles = true,
  color,
  ...props
}: ButtonProps): JSX.Element {
  // Map AIBOS variant to NextUI color if not provided
  const nextUIColor = color || (variant === 'primary' ? 'primary' : 
                                variant === 'danger' ? 'danger' : 
                                variant === 'secondary' ? 'secondary' : 'default');

  const classes = cn(
    withAIBOSStyles && variantClassMap[variant],
    className
  );

  return (
    <NextUIButton
      className={classes}
      color={nextUIColor}
      {...props}
    />
  );
}

export default Button;

