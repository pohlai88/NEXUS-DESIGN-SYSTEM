/**
 * MasterDetailShell - The Split View
 * 
 * Essential for "Inbox" style interfaces (Email, Chat, Lists).
 * 
 * Structure:
 * - Left Pane (Fixed width): A scrollable list of items
 * - Right Pane (Flex grow): The details of the selected item
 * 
 * DRY Tip: This often sits inside the Sidebar Shell rather than replacing it.
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';
import { useVirtualScroll } from '../hooks/useVirtualScroll';

export interface MasterDetailItem {
  id: string;
  [key: string]: unknown;
}

export interface MasterDetailShellProps extends Omit<RootShellProps, 'children'> {
  /** Master list content (left pane) */
  master: React.ReactNode;
  /** Detail content (right pane) */
  detail: React.ReactNode;
  /** Master pane width (default: 320px) */
  masterWidth?: string;
  /** Whether to show detail pane (for mobile) */
  showDetail?: boolean;
  /** Enable virtual scrolling for master list */
  virtualScroll?: boolean;
  /** Virtual scroll options */
  virtualScrollOptions?: {
    itemHeight?: number;
    overscan?: number;
  };
  /** Main content ID for skip link */
  mainContentId?: string;
}

/**
 * MasterDetailShell - Split view for list-detail interfaces
 * 
 * This shell provides a classic master-detail pattern. Perfect for:
 * - Email clients
 * - Chat interfaces
 * - List-detail views
 * - Inbox-style UIs
 * 
 * Note: This often sits inside SidebarShell for full app layouts.
 * 
 * @example
 * ```tsx
 * <MasterDetailShell
 *   master={<EmailList />}
 *   detail={<EmailView />}
 * />
 * ```
 */
export const MasterDetailShell = React.memo(function MasterDetailShell({
  master,
  detail,
  masterWidth = '320px',
  showDetail = true,
  virtualScroll = false,
  virtualScrollOptions = { itemHeight: 50, overscan: 5 },
  mainContentId = 'main-content',
  ...rootShellProps
}: MasterDetailShellProps) {
  // Virtual scrolling setup (if enabled and master is a list)
  // Note: This is a placeholder - actual implementation would require
  // master to be an array of items, which would need API changes
  const masterRef = React.useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = React.useState(600);

  React.useEffect(() => {
    if (masterRef.current && virtualScroll) {
      const updateHeight = () => {
        if (masterRef.current) {
          setContainerHeight(masterRef.current.clientHeight);
        }
      };
      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [virtualScroll]);

  return (
    <RootShell {...rootShellProps}>
      <div className="flex h-full min-h-screen">
        {/* Master pane (left) */}
        <aside
          ref={masterRef}
          className="na-shell-rail bg-paper border-r border-stroke overflow-y-auto"
          style={{ width: masterWidth }}
          aria-label="Master list"
        >
          {virtualScroll ? (
            <div
              style={{
                height: containerHeight,
                overflow: 'auto',
                position: 'relative',
              }}
            >
              {/* Virtual scrolling would be implemented here if master is an array */}
              {master}
            </div>
          ) : (
            master
          )}
        </aside>

        {/* Detail pane (right) */}
        {showDetail && (
          <main
            id={mainContentId}
            className="na-shell-main bg-void flex-1 overflow-y-auto"
            role="main"
          >
            {detail}
          </main>
        )}
      </div>
    </RootShell>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return (
    prevProps.master === nextProps.master &&
    prevProps.detail === nextProps.detail &&
    prevProps.masterWidth === nextProps.masterWidth &&
    prevProps.showDetail === nextProps.showDetail &&
    prevProps.mainContentId === nextProps.mainContentId
  );
});

