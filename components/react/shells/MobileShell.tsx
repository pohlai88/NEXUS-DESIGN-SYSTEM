/**
 * MobileShell - The PWA View
 * 
 * If your app is responsive, your Sidebar Shell morphs into this.
 * But sometimes, you need a dedicated mobile layout structure.
 * 
 * Structure:
 * - Top: Sticky header (Title only)
 * - Bottom: Sticky Tab Bar (Navigation)
 * - Content: Scrollable area in between
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';

export interface MobileShellProps extends Omit<RootShellProps, 'children'> {
  children: React.ReactNode;
  /** Top header content */
  header?: React.ReactNode;
  /** Bottom tab bar content */
  tabBar?: React.ReactNode;
  /** Main content ID for skip link */
  mainContentId?: string;
}

/**
 * MobileShell - Mobile-optimized layout for PWAs
 * 
 * This shell provides a mobile-first layout pattern. Perfect for:
 * - Progressive Web Apps (PWAs)
 * - Mobile-only interfaces
 * - Responsive mobile views
 * 
 * Structure:
 * - Sticky top header
 * - Scrollable content
 * - Sticky bottom tab bar
 * 
 * @example
 * ```tsx
 * <MobileShell
 *   header={<MobileHeader />}
 *   tabBar={<TabBar />}
 * >
 *   <YourContent />
 * </MobileShell>
 * ```
 */
export const MobileShell = React.memo(function MobileShell({
  children,
  header,
  tabBar,
  mainContentId = 'main-content',
  ...rootShellProps
}: MobileShellProps) {
  return (
    <RootShell {...rootShellProps}>
      <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-void">
        {/* Top Header */}
        {header && (
          <header className="na-shell-head border-b border-stroke bg-paper/80 backdrop-blur-sm sticky top-0 z-40 flex-shrink-0">
            {header}
          </header>
        )}

        {/* Main Content */}
        <main
          id={mainContentId}
          className="na-shell-main bg-void flex-1 overflow-y-auto"
          role="main"
        >
          {children}
        </main>

        {/* Bottom Tab Bar */}
        {tabBar && (
          <nav
            className="na-shell-foot border-t border-stroke bg-paper sticky bottom-0 z-40 flex-shrink-0"
            aria-label="Main navigation"
          >
            {tabBar}
          </nav>
        )}
      </div>
    </RootShell>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return (
    prevProps.children === nextProps.children &&
    prevProps.header === nextProps.header &&
    prevProps.tabBar === nextProps.tabBar &&
    prevProps.mainContentId === nextProps.mainContentId
  );
});

