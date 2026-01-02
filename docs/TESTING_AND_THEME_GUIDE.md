# Testing and Theme Machine Guide

**Date**: 2026-01-02  
**Status**: ✅ **Implemented**

---

## 🧪 Testing Infrastructure

### Setup

**Framework**: Vitest + React Testing Library

**Configuration**: `vitest.config.ts`

**Test Files Location**: `tests/`

### Running Tests

```bash
# Run all tests
pnpm test

# Run with UI
pnpm test:ui

# Run with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

### Test Structure

```
tests/
├── setup.ts                    # Global test configuration
├── components/
│   └── button.test.tsx        # Component tests
├── utils/
│   └── cn.test.ts             # Utility tests
└── themes/
    └── theme-machine.test.ts  # Theme machine tests
```

### Test Coverage Goals

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Statements**: 80%

---

## 🎨 Theme Machine

### Architecture

The theme machine uses a state machine pattern to manage theme switching between default and custom themes.

### Core Concepts

1. **Theme Modes**:
   - `default` - Uses default AIBOS design tokens
   - `custom` - Uses custom theme with overrides

2. **Theme State**:
   ```ts
   type ThemeState = 
     | { mode: 'default' }
     | { mode: 'custom'; theme: CustomTheme };
   ```

3. **Actions**:
   - `SWITCH_TO_DEFAULT` - Switch to default theme
   - `SWITCH_TO_CUSTOM` - Switch to custom theme
   - `REGISTER_THEME` - Register a new custom theme
   - `UNREGISTER_THEME` - Remove a custom theme
   - `UPDATE_THEME` - Update theme tokens/variables

---

## 📖 Usage Examples

### Theme Provider Setup

```tsx
import { ThemeProvider } from '@aibos/design-system/themes/ThemeProvider';

const customThemes = [
  {
    name: 'dark',
    tokens: {
      primaryColor: '#000000',
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff'
    },
    cssVariables: {
      '--custom-shadow': '0 4px 6px rgba(0,0,0,0.3)'
    }
  }
];

function App() {
  return (
    <ThemeProvider initialTheme="default" customThemes={customThemes}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using Theme Hooks

```tsx
import { useThemeSwitch, useCurrentTheme } from '@aibos/design-system/themes/ThemeProvider';

function ThemeSwitcher() {
  const { switchToDefault, switchToCustom } = useThemeSwitch();
  const { mode, theme, availableThemes, isDefault } = useCurrentTheme();

  return (
    <div>
      <p>Current theme: {mode}</p>
      {!isDefault && <p>Theme name: {theme?.name}</p>}
      
      <button onClick={() => switchToDefault()}>
        Default Theme
      </button>
      
      {availableThemes
        .filter(name => name !== 'default')
        .map(name => (
          <button key={name} onClick={() => switchToCustom(name)}>
            {name}
          </button>
        ))}
    </div>
  );
}
```

### Registering Themes Dynamically

```tsx
import { useThemeSwitch } from '@aibos/design-system/themes/ThemeProvider';

function ThemeManager() {
  const { registerTheme, updateTheme } = useThemeSwitch();

  const handleCreateTheme = () => {
    registerTheme({
      name: 'my-custom-theme',
      tokens: {
        primaryColor: '#ff0000',
        secondaryColor: '#00ff00'
      }
    });
  };

  const handleUpdateTheme = () => {
    updateTheme('my-custom-theme', {
      tokens: {
        primaryColor: '#0000ff' // Update primary color
      }
    });
  };

  return (
    <div>
      <button onClick={handleCreateTheme}>Create Theme</button>
      <button onClick={handleUpdateTheme}>Update Theme</button>
    </div>
  );
}
```

---

## 🔧 Theme Machine API

### Theme Reducer

```ts
function themeReducer(
  state: ThemeContext,
  action: ThemeAction
): ThemeContext
```

### Apply Theme

```ts
function applyTheme(theme: ThemeState): void
```

Applies theme CSS variables to document root.

### Get Theme CSS Variables

```ts
function getThemeCSSVariables(theme: ThemeState): Record<string, string>
```

Returns CSS variables for a theme state.

---

## 🧪 Testing Themes

### Example Test

```tsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useCurrentTheme } from '@aibos/design-system/themes/ThemeProvider';

function TestComponent() {
  const { mode, isDefault } = useCurrentTheme();
  return <div data-testid="theme-mode">{mode}</div>;
}

test('should use default theme', () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
  
  expect(screen.getByTestId('theme-mode')).toHaveTextContent('default');
});
```

---

## 📊 Implementation Status

### Testing ✅
- ✅ Vitest setup
- ✅ React Testing Library
- ✅ Test utilities
- ✅ Button component tests
- ✅ Utility function tests
- ✅ Theme machine tests

### Theme Machine ✅
- ✅ State machine implementation
- ✅ Theme reducer
- ✅ Theme provider (React)
- ✅ Theme hooks
- ✅ CSS variable application
- ✅ Theme registration/updates

---

## 🎯 Next Steps

### Testing
- [ ] Add tests for all 12 components
- [ ] Add integration tests
- [ ] Add accessibility tests
- [ ] Add visual regression tests

### Theme Machine
- [ ] Add theme persistence (localStorage)
- [ ] Add theme preview
- [ ] Add theme validation
- [ ] Add theme export/import

---

**Last Updated**: 2026-01-02  
**Status**: ✅ Testing and Theme Machine implemented

