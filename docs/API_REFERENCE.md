# Neo-Analog Design System - API Reference

**Quick Reference Guide for npm Package Users**

This document provides a complete reference for all typography, spacing, colors, and component classes available in the Neo-Analog Design System.

---

## 📖 Table of Contents

1. [Typography Hierarchy](#typography-hierarchy)
2. [Spacing & Padding](#spacing--padding)
3. [Component Classes](#component-classes)
4. [Color Tokens](#color-tokens)
5. [Layout Classes](#layout-classes)
6. [Using Design Tokens](#using-design-tokens)

---

## Typography Hierarchy

**⚠️ Important**: Always use semantic classes (`.na-h1` through `.na-h6`) instead of hardcoding font sizes. This prevents design drift.

### Heading Classes

| Class | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `.na-h1` | **32px** (2rem) | **700** (bold) | 1.2 | Page titles (unique H1 per page) |
| `.na-h2` | **24px** (1.5rem) | **600** (semibold) | 1.3 | Section titles (major page divisions) |
| `.na-h3` | **20px** (1.25rem) | **600** (semibold) | 1.4 | Subsection titles (within sections) |
| `.na-h4` | **18px** (1.125rem) | **600** (semibold) | 1.4 | Card titles (inside `.na-card`) |
| `.na-h5` | **16px** (1rem) | **600** (semibold) | 1.5 | Small titles (minor groupings) |
| `.na-h6` | **14px** (0.875rem) | **600** (semibold) | 1.5 | Micro titles (tooltips, tiny headers) |

### Data & Metadata Classes

| Class | Size | Weight | Font | Usage |
|-------|------|--------|------|-------|
| `.na-data` | **14px** (0.875rem) | **400** (normal) | Monospace | Primary data values, table cells, user input |
| `.na-data-large` | **30px** (1.875rem) | **500** (medium) | Serif | KPI values, hero numbers, dashboard stats |
| `.na-metadata` | **11px** (0.6875rem) | **500** (medium) | Sans | Field labels, column headers (uppercase, tracked) |
| `.na-metadata-small` | **10px** (0.625rem) | **400** (normal) | Sans | Timestamps, IDs, footnotes, secondary info |

### Typography Examples

```tsx
// Headings
<h1 className="na-h1">Page Title</h1>
<h2 className="na-h2">Section Title</h2>
<h3 className="na-h3">Subsection</h3>
<h4 className="na-h4">Card Title</h4>

// Data & Metadata
<div className="na-data">$12,450.00</div>
<div className="na-data-large">1,234,567</div>
<div className="na-metadata">PO-88219 • Feed Supply</div>
<div className="na-metadata-small">Updated 2m ago</div>
```

---

## Spacing & Padding

The design system uses a **standard Tailwind spacing scale**. Use Tailwind's standard padding/margin classes (e.g., `p-4`, `p-6`, `m-8`).

### Standard Spacing Scale

| Class | Value | Pixels |
|-------|-------|--------|
| `p-0`, `m-0` | 0 | 0px |
| `p-1`, `m-1` | 0.25rem | 4px |
| `p-2`, `m-2` | 0.5rem | 8px |
| `p-4`, `m-4` | 1rem | **16px** |
| `p-6`, `m-6` | 1.5rem | **24px** (standard) |
| `p-8`, `m-8` | 2rem | **32px** |
| `p-12`, `m-12` | 3rem | 48px |
| `p-16`, `m-16` | 4rem | 64px |
| `p-24`, `m-24` | 6rem | 96px |

### Common Spacing Patterns

```tsx
// Standard card padding
<div className="na-card p-6">Content</div>

// Standard content padding
<div className="na-content p-8">Content</div>

// Spacing between elements
<div className="space-y-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Grid with standard gap
<div className="na-grid gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Directional Spacing

Use Tailwind's directional utilities:
- `pt-*`, `pb-*`, `pl-*`, `pr-*` (padding)
- `mt-*`, `mb-*`, `ml-*`, `mr-*` (margin)
- `px-*`, `py-*` (padding horizontal/vertical)
- `mx-*`, `my-*` (margin horizontal/vertical)

```tsx
<div className="na-card p-6 mb-8">Card with bottom margin</div>
<div className="flex gap-4">Items with gap</div>
```

---

## Component Classes

### Cards & Surfaces

| Class | Description |
|-------|-------------|
| `.na-card` | Paper background, shadow, filament top border |
| `.na-panel` | Muted background, internal separation |
| `.na-content` | Standard 32px padding container |

### Buttons

| Class | Description |
|-------|-------------|
| `.na-btn` | Standard button |
| `.na-btn-primary` | Primary action button |
| `.na-btn-secondary` | Secondary button |
| `.na-iconbtn` | Icon-only button |

### Inputs

| Class | Description |
|-------|-------------|
| `.na-input` | Text input (never use default borders) |

### Status Indicators

| Class | Description |
|-------|-------------|
| `.na-status` | Base status badge |
| `.na-status-ok` | Success status (green) |
| `.na-status-pending` | Pending status (yellow) |
| `.na-status-bad` | Error status (red) |

### Tables

| Class | Description |
|-------|-------------|
| `.na-table-wrap` | Table container with scrolling |
| `.na-table` | Table element |
| `.na-th` | Table header cell |
| `.na-td` | Table data cell |
| `.na-tr` | Table row |
| `.na-tabular` | Tabular numbers (for alignment) |

### Component Examples

```tsx
// Card
<div className="na-card p-6">
  <h3 className="na-h4">Card Title</h3>
  <div className="na-data">Content</div>
</div>

// Button
<button className="na-btn na-btn-primary">Click Me</button>

// Status
<span className="na-status na-status-ok">Active</span>

// Table
<div className="na-table-wrap">
  <table className="na-table">
    <thead>
      <tr>
        <th className="na-th">Name</th>
        <th className="na-th">Price</th>
      </tr>
    </thead>
    <tbody>
      <tr className="na-tr">
        <td className="na-td">Product</td>
        <td className="na-td na-tabular">$1,234.56</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Color Tokens

### Base Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-void` | `#09090b` | Main background (Zinc-950) |
| `--color-paper` | `#121214` | Panel background (Zinc-900) |
| `--color-paper-2` | `#18181b` | Hover/Input background (Zinc-800) |
| `--color-lux` | `#f4f4f5` | Primary text (Zinc-50) |
| `--color-lux-dim` | `#a1a1aa` | Secondary text (Zinc-400) |
| `--color-clay` | `#71717a` | Meta/Label text (Zinc-500) |
| `--color-gold` | `#eab308` | Accent color (Amber-500) |

### Status Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-success` | `#10b981` | Success states (Emerald-500) |
| `--color-warning` | `#f59e0b` | Warning states (Amber-500) |
| `--color-error` | `#f43f5e` | Error states (Rose-500) |
| `--color-info` | `#3b82f6` | Info states (Blue-500) |

### Using Color Tokens

```tsx
// In CSS/CSS-in-JS
import '@aibos/design-system/css';

const style = {
  backgroundColor: 'var(--color-paper)',
  color: 'var(--color-lux)',
  borderColor: 'var(--color-stroke)',
};

// In TypeScript/JavaScript
import tokens from '@aibos/design-system/tokens';

const style = {
  backgroundColor: tokens.color.paper,
  color: tokens.color.lux,
};
```

---

## Layout Classes

### Shell Layout

| Class | Description |
|-------|-------------|
| `.na-shell` | Sidebar + Main area grid |
| `.na-shell-omni` | Omni shell layout (grid-based) |
| `.na-shell-head` | Shell header |
| `.na-shell-rail` | Shell sidebar |
| `.na-shell-main` | Shell main content area |

### Grid & Layout

| Class | Description |
|-------|-------------|
| `.na-grid` | Standard grid with 24px gap |
| `.na-grid-frozen` | Bi-directional sticky grid (frozen panes) |
| `.na-table-frozen` | Frozen table (sticky columns/rows) |

### Layout Examples

```tsx
// Standard shell
<div className="na-shell">
  <aside className="na-shell-rail">Sidebar</aside>
  <main className="na-shell-main">Content</main>
</div>

// Standard grid
<div className="na-grid gap-6">
  <div className="na-card p-6">Card 1</div>
  <div className="na-card p-6">Card 2</div>
</div>
```

---

## Using Design Tokens

### Import Tokens

```typescript
// CSS (main export)
import '@aibos/design-system/css';

// Tokens (JSON)
import tokens from '@aibos/design-system/tokens';

// Tokens (TypeScript)
import type { DesignTokens } from '@aibos/design-system/tokens/typescript';
```

### Access Token Values

```typescript
import tokens from '@aibos/design-system/tokens';

// Colors
tokens.color.void        // '#09090b'
tokens.color.paper       // '#121214'
tokens.color.lux         // '#f4f4f5'
tokens.color.gold        // '#eab308'

// Spacing
tokens.spacing[4]        // '1rem' (16px)
tokens.spacing[6]        // '1.5rem' (24px)
tokens.spacing[8]        // '2rem' (32px)

// Typography
tokens.typography.heading1.size  // '2rem'
tokens.typography.heading1.weight // 700

// Border Radius
tokens.radius.card      // '0.75rem'
tokens.radius.panel     // '1rem'
```

### Using in Components

```tsx
import tokens from '@aibos/design-system/tokens';

export function CustomButton() {
  return (
    <button
      className="na-btn"
      style={{
        backgroundColor: tokens.color.gold,
        padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`,
        borderRadius: tokens.radius.control,
      }}
    >
      Custom Button
    </button>
  );
}
```

---

## Quick Reference Cheat Sheet

### Typography
- **Page Title**: `.na-h1` (32px bold)
- **Section**: `.na-h2` (24px semibold)
- **Subsection**: `.na-h3` (20px semibold)
- **Card Title**: `.na-h4` (18px semibold)
- **Data**: `.na-data` (14px monospace)
- **KPI**: `.na-data-large` (30px serif)
- **Label**: `.na-metadata` (11px uppercase)
- **Footnote**: `.na-metadata-small` (10px)

### Spacing
- **Standard padding**: `p-6` (24px)
- **Content padding**: `p-8` (32px)
- **Standard gap**: `gap-6` (24px)

### Components
- **Card**: `.na-card p-6`
- **Button**: `.na-btn na-btn-primary`
- **Status**: `.na-status na-status-ok`
- **Input**: `.na-input`

---

## 📚 Additional Resources

- **Full Documentation**: See [README.md](./README.md) for complete guide
- **External Usage**: See [EXTERNAL_USAGE.md](./EXTERNAL_USAGE.md) for framework examples
- **GitHub**: https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM

---

**Need Help?** Check the [README.md](./README.md) or open an issue on GitHub.

