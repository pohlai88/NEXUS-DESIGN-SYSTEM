# Theme Engine MCP Integration Audit
## Next.js MCP | Figma MCP | ShadCN MCP Compatibility Review

**Date**: 2025-01-27  
**Context**: Audit of Theme Engine Evaluation against MCP integrations  
**Status**: ⚠️ **INTEGRATION GAPS IDENTIFIED**

---

## Executive Summary

The theme engine evaluation reveals **critical integration gaps** when considered in the context of Next.js MCP, Figma MCP, and ShadCN MCP. While the core architecture is sound, the current implementation will **fail** in Next.js Server Components, cannot sync with Figma variables, and won't affect ShadCN components that use Tailwind utilities.

**Priority**: **HIGH** - These gaps prevent production-ready integration with modern tooling.

---

## 1. Next.js MCP Integration Analysis

### Current State

**Theme Engine Implementation**:
```typescript
// themes/ThemeProvider.tsx
export function ThemeProvider({ children, initialTheme = 'default' }: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, createThemeContext());
  
  useEffect(() => {
    applyTheme(state.currentTheme); // ⚠️ Client-side only
  }, [state.currentTheme]);
}
```

**Issue**: `applyTheme()` manipulates `document.documentElement` directly, which:
- ❌ **Fails in Server Components** - No `document` object on server
- ❌ **Causes hydration mismatches** - Server renders default theme, client applies custom theme
- ❌ **No SSR support** - Theme preference not available during SSR

### Next.js MCP Considerations

#### Issue #1: Server Component Incompatibility

**Problem**: Theme engine requires client-side DOM manipulation, but Next.js 13+ defaults to Server Components.

**Current Code**:
```typescript
// themes/theme-machine.ts:140
export function applyTheme(theme: ThemeState): void {
  const root = document.documentElement; // ❌ Fails in Server Components
  // ...
}
```

**Impact**:
- Theme switching only works in Client Components (`'use client'`)
- Server-rendered HTML won't include theme variables
- Hydration mismatch warnings in development

**Solution Required**:
```typescript
// Enhanced ThemeProvider with SSR support
'use client'; // Required for theme engine

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Apply theme only after hydration
    applyTheme(state.currentTheme);
  }, [state.currentTheme]);
  
  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>; // Render without theme until hydrated
  }
  
  return <ThemeContextValue.Provider value={value}>{children}</ThemeContextValue.Provider>;
}
```

#### Issue #2: Theme Persistence & SSR

**Problem**: No mechanism to read theme preference from cookies/headers for SSR.

**Next.js MCP Pattern** (from Next.js 16):
```typescript
// app/layout.tsx
import { cookies } from 'next/headers';

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'default';
  
  return (
    <html data-theme={theme}>
      <body>{children}</body>
    </html>
  );
}
```

**Current Gap**: Theme engine doesn't support:
- Reading theme from cookies/headers
- Applying theme during SSR
- Syncing theme preference between server and client

**Required Enhancement**:
```typescript
// Server-side theme application
export async function getServerTheme(): Promise<string> {
  const cookies = await import('next/headers').then(m => m.cookies());
  return cookies.get('theme')?.value || 'default';
}

// Client-side sync
export function useServerThemeSync(serverTheme: string) {
  useEffect(() => {
    if (serverTheme !== 'default') {
      dispatch({ type: 'SWITCH_TO_CUSTOM', themeName: serverTheme });
    }
  }, [serverTheme]);
}
```

#### Issue #3: Tailwind v4 + Next.js Cache Components

**Problem**: Next.js 16 Cache Components may cache themed content incorrectly.

**Next.js MCP Cache Components Pattern**:
```typescript
// app/page.tsx
import { cache } from 'react';

const getThemedContent = cache(async () => {
  // This runs on server, theme not available
  return { content: '...' };
});
```

**Impact**: 
- Cached content may use default theme
- Theme changes won't invalidate cache
- Need `cacheTag()` integration for theme-aware caching

**Recommendation**: 
- Use `cacheTag('theme')` for theme-dependent content
- Invalidate cache on theme change: `revalidateTag('theme')`

### Next.js MCP Compatibility Score

| Aspect | Status | Notes |
|--------|--------|-------|
| Server Components | ❌ **FAIL** | Requires `'use client'` directive |
| SSR Theme Support | ❌ **FAIL** | No cookie/header reading |
| Hydration Safety | ⚠️ **PARTIAL** | Needs mounted check |
| Cache Components | ⚠️ **UNKNOWN** | No cache tag integration |
| App Router | ✅ **WORKS** | With `'use client'` |
| Pages Router | ✅ **WORKS** | Full client-side support |

**Overall Next.js MCP Score**: ⚠️ **40% Compatible** - Critical fixes needed

---

## 2. Figma MCP Integration Analysis

### Current State

**Design System Claims**: "100% Figma Compliant"

**Reality Check**:
- ✅ Static tokens match Figma standards
- ❌ **No runtime sync** with Figma variables
- ❌ **No Figma MCP integration** for token updates
- ❌ Theme engine doesn't use Figma variable names

### Figma MCP Considerations

#### Issue #1: No Figma Variable Sync

**Problem**: Theme engine cannot sync with Figma design tokens via Figma MCP.

**Figma MCP Capabilities** (from available tools):
- `get_variable_defs` - Get variable definitions from Figma
- `get_design_context` - Get design context with tokens
- `get_code_connect_map` - Map Figma nodes to code

**Current Gap**: 
- Theme engine uses hardcoded token mapping
- No mechanism to pull tokens from Figma
- Manual sync required (copy-paste from Figma)

**Required Integration**:
```typescript
// Figma MCP integration for theme engine
import { mcp_Figma_get_variable_defs } from '@figma/mcp';

export async function syncFigmaVariables(fileKey: string, nodeId: string) {
  const variables = await mcp_Figma_get_variable_defs({
    fileKey,
    nodeId
  });
  
  // Map Figma variables to Tailwind v4 tokens
  const theme: CustomTheme = {
    name: 'figma-sync',
    tokens: mapFigmaToTailwind(variables),
    cssVariables: mapFigmaToCSSVars(variables)
  };
  
  return theme;
}

function mapFigmaToTailwind(figmaVars: Record<string, string>) {
  // Map Figma variable names to Tailwind v4 token names
  return {
    'color-void': figmaVars['color/background'],
    'color-paper': figmaVars['color/surface'],
    'color-lux': figmaVars['color/text/primary'],
    // ... comprehensive mapping
  };
}
```

#### Issue #2: Variable Name Mismatch

**Problem**: Figma variables use different naming conventions than Tailwind v4.

**Figma Variable Format**:
```
color/background
color/text/primary
spacing/base
typography/font-family/sans
```

**Tailwind v4 Format** (from `input.css`):
```css
--color-void
--color-lux
--spacing-6
--font-family-sans
```

**Theme Engine Format** (current):
```typescript
--aibos-primary-color  // ❌ Doesn't match either
```

**Impact**: 
- Cannot directly use Figma variables
- Requires translation layer
- Manual mapping maintenance

**Solution**: Create bidirectional mapping:
```typescript
const FIGMA_TO_TAILWIND_MAP = {
  'color/background': '--color-void',
  'color/surface': '--color-paper',
  'color/text/primary': '--color-lux',
  'spacing/base': '--spacing-6',
  // ... comprehensive mapping
};

const TAILWIND_TO_FIGMA_MAP = Object.fromEntries(
  Object.entries(FIGMA_TO_TAILWIND_MAP).map(([k, v]) => [v, k])
);
```

#### Issue #3: No Design System Sync Workflow

**Problem**: No automated workflow to sync Figma → Code → Theme Engine.

**Ideal Workflow** (using Figma MCP):
1. Designer updates tokens in Figma
2. Developer runs sync command: `pnpm sync:figma`
3. Figma MCP fetches variables
4. Auto-generate theme from Figma variables
5. Update `@theme` block in `input.css`
6. Rebuild CSS

**Current State**: Manual process, no automation

**Required Implementation**:
```typescript
// scripts/sync-figma-tokens.ts
import { mcp_Figma_get_variable_defs } from '@figma/mcp';
import { writeFileSync } from 'fs';

export async function syncFigmaTokens(fileKey: string) {
  const variables = await mcp_Figma_get_variable_defs({ fileKey, nodeId: '0:1' });
  
  // Generate @theme block
  const themeBlock = generateThemeBlock(variables);
  
  // Update input.css
  updateInputCSS(themeBlock);
  
  // Generate theme engine mapping
  const themeMapping = generateThemeMapping(variables);
  writeFileSync('themes/figma-mapping.json', JSON.stringify(themeMapping, null, 2));
  
  console.log('✅ Figma tokens synced successfully');
}
```

### Figma MCP Compatibility Score

| Aspect | Status | Notes |
|--------|--------|-------|
| Variable Sync | ❌ **NOT IMPLEMENTED** | No Figma MCP integration |
| Name Mapping | ❌ **MISMATCH** | Different naming conventions |
| Design System Sync | ❌ **MANUAL** | No automated workflow |
| Code Connect | ⚠️ **PARTIAL** | Static mapping exists |
| Token Compliance | ✅ **STATIC** | Matches Figma standards (static) |

**Overall Figma MCP Score**: ⚠️ **20% Compatible** - Major integration needed

---

## 3. ShadCN MCP Integration Analysis

### Current State

**ShadCN Integration**: 
- ✅ 872 mappings (54 components → AIBOS classes)
- ✅ `shadcn-map.json` export available
- ✅ `components.json` configured
- ❌ **Theme engine doesn't affect ShadCN components**

### ShadCN MCP Considerations

#### Issue #1: ShadCN Uses Tailwind Utilities

**Problem**: ShadCN components use Tailwind utility classes that won't respond to theme engine.

**ShadCN Component Example**:
```tsx
// components/ui/button.tsx (typical ShadCN)
export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium", // Tailwind utilities
        "bg-primary text-primary-foreground", // Uses --color-primary
        className
      )}
      {...props}
    />
  );
}
```

**Current Theme Engine**: 
- Applies `--aibos-*` variables
- ShadCN expects `--color-primary`, `--color-primary-foreground`
- **Mismatch**: Theme changes won't affect ShadCN components

**Impact**: 
- ShadCN components remain themed to default
- Custom themes only affect `.na-*` classes
- Inconsistent theming across component library

#### Issue #2: ShadCN MCP Component Mapping

**ShadCN MCP Capabilities** (from available tools):
- `list_items_in_registries` - List available components
- `view_items_in_registries` - Get component details
- `get_item_examples_from_registries` - Get usage examples
- `get_add_command_for_items` - Get CLI add commands

**Current Gap**:
- Theme engine doesn't leverage ShadCN MCP
- No dynamic component theming
- Static mapping only

**Potential Integration**:
```typescript
// ShadCN MCP integration for theme-aware components
import { mcp_shadcn_view_items_in_registries } from '@shadcn/mcp';

export async function getThemedShadcnComponent(componentName: string, theme: ThemeState) {
  const component = await mcp_shadcn_view_items_in_registries({
    items: [`@shadcn/${componentName}`]
  });
  
  // Apply theme to component classes
  const themedClasses = applyThemeToShadcnClasses(
    component.classes,
    theme
  );
  
  return {
    ...component,
    classes: themedClasses
  };
}
```

#### Issue #3: CSS Variable Override Strategy

**Problem**: ShadCN uses CSS variables that need to be overridden, but theme engine uses wrong prefix.

**ShadCN Variable Pattern** (from `components.json`):
```json
{
  "tailwind": {
    "cssVariables": true  // Uses --color-* format
  }
}
```

**ShadCN Expected Variables**:
```css
--color-background
--color-foreground
--color-primary
--color-primary-foreground
--color-card
--color-card-foreground
```

**Theme Engine Applies**:
```typescript
--aibos-primary-color  // ❌ Wrong format
```

**Required Fix**: Map theme engine tokens to ShadCN variables:
```typescript
const SHADCN_VARIABLE_MAP = {
  '--color-background': '--color-void',
  '--color-foreground': '--color-lux',
  '--color-primary': '--color-gold',
  '--color-primary-foreground': '--color-void',
  '--color-card': '--color-paper',
  '--color-card-foreground': '--color-lux',
  // ... comprehensive mapping
};

export function applyThemeToShadcn(theme: ThemeState): void {
  const root = document.documentElement;
  
  if (theme.mode === 'custom') {
    Object.entries(SHADCN_VARIABLE_MAP).forEach(([shadcnVar, tailwindVar]) => {
      const value = getThemeTokenValue(theme, tailwindVar);
      root.style.setProperty(shadcnVar, value);
    });
  }
}
```

### ShadCN MCP Compatibility Score

| Aspect | Status | Notes |
|--------|--------|-------|
| Component Mapping | ✅ **EXISTS** | 872 static mappings |
| Theme Override | ❌ **FAILS** | Wrong variable prefix |
| MCP Integration | ❌ **NOT USED** | No ShadCN MCP calls |
| CSS Variable Sync | ❌ **MISMATCH** | Different formats |
| Component Theming | ⚠️ **PARTIAL** | Only `.na-*` classes work |

**Overall ShadCN MCP Score**: ⚠️ **30% Compatible** - Variable mapping critical

---

## 4. Combined Integration Impact

### Critical Path Dependencies

```
Figma MCP → Token Sync → Tailwind v4 @theme → Theme Engine → Next.js SSR → ShadCN Components
    ❌            ❌              ✅              ⚠️            ❌            ❌
```

**Current State**: Only Tailwind v4 static integration works. All runtime/MCP integrations fail.

### Integration Priority Matrix

| Integration | Priority | Effort | Impact | Status |
|-------------|----------|--------|--------|--------|
| **Tailwind v4 Token Mapping** | 🔴 **CRITICAL** | Medium | High | ⚠️ Partial |
| **Next.js SSR Support** | 🔴 **CRITICAL** | Medium | High | ❌ Missing |
| **ShadCN Variable Override** | 🟠 **HIGH** | Low | High | ❌ Missing |
| **Figma MCP Sync** | 🟡 **MEDIUM** | High | Medium | ❌ Missing |
| **ShadCN MCP Integration** | 🟢 **LOW** | Medium | Low | ❌ Missing |

---

## 5. Recommended Fixes

### Fix #1: Unified Token Mapping System (CRITICAL)

**Create single source of truth for all token mappings**:

```typescript
// themes/token-registry.ts
export const TOKEN_REGISTRY = {
  // Tailwind v4 tokens (from @theme)
  tailwind: {
    '--color-void': '--color-void',
    '--color-paper': '--color-paper',
    '--color-lux': '--color-lux',
    // ... all 254 tokens
  },
  
  // ShadCN variables
  shadcn: {
    '--color-background': '--color-void',
    '--color-foreground': '--color-lux',
    '--color-primary': '--color-gold',
    // ... all ShadCN variables
  },
  
  // Figma variable mapping
  figma: {
    'color/background': '--color-void',
    'color/surface': '--color-paper',
    'color/text/primary': '--color-lux',
    // ... all Figma variables
  }
};

// Enhanced applyTheme with unified mapping
export function applyTheme(theme: ThemeState): void {
  const root = document.documentElement;
  
  if (theme.mode === 'custom') {
    // Apply to Tailwind v4 tokens
    applyTailwindTokens(root, theme, TOKEN_REGISTRY.tailwind);
    
    // Apply to ShadCN variables
    applyShadcnVariables(root, theme, TOKEN_REGISTRY.shadcn);
    
    // Apply custom CSS variables
    if (theme.theme.cssVariables) {
      Object.entries(theme.theme.cssVariables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }
}
```

### Fix #2: Next.js SSR Support (CRITICAL)

**Add server-side theme support**:

```typescript
// themes/ThemeProvider.tsx
'use client';

import { useEffect, useState } from 'react';
import { useCookies } from 'next/headers'; // For client-side cookie access

export function ThemeProvider({ 
  children, 
  initialTheme,
  serverTheme 
}: ThemeProviderProps & { serverTheme?: string }) {
  const [mounted, setMounted] = useState(false);
  const [state, dispatch] = useReducer(themeReducer, createThemeContext());
  
  // Sync with server theme
  useEffect(() => {
    if (serverTheme && serverTheme !== 'default') {
      dispatch({ type: 'SWITCH_TO_CUSTOM', themeName: serverTheme });
    }
  }, [serverTheme]);
  
  // Apply theme after hydration
  useEffect(() => {
    setMounted(true);
    applyTheme(state.currentTheme);
    
    // Persist to cookie
    document.cookie = `theme=${state.currentTheme.mode === 'custom' ? state.currentTheme.theme.name : 'default'}; path=/`;
  }, [state.currentTheme]);
  
  if (!mounted) {
    return <>{children}</>; // Prevent hydration mismatch
  }
  
  return <ThemeContextValue.Provider value={value}>{children}</ThemeContextValue.Provider>;
}
```

### Fix #3: Figma MCP Integration (MEDIUM)

**Add Figma sync capability**:

```typescript
// themes/figma-sync.ts
import { mcp_Figma_get_variable_defs } from '@figma/mcp';

export async function syncFigmaTheme(
  fileKey: string, 
  nodeId: string
): Promise<CustomTheme> {
  const variables = await mcp_Figma_get_variable_defs({ fileKey, nodeId });
  
  return {
    name: 'figma-sync',
    tokens: mapFigmaToTailwind(variables),
    cssVariables: mapFigmaToShadcn(variables)
  };
}
```

---

## 6. Conclusion

### Current State Summary

| Integration | Compatibility | Critical Issues |
|-------------|---------------|-----------------|
| **Tailwind v4** | ⚠️ 60% | Variable name mismatch |
| **Next.js MCP** | ⚠️ 40% | No SSR support, hydration issues |
| **Figma MCP** | ⚠️ 20% | No sync, name mismatch |
| **ShadCN MCP** | ⚠️ 30% | Variable override fails |

### Required Actions

1. **Immediate** (Critical Path):
   - ✅ Fix Tailwind v4 token mapping (from Theme Engine Evaluation)
   - ✅ Add Next.js SSR support
   - ✅ Fix ShadCN variable override

2. **Short-term** (High Value):
   - Add Figma MCP sync workflow
   - Create unified token registry
   - Add integration tests

3. **Long-term** (Nice to Have):
   - ShadCN MCP component theming
   - Automated design system sync
   - Theme preview system

### Estimated Effort

- **Critical Fixes**: 8-12 hours
- **High-Value Features**: 16-24 hours
- **Long-term Enhancements**: 32-40 hours

**Total**: ~56-76 hours for full MCP integration

---

**Next Steps**:
1. Implement unified token registry (Fix #1)
2. Add Next.js SSR support (Fix #2)
3. Fix ShadCN variable override (Fix #3)
4. Add integration tests for all MCP scenarios

