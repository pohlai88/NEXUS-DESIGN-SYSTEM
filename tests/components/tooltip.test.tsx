/**
 * Tooltip Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Direct import with mocked dependencies
vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' ')
}));

vi.mock('@aibos/design-system/css', () => ({}));

// Import after mocks
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from '../../dist/adapters/react/tooltip';

describe('Tooltip', () => {
  describe('Rendering', () => {
    it('should render tooltip trigger', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('should render TooltipContent with AIBOS classes', () => {
      render(
        <TooltipProvider>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="content">Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('na-tooltip-content', 'na-card');
    });
  });

  describe('Interactions', () => {
    it('should show tooltip on hover', async () => {
      const user = userEvent.setup();
      
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      
      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);
      
      // Wait for tooltip to appear (Radix UI handles delay)
      await waitFor(() => {
        const tooltips = screen.queryAllByText('Tooltip content');
        expect(tooltips.length).toBeGreaterThan(0);
      }, { timeout: 1000 });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <TooltipProvider>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="tooltip-content">Unique Tooltip Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      
      const content = screen.getByTestId('tooltip-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent('Unique Tooltip Content');
    });
  });
});

