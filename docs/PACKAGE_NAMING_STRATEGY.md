# Package Naming Strategy: aibos-ui vs aibos-design-system

## Current Situation

### Existing Package
- **`aibos-ui`** (v0.1.3) - React component library
  - React components with Radix UI
  - TypeScript, Tailwind CSS
  - 34 dependencies
  - Published 2 months ago

### New Package (This Repo)
- **`aibos-design-system`** - CSS design system
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

### Option 2: Use Scoped Names

**Alternative:**
- `@aibos/ui` - React components
- `@aibos/design-system` - CSS design system

**Pros:**
- ✅ Professional organization scope
- ✅ Clear grouping under @aibos
- ✅ Better for branding

**Cons:**
- ❌ Requires creating @aibos organization on npm
- ❌ More setup needed

### Option 3: Rename to Avoid Confusion

**Alternative:**
- `aibos-ui` - React components (keep as is)
- `aibos-design-tokens` or `aibos-styles` - CSS design system

**Pros:**
- ✅ Very clear what each package does

**Cons:**
- ❌ Less descriptive name

## Recommendation

**Keep `aibos-design-system`** - It's the perfect name because:

1. ✅ Clearly indicates it's a design system
2. ✅ Different from `aibos-ui` (components vs styling)
3. ✅ Users understand the relationship:
   - `aibos-ui` = React components
   - `aibos-design-system` = CSS styling that can be used with any framework

## Usage Examples

### Using Design System Only
```bash
npm install aibos-design-system
```

```tsx
import 'aibos-design-system/css';

<div className="na-card na-p-6">
  <h1 className="na-h1">Title</h1>
</div>
```

### Using with aibos-ui
```bash
npm install aibos-ui aibos-design-system
```

```tsx
import 'aibos-design-system/css';
import { Button } from 'aibos-ui';

<Button className="na-btn-primary">Click me</Button>
```

## Conclusion

**Keep the name `aibos-design-system`** - it's perfect as-is! The two packages serve different purposes and complement each other.

---

**Ready to publish?** The name `aibos-design-system` is good to go!

