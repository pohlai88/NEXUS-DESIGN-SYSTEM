# README Themes Section - Documentation Template

This file contains the recommended themes section for the main README.md.

---

## Theme System ⭐ **NEW**

The AIBOS Design System includes a comprehensive theme engine with **10 production-ready themes**.

### Quick Start

```tsx
import { ThemeProvider, lightTheme } from '@aibos/design-system/themes';
import '@aibos/design-system/css';

export default function App() {
  return (
    <ThemeProvider customThemes={[lightTheme]}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Available Themes

| Theme | Primary | Background | Best For |
|-------|---------|------------|----------|
| **Default** | Gold `#eab308` | Black `#09090b` | Traditional dark |
| **Light** | Amber `#d97706` | White `#ffffff` | Daytime use |
| **Twilight** | Teal `#5e81ac` | Mid `#1c1e26` | Extended use |
| **Attractive** | Blue `#3b82f6` | Dark `#0f172a` | Premium apps |
| **Carbon Mist** | Teal `#4FD1C5` | Mid `#121417` | Enterprise |
| **Gold Glow** | Gold `#eab308` | Stone `#1d2021` | Luxury, stable gold |
| **Gruvbox Material** | Gold `#eab308` | Sepia `#292828` | Retro, dev tools |
| **Rosé Pine** | Rosé `#eb6f92` | Lavender `#191724` | Luxury, soho |
| **Catppuccin Frappé** | Blue `#8caaee` | Grey-blue `#303446` | Modern, playful |
| **Kanagawa** | Blue `#7e9cd8` | Ink `#1f1f28` | Artistic, reading |

### Features

- ✅ **10 Production Themes** - From default to GitHub-inspired
- ✅ **Next.js SSR Support** - Server-side rendering with cookie persistence
- ✅ **Tailwind v4 Compatible** - Full integration
- ✅ **ShadCN Compatible** - Works seamlessly with ShadCN components
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **React Hooks** - Easy theme switching

### Documentation

- **[Theme System Complete Guide](./docs/THEME_SYSTEM_COMPLETE_GUIDE.md)** ⭐ **START HERE**
- **[Themes Index](./docs/THEMES_INDEX.md)** - Quick navigation
- **[Theme Guides](./docs/)** - Individual theme documentation

### Usage Examples

```tsx
// Switch themes
import { useThemeSwitch } from '@aibos/design-system/themes';

function ThemeSwitcher() {
  const { switchToDefault, switchToCustom } = useThemeSwitch();
  
  return (
    <div>
      <button onClick={() => switchToDefault()}>Default</button>
      <button onClick={() => switchToCustom('light')}>Light</button>
      <button onClick={() => switchToCustom('twilight')}>Twilight</button>
    </div>
  );
}
```

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

---

**See [Theme System Complete Guide](./docs/THEME_SYSTEM_COMPLETE_GUIDE.md) for full documentation.**

