/**
 * Next.js App Router Example
 * 
 * Example of using AIBOS Web Components in a Next.js App Router application
 * with optimizations for code splitting and performance.
 */

'use client';

import { useWebComponents } from '@aibos/design-system/web-components/nextjs-loader';
import { Suspense } from 'react';

/**
 * Example: Product Card with Web Components
 * 
 * Demonstrates:
 * - Dynamic component loading
 * - Error handling
 * - Loading states
 */
export function ProductCard({ product }: { product: { id: string; name: string; price: number } }) {
  const { loaded, error, componentStatus } = useWebComponents({
    components: ['card', 'button'],
    onError: (err, component) => {
      console.error(`Failed to load ${component}:`, err);
    },
    onLoad: () => {
      console.log('All components loaded');
    },
    prefetch: true, // Prefetch for better performance
  });

  if (error) {
    return (
      <div className="error">
        <p>Error loading components: {error.message}</p>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="loading">
        <p>Loading components...</p>
        <div>
          {Object.entries(componentStatus).map(([comp, status]) => (
            <span key={comp} className={status}>
              {comp}: {status}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <na-card>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <na-button variant="primary" size="md">
        Add to Cart
      </na-button>
    </na-card>
  );
}

/**
 * Example: Dialog Component with Suspense
 * 
 * Demonstrates:
 * - Suspense boundaries
 * - Dynamic imports
 * - Server Component integration
 */
export function DialogExample() {
  const { loaded, error } = useWebComponents({
    components: ['dialog', 'button'],
  });

  if (error) return <div>Error loading dialog</div>;
  if (!loaded) return <div>Loading dialog...</div>;

  return (
    <div>
      <na-button id="open-dialog">Open Dialog</na-button>
      <na-dialog id="example-dialog">
        <h2>Example Dialog</h2>
        <p>This is a dialog component loaded dynamically.</p>
        <na-button id="close-dialog">Close</na-button>
      </na-dialog>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.getElementById('open-dialog')?.addEventListener('click', () => {
              const dialog = document.getElementById('example-dialog');
              if (dialog && 'open' in dialog) {
                (dialog as any).open();
              }
            });
            document.getElementById('close-dialog')?.addEventListener('click', () => {
              const dialog = document.getElementById('example-dialog');
              if (dialog && 'close' in dialog) {
                (dialog as any).close();
              }
            });
          `,
        }}
      />
    </div>
  );
}

/**
 * Example: Server Component with Client Component
 * 
 * This would be used in app/page.tsx (Server Component)
 */
export function ProductsPageExample() {
  // In a real app, this would fetch data on the server
  const products = [
    { id: '1', name: 'Product 1', price: 29.99 },
    { id: '2', name: 'Product 2', price: 39.99 },
    { id: '3', name: 'Product 3', price: 49.99 },
  ];

  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}

/**
 * Example: Route-level component loading
 * 
 * Load only components needed for this route
 */
export function useDashboardComponents() {
  return useWebComponents({
    components: ['card', 'button', 'input', 'select'],
    prefetch: true,
  });
}

export function DashboardPage() {
  const { loaded } = useDashboardComponents();

  if (!loaded) return <div>Loading dashboard components...</div>;

  return (
    <div>
      <na-card>
        <h2>Dashboard</h2>
        <na-input placeholder="Search..." />
        <na-select>
          <option>Option 1</option>
          <option>Option 2</option>
        </na-select>
        <na-button>Submit</na-button>
      </na-card>
    </div>
  );
}

