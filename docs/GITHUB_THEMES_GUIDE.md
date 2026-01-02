# GitHub-Inspired Themes Guide
## Rosé Pine | Catppuccin Frappé | Kanagawa

**Date**: 2025-01-27  
**Status**: ✅ **Production Ready**

---

## Overview

Three sophisticated themes inspired by popular GitHub repositories, each offering a unique approach to the "between light and dark" aesthetic.

---

## 1. Rosé Pine - "Classy & Minimalist"

### Philosophy

> "All natural pine, faux fur and a bit of soho vibes."

A sophisticated, luxurious theme with deep, rich, muted violet/charcoal backgrounds. Not a standard dark mode - feels like a **filtered photograph**.

### Characteristics

- **Deep, dusty lavender-grey** background (not void black)
- **Warm, muted pastels** that don't hurt the eyes
- **Luxury, soho vibes** aesthetic
- **Very "pretty" and "stable"**
- **Between light and dark** - mid-tone sophistication

### Color Palette

| Color | Value | Purpose |
|-------|-------|---------|
| **Rosé** | `#eb6f92` | Primary - Warm pink-rose (signature color) |
| **Pine** | `#31748f` | Accent - Muted teal-green (natural, organic) |
| **Foam** | `#9ccfd8` | Success - Soft cyan (gentle) |
| **Gold** | `#f6c177` | Warning - Warm amber (not aggressive) |
| **Base** | `#191724` | Background - Deep dusty lavender-grey |

### Quick Start

```tsx
import { rosePineTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[rosePineTheme]}>
  <button className="na-btn na-btn-primary">Rosé Button</button>
</ThemeProvider>
```

### Best For

- ✅ Luxury applications
- ✅ Creative/design tools
- ✅ Soho vibes aesthetic
- ✅ Extended use (very stable)
- ✅ "Fascination" factor

---

## 2. Catppuccin Frappé - "Soothing Middle Ground"

### Philosophy

The **Frappé** flavor is specifically designed to be the "middle ground" - lighter than dark, darker than light.

### Characteristics

- **Soothing pastel** colors
- **Modern, playful, fancy** without being distracting
- **Low-contrast, greyish-blue** base
- **Rests gently** in the middle spectrum
- **Very stable** for extended use

### Color Palette

| Color | Value | Purpose |
|-------|-------|---------|
| **Blue** | `#8caaee` | Primary - Soothing pastel blue |
| **Mauve** | `#ca9ee6` | Accent - Playful pastel purple |
| **Green** | `#a6d189` | Success - Soft pastel green |
| **Yellow** | `#e5c890` | Warning - Warm pastel yellow |
| **Base** | `#303446` | Background - Soft greyish-blue |

### Quick Start

```tsx
import { catppuccinFrappeTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[catppuccinFrappeTheme]}>
  <button className="na-btn na-btn-primary">Blue Button</button>
</ThemeProvider>
```

### Best For

- ✅ Modern applications
- ✅ Playful interfaces
- ✅ Extended coding sessions
- ✅ "Stable" requirement
- ✅ Pop culture aesthetic

---

## 3. Kanagawa - "Artistic & Warm"

### Philosophy

Inspired by the famous painting *"The Great Wave off Kanagawa"*. Completely ignores standard "blue/black" tech look in favor of **"muddy," ink-inspired colors**.

### Characteristics

- **Warm, dark blues** and **sumi-ink greys**
- Feels like looking at an **old Japanese painting**
- **Extremely stable** for long-term reading
- **Eliminates high-contrast whites**
- Perfect mid-tone that feels like **dark paper**

### Color Palette

| Color | Value | Purpose |
|-------|-------|---------|
| **Wave Blue** | `#7e9cd8` | Primary - Warm dark blue (inspired by the wave) |
| **Spring Green** | `#98bb6c` | Accent - Natural green (organic) |
| **Winter Green** | `#76946a` | Success - Muted green (ink-like) |
| **Autumn Yellow** | `#c0a36e` | Warning - Warm amber (ink-like) |
| **Sumi-Ink** | `#1f1f28` | Background - Warm ink-black (not pure) |

### Quick Start

```tsx
import { kanagawaTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[kanagawaTheme]}>
  <button className="na-btn na-btn-primary">Wave Blue</button>
</ThemeProvider>
```

### Best For

- ✅ Artistic applications
- ✅ Long reading sessions
- ✅ Ink/paper aesthetic
- ✅ "Prettily" requirement
- ✅ Japanese-inspired design

---

## Comparison Table

| Feature | Rosé Pine | Catppuccin Frappé | Kanagawa |
|---------|-----------|-------------------|----------|
| **Aesthetic** | Soho, Luxury | Pastel, Soft | Ink, Paper |
| **Brightness** | Mid-Dark | Mid-Tone | Muted Dark |
| **Best For** | Fascination/Fancy | Stable/Pop | Prettily/Artistic |
| **Primary** | Rosé (#eb6f92) | Blue (#8caaee) | Wave Blue (#7e9cd8) |
| **Accent** | Pine (#31748f) | Mauve (#ca9ee6) | Spring Green (#98bb6c) |
| **Feel** | Filtered photo | Soothing pastel | Old painting |
| **Stability** | Very stable | Extremely stable | Extremely stable |

---

## Testing

### Unified Test Page

Open `examples/github-themes-test.html` to see all three themes:

```bash
# Open in browser
open examples/github-themes-test.html
```

### Features

- ✅ Theme cards with color palettes
- ✅ AIBOS button showcase
- ✅ Theme comparison table
- ✅ Real-time theme switching
- ✅ LocalStorage persistence

---

## Usage Examples

### All Three Themes

```tsx
import {
  rosePineTheme,
  catppuccinFrappeTheme,
  kanagawaTheme,
  ThemeProvider
} from '@aibos/design-system/themes';

<ThemeProvider
  customThemes={[
    rosePineTheme,
    catppuccinFrappeTheme,
    kanagawaTheme
  ]}
>
  <YourApp />
</ThemeProvider>
```

### Switch Between Themes

```tsx
import { useThemeSwitch } from '@aibos/design-system/themes';

const { switchToCustom } = useThemeSwitch();

// Switch to Rosé Pine
switchToCustom('rose-pine');

// Switch to Catppuccin Frappé
switchToCustom('catppuccin-frappe');

// Switch to Kanagawa
switchToCustom('kanagawa');
```

---

## Why These Themes Work

### Rosé Pine
- **Luxury feel** - Deep violet-grey feels expensive
- **Warm pastels** - Rosé and Pine create harmony
- **Soho vibes** - Unique, sophisticated aesthetic

### Catppuccin Frappé
- **Perfect middle** - Lighter than dark, darker than light
- **Soothing** - Pastels reduce eye strain
- **Modern** - Playful without being distracting

### Kanagawa
- **Artistic** - Ink-inspired colors feel unique
- **Warm** - Dark blues and greys feel like paper
- **Stable** - Eliminates harsh contrasts

---

## Integration

All themes are:
- ✅ **Tailwind v4 compatible** - Utility classes work
- ✅ **ShadCN compatible** - Component theming works
- ✅ **Next.js SSR ready** - Server-side support
- ✅ **Production ready** - Tested and validated

---

**Ready to use!** All three themes are fully integrated and ready for production.

