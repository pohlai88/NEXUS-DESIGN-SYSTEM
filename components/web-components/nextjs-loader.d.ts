/**
 * Next.js Web Components Loader
 * 
 * Type definitions for Next.js Web Components optimization utilities.
 */

import { ReactNode } from 'react';

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
 */
export function useWebComponents(
  options: WebComponentLoaderOptions
): WebComponentLoaderResult;

/**
 * Preload Web Components for better performance
 */
export function preloadWebComponents(components: string[]): void;

export interface DynamicWebComponentProps {
  /** Component name (e.g., 'button', 'dialog') */
  component: string;
  /** Props to pass to the Web Component */
  props?: Record<string, any>;
  /** Fallback UI while loading */
  fallback?: ReactNode;
  /** Children to render inside the component */
  children?: ReactNode;
}

/**
 * Dynamic Web Component wrapper with Suspense support
 */
export function DynamicWebComponent(props: DynamicWebComponentProps): JSX.Element;

