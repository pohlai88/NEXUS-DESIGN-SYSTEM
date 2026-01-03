/**
 * StackedShell - The Consumer View
 * 
 * Best for user profiles, settings pages, or less complex apps.
 * 
 * Structure:
 * - Top: A single horizontal navigation bar (Logo left, Links center, Profile right)
 * - Center: Content with constrained width (e.g., max-w-7xl)
 * - Bottom: Standard Footer
 * 
 * Why separate? Sidebars take up horizontal space; this shell maximizes width
 * for data tables or marketing content.
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';

export interface StackedShellProps extends Omit<RootShellProps, 'children'> {
  children: React.ReactNode;
  /** Top navigation content */
  navigation?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Maximum content width (default: max-w-7xl) */
  maxWidth?: string;
  /** Main content ID for skip link */
  mainContentId?: string;
}

/**
 * StackedShell - Horizontal navigation layout for consumer apps
 * 
 * This shell maximizes horizontal space by using a top navigation
 * instead of a sidebar. Perfect for:
 * - User profiles
 * - Settings pages
 * - Marketing sites
 * - Data-heavy tables
 * 
 * @example
 * ```tsx
 * <StackedShell
 *   navigation={<TopNav />}
 *   footer={<Footer />}
 * >
 *   <YourContent />
 * </StackedShell>
 * ```
 */
export const StackedShell = React.memo(function StackedShell({
  children,
  navigation,
  footer,
  maxWidth = 'max-w-7xl',
  mainContentId = 'main-content',
  ...rootShellProps
}: StackedShellProps) {
  return (
    <RootShell {...rootShellProps}>
      <div className="flex flex-col min-h-screen">
        {/* Top Navigation */}
        {navigation && (
          <header className="na-shell-head border-b border-stroke bg-paper/80 backdrop-blur-sm sticky top-0 z-40">
            <div className={`${maxWidth} mx-auto px-6`}>
              {navigation}
            </div>
          </header>
        )}

        {/* Main Content */}
        <main
          id={mainContentId}
          className="na-shell-main bg-void flex-1"
          role="main"
        >
          <div className={`${maxWidth} mx-auto px-6 py-8`}>
            {children}
          </div>
        </main>

        {/* Footer */}
        {footer && (
          <footer className="na-shell-foot border-t border-stroke bg-paper">
            <div className={`${maxWidth} mx-auto px-6 py-6`}>
              {footer}
            </div>
          </footer>
        )}
      </div>
    </RootShell>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return (
    prevProps.children === nextProps.children &&
    prevProps.navigation === nextProps.navigation &&
    prevProps.footer === nextProps.footer &&
    prevProps.maxWidth === nextProps.maxWidth &&
    prevProps.mainContentId === nextProps.mainContentId
  );
});

