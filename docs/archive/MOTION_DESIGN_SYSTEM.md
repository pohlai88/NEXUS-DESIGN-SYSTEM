# Motion Design System - Complete Guide

**Date**: 2025-01-27  
**Status**: ✅ **Complete & Production-Ready**

---

## Overview

The AIBOS Motion Design System provides a comprehensive set of motion tokens, animation patterns, and transition utilities for creating smooth, accessible, and delightful user experiences.

### Key Features

- ✅ **Motion Tokens** - Duration, easing, delay scales
- ✅ **Animation Patterns** - 12+ pre-built animations
- ✅ **Transition Utilities** - Property-specific transitions
- ✅ **Accessibility** - Full `prefers-reduced-motion` support
- ✅ **Semantic Classes** - `.na-motion-*` and `.na-animate-*` utilities
- ✅ **Figma Compliant** - Aligned with Figma motion standards

---

## Motion Tokens

### Duration Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `--motion-duration-instant` | 0ms | Immediate feedback |
| `--motion-duration-fast` | 100ms | Quick transitions |
| `--motion-duration-base` | 200ms | Standard transitions |
| `--motion-duration-slow` | 300ms | Deliberate motion |
| `--motion-duration-slower` | 500ms | Slow transitions |
| `--motion-duration-slowest` | 800ms | Very slow reveals |

### Easing Functions

| Token | Curve | Feel | Use Case |
|-------|-------|------|----------|
| `--motion-easing-linear` | `linear` | Constant speed | Loading, rotation |
| `--motion-easing-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerate | Exit animations |
| `--motion-easing-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerate | Entrance animations |
| `--motion-easing-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth | Standard transitions |
| `--motion-easing-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Bounce | Playful interactions |
| `--motion-easing-smooth` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Comfortable | Premium feel |
| `--motion-easing-sharp` | `cubic-bezier(0.4, 0, 0.6, 1)` | Sharp | Quick actions |

### Standard Easing (Primary)

| Token | Value | Use Case |
|-------|-------|----------|
| `--motion-easing-standard` | `var(--motion-easing-ease-in-out)` | Default transitions |
| `--motion-easing-entrance` | `var(--motion-easing-ease-out)` | Entering elements |
| `--motion-easing-exit` | `var(--motion-easing-ease-in)` | Exiting elements |

### Delay Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `--motion-delay-none` | 0ms | No delay |
| `--motion-delay-short` | 50ms | Quick stagger |
| `--motion-delay-base` | 100ms | Standard stagger |
| `--motion-delay-long` | 200ms | Long stagger |
| `--motion-delay-longer` | 300ms | Very long stagger |

---

## Animation Patterns

### Fade Animations

```css
.na-animate-fade-in    /* Fade in */
.na-animate-fade-out   /* Fade out */
```

**Duration**: 200ms  
**Easing**: Standard  
**Use Case**: Modal overlays, tooltips, notifications

### Slide Animations

```css
.na-animate-slide-up    /* Slide up from bottom */
.na-animate-slide-down   /* Slide down from top */
.na-animate-slide-left   /* Slide in from right */
.na-animate-slide-right  /* Slide in from left */
```

**Duration**: 300ms  
**Easing**: Entrance  
**Use Case**: Drawers, panels, dropdowns, modals

### Scale Animations

```css
.na-animate-scale-in      /* Scale in (subtle) */
.na-animate-scale-out     /* Scale out (subtle) */
.na-animate-scale-bounce  /* Scale with bounce */
```

**Duration**: 100ms (scale-in/out), 300ms (bounce)  
**Easing**: Standard (scale-in/out), Bounce (bounce)  
**Use Case**: Buttons, cards, popovers, tooltips

### Rotation Animations

```css
.na-animate-rotate  /* Continuous rotation */
.na-animate-spin    /* Spinning loader */
```

**Duration**: 200ms (rotate), 1s (spin)  
**Easing**: Linear  
**Use Case**: Loading indicators, icons

### Utility Animations

```css
.na-animate-pulse   /* Opacity pulse */
.na-animate-shimmer /* Shimmer effect */
```

**Duration**: 2s (pulse), 2s (shimmer)  
**Use Case**: Loading states, skeleton screens

---

## Transition Utilities

### Duration Utilities

```css
.na-motion-instant  /* 0ms */
.na-motion-fast    /* 100ms */
.na-motion-base    /* 200ms */
.na-motion-slow    /* 300ms */
.na-motion-slower  /* 500ms */
.na-motion-slowest /* 800ms */
```

### Easing Utilities

```css
.na-motion-linear      /* Linear */
.na-motion-ease-in     /* Ease in */
.na-motion-ease-out    /* Ease out */
.na-motion-ease-in-out /* Ease in-out */
.na-motion-bounce      /* Bounce */
.na-motion-smooth      /* Smooth */
.na-motion-sharp       /* Sharp */
.na-motion-standard    /* Standard (default) */
.na-motion-entrance    /* Entrance (default) */
.na-motion-exit        /* Exit (default) */
```

### Transition Presets

```css
.na-transition-fast    /* Fast transition (100ms) */
.na-transition-base    /* Base transition (200ms) */
.na-transition-slow    /* Slow transition (300ms) */
.na-transition-smooth  /* Smooth transition (200ms, smooth easing) */
.na-transition-bounce  /* Bounce transition (300ms, bounce easing) */
```

### Property-Specific Transitions

```css
.na-transition-colors   /* Color, background-color, border-color */
.na-transition-opacity  /* Opacity only */
.na-transition-transform /* Transform only */
.na-transition-shadow   /* Box-shadow only */
.na-transition-size     /* Width, height */
```

---

## Usage Examples

### Basic Button with Hover

```html
<button class="na-btn na-transition-colors na-motion-fast">
  Click me
</button>
```

### Card with Entrance Animation

```html
<div class="na-card na-animate-slide-up">
  Card content
</div>
```

### Modal with Scale Animation

```html
<div class="na-card na-animate-scale-in">
  Modal content
</div>
```

### Loading Spinner

```html
<div class="na-animate-spin">
  <svg>...</svg>
</div>
```

### Staggered List Items

```html
<ul>
  <li class="na-animate-slide-up" style="animation-delay: 0ms;">Item 1</li>
  <li class="na-animate-slide-up" style="animation-delay: 50ms;">Item 2</li>
  <li class="na-animate-slide-up" style="animation-delay: 100ms;">Item 3</li>
</ul>
```

### Custom Transition

```html
<div class="na-transition-transform na-motion-slow na-motion-bounce">
  Hover to transform
</div>
```

---

## React/TypeScript Integration

### Using Motion Classes in React

```tsx
import React from 'react';

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="na-card na-animate-slide-up">
      {children}
    </div>
  );
}
```

### Conditional Animations

```tsx
export function ConditionalAnimation({ show }: { show: boolean }) {
  return (
    <div className={show ? 'na-animate-fade-in' : 'na-animate-fade-out'}>
      Content
    </div>
  );
}
```

### Staggered Animations

```tsx
export function StaggeredList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={item}
          className="na-animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
```

---

## Best Practices

### 1. Use Semantic Classes

✅ **DO**: Use `.na-animate-*` and `.na-transition-*` classes  
❌ **DON'T**: Hardcode animation values

### 2. Respect Reduced Motion

✅ **DO**: All animations automatically respect `prefers-reduced-motion`  
❌ **DON'T**: Override reduced motion preferences

### 3. Choose Appropriate Duration

✅ **DO**: 
- Fast (100ms) for hover states
- Base (200ms) for standard transitions
- Slow (300ms) for deliberate motion

❌ **DON'T**: Use slow animations for frequent interactions

### 4. Use Entrance/Exit Easing

✅ **DO**: 
- Use `entrance` easing for entering elements
- Use `exit` easing for exiting elements

❌ **DON'T**: Use the same easing for both directions

### 5. Stagger Animations

✅ **DO**: Use delay tokens for staggered animations  
❌ **DON'T**: Hardcode delay values

---

## Accessibility

### Reduced Motion Support

All motion utilities automatically respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled */
  /* All transitions disabled */
}
```

### Best Practices

1. **Always test with reduced motion** - Ensure UI remains functional
2. **Provide alternatives** - Use opacity/color changes instead of motion
3. **Don't rely on motion** - Motion should enhance, not be required

---

## Integration with Shells

### Shell Entrance Animations

```tsx
import { SidebarShell } from '@aibos/design-system/react/shells';

export function AnimatedShell() {
  return (
    <SidebarShell className="na-animate-fade-in">
      <Content />
    </SidebarShell>
  );
}
```

### Modal Animations

```tsx
import { FormModalShell } from '@aibos/design-system/react/shells';

export function AnimatedModal() {
  return (
    <FormModalShell
      open={isOpen}
      className="na-animate-scale-in"
    >
      <Form />
    </FormModalShell>
  );
}
```

---

## Performance Considerations

### GPU Acceleration

All transform-based animations use GPU acceleration:
- `translateX/Y` - GPU accelerated
- `scale` - GPU accelerated
- `rotate` - GPU accelerated

### Avoid Animating

❌ **DON'T** animate:
- `width`, `height` (use `transform: scale()` instead)
- `top`, `left` (use `transform: translate()` instead)
- `margin`, `padding` (causes layout shifts)

✅ **DO** animate:
- `transform` (GPU accelerated)
- `opacity` (GPU accelerated)
- `color`, `background-color` (acceptable)

---

## Token Reference

### Complete Token List

```css
/* Duration */
--motion-duration-instant: 0ms;
--motion-duration-fast: 100ms;
--motion-duration-base: 200ms;
--motion-duration-slow: 300ms;
--motion-duration-slower: 500ms;
--motion-duration-slowest: 800ms;

/* Easing */
--motion-easing-linear: linear;
--motion-easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
--motion-easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
--motion-easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--motion-easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--motion-easing-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
--motion-easing-sharp: cubic-bezier(0.4, 0, 0.6, 1);
--motion-easing-standard: var(--motion-easing-ease-in-out);
--motion-easing-entrance: var(--motion-easing-ease-out);
--motion-easing-exit: var(--motion-easing-ease-in);

/* Delay */
--motion-delay-none: 0ms;
--motion-delay-short: 50ms;
--motion-delay-base: 100ms;
--motion-delay-long: 200ms;
--motion-delay-longer: 300ms;

/* Transition Presets */
--motion-transition-fast: 100ms var(--motion-easing-standard);
--motion-transition-base: 200ms var(--motion-easing-standard);
--motion-transition-slow: 300ms var(--motion-easing-standard);
--motion-transition-smooth: 200ms var(--motion-easing-smooth);
--motion-transition-bounce: 300ms var(--motion-easing-bounce);
```

---

## Examples

See `examples/motion-design-examples.html` for interactive examples of all motion patterns.

---

**The Motion Design System is complete and ready for production use!**

