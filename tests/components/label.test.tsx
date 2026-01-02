/**
 * Label Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Direct import with mocked dependencies
vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' ')
}));

vi.mock('@aibos/design-system/css', () => ({}));

// Import after mocks
import { Label } from '../../dist/adapters/react/label';

describe('Label', () => {
  describe('Rendering', () => {
    it('should render label element', () => {
      render(<Label>Label text</Label>);
      const label = screen.getByText('Label text');
      expect(label).toBeInTheDocument();
    });

    it('should render with default AIBOS classes', () => {
      render(<Label>Label</Label>);
      const label = screen.getByText('Label');
      expect(label).toHaveClass('na-metadata', 'na-label');
    });

    it('should apply custom className', () => {
      render(<Label className="custom-class">Label</Label>);
      const label = screen.getByText('Label');
      expect(label).toHaveClass('custom-class');
    });
  });

  describe('States', () => {
    it('should render disabled state', () => {
      render(<Label className="opacity-50">Disabled Label</Label>);
      const label = screen.getByText('Disabled Label');
      expect(label).toHaveClass('opacity-50');
    });
  });

  describe('Accessibility', () => {
    it('should support htmlFor attribute', () => {
      render(<Label htmlFor="input-id">Label</Label>);
      const label = screen.getByText('Label');
      expect(label).toHaveAttribute('for', 'input-id');
    });

    it('should support aria-label', () => {
      render(<Label aria-label="Form label">Label</Label>);
      const label = screen.getByLabelText('Form label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Props Forwarding', () => {
    it('should forward HTML label attributes', () => {
      render(<Label id="label-id" data-testid="test-label">Label</Label>);
      const label = screen.getByTestId('test-label');
      expect(label).toHaveAttribute('id', 'label-id');
    });
  });
});

