/**
 * Adapter Error Tests
 * 
 * Tests for error handling and validation
 */

import { describe, it, expect } from 'vitest';
import {
  AdapterError,
  InvalidSpecError,
  MissingDependencyError,
  UnsupportedFrameworkError,
  validateSpec,
} from '../../../adapters/universal/errors.js';
import type { ComponentSpec } from '../../../types/component-spec.js';

describe('AdapterError', () => {
  it('creates error with component name and reason', () => {
    const error = new AdapterError('Button', 'Test error');

    expect(error.component).toBe('Button');
    expect(error.reason).toBe('Test error');
    expect(error.message).toContain('Button');
    expect(error.message).toContain('Test error');
    expect(error.name).toBe('AdapterError');
  });

  it('includes spec in error', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: { primary: { aibosClasses: ['na-btn'] } },
    };
    const error = new AdapterError('Button', 'Test error', spec);

    expect(error.spec).toBe(spec);
  });
});

describe('InvalidSpecError', () => {
  it('creates error with InvalidSpecError name', () => {
    const error = new InvalidSpecError('Button', 'Missing variants');

    expect(error.name).toBe('InvalidSpecError');
    expect(error.message).toContain('Invalid specification');
  });
});

describe('MissingDependencyError', () => {
  it('creates error for missing dependency', () => {
    const error = new MissingDependencyError('Button', 'react');

    expect(error.name).toBe('MissingDependencyError');
    expect(error.message).toContain('react');
  });
});

describe('UnsupportedFrameworkError', () => {
  it('creates error for unsupported framework', () => {
    const error = new UnsupportedFrameworkError('vue');

    expect(error.name).toBe('UnsupportedFrameworkError');
    expect(error.message).toContain('vue');
  });
});

describe('validateSpec', () => {
  it('passes for valid spec', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn', 'na-btn-primary'] },
      },
    };

    expect(() => validateSpec(spec)).not.toThrow();
  });

  it('throws for missing name', () => {
    const spec = {
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
    } as unknown as ComponentSpec;

    expect(() => validateSpec(spec)).toThrow(InvalidSpecError);
  });

  it('throws for missing variants', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {},
    };

    expect(() => validateSpec(spec)).toThrow(InvalidSpecError);
  });

  it('throws for variant without aibosClasses', () => {
    const spec = {
      name: 'Button',
      variants: {
        primary: {},
      },
    } as unknown as ComponentSpec;

    expect(() => validateSpec(spec)).toThrow(InvalidSpecError);
  });

  it('throws for composite component without radixPrimitive', () => {
    const spec: ComponentSpec = {
      name: 'Dialog',
      variants: {
        default: { aibosClasses: ['na-dialog'] },
      },
      parts: {
        Root: { aibosClasses: ['na-dialog'] },
      },
    };

    expect(() => validateSpec(spec)).toThrow(InvalidSpecError);
  });

  it('throws for composite component without Root part', () => {
    const spec: ComponentSpec = {
      name: 'Dialog',
      radixPrimitive: '@radix-ui/react-dialog',
      variants: {
        default: { aibosClasses: ['na-dialog'] },
      },
      parts: {
        Trigger: { aibosClasses: ['na-btn'] },
      },
    };

    expect(() => validateSpec(spec)).toThrow(InvalidSpecError);
  });

  it('passes for composite component with Root part', () => {
    const spec: ComponentSpec = {
      name: 'Dialog',
      radixPrimitive: '@radix-ui/react-dialog',
      variants: {
        default: { aibosClasses: ['na-dialog'] },
      },
      parts: {
        Root: { aibosClasses: ['na-dialog'] },
        Trigger: { aibosClasses: ['na-btn'] },
      },
    };

    expect(() => validateSpec(spec)).not.toThrow();
  });
});

