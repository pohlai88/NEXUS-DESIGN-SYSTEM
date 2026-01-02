/**
 * Utility Functions Tests
 */

import { describe, it, expect } from 'vitest';
import { cn } from '../../adapters/react/utils';

describe('cn utility', () => {
  it('should merge class names', () => {
    const result = cn('class1', 'class2');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toContain('base');
    expect(result).toContain('active');
  });

  it('should handle false conditional classes', () => {
    const isActive = false;
    const result = cn('base', isActive && 'active');
    expect(result).toContain('base');
    expect(result).not.toContain('active');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
    expect(result).toContain('class3');
  });

  it('should handle undefined and null', () => {
    const result = cn('base', undefined, null, 'valid');
    expect(result).toContain('base');
    expect(result).toContain('valid');
  });

  it('should merge Tailwind classes correctly', () => {
    const result = cn('p-4 p-6', 'p-8');
    // tailwind-merge should keep only p-8
    expect(result).toContain('p-8');
  });
});

