# Component Adapters

**Part of the Neo-Analog Design System**

The adapters system is a **Design-to-Code Engine** that generates framework-specific UI components from component specifications. This enables the design system to output production-ready React components (and future framework support) from JSON specifications.

---

## Overview

The adapters system transforms component specifications (JSON) into production-ready framework components. Currently supports **React**, with plans for Vue, Svelte, and Angular.

### Architecture

```
Component Specs (JSON) → Adapter → Generated Components (.tsx)
```

### Key Features

- ✅ **Framework-Agnostic Interface** - Universal adapter pattern
- ✅ **Type-Safe Generation** - Full TypeScript support
- ✅ **Zod Validation** - Robust specification validation
- ✅ **Modern React Patterns** - forwardRef, asChild, JSDoc
- ✅ **Configurable Paths** - Custom import paths for different projects
- ✅ **Radix UI Support** - Full integration with Radix UI primitives

---

## Quick Start

### 1. Define Component Specification

Create a JSON file in `specs/components/`:

```json
{
  "name": "Button",
  "description": "Interactive button component",
  "radixPrimitive": null,
  "nativeElement": "button",
  "variants": {
    "primary": {
      "aibosClasses": ["na-btn", "na-btn-primary"]
    }
  }
}
```

### 2. Generate Component

```bash
pnpm build:components
```

### 3. Use Generated Component

```typescript
import { Button } from '@aibos/design-system/react';

<Button variant="primary">Click me</Button>
```

📖 **See [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md) for detailed instructions**

---

## Documentation

### Getting Started

- **[QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)** ⭐ **START HERE** - 5-minute quick start
- **[DESIGN_TO_CODE_ENGINE.md](./DESIGN_TO_CODE_ENGINE.md)** - Complete user manual

### Reference

- **[STRUCTURE.md](./STRUCTURE.md)** - Directory structure and file responsibilities

### Publishing

- **[PUBLISHING_CHECKLIST.md](./PUBLISHING_CHECKLIST.md)** - Pre-publish checklist and verification steps

---

## Directory Structure

```
adapters/
├── README.md                    # This file
├── index.ts                     # Adapter registry
├── universal/                   # Framework-agnostic code
│   ├── adapter.ts              # UniversalAdapter interface
│   ├── errors.ts               # Error classes & validation
│   └── validation.ts           # Zod schemas
└── react/                       # React-specific implementation
    ├── adapter.ts              # React component generator
    └── utils.ts                # React utilities (cn, etc.)
```

---

## Usage

### For Design System Developers

The adapters system is used internally to generate React components from specifications:

```bash
# Generate all components
pnpm build:components

# Generate specific component
pnpm build:components Button
```

### For External Users

Generated components are published as part of the design system package:

```typescript
import { Button, Card, Dialog } from '@aibos/design-system/react';
```

---

## Component Specification Format

See [`types/component-spec.ts`](../types/component-spec.ts) for the complete TypeScript definition.

**Required Fields:**
- `name` - Component name (PascalCase)
- `variants` - Visual variants with `aibosClasses`

**Optional Fields:**
- `radixPrimitive` - Radix UI package name (e.g., `@radix-ui/react-dialog`)
- `nativeElement` - HTML element tag (e.g., `button`, `div`)
- `props` - Component props with TypeScript types
- `states` - Component states (disabled, loading, etc.)
- `parts` - Sub-components for composite components
- `accessibility` - Accessibility specifications

**Example:**

```json
{
  "name": "Dialog",
  "description": "Modal dialog component",
  "radixPrimitive": "@radix-ui/react-dialog",
  "nativeElement": null,
  "variants": {
    "default": {
      "aibosClasses": ["na-modal"]
    }
  },
  "parts": {
    "Trigger": {
      "aibosClasses": ["na-btn"]
    },
    "Content": {
      "aibosClasses": ["na-modal__panel"]
    }
  }
}
```

---

## Generated Component Features

### React Components

- ✅ **forwardRef** - Full DOM ref support
- ✅ **asChild** - Radix UI Slot pattern
- ✅ **TypeScript** - Complete type safety
- ✅ **JSDoc** - IntelliSense documentation
- ✅ **Variant System** - Type-safe variants
- ✅ **State Management** - Disabled, loading states
- ✅ **Compound Components** - Multi-part component support

### Example Generated Code

```typescript
/**
 * Interactive button component
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', disabled = false, className, ...props }, ref) => {
    // ... implementation
  }
);

Button.displayName = "Button";
export { Button };
```

---

## Validation

All component specifications are validated using Zod schemas:

- ✅ Component name validation (PascalCase, reserved keywords)
- ✅ Variant structure validation
- ✅ Prop type validation
- ✅ Radix UI primitive validation
- ✅ Accessibility spec validation

**Validate specs:**

```bash
pnpm validate:specs
```

---

## Configuration

Adapter configuration is passed when generating components:

```typescript
const config = {
  framework: 'react',
  outputDir: './dist/components/react',
  packageName: '@aibos/design-system',
  utilsPath: 'utils',
  cssPath: 'css',
};
```

---

## Future Framework Support

The adapter system is designed to support multiple frameworks:

- ✅ **React** - Currently implemented
- 🔜 **Vue** - Planned
- 🔜 **Svelte** - Planned
- 🔜 **Angular** - Planned
- 🔜 **Vanilla** - Planned (HTML/CSS/JS)

---

## Related Documentation

- **[Component Specifications](../specs/README.md)** - How to define component specs
- **[Design System README](../README.md)** - Main design system documentation
- **[Type Definitions](../types/component-spec.ts)** - TypeScript types for specs

---

**Status**: ✅ Production Ready  
**Version**: 2.1.0  
**Last Updated**: 2025-01-27

