/**
 * Theme Provider
 * 
 * React context provider for theme management
 * 
 * Enhanced with:
 * - Next.js SSR support (serverTheme prop)
 * - Hydration safety (mounted state)
 * - Cookie persistence
 * - Client-side theme sync
 */

'use client';

import React, { createContext, useContext, useReducer, useEffect, useMemo, useState } from 'react';
import {
  ThemeContext,
  ThemeAction,
  themeReducer,
  createThemeContext,
  applyTheme,
  type CustomTheme
} from './theme-machine';
import { getClientTheme, setClientTheme } from './ssr-utils';

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: 'default' | string;
  serverTheme?: string; // Theme from server (SSR)
  customThemes?: CustomTheme[];
  persistToCookie?: boolean; // Whether to persist theme to cookie (default: true)
}

const ThemeContextValue = createContext<{
  state: ThemeContext;
  dispatch: React.Dispatch<ThemeAction>;
} | null>(null);

export function ThemeProvider({
  children,
  initialTheme = 'default',
  serverTheme,
  customThemes = [],
  persistToCookie = true
}: ThemeProviderProps) {
  // Track mounted state to prevent hydration mismatches
  const [mounted, setMounted] = useState(false);

  const [state, dispatch] = useReducer(themeReducer, createThemeContext(), (initial) => {
    // Register initial custom themes
    const context = { ...initial };
    customThemes.forEach(theme => {
      context.customThemes.set(theme.name, theme);
      context.availableThemes.push(theme.name);
    });

    // Determine initial theme (priority: serverTheme > initialTheme > cookie > default)
    let resolvedTheme = initialTheme;

    if (serverTheme && serverTheme !== 'default') {
      resolvedTheme = serverTheme;
    } else if (typeof window !== 'undefined') {
      // Try to read from cookie on client
      const cookieTheme = getClientTheme();
      if (cookieTheme !== 'default') {
        resolvedTheme = cookieTheme;
      }
    }

    // Set initial theme
    if (resolvedTheme === 'default') {
      context.currentTheme = { mode: 'default' };
    } else {
      const theme = context.customThemes.get(resolvedTheme);
      if (theme) {
        context.currentTheme = { mode: 'custom', theme };
      } else {
        // Fallback to default if theme not found
        context.currentTheme = { mode: 'default' };
      }
    }

    return context;
  });

  // Sync with server theme on mount
  useEffect(() => {
    if (serverTheme && serverTheme !== 'default') {
      const theme = state.customThemes.get(serverTheme);
      const isCurrentTheme = state.currentTheme.mode === 'custom' && state.currentTheme.theme.name === serverTheme;
      if (theme && !isCurrentTheme) {
        dispatch({ type: 'SWITCH_TO_CUSTOM', themeName: serverTheme });
      }
    }
  }, [serverTheme, state.customThemes, state.currentTheme]);

  // Apply theme to document when it changes (after hydration)
  useEffect(() => {
    setMounted(true);
    applyTheme(state.currentTheme);

    // Persist to cookie if enabled
    if (persistToCookie && state.currentTheme.mode === 'custom') {
      setClientTheme(state.currentTheme.theme.name);
    } else if (persistToCookie && state.currentTheme.mode === 'default') {
      setClientTheme('default');
    }
  }, [state.currentTheme, persistToCookie]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  // Prevent hydration mismatch by not applying theme until mounted
  // This ensures server and client render the same initial HTML
  if (!mounted) {
    return (
      <ThemeContextValue.Provider value={value}>
        {children}
      </ThemeContextValue.Provider>
    );
  }

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

