# AIBOS Themes - Complete Index

**Version**: 2.0  
**Last Updated**: 2025-01-27  
**Status**: ✅ **Production Ready**

---

## Quick Navigation

- [All Themes Overview](#all-themes-overview)
- [Theme Guides](#theme-guides)
- [Theme System Architecture](#theme-system-architecture)
- [Usage Examples](#usage-examples)
- [Testing](#testing)

---

## All Themes Overview

The AIBOS Design System includes **10 production-ready themes**:

| # | Theme | Primary Color | Background | Use Case |
|---|-------|--------------|------------|----------|
| 1 | **Default** | Gold `#eab308` | Black `#09090b` | Traditional dark mode |
| 2 | **Light** | Amber `#d97706` | White `#ffffff` | Daytime, bright environments |
| 3 | **Twilight** | Teal `#5e81ac` | Mid `#1c1e26` | Extended use, balanced |
| 4 | **Attractive** | Blue `#3b82f6` | Dark `#0f172a` | Premium, modern apps |
| 5 | **Carbon Mist** | Teal `#4FD1C5` | Mid `#121417` | Enterprise, platform |
| 6 | **Gold Glow** | Gold `#eab308` | Stone `#1d2021` | Luxury, stable gold |
| 7 | **Gruvbox Material** | Gold `#eab308` | Sepia `#292828` | Retro, dev tools |
| 8 | **Rosé Pine** | Rosé `#eb6f92` | Lavender `#191724` | Luxury, soho vibes |
| 9 | **Catppuccin Frappé** | Blue `#8caaee` | Grey-blue `#303446` | Modern, playful |
| 10 | **Kanagawa** | Blue `#7e9cd8` | Ink `#1f1f28` | Artistic, reading |

---

## Theme Guides

### Core Themes

1. **[Default Theme](./default-theme.ts)** ⭐
   - Canonical default matching `input.css`
   - Gold primary on pure black
   - High contrast, traditional

2. **[Light Theme Guide](./LIGHT_THEME_USAGE.md)** ⭐
   - High-contrast light theme
   - Daytime optimized
   - Complete usage guide

### Mid-Tone Themes

3. **[Twilight Theme Guide](./TWILIGHT_THEME_GUIDE.md)** ⭐
   - Balanced between light and dark
   - Reduced eye strain
   - Extended use friendly

4. **[Carbon Mist Theme Guide](./CARBON_MIST_THEME_GUIDE.md)** ⭐
   - Enterprise platform theme
   - 5 design invariants
   - Ambient depth features

### Premium Themes

5. **[Attractive Theme Guide](./ATTRACTIVE_THEME_GUIDE.md)** ⭐
   - 5-color premium palette
   - Modern, vibrant
   - Premium applications

### Gold-Optimized Themes

6. **[Gold Glow Themes Guide](./GOLD_GLOW_THEMES_GUIDE.md)** ⭐
   - Gold Glow Theme
   - Gruvbox Material Theme
   - Makes gold glow instead of scream

### GitHub-Inspired Themes

7. **[GitHub Themes Guide](./GITHUB_THEMES_GUIDE.md)** ⭐
   - Rosé Pine Theme
   - Catppuccin Frappé Theme
   - Kanagawa Theme

---

## Theme System Architecture

### Core Components

1. **[Theme System Complete Guide](./THEME_SYSTEM_COMPLETE_GUIDE.md)** ⭐ **START HERE**
   - Complete theme system documentation
   - All 10 themes
   - Architecture overview
   - API reference

2. **[Theme Engine Evaluation](./THEME_ENGINE_EVALUATION.md)**
   - Initial evaluation
   - Tailwind v4 compatibility
   - Design decisions

3. **[Theme Engine MCP Audit](./THEME_ENGINE_MCP_AUDIT.md)**
   - Next.js MCP integration
   - Figma MCP integration
   - ShadCN MCP integration

4. **[Theme Engine Integration Examples](./THEME_ENGINE_INTEGRATION_EXAMPLES.md)**
   - Real-world examples
   - Framework integrations
   - Best practices

---

## Usage Examples

### Basic Usage

```tsx
import { ThemeProvider, defaultTheme } from '@aibos/design-system/themes';

<ThemeProvider>
  <App />
</ThemeProvider>
```

### Multiple Themes

```tsx
import {
  ThemeProvider,
  lightTheme,
  twilightTheme,
  attractiveTheme
} from '@aibos/design-system/themes';

<ThemeProvider customThemes={[lightTheme, twilightTheme, attractiveTheme]}>
  <App />
</ThemeProvider>
```

### Theme Switching

```tsx
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

---

## Testing

### Test Pages

- `examples/theme-test.html` - Basic theme switching
- `examples/button-theme-test.html` - Button variants
- `examples/twilight-theme-test.html` - Twilight showcase
- `examples/carbon-mist-test.html` - Carbon Mist showcase
- `examples/github-themes-test.html` - GitHub themes showcase

### Run Tests

```bash
# All theme tests
pnpm test themes

# Specific theme
pnpm test themes/light-theme
pnpm test themes/token-registry
```

---

## Quick Reference

### Import Themes

```typescript
// All themes
import {
  defaultTheme,
  lightTheme,
  twilightTheme,
  attractiveTheme,
  carbonMistTheme,
  goldGlowTheme,
  gruvboxMaterialTheme,
  rosePineTheme,
  catppuccinFrappeTheme,
  kanagawaTheme,
  ThemeProvider
} from '@aibos/design-system/themes';
```

### Theme System Exports

```typescript
// Theme engine
export * from './theme-machine';
export * from './ThemeProvider';

// Utilities
export * from './token-registry';
export * from './ssr-utils';

// Themes
export { defaultTheme } from './default-theme';
export { lightTheme } from './light-theme';
export { twilightTheme } from './twilight-theme';
export { attractiveTheme } from './attractive-theme';
export { carbonMistTheme } from './carbon-mist-theme';
export { goldGlowTheme } from './gold-glow-theme';
export { gruvboxMaterialTheme } from './gruvbox-material-theme';
export { rosePineTheme } from './rose-pine-theme';
export { catppuccinFrappeTheme } from './catppuccin-frappe-theme';
export { kanagawaTheme } from './kanagawa-theme';
```

---

## Documentation Structure

```
docs/
├── THEME_SYSTEM_COMPLETE_GUIDE.md    ⭐ Main guide
├── THEMES_INDEX.md                    ⭐ This file
├── LIGHT_THEME_USAGE.md              Light theme guide
├── TWILIGHT_THEME_GUIDE.md           Twilight theme guide
├── ATTRACTIVE_THEME_GUIDE.md         Attractive theme guide
├── CARBON_MIST_THEME_GUIDE.md        Carbon Mist guide
├── GOLD_GLOW_THEMES_GUIDE.md         Gold-optimized themes
├── GITHUB_THEMES_GUIDE.md            GitHub-inspired themes
├── THEME_ENGINE_EVALUATION.md        Initial evaluation
├── THEME_ENGINE_MCP_AUDIT.md         MCP integration audit
└── THEME_ENGINE_INTEGRATION_EXAMPLES.md  Integration examples
```

---

**All themes are production-ready and fully documented!**

