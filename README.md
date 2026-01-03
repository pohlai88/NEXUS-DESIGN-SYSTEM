# Neo-Analog Design System v1.1.0

**Version**: 1.1.0  
**Last Updated**: 2026-01-03  
**Status**: ✅ **Production-Ready | Beast Mode Enabled | Theme System Complete | shadcn/ui Integrated | React Components Available**

---

## Overview

The Neo-Analog Design System is an enterprise-grade, production-ready design system that achieves **100% Figma compliance** and delivers **desktop-app performance** with pure CSS/HTML—zero JavaScript framework overhead.

### Key Features

- ✅ **245 Design Tokens** - Comprehensive token system (colors, typography, spacing, shadows, motion)
- ✅ **24 React Components** - Production-ready React components with TypeScript support
- ✅ **171 Semantic Classes** - Reusable `.na-*` component classes
- ✅ **10 Production Themes** - From default dark to GitHub-inspired themes
- ✅ **Theme Engine** - Enterprise-grade theme system with SSR support
- ✅ **shadcn/ui Integration** - Complete mapping of 54 shadcn components to AIBOS classes (872 mappings)
- ✅ **Beast Mode Patterns** - Advanced patterns (Radio State Machine, Bi-directional Grid, Omni Shell)
- ✅ **100% Figma Compliant** - Full alignment with Figma design system standards
- ✅ **Zero Framework Overhead** - Pure CSS/HTML implementation
- ✅ **Drift Prevention** - Automated semantic validation
- ✅ **Headless Architecture** - Platform-agnostic design API
- ✅ **IDE Integration** - Full TypeScript support, IntelliSense, and autocomplete

---

## Quick Start

### For External Users (npm Package)

```bash
# Install
npm install @aibos/design-system

# Import CSS
import '@aibos/design-system/css';
# or
import '@aibos/design-system';

# Use classes
<div className="na-card na-p-6">Content</div>

# Or use React components
import { Card, Button } from '@aibos/design-system/react';
```

📖 **See [External Usage Guide](./docs/archive/EXTERNAL_USAGE.md) for complete external usage guide** (archived)  
📋 **See [API Reference](./docs/API_REFERENCE.md) for typography, spacing, and component reference** (auto-generated)  
📦 **See [Component Reference](./docs/COMPONENTS.md) for React components** (auto-generated)  
🎨 **See [Token Reference](./docs/TOKEN_REFERENCE.md) for design tokens** (auto-generated)

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

👉 **Full details in [API Reference](./docs/API_REFERENCE.md)** (auto-generated)

### For Developers (Local Development)

```bash
cd design_system
pnpm install
```

### Build

```bash
pnpm build      # Compile CSS, TypeScript, extract tokens, generate docs
pnpm watch      # Watch mode for development
pnpm dev        # Development mode (watch)
```

**Build Process Includes:**
- CSS compilation from `input.css`
- TypeScript compilation
- Token extraction
- API documentation generation
- Auto-generated documentation (API Reference, Token Reference, Component Reference)
- React adapter generation

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

### Auto-Generated Documentation ⭐ **ALWAYS UP-TO-DATE**

These documents are automatically generated from the codebase and are always current:

1. **[API Reference](./docs/API_REFERENCE.md)** ⭐ **QUICK REFERENCE**
   - Typography hierarchy (sizes, weights, usage)
   - Spacing & padding scale
   - Component classes
   - Color tokens
   - Complete API reference
   - *Auto-generated from `dist/api-docs.json`*

2. **[Component Reference](./docs/COMPONENTS.md)** ⭐ **REACT COMPONENTS**
   - 24 production-ready React components
   - TypeScript definitions
   - Usage examples
   - Props documentation
   - *Auto-generated from `components/react/`*

3. **[Token Reference](./docs/TOKEN_REFERENCE.md)** ⭐ **DESIGN TOKENS**
   - Complete design token reference
   - All 245 tokens documented
   - Color, typography, spacing, shadows, motion
   - *Auto-generated from `dist/tokens.json`*

**Documentation Generation:**
- Run `pnpm generate:docs` to regenerate all documentation
- Documentation is automatically generated during `pnpm build`
- See [Documentation Evaluation](./docs/DOCUMENTATION_EVALUATION.md) for quality metrics

### Manual Documentation

4. **[Design System Guide](./docs/DESIGN_SYSTEM.md)** ⭐ **COMPLETE REFERENCE**
   - Complete design system reference
   - All tokens, components, and patterns
   - Usage guidelines and examples

5. **[Advanced Patterns](./docs/ADVANCED_PATTERNS.md)** 🚀 **BEAST MODE**
   - Radio Button State Machine (0ms latency view switching)
   - Bi-directional Sticky Grid (Frozen panes)
   - Omni Shell Layout (Grid-based application shell)
   - Status Select Component

6. **[Quick Start Guide](./adapters/QUICK_START_GUIDE.md)**
   - Single repository setup
   - Monorepo integration
   - Framework integration examples

### Archived Documentation 📦

Many documentation files have been archived in [`docs/archive/`](./docs/archive/) for reference:
- Theme System guides (moved to archive)
- External Usage Guide (moved to archive)
- IDE Integration guides (moved to archive)
- Historical documentation and migration guides

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

## Storybook ⭐ **COMPONENT DOCUMENTATION**

The design system includes a **Storybook** instance for interactive component documentation and testing.

### Quick Start

```bash
# Start Storybook dev server (if configured)
pnpm storybook

# Build Storybook for production
pnpm build:storybook
```

### Storybook Build Output

The built Storybook is available in the `storybook-static/` directory:
- **Self-contained**: All HTML, CSS, JS, and assets included
- **Independent**: Can be deployed separately from the main application
- **Static**: No server required, works with any static hosting

### Deployment

Storybook can be deployed independently to:
- **Vercel**: Zero-config deployment with automatic HTTPS
- **Netlify**: Static site hosting with CI/CD
- **GitHub Pages**: Free hosting for public repositories
- **Any static hosting**: Just upload the `storybook-static/` folder

📖 **See [Storybook Deployment Guide](./docs/archive/STORYBOOK_DEPLOYMENT_GUIDE.md) for detailed deployment instructions** (archived)  
📖 **See [Storybook Setup Guide](./docs/archive/STORYBOOK_SETUP_AND_OPTIMIZATION.md) for configuration details** (archived)

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
├── eslint.config.js             # JavaScript linting
├── docs/                        # Documentation
│   ├── API_REFERENCE.md         # ⭐ Auto-generated API reference
│   ├── COMPONENTS.md            # ⭐ Auto-generated component reference
│   ├── TOKEN_REFERENCE.md       # ⭐ Auto-generated token reference
│   ├── DESIGN_SYSTEM.md         # Main documentation
│   ├── ADVANCED_PATTERNS.md     # 🚀 Beast Mode patterns
│   ├── DOCUMENTATION_EVALUATION.md # Documentation quality metrics
│   └── archive/                 # Archived documentation (90+ files)
├── components/                  # Component implementations
│   ├── react/                  # React components (24 components)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── shells/             # Shell components
│   │   ├── contexts/           # React contexts
│   │   └── hooks/              # Custom hooks
│   ├── html/                   # HTML component examples
│   ├── web-components/         # Web component implementations
│   └── ui/                     # UI component utilities
├── adapters/                    # Framework adapters
│   ├── react/                  # React adapter
│   ├── universal/              # Universal adapter
│   └── web/                    # Web adapter
├── themes/                      # Theme system (29 theme files)
│   ├── index.ts                # Theme exports
│   ├── light-theme.ts
│   ├── attractive-theme.ts
│   └── ...                     # Additional themes
├── prototypes/                  # Production prototypes
│   ├── index.html              # 🚀 System Launcher
│   ├── omni-erp-integrated.html # ⚡ Gold Standard
│   ├── prototype-*.html        # Official prototypes (30+ files)
│   ├── advanced/               # Advanced prototypes
│   ├── core/                   # Core prototypes
│   ├── demos/                  # Demo prototypes
│   ├── features/               # Feature prototypes
│   ├── tokens/                 # Token prototypes
│   ├── README.md               # Prototype documentation
│   └── archive/                # Archived prototypes
├── storybook-static/            # Storybook build output
│   ├── index.html              # Storybook entry point
│   ├── iframe.html             # Storybook iframe
│   ├── chunks/                 # JavaScript chunks
│   ├── assets/                 # CSS, images, fonts
│   └── sb-common-assets/       # Storybook assets
├── scripts/                     # Build and validation scripts
│   ├── enforce-semantics.cjs   # Drift detection
│   ├── extract-headless-map.cjs # Headless map extraction
│   ├── extract-tokens.js        # Token extraction
│   ├── generate-shadcn-map.js  # shadcn/ui mapping generator
│   ├── generate-all-docs.js    # Documentation generator
│   ├── generate-api-reference-md.js # API reference generator
│   ├── cleanup-docs.js         # Documentation cleanup
│   └── validate-design-tokens.js # Token validation
├── specs/                       # Component specifications
│   ├── components/             # Component specs (JSON)
│   └── examples/               # Spec examples
├── components.json              # shadcn/ui configuration
└── dist/                        # Generated files
    ├── tokens.json              # Extracted tokens
    ├── headless-map.json        # Headless design map
    ├── shadcn-map.json          # shadcn/ui component mapping
    ├── api-docs.json            # API documentation
    ├── component-specs.json     # Component specifications
    ├── css-custom-data.json     # VS Code IntelliSense data
    ├── validation-rules.json    # Validation rules
    ├── helpers-docs.json        # Helper documentation
    ├── eslint-config.json       # ESLint configuration
    ├── components/              # Compiled components
    ├── adapters/                # Compiled adapters
    ├── lib/                     # Compiled library code
    ├── types/                   # TypeScript definitions
    └── web/                     # Web build output
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

### Theme System ⭐ **NEW**

```tsx
import { ThemeProvider, useThemeSwitch, lightTheme } from '@aibos/design-system/themes';
import '@aibos/design-system/css';

// Wrap your app
<ThemeProvider customThemes={[lightTheme, twilightTheme, attractiveTheme]}>
  <App />
</ThemeProvider>

// Switch themes
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

📖 **See [Theme System Complete Guide](./docs/archive/THEME_SYSTEM_COMPLETE_GUIDE.md) for full documentation** (archived)

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
| `pnpm build` | Full build (CSS, TypeScript, tokens, docs, adapters) |
| `pnpm build:fast` | Fast build (skip documentation generation) |
| `pnpm build:css` | Compile CSS from input.css |
| `pnpm build:ts` | Compile TypeScript |
| `pnpm watch` | Watch mode for development |
| `pnpm dev` | Development mode (watch) |
| `pnpm extract:tokens` | Extract design tokens to JSON |
| `pnpm extract:headless` | Generate headless design map |
| `pnpm extract:shadcn-map` | Generate shadcn/ui component mapping |
| `pnpm extract:api-docs` | Generate API documentation JSON |
| `pnpm extract:css-data` | Generate CSS custom data for IntelliSense |
| `pnpm generate:docs` | Generate all documentation (API, Components, Tokens) |
| `pnpm generate:api-reference` | Generate API reference markdown |
| `pnpm generate:specs` | Generate component specifications |
| `pnpm generate:adapter` | Generate framework adapters |
| `pnpm cleanup:docs` | Cleanup documentation files |
| `pnpm cleanup:docs:dry-run` | Preview documentation cleanup (dry run) |
| `pnpm enforce:semantics` | Run drift detection |
| `pnpm validate` | Validate design tokens |
| `pnpm validate:all` | Run all validations |
| `pnpm quality` | Run complete quality check |
| `pnpm lint` | Run linting |
| `pnpm lint:fix` | Fix linting issues |
| `pnpm test` | Run tests |
| `pnpm test:coverage` | Run tests with coverage |
| `pnpm storybook` | Start Storybook dev server (if configured) |
| `pnpm build:storybook` | Build Storybook for production |

---

## Design Tokens & Exports

### Available Exports

```typescript
// CSS
import '@aibos/design-system/css'

// Theme System ⭐ NEW
import { ThemeProvider, defaultTheme, lightTheme } from '@aibos/design-system/themes'
import { useThemeSwitch, useCurrentTheme } from '@aibos/design-system/themes'
import { tokenRegistry } from '@aibos/design-system/themes/token-registry'
import { getThemeFromCookiesSSR } from '@aibos/design-system/themes/ssr-utils'

// Tokens (JSON)
import tokens from '@aibos/design-system/tokens'

// Tokens (TypeScript)
import type { DesignTokens } from '@aibos/design-system/tokens/typescript'

// API Documentation (JSON) - For IDE integration
import apiDocs from '@aibos/design-system/api-docs'

// CSS Custom Data (JSON) - For VS Code IntelliSense
import cssData from '@aibos/design-system/css-custom-data'

// shadcn/ui Component Mapping (JSON)
import shadcnMap from '@aibos/design-system/shadcn-map'

// shadcn/ui Component Mapping (TypeScript)
import type { ShadcnMap, ShadcnComponentMapping } from '@aibos/design-system/shadcn-map/typescript'

// shadcn/ui Configuration
import componentsConfig from '@aibos/design-system/components.json'

// Headless Map (Class-to-CSS mapping)
import headlessMap from '@aibos/design-system/headless-map'

// TypeScript Types
import type { ShadcnMap, AIBOSClassesMapping } from '@aibos/design-system/types'
```

---

## shadcn/ui Integration

The design system provides **complete integration** with shadcn/ui components, mapping all 54 shadcn components to AIBOS semantic classes.

### Quick Start with shadcn/ui

```bash
# 1. Install shadcn/ui
npx shadcn-ui@latest init

# 2. Install AIBOS Design System
npm install @aibos/design-system

# 3. Import AIBOS CSS in your app
import '@aibos/design-system/css'
```

### Using the Mapping

```typescript
// Import the mapping
import shadcnMap from '@aibos/design-system/shadcn-map'

// Get AIBOS classes for a shadcn component
const buttonClasses = shadcnMap.mappings.button.aibosClasses
// Returns: { base: 'na-btn', semantic: [...], utilities: [...], all: [...] }

// Use in your component
import { Button } from '@/components/ui/button'

<Button className={shadcnMap.mappings.button.aibosClasses.base}>
  Click me
</Button>
```

### TypeScript Support

```typescript
import type { 
  ShadcnMap, 
  ShadcnComponentMapping,
  AIBOSClassesForComponent 
} from '@aibos/design-system/types'

// Type-safe access
const buttonMapping: ShadcnComponentMapping = shadcnMap.mappings.button

// Helper types
type ButtonClasses = AIBOSClassesForComponent<'button'>
```

### Component Mapping Examples

**Button Component:**
```tsx
import { Button } from '@/components/ui/button'
import shadcnMap from '@aibos/design-system/shadcn-map'

// Primary button
<Button className={shadcnMap.mappings.button.aibosClasses.base}>
  Primary Action
</Button>

// With recommended classes
<Button className={`${shadcnMap.mappings.button.aibosClasses.base} ${shadcnMap.mappings.button.aibosClasses.semantic[1]}`}>
  Styled Button
</Button>
```

**Card Component:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import shadcnMap from '@aibos/design-system/shadcn-map'

<Card className={shadcnMap.mappings.card.aibosClasses.base}>
  <CardHeader className={shadcnMap.mappings.card.parts.CardHeader?.join(' ')}>
    <CardTitle className={shadcnMap.mappings.card.parts.CardTitle?.join(' ')}>
      Card Title
    </CardTitle>
  </CardHeader>
  <CardContent className={shadcnMap.mappings.card.parts.CardContent?.join(' ')}>
    Content here
  </CardContent>
</Card>
```

### Mapping Statistics

- **54 shadcn components** fully mapped
- **872 total mappings** generated
- **172 AIBOS classes** available
- **100% coverage** of shadcn/ui components
- **IDE-friendly** with IntelliSense metadata

### Configuration

The `components.json` file is included in the package and can be imported:

```typescript
import componentsConfig from '@aibos/design-system/components.json'

// Access shadcn/ui configuration
console.log(componentsConfig.style) // "new-york"
console.log(componentsConfig.tailwind.css) // "input.css"
```

### IDE Integration

The mapping includes IDE-friendly metadata for VS Code, WebStorm, and TypeScript:

- **IntelliSense**: Full autocomplete for component mappings
- **Type Safety**: Complete TypeScript definitions
- **Hover Documentation**: Detailed descriptions for each component
- **Usage Examples**: Code snippets for each component

See [IDE Integration Guide](./docs/archive/IDE_INTEGRATION.md) for complete IDE setup guide (archived).

---

## React Components ⭐ **NEW**

The design system includes **24 production-ready React components** with full TypeScript support:

### Available Components

- **Layout Components**: Card, Shell components (CommandCenter, Sidebar, MasterDetail, etc.)
- **Interactive Components**: Button, StatusIndicator
- **Context Providers**: AuthContext, KeyboardManager
- **Custom Hooks**: useDebounce, useIntersectionObserver, useVirtualScroll

### Quick Start with React

```bash
# Install
npm install @aibos/design-system
```

```tsx
// Import React components
import { Button, Card } from '@aibos/design-system/react';
import '@aibos/design-system/css';

// Use components
function App() {
  return (
    <Card>
      <h3 className="na-h4">Card Title</h3>
      <Button className="na-btn na-btn-primary">
        Click me
      </Button>
    </Card>
  );
}
```

### Next.js Integration

The React components are fully compatible with Next.js and support SSR:

```tsx
// app/layout.tsx or pages/_app.tsx
import '@aibos/design-system/css';
import { ThemeProvider } from '@aibos/design-system/themes';
```

📖 **See [Component Reference](./docs/COMPONENTS.md) for complete React component documentation** (auto-generated)

## Support

For questions or issues:

1. **Auto-Generated Docs**: Check [API Reference](./docs/API_REFERENCE.md), [Component Reference](./docs/COMPONENTS.md), or [Token Reference](./docs/TOKEN_REFERENCE.md) first
2. **Theme System**: Check [Theme System Complete Guide](./docs/archive/THEME_SYSTEM_COMPLETE_GUIDE.md) (archived)
3. **External users**: Check [External Usage Guide](./docs/archive/EXTERNAL_USAGE.md) (archived)
4. **Developers**: Check [Design System Guide](./docs/DESIGN_SYSTEM.md) first
5. **Documentation Quality**: See [Documentation Evaluation](./docs/DOCUMENTATION_EVALUATION.md) for metrics
6. Review [Advanced Patterns](./docs/ADVANCED_PATTERNS.md) for Beast Mode patterns
7. Run `pnpm quality` to check for issues
8. Review validation output

---

## Status

**Version**: 1.1.0  
**Last Updated**: 2026-01-03  
**Status**: ✅ **Production Ready**  
**Beast Mode**: ✅ **Enabled**  
**Theme System**: ✅ **10 production themes**  
**React Components**: ✅ **24 production-ready components**  
**shadcn/ui Integration**: ✅ **54 components mapped (872 mappings)**  
**Storybook**: ✅ **Component documentation available**  
**Prototypes**: 30+ production-ready modules  
**Documentation**: ✅ **Complete with auto-generated docs**

---

**Neo-Analog Design System** - Enterprise-grade UI framework with zero framework overhead.
