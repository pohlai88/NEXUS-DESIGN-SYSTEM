/**
 * ConfirmShell - Destructive Action Confirmation Modal
 * 
 * Purpose: Confirm irreversible actions (delete, remove, etc.)
 * 
 * Structure:
 * - Overlay: Dark backdrop
 * - Modal: Centered card
 * - Icon: Warning/danger icon
 * - Title: Action description
 * - Message: Detailed explanation
 * - Actions: Cancel (secondary) + Confirm (danger)
 * 
 * Features:
 * - Keyboard shortcuts (Esc to cancel, Enter to confirm)
 * - Focus trap
 * - Auto-focus on Cancel button
 * - Prevents accidental clicks
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';

export interface ConfirmShellProps extends Omit<RootShellProps, 'children'> {
  /** Whether modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when user confirms */
  onConfirm: () => void;
  /** Modal title */
  title: string;
  /** Modal message/description */
  message: string;
  /** Confirm button text (default: "Confirm") */
  confirmText?: string;
  /** Cancel button text (default: "Cancel") */
  cancelText?: string;
  /** Confirm button variant (default: "danger") */
  confirmVariant?: 'danger' | 'primary';
  /** Whether action is destructive (affects styling) */
  destructive?: boolean;
  /** Show loading state on confirm */
  loading?: boolean;
  /** Disable confirm button */
  disabled?: boolean;
}

/**
 * ConfirmShell - Destructive action confirmation modal
 * 
 * Perfect for:
 * - Delete confirmations
 * - Remove confirmations
 * - Irreversible actions
 * - Destructive operations
 * 
 * @example
 * ```tsx
 * <ConfirmShell
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={handleDelete}
 *   title="Delete Item"
 *   message="Are you sure you want to delete this item? This action cannot be undone."
 *   confirmText="Delete"
 *   destructive
 * />
 * ```
 */
export const ConfirmShell = React.memo(function ConfirmShell({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  destructive = true,
  loading = false,
  disabled = false,
  ...rootShellProps
}: ConfirmShellProps) {
  const confirmButtonRef = React.useRef<HTMLButtonElement>(null);
  const cancelButtonRef = React.useRef<HTMLButtonElement>(null);

  // Focus management
  React.useEffect(() => {
    if (open) {
      // Auto-focus on Cancel button for safety
      const timer = setTimeout(() => {
        cancelButtonRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Keyboard shortcuts
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        // Cmd/Ctrl+Enter to confirm
        e.preventDefault();
        if (!disabled && !loading) {
          onConfirm();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, onConfirm, disabled, loading]);

  // Prevent body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  // Memoize handlers
  const handleConfirm = React.useCallback(() => {
    if (!disabled && !loading) {
      onConfirm();
    }
  }, [onConfirm, disabled, loading]);

  const handleCancel = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const handleOverlayClick = React.useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!open) return null;

  return (
    <RootShell {...rootShellProps}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-void/80 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        {/* Modal Card */}
        <div
          className="na-card p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className="flex items-center justify-center mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              destructive
                ? 'bg-error/20 text-error'
                : 'bg-warning/20 text-warning'
            }`}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 id="confirm-title" className="na-h2 text-center mb-3">
            {title}
          </h2>

          {/* Message */}
          <p id="confirm-message" className="na-metadata text-center mb-6 text-lux-dim">
            {message}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              ref={cancelButtonRef}
              onClick={handleCancel}
              disabled={loading}
              className="na-btn flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>
            <button
              ref={confirmButtonRef}
              onClick={handleConfirm}
              disabled={disabled || loading}
              className={`na-btn flex-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                confirmVariant === 'danger'
                  ? 'bg-error text-error-foreground hover:bg-error/90'
                  : 'na-btn-primary'
              }`}
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
                confirmText
              )}
            </button>
          </div>

          {/* Keyboard hint */}
          <div className="mt-4 text-center">
            <span className="na-metadata-small text-clay">
              Press <kbd className="px-1.5 py-0.5 bg-paper-2 rounded text-xs">Esc</kbd> to cancel
            </span>
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
    prevProps.message === nextProps.message &&
    prevProps.confirmText === nextProps.confirmText &&
    prevProps.cancelText === nextProps.cancelText &&
    prevProps.confirmVariant === nextProps.confirmVariant &&
    prevProps.destructive === nextProps.destructive &&
    prevProps.loading === nextProps.loading &&
    prevProps.disabled === nextProps.disabled
  );
});

