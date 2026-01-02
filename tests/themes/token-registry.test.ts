/**
 * Token Registry Tests
 */

import { describe, it, expect } from 'vitest';
import {
  TOKEN_REGISTRY,
  getTailwindToken,
  getShadcnToken,
  getTailwindFromFigma,
  normalizeTokenKey,
} from '../../themes/token-registry';

describe('Token Registry', () => {
  describe('getTailwindToken', () => {
    it('should return Tailwind v4 token for known keys', () => {
      expect(getTailwindToken('void')).toBe('--color-void');
      expect(getTailwindToken('paper')).toBe('--color-paper');
      expect(getTailwindToken('lux')).toBe('--color-lux');
      expect(getTailwindToken('primary')).toBe('--color-primary');
      expect(getTailwindToken('spacing6')).toBe('--spacing-6');
      expect(getTailwindToken('fontSizeBase')).toBe('--font-size-base');
    });

    it('should return null for unknown keys', () => {
      expect(getTailwindToken('unknownKey')).toBeNull();
    });
  });

  describe('getShadcnToken', () => {
    it('should return ShadCN token for known keys', () => {
      expect(getShadcnToken('background')).toBe('--color-background');
      expect(getShadcnToken('foreground')).toBe('--color-foreground');
      expect(getShadcnToken('primary')).toBe('--color-primary');
      expect(getShadcnToken('card')).toBe('--color-card');
    });

    it('should return null for unknown keys', () => {
      expect(getShadcnToken('unknownKey')).toBeNull();
    });
  });

  describe('getTailwindFromFigma', () => {
    it('should map Figma variables to Tailwind tokens', () => {
      expect(getTailwindFromFigma('color/background')).toBe('--color-void');
      expect(getTailwindFromFigma('color/surface')).toBe('--color-paper');
      expect(getTailwindFromFigma('color/text/primary')).toBe('--color-lux');
      expect(getTailwindFromFigma('spacing/base')).toBe('--spacing-6');
    });

    it('should return null for unknown Figma keys', () => {
      expect(getTailwindFromFigma('unknown/figma/key')).toBeNull();
    });
  });

  describe('normalizeTokenKey', () => {
    it('should return Tailwind token if in registry', () => {
      expect(normalizeTokenKey('void')).toBe('--color-void');
      expect(normalizeTokenKey('primary')).toBe('--color-primary');
    });

    it('should return CSS variable as-is if already formatted', () => {
      expect(normalizeTokenKey('--color-void')).toBe('--color-void');
      expect(normalizeTokenKey('--custom-var')).toBe('--custom-var');
    });

    it('should fallback to --aibos-* format for unknown keys', () => {
      expect(normalizeTokenKey('customToken')).toBe('--aibos-custom-token');
      expect(normalizeTokenKey('myCustomKey')).toBe('--aibos-my-custom-key');
    });
  });

  describe('TOKEN_REGISTRY', () => {
    it('should have comprehensive Tailwind v4 mappings', () => {
      expect(TOKEN_REGISTRY.tailwind.void).toBe('--color-void');
      expect(TOKEN_REGISTRY.tailwind.paper).toBe('--color-paper');
      expect(TOKEN_REGISTRY.tailwind.spacing6).toBe('--spacing-6');
      expect(TOKEN_REGISTRY.tailwind.fontSizeBase).toBe('--font-size-base');
    });

    it('should have ShadCN mappings', () => {
      expect(TOKEN_REGISTRY.shadcn.background).toBe('--color-background');
      expect(TOKEN_REGISTRY.shadcn.primary).toBe('--color-primary');
      expect(TOKEN_REGISTRY.shadcn.card).toBe('--color-card');
    });

    it('should have Figma mappings', () => {
      expect(TOKEN_REGISTRY.figma['color/background']).toBe('--color-void');
      expect(TOKEN_REGISTRY.figma['color/surface']).toBe('--color-paper');
      expect(TOKEN_REGISTRY.figma['spacing/base']).toBe('--spacing-6');
    });
  });
});

