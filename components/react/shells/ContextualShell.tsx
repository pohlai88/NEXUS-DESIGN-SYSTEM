/**
 * ContextualShell - Adaptive Layout Shell
 * 
 * Purpose: Context-aware layouts that adapt to workflow state
 * 
 * Structure:
 * - Context Switcher: Quick context changes
 * - Adaptive Layout: Changes based on context
 * - Breadcrumbs: Deep navigation
 * - Quick Actions: Context-specific actions
 * - State Preservation: Remember context
 * 
 * Features:
 * - Context detection
 * - Layout adaptation
 * - State preservation
 * - Quick switching
 * - Context history
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';

export interface Context {
  id: string;
  label: string;
  icon?: React.ReactNode;
  component: React.ReactNode;
  layout?: 'sidebar' | 'stacked' | 'split' | 'focus';
  metadata?: Record<string, unknown>;
}

export interface QuickAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick: () => void;
}

export interface ContextualShellProps extends Omit<RootShellProps, 'children'> {
  /** Available contexts */
  contexts: Context[];
  /** Current context ID */
  currentContextId?: string;
  /** Initial context ID */
  initialContextId?: string;
  /** Quick actions for current context */
  quickActions?: QuickAction[];
  /** Show context switcher */
  showContextSwitcher?: boolean;
  /** Show breadcrumbs */
  showBreadcrumbs?: boolean;
  /** On context change */
  onContextChange?: (contextId: string) => void;
  /** Preserve state between contexts */
  preserveState?: boolean;
  /** Main content ID for skip link */
  mainContentId?: string;
}

/**
 * ContextualShell - Context-aware adaptive shell
 * 
 * Perfect for:
 * - Collaboration tools
 * - Knowledge bases
 * - Multi-tenant apps
 * - Workflow management
 * - Context-aware dashboards
 * 
 * @example
 * ```tsx
 * <ContextualShell
 *   contexts={[
 *     { id: 'dashboard', label: 'Dashboard', component: <Dashboard />, layout: 'sidebar' },
 *     { id: 'project', label: 'Project', component: <Project />, layout: 'split' },
 *   ]}
 *   quickActions={[
 *     { id: 'new', label: 'New Item', onClick: handleNew },
 *   ]}
 * />
 * ```
 */
export const ContextualShell = React.memo(function ContextualShell({
  contexts,
  currentContextId,
  initialContextId,
  quickActions = [],
  showContextSwitcher = true,
  showBreadcrumbs = true,
  onContextChange,
  preserveState = true,
  mainContentId = 'main-content',
  ...rootShellProps
}: ContextualShellProps) {
  const [currentContext, setCurrentContext] = React.useState(
    currentContextId || initialContextId || contexts[0]?.id || ''
  );
  const [contextHistory, setContextHistory] = React.useState<string[]>([
    currentContextId || initialContextId || contexts[0]?.id || '',
  ]);
  const [isContextSwitcherOpen, setIsContextSwitcherOpen] = React.useState(false);

  // Memoize current context data
  const currentContextData = React.useMemo(
    () => contexts.find(c => c.id === currentContext),
    [contexts, currentContext]
  );

  // Memoize handlers
  const toggleContextSwitcher = React.useCallback(() => {
    setIsContextSwitcherOpen(prev => !prev);
  }, []);

  // Keyboard shortcuts for quick actions with proper cleanup
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K for context switcher
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleContextSwitcher();
      }

      // Quick action shortcuts
      quickActions.forEach(action => {
        if (action.shortcut && e.key === action.shortcut && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          action.onClick();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickActions, toggleContextSwitcher]);

  const handleContextChange = React.useCallback((contextId: string) => {
    if (!preserveState) {
      setContextHistory([contextId]);
    } else {
      setContextHistory(prev => [...prev, contextId]);
    }
    setCurrentContext(contextId);
    onContextChange?.(contextId);
    setIsContextSwitcherOpen(false);
  }, [preserveState, onContextChange]);

  const handleBack = React.useCallback(() => {
    if (contextHistory.length > 1) {
      const newHistory = [...contextHistory];
      newHistory.pop(); // Remove current
      const previousContext = newHistory[newHistory.length - 1];
      setContextHistory(newHistory);
      setCurrentContext(previousContext);
      onContextChange?.(previousContext);
    }
  }, [contextHistory, onContextChange]);

  const renderLayout = () => {
    if (!currentContextData) return null;

    const layout = currentContextData.layout || 'sidebar';

    switch (layout) {
      case 'sidebar':
        return (
          <div className="flex flex-1 overflow-hidden">
            <aside className="w-64 border-r border-stroke bg-paper overflow-y-auto">
              <div className="p-4">
                <h2 className="na-h5 mb-4">Navigation</h2>
                {/* Context-specific navigation */}
              </div>
            </aside>
            <main
              id={mainContentId}
              className="flex-1 overflow-y-auto bg-void"
              role="main"
            >
              {currentContextData.component}
            </main>
          </div>
        );

      case 'stacked':
        return (
          <main
            id={mainContentId}
            className="flex-1 overflow-y-auto bg-void"
            role="main"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              {currentContextData.component}
            </div>
          </main>
        );

      case 'split':
        return (
          <div className="flex flex-1 overflow-hidden">
            <main
              id={mainContentId}
              className="flex-1 overflow-y-auto bg-void"
              role="main"
            >
              {currentContextData.component}
            </main>
            <aside className="w-80 border-l border-stroke bg-paper overflow-y-auto">
              <div className="p-4">
                <h2 className="na-h5 mb-4">Details</h2>
                {/* Context-specific details */}
              </div>
            </aside>
          </div>
        );

      case 'focus':
        return (
          <main
            id={mainContentId}
            className="flex-1 overflow-y-auto bg-void flex items-center justify-center p-6"
            role="main"
          >
            <div className="max-w-md w-full">
              {currentContextData.component}
            </div>
          </main>
        );

      default:
        return (
          <main
            id={mainContentId}
            className="flex-1 overflow-y-auto bg-void"
            role="main"
          >
            {currentContextData.component}
          </main>
        );
    }
  };

  return (
    <RootShell {...rootShellProps}>
      <div className="flex flex-col h-screen overflow-hidden bg-void">
        {/* Header */}
        <header className="border-b border-stroke bg-paper/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Context Switcher */}
            {showContextSwitcher && (
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleContextSwitcher}
                  className="na-btn flex items-center gap-2"
                >
                  {currentContextData?.icon}
                  <span>{currentContextData?.label || 'Select Context'}</span>
                  <kbd className="px-2 py-1 text-xs bg-paper-2 rounded border border-stroke">
                    ⌘K
                  </kbd>
                </button>

                {/* Back button */}
                {contextHistory.length > 1 && (
                  <button
                    onClick={handleBack}
                    className="na-btn p-2"
                    aria-label="Go back"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Quick Actions */}
            {quickActions.length > 0 && (
              <div className="flex items-center gap-2">
                {quickActions.map(action => (
                  <button
                    key={action.id}
                    onClick={action.onClick}
                    className="na-btn flex items-center gap-2"
                    title={action.shortcut ? `Shortcut: ${action.shortcut}` : undefined}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Adaptive Layout */}
        {renderLayout()}

        {/* Context Switcher Overlay */}
        {isContextSwitcherOpen && (
          <div
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
            onClick={() => setIsContextSwitcherOpen(false)}
          >
            <div
              className="na-card p-4 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                placeholder="Search contexts..."
                className="na-input w-full mb-4"
                autoFocus
              />
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {contexts.map(context => (
                  <button
                    key={context.id}
                    onClick={() => handleContextChange(context.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      currentContext === context.id
                        ? 'bg-paper-2 border-l-2 border-primary text-lux'
                        : 'text-lux-dim hover:bg-paper-2'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {context.icon}
                      <div>
                        <div className="na-h6">{context.label}</div>
                        {context.metadata && (
                          <div className="na-metadata-small mt-1">
                            {Object.entries(context.metadata).map(([key, value]) => (
                              <span key={key} className="mr-2">
                                {key}: {String(value)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </RootShell>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return (
    prevProps.contexts === nextProps.contexts &&
    prevProps.currentContextId === nextProps.currentContextId &&
    prevProps.initialContextId === nextProps.initialContextId &&
    prevProps.quickActions === nextProps.quickActions &&
    prevProps.showContextSwitcher === nextProps.showContextSwitcher &&
    prevProps.showBreadcrumbs === nextProps.showBreadcrumbs &&
    prevProps.preserveState === nextProps.preserveState &&
    prevProps.mainContentId === nextProps.mainContentId
  );
});

