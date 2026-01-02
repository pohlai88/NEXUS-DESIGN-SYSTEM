# Developer Guide - Theme System

**For**: Developers implementing themes in their applications  
**Status**: ✅ **Production Ready**

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Theme Architecture](#theme-architecture)
3. [Creating Custom Themes](#creating-custom-themes)
4. [Next.js Integration](#nextjs-integration)
5. [Framework Integration](#framework-integration)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [API Reference](#api-reference)

---

## Quick Start

### Installation

```bash
npm install @aibos/design-system
```

### Basic Setup

```tsx
// app.tsx or _app.tsx
import { ThemeProvider } from '@aibos/design-system/themes';
import '@aibos/design-system/css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Switch Themes

```tsx
import { useThemeSwitch } from '@aibos/design-system/themes';

function ThemeSwitcher() {
  const { switchToDefault, switchToCustom } = useThemeSwitch();
  
  return (
    <div>
      <button onClick={() => switchToDefault()}>Default</button>
      <button onClick={() => switchToCustom('light')}>Light</button>
    </div>
  );
}
```

---

## Theme Architecture

### Core Components

1. **Theme Machine** (`theme-machine.ts`)
   - State management
   - Theme application logic
   - Type-safe theme state

2. **Theme Provider** (`ThemeProvider.tsx`)
   - React context provider
   - SSR support
   - Cookie persistence

3. **Token Registry** (`token-registry.ts`)
   - Maps tokens to CSS variables
   - Tailwind v4, ShadCN, Figma compatibility

4. **SSR Utils** (`ssr-utils.ts`)
   - Next.js server utilities
   - Cookie management

### Data Flow

```
User Action → ThemeProvider → Theme Machine → Token Registry → CSS Variables → DOM
```

---

## Creating Custom Themes

### Theme Structure

```typescript
import { CustomTheme } from '@aibos/design-system/themes';

const myTheme: CustomTheme = {
  name: 'my-theme',
  tokens: {
    // Required: Base palette
    void: '#1a1a1a',              // Main background
    paper: '#2a2a2a',             // Surface background
    paper2: '#3a3a3a',            // Panel background
    paperHover: '#4a4a4a',        // Hover state
    white: '#ffffff',             // Pure white
    lux: '#ffffff',               // Primary text
    luxDim: '#cccccc',            // Secondary text
    clay: '#999999',              // Meta/label text
    
    // Required: Primary color
    gold: '#ff6b6b',              // Accent/primary
    primary: '#ff6b6b',           // Maps to --color-primary
    primaryForeground: '#1a1a1a', // Text on primary
    
    // Required: Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#f43f5e',
    info: '#3b82f6',
    
    // Required: Strokes
    stroke: '#3a3a3a',
    strokeStrong: '#4a4a4a',
    strokeSoft: '#2a2a2a',
    
    // Required: Semantic mappings
    background: '#1a1a1a',
    foreground: '#ffffff',
    muted: '#3a3a3a',
    mutedForeground: '#999999',
    card: '#2a2a2a',
    cardForeground: '#ffffff',
    popover: '#2a2a2a',
    popoverForeground: '#ffffff',
    border: '#3a3a3a',
    input: '#3a3a3a',
    destructive: '#f43f5e',
    destructiveForeground: '#ffffff',
    ring: '#ff6b6b',
    
    // Optional: Additional tokens
    secondary: '#3a3a3a',
    secondaryForeground: '#ffffff',
    accent: '#3a3a3a',
    accentForeground: '#ffffff',
    
    // Sidebar (optional)
    sidebarBackground: '#1a1a1a',
    sidebarForeground: '#cccccc',
    sidebarPrimary: '#ffffff',
    sidebarPrimaryForeground: '#1a1a1a',
    sidebarAccent: '#3a3a3a',
    sidebarAccentForeground: '#ffffff',
    sidebarBorder: '#3a3a3a',
    sidebarRing: '#ff6b6b',
  },
  cssVariables: {
    // Optional: Custom CSS variables
    '--custom-glow': '0 0 20px rgba(255, 107, 107, 0.3)',
  },
};
```

### Using Custom Theme

```tsx
import { ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[myTheme]}>
  <App />
</ThemeProvider>
```

---

## Next.js Integration

### App Router Setup

```tsx
// app/layout.tsx
import { ThemeProvider } from '@aibos/design-system/themes';
import { getThemeFromCookiesSSR } from '@aibos/design-system/themes/ssr-utils';
import '@aibos/design-system/css';

export default async function RootLayout({ children }) {
  const serverTheme = getThemeFromCookiesSSR();
  
  return (
    <html>
      <body>
        <ThemeProvider
          initialTheme={serverTheme || 'default'}
          serverTheme={serverTheme}
          persistToCookie={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Pages Router Setup

```tsx
// pages/_app.tsx
import { ThemeProvider } from '@aibos/design-system/themes';
import '@aibos/design-system/css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider persistToCookie={true}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Middleware (Optional)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const theme = request.cookies.get('app-theme')?.value || 'default';
  
  // Add theme to headers for server components
  const response = NextResponse.next();
  response.headers.set('x-theme', theme);
  
  return response;
}
```

---

## Framework Integration

### React (Create React App)

```tsx
// src/index.tsx
import { ThemeProvider } from '@aibos/design-system/themes';
import '@aibos/design-system/css';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
```

### Vue 3

```vue
<!-- main.ts -->
<script setup>
import { ThemeProvider } from '@aibos/design-system/themes';
import '@aibos/design-system/css';
</script>

<template>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</template>
```

### Svelte

```svelte
<!-- App.svelte -->
<script>
  import { ThemeProvider } from '@aibos/design-system/themes';
  import '@aibos/design-system/css';
</script>

<ThemeProvider>
  <slot />
</ThemeProvider>
```

---

## Testing

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest';
import { lightTheme } from '@aibos/design-system/themes';

describe('Light Theme', () => {
  it('should have correct primary color', () => {
    expect(lightTheme.tokens.primary).toBe('#d97706');
  });
  
  it('should have all required tokens', () => {
    expect(lightTheme.tokens.void).toBeDefined();
    expect(lightTheme.tokens.paper).toBeDefined();
    expect(lightTheme.tokens.primary).toBeDefined();
  });
});
```

### Integration Tests

```typescript
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useThemeSwitch } from '@aibos/design-system/themes';

test('theme switching works', () => {
  render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
  
  const button = screen.getByText('Light');
  fireEvent.click(button);
  
  // Verify theme applied
  expect(document.documentElement.getAttribute('data-theme')).toBe('light');
});
```

### E2E Tests

```typescript
// Playwright example
test('theme persists across page reload', async ({ page }) => {
  await page.goto('/');
  await page.click('button:has-text("Light")');
  await page.reload();
  
  const theme = await page.evaluate(() => 
    document.documentElement.getAttribute('data-theme')
  );
  
  expect(theme).toBe('light');
});
```

---

## Troubleshooting

### Theme Not Applying

**Problem**: Theme changes but UI doesn't update.

**Solutions**:
1. Check CSS is imported: `import '@aibos/design-system/css'`
2. Verify ThemeProvider wraps your app
3. Check browser console for errors
4. Ensure theme name matches exactly

### SSR Issues

**Problem**: Theme flashes or doesn't match server.

**Solutions**:
1. Use `getThemeFromCookiesSSR()` in server components
2. Pass `serverTheme` prop to ThemeProvider
3. Ensure cookies are enabled
4. Check Next.js version (16+ recommended)

### Colors Not Updating

**Problem**: Some colors don't change with theme.

**Solutions**:
1. Check token registry mappings
2. Verify CSS variables are being set
3. Check for CSS specificity issues
4. Use semantic tokens, not hardcoded colors

### TypeScript Errors

**Problem**: Type errors with theme types.

**Solutions**:
1. Import types from `@aibos/design-system/themes`
2. Use `CustomTheme` type for custom themes
3. Check TypeScript version (5.0+ recommended)

---

## API Reference

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: 'default' | string;
  serverTheme?: string;
  customThemes?: CustomTheme[];
  persistToCookie?: boolean;
}
```

### Hooks

#### useThemeSwitch()

```typescript
const { switchToDefault, switchToCustom } = useThemeSwitch();

// Switch to default theme
switchToDefault();

// Switch to custom theme
switchToCustom('light');
```

#### useCurrentTheme()

```typescript
const currentTheme = useCurrentTheme();
// Returns: 'default' | 'light' | string
```

#### useAvailableThemes()

```typescript
const themes = useAvailableThemes();
// Returns: string[] - ['default', 'light', ...]
```

### SSR Utilities

#### getThemeFromCookiesSSR()

```typescript
import { getThemeFromCookiesSSR } from '@aibos/design-system/themes/ssr-utils';

// In server component
const theme = getThemeFromCookiesSSR();
// Returns: string | undefined
```

#### getThemeFromHeaders()

```typescript
import { getThemeFromHeaders } from '@aibos/design-system/themes/ssr-utils';

// In middleware
const theme = getThemeFromHeaders();
// Returns: string | undefined
```

### Token Registry

#### getTokenMapping()

```typescript
import { tokenRegistry } from '@aibos/design-system/themes/token-registry';

const mapping = tokenRegistry.getTokenMapping('primary');
// Returns: { tailwindCssVar: '--color-primary', shadcnCssVar: '--primary', ... }
```

#### mapTokensToCssVariables()

```typescript
import { mapTokensToCssVariables } from '@aibos/design-system/themes/token-registry';

const cssVars = mapTokensToCssVariables({ primary: '#ff6b6b' });
// Returns: { '--color-primary': '#ff6b6b', '--primary': '#ff6b6b' }
```

---

## Best Practices

1. **Always use ThemeProvider** - Wrap your app root
2. **Use semantic tokens** - `primary`, `background`, not hex values
3. **Test in multiple themes** - Ensure UI works in all themes
4. **Persist user choice** - Use `persistToCookie={true}`
5. **SSR support** - Use `serverTheme` in Next.js
6. **Type safety** - Use TypeScript types for custom themes
7. **Performance** - Themes apply instantly (no re-renders needed)

---

## Examples

See `examples/` directory for complete examples:
- `theme-test.html` - Basic theme switching
- `button-theme-test.html` - Button variants
- `twilight-theme-test.html` - Twilight showcase
- `carbon-mist-test.html` - Carbon Mist showcase
- `github-themes-test.html` - All GitHub themes

---

**Ready to build!** The theme system is production-ready and fully documented.

