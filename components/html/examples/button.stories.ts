import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * Button Web Component Stories
 * 
 * Interactive documentation for na-button component
 * Based on Storybook best practices from Vuesion
 */

const meta: Meta = {
  title: 'Web Components/Button',
  component: 'na-button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      description: 'Button variant style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <na-button
      variant="${args.variant || 'default'}"
      size="${args.size || 'md'}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Button
    </na-button>
  `,
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    loading: false,
  },
};

export const Primary: Story = {
  render: () => html`<na-button variant="primary">Primary Button</na-button>`,
};

export const Secondary: Story = {
  render: () => html`<na-button variant="secondary">Secondary Button</na-button>`,
};

export const Destructive: Story = {
  render: () => html`<na-button variant="destructive">Destructive Button</na-button>`,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <na-button size="sm">Small</na-button>
      <na-button size="md">Medium</na-button>
      <na-button size="lg">Large</na-button>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <na-button disabled>Disabled</na-button>
      <na-button variant="primary" disabled>Disabled Primary</na-button>
    </div>
  `,
};

export const Loading: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <na-button loading>Loading</na-button>
      <na-button variant="primary" loading>Loading Primary</na-button>
    </div>
  `,
};

