/**
 * useVirtualScroll - Virtual scrolling hook for performance
 * 
 * Calculates visible items for virtual scrolling
 * Lightweight implementation without external dependencies
 */

import { useState, useEffect, useRef, useMemo } from 'react';

export interface UseVirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  enabled?: boolean;
}

export interface VirtualScrollResult {
  startIndex: number;
  endIndex: number;
  visibleItems: number;
  totalHeight: number;
  offsetY: number;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export function useVirtualScroll<T>(
  items: T[],
  options: UseVirtualScrollOptions
): VirtualScrollResult {
  const {
    itemHeight,
    containerHeight,
    overscan = 5,
    enabled = true,
  } = options;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate visible range
  const { startIndex, endIndex, totalHeight, offsetY } = useMemo(() => {
    if (!enabled || items.length === 0) {
      return {
        startIndex: 0,
        endIndex: items.length,
        totalHeight: items.length * itemHeight,
        offsetY: 0,
      };
    }

    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.ceil((scrollTop + containerHeight) / itemHeight);

    const startIndex = Math.max(0, visibleStart - overscan);
    const endIndex = Math.min(items.length, visibleEnd + overscan);

    return {
      startIndex,
      endIndex,
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight,
    };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length, enabled]);

  // Handle scroll
  useEffect(() => {
    if (!enabled || !scrollRef.current) return;

    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollTop(scrollRef.current.scrollTop);
      }
    };

    const element = scrollRef.current;
    element.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [enabled]);

  return {
    startIndex,
    endIndex,
    visibleItems: endIndex - startIndex,
    totalHeight,
    offsetY,
    scrollRef,
  };
}

