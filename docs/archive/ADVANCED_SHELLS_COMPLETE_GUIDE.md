# Advanced Business Shells - Complete Guide

**Date**: 2025-01-27  
**Status**: ✅ **Production Ready**

---

## Overview

The AIBOS Advanced Business Shells provide **5 enterprise-grade shell components** that go beyond basic layouts to support complex business workflows, multi-stage processes, and adaptive interfaces.

---

## Shell Hierarchy

```
RootShell (Base Logic Layer)
├── Basic Shells (6)
│   ├── SidebarShell
│   ├── StackedShell
│   ├── FocusShell
│   ├── MasterDetailShell
│   └── MobileShell
└── Advanced Shells (5) ⭐ NEW
    ├── WorkflowShell
    ├── CommandCenterShell
    ├── WorkspaceShell
    ├── SplitBusinessShell
    └── ContextualShell
```

---

## 1. WorkflowShell - Multi-Stage Workflows ⭐

**Purpose**: Multi-step processes, wizards, onboarding flows

### Features

- ✅ Progress indicators with validation
- ✅ Step navigation (Back/Next/Finish)
- ✅ Optional sidebar with step list
- ✅ Validation gates
- ✅ Step skipping support
- ✅ Progress persistence

### Usage

```tsx
import { WorkflowShell } from '@aibos/design-system/react/shells';

<WorkflowShell
  stages={[
    {
      id: 'welcome',
      label: 'Welcome',
      description: 'Get started',
      component: <WelcomeStep />,
      validation: () => validateWelcome(),
    },
    {
      id: 'profile',
      label: 'Profile',
      component: <ProfileStep />,
      validation: () => validateProfile(),
    },
    {
      id: 'complete',
      label: 'Complete',
      component: <CompleteStep />,
    },
  ]}
  showProgress={true}
  showSidebar={true}
  allowSkipping={false}
  onComplete={() => console.log('Done!')}
/>
```

### Use Cases

- User onboarding (5-7 steps)
- Account setup wizards
- Multi-step forms
- Approval workflows
- Migration processes

---

## 2. CommandCenterShell - Executive Dashboards ⭐

**Purpose**: Real-time monitoring, executive dashboards, operations centers

### Features

- ✅ Live ticker for real-time data
- ✅ KPI grid with trend indicators
- ✅ Customizable dashboard panels
- ✅ Command palette (Cmd+K)
- ✅ Alert system ready

### Usage

```tsx
import { CommandCenterShell } from '@aibos/design-system/react/shells';

<CommandCenterShell
  tickerItems={[
    { id: '1', label: 'Revenue', value: '$4.2M', trend: 'up' },
    { id: '2', label: 'Users', value: '1,234', trend: 'up' },
  ]}
  kpiCards={[
    {
      id: '1',
      title: 'Active Users',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
    },
  ]}
  panels={[
    { id: '1', title: 'Revenue Chart', component: <Chart />, span: 2 },
    { id: '2', title: 'User Activity', component: <Activity />, span: 2 },
  ]}
  commandPalette={true}
  alerts={true}
/>
```

### Use Cases

- Executive dashboards
- Network monitoring
- Business intelligence
- Operations centers
- Analytics platforms

---

## 3. WorkspaceShell - Multi-Tab Workspaces ⭐

**Purpose**: Complex applications, multi-tab interfaces, project management

### Features

- ✅ Tab management with close buttons
- ✅ Resizable panels (left/right/bottom)
- ✅ Panel collapse/expand
- ✅ Status bar support
- ✅ Multi-panel layouts

### Usage

```tsx
import { WorkspaceShell } from '@aibos/design-system/react/shells';

<WorkspaceShell
  tabs={[
    { id: '1', label: 'Project 1', component: <ProjectView />, closable: true },
    { id: '2', label: 'Project 2', component: <ProjectView />, dirty: true },
  ]}
  panels={[
    {
      id: 'inspector',
      title: 'Inspector',
      position: 'right',
      component: <Inspector />,
      resizable: true,
      collapsible: true,
    },
  ]}
  statusBar={<StatusBar />}
  onTabChange={(tabId) => console.log('Tab changed:', tabId)}
  onTabClose={(tabId) => console.log('Tab closed:', tabId)}
/>
```

### Use Cases

- Project management tools
- Design applications
- Development environments
- Data analysis tools
- Content management

---

## 4. SplitBusinessShell - Multi-Panel Business Apps ⭐

**Purpose**: Business applications with multiple panels, inspector views

### Features

- ✅ Resizable panels
- ✅ Panel visibility toggles
- ✅ Context-aware toolbars
- ✅ Deep linking
- ✅ Panel state management

### Usage

```tsx
import { SplitBusinessShell } from '@aibos/design-system/react/shells';

<SplitBusinessShell
  primary={<MainContent />}
  secondary={<Sidebar />}
  inspector={<Inspector />}
  breadcrumbs={[
    { id: '1', label: 'Home', href: '/' },
    { id: '2', label: 'Projects', href: '/projects' },
    { id: '3', label: 'Project Details' },
  ]}
  toolbarActions={[
    { id: 'save', label: 'Save', onClick: handleSave, variant: 'primary' },
    { id: 'delete', label: 'Delete', onClick: handleDelete, variant: 'danger' },
  ]}
  primaryWidth="60%"
  secondaryWidth="40%"
  showSecondary={true}
  showInspector={false}
  onPanelResize={(primary, secondary) => {
    console.log('Resized:', primary, secondary);
  }}
/>
```

### Use Cases

- CRM systems
- ERP interfaces
- Project management
- Design tools
- Data management

---

## 5. ContextualShell - Adaptive Layouts ⭐

**Purpose**: Context-aware layouts that adapt to workflow state

### Features

- ✅ Context detection
- ✅ Layout adaptation
- ✅ State preservation
- ✅ Quick switching (Cmd+K)
- ✅ Context history

### Usage

```tsx
import { ContextualShell } from '@aibos/design-system/react/shells';

<ContextualShell
  contexts={[
    {
      id: 'dashboard',
      label: 'Dashboard',
      component: <Dashboard />,
      layout: 'sidebar',
    },
    {
      id: 'project',
      label: 'Project',
      component: <Project />,
      layout: 'split',
    },
    {
      id: 'settings',
      label: 'Settings',
      component: <Settings />,
      layout: 'stacked',
    },
  ]}
  quickActions={[
    { id: 'new', label: 'New Item', onClick: handleNew, shortcut: 'n' },
  ]}
  showContextSwitcher={true}
  preserveState={true}
  onContextChange={(contextId) => console.log('Context:', contextId)}
/>
```

### Layout Types

- **sidebar**: Sidebar + main content
- **stacked**: Horizontal navigation + content
- **split**: Split view with details panel
- **focus**: Centered, focused content

### Use Cases

- Collaboration tools
- Knowledge bases
- Multi-tenant apps
- Workflow management
- Context-aware dashboards

---

## Comparison Table

| Shell | Best For | Key Features | Complexity |
|-------|----------|--------------|------------|
| **WorkflowShell** | Multi-step processes | Progress, validation, steps | Medium |
| **CommandCenterShell** | Real-time dashboards | Ticker, KPIs, command palette | High |
| **WorkspaceShell** | Multi-tab apps | Tabs, panels, resizing | High |
| **SplitBusinessShell** | Business apps | Resizable panels, inspector | Medium |
| **ContextualShell** | Adaptive interfaces | Context switching, layouts | High |

---

## Design Principles

### 1. **Stability & Fancy**

- ✅ Stable: Consistent, predictable layouts
- ✅ Fancy: Gold `#eab308` accents, smooth animations
- ✅ Professional: Enterprise-grade quality

### 2. **DRY Architecture**

- ✅ All shells inherit from RootShell
- ✅ Reusable panel components
- ✅ Shared state management
- ✅ Consistent patterns

### 3. **Performance**

- ✅ Lazy loading panels
- ✅ Virtual scrolling
- ✅ Optimistic updates
- ✅ Efficient re-renders

### 4. **Accessibility**

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management
- ✅ ARIA labels

---

## Code References

### Components

- `components/react/shells/WorkflowShell.tsx`
- `components/react/shells/CommandCenterShell.tsx`
- `components/react/shells/WorkspaceShell.tsx`
- `components/react/shells/SplitBusinessShell.tsx`
- `components/react/shells/ContextualShell.tsx`

### Examples

- See `examples/shell-examples.tsx` for basic shell patterns
- See `examples/shell-dashboard-example.tsx` for dashboard example

### Research

- `docs/ADVANCED_BUSINESS_SHELLS_RESEARCH.md` - Industry research
- `docs/ADVANCED_SHELLS_COMPLETE_GUIDE.md` - This guide

---

## Best Practices

### 1. **Choose the Right Shell**

- **WorkflowShell**: Multi-step processes
- **CommandCenterShell**: Real-time dashboards
- **WorkspaceShell**: Multi-tab interfaces
- **SplitBusinessShell**: Business applications
- **ContextualShell**: Adaptive interfaces

### 2. **Performance Optimization**

- Lazy load panel content
- Use virtual scrolling for long lists
- Optimize re-renders with React.memo
- Debounce resize handlers

### 3. **State Management**

- Use local state for UI state
- Use context for shared state
- Persist important state to localStorage
- Handle state restoration on mount

### 4. **Accessibility**

- Provide keyboard shortcuts
- Use ARIA labels
- Manage focus properly
- Support screen readers

---

**All advanced shells are production-ready and follow DRY principles!**

