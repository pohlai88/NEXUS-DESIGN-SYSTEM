/**
 * WorkflowShell - Multi-Stage Workflow Shell
 * 
 * Purpose: Multi-step processes, wizards, onboarding flows
 * 
 * Structure:
 * - Progress Bar: Visual step indicator
 * - Stage Content: Current step content
 * - Navigation: Back/Next/Finish buttons
 * - Sidebar: Optional step list
 * - Validation: Inline validation feedback
 * 
 * Features:
 * - Step validation gates
 * - Conditional branching
 * - Progress persistence
 * - Step skipping (if allowed)
 * - Step review mode
 */

'use client';

import React from 'react';
import { RootShell, type RootShellProps } from './RootShell';

export interface WorkflowStage {
  id: string;
  label: string;
  description?: string;
  component: React.ReactNode;
  validation?: () => boolean | Promise<boolean>;
  skipable?: boolean;
  optional?: boolean;
}

export interface WorkflowShellProps extends Omit<RootShellProps, 'children'> {
  /** Workflow stages */
  stages: WorkflowStage[];
  /** Current stage ID */
  currentStageId?: string;
  /** Initial stage ID */
  initialStageId?: string;
  /** On stage change callback */
  onStageChange?: (stageId: string) => void;
  /** On workflow complete callback */
  onComplete?: () => void;
  /** Show progress bar */
  showProgress?: boolean;
  /** Show sidebar with step list */
  showSidebar?: boolean;
  /** Allow step skipping */
  allowSkipping?: boolean;
  /** Main content ID for skip link */
  mainContentId?: string;
}

/**
 * WorkflowShell - Multi-stage workflow shell
 * 
 * Perfect for:
 * - User onboarding (5-7 steps)
 * - Account setup wizards
 * - Multi-step forms
 * - Approval workflows
 * - Migration processes
 * 
 * @example
 * ```tsx
 * <WorkflowShell
 *   stages={[
 *     { id: 'welcome', label: 'Welcome', component: <WelcomeStep /> },
 *     { id: 'profile', label: 'Profile', component: <ProfileStep /> },
 *     { id: 'complete', label: 'Complete', component: <CompleteStep /> },
 *   ]}
 *   onComplete={() => console.log('Done!')}
 * />
 * ```
 */
export const WorkflowShell = React.memo(function WorkflowShell({
  stages,
  currentStageId,
  initialStageId,
  onStageChange,
  onComplete,
  showProgress = true,
  showSidebar = true,
  allowSkipping = false,
  mainContentId = 'main-content',
  ...rootShellProps
}: WorkflowShellProps) {
  const [currentStage, setCurrentStage] = React.useState(
    currentStageId || initialStageId || stages[0]?.id || ''
  );
  const [completedStages, setCompletedStages] = React.useState<Set<string>>(new Set());
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  // Memoize expensive calculations
  const currentIndex = React.useMemo(
    () => stages.findIndex(s => s.id === currentStage),
    [stages, currentStage]
  );
  const currentStageData = React.useMemo(
    () => stages[currentIndex],
    [stages, currentIndex]
  );
  const isFirstStage = React.useMemo(() => currentIndex === 0, [currentIndex]);
  const isLastStage = React.useMemo(
    () => currentIndex === stages.length - 1,
    [currentIndex, stages.length]
  );
  const progress = React.useMemo(
    () => ((currentIndex + 1) / stages.length) * 100,
    [currentIndex, stages.length]
  );

  // Memoize handlers to prevent cascading re-renders
  const handleNext = React.useCallback(async () => {
    if (!currentStageData) return;

    // Validate current stage
    if (currentStageData.validation) {
      try {
        const isValid = await currentStageData.validation();
        if (!isValid) {
          setValidationErrors(prev => ({
            ...prev,
            [currentStage]: 'Please complete all required fields',
          }));
          return;
        }
      } catch (error) {
        setValidationErrors(prev => ({
          ...prev,
          [currentStage]: 'Validation failed',
        }));
        return;
      }
    }

    // Mark as completed
    setCompletedStages(prev => new Set([...prev, currentStage]));
    setValidationErrors(prev => {
      const next = { ...prev };
      delete next[currentStage];
      return next;
    });

    // Move to next stage
    if (isLastStage) {
      onComplete?.();
    } else {
      const nextStage = stages[currentIndex + 1];
      setCurrentStage(nextStage.id);
      onStageChange?.(nextStage.id);
    }
  }, [currentStageData, currentStage, isLastStage, currentIndex, stages, onComplete, onStageChange]);

  const handleBack = React.useCallback(() => {
    if (isFirstStage) return;
    const prevStage = stages[currentIndex - 1];
    setCurrentStage(prevStage.id);
    onStageChange?.(prevStage.id);
  }, [isFirstStage, currentIndex, stages, onStageChange]);

  const handleStageClick = React.useCallback((stageId: string) => {
    if (!allowSkipping) return;
    const targetIndex = stages.findIndex(s => s.id === stageId);
    if (targetIndex <= currentIndex || completedStages.has(stageId)) {
      setCurrentStage(stageId);
      onStageChange?.(stageId);
    }
  }, [allowSkipping, stages, currentIndex, completedStages, onStageChange]);

  return (
    <RootShell {...rootShellProps}>
      <div className="flex flex-col min-h-screen bg-void">
        {/* Progress Bar */}
        {showProgress && (
          <div className="border-b border-stroke bg-paper">
            <div className="max-w-4xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="na-metadata">
                  Step {currentIndex + 1} of {stages.length}
                </div>
                <div className="na-metadata">
                  {Math.round(progress)}% Complete
                </div>
              </div>
              <div className="h-2 bg-paper-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Step List */}
          {showSidebar && (
            <aside className="w-64 border-r border-stroke bg-paper overflow-y-auto">
              <div className="p-4">
                <h2 className="na-h5 mb-4">Steps</h2>
                <nav className="space-y-2">
                  {stages.map((stage, index) => {
                    const isActive = stage.id === currentStage;
                    const isCompleted = completedStages.has(stage.id);
                    const isAccessible = allowSkipping || index <= currentIndex || isCompleted;

                    return (
                      <button
                        key={stage.id}
                        onClick={() => handleStageClick(stage.id)}
                        disabled={!isAccessible}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-paper-2 border-l-2 border-primary text-lux'
                            : isCompleted
                            ? 'text-lux-dim hover:bg-paper-2'
                            : 'text-clay cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-3">
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
                          <div className="flex-1">
                            <div className="na-h6">{stage.label}</div>
                            {stage.description && (
                              <div className="na-metadata-small mt-1">{stage.description}</div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main
            id={mainContentId}
            className="flex-1 overflow-y-auto bg-void"
            role="main"
          >
            <div className="max-w-4xl mx-auto px-6 py-8">
              {/* Stage Content */}
              {currentStageData && (
                <div>
                  <div className="mb-6">
                    <h1 className="na-h1">{currentStageData.label}</h1>
                    {currentStageData.description && (
                      <div className="na-metadata mt-2">{currentStageData.description}</div>
                    )}
                  </div>

                  {/* Validation Error */}
                  {validationErrors[currentStage] && (
                    <div className="na-card p-4 mb-6 bg-error/10 border border-error">
                      <div className="text-error">{validationErrors[currentStage]}</div>
                    </div>
                  )}

                  {/* Stage Component */}
                  <div className="na-card p-6">
                    {currentStageData.component}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={isFirstStage}
                  className="na-btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>

                <div className="flex gap-4">
                  {allowSkipping && !isLastStage && (
                    <button
                      onClick={handleNext}
                      className="na-btn"
                    >
                      Skip
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="na-btn na-btn-primary"
                  >
                    {isLastStage ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </RootShell>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return (
    prevProps.stages === nextProps.stages &&
    prevProps.currentStageId === nextProps.currentStageId &&
    prevProps.initialStageId === nextProps.initialStageId &&
    prevProps.showProgress === nextProps.showProgress &&
    prevProps.showSidebar === nextProps.showSidebar &&
    prevProps.allowSkipping === nextProps.allowSkipping &&
    prevProps.mainContentId === nextProps.mainContentId
  );
});

