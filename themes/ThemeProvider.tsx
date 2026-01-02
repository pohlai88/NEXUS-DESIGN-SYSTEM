/**
 * Theme Provider
 * 
 * React context provider for theme management
 */

import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import {
  ThemeContext,
  ThemeAction,
  themeReducer,
  createThemeContext,
  applyTheme,
  type CustomTheme
} from './theme-machine';

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: 'default' | string;
  customThemes?: CustomTheme[];
}

const ThemeContextValue = createContext<{
  state: ThemeContext;
  dispatch: React.Dispatch<ThemeAction>;
} | null>(null);

export function ThemeProvider({
  children,
  initialTheme = 'default',
  customThemes = []
}: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, createThemeContext(), (initial) => {
    // Register initial custom themes
    const context = { ...initial };
    customThemes.forEach(theme => {
      context.customThemes.set(theme.name, theme);
      context.availableThemes.push(theme.name);
    });

    // Set initial theme
    if (initialTheme === 'default') {
      context.currentTheme = { mode: 'default' };
    } else {
      const theme = context.customThemes.get(initialTheme);
      if (theme) {
        context.currentTheme = { mode: 'custom', theme };
      }
    }

    return context;
  });

  // Apply theme to document when it changes
  useEffect(() => {
    applyTheme(state.currentTheme);
  }, [state.currentTheme]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ThemeContextValue.Provider value={value}>
      {children}
    </ThemeContextValue.Provider>
  );
}

/**
 * Hook to access theme context
 */
export function useTheme() {
  const context = useContext(ThemeContextValue);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

/**
 * Hook to switch themes
 */
export function useThemeSwitch() {
  const { dispatch } = useTheme();

  return {
    switchToDefault: () => dispatch({ type: 'SWITCH_TO_DEFAULT' }),
    switchToCustom: (themeName: string) => 
      dispatch({ type: 'SWITCH_TO_CUSTOM', themeName }),
    registerTheme: (theme: CustomTheme) => 
      dispatch({ type: 'REGISTER_THEME', theme }),
    unregisterTheme: (themeName: string) => 
      dispatch({ type: 'UNREGISTER_THEME', themeName }),
    updateTheme: (themeName: string, updates: Partial<CustomTheme>) =>
      dispatch({ type: 'UPDATE_THEME', themeName, updates })
  };
}

/**
 * Hook to get current theme info
 */
export function useCurrentTheme() {
  const { state } = useTheme();
  return {
    mode: state.currentTheme.mode,
    theme: state.currentTheme.mode === 'custom' ? state.currentTheme.theme : null,
    availableThemes: state.availableThemes,
    isDefault: state.currentTheme.mode === 'default',
    isCustom: state.currentTheme.mode === 'custom'
  };
}

