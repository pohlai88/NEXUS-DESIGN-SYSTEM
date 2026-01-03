# Component Reference

> **Auto-generated** from React component source files  
> **Last updated**: 2026-01-03T15:00:40.803Z  
> **Source**: `components/react/`

---

## Overview

This document provides a complete reference for all React components in the Neo-Analog Design System.

**Total Components**: 24

---

## Layout

### Card

Card Component AIBOS-enhanced NextUI Card component Combines NextUI Card with AIBOS design system classes ```tsx <Card> <CardHeader> <h2 className="na-h4">Card Title</h2> </CardHeader> <CardBody> <div className="na-data">$12,450.00</div> </CardBody> </Card> ```

**File**: `/components/react/Card.tsx`  
**Export**: `Card`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Custom className - will be merged with AIBOS classes |
| `withPadding` | `boolean` | No | `true` | Apply AIBOS card padding (na-p-6) |
| `withAIBOSStyles` | `boolean` | No | `true` | Apply AIBOS card styling |

#### Example

```tsx
<Card>
<CardHeader>
<h2 className="na-h4">Card Title</h2>
</CardHeader>
<CardBody>
<div className="na-data">$12,450.00</div>
</CardBody>
</Card>
```

---

### CommandCenterShell

CommandCenterShell - Executive Dashboard Shell Purpose: Real-time monitoring, executive dashboards, operations centers Structure: - Live Ticker: Real-time data stream (top) - KPI Grid: Key metrics (top section) - Main Dashboard: Customizable panels - Alert Overlay: Notification system - Command Palette: Quick actions (Cmd+K) Features: - Real-time data updates - Customizable layouts - Alert management - Quick actions - Context switching

**File**: `/components/react/shells/CommandCenterShell.tsx`  
**Export**: `CommandCenterShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tickerItems` | `TickerItem[]` | No | - | Live ticker items |
| `kpiCards` | `KPICard[]` | No | - | KPI cards |
| `panels` | `DashboardPanel[]` | No | - | Dashboard panels |
| `showTicker` | `boolean` | No | - | Show live ticker |
| `showKPIs` | `boolean` | No | - | Show KPI grid |
| `commandPalette` | `boolean` | No | - | Command palette enabled |
| `alerts` | `boolean` | No | - | Alert system enabled |
| `mainContentId` | `string` | No | - | Main content ID for skip link |

---

### ConfirmShell

ConfirmShell - Destructive Action Confirmation Modal Purpose: Confirm irreversible actions (delete, remove, etc.) Structure: - Overlay: Dark backdrop - Modal: Centered card - Icon: Warning/danger icon - Title: Action description - Message: Detailed explanation - Actions: Cancel (secondary) + Confirm (danger) Features: - Keyboard shortcuts (Esc to cancel, Enter to confirm) - Focus trap - Auto-focus on Cancel button - Prevents accidental clicks

**File**: `/components/react/shells/ConfirmShell.tsx`  
**Export**: `ConfirmShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | Yes | - | Whether modal is open |
| `onClose` | `()` | Yes | `> void` | Callback when modal should close |
| `onConfirm` | `()` | Yes | `> void` | Callback when user confirms |
| `title` | `string` | Yes | - | Modal title |
| `message` | `string` | Yes | - | Modal message/description |
| `confirmText` | `string` | No | `Confirm` | Confirm button text () |
| `cancelText` | `string` | No | `Cancel` | Cancel button text () |
| `confirmVariant` | `'danger' | 'primary'` | No | `danger` | Confirm button variant () |
| `destructive` | `boolean` | No | - | Whether action is destructive (affects styling) |
| `loading` | `boolean` | No | - | Show loading state on confirm |
| `disabled` | `boolean` | No | - | Disable confirm button |

---

### ContextualShell

ContextualShell - Adaptive Layout Shell Purpose: Context-aware layouts that adapt to workflow state Structure: - Context Switcher: Quick context changes - Adaptive Layout: Changes based on context - Breadcrumbs: Deep navigation - Quick Actions: Context-specific actions - State Preservation: Remember context Features: - Context detection - Layout adaptation - State preservation - Quick switching - Context history

**File**: `/components/react/shells/ContextualShell.tsx`  
**Export**: `ContextualShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `contexts` | `Context[]` | Yes | - | Available contexts |
| `currentContextId` | `string` | No | - | Current context ID |
| `initialContextId` | `string` | No | - | Initial context ID |
| `quickActions` | `QuickAction[]` | No | - | Quick actions for current context |
| `showContextSwitcher` | `boolean` | No | - | Show context switcher |
| `showBreadcrumbs` | `boolean` | No | - | Show breadcrumbs |
| `onContextChange` | `(contextId: string)` | No | `> void` | On context change |
| `preserveState` | `boolean` | No | - | Preserve state between contexts |
| `mainContentId` | `string` | No | - | Main content ID for skip link |

---

### ExceptionShell

ExceptionShell - Error Page Shell Purpose: Professional error handling for 403/404/500 and other exceptions Structure: - Error Code: Large display (403, 404, 500) - Title: User-friendly error message - Description: Detailed explanation - Recovery Actions: Buttons to recover - Debug Info: Technical details (dev mode only) Features: - Multiple error code support - Recovery actions - Debug information - Custom illustrations - Navigation options

**File**: `/components/react/shells/ExceptionShell.tsx`  
**Export**: `ExceptionShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `code` | `ErrorCode` | Yes | - | Error code |
| `title` | `string` | No | - | Error title |
| `description` | `string` | No | - | Error description |
| `actions` | `RecoveryAction[]` | No | - | Recovery actions |
| `showDebug` | `boolean` | No | - | Show debug information (dev mode) |
| `debugInfo` | `{
    message?: string` | No | - | Debug information |
| `illustration` | `React.ReactNode` | No | - | Custom illustration/icon |
| `showBackButton` | `boolean` | No | - | Show back button |
| `onBack` | `()` | No | `> void` | Back button handler |
| `showHomeButton` | `boolean` | No | - | Show home button |
| `onHome` | `()` | No | `> void` | Home button handler |
| `mainContentId` | `string` | No | - | Main content ID for skip link |
| `stack` | `string` | No | - | - |
| `timestamp` | `string` | No | - | - |
| `requestId` | `string` | No | - | - |

---

### FocusShell

FocusShell - The Minimalist Used when you want the user to do ONE thing without distractions. Use Cases: Login/Sign-up, 404 Errors, Payment Checkouts, Onboarding Wizards Structure: - No Navigation - No Footer - Center: A single centered card or a split-screen (image left, form right) - Top Right: Optional "Exit" or "Help" button

**File**: `/components/react/shells/FocusShell.tsx`  
**Export**: `FocusShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `exitButton` | `React.ReactNode` | No | - | Optional exit/help button in top right |
| `variant` | `'centered' | 'split'` | No | - | Layout variant: 'centered' or 'split' |
| `leftContent` | `React.ReactNode` | No | - | Left side content (for split variant) |
| `maxWidth` | `string` | No | - | Maximum width for centered content (default: max-w-md) |
| `mainContentId` | `string` | No | - | Main content ID for skip link |
| `children` | `React.ReactNode` | Yes | - | - |

---

### FormModalShell

FormModalShell - Short Form Modal Purpose: Quick forms, inputs, short data entry Structure: - Overlay: Dark backdrop - Modal: Centered card with max-width - Header: Title and optional close button - Body: Form content - Footer: Action buttons (Cancel/Submit) Features: - Focus management - Keyboard shortcuts (Esc to close) - Form validation display - Auto-focus on first input - Prevents body scroll

**File**: `/components/react/shells/FormModalShell.tsx`  
**Export**: `FormModalShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | Yes | - | Whether modal is open |
| `onClose` | `()` | Yes | `> void` | Callback when modal should close |
| `title` | `string` | Yes | - | Modal title |
| `children` | `React.ReactNode` | Yes | - | Form content |
| `submitText` | `string` | No | `Submit` | Submit button text () |
| `cancelText` | `string` | No | `Cancel` | Cancel button text () |
| `showCancel` | `boolean` | No | - | Show cancel button |
| `onSubmit` | `()` | No | `> void` | Submit handler |
| `loading` | `boolean` | No | - | Show loading state |
| `disabled` | `boolean` | No | - | Disable submit button |
| `errors` | `Record<string, string>` | No | - | Validation errors |
| `maxWidth` | `string` | No | `max-w-md` | Modal width () |
| `showCloseButton` | `boolean` | No | - | Show close button in header |

---

### FullscreenModalShell

FullscreenModalShell - Fullscreen Modal for Wizards/Editors Purpose: Multi-step wizards, complex editors, onboarding flows Structure: - Fullscreen overlay - Header: Title, progress, close button - Body: Scrollable content area - Footer: Navigation buttons (Back/Next/Finish) Features: - Progress indicator - Step navigation - Keyboard shortcuts - Focus management - Prevents body scroll

**File**: `/components/react/shells/FullscreenModalShell.tsx`  
**Export**: `FullscreenModalShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | Yes | - | Whether modal is open |
| `onClose` | `()` | Yes | `> void` | Callback when modal should close |
| `title` | `string` | Yes | - | Modal title |
| `steps` | `FullscreenModalStep[]` | No | - | Steps for wizard mode |
| `currentStepId` | `string` | No | - | Current step ID (for wizard mode) |
| `initialStepId` | `string` | No | - | Initial step ID |
| `showProgress` | `boolean` | No | - | Show progress indicator |
| `showStepNavigation` | `boolean` | No | - | Show step navigation |
| `children` | `React.ReactNode` | No | - | Content (for non-wizard mode) |
| `footerActions` | `React.ReactNode` | No | - | Footer actions |
| `showCloseButton` | `boolean` | No | - | Show close button |
| `onStepChange` | `(stepId: string)` | No | `> void` | On step change callback |
| `onComplete` | `()` | No | `> void` | On complete callback |
| `allowClose` | `boolean` | No | - | Allow closing without confirmation |
| `closeConfirmation` | `string` | No | - | Close confirmation message |

---

### LazyPanel

LazyPanel - Lazy-loaded panel component Uses Intersection Observer to load content only when visible

**File**: `/components/react/shells/LazyPanel.tsx`  
**Export**: `LazyPanel`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactNode` | Yes | - | - |
| `fallback` | `React.ReactNode` | No | - | - |
| `threshold` | `number` | No | - | - |
| `rootMargin` | `string` | No | - | - |
| `enabled` | `boolean` | No | - | - |

---

### MasterDetailShell

MasterDetailShell - The Split View Essential for "Inbox" style interfaces (Email, Chat, Lists). Structure: - Left Pane (Fixed width): A scrollable list of items - Right Pane (Flex grow): The details of the selected item DRY Tip: This often sits inside the Sidebar Shell rather than replacing it.

**File**: `/components/react/shells/MasterDetailShell.tsx`  
**Export**: `MasterDetailShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `master` | `React.ReactNode` | Yes | - | Master list content (left pane) |
| `detail` | `React.ReactNode` | Yes | - | Detail content (right pane) |
| `masterWidth` | `string` | No | `320px` | Master pane width () |
| `showDetail` | `boolean` | No | - | Whether to show detail pane (for mobile) |
| `virtualScroll` | `boolean` | No | - | Enable virtual scrolling for master list |
| `virtualScrollOptions` | `{
    itemHeight?: number` | No | - | Virtual scroll options |
| `mainContentId` | `string` | No | - | Main content ID for skip link |
| `overscan` | `number` | No | - | - |

---

### MobileShell

MobileShell - The PWA View If your app is responsive, your Sidebar Shell morphs into this. But sometimes, you need a dedicated mobile layout structure. Structure: - Top: Sticky header (Title only) - Bottom: Sticky Tab Bar (Navigation) - Content: Scrollable area in between

**File**: `/components/react/shells/MobileShell.tsx`  
**Export**: `MobileShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `header` | `React.ReactNode` | No | - | Top header content |
| `tabBar` | `React.ReactNode` | No | - | Bottom tab bar content |
| `mainContentId` | `string` | No | - | Main content ID for skip link |
| `children` | `React.ReactNode` | Yes | - | - |

---

### RootShell

RootShell - The Invisible Logic Layer This is the most important DRY component. It doesn't look like anything, but it wraps every other shell. Purpose: Holds global state that every page needs Contains: - Toast/Notification Toaster (Global) - Modal/Dialog Provider - Theme Provider (handling Gold #eab308 and Dark/Light modes) - Skip-to-content link (for Accessibility) Usage: You never use this directly; DashboardShell and AuthShell wrap themselves in this.

**File**: `/components/react/shells/RootShell.tsx`  
**Export**: `RootShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `customThemes` | `CustomTheme[]` | No | - | Custom themes to make available |
| `initialTheme` | `string` | No | - | Initial theme name |
| `persistToCookie` | `boolean` | No | - | Persist theme choice to cookies |
| `skipToContentText` | `string` | No | - | Skip to content link text (accessibility) |
| `skipToContentId` | `string` | No | - | Skip to content link ID |
| `authProps` | `Omit<AuthProviderProps, 'children'>` | No | - | Auth provider props |
| `keyboardProps` | `Omit<KeyboardManagerProviderProps, 'children'>` | No | - | Keyboard manager props |
| `enableErrorBoundary` | `boolean` | No | - | Enable error boundary |
| `commands` | `Command[]` | No | - | Command palette commands |
| `showCommandPalette` | `boolean` | No | - | Show command palette |
| `commandPaletteEnabled` | `boolean` | No | `true` | Command palette enabled () |
| `children` | `React.ReactNode` | Yes | - | - |

---

### ShellErrorBoundary

ShellErrorBoundary - Error Boundary for Shell Components Purpose: Isolate shell errors to prevent entire app crashes Features: - Catches shell rendering errors - Provides fallback UI - Logs errors for debugging - Allows graceful degradation

**File**: `/components/react/shells/ShellErrorBoundary.tsx`  
**Export**: `withShellErrorBoundary`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `fallback` | `React.ComponentType<{ error: Error` | No | - | Custom fallback component |
| `onError` | `(error: Error, errorInfo: React.ErrorInfo)` | No | `> void` | Error logging function |
| `children` | `React.ReactNode` | Yes | - | - |

---

### SidebarShell

SidebarShell - The Workhorse Standard for SaaS, Admin Panels, and complex apps. Structure: - Left: Collapsible vertical navigation (Sidebar) - Top: Global search, User profile, Notifications - Center: The dynamic content area (Main) Gold #eab308 Opportunity: Use the gold for the "Active Item" border on the left sidebar.

**File**: `/components/react/shells/SidebarShell.tsx`  
**Export**: `SidebarShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `sidebar` | `React.ReactNode` | No | - | Sidebar content (navigation) |
| `header` | `React.ReactNode` | No | - | Header content (search, profile, notifications) |
| `footer` | `React.ReactNode` | No | - | Footer content (optional) |
| `sidebarWidth` | `string` | No | `280px` | Sidebar width () |
| `collapsible` | `boolean` | No | - | Whether sidebar is collapsible |
| `defaultCollapsed` | `boolean` | No | - | Initial collapsed state |
| `mainContentId` | `string` | No | - | Main content ID for skip link |
| `children` | `React.ReactNode` | Yes | - | - |

---

### SplitBusinessShell

SplitBusinessShell - Multi-Panel Business Application Shell Purpose: Business applications with multiple panels, inspector views Structure: - Primary Panel: Main content (left) - Secondary Panel: Supporting content (right) - Inspector Panel: Detail view (right, optional) - Toolbar: Contextual actions - Breadcrumbs: Navigation hierarchy Features: - Resizable panels - Panel visibility toggles - Context-aware toolbars - Deep linking - Panel state management

**File**: `/components/react/shells/SplitBusinessShell.tsx`  
**Export**: `SplitBusinessShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `primary` | `React.ReactNode` | Yes | - | Primary panel content (left/main) |
| `secondary` | `React.ReactNode` | No | - | Secondary panel content (right) |
| `inspector` | `React.ReactNode` | No | - | Inspector panel content (right, optional) |
| `breadcrumbs` | `BreadcrumbItem[]` | No | - | Breadcrumb items |
| `toolbarActions` | `ToolbarAction[]` | No | - | Toolbar actions |
| `primaryWidth` | `string` | No | - | Primary panel width (default: 60%) |
| `secondaryWidth` | `string` | No | - | Secondary panel width (default: 40%) |
| `showSecondary` | `boolean` | No | - | Show secondary panel |
| `showInspector` | `boolean` | No | - | Show inspector panel |
| `onPanelResize` | `(primaryWidth: number, secondaryWidth: number)` | No | `> void` | On panel resize |
| `mainContentId` | `string` | No | - | Main content ID for skip link |

---

### StackedShell

StackedShell - The Consumer View Best for user profiles, settings pages, or less complex apps. Structure: - Top: A single horizontal navigation bar (Logo left, Links center, Profile right) - Center: Content with constrained width (e.g., max-w-7xl) - Bottom: Standard Footer Why separate? Sidebars take up horizontal space; this shell maximizes width for data tables or marketing content.

**File**: `/components/react/shells/StackedShell.tsx`  
**Export**: `StackedShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `navigation` | `React.ReactNode` | No | - | Top navigation content |
| `footer` | `React.ReactNode` | No | - | Footer content |
| `maxWidth` | `string` | No | - | Maximum content width (default: max-w-7xl) |
| `mainContentId` | `string` | No | - | Main content ID for skip link |
| `children` | `React.ReactNode` | Yes | - | - |

---

### WorkflowShell

WorkflowShell - Multi-Stage Workflow Shell Purpose: Multi-step processes, wizards, onboarding flows Structure: - Progress Bar: Visual step indicator - Stage Content: Current step content - Navigation: Back/Next/Finish buttons - Sidebar: Optional step list - Validation: Inline validation feedback Features: - Step validation gates - Conditional branching - Progress persistence - Step skipping (if allowed) - Step review mode

**File**: `/components/react/shells/WorkflowShell.tsx`  
**Export**: `WorkflowShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `stages` | `WorkflowStage[]` | Yes | - | Workflow stages |
| `currentStageId` | `string` | No | - | Current stage ID |
| `initialStageId` | `string` | No | - | Initial stage ID |
| `onStageChange` | `(stageId: string)` | No | `> void` | On stage change callback |
| `onComplete` | `()` | No | `> void` | On workflow complete callback |
| `showProgress` | `boolean` | No | - | Show progress bar |
| `showSidebar` | `boolean` | No | - | Show sidebar with step list |
| `allowSkipping` | `boolean` | No | - | Allow step skipping |
| `mainContentId` | `string` | No | - | Main content ID for skip link |

---

### WorkspaceShell

WorkspaceShell - Multi-Panel Workspace Shell Purpose: Complex applications, multi-tab interfaces, project management Structure: - Tab Bar: Multiple open tabs - Panel Groups: Organized panels (left/right/bottom) - Main Editor: Primary content area - Inspector: Right-side detail panel - Status Bar: Bottom status information Features: - Tab management - Resizable panels - Panel states (collapsed/expanded) - Workspace persistence - Split views

**File**: `/components/react/shells/WorkspaceShell.tsx`  
**Export**: `WorkspaceShell`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tabs` | `WorkspaceTab[]` | No | - | Open tabs |
| `activeTabId` | `string` | No | - | Active tab ID |
| `initialTabId` | `string` | No | - | Initial active tab |
| `panels` | `WorkspacePanel[]` | No | - | Panels |
| `statusBar` | `React.ReactNode` | No | - | Status bar content |
| `onTabChange` | `(tabId: string)` | No | `> void` | On tab change |
| `onTabClose` | `(tabId: string)` | No | `> void` | On tab close |
| `mainContentId` | `string` | No | - | Main content ID for skip link |

---

## Forms

### Button

Button Component AIBOS-enhanced NextUI Button component Combines NextUI Button with AIBOS design system classes ```tsx <Button variant="primary">Click me</Button> <Button variant="secondary">Cancel</Button> ```

**File**: `/components/react/Button.tsx`  
**Export**: `Button`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Custom className - will be merged with AIBOS classes |
| `variant` | `ButtonVariant` | No | `primary` | Button variant Maps to AIBOS button classes |
| `withAIBOSStyles` | `boolean` | No | `true` | Apply AIBOS button styling |

#### Example

```tsx
<Button variant="primary">Click me</Button>
<Button variant="secondary">Cancel</Button>
```

---

## Other

### AuthContext

AuthContext - Authentication Context Provider Purpose: Global authentication state management Features: - User state - Authentication status - Login/logout handlers - Token management - Permission checks

**File**: `/components/react/contexts/AuthContext.tsx`  
**Export**: `AuthProvider`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `initialUser` | `User | null` | No | - | Initial user state |
| `initialToken` | `string | null` | No | - | Initial token |
| `onLogin` | `(credentials: { email: string` | No | - | Custom login handler |
| `onLogout` | `()` | No | `> Promise<void>` | Custom logout handler |
| `onRefreshToken` | `()` | No | `> Promise<string>` | Custom token refresh handler |
| `tokenKey` | `string` | No | `auth_token` | Token storage key () |
| `children` | `React.ReactNode` | Yes | - | - |

---

### KeyboardManager

KeyboardManager - Global Keyboard Shortcut Manager Purpose: Manage global keyboard shortcuts across the application Features: - Global shortcuts (Cmd/Ctrl+K for command palette, etc.) - Context-aware shortcuts - Shortcut registration - Conflict detection - Help overlay

**File**: `/components/react/contexts/KeyboardManager.tsx`  
**Export**: `KeyboardManagerProvider`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `enableHelp` | `boolean` | No | - | Enable help overlay |
| `helpTrigger` | `string` | No | `?` | Help overlay trigger () |
| `children` | `React.ReactNode` | Yes | - | - |

---

### NextuiHelpers

NextUI Integration Helpers Utility functions and HOCs for seamless NextUI + AIBOS integration

**File**: `/components/react/nextui-helpers.tsx`  
**Export**: `withAIBOS`

---

### CommandPalette

CommandPalette - Universal Command Palette Component Purpose: Quick actions, navigation, and commands (Cmd/Ctrl+K) Features: - Search commands - Keyboard navigation - Command categories - Recent commands - Custom commands

**File**: `/components/react/shells/CommandPalette.tsx`  
**Export**: `CommandPalette`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | Yes | - | Whether palette is open |
| `onClose` | `()` | Yes | `> void` | Close handler |
| `commands` | `Command[]` | Yes | - | Available commands |
| `showSearch` | `boolean` | No | - | Show search input |
| `placeholder` | `string` | No | - | Placeholder text |
| `maxHeight` | `string` | No | - | Max height |

---

### StatusIndicator

StatusIndicator Component AIBOS Design System Status Indicator with NextUI integration Provides accessible status indicators using AIBOS CSS classes ```tsx <StatusIndicator variant="success" label="Complete" /> <StatusIndicator variant="error" label="Failed" /> ```

**File**: `/components/react/StatusIndicator.tsx`  
**Export**: `StatusIndicator`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `StatusVariant` | Yes | - | Status variant Maps to AIBOS CSS classes: ok, bad, warn, pending |
| `label` | `string` | Yes | - | Status label text Required - AIBOS guidelines require text labels with icons |
| `size` | `'small' | 'default' | 'large'` | No | `default` | Optional size variant |
| `showDot` | `boolean` | No | `true` | Optional icon override (uses AIBOS ::before pseudo-element dot) |

#### Example

```tsx
<StatusIndicator variant="success" label="Complete" />
<StatusIndicator variant="error" label="Failed" />
```

---


---

## Usage

All components are exported from `@aibos/design-system/react`:

```typescript
import { Button, Card, AuthProvider, KeyboardManagerProvider, withAIBOS, CommandCenterShell, CommandPalette, ConfirmShell, ContextualShell, ExceptionShell, FocusShell, FormModalShell, FullscreenModalShell, LazyPanel, MasterDetailShell, MobileShell, RootShell, withShellErrorBoundary, SidebarShell, SplitBusinessShell, StackedShell, WorkflowShell, WorkspaceShell, StatusIndicator } from '@aibos/design-system/react';
```

---

**Generated by**: `scripts/generate-component-docs.js`  
**Source**: `components/react/`
