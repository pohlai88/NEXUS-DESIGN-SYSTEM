/**
 * Theme Machine
 * 
 * State machine for managing theme switching between default and custom themes
 * 
 * Enhanced with unified token registry for Tailwind v4, ShadCN, and Figma compatibility
 */

import {
  TOKEN_REGISTRY,
  getTailwindToken,
  getShadcnToken,
  normalizeTokenKey,
} from './token-registry';

export type ThemeMode = 'default' | 'custom';

export type ThemeState = 
  | { mode: 'default' }
  | { mode: 'custom'; theme: CustomTheme };

export interface CustomTheme {
  name: string;
  tokens: Record<string, string | number>;
  cssVariables?: Record<string, string>;
}

export interface ThemeContext {
  currentTheme: ThemeState;
  availableThemes: string[];
  customThemes: Map<string, CustomTheme>;
}

/**
 * Theme Machine Actions
 */
export type ThemeAction =
  | { type: 'SWITCH_TO_DEFAULT' }
  | { type: 'SWITCH_TO_CUSTOM'; themeName: string }
  | { type: 'REGISTER_THEME'; theme: CustomTheme }
  | { type: 'UNREGISTER_THEME'; themeName: string }
  | { type: 'UPDATE_THEME'; themeName: string; updates: Partial<CustomTheme> };

/**
 * Theme Machine Reducer
 */
export function themeReducer(
  state: ThemeContext,
  action: ThemeAction
): ThemeContext {
  switch (action.type) {
    case 'SWITCH_TO_DEFAULT':
      return {
        ...state,
        currentTheme: { mode: 'default' }
      };

    case 'SWITCH_TO_CUSTOM': {
      const theme = state.customThemes.get(action.themeName);
      if (!theme) {
        console.warn(`Theme "${action.themeName}" not found. Staying on current theme.`);
        return state;
      }
      return {
        ...state,
        currentTheme: { mode: 'custom', theme }
      };
    }

    case 'REGISTER_THEME': {
      const newThemes = new Map(state.customThemes);
      newThemes.set(action.theme.name, action.theme);
      return {
        ...state,
        customThemes: newThemes,
        availableThemes: [...state.availableThemes, action.theme.name]
      };
    }

    case 'UNREGISTER_THEME': {
      const newThemes = new Map(state.customThemes);
      newThemes.delete(action.themeName);
      
      // If current theme is being unregistered, switch to default
      const newCurrentTheme = 
        state.currentTheme.mode === 'custom' && 
        state.currentTheme.theme.name === action.themeName
          ? { mode: 'default' as const }
          : state.currentTheme;

      return {
        ...state,
        customThemes: newThemes,
        availableThemes: state.availableThemes.filter(t => t !== action.themeName),
        currentTheme: newCurrentTheme
      };
    }

    case 'UPDATE_THEME': {
      const theme = state.customThemes.get(action.themeName);
      if (!theme) {
        console.warn(`Theme "${action.themeName}" not found.`);
        return state;
      }

      const updatedTheme: CustomTheme = {
        ...theme,
        ...action.updates,
        tokens: { ...theme.tokens, ...action.updates.tokens },
        cssVariables: { ...theme.cssVariables, ...action.updates.cssVariables }
      };

      const newThemes = new Map(state.customThemes);
      newThemes.set(action.themeName, updatedTheme);

      // Update current theme if it's the one being updated
      const newCurrentTheme = 
        state.currentTheme.mode === 'custom' && 
        state.currentTheme.theme.name === action.themeName
          ? { mode: 'custom' as const, theme: updatedTheme }
          : state.currentTheme;

      return {
        ...state,
        customThemes: newThemes,
        currentTheme: newCurrentTheme
      };
    }

    default:
      return state;
  }
}

/**
 * Create initial theme context
 */
export function createThemeContext(): ThemeContext {
  return {
    currentTheme: { mode: 'default' },
    availableThemes: ['default'],
    customThemes: new Map()
  };
}

/**
 * Apply theme to document
 * 
 * Enhanced to support:
 * - Tailwind v4 token mapping (--color-*, --font-*, --spacing-*)
 * - ShadCN UI variable mapping (--color-background, --color-primary, etc.)
 * - Custom CSS variables
 * - Fallback to --aibos-* for unknown tokens
 */
export function applyTheme(theme: ThemeState): void {
  // Check if we're in a browser environment (for SSR safety)
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;

  if (theme.mode === 'default') {
    // Remove custom theme variables
    root.removeAttribute('data-theme');
    
    // Remove all custom CSS variables that might have been set
    // This includes Tailwind v4, ShadCN, and custom variables
    const customVars: string[] = [];
    
    // Collect all custom variables from style attribute
    for (let i = 0; i < root.style.length; i++) {
      const prop = root.style[i];
      if (prop.startsWith('--')) {
        customVars.push(prop);
      }
    }
    
    // Remove all custom variables
    customVars.forEach(prop => {
      root.style.removeProperty(prop);
    });
  } else {
    // Apply custom theme
    root.setAttribute('data-theme', theme.theme.name);
    
    // Apply direct CSS variables first (highest priority)
    if (theme.theme.cssVariables) {
      Object.entries(theme.theme.cssVariables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }

    // Apply token overrides with unified mapping
    Object.entries(theme.theme.tokens).forEach(([key, value]) => {
      const stringValue = String(value);
      
      // 1. Try Tailwind v4 token mapping (for utility classes)
      const tailwindVar = getTailwindToken(key);
      if (tailwindVar) {
        root.style.setProperty(tailwindVar, stringValue);
      }
      
      // 2. Try ShadCN token mapping (for component theming)
      const shadcnVar = getShadcnToken(key);
      if (shadcnVar && shadcnVar !== tailwindVar) {
        // Only set if different from Tailwind var to avoid duplicates
        root.style.setProperty(shadcnVar, stringValue);
      }
      
      // 3. Fallback to normalized key (--aibos-* or direct CSS var)
      const normalizedVar = normalizeTokenKey(key);
      if (!tailwindVar && !shadcnVar) {
        // Only use fallback if not already mapped
        root.style.setProperty(normalizedVar, stringValue);
      }
    });
  }
}

/**
 * Get current theme CSS variables
 * 
 * Returns all CSS variables that would be applied, including:
 * - Tailwind v4 tokens
 * - ShadCN variables
 * - Custom CSS variables
 * - Fallback variables
 */
export function getThemeCSSVariables(theme: ThemeState): Record<string, string> {
  if (theme.mode === 'default') {
    return {};
  }

  const vars: Record<string, string> = {};
  
  // Add direct CSS variables
  if (theme.theme.cssVariables) {
    Object.assign(vars, theme.theme.cssVariables);
  }

  // Convert tokens to CSS variables with unified mapping
  Object.entries(theme.theme.tokens).forEach(([key, value]) => {
    const stringValue = String(value);
    
    // Add Tailwind v4 token
    const tailwindVar = getTailwindToken(key);
    if (tailwindVar) {
      vars[tailwindVar] = stringValue;
    }
    
    // Add ShadCN token (if different)
    const shadcnVar = getShadcnToken(key);
    if (shadcnVar && shadcnVar !== tailwindVar) {
      vars[shadcnVar] = stringValue;
    }
    
    // Add fallback variable (if not already mapped)
    if (!tailwindVar && !shadcnVar) {
      const normalizedVar = normalizeTokenKey(key);
      vars[normalizedVar] = stringValue;
    }
  });

  return vars;
}

