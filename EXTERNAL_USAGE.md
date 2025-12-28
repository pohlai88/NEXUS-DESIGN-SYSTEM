# How External Users Use This Design System

**For**: External Developers / npm Package Users  
**Quick Start**: Install → Import → Use Classes

---

## 🚀 Quick Start (3 Steps)

### 1. Install

```bash
npm install aibos-design-system
# or
pnpm add aibos-design-system
# or
yarn add aibos-design-system
```

### 2. Import CSS

```typescript
// In your main entry file (app/layout.tsx, main.tsx, etc.)
import 'aibos-design-system/css';
// or
import 'aibos-design-system';
```

### 3. Use Classes

```tsx
<div className="na-card na-p-6">
  <h1 className="na-h1">Title</h1>
  <div className="na-data">$12,450.00</div>
</div>
```

**That's it!** You're ready to use the design system.

---

## 📦 What You Get

When you install `aibos-design-system`, you get:

- ✅ **254 Design Tokens** - Colors, typography, spacing, shadows
- ✅ **171 Semantic Classes** - Ready-to-use `.na-*` components
- ✅ **Beast Mode Patterns** - Advanced CSS patterns (Radio State Machine, Frozen Grids)
- ✅ **TypeScript Definitions** - Full type safety for tokens
- ✅ **Zero Dependencies** - Self-contained CSS (no runtime JS)

---

## 💻 Framework Examples

### React / Next.js

```tsx
// app/layout.tsx (Next.js App Router)
import 'aibos-design-system/css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// components/Card.tsx
export function Card() {
  return (
    <div className="na-card na-p-6">
      <h1 className="na-h1">Card Title</h1>
      <div className="na-data">$12,450.00</div>
      <div className="na-metadata">PO-88219 • Feed Supply</div>
      <button className="na-btn na-btn-primary na-mt-4">
          Click Me
      </button>
    </div>
  );
}
```

### Vue 3

```typescript
// main.ts
import 'aibos-design-system/css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

```vue
<!-- components/Card.vue -->
<template>
  <div class="na-card na-p-6">
    <h1 class="na-h1">Card Title</h1>
    <div class="na-data">$12,450.00</div>
    <button class="na-btn na-btn-primary">Click Me</button>
  </div>
</template>
```

### Svelte

```typescript
// app.js
import 'aibos-design-system/css';
import App from './App.svelte';

const app = new App({ target: document.body });
```

```svelte
<!-- components/Card.svelte -->
<div class="na-card na-p-6">
  <h1 class="na-h1">Card Title</h1>
  <div class="na-data">$12,450.00</div>
</div>
```

### Vanilla HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My App</title>
  <link rel="stylesheet" href="./node_modules/aibos-design-system/style.css">
</head>
<body>
  <div class="na-card na-p-6">
    <h1 class="na-h1">Card Title</h1>
    <div class="na-data">$12,450.00</div>
  </div>
</body>
</html>
```

---

## 🎨 Using Design Tokens

### TypeScript

```typescript
import tokens from 'aibos-design-system/tokens';
import type { DesignTokens } from 'aibos-design-system/tokens/typescript';

export function Button() {
  return (
    <button
      className="na-btn"
      style={{
        backgroundColor: tokens.color.primary,
        padding: tokens.spacing[6],
        borderRadius: tokens.radius.card,
      }}
    >
      Click me
    </button>
  );
}
```

### JavaScript

```javascript
import tokens from 'aibos-design-system/tokens';

export function Button() {
  return (
    <button
      className="na-btn"
      style={{
        backgroundColor: tokens.color.primary,
        padding: tokens.spacing[6],
      }}
    >
      Click me
    </button>
  );
}
```

---

## 📚 Common Patterns

### Cards

```tsx
<div className="na-card na-p-6">
  <h2 className="na-h3">Card Title</h2>
  <div className="na-data">$12,450.00</div>
  <div className="na-metadata">PO-88219 • Feed Supply</div>
</div>
```

### Tables

```tsx
<div className="na-table-wrap">
  <table className="na-table">
    <thead>
      <tr>
        <th className="na-th">Name</th>
        <th className="na-th">Price</th>
        <th className="na-th">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr className="na-tr">
        <td className="na-td">Product A</td>
        <td className="na-td na-tabular">$1,234.56</td>
        <td className="na-td">
          <span className="na-status na-status-ok">Active</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Buttons

```tsx
<button className="na-btn na-btn-primary">Primary</button>
<button className="na-btn na-btn-secondary">Secondary</button>
<button className="na-btn na-iconbtn">⚙️</button>
```

### Status Indicators

```tsx
<span className="na-status na-status-ok">Success</span>
<span className="na-status na-status-pending">Pending</span>
<span className="na-status na-status-bad">Error</span>
```

---

## 🚀 Beast Mode Patterns

### Radio Button State Machine (0ms Latency View Switching)

```tsx
<input type="radio" name="view" id="v-grid" className="na-state-radio" defaultChecked />
<input type="radio" name="view" id="v-kanban" className="na-state-radio" />

<div className="na-view-controls">
  <label htmlFor="v-grid" className="na-state-label">Grid</label>
  <label htmlFor="v-kanban" className="na-state-label">Kanban</label>
</div>

<div className="na-viewport">
  <div className="na-view-pane" data-view="grid">Grid Content</div>
  <div className="na-view-pane" data-view="kanban">Kanban Content</div>
</div>
```

### Bi-Directional Sticky Grid (Frozen Panes)

```tsx
<div className="na-grid-frozen">
  <table className="na-table-frozen">
    <thead>
      <tr>
        <th className="na-th">Fixed Column</th>
        <th className="na-th">Scrollable Column</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="na-td">Fixed</td>
        <td className="na-td">Scrollable</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 📖 Documentation

- **[API Reference](./API_REFERENCE.md)** ⭐ **START HERE** - Typography, spacing, components, colors
- **[Design System Guide](./docs/DESIGN_SYSTEM.md)** - Complete reference
- **[Advanced Patterns](./docs/ADVANCED_PATTERNS.md)** - Beast Mode patterns
- **[Color System](./docs/COLOR_SYSTEM_REFERENCE.md)** - Color tokens
- **[Quick Start](./docs/QUICK_START_GUIDE.md)** - Setup guide

---

## 🔧 Package Exports

```typescript
// CSS (main export)
import 'aibos-design-system/css'
// or
import 'aibos-design-system'

// Tokens (JSON)
import tokens from 'aibos-design-system/tokens'

// Tokens (TypeScript)
import type { DesignTokens } from 'aibos-design-system/tokens/typescript'
```

---

## ✅ What Makes This Special

1. **Zero Framework Overhead** - Pure CSS, no JavaScript runtime
2. **100% Figma Compliant** - Matches design specs exactly
3. **Beast Mode Patterns** - Advanced CSS patterns (Radio State Machine, Frozen Grids)
4. **TypeScript Support** - Full type safety for tokens
5. **Framework Agnostic** - Works with React, Vue, Svelte, or vanilla HTML
6. **Production Ready** - 8 production prototypes included

---

## 🆘 Troubleshooting

### CSS not loading?

Ensure CSS is imported **before** your app code:

```typescript
// ✅ Correct
import 'aibos-design-system/css';
import './app.css';

// ❌ Wrong
import './app.css';
import 'aibos-design-system/css';
```

### TypeScript errors?

Ensure your `tsconfig.json` has proper module resolution:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### Classes not working?

1. Verify CSS is imported
2. Check browser DevTools for CSS conflicts
3. Ensure you're using `.na-*` classes (not arbitrary Tailwind)

---

## 📝 License

MIT License - See package.json for details

---

**Ready to use?** Install and start building! 🚀

