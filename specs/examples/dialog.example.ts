/**
 * Example: Dialog Component Specification (TypeScript)
 * 
 * Example of a composite component using Radix UI with multiple parts.
 */

import type { ComponentSpec } from '../../types/component-spec.js';

export const dialogSpec: ComponentSpec = {
  name: 'Dialog',
  description: 'Modal dialog component built on Radix UI',
  
  // Using Radix UI primitive
  radixPrimitive: '@radix-ui/react-dialog',
  nativeElement: null,
  
  // Props for the root component
  props: {
    open: {
      type: 'boolean',
      required: false,
      description: 'Whether the dialog is open',
    },
    onOpenChange: {
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback when open state changes',
    },
  },
  
  // Single variant (can have multiple)
  variants: {
    default: {
      aibosClasses: ['na-dialog'],
      description: 'Default dialog variant',
    },
  },
  
  // Composite component with multiple parts
  parts: {
    Root: {
      aibosClasses: ['na-dialog'],
      description: 'Root dialog container',
    },
    Trigger: {
      aibosClasses: ['na-btn'],
      description: 'Button that opens the dialog',
    },
    Content: {
      aibosClasses: ['na-card'],
      description: 'Dialog content panel',
    },
    Title: {
      aibosClasses: ['na-h4'],
      description: 'Dialog title',
    },
    Description: {
      aibosClasses: ['na-metadata'],
      description: 'Dialog description text',
    },
    Close: {
      aibosClasses: ['na-iconbtn'],
      description: 'Close button',
    },
  },
  
  // Accessibility handled by Radix UI
  accessibility: {
    handledBy: 'radix-ui',
    features: [
      'Focus trap',
      'Keyboard navigation',
      'ARIA attributes',
      'Screen reader support',
    ],
  },
  
  metadata: {
    category: 'feedback',
    tags: ['modal', 'dialog', 'overlay'],
    related: ['sheet', 'popover', 'alert-dialog'],
    complexity: 'moderate',
  },
};

