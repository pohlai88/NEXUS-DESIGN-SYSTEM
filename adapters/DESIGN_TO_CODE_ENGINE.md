# Design-to-Code Engine - User Manual

**Version**: 2.1.0  
**Date**: 2025-01-27  
**Status**: Production Ready

---

## Overview

The Design-to-Code Engine is a system that **generates** UI library components from data specifications. You provide component specifications (JSON), and the engine generates production-ready React components.

---

## Architecture

```
┌─────────────────┐
│ Component Specs │  (JSON files in specs/components/)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Adapter       │  (Validates spec, generates code)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Generated Code  │  (.tsx files in dist/components/react/)
└─────────────────┘
```

---

## Quick Start

### 1. Define Your Component Specification

Create a JSON file in `specs/components/`:

**`specs/components/button.json`**:
```json
{
  "name": "Button",
  "description": "Interactive button component",
  "radixPrimitive": null,
  "nativeElement": "button",
  "props": {
    "variant": {
      "type": "primary | secondary | danger | ghost",
      "default": "primary",
      "required": false,
      "description": "Visual style variant"
    }
  },
  "variants": {
    "primary": {
      "aibosClasses": ["na-btn", "na-btn-primary"]
    },
    "secondary": {
      "aibosClasses": ["na-btn", "na-btn-secondary"]
    }
  },
  "states": {
    "disabled": {
      "aibosClasses": ["opacity-50", "cursor-not-allowed"]
    }
  }
}
```

### 2. Build Components

```bash
# Generate all components
pnpm build:components

# Generate specific component
pnpm build:components button

# With custom package name
pnpm build:components --package=@my-org/ui-kit

# With custom paths
pnpm build:components --utils=lib/utils --css=styles/main.css
```

### 3. Use Generated Components

The generated components are in `dist/components/react/`:

```typescript
import { Button } from '@aibos/design-system/react';

<Button variant="primary">Click me</Button>
```

---

## Component Specification Format

### Required Fields

- `name` - Component name (PascalCase, not reserved keyword)
- `variants` - At least one variant with `aibosClasses` array

### Optional Fields

- `description` - Component description (used in JSDoc)
- `radixPrimitive` - Radix UI primitive package (or `null`)
- `nativeElement` - Native HTML element (`button`, `input`, `div`, etc.)
- `props` - Custom props definition
- `states` - State-specific classes
- `parts` - For composite components (Dialog, Accordion, etc.)
- `accessibility` - Accessibility metadata
- `metadata` - Category, tags, complexity

### Example: Simple Component

```json
{
  "name": "Button",
  "radixPrimitive": null,
  "nativeElement": "button",
  "variants": {
    "primary": { "aibosClasses": ["na-btn", "na-btn-primary"] }
  }
}
```

### Example: Radix UI Component

```json
{
  "name": "Dialog",
  "radixPrimitive": "@radix-ui/react-dialog",
  "variants": {
    "default": { "aibosClasses": ["na-dialog"] }
  },
  "parts": {
    "Root": { "aibosClasses": ["na-dialog"] },
    "Trigger": { "aibosClasses": ["na-btn"] },
    "Content": { "aibosClasses": ["na-card"] }
  }
}
```

---

## Configuration

### Default Configuration

```typescript
{
  framework: 'react',
  outputDir: './dist/components',
  packageName: '@aibos/design-system',
  utilsPath: 'utils',
  cssPath: 'css'
}
```

### Custom Configuration

Override via command line:

```bash
pnpm build:components \
  --package=@my-org/ui-kit \
  --utils=lib/utils \
  --css=styles/main.css
```

Or modify `scripts/build-components.ts`:

```typescript
const config: AdapterConfig = {
  framework: 'react',
  outputDir: './dist/components',
  packageName: '@my-org/ui-kit',
  utilsPath: 'lib/utils',
  cssPath: 'styles/main.css',
};
```

---

## Generated Component Features

### Automatic Features

All generated components include:

- ✅ **forwardRef** - DOM ref support
- ✅ **TypeScript** - Full type safety
- ✅ **JSDoc** - IntelliSense documentation
- ✅ **asChild** - Radix UI Slot pattern (if Radix component)
- ✅ **Variant System** - Type-safe variants
- ✅ **State Management** - Disabled, loading states
- ✅ **Configurable Imports** - Custom package paths

### Example Generated Code

```typescript
/**
 * Interactive button component
 * 
 * @component
 * @name Button
 * @category interactive
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the component. */
  variant?: "primary" | "secondary" | "danger";
  /** Whether the component is disabled. */
  disabled?: boolean;
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

## Build Workflow

### Step 1: Create Specification

Add JSON file to `specs/components/`:

```bash
# Create new component spec
touch specs/components/my-component.json
```

### Step 2: Validate Specification

The build script automatically validates using Zod:

```bash
pnpm build:components my-component
```

If validation fails, you'll see detailed error messages:

```
❌ Invalid specification: name: Component name "var" is a reserved keyword
```

### Step 3: Generate Components

```bash
# Generate all
pnpm build:components

# Generate one
pnpm build:components button
```

### Step 4: Verify Output

Check `dist/components/react/`:

```
dist/components/react/
├── button.tsx
├── input.tsx
└── index.ts
```

### Step 5: Export from Package

Ensure `package.json` exports include:

```json
{
  "exports": {
    "./react": {
      "types": "./dist/components/react/index.d.ts",
      "import": "./dist/components/react/index.js"
    },
    "./utils": {
      "types": "./dist/components/utils.d.ts",
      "import": "./dist/components/utils.js"
    }
  }
}
```

---

## Runtime Dependencies

Generated components require:

### Required

- `react` (>=16.8.0)
- `react-dom` (>=16.8.0)
- `clsx` - For class name merging
- `tailwind-merge` - For Tailwind conflict resolution

### Optional (for Radix UI components)

- `@radix-ui/react-*` - Specific Radix primitives
- `@radix-ui/react-slot` - For asChild support

### Utils Export

Your package **must** export `utils.ts`:

```json
{
  "exports": {
    "./utils": "./dist/components/utils.js"
  }
}
```

Generated components import:
```typescript
import { cn } from '@aibos/design-system/utils';
```

---

## Best Practices

### 1. Specification Organization

- One JSON file per component
- Use descriptive names (PascalCase)
- Include descriptions for JSDoc
- Validate before committing

### 2. Variant Design

- Use semantic variant names (`primary`, `secondary`, not `blue`, `red`)
- Keep AIBOS classes consistent
- Document variant purpose

### 3. Props Design

- Use union types for variants: `"primary | secondary"`
- Provide defaults for optional props
- Include descriptions for IntelliSense

### 4. State Management

- Define states in spec (`disabled`, `loading`, `error`)
- Use AIBOS classes for state styling
- Keep states consistent across components

### 5. Testing

- Test generated components
- Verify imports resolve correctly
- Check TypeScript types
- Validate runtime behavior

---

## Troubleshooting

### "Component name is a reserved keyword"

**Solution**: Use a different name. Reserved keywords: `var`, `function`, `class`, `React`, etc.

### "Missing required dependency"

**Solution**: Ensure `package.json` includes all dependencies:
- `react`, `react-dom`
- `clsx`, `tailwind-merge`
- Radix UI packages (if using)

### "Cannot find module '@aibos/design-system/utils'"

**Solution**: Ensure `package.json` exports utils:

```json
{
  "exports": {
    "./utils": "./dist/components/utils.js"
  }
}
```

### "Unbalanced braces in generated code"

**Solution**: Check your spec JSON for syntax errors. Validate with:

```bash
node -e "JSON.parse(require('fs').readFileSync('specs/components/button.json'))"
```

---

## Advanced Usage

### Custom Framework Adapter

To add a new framework (e.g., Vue):

1. Create `adapters/vue/adapter.ts`
2. Implement `UniversalAdapter` interface
3. Register in `adapters/index.ts`
4. Use: `pnpm build:components --framework=vue`

### Programmatic Usage

```typescript
import { getAdapter } from '@aibos/design-system/adapters';
import { buttonSpec } from './specs/button.js';

const adapter = getAdapter('react');
const component = adapter.generate(buttonSpec, {
  framework: 'react',
  outputDir: './output',
  packageName: '@my-org/ui-kit',
});
```

### Batch Generation

```typescript
import { loadAllSpecs, generateComponents } from './scripts/build-components.js';

const specs = loadAllSpecs('./specs');
const result = await generateComponents(specs, 'react', config);
console.log(`Generated ${result.generated} components`);
```

---

## Related Documents

- [ADAPTERS_STRUCTURE.md](./ADAPTERS_STRUCTURE.md) - Adapter architecture
- [ADAPTERS_IMPROVEMENTS.md](./ADAPTERS_IMPROVEMENTS.md) - Implementation details
- [GOVERNANCE.md](./GOVERNANCE.md) - Design system governance

---

**Status**: Production Ready ✅

