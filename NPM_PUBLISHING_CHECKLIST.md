# npm Publishing Checklist

**Package**: `@aibos/design-system`  
**Version**: 1.1.0  
**Date**: 2026-01-03  
**Status**: ✅ Ready for Publishing

---

## Pre-Publish Verification

### ✅ Package Configuration

- [x] **package.json** is correctly configured
  - [x] Package name: `@aibos/design-system`
  - [x] Version: `1.1.0`
  - [x] Description is accurate
  - [x] Keywords are relevant
  - [x] Author and license are set
  - [x] Repository URL is correct
  - [x] Homepage URL is correct
  - [x] Bugs URL is correct

- [x] **Exports** are properly configured
  - [x] Main entry: `./style.css`
  - [x] Types entry: `./dist/types/index.d.ts`
  - [x] All exports have proper paths
  - [x] React components export: `./react`
  - [x] Utils export: `./utils`
  - [x] Tokens export: `./tokens`
  - [x] Theme exports are configured

- [x] **Files** array includes all necessary files
  - [x] `style.css` (compiled CSS)
  - [x] `input.css` (source CSS)
  - [x] `components.json` (shadcn config)
  - [x] `dist/**/*` (all compiled files)
  - [x] `README.md`
  - [x] Documentation files
  - [x] `LICENSE`

- [x] **Dependencies** are correctly configured
  - [x] Runtime dependencies (Radix UI packages)
  - [x] Peer dependencies (React, React DOM, NextUI)
  - [x] Dev dependencies are not included

### ✅ Build Verification

- [ ] **Run clean build**
  ```bash
  pnpm build
  ```

- [ ] **Verify build output exists**
  - [ ] `style.css` exists and is not empty
  - [ ] `dist/` directory contains all compiled files
  - [ ] `dist/components/react/` has all React components
  - [ ] `dist/types/` has all TypeScript definitions
  - [ ] `dist/tokens.json` exists
  - [ ] `dist/api-docs.json` exists
  - [ ] `dist/shadcn-map.json` exists

- [ ] **TypeScript compilation**
  ```bash
  pnpm build:ts
  ```
  - [ ] No TypeScript errors
  - [ ] All `.d.ts` files are generated

### ✅ Quality Checks

- [ ] **Linting** (excluding storybook-static)
  ```bash
  pnpm lint
  ```
  - [ ] No critical errors
  - [ ] Warnings in storybook-static are acceptable (excluded from package)

- [ ] **Design token validation**
  ```bash
  pnpm validate
  ```
  - [ ] All tokens are valid

- [ ] **Semantic enforcement** (optional, may have warnings)
  ```bash
  pnpm enforce:semantics
  ```

### ✅ File Exclusions

- [x] **.npmignore** is configured
  - [x] Excludes `storybook-static/`
  - [x] Excludes `transformed-dialog-debug.js`
  - [x] Excludes development files
  - [x] Excludes test files
  - [x] Excludes source maps (if any)

### ✅ Documentation

- [x] **README.md** is up-to-date
  - [x] Installation instructions
  - [x] Usage examples
  - [x] API reference links
  - [x] Component documentation

- [x] **LICENSE** file exists (MIT License)

- [x] **Documentation files** are included
  - [x] `docs/API_REFERENCE.md`
  - [x] `docs/COMPONENTS.md`
  - [x] `docs/TOKEN_REFERENCE.md`

---

## Publishing Steps

### 1. Final Build

```bash
# Clean and rebuild everything
pnpm build
```

### 2. Verify Package Contents

```bash
# Check what will be published
npm pack --dry-run
```

Review the output to ensure:
- ✅ Only necessary files are included
- ✅ No development files are included
- ✅ All dist files are present
- ✅ Documentation is included

### 3. Test Package Locally (Optional)

```bash
# Create a test package
npm pack

# In a test project, install the local package
npm install ../AIBOS-DESIGN-SYSTEM/aibos-design-system-1.1.0.tgz

# Test imports
# import '@aibos/design-system/css'
# import { Button } from '@aibos/design-system/react'
```

### 4. Version Check

```bash
# Verify current version
npm view @aibos/design-system version

# Ensure version is not already published
npm view @aibos/design-system@1.1.0
```

### 5. Publish to npm

#### Option A: Manual Publish

```bash
# Login to npm (if not already)
npm login

# Publish
npm publish --access public
```

#### Option B: Using PowerShell Script

```powershell
# Run the publish script
.\scripts\publish-npm.ps1
```

#### Option C: Using GitHub Actions

1. Create a new release on GitHub
2. Or use workflow_dispatch with version number

---

## Post-Publish Verification

### 1. Verify Package on npm

- [ ] Visit: https://www.npmjs.com/package/@aibos/design-system
- [ ] Verify version is published
- [ ] Check package size
- [ ] Verify README is displayed correctly

### 2. Test Installation

```bash
# In a clean directory
npm install @aibos/design-system

# Verify installation
ls node_modules/@aibos/design-system/
```

### 3. Test Imports

```typescript
// Test CSS import
import '@aibos/design-system/css'

// Test React components
import { Button, Card } from '@aibos/design-system/react'

// Test tokens
import tokens from '@aibos/design-system/tokens'

// Test utils
import { cn } from '@aibos/design-system/utils'

// Test themes
import { ThemeProvider } from '@aibos/design-system/themes'
```

### 4. Verify TypeScript Types

```typescript
// TypeScript should recognize all types
import type { DesignTokens } from '@aibos/design-system/tokens/typescript'
import type { ShadcnMap } from '@aibos/design-system/shadcn-map/typescript'
```

---

## Common Issues & Solutions

### Issue: "Package already exists"

**Solution**: Bump version in `package.json`
```bash
npm version patch  # 1.1.0 -> 1.1.1
npm version minor  # 1.1.0 -> 1.2.0
npm version major  # 1.1.0 -> 2.0.0
```

### Issue: "Missing files in package"

**Solution**: Check `package.json` "files" array includes all necessary paths

### Issue: "TypeScript errors in published package"

**Solution**: Ensure `pnpm build:ts` completes without errors before publishing

### Issue: "Package too large"

**Solution**: 
- Verify `.npmignore` excludes unnecessary files
- Check `storybook-static/` is excluded
- Remove any large test files

### Issue: "Import errors after installation"

**Solution**:
- Verify `exports` in `package.json` are correct
- Check file paths in `dist/` match export paths
- Ensure TypeScript declarations are generated

---

## Package Contents Summary

### Included Files

- ✅ `style.css` - Compiled CSS (main entry)
- ✅ `input.css` - Source CSS
- ✅ `components.json` - shadcn/ui configuration
- ✅ `dist/` - All compiled TypeScript and generated files
  - `dist/components/react/` - React components
  - `dist/types/` - TypeScript definitions
  - `dist/tokens.json` - Design tokens
  - `dist/api-docs.json` - API documentation
  - `dist/shadcn-map.json` - shadcn/ui mapping
  - All other generated files
- ✅ `README.md` - Package documentation
- ✅ `docs/API_REFERENCE.md` - API reference
- ✅ `docs/COMPONENTS.md` - Component reference
- ✅ `docs/TOKEN_REFERENCE.md` - Token reference
- ✅ `LICENSE` - MIT License

### Excluded Files

- ❌ `storybook-static/` - Storybook build output
- ❌ `prototypes/` - Development prototypes
- ❌ `scripts/` - Build scripts
- ❌ `tests/` - Test files
- ❌ `node_modules/` - Dependencies
- ❌ `transformed-dialog-debug.js` - Debug file
- ❌ Source TypeScript files (only compiled output)
- ❌ Development configuration files

---

## Version History

- **1.1.0** (Current) - Production-ready with React components, themes, and shadcn/ui integration
- **1.0.0** - Initial release

---

## Next Steps After Publishing

1. ✅ Update GitHub release notes
2. ✅ Announce on project channels
3. ✅ Update documentation if needed
4. ✅ Monitor npm package downloads
5. ✅ Address any issues reported by users

---

**Status**: ✅ Ready for Publishing

**Last Updated**: 2026-01-03

