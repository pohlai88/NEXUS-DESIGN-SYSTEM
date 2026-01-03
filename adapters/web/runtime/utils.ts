/**
 * Web Components Runtime Utilities
 * 
 * Browser-side utilities for Web Components.
 * This file runs in the user's browser (compiled to dist/web/lib/utils.js).
 */

/**
 * Merge class names (similar to clsx but for browser)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get attribute value or return default
 */
export function getAttribute(element: HTMLElement, name: string, defaultValue: string = ''): string {
  return element.getAttribute(name) || defaultValue;
}

/**
 * Set attribute if value is truthy, remove if falsy
 */
export function setAttributeConditional(
  element: HTMLElement,
  name: string,
  value: boolean | string | null | undefined
): void {
  if (value === null || value === undefined || value === false) {
    element.removeAttribute(name);
  } else if (value === true) {
    element.setAttribute(name, '');
  } else {
    element.setAttribute(name, String(value));
  }
}

/**
 * Convert kebab-case to camelCase
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Convert camelCase to kebab-case
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Dispatch custom event with na- prefix
 */
export function dispatchNaEvent(
  element: HTMLElement,
  eventName: string,
  detail?: unknown
): boolean {
  const kebabName = camelToKebab(eventName);
  const prefixedName = kebabName.startsWith('na-') ? kebabName : `na-${kebabName}`;
  
  const event = new CustomEvent(prefixedName, {
    bubbles: true,
    cancelable: true,
    detail
  });
  
  return element.dispatchEvent(event);
}

/**
 * Parse boolean attribute
 */
export function parseBooleanAttribute(value: string | null): boolean {
  return value !== null && value !== 'false';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

