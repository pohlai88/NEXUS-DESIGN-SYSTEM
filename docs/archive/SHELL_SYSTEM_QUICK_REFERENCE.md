# Shell System - Quick Reference

**Date**: 2025-01-27  
**Status**: ✅ **Production Ready**

---

## Shell Selection Guide

| Use Case | Shell | Why |
|----------|-------|-----|
| **SaaS Dashboard** | `SidebarShell` | Standard sidebar + header pattern |
| **Admin Panel** | `SidebarShell` | Complex navigation needs sidebar |
| **User Profile** | `StackedShell` | Maximize width, simple nav |
| **Settings Page** | `StackedShell` | Horizontal space for forms |
| **Login/Signup** | `FocusShell` | Remove distractions |
| **Checkout** | `FocusShell` | Focus on single task |
| **Email Client** | `MasterDetailShell` | List + detail view |
| **Chat App** | `MasterDetailShell` | Conversations + messages |
| **PWA** | `MobileShell` | Mobile-optimized layout |
| **Mobile App** | `MobileShell` | Tab bar navigation |

---

## Quick Code Templates

### SidebarShell (Most Common)

```tsx
import { SidebarShell } from '@aibos/design-system/react/shells';

<SidebarShell
  sidebar={<Nav />}
  header={<Header />}
>
  <Content />
</SidebarShell>
```

### StackedShell (Consumer Apps)

```tsx
import { StackedShell } from '@aibos/design-system/react/shells';

<StackedShell
  navigation={<TopNav />}
  footer={<Footer />}
>
  <Content />
</StackedShell>
```

### FocusShell (Login/Checkout)

```tsx
import { FocusShell } from '@aibos/design-system/react/shells';

<FocusShell variant="centered">
  <LoginForm />
</FocusShell>
```

### MasterDetailShell (Email/Chat)

```tsx
import { MasterDetailShell } from '@aibos/design-system/react/shells';

<MasterDetailShell
  master={<List />}
  detail={<Detail />}
/>
```

### MobileShell (PWA)

```tsx
import { MobileShell } from '@aibos/design-system/react/shells';

<MobileShell
  header={<Header />}
  tabBar={<TabBar />}
>
  <Content />
</MobileShell>
```

---

## Gold `#eab308` Active States

```tsx
// Active navigation item
<a className="border-l-2 border-primary">Active</a>

// Active tab
<button className="border-b-2 border-primary">Active Tab</button>
```

---

## Shell Hierarchy

```
RootShell (Base)
├── SidebarShell
├── StackedShell
├── FocusShell
├── MasterDetailShell
└── MobileShell
```

**Never use RootShell directly** - use other shells instead.

---

## Nested Shells

```tsx
// MasterDetailShell inside SidebarShell
<SidebarShell sidebar={<Nav />}>
  <MasterDetailShell
    master={<List />}
    detail={<Detail />}
  />
</SidebarShell>
```

---

## Theme Integration

All shells support themes automatically:

```tsx
<SidebarShell
  customThemes={[lightTheme, twilightTheme]}
  initialTheme="light"
>
  <App />
</SidebarShell>
```

---

## Accessibility

All shells include:
- ✅ Skip to content link
- ✅ ARIA labels
- ✅ Semantic HTML
- ✅ Keyboard navigation

---

**See [Shell System Guide](./SHELL_SYSTEM_GUIDE.md) for complete documentation.**

