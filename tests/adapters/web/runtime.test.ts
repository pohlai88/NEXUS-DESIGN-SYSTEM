/**
 * Runtime Library Unit Tests
 * 
 * Tests for adapters/web/runtime primitives and utilities.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  DialogPrimitive, 
  FocusPrimitive, 
  AriaPrimitive 
} from '../../../adapters/web/runtime/primitives.js';
import {
  cn,
  getAttribute,
  setAttributeConditional,
  kebabToCamel,
  camelToKebab,
  dispatchNaEvent,
  parseBooleanAttribute,
  debounce
} from '../../../adapters/web/runtime/utils.js';

describe('DialogPrimitive', () => {
  let container: HTMLElement;
  let button1: HTMLButtonElement;
  let button2: HTMLButtonElement;

  beforeEach(() => {
    container = document.createElement('div');
    button1 = document.createElement('button');
    button2 = document.createElement('button');
    button1.textContent = 'Button 1';
    button2.textContent = 'Button 2';
    container.appendChild(button1);
    container.appendChild(button2);
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('trapFocus', () => {
    it('should trap focus within container', () => {
      const cleanup = DialogPrimitive.trapFocus(container);
      
      // Focus should be on first focusable element
      expect(document.activeElement).toBe(button1);
      
      cleanup();
    });

    it('should cycle focus with Tab key when at last element', () => {
      const cleanup = DialogPrimitive.trapFocus(container);
      // Start at last focusable element
      button2.focus();
      
      // Wait for focus to be set
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          // Simulate Tab key when at last element - should cycle to first
          const tabEvent = new KeyboardEvent('keydown', { 
            key: 'Tab', 
            bubbles: true,
            cancelable: true
          });
          
          container.dispatchEvent(tabEvent);
          
          // Focus should cycle back to button1 (first element)
          expect(document.activeElement).toBe(button1);
          cleanup();
          resolve();
        });
      });
    });

    it('should cycle focus backwards with Shift+Tab when at first element', () => {
      const cleanup = DialogPrimitive.trapFocus(container);
      // Start at first focusable element
      button1.focus();
      
      // Wait for focus to be set
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          // Simulate Shift+Tab when at first element - should cycle to last
          const shiftTabEvent = new KeyboardEvent('keydown', { 
            key: 'Tab', 
            shiftKey: true,
            bubbles: true,
            cancelable: true
          });
          
          container.dispatchEvent(shiftTabEvent);
          
          // Focus should cycle to button2 (last element)
          expect(document.activeElement).toBe(button2);
          cleanup();
          resolve();
        });
      });
    });

    it('should return cleanup function', () => {
      const cleanup = DialogPrimitive.trapFocus(container);
      expect(typeof cleanup).toBe('function');
      
      // Cleanup should not throw
      expect(() => cleanup()).not.toThrow();
    });
  });

  describe('setAriaAttributes', () => {
    it('should set ARIA attributes for open dialog', () => {
      DialogPrimitive.setAriaAttributes(container, { open: true });
      
      expect(container.getAttribute('role')).toBe('dialog');
      expect(container.getAttribute('aria-modal')).toBe('true');
      expect(container.getAttribute('aria-hidden')).toBeNull();
    });

    it('should set ARIA attributes for closed dialog', () => {
      DialogPrimitive.setAriaAttributes(container, { open: false });
      
      expect(container.getAttribute('role')).toBe('dialog');
      expect(container.getAttribute('aria-modal')).toBe('true');
      expect(container.getAttribute('aria-hidden')).toBe('true');
    });

    it('should respect modal prop', () => {
      DialogPrimitive.setAriaAttributes(container, { open: true, modal: false });
      expect(container.getAttribute('aria-modal')).toBe('false');
    });
  });

  describe('handleEscape', () => {
    it('should call onClose when Escape is pressed', () => {
      const onClose = vi.fn();
      const cleanup = DialogPrimitive.handleEscape(container, onClose);
      
      const escapeEvent = new KeyboardEvent('keydown', { 
        key: 'Escape',
        bubbles: true 
      });
      container.dispatchEvent(escapeEvent);
      
      expect(onClose).toHaveBeenCalledTimes(1);
      
      cleanup();
    });

    it('should return cleanup function', () => {
      const onClose = vi.fn();
      const cleanup = DialogPrimitive.handleEscape(container, onClose);
      expect(typeof cleanup).toBe('function');
      
      cleanup();
    });
  });

  describe('restoreFocus', () => {
    it('should restore focus to previous element', () => {
      button1.focus();
      const previousFocus = document.activeElement as HTMLElement;
      
      button2.focus();
      DialogPrimitive.restoreFocus(previousFocus);
      
      // Use requestAnimationFrame to wait for async focus
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          expect(document.activeElement).toBe(button1);
          resolve();
        });
      });
    });

    it('should handle null previous focus', () => {
      expect(() => DialogPrimitive.restoreFocus(null)).not.toThrow();
    });
  });

  describe('preventBodyScroll', () => {
    it('should prevent body scroll', () => {
      const cleanup = DialogPrimitive.preventBodyScroll();
      
      expect(document.body.style.overflow).toBe('hidden');
      
      cleanup();
      
      expect(document.body.style.overflow).toBe('');
    });

    it('should restore original overflow', () => {
      document.body.style.overflow = 'scroll';
      const cleanup = DialogPrimitive.preventBodyScroll();
      
      expect(document.body.style.overflow).toBe('hidden');
      
      cleanup();
      
      expect(document.body.style.overflow).toBe('scroll');
    });
  });
});

describe('FocusPrimitive', () => {
  let container: HTMLElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    container = document.createElement('div');
    button = document.createElement('button');
    button.textContent = 'Button';
    container.appendChild(button);
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('getActiveElement', () => {
    it('should return currently focused element', () => {
      button.focus();
      expect(FocusPrimitive.getActiveElement()).toBe(button);
    });
  });

  describe('isFocusable', () => {
    it('should return true for focusable element', () => {
      expect(FocusPrimitive.isFocusable(button)).toBe(true);
    });

    it('should return false for non-focusable element', () => {
      const div = document.createElement('div');
      expect(FocusPrimitive.isFocusable(div)).toBe(false);
    });
  });

  describe('focusFirst', () => {
    it('should focus first focusable element', () => {
      const result = FocusPrimitive.focusFirst(container);
      
      expect(result).toBe(true);
      expect(document.activeElement).toBe(button);
    });

    it('should return false if no focusable elements', () => {
      const emptyContainer = document.createElement('div');
      expect(FocusPrimitive.focusFirst(emptyContainer)).toBe(false);
    });
  });

  describe('focusLast', () => {
    it('should focus last focusable element', () => {
      const button2 = document.createElement('button');
      container.appendChild(button2);
      
      const result = FocusPrimitive.focusLast(container);
      
      expect(result).toBe(true);
      expect(document.activeElement).toBe(button2);
    });
  });
});

describe('AriaPrimitive', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe('setLabel', () => {
    it('should set aria-label', () => {
      AriaPrimitive.setLabel(element, 'Test Label');
      expect(element.getAttribute('aria-label')).toBe('Test Label');
    });
  });

  describe('setDescribedBy', () => {
    it('should set aria-describedby', () => {
      AriaPrimitive.setDescribedBy(element, 'description-id');
      expect(element.getAttribute('aria-describedby')).toBe('description-id');
    });
  });

  describe('setExpanded', () => {
    it('should set aria-expanded to true', () => {
      AriaPrimitive.setExpanded(element, true);
      expect(element.getAttribute('aria-expanded')).toBe('true');
    });

    it('should set aria-expanded to false', () => {
      AriaPrimitive.setExpanded(element, false);
      expect(element.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('setHidden', () => {
    it('should set aria-hidden to true', () => {
      AriaPrimitive.setHidden(element, true);
      expect(element.getAttribute('aria-hidden')).toBe('true');
    });

    it('should remove aria-hidden when false', () => {
      element.setAttribute('aria-hidden', 'true');
      AriaPrimitive.setHidden(element, false);
      expect(element.getAttribute('aria-hidden')).toBeNull();
    });
  });

  describe('setDisabled', () => {
    it('should set aria-disabled to true', () => {
      AriaPrimitive.setDisabled(element, true);
      expect(element.getAttribute('aria-disabled')).toBe('true');
    });

    it('should remove aria-disabled when false', () => {
      element.setAttribute('aria-disabled', 'true');
      AriaPrimitive.setDisabled(element, false);
      expect(element.getAttribute('aria-disabled')).toBeNull();
    });
  });
});

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should filter out falsy values', () => {
      expect(cn('class1', null, undefined, false, 'class2')).toBe('class1 class2');
    });

    it('should handle empty input', () => {
      expect(cn()).toBe('');
    });
  });

  describe('getAttribute', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('div');
    });

    it('should get attribute value', () => {
      element.setAttribute('test', 'value');
      expect(getAttribute(element, 'test')).toBe('value');
    });

    it('should return default value when attribute missing', () => {
      expect(getAttribute(element, 'missing', 'default')).toBe('default');
    });
  });

  describe('setAttributeConditional', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('div');
    });

    it('should set attribute for truthy string', () => {
      setAttributeConditional(element, 'test', 'value');
      expect(element.getAttribute('test')).toBe('value');
    });

    it('should set empty attribute for true', () => {
      setAttributeConditional(element, 'test', true);
      expect(element.getAttribute('test')).toBe('');
    });

    it('should remove attribute for false', () => {
      element.setAttribute('test', 'value');
      setAttributeConditional(element, 'test', false);
      expect(element.getAttribute('test')).toBeNull();
    });

    it('should remove attribute for null', () => {
      element.setAttribute('test', 'value');
      setAttributeConditional(element, 'test', null);
      expect(element.getAttribute('test')).toBeNull();
    });
  });

  describe('kebabToCamel', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(kebabToCamel('test-case')).toBe('testCase');
      expect(kebabToCamel('my-component-name')).toBe('myComponentName');
    });
  });

  describe('camelToKebab', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(camelToKebab('testCase')).toBe('test-case');
      expect(camelToKebab('myComponentName')).toBe('my-component-name');
    });
  });

  describe('dispatchNaEvent', () => {
    let element: HTMLElement;
    let listener: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      element = document.createElement('div');
      listener = vi.fn();
      element.addEventListener('na-test-event', listener);
      document.body.appendChild(element);
    });

    afterEach(() => {
      document.body.removeChild(element);
    });

    it('should dispatch event with na- prefix', () => {
      dispatchNaEvent(element, 'testEvent', { data: 'test' });
      
      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.type).toBe('na-test-event');
      expect(event.detail).toEqual({ data: 'test' });
    });

    it('should not double prefix', () => {
      dispatchNaEvent(element, 'na-test-event', {});
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('parseBooleanAttribute', () => {
    it('should return true for non-null value', () => {
      expect(parseBooleanAttribute('')).toBe(true);
      expect(parseBooleanAttribute('true')).toBe(true);
      expect(parseBooleanAttribute('anything')).toBe(true);
    });

    it('should return false for null or false string', () => {
      expect(parseBooleanAttribute(null)).toBe(false);
      expect(parseBooleanAttribute('false')).toBe(false);
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      const func = vi.fn();
      const debounced = debounce(func, 100);

      debounced();
      debounced();
      debounced();

      expect(func).not.toHaveBeenCalled();

      await new Promise(resolve => setTimeout(resolve, 150));

      expect(func).toHaveBeenCalledTimes(1);
    });
  });
});

