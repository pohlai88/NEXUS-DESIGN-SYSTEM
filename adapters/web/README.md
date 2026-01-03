# Web Components Adapter

**Enterprise-grade Web Components** generated from AIBOS component specifications. Zero framework dependencies, full Radix UI accessibility, and seamless integration with the Neo-Analog Design System.

**Next.js Optimized**: See [Next.js Web Components Optimization Guide](../../docs/NEXTJS_WEB_COMPONENTS_OPTIMIZATION.md) for Next.js-specific optimizations.

---

## 🏗️ Architecture

The Web Components Adapter follows a **Generator/Runtime split** architecture:

### Generator (Build-Time)
- **Location**: `adapters/web/adapter.ts`
- **Runtime**: Node.js (runs during build)
- **Purpose**: Generates Web Component class code from JSON specs
- **Output**: TypeScript/JavaScript files in `dist/adapters/vanilla/`

### Runtime (Browser)
- **Location**: `adapters/web/runtime/`
- **Runtime**: Browser (runs in user's browser)
- **Purpose**: Provides Radix UI accessibility primitives and utilities
- **Output**: Compiled ES modules in `dist/web/lib/`
- **Build Command**: `pnpm build:runtime`

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Build Time (Node.js)                  │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  specs/components/*.json  ──┐                            │
│                             │                            │
│                             ▼                            │
│  adapters/web/adapter.ts (Generator)                     │
│                             │                            │
│                             ▼                            │
│  dist/adapters/vanilla/*.js (Generated Components)      │
│                                                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Runtime (Browser)                       │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  adapters/web/runtime/  ──┐                              │
│    ├─ primitives.ts       │                              │
│    ├─ utils.ts            │                              │
│    └─ index.ts            │                              │
│                            │                              │
│                            ▼                              │
│  pnpm build:runtime       │                              │
│                            │                              │
│                            ▼                              │
│  dist/web/lib/            │                              │
│    ├─ primitives.js       │                              │
│    ├─ utils.js            │                              │
│    └─ index.js            │                              │
│                            │                              │
│                            ▼                              │
│  Generated Components import from dist/web/lib/         │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Installation

```bash
npm install @aibos/design-system
```

### Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Components Example</title>
  
  <!-- Import Design System CSS -->
  <link rel="stylesheet" href="node_modules/@aibos/design-system/style.css">
  
  <!-- Import Web Components -->
  <script type="module">
    import { Button, Dialog } from '@aibos/design-system/web';
    
    // Components are automatically registered
    // Use them directly in HTML:
  </script>
</head>
<body>
  <na-button variant="primary" size="lg">Click Me</na-button>
  
  <na-dialog>
    <button slot="trigger">Open Dialog</button>
    <div slot="content">
      <h2>Dialog Title</h2>
      <p>Dialog content goes here.</p>
    </div>
  </na-dialog>
</body>
</html>
```

---

## 📦 Package Exports

### Main Export

```javascript
import { Button, Dialog, Card } from '@aibos/design-system/web';
```

### Individual Components

```javascript
import { Button } from '@aibos/design-system/web/button';
import { Dialog } from '@aibos/design-system/web/dialog';
```

### Runtime Library (Advanced)

```javascript
import { DialogPrimitive, FocusPrimitive } from '@aibos/design-system/web/lib';
```

---

## 🎨 Available Components

| Component | Tag Name | Description |
|-----------|----------|-------------|
| **Button** | `<na-button>` | Interactive button with variants and states |
| **Dialog** | `<na-dialog>` | Modal dialog with focus trap and ARIA |
| **Card** | `<na-card>` | Container component with header, body, footer |
| **Input** | `<na-input>` | Text input with validation states |
| **Checkbox** | `<na-checkbox>` | Checkbox with label support |
| **Radio** | `<na-radio>` | Radio button with group support |
| **Select** | `<na-select>` | Dropdown select with options |
| **Tabs** | `<na-tabs>` | Tab navigation component |
| **Accordion** | `<na-accordion>` | Collapsible accordion sections |
| **Tooltip** | `<na-tooltip>` | Hover tooltip with positioning |
| **Toggle Switch** | `<na-toggle-switch>` | Toggle switch component |
| **Label** | `<na-label>` | Form label component |

---

## 🎯 Component Examples

### Button

```html
<!-- Basic button -->
<na-button>Click Me</na-button>

<!-- Variants -->
<na-button variant="primary">Primary</na-button>
<na-button variant="secondary">Secondary</na-button>
<na-button variant="outline">Outline</na-button>
<na-button variant="ghost">Ghost</na-button>

<!-- Sizes -->
<na-button size="sm">Small</na-button>
<na-button size="md">Medium</na-button>
<na-button size="lg">Large</na-button>

<!-- States -->
<na-button disabled>Disabled</na-button>
<na-button loading>Loading...</na-button>

<!-- Event handling -->
<na-button id="my-button">Click Me</na-button>
<script>
  document.getElementById('my-button').addEventListener('click', (e) => {
    console.log('Button clicked!', e);
  });
</script>
```

### Dialog

```html
<na-dialog id="my-dialog">
  <button slot="trigger">Open Dialog</button>
  
  <div slot="content">
    <h2>Dialog Title</h2>
    <p>Dialog content goes here.</p>
    <button onclick="document.getElementById('my-dialog').close()">
      Close
    </button>
  </div>
</na-dialog>

<script>
  const dialog = document.getElementById('my-dialog');
  
  // Listen for open/close events
  dialog.addEventListener('na-open', (e) => {
    console.log('Dialog opened', e.detail);
  });
  
  dialog.addEventListener('na-close', (e) => {
    console.log('Dialog closed', e.detail.reason);
  });
  
  // Programmatically control
  dialog.open = true;  // Open
  dialog.open = false; // Close
</script>
```

### Card

```html
<na-card>
  <div slot="header">
    <h3>Card Title</h3>
  </div>
  
  <div slot="body">
    <p>Card content goes here.</p>
  </div>
  
  <div slot="footer">
    <na-button variant="primary">Action</na-button>
  </div>
</na-card>
```

### Form Components

```html
<form>
  <na-label for="email">Email</na-label>
  <na-input 
    id="email" 
    type="email" 
    placeholder="Enter your email"
    required
  ></na-input>
  
  <na-checkbox id="terms">I agree to the terms</na-checkbox>
  
  <na-button type="submit">Submit</na-button>
</form>
```

---

## 🎭 Events

All components emit custom events with the `na-` prefix for type safety and collision avoidance.

### Event Naming Convention

**Rule 7**: React props must map to native CustomEvents with `na-` prefix.

**Translation Pattern:**
- React prop: `onOpenChange` → Web Component event: `na-open-change`
- React prop: `onValueChange` → Web Component event: `na-value-change`
- React prop: `onClick` → Native event: `click` (no translation needed)

**Implementation:**
```typescript
// In adapter.ts
function propToEventName(propName: string): string {
  const withoutOn = propName.startsWith('on') ? propName.slice(2) : propName;
  return `na-${camelToKebab(withoutOn)}`;
}
```

**Usage:**
```javascript
// Listen to translated events
dialog.addEventListener('na-open-change', (e) => {
  console.log('Open state changed:', e.detail);
});

// Standard events work as normal
button.addEventListener('click', (e) => {
  console.log('Button clicked');
});
```

### Common Events

| Event | Detail Type | Description |
|-------|-------------|-------------|
| `na-open` | `{ open: boolean; timestamp: number }` | Component opened |
| `na-close` | `{ reason: 'escape' \| 'click-outside' \| 'programmatic' }` | Component closed |
| `na-change` | `{ value: any }` | Value changed |
| `na-error` | `{ error: string; source: string }` | Error occurred |

### TypeScript Event Types

```typescript
import type { ButtonEvents, DialogEvents } from '@aibos/design-system/web';

// Events are automatically typed
const button = document.querySelector('na-button')!;
button.addEventListener('na-error', (e) => {
  // e.detail is typed as { error: string; source: string }
  console.log(e.detail.error);
});
```

---

## 🔨 Runtime Build Process

The runtime library must be built before using Web Components:

```bash
# Build runtime library
pnpm build:runtime
```

This command:
1. Compiles TypeScript files from `adapters/web/runtime/`
2. Transpiles to ES modules in `dist/web/lib/`
3. Generates TypeScript definitions (`.d.ts` files)
4. Outputs browser-ready JavaScript

**Output Structure:**
```
dist/web/lib/
├── index.js          # Main export
├── primitives.js     # Radix UI primitives (DialogPrimitive, etc.)
├── utils.js          # Utility functions (cn, dispatchNaEvent, etc.)
└── *.d.ts            # TypeScript definitions
```

**When to Build:**
- After modifying `adapters/web/runtime/` files
- Before running tests
- As part of the main build process (`pnpm build`)

---

## 🎨 Styling

### Light DOM Strategy

**CRITICAL**: All Web Components use **Light DOM** (no Shadow DOM) to ensure global CSS tokens from `style.css` apply automatically.

**Why Light DOM?**
- ✅ Design tokens work out of the box
- ✅ Global CSS classes apply
- ✅ No style encapsulation issues
- ✅ Beast Mode styling fully supported
- ✅ Inherits from global `style.css` automatically

**Implementation:**
```typescript
// Components explicitly avoid Shadow DOM
constructor() {
  super();
  // CRITICAL: No Shadow DOM - use Light DOM to inherit style.css
  // No this.attachShadow() call
}
```

**Validation:**
- Generated components must NOT contain `attachShadow`
- Generated components must NOT contain `shadowRoot`
- All styling comes from global CSS classes

### Custom Styling

```html
<style>
  na-button {
    --button-primary-bg: #your-color;
  }
  
  na-dialog::part(overlay) {
    background: rgba(0, 0, 0, 0.8);
  }
</style>
```

---

## ♿ Accessibility

All components follow **WCAG 2.2 AAA** standards with Radix UI accessibility patterns:

- ✅ **Focus Management**: Automatic focus trap in modals
- ✅ **ARIA Attributes**: Proper roles, labels, and states
- ✅ **Keyboard Navigation**: Full keyboard support
- ✅ **Screen Reader Support**: Semantic HTML and ARIA
- ✅ **Focus Restoration**: Focus returns to trigger on close

### Keyboard Shortcuts

| Component | Shortcut | Action |
|-----------|----------|--------|
| Dialog | `Escape` | Close dialog |
| Dialog | `Tab` | Navigate focusable elements |
| Dialog | `Shift+Tab` | Navigate backwards |
| Tabs | `Arrow Left/Right` | Navigate tabs |
| Accordion | `Enter/Space` | Toggle section |

---

## 🔧 Advanced Usage

### Programmatic Control

```javascript
import { Button, Dialog } from '@aibos/design-system/web';

// Get component instance
const dialog = document.querySelector('na-dialog');

// Control state
dialog.open = true;
dialog.variant = 'primary';
dialog.disabled = true;

// Listen to events
dialog.addEventListener('na-open', (e) => {
  console.log('Opened at', e.detail.timestamp);
});
```

### Dynamic Component Creation

```javascript
import { Button } from '@aibos/design-system/web';

// Create component programmatically
const button = document.createElement('na-button');
button.textContent = 'Dynamic Button';
button.setAttribute('variant', 'primary');
button.setAttribute('size', 'lg');

document.body.appendChild(button);
```

### Error Handling

Components include built-in error boundaries:

```javascript
const dialog = document.querySelector('na-dialog');

dialog.addEventListener('na-error', (e) => {
  console.error('Component error:', e.detail.error);
  console.error('Source:', e.detail.source);
  
  // Handle error gracefully
  // Component will fall back to basic functionality
});
```

---

## 📊 Bundle Size

The Web Components runtime is optimized for performance:

- **Runtime Library**: ~15KB (gzipped)
- **Per Component**: ~2-5KB (gzipped)
- **Total (12 components)**: ~45KB (gzipped)

Components are tree-shakeable, so unused components won't be included in your bundle.

---

## 🧪 TypeScript Support

Full TypeScript support with IntelliSense:

```typescript
import { Button, Dialog } from '@aibos/design-system/web';

// Type-safe component usage
const button: Button = document.querySelector('na-button')!;

// Type-safe events
button.addEventListener('na-error', (e) => {
  // e.detail is fully typed
  const error: string = e.detail.error;
  const source: string = e.detail.source;
});
```

---

## 🔄 Migration from React

If you're migrating from React components:

| React | Web Component |
|-------|---------------|
| `<Button variant="primary">` | `<na-button variant="primary">` |
| `onClick={handler}` | `addEventListener('click', handler)` |
| `onOpenChange={handler}` | `addEventListener('na-open-change', handler)` |
| `disabled={true}` | `disabled` attribute |
| `className="..."` | `class="..."` |

---

## 🐛 Troubleshooting

### Components Not Rendering

1. **Check CSS Import**: Ensure `style.css` is imported
2. **Check Module Import**: Use `type="module"` in script tag
3. **Check Console**: Look for registration errors

### Styles Not Applying

1. **Light DOM**: Components use Light DOM, so global CSS should work
2. **Specificity**: Check CSS specificity if custom styles aren't applying
3. **Tokens**: Ensure design tokens are loaded

### Events Not Firing

1. **Event Names**: Use `na-` prefixed event names
2. **Timing**: Wait for `connectedCallback` before adding listeners
3. **TypeScript**: Use typed event listeners for better debugging

---

## 📚 Additional Resources

- [Component Specifications](../specs/components/)
- [Design Tokens](../../dist/tokens.json)
- [React Components](../react/README.md)
- [Full Documentation](../../README.md)

---

## 🤝 Contributing

See the main [README](../../README.md) for contribution guidelines.

---

## 📄 License

MIT License - See [LICENSE](../../LICENSE) for details.

