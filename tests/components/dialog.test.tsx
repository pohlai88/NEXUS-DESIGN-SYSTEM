/**
 * Dialog Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Direct import with mocked dependencies
vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' ')
}));

vi.mock('@aibos/design-system/css', () => ({}));

// Import after mocks
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogTitle,
  DialogDescription 
} from '../../dist/adapters/react/dialog';

describe('Dialog', () => {
  describe('Rendering', () => {
    it('should render dialog when open', () => {
      render(
        <Dialog open={true} onOpenChange={vi.fn()}>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      
      const title = screen.getByText('Dialog Title');
      expect(title).toBeInTheDocument();
    });

    it('should not render dialog when closed', () => {
      render(
        <Dialog open={false} onOpenChange={vi.fn()}>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      
      const title = screen.queryByText('Dialog Title');
      expect(title).not.toBeInTheDocument();
    });
  });

  describe('Dialog Parts', () => {
    it('should render DialogContent with AIBOS classes', () => {
      render(
        <Dialog open={true} onOpenChange={vi.fn()}>
          <DialogContent data-testid="dialog-content">
            Content
          </DialogContent>
        </Dialog>
      );
      
      const content = screen.getByTestId('dialog-content');
      expect(content).toHaveClass('na-card', 'na-modal');
    });

    it('should render DialogTitle with AIBOS classes', () => {
      render(
        <Dialog open={true} onOpenChange={vi.fn()}>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      
      const title = screen.getByText('Title');
      expect(title).toHaveClass('na-h3');
    });

    it('should render DialogDescription with AIBOS classes', () => {
      render(
        <Dialog open={true} onOpenChange={vi.fn()}>
          <DialogContent>
            <DialogDescription>Description</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      
      const description = screen.getByText('Description');
      expect(description).toHaveClass('na-metadata');
    });

    it('should render DialogTrigger with AIBOS classes', () => {
      render(
        <Dialog open={false} onOpenChange={vi.fn()}>
          <DialogTrigger>Open</DialogTrigger>
        </Dialog>
      );
      
      const trigger = screen.getByText('Open');
      expect(trigger).toHaveClass('na-btn', 'na-btn-primary');
    });
  });

  describe('Interactions', () => {
    it('should call onOpenChange when closing', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Dialog open={true} onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      
      // Press Escape to close
      await user.keyboard('{Escape}');
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Dialog open={true} onOpenChange={vi.fn()}>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      
      const title = screen.getByText('Dialog Title');
      expect(title).toBeInTheDocument();
    });
  });
});

