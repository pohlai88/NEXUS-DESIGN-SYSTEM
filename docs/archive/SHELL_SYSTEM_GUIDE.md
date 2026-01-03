# Shell System - Complete Guide

**Date**: 2025-01-27  
**Status**: ✅ **Production Ready**

---

## Overview

The AIBOS Shell System provides **6 production-ready shell components** that respect **DRY (Don't Repeat Yourself)** principles. All shells inherit from `RootShell` which provides global providers and state management.

---

## Shell Hierarchy

```
RootShell (Base Logic Layer)
├── Basic Shells (6)
│   ├── SidebarShell (Workhorse)
│   ├── StackedShell (Consumer View)
│   ├── FocusShell (Minimalist)
│   ├── MasterDetailShell (Split View)
│   └── MobileShell (PWA View)
└── Advanced Shells (5) ⭐ NEW
    ├── WorkflowShell (Multi-Stage)
    ├── CommandCenterShell (Executive Dashboard)
    ├── WorkspaceShell (Multi-Tab)
    ├── SplitBusinessShell (Multi-Panel)
    └── ContextualShell (Adaptive)
```

**See [Advanced Shells Complete Guide](./ADVANCED_SHELLS_COMPLETE_GUIDE.md) for advanced shells.**

---

## 1. RootShell - The Invisible Logic Layer ⭐

**The most important DRY component.** It doesn't look like anything, but it wraps every other shell.

### Purpose

Holds global state that *every* page needs:
- Toast/Notification Toaster (Global)
- Modal/Dialog Provider
- Theme Provider (handling Gold `#eab308` and Dark/Light modes)
- Skip-to-content link (for Accessibility)

### Usage

You never use this directly; other shells wrap themselves in this.

```tsx
// ❌ Don't use directly
<RootShell>
  <YourApp />
</RootShell>

// ✅ Use other shells instead
<SidebarShell>
  <YourApp />
</SidebarShell>
```

### Props

```typescript
interface RootShellProps {
  children: React.ReactNode;
  customThemes?: CustomTheme[];
  initialTheme?: string;
  persistToCookie?: boolean;
  skipToContentText?: string;
  skipToContentId?: string;
}
```

---

## 2. SidebarShell - The Workhorse ⭐

**Standard for SaaS, Admin Panels, and complex apps.**

### Structure

- **Left**: Collapsible vertical navigation (Sidebar)
- **Top**: Global search, User profile, Notifications
- **Center**: The dynamic content area (Main)

### Gold `#eab308` Opportunity

Use the gold for the "Active Item" border on the left sidebar.

### Usage

```tsx
import { SidebarShell } from '@aibos/design-system/react/shells';

<SidebarShell
  sidebar={<Navigation />}
  header={<Header />}
  footer={<Footer />}
  sidebarWidth="280px"
  collapsible={true}
>
  <YourContent />
</SidebarShell>
```

### Props

```typescript
interface SidebarShellProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarWidth?: string; // default: '280px'
  collapsible?: boolean; // default: true
  defaultCollapsed?: boolean; // default: false
  mainContentId?: string; // default: 'main-content'
  // ... all RootShellProps
}
```

### Example: Navigation with Gold Active State

```tsx
function Navigation() {
  return (
    <nav className="p-4">
      <a
        href="/dashboard"
        className="block px-4 py-2 rounded-lg border-l-2 border-primary text-lux hover:bg-paper-2"
      >
        Dashboard
      </a>
      <a
        href="/settings"
        className="block px-4 py-2 rounded-lg border-l-2 border-transparent text-lux-dim hover:bg-paper-2"
      >
        Settings
      </a>
    </nav>
  );
}
```

---

## 3. StackedShell - The Consumer View

**Best for user profiles, settings pages, or less complex apps.**

### Structure

- **Top**: A single horizontal navigation bar (Logo left, Links center, Profile right)
- **Center**: Content with constrained width (e.g., `max-w-7xl`)
- **Bottom**: Standard Footer

### Why Separate?

Sidebars take up horizontal space; this shell maximizes width for data tables or marketing content.

### Usage

```tsx
import { StackedShell } from '@aibos/design-system/react/shells';

<StackedShell
  navigation={<TopNav />}
  footer={<Footer />}
  maxWidth="max-w-7xl"
>
  <YourContent />
</StackedShell>
```

### Props

```typescript
interface StackedShellProps {
  children: React.ReactNode;
  navigation?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string; // default: 'max-w-7xl'
  mainContentId?: string;
  // ... all RootShellProps
}
```

---

## 4. FocusShell - The Minimalist

**Used when you want the user to do ONE thing without distractions.**

### Use Cases

- Login/Sign-up
- 404 Errors
- Payment Checkouts
- Onboarding Wizards

### Structure

- **No Navigation**
- **No Footer**
- **Center**: A single centered card or a split-screen (image left, form right)
- **Top Right**: Optional "Exit" or "Help" button

### Usage

```tsx
import { FocusShell } from '@aibos/design-system/react/shells';

// Centered variant
<FocusShell
  variant="centered"
  exitButton={<CloseButton />}
>
  <LoginForm />
</FocusShell>

// Split variant
<FocusShell
  variant="split"
  leftContent={<Illustration />}
  exitButton={<HelpButton />}
>
  <SignupForm />
</FocusShell>
```

### Props

```typescript
interface FocusShellProps {
  children: React.ReactNode;
  exitButton?: React.ReactNode;
  variant?: 'centered' | 'split'; // default: 'centered'
  leftContent?: React.ReactNode; // for split variant
  maxWidth?: string; // default: 'max-w-md'
  mainContentId?: string;
  // ... all RootShellProps
}
```

---

## 5. MasterDetailShell - The Split View

**Essential for "Inbox" style interfaces (Email, Chat, Lists).**

### Structure

- **Left Pane (Fixed width)**: A scrollable list of items
- **Right Pane (Flex grow)**: The details of the selected item

### DRY Tip

This often sits *inside* the **Sidebar Shell** rather than replacing it.

### Usage

```tsx
import { MasterDetailShell } from '@aibos/design-system/react/shells';

<MasterDetailShell
  master={<EmailList />}
  detail={<EmailView />}
  masterWidth="320px"
/>
```

### Nested in SidebarShell

```tsx
<SidebarShell sidebar={<MainNav />}>
  <MasterDetailShell
    master={<EmailList />}
    detail={<EmailView />}
  />
</SidebarShell>
```

### Props

```typescript
interface MasterDetailShellProps {
  master: React.ReactNode;
  detail: React.ReactNode;
  masterWidth?: string; // default: '320px'
  showDetail?: boolean; // default: true
  mainContentId?: string;
  // ... all RootShellProps
}
```

---

## 6. MobileShell - The PWA View

**If your app is responsive, your Sidebar Shell morphs into this. But sometimes, you need a dedicated mobile layout structure.**

### Structure

- **Top**: Sticky header (Title only)
- **Bottom**: Sticky Tab Bar (Navigation)
- **Content**: Scrollable area in between

### Usage

```tsx
import { MobileShell } from '@aibos/design-system/react/shells';

<MobileShell
  header={<MobileHeader />}
  tabBar={<TabBar />}
>
  <YourContent />
</MobileShell>
```

### Props

```typescript
interface MobileShellProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  tabBar?: React.ReactNode;
  mainContentId?: string;
  // ... all RootShellProps
}
```

---

## Comparison & Hierarchy

| Shell Name | Inherits From | Components Used | Best For |
|------------|---------------|-----------------|----------|
| **RootShell** | *None* | Providers, Toasts, Modals | *Base for everything* |
| **SidebarShell** | RootShell | Sidebar, Header, Main | SaaS, Admin Panels |
| **StackedShell** | RootShell | TopNav, Main, Footer | Consumer Apps, Settings |
| **FocusShell** | RootShell | Centered/Split Content | Login, Checkout |
| **MasterDetailShell** | RootShell | Master List, Detail View | Email, Chat |
| **MobileShell** | RootShell | Header, TabBar | PWAs, Mobile Apps |

---

## Design System Implementation

### Shell Slots

All shells use clear slot-based props to prevent layout breaking:

```tsx
// ✅ Good - Clear slots
<SidebarShell
  sidebar={<Nav />}
  header={<Header />}
>
  <Content />
</SidebarShell>

// ❌ Bad - Don't break the layout
<div className="na-shell">
  <div>Custom layout</div> {/* Breaks shell structure */}
</div>
```

### Gold `#eab308` Usage

Use gold for active states in navigation:

```tsx
// Active navigation item
<a className="border-l-2 border-primary">Active</a>

// Active tab
<button className="border-b-2 border-primary">Active Tab</button>
```

---

## Complete Example

### Full App with SidebarShell

```tsx
import { SidebarShell } from '@aibos/design-system/react/shells';
import { lightTheme, twilightTheme } from '@aibos/design-system/themes';

function App() {
  return (
    <SidebarShell
      customThemes={[lightTheme, twilightTheme]}
      sidebar={<Navigation />}
      header={<AppHeader />}
      footer={<AppFooter />}
    >
      <DashboardContent />
    </SidebarShell>
  );
}

function Navigation() {
  return (
    <nav className="p-4 space-y-2">
      <a
        href="/dashboard"
        className="block px-4 py-2 rounded-lg border-l-2 border-primary text-lux"
      >
        Dashboard
      </a>
      <a
        href="/settings"
        className="block px-4 py-2 rounded-lg border-l-2 border-transparent text-lux-dim hover:bg-paper-2"
      >
        Settings
      </a>
    </nav>
  );
}
```

---

## Accessibility

All shells include:
- ✅ Skip to content link
- ✅ Proper ARIA labels
- ✅ Semantic HTML
- ✅ Keyboard navigation support
- ✅ Focus management

---

## Theme Integration

All shells automatically use the theme system:

```tsx
<SidebarShell
  customThemes={[lightTheme, twilightTheme]}
  initialTheme="light"
>
  <App />
</SidebarShell>
```

---

## Best Practices

1. **Always use shells** - Don't build layouts from scratch
2. **Respect slot props** - Use provided slots, don't break structure
3. **Use gold for active states** - Consistent active indicators
4. **Nest shells when needed** - MasterDetailShell inside SidebarShell
5. **Mobile-first** - Use MobileShell for mobile-specific layouts

---

## Code References

- **RootShell**: `components/react/shells/RootShell.tsx`
- **SidebarShell**: `components/react/shells/SidebarShell.tsx`
- **StackedShell**: `components/react/shells/StackedShell.tsx`
- **FocusShell**: `components/react/shells/FocusShell.tsx`
- **MasterDetailShell**: `components/react/shells/MasterDetailShell.tsx`
- **MobileShell**: `components/react/shells/MobileShell.tsx`

---

**Ready to use!** All shells are production-ready and follow DRY principles.

