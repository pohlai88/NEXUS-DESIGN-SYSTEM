# Storybook Setup and Optimization
## AIBOS Design System

**Date**: 2026-01-03  
**Status**: ✅ **CONFIGURED & OPTIMIZED**  
**Version**: Storybook 8.3.0 with Web Components Vite

---

## Executive Summary

Storybook is configured for Web Components with:
- ✅ **Vite** for fast builds
- ✅ **Web Components** support
- ✅ **TypeScript** support
- ✅ **Accessibility** addon
- ✅ **Optimized** configuration based on best practices

---

## Configuration Files

### 1. `.storybook/main.ts`

**Framework**: `@storybook/web-components-vite`

**Key Features**:
- Vite for fast builds
- Web Components support
- TypeScript support
- Accessibility addon
- Optimized Vite configuration

**Optimizations**:
- `target: 'esnext'` for modern JavaScript
- `optimizeDeps` includes `lit` for faster dev server
- CSS processing configured

---

### 2. `.storybook/preview.ts`

**Global Settings**:
- Dark theme default
- Accessibility testing enabled
- Auto-docs enabled
- Design system styles imported

**Features**:
- Color contrast checking
- Keyboard navigation testing
- Light/dark theme backgrounds
- Global decorators for Web Components

---

## Dependencies

### Required Packages

```json
{
  "@storybook/web-components-vite": "^8.3.0",
  "@storybook/web-components": "^8.3.0",
  "@storybook/addon-links": "^8.3.0",
  "@storybook/addon-essentials": "^8.3.0",
  "@storybook/addon-interactions": "^8.3.0",
  "@storybook/addon-a11y": "^8.3.0",
  "lit": "^3.2.0"
}
```

**Note**: `@storybook/web-components` provides TypeScript types for stories.

---

## Story Structure

### Example: `button.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Web Components/Button',
  component: 'na-button',
  tags: ['autodocs'],
  // ...
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <na-button variant="${args.variant}">
      Button
    </na-button>
  `,
};
```

---

## Best Practices Applied

### 1. Use Vite Framework ✅

**Why**: Fast builds, better performance

**Implementation**:
```typescript
framework: {
  name: '@storybook/web-components-vite',
  options: {},
}
```

---

### 2. Optimize Vite Configuration ✅

**Why**: Faster dev server, better builds

**Implementation**:
```typescript
viteFinal: async (config) => {
  config.build = config.build || {};
  config.build.target = 'esnext';
  
  config.optimizeDeps = config.optimizeDeps || {};
  config.optimizeDeps.include = ['lit'];
  
  return config;
}
```

---

### 3. Enable Accessibility Testing ✅

**Why**: Ensure components are accessible

**Implementation**:
```typescript
addons: [
  '@storybook/addon-a11y',
  // ...
]
```

---

### 4. Use Auto-Docs ✅

**Why**: Automatic documentation generation

**Implementation**:
```typescript
docs: {
  autodocs: 'tag',
}
```

---

### 5. Import Design System Styles ✅

**Why**: Components need styles to render correctly

**Implementation**:
```typescript
// .storybook/preview.ts
import '../style.css';
```

---

## Commands

```bash
# Start Storybook dev server
pnpm storybook

# Build Storybook for production
pnpm build:storybook
```

---

## Story Locations

Stories are located in:
- `components/html/examples/**/*.stories.ts`
- `dist/adapters/vanilla/**/*.stories.ts`

---

## TypeScript Configuration

### Required Types

Stories use types from `@storybook/web-components`:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
```

**Note**: This is different from the framework package (`@storybook/web-components-vite`).

---

## Optimizations Applied

### 1. Vite Build Target ✅

```typescript
config.build.target = 'esnext';
```

**Benefit**: Modern JavaScript, smaller bundles

---

### 2. Dependency Optimization ✅

```typescript
config.optimizeDeps.include = ['lit'];
```

**Benefit**: Faster dev server startup

---

### 3. CSS Processing ✅

```typescript
config.css = config.css || {};
```

**Benefit**: Proper CSS handling for Web Components

---

## Troubleshooting

### Error: Cannot find module '@storybook/web-components'

**Solution**: Install `@storybook/web-components`:

```bash
pnpm add -D @storybook/web-components@^8.3.0
```

---

### Error: Component not rendering

**Solution**: Ensure:
1. Component is built (`pnpm build:ts && pnpm generate:adapter vanilla`)
2. Styles are imported in `preview.ts`
3. Component is registered in story

---

### Error: TypeScript errors in stories

**Solution**: Ensure `@storybook/web-components` is installed for types.

---

## Next Steps

1. ✅ **COMPLETE** - Storybook configured
2. ✅ **COMPLETE** - TypeScript errors fixed
3. ⏳ Create stories for all components
4. ⏳ Add more story variants
5. ⏳ Add interaction tests

---

## References

- [Storybook Web Components Docs](https://storybook.js.org/docs/get-started/install)
- [Storybook Vite Framework](https://storybook.js.org/docs/get-started/install#vite)
- [Storybook Best Practices](https://storybook.js.org/docs/writing-stories)

---

**Status**: ✅ **CONFIGURED & OPTIMIZED**  
**Last Updated**: 2026-01-03

