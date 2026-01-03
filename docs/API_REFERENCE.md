# API Reference

> **Auto-generated** from `dist/api-docs.json`  
> **Last updated**: 2026-01-03T09:49:26.160Z  
> **Source**: Design system classes and components

---

## Overview

This document provides a complete API reference for the Neo-Analog Design System.

**Design System**: Neo-Analog Design System v2.0.0  
**Description**: Enterprise-grade design system with 254 tokens, 171 semantic classes

---

## Typography

### Headings

| Class | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `na-h1` | 32px | 700 | 1.2 | Page titles (unique H1 per page) |
| `na-h2` | 24px | 600 | 1.3 | Section titles (major page divisions) |
| `na-h3` | 20px | 600 | 1.4 | Subsection titles (within sections) |
| `na-h4` | 18px | 600 | 1.4 | Card titles (inside .na-card) |
| `na-h5` | 16px | 600 | 1.5 | Small titles (minor groupings) |
| `na-h6` | 14px | 600 | 1.5 | Micro titles (tooltips, tiny headers) |

### Data & Metadata

| Class | Size | Weight | Font | Usage |
|-------|------|--------|------|-------|
| `na-data` | 14px | 400 | Monospace | Primary data values, table cells, user input |
| `na-data-large` | 30px | 500 | Serif | KPI values, hero numbers, dashboard stats |
| `na-metadata` | 11px | 500 | Sans | Field labels, column headers (uppercase, tracked) |
| `na-metadata-small` | 10px | 400 | Sans | Timestamps, IDs, footnotes, secondary info |

## Components

### Cards

| Class | Description | Example |
|-------|-------------|---------|
| `na-card` | Paper background, shadow, filament top border | `<div class="na-card na-p-6">Content</div>` |
| `na-panel` | Muted background, internal separation | `<div class="na-panel na-p-4">Panel</div>` |

### Buttons

| Class | Description | Example |
|-------|-------------|---------|
| `na-btn` | Standard button | `<button class="na-btn">Click</button>` |
| `na-btn-primary` | Primary action button | `<button class="na-btn-primary">Submit</button>` |
| `na-btn-secondary` | Secondary button | `<button class="na-btn-secondary">Cancel</button>` |

### Status

| Class | Description | Example |
|-------|-------------|---------|
| `na-status` | Status indicator base | `<div class="na-status ok">Active</div>` |
| `na-status-ok` | Success status | `<div class="na-status ok">Success</div>` |
| `na-status-pending` | Pending status | `<div class="na-status pending">Pending</div>` |
| `na-status-bad` | Error status | `<div class="na-status bad">Error</div>` |

## Layout

### Shell

| Class | Description | Example |
|-------|-------------|---------|
| `na-shell` | Sidebar + Main area grid | `<div class="na-shell">...</div>` |
| `na-shell-omni` | Omni shell layout (grid-based) | `<div class="na-shell-omni">...</div>` |
| `na-shell-head` | Shell header | `<header class="na-shell-head">Header</header>` |
| `na-shell-rail` | Shell sidebar | `<aside class="na-shell-rail">Sidebar</aside>` |
| `na-shell-main` | Shell main content area | `<main class="na-shell-main">Content</main>` |

### Grid

| Class | Description | Example |
|-------|-------------|---------|
| `na-grid` | Standard grid with 24px gap | `<div class="na-grid gap-6">...</div>` |
| `na-grid-frozen` | Bi-directional sticky grid (frozen panes) | `<div class="na-grid-frozen">...</div>` |
| `na-table-frozen` | Frozen table (sticky columns/rows) | `<table class="na-table-frozen">...</table>` |

## Design Tokens

### Base Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-void` | `#09090b` | Main background (dark) |
| `--color-paper` | `#121214` | Panel background |
| `--color-paper-2` | `#18181b` | Hover state / input |
| `--color-lux` | `#f4f4f5` | Primary text (light) |
| `--color-lux-dim` | `#a1a1aa` | Secondary text |
| `--color-clay` | `#71717a` | Metadata / labels |
| `--color-gold` | `#eab308` | Primary accent |

### Status Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-success` | `#10b981` | Success / positive |
| `--color-warning` | `#f59e0b` | Warning / attention |
| `--color-error` | `#f43f5e` | Error / destructive |
| `--color-info` | `#3b82f6` | Info / neutral |

## Utility Classes

| Class | Category | Description |
|-------|----------|-------------|
| `na-shimmer` | utility | AIBOS design system class: na-shimmer |
| `na-mode-app` | utility | AIBOS design system class: na-mode-app |
| `na-mode-doc` | utility | AIBOS design system class: na-mode-doc |
| `na-bg-grain` | utility | AIBOS design system class: na-bg-grain |
| `na-shell-main` | layout | AIBOS design system class: na-shell-main |
| `na-panel` | component | AIBOS design system class: na-panel |
| `na-clickable` | utility | AIBOS design system class: na-clickable |
| `na-select-all` | utility | AIBOS design system class: na-select-all |
| `na-select-none` | utility | AIBOS design system class: na-select-none |
| `na-h1` | typography | Page title (32px bold) |
| `na-h2` | typography | Section title (24px semibold) |
| `na-h3` | typography | Subsection title (20px semibold) |
| `na-h4` | typography | Card title (18px semibold) |
| `na-h5` | typography | AIBOS design system class: na-h5 |
| `na-h6` | typography | AIBOS design system class: na-h6 |
| `na-balance` | utility | AIBOS design system class: na-balance |
| `na-pretty` | utility | AIBOS design system class: na-pretty |
| `na-data` | typography | Primary data values, table cells |
| `na-data-large` | typography | KPI values, hero numbers |
| `na-metadata` | typography | Field labels, column headers |
| `na-metadata-small` | typography | AIBOS design system class: na-metadata-small |
| `na-body` | utility | AIBOS design system class: na-body |
| `na-body-sm` | utility | AIBOS design system class: na-body-sm |
| `na-label` | utility | AIBOS design system class: na-label |
| `na-field` | utility | AIBOS design system class: na-field |
| `na-tabular` | utility | AIBOS design system class: na-tabular |
| `na-muted` | utility | AIBOS design system class: na-muted |
| `na-truncate` | utility | AIBOS design system class: na-truncate |
| `na-clamp-2` | utility | AIBOS design system class: na-clamp-2 |
| `na-clamp-3` | utility | AIBOS design system class: na-clamp-3 |
| `na-z-base` | utility | AIBOS design system class: na-z-base |
| `na-z-sticky` | utility | AIBOS design system class: na-z-sticky |
| `na-z-drawer` | utility | AIBOS design system class: na-z-drawer |
| `na-z-overlay` | utility | AIBOS design system class: na-z-overlay |
| `na-z-modal` | utility | AIBOS design system class: na-z-modal |
| `na-z-toast` | utility | AIBOS design system class: na-z-toast |
| `na-divider` | utility | AIBOS design system class: na-divider |
| `na-pulse-success` | utility | AIBOS design system class: na-pulse-success |
| `na-pulse-warning` | utility | AIBOS design system class: na-pulse-warning |
| `na-pulse-error` | utility | AIBOS design system class: na-pulse-error |
| `na-pulse-info` | utility | AIBOS design system class: na-pulse-info |
| `na-pulse-gold` | utility | AIBOS design system class: na-pulse-gold |
| `na-scroll` | utility | AIBOS design system class: na-scroll |
| `na-app` | utility | AIBOS design system class: na-app |
| `na-content` | utility | AIBOS design system class: na-content |
| `na-skip-link` | utility | AIBOS design system class: na-skip-link |
| `na-shell` | layout | Sidebar + Main area grid |
| `na-shell-omni` | layout | AIBOS design system class: na-shell-omni |
| `na-shell-head` | layout | AIBOS design system class: na-shell-head |
| `na-shell-rail` | layout | AIBOS design system class: na-shell-rail |
| `na-shell-foot` | layout | AIBOS design system class: na-shell-foot |
| `na-shell-drawer` | layout | AIBOS design system class: na-shell-drawer |
| `na-sidebar` | utility | AIBOS design system class: na-sidebar |
| `na-brand` | utility | AIBOS design system class: na-brand |
| `na-mark` | utility | AIBOS design system class: na-mark |
| `na-nav-section` | utility | AIBOS design system class: na-nav-section |
| `na-nav-item` | utility | AIBOS design system class: na-nav-item |
| `na-header` | typography | AIBOS design system class: na-header |
| `na-search` | utility | AIBOS design system class: na-search |
| `na-search-input` | utility | AIBOS design system class: na-search-input |
| `na-search-icon` | utility | AIBOS design system class: na-search-icon |
| `na-card` | component | Paper background, shadow, filament top border |
| `na-card-interactive` | component | AIBOS design system class: na-card-interactive |
| `na-kpi` | utility | AIBOS design system class: na-kpi |
| `na-kpi-value` | utility | AIBOS design system class: na-kpi-value |
| `na-kpi-label` | utility | AIBOS design system class: na-kpi-label |
| `na-kpi-icon` | utility | AIBOS design system class: na-kpi-icon |
| `na-trend` | utility | AIBOS design system class: na-trend |
| `na-chart` | utility | AIBOS design system class: na-chart |
| `na-bars` | utility | AIBOS design system class: na-bars |
| `na-bar` | utility | AIBOS design system class: na-bar |
| `na-table-wrap` | utility | AIBOS design system class: na-table-wrap |
| `na-table` | utility | AIBOS design system class: na-table |
| `na-th` | utility | AIBOS design system class: na-th |
| `na-td` | utility | AIBOS design system class: na-td |
| `na-tr-interactive` | utility | AIBOS design system class: na-tr-interactive |
| `na-btn` | button | Standard button |
| `na-btn-primary` | button | Primary action button |
| `na-btn-ghost` | button | AIBOS design system class: na-btn-ghost |
| `na-btn-destructive` | button | AIBOS design system class: na-btn-destructive |
| `na-iconbtn` | utility | AIBOS design system class: na-iconbtn |
| `na-dot` | utility | AIBOS design system class: na-dot |
| `na-input` | utility | AIBOS design system class: na-input |
| `na-status` | status | AIBOS design system class: na-status |
| `na-avatar` | utility | AIBOS design system class: na-avatar |
| `na-switch` | utility | AIBOS design system class: na-switch |
| `na-switch-thumb` | utility | AIBOS design system class: na-switch-thumb |
| `na-dropdown` | utility | AIBOS design system class: na-dropdown |
| `na-dropdown-menu` | utility | AIBOS design system class: na-dropdown-menu |
| `na-modal` | utility | AIBOS design system class: na-modal |
| `na-tooltip` | utility | AIBOS design system class: na-tooltip |
| `na-toasts` | utility | AIBOS design system class: na-toasts |
| `na-toast` | utility | AIBOS design system class: na-toast |
| `na-skeleton` | utility | AIBOS design system class: na-skeleton |
| `na-empty` | utility | AIBOS design system class: na-empty |
| `na-empty-illustration` | utility | AIBOS design system class: na-empty-illustration |

## Package Exports

| Export | Description |
|--------|-------------|
| `@aibos/design-system/css` | Main CSS file |
| `@aibos/design-system/tokens` | Design tokens JSON |
| `@aibos/design-system/tokens/typescript` | Design tokens TypeScript types |
| `@aibos/design-system/react` | React components |
| `@aibos/design-system/types` | TypeScript type definitions |
| `@aibos/design-system/utils` | Utility functions |
| `@aibos/design-system/cli` | CLI tools |


---

## Usage

### CSS Classes

All classes can be used directly in HTML:

```html
<h1 class="na-h1">Page Title</h1>
<div class="na-card na-p-6">Card Content</div>
<button class="na-btn-primary">Submit</button>
```

### JavaScript/TypeScript

```typescript
import { Button, Card } from '@aibos/design-system/react';
```

---

**Generated by**: `scripts/generate-api-reference-md.js`  
**Source**: `dist/api-docs.json`
