/**
 * Card Component
 * 
 * AIBOS-enhanced NextUI Card component
 * Combines NextUI Card with AIBOS design system classes
 * 
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <h2 className="na-h4">Card Title</h2>
 *   </CardHeader>
 *   <CardBody>
 *     <div className="na-data">$12,450.00</div>
 *   </CardBody>
 * </Card>
 * ```
 */

import React from 'react';
import { Card as NextUICard, CardProps as NextUICardProps, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { cn } from '../utils.js';

export interface CardProps extends Omit<NextUICardProps, 'className'> {
  /**
   * Custom className - will be merged with AIBOS classes
   */
  className?: string;
  
  /**
   * Apply AIBOS card padding (na-p-6)
   * Default: true
   */
  withPadding?: boolean;
  
  /**
   * Apply AIBOS card styling
   * Default: true
   */
  withAIBOSStyles?: boolean;
}

/**
 * Card Component
 * 
 * Enhanced NextUI Card with AIBOS design system integration.
 * Automatically applies AIBOS card classes for consistent styling.
 */
export function Card({
  className,
  withPadding = true,
  withAIBOSStyles = true,
  ...props
}: CardProps): JSX.Element {
  const classes = cn(
    withAIBOSStyles && 'na-card',
    withPadding && 'na-p-6',
    className
  );

  return (
    <NextUICard
      className={classes}
      {...props}
    />
  );
}

// Re-export NextUI Card sub-components for convenience
export { CardHeader, CardBody, CardFooter };

export default Card;

