# Publishing Checklist - Design-to-Code Engine

**Version**: 2.1.0  
**Date**: 2025-01-27

---

## Pre-Publish Checklist

### ✅ Component Specifications

- [ ] All component specs in `specs/components/` are valid JSON
- [ ] All specs pass validation: `pnpm validate:specs`
- [ ] Component names are PascalCase and not reserved keywords
- [ ] All variants have `aibosClasses` arrays
- [ ] Props have proper TypeScript types
- [ ] Descriptions included for JSDoc

### ✅ Build Configuration

- [ ] `package.json` has correct `packageName` in build script
- [ ] `utilsPath` matches actual utils export path
- [ ] `cssPath` matches actual CSS export path
- [ ] All paths resolve correctly in generated code

### ✅ Runtime Dependencies

- [ ] `clsx` in `dependencies` or `peerDependencies`
- [ ] `tailwind-merge` in `dependencies` or `peerDependencies`
- [ ] `react` and `react-dom` in `peerDependencies`
- [ ] Radix UI packages in `dependencies` (if using)

### ✅ Package Exports

- [ ] `./react` exports generated components
- [ ] `./utils` exports utility functions (`cn`, etc.)
- [ ] `./css` exports CSS file
- [ ] All exports have TypeScript types

### ✅ Generated Components

- [ ] All components build successfully: `pnpm build:components`
- [ ] Generated code has no syntax errors
- [ ] TypeScript compiles: `pnpm build:ts`
- [ ] All imports resolve correctly
- [ ] Components work at runtime

### ✅ Testing

- [ ] Generated components tested in real application
- [ ] All variants work correctly
- [ ] States (disabled, loading) work correctly
- [ ] Radix UI components work (if applicable)
- [ ] TypeScript types are correct

---

## Build Commands

### Development Workflow

```bash
# 1. Validate specs
pnpm validate:specs

# 2. Build components
pnpm build:components

# 3. Build TypeScript
pnpm build:ts

# 4. Full build
pnpm build
```

### Production Build

```bash
# Complete production build
pnpm build:prod
```

---

## Verification Steps

### 1. Check Generated Files

```bash
ls -la dist/components/react/
```

Should see:
- Component `.tsx` files
- `index.ts` with exports
- TypeScript declaration files (after `build:ts`)

### 2. Verify Imports

Check generated component imports:

```typescript
// Should resolve
import { cn } from '@aibos/design-system/utils';
import '@aibos/design-system/css';
```

### 3. Test in Application

```typescript
import { Button } from '@aibos/design-system/react';

// Should work
<Button variant="primary">Click me</Button>
```

### 4. Check TypeScript

```bash
# Should compile without errors
pnpm build:ts
```

---

## Common Issues

### Issue: "Cannot find module '@aibos/design-system/utils'"

**Check**:
- [ ] `package.json` exports `./utils`
- [ ] `dist/components/utils.js` exists
- [ ] `dist/components/utils.d.ts` exists

**Fix**:
```json
{
  "exports": {
    "./utils": {
      "types": "./dist/components/utils.d.ts",
      "import": "./dist/components/utils.js"
    }
  }
}
```

### Issue: "Missing dependency: clsx"

**Check**:
- [ ] `clsx` in `package.json` dependencies
- [ ] `tailwind-merge` in `package.json` dependencies

**Fix**:
```bash
pnpm add clsx tailwind-merge
```

### Issue: Generated component has syntax errors

**Check**:
- [ ] Spec JSON is valid
- [ ] Component name is valid (not reserved keyword)
- [ ] Variants have `aibosClasses` arrays

**Fix**:
```bash
pnpm validate:specs
```

---

## Publishing Steps

1. **Validate**: `pnpm validate:specs`
2. **Build**: `pnpm build`
3. **Test**: Verify generated components work
4. **Publish**: `npm publish` (or `pnpm publish`)

---

## Post-Publish Verification

After publishing, verify:

1. Package installs correctly: `npm install @aibos/design-system`
2. Imports resolve: `import { Button } from '@aibos/design-system/react'`
3. Utils work: `import { cn } from '@aibos/design-system/utils'`
4. CSS loads: `import '@aibos/design-system/css'`
5. TypeScript types work

---

**Status**: Ready for publishing ✅

