# AIBOS Design System - React Components

React components for AIBOS Design System, optimized for Next.js integration.

## Installation

The React components are included in the `@aibos/design-system` package. No additional installation needed.

## Usage

### StatusIndicator

The `StatusIndicator` component provides accessible status indicators using AIBOS CSS classes.

```tsx
import { StatusIndicator } from '@aibos/design-system/react';

// Success status
<StatusIndicator variant="success" label="Complete" />

// Error status
<StatusIndicator variant="error" label="Failed" />

// Warning status
<StatusIndicator variant="warning" label="Attention Required" />

// Pending status
<StatusIndicator variant="pending" label="In Progress" />
```

### With Custom Classes

```tsx
<StatusIndicator
  variant="success"
  label="Approved"
  className="ml-4"
/>
```

### In Cards/Tables

```tsx
import { Card, CardBody } from '@nextui-org/react';
import { StatusIndicator } from '@aibos/design-system/react';

<Card>
  <CardBody>
    <div className="flex items-center gap-4">
      <span>Invoice #12345</span>
      <StatusIndicator variant="pending" label="Under Review" />
    </div>
  </CardBody>
</Card>
```

## API Reference

### StatusIndicator Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'success' \| 'error' \| 'warning' \| 'pending'` | Yes | - | Status variant |
| `label` | `string` | Yes | - | Status label text |
| `className` | `string` | No | - | Custom CSS classes |
| `size` | `'small' \| 'default' \| 'large'` | No | `'default'` | Size variant |
| `showDot` | `boolean` | No | `true` | Show dot indicator |
| `aria-live` | `'polite' \| 'assertive' \| 'off'` | No | `'polite'` | ARIA live region |

## Variant Mapping

| React Variant | AIBOS CSS Class | Color | Usage |
|---------------|----------------|-------|-------|
| `success` | `ok` | Green (#10b981) | Complete, approved, ready |
| `error` | `bad` | Red (#f43f5e) | Error, declined, failed |
| `warning` | `warn` | Yellow (#f59e0b) | Requires attention |
| `pending` | `pending` | Yellow (#f59e0b) | In progress, under review |

## Accessibility

The `StatusIndicator` component includes:
- `role="status"` - Indicates live region for status updates
- `aria-label` - Descriptive label for screen readers
- `aria-live` - Optional, for dynamic status updates (default: 'polite')

## TypeScript Support

Full TypeScript support is included:

```tsx
import { StatusIndicator, type StatusIndicatorProps, type StatusVariant } from '@aibos/design-system/react';

const variant: StatusVariant = 'success';
const props: StatusIndicatorProps = {
  variant: 'success',
  label: 'Complete',
};
```

## Utilities

### cn() - Class Name Merger

```tsx
import { cn } from '@aibos/design-system/utils';

const classes = cn('na-status', 'ok', isActive && 'active');
// => 'na-status ok active'
```

## Next.js Integration

See [NEXTJS_DESIGN_SYSTEM_IMPROVEMENTS.md](../NEXTJS_DESIGN_SYSTEM_IMPROVEMENTS.md) for complete Next.js integration guide.

## Design Tokens

```tsx
import { designTokens } from '@aibos/design-system/design-tokens';

const successColor = designTokens.colors.success; // 'var(--color-success)'
const spacing = designTokens.spacing.md; // 'var(--spacing-4)'
const h1Class = designTokens.typography.h1.class; // 'na-h1'
```

## Type Definitions

```tsx
import type { AIBOSStatusVariant, AIBOSTypographyClass } from '@aibos/design-system/types';
```

