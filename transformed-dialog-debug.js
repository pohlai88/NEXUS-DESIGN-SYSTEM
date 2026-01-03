
/**
 * Dialog
 * Modal dialog component for displaying content in an overlay
 * @tags modal, overlay, dialog
 */

// Runtime cache for primitive imports (shared across all component instances)
const __primitiveCache = new Map();
function __getCachedPrimitive(primitiveName) {
 if (!__primitiveCache.has(primitiveName)) {
 const importPromise = Promise.resolve(window.__testPrimitivesModule[primitiveName]);
 __primitiveCache.set(primitiveName, importPromise);

 return __primitiveCache.get(primitiveName);

/**
 * Dialog Web Component
 * 
 * @element na-dialog
 */
class Dialog extends HTMLElement {
 static get observedAttributes() {
 return ['variant', 'size', 'disabled', 'loading', 'open'];

 _open = false;
 _variant = 'default';
 _size = 'md';
 _disabled = false;
 _loading = false;
 _previousFocus = null;
 _cleanupFunctions = [];
 _eventListeners = new Map();
 _updateScheduled = null;
 _pendingUpdates = new Set();
 _Primitive = null; _primitivesLoaded = false;
 
 constructor() {
 super();
 // CRITICAL: No Shadow DOM - use Light DOM to inherit style.css

 async connectedCallback() {
 try {
 
 // Lazy load primitives with caching and error handling
 if (!this._primitivesLoaded) {
 const primitiveName = 'DialogPrimitive';
 // Use runtime cache to prevent re-importing across component instances
 this._Primitive = await __getCachedPrimitive(primitiveName);
 this._primitivesLoaded = true;

 this.setupComponent();
 } catch (error) {
 console.warn('Dialog, using fallback', error);
 this.setupComponentFallback();
 this.dispatchNaEvent('na-error', { 
 error, source);

 disconnectedCallback() {
 this.cleanup();

 attributeChangedCallback(name, oldValue, newValue) {
 if (oldValue === newValue) return;
 
 // Update internal state immediately
 switch (name) {
 case 'open':
 this._open = newValue !== null;
 this.scheduleUpdate('component');
 break;
 case 'variant':
 this._variant = newValue || 'default';
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

 scheduleUpdate(updateType) {
 this._pendingUpdates.add(updateType);
 
 if (this._updateScheduled === null) {
 this._updateScheduled = setTimeout(() => {
 this.flushUpdates();
 this._updateScheduled = null;
 });

 flushUpdates() {
 if (this._pendingUpdates.has('classes')) {
 this.updateClasses();

 if (this._pendingUpdates.has('attributes')) {
 this.updateAttributes();

 if (this._pendingUpdates.has('component')) {
 this.updateComponent();

 this._pendingUpdates.clear();

 addEventListenerTracked(element, type, handler, options?) {
 element.addEventListener(type, handler, options);
 const key = `${element === this ? 'self' : 'external'}-${type}-${Date.now()}`;
 this._eventListeners.set(key, { element, type, handler, options });

 removeAllEventListeners() {
 this._eventListeners.forEach(({ element, type, handler, options }) => {
 element.removeEventListener(type, handler, options);
 });
 this._eventListeners.clear();

 setupComponent() {
 
 if (this._Primitive) {
 this._Primitive.setAriaAttributes(this, { open);
 const cleanup = this._Primitive.trapFocus(this);
 this._cleanupFunctions.push(cleanup);
 
 const escapeCleanup = this._Primitive.handleEscape(this, () => this.close());
 this._cleanupFunctions.push(escapeCleanup);

 this.updateClasses();
 this.updateAttributes();

 setupComponentFallback() {
 // Fallback implementation without primitives
 this.setAttribute('role', 'dialog');
 this.updateClasses();
 this.updateAttributes();

 updateClasses() {
 const variantClasses = this.getVariantClasses();
 const stateClasses = this.getStateClasses();
 this.className = [...variantClasses, ...stateClasses].filter(Boolean).join(' ');

 getVariantClasses() {
 const variantClassMap = {
 'default': ['na-card', 'na-modal'],
 'center': ['na-card', 'na-modal', 'na-modal--center']
 };
 return variantClassMap[this._variant] || variantClassMap['default'];

 getStateClasses() {
 const stateClasses = [];
 if (this._disabled) {
 stateClasses.push(...[]);

 if (this._loading) {
 stateClasses.push(...[]);

 return stateClasses;

 updateAttributes() {
 if (this._disabled || this._loading) {
 this.setAttribute('aria-disabled', 'true');
 } else {
 this.removeAttribute('aria-disabled');

 if (this._open) {
 this.removeAttribute('aria-hidden');
 } else {
 this.setAttribute('aria-hidden', 'true');

 updateComponent() {
 
 if (this._Primitive) {
 this._Primitive.setAriaAttributes(this, { open);

 this.updateAttributes();

 open() {
 this._open = true;
 this.setAttribute('open', '');
 this.dispatchNaEvent('na-open', { open, timestamp) });
 if (this._Primitive) {
 this._previousFocus = document.activeElement;
 this._Primitive.trapFocus(this);

 close() {
 this._open = false;
 this.removeAttribute('open');
 this.dispatchNaEvent('na-close', { reason);
 if (this._Primitive && this._previousFocus) {
 this._Primitive.restoreFocus(this._previousFocus);

 cleanup() {
 // Cancel any pending updates
 if (this._updateScheduled !== null) {
 clearTimeout(this._updateScheduled);
 this._updateScheduled = null;

 this._pendingUpdates.clear();
 
 // Remove all event listeners
 this.removeAllEventListeners();
 
 // Run cleanup functions from primitives
 this._cleanupFunctions.forEach(fn => fn());
 this._cleanupFunctions = [];
 
 // Clear all references to prevent memory leaks
 this._Primitive = null;
 this._previousFocus = null;

 dispatchNaEvent(eventName, detail?) {
 const event = new CustomEvent(eventName, {
 bubbles, cancelable, detail
 });
 return this.dispatchEvent(event);

customElements.define('na-dialog', Dialog);

