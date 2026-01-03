/**
 * Adapter Registry Tests
 * 
 * Tests for adapter registry and framework selection
 */

import { describe, it, expect } from 'vitest';
import {
  getAdapter,
  getAvailableFrameworks,
  isFrameworkSupported,
} from '../../adapters/index.js';
import { UnsupportedFrameworkError } from '../../adapters/universal/errors.js';

describe('getAdapter', () => {
  it('returns React adapter for react framework', () => {
    const adapter = getAdapter('react');

    expect(adapter).toBeDefined();
    expect(adapter).toHaveProperty('generate');
    expect(adapter).toHaveProperty('getDependencies');
  });

  it('throws for unsupported framework', () => {
    expect(() => getAdapter('vue' as any)).toThrow(UnsupportedFrameworkError);
  });
});

describe('getAvailableFrameworks', () => {
  it('returns list of available frameworks', () => {
    const frameworks = getAvailableFrameworks();

    expect(frameworks).toContain('react');
    expect(Array.isArray(frameworks)).toBe(true);
  });
});

describe('isFrameworkSupported', () => {
  it('returns true for supported framework', () => {
    expect(isFrameworkSupported('react')).toBe(true);
  });

  it('returns false for unsupported framework', () => {
    expect(isFrameworkSupported('vue')).toBe(false);
    expect(isFrameworkSupported('angular')).toBe(false);
  });
});

