/**
 * Shell Components - DRY Layout System
 * 
 * A comprehensive shell system that respects DRY principles.
 * All shells inherit from RootShell which provides global providers.
 * 
 * Shell Hierarchy:
 * - RootShell: Base logic layer (providers, toasts, modals, theme)
 * - SidebarShell: Standard sidebar layout (SaaS, admin panels)
 * - StackedShell: Horizontal navigation (consumer apps, settings)
 * - FocusShell: Minimalist (login, checkout, onboarding)
 * - MasterDetailShell: Split view (email, chat, list-detail)
 * - MobileShell: Mobile-optimized (PWAs, mobile apps)
 */

export { RootShell } from './RootShell';
export type { RootShellProps } from './RootShell';

export { SidebarShell } from './SidebarShell';
export type { SidebarShellProps } from './SidebarShell';

export { StackedShell } from './StackedShell';
export type { StackedShellProps } from './StackedShell';

export { FocusShell } from './FocusShell';
export type { FocusShellProps } from './FocusShell';

export { MasterDetailShell } from './MasterDetailShell';
export type { MasterDetailShellProps } from './MasterDetailShell';

export { MobileShell } from './MobileShell';
export type { MobileShellProps } from './MobileShell';

export { WorkflowShell } from './WorkflowShell';
export type { WorkflowShellProps, WorkflowStage } from './WorkflowShell';

export { CommandCenterShell } from './CommandCenterShell';
export type { CommandCenterShellProps, TickerItem, KPICard, DashboardPanel } from './CommandCenterShell';

export { WorkspaceShell } from './WorkspaceShell';
export type { WorkspaceShellProps, WorkspaceTab, WorkspacePanel } from './WorkspaceShell';

export { SplitBusinessShell } from './SplitBusinessShell';
export type { SplitBusinessShellProps, BreadcrumbItem, ToolbarAction } from './SplitBusinessShell';

export { ContextualShell } from './ContextualShell';
export type { ContextualShellProps, Context, QuickAction } from './ContextualShell';

export { ShellErrorBoundary, withShellErrorBoundary } from './ShellErrorBoundary';
export type { ShellErrorBoundaryProps } from './ShellErrorBoundary';

export { LazyPanel } from './LazyPanel';
export type { LazyPanelProps } from './LazyPanel';

// Modal Shells
export { ConfirmShell } from './ConfirmShell';
export type { ConfirmShellProps } from './ConfirmShell';

export { FormModalShell } from './FormModalShell';
export type { FormModalShellProps } from './FormModalShell';

export { FullscreenModalShell } from './FullscreenModalShell';
export type { FullscreenModalShellProps, FullscreenModalStep } from './FullscreenModalShell';

export { ExceptionShell } from './ExceptionShell';
export type { ExceptionShellProps, ErrorCode, RecoveryAction } from './ExceptionShell';

export { CommandPalette } from './CommandPalette';
export type { CommandPaletteProps, Command } from './CommandPalette';

// Note: Contexts and hooks are now exported from the main react/index.ts
// for better clarity and reusability

