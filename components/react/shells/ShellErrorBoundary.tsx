/**
 * ShellErrorBoundary - Error Boundary for Shell Components
 * 
 * Purpose: Isolate shell errors to prevent entire app crashes
 * 
 * Features:
 * - Catches shell rendering errors
 * - Provides fallback UI
 * - Logs errors for debugging
 * - Allows graceful degradation
 */

'use client';

import React from 'react';

export interface ShellErrorBoundaryProps {
  children: React.ReactNode;
  /** Custom fallback component */
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
  /** Error logging function */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ShellErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ShellErrorBoundary - Error boundary for shell components
 * 
 * Prevents shell errors from crashing the entire application.
 * Provides a fallback UI and error recovery.
 * 
 * @example
 * ```tsx
 * <ShellErrorBoundary>
 *   <CommandCenterShell {...props} />
 * </ShellErrorBoundary>
 * ```
 */
export class ShellErrorBoundary extends React.Component<
  ShellErrorBoundaryProps,
  ShellErrorBoundaryState
> {
  constructor(props: ShellErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ShellErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error
    console.error('Shell Error:', error, errorInfo);
    
    // Call custom error handler
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback or default
      if (this.props.fallback) {
        const Fallback = this.props.fallback;
        return <Fallback error={this.state.error} resetError={this.resetError} />;
      }

      // Default fallback UI
      return (
        <div className="flex items-center justify-center min-h-screen bg-void p-6">
          <div className="na-card p-8 max-w-md w-full text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-error"
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
            <h1 className="na-h2 mb-2">Something went wrong</h1>
            <p className="na-metadata mb-6">
              The shell component encountered an error. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mb-6 text-left">
                <summary className="na-metadata cursor-pointer mb-2">Error Details</summary>
                <pre className="na-card p-4 text-xs overflow-auto max-h-48">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={this.resetError}
              className="na-btn na-btn-primary w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC to wrap shell components with error boundary
 */
export function withShellErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
) {
  return function ShellWithErrorBoundary(props: P) {
    return (
      <ShellErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ShellErrorBoundary>
    );
  };
}

