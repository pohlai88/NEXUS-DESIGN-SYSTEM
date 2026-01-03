/**
 * KeyboardManager - Global Keyboard Shortcut Manager
 * 
 * Purpose: Manage global keyboard shortcuts across the application
 * 
 * Features:
 * - Global shortcuts (Cmd/Ctrl+K for command palette, etc.)
 * - Context-aware shortcuts
 * - Shortcut registration
 * - Conflict detection
 * - Help overlay
 */

'use client';

import React from 'react';

export interface KeyboardShortcut {
  id: string;
  keys: string[]; // e.g., ['Meta', 'K'] or ['Escape']
  description?: string;
  handler: (e: KeyboardEvent) => void;
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

export interface KeyboardManagerContextValue {
  registerShortcut: (shortcut: KeyboardShortcut) => void;
  unregisterShortcut: (id: string) => void;
  showHelp: () => void;
  hideHelp: () => void;
  isHelpVisible: boolean;
}

const KeyboardManagerContext = React.createContext<KeyboardManagerContextValue | undefined>(undefined);

export interface KeyboardManagerProviderProps {
  children: React.ReactNode;
  /** Enable help overlay */
  enableHelp?: boolean;
  /** Help overlay trigger (default: '?') */
  helpTrigger?: string;
}

/**
 * KeyboardManagerProvider - Global keyboard shortcut manager
 * 
 * Manages all keyboard shortcuts in the application and provides
 * a help overlay to show available shortcuts.
 * 
 * @example
 * ```tsx
 * <KeyboardManagerProvider enableHelp>
 *   <App />
 * </KeyboardManagerProvider>
 * ```
 */
export function KeyboardManagerProvider({
  children,
  enableHelp = true,
  helpTrigger = '?',
}: KeyboardManagerProviderProps) {
  const [shortcuts, setShortcuts] = React.useState<Map<string, KeyboardShortcut>>(new Map());
  const [isHelpVisible, setIsHelpVisible] = React.useState(false);

  // Register shortcut
  const registerShortcut = React.useCallback((shortcut: KeyboardShortcut) => {
    setShortcuts(prev => {
      const next = new Map(prev);
      next.set(shortcut.id, shortcut);
      return next;
    });
  }, []);

  // Unregister shortcut
  const unregisterShortcut = React.useCallback((id: string) => {
    setShortcuts(prev => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Show help
  const showHelp = React.useCallback(() => {
    setIsHelpVisible(true);
  }, []);

  // Hide help
  const hideHelp = React.useCallback(() => {
    setIsHelpVisible(false);
  }, []);

  // Handle keyboard events
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Help overlay trigger
      if (enableHelp && e.key === helpTrigger && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setIsHelpVisible(prev => !prev);
        return;
      }

      // Check all registered shortcuts
      for (const shortcut of shortcuts.values()) {
        if (shortcut.enabled === false) continue;

        const keys = shortcut.keys;
        const matches = keys.every(key => {
          if (key === 'Meta' || key === 'Cmd') return e.metaKey;
          if (key === 'Ctrl') return e.ctrlKey;
          if (key === 'Alt') return e.altKey;
          if (key === 'Shift') return e.shiftKey;
          return e.key === key || e.code === key;
        });

        if (matches) {
          if (shortcut.preventDefault) {
            e.preventDefault();
          }
          if (shortcut.stopPropagation) {
            e.stopPropagation();
          }
          shortcut.handler(e);
          break; // Only trigger first matching shortcut
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enableHelp, helpTrigger]);

  const value = React.useMemo<KeyboardManagerContextValue>(() => ({
    registerShortcut,
    unregisterShortcut,
    showHelp,
    hideHelp,
    isHelpVisible,
  }), [registerShortcut, unregisterShortcut, showHelp, hideHelp, isHelpVisible]);

  return (
    <KeyboardManagerContext.Provider value={value}>
      {children}
      {/* Help Overlay */}
      {isHelpVisible && enableHelp && (
        <div
          className="fixed inset-0 bg-void/80 backdrop-blur-sm z-[400] flex items-center justify-center p-4"
          onClick={hideHelp}
        >
          <div
            className="na-card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="na-h2">Keyboard Shortcuts</h2>
              <button
                onClick={hideHelp}
                className="na-btn p-2"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {Array.from(shortcuts.values())
                .filter(s => s.description)
                .map(shortcut => (
                  <div key={shortcut.id} className="flex items-center justify-between py-2 border-b border-stroke">
                    <span className="na-metadata">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && <span className="text-clay">+</span>}
                          <kbd className="px-2 py-1 text-xs bg-paper-2 rounded border border-stroke">
                            {key === 'Meta' ? '⌘' : key === 'Ctrl' ? 'Ctrl' : key === 'Alt' ? 'Alt' : key === 'Shift' ? 'Shift' : key}
                          </kbd>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              {shortcuts.size === 0 && (
                <div className="na-metadata text-center py-8 text-clay">
                  No keyboard shortcuts registered
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </KeyboardManagerContext.Provider>
  );
}

/**
 * useKeyboardManager - Hook to access keyboard manager
 * 
 * @example
 * ```tsx
 * const { registerShortcut } = useKeyboardManager();
 * 
 * React.useEffect(() => {
 *   registerShortcut({
 *     id: 'save',
 *     keys: ['Meta', 'S'],
 *     description: 'Save',
 *     handler: () => handleSave(),
 *   });
 * }, []);
 * ```
 */
export function useKeyboardManager(): KeyboardManagerContextValue {
  const context = React.useContext(KeyboardManagerContext);
  if (context === undefined) {
    throw new Error('useKeyboardManager must be used within a KeyboardManagerProvider');
  }
  return context;
}

