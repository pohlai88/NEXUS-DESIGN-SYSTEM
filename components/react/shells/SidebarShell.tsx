/**
 * SidebarShell - The Workhorse
 * 
 * Standard for SaaS, Admin Panels, and complex apps.
 * 
 * Structure:
 * - Left: Collapsible vertical navigation (Sidebar)
 * - Top: Global search, User profile, Notifications
 * - Center: The dynamic content area (Main)
 * 
 * Gold #eab308 Opportunity: Use the gold for the "Active Item" border on the left sidebar.
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';

export interface SidebarShellProps extends Omit<RootShellProps, 'children'> {
  children: React.ReactNode;
  /** Sidebar content (navigation) */
  sidebar?: React.ReactNode;
  /** Header content (search, profile, notifications) */
  header?: React.ReactNode;
  /** Footer content (optional) */
  footer?: React.ReactNode;
  /** Sidebar width (default: 280px) */
  sidebarWidth?: string;
  /** Whether sidebar is collapsible */
  collapsible?: boolean;
  /** Initial collapsed state */
  defaultCollapsed?: boolean;
  /** Main content ID for skip link */
  mainContentId?: string;
}

/**
 * SidebarShell - Standard sidebar layout for SaaS/admin apps
 * 
 * This is the most common shell pattern. It provides:
 * - Left sidebar navigation
 * - Top header with global controls
 * - Main content area
 * - Optional footer
 * 
 * @example
 * ```tsx
 * <SidebarShell
 *   sidebar={<Navigation />}
 *   header={<Header />}
 * >
 *   <YourContent />
 * </SidebarShell>
 * ```
 */
export const SidebarShell = React.memo(function SidebarShell({
  children,
  sidebar,
  header,
  footer,
  sidebarWidth = '280px',
  collapsible = true,
  defaultCollapsed = false,
  mainContentId = 'main-content',
  ...rootShellProps
}: SidebarShellProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  // Memoize sidebar width calculation
  const computedSidebarWidth = React.useMemo(
    () => (isCollapsed ? '64px' : sidebarWidth),
    [isCollapsed, sidebarWidth]
  );

  // Memoize collapse handler
  const handleToggleCollapse = React.useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  return (
    <RootShell {...rootShellProps}>
      <div className="na-shell min-h-screen">
        {/* Sidebar */}
        {sidebar && (
          <aside
            className="na-shell-rail bg-paper border-r border-stroke"
            style={{ width: computedSidebarWidth }}
            aria-label="Main navigation"
          >
            {sidebar}
            {collapsible && (
              <button
                onClick={handleToggleCollapse}
                className="absolute bottom-4 left-4 p-2 rounded-lg hover:bg-paper-2 transition-colors"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <svg
                  className="w-5 h-5 text-lux"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
                  />
                </svg>
              </button>
            )}
          </aside>
        )}

        {/* Main area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header */}
          {header && (
            <header className="na-shell-head border-b border-stroke bg-paper/80 backdrop-blur-sm sticky top-0 z-40">
              {header}
            </header>
          )}

          {/* Main content */}
          <main
            id={mainContentId}
            className="na-shell-main bg-void flex-1 overflow-auto"
            role="main"
          >
            {children}
          </main>

          {/* Footer */}
          {footer && (
            <footer className="na-shell-foot border-t border-stroke bg-paper">
              {footer}
            </footer>
          )}
        </div>
      </div>
    </RootShell>
  );
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if layout-affecting props change
  return (
    prevProps.sidebar === nextProps.sidebar &&
    prevProps.header === nextProps.header &&
    prevProps.footer === nextProps.footer &&
    prevProps.sidebarWidth === nextProps.sidebarWidth &&
    prevProps.collapsible === nextProps.collapsible &&
    prevProps.defaultCollapsed === nextProps.defaultCollapsed &&
    prevProps.mainContentId === nextProps.mainContentId &&
    prevProps.children === nextProps.children
  );
});

