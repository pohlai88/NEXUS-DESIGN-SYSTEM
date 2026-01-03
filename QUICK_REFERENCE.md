# Neo-Analog Design System - Quick Reference

**Cheat Sheet for Developers | Copy-Paste Ready | IDE-Friendly**

**Last Updated**: 2026-01-03  
**Version**: 2.0.0

---

## 🚀 Installation

```bash
npm install @aibos/design-system
```

```tsx
import '@aibos/design-system/css';
```

---

## 📝 Typography Cheat Sheet

### Headings

| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| `.na-h1` | 32px | Bold | Page titles |
| `.na-h2` | 24px | Semibold | Section titles |
| `.na-h3` | 20px | Semibold | Subsections |
| `.na-h4` | 18px | Semibold | Card titles |
| `.na-h5` | 16px | Semibold | Small titles |
| `.na-h6` | 14px | Semibold | Micro titles |

### Data & Metadata

| Class | Size | Font | Usage |
|-------|------|------|-------|
| `.na-data` | 14px | Monospace | Data values, table cells |
| `.na-data-large` | 30px | Serif | KPI values, hero numbers |
| `.na-metadata` | 11px | Sans | Labels, column headers (uppercase) |
| `.na-metadata-small` | 10px | Sans | Timestamps, IDs, footnotes |

### Quick Examples

```tsx
// Headings
<h1 className="na-h1">Page Title</h1>
<h2 className="na-h2">Section Title</h2>
<h3 className="na-h3">Subsection</h3>

// Data Display
<div className="na-data">$12,450.00</div>
<div className="na-data-large">1,234,567</div>

// Labels
<div className="na-metadata">ACCOUNT NAME</div>
<div className="na-metadata-small">Updated 2m ago</div>
```

---

## 🎨 Component Classes

### Cards & Surfaces

```tsx
// Standard card
<div className="na-card p-6">
  <h3 className="na-h4">Card Title</h3>
  <div className="na-data">Content</div>
</div>

// Interactive card (hover effects)
<a href="#" className="na-card na-card-interactive p-6">
  <h3 className="na-h4">Clickable Card</h3>
</a>

// Panel (muted background)
<div className="na-panel p-5">
  <div className="na-data">Panel content</div>
</div>
```

### Buttons

```tsx
// Primary button
<button className="na-btn na-btn-primary">Save</button>

// Secondary button
<button className="na-btn">Cancel</button>

// Ghost button
<button className="na-btn na-btn-ghost">More</button>

// Icon button
<button className="na-iconbtn" aria-label="Settings">⚙️</button>
```

### Inputs & Forms

```tsx
// Form field (with spacing)
<div className="na-field">
  <label className="na-label" htmlFor="email">Email</label>
  <input 
    id="email" 
    type="email" 
    className="na-input" 
    placeholder="user@example.com"
  />
  <p className="na-help">We'll never share your email</p>
</div>

// Search input
<div className="na-search">
  <span className="na-search-icon">⌕</span>
  <input 
    className="na-search-input" 
    placeholder="Search..."
  />
</div>
```

### Status Indicators

```tsx
// Status badges
<span className="na-status na-status-ok">OK</span>
<span className="na-status na-status-pending">PENDING</span>
<span className="na-status na-status-bad">FAIL</span>

// Status with custom text
<span className="na-status na-status-ok">
  <span className="na-metadata-small">Active</span>
</span>
```

### Tables

```tsx
<div className="na-table-wrap">
  <table className="na-table">
    <thead>
      <tr>
        <th className="na-th">Name</th>
        <th className="na-th">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr className="na-tr-interactive">
        <td className="na-td">Account 1</td>
        <td className="na-td">
          <span className="na-status na-status-ok">OK</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### CSS-Only Components

```tsx
// Tooltip (pure CSS)
<button className="na-tooltip" data-label="Dashboard">
  📊
</button>

// Dropdown (native <details>)
<details className="na-dropdown">
  <summary className="na-btn">Actions</summary>
  <div className="na-dropdown-menu">
    <a href="#" className="block px-3 py-2 rounded-control hover:bg-paper-2 na-data">
      Edit
    </a>
    <a href="#" className="block px-3 py-2 rounded-control hover:bg-paper-2 na-data">
      Delete
    </a>
  </div>
</details>

// Switch (CSS-only)
<label className="na-switch">
  <input type="checkbox" className="sr-only" />
  <span className="na-switch-thumb"></span>
</label>
```

---

## 🏗️ Layout Systems

### Shell Layouts (React)

```tsx
import { SidebarShell } from '@aibos/design-system/react/shells';

<SidebarShell
  sidebar={<Navigation />}
  header={<Header />}
  footer={<Footer />}
>
  <MainContent />
</SidebarShell>
```

### Shell Layouts (HTML)

```html
<!-- Omni Shell (Advanced Grid) -->
<body class="na-mode-app">
  <div class="na-shell-omni">
    <header class="na-shell-head">Header</header>
    <aside class="na-shell-rail">Rail</aside>
    <main class="na-shell-main">Main Content</main>
    <footer class="na-shell-foot">Footer</footer>
  </div>
</body>

<!-- Standard Sidebar Shell -->
<div class="na-shell">
  <aside class="na-sidebar">Sidebar</aside>
  <main>Content</main>
</div>
```

---

## 🎨 Theme System

### React (TypeScript)

```tsx
import { ThemeProvider, useThemeSwitch } from '@aibos/design-system/themes';
import '@aibos/design-system/css';

// Wrap app
<ThemeProvider customThemes={[lightTheme, twilightTheme]}>
  <App />
</ThemeProvider>

// Switch themes
function ThemeSwitcher() {
  const { switchToDefault, switchToCustom } = useThemeSwitch();
  return (
    <div>
      <button onClick={() => switchToDefault()}>Default</button>
      <button onClick={() => switchToCustom('light')}>Light</button>
    </div>
  );
}
```

### HTML (JavaScript)

```html
<!-- Theme switcher dropdown -->
<details class="na-dropdown">
  <summary class="na-btn">Theme</summary>
  <div class="na-dropdown-menu">
    <button onclick="applyTheme('default')">Default</button>
    <button onclick="applyTheme('light')">Light</button>
    <button onclick="applyTheme('twilight')">Twilight</button>
  </div>
</details>
```

---

## 📏 Spacing Reference

### Standard Spacing Scale

| Class | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `p-4` | 1rem | 16px | Small padding |
| `p-6` | 1.5rem | **24px** | **Standard padding** |
| `p-8` | 2rem | 32px | Large padding |
| `gap-6` | 1.5rem | **24px** | **Standard gap** |

### Common Patterns

```tsx
// Standard card padding
<div className="na-card p-6">Content</div>

// Spacing between elements
<div className="space-y-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Grid with gap
<div className="grid grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## 🎯 Common Patterns

### KPI Card

```tsx
<div className="na-card p-6">
  <div className="na-metadata mb-2">REVENUE</div>
  <div className="na-data-large">$1,234,567</div>
  <div className="na-metadata-small text-clay mt-2">
    Last 30 days
  </div>
</div>
```

### Data Table with Actions

```tsx
<div className="na-card p-6">
  <div className="flex items-center justify-between mb-4">
    <h3 className="na-h4">Accounts</h3>
    <button className="na-btn na-btn-primary">New</button>
  </div>
  <div className="na-table-wrap">
    <table className="na-table">
      <thead>
        <tr>
          <th className="na-th">Name</th>
          <th className="na-th">Status</th>
          <th className="na-th">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr className="na-tr-interactive">
          <td className="na-td">Account 1</td>
          <td className="na-td">
            <span className="na-status na-status-ok">OK</span>
          </td>
          <td className="na-td">
            <button className="na-btn na-btn-ghost">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Form with Validation

```tsx
<form className="na-card p-6">
  <div className="na-field">
    <label className="na-label" htmlFor="name">Name</label>
    <input 
      id="name" 
      type="text" 
      className="na-input" 
      placeholder="Enter name"
    />
  </div>
  
  <div className="na-field">
    <label className="na-label" htmlFor="email">Email</label>
    <input 
      id="email" 
      type="email" 
      className="na-input" 
      placeholder="user@example.com"
    />
    <p className="na-help">We'll never share your email</p>
  </div>
  
  <div className="flex items-center gap-3 mt-6">
    <button className="na-btn na-btn-ghost">Cancel</button>
    <button className="na-btn na-btn-primary">Save</button>
  </div>
</form>
```

### Navigation Menu

```tsx
<nav className="na-sidebar">
  <div className="na-brand">
    <div className="na-mark">NA</div>
    <div className="na-metadata">NEO-ANALOG</div>
  </div>
  
  <div className="na-nav-section">Main</div>
  <a href="#" className="na-nav-item is-active">
    Dashboard
  </a>
  <a href="#" className="na-nav-item">
    Accounts
  </a>
</nav>
```

---

## 🎨 Color Tokens

### Semantic Colors

```tsx
// Use Tailwind classes with design tokens
<div className="bg-void text-lux">Dark background</div>
<div className="bg-paper text-lux">Panel background</div>
<div className="text-gold">Accent color</div>
<div className="text-clay">Muted text</div>
```

### Status Colors

```tsx
// Status colors are built into status classes
<span className="na-status na-status-ok">Success</span>
<span className="na-status na-status-pending">Warning</span>
<span className="na-status na-status-bad">Error</span>
```

---

## 🔧 IDE Integration

### VS Code IntelliSense

1. Install [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
2. IntelliSense automatically works with `.na-*` classes
3. Hover over classes for documentation

### TypeScript Types

```tsx
import type { DesignTokens } from '@aibos/design-system/types';

// Full type safety for tokens
const tokens: DesignTokens = {
  // Autocomplete available
};
```

---

## 📚 Full Documentation

- **[API Reference](./docs/API_REFERENCE.md)** - Complete class reference
- **[External Usage](./docs/EXTERNAL_USAGE.md)** - npm package guide
- **[Theme System](./docs/THEME_SYSTEM_COMPLETE_GUIDE.md)** - Theme guide
- **[Shell System](./docs/SHELL_SYSTEM_GUIDE.md)** - Layout guide
- **[Advanced Patterns](./docs/ADVANCED_PATTERNS.md)** - Beast Mode

---

**Quick Reference v2.0.0** | Last Updated: 2026-01-03
