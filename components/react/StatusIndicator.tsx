/**
 * StatusIndicator Component
 * 
 * AIBOS Design System Status Indicator with NextUI integration
 * Provides accessible status indicators using AIBOS CSS classes
 * 
 * @example
 * ```tsx
 * <StatusIndicator variant="success" label="Complete" />
 * <StatusIndicator variant="error" label="Failed" />
 * ```
 */

import { cn } from '../utils.js';

export type StatusVariant = 'success' | 'error' | 'warning' | 'pending';

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Status variant
   * Maps to AIBOS CSS classes: ok, bad, warn, pending
   */
  variant: StatusVariant;
  
  /**
   * Status label text
   * Required - AIBOS guidelines require text labels with icons
   */
  label: string;
  
  /**
   * Optional size variant
   * Default: 'default'
   */
  size?: 'small' | 'default' | 'large';
  
  /**
   * Optional icon override
   * Default: true (uses AIBOS ::before pseudo-element dot)
   */
  showDot?: boolean;
  
  /**
   * Optional aria-live attribute for dynamic updates
   * Default: 'polite'
   */
  'aria-live'?: 'polite' | 'assertive' | 'off';
}

/**
 * Maps React variant prop to AIBOS CSS class
 */
const variantClassMap: Record<StatusVariant, string> = {
  success: 'ok',
  error: 'bad',
  warning: 'warn',
  pending: 'pending',
} as const;

/**
 * StatusIndicator Component
 * 
 * Renders an accessible status indicator using AIBOS design system classes.
 * Uses space-separated modifier classes (e.g., "na-status ok") as per AIBOS guidelines.
 */
export function StatusIndicator({
  variant,
  label,
  className,
  size = 'default',
  showDot = true,
  'aria-live': ariaLive = 'polite',
  ...props
}: StatusIndicatorProps): JSX.Element {
  // Map variant to AIBOS CSS class
  const variantClass = variantClassMap[variant];
  
  // Build className string with space-separated classes
  const classes = cn(
    'na-status',           // Base AIBOS class
    variantClass,          // Variant class (ok, bad, warn, pending) - space-separated
    size !== 'default' && `na-status-${size}`, // Optional size modifier
    className              // Custom classes
  );

  return (
    <span
      className={classes}
      role="status"
      aria-label={`Status: ${label}`}
      aria-live={ariaLive}
      {...props}
    >
      {label}
    </span>
  );
}

export default StatusIndicator;

