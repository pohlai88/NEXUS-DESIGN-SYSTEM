# Radix UI + Universal Adapter - Quick Start Guide

**Date**: 2026-01-02  
**Status**: 🚀 **Implementation Guide**

---

## Quick Start

### 1. Install Radix UI Primitives

```bash
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-popover @radix-ui/react-select \
  @radix-ui/react-checkbox @radix-ui/react-radio-group \
  @radix-ui/react-switch @radix-ui/react-slider \
  @radix-ui/react-tabs @radix-ui/react-accordion \
  @radix-ui/react-alert-dialog @radix-ui/react-toast \
  @radix-ui/react-tooltip @radix-ui/react-separator \
  @radix-ui/react-label
```

### 2. Component Specification Example

```json
{
  "button": {
    "name": "Button",
    "radixPrimitive": null,
    "nativeElement": "button",
    "variants": {
      "primary": { "aibosClasses": ["na-btn", "na-btn-primary"] },
      "secondary": { "aibosClasses": ["na-btn", "na-btn-secondary"] }
    },
    "accessibility": {
      "handledBy": "native"
    }
  },
  "dialog": {
    "name": "Dialog",
    "radixPrimitive": "@radix-ui/react-dialog",
    "parts": {
      "Trigger": { "aibosClasses": ["na-btn", "na-btn-primary"] },
      "Content": { "aibosClasses": ["na-card", "na-modal"] },
      "Title": { "aibosClasses": ["na-h3"] }
    },
    "accessibility": {
      "handledBy": "radix-ui"
    }
  }
}
```

### 3. Universal Adapter Usage

```typescript
// React
import { createAdapter } from '@aibos/design-system/adapters/react';
import buttonSpec from '@aibos/design-system/specs/button.json';

const Button = createAdapter(buttonSpec);
// <Button variant="primary">Click</Button>

// Vue
import { createAdapter } from '@aibos/design-system/adapters/vue';
const Button = createAdapter(buttonSpec);
// <Button variant="primary">Click</Button>
```

---

## Benefits

✅ **Accessibility** - Radix UI handles everything  
✅ **Framework Agnostic** - One spec, multiple adapters  
✅ **Lightweight** - Design-only, no heavy code  
✅ **Figma-Driven** - Generate from design specs

