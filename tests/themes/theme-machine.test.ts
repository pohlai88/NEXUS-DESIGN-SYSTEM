/**
 * Theme Machine Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  themeReducer,
  createThemeContext,
  applyTheme,
  getThemeCSSVariables,
  type CustomTheme,
  type ThemeAction
} from '../../themes/theme-machine';

describe('Theme Machine', () => {
  let initialState: ReturnType<typeof createThemeContext>;

  beforeEach(() => {
    initialState = createThemeContext();
  });

  describe('createThemeContext', () => {
    it('should create initial context with default theme', () => {
      const context = createThemeContext();
      expect(context.currentTheme.mode).toBe('default');
      expect(context.availableThemes).toEqual(['default']);
      expect(context.customThemes.size).toBe(0);
    });
  });

  describe('SWITCH_TO_DEFAULT', () => {
    it('should switch to default theme', () => {
      const customTheme: CustomTheme = {
        name: 'dark',
        tokens: { primary: '#000000' }
      };
      
      initialState.customThemes.set('dark', customTheme);
      initialState.currentTheme = { mode: 'custom', theme: customTheme };

      const action: ThemeAction = { type: 'SWITCH_TO_DEFAULT' };
      const newState = themeReducer(initialState, action);

      expect(newState.currentTheme.mode).toBe('default');
    });
  });

  describe('SWITCH_TO_CUSTOM', () => {
    it('should switch to custom theme', () => {
      const customTheme: CustomTheme = {
        name: 'dark',
        tokens: { primary: '#000000' }
      };
      
      initialState.customThemes.set('dark', customTheme);
      initialState.availableThemes.push('dark');

      const action: ThemeAction = { type: 'SWITCH_TO_CUSTOM', themeName: 'dark' };
      const newState = themeReducer(initialState, action);

      expect(newState.currentTheme.mode).toBe('custom');
      expect(newState.currentTheme.theme.name).toBe('dark');
    });

    it('should not switch if theme does not exist', () => {
      const action: ThemeAction = { type: 'SWITCH_TO_CUSTOM', themeName: 'nonexistent' };
      const newState = themeReducer(initialState, action);

      expect(newState.currentTheme).toBe(initialState.currentTheme);
    });
  });

  describe('REGISTER_THEME', () => {
    it('should register a new theme', () => {
      const customTheme: CustomTheme = {
        name: 'dark',
        tokens: { primary: '#000000' }
      };

      const action: ThemeAction = { type: 'REGISTER_THEME', theme: customTheme };
      const newState = themeReducer(initialState, action);

      expect(newState.customThemes.has('dark')).toBe(true);
      expect(newState.availableThemes).toContain('dark');
    });
  });

  describe('UNREGISTER_THEME', () => {
    it('should unregister a theme', () => {
      const customTheme: CustomTheme = {
        name: 'dark',
        tokens: { primary: '#000000' }
      };
      
      initialState.customThemes.set('dark', customTheme);
      initialState.availableThemes.push('dark');

      const action: ThemeAction = { type: 'UNREGISTER_THEME', themeName: 'dark' };
      const newState = themeReducer(initialState, action);

      expect(newState.customThemes.has('dark')).toBe(false);
      expect(newState.availableThemes).not.toContain('dark');
    });

    it('should switch to default if unregistering current theme', () => {
      const customTheme: CustomTheme = {
        name: 'dark',
        tokens: { primary: '#000000' }
      };
      
      initialState.customThemes.set('dark', customTheme);
      initialState.availableThemes.push('dark');
      initialState.currentTheme = { mode: 'custom', theme: customTheme };

      const action: ThemeAction = { type: 'UNREGISTER_THEME', themeName: 'dark' };
      const newState = themeReducer(initialState, action);

      expect(newState.currentTheme.mode).toBe('default');
    });
  });

  describe('UPDATE_THEME', () => {
    it('should update theme tokens', () => {
      const customTheme: CustomTheme = {
        name: 'dark',
        tokens: { primary: '#000000' }
      };
      
      initialState.customThemes.set('dark', customTheme);
      initialState.currentTheme = { mode: 'custom', theme: customTheme };

      const action: ThemeAction = {
        type: 'UPDATE_THEME',
        themeName: 'dark',
        updates: { tokens: { primary: '#111111' } }
      };
      const newState = themeReducer(initialState, action);

      const updatedTheme = newState.customThemes.get('dark');
      expect(updatedTheme?.tokens.primary).toBe('#111111');
    });

    it('should update current theme if it matches', () => {
      const customTheme: CustomTheme = {
        name: 'dark',
        tokens: { primary: '#000000' }
      };
      
      initialState.customThemes.set('dark', customTheme);
      initialState.currentTheme = { mode: 'custom', theme: customTheme };

      const action: ThemeAction = {
        type: 'UPDATE_THEME',
        themeName: 'dark',
        updates: { tokens: { primary: '#111111' } }
      };
      const newState = themeReducer(initialState, action);

      expect(newState.currentTheme.mode).toBe('custom');
      expect(newState.currentTheme.theme.tokens.primary).toBe('#111111');
    });
  });

  describe('getThemeCSSVariables', () => {
    it('should return empty object for default theme', () => {
      const vars = getThemeCSSVariables({ mode: 'default' });
      expect(vars).toEqual({});
    });

    it('should convert tokens to CSS variables with unified mapping', () => {
      const theme = {
        mode: 'custom' as const,
        theme: {
          name: 'dark',
          tokens: { 
            primary: '#000000', // Should map to --color-primary (Tailwind) and --color-primary (ShadCN)
            lux: '#ffffff', // Should map to --color-lux (Tailwind)
            fontSizeBase: '18px' // Should map to --font-size-base (Tailwind)
          }
        }
      };

      const vars = getThemeCSSVariables(theme);
      
      // Check Tailwind v4 mapping
      expect(vars['--color-primary']).toBe('#000000');
      expect(vars['--color-lux']).toBe('#ffffff');
      expect(vars['--font-size-base']).toBe('18px');
      
      // Unknown tokens should use fallback
      const themeWithUnknown = {
        mode: 'custom' as const,
        theme: {
          name: 'dark',
          tokens: { customToken: 'value' }
        }
      };
      const unknownVars = getThemeCSSVariables(themeWithUnknown);
      expect(unknownVars['--aibos-custom-token']).toBe('value');
    });

    it('should include custom CSS variables', () => {
      const theme = {
        mode: 'custom' as const,
        theme: {
          name: 'dark',
          tokens: { primary: '#000000' },
          cssVariables: { '--custom-var': 'value' }
        }
      };

      const vars = getThemeCSSVariables(theme);
      expect(vars['--custom-var']).toBe('value');
    });
  });
});

