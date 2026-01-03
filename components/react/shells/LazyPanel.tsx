/**
 * LazyPanel - Lazy-loaded panel component
 * 
 * Uses Intersection Observer to load content only when visible
 */

'use client';

import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface LazyPanelProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export const LazyPanel = React.memo(function LazyPanel({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '100px',
  enabled = true,
}: LazyPanelProps) {
  const [panelRef, isVisible] = useIntersectionObserver({
    threshold,
    rootMargin,
    enabled,
  });

  return (
    <div ref={panelRef as React.RefObject<HTMLDivElement>}>
      {isVisible ? (
        children
      ) : (
        fallback || (
          <div className="h-64 flex items-center justify-center bg-paper-2 rounded-lg">
            <div className="na-metadata">Loading...</div>
          </div>
        )
      )}
    </div>
  );
});

