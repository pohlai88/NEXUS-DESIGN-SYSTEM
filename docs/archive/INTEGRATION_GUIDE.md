# Integration Guide

**How to use Neo-Analog design tokens in your projects**

---

## Installation

```bash
npm install @aibos/design-system
# or
pnpm add @aibos/design-system
```

---

## 1. CSS/HTML Projects

### Import the compiled stylesheet:

```html
<head>
  <link rel="stylesheet" href="node_modules/@aibos/design-system/style.css">
</head>
```

### Use tokens in CSS:

```css
.my-button {
  background-color: var(--color-gold);
  color: var(--color-void);
  padding: var(--spacing-4);
  border-radius: var(--radius-control);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  transition: background-color var(--duration-200) var(--ease-premium);
}
```

### Use token classes in HTML:

```html
<div class="text-lux bg-paper rounded-card p-6 shadow-card">
  <h3 class="na-h3">Card Title</h3>
  <div class="na-data">$12,450.00</div>
  <div class="na-metadata">Updated 2 hours ago</div>
</div>
```

---

## 2. React Projects

### Import stylesheet:

```tsx
import '@aibos/design-system/style.css';
```

### Use tokens in CSS-in-JS (Emotion, styled-components):

**Styled Components:**
```tsx
import styled from 'styled-components';

const Card = styled.div`
  background-color: var(--color-paper);
  padding: var(--spacing-6);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
`;

export default function MyComponent() {
  return (
    <Card>
      <h3 className="na-h3">Title</h3>
      <div className="na-data">Value</div>
    </Card>
  );
}
```

**Emotion:**
```tsx
import { css } from '@emotion/react';

const cardStyles = css`
  background-color: var(--color-paper);
  padding: var(--spacing-6);
  border-radius: var(--radius-card);
`;

export default function MyComponent() {
  return <div css={cardStyles}>Content</div>;
}
```

### Use Tailwind CSS with tokens:

All tokens are available as Tailwind utilities:

```tsx
export default function MyComponent() {
  return (
    <div className="bg-paper p-6 rounded-card shadow-card">
      <h3 className="na-h3">Title</h3>
      <button className="bg-gold text-void px-4 py-3 rounded-control">
        Action
      </button>
    </div>
  );
}
```

### Get tokens programmatically:

```tsx
import tokens from '@aibos/design-system/dist/tokens.json';

const spacing = tokens.spacing['6']; // "1.5rem"
const color = tokens.colors.gold;   // "#eab308"
```

---

## 3. Vue Projects

### Import stylesheet:

```js
// main.js
import '@aibos/design-system/style.css';
```

### Use tokens in Vue components:

```vue
<template>
  <div class="bg-paper p-6 rounded-card shadow-card">
    <h3 class="na-h3">{{ title }}</h3>
    <div class="na-data">{{ value }}</div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
});
</script>

<style scoped>
.card {
  background-color: var(--color-paper);
  padding: var(--spacing-6);
  border-radius: var(--radius-card);
}
</style>
```

---

## 4. Tailwind CSS Integration

### Configure tailwind.config.js:

```js
import { colors, spacing } from '@aibos/design-system/dist/tokens.json';

export default {
  theme: {
    extend: {
      colors,
      spacing,
    },
  },
};
```

### Use in templates:

```html
<div class="bg-paper p-6 rounded-card text-lux">
  <h3 class="text-2xl font-bold">Title</h3>
  <p class="text-clay">Subtitle</p>
</div>
```

---

## 5. TypeScript Projects

### Import type definitions:

```ts
import type { DesignTokens } from '@aibos/design-system/dist/tokens/index.d.ts';

const tokens: DesignTokens = require('@aibos/design-system/dist/tokens.json');

// Fully typed token access
const primaryColor: string = tokens.colors.gold;
const padding: string = tokens.spacing['6'];
```

### Create typed theme hook (React):

```tsx
import tokens from '@aibos/design-system/dist/tokens.json';
import type { DesignTokens } from '@aibos/design-system/dist/tokens/index.d.ts';

export function useDesignTokens(): DesignTokens {
  return tokens;
}

// Usage
const MyComponent = () => {
  const tokens = useDesignTokens();
  return (
    <div style={{ color: tokens.colors.lux }}>
      Content
    </div>
  );
};
```

---

## 6. Figma Integration

### Export tokens from Figma:

1. Open Figma design file
2. Use Design System → Export Tokens
3. Paste exported JSON into your project's token file

### Keep tokens in sync:

```bash
# Update from Figma
npm run update:tokens

# Rebuild CSS
npm run build
```

---

## 7. Headless/CSS-Only Projects

### Use CSS variables directly:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@aibos/design-system/style.css">
  <style>
    body {
      background: var(--color-void);
      color: var(--color-lux);
      font-family: var(--font-family-sans);
      font-size: 15px;
      line-height: 1.6;
    }
    
    .card {
      background: var(--color-paper);
      padding: var(--spacing-6);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-card);
    }
  </style>
</head>
<body>
  <div class="card">
    <h2 class="na-h2">Card Title</h2>
    <p class="na-data">Card content</p>
  </div>
</body>
</html>
```

---

## 8. Component Libraries

### Build on Neo-Analog tokens:

```tsx
// Button.tsx
import '@aibos/design-system/style.css';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({ variant, size, children }: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-gold text-void',
    secondary: 'bg-paper text-lux border border-stroke',
    ghost: 'text-lux hover:bg-paper-2',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  return (
    <button
      className={`
        rounded-control font-semibold transition-all duration-200
        ${variantClasses[variant]} ${sizeClasses[size]}
      `}
    >
      {children}
    </button>
  );
};
```

---

## Common Patterns

### Card Container:

```html
<div class="bg-paper p-6 rounded-card shadow-card border border-stroke">
  <h3 class="na-h3">Card Title</h3>
  <p class="text-clay">Card description</p>
</div>
```

### Form Field:

```html
<div class="na-field">
  <label class="na-label">Field Label</label>
  <input 
    class="na-input border border-stroke rounded-control p-3"
    type="text" 
  />
  <p class="na-metadata mt-2">Help text</p>
</div>
```

### Button Group:

```html
<div class="flex gap-3">
  <button class="bg-gold text-void px-4 py-3 rounded-control font-semibold">
    Primary
  </button>
  <button class="bg-paper text-lux px-4 py-3 rounded-control border border-stroke">
    Secondary
  </button>
</div>
```

### Data Table:

```html
<table class="w-full">
  <thead>
    <tr class="bg-paper-2 border-b border-stroke">
      <th class="na-label p-4">Column</th>
      <th class="na-label p-4">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-stroke-soft hover:bg-paper-2">
      <td class="p-4 text-lux">Row data</td>
      <td class="p-4 na-data">$1,234.00</td>
    </tr>
  </tbody>
</table>
```

---

## Troubleshooting

### Tokens not loading:

```bash
# Verify install
npm list @aibos/design-system

# Rebuild
npm run build
```

### Colors not applying:

```css
/* Ensure CSS is imported before custom styles */
@import '@aibos/design-system/style.css';

/* Then use tokens */
.element {
  color: var(--color-lux); /* ✅ Works */
}
```

### Missing utilities:

Check [TOKEN_REFERENCE.md](TOKEN_REFERENCE.md) for available tokens.

Custom utilities available:
- `.na-h1` through `.na-h6` — Typography hierarchy
- `.na-data`, `.na-data-large` — Data display
- `.na-metadata`, `.na-metadata-small` — Metadata
- `.text-lux`, `.text-clay`, `.text-gold` — Colors
- `.bg-void`, `.bg-paper`, `.bg-paper-2` — Backgrounds

---

## Next Steps

1. **Read** [TOKEN_REFERENCE.md](TOKEN_REFERENCE.md) — Complete token catalog
2. **Review** [GOVERNANCE.md](GOVERNANCE.md) — Design system rules
3. **Copy** examples from [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) — Full guide

---

**Package:** [@aibos/design-system](https://www.npmjs.com/package/@aibos/design-system)  
**Last Updated:** 2025-01-24  
**Support:** Check documentation or open an issue on GitHub
