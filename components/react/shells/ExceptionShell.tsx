/**
 * ExceptionShell - Error Page Shell
 * 
 * Purpose: Professional error handling for 403/404/500 and other exceptions
 * 
 * Structure:
 * - Error Code: Large display (403, 404, 500)
 * - Title: User-friendly error message
 * - Description: Detailed explanation
 * - Recovery Actions: Buttons to recover
 * - Debug Info: Technical details (dev mode only)
 * 
 * Features:
 * - Multiple error code support
 * - Recovery actions
 * - Debug information
 * - Custom illustrations
 * - Navigation options
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';

export type ErrorCode = 400 | 401 | 403 | 404 | 500 | 502 | 503 | 'unknown';

export interface RecoveryAction {
  id: string;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export interface ExceptionShellProps extends Omit<RootShellProps, 'children'> {
  /** Error code */
  code: ErrorCode;
  /** Error title */
  title?: string;
  /** Error description */
  description?: string;
  /** Recovery actions */
  actions?: RecoveryAction[];
  /** Show debug information (dev mode) */
  showDebug?: boolean;
  /** Debug information */
  debugInfo?: {
    message?: string;
    stack?: string;
    timestamp?: string;
    requestId?: string;
    [key: string]: unknown;
  };
  /** Custom illustration/icon */
  illustration?: React.ReactNode;
  /** Show back button */
  showBackButton?: boolean;
  /** Back button handler */
  onBack?: () => void;
  /** Show home button */
  showHomeButton?: boolean;
  /** Home button handler */
  onHome?: () => void;
  /** Main content ID for skip link */
  mainContentId?: string;
}

/**
 * ExceptionShell - Professional error page shell
 * 
 * Perfect for:
 * - 403 Forbidden pages
 * - 404 Not Found pages
 * - 500 Server Error pages
 * - Permission blocks
 * - Network errors
 * - Custom error states
 * 
 * @example
 * ```tsx
 * <ExceptionShell
 *   code={404}
 *   title="Page Not Found"
 *   description="The page you're looking for doesn't exist."
 *   actions={[
 *     { id: 'home', label: 'Go Home', onClick: () => navigate('/') },
 *   ]}
 * />
 * ```
 */
export const ExceptionShell = React.memo(function ExceptionShell({
  code,
  title,
  description,
  actions = [],
  showDebug = process.env.NODE_ENV === 'development',
  debugInfo = {},
  illustration,
  showBackButton = true,
  onBack,
  showHomeButton = true,
  onHome,
  mainContentId = 'main-content',
  ...rootShellProps
}: ExceptionShellProps) {
  // Memoize error details
  const errorDetails = React.useMemo(() => {
    const defaults: Record<ErrorCode, { title: string; description: string; icon: string }> = {
      400: {
        title: 'Bad Request',
        description: 'The request was invalid. Please check your input and try again.',
        icon: '⚠️',
      },
      401: {
        title: 'Unauthorized',
        description: 'You need to be logged in to access this resource.',
        icon: '🔒',
      },
      403: {
        title: 'Forbidden',
        description: "You don't have permission to access this resource.",
        icon: '🚫',
      },
      404: {
        title: 'Page Not Found',
        description: "The page you're looking for doesn't exist or has been moved.",
        icon: '🔍',
      },
      500: {
        title: 'Server Error',
        description: 'Something went wrong on our end. We\'re working to fix it.',
        icon: '⚙️',
      },
      502: {
        title: 'Bad Gateway',
        description: 'The server received an invalid response. Please try again later.',
        icon: '🌐',
      },
      503: {
        title: 'Service Unavailable',
        description: 'The service is temporarily unavailable. Please try again later.',
        icon: '⏳',
      },
      unknown: {
        title: 'Something Went Wrong',
        description: 'An unexpected error occurred. Please try again.',
        icon: '❓',
      },
    };

    return defaults[code] || defaults.unknown;
  }, [code]);

  // Memoize handlers
  const handleBack = React.useCallback(() => {
    if (onBack) {
      onBack();
    } else if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, [onBack]);

  const handleHome = React.useCallback(() => {
    if (onHome) {
      onHome();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, [onHome]);

  // Default actions
  const defaultActions = React.useMemo(() => {
    const defaults: RecoveryAction[] = [];
    
    if (showBackButton) {
      defaults.push({
        id: 'back',
        label: 'Go Back',
        onClick: handleBack,
        variant: 'secondary',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        ),
      });
    }

    if (showHomeButton) {
      defaults.push({
        id: 'home',
        label: 'Go Home',
        onClick: handleHome,
        variant: 'primary',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
      });
    }

    return defaults;
  }, [showBackButton, showHomeButton, handleBack, handleHome]);

  const allActions = React.useMemo(
    () => [...defaultActions, ...actions],
    [defaultActions, actions]
  );

  const finalTitle = title || errorDetails.title;
  const finalDescription = description || errorDetails.description;

  return (
    <RootShell {...rootShellProps}>
      <div className="flex flex-col min-h-screen bg-void">
        <main
          id={mainContentId}
          className="flex-1 flex items-center justify-center p-6"
          role="main"
        >
          <div className="max-w-2xl w-full text-center">
            {/* Error Code */}
            <div className="mb-6">
              <div className="na-data-large text-8xl font-bold text-lux-dim mb-4">
                {code}
              </div>
            </div>

            {/* Illustration */}
            {illustration ? (
              <div className="mb-6">{illustration}</div>
            ) : (
              <div className="mb-6">
                <div className="text-6xl mb-4">{errorDetails.icon}</div>
              </div>
            )}

            {/* Title */}
            <h1 className="na-h1 mb-4">{finalTitle}</h1>

            {/* Description */}
            <p className="na-metadata text-lux-dim mb-8 max-w-md mx-auto">
              {finalDescription}
            </p>

            {/* Recovery Actions */}
            {allActions.length > 0 && (
              <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
                {allActions.map(action => (
                  <button
                    key={action.id}
                    onClick={action.onClick}
                    className={`na-btn flex items-center gap-2 ${
                      action.variant === 'primary' ? 'na-btn-primary' : ''
                    }`}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Debug Information */}
            {showDebug && Object.keys(debugInfo).length > 0 && (
              <details className="mt-8 text-left">
                <summary className="na-metadata cursor-pointer mb-4 text-center">
                  Debug Information
                </summary>
                <div className="na-card p-4 bg-paper-2">
                  <div className="space-y-2">
                    {debugInfo.message && (
                      <div>
                        <div className="na-metadata mb-1">Message:</div>
                        <div className="na-data-small text-error">{debugInfo.message}</div>
                      </div>
                    )}
                    {debugInfo.stack && (
                      <div>
                        <div className="na-metadata mb-1">Stack:</div>
                        <pre className="na-data-small text-clay overflow-auto max-h-48 p-2 bg-void rounded">
                          {debugInfo.stack}
                        </pre>
                      </div>
                    )}
                    {debugInfo.timestamp && (
                      <div>
                        <div className="na-metadata mb-1">Timestamp:</div>
                        <div className="na-data-small">{debugInfo.timestamp}</div>
                      </div>
                    )}
                    {debugInfo.requestId && (
                      <div>
                        <div className="na-metadata mb-1">Request ID:</div>
                        <div className="na-data-small font-mono">{debugInfo.requestId}</div>
                      </div>
                    )}
                    {Object.entries(debugInfo)
                      .filter(([key]) => !['message', 'stack', 'timestamp', 'requestId'].includes(key))
                      .map(([key, value]) => (
                        <div key={key}>
                          <div className="na-metadata mb-1">{key}:</div>
                          <div className="na-data-small">
                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </details>
            )}

            {/* Help Text */}
            <div className="mt-8">
              <p className="na-metadata-small text-clay">
                If this problem persists, please contact support.
              </p>
            </div>
          </div>
        </main>
      </div>
    </RootShell>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return (
    prevProps.code === nextProps.code &&
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    prevProps.actions === nextProps.actions &&
    prevProps.showDebug === nextProps.showDebug &&
    prevProps.debugInfo === nextProps.debugInfo &&
    prevProps.showBackButton === nextProps.showBackButton &&
    prevProps.showHomeButton === nextProps.showHomeButton
  );
});

