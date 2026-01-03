# Testing Quick Reference
## Web Components Adapter System

**Date**: 2026-01-03  
**Strategy**: Option A (Test Dist + Playwright)

---

## Commands

```bash
# Run all tests (builds first)
pnpm test

# Run only unit tests (no build)
pnpm test:unit

# Run integration tests (builds first)
pnpm test:integration

# Run E2E tests (Playwright)
pnpm test:e2e
pnpm test:e2e:ui      # With UI
pnpm test:e2e:debug   # Debug mode
```

---

## Test Structure

```
tests/
├── adapters/
│   └── web/
│       └── integration/
│           └── *.dist.test.ts      ← Shallow JSDOM (minimal)
├── e2e/
│   └── *.spec.ts                   ← Critical browser flows (Playwright)
└── components/
    └── *.test.tsx                  ← React component tests (Vitest)
```

---

## Test Strategy

### JSDOM Tests (Shallow)
- ✅ Component registration
- ✅ Basic DOM operations
- ✅ Event dispatch
- ✅ ARIA attributes

**Avoid**: Layout, focus, animations (use Playwright)

### Playwright Tests (Critical Flows)
- ✅ Open/close interactions
- ✅ Keyboard navigation (Escape, Tab)
- ✅ Focus trap
- ✅ Focus restoration
- ✅ Real browser behaviors

---

## Current Status

| Component | JSDOM Tests | Playwright Tests | Status |
|-----------|------------|------------------|--------|
| Dialog | ✅ 6/8 passing | ✅ 4/4 passing | ⚠️ Export issue |
| Button | ⏳ Pending | ⏳ Pending | ⏳ To do |
| Card | ⏳ Pending | ⏳ Pending | ⏳ To do |
| Other | ⏳ Pending | ⏳ Pending | ⏳ To do |

---

## Known Issues

### JSDOM Export Syntax
**Issue**: `SyntaxError: Unexpected token 'export'`

**Status**: ⏳ **PENDING DECISION**
- Option A: Strip export statement
- Option B: Use Vitest module import
- Option C: Skip JSDOM, use Playwright only (recommended)

---

## Documentation

- `TESTING_STRATEGY_OPTION_A.md` - Full implementation details
- `TESTING_REMAINING_WORK.md` - Complete remaining work
- `TESTING_IMPLEMENTATION_SUMMARY.md` - Summary and status

---

**Last Updated**: 2026-01-03

