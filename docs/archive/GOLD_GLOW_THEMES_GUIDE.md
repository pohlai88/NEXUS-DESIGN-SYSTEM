# Gold Glow Themes Guide
## Making Vibrant Gold #eab308 "Glow Instead of Scream"

**Date**: 2025-01-27  
**Status**: ✅ **Production Ready**

---

## The Problem

The vibrant gold `#eab308` (Amber-500, "Sunflower") is beautiful but can be **too sharp** on a pure black background (`#09090b`). It "screams" instead of "glows."

## The Solution

**Don't change the gold** - change the **background** to a mid-tone (warm stone, charcoal, sepia) so the gold glows beautifully.

---

## 1. Gold Glow Theme - Custom Solution

### Philosophy

- **Keep** the vibrant gold `#eab308` (unchanged)
- **Change** background to warm, deep stone (`#1d2021`)
- **Result**: Gold glows instead of screams
- **Feel**: Stable, fancy, luxurious

### Color Palette

| Color | Value | Purpose |
|-------|-------|---------|
| **Gold** | `#eab308` | Primary - Vibrant gold (unchanged!) |
| **Background** | `#1d2021` | Warm dark stone (not pure black) |
| **Text** | `#ebdbb2` | Warm cream (not pure white) |
| **Success** | `#98971a` | Warm olive green |
| **Warning** | `#d79921` | Warm amber (complements gold) |

### Quick Start

```tsx
import { goldGlowTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[goldGlowTheme]}>
  <button className="na-btn na-btn-primary">Gold Glow</button>
</ThemeProvider>
```

---

## 2. Gruvbox Material Theme - Classic Choice

### Philosophy

Inspired by `sainnhe/gruvbox-material` - the **classic choice** for making gold look sophisticated.

- **Warm, deep stone** background (`#292828`)
- **Designed around** gold, orange, and yellow accents
- **Feels**: Retro, warm, expensive
- **Medium contrast** - not black, but rich sepia/grey

### Color Palette

| Color | Value | Purpose |
|-------|-------|---------|
| **Gold** | `#eab308` | Primary - Your vibrant gold |
| **Orange** | `#fe8019` | Accent - Complements gold |
| **Background** | `#292828` | Warm dark stone |
| **Text** | `#ebdbb2` | Warm cream |

### Quick Start

```tsx
import { gruvboxMaterialTheme, ThemeProvider } from '@aibos/design-system/themes';

<ThemeProvider customThemes={[gruvboxMaterialTheme]}>
  <button className="na-btn na-btn-primary">Gruvbox Gold</button>
</ThemeProvider>
```

---

## Comparison: Default vs Gold Glow

| Feature | Default (Pure Black) | Gold Glow (Warm Stone) |
|---------|---------------------|------------------------|
| **Background** | `#09090b` (Pure black) | `#1d2021` (Warm stone) |
| **Gold Effect** | Screams (too sharp) | Glows (sophisticated) |
| **Eye Strain** | Higher | Lower |
| **Stability** | Less stable | More stable |
| **Fancy Factor** | High energy | Luxurious glow |

---

## Why These Themes Work

### 1. Mid-Tone Background
- Not pure black (`#09090b`)
- Warm stone/charcoal (`#1d2021` or `#292828`)
- Reduces contrast, increases stability

### 2. Warm Text Colors
- Not pure white (`#ffffff`)
- Warm cream (`#ebdbb2`)
- Complements the warm background

### 3. Gold Glows
- Same vibrant gold (`#eab308`)
- But now it **glows** instead of **screams**
- Looks sophisticated and luxurious

---

## Use Cases

### Gold Glow Theme
- ✅ **Luxury applications** - Sophisticated, fancy
- ✅ **Extended use** - Stable, easy on eyes
- ✅ **Premium feel** - Gold glows beautifully
- ✅ **Warm aesthetic** - Retro, cozy

### Gruvbox Material Theme
- ✅ **Classic choice** - Proven gold theme
- ✅ **Retro aesthetic** - Warm, nostalgic
- ✅ **Developer tools** - Popular in coding
- ✅ **Medium contrast** - Perfect balance

---

## Technical Details

### Gold Glow Effects

Both themes include CSS variables for gold glow:

```css
--shadow-glow-gold: 0 0 0 1px rgba(234, 179, 8, 0.3), 0 8px 24px rgba(234, 179, 8, 0.15);
--shadow-glow-gold-subtle: 0 0 0 1px rgba(234, 179, 8, 0.2), 0 4px 12px rgba(234, 179, 8, 0.1);
```

### Usage

```tsx
<button 
  className="na-btn na-btn-primary"
  style={{
    boxShadow: 'var(--shadow-glow-gold-subtle)'
  }}
>
  Glowing Gold Button
</button>
```

---

## Comparison with Other Themes

| Theme | Gold Color | Background | Effect |
|-------|-----------|------------|--------|
| **Default** | `#eab308` | `#09090b` (black) | Screams |
| **Gold Glow** | `#eab308` | `#1d2021` (stone) | **Glows** ✅ |
| **Gruvbox Material** | `#eab308` | `#292828` (sepia) | **Glows** ✅ |
| **Kanagawa** | `#e6c384` (muted) | `#1f1f28` | Stable but less vibrant |
| **Catppuccin** | `#e5c890` (pastel) | `#303446` | Too soft |

---

## Recommendation

**For maximum "stable yet fancy" effect:**

1. **Use Gold Glow Theme** - Custom solution, perfect for your gold
2. **Or Gruvbox Material** - Classic choice, proven track record

Both make your vibrant gold `#eab308` **glow instead of scream**.

---

**Ready to use!** Your gold will now glow beautifully on warm, stable backgrounds.

