/**
 * RootShell - The Invisible Logic Layer
 * 
 * This is the most important DRY component. It doesn't look like anything,
 * but it wraps every other shell.
 * 
 * Purpose: Holds global state that every page needs
 * Contains:
 * - Toast/Notification Toaster (Global)
 * - Modal/Dialog Provider
 * - Theme Provider (handling Gold #eab308 and Dark/Light modes)
 * - Skip-to-content link (for Accessibility)
 * 
 * Usage: You never use this directly; DashboardShell and AuthShell wrap themselves in this.
 */

'use client';

import React from 'react';
import { ThemeProvider } from '../../../themes/core/ThemeProvider';
import type { CustomTheme } from '../../../themes/core/theme-machine';
import { AuthProvider, type AuthProviderProps } from '../contexts/AuthContext';
import { KeyboardManagerProvider, type KeyboardManagerProviderProps } from '../contexts/KeyboardManager';
import { ShellErrorBoundary } from './ShellErrorBoundary';
import { CommandPalette, type Command } from './CommandPalette';

export interface RootShellProps {
  children: React.ReactNode;
  /** Custom themes to make available */
  customThemes?: CustomTheme[];
  /** Initial theme name */
  initialTheme?: string;
  /** Persist theme choice to cookies */
  persistToCookie?: boolean;
  /** Skip to content link text (accessibility) */
  skipToContentText?: string;
  /** Skip to content link ID */
  skipToContentId?: string;
  /** Auth provider props */
  authProps?: Omit<AuthProviderProps, 'children'>;
  /** Keyboard manager props */
  keyboardProps?: Omit<KeyboardManagerProviderProps, 'children'>;
  /** Enable error boundary */
  enableErrorBoundary?: boolean;
  /** Command palette commands */
  commands?: Command[];
  /** Show command palette */
  showCommandPalette?: boolean;
  /** Command palette enabled (default: true) */
  commandPaletteEnabled?: boolean;
}

/**
 * RootShell - Base shell that provides global providers
 * 
 * This is the foundation for all other shells. It provides:
 * - Theme management
 * - Toast notifications (ready for integration)
 * - Modal/Dialog context (ready for integration)
 * - Accessibility features
 * 
 * @example
 * ```tsx
 * <RootShell>
 *   <SidebarShell>
 *     <YourApp />
 *   </SidebarShell>
 * </RootShell>
 * ```
 */
export const RootShell = React.memo(function RootShell({
  children,
  customThemes = [],
  initialTheme = 'default',
  persistToCookie = true,
  skipToContentText = 'Skip to main content',
  skipToContentId = 'main-content',
  authProps,
  keyboardProps,
  enableErrorBoundary = true,
  commands = [],
  showCommandPalette: initialShowCommandPalette,
  commandPaletteEnabled = true,
}: RootShellProps) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(initialShowCommandPalette ?? false);

  // Memoize skip link href to prevent unnecessary re-renders
  const skipLinkHref = React.useMemo(
    () => `#${skipToContentId}`,
    [skipToContentId]
  );

  // Command palette keyboard shortcut
  React.useEffect(() => {
    if (!commandPaletteEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteEnabled]);

  // Memoize command palette handlers
  const handleCommandPaletteClose = React.useCallback(() => {
    setIsCommandPaletteOpen(false);
  }, []);

  // Wrap content with providers
  let content = children;

  // Error Boundary
  if (enableErrorBoundary) {
    content = (
      <ShellErrorBoundary>
        {content}
      </ShellErrorBoundary>
    );
  }

  // Keyboard Manager
  if (keyboardProps) {
    content = (
      <KeyboardManagerProvider {...keyboardProps}>
        {content}
      </KeyboardManagerProvider>
    );
  }

  // Auth Provider
  if (authProps) {
    content = (
      <AuthProvider {...authProps}>
        {content}
      </AuthProvider>
    );
  }

  return (
    <ThemeProvider
      initialTheme={initialTheme}
      customThemes={customThemes}
      persistToCookie={persistToCookie}
    >
      {/* Skip to content link for accessibility */}
      <a
        href={skipLinkHref}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {skipToContentText}
      </a>

      {/* Global providers container */}
      <div className="root-shell-providers">
        {/* Toast container - ready for toast library integration */}
        <div id="toast-container" className="fixed top-4 right-4 z-[100] flex flex-col gap-2" />

        {/* Modal/Dialog container - ready for modal library integration */}
        <div id="modal-container" className="fixed inset-0 z-[200] pointer-events-none" />

        {/* Main content */}
        {content}

        {/* Command Palette */}
        {commandPaletteEnabled && (
          <CommandPalette
            open={isCommandPaletteOpen}
            onClose={handleCommandPaletteClose}
            commands={commands}
          />
        )}
      </div>
    </ThemeProvider>
  );
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if critical props change
  return (
    prevProps.initialTheme === nextProps.initialTheme &&
    prevProps.persistToCookie === nextProps.persistToCookie &&
    prevProps.skipToContentId === nextProps.skipToContentId &&
    prevProps.skipToContentText === nextProps.skipToContentText &&
    prevProps.customThemes === nextProps.customThemes &&
    prevProps.authProps === nextProps.authProps &&
    prevProps.keyboardProps === nextProps.keyboardProps &&
    prevProps.enableErrorBoundary === nextProps.enableErrorBoundary &&
    prevProps.commands === nextProps.commands &&
    prevProps.commandPaletteEnabled === nextProps.commandPaletteEnabled
  );
});

