/**
 * Accordion Component Tests
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
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '../../dist/adapters/react/accordion';

describe('Accordion', () => {
  describe('Rendering', () => {
    it('should render accordion component', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item1">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should render AccordionItem with AIBOS classes', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item1" data-testid="item">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      
      const item = screen.getByTestId('item');
      expect(item).toHaveClass('na-accordion-item');
    });

    it('should render AccordionTrigger with AIBOS classes', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item1">
            <AccordionTrigger data-testid="trigger">Trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveClass('na-accordion-trigger');
    });

    it('should render AccordionContent with AIBOS classes', () => {
      render(
        <Accordion type="single" defaultValue="item1">
          <AccordionItem value="item1">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent data-testid="content">Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('na-accordion-content');
    });
  });

  describe('Interactions', () => {
    it('should expand when trigger clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <Accordion type="single">
          <AccordionItem value="item1">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      
      const trigger = screen.getByText('Trigger');
      await user.click(trigger);
      
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should call onValueChange when expanded', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Accordion type="single" onValueChange={handleChange}>
          <AccordionItem value="item1">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      
      const trigger = screen.getByText('Trigger');
      await user.click(trigger);
      
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button role for trigger', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item1">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      
      const trigger = screen.getByRole('button');
      expect(trigger).toBeInTheDocument();
    });
  });
});

