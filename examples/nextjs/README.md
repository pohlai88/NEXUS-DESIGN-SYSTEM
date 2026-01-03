# Next.js Integration Examples

Examples of using AIBOS Web Components in Next.js applications with optimizations.

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install @aibos/design-system
   ```

2. **Copy configuration**:
   ```bash
   cp examples/nextjs/next.config.example.js next.config.js
   ```

3. **Use in your app**:
   ```tsx
   // app/page.tsx
   'use client';
   
   import { useWebComponents } from '@aibos/design-system/web-components/nextjs-loader';
   
   export default function Page() {
     const { loaded } = useWebComponents({
       components: ['button', 'card'],
     });
     
     if (!loaded) return <div>Loading...</div>;
     
     return (
       <na-card>
         <na-button>Click me</na-button>
       </na-card>
     );
   }
   ```

## Examples

### Basic Usage

See `app-example.tsx` for:
- Product card with Web Components
- Dialog component with Suspense
- Server Component integration
- Route-level component loading

### Configuration

See `next.config.example.js` for:
- Package import optimization
- Asset caching
- Webpack tree-shaking configuration
- Transpilation settings

## Best Practices

1. **Load components per route** - Only load what you need
2. **Use prefetching** - Prefetch critical components
3. **Handle errors** - Always provide error states
4. **Use Suspense** - Wrap dynamic components in Suspense
5. **Cache assets** - Configure long-term caching

## Performance Tips

- Use `prefetch: true` for above-the-fold components
- Load components in parallel when possible
- Use route-level loading to minimize bundle size
- Leverage Next.js static generation for better performance

## Documentation

For complete documentation, see:
- [Next.js Web Components Optimization Guide](../../docs/NEXTJS_WEB_COMPONENTS_OPTIMIZATION.md)
- [Web Components Adapter README](../../adapters/web/README.md)

