# Next.js Integration Guide

**For Design System Package Authors**

This guide explains how the AIBOS Design System React components are optimized for Next.js integration.

---

## Component Architecture

### Client Components

All React components in this package are **Client Components** because they:

1. **Wrap NextUI components** - NextUI requires client-side rendering
2. **Use React hooks** - Shell components use `useState`, `useEffect`, etc.
3. **Handle browser APIs** - Keyboard events, window/document access

**All components include `'use client'` directive** at the top of the file.

### Component Categories

#### 1. **Presentational Components** (Button, Card, StatusIndicator)
- Wrap NextUI components
- Require `'use client'` because NextUI is client-only
- Can be used in Server Components (Next.js handles the boundary)

#### 2. **Shell Components** (RootShell, SidebarShell, etc.)
- Use React hooks (`useState`, `useEffect`, `useContext`)
- Handle browser APIs (`window`, `document`)
- Require `'use client'` for interactivity

---

## Next.js Best Practices

### ✅ Correct Usage

**In a Server Component (page.tsx, layout.tsx):**

```tsx
// app/page.tsx (Server Component by default)
import { Button, Card, CardBody } from '@aibos/design-system/react';

export default function Page() {
  return (
    <Card>
      <CardBody>
        <Button variant="primary">Click me</Button>
      </CardBody>
    </Card>
  );
}
```

**In a Client Component:**

```tsx
// app/components/interactive.tsx
'use client';

import { Button } from '@aibos/design-system/react';
import { useState } from 'react';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <Button onClick={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  );
}
```

### ❌ Incorrect Usage

**Don't try to use components without 'use client' in Server Components that need interactivity:**

```tsx
// ❌ WRONG - This won't work
export default function Page() {
  const [state, setState] = useState(0); // Error: useState in Server Component
  
  return <Button onClick={() => setState(state + 1)}>Click</Button>;
}
```

**Solution:** Create a Client Component wrapper:

```tsx
// ✅ CORRECT
'use client';

import { Button } from '@aibos/design-system/react';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>;
}

// app/page.tsx (Server Component)
import { Counter } from './components/counter';

export default function Page() {
  return <Counter />;
}
```

---

## Shell Components in Next.js

### RootShell Setup

The `RootShell` component provides global providers (theme, auth, keyboard shortcuts). Use it in your root layout:

```tsx
// app/layout.tsx
import { RootShell } from '@aibos/design-system/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootShell>
          {children}
        </RootShell>
      </body>
    </html>
  );
}
```

### Other Shell Components

Use shell components in your pages:

```tsx
// app/dashboard/page.tsx
import { SidebarShell } from '@aibos/design-system/react';

export default function DashboardPage() {
  return (
    <SidebarShell
      sidebarContent={<nav>...</nav>}
      mainContent={<main>Dashboard content</main>}
    />
  );
}
```

---

## TypeScript Support

All components export TypeScript types:

```tsx
import type {
  ButtonProps,
  ButtonVariant,
  CardProps,
  StatusIndicatorProps,
  StatusVariant,
} from '@aibos/design-system/react';
```

---

## Bundle Size Optimization

### Tree Shaking

Components are exported individually, so unused components are tree-shaken:

```tsx
// ✅ Only Button is included in bundle
import { Button } from '@aibos/design-system/react';

// ❌ All components included
import * from '@aibos/design-system/react';
```

### Server Component Optimization

Since components are Client Components, they're automatically code-split:

- **Server Components** render on the server (no JS sent)
- **Client Components** are loaded only when needed
- **Next.js** handles the boundary automatically

---

## Next.js MCP Tools

This design system package is compatible with Next.js MCP (Model Context Protocol) tools:

### Available Tools

1. **nextjs_docs** - Search Next.js documentation
2. **nextjs_index** - Discover running Next.js servers
3. **nextjs_call** - Execute runtime diagnostics
4. **browser_eval** - Test components in browser

### Usage

To use Next.js MCP tools with this design system:

1. **Create a Next.js app** that uses this package
2. **Start the dev server**: `pnpm dev` (or `npm run dev`)
3. **MCP tools** will auto-discover the running server
4. **Use tools** to debug, check routes, and verify components

---

## Common Patterns

### Pattern 1: Server Component with Client Component

```tsx
// app/products/page.tsx (Server Component)
import { Card, CardBody } from '@aibos/design-system/react';
import { getProducts } from '@/lib/data';
import { ProductList } from './components/product-list';

export default async function ProductsPage() {
  const products = await getProducts(); // Server-side data fetching
  
  return (
    <Card>
      <CardBody>
        <ProductList products={products} />
      </CardBody>
    </Card>
  );
}
```

```tsx
// app/products/components/product-list.tsx (Client Component)
'use client';

import { Button } from '@aibos/design-system/react';
import { useState } from 'react';

export function ProductList({ products }) {
  const [selected, setSelected] = useState(null);
  
  return (
    <div>
      {products.map(product => (
        <Button
          key={product.id}
          onClick={() => setSelected(product)}
        >
          {product.name}
        </Button>
      ))}
    </div>
  );
}
```

### Pattern 2: Context Providers

```tsx
// app/layout.tsx
import { RootShell } from '@aibos/design-system/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RootShell>
          {children}
        </RootShell>
      </body>
    </html>
  );
}
```

---

## Troubleshooting

### Error: "useState can only be used in Client Components"

**Problem:** You're using hooks in a Server Component.

**Solution:** Add `'use client'` directive or move logic to a Client Component.

### Error: "Cannot find module '@aibos/design-system/react'"

**Problem:** Package not installed or path alias not configured.

**Solution:**
```bash
pnpm add @aibos/design-system
```

### Components not rendering

**Problem:** Missing CSS import.

**Solution:**
```tsx
// app/layout.tsx
import '@aibos/design-system/css';
```

---

## Resources

- [Next.js Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- [Next.js MCP Tools Documentation](./NEXTJS_MCP_GUIDE.md)
- [Design System README](../README.md)

---

**Last Updated:** 2025-01-27  
**Next.js Version:** 16+  
**React Version:** 18+

