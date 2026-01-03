# AIBOS Theme System - Complete Guide

**Version**: 2.0  
**Date**: 2025-01-27  
**Status**: ✅ **Production Ready**

---

## Overview

The AIBOS Theme System is a comprehensive, enterprise-grade theme engine that provides:

- ✅ **10 Pre-built Themes** - From default dark to GitHub-inspired themes
- ✅ **Tailwind v4 Compatible** - Full integration with Tailwind CSS v4
- ✅ **Next.js SSR Support** - Server-side rendering with cookie persistence
- ✅ **ShadCN Compatible** - Works seamlessly with ShadCN components
- ✅ **Figma Ready** - Token registry for Figma integration
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **React Context** - Easy theme switching with hooks

---

## Quick Start

### Installation

```bash
npm install @aibos/design-system
```

### Basic Usage

```tsx
import { ThemeProvider, defaultTheme } from '@aibos/design-system/themes';
import '@aibos/design-system/css';

export default function App() {
  return (
    <ThemeProvider>
      <YourApp />
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

## Available Themes

### 1. Default Theme (Neo-Analog)

**The canonical default theme** - matches `input.css` exactly.

- **Primary Color**: Gold `#eab308` (Amber-500)
- **Background**: Pure black `#09090b`
- **Best For**: Traditional dark mode, high contrast

```tsx
import { defaultTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[defaultTheme]}>
  <App />
</ThemeProvider>
```

📖 **See**: [Default Theme](./default-theme.ts)

---

### 2. Light Theme

**High-contrast light theme** for daytime use.

- **Primary Color**: Amber-600 `#d97706`
- **Background**: White `#ffffff`
- **Best For**: Bright environments, daytime use

```tsx
import { lightTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[lightTheme]}>
  <App />
</ThemeProvider>
```

📖 **See**: [Light Theme Guide](./LIGHT_THEME_USAGE.md)

---

### 3. Twilight Theme

**Balanced mid-tone theme** - between light and dark.

- **Primary Color**: Elegant Teal `#5e81ac`
- **Background**: Mid-tone `#1c1e26`
- **Best For**: Extended use, reduced eye strain

```tsx
import { twilightTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[twilightTheme]}>
  <App />
</ThemeProvider>
```

📖 **See**: [Twilight Theme Guide](./TWILIGHT_THEME_GUIDE.md)

---

### 4. Attractive Theme

**Premium 5-color theme** for modern applications.

- **Primary Color**: Deep Ocean Blue `#3b82f6`
- **Accent**: Vibrant Coral `#f97316`
- **Best For**: Premium applications, modern UI

```tsx
import { attractiveTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[attractiveTheme]}>
  <App />
</ThemeProvider>
```

📖 **See**: [Attractive Theme Guide](./ATTRACTIVE_THEME_GUIDE.md)

---

### 5. Carbon Mist Theme

**Enterprise platform theme** - stable, fascinating, enterprise-grade.

- **Primary Color**: Aurora Teal `#4FD1C5`
- **Background**: Mid-luminance `#121417`
- **Best For**: Enterprise apps, extended use, governance

```tsx
import { carbonMistTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[carbonMistTheme]}>
  <App />
</ThemeProvider>
```

📖 **See**: [Carbon Mist Theme Guide](./CARBON_MIST_THEME_GUIDE.md)

---

### 6. Gold Glow Theme

**Makes vibrant gold glow** instead of scream.

- **Primary Color**: Gold `#eab308` (unchanged)
- **Background**: Warm stone `#1d2021` (not pure black)
- **Best For**: Luxury apps, stable gold appearance

```tsx
import { goldGlowTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[goldGlowTheme]}>
  <App />
</ThemeProvider>
```

📖 **See**: [Gold Glow Themes Guide](./GOLD_GLOW_THEMES_GUIDE.md)

---

### 7. Gruvbox Material Theme

**Classic choice** for making gold look sophisticated.

- **Primary Color**: Gold `#eab308`
- **Background**: Warm sepia `#292828`
- **Best For**: Retro aesthetic, developer tools

```tsx
import { gruvboxMaterialTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[gruvboxMaterialTheme]}>
  <App />
</ThemeProvider>
```

📖 **See**: [Gold Glow Themes Guide](./GOLD_GLOW_THEMES_GUIDE.md)

---

### 8. Rosé Pine Theme

**"All natural pine, faux fur and a bit of soho vibes"**

- **Primary Color**: Rosé `#eb6f92`
- **Background**: Deep lavender-grey `#191724`
- **Best For**: Luxury apps, creative tools, soho vibes

```tsx
import { rosePineTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[rosePineTheme]}>
  <App />
</ThemeProvider>
```

📖 **See**: [GitHub Themes Guide](./GITHUB_THEMES_GUIDE.md)

---

### 9. Catppuccin Frappé Theme

**Soothing pastel** - the middle ground.

- **Primary Color**: Blue `#8caaee`
- **Background**: Soft greyish-blue `#303446`
- **Best For**: Modern apps, playful interfaces, extended use

```tsx
import { catppuccinFrappeTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[catppuccinFrappeTheme]}>
  <App />
</ThemeProvider>
```

📖 **See**: [GitHub Themes Guide](./GITHUB_THEMES_GUIDE.md)

---

### 10. Kanagawa Theme

**Inspired by "The Great Wave off Kanagawa"** - ink-inspired colors.

- **Primary Color**: Wave Blue `#7e9cd8`
- **Background**: Sumi-ink `#1f1f28`
- **Best For**: Artistic apps, long reading sessions, Japanese aesthetic

```tsx
import { kanagawaTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[kanagawaTheme]}>
  <App />
</ThemeProvider>
```

📖 **See**: [GitHub Themes Guide](./GITHUB_THEMES_GUIDE.md)

---

## Theme Comparison

| Theme | Primary | Background | Brightness | Best For |
|-------|---------|------------|------------|----------|
| **Default** | Gold `#eab308` | Black `#09090b` | Very Dark | Traditional dark |
| **Light** | Amber `#d97706` | White `#ffffff` | Very Light | Daytime use |
| **Twilight** | Teal `#5e81ac` | Mid `#1c1e26` | Mid-Tone | Extended use |
| **Attractive** | Blue `#3b82f6` | Dark `#0f172a` | Dark | Premium apps |
| **Carbon Mist** | Teal `#4FD1C5` | Mid `#121417` | Mid | Enterprise |
| **Gold Glow** | Gold `#eab308` | Stone `#1d2021` | Mid-Dark | Luxury, stable gold |
| **Gruvbox** | Gold `#eab308` | Sepia `#292828` | Mid-Dark | Retro, dev tools |
| **Rosé Pine** | Rosé `#eb6f92` | Lavender `#191724` | Mid-Dark | Luxury, soho |
| **Catppuccin** | Blue `#8caaee` | Grey-blue `#303446` | Mid-Tone | Modern, playful |
| **Kanagawa** | Blue `#7e9cd8` | Ink `#1f1f28` | Muted Dark | Artistic, reading |

---

## Architecture

### Theme Engine Components

1. **Theme Machine** (`theme-machine.ts`)
   - State machine for theme management
   - Applies themes to document
   - Type-safe theme state

2. **Theme Provider** (`ThemeProvider.tsx`)
   - React context provider
   - SSR support with Next.js
   - Cookie persistence

3. **Token Registry** (`token-registry.ts`)
   - Maps internal tokens to CSS variables
   - Tailwind v4, ShadCN, Figma compatibility
   - Unified token mapping

4. **SSR Utils** (`ssr-utils.ts`)
   - Next.js server-side utilities
   - Cookie management
   - Header parsing

---

## Advanced Usage

### Next.js Integration

```tsx
// app/layout.tsx
import { ThemeProvider } from '@aibos/design-system/themes';
import { getThemeFromCookiesSSR } from '@aibos/design-system/themes/ssr-utils';

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

### Custom Theme Creation

```tsx
import { CustomTheme } from '@aibos/design-system/themes';

const myCustomTheme: CustomTheme = {
  name: 'my-theme',
  tokens: {
    void: '#1a1a1a',
    paper: '#2a2a2a',
    lux: '#ffffff',
    primary: '#ff6b6b',
    // ... all required tokens
  },
  cssVariables: {
    // Optional custom CSS variables
    '--custom-glow': '0 0 20px rgba(255, 107, 107, 0.3)',
  },
};

<ThemeProvider customThemes={[myCustomTheme]}>
  <App />
</ThemeProvider>
```

### Theme Hooks

```tsx
import { 
  useThemeSwitch, 
  useCurrentTheme,
  useAvailableThemes 
} from '@aibos/design-system/themes';

function ThemeControls() {
  const { switchToDefault, switchToCustom } = useThemeSwitch();
  const currentTheme = useCurrentTheme();
  const availableThemes = useAvailableThemes();
  
  return (
    <div>
      <p>Current: {currentTheme}</p>
      <select onChange={(e) => switchToCustom(e.target.value)}>
        {availableThemes.map(theme => (
          <option key={theme} value={theme}>{theme}</option>
        ))}
      </select>
    </div>
  );
}
```

---

## Testing

### Standalone HTML Tests

- `examples/theme-test.html` - Basic theme switching
- `examples/button-theme-test.html` - Button variants with themes
- `examples/twilight-theme-test.html` - Twilight theme showcase
- `examples/carbon-mist-test.html` - Carbon Mist theme showcase
- `examples/github-themes-test.html` - All GitHub-inspired themes

### Run Tests

```bash
# Test theme system
pnpm test themes

# Test specific theme
pnpm test themes/light-theme
pnpm test themes/token-registry
```

---

## Integration

### Tailwind v4

The theme system is fully compatible with Tailwind v4:

```tsx
// Themes automatically apply CSS variables
// Tailwind v4 reads these variables
<div className="bg-primary text-primary-foreground">
  Primary colored content
</div>
```

### ShadCN Components

Works seamlessly with ShadCN:

```tsx
import { Button } from '@/components/ui/button';

// ShadCN components automatically use theme colors
<Button>Primary Button</Button>
```

### Figma Integration

Token registry includes Figma token paths:

```typescript
import { tokenRegistry } from '@aibos/design-system/themes/token-registry';

const mapping = tokenRegistry.getTokenMapping('primary');
console.log(mapping.figmaTokenPath); // 'color/primary'
```

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

### CustomTheme Type

```typescript
interface CustomTheme {
  name: string;
  tokens: Record<string, string | number>;
  cssVariables?: Record<string, string>;
}
```

### Hooks

- `useThemeSwitch()` - Switch between themes
- `useCurrentTheme()` - Get current theme name
- `useAvailableThemes()` - Get list of available themes

---

## Best Practices

1. **Always use ThemeProvider** - Wrap your app with ThemeProvider
2. **Use semantic tokens** - Use `primary`, `background`, etc., not hex values
3. **Test in multiple themes** - Ensure your UI works in all themes
4. **Persist user choice** - Use `persistToCookie={true}` for UX
5. **SSR support** - Use `serverTheme` prop in Next.js

---

## Troubleshooting

### Theme not applying?

1. Check ThemeProvider is wrapping your app
2. Verify CSS is imported: `import '@aibos/design-system/css'`
3. Check browser console for errors
4. Verify theme name matches exactly

### SSR issues?

1. Use `getThemeFromCookiesSSR()` in server components
2. Pass `serverTheme` prop to ThemeProvider
3. Ensure cookies are enabled

### Colors not updating?

1. Check token registry mappings
2. Verify CSS variables are being set
3. Check for CSS specificity issues

---

## Resources

- [Theme Engine Evaluation](./THEME_ENGINE_EVALUATION.md)
- [Theme Engine MCP Audit](./THEME_ENGINE_MCP_AUDIT.md)
- [Token Registry](./token-registry.ts)
- [Theme Machine](./theme-machine.ts)

---

**Ready to use!** The AIBOS Theme System provides enterprise-grade theming with full TypeScript support and seamless framework integration.

