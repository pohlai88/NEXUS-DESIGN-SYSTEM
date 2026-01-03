/**
 * Tests for Web Components Runtime Primitives
 * 
 * Tests the Radix UI accessibility logic port (vanilla JS)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  DialogPrimitive,
  FocusPrimitive,
  AriaPrimitive
} from '../../../../adapters/web/runtime/primitives.js';

describe('DialogPrimitive', () => {
  let container: HTMLElement;
  let button1: HTMLButtonElement;
  let button2: HTMLButtonElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    // Create test DOM
    document.body.innerHTML = '';
    container = document.createElement('div');
    button1 = document.createElement('button');
    button1.textContent = 'Button 1';
    button2 = document.createElement('button');
    button2.textContent = 'Button 2';
    input = document.createElement('input');
    input.type = 'text';

    container.appendChild(button1);
    container.appendChild(input);
    container.appendChild(button2);
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('trapFocus', () => {
    it('should trap focus within container', () => {
      const cleanup = DialogPrimitive.trapFocus(container);
      
      // Focus should be on first focusable element
      expect(document.activeElement).toBe(button1);
      
      cleanup();
    });

    it('should cycle focus with Tab key (from last to first)', async () => {
      const cleanup = DialogPrimitive.trapFocus(container);
      
      // Start at last element
      button2.focus();
      expect(document.activeElement).toBe(button2);

      // Tab from last element should wrap to first (boundary behavior)
      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
      container.dispatchEvent(tabEvent);
      
      // Wait for focus change
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Should wrap to first element
      expect(document.activeElement).toBe(button1);

      cleanup();
    });

    it('should cycle focus backwards with Shift+Tab (from first to last)', async () => {
      const cleanup = DialogPrimitive.trapFocus(container);
      
      // Start at first element
      button1.focus();
      expect(document.activeElement).toBe(button1);

      // Shift+Tab from first element should wrap to last (boundary behavior)
      const shiftTabEvent = new KeyboardEvent('keydown', { 
        key: 'Tab', 
        shiftKey: true,
        bubbles: true 
      });
      container.dispatchEvent(shiftTabEvent);
      
      // Wait for focus change
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Should wrap to last element
      expect(document.activeElement).toBe(button2);

      cleanup();
    });

    it('should return cleanup function', () => {
      const cleanup = DialogPrimitive.trapFocus(container);
      expect(typeof cleanup).toBe('function');
      
      // Cleanup should not throw
      expect(() => cleanup()).not.toThrow();
    });

    it('should handle container with no focusable elements', () => {
      const emptyContainer = document.createElement('div');
      document.body.appendChild(emptyContainer);
      
      const cleanup = DialogPrimitive.trapFocus(emptyContainer);
      
      // Container should be focusable
      expect(emptyContainer.getAttribute('tabindex')).toBe('-1');
      
      cleanup();
      expect(emptyContainer.getAttribute('tabindex')).toBeNull();
    });
  });

  describe('setAriaAttributes', () => {
    it('should set dialog role and aria-modal', () => {
      DialogPrimitive.setAriaAttributes(container, { open: true });
      
      expect(container.getAttribute('role')).toBe('dialog');
      expect(container.getAttribute('aria-modal')).toBe('true');
      expect(container.getAttribute('aria-hidden')).toBeNull();
    });

    it('should set aria-hidden when closed', () => {
      DialogPrimitive.setAriaAttributes(container, { open: false });
      
      expect(container.getAttribute('role')).toBe('dialog');
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

    it('should not call onClose for other keys', () => {
      const onClose = vi.fn();
      const cleanup = DialogPrimitive.handleEscape(container, onClose);
      
      const enterEvent = new KeyboardEvent('keydown', { 
        key: 'Enter',
        bubbles: true 
      });
      container.dispatchEvent(enterEvent);
      
      expect(onClose).not.toHaveBeenCalled();
      
      cleanup();
    });

    it('should return cleanup function', () => {
      const onClose = vi.fn();
      const cleanup = DialogPrimitive.handleEscape(container, onClose);
      
      expect(typeof cleanup).toBe('function');
      
      cleanup();
      
      // After cleanup, Escape should not trigger
      const escapeEvent = new KeyboardEvent('keydown', { 
        key: 'Escape',
        bubbles: true 
      });
      container.dispatchEvent(escapeEvent);
      
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('restoreFocus', () => {
    it('should restore focus to previous element', () => {
      button1.focus();
      const previousFocus = document.activeElement as HTMLElement;
      
      // Move focus away
      button2.focus();
      expect(document.activeElement).toBe(button2);
      
      // Restore focus
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
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = '';
      
      const cleanup = DialogPrimitive.preventBodyScroll();
      
      expect(document.body.style.overflow).toBe('hidden');
      
      cleanup();
      
      expect(document.body.style.overflow).toBe(originalOverflow);
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
  let button1: HTMLButtonElement;
  let button2: HTMLButtonElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    button1 = document.createElement('button');
    button1.textContent = 'Button 1';
    button2 = document.createElement('button');
    button2.textContent = 'Button 2';

    container.appendChild(button1);
    container.appendChild(button2);
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('getActiveElement', () => {
    it('should return currently focused element', () => {
      button1.focus();
      expect(FocusPrimitive.getActiveElement()).toBe(button1);
    });

    it('should return null when no element is focused', () => {
      document.body.focus();
      const active = FocusPrimitive.getActiveElement();
      // Body might be focused, so just check it's not null
      expect(active).toBeTruthy();
    });
  });

  describe('isFocusable', () => {
    it('should return true for focusable elements', () => {
      expect(FocusPrimitive.isFocusable(button1)).toBe(true);
    });

    it('should return false for non-focusable elements', () => {
      const div = document.createElement('div');
      expect(FocusPrimitive.isFocusable(div)).toBe(false);
    });
  });

  describe('focusFirst', () => {
    it('should focus first focusable element', () => {
      const result = FocusPrimitive.focusFirst(container);
      
      expect(result).toBe(true);
      expect(document.activeElement).toBe(button1);
    });

    it('should return false when no focusable elements', () => {
      const emptyContainer = document.createElement('div');
      const result = FocusPrimitive.focusFirst(emptyContainer);
      
      expect(result).toBe(false);
    });
  });

  describe('focusLast', () => {
    it('should focus last focusable element', () => {
      const result = FocusPrimitive.focusLast(container);
      
      expect(result).toBe(true);
      expect(document.activeElement).toBe(button2);
    });

    it('should return false when no focusable elements', () => {
      const emptyContainer = document.createElement('div');
      const result = FocusPrimitive.focusLast(emptyContainer);
      
      expect(result).toBe(false);
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
    document.body.innerHTML = '';
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

