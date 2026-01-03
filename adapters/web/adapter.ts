/**
 * Web Components Adapter
 * 
 * Generates Web Components from AIBOS component specifications.
 * 
 * Features:
 * - Light DOM (no Shadow DOM) for global style.css inheritance
 * - Type-safe CustomEvents with na-* prefix
 * - Error boundaries and graceful degradation
 * - ES module exports for tree-shaking
 * - Radix UI primitives integration (vanilla JS)
 */

import type {
  ComponentSpec,
  ComponentPart,
  RadixPrimitive
} from '../../types/component-spec.js';
import type {
  UniversalAdapter,
  GeneratedComponent,
  AdapterConfig
} from '../universal/adapter.js';
import {
  getAllClasses,
  getStateClasses,
  usesRadixUI,
  hasParts
} from '../universal/adapter.js';
import { validateSpec, InvalidSpecError } from '../universal/errors.js';

/**
 * Convert camelCase to kebab-case
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convert React prop name to Web Component event name
 * onOpenChange -> na-open-change
 */
function propToEventName(propName: string): string {
  // Remove 'on' prefix and convert to kebab-case
  const withoutOn = propName.startsWith('on') ? propName.slice(2) : propName;
  return `na-${camelToKebab(withoutOn)}`;
}

/**
 * Sanitize prop type for TypeScript
 */
function sanitizePropType(type: string): string {
  // Handle union types
  if (type.includes('|')) {
    return type.split('|').map(t => t.trim()).join(' | ');
  }
  // Handle function types
  if (type.includes('=>')) {
    return type;
  }
  // Handle boolean
  if (type === 'boolean') {
    return 'boolean';
  }
  // Handle string
  if (type === 'string') {
    return 'string';
  }
  // Handle number
  if (type === 'number') {
    return 'number';
  }
  // Default to string
  return 'string';
}

/**
 * Generate JSDoc comment for component
 */
function generateJSDoc(spec: ComponentSpec): string {
  const lines: string[] = [];
  lines.push('/**');
  lines.push(` * ${spec.name}`);
  if (spec.description) {
    lines.push(` * ${spec.description}`);
  }
  if (spec.metadata?.tags) {
    lines.push(` * @tags ${spec.metadata.tags.join(', ')}`);
  }
  lines.push(' */');
  return lines.join('\n');
}

/**
 * Generate TypeScript event definitions
 */
function generateEventTypes(spec: ComponentSpec, componentName: string): string {
  const events: string[] = [];
  
  // Generate events from props that start with 'on'
  if (spec.props) {
    for (const [propName, prop] of Object.entries(spec.props)) {
      if (propName.startsWith('on') && propName.length > 2) {
        const eventName = propToEventName(propName);
        // Extract detail type from prop type
        const propType = typeof prop === 'object' && prop !== null && 'type' in prop 
          ? String((prop as { type: string }).type)
          : 'string';
        const detailType = propType.includes('=>') 
          ? 'Record<string, unknown>' 
          : 'Record<string, unknown>';
        
        events.push(`  '${eventName}': CustomEvent<${detailType}>;`);
      }
    }
  }
  
  // Add standard events for Radix components
  if (usesRadixUI(spec)) {
    events.push(`  'na-open': CustomEvent<{ open: boolean; timestamp: number }>;`);
    events.push(`  'na-close': CustomEvent<{ reason: 'escape' | 'click-outside' | 'programmatic' }>;`);
  }
  
  // Add error event
  events.push(`  'na-error': CustomEvent<{ error: string; source: string }>;`);
  
  if (events.length === 0) {
    return '';
  }
  
  return `
export interface ${componentName}Events {
${events.join('\n')}
}

declare global {
  interface HTMLElementEventMap extends ${componentName}Events {}
}
`;
}

/**
 * Generate observed attributes array
 */
function generateObservedAttributes(spec: ComponentSpec): string {
  const attrs: string[] = [];
  
  // Add variant if exists
  if (spec.variants) {
    attrs.push('variant');
  }
  
  // Add standard attributes
  attrs.push('size', 'disabled', 'loading');
  
  // Add custom props as attributes (exclude event handlers)
  if (spec.props) {
    for (const [name] of Object.entries(spec.props)) {
      // Skip event handlers (on* props) and standard props
      if (name.startsWith('on')) continue;
      if (name === 'variant' || name === 'size' || name === 'disabled' || name === 'loading') continue;
      attrs.push(camelToKebab(name));
    }
  }
  
  // Add Radix-specific attributes
  if (usesRadixUI(spec)) {
    attrs.push('open');
  }
  
  // Remove duplicates and format
  const uniqueAttrs = [...new Set(attrs)];
  return uniqueAttrs.map(a => `'${a}'`).join(', ');
}

/**
 * Generate attribute getter/setter
 */
function generateAttributeAccessors(spec: ComponentSpec): string {
  const accessors: string[] = [];
  
  // Standard attributes
  const standardAttrs = ['variant', 'size', 'disabled', 'loading'];
  
  for (const attr of standardAttrs) {
    const kebabName = camelToKebab(attr);
    accessors.push(`
  get ${attr}(): string | null {
    return this.getAttribute('${kebabName}');
  }
  
  set ${attr}(value: string | null) {
    if (value === null) {
      this.removeAttribute('${kebabName}');
    } else {
      this.setAttribute('${kebabName}', value);
    }
  }`);
  }
  
  // Boolean attributes
  const booleanAttrs = ['disabled', 'loading'];
  for (const attr of booleanAttrs) {
    const kebabName = camelToKebab(attr);
    accessors.push(`
  get ${attr}(): boolean {
    return this.hasAttribute('${kebabName}');
  }
  
  set ${attr}(value: boolean) {
    if (value) {
      this.setAttribute('${kebabName}', '');
    } else {
      this.removeAttribute('${kebabName}');
    }
  }`);
  }
  
  return accessors.join('\n');
}

/**
 * Generate simple component (no parts, no Radix)
 */
function generateSimpleComponent(
  spec: ComponentSpec,
  componentName: string,
  tagName: string
): string {
  const nativeElement = spec.nativeElement || 'div';
  const defaultVariant = Object.keys(spec.variants || {})[0] || 'default';
  const observedAttrs = generateObservedAttributes(spec);
  const componentBaseName = tagName.replace('na-', '');
  
  // Build variant class map
  const variantEntries = spec.variants 
    ? Object.entries(spec.variants).map(([v, variant]) => {
        const variantObj = variant as { aibosClasses: string[] };
        return `    '${v}': [${variantObj.aibosClasses.map((c: string) => `'${c}'`).join(', ')}]`;
      })
    : [];
  
  // Build state classes
  const disabledClasses = JSON.stringify(getStateClasses(spec, 'disabled') || []);
  const loadingClasses = JSON.stringify(getStateClasses(spec, 'loading') || []);
  
  return `
${generateJSDoc(spec)}
${generateEventTypes(spec, componentName)}

/**
 * ${spec.name} Web Component
 * 
 * @element ${tagName}
 */
class ${componentName} extends HTMLElement {
  static get observedAttributes() {
    return [${observedAttrs}];
  }
  
  private _variant: string = '${defaultVariant}';
  private _size: string = 'md';
  private _disabled: boolean = false;
  private _loading: boolean = false;
  private _updateScheduled: number | null = null;
  private _pendingUpdates: Set<string> = new Set();
  private _eventListeners: Map<string, { element: EventTarget; type: string; handler: EventListener; options?: boolean | AddEventListenerOptions }> = new Map();
  
  constructor() {
    super();
    // CRITICAL: No Shadow DOM - use Light DOM to inherit style.css
  }
  
  connectedCallback() {
    this.updateClasses();
    this.setupAccessibility();
  }
  
  disconnectedCallback() {
    this.cleanup();
  }
  
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    
    // Update internal state immediately
    switch (name) {
      case 'variant':
        this._variant = newValue || '${defaultVariant}';
        this.scheduleUpdate('classes');
        break;
      case 'size':
        this._size = newValue || 'md';
        this.scheduleUpdate('classes');
        break;
      case 'disabled':
        this._disabled = newValue !== null;
        this.scheduleUpdate('attributes');
        break;
      case 'loading':
        this._loading = newValue !== null;
        this.scheduleUpdate('attributes');
        break;
    }
  }
  
  private scheduleUpdate(updateType: 'classes' | 'attributes') {
    this._pendingUpdates.add(updateType);
    
    if (this._updateScheduled === null) {
      this._updateScheduled = requestAnimationFrame(() => {
        this.flushUpdates();
        this._updateScheduled = null;
      });
    }
  }
  
  private flushUpdates() {
    if (this._pendingUpdates.has('classes')) {
      this.updateClasses();
    }
    if (this._pendingUpdates.has('attributes')) {
      this.updateAttributes();
    }
    this._pendingUpdates.clear();
  }
  
  private addEventListenerTracked(element: EventTarget, type: string, handler: EventListener, options?: boolean | AddEventListenerOptions) {
    element.addEventListener(type, handler, options);
    const key = \`\${element === this ? 'self' : 'external'}-\${type}-\${Date.now()}\`;
    this._eventListeners.set(key, { element, type, handler, options });
  }
  
  private removeAllEventListeners() {
    this._eventListeners.forEach(({ element, type, handler, options }) => {
      element.removeEventListener(type, handler, options);
    });
    this._eventListeners.clear();
  }
  
  private updateClasses() {
    const variantClassMap: Record<string, string[]> = {
${variantEntries.join(',\n')}
    };
    
    const variantClasses = variantClassMap[this._variant] || variantClassMap['${defaultVariant}'];
    const stateClasses: string[] = [];
    
    // Add size class if size is specified (default 'md' doesn't need class)
    const sizeClasses: string[] = [];
    if (this._size && this._size !== 'md') {
      sizeClasses.push(\`na-${componentBaseName}-\${this._size}\`);
    }
    
    if (this._disabled) {
      stateClasses.push(...${disabledClasses});
    }
    if (this._loading) {
      stateClasses.push(...${loadingClasses});
    }
    
    this.className = [...variantClasses, ...sizeClasses, ...stateClasses].filter(Boolean).join(' ');
  }
  
  private updateAttributes() {
    if (this._disabled || this._loading) {
      this.setAttribute('disabled', '');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('disabled');
      this.removeAttribute('aria-disabled');
    }
  }
  
  private setupAccessibility() {
    // Set ARIA attributes if needed
    if (!this.hasAttribute('aria-label') && this.textContent?.trim() === '') {
      console.warn('${componentName}: Missing aria-label for icon-only button');
    }
  }
  
  private cleanup() {
    // Cancel any pending updates
    if (this._updateScheduled !== null) {
      cancelAnimationFrame(this._updateScheduled);
      this._updateScheduled = null;
    }
    this._pendingUpdates.clear();
    
    // Remove all event listeners
    this.removeAllEventListeners();
  }
  
  // Event dispatch helper
  private dispatchNaEvent(eventName: string, detail?: unknown): boolean {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail
    });
    return this.dispatchEvent(event);
  }
}

customElements.define('${tagName}', ${componentName});

export { ${componentName} };
`;
}

/**
 * Runtime primitive cache (shared across all component instances)
 * This will be included in generated components to cache primitive imports
 */
const RUNTIME_PRIMITIVE_CACHE_CODE = `
// Runtime cache for primitive imports (shared across all component instances)
const __primitiveCache = new Map<string, Promise<any>>();

function __getCachedPrimitive(primitiveName: string): Promise<any> {
  if (!__primitiveCache.has(primitiveName)) {
    const importPromise = import('../lib/primitives.js').then(m => m[primitiveName]);
    __primitiveCache.set(primitiveName, importPromise);
  }
  return __primitiveCache.get(primitiveName)!;
}
`;

/**
 * Generate composite component (with parts, possibly Radix)
 */
function generateCompositeComponent(
  spec: ComponentSpec,
  componentName: string,
  tagName: string
): string {
  if (!spec.parts) {
    throw new InvalidSpecError(
      'Composite component must have parts',
      spec as any
    );
  }
  
  const isRadixComponent = usesRadixUI(spec);
  const parts = Object.entries(spec.parts);
  const rootPart = parts.find(([name]) => name.toLowerCase() === 'root');
  const otherParts = parts.filter(([name]) => name.toLowerCase() !== 'root');
  
  // If no Root part, use first part as root (for components like Card)
  const effectiveRootPart = rootPart || parts[0];
  
  if (!effectiveRootPart) {
    throw new InvalidSpecError(
      'Composite component must have at least one part',
      spec as any
    );
  }
  
  const observedAttrs = generateObservedAttributes(spec);
  const defaultVariant = Object.keys(spec.variants || {})[0] || 'default';
  
  // Build imports for Radix primitives
  const primitiveImports = isRadixComponent 
    ? `import { ${getRadixPrimitiveName(spec)}Primitive } from '../lib/primitives.js';`
    : '';
  
  // Generate root component class
  let code = `
${generateJSDoc(spec)}
${generateEventTypes(spec, componentName)}
${isRadixComponent ? RUNTIME_PRIMITIVE_CACHE_CODE : ''}
${primitiveImports}

/**
 * ${spec.name} Web Component
 * 
 * @element ${tagName}
 */
class ${componentName} extends HTMLElement {
  static get observedAttributes() {
    return [${observedAttrs}];
  }
  
  private _open: boolean = false;
  private _variant: string = '${defaultVariant}';
  private _size: string = 'md';
  private _disabled: boolean = false;
  private _loading: boolean = false;
  private _previousFocus: HTMLElement | null = null;
  private _cleanupFunctions: Array<() => void> = [];
  private _eventListeners: Map<string, { element: EventTarget; type: string; handler: EventListener; options?: boolean | AddEventListenerOptions }> = new Map();
  private _updateScheduled: number | null = null;
  private _pendingUpdates: Set<string> = new Set();
  ${isRadixComponent ? 'private _Primitive: any = null; private _primitivesLoaded: boolean = false;' : ''}
  
  constructor() {
    super();
    // CRITICAL: No Shadow DOM - use Light DOM to inherit style.css
  }
  
  async connectedCallback() {
    try {
      ${isRadixComponent ? `
      // Lazy load primitives with caching and error handling
      if (!this._primitivesLoaded) {
        const primitiveName = '${getRadixPrimitiveName(spec)}Primitive';
        // Use runtime cache to prevent re-importing across component instances
        this._Primitive = await __getCachedPrimitive(primitiveName);
        this._primitivesLoaded = true;
      }
      ` : ''}
      this.setupComponent();
    } catch (error) {
      console.warn('${componentName}: Failed to load primitives, using fallback', error);
      this.setupComponentFallback();
      this.dispatchNaEvent('na-error', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        source: '${componentName}'
      });
    }
  }
  
  disconnectedCallback() {
    this.cleanup();
  }
  
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    
    // Update internal state immediately
    switch (name) {
      case 'open':
        this._open = newValue !== null;
        this.scheduleUpdate('component');
        break;
      case 'variant':
        this._variant = newValue || '${defaultVariant}';
        this.scheduleUpdate('classes');
        break;
      case 'size':
        this._size = newValue || 'md';
        this.scheduleUpdate('classes');
        break;
      case 'disabled':
        this._disabled = newValue !== null;
        this.scheduleUpdate('attributes');
        break;
      case 'loading':
        this._loading = newValue !== null;
        this.scheduleUpdate('attributes');
        break;
    }
  }
  
  private scheduleUpdate(updateType: 'classes' | 'attributes' | 'component') {
    this._pendingUpdates.add(updateType);
    
    if (this._updateScheduled === null) {
      this._updateScheduled = requestAnimationFrame(() => {
        this.flushUpdates();
        this._updateScheduled = null;
      });
    }
  }
  
  private flushUpdates() {
    if (this._pendingUpdates.has('classes')) {
      this.updateClasses();
    }
    if (this._pendingUpdates.has('attributes')) {
      this.updateAttributes();
    }
    if (this._pendingUpdates.has('component')) {
      this.updateComponent();
    }
    this._pendingUpdates.clear();
  }
  
  private addEventListenerTracked(element: EventTarget, type: string, handler: EventListener, options?: boolean | AddEventListenerOptions) {
    element.addEventListener(type, handler, options);
    const key = \`\${element === this ? 'self' : 'external'}-\${type}-\${Date.now()}\`;
    this._eventListeners.set(key, { element, type, handler, options });
  }
  
  private removeAllEventListeners() {
    this._eventListeners.forEach(({ element, type, handler, options }) => {
      element.removeEventListener(type, handler, options);
    });
    this._eventListeners.clear();
  }
  
  private setupComponent() {
    ${isRadixComponent ? `
    if (this._Primitive) {
      this._Primitive.setAriaAttributes(this, { open: this._open });
      const cleanup = this._Primitive.trapFocus(this);
      this._cleanupFunctions.push(cleanup);
      
      const escapeCleanup = this._Primitive.handleEscape(this, () => this.close());
      this._cleanupFunctions.push(escapeCleanup);
    }
    ` : ''}
    this.updateClasses();
    this.updateAttributes();
  }
  
  private setupComponentFallback() {
    // Fallback implementation without primitives
    this.setAttribute('role', '${isRadixComponent ? 'dialog' : 'region'}');
    this.updateClasses();
    this.updateAttributes();
  }
  
  private updateClasses() {
    const variantClasses = this.getVariantClasses();
    const stateClasses = this.getStateClasses();
    this.className = [...variantClasses, ...stateClasses].filter(Boolean).join(' ');
  }
  
  private getVariantClasses(): string[] {
    const variantClassMap: Record<string, string[]> = {
${Object.entries(spec.variants || {}).map(([v, variant]) => {
      const variantObj = variant as { aibosClasses: string[] };
      return `      '${v}': [${variantObj.aibosClasses.map((c: string) => `'${c}'`).join(', ')}]`;
    }).join(',\n')}
    };
    return variantClassMap[this._variant] || variantClassMap['${defaultVariant}'];
  }
  
  private getStateClasses(): string[] {
    const stateClasses: string[] = [];
    if (this._disabled) {
      stateClasses.push(...${JSON.stringify(getStateClasses(spec, 'disabled') || [])});
    }
    if (this._loading) {
      stateClasses.push(...${JSON.stringify(getStateClasses(spec, 'loading') || [])});
    }
    return stateClasses;
  }
  
  private updateAttributes() {
    if (this._disabled || this._loading) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
    
    if (this._open) {
      this.removeAttribute('aria-hidden');
    } else {
      this.setAttribute('aria-hidden', 'true');
    }
  }
  
  private updateComponent() {
    ${isRadixComponent ? `
    if (this._Primitive) {
      this._Primitive.setAriaAttributes(this, { open: this._open });
    }
    ` : ''}
    this.updateAttributes();
  }
  
  ${isRadixComponent ? `
  public open() {
    this._open = true;
    this.setAttribute('open', '');
    this.dispatchNaEvent('na-open', { open: true, timestamp: Date.now() });
    if (this._Primitive) {
      this._previousFocus = document.activeElement as HTMLElement;
      this._Primitive.trapFocus(this);
    }
  }
  
  public close() {
    this._open = false;
    this.removeAttribute('open');
    this.dispatchNaEvent('na-close', { reason: 'programmatic' });
    if (this._Primitive && this._previousFocus) {
      this._Primitive.restoreFocus(this._previousFocus);
    }
  }
  ` : ''}
  
  private cleanup() {
    // Cancel any pending updates
    if (this._updateScheduled !== null) {
      cancelAnimationFrame(this._updateScheduled);
      this._updateScheduled = null;
    }
    this._pendingUpdates.clear();
    
    // Remove all event listeners
    this.removeAllEventListeners();
    
    // Run cleanup functions from primitives
    this._cleanupFunctions.forEach(fn => fn());
    this._cleanupFunctions = [];
    
    // Clear all references to prevent memory leaks
    this._Primitive = null;
    this._previousFocus = null;
  }
  
  private dispatchNaEvent(eventName: string, detail?: unknown): boolean {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail
    });
    return this.dispatchEvent(event);
  }
}

customElements.define('${tagName}', ${componentName});

export { ${componentName} };
`;
  
  return code;
}

/**
 * Get Radix primitive name from spec
 */
function getRadixPrimitiveName(spec: ComponentSpec): string {
  if (!spec.radixPrimitive) {
    return '';
  }
  
  // Extract name from @radix-ui/react-dialog -> Dialog
  const match = spec.radixPrimitive.match(/@radix-ui\/react-(\w+)/);
  if (match) {
    return match[1].charAt(0).toUpperCase() + match[1].slice(1);
  }
  
  return 'Dialog'; // Default
}

/**
 * Generate Web Component from specification
 */
export function generateWebComponent(
  spec: ComponentSpec,
  config: AdapterConfig
): GeneratedComponent {
  // Validate specification before generation
  validateSpec(spec);
  
  const componentName = spec.name;
  const tagName = `na-${camelToKebab(componentName)}`;
  const isComposite = hasParts(spec);
  
  let code: string;
  let imports: string[] = [];
  let dependencies: string[] = [];
  
  if (isComposite) {
    code = generateCompositeComponent(spec, componentName, tagName);
    if (usesRadixUI(spec)) {
      imports.push('../lib/primitives.js');
      dependencies.push('primitives');
    }
  } else {
    code = generateSimpleComponent(spec, componentName, tagName);
  }
  
  return {
    name: componentName,
    code,
    imports,
    dependencies
  };
}

/**
 * Web Components Adapter Implementation
 */
export const webAdapter: UniversalAdapter = {
  generate: generateWebComponent,
  
  getDependencies(spec: ComponentSpec): string[] {
    const deps: string[] = [];
    
    if (usesRadixUI(spec)) {
      deps.push('../lib/primitives.js');
    }
    
    return deps;
  }
};

