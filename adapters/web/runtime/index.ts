/**
 * Web Components Runtime Library
 * 
 * Browser-side runtime library for Web Components.
 * Compiled to dist/web/lib/ for browser consumption.
 */

export { DialogPrimitive, FocusPrimitive, AriaPrimitive } from './primitives.js';
export { 
  cn, 
  getAttribute, 
  setAttributeConditional, 
  kebabToCamel, 
  camelToKebab,
  dispatchNaEvent,
  parseBooleanAttribute,
  debounce
} from './utils.js';

