# Radix UI + Universal Adapter Architecture

**Date**: 2026-01-02  
**Status**: 🎯 **Architecture Design**  
**Purpose**: Complete headless design system using Radix UI primitives + Universal Adapter pattern

---

## Executive Summary

**Strategy**: Adopt Radix UI primitives for accessibility + Create Universal Adapter for framework-agnostic consumption + Generate components from Figma design specs.

**Benefits**:
- ✅ **Accessibility solved** - Radix UI handles ARIA, keyboard navigation, focus management
- ✅ **Framework agnostic** - Universal adapter works with React, Vue, Svelte, Angular, vanilla
- ✅ **Lightweight** - Design-only specs, no heavy component code
- ✅ **Figma-driven** - Components generated from design specifications

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Figma Design System                       │
│  (Source of Truth: Components, Tokens, Variants, States)     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Figma-to-Component Generator                    │
│  Extracts: Props, Variants, States, Slots, Classes          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            Component Specifications (JSON)                   │
│  - Component APIs (props, variants, states)                 │
│  - AIBOS Class Mappings                                      │
│  - Radix UI Primitive Mapping                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                               │
        ▼                               ▼
┌──────────────────┐         ┌──────────────────────┐
│  Radix UI        │         │  Universal Adapter    │
│  Primitives      │         │  (Framework Agnostic) │
│  - Button        │         │  - React Adapter      │
│  - Dialog        │         │  - Vue Adapter        │
│  - Dropdown      │         │  - Svelte Adapter     │
│  - etc.          │         │  - Angular Adapter    │
│                  │         │  - Vanilla Adapter    │
│  ✅ Accessibility│         │                       │
│  ✅ Keyboard     │         │  Applies AIBOS        │
│  ✅ ARIA         │         │  Classes to Radix     │
└──────────────────┘         └──────────────────────┘
```

---

## 1. Radix UI Integration

### Why Radix UI?

- ✅ **Accessibility built-in** - ARIA attributes, keyboard navigation, focus management
- ✅ **Headless primitives** - No styling, just behavior
- ✅ **Composable** - Build complex components from primitives
- ✅ **Well-maintained** - Industry standard for accessible components
- ✅ **TypeScript** - Full type safety

### Radix UI Primitives We'll Use

```typescript
// Core Primitives
@radix-ui/react-button          // Button (if available) or use native
@radix-ui/react-dialog          // Dialog, Modal
@radix-ui/react-dropdown-menu   // Dropdown menus
@radix-ui/react-popover         // Popover, Tooltip
@radix-ui/react-select          // Select dropdown
@radix-ui/react-checkbox        // Checkbox
@radix-ui/react-radio-group     // Radio buttons
@radix-ui/react-switch          // Toggle switch
@radix-ui/react-slider           // Slider
@radix-ui/react-tabs             // Tabs
@radix-ui/react-accordion        // Accordion
@radix-ui/react-alert-dialog     // Alert dialogs
@radix-ui/react-toast            // Toast notifications
@radix-ui/react-tooltip          // Tooltips
@radix-ui/react-separator        // Separator
@radix-ui/react-label            // Form labels
@radix-ui/react-slot             // Already have this!
```

### Installation

```bash
# Add Radix UI primitives
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-popover @radix-ui/react-select \
  @radix-ui/react-checkbox @radix-ui/react-radio-group \
  @radix-ui/react-switch @radix-ui/react-slider \
  @radix-ui/react-tabs @radix-ui/react-accordion \
  @radix-ui/react-alert-dialog @radix-ui/react-toast \
  @radix-ui/react-tooltip @radix-ui/react-separator \
  @radix-ui/react-label
```

---

## 2. Universal Adapter Pattern

### Concept

Instead of building framework-specific components, create a **Universal Adapter** that:
1. Takes component specifications (from Figma)
2. Maps to Radix UI primitives
3. Applies AIBOS classes
4. Generates framework-specific adapters

### Adapter Structure

```typescript
// Universal Adapter Interface
interface UniversalAdapter {
  // Component specification
  component: ComponentSpec;
  
  // Radix UI primitive mapping
  radixPrimitive: RadixPrimitive;
  
  // AIBOS class mapping
  aibosClasses: AIBOSClassMapping;
  
  // Framework-specific renderer
  render(framework: Framework): ComponentCode;
}
```

### Component Specification Format

```json
{
  "components": {
    "button": {
      "name": "Button",
      "description": "Interactive button component",
      "radixPrimitive": null,
      "nativeElement": "button",
      "props": {
        "variant": {
          "type": "primary | secondary | danger | ghost",
          "default": "primary",
          "required": false
        },
        "size": {
          "type": "sm | md | lg",
          "default": "md",
          "required": false
        },
        "disabled": {
          "type": "boolean",
          "default": false,
          "required": false
        }
      },
      "variants": {
        "primary": {
          "aibosClasses": ["na-btn", "na-btn-primary"]
        },
        "secondary": {
          "aibosClasses": ["na-btn", "na-btn-secondary"]
        },
        "danger": {
          "aibosClasses": ["na-btn", "na-btn-danger"]
        },
        "ghost": {
          "aibosClasses": ["na-btn"]
        }
      },
      "states": {
        "default": {
          "aibosClasses": []
        },
        "hover": {
          "aibosClasses": [],
          "css": "hover:opacity-90"
        },
        "focus": {
          "aibosClasses": [],
          "css": "focus:ring-2 focus:ring-gold"
        },
        "disabled": {
          "aibosClasses": ["opacity-50", "cursor-not-allowed"]
        },
        "loading": {
          "aibosClasses": ["na-shimmer"]
        }
      },
      "accessibility": {
        "aria": {
          "role": "button",
          "ariaLabel": "Required for icon-only buttons",
          "ariaDisabled": "When disabled"
        },
        "keyboard": {
          "enter": "Activates button",
          "space": "Activates button",
          "tab": "Focus navigation"
        }
      }
    },
    "dialog": {
      "name": "Dialog",
      "description": "Modal dialog component",
      "radixPrimitive": "@radix-ui/react-dialog",
      "props": {
        "open": {
          "type": "boolean",
          "required": true
        },
        "onOpenChange": {
          "type": "function",
          "required": true
        }
      },
      "parts": {
        "Root": {
          "radixComponent": "Dialog",
          "aibosClasses": []
        },
        "Trigger": {
          "radixComponent": "DialogTrigger",
          "aibosClasses": ["na-btn", "na-btn-primary"]
        },
        "Content": {
          "radixComponent": "DialogContent",
          "aibosClasses": ["na-card", "na-modal"]
        },
        "Header": {
          "radixComponent": "DialogHeader",
          "aibosClasses": ["na-card-title"]
        },
        "Title": {
          "radixComponent": "DialogTitle",
          "aibosClasses": ["na-h3"]
        },
        "Description": {
          "radixComponent": "DialogDescription",
          "aibosClasses": ["na-metadata"]
        },
        "Footer": {
          "radixComponent": "DialogFooter",
          "aibosClasses": ["na-card-meta"]
        }
      },
      "accessibility": {
        "handledBy": "radix-ui",
        "features": [
          "Focus trap",
          "ESC key handling",
          "ARIA attributes",
          "Keyboard navigation"
        ]
      }
    }
  }
}
```

---

## 3. Figma-to-Component Generator

### Process

1. **Extract from Figma**:
   - Component variants
   - States (default, hover, focus, disabled, etc.)
   - Props/Properties
   - Spacing, colors, typography
   - Accessibility requirements

2. **Map to Specifications**:
   - Figma variant → Component variant
   - Figma state → Component state
   - Figma tokens → AIBOS classes
   - Figma component → Radix UI primitive

3. **Generate Adapter**:
   - Create component specification JSON
   - Generate framework adapters
   - Apply AIBOS classes

### Figma Integration

```typescript
// Figma API Integration
interface FigmaComponent {
  name: string;
  variants: FigmaVariant[];
  states: FigmaState[];
  properties: FigmaProperty[];
  tokens: FigmaToken[];
}

// Extract component from Figma
async function extractComponentFromFigma(
  componentId: string
): Promise<ComponentSpec> {
  // 1. Fetch component from Figma API
  const figmaComponent = await figmaApi.getComponent(componentId);
  
  // 2. Map Figma variants to component variants
  const variants = mapFigmaVariants(figmaComponent.variants);
  
  // 3. Map Figma states to component states
  const states = mapFigmaStates(figmaComponent.states);
  
  // 4. Map Figma tokens to AIBOS classes
  const aibosClasses = mapFigmaTokensToAIBOS(figmaComponent.tokens);
  
  // 5. Determine Radix UI primitive
  const radixPrimitive = determineRadixPrimitive(figmaComponent);
  
  // 6. Generate component specification
  return {
    name: figmaComponent.name,
    variants,
    states,
    aibosClasses,
    radixPrimitive,
    props: extractProps(figmaComponent)
  };
}
```

---

## 4. Framework Adapters

### React Adapter

```typescript
// Generated React Component
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
}

export function DialogTrigger({ className, ...props }) {
  return (
    <DialogPrimitive.Trigger
      className={cn('na-btn', 'na-btn-primary', className)}
      {...props}
    />
  );
}

export function DialogContent({ className, ...props }) {
  return (
    <DialogPrimitive.Content
      className={cn('na-card', 'na-modal', className)}
      {...props}
    />
  );
}
```

### Vue Adapter

```vue
<!-- Generated Vue Component -->
<script setup lang="ts">
import { DialogRoot, DialogTrigger, DialogContent } from 'radix-vue';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:open': [value: boolean];
}>();
</script>

<template>
  <DialogRoot :open="props.open" @update:open="emit('update:open', $event)">
    <DialogTrigger :class="cn('na-btn', 'na-btn-primary')">
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent :class="cn('na-card', 'na-modal')">
      <slot />
    </DialogContent>
  </DialogRoot>
</template>
```

### Svelte Adapter

```svelte
<!-- Generated Svelte Component -->
<script lang="ts">
  import { Dialog } from '@radix-ui/svelte';
  import { cn } from '@/lib/utils';
  
  export let open: boolean = false;
  export let onOpenChange: (open: boolean) => void;
</script>

<Dialog.Root {open} onOpenChange={onOpenChange}>
  <Dialog.Trigger class={cn('na-btn', 'na-btn-primary')}>
    <slot name="trigger" />
  </Dialog.Trigger>
  <Dialog.Content class={cn('na-card', 'na-modal')}>
    <slot />
  </Dialog.Content>
</Dialog.Root>
```

---

## 5. Implementation Plan

### Phase 1: Radix UI Setup ✅

- [x] Add Radix UI dependencies
- [ ] Create Radix UI primitive mapping
- [ ] Document Radix UI → AIBOS class mapping

### Phase 2: Component Specifications

- [ ] Create component specification schema
- [ ] Map existing components to specifications
- [ ] Generate specifications for all components

### Phase 3: Figma Integration

- [ ] Set up Figma API integration
- [ ] Create Figma component extractor
- [ ] Map Figma variants/states to specifications

### Phase 4: Universal Adapter

- [ ] Create adapter interface
- [ ] Implement React adapter generator
- [ ] Implement Vue adapter generator
- [ ] Implement Svelte adapter generator
- [ ] Implement vanilla HTML adapter

### Phase 5: Generator Tool

- [ ] Create CLI tool for component generation
- [ ] Add Figma sync command
- [ ] Add adapter generation command

---

## 6. Benefits

### ✅ Accessibility Solved
- Radix UI handles all ARIA attributes
- Keyboard navigation built-in
- Focus management automatic
- Screen reader support

### ✅ Framework Agnostic
- One specification, multiple adapters
- Works with any framework
- Lightweight (design-only)

### ✅ Figma-Driven
- Single source of truth
- Design changes → Auto-generated code
- No manual component maintenance

### ✅ Lightweight
- No heavy component code
- Just specifications + adapters
- Minimal bundle size

---

## 7. File Structure

```
design_system/
├── adapters/
│   ├── universal/
│   │   ├── adapter.ts          # Universal adapter interface
│   │   ├── component-spec.ts    # Component specification types
│   │   └── radix-mapping.ts     # Radix UI primitive mapping
│   ├── react/
│   │   └── generator.ts         # React adapter generator
│   ├── vue/
│   │   └── generator.ts         # Vue adapter generator
│   └── svelte/
│       └── generator.ts         # Svelte adapter generator
├── specs/
│   ├── components.json          # Component specifications
│   └── radix-mapping.json       # Radix UI → AIBOS mapping
├── generators/
│   ├── figma-extractor.ts       # Extract from Figma
│   └── adapter-generator.ts     # Generate adapters
└── dist/
    ├── adapters/
    │   ├── react/               # Generated React adapters
    │   ├── vue/                 # Generated Vue adapters
    │   └── svelte/              # Generated Svelte adapters
    └── specs/
        └── components.json      # Component specifications
```

---

## 8. Next Steps

1. **Install Radix UI primitives** - Add all required packages
2. **Create component specification schema** - Define the JSON structure
3. **Map existing components** - Convert current components to specs
4. **Create adapter generators** - Build framework-specific generators
5. **Set up Figma integration** - Connect to Figma API
6. **Generate first adapter** - Test with Button component

---

## 9. Optimizations & Best Practices

**See**: [RADIX_UI_OPTIMIZATION_ANALYSIS.md](./RADIX_UI_OPTIMIZATION_ANALYSIS.md) for detailed optimizations based on research of leading design systems:

- ✅ **JSON Schema Validation** - Type safety + runtime validation
- ✅ **Incremental Adoption** - Phased rollout strategy
- ✅ **Multi-Layer Theming** - Design tokens + runtime theming
- ✅ **Component Health Monitoring** - Usage tracking + drift detection
- ✅ **Storybook Integration** - Visual component documentation
- ✅ **Figma Plugin** - Automated design-to-code sync
- ✅ **Web Components Base** - True framework agnostic layer
- ✅ **Dependency Management** - Component dependency graph
- ✅ **Performance Optimizations** - Tree-shaking + code splitting
- ✅ **Multi-Format Documentation** - Comprehensive docs strategy

**Learn from**: Carbon Design System (IBM), Primer (GitHub), Fluent Design System (Microsoft), PatternFly, OpenUI5 (SAP)

---

**Last Updated**: 2026-01-02  
**Status**: Architecture design complete, optimizations identified, ready for implementation

