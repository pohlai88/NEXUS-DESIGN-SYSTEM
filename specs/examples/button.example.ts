/**
 * Example: Button Component Specification (TypeScript)
 * 
 * This is a TypeScript example of how to define component specifications.
 * You can use this as a template for creating new components.
 * 
 * Note: The build system currently uses JSON files, but TypeScript specs
 * can be converted to JSON for use with the engine.
 */

import type { ComponentSpec } from '../../types/component-spec.js';

export const buttonSpec: ComponentSpec = {
  name: 'Button',
  description: 'Interactive button component for triggering actions',
  
  // Native element (not using Radix UI)
  radixPrimitive: null,
  nativeElement: 'button',
  
  // Props definition
  props: {
    variant: {
      type: 'primary | secondary | danger | ghost',
      default: 'primary',
      required: false,
      description: 'Visual style variant',
    },
    size: {
      type: 'sm | md | lg',
      default: 'md',
      required: false,
      description: 'Button size',
    },
    disabled: {
      type: 'boolean',
      default: false,
      required: false,
      description: 'Whether the button is disabled',
    },
    loading: {
      type: 'boolean',
      default: false,
      required: false,
      description: 'Whether the button is in loading state',
    },
  },
  
  // Visual variants
  variants: {
    primary: {
      aibosClasses: ['na-btn', 'na-btn-primary'],
      description: 'Primary action button',
    },
    secondary: {
      aibosClasses: ['na-btn', 'na-btn-secondary'],
      description: 'Secondary button',
    },
    danger: {
      aibosClasses: ['na-btn', 'na-btn-danger'],
      description: 'Destructive action button',
    },
    ghost: {
      aibosClasses: ['na-btn'],
      description: 'Ghost button with minimal styling',
    },
  },
  
  // State-specific styling
  states: {
    disabled: {
      aibosClasses: ['opacity-50', 'cursor-not-allowed'],
      description: 'Disabled state',
    },
    loading: {
      aibosClasses: ['na-shimmer'],
      description: 'Loading state',
    },
  },
  
  // Accessibility metadata
  accessibility: {
    handledBy: 'native',
    aria: {
      ariaLabel: 'Required for icon-only buttons',
      ariaDisabled: 'When disabled',
    },
    keyboard: {
      enter: 'Activates button',
      space: 'Activates button',
      tab: 'Focus navigation',
    },
  },
  
  // Component metadata
  metadata: {
    category: 'interactive',
    tags: ['action', 'clickable', 'form'],
    related: ['link', 'icon-button', 'button-group'],
    complexity: 'simple',
  },
};

