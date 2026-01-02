/**
 * Theme Machine
 * 
 * State machine for managing theme switching between default and custom themes
 */

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
 */
export function applyTheme(theme: ThemeState): void {
  const root = document.documentElement;

  if (theme.mode === 'default') {
    // Remove custom theme variables
    root.removeAttribute('data-theme');
    // Reset to default - remove any custom CSS variables
    const customVars = Array.from(root.style).filter(prop => 
      prop.startsWith('--') && prop.startsWith('--aibos-')
    );
    customVars.forEach(prop => {
      root.style.removeProperty(prop);
    });
  } else {
    // Apply custom theme
    root.setAttribute('data-theme', theme.theme.name);
    
    // Apply CSS variables
    if (theme.theme.cssVariables) {
      Object.entries(theme.theme.cssVariables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }

    // Apply token overrides via CSS variables
    Object.entries(theme.theme.tokens).forEach(([key, value]) => {
      const cssVar = `--aibos-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, String(value));
    });
  }
}

/**
 * Get current theme CSS variables
 */
export function getThemeCSSVariables(theme: ThemeState): Record<string, string> {
  if (theme.mode === 'default') {
    return {};
  }

  const vars: Record<string, string> = {};
  
  if (theme.theme.cssVariables) {
    Object.assign(vars, theme.theme.cssVariables);
  }

  // Convert tokens to CSS variables
  Object.entries(theme.theme.tokens).forEach(([key, value]) => {
    const cssVar = `--aibos-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    vars[cssVar] = String(value);
  });

  return vars;
}

