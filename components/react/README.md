# AIBOS Design System - React Components for NextUI/HeroUI

Complete React component library for seamless NextUI/HeroUI integration with AIBOS Design System.

---

## Components

### StatusIndicator

Accessible status indicators with AIBOS styling.

```tsx
import { StatusIndicator } from 'aibos-design-system/react';

<StatusIndicator variant="success" label="Complete" />
<StatusIndicator variant="error" label="Failed" />
<StatusIndicator variant="warning" label="Attention Required" />
<StatusIndicator variant="pending" label="In Progress" />
```

### Card

Enhanced NextUI Card with AIBOS styling.

```tsx
import { Card, CardHeader, CardBody } from 'aibos-design-system/react';

<Card>
  <CardHeader>
    <h2 className="na-h4">Card Title</h2>
  </CardHeader>
  <CardBody>
    <div className="na-data">$12,450.00</div>
    <div className="na-metadata">PO-88219 • Feed Supply</div>
  </CardBody>
</Card>
```

**Props:**
- `withPadding` (default: `true`) - Apply AIBOS padding (`na-p-6`)
- `withAIBOSStyles` (default: `true`) - Apply AIBOS card styling (`na-card`)

### Button

Enhanced NextUI Button with AIBOS styling.

```tsx
import { Button } from 'aibos-design-system/react';

<Button variant="primary">Click me</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">Skip</Button>
```

**Props:**
- `variant` - `'primary' | 'secondary' | 'ghost' | 'danger'`
- `withAIBOSStyles` (default: `true`) - Apply AIBOS button styling

---

## Integration Helpers

### withAIBOS()

Combine AIBOS classes with NextUI components.

```tsx
import { withAIBOS } from 'aibos-design-system/react';
import { Card } from '@nextui-org/react';

<Card className={withAIBOS('na-card', 'na-p-6', customClass)}>
  Content
</Card>
```

### aibosTypography()

Get AIBOS typography classes.

```tsx
import { aibosTypography } from 'aibos-design-system/react';

<h1 className={aibosTypography('h1')}>Title</h1>
<div className={aibosTypography('data')}>$12,450.00</div>
<div className={aibosTypography('metadata')}>Label</div>
```

### aibosSpacing()

Get AIBOS spacing classes.

```tsx
import { aibosSpacing } from 'aibos-design-system/react';

<div className={aibosSpacing('p-6', 'mt-4')}>Content</div>
```

### withAIBOSClasses()

HOC to add AIBOS classes to any component.

```tsx
import { withAIBOSClasses } from 'aibos-design-system/react';
import { Card as NextUICard } from '@nextui-org/react';

const AIBOSCard = withAIBOSClasses(NextUICard, 'na-card', 'na-p-6');

<AIBOSCard>
  Content
</AIBOSCard>
```

---

## Complete Examples

### Data Dashboard Card

```tsx
import { Card, CardHeader, CardBody, Button, StatusIndicator } from 'aibos-design-system/react';

export function VendorCard({ vendor }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="na-h4">{vendor.name}</h2>
      </CardHeader>
      <CardBody>
        <div className="na-data">${vendor.amount.toLocaleString()}</div>
        <div className="na-metadata">{vendor.id} • {vendor.type}</div>
        <div className="flex items-center gap-4 mt-4">
          <StatusIndicator variant={vendor.status === 'approved' ? 'success' : 'pending'} label={vendor.status} />
          <Button variant="primary">View Details</Button>
        </div>
      </CardBody>
    </Card>
  );
}
```

### Form with AIBOS Styling

```tsx
import { Card, CardBody, Button } from 'aibos-design-system/react';
import { Input } from '@nextui-org/react';

export function VendorForm() {
  return (
    <Card>
      <CardBody>
        <h2 className="na-h4 mb-4">Create Vendor</h2>
        <Input
          label="Vendor Name"
          className="mb-4"
        />
        <Input
          label="Amount"
          type="number"
          className="mb-4"
        />
        <div className="flex gap-4">
          <Button variant="primary">Submit</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </CardBody>
    </Card>
  );
}
```

### Table with Status Indicators

```tsx
import { StatusIndicator } from 'aibos-design-system/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

export function VendorTable({ vendors }) {
  return (
    <Table>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {vendors.map((vendor) => (
          <TableRow key={vendor.id}>
            <TableCell className="na-h4">{vendor.name}</TableCell>
            <TableCell className="na-data">${vendor.amount}</TableCell>
            <TableCell>
              <StatusIndicator 
                variant={vendor.status === 'approved' ? 'success' : 'pending'} 
                label={vendor.status} 
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type {
  StatusIndicatorProps,
  StatusVariant,
  CardProps,
  ButtonProps,
  ButtonVariant,
} from 'aibos-design-system/react';
```

---

## Best Practices

### 1. Use AIBOS Components for Consistency

✅ **Good:**
```tsx
import { Card, CardBody } from 'aibos-design-system/react';
<Card><CardBody>Content</CardBody></Card>
```

❌ **Avoid:**
```tsx
import { Card } from '@nextui-org/react';
<Card className="na-card na-p-6">Content</Card>
```

### 2. Combine AIBOS Typography with NextUI Components

✅ **Good:**
```tsx
<Card>
  <CardHeader>
    <h2 className="na-h4">Title</h2>
  </CardHeader>
  <CardBody>
    <div className="na-data">$12,450.00</div>
  </CardBody>
</Card>
```

### 3. Use StatusIndicator for Status Display

✅ **Good:**
```tsx
<StatusIndicator variant="success" label="Approved" />
```

❌ **Avoid:**
```tsx
<span className="na-status ok">Approved</span>
```

---

## Peer Dependencies

These components require NextUI to be installed:

```bash
pnpm add @nextui-org/react framer-motion
```

React is a peer dependency (optional, but required for React components):

```bash
pnpm add react react-dom
```

---

## Migration from Direct NextUI Usage

### Before (Direct NextUI)

```tsx
import { Card, CardBody, Button } from '@nextui-org/react';

<Card className="na-card na-p-6">
  <CardBody>
    <Button className="na-btn-primary">Click</Button>
  </CardBody>
</Card>
```

### After (AIBOS Components)

```tsx
import { Card, CardBody, Button } from 'aibos-design-system/react';

<Card>
  <CardBody>
    <Button variant="primary">Click</Button>
  </CardBody>
</Card>
```

**Benefits:**
- ✅ Cleaner code (no manual class application)
- ✅ Consistent styling
- ✅ Type-safe props
- ✅ Better maintainability

---

## See Also

- [Main Components README](../README.md)
- [Design Tokens Documentation](../../types/design-tokens.ts)
- [Type Definitions](../../types/aibos-classes.ts)
- [NextUI Integration Guide](../../docs/INTEGRATION_GUIDE.md)

