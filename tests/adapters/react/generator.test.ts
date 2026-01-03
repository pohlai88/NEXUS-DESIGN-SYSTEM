/**
 * React Adapter Generator Tests
 * 
 * Comprehensive test coverage for React component generation
 */

import { describe, it, expect } from 'vitest';
import { generateReactComponent, reactAdapter } from '../../../adapters/react/adapter.js';
import type { ComponentSpec } from '../../../types/component-spec.js';
import type { AdapterConfig } from '../../../adapters/universal/adapter.js';
import { InvalidSpecError } from '../../../adapters/universal/errors.js';

describe('generateReactComponent', () => {
  const baseConfig: AdapterConfig = {
    framework: 'react',
    outputDir: './test-output',
  };

  it('generates correct props interface', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn', 'na-btn-primary'] },
      },
      props: {
        variant: { type: 'string', default: 'primary' },
        disabled: { type: 'boolean', required: false },
      },
    };

    const result = generateReactComponent(spec, baseConfig);

    expect(result.code).toContain('ButtonProps');
    expect(result.code).toContain('variant?: string');
    expect(result.code).toContain('disabled?: boolean');
    expect(result.dependencies).toContain('react');
  });

  it('generates correct variant class map', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn', 'na-btn-primary'] },
        secondary: { aibosClasses: ['na-btn', 'na-btn-secondary'] },
      },
    };

    const result = generateReactComponent(spec, baseConfig);

    expect(result.code).toContain("'primary'");
    expect(result.code).toContain("'secondary'");
    expect(result.code).toContain('na-btn-primary');
    expect(result.code).toContain('na-btn-secondary');
  });

  it('handles union type props correctly', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
      props: {
        variant: { type: 'primary | secondary | danger', default: 'primary' },
      },
    };

    const result = generateReactComponent(spec, baseConfig);

    expect(result.code).toContain('variant?: "primary" | "secondary" | "danger"');
  });

  it('includes Radix UI imports when radixPrimitive is set', () => {
    const spec: ComponentSpec = {
      name: 'Dialog',
      radixPrimitive: '@radix-ui/react-dialog',
      variants: {
        default: { aibosClasses: ['na-dialog'] },
      },
    };

    const result = generateReactComponent(spec, baseConfig);

    expect(result.code).toContain("@radix-ui/react-dialog");
    expect(result.code).toContain('DialogPrimitive');
    expect(result.dependencies).toContain('@radix-ui/react-dialog');
  });

  it('generates state classes for disabled state', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
      states: {
        disabled: { aibosClasses: ['opacity-50', 'cursor-not-allowed'] },
      },
    };

    const result = generateReactComponent(spec, baseConfig);

    expect(result.code).toContain('disabled');
    expect(result.code).toContain('opacity-50');
    expect(result.code).toContain('cursor-not-allowed');
  });

  it('generates state classes for loading state', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
      states: {
        loading: { aibosClasses: ['na-shimmer'] },
      },
    };

    const result = generateReactComponent(spec, baseConfig);

    expect(result.code).toContain('loading');
    expect(result.code).toContain('na-shimmer');
  });

  it('uses correct native element', () => {
    const spec: ComponentSpec = {
      name: 'Input',
      nativeElement: 'input',
      variants: {
        default: { aibosClasses: ['na-input'] },
      },
    };

    const result = generateReactComponent(spec, baseConfig);

    expect(result.code).toContain('InputHTMLAttributes');
    expect(result.code).toContain('<input');
  });

  it('throws error for invalid spec without name', () => {
    const spec = {
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
    } as unknown as ComponentSpec;

    expect(() => generateReactComponent(spec, baseConfig)).toThrow(
      InvalidSpecError
    );
  });

  it('throws error for spec without variants', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {},
    };

    expect(() => generateReactComponent(spec, baseConfig)).toThrow(
      InvalidSpecError
    );
  });

  it('generates composite component with parts', () => {
    const spec: ComponentSpec = {
      name: 'Dialog',
      radixPrimitive: '@radix-ui/react-dialog',
      variants: {
        default: { aibosClasses: ['na-dialog'] },
      },
      parts: {
        Root: { aibosClasses: ['na-dialog'] },
        Trigger: { aibosClasses: ['na-btn'] },
        Content: { aibosClasses: ['na-card'] },
      },
    };

    const result = generateReactComponent(spec, baseConfig);

    expect(result.code).toContain('DialogTrigger');
    expect(result.code).toContain('DialogContent');
    expect(result.code).toContain('DialogPrimitive.Trigger');
    expect(result.code).toContain('DialogPrimitive.Content');
  });

  it('includes correct utility imports', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
    };

    const result = generateReactComponent(spec, baseConfig);

    expect(result.code).toContain("from '@aibos/design-system/utils'");
    expect(result.code).toContain("from '@aibos/design-system/css'");
  });
});

describe('reactAdapter', () => {
  it('implements UniversalAdapter interface', () => {
    expect(reactAdapter).toHaveProperty('generate');
    expect(reactAdapter).toHaveProperty('getDependencies');
    expect(typeof reactAdapter.generate).toBe('function');
    expect(typeof reactAdapter.getDependencies).toBe('function');
  });

  it('returns correct dependencies', () => {
    const spec: ComponentSpec = {
      name: 'Button',
      variants: {
        primary: { aibosClasses: ['na-btn'] },
      },
    };

    const deps = reactAdapter.getDependencies(spec);

    expect(deps).toContain('react');
    expect(deps).toContain('react-dom');
  });

  it('includes Radix dependency when radixPrimitive is set', () => {
    const spec: ComponentSpec = {
      name: 'Dialog',
      radixPrimitive: '@radix-ui/react-dialog',
      variants: {
        default: { aibosClasses: ['na-dialog'] },
      },
    };

    const deps = reactAdapter.getDependencies(spec);

    expect(deps).toContain('@radix-ui/react-dialog');
  });
});

