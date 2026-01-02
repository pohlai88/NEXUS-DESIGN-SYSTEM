# IDE Integration - Theme System

**For**: VS Code, WebStorm, TypeScript  
**Status**: ✅ **Production Ready**

---

## TypeScript Support

### Import Types

```typescript
import type {
  CustomTheme,
  ThemeState,
  ThemeMode,
  ThemeContext
} from '@aibos/design-system/themes';
```

### Theme Provider Props

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: 'default' | string;
  serverTheme?: string;
  customThemes?: CustomTheme[];
  persistToCookie?: boolean;
}
```

### Custom Theme Type

```typescript
interface CustomTheme {
  name: string;
  tokens: Record<string, string | number>;
  cssVariables?: Record<string, string>;
}
```

---

## VS Code IntelliSense

### Auto-complete for Themes

```typescript
import {
  defaultTheme,
  lightTheme,
  twilightTheme,
  // ... all themes auto-complete
} from '@aibos/design-system/themes';
```

### Hover Documentation

Hover over any theme import to see:
- Theme name
- Primary color
- Background color
- Best use cases

### Theme Hooks

```typescript
import { useThemeSwitch } from '@aibos/design-system/themes';

// Auto-complete for switchToCustom
const { switchToCustom } = useThemeSwitch();
switchToCustom('light'); // ✅ Auto-complete theme names
```

---

## WebStorm Support

### Type Inference

WebStorm automatically infers types from theme definitions:

```typescript
const theme = lightTheme;
// WebStorm knows: theme.name = 'light'
// WebStorm knows: theme.tokens.primary = '#d97706'
```

### Refactoring

- Rename theme names across codebase
- Find all usages of a theme
- Extract theme to variable

---

## TypeScript Strict Mode

All theme types are fully compatible with TypeScript strict mode:

```typescript
// ✅ Type-safe theme switching
const { switchToCustom } = useThemeSwitch();
switchToCustom('light'); // ✅ Valid
switchToCustom('invalid'); // ⚠️ TypeScript error

// ✅ Type-safe theme access
const currentTheme = useCurrentTheme();
if (currentTheme === 'light') {
  // TypeScript knows currentTheme is 'light'
}
```

---

## JSDoc Comments

All themes include JSDoc comments for IDE tooltips:

```typescript
/**
 * Light Theme
 * 
 * High-contrast light theme for daytime use.
 * Primary: Amber-600 (#d97706)
 * Background: White (#ffffff)
 */
export const lightTheme: CustomTheme = {
  // ...
};
```

---

## Import Suggestions

IDEs will suggest available themes:

```typescript
import { 
  // IDE suggests all available themes:
  defaultTheme,
  lightTheme,
  twilightTheme,
  attractiveTheme,
  carbonMistTheme,
  goldGlowTheme,
  gruvboxMaterialTheme,
  rosePineTheme,
  catppuccinFrappeTheme,
  kanagawaTheme
} from '@aibos/design-system/themes';
```

---

## Go to Definition

- **F12** or **Cmd+Click** on any theme to jump to definition
- See full theme structure
- View all token values
- Understand theme architecture

---

## Find References

- **Shift+F12** to find all usages of a theme
- See where themes are imported
- Track theme usage across codebase

---

## Code Completion

### Theme Names

```typescript
switchToCustom('light'); // ✅ Auto-complete suggests: 'light', 'twilight', etc.
```

### Theme Tokens

```typescript
const theme = lightTheme;
theme.tokens.primary; // ✅ Auto-complete suggests all token names
```

### CSS Variables

```typescript
theme.cssVariables?.['--custom-glow']; // ✅ Auto-complete for custom variables
```

---

## Error Detection

TypeScript will catch errors at compile time:

```typescript
// ❌ Error: Theme name doesn't exist
switchToCustom('non-existent-theme');

// ❌ Error: Missing required token
const invalidTheme: CustomTheme = {
  name: 'invalid',
  // Missing tokens
};
```

---

## Documentation Tooltips

Hover over any theme-related code to see:

- Theme description
- Color values
- Usage recommendations
- Related themes

---

**Full IDE support for all 10 themes!**

