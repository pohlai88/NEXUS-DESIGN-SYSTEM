/**
 * FocusShell - The Minimalist
 * 
 * Used when you want the user to do ONE thing without distractions.
 * 
 * Use Cases: Login/Sign-up, 404 Errors, Payment Checkouts, Onboarding Wizards
 * 
 * Structure:
 * - No Navigation
 * - No Footer
 * - Center: A single centered card or a split-screen (image left, form right)
 * - Top Right: Optional "Exit" or "Help" button
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';

export interface FocusShellProps extends Omit<RootShellProps, 'children'> {
  children: React.ReactNode;
  /** Optional exit/help button in top right */
  exitButton?: React.ReactNode;
  /** Layout variant: 'centered' or 'split' */
  variant?: 'centered' | 'split';
  /** Left side content (for split variant) */
  leftContent?: React.ReactNode;
  /** Maximum width for centered content (default: max-w-md) */
  maxWidth?: string;
  /** Main content ID for skip link */
  mainContentId?: string;
}

/**
 * FocusShell - Minimalist layout for focused tasks
 * 
 * This shell removes all distractions to focus the user on a single task.
 * Perfect for:
 * - Login/Sign-up pages
 * - 404 error pages
 * - Payment checkouts
 * - Onboarding wizards
 * - Confirmation dialogs
 * 
 * @example
 * ```tsx
 * <FocusShell
 *   variant="centered"
 *   exitButton={<CloseButton />}
 * >
 *   <LoginForm />
 * </FocusShell>
 * ```
 */
export const FocusShell = React.memo(function FocusShell({
  children,
  exitButton,
  variant = 'centered',
  leftContent,
  maxWidth = 'max-w-md',
  mainContentId = 'main-content',
  ...rootShellProps
}: FocusShellProps) {
  return (
    <RootShell {...rootShellProps}>
      <div className="flex flex-col min-h-screen bg-void">
        {/* Exit/Help button */}
        {exitButton && (
          <div className="absolute top-4 right-4 z-50">
            {exitButton}
          </div>
        )}

        {/* Main content */}
        <main
          id={mainContentId}
          className="flex-1 flex items-center justify-center p-6"
          role="main"
        >
          {variant === 'split' && leftContent ? (
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left side (image/illustration) */}
              <div className="hidden md:flex items-center justify-center">
                {leftContent}
              </div>

              {/* Right side (form/content) */}
              <div className="flex items-center justify-center">
                <div className={`w-full ${maxWidth}`}>
                  {children}
                </div>
              </div>
            </div>
          ) : (
            <div className={`w-full ${maxWidth}`}>
              {children}
            </div>
          )}
        </main>
      </div>
    </RootShell>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return (
    prevProps.children === nextProps.children &&
    prevProps.exitButton === nextProps.exitButton &&
    prevProps.variant === nextProps.variant &&
    prevProps.leftContent === nextProps.leftContent &&
    prevProps.maxWidth === nextProps.maxWidth &&
    prevProps.mainContentId === nextProps.mainContentId
  );
});

