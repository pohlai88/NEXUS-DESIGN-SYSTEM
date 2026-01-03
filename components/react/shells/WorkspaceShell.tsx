/**
 * WorkspaceShell - Multi-Panel Workspace Shell
 * 
 * Purpose: Complex applications, multi-tab interfaces, project management
 * 
 * Structure:
 * - Tab Bar: Multiple open tabs
 * - Panel Groups: Organized panels (left/right/bottom)
 * - Main Editor: Primary content area
 * - Inspector: Right-side detail panel
 * - Status Bar: Bottom status information
 * 
 * Features:
 * - Tab management
 * - Resizable panels
 * - Panel states (collapsed/expanded)
 * - Workspace persistence
 * - Split views
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';
import { LazyPanel } from './LazyPanel';

export interface WorkspaceTab {
    id: string;
    label: string;
    icon?: React.ReactNode;
    component: React.ReactNode;
    closable?: boolean;
    dirty?: boolean; // Has unsaved changes
}

export interface WorkspacePanel {
    id: string;
    title: string;
    component: React.ReactNode;
    position: 'left' | 'right' | 'bottom';
    defaultWidth?: string;
    defaultHeight?: string;
    resizable?: boolean;
    collapsible?: boolean;
}

export interface WorkspaceShellProps extends Omit<RootShellProps, 'children'> {
    /** Open tabs */
    tabs?: WorkspaceTab[];
    /** Active tab ID */
    activeTabId?: string;
    /** Initial active tab */
    initialTabId?: string;
    /** Panels */
    panels?: WorkspacePanel[];
    /** Status bar content */
    statusBar?: React.ReactNode;
    /** On tab change */
    onTabChange?: (tabId: string) => void;
    /** On tab close */
    onTabClose?: (tabId: string) => void;
    /** Main content ID for skip link */
    mainContentId?: string;
}

/**
 * WorkspaceShell - Multi-tab workspace shell
 * 
 * Perfect for:
 * - Project management tools
 * - Design applications
 * - Development environments
 * - Data analysis tools
 * - Content management
 * 
 * @example
 * ```tsx
 * <WorkspaceShell
 *   tabs={[
 *     { id: '1', label: 'Project 1', component: <ProjectView /> },
 *     { id: '2', label: 'Project 2', component: <ProjectView /> },
 *   ]}
 *   panels={[
 *     { id: 'inspector', title: 'Inspector', position: 'right', component: <Inspector /> },
 *   ]}
 * />
 * ```
 */
export const WorkspaceShell = React.memo(function WorkspaceShell({
    tabs = [],
    activeTabId,
    initialTabId,
    panels = [],
    statusBar,
    onTabChange,
    onTabClose,
    mainContentId = 'main-content',
    ...rootShellProps
}: WorkspaceShellProps) {
    const [activeTab, setActiveTab] = React.useState(
        activeTabId || initialTabId || tabs[0]?.id || ''
    );
    const [panelStates, setPanelStates] = React.useState<Record<string, { collapsed: boolean; width?: string; height?: string }>>({});

    // Memoize expensive filtering operations
    const activeTabData = React.useMemo(
        () => tabs.find(t => t.id === activeTab),
        [tabs, activeTab]
    );
    const leftPanels = React.useMemo(
        () => panels.filter(p => p.position === 'left'),
        [panels]
    );
    const rightPanels = React.useMemo(
        () => panels.filter(p => p.position === 'right'),
        [panels]
    );
    const bottomPanels = React.useMemo(
        () => panels.filter(p => p.position === 'bottom'),
        [panels]
    );

    // Memoize handlers
    const handleTabClick = React.useCallback((tabId: string) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    }, [onTabChange]);

    const handleTabClose = React.useCallback((e: React.MouseEvent, tabId: string) => {
        e.stopPropagation();
        onTabClose?.(tabId);
    }, [onTabClose]);

    const togglePanel = React.useCallback((panelId: string) => {
        setPanelStates(prev => ({
            ...prev,
            [panelId]: {
                ...prev[panelId],
                collapsed: !prev[panelId]?.collapsed,
            },
        }));
    }, []);

    return (
        <RootShell {...rootShellProps}>
            <div className="flex flex-col h-screen overflow-hidden bg-void">
                {/* Tab Bar */}
                {tabs.length > 0 && (
                    <div className="border-b border-stroke bg-paper flex items-center overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-primary text-lux bg-void'
                                    : 'border-transparent text-lux-dim hover:bg-paper-2'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                                {tab.dirty && <span className="w-2 h-2 rounded-full bg-warning" />}
                                {tab.closable && (
                                    <button
                                        onClick={(e) => handleTabClose(e, tab.id)}
                                        className="ml-2 p-1 rounded hover:bg-paper-2"
                                        aria-label="Close tab"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* Main Workspace */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left Panels */}
                    {leftPanels.map(panel => {
                        const state = panelStates[panel.id] || { collapsed: false };
                        return (
                            <aside
                                key={panel.id}
                                className={`border-r border-stroke bg-paper overflow-y-auto transition-all ${state.collapsed ? 'w-0' : panel.defaultWidth || 'w-64'
                                    }`}
                            >
                                {!state.collapsed && (
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="na-h5">{panel.title}</h2>
                                            {panel.collapsible && (
                                                <button
                                                    onClick={() => togglePanel(panel.id)}
                                                    className="na-btn p-1"
                                                    aria-label="Collapse panel"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                        {panel.component}
                                    </div>
                                )}
                            </aside>
                        );
                    })}

                    {/* Main Editor */}
                    <main
                        id={mainContentId}
                        className="flex-1 overflow-y-auto bg-void"
                        role="main"
                    >
                        {activeTabData?.component}
                    </main>

                    {/* Right Panels */}
                    {rightPanels.map(panel => {
                        const state = panelStates[panel.id] || { collapsed: false };

                        return (
                            <aside
                                key={panel.id}
                                className={`border-l border-stroke bg-paper overflow-y-auto transition-all ${state.collapsed ? 'w-0' : panel.defaultWidth || 'w-64'
                                    }`}
                            >
                                {!state.collapsed && (
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="na-h5">{panel.title}</h2>
                                            {panel.collapsible && (
                                                <button
                                                    onClick={() => togglePanel(panel.id)}
                                                    className="na-btn p-1"
                                                    aria-label="Collapse panel"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                        <LazyPanel
                                            threshold={0.1}
                                            rootMargin="50px"
                                            enabled={!state.collapsed}
                                        >
                                            {panel.component}
                                        </LazyPanel>
                                    </div>
                                )}
                            </aside>
                        );
                    })}
                </div>

                {/* Bottom Panels */}
                {bottomPanels.length > 0 && (
                    <div className="border-t border-stroke bg-paper">
                        {bottomPanels.map(panel => {
                            const state = panelStates[panel.id] || { collapsed: false };

                            return (
                                <div
                                    key={panel.id}
                                    className={`transition-all ${state.collapsed ? 'h-0' : panel.defaultHeight || 'h-48'
                                        }`}
                                >
                                    {!state.collapsed && (
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h2 className="na-h5">{panel.title}</h2>
                                                {panel.collapsible && (
                                                    <button
                                                        onClick={() => togglePanel(panel.id)}
                                                        className="na-btn p-1"
                                                        aria-label="Collapse panel"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                            <LazyPanel
                                                threshold={0.1}
                                                rootMargin="50px"
                                                enabled={!state.collapsed}
                                            >
                                                {panel.component}
                                            </LazyPanel>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Status Bar */}
                {statusBar && (
                    <div className="border-t border-stroke bg-paper px-6 py-2">
                        {statusBar}
                    </div>
                )}
            </div>
        </RootShell>
    );
}, (prevProps, nextProps) => {
    // Custom comparison
    return (
        prevProps.tabs === nextProps.tabs &&
        prevProps.activeTabId === nextProps.activeTabId &&
        prevProps.initialTabId === nextProps.initialTabId &&
        prevProps.panels === nextProps.panels &&
        prevProps.statusBar === nextProps.statusBar &&
        prevProps.mainContentId === nextProps.mainContentId
    );
});

