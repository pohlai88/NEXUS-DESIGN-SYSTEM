# IDE Integration Guide

**How IDEs load and consume AIBOS Design System documentation**

This guide explains how to configure your IDE to get full IntelliSense, autocomplete, and documentation for the AIBOS Design System.

---

## Available JSON Formats

The design system provides **8 comprehensive JSON formats** that IDEs can consume:

### 1. API Documentation (`api-docs.json`)

**Location**: `@aibos/design-system/api-docs`

**Format**: Structured JSON with complete API reference

**Usage**:
```typescript
import apiDocs from '@aibos/design-system/api-docs';

// Access typography classes
apiDocs.typography.headings; // Array of heading classes
apiDocs.typography.data;     // Array of data classes

// Access components
apiDocs.components.cards;    // Card components
apiDocs.components.buttons;  // Button components
apiDocs.components.status;   // Status indicators

// Access layout classes
apiDocs.layout.shell;        // Shell layout classes
apiDocs.layout.grid;         // Grid layout classes

// Access all classes
apiDocs.classes;            // All documented classes
```

**Structure**:
```json
{
  "version": "2.0.0",
  "designSystem": {
    "name": "Neo-Analog Design System",
    "version": "2.0.0"
  },
  "typography": { ... },
  "components": { ... },
  "layout": { ... },
  "classes": [ ... ],
  "tokens": { ... },
  "exports": { ... }
}
```

### 2. CSS Custom Data (`css-custom-data.json`)

**Location**: `@aibos/design-system/css-custom-data`

**Format**: VS Code CSS Custom Data format

**Usage**: Configure VS Code to use this for CSS class autocomplete

**VS Code Configuration** (`.vscode/settings.json`):
```json
{
  "css.customData": [
    "./node_modules/@aibos/design-system/dist/css-custom-data.json"
  ]
}
```

Or globally in VS Code settings:
1. Open VS Code Settings (Ctrl+,)
2. Search for "css.customData"
3. Add: `node_modules/@aibos/design-system/dist/css-custom-data.json`

**Benefits**:
- Autocomplete for `.na-*` classes in CSS/HTML files
- Hover documentation for each class
- Type checking for class names

### 3. Design Tokens (`tokens.json`)

**Location**: `@aibos/design-system/tokens`

**Format**: Complete design token map

**Usage**:
```typescript
import tokens from '@aibos/design-system/tokens';

// Access color tokens
tokens.color.void;      // "#09090b"
tokens.color.paper;     // "#121214"
tokens.color.lux;       // "#f4f4f5"

// Access spacing tokens
tokens.spacing[4];      // "16px"
tokens.spacing[6];      // "24px"
```

### 4. TypeScript Definitions

**Location**: `@aibos/design-system/tokens/typescript`

**Format**: TypeScript type definitions

**Usage**:
```typescript
import type { DesignTokens } from '@aibos/design-system/tokens/typescript';

// Full type safety for tokens
const color: DesignTokens['color'] = tokens.color;
```

### 5. Validation Rules (`validation-rules.json`)

**Location**: `@aibos/design-system/validation-rules`

**Format**: Drift detection and validation rules

**Usage**:
```typescript
import validationRules from '@aibos/design-system/validation-rules';

// Access validation rules
validationRules.rules;        // Array of validation rules
validationRules.suggestions;  // Array of suggestions
validationRules.semanticClasses; // Semantic class categories
```

**Structure**:
```json
{
  "rules": [
    {
      "id": "no-arbitrary-font-size",
      "pattern": "text-[\\d+px]",
      "message": "Hardcoded font size detected...",
      "fix": "Replace with semantic typography class",
      "severity": "error",
      "category": "typography"
    }
  ],
  "suggestions": [...],
  "semanticClasses": {
    "typography": ["na-h1", "na-h2", ...],
    "components": ["na-card", "na-btn", ...]
  }
}
```

**IDE Integration**: Use for custom linting rules, code actions, and validation

### 6. Helpers Documentation (`helpers-docs.json`)

**Location**: `@aibos/design-system/helpers-docs`

**Format**: Complete documentation for all helper functions

**Usage**:
```typescript
import helpersDocs from '@aibos/design-system/helpers-docs';

// Access utility functions
helpersDocs.utilities.className;  // cn(), buildAIBOSClass()
helpersDocs.utilities.nextui;     // withAIBOS(), aibosTypography()
helpersDocs.utilities.cli;         // getValidCommands(), isValidCommand()
```

**Structure**:
```json
{
  "utilities": {
    "className": [
      {
        "name": "cn",
        "description": "Merges class names...",
        "signature": "cn(...inputs: ClassValue[]): string",
        "example": "cn('na-status', 'ok')",
        "category": "className"
      }
    ],
    "nextui": [...],
    "cli": [...]
  }
}
```

**IDE Integration**: Use for function autocomplete, parameter hints, and documentation tooltips

### 7. ESLint Configuration (`eslint-config.json`)

**Location**: `@aibos/design-system/eslint-config`

**Format**: ESLint plugin configuration and rules

**Usage**:
```typescript
import eslintConfig from '@aibos/design-system/eslint-config';

// Access ESLint rules
eslintConfig.plugin.rules;  // Array of ESLint rules
eslintConfig.usage;         // Installation and configuration guide
```

**Structure**:
```json
{
  "plugin": {
    "name": "eslint-plugin-neo-analog",
    "rules": [
      {
        "name": "no-arbitrary-values",
        "description": "Disallow arbitrary Tailwind values...",
        "patterns": [...]
      }
    ]
  },
  "usage": {
    "install": "npm install --save-dev eslint-plugin-neo-analog",
    "config": {...}
  }
}
```

**IDE Integration**: Use for ESLint plugin configuration and rule documentation

### 8. Headless Map (`headless-map.json`)

**Location**: `@aibos/design-system/headless-map`

**Format**: Complete class-to-CSS property mapping

**Usage**:
```typescript
import headlessMap from '@aibos/design-system/headless-map';

// Access class definitions
headlessMap.classes['na-h1'];  // CSS properties for na-h1
headlessMap.version;            // Map version
```

**Structure**:
```json
{
  "version": "1.0.0",
  "classes": {
    "na-h1": {
      "font-size": "var(--heading-1-size)",
      "font-weight": "var(--heading-1-weight)",
      ...
    }
  }
}
```

**IDE Integration**: Use for CSS property inspection, class analysis, and style debugging

---

## IDE-Specific Setup

### VS Code

#### 1. CSS Class Autocomplete

Add to `.vscode/settings.json`:
```json
{
  "css.customData": [
    "./node_modules/@aibos/design-system/dist/css-custom-data.json"
  ],
  "html.suggest.includeAutocomplete": true
}
```

#### 2. TypeScript IntelliSense

Already works automatically! Just import:
```typescript
import { Button } from '@aibos/design-system/react';
// Full IntelliSense and type checking
```

#### 3. JSON Schema (Optional)

For JSON file validation, add to `package.json`:
```json
{
  "$schema": "node_modules/@aibos/design-system/dist/api-docs.json"
}
```

### WebStorm / IntelliJ IDEA

1. **CSS Class Autocomplete**:
   - Go to Settings → Editor → Inspections
   - Enable "CSS: Unknown class name"
   - Add custom CSS class patterns: `na-*`

2. **TypeScript Support**:
   - Automatically works with TypeScript definitions
   - Full IntelliSense for React components

### Other IDEs

Most modern IDEs support:
- **TypeScript definitions** (`.d.ts` files) - Automatic
- **JSON imports** - Standard ES modules
- **CSS Custom Data** - VS Code format (some IDEs support)

---

## Programmatic Access

### Load API Documentation

```typescript
// ESM
import apiDocs from '@aibos/design-system/api-docs';

// CommonJS
const apiDocs = require('@aibos/design-system/api-docs');

// Dynamic import
const apiDocs = await import('@aibos/design-system/api-docs');
```

### Load CSS Custom Data

```typescript
import cssData from '@aibos/design-system/css-custom-data';

// Use in your IDE extension or tooling
cssData.classes.forEach(cls => {
  console.log(cls.name, cls.description);
});
```

### Load Design Tokens

```typescript
import tokens from '@aibos/design-system/tokens';

// Use tokens programmatically
const primaryColor = tokens.color.gold;
const standardPadding = tokens.spacing[6];
```

---

## Build Integration

The JSON files are automatically generated during build:

```bash
pnpm build
# Generates:
# - dist/api-docs.json
# - dist/css-custom-data.json
# - dist/tokens.json
```

Or generate individually:
```bash
pnpm extract:api-docs    # Generate API docs
pnpm extract:css-data    # Generate CSS custom data
pnpm extract:tokens      # Generate tokens
```

---

## Package Exports

All JSON formats are available via package exports:

```json
{
  "exports": {
    "./api-docs": "./dist/api-docs.json",
    "./css-custom-data": "./dist/css-custom-data.json",
    "./tokens": "./dist/tokens.json",
    "./tokens/typescript": "./dist/tokens/index.d.ts"
  }
}
```

---

## Example: Building an IDE Extension

```typescript
import apiDocs from '@aibos/design-system/api-docs';
import cssData from '@aibos/design-system/css-custom-data';

// Provide autocomplete suggestions
function getSuggestions(prefix: string) {
  return cssData.classes
    .filter(cls => cls.name.startsWith(prefix))
    .map(cls => ({
      label: cls.name,
      description: cls.description,
      kind: 'class'
    }));
}

// Validate class names
function isValidClass(className: string): boolean {
  return cssData.classes.some(cls => cls.name === className);
}
```

---

## Troubleshooting

### VS Code not showing autocomplete?

1. Check `css.customData` setting is configured
2. Reload VS Code window (Ctrl+Shift+P → "Reload Window")
3. Verify file exists: `node_modules/@aibos/design-system/dist/css-custom-data.json`

### TypeScript not finding types?

1. Ensure package is installed: `npm install @aibos/design-system`
2. Check `tsconfig.json` has proper module resolution
3. Restart TypeScript server (VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server")

### JSON imports not working?

1. Ensure `"type": "module"` in `package.json` (or use `.mjs` extension)
2. Use dynamic import: `const data = await import('@aibos/design-system/api-docs')`
3. Check Node.js version supports ES modules (v14+)

---

## Theme System Integration ⭐ **NEW**

### TypeScript Support

```typescript
import type {
  CustomTheme,
  ThemeState,
  ThemeMode,
  ThemeContext
} from '@aibos/design-system/themes';

// Full type safety for themes
const theme: CustomTheme = {
  name: 'my-theme',
  tokens: { /* ... */ }
};
```

### Theme Hooks IntelliSense

```typescript
import { useThemeSwitch, useCurrentTheme } from '@aibos/design-system/themes';

// Auto-complete for theme names
const { switchToCustom } = useThemeSwitch();
switchToCustom('light'); // ✅ Auto-complete suggests all theme names

// Type-safe current theme
const currentTheme = useCurrentTheme();
// TypeScript knows: 'default' | 'light' | string
```

### Theme Provider Props

```typescript
import { ThemeProvider } from '@aibos/design-system/themes';

// Full IntelliSense for props
<ThemeProvider
  initialTheme="default"  // ✅ Auto-complete
  customThemes={[...]}    // ✅ Type-checked
  persistToCookie={true}  // ✅ Boolean type
/>
```

📖 **See**: [IDE Integration - Themes](./IDE_INTEGRATION_THEMES.md) for complete theme IDE support

---

## Complete Export List

✅ **API Documentation**: `@aibos/design-system/api-docs`  
✅ **CSS Custom Data**: `@aibos/design-system/css-custom-data`  
✅ **Design Tokens**: `@aibos/design-system/tokens`  
✅ **TypeScript Types**: `@aibos/design-system/tokens/typescript`  
✅ **Validation Rules**: `@aibos/design-system/validation-rules`  
✅ **Helpers Documentation**: `@aibos/design-system/helpers-docs`  
✅ **ESLint Configuration**: `@aibos/design-system/eslint-config`  
✅ **Headless Map**: `@aibos/design-system/headless-map`  
✅ **Theme System**: `@aibos/design-system/themes` ⭐ **NEW**  
✅ **Theme SSR Utils**: `@aibos/design-system/themes/ssr-utils` ⭐ **NEW**  
✅ **Token Registry**: `@aibos/design-system/themes/token-registry` ⭐ **NEW**

All formats are automatically generated during build and available via npm package exports.

## Quick Reference

| Format | Purpose | IDE Use Case |
|--------|---------|--------------|
| `api-docs.json` | Complete API reference | Documentation, autocomplete |
| `css-custom-data.json` | CSS class IntelliSense | VS Code CSS autocomplete |
| `tokens.json` | Design tokens | Token access, theming |
| `validation-rules.json` | Drift detection rules | Custom linting, validation |
| `helpers-docs.json` | Helper functions | Function autocomplete, docs |
| `eslint-config.json` | ESLint rules | Linting configuration |
| `headless-map.json` | Class-to-CSS mapping | Style inspection, debugging |
| `tokens/index.d.ts` | TypeScript types | Type checking, IntelliSense |

