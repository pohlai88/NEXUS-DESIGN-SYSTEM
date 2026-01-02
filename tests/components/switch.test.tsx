/**
 * Switch Component Tests
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
import { Switch } from '../../dist/adapters/react/switch';

describe('Switch', () => {
  describe('Rendering', () => {
    it('should render switch element', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should render with default AIBOS classes', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('na-switch');
    });

    it('should apply custom className', () => {
      render(<Switch className="custom-class" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('custom-class');
    });
  });

  describe('States', () => {
    it('should render unchecked by default', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeChecked();
    });

    it('should render checked state', () => {
      render(<Switch checked />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeChecked();
      expect(switchElement).toHaveClass('na-switch');
    });

    it('should render disabled state', () => {
      render(<Switch disabled />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
      expect(switchElement).toHaveClass('opacity-50', 'cursor-not-allowed');
    });
  });

  describe('Interactions', () => {
    it('should toggle when clicked', async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      
      expect(switchElement).not.toBeChecked();
      await user.click(switchElement);
      expect(switchElement).toBeChecked();
    });

    it('should call onCheckedChange when toggled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(<Switch onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole('switch');
      
      await user.click(switchElement);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should not toggle when disabled', async () => {
      const user = userEvent.setup();
      render(<Switch disabled />);
      const switchElement = screen.getByRole('switch');
      
      await user.click(switchElement);
      expect(switchElement).not.toBeChecked();
    });
  });

  describe('Accessibility', () => {
    it('should have switch role', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should support aria-label', () => {
      render(<Switch aria-label="Enable notifications" />);
      const switchElement = screen.getByRole('switch', { name: /enable notifications/i });
      expect(switchElement).toBeInTheDocument();
    });
  });
});

