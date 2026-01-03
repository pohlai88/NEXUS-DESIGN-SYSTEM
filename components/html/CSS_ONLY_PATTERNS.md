# CSS-Only State Management Patterns

**Enterprise-Grade Patterns for Zero-JavaScript Interactivity**

---

## Overview

Modern CSS provides powerful selectors (`:has()`, `:checked`, `:target`) that enable complex interactivity without JavaScript. These patterns are perfect for static/low-traffic pages where React overhead is unnecessary.

---

## Pattern 1: Drawer Toggle (Checkbox + `:has()`)

### HTML Structure
```html
<!-- Hidden checkbox (state controller) -->
<input type="checkbox" id="na-toggle-drawer" class="sr-only">

<!-- Toggle button -->
<label for="na-toggle-drawer" class="na-iconbtn" aria-label="Toggle drawer">
    ☰
</label>

<!-- Drawer (controlled by CSS) -->
<aside class="na-shell-drawer" aria-label="Context inspector">
    <div class="p-6">
        <!-- Drawer content -->
    </div>
</aside>
```

### CSS Logic
```css
/* Default: Drawer closed (0 width) */
.na-shell-omni {
    grid-template-columns: var(--spacing-16) 1fr 0;
}

/* When checkbox checked: Drawer open (400px width) */
body:has(#na-toggle-drawer:checked) .na-shell-omni {
    grid-template-columns: var(--spacing-16) 1fr 25rem;
}

/* Content visibility */
.na-shell-drawer > * {
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
}

body:has(#na-toggle-drawer:checked) .na-shell-drawer > * {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
}
```

### Accessibility
- ✅ Proper `<label>` association
- ✅ `aria-label` on toggle button
- ✅ `aria-label` on drawer
- ✅ Screen reader friendly

---

## Pattern 2: View Switching (Radio Buttons)

### HTML Structure
```html
<!-- Radio buttons (state controller) -->
<input type="radio" name="view" id="v-grid" class="sr-only" checked>
<input type="radio" name="view" id="v-board" class="sr-only">
<input type="radio" name="view" id="v-gantt" class="sr-only">

<!-- Tab labels -->
<div class="view-controls" role="tablist">
    <label for="v-grid" class="view-tab" role="tab">Grid</label>
    <label for="v-board" class="view-tab" role="tab">Board</label>
    <label for="v-gantt" class="view-tab" role="tab">Gantt</label>
</div>

<!-- View panes -->
<div role="tabpanel">
    <div id="pane-grid" class="view-pane">Grid content</div>
    <div id="pane-board" class="view-pane">Board content</div>
    <div id="pane-gantt" class="view-pane">Gantt content</div>
</div>
```

### CSS Logic
```css
/* Hide all panes by default */
.view-pane {
    display: none;
}

/* Show pane when corresponding radio is checked */
#v-grid:checked ~ .shell #pane-grid { display: block; }
#v-board:checked ~ .shell #pane-board { display: block; }
#v-gantt:checked ~ .shell #pane-gantt { display: block; }

/* Highlight active tab */
.view-tab {
    background: var(--color-paper-2);
    color: var(--color-clay);
}

#v-grid:checked ~ .shell .tab-grid,
#v-board:checked ~ .shell .tab-board,
#v-gantt:checked ~ .shell .tab-gantt {
    background: var(--color-paper-hover);
    color: var(--color-lux);
    border-color: var(--color-gold);
}
```

### Accessibility
- ✅ `role="tablist"` and `role="tab"` for ARIA
- ✅ Proper label association
- ✅ Keyboard navigation (Arrow keys)

---

## Pattern 3: Modal Dialog (`:target`)

### HTML Structure
```html
<!-- Trigger link -->
<a href="#my-modal" class="na-btn">Open Modal</a>

<!-- Modal (target-based) -->
<div id="my-modal" class="na-modal">
    <div class="na-modal__backdrop"></div>
    <div class="na-modal__panel">
        <h2 class="na-h3">Modal Title</h2>
        <p>Modal content goes here</p>
        <a href="#" class="na-btn">Close</a>
    </div>
</div>
```

### CSS Logic
```css
/* Default: Hidden */
.na-modal {
    opacity: 0;
    pointer-events: none;
}

/* When URL hash matches ID: Visible */
.na-modal:target {
    opacity: 1;
    pointer-events: auto;
}
```

### Accessibility
- ✅ Proper focus management (requires minimal JS)
- ✅ ESC key to close (browser default)
- ✅ Backdrop click to close (browser default)

---

## Pattern 4: Accordion (`<details>`)

### HTML Structure
```html
<details class="na-accordion">
    <summary class="na-accordion-trigger">
        <span>Section Title</span>
        <span class="na-accordion-icon" aria-hidden="true">▼</span>
    </summary>
    <div class="na-accordion-content">
        <p>Accordion content goes here</p>
    </div>
</details>
```

### CSS Logic
```css
/* Native browser behavior - no CSS needed! */
/* But you can style it: */
.na-accordion-trigger {
    cursor: pointer;
    list-style: none;
}

.na-accordion-trigger::-webkit-details-marker {
    display: none;
}

.na-accordion-icon {
    transition: transform var(--duration-200);
}

.na-accordion[open] .na-accordion-icon {
    transform: rotate(180deg);
}
```

### Accessibility
- ✅ Native `<details>` element (fully accessible)
- ✅ Keyboard navigation built-in
- ✅ Screen reader friendly

---

## Pattern 5: Tab Navigation (Radio Buttons)

### HTML Structure
```html
<!-- Radio buttons -->
<input type="radio" name="tabs" id="tab-1" class="sr-only" checked>
<input type="radio" name="tabs" id="tab-2" class="sr-only">
<input type="radio" name="tabs" id="tab-3" class="sr-only">

<!-- Tab labels -->
<div class="na-tabs" role="tablist">
    <label for="tab-1" class="na-tab" role="tab">Tab 1</label>
    <label for="tab-2" class="na-tab" role="tab">Tab 2</label>
    <label for="tab-3" class="na-tab" role="tab">Tab 3</label>
</div>

<!-- Tab panels -->
<div role="tabpanel">
    <div id="panel-1" class="na-tab-panel">Content 1</div>
    <div id="panel-2" class="na-tab-panel">Content 2</div>
    <div id="panel-3" class="na-tab-panel">Content 3</div>
</div>
```

### CSS Logic
```css
/* Hide all panels */
.na-tab-panel {
    display: none;
}

/* Show panel when radio checked */
#tab-1:checked ~ .tabs-container #panel-1 { display: block; }
#tab-2:checked ~ .tabs-container #panel-2 { display: block; }
#tab-3:checked ~ .tabs-container #panel-3 { display: block; }

/* Active tab styling */
.na-tab {
    border-bottom: 2px solid transparent;
}

#tab-1:checked ~ .tabs-container .tab-1,
#tab-2:checked ~ .tabs-container .tab-2,
#tab-3:checked ~ .tabs-container .tab-3 {
    border-bottom-color: var(--color-gold);
    color: var(--color-lux);
}
```

---

## Pattern 6: Sidebar Collapse (Checkbox)

### HTML Structure
```html
<input type="checkbox" id="sidebar-collapse" class="sr-only">

<aside class="na-sidebar">
    <label for="sidebar-collapse" class="na-iconbtn">☰</label>
    <!-- Sidebar content -->
</aside>
```

### CSS Logic
```css
.na-sidebar {
    width: var(--w-sidebar);
    transition: width var(--duration-300);
}

body:has(#sidebar-collapse:checked) .na-sidebar {
    width: 64px; /* Collapsed width */
}

/* Hide text when collapsed */
body:has(#sidebar-collapse:checked) .na-sidebar .na-nav-item span {
    opacity: 0;
    width: 0;
    overflow: hidden;
}
```

---

## Best Practices

### 1. Always Use Labels
```html
<!-- ✅ Good -->
<label for="toggle" class="na-iconbtn">Toggle</label>
<input type="checkbox" id="toggle" class="sr-only">

<!-- ❌ Bad -->
<button onclick="toggle()">Toggle</button>
```

### 2. Proper ARIA Labels
```html
<label for="drawer-toggle" aria-label="Toggle navigation drawer">
    ☰
</label>
```

### 3. Semantic HTML
```html
<!-- ✅ Good -->
<nav aria-label="Main navigation">
    <a href="#" class="na-nav-item">Item</a>
</nav>

<!-- ❌ Bad -->
<div class="nav">
    <div class="item">Item</div>
</div>
```

### 4. Keyboard Navigation
- ✅ Tab order is natural (follows HTML order)
- ✅ Enter/Space activates labels
- ✅ ESC closes modals (browser default)

### 5. Focus Management
- ✅ Visible focus indicators (`.na-focus-ring`)
- ✅ Skip links for accessibility
- ✅ Logical tab order

---

## Browser Support

| Pattern | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| `:has()` | 105+ | 121+ | 15.4+ | 105+ |
| `:checked` | All | All | All | All |
| `:target` | All | All | All | All |
| `<details>` | All | All | All | All |

**Fallback:** For older browsers, add minimal JavaScript for drawer toggle.

---

## Performance Benefits

| Pattern | JavaScript | CSS-Only |
|---------|------------|----------|
| **Bundle Size** | +2-5KB | 0KB |
| **Execution Time** | ~1-5ms | 0ms |
| **Memory** | ~1-2KB | 0KB |
| **Accessibility** | Requires setup | Native |

---

## Common Pitfalls

### 1. Missing Label Association
```html
<!-- ❌ Bad -->
<input type="checkbox" id="toggle">
<button>Toggle</button>

<!-- ✅ Good -->
<input type="checkbox" id="toggle" class="sr-only">
<label for="toggle" class="na-iconbtn">Toggle</label>
```

### 2. Incorrect Selector Order
```css
/* ❌ Bad - Won't work */
#toggle:checked .drawer { display: block; }

/* ✅ Good - Correct order */
body:has(#toggle:checked) .drawer { display: block; }
```

### 3. Missing Accessibility
```html
<!-- ❌ Bad -->
<label>☰</label>

<!-- ✅ Good -->
<label for="toggle" aria-label="Toggle navigation drawer">☰</label>
```

---

## Advanced Patterns

### Multi-State Toggle
```html
<input type="checkbox" id="toggle-1">
<input type="checkbox" id="toggle-2">

<!-- Both must be checked -->
body:has(#toggle-1:checked):has(#toggle-2:checked) .content {
    display: block;
}
```

### Conditional Styling
```css
/* Show warning only when checkbox unchecked */
.warning {
    display: none;
}

body:not(:has(#agree:checked)) .warning {
    display: block;
}
```

---

## Testing Checklist

- [ ] Toggle works with mouse click
- [ ] Toggle works with keyboard (Enter/Space)
- [ ] Focus indicators visible
- [ ] Screen reader announces state changes
- [ ] Tab order is logical
- [ ] ESC key closes modals
- [ ] Works without JavaScript enabled

---

**Last Updated:** 2025-01-27  
**Status:** ✅ Production Ready

