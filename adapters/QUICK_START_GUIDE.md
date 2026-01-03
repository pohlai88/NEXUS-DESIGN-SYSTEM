# Quick Start Guide - Design-to-Code Engine

**Get started in 5 minutes!**

---

## Step 1: Create a Component Specification

Create `specs/components/my-button.json`:

```json
{
  "name": "MyButton",
  "description": "My custom button component",
  "radixPrimitive": null,
  "nativeElement": "button",
  "variants": {
    "primary": {
      "aibosClasses": ["na-btn", "na-btn-primary"]
    }
  }
}
```

---

## Step 2: Validate

```bash
pnpm validate:specs my-button
```

---

## Step 3: Build

```bash
pnpm build:components my-button
```

---

## Step 4: Use

```typescript
import { MyButton } from '@aibos/design-system/react';

<MyButton variant="primary">Click me</MyButton>
```

---

## That's It! 🎉

Your component is now generated and ready to use.

For more details, see [DESIGN_TO_CODE_ENGINE.md](./DESIGN_TO_CODE_ENGINE.md).

