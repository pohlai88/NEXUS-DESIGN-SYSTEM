# Component Specifications

This directory contains component specifications that drive the Design-to-Code Engine.

## Structure

```
specs/
├── components/          # Individual component specs (JSON)
│   ├── button.json
│   ├── input.json
│   └── ...
└── components.json      # Index file (optional, for reference)
```

## Creating a Component Specification

### Basic Structure

```json
{
  "name": "Button",
  "description": "Interactive button component",
  "radixPrimitive": null,
  "nativeElement": "button",
  "props": {
    "variant": {
      "type": "primary | secondary | danger",
      "default": "primary",
      "required": false,
      "description": "Visual style variant"
    }
  },
  "variants": {
    "primary": {
      "aibosClasses": ["na-btn", "na-btn-primary"],
      "description": "Primary action button"
    },
    "secondary": {
      "aibosClasses": ["na-btn", "na-btn-secondary"],
      "description": "Secondary button"
    }
  },
  "states": {
    "disabled": {
      "aibosClasses": ["opacity-50", "cursor-not-allowed"],
      "description": "Disabled state"
    }
  },
  "metadata": {
    "category": "interactive",
    "complexity": "simple"
  }
}
```

### For Radix UI Components

```json
{
  "name": "Dialog",
  "radixPrimitive": "@radix-ui/react-dialog",
  "variants": {
    "default": {
      "aibosClasses": ["na-dialog"]
    }
  },
  "parts": {
    "Root": {
      "aibosClasses": ["na-dialog"]
    },
    "Trigger": {
      "aibosClasses": ["na-btn"]
    },
    "Content": {
      "aibosClasses": ["na-card"]
    }
  }
}
```

## Validation

All specs are validated using Zod schemas. See `adapters/universal/validation.ts` for validation rules.

## Usage

Specs are automatically loaded by the build script:

```bash
pnpm build:components
```

