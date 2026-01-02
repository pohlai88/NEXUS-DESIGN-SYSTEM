/**
 * Tabs Component Tests
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '../../dist/adapters/react/tabs';

describe('Tabs', () => {
  describe('Rendering', () => {
    it('should render tabs component', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
        </Tabs>
      );
      
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should render TabsList with AIBOS classes', () => {
      render(
        <Tabs>
          <TabsList data-testid="tabs-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      
      const list = screen.getByTestId('tabs-list');
      expect(list).toHaveClass('na-tabs-list');
    });

    it('should render TabsTrigger with AIBOS classes', () => {
      render(
        <Tabs>
          <TabsList>
            <TabsTrigger value="tab1" data-testid="trigger">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveClass('na-tab');
    });

    it('should render TabsContent with AIBOS classes', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" data-testid="content">
            Content
          </TabsContent>
        </Tabs>
      );
      
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('na-tab-content');
    });
  });

  describe('Interactions', () => {
    it('should switch tabs when clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );
      
      const tab2 = screen.getByText('Tab 2');
      await user.click(tab2);
      
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should call onValueChange when tab changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Tabs defaultValue="tab1" onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      
      const tab2 = screen.getByText('Tab 2');
      await user.click(tab2);
      
      expect(handleChange).toHaveBeenCalledWith('tab2');
    });
  });

  describe('Accessibility', () => {
    it('should have proper tab roles', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      );
      
      const trigger = screen.getByRole('tab');
      expect(trigger).toBeInTheDocument();
    });
  });
});

