# Theme Engine Examples

## Light Theme Demo

This directory contains examples demonstrating the AIBOS Design System theme engine.

### Running the Demo

```bash
# In a Next.js project
npm install @aibos/design-system
```

Then use the `ThemeDemo` component:

```tsx
import ThemeDemo from './examples/theme-demo';

export default function Page() {
  return <ThemeDemo />;
}
```

### What It Demonstrates

1. **Theme Switching** - Switch between default (dark) and light themes
2. **Tailwind v4 Integration** - See how utility classes respond to themes
3. **Token Mapping** - Verify CSS variables are applied correctly
4. **Component Theming** - See buttons, cards, and status colors themed

### Light Theme Features

- ✅ High contrast for accessibility
- ✅ Comfortable reading experience
- ✅ All AIBOS semantic tokens mapped
- ✅ Tailwind v4 and ShadCN compatible
- ✅ Production-ready color palette

