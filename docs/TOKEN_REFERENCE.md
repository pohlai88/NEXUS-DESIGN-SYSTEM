# Neo-Analog Design Tokens Reference

**Complete token catalog for npm package: `@aibos/design-system`**

All tokens are automatically generated from [input.css](../input.css) and exported to:
- `dist/tokens.json` — JSON token map
- `dist/tokens/index.d.ts` — TypeScript definitions
- `style.css` — Compiled CSS with all tokens

---

## 📋 Quick Navigation

- [Colors](#colors) — Base palette, status colors, semantic mappings
- [Typography](#typography) — Font families, sizes, weights, line heights
- [Spacing](#spacing) — Complete 4px increment scale (0–384px)
- [Radius](#radius) — Border radius tokens
- [Shadows](#shadows) — Neo-Analog signature shadows
- [Effects](#effects) — Blur, opacity, animations
- [Motion](#motion) — Easing, durations, transitions
- [Z-Index](#z-index) — Semantic layering strategy

---

## Colors

### Base Palette (Neo-Analog)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-void` | `#09090b` | Main background (dark) |
| `--color-paper` | `#121214` | Panel background |
| `--color-paper-2` | `#18181b` | Hover state / input |
| `--color-paper-hover` | `#27272a` | Hover background |
| `--color-lux` | `#f4f4f5` | Primary text (light) |
| `--color-lux-dim` | `#a1a1aa` | Secondary text |
| `--color-clay` | `#71717a` | Metadata / labels |
| `--color-gold` | `#eab308` | Primary accent |
| `--color-stroke` | `#27272a` | Panel borders |
| `--color-stroke-strong` | `#3f3f46` | Hover borders |
| `--color-stroke-soft` | `#1f1f22` | Soft borders |

**Dark theme by default.** Optimized for long-form reading in enterprise apps.

### Status Colors

| Token | Value | Meaning |
|-------|-------|---------|
| `--color-success` | `#10b981` | Success / positive |
| `--color-warning` | `#f59e0b` | Warning / attention |
| `--color-error` | `#f43f5e` | Error / destructive |
| `--color-info` | `#3b82f6` | Info / neutral |

### Semantic Theme Mappings

| Token | Maps to | Purpose |
|-------|---------|---------|
| `--color-background` | `var(--color-void)` | Page background |
| `--color-foreground` | `var(--color-lux)` | Primary text |
| `--color-muted` | `var(--color-paper-2)` | Muted backgrounds |
| `--color-muted-foreground` | `var(--color-clay)` | Muted text |
| `--color-card` | `var(--color-paper)` | Card background |
| `--color-primary` | `var(--color-gold)` | Primary action color |
| `--color-destructive` | `var(--color-error)` | Destructive actions |
| `--color-border` | `var(--color-stroke)` | Border color |
| `--color-ring` | `var(--color-gold)` | Focus ring color |

### Chart Colors (Data Visualization)

| Token | Value | Type |
|-------|-------|------|
| `--color-chart-1` | `#eab308` | Primary (gold) |
| `--color-chart-2` | `#10b981` | Success (emerald) |
| `--color-chart-3` | `#3b82f6` | Info (blue) |
| `--color-chart-4` | `#f59e0b` | Warning (amber) |
| `--color-chart-5` | `#f43f5e` | Error (rose) |

---

## Typography

### Font Families

```css
--font-sans: "Inter", system-ui, sans-serif;           /* Default */
--font-serif: "Playfair Display", Georgia, serif;      /* Editorial */
--font-mono: "JetBrains Mono", ui-monospace, ...;      /* Data/code */
```

### Font Weights

| Token | Value | Use Case |
|-------|-------|----------|
| `--font-weight-thin` | 100 | Decorative |
| `--font-weight-extralight` | 200 | Decorative |
| `--font-weight-light` | 300 | Secondary content |
| `--font-weight-normal` | 400 | Body text |
| `--font-weight-medium` | 500 | Labels, data |
| `--font-weight-semibold` | 600 | Headings, emphasis |
| `--font-weight-bold` | 700 | Page titles |
| `--font-weight-extrabold` | 800 | Display text |
| `--font-weight-black` | 900 | Display text |

### Font Sizes

**Complete scale from 12px to 128px:**

| Token | Size | Pixel | Use Case |
|-------|------|-------|----------|
| `--font-size-xs` | 0.75rem | 12px | Metadata, captions |
| `--font-size-sm` | 0.875rem | 14px | Small text, data |
| `--font-size-base` | 1rem | 16px | Body text |
| `--font-size-lg` | 1.125rem | 18px | Large text |
| `--font-size-xl` | 1.25rem | 20px | Subheadings |
| `--font-size-2xl` | 1.5rem | 24px | Section titles |
| `--font-size-3xl` | 1.875rem | 30px | KPI values |
| `--font-size-4xl` | 2.25rem | 36px | Large headings |
| `--font-size-5xl` | 3rem | 48px | Page titles |
| `--font-size-6xl` | 3.75rem | 60px | Hero text |
| `--font-size-7xl` | 4.5rem | 72px | Display |
| `--font-size-8xl` | 6rem | 96px | Display |
| `--font-size-9xl` | 8rem | 128px | Display |

### Heading Hierarchy (Drift Prevention)

Semantic tokens that prevent typography drift:

| Level | Token | Size | Weight | Color | Line Height |
|-------|-------|------|--------|-------|-------------|
| H1 | `--heading-1-*` | 32px | 700 | `lux` | 1.2 |
| H2 | `--heading-2-*` | 24px | 600 | `lux` | 1.3 |
| H3 | `--heading-3-*` | 20px | 600 | `lux` | 1.4 |
| H4 | `--heading-4-*` | 18px | 600 | `lux` | 1.4 |
| H5 | `--heading-5-*` | 16px | 600 | `lux` | 1.5 |
| H6 | `--heading-6-*` | 14px | 600 | `lux-dim` | 1.5 |

**Usage:** Use `.na-h1` through `.na-h6` classes instead of arbitrary font sizes.

### Data & Metadata (Drift Prevention)

| Type | Token | Size | Weight | Font | Letter Spacing |
|------|-------|------|--------|------|----------------|
| Data | `--data-*` | 14px | 400 | Mono | — |
| Data (Large) | `--data-large-*` | 30px | 500 | Serif | — |
| Metadata | `--metadata-*` | 11px | 500 | Sans | 0.1em |
| Metadata (Small) | `--metadata-small-*` | 10px | 400 | Sans | — |

**Usage:** Use `.na-data`, `.na-data-large`, `.na-metadata` classes.

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--lh-tight` | 1.2 | Headings |
| `--lh-ui` | 1.5 | UI labels, data |
| `--lh-editorial` | 1.6 | Body text (Comfort standard) |
| `--lh-code` | 1.4 | Code blocks |
| `--lh-relaxed` | 1.75 | Long-form content |

---

## Spacing

**4px increment scale from 0 to 384px:**

| Token | Value (rem) | Pixels | Use Case |
|-------|------------|--------|----------|
| `--spacing-0` | 0 | 0px | No space |
| `--spacing-1` | 0.25rem | 4px | Micro spacing |
| `--spacing-2` | 0.5rem | 8px | Tight spacing |
| `--spacing-3` | 0.75rem | 12px | Small spacing |
| `--spacing-4` | 1rem | 16px | Default spacing |
| `--spacing-5` | 1.25rem | 20px | Medium spacing |
| `--spacing-6` | 1.5rem | 24px | **Comfort standard** |
| `--spacing-8` | 2rem | 32px | Large spacing |
| `--spacing-12` | 3rem | 48px | X-large spacing |
| `--spacing-16` | 4rem | 64px | Rail width |
| `--spacing-24` | 6rem | 96px | Page padding |
| `--spacing-32` | 8rem | 128px | Modal width |
| `--spacing-48` | 12rem | 192px | Container |
| `--spacing-96` | 24rem | 384px | Max spacing |

**Comfort Edition Standard:** 
- Base padding: 24px (`--spacing-6`)
- Base line-height: 1.6
- Base font-size: 15px

---

## Radius

### Semantic Radius (Neo-Analog)

| Token | Value | Use Case |
|-------|-------|----------|
| `--radius-card` | 12px | Card containers |
| `--radius-panel` | 16px | Panel containers |
| `--radius-control` | 8px | Form controls |

### Standard Scale

| Token | Value | Pixels |
|-------|-------|--------|
| `--radius-none` | 0 | 0px |
| `--radius-xs` | 0.125rem | 2px |
| `--radius-sm` | 0.25rem | 4px |
| `--radius-md` | 0.375rem | 6px |
| `--radius-lg` | 0.5rem | 8px |
| `--radius-xl` | 0.75rem | 12px |
| `--radius-2xl` | 1rem | 16px |
| `--radius-3xl` | 1.5rem | 24px |
| `--radius-full` | 9999px | Pill shape |

---

## Shadows

### Standard Shadows

| Token | Definition | Use Case |
|-------|-----------|----------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Default |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Prominent |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)` | Large |
| `--shadow-2xl` | `0 25px 50px -12px rgba(0,0,0,0.25)` | X-large |

### Neo-Analog Signature Shadows

| Token | Definition | Character |
|-------|-----------|-----------|
| `--shadow-card` | Inset + drop shadow combo | Depth, premium feel |
| `--shadow-lift` | `0 10px 30px -10px rgba(0,0,0,0.5)` | Floating effect |
| `--shadow-deep` | `0 22px 60px -28px rgba(0,0,0,0.8)` | Modal backdrop |
| `--shadow-gilded` | Gold-tinted glow | Accent highlight |

---

## Effects

### Blur

| Token | Pixels |
|-------|--------|
| `--blur-none` | 0px |
| `--blur-xs` | 2px |
| `--blur-sm` | 4px |
| `--blur-md` | 6px |
| `--blur-lg` | 8px |
| `--blur-xl` | 12px |
| `--blur-2xl` | 20px |
| `--blur-3xl` | 32px |

### Opacity Scale

| Token | Value |
|-------|-------|
| `--opacity-0` | 0% |
| `--opacity-25` | 25% |
| `--opacity-50` | 50% |
| `--opacity-75` | 75% |
| `--opacity-100` | 100% |

**Semantic:**
- `--opacity-disabled` — 50%
- `--opacity-hover` — 80%
- `--opacity-pressed` — 60%
- `--opacity-focus` — 90%

---

## Motion

### Easing Functions

| Token | Curve | Feel |
|-------|-------|------|
| `--ease-linear` | Linear | Constant speed |
| `--ease-in` | Accelerate | Speed up |
| `--ease-out` | Decelerate | Slow down |
| `--ease-in-out` | Smooth | Natural |
| `--ease-premium` | `cubic-bezier(0.2, 0, 0, 1)` | **Neo-Analog signature** |
| `--ease-smooth` | Custom | Comfortable |
| `--ease-back` | Bounce in | Playful |
| `--ease-elastic` | Elastic | Dynamic |

### Duration Scale

| Token | Time | Use Case |
|-------|------|----------|
| `--duration-75` | 75ms | Instant feedback |
| `--duration-100` | 100ms | Quick transitions |
| `--duration-150` | 150ms | Default |
| `--duration-200` | 200ms | Standard transition |
| `--duration-300` | 300ms | Deliberate motion |
| `--duration-500` | 500ms | Slow transition |
| `--duration-700` | 700ms | Very slow |
| `--duration-1000` | 1000ms | Slow reveal |

### Pre-Defined Animations

| Class | Animation | Duration |
|-------|-----------|----------|
| `.animate-fade-in` | Fade in | 200ms |
| `.animate-slide-up` | Slide up | 300ms |
| `.animate-scale-in` | Scale in | 150ms |
| `.animate-soft-pulse` | Soft pulse | 2.4s |
| `.animate-shimmer` | Shimmer | 1.35s |

**All animations respect `prefers-reduced-motion`.**

---

## Z-Index

### Base Scale

| Token | Value | Purpose |
|-------|-------|---------|
| `--z-0` | 0 | Base layer |
| `--z-10` | 10 | Sticky columns |
| `--z-20` | 20 | Sticky rows |
| `--z-30` | 30 | Sticky corner |
| `--z-40` | 40 | Header |
| `--z-50` | 50 | Drawer |

### Semantic Z-Index

| Token | Value | Component |
|-------|-------|-----------|
| `--z-dropdown` | 1000 | Dropdown menus |
| `--z-sticky` | 1020 | Sticky elements |
| `--z-fixed` | 1030 | Fixed elements |
| `--z-modal-backdrop` | 1040 | Modal background |
| `--z-modal` | 1050 | Modal dialog |
| `--z-popover` | 1060 | Popovers, tooltips |
| `--z-tooltip` | 1070 | Tooltips |
| `--z-toast` | 1080 | Toast notifications |

---

## Export Formats

### JSON (dist/tokens.json)

```json
{
  "colors": {
    "void": "#09090b",
    "paper": "#121214",
    "gold": "#eab308"
  },
  "spacing": {
    "4": "1rem",
    "6": "1.5rem",
    "8": "2rem"
  },
  "typography": {
    "heading1": {
      "size": "2rem",
      "weight": "700"
    }
  }
}
```

### TypeScript (dist/tokens/index.d.ts)

```typescript
export interface DesignTokens {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, unknown>;
  // ... more tokens
}
```

### CSS (style.css)

All tokens available as CSS custom properties:

```css
:root {
  --color-void: #09090b;
  --spacing-6: 1.5rem;
  /* ... 254 total tokens */
}
```

---

## Best Practices

✅ **DO:**
- Use token variables: `color: var(--color-lux);`
- Use semantic tokens: `--color-primary`, `--color-destructive`
- Use spacing scale: `padding: var(--spacing-6);`
- Use typography classes: `.na-h1`, `.na-data`, `.na-metadata`

❌ **DON'T:**
- Hardcode colors: `#f4f4f5`
- Hardcode spacing: `padding: 24px;`
- Hardcode font sizes: `font-size: 14px;`
- Mix token systems: Don't use arbitrary Tailwind values

---

**Last Updated:** 2025-01-24  
**Token Count:** 254 design tokens  
**Source:** [input.css](../input.css)  
**Package:** [@aibos/design-system](https://www.npmjs.com/package/@aibos/design-system)
