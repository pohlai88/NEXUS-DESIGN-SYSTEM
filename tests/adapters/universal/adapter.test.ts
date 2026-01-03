/**
 * Universal Adapter Tests
 * 
 * Tests for universal adapter utilities
 */

import { describe, it, expect } from 'vitest';
import {
  getVariantClasses,
  getStateClasses,
  getAllClasses,
  usesRadixUI,
  hasParts,
} from '../../../adapters/universal/adapter.js';
import type { ComponentSpec } from '../../../types/component-spec.js';

describe('getVariantClasses', () => {
  it('returns classes for valid variant', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn', 'na-btn-primary'] },
        secondary: { aibosClasses: ['na-btn', 'na-btn-secondary'] },
      },
    };

    expect(getVariantClasses(spec, 'primary')).toEqual([
      'na-btn',
      'na-btn-primary',
    ]);
    expect(getVariantClasses(spec, 'secondary')).toEqual([
      'na-btn',
      'na-btn-secondary',
    ]);
  });

  it('returns empty array for invalid variant', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
    };

    expect(getVariantClasses(spec, 'invalid')).toEqual([]);
  });
});

describe('getStateClasses', () => {
  it('returns classes for valid state', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
      states: {
        disabled: { aibosClasses: ['opacity-50', 'cursor-not-allowed'] },
        loading: { aibosClasses: ['na-shimmer'] },
      },
    };

    expect(getStateClasses(spec, 'disabled')).toEqual([
      'opacity-50',
      'cursor-not-allowed',
    ]);
    expect(getStateClasses(spec, 'loading')).toEqual(['na-shimmer']);
  });

  it('returns empty array for invalid state', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
    };

    expect(getStateClasses(spec, 'invalid')).toEqual([]);
  });

  it('returns empty array when states not defined', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
    };

    expect(getStateClasses(spec, 'disabled')).toEqual([]);
  });
});

describe('getAllClasses', () => {
  it('combines variant and state classes', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn', 'na-btn-primary'] },
      },
      states: {
        disabled: { aibosClasses: ['opacity-50'] },
      },
    };

    const classes = getAllClasses(spec, 'primary', 'disabled');

    expect(classes).toContain('na-btn');
    expect(classes).toContain('na-btn-primary');
    expect(classes).toContain('opacity-50');
  });

  it('returns only variant classes when no state', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn', 'na-btn-primary'] },
      },
    };

    const classes = getAllClasses(spec, 'primary');

    expect(classes).toEqual(['na-btn', 'na-btn-primary']);
  });
});

describe('usesRadixUI', () => {
  it('returns true when radixPrimitive is set', () => {
    const spec: ComponentSpec = {
      name: 'Dialog',
      radixPrimitive: '@radix-ui/react-dialog',
      variants: {
        default: { aibosClasses: ['na-dialog'] },
      },
    };

    expect(usesRadixUI(spec)).toBe(true);
  });

  it('returns false when radixPrimitive is null', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      radixPrimitive: null,
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
    };

    expect(usesRadixUI(spec)).toBe(false);
  });
});

describe('hasParts', () => {
  it('returns true when parts are defined', () => {
    const spec: ComponentSpec = {
      name: 'Dialog',
      variants: {
        default: { aibosClasses: ['na-dialog'] },
      },
      parts: {
        Root: { aibosClasses: ['na-dialog'] },
        Trigger: { aibosClasses: ['na-btn'] },
      },
    };

    expect(hasParts(spec)).toBe(true);
  });

  it('returns false when parts are not defined', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
    };

    expect(hasParts(spec)).toBe(false);
  });

  it('returns false when parts is empty object', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
      parts: {},
    };

    expect(hasParts(spec)).toBe(false);
  });
});

