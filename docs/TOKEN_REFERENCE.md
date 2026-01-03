# Token Reference

> **Auto-generated** from `dist/tokens.json`  
> **Last updated**: 2026-01-03T09:49:26.243Z  
> **Source**: `styles/10-tokens.css`

---

## Overview

This document provides a complete reference for all design tokens in the Neo-Analog Design System.

**Total Tokens**: 245

---

## Colors

### Base Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-paper` | `#121214` | Panel/card background |
| `--color-paper2` | `#18181b` | Hover state, input background |
| `--color-lux` | `#f4f4f5` | Primary text color |
| `--color-clay` | `#71717a` | Metadata, labels |
| `--color-gold` | `#eab308` | Primary accent color |

### Status Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-success` | `#10b981` | Success states, positive actions |
| `--color-warning` | `#f59e0b` | Warning states, attention needed |
| `--color-error` | `#f43f5e` | Error states, destructive actions |
| `--color-info` | `#3b82f6` | Info states, neutral information |

### Additional Colors

| Token | Value |
|-------|-------|
| `--color-paperhover` | `#27272a` |
| `--color-white` | `#fff` |
| `--color-luxdim` | `#a1a1aa` |
| `--color-stroke` | `#27272a` |
| `--color-strokestrong` | `#3f3f46` |
| `--color-strokesoft` | `#1f1f22` |
| `--color-foreground` | `var(--color-lux)` |
| `--color-muted` | `var(--color-paper-2)` |
| `--color-mutedforeground` | `var(--color-clay)` |
| `--color-card` | `var(--color-paper)` |
| `--color-cardforeground` | `var(--color-lux)` |
| `--color-popover` | `var(--color-paper)` |
| `--color-popoverforeground` | `var(--color-lux)` |
| `--color-border` | `var(--color-stroke)` |
| `--color-input` | `var(--color-stroke)` |
| `--color-primary` | `var(--color-gold)` |
| `--color-primaryforeground` | `var(--color-void)` |
| `--color-secondary` | `var(--color-paper-2)` |
| `--color-secondaryforeground` | `var(--color-lux)` |
| `--color-accent` | `var(--color-paper-2)` |
| `--color-accentforeground` | `var(--color-lux)` |
| `--color-destructive` | `var(--color-error)` |
| `--color-destructiveforeground` | `var(--color-lux)` |
| `--color-ring` | `var(--color-gold)` |
| `--color-chart1` | `#eab308` |
| `--color-chart2` | `#10b981` |
| `--color-chart3` | `#3b82f6` |
| `--color-chart4` | `#f59e0b` |
| `--color-chart5` | `#f43f5e` |
| `--color-sidebar` | `var(--color-void)` |

## Typography

### Font Families

| Token | Value |
|-------|-------|
| `--font-family-serif` | `"Playfair Display", georgia, serif` |
| `--font-family-mono` | `"JetBrains Mono", ui-monospace, sfmono-regular, menlo, monaco, consolas, "Courier New", monospace` |

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-px` | `1px` | Standard spacing unit |

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-xs` | `0 1px 2px rgba(0, 0, 0, 0.05)` | Shadow effect |
| `--shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.05)` | Shadow effect |
| `--shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` | Shadow effect |
| `--shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` | Shadow effect |
| `--shadow-xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)` | Shadow effect |
| `--shadow-inset2xs` | `inset 0 1px 1px rgba(0, 0, 0, 0.05)` | Shadow effect |
| `--shadow-inset` | `{   "xs": "inset 0 1px 2px rgba(0, 0, 0, 0.05)",   "sm": "inset 0 2px 4px rgba(0, 0, 0, 0.06)" }` | Shadow effect |
| `--shadow-lift` | `0 10px 30px -10px rgba(0, 0, 0, 0.5)` | Shadow effect |
| `--shadow-deep` | `0 22px 60px -28px rgba(0, 0, 0, 0.8)` | Shadow effect |
| `--shadow-gilded` | `0 0 0 1px rgba(234, 179, 8, 0.15), 0 4px 12px rgba(234, 179, 8, 0.1)` | Shadow effect |

## Other Tokens

### 

| Token | Value |
|-------|-------|
| `--- Color Primitives (Neo` | `#09090b` |
| `--- Typography Primitives ` | `"Inter", system-ui, sans-serif` |
| `--- Spacing Primitives ` | `0` |
| `--- Border Radius Primitives ` | `0` |
| `--- Shadow Primitives ` | `none` |
| `--- Blur Primitives ` | `0` |
| `--- Opacity Primitives ` | `0` |
| `--- Motion Primitives ` | `linear` |
| `--- Z` | `0` |
| `--- Color Semantic Mappings (Figma Standard) ` | `var(--color-void)` |
| `--- Custom Semantic Radius Tokens (Figma` | `var(--radius-xl)` |
| `--- Custom Semantic Opacity Tokens (Figma` | `var(--opacity-50)` |
| `--- Typography Extensions` | `Data & Metadata (Figma-Compliant Extension) --- */
  
  
  --data-size: 0.875rem` |
| `--- Animation Extensions (Figma` | `var(--duration-200)` |

### Font

| Token | Value |
|-------|-------|
| `--font-weight` | `{   "thin": "100",   "extralight": "200",   "light": "300",   "normal": "400",   "medium": "500",   ` |
| `--font-size` | `1rem` |
| `--font-size2xl` | `1.5rem` |
| `--font-size3xl` | `1.875rem` |
| `--font-size4xl` | `2.25rem` |
| `--font-size5xl` | `3rem` |
| `--font-size6xl` | `3.75rem` |
| `--font-size7xl` | `4.5rem` |
| `--font-size8xl` | `6rem` |
| `--font-size9xl` | `8rem` |

### Spacing0_5

| Token | Value |
|-------|-------|
| `--spacing0_5-0_5` | `0.125rem` |

### Spacing1

| Token | Value |
|-------|-------|
| `--spacing1-1` | `0.25rem` |

### Spacing1_5

| Token | Value |
|-------|-------|
| `--spacing1_5-1_5` | `0.375rem` |

### Spacing2

| Token | Value |
|-------|-------|
| `--spacing2-2` | `0.5rem` |

### Spacing2_5

| Token | Value |
|-------|-------|
| `--spacing2_5-2_5` | `0.625rem` |

### Spacing3

| Token | Value |
|-------|-------|
| `--spacing3-3` | `0.75rem` |

### Spacing3_5

| Token | Value |
|-------|-------|
| `--spacing3_5-3_5` | `0.875rem` |

### Spacing4

| Token | Value |
|-------|-------|
| `--spacing4-4` | `1rem` |

### Spacing5

| Token | Value |
|-------|-------|
| `--spacing5-5` | `1.25rem` |

### Spacing6

| Token | Value |
|-------|-------|
| `--spacing6-6` | `1.5rem` |

### Spacing7

| Token | Value |
|-------|-------|
| `--spacing7-7` | `1.75rem` |

### Spacing8

| Token | Value |
|-------|-------|
| `--spacing8-8` | `2rem` |

### Spacing9

| Token | Value |
|-------|-------|
| `--spacing9-9` | `2.25rem` |

### Spacing10

| Token | Value |
|-------|-------|
| `--spacing10-10` | `2.5rem` |

### Spacing11

| Token | Value |
|-------|-------|
| `--spacing11-11` | `2.75rem` |

### Spacing12

| Token | Value |
|-------|-------|
| `--spacing12-12` | `3rem` |

### Spacing14

| Token | Value |
|-------|-------|
| `--spacing14-14` | `3.5rem` |

### Spacing16

| Token | Value |
|-------|-------|
| `--spacing16-16` | `4rem` |

### Spacing20

| Token | Value |
|-------|-------|
| `--spacing20-20` | `5rem` |

### Spacing24

| Token | Value |
|-------|-------|
| `--spacing24-24` | `6rem` |

### Spacing28

| Token | Value |
|-------|-------|
| `--spacing28-28` | `7rem` |

### Spacing32

| Token | Value |
|-------|-------|
| `--spacing32-32` | `8rem` |

### Spacing36

| Token | Value |
|-------|-------|
| `--spacing36-36` | `9rem` |

### Spacing40

| Token | Value |
|-------|-------|
| `--spacing40-40` | `10rem` |

### Spacing44

| Token | Value |
|-------|-------|
| `--spacing44-44` | `11rem` |

### Spacing48

| Token | Value |
|-------|-------|
| `--spacing48-48` | `12rem` |

### Spacing52

| Token | Value |
|-------|-------|
| `--spacing52-52` | `13rem` |

### Spacing56

| Token | Value |
|-------|-------|
| `--spacing56-56` | `14rem` |

### Spacing60

| Token | Value |
|-------|-------|
| `--spacing60-60` | `15rem` |

### Spacing64

| Token | Value |
|-------|-------|
| `--spacing64-64` | `16rem` |

### Spacing72

| Token | Value |
|-------|-------|
| `--spacing72-72` | `18rem` |

### Spacing80

| Token | Value |
|-------|-------|
| `--spacing80-80` | `20rem` |

### Spacing96

| Token | Value |
|-------|-------|
| `--spacing96-96` | `24rem` |

### Radius

| Token | Value |
|-------|-------|
| `--radius-xs` | `0.125rem` |
| `--radius-sm` | `0.25rem` |
| `--radius-md` | `0.375rem` |
| `--radius-lg` | `0.5rem` |
| `--radius-xl` | `0.75rem` |
| `--radius-full` | `9999px` |
| `--radius-xl */
  ` | `var(--radius-2xl)` |
| `--radius-lg */

  /* ` | `0 1px 2px -1px rgba(0, 0, 0, 0.5), 0 1px 0 0 rgba(255, 255, 255, 0.03) inset` |

### Radius2xl

| Token | Value |
|-------|-------|
| `--radius2xl-2xl` | `1rem` |

### Radius3xl

| Token | Value |
|-------|-------|
| `--radius3xl-3xl` | `1.5rem` |

### Shadow2xs

| Token | Value |
|-------|-------|
| `--shadow2xs-2xs` | `0 1px 1px rgba(0, 0, 0, 0.05)` |

### Shadow2xl

| Token | Value |
|-------|-------|
| `--shadow2xl-2xl` | `0 25px 50px -12px rgba(0, 0, 0, 0.25)` |

### Blur

| Token | Value |
|-------|-------|
| `--blur-xs` | `2px` |
| `--blur-sm` | `4px` |
| `--blur-md` | `6px` |
| `--blur-lg` | `8px` |
| `--blur-xl` | `12px` |

### Blur2xl

| Token | Value |
|-------|-------|
| `--blur2xl-2xl` | `20px` |

### Blur3xl

| Token | Value |
|-------|-------|
| `--blur3xl-3xl` | `32px` |

### Opacity5

| Token | Value |
|-------|-------|
| `--opacity5-5` | `0.05` |

### Opacity10

| Token | Value |
|-------|-------|
| `--opacity10-10` | `0.1` |

### Opacity20

| Token | Value |
|-------|-------|
| `--opacity20-20` | `0.2` |

### Opacity25

| Token | Value |
|-------|-------|
| `--opacity25-25` | `0.25` |

### Opacity30

| Token | Value |
|-------|-------|
| `--opacity30-30` | `0.3` |

### Opacity40

| Token | Value |
|-------|-------|
| `--opacity40-40` | `0.4` |

### Opacity50

| Token | Value |
|-------|-------|
| `--opacity50-50` | `0.5` |

### Opacity60

| Token | Value |
|-------|-------|
| `--opacity60-60` | `0.6` |

### Opacity70

| Token | Value |
|-------|-------|
| `--opacity70-70` | `0.7` |

### Opacity75

| Token | Value |
|-------|-------|
| `--opacity75-75` | `0.75` |

### Opacity80

| Token | Value |
|-------|-------|
| `--opacity80-80` | `0.8` |

### Opacity90

| Token | Value |
|-------|-------|
| `--opacity90-90` | `0.9` |

### Opacity95

| Token | Value |
|-------|-------|
| `--opacity95-95` | `0.95` |

### Opacity100

| Token | Value |
|-------|-------|
| `--opacity100-100` | `1` |

### Ease

| Token | Value |
|-------|-------|
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--ease-inout` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--ease-smooth` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-back` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--ease-elastic` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` |

### Duration75

| Token | Value |
|-------|-------|
| `--duration75-75` | `75ms` |

### Duration100

| Token | Value |
|-------|-------|
| `--duration100-100` | `100ms` |

### Duration150

| Token | Value |
|-------|-------|
| `--duration150-150` | `150ms` |

### Duration200

| Token | Value |
|-------|-------|
| `--duration200-200` | `200ms` |

### Duration300

| Token | Value |
|-------|-------|
| `--duration300-300` | `300ms` |

### Duration500

| Token | Value |
|-------|-------|
| `--duration500-500` | `500ms` |

### Duration700

| Token | Value |
|-------|-------|
| `--duration700-700` | `700ms` |

### Duration1000

| Token | Value |
|-------|-------|
| `--duration1000-1000` | `1000ms` |

### Z10

| Token | Value |
|-------|-------|
| `--z10-10` | `10` |

### Z20

| Token | Value |
|-------|-------|
| `--z20-20` | `20` |

### Z30

| Token | Value |
|-------|-------|
| `--z30-30` | `30` |

### Z40

| Token | Value |
|-------|-------|
| `--z40-40` | `40` |

### Z50

| Token | Value |
|-------|-------|
| `--z50-50` | `50` |

### Z

| Token | Value |
|-------|-------|
| `--z-auto` | `auto` |
| `--z-grid` | `1` |
| `--z-sticky` | `1020` |
| `--z-drawer` | `50` |
| `--z-base` | `0` |
| `--z-dropdown` | `1000` |
| `--z-fixed` | `1030` |
| `--z-modal` | `1050` |
| `--z-popover` | `1060` |
| `--z-tooltip` | `1070` |
| `--z-toast` | `1080` |

### Radius2xl */
  

| Token | Value |
|-------|-------|
| `--radius2xl */
  -` | `var(--radius-lg)` |

### Opacity50 */
  

| Token | Value |
|-------|-------|
| `--opacity50 */
  -` | `var(--opacity-80)` |

### Opacity80 */
  

| Token | Value |
|-------|-------|
| `--opacity80 */
  -` | `var(--opacity-60)` |

### Opacity60 */
  

| Token | Value |
|-------|-------|
| `--opacity60 */
  -` | `var(--opacity-90)` |

### Opacity90 */

  /* 

| Token | Value |
|-------|-------|
| `--opacity90 */

  /* -` | `cubic-bezier(0.2, 0, 0, 1)` |

### Heading1

| Token | Value |
|-------|-------|
| `--heading1-weight` | `700` |
| `--heading1-line` | `1.2` |
| `--heading1-color` | `var(--color-lux)` |
| `--heading1-tracking` | `-0.02em` |

### Heading2

| Token | Value |
|-------|-------|
| `--heading2-size` | `1.5rem` |
| `--heading2-weight` | `600` |
| `--heading2-line` | `1.3` |
| `--heading2-color` | `var(--color-lux)` |
| `--heading2-tracking` | `-0.01em` |

### Heading3

| Token | Value |
|-------|-------|
| `--heading3-size` | `1.25rem` |
| `--heading3-weight` | `600` |
| `--heading3-line` | `1.4` |
| `--heading3-color` | `var(--color-lux)` |
| `--heading3-tracking` | `0` |

### Heading4

| Token | Value |
|-------|-------|
| `--heading4-size` | `1.125rem` |
| `--heading4-weight` | `600` |
| `--heading4-line` | `1.4` |
| `--heading4-color` | `var(--color-lux)` |
| `--heading4-tracking` | `0` |

### Heading5

| Token | Value |
|-------|-------|
| `--heading5-size` | `1rem` |
| `--heading5-weight` | `600` |
| `--heading5-line` | `1.5` |
| `--heading5-color` | `var(--color-lux)` |
| `--heading5-tracking` | `0` |

### Heading6

| Token | Value |
|-------|-------|
| `--heading6-size` | `0.875rem` |
| `--heading6-weight` | `600` |
| `--heading6-line` | `1.5` |
| `--heading6-color` | `var(--color-lux-dim)` |
| `--heading6-tracking` | `0.05em` |

### Data

| Token | Value |
|-------|-------|
| `--data-weight` | `400` |
| `--data-line` | `1.5` |
| `--data-color` | `var(--color-lux)` |
| `--data-font` | `var(--font-family-mono)` |
| `--data-large` | `var(--color-lux)` |

### Metadata

| Token | Value |
|-------|-------|
| `--metadata-size` | `0.6875rem` |
| `--metadata-weight` | `500` |
| `--metadata-line` | `1.4` |
| `--metadata-color` | `var(--color-clay)` |
| `--metadata-tracking` | `0.1em` |
| `--metadata-transform` | `uppercase` |
| `--metadata-small` | `var(--color-clay)` |


---

## Usage

### CSS Custom Properties

All tokens are available as CSS custom properties:

```css
.my-element {
  background-color: var(--color-paper);
  color: var(--color-lux);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-card);
}
```

### JavaScript/TypeScript

```typescript
import tokens from '@aibos/design-system/tokens';

const primaryColor = tokens.color.gold;
const spacing = tokens.spacing[6];
```

---

**Generated by**: `scripts/generate-token-docs.js`  
**Source**: `dist/tokens.json`
