# HTML Shell Templates - Quick Reference

**Copy-paste ready templates for common layouts**

---

## Shell Selection Guide

| Page Type | Shell Template | Use Case |
|-----------|---------------|----------|
| Admin Panel | `shell-sidebar.html` | Standard SaaS/admin interfaces |
| ERP Interface | `shell-omni.html` | Advanced multi-panel applications |
| Settings Page | `shell-doc.html` | Forms, documentation, read-only |
| Consumer App | `shell-stacked.html` | Horizontal navigation, content-focused |
| List-Detail | `shell-master-detail.html` | Email, chat, split-view interfaces |

---

## Quick Start

### 1. Copy Template
```bash
cp components/html/shell-sidebar.html your-page.html
```

### 2. Update Path
```html
<!-- Change this -->
<link rel="stylesheet" href="../../style.css">

<!-- To match your structure -->
<link rel="stylesheet" href="../style.css">
```

### 3. Replace Content
```html
<main id="main-content" class="na-shell-main">
    <!-- Replace this section with your content -->
</main>
```

---

## Common Modifications

### Add Navigation Item
```html
<a href="/path" class="na-nav-item">
    <span>New Item</span>
</a>
```

### Add Active State
```html
<a href="/current" class="na-nav-item is-active" aria-current="page">
    <span>Current Page</span>
</a>
```

### Add Badge/Count
```html
<a href="/path" class="na-nav-item">
    <span>Invoices</span>
    <span class="na-status ok">12</span>
</a>
```

### Customize Header
```html
<header class="na-header">
    <!-- Your custom header content -->
</header>
```

---

## CSS-Only Patterns Cheat Sheet

### Drawer Toggle
```html
<input type="checkbox" id="na-toggle-drawer" class="sr-only">
<label for="na-toggle-drawer" class="na-iconbtn">☰</label>
```

### View Switching
```html
<input type="radio" name="view" id="v-grid" checked>
<label for="v-grid">Grid</label>
```

### Modal Dialog
```html
<a href="#my-modal">Open</a>
<div id="my-modal" class="na-modal">...</div>
```

### Accordion
```html
<details class="na-accordion">
    <summary>Title</summary>
    <div>Content</div>
</details>
```

---

## Design System Classes

### Layout
- `.na-shell` - Standard 2-column sidebar
- `.na-shell-omni` - Advanced grid layout
- `.na-content` - Document mode container

### Navigation
- `.na-sidebar` - Full sidebar
- `.na-nav-item` - Navigation item
- `.na-nav-item.is-active` - Active state
- `.na-nav-section` - Section header

### Components
- `.na-card` - Card container
- `.na-btn` - Button
- `.na-btn-primary` - Primary button
- `.na-input` - Form input
- `.na-search` - Search bar

### Utilities
- `.na-h1` through `.na-h6` - Headings
- `.na-body` - Body text
- `.na-metadata` - Metadata text
- `.sr-only` - Screen reader only

---

## File Paths

**From HTML shell:**
```
components/html/shell-sidebar.html
└── ../../style.css (design system)
```

**From project root:**
```
your-project/
├── pages/
│   └── admin.html
└── style.css (copy from design system)
```

---

## Browser Requirements

- ✅ Modern browser (Chrome 105+, Firefox 121+, Safari 15.4+)
- ✅ `:has()` selector support
- ✅ CSS Grid support

**Fallback:** Add minimal JavaScript for older browsers.

---

## Performance Tips

1. **Minimize inline styles** - Use design system classes
2. **Lazy load images** - Use `loading="lazy"`
3. **Optimize fonts** - Use system fonts when possible
4. **Cache CSS** - Set proper cache headers

---

## Accessibility Checklist

- [ ] Skip link present
- [ ] Semantic HTML (`<nav>`, `<main>`, `<aside>`)
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader tested

---

**Last Updated:** 2025-01-27

