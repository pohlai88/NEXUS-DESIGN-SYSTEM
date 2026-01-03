/**
 * CommandCenterShell - Executive Dashboard Shell
 * 
 * Purpose: Real-time monitoring, executive dashboards, operations centers
 * 
 * Structure:
 * - Live Ticker: Real-time data stream (top)
 * - KPI Grid: Key metrics (top section)
 * - Main Dashboard: Customizable panels
 * - Alert Overlay: Notification system
 * - Command Palette: Quick actions (Cmd+K)
 * 
 * Features:
 * - Real-time data updates
 * - Customizable layouts
 * - Alert management
 * - Quick actions
 * - Context switching
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';
import { LazyPanel } from './LazyPanel';

export interface TickerItem {
  id: string;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  timestamp?: Date;
}

export interface KPICard {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: React.ReactNode;
}

export interface DashboardPanel {
  id: string;
  title: string;
  component: React.ReactNode;
  span?: number; // Grid span (1-4)
}

export interface CommandCenterShellProps extends Omit<RootShellProps, 'children'> {
  /** Live ticker items */
  tickerItems?: TickerItem[];
  /** KPI cards */
  kpiCards?: KPICard[];
  /** Dashboard panels */
  panels?: DashboardPanel[];
  /** Show live ticker */
  showTicker?: boolean;
  /** Show KPI grid */
  showKPIs?: boolean;
  /** Command palette enabled */
  commandPalette?: boolean;
  /** Alert system enabled */
  alerts?: boolean;
  /** Main content ID for skip link */
  mainContentId?: string;
}

/**
 * CommandCenterShell - Executive dashboard shell
 * 
 * Perfect for:
 * - Executive dashboards
 * - Network monitoring
 * - Business intelligence
 * - Operations centers
 * - Analytics platforms
 * 
 * @example
 * ```tsx
 * <CommandCenterShell
 *   tickerItems={[
 *     { id: '1', label: 'Revenue', value: '$4.2M', trend: 'up' },
 *   ]}
 *   kpiCards={[
 *     { id: '1', title: 'Users', value: '1,234', change: '+12%', trend: 'up' },
 *   ]}
 *   panels={[
 *     { id: '1', title: 'Chart', component: <Chart />, span: 2 },
 *   ]}
 * />
 * ```
 */
export const CommandCenterShell = React.memo(function CommandCenterShell({
  tickerItems = [],
  kpiCards = [],
  panels = [],
  showTicker = true,
  showKPIs = true,
  commandPalette = true,
  alerts = true,
  mainContentId = 'main-content',
  ...rootShellProps
}: CommandCenterShellProps) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);

  // Memoize filtered panels (in case we add visibility filtering later)
  const visiblePanels = React.useMemo(
    () => panels.filter(p => p !== undefined),
    [panels]
  );

  // Memoize command palette toggle
  const toggleCommandPalette = React.useCallback(() => {
    setIsCommandPaletteOpen(prev => !prev);
  }, []);

  // Command palette keyboard shortcut with proper cleanup
  React.useEffect(() => {
    if (!commandPalette) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPalette, toggleCommandPalette]);

  return (
    <RootShell {...rootShellProps}>
      <div className="flex flex-col min-h-screen bg-void">
        {/* Live Ticker */}
        {showTicker && tickerItems.length > 0 && (
          <div className="border-b border-stroke bg-paper overflow-hidden">
            <div className="flex gap-6 px-6 py-3 animate-scroll">
              {tickerItems.map(item => (
                <div key={item.id} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="na-metadata">{item.label}:</span>
                  <span className={`na-data ${
                    item.trend === 'up' ? 'text-success' :
                    item.trend === 'down' ? 'text-error' :
                    'text-lux'
                  }`}>
                    {item.value}
                  </span>
                  {item.trend && (
                    <span className="text-sm">
                      {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Header */}
        <header className="border-b border-stroke bg-paper/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="na-h2">Command Center</h1>
            <div className="flex items-center gap-4">
              {commandPalette && (
                <button
                  onClick={toggleCommandPalette}
                  className="na-btn flex items-center gap-2"
                >
                  <span>Quick Actions</span>
                  <kbd className="px-2 py-1 text-xs bg-paper-2 rounded border border-stroke">
                    ⌘K
                  </kbd>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main
          id={mainContentId}
          className="flex-1 overflow-y-auto p-6"
          role="main"
        >
          {/* KPI Grid */}
          {showKPIs && kpiCards.length > 0 && (
            <div className="na-grid gap-6 mb-6">
              {kpiCards.map(card => (
                <div key={card.id} className="na-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="na-metadata">{card.title}</div>
                    {card.icon}
                  </div>
                  <div className="na-data-large mb-2">{card.value}</div>
                  {card.change && (
                    <div className={`flex items-center gap-1 text-sm ${
                      card.trend === 'up' ? 'text-success' :
                      card.trend === 'down' ? 'text-error' :
                      'text-lux-dim'
                    }`}>
                      <span>{card.trend === 'up' ? '↗' : card.trend === 'down' ? '↘' : '→'}</span>
                      <span>{card.change}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Dashboard Panels */}
          {visiblePanels.length > 0 && (
            <div className="na-grid gap-6">
              {visiblePanels.map(panel => (
                <div
                  key={panel.id}
                  className="na-card p-6"
                  style={{ gridColumn: `span ${panel.span || 1}` }}
                >
                  <h2 className="na-h3 mb-4">{panel.title}</h2>
                  <LazyPanel
                    threshold={0.1}
                    rootMargin="100px"
                    enabled={true}
                  >
                    {panel.component}
                  </LazyPanel>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Command Palette Overlay */}
        {isCommandPaletteOpen && commandPalette && (
          <div
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
            onClick={() => setIsCommandPaletteOpen(false)}
          >
            <div
              className="na-card p-4 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                placeholder="Type a command or search..."
                className="na-input w-full mb-4"
                autoFocus
              />
              <div className="space-y-2">
                <div className="px-4 py-2 hover:bg-paper-2 rounded-lg cursor-pointer">
                  <div className="na-h6">Go to Dashboard</div>
                  <div className="na-metadata-small">Navigate to main dashboard</div>
                </div>
                <div className="px-4 py-2 hover:bg-paper-2 rounded-lg cursor-pointer">
                  <div className="na-h6">View Reports</div>
                  <div className="na-metadata-small">Open reports section</div>
                </div>
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
    prevProps.tickerItems === nextProps.tickerItems &&
    prevProps.kpiCards === nextProps.kpiCards &&
    prevProps.panels === nextProps.panels &&
    prevProps.showTicker === nextProps.showTicker &&
    prevProps.showKPIs === nextProps.showKPIs &&
    prevProps.commandPalette === nextProps.commandPalette &&
    prevProps.mainContentId === nextProps.mainContentId
  );
});

