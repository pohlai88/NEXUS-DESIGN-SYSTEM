# Next.js Web Components Optimization Guide

**Optimizing AIBOS Web Components for Next.js Applications**

This guide explains how to optimize Web Components from `@aibos/design-system/web` for Next.js applications, leveraging Next.js features like Server Components, code splitting, static rendering, and caching.

---

## Overview

Web Components are **client-side only** and work seamlessly with Next.js. This guide provides optimization strategies based on Next.js best practices.

---

## Architecture Strategy

### Client Component Wrapper Pattern

Since Web Components require browser APIs, they must be used in Client Components:

```tsx
// components/web-components/button.tsx
'use client';

import { useEffect } from 'react';
import type { Button } from '@aibos/design-system/web';

interface WebButtonProps {
  variant?: string;
  size?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export function WebButton({ variant, size, disabled, children }: WebButtonProps) {
  useEffect(() => {
    // Dynamically import Web Component to enable code splitting
    import('@aibos/design-system/web/button');
  }, []);

  return (
    <na-button variant={variant} size={size} disabled={disabled}>
      {children}
    </na-button>
  );
}
```

---

## Optimization Strategies

### 1. Dynamic Imports for Code Splitting

**Strategy**: Use Next.js dynamic imports to load Web Components only when needed.

```tsx
// app/components/dynamic-button.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import with code splitting
const WebButton = dynamic(
  () => import('@aibos/design-system/web/button').then(() => ({
    default: ({ children, ...props }: any) => (
      <na-button {...props}>{children}</na-button>
    )
  })),
  {
    ssr: false, // Web Components don't work in SSR
    loading: () => <button disabled>Loading...</button>
  }
);

export function DynamicButton({ children, ...props }: any) {
  return (
    <Suspense fallback={<button disabled>Loading...</button>}>
      <WebButton {...props}>{children}</WebButton>
    </Suspense>
  );
}
```

**Benefits**:
- ✅ Code splitting: Component code only loads when needed
- ✅ Reduced initial bundle size
- ✅ Better performance for pages with many components

---

### 2. Prefetching for Critical Components

**Strategy**: Prefetch Web Components for routes that will likely be visited.

```tsx
// app/layout.tsx
import { Prefetch } from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Prefetch critical Web Components */}
        <link
          rel="modulepreload"
          href="/node_modules/@aibos/design-system/dist/adapters/vanilla/button.js"
          as="script"
        />
        <link
          rel="modulepreload"
          href="/node_modules/@aibos/design-system/dist/adapters/vanilla/dialog.js"
          as="script"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Benefits**:
- ✅ Faster component loading on navigation
- ✅ Better perceived performance
- ✅ Reduced loading states

---

### 3. Static Generation with Web Components

**Strategy**: Use static generation for pages with Web Components, then hydrate on client.

```tsx
// app/products/page.tsx (Server Component)
import { getProducts } from '@/lib/data';
import { ProductList } from './components/product-list';

// This page is statically generated
export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>
      {/* Server Component renders HTML, Web Components hydrate on client */}
      <ProductList products={products} />
    </div>
  );
}

// Force static generation
export const dynamic = 'force-static';
```

```tsx
// app/products/components/product-list.tsx (Client Component)
'use client';

import { useEffect } from 'react';

export function ProductList({ products }: { products: any[] }) {
  useEffect(() => {
    // Load Web Components only on client
    Promise.all([
      import('@aibos/design-system/web/button'),
      import('@aibos/design-system/web/card')
    ]);
  }, []);

  return (
    <div>
      {products.map(product => (
        <na-card key={product.id}>
          <h2>{product.name}</h2>
          <na-button variant="primary">Add to Cart</na-button>
        </na-card>
      ))}
    </div>
  );
}
```

**Benefits**:
- ✅ Fast initial page load (static HTML)
- ✅ SEO-friendly (server-rendered content)
- ✅ Web Components hydrate on client

---

### 4. Route-Level Code Splitting

**Strategy**: Load Web Components per route to minimize bundle size.

```tsx
// app/dashboard/components/dashboard-components.tsx
'use client';

import { useEffect } from 'react';

// Load only dashboard-specific components
export function useDashboardComponents() {
  useEffect(() => {
    Promise.all([
      import('@aibos/design-system/web/card'),
      import('@aibos/design-system/web/button'),
      import('@aibos/design-system/web/input')
    ]);
  }, []);
}

// app/dashboard/page.tsx
'use client';

import { useDashboardComponents } from './components/dashboard-components';

export default function DashboardPage() {
  useDashboardComponents(); // Load components for this route

  return (
    <div>
      <na-card>
        <na-input placeholder="Search..." />
        <na-button>Search</na-button>
      </na-card>
    </div>
  );
}
```

**Benefits**:
- ✅ Route-specific bundles
- ✅ Smaller initial bundle
- ✅ Faster page loads

---

### 5. Caching Strategy

**Strategy**: Leverage Next.js caching for Web Component assets.

```tsx
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cache Web Component assets
  async headers() {
    return [
      {
        source: '/node_modules/@aibos/design-system/dist/adapters/vanilla/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/node_modules/@aibos/design-system/dist/web/lib/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

**Benefits**:
- ✅ Long-term caching for component assets
- ✅ Reduced server load
- ✅ Faster subsequent loads

---

### 6. Optimized Component Loader Hook

**Strategy**: Create a reusable hook for loading Web Components with error handling.

```tsx
// hooks/use-web-components.ts
'use client';

import { useEffect, useState } from 'react';

interface UseWebComponentsOptions {
  components: string[];
  onError?: (error: Error) => void;
}

export function useWebComponents({ components, onError }: UseWebComponentsOptions) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadComponents = async () => {
      try {
        await Promise.all(
          components.map(component =>
            import(`@aibos/design-system/web/${component}`)
          )
        );
        setLoaded(true);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load components');
        setError(error);
        onError?.(error);
      }
    };

    loadComponents();
  }, [components, onError]);

  return { loaded, error };
}

// Usage
'use client';

import { useWebComponents } from '@/hooks/use-web-components';

export function MyComponent() {
  const { loaded, error } = useWebComponents({
    components: ['button', 'dialog', 'card'],
    onError: (err) => console.error('Component load error:', err)
  });

  if (error) return <div>Error loading components</div>;
  if (!loaded) return <div>Loading components...</div>;

  return (
    <na-button>Click me</na-button>
  );
}
```

---

## Best Practices

### ✅ DO

1. **Use dynamic imports** for non-critical components
2. **Prefetch critical components** in layout
3. **Load components per route** to minimize bundle size
4. **Use Suspense boundaries** for loading states
5. **Cache component assets** with long-term caching
6. **Use Server Components** for static content, Client Components for Web Components

### ❌ DON'T

1. **Don't import all components** at once
2. **Don't use Web Components in Server Components** (they require browser APIs)
3. **Don't skip error handling** for component loading
4. **Don't forget loading states** for dynamic imports
5. **Don't load components synchronously** in critical paths

---

## Performance Metrics

### Expected Improvements

| Optimization | Impact | Metric |
|-------------|--------|--------|
| Dynamic Imports | 40-60% bundle reduction | Initial bundle size |
| Route-Level Splitting | 50-70% per-route reduction | Route bundle size |
| Prefetching | 200-300ms faster | Time to interactive |
| Caching | 80-90% cache hit rate | Subsequent loads |

---

## Example: Optimized Product Page

```tsx
// app/products/page.tsx (Server Component - Static)
import { getProducts } from '@/lib/data';
import { ProductGrid } from './components/product-grid';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
```

```tsx
// app/products/components/product-grid.tsx (Client Component)
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useWebComponents } from '@/hooks/use-web-components';

// Dynamically import Web Components
const ProductCard = dynamic(
  () => import('./product-card'),
  { ssr: false, loading: () => <div>Loading...</div> }
);

export function ProductGrid({ products }: { products: any[] }) {
  // Load only needed components
  useWebComponents({ components: ['card', 'button'] });

  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <div className="grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Suspense>
  );
}
```

```tsx
// app/products/components/product-card.tsx (Client Component)
'use client';

export function ProductCard({ product }: { product: any }) {
  return (
    <na-card>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <na-button variant="primary">Add to Cart</na-button>
    </na-card>
  );
}
```

---

## Next.js Configuration

### Recommended `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize Web Component imports
  experimental: {
    optimizePackageImports: ['@aibos/design-system'],
  },
  
  // Cache Web Component assets
  async headers() {
    return [
      {
        source: '/node_modules/@aibos/design-system/dist/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Webpack configuration for better tree-shaking
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimize client-side bundle
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
```

---

## Examples

Complete working examples are available in `examples/nextjs/`:
- `app-example.tsx` - Full Next.js App Router examples
- `next.config.example.js` - Optimized Next.js configuration
- `README.md` - Quick start guide

## Summary

1. **Use dynamic imports** for code splitting
2. **Prefetch critical components** in layout
3. **Load components per route** to minimize bundles
4. **Use Server Components** for static content
5. **Cache component assets** with long-term caching
6. **Handle errors** and loading states properly

These optimizations ensure Web Components work efficiently with Next.js while maintaining excellent performance and user experience.

---

**Last Updated**: 2026-01-03  
**Next.js Version**: 15.x  
**Web Components Version**: 2.0.0  
**Examples**: See `examples/nextjs/` directory

