# API Reference

> **Auto-generated** from `dist/api-docs.json`  
> **Last updated**: 2026-01-03T15:00:40.618Z  
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
| `na-bg-grain` | utility | AIBOS design system class: na-bg-grain |
| `na-tabular` | utility | AIBOS design system class: na-tabular |
| `na-muted` | utility | AIBOS design system class: na-muted |
| `na-shimmer` | utility | AIBOS design system class: na-shimmer |
| `na-scroll` | utility | AIBOS design system class: na-scroll |
| `na-h1` | typography | Page title (32px bold) |
| `na-h2` | typography | Section title (24px semibold) |
| `na-h3` | typography | Subsection title (20px semibold) |
| `na-h4` | typography | Card title (18px semibold) |
| `na-h5` | typography | AIBOS design system class: na-h5 |
| `na-h6` | typography | AIBOS design system class: na-h6 |
| `na-data` | typography | Primary data values, table cells |
| `na-data-large` | typography | KPI values, hero numbers |
| `na-metadata` | typography | Field labels, column headers |
| `na-metadata-small` | typography | AIBOS design system class: na-metadata-small |
| `na-skip-link` | utility | AIBOS design system class: na-skip-link |
| `na-grid-kpi` | layout | AIBOS design system class: na-grid-kpi |
| `na-grid-3` | layout | AIBOS design system class: na-grid-3 |
| `na-card-interactive` | component | AIBOS design system class: na-card-interactive |
| `na-grid-chart` | layout | AIBOS design system class: na-grid-chart |
| `na-activity-item` | utility | AIBOS design system class: na-activity-item |
| `na-grid-actions` | layout | AIBOS design system class: na-grid-actions |
| `na-gap-2` | utility | AIBOS design system class: na-gap-2 |
| `na-gap-3` | utility | AIBOS design system class: na-gap-3 |
| `na-gap-6` | utility | AIBOS design system class: na-gap-6 |
| `na-mt-2` | utility | AIBOS design system class: na-mt-2 |
| `na-mt-3` | utility | AIBOS design system class: na-mt-3 |
| `na-mt-6` | utility | AIBOS design system class: na-mt-6 |
| `na-mb-2` | utility | AIBOS design system class: na-mb-2 |
| `na-mb-3` | utility | AIBOS design system class: na-mb-3 |
| `na-my-3` | utility | AIBOS design system class: na-my-3 |
| `na-grid-2` | layout | AIBOS design system class: na-grid-2 |
| `na-grid-2-1` | layout | AIBOS design system class: na-grid-2-1 |
| `na-flex` | utility | AIBOS design system class: na-flex |
| `na-items-center` | utility | AIBOS design system class: na-items-center |
| `na-p-2` | utility | AIBOS design system class: na-p-2 |
| `na-px-2` | utility | AIBOS design system class: na-px-2 |
| `na-py-2` | utility | AIBOS design system class: na-py-2 |
| `na-bg-paper-2` | utility | AIBOS design system class: na-bg-paper-2 |
| `na-rounded-md` | utility | AIBOS design system class: na-rounded-md |
| `na-text-xs` | utility | AIBOS design system class: na-text-xs |
| `na-text-sm` | utility | AIBOS design system class: na-text-sm |
| `na-mb-1` | utility | AIBOS design system class: na-mb-1 |
| `na-mb-4` | utility | AIBOS design system class: na-mb-4 |
| `na-mt-4` | utility | AIBOS design system class: na-mt-4 |
| `na-p-4` | utility | AIBOS design system class: na-p-4 |
| `na-rounded-control` | utility | AIBOS design system class: na-rounded-control |
| `na-font-semibold` | utility | AIBOS design system class: na-font-semibold |
| `na-flex-1` | utility | AIBOS design system class: na-flex-1 |
| `na-flex-wrap` | utility | AIBOS design system class: na-flex-wrap |
| `na-chip` | utility | AIBOS design system class: na-chip |
| `na-grid-chart-health` | layout | AIBOS design system class: na-grid-chart-health |
| `na-status-dot-success` | status | AIBOS design system class: na-status-dot-success |
| `na-bar` | utility | AIBOS design system class: na-bar |
| `na-shell` | layout | Sidebar + Main area grid |
| `na-mark` | utility | AIBOS design system class: na-mark |
| `na-nav-meta` | utility | AIBOS design system class: na-nav-meta |
| `na-search` | utility | AIBOS design system class: na-search |
| `na-search-input` | utility | AIBOS design system class: na-search-input |
| `na-btn` | button | Standard button |
| `na-btn-primary` | button | Primary action button |
| `na-iconbtn` | utility | AIBOS design system class: na-iconbtn |
| `na-dot` | utility | AIBOS design system class: na-dot |
| `na-card` | component | Paper background, shadow, filament top border |
| `na-card-title` | component | AIBOS design system class: na-card-title |
| `na-card-meta` | component | AIBOS design system class: na-card-meta |
| `na-shell-omni` | layout | AIBOS design system class: na-shell-omni |
| `na-shell-head` | layout | AIBOS design system class: na-shell-head |
| `na-shell-rail` | layout | AIBOS design system class: na-shell-rail |
| `na-shell-main` | layout | AIBOS design system class: na-shell-main |
| `na-shell-drawer` | layout | AIBOS design system class: na-shell-drawer |
| `na-shell-foot` | layout | AIBOS design system class: na-shell-foot |
| `na-state-radio` | utility | AIBOS design system class: na-state-radio |
| `na-state-label` | utility | AIBOS design system class: na-state-label |
| `na-view-pane` | utility | AIBOS design system class: na-view-pane |
| `na-grid-frozen` | layout | AIBOS design system class: na-grid-frozen |
| `na-table-frozen` | utility | AIBOS design system class: na-table-frozen |
| `na-status-opt` | status | AIBOS design system class: na-status-opt |
| `na-viewport` | utility | AIBOS design system class: na-viewport |
| `na-kpi-icon` | utility | AIBOS design system class: na-kpi-icon |
| `na-kpi-value` | utility | AIBOS design system class: na-kpi-value |
| `na-kpi-label` | utility | AIBOS design system class: na-kpi-label |
| `na-trend` | utility | AIBOS design system class: na-trend |
| `na-panel` | component | AIBOS design system class: na-panel |
| `na-panel-title` | component | AIBOS design system class: na-panel-title |
| `na-editorial` | utility | AIBOS design system class: na-editorial |
| `na-table-wrap` | utility | AIBOS design system class: na-table-wrap |
| `na-th` | utility | AIBOS design system class: na-th |
| `na-tr` | utility | AIBOS design system class: na-tr |
| `na-lineage-badge` | utility | AIBOS design system class: na-lineage-badge |
| `na-grid-metadata` | layout | AIBOS design system class: na-grid-metadata |
| `na-progress-fill` | utility | AIBOS design system class: na-progress-fill |
| `na-td` | utility | AIBOS design system class: na-td |
| `na-status` | status | AIBOS design system class: na-status |
| `na-rowbtn` | utility | AIBOS design system class: na-rowbtn |
| `na-footnote` | utility | AIBOS design system class: na-footnote |
| `na-footnote-link` | utility | AIBOS design system class: na-footnote-link |
| `na-empty` | utility | AIBOS design system class: na-empty |
| `na-empty-illustration` | utility | AIBOS design system class: na-empty-illustration |
| `na-empty-title` | utility | AIBOS design system class: na-empty-title |

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
