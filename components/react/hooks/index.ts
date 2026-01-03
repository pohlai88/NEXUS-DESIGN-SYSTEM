/**
 * Performance Hooks - Reusable optimization hooks
 * 
 * Performance optimization hooks for debouncing, intersection observation, and virtual scrolling.
 * Can be used independently or with shell components.
 */

export { useDebounce, useDebouncedCallback } from './useDebounce';
export { useIntersectionObserver } from './useIntersectionObserver';
export { useVirtualScroll } from './useVirtualScroll';
export type { UseIntersectionObserverOptions } from './useIntersectionObserver';
export type { UseVirtualScrollOptions, VirtualScrollResult } from './useVirtualScroll';

