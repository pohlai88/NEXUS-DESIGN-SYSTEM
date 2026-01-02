/**
 * Card Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Direct import with mocked dependencies
vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' ')
}));

vi.mock('@aibos/design-system/css', () => ({}));

// Import after mocks
import { Card } from '../../dist/adapters/react/card';

describe('Card', () => {
  describe('Rendering', () => {
    it('should render card element', () => {
      render(<Card>Card content</Card>);
      const card = screen.getByText('Card content');
      expect(card).toBeInTheDocument();
    });

    it('should render with default AIBOS classes', () => {
      render(<Card data-testid="card">Card</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('na-card');
    });

    it('should apply custom className', () => {
      render(<Card className="custom-class">Card</Card>);
      const card = screen.getByText('Card');
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('should render interactive variant', () => {
      render(<Card className="na-card-interactive">Interactive Card</Card>);
      const card = screen.getByText('Interactive Card');
      expect(card).toHaveClass('na-card', 'na-card-interactive');
    });
  });

  describe('Props Forwarding', () => {
    it('should forward HTML div attributes', () => {
      render(<Card id="card-id" data-testid="test-card">Card</Card>);
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('id', 'card-id');
    });
  });
});

