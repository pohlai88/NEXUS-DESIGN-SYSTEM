/**
 * Next.js Web Components Loader
 * 
 * Optimized loader for Web Components in Next.js applications.
 * Provides code splitting, error handling, and loading states.
 */

'use client';

import { useEffect, useState, useCallback } from 'react';

export interface WebComponentLoaderOptions {
  /** Component names to load (e.g., ['button', 'dialog']) */
  components: string[];
  /** Callback on load error */
  onError?: (error: Error, component: string) => void;
  /** Callback when all components are loaded */
  onLoad?: () => void;
  /** Whether to prefetch components */
  prefetch?: boolean;
}

export interface WebComponentLoaderResult {
  /** Whether all components are loaded */
  loaded: boolean;
  /** Loading error, if any */
  error: Error | null;
  /** Individual component load status */
  componentStatus: Record<string, 'loading' | 'loaded' | 'error'>;
}

/**
 * Hook to load Web Components with Next.js optimizations
 * 
 * @example
 * ```tsx
 * 'use client';
 * 
 * import { useWebComponents } from '@aibos/design-system/web-components/nextjs-loader';
 * 
 * export function MyComponent() {
 *   const { loaded, error } = useWebComponents({
 *     components: ['button', 'dialog'],
 *     onError: (err) => console.error(err),
 *   });
 * 
 *   if (error) return <div>Error loading components</div>;
 *   if (!loaded) return <div>Loading...</div>;
 * 
 *   return <na-button>Click me</na-button>;
 * }
 * ```
 */
export function useWebComponents(
  options: WebComponentLoaderOptions
): WebComponentLoaderResult {
  const { components, onError, onLoad, prefetch = false } = options;
  
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [componentStatus, setComponentStatus] = useState<
    Record<string, 'loading' | 'loaded' | 'error'>
  >(() => {
    const status: Record<string, 'loading' | 'loaded' | 'error'> = {};
    components.forEach(comp => {
      status[comp] = 'loading';
    });
    return status;
  });

  const loadComponent = useCallback(async (componentName: string) => {
    try {
      // Dynamic import with code splitting
      await import(`@aibos/design-system/web/${componentName}`);
      
      setComponentStatus(prev => ({
        ...prev,
        [componentName]: 'loaded',
      }));
      
      return true;
    } catch (err) {
      const error = err instanceof Error 
        ? err 
        : new Error(`Failed to load component: ${componentName}`);
      
      setComponentStatus(prev => ({
        ...prev,
        [componentName]: 'error',
      }));
      
      onError?.(error, componentName);
      
      return false;
    }
  }, [onError]);

  useEffect(() => {
    let cancelled = false;

    const loadAllComponents = async () => {
      try {
        // Prefetch if requested
        if (prefetch) {
          components.forEach(componentName => {
            // Use link prefetch for better performance
            const link = document.createElement('link');
            link.rel = 'modulepreload';
            link.href = `/node_modules/@aibos/design-system/dist/adapters/vanilla/${componentName}.js`;
            document.head.appendChild(link);
          });
        }

        // Load all components in parallel
        const results = await Promise.allSettled(
          components.map(comp => loadComponent(comp))
        );

        if (cancelled) return;

        const allLoaded = results.every(
          result => result.status === 'fulfilled' && result.value === true
        );

        if (allLoaded) {
          setLoaded(true);
          onLoad?.();
        } else {
          const errors = results
            .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
            .map(r => r.reason);
          
          if (errors.length > 0) {
            setError(errors[0] as Error);
          }
        }
      } catch (err) {
        if (cancelled) return;
        
        const error = err instanceof Error 
          ? err 
          : new Error('Failed to load Web Components');
        
        setError(error);
        onError?.(error, 'unknown');
      }
    };

    loadAllComponents();

    return () => {
      cancelled = true;
    };
  }, [components.join(','), prefetch, loadComponent, onLoad, onError]);

  return {
    loaded,
    error,
    componentStatus,
  };
}

/**
 * Preload Web Components for better performance
 * 
 * @example
 * ```tsx
 * // In app/layout.tsx
 * import { preloadWebComponents } from '@aibos/design-system/web-components/nextjs-loader';
 * 
 * export default function Layout({ children }) {
 *   useEffect(() => {
 *     preloadWebComponents(['button', 'dialog', 'card']);
 *   }, []);
 * 
 *   return <>{children}</>;
 * }
 * ```
 */
export function preloadWebComponents(components: string[]): void {
  if (typeof window === 'undefined') return;

  components.forEach(componentName => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = `/node_modules/@aibos/design-system/dist/adapters/vanilla/${componentName}.js`;
    link.as = 'script';
    document.head.appendChild(link);
  });
}

/**
 * Dynamic Web Component wrapper with Suspense support
 * 
 * @example
 * ```tsx
 * import { DynamicWebComponent } from '@aibos/design-system/web-components/nextjs-loader';
 * 
 * export function MyPage() {
 *   return (
 *     <DynamicWebComponent
 *       component="button"
 *       props={{ variant: 'primary' }}
 *       fallback={<button disabled>Loading...</button>}
 *     >
 *       Click me
 *     </DynamicWebComponent>
 *   );
 * }
 * ```
 */
export interface DynamicWebComponentProps {
  /** Component name (e.g., 'button', 'dialog') */
  component: string;
  /** Props to pass to the Web Component */
  props?: Record<string, any>;
  /** Fallback UI while loading */
  fallback?: React.ReactNode;
  /** Children to render inside the component */
  children?: React.ReactNode;
}

export function DynamicWebComponent({
  component,
  props = {},
  fallback = null,
  children,
}: DynamicWebComponentProps) {
  const { loaded, error } = useWebComponents({
    components: [component],
  });

  if (error) {
    return <div>Error loading {component}</div>;
  }

  if (!loaded) {
    return <>{fallback}</>;
  }

  const TagName = `na-${component}` as keyof JSX.IntrinsicElements;

  return (
    <TagName {...props}>
      {children}
    </TagName>
  );
}

