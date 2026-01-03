/**
 * SplitBusinessShell - Multi-Panel Business Application Shell
 * 
 * Purpose: Business applications with multiple panels, inspector views
 * 
 * Structure:
 * - Primary Panel: Main content (left)
 * - Secondary Panel: Supporting content (right)
 * - Inspector Panel: Detail view (right, optional)
 * - Toolbar: Contextual actions
 * - Breadcrumbs: Navigation hierarchy
 * 
 * Features:
 * - Resizable panels
 * - Panel visibility toggles
 * - Context-aware toolbars
 * - Deep linking
 * - Panel state management
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';
import { useDebouncedCallback } from '../hooks/useDebounce';

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface ToolbarAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export interface SplitBusinessShellProps extends Omit<RootShellProps, 'children'> {
  /** Primary panel content (left/main) */
  primary: React.ReactNode;
  /** Secondary panel content (right) */
  secondary?: React.ReactNode;
  /** Inspector panel content (right, optional) */
  inspector?: React.ReactNode;
  /** Breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
  /** Toolbar actions */
  toolbarActions?: ToolbarAction[];
  /** Primary panel width (default: 60%) */
  primaryWidth?: string;
  /** Secondary panel width (default: 40%) */
  secondaryWidth?: string;
  /** Show secondary panel */
  showSecondary?: boolean;
  /** Show inspector panel */
  showInspector?: boolean;
  /** On panel resize */
  onPanelResize?: (primaryWidth: number, secondaryWidth: number) => void;
  /** Main content ID for skip link */
  mainContentId?: string;
}

/**
 * SplitBusinessShell - Multi-panel business application shell
 * 
 * Perfect for:
 * - CRM systems
 * - ERP interfaces
 * - Project management
 * - Design tools
 * - Data management
 * 
 * @example
 * ```tsx
 * <SplitBusinessShell
 *   primary={<MainContent />}
 *   secondary={<Sidebar />}
 *   inspector={<Inspector />}
 *   breadcrumbs={[
 *     { id: '1', label: 'Home', href: '/' },
 *     { id: '2', label: 'Projects', href: '/projects' },
 *   ]}
 *   toolbarActions={[
 *     { id: 'save', label: 'Save', onClick: handleSave },
 *   ]}
 * />
 * ```
 */
export const SplitBusinessShell = React.memo(function SplitBusinessShell({
  primary,
  secondary,
  inspector,
  breadcrumbs = [],
  toolbarActions = [],
  primaryWidth = '60%',
  secondaryWidth = '40%',
  showSecondary = true,
  showInspector = false,
  onPanelResize,
  mainContentId = 'main-content',
  ...rootShellProps
}: SplitBusinessShellProps) {
  const [isResizing, setIsResizing] = React.useState(false);
  const [currentPrimaryWidth, setCurrentPrimaryWidth] = React.useState(primaryWidth);
  const [currentSecondaryWidth, setCurrentSecondaryWidth] = React.useState(secondaryWidth);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Memoize computed width
  const computedPrimaryWidth = React.useMemo(
    () => (showSecondary ? currentPrimaryWidth : '100%'),
    [showSecondary, currentPrimaryWidth]
  );

  // Memoize handlers
  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  // Debounced resize handler to reduce excessive calls
  const debouncedResize = useDebouncedCallback(
    (newPrimaryWidth: number, newSecondaryWidth: number) => {
      onPanelResize?.(newPrimaryWidth, newSecondaryWidth);
    },
    150 // 150ms debounce
  );

  // Immediate UI update, debounced callback
  const handleResize = React.useCallback((newPrimaryWidth: number, newSecondaryWidth: number) => {
    setCurrentPrimaryWidth(`${newPrimaryWidth}%`);
    setCurrentSecondaryWidth(`${newSecondaryWidth}%`);
    debouncedResize(newPrimaryWidth, newSecondaryWidth);
  }, [debouncedResize]);

  React.useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const newPrimaryWidth = (e.clientX / containerWidth) * 100;
      const newSecondaryWidth = 100 - newPrimaryWidth;

      // Constrain between 20% and 80%
      if (newPrimaryWidth >= 20 && newPrimaryWidth <= 80) {
        handleResize(newPrimaryWidth, newSecondaryWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleResize]);

  return (
    <RootShell {...rootShellProps}>
      <div className="flex flex-col h-screen overflow-hidden bg-void">
        {/* Header with Breadcrumbs and Toolbar */}
        {(breadcrumbs.length > 0 || toolbarActions.length > 0) && (
          <header className="border-b border-stroke bg-paper/80 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Breadcrumbs */}
              {breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-2" aria-label="Breadcrumb">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.id}>
                      {index > 0 && (
                        <span className="text-clay mx-2" aria-hidden="true">
                          /
                        </span>
                      )}
                      {crumb.href || crumb.onClick ? (
                        <a
                          href={crumb.href}
                          onClick={(e) => {
                            if (crumb.onClick) {
                              e.preventDefault();
                              crumb.onClick();
                            }
                          }}
                          className={`na-metadata hover:text-lux transition-colors ${
                            index === breadcrumbs.length - 1 ? 'text-lux' : 'text-lux-dim'
                          }`}
                        >
                          {crumb.label}
                        </a>
                      ) : (
                        <span
                          className={`na-metadata ${
                            index === breadcrumbs.length - 1 ? 'text-lux' : 'text-lux-dim'
                          }`}
                        >
                          {crumb.label}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              )}

              {/* Toolbar Actions */}
              {toolbarActions.length > 0 && (
                <div className="flex items-center gap-2">
                  {toolbarActions.map(action => (
                    <button
                      key={action.id}
                      onClick={action.onClick}
                      disabled={action.disabled}
                      className={`na-btn ${
                        action.variant === 'primary'
                          ? 'na-btn-primary'
                          : action.variant === 'danger'
                          ? 'bg-error text-error-foreground hover:bg-error/90'
                          : ''
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {action.icon && <span className="mr-2">{action.icon}</span>}
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </header>
        )}

        {/* Main Split Layout */}
        <div ref={containerRef} className="flex flex-1 overflow-hidden">
          {/* Primary Panel */}
          <main
            id={mainContentId}
            className="overflow-y-auto bg-void"
            style={{ width: computedPrimaryWidth }}
            role="main"
          >
            {primary}
          </main>

          {/* Resizer */}
          {showSecondary && (
            <div
              className={`w-1 bg-stroke cursor-col-resize hover:bg-primary transition-colors ${
                isResizing ? 'bg-primary' : ''
              }`}
              onMouseDown={handleMouseDown}
              role="separator"
              aria-label="Resize panels"
            />
          )}

          {/* Secondary Panel */}
          {showSecondary && secondary && (
            <aside
              className="overflow-y-auto bg-paper border-l border-stroke"
              style={{ width: currentSecondaryWidth }}
              aria-label="Secondary panel"
            >
              {secondary}
            </aside>
          )}

          {/* Inspector Panel (overlays secondary when shown) */}
          {showInspector && inspector && (
            <aside
              className="overflow-y-auto bg-paper border-l border-stroke w-80"
              aria-label="Inspector panel"
            >
              <div className="p-4">
                <h2 className="na-h5 mb-4">Inspector</h2>
                {inspector}
              </div>
            </aside>
          )}
        </div>
      </div>
    </RootShell>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return (
    prevProps.primary === nextProps.primary &&
    prevProps.secondary === nextProps.secondary &&
    prevProps.inspector === nextProps.inspector &&
    prevProps.breadcrumbs === nextProps.breadcrumbs &&
    prevProps.toolbarActions === nextProps.toolbarActions &&
    prevProps.primaryWidth === nextProps.primaryWidth &&
    prevProps.secondaryWidth === nextProps.secondaryWidth &&
    prevProps.showSecondary === nextProps.showSecondary &&
    prevProps.showInspector === nextProps.showInspector &&
    prevProps.mainContentId === nextProps.mainContentId
  );
});

