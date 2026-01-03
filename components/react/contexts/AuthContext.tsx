/**
 * AuthContext - Authentication Context Provider
 * 
 * Purpose: Global authentication state management
 * 
 * Features:
 * - User state
 * - Authentication status
 * - Login/logout handlers
 * - Token management
 * - Permission checks
 */

'use client';

import React from 'react';

export interface User {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  permissions?: string[];
  [key: string]: unknown;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface AuthContextValue extends AuthState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export interface AuthProviderProps {
  children: React.ReactNode;
  /** Initial user state */
  initialUser?: User | null;
  /** Initial token */
  initialToken?: string | null;
  /** Custom login handler */
  onLogin?: (credentials: { email: string; password: string }) => Promise<{ user: User; token: string }>;
  /** Custom logout handler */
  onLogout?: () => Promise<void>;
  /** Custom token refresh handler */
  onRefreshToken?: () => Promise<string>;
  /** Token storage key (default: 'auth_token') */
  tokenKey?: string;
}

/**
 * AuthProvider - Authentication context provider
 * 
 * Provides global authentication state and methods to all child components.
 * 
 * @example
 * ```tsx
 * <AuthProvider
 *   onLogin={async (credentials) => {
 *     const response = await api.login(credentials);
 *     return { user: response.user, token: response.token };
 *   }}
 * >
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({
  children,
  initialUser = null,
  initialToken = null,
  onLogin,
  onLogout,
  onRefreshToken,
  tokenKey = 'auth_token',
}: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(initialUser);
  const [token, setToken] = React.useState<string | null>(initialToken);
  const [isLoading, setIsLoading] = React.useState(false);

  // Load token from storage on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem(tokenKey);
      if (storedToken && !token) {
        setToken(storedToken);
      }
    }
  }, [tokenKey, token]);

  // Memoize handlers
  const login = React.useCallback(async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      if (onLogin) {
        const result = await onLogin(credentials);
        setUser(result.user);
        setToken(result.token);
        if (typeof window !== 'undefined') {
          localStorage.setItem(tokenKey, result.token);
        }
      } else {
        // Default implementation (for development)
        console.warn('AuthProvider: onLogin handler not provided');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [onLogin, tokenKey]);

  const logout = React.useCallback(async () => {
    setIsLoading(true);
    try {
      if (onLogout) {
        await onLogout();
      }
      setUser(null);
      setToken(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(tokenKey);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [onLogout, tokenKey]);

  const refreshToken = React.useCallback(async () => {
    if (!onRefreshToken) return;
    
    setIsLoading(true);
    try {
      const newToken = await onRefreshToken();
      setToken(newToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem(tokenKey, newToken);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [onRefreshToken, tokenKey]);

  const hasPermission = React.useCallback((permission: string): boolean => {
    if (!user) return false;
    return user.permissions?.includes(permission) ?? false;
  }, [user]);

  const hasRole = React.useCallback((role: string): boolean => {
    if (!user) return false;
    return user.role === role;
  }, [user]);

  const updateUser = React.useCallback((updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const value = React.useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: !!user && !!token,
    isLoading,
    token,
    login,
    logout,
    refreshToken,
    hasPermission,
    hasRole,
    updateUser,
  }), [user, token, isLoading, login, logout, refreshToken, hasPermission, hasRole, updateUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth - Hook to access authentication context
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 * ```
 */
export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

