/**
 * FormModalShell - Short Form Modal
 * 
 * Purpose: Quick forms, inputs, short data entry
 * 
 * Structure:
 * - Overlay: Dark backdrop
 * - Modal: Centered card with max-width
 * - Header: Title and optional close button
 * - Body: Form content
 * - Footer: Action buttons (Cancel/Submit)
 * 
 * Features:
 * - Focus management
 * - Keyboard shortcuts (Esc to close)
 * - Form validation display
 * - Auto-focus on first input
 * - Prevents body scroll
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';

export interface FormModalShellProps extends Omit<RootShellProps, 'children'> {
    /** Whether modal is open */
    open: boolean;
    /** Callback when modal should close */
    onClose: () => void;
    /** Modal title */
    title: string;
    /** Form content */
    children: React.ReactNode;
    /** Submit button text (default: "Submit") */
    submitText?: string;
    /** Cancel button text (default: "Cancel") */
    cancelText?: string;
    /** Show cancel button */
    showCancel?: boolean;
    /** Submit handler */
    onSubmit?: () => void;
    /** Show loading state */
    loading?: boolean;
    /** Disable submit button */
    disabled?: boolean;
    /** Validation errors */
    errors?: Record<string, string>;
    /** Modal width (default: "max-w-md") */
    maxWidth?: string;
    /** Show close button in header */
    showCloseButton?: boolean;
}

/**
 * FormModalShell - Short form modal
 * 
 * Perfect for:
 * - Quick inputs
 * - Short forms
 * - Data entry
 * - Settings dialogs
 * 
 * @example
 * ```tsx
 * <FormModalShell
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onSubmit={handleSubmit}
 *   title="Create Item"
 *   submitText="Create"
 * >
 *   <form>
 *     <input type="text" placeholder="Name" />
 *   </form>
 * </FormModalShell>
 * ```
 */
export const FormModalShell = React.memo(function FormModalShell({
    open,
    onClose,
    title,
    children,
    submitText = 'Submit',
    cancelText = 'Cancel',
    showCancel = true,
    onSubmit,
    loading = false,
    disabled = false,
    errors = {},
    maxWidth = 'max-w-md',
    showCloseButton = true,
    ...rootShellProps
}: FormModalShellProps) {
    const modalRef = React.useRef<HTMLDivElement>(null);

    // Auto-focus first input
    React.useEffect(() => {
        if (!open) return;

        const timer = setTimeout(() => {
            if (modalRef.current) {
                const firstInput = modalRef.current.querySelector(
                    'input, textarea, select, [tabindex="0"]'
                ) as HTMLElement;
                if (firstInput) {
                    if (firstInput instanceof HTMLInputElement ||
                        firstInput instanceof HTMLTextAreaElement ||
                        firstInput instanceof HTMLSelectElement) {
                        firstInput.focus();
                    }
                }
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [open, children]);

    // Keyboard shortcuts
    React.useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                // Cmd/Ctrl+Enter to submit
                e.preventDefault();
                if (!disabled && !loading && onSubmit) {
                    onSubmit();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose, onSubmit, disabled, loading]);

    // Prevent body scroll when open
    React.useEffect(() => {
        if (!open) return;

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // Memoize handlers
    const handleSubmit = React.useCallback((e?: React.FormEvent) => {
        e?.preventDefault();
        if (!disabled && !loading && onSubmit) {
            onSubmit();
        }
    }, [onSubmit, disabled, loading]);

    const handleCancel = React.useCallback(() => {
        onClose();
    }, [onClose]);

    const handleOverlayClick = React.useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    if (!open) return null;

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <RootShell {...rootShellProps}>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-void/80 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
                onClick={handleOverlayClick}
                role="dialog"
                aria-modal="true"
                aria-labelledby="form-modal-title"
            >
                {/* Modal Card */}
                <div
                    ref={modalRef}
                    className={`na-card p-6 ${maxWidth} w-full max-h-[90vh] overflow-y-auto`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 id="form-modal-title" className="na-h2">
                            {title}
                        </h2>
                        {showCloseButton && (
                            <button
                                onClick={handleCancel}
                                className="na-btn p-2"
                                aria-label="Close"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Validation Errors */}
                    {hasErrors && (
                        <div className="na-card p-4 mb-6 bg-error/10 border border-error">
                            <div className="na-metadata mb-2 text-error">Please fix the following errors:</div>
                            <ul className="space-y-1">
                                {Object.entries(errors).map(([field, error]) => (
                                    <li key={field} className="na-metadata-small text-error">
                                        {field}: {error}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Form Content */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {children}
                    </form>

                    {/* Footer */}
                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-stroke">
                        {showCancel && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={loading}
                                className="na-btn flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {cancelText}
                            </button>
                        )}
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={disabled || loading}
                            className="na-btn na-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                submitText
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </RootShell>
    );
}, (prevProps, nextProps) => {
    // Custom comparison
    return (
        prevProps.open === nextProps.open &&
        prevProps.title === nextProps.title &&
        prevProps.submitText === nextProps.submitText &&
        prevProps.cancelText === nextProps.cancelText &&
        prevProps.showCancel === nextProps.showCancel &&
        prevProps.loading === nextProps.loading &&
        prevProps.disabled === nextProps.disabled &&
        prevProps.maxWidth === nextProps.maxWidth &&
        prevProps.showCloseButton === nextProps.showCloseButton &&
        prevProps.errors === nextProps.errors
    );
});

