# Radix UI + Universal Adapter - Quick Start

**Date**: 2026-01-02  
**Status**: ✅ **Ready to Use**

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
pnpm install
```

This installs:
- 15 Radix UI primitives
- ajv & ajv-formats (for validation)

### Step 2: Generate Component Specifications

```bash
pnpm generate:specs
```

This:
- Validates all component specs against JSON Schema
- Generates `dist/component-specs.json`
- Reports any validation errors

### Step 3: Generate React Components

```bash
# Generate single component
pnpm generate:adapter button --framework react

# Generate all components
pnpm generate:adapter all --framework react
```

This generates React components in `dist/adapters/react/`

---

## 📦 What's Included

### Component Specifications (5 Components)

1. **Button** - Native button with 4 variants
2. **Dialog** - Radix UI dialog with 7 parts
3. **Input** - Native input with 4 states
4. **Card** - Container with 2 variants, 4 parts
5. **Label** - Radix UI label

### Generated Output

```
dist/
├── component-specs.json          # Validated component index
└── adapters/
    └── react/
        ├── Button.tsx            # Generated React component
        ├── Dialog.tsx            # Generated React component
        ├── DialogTrigger.tsx    # Dialog part
        ├── DialogContent.tsx     # Dialog part
        └── index.ts              # Exports
```

---

## 💻 Usage Example

```tsx
// Import generated component
import { Button } from '@aibos/design-system/adapters/react';
import '@aibos/design-system/css';

// Use with AIBOS classes automatically applied
<Button variant="primary">Click me</Button>
<Button variant="secondary" disabled>Disabled</Button>

// Dialog with Radix UI + AIBOS
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@aibos/design-system/adapters/react';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogTitle>Title</DialogTitle>
  </DialogContent>
</Dialog>
```

---

## 🎯 Next Steps

1. **Add More Components** - Create specs in `specs/components/`
2. **Generate Adapters** - Run `pnpm generate:adapter`
3. **Test Components** - Use in your React app
4. **Set Up Storybook** - Document components visually

---

**See Also**:
- [RADIX_UI_UNIVERSAL_ADAPTER_ARCHITECTURE.md](./RADIX_UI_UNIVERSAL_ADAPTER_ARCHITECTURE.md) - Full architecture
- [RADIX_UI_OPTIMIZATION_ANALYSIS.md](./RADIX_UI_OPTIMIZATION_ANALYSIS.md) - Optimizations
- [RADIX_UI_IMPLEMENTATION_STATUS.md](./RADIX_UI_IMPLEMENTATION_STATUS.md) - Status

