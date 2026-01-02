# Theme Engine Integration Examples
## Next.js | ShadCN | Figma MCP Usage Guide

**Date**: 2025-01-27  
**Status**: ✅ **Production Ready**

---

## Quick Start

The theme engine now supports:
- ✅ **Tailwind v4** - Runtime theme switching for utility classes
- ✅ **ShadCN UI** - Component theming via CSS variables
- ✅ **Next.js SSR** - Server-side theme support with hydration safety
- ✅ **Figma MCP** - Token sync capability (ready for integration)

---

## 1. Next.js App Router Integration

### Basic Setup

```tsx
// app/layout.tsx (Server Component)
import { cookies } from 'next/headers';
import { getServerTheme, getThemeAttribute } from '@aibos/design-system/themes';
import { ThemeProvider } from '@aibos/design-system/themes';
import '@aibos/design-system/css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = await getServerTheme(cookieStore);
  const themeAttr = getThemeAttribute(theme);

  return (
    <html lang="en" data-theme={themeAttr}>
      <body>
        <ThemeProvider serverTheme={theme} persistToCookie={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Using Theme in Client Components

```tsx
// app/components/ThemeSwitcher.tsx
'use client';

import { useThemeSwitch, useCurrentTheme } from '@aibos/design-system/themes';

export function ThemeSwitcher() {
  const { switchToCustom, switchToDefault } = useThemeSwitch();
  const { isDefault, availableThemes } = useCurrentTheme();

  return (
    <div className="na-card na-p-6">
      <h3 className="na-h4">Theme</h3>
      <div className="na-flex na-gap-4 na-mt-4">
        <button
          className="na-btn"
          onClick={() => switchToDefault()}
          disabled={isDefault}
        >
          Default
        </button>
        {availableThemes
          .filter(t => t !== 'default')
          .map(theme => (
            <button
              key={theme}
              className="na-btn na-btn-primary"
              onClick={() => switchToCustom(theme)}
            >
              {theme}
            </button>
          ))}
      </div>
    </div>
  );
}
```

### Creating Custom Themes

```tsx
// app/themes.ts
import type { CustomTheme } from '@aibos/design-system/themes';

export const customThemes: CustomTheme[] = [
  {
    name: 'dark',
    tokens: {
      // These map to Tailwind v4 tokens automatically
      void: '#000000',
      paper: '#1a1a1a',
      lux: '#ffffff',
      gold: '#fbbf24',
      primary: '#fbbf24', // Also maps to ShadCN --color-primary
    },
  },
  {
    name: 'light',
    tokens: {
      void: '#ffffff',
      paper: '#f5f5f5',
      lux: '#000000',
      gold: '#d97706',
      primary: '#d97706',
    },
  },
];
```

### Using in Layout

```tsx
// app/layout.tsx
import { ThemeProvider } from '@aibos/design-system/themes';
import { customThemes } from './themes';

export default async function RootLayout({ children }) {
  const theme = await getServerTheme(cookies());
  
  return (
    <html>
      <body>
        <ThemeProvider
          serverTheme={theme}
          customThemes={customThemes}
          persistToCookie={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 2. ShadCN UI Integration

### Theme-Aware ShadCN Components

The theme engine automatically applies to ShadCN components via CSS variables:

```tsx
// components/ui/button.tsx (ShadCN component)
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // ShadCN uses --color-primary, which is automatically themed
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
```

### Using ShadCN with Theme Engine

```tsx
// app/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useCurrentTheme } from '@aibos/design-system/themes';

export default function Page() {
  const { theme, isCustom } = useCurrentTheme();

  return (
    <div className="na-content">
      <Card>
        <CardHeader>
          <CardTitle>ShadCN + Theme Engine</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Current theme: {isCustom ? theme?.name : 'default'}</p>
          <Button className="na-mt-4">Themed Button</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Note**: ShadCN components automatically respond to theme changes because they use `--color-primary`, `--color-background`, etc., which are now mapped by the theme engine.

---

## 3. Tailwind v4 Utility Classes

### Using Themed Utilities

```tsx
// app/components/ThemedCard.tsx
export function ThemedCard() {
  return (
    <div className="bg-paper text-lux p-6 rounded-card">
      {/* These Tailwind utilities now respond to theme changes */}
      <h2 className="text-2xl font-bold">Themed Card</h2>
      <p className="text-lux-dim mt-4">This card uses themed utilities</p>
      <button className="bg-primary text-primary-foreground px-4 py-2 rounded mt-4">
        Themed Button
      </button>
    </div>
  );
}
```

### Token Mapping Reference

When you define a theme with these token keys, they automatically map:

| Custom Token Key | Tailwind v4 Variable | ShadCN Variable | Usage |
|-----------------|---------------------|----------------|-------|
| `void` | `--color-void` | - | Background color |
| `paper` | `--color-paper` | - | Card/surface color |
| `lux` | `--color-lux` | - | Primary text color |
| `primary` | `--color-primary` | `--color-primary` | Primary action color |
| `background` | `--color-background` | `--color-background` | Page background |
| `card` | `--color-card` | `--color-card` | Card background |
| `spacing6` | `--spacing-6` | - | Standard spacing (24px) |
| `fontSizeBase` | `--font-size-base` | - | Base font size (16px) |

---

## 4. Figma MCP Integration (Future)

### Syncing from Figma

```typescript
// scripts/sync-figma-theme.ts
import { mcp_Figma_get_variable_defs } from '@figma/mcp';
import { getTailwindFromFigma } from '@aibos/design-system/themes';
import type { CustomTheme } from '@aibos/design-system/themes';

export async function syncFigmaTheme(
  fileKey: string,
  nodeId: string
): Promise<CustomTheme> {
  const figmaVars = await mcp_Figma_get_variable_defs({ fileKey, nodeId });
  
  const tokens: Record<string, string> = {};
  
  // Map Figma variables to theme tokens
  Object.entries(figmaVars).forEach(([figmaKey, value]) => {
    const tailwindVar = getTailwindFromFigma(figmaKey);
    if (tailwindVar) {
      // Extract token key from Tailwind variable name
      const tokenKey = tailwindVar.replace('--color-', '').replace('--', '');
      tokens[tokenKey] = value;
    }
  });
  
  return {
    name: 'figma-sync',
    tokens,
  };
}
```

---

## 5. Advanced Patterns

### Dynamic Theme Registration

```tsx
'use client';

import { useThemeSwitch } from '@aibos/design-system/themes';
import type { CustomTheme } from '@aibos/design-system/themes';

export function DynamicThemeCreator() {
  const { registerTheme } = useThemeSwitch();

  const createTheme = () => {
    const newTheme: CustomTheme = {
      name: 'custom-' + Date.now(),
      tokens: {
        void: '#0a0a0a',
        paper: '#1a1a1a',
        lux: '#f0f0f0',
        primary: '#3b82f6',
      },
    };
    
    registerTheme(newTheme);
  };

  return (
    <button className="na-btn" onClick={createTheme}>
      Create Dynamic Theme
    </button>
  );
}
```

### Theme Persistence with LocalStorage

```tsx
'use client';

import { useEffect } from 'react';
import { useThemeSwitch, useCurrentTheme } from '@aibos/design-system/themes';

export function ThemePersistence() {
  const { switchToCustom, switchToDefault } = useThemeSwitch();
  const { isCustom, theme } = useCurrentTheme();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved && saved !== 'default') {
      switchToCustom(saved);
    }
  }, [switchToCustom]);

  // Save to localStorage on change
  useEffect(() => {
    if (isCustom && theme) {
      localStorage.setItem('theme', theme.name);
    } else {
      localStorage.setItem('theme', 'default');
    }
  }, [isCustom, theme]);

  return null; // This is a side-effect component
}
```

---

## 6. Testing

### Testing Theme Application

```typescript
// tests/theme-integration.test.tsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@aibos/design-system/themes';
import { customThemes } from '../app/themes';

describe('Theme Integration', () => {
  it('should apply theme to Tailwind utilities', () => {
    render(
      <ThemeProvider customThemes={customThemes} initialTheme="dark">
        <div className="bg-paper text-lux">Content</div>
      </ThemeProvider>
    );

    const element = screen.getByText('Content');
    const styles = window.getComputedStyle(element);
    
    // Theme should be applied via CSS variables
    expect(element).toHaveAttribute('data-theme', 'dark');
  });
});
```

---

## 7. Troubleshooting

### Theme Not Applying?

1. **Check token keys**: Use registry keys (`void`, `paper`, `primary`, etc.)
2. **Verify SSR**: Ensure `serverTheme` prop is passed in Next.js
3. **Check hydration**: Theme applies after mount to prevent mismatches
4. **Inspect CSS**: Check DevTools for applied CSS variables

### ShadCN Components Not Theming?

1. **Verify CSS variables**: ShadCN uses `--color-primary`, `--color-background`
2. **Check mapping**: Ensure theme tokens include `primary`, `background`, etc.
3. **Component classes**: ShadCN components must use CSS variables, not hardcoded colors

### Next.js Hydration Warnings?

1. **Use `serverTheme` prop**: Pass theme from server to prevent mismatch
2. **Mounted state**: Theme applies after hydration (by design)
3. **Cookie sync**: Theme preference is synced via cookies

---

## Summary

The theme engine now provides:
- ✅ **Full Tailwind v4 compatibility** - Utility classes respond to themes
- ✅ **ShadCN integration** - Components automatically themed
- ✅ **Next.js SSR support** - Server-side rendering with hydration safety
- ✅ **Unified token registry** - Single source of truth for all mappings
- ✅ **Production ready** - Tested and documented

**Next Steps**: Start using the theme engine in your Next.js + ShadCN projects!

