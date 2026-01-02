# Component Usage Examples

**AIBOS Design System - Radix UI Components**

This document provides practical examples for using the generated React components.

---

## Button

### Basic Usage

```tsx
import { Button } from '@aibos/design-system/adapters/react';
import '@aibos/design-system/css';

function MyComponent() {
  return (
    <div>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="danger">Delete</Button>
      <Button variant="ghost">Ghost Button</Button>
    </div>
  );
}
```

### With States

```tsx
<Button variant="primary" disabled>
  Disabled Button
</Button>

<Button variant="primary" loading>
  Loading...
</Button>
```

### With Click Handler

```tsx
<Button 
  variant="primary" 
  onClick={() => console.log('Clicked!')}
>
  Click Me
</Button>
```

---

## Dialog

### Basic Dialog

```tsx
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@aibos/design-system/adapters/react';

function MyDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Input

### Basic Input

```tsx
import { Input } from '@aibos/design-system/adapters/react';

function MyForm() {
  const [value, setValue] = React.useState('');

  return (
    <Input
      type="text"
      placeholder="Enter text..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Input Types

```tsx
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />
<Input type="search" placeholder="Search..." />
```

### With States

```tsx
<Input disabled placeholder="Disabled input" />
<Input className="na-error" placeholder="Error state" />
```

---

## Select

### Basic Select

```tsx
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@aibos/design-system/adapters/react';

function MySelect() {
  const [value, setValue] = React.useState('');

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

---

## Checkbox

### Basic Checkbox

```tsx
import { Checkbox } from '@aibos/design-system/adapters/react';

function MyCheckbox() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
```

### With Label

```tsx
<div className="na-flex na-items-center na-gap-2">
  <Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

---

## Radio Group

### Basic Radio Group

```tsx
import { 
  Radio,
  RadioRoot,
  RadioItem,
  RadioIndicator
} from '@aibos/design-system/adapters/react';

function MyRadioGroup() {
  const [value, setValue] = React.useState('');

  return (
    <RadioRoot value={value} onValueChange={setValue}>
      <div className="na-flex na-flex-col na-gap-2">
        <div className="na-flex na-items-center na-gap-2">
          <RadioItem value="option1" id="option1">
            <RadioIndicator />
          </RadioItem>
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="na-flex na-items-center na-gap-2">
          <RadioItem value="option2" id="option2">
            <RadioIndicator />
          </RadioItem>
          <Label htmlFor="option2">Option 2</Label>
        </div>
      </div>
    </RadioRoot>
  );
}
```

---

## Switch

### Basic Switch

```tsx
import { Switch } from '@aibos/design-system/adapters/react';

function MySwitch() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Switch
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
```

### With Label

```tsx
<div className="na-flex na-items-center na-gap-2">
  <Switch id="notifications" checked={checked} onCheckedChange={setChecked} />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

---

## Tabs

### Basic Tabs

```tsx
import { 
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@aibos/design-system/adapters/react';

function MyTabs() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
    </Tabs>
  );
}
```

---

## Accordion

### Basic Accordion

```tsx
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@aibos/design-system/adapters/react';

function MyAccordion() {
  return (
    <Accordion type="single" defaultValue="item1">
      <AccordionItem value="item1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Content for section 1
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Content for section 2
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

---

## Tooltip

### Basic Tooltip

```tsx
import { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@aibos/design-system/adapters/react';

function MyTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>
          This is a tooltip
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

---

## Card

### Basic Card

```tsx
import { Card } from '@aibos/design-system/adapters/react';

function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        Card content goes here
      </CardContent>
      <CardFooter>
        Card footer
      </CardFooter>
    </Card>
  );
}
```

---

## Form Example

### Complete Form

```tsx
import { 
  Input, 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem,
  Checkbox,
  Button,
  Label
} from '@aibos/design-system/adapters/react';

function MyForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    country: '',
    terms: false
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      console.log(formData);
    }}>
      <div className="na-flex na-flex-col na-gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor="country">Country</Label>
          <Select 
            value={formData.country} 
            onValueChange={(value) => setFormData({ ...formData, country: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="na-flex na-items-center na-gap-2">
          <Checkbox
            id="terms"
            checked={formData.terms}
            onCheckedChange={(checked) => setFormData({ ...formData, terms: checked })}
          />
          <Label htmlFor="terms">Accept terms</Label>
        </div>
        
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </div>
    </form>
  );
}
```

---

## Best Practices

### 1. Always Import CSS

```tsx
import '@aibos/design-system/css';
```

### 2. Use Semantic AIBOS Classes

The components automatically apply AIBOS classes, but you can extend with additional classes:

```tsx
<Button className="na-mt-4">Button with margin</Button>
```

### 3. Type Safety

All components are fully typed with TypeScript:

```tsx
// TypeScript will catch errors
<Button variant="invalid" /> // ❌ Error: invalid variant
<Button variant="primary" /> // ✅ Correct
```

### 4. Accessibility

All Radix UI components include full accessibility support:
- Keyboard navigation
- ARIA attributes
- Screen reader support
- Focus management

---

**See Also**:
- [RADIX_UI_QUICK_START.md](./RADIX_UI_QUICK_START.md) - Quick start guide
- [RADIX_UI_IMPLEMENTATION_COMPLETE.md](./RADIX_UI_IMPLEMENTATION_COMPLETE.md) - Implementation details

