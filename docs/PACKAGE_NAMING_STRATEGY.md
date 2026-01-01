# Package Naming Strategy: @aibos Organization

## Current Situation

### Package Migration
- **Old Package**: `aibos-design-system` (deprecated)
- **New Package**: `@aibos/design-system` (current)
  - Pure CSS tokens and classes
  - No React dependencies
  - Framework-agnostic
  - Design tokens (JSON + TypeScript)

## Relationship

These are **complementary packages**:

```
aibos-ui (React Components)
    ↓ uses
aibos-design-system (CSS Styling)
```

- **`aibos-ui`** = React components (the "what")
- **`aibos-design-system`** = CSS styling/tokens (the "how it looks")

## Recommended Naming

### Option 1: Keep Separate Names (Recommended) ✅

**Current:**
- `aibos-ui` - React components
- `aibos-design-system` - CSS design system

**Pros:**
- ✅ Clear separation of concerns
- ✅ Users can use design system without React
- ✅ Design system is framework-agnostic
- ✅ No naming conflicts

**Usage:**
```bash
# Use design system only
npm install aibos-design-system

# Use React components (which may depend on design system)
npm install aibos-ui
```

### ✅ Option 2: Use Scoped Names (IMPLEMENTED)

**Current:**
- `@aibos/design-system` - CSS design system

**Pros:**
- ✅ Professional organization scope
- ✅ Clear grouping under @aibos
- ✅ Better for branding
- ✅ Prevents naming conflicts

### Option 3: Rename to Avoid Confusion

**Alternative:**
- `aibos-ui` - React components (keep as is)
- `aibos-design-tokens` or `aibos-styles` - CSS design system

**Pros:**
- ✅ Very clear what each package does

**Cons:**
- ❌ Less descriptive name

## Recommendation

**✅ MIGRATED TO `@aibos/design-system`** - The scoped package name provides:

1. ✅ Professional organization branding
2. ✅ Clear grouping under @aibos organization
3. ✅ Prevents naming conflicts
4. ✅ Better for enterprise adoption

## Usage Examples

### Using Design System
```bash
npm install @aibos/design-system
```

```tsx
import '@aibos/design-system/css';

<div className="na-card na-p-6">
  <h1 className="na-h1">Title</h1>
</div>
```

## Migration from Old Package

If you're using the old `aibos-design-system` package:

1. **Update package.json:**
   ```bash
   npm uninstall aibos-design-system
   npm install @aibos/design-system
   ```

2. **Update imports:**
   ```tsx
   // Old
   import 'aibos-design-system/css';
   import { StatusIndicator } from 'aibos-design-system/react';
   
   // New
   import '@aibos/design-system/css';
   import { StatusIndicator } from '@aibos/design-system/react';
   ```

3. **The old package is deprecated** - See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for complete migration instructions.

## Conclusion

**✅ Package migrated to `@aibos/design-system`** - The scoped organization package provides better branding and prevents naming conflicts.

---

**Ready to use?** Install `@aibos/design-system` and start building!

