/**
 * Component Index Tests
 * 
 * Tests that all components can be imported and rendered
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

// Direct import with mocked dependencies
vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' ')
}));

vi.mock('@aibos/design-system/css', () => ({}));

// Import after mocks
import {
  Button,
  Input,
  Card,
  Checkbox,
  Dialog,
  Label,
  Radio,
  Select,
  Switch,
  Tabs,
  Accordion,
  Tooltip
} from '../../dist/adapters/react';
import {
  RadioItem,
  RadioIndicator
} from '../../dist/adapters/react/radio';
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '../../dist/adapters/react/select';
import {
  TabsList,
  TabsTrigger
} from '../../dist/adapters/react/tabs';
import {
  AccordionItem,
  AccordionTrigger
} from '../../dist/adapters/react/accordion';
import {
  TooltipProvider,
  TooltipTrigger
} from '../../dist/adapters/react/tooltip';
import React from 'react';

describe('Component Exports', () => {
  it('should export Button component', () => {
    const { container } = render(<Button>Test</Button>);
    expect(container).toBeInTheDocument();
  });

  it('should export Input component', () => {
    const { container } = render(<Input />);
    expect(container).toBeInTheDocument();
  });

  it('should export Card component', () => {
    const { container } = render(<Card>Test</Card>);
    expect(container).toBeInTheDocument();
  });

  it('should export Checkbox component', () => {
    const { container } = render(<Checkbox />);
    expect(container).toBeInTheDocument();
  });

  it('should export Dialog component', () => {
    const { container } = render(
      <Dialog open={false} onOpenChange={() => {}}>
        <div>Test</div>
      </Dialog>
    );
    expect(container).toBeInTheDocument();
  });

  it('should export Label component', () => {
    const { container } = render(<Label>Test</Label>);
    expect(container).toBeInTheDocument();
  });

  it('should export Radio component', () => {
    const { container } = render(
      <Radio>
        <RadioItem value="test">
          <RadioIndicator />
        </RadioItem>
      </Radio>
    );
    expect(container).toBeInTheDocument();
  });

  it('should export Select component', () => {
    const { container } = render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>
    );
    expect(container).toBeInTheDocument();
  });

  it('should export Switch component', () => {
    const { container } = render(<Switch />);
    expect(container).toBeInTheDocument();
  });

  it('should export Tabs component', () => {
    const { container } = render(
      <Tabs>
        <TabsList>
          <TabsTrigger value="test">Test</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    expect(container).toBeInTheDocument();
  });

  it('should export Accordion component', () => {
    const { container } = render(
      <Accordion type="single">
        <AccordionItem value="test">
          <AccordionTrigger>Test</AccordionTrigger>
        </AccordionItem>
      </Accordion>
    );
    expect(container).toBeInTheDocument();
  });

  it('should export Tooltip component', () => {
    const { container } = render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Test</TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    );
    expect(container).toBeInTheDocument();
  });
});

