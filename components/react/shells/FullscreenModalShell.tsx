/**
 * FullscreenModalShell - Fullscreen Modal for Wizards/Editors
 * 
 * Purpose: Multi-step wizards, complex editors, onboarding flows
 * 
 * Structure:
 * - Fullscreen overlay
 * - Header: Title, progress, close button
 * - Body: Scrollable content area
 * - Footer: Navigation buttons (Back/Next/Finish)
 * 
 * Features:
 * - Progress indicator
 * - Step navigation
 * - Keyboard shortcuts
 * - Focus management
 * - Prevents body scroll
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';

export interface FullscreenModalStep {
  id: string;
  label: string;
  component: React.ReactNode;
  validation?: () => boolean | Promise<boolean>;
  optional?: boolean;
}

export interface FullscreenModalShellProps extends Omit<RootShellProps, 'children'> {
  /** Whether modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Steps for wizard mode */
  steps?: FullscreenModalStep[];
  /** Current step ID (for wizard mode) */
  currentStepId?: string;
  /** Initial step ID */
  initialStepId?: string;
  /** Show progress indicator */
  showProgress?: boolean;
  /** Show step navigation */
  showStepNavigation?: boolean;
  /** Content (for non-wizard mode) */
  children?: React.ReactNode;
  /** Footer actions */
  footerActions?: React.ReactNode;
  /** Show close button */
  showCloseButton?: boolean;
  /** On step change callback */
  onStepChange?: (stepId: string) => void;
  /** On complete callback */
  onComplete?: () => void;
  /** Allow closing without confirmation */
  allowClose?: boolean;
  /** Close confirmation message */
  closeConfirmation?: string;
}

/**
 * FullscreenModalShell - Fullscreen modal for wizards/editors
 * 
 * Perfect for:
 * - Multi-step wizards
 * - Complex editors
 * - Onboarding flows
 * - Setup processes
 * - Long forms
 * 
 * @example
 * ```tsx
 * <FullscreenModalShell
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Setup Wizard"
 *   steps={[
 *     { id: '1', label: 'Step 1', component: <Step1 /> },
 *     { id: '2', label: 'Step 2', component: <Step2 /> },
 *   ]}
 *   onComplete={handleComplete}
 * />
 * ```
 */
export const FullscreenModalShell = React.memo(function FullscreenModalShell({
  open,
  onClose,
  title,
  steps = [],
  currentStepId,
  initialStepId,
  showProgress = true,
  showStepNavigation = true,
  children,
  footerActions,
  showCloseButton = true,
  onStepChange,
  onComplete,
  allowClose = true,
  closeConfirmation,
  ...rootShellProps
}: FullscreenModalShellProps) {
  const [currentStep, setCurrentStep] = React.useState(
    currentStepId || initialStepId || steps[0]?.id || ''
  );
  const [completedSteps, setCompletedSteps] = React.useState<Set<string>>(new Set());
  const [isClosing, setIsClosing] = React.useState(false);

  // Wizard mode
  const isWizardMode = steps.length > 0;
  const currentIndex = React.useMemo(
    () => steps.findIndex(s => s.id === currentStep),
    [steps, currentStep]
  );
  const currentStepData = React.useMemo(
    () => steps[currentIndex],
    [steps, currentIndex]
  );
  const isFirstStep = React.useMemo(() => currentIndex === 0, [currentIndex]);
  const isLastStep = React.useMemo(
    () => currentIndex === steps.length - 1,
    [currentIndex, steps.length]
  );
  const progress = React.useMemo(
    () => steps.length > 0 ? ((currentIndex + 1) / steps.length) * 100 : 0,
    [currentIndex, steps.length]
  );

  // Keyboard shortcuts
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && allowClose) {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, allowClose]);

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
  const handleClose = React.useCallback(() => {
    if (closeConfirmation) {
      if (window.confirm(closeConfirmation)) {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
          setIsClosing(false);
        }, 100);
      }
    } else {
      onClose();
    }
  }, [onClose, closeConfirmation]);

  const handleNext = React.useCallback(async () => {
    if (!isWizardMode || !currentStepData) return;

    // Validate current step
    if (currentStepData.validation) {
      try {
        const isValid = await currentStepData.validation();
        if (!isValid) return;
      } catch (error) {
        console.error('Validation failed:', error);
        return;
      }
    }

    // Mark as completed
    setCompletedSteps(prev => new Set([...prev, currentStep]));

    // Move to next step
    if (isLastStep) {
      onComplete?.();
    } else {
      const nextStep = steps[currentIndex + 1];
      setCurrentStep(nextStep.id);
      onStepChange?.(nextStep.id);
    }
  }, [isWizardMode, currentStepData, currentStep, isLastStep, currentIndex, steps, onComplete, onStepChange]);

  const handleBack = React.useCallback(() => {
    if (!isWizardMode || isFirstStep) return;
    const prevStep = steps[currentIndex - 1];
    setCurrentStep(prevStep.id);
    onStepChange?.(prevStep.id);
  }, [isWizardMode, isFirstStep, currentIndex, steps, onStepChange]);

  if (!open) return null;

  return (
    <RootShell {...rootShellProps}>
      {/* Fullscreen Overlay */}
      <div
        className="fixed inset-0 bg-void z-[300] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fullscreen-modal-title"
      >
        {/* Header */}
        <header className="border-b border-stroke bg-paper/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4 flex-1">
              <h1 id="fullscreen-modal-title" className="na-h2">
                {title}
              </h1>

              {/* Progress Indicator */}
              {isWizardMode && showProgress && steps.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="na-metadata">
                    Step {currentIndex + 1} of {steps.length}
                  </div>
                  <div className="w-32 h-2 bg-paper-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="na-metadata">
                    {Math.round(progress)}%
                  </div>
                </div>
              )}
            </div>

            {showCloseButton && allowClose && (
              <button
                onClick={handleClose}
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

          {/* Step Navigation */}
          {isWizardMode && showStepNavigation && steps.length > 0 && (
            <div className="px-6 pb-4">
              <nav className="flex items-center gap-2 overflow-x-auto">
                {steps.map((step, index) => {
                  const isActive = step.id === currentStep;
                  const isCompleted = completedSteps.has(step.id);
                  const isAccessible = index <= currentIndex || isCompleted;

                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        if (isAccessible) {
                          setCurrentStep(step.id);
                          onStepChange?.(step.id);
                        }
                      }}
                      disabled={!isAccessible}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-paper-2 border-l-2 border-primary text-lux'
                          : isCompleted
                          ? 'text-lux-dim hover:bg-paper-2'
                          : 'text-clay cursor-not-allowed'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          isCompleted
                            ? 'bg-success text-success-foreground'
                            : isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-paper-2 text-clay'
                        }`}
                      >
                        {isCompleted ? '✓' : index + 1}
                      </div>
                      <span className="na-h6">{step.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </header>

        {/* Body */}
        <main className="flex-1 overflow-y-auto bg-void">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {isWizardMode ? (
              currentStepData?.component
            ) : (
              children
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-stroke bg-paper/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-4">
            {isWizardMode ? (
              <>
                <button
                  onClick={handleBack}
                  disabled={isFirstStep}
                  className="na-btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                <div className="flex items-center gap-3">
                  {allowClose && (
                    <button
                      onClick={handleClose}
                      className="na-btn"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="na-btn na-btn-primary"
                  >
                    {isLastStep ? 'Finish' : 'Next'}
                  </button>
                </div>
              </>
            ) : (
              footerActions || (
                allowClose && (
                  <button
                    onClick={handleClose}
                    className="na-btn na-btn-primary ml-auto"
                  >
                    Close
                  </button>
                )
              )
            )}
          </div>
        </footer>
      </div>
    </RootShell>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return (
    prevProps.open === nextProps.open &&
    prevProps.title === nextProps.title &&
    prevProps.steps === nextProps.steps &&
    prevProps.currentStepId === nextProps.currentStepId &&
    prevProps.initialStepId === nextProps.initialStepId &&
    prevProps.showProgress === nextProps.showProgress &&
    prevProps.showStepNavigation === nextProps.showStepNavigation &&
    prevProps.showCloseButton === nextProps.showCloseButton &&
    prevProps.allowClose === nextProps.allowClose &&
    prevProps.children === nextProps.children
  );
});

