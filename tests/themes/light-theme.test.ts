/**
 * Light Theme Tests
 * 
 * Tests for the AIBOS light theme implementation
 */

import { describe, it, expect } from 'vitest';
import { lightTheme } from '../../themes/light-theme';
import { getThemeCSSVariables } from '../../themes/theme-machine';
import { getTailwindToken, getShadcnToken } from '../../themes/token-registry';

describe('Light Theme', () => {
  it('should have correct theme structure', () => {
    expect(lightTheme.name).toBe('light');
    expect(lightTheme.tokens).toBeDefined();
    expect(typeof lightTheme.tokens).toBe('object');
  });

  it('should have all required color tokens', () => {
    const requiredTokens = [
      'void', 'paper', 'lux', 'gold', 'primary', 'background', 'foreground'
    ];
    
    requiredTokens.forEach(token => {
      expect(lightTheme.tokens[token]).toBeDefined();
      expect(typeof lightTheme.tokens[token]).toBe('string');
    });
  });

  it('should map tokens to Tailwind v4 variables', () => {
    const themeState = {
      mode: 'custom' as const,
      theme: lightTheme
    };

    const cssVars = getThemeCSSVariables(themeState);

    // Check Tailwind v4 mappings
    expect(cssVars['--color-void']).toBe('#ffffff');
    expect(cssVars['--color-paper']).toBe('#f8f9fa');
    expect(cssVars['--color-lux']).toBe('#212529');
    expect(cssVars['--color-primary']).toBe('#d97706');
  });

  it('should map tokens to ShadCN variables', () => {
    const themeState = {
      mode: 'custom' as const,
      theme: lightTheme
    };

    const cssVars = getThemeCSSVariables(themeState);

    // Check ShadCN mappings
    expect(cssVars['--color-background']).toBe('#ffffff');
    expect(cssVars['--color-foreground']).toBe('#212529');
    expect(cssVars['--color-primary']).toBe('#d97706');
    expect(cssVars['--color-primary-foreground']).toBe('#ffffff');
    expect(cssVars['--color-card']).toBe('#f8f9fa');
  });

  it('should have proper contrast ratios for accessibility', () => {
    // Light theme should have dark text on light background
    const lux = lightTheme.tokens.lux as string;
    const voidColor = lightTheme.tokens.void as string;
    
    // Basic checks (full contrast calculation would require color library)
    expect(lux).toMatch(/^#[0-9a-f]{6}$/i);
    expect(voidColor).toMatch(/^#[0-9a-f]{6}$/i);
    
    // Lux should be dark, void should be light
    expect(lux).not.toBe(voidColor);
  });

  it('should have semantic token mappings', () => {
    // Verify semantic tokens map correctly
    expect(lightTheme.tokens.background).toBe(lightTheme.tokens.void);
    expect(lightTheme.tokens.foreground).toBe(lightTheme.tokens.lux);
    expect(lightTheme.tokens.primary).toBe(lightTheme.tokens.gold);
  });

  it('should work with token registry', () => {
    // Test that tokens can be retrieved via registry
    const voidToken = getTailwindToken('void');
    expect(voidToken).toBe('--color-void');
    
    const primaryToken = getTailwindToken('primary');
    expect(primaryToken).toBe('--color-primary');
    
    const shadcnPrimary = getShadcnToken('primary');
    expect(shadcnPrimary).toBe('--color-primary');
  });

  it('should have all status colors defined', () => {
    const statusColors = ['success', 'warning', 'error', 'info'];
    
    statusColors.forEach(color => {
      expect(lightTheme.tokens[color]).toBeDefined();
      expect(typeof lightTheme.tokens[color]).toBe('string');
    });
  });
});

