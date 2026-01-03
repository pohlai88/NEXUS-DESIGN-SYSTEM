# Adapters Directory Structure

**Date**: 2025-01-27  
**Status**: ✅ Final Structure  
**Version**: 2.1.0

---

## Directory Structure

```
adapters/
├── index.ts                    # Adapter registry (getAdapter, getAvailableFrameworks)
├── universal/
│   ├── adapter.ts             # UniversalAdapter interface & shared helpers
│   ├── errors.ts              # Error classes & validation
│   └── validation.ts          # Zod schemas for ComponentSpec validation
└── react/
    ├── adapter.ts             # React adapter implementation (merged generator)
    └── utils.ts               # React-specific utilities (cn, validateVariant, etc.)
```

---

## File Responsibilities

### `adapters/index.ts`
**Purpose**: Central registry for framework adapters

**Exports**:
- `getAdapter(framework)` - Get adapter for a framework
- `getAvailableFrameworks()` - List all available frameworks
- `isFrameworkSupported(framework)` - Check if framework is supported
- Re-exports from `universal/adapter.ts`, `universal/errors.ts`
- Re-exports `reactAdapter` from `react/adapter.ts`

**Usage**:
```typescript
import { getAdapter } from '@aibos/design-system/adapters';
const adapter = getAdapter('react');
```

---

### `adapters/universal/adapter.ts`
**Purpose**: Framework-agnostic interface and shared utilities

**Exports**:
- `UniversalAdapter` interface
- `AdapterConfig` interface
- `GeneratedComponent` interface
- `Framework` type
- Helper functions:
  - `getVariantClasses()` - Get classes for a variant
  - `getStateClasses()` - Get classes for a state
  - `getAllClasses()` - Get all classes for variant + state
  - `usesRadixUI()` - Check if component uses Radix UI
  - `hasParts()` - Check if component has parts

**Why here**: These are truly universal utilities used by all framework adapters.

---

### `adapters/universal/errors.ts`
**Purpose**: Structured error handling

**Exports**:
- `AdapterError` - Base error class
- `InvalidSpecError` - Invalid component specification
- `MissingDependencyError` - Missing required dependency
- `UnsupportedFrameworkError` - Framework not supported
- `validateSpec()` - Validate ComponentSpec using Zod

**Why here**: Error handling is framework-agnostic.

---

### `adapters/universal/validation.ts`
**Purpose**: Zod-based validation schemas

**Exports**:
- `componentSpecSchema` - Zod schema for ComponentSpec
- `validateSpecWithZod()` - Validate with Zod (throws on error)
- `validateSpecSafe()` - Validate with Zod (returns result object)
- `formatValidationError()` - Format Zod errors for display
- `isReservedKeyword()` - Check if name is reserved
- `isValidComponentName()` - Validate component name format

**Why here**: Validation logic is shared across all adapters.

---

### `adapters/react/adapter.ts`
**Purpose**: React component generation implementation

**Exports**:
- `generateReactComponent()` - Generate React component from spec
- `reactAdapter` - UniversalAdapter implementation for React

**Features**:
- forwardRef support
- asChild prop for Radix UI
- Configurable import paths
- JSDoc comments
- Proper prop type handling

**Why here**: This IS the React adapter. The generator logic is the adapter implementation.

---

### `adapters/react/utils.ts`
**Purpose**: React-specific utility functions

**Exports**:
- `cn()` - Class name merging (clsx + tailwind-merge)
- `validateVariant()` - Validate variant against allowed values
- `getStateClasses()` - Get state classes (wrapper)
- `mergeClasses()` - Merge variant and state classes

**Why here**: React-specific utilities that may differ for other frameworks.

---

## Design Principles

### 1. Single Source of Truth
- Each framework has exactly **one** adapter file: `{framework}/adapter.ts`
- No separate "generator" files - the adapter IS the generator

### 2. Clear Separation
- **Universal**: Framework-agnostic interfaces and utilities
- **Framework-specific**: Implementation details for each framework

### 3. Scalability
To add a new framework (e.g., Vue):
1. Create `adapters/vue/adapter.ts`
2. Implement `UniversalAdapter` interface
3. Register in `adapters/index.ts`

No need for separate generator files or complex abstractions.

---

## Migration from Old Structure

### Before (Over-abstracted)
```
adapters/
├── react/
│   ├── generator.ts           # Just re-exports
│   ├── generator-improved.ts # Actual logic
│   └── utils.ts
└── universal/
    └── adapter.ts            # Interface + utilities mixed
```

**Problems**:
- Logic split across multiple files
- Confusing naming (generator vs adapter)
- Hard to find where React generation happens

### After (Consolidated)
```
adapters/
├── react/
│   ├── adapter.ts            # All React logic here
│   └── utils.ts
└── universal/
    ├── adapter.ts            # Interface + shared helpers
    ├── errors.ts             # Error handling
    └── validation.ts        # Validation
```

**Benefits**:
- Single file per framework adapter
- Clear naming (adapter = implementation)
- Easy to find and modify framework-specific logic

---

## Import Patterns

### For Consumers
```typescript
// Get adapter
import { getAdapter } from '@aibos/design-system/adapters';
const adapter = getAdapter('react');

// Use adapter
const component = adapter.generate(spec, config);
```

### For Framework-Specific Code
```typescript
// Direct import (if needed)
import { reactAdapter } from '@aibos/design-system/adapters/react';
```

### For Shared Utilities
```typescript
// Universal helpers
import { getAllClasses, usesRadixUI } from '@aibos/design-system/adapters';
```

---

## Testing Structure

```
tests/adapters/
├── index.test.ts              # Registry tests
├── react/
│   └── adapter.test.ts        # React adapter tests (renamed from generator.test.ts)
└── universal/
    ├── adapter.test.ts         # Utility function tests
    ├── errors.test.ts          # Error handling tests
    └── validation.test.ts     # Validation tests
```

---

## Related Documents

- [ADAPTERS_ANALYSIS.md](./ADAPTERS_ANALYSIS.md) - Original analysis
- [ADAPTERS_IMPLEMENTATION.md](./ADAPTERS_IMPLEMENTATION.md) - Initial implementation
- [ADAPTERS_IMPROVEMENTS.md](./ADAPTERS_IMPROVEMENTS.md) - Enhancement details

---

**Status**: Structure finalized and consolidated ✅

