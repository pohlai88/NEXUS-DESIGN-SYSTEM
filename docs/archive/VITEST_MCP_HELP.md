# Vitest MCP Help - Import Resolution Issue

## Problem

The adapter generator test (`tests/adapters/web/generator/adapter.test.ts`) cannot be discovered because Vite cannot resolve the import:

```typescript
import { generateWebComponent, webAdapter } from '../../../adapters/web/adapter.js';
```

The file exists as `adapters/web/adapter.ts`, but TypeScript ESM requires `.js` extensions in imports.

## Current Status

- ✅ **Runtime tests**: 43/43 passing
- ✅ **Most integration tests**: Passing
- ❌ **Adapter generator test**: Cannot be discovered due to import resolution

## Solution Options

### Option 1: Use Vite Plugin (Recommended)
Add a Vite plugin that resolves `.js` imports to `.ts` files:

```typescript
const resolveJsToTs = () => ({
  name: 'resolve-js-to-ts',
  resolveId(id: string, importer?: string) {
    if (id.endsWith('.js') && importer) {
      const tsId = id.replace(/\.js$/, '.ts');
      // Try to resolve .ts version
      return this.resolve(tsId, importer, { skipSelf: true });
    }
    return null;
  }
});
```

### Option 2: Build TypeScript First
Build the TypeScript files before running tests so `.js` files exist in `dist/`.

### Option 3: Change Import Strategy
Use a different import approach that doesn't require `.js` extension (may break TypeScript ESM compliance).

## Test Results Summary

**Total**: 226 tests
- ✅ **Passed**: 205
- ❌ **Failed**: 21
  - Adapter generator test: Import resolution
  - Some integration tests: Component generation differences
  - Focus trap tests: Test expectations

## Next Steps

1. Implement Vite plugin for `.js` → `.ts` resolution
2. Verify adapter generator tests run
3. Fix remaining test failures
4. Complete Phase 2 gate requirements

---

**Last Updated**: 2026-01-03

