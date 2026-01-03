/**
 * Context Providers - Global Context Providers
 * 
 * Reusable context providers for authentication and keyboard management.
 * Can be used independently or with shell components.
 */

export { AuthProvider, useAuth } from './AuthContext';
export type { AuthProviderProps, AuthState, User, AuthContextValue } from './AuthContext';

export { KeyboardManagerProvider, useKeyboardManager } from './KeyboardManager';
export type { KeyboardManagerProviderProps, KeyboardManagerContextValue, KeyboardShortcut } from './KeyboardManager';

