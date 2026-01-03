/**
 * Radix UI Primitives - Vanilla JavaScript Port
 * 
 * This file contains browser-side accessibility logic ported from Radix UI.
 * It runs in the user's browser (compiled to dist/web/lib/primitives.js).
 * 
 * These primitives provide the same accessibility features as Radix UI:
 * - Focus trap
 * - ARIA attribute management
 * - Keyboard event handling
 * - Focus restoration
 * - Escape key handling
 */

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors))
        .filter((el) => {
            // Filter out hidden elements
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        });
}

/**
 * Dialog Primitive - Radix UI Dialog accessibility logic
 */
export const DialogPrimitive = {
    /**
     * Trap focus within an element (Radix UI focus trap logic)
     * Returns a cleanup function
     */
    trapFocus(element: HTMLElement): () => void {
        const focusableElements = getFocusableElements(element);

        if (focusableElements.length === 0) {
            // No focusable elements, focus the container itself
            element.setAttribute('tabindex', '-1');
            element.focus();
            return () => {
                element.removeAttribute('tabindex');
            };
        }

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (!firstFocusable || !lastFocusable) {
            return () => {
                // No cleanup needed
            };
        }

        // Focus the first focusable element
        firstFocusable.focus();

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                // Shift + Tab: focus previous element
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab: focus next element
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        };

        element.addEventListener('keydown', handleTabKey);

        // Return cleanup function
        return () => {
            element.removeEventListener('keydown', handleTabKey);
        };
    },

    /**
     * Set ARIA attributes for dialog element
     */
    setAriaAttributes(element: HTMLElement, props: { open: boolean; modal?: boolean }): void {
        element.setAttribute('role', 'dialog');
        element.setAttribute('aria-modal', String(props.modal !== false));

        if (props.open) {
            element.removeAttribute('aria-hidden');
        } else {
            element.setAttribute('aria-hidden', 'true');
        }
    },

    /**
     * Handle Escape key to close dialog
     * Returns a cleanup function
     */
    handleEscape(element: HTMLElement, onClose: () => void): () => void {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && e.target === element) {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }
        };

        element.addEventListener('keydown', handleEscapeKey);

        // Return cleanup function
        return () => {
            element.removeEventListener('keydown', handleEscapeKey);
        };
    },

    /**
     * Restore focus to the previously focused element
     */
    restoreFocus(previousFocus: HTMLElement | null): void {
        if (previousFocus && typeof previousFocus.focus === 'function') {
            // Use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
                previousFocus.focus();
            });
        }
    },

    /**
     * Prevent body scroll when dialog is open
     * Returns a cleanup function
     */
    preventBodyScroll(): () => void {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }
};

/**
 * Focus Primitive - General focus management utilities
 */
export const FocusPrimitive = {
    /**
     * Get the currently focused element
     */
    getActiveElement(): HTMLElement | null {
        return document.activeElement as HTMLElement | null;
    },

    /**
     * Check if an element is focusable
     */
    isFocusable(element: HTMLElement): boolean {
        const focusableElements = getFocusableElements(document.body);
        return focusableElements.includes(element);
    },

    /**
     * Focus the first focusable element in a container
     */
    focusFirst(container: HTMLElement): boolean {
        const focusableElements = getFocusableElements(container);
        const first = focusableElements[0];
        if (first) {
            first.focus();
            return true;
        }
        return false;
    },

    /**
     * Focus the last focusable element in a container
     */
    focusLast(container: HTMLElement): boolean {
        const focusableElements = getFocusableElements(container);
        const last = focusableElements[focusableElements.length - 1];
        if (last) {
            last.focus();
            return true;
        }
        return false;
    }
};

/**
 * ARIA Primitive - ARIA attribute management
 */
export const AriaPrimitive = {
    /**
     * Set ARIA label
     */
    setLabel(element: HTMLElement, label: string): void {
        element.setAttribute('aria-label', label);
    },

    /**
     * Set ARIA described by
     */
    setDescribedBy(element: HTMLElement, id: string): void {
        element.setAttribute('aria-describedby', id);
    },

    /**
     * Set ARIA expanded state
     */
    setExpanded(element: HTMLElement, expanded: boolean): void {
        element.setAttribute('aria-expanded', String(expanded));
    },

    /**
     * Set ARIA hidden state
     */
    setHidden(element: HTMLElement, hidden: boolean): void {
        if (hidden) {
            element.setAttribute('aria-hidden', 'true');
        } else {
            element.removeAttribute('aria-hidden');
        }
    },

    /**
     * Set ARIA disabled state
     */
    setDisabled(element: HTMLElement, disabled: boolean): void {
        if (disabled) {
            element.setAttribute('aria-disabled', 'true');
        } else {
            element.removeAttribute('aria-disabled');
        }
    }
};

