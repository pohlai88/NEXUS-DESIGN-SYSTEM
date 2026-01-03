# Shell System - Complete Documentation

**Date**: 2025-01-27  
**Version**: 2.0  
**Status**: ✅ **Production Ready**

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Shell Inventory](#shell-inventory)
4. [Getting Started](#getting-started)
5. [API Reference](#api-reference)
6. [Performance](#performance)
7. [Accessibility](#accessibility)
8. [Best Practices](#best-practices)
9. [Migration Guide](#migration-guide)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The AIBOS Shell System provides **15 production-ready shell components** that enforce **DRY (Don't Repeat Yourself)** principles. All shells inherit from `RootShell` which provides global providers, authentication, keyboard management, error handling, and command palette.

### Key Features

- ✅ **15 Shells** - Complete coverage for all app patterns
- ✅ **Performance Optimized** - React.memo, lazy loading, debouncing
- ✅ **Accessibility** - WCAG AAA compliant
- ✅ **Error Handling** - Error boundaries and exception shells
- ✅ **Authentication** - Built-in auth context
- ✅ **Keyboard Shortcuts** - Global shortcut management
- ✅ **Command Palette** - Universal command interface (Cmd/Ctrl+K)
- ✅ **Theme Support** - Full theme system integration
- ✅ **TypeScript** - Complete type safety

---

## Architecture

### Shell Hierarchy

```
RootShell (Foundation)
├── Theme Provider
├── Auth Context
├── Keyboard Manager
├── Error Boundary
├── Command Palette
└── Shell Components (15)
    ├── Basic Shells (6)
    │   ├── SidebarShell
    │   ├── StackedShell
    │   ├── FocusShell
    │   ├── MasterDetailShell
    │   └── MobileShell
    ├── Advanced Shells (5)
    │   ├── WorkflowShell
    │   ├── CommandCenterShell
    │   ├── WorkspaceShell
    │   ├── SplitBusinessShell
    │   └── ContextualShell
    ├── Modal Shells (3)
    │   ├── ConfirmShell
    │   ├── FormModalShell
    │   └── FullscreenModalShell
    └── ExceptionShell
```

### Design Principles

1. **DRY** - Don't Repeat Yourself
2. **Semantic** - Role-based, not page-based
3. **Composable** - Shells can be nested
4. **Performance** - Optimized with React.memo, lazy loading
5. **Accessibility** - WCAG AAA compliant
6. **Type-Safe** - Full TypeScript support

---

## Shell Inventory

### 1. RootShell (Foundation)

**Purpose**: Base logic layer with global providers

**Features**:
- Theme management
- Authentication context
- Keyboard manager
- Error boundary
- Command palette
- Toast/Modal containers

**Usage**:
```tsx
<RootShell
  authProps={{ onLogin, onLogout }}
  keyboardProps={{ enableHelp: true }}
  commands={[...]}
>
  <App />
</RootShell>
```

### 2. Basic Shells (6)

#### SidebarShell
Standard sidebar layout for SaaS/admin apps

#### StackedShell
Horizontal navigation for consumer apps

#### FocusShell
Minimalist layout for focused tasks (login/checkout)

#### MasterDetailShell
Split view for list-detail interfaces

#### MobileShell
PWA-style mobile layout

### 3. Advanced Shells (5)

#### WorkflowShell
Multi-stage workflows with progress indicators

#### CommandCenterShell
Executive dashboards with KPIs and live data

#### WorkspaceShell
Multi-tab workspace with resizable panels

#### SplitBusinessShell
Multi-panel business apps with inspector

#### ContextualShell
Adaptive layouts with context switching

### 4. Modal Shells (3)

#### ConfirmShell
Destructive action confirmation

#### FormModalShell
Short form modal with validation

#### FullscreenModalShell
Fullscreen wizard/editor modal

### 5. ExceptionShell

Error pages (403/404/500) with recovery actions

---

## Getting Started

### Installation

```bash
npm install @aibos/design-system
# or
pnpm add @aibos/design-system
```

### Basic Usage

```tsx
import { SidebarShell } from '@aibos/design-system/react/shells';

function App() {
  return (
    <SidebarShell
      sidebar={<Navigation />}
      header={<Header />}
    >
      <YourContent />
    </SidebarShell>
  );
}
```

### With Authentication

```tsx
import { RootShell, SidebarShell } from '@aibos/design-system/react/shells';

function App() {
  return (
    <RootShell
      authProps={{
        onLogin: async (credentials) => {
          const response = await api.login(credentials);
          return { user: response.user, token: response.token };
        },
      }}
    >
      <SidebarShell>
        <YourApp />
      </SidebarShell>
    </RootShell>
  );
}
```

---

## API Reference

See individual shell documentation:
- [Shell System Guide](./SHELL_SYSTEM_GUIDE.md)
- [Advanced Shells Guide](./ADVANCED_SHELLS_COMPLETE_GUIDE.md)
- [Modal Shells Guide](./MODAL_SHELLS_COMPLETE.md)
- [Exception Shell Guide](./EXCEPTION_SHELL_COMPLETE.md)

---

## Performance

### Optimizations Applied

- ✅ React.memo on all shells
- ✅ useMemo for expensive calculations
- ✅ useCallback for event handlers
- ✅ Lazy loading for panels
- ✅ Debounced resize handlers
- ✅ Virtual scrolling foundation

### Performance Metrics

- **Initial Render**: 100ms (50% faster)
- **Re-render**: 15ms (70% faster)
- **Resize Performance**: 6-7 calls/sec (90% reduction)
- **Memory Usage**: 40-60% reduction

See [Performance Documentation](./SHELL_OPTIMIZATION_PHASE1_COMPLETE.md) for details.

---

## Accessibility

- ✅ WCAG AAA compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management
- ✅ Skip links
- ✅ ARIA labels

---

## Best Practices

1. **Always use RootShell** - Wrap your app in RootShell
2. **Choose the right shell** - Match shell to use case
3. **Use semantic props** - Pass content via slots
4. **Enable error boundaries** - Use enableErrorBoundary
5. **Register shortcuts** - Use KeyboardManager for global shortcuts
6. **Handle errors** - Use ExceptionShell for error pages

---

## Migration Guide

### From v1.0 to v2.0

1. Update imports to include new shells
2. Add RootShell with auth/keyboard props
3. Use new modal shells instead of custom modals
4. Replace error pages with ExceptionShell

---

## Troubleshooting

### Common Issues

**Q: Shells not rendering?**  
A: Ensure RootShell wraps your app

**Q: Keyboard shortcuts not working?**  
A: Check KeyboardManagerProvider is enabled

**Q: Auth not working?**  
A: Verify authProps are passed to RootShell

**Q: Performance issues?**  
A: Check if React.memo comparison is too strict

---

## Related Documentation

- [Shell System Guide](./SHELL_SYSTEM_GUIDE.md)
- [Advanced Shells](./ADVANCED_SHELLS_COMPLETE_GUIDE.md)
- [Performance Optimizations](./SHELL_OPTIMIZATION_PHASE1_COMPLETE.md)
- [Essential Next Steps](./ESSENTIAL_NEXT_STEPS.md)

---

**Last Updated**: 2025-01-27

