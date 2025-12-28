# Neo-Analog Design System v2.0

**Version**: 2.0  
**Last Updated**: 2025-01-27  
**Status**: ✅ **Production-Ready | Beast Mode Enabled**

---

## Overview

The Neo-Analog Design System is an enterprise-grade, production-ready design system that achieves **100% Figma compliance** and delivers **desktop-app performance** with pure CSS/HTML—zero JavaScript framework overhead.

### Key Features

- ✅ **254 Design Tokens** - Comprehensive token system (colors, typography, spacing, shadows, motion)
- ✅ **171 Semantic Classes** - Reusable `.na-*` component classes
- ✅ **Beast Mode Patterns** - Advanced patterns (Radio State Machine, Bi-directional Grid, Omni Shell)
- ✅ **100% Figma Compliant** - Full alignment with Figma design system standards
- ✅ **Zero Framework Overhead** - Pure CSS/HTML implementation
- ✅ **Drift Prevention** - Automated semantic validation
- ✅ **Headless Architecture** - Platform-agnostic design API

---

## Quick Start

### For External Users (npm Package)

```bash
# Install
npm install aibos-design-system

# Import CSS
import 'aibos-design-system/css';
# or
import 'aibos-design-system';

# Use classes
<div className="na-card na-p-6">Content</div>
```

📖 **See [EXTERNAL_USAGE.md](./EXTERNAL_USAGE.md) for complete external usage guide**  
📋 **See [API_REFERENCE.md](./API_REFERENCE.md) for typography, spacing, and component reference**

### 📋 Quick Reference for npm Users

**Typography Hierarchy:**
- `.na-h1` = 32px bold (Page titles)
- `.na-h2` = 24px semibold (Section titles)
- `.na-h3` = 20px semibold (Subsections)
- `.na-h4` = 18px semibold (Card titles)
- `.na-data` = 14px monospace (Data values)
- `.na-data-large` = 30px serif (KPI values)
- `.na-metadata` = 11px uppercase (Labels)

**Spacing:**
- Use standard Tailwind classes: `p-4` (16px), `p-6` (24px), `p-8` (32px)
- Standard padding: `p-6` (24px)
- Standard gap: `gap-6` (24px)

**Components:**
- Cards: `.na-card p-6`
- Buttons: `.na-btn na-btn-primary`
- Status: `.na-status na-status-ok`

👉 **Full details in [API_REFERENCE.md](./API_REFERENCE.md)**

### For Developers (Local Development)

```bash
cd design_system
pnpm install
```

### Build

```bash
pnpm build      # Compile CSS from input.css
pnpm watch      # Watch mode for development
pnpm dev        # Development mode (watch)
```

### Quality Control

```bash
pnpm quality        # Run all quality checks
pnpm validate       # Design token validation
pnpm lint           # CSS/JS linting
pnpm enforce:semantics  # Drift detection
pnpm validate:all   # Combined validation
```

---

## Documentation

### For npm Package Users

1. **[API Reference](./API_REFERENCE.md)** ⭐ **QUICK REFERENCE**
   - Typography hierarchy (sizes, weights, usage)
   - Spacing & padding scale
   - Component classes
   - Color tokens
   - Complete API reference

2. **[External Usage Guide](./EXTERNAL_USAGE.md)** ⭐ **GETTING STARTED**
   - Installation instructions
   - Framework examples (React, Vue, Svelte)
   - Common patterns
   - Troubleshooting

### Essential Guides

3. **[Design System Guide](./docs/DESIGN_SYSTEM.md)** ⭐ **COMPLETE REFERENCE**
   - Complete design system reference
   - All tokens, components, and patterns
   - Usage guidelines and examples

2. **[Advanced Patterns](./docs/ADVANCED_PATTERNS.md)** 🚀 **BEAST MODE**
   - Radio Button State Machine (0ms latency view switching)
   - Bi-directional Sticky Grid (Frozen panes)
   - Omni Shell Layout (Grid-based application shell)
   - Status Select Component

3. **[Quick Start Guide](./docs/QUICK_START_GUIDE.md)**
   - Single repository setup
   - Monorepo integration
   - Framework integration examples

4. **[Color System Reference](./docs/COLOR_SYSTEM_REFERENCE.md)**
   - Complete color token reference
   - Semantic color mappings
   - Usage examples

5. **[Headless Architecture](./docs/HEADLESS_ARCHITECTURE_STRATEGY.md)**
   - Platform-agnostic design API
   - Headless map extraction
   - Cross-platform usage

### AI Agent Protocol

**[AI Design Protocol](./AI_DESIGN_PROTOCOL.md)** - Strict instructions for AI agents to enforce semantic class usage and prevent drift.

---

## Prototypes

### System Launcher

**Start here**: Open [`prototypes/index.html`](./prototypes/index.html) to access the **System Launcher**—a high-impact landing page presenting all prototypes as a cohesive product suite.

### The Neo-Analog Trilogy (Beast Mode)

1. **[The Console](./prototypes/prototype-dashboard-nextgen.html)** 📊
   - Executive Command Center
   - Breathing data visualizations
   - Cinematic lighting effects

2. **[OMNI ERP OS](./prototypes/omni-erp-integrated.html)** ⚡ **GOLD STANDARD**
   - High-Frequency ERP Operating System
   - Bi-directional sticky grids
   - CSS state machines (0ms latency)

3. **[Project AEGIS](./prototypes/prototype-aegis-threat-map.html)** 🛡️
   - Cybersecurity Threat Map
   - Pure CSS data visualization
   - CSS Grid world maps, motion paths, hex-grid topology

### Standard Modules

- **[UI Kit Reference](./prototypes/prototype-ui-kit.html)** - Complete component showcase
- **[ERP God Mode](./prototypes/prototype-erp-god-mode.html)** - Enterprise ERP dashboard
- **[Data Lineage](./prototypes/prototype-data-lineage.html)** - Data catalog and lineage
- **[IDE Dashboard](./prototypes/prototype-ide-dashboard.html)** - IDE-style dashboard
- **[Supabase ERP](./prototypes/prototype-supabase-erp.html)** - Supabase integration

See [`prototypes/README.md`](./prototypes/README.md) for complete prototype documentation.

---

## File Structure

```
design_system/
├── README.md                    # This file
├── AI_DESIGN_PROTOCOL.md        # AI agent protocol
├── input.css                    # Source file (all design tokens)
├── style.css                    # Compiled output
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── .stylelintrc.json            # CSS linting rules
├── eslint.config.js             # JavaScript linting
├── docs/                        # Documentation
│   ├── DESIGN_SYSTEM.md         # ⭐ Main documentation
│   ├── ADVANCED_PATTERNS.md     # 🚀 Beast Mode patterns
│   ├── QUICK_START_GUIDE.md     # Getting started
│   ├── COLOR_SYSTEM_REFERENCE.md # Color reference
│   ├── HEADLESS_ARCHITECTURE_STRATEGY.md # Headless API
│   └── archive/                 # Archived documentation
├── prototypes/                  # Production prototypes
│   ├── index.html              # 🚀 System Launcher
│   ├── omni-erp-integrated.html # ⚡ Gold Standard
│   ├── prototype-*.html        # Official prototypes
│   ├── README.md               # Prototype documentation
│   └── archive/                # Archived prototypes
├── scripts/                     # Build and validation scripts
│   ├── enforce-semantics.cjs   # Drift detection
│   ├── extract-headless-map.cjs # Headless map extraction
│   ├── extract-tokens.js        # Token extraction
│   └── validate-design-tokens.js # Token validation
└── dist/                        # Generated files
    ├── tokens.json              # Extracted tokens
    ├── headless-map.json        # Headless design map
    └── tokens/                  # TypeScript definitions
```

---

## Usage Examples

### Typography

```html
<h1 class="na-h1">Page Title</h1>
<h2 class="na-h2">Section Title</h2>
<div class="na-data">$12,450.00</div>
<div class="na-metadata">PO-88219 • Feed Supply</div>
```

### Components

```html
<div class="na-card">
  <h3 class="na-h4">Card Title</h3>
  <div class="na-data">Data value</div>
</div>
```

### Beast Mode Patterns

```html
<!-- Radio Button State Machine -->
<input type="radio" name="view" id="v-grid" class="na-state-radio" checked>
<label for="v-grid" class="na-state-label">Grid</label>

<!-- Bi-directional Sticky Grid -->
<div class="na-grid-frozen">
  <table class="na-table-frozen">...</table>
</div>

<!-- Omni Shell Layout -->
<div class="na-shell-omni">
  <header class="na-shell-head">...</header>
  <aside class="na-shell-rail">...</aside>
  <main class="na-shell-main">...</main>
</div>
```

---

## Scripts Reference

| Command | Description |
|---------|-------------|
| `pnpm build` | Compile CSS from input.css |
| `pnpm watch` | Watch mode for development |
| `pnpm dev` | Development mode (watch) |
| `pnpm extract:tokens` | Extract design tokens to JSON |
| `pnpm extract:headless` | Generate headless design map |
| `pnpm enforce:semantics` | Run drift detection |
| `pnpm validate` | Validate design tokens |
| `pnpm validate:all` | Run all validations |
| `pnpm quality` | Run complete quality check |
| `pnpm lint` | Run linting |
| `pnpm lint:fix` | Fix linting issues |

---

## Design Tokens

### Available Exports

```typescript
// CSS
import '@aibos/design-system/css'

// Tokens (JSON)
import tokens from '@aibos/design-system/tokens'

// Tokens (TypeScript)
import type { DesignTokens } from '@aibos/design-system/tokens/typescript'
```

---

## Documentation

### For External Users

- **[EXTERNAL_USAGE.md](./EXTERNAL_USAGE.md)** ⭐ **START HERE** - How to install and use as npm package
- **[API_REFERENCE.md](./API_REFERENCE.md)** - Complete typography, spacing, and component reference
- **[NPM Publishing Guide](./docs/NPM_PUBLISHING_GUIDE.md)** - How to publish to npm via GitHub Actions
- **[Publishing Guide](./docs/PUBLISHING_GUIDE.md)** - Manual publishing instructions

### For Developers

- **[Design System Guide](./docs/DESIGN_SYSTEM.md)** - Complete design system reference
- **[Advanced Patterns](./docs/ADVANCED_PATTERNS.md)** - Beast Mode patterns documentation
- **[Quick Start Guide](./docs/QUICK_START_GUIDE.md)** - Development setup

## Support

For questions or issues:

1. **External users**: Check [EXTERNAL_USAGE.md](./EXTERNAL_USAGE.md) first
2. **Developers**: Check [DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) first
3. Review [ADVANCED_PATTERNS.md](./docs/ADVANCED_PATTERNS.md) for Beast Mode patterns
4. Run `pnpm quality` to check for issues
5. Review validation output

---

## Status

**Version**: 2.0  
**Last Updated**: 2025-01-27  
**Status**: ✅ **Production Ready**  
**Beast Mode**: ✅ **Enabled**  
**Prototypes**: 8 production-ready modules  
**Documentation**: Complete and consolidated

---

**Neo-Analog Design System** - Enterprise-grade UI framework with zero framework overhead.
