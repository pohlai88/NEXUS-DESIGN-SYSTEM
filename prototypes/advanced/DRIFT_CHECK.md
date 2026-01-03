# Design System Drift Check Report

**Generated:** 2025-01-27  
**Purpose:** Identify hardcoded values and inconsistencies that should use design system tokens

---

## 🔍 Linting Status

✅ **No linter errors found** - All files pass basic linting

---

## ⚠️ Issues Found

### 1. Hardcoded Hex Colors in Inline Styles

**Location:** `erp-ommi-consolde.html`
- Line 495: `color:#eab308` → Should use `var(--color-gold)`
- Line 646: `color:#a1a1aa` → Should use `var(--color-lux-dim)`
- Line 654: `color:#a1a1aa` → Should use `var(--color-lux-dim)`
- Line 681: `color:#a1a1aa` → Should use `var(--color-lux-dim)`

**Location:** `ommi-ulti.html`
- Line 438: `color: var(--c-dim)` → Should use `var(--color-clay)`
- Line 442: `color: var(--c-dim)` → Should use `var(--color-clay)`
- Line 466: `color: var(--c-dim)` → Should use `var(--color-clay)`

**Location:** `data-console.html`
- Line 217: `background: #3b82f6` → Should use `var(--color-info)`

**Location:** `omni-god.html`
- Line 270: `background: #3b82f6` → Should use `var(--color-info)`
- Line 545: `background: #3b82f6` → Should use `var(--color-info)`

### 2. Hardcoded Spacing Values in Inline Styles

Many files have inline styles with hardcoded spacing values that should use design system tokens:

**Common patterns found:**
- `gap: 8px` → Should use `var(--spacing-2)`
- `gap: 12px` → Should use `var(--spacing-3)`
- `gap: 14px` → Should use `var(--spacing-4)` (closest)
- `gap: 16px` → Should use `var(--spacing-4)`
- `padding: 10px` → Should use `var(--spacing-3)` (closest) or `var(--spacing-2)`
- `padding: 12px` → Should use `var(--spacing-3)`
- `padding: 16px` → Should use `var(--spacing-4)`
- `margin: 12px 0` → Should use `var(--spacing-3) 0`
- `margin: 14px 0` → Should use `var(--spacing-4) 0` (closest)

### 3. Hardcoded Font Sizes in Inline Styles

**Common patterns:**
- `font-size: 9px` → Should use `var(--font-size-xs)` (12px) or keep if intentional
- `font-size: 10px` → Should use `var(--font-size-xs)` (12px) or keep if intentional
- `font-size: 11px` → Should use `var(--font-size-xs)` (12px) or keep if intentional
- `font-size: 12px` → Should use `var(--font-size-xs)`
- `font-size: 13px` → Should use `var(--font-size-sm)` (14px) or keep if intentional
- `font-size: 18px` → Should use `var(--font-size-lg)` (18px) - matches!

### 4. Old Variable References

**Location:** `ommi-ulti.html`
- `var(--c-dim)` → Should be `var(--color-clay)`

---

## ✅ Acceptable Exceptions

### Layout-Specific Variables
These are **intentional** and **acceptable** as they're prototype-specific:
- `--w-sidebar`, `--w-inspector`, `--h-header`, `--h-toolbar` (layout dimensions)
- `--w-side`, `--w-insp`, `--h-head`, `--h-foot` (layout dimensions)

These don't need to be migrated as they're unique to each prototype's layout.

---

## 📊 Summary

| Issue Type | Count | Priority |
|------------|-------|----------|
| Hardcoded Hex Colors | 8 | 🔴 High |
| Old Variable References | 3 | 🔴 High |
| Hardcoded Spacing | ~100+ | 🟡 Medium |
| Hardcoded Font Sizes | ~50+ | 🟡 Medium |

---

## 🔧 Recommended Actions

### High Priority (Fix Now)
1. Replace all hardcoded hex colors with design system variables
2. Replace old variable references (`--c-dim` → `--color-clay`)

### Medium Priority (Fix When Time Permits)
1. Replace hardcoded spacing values in inline styles with design system tokens
2. Replace hardcoded font sizes with design system tokens (where appropriate)

### Low Priority (Optional)
1. Consider extracting frequently used inline styles into CSS classes
2. Document when hardcoded values are intentional (e.g., micro-adjustments)

---

## 🛠️ How to Check for Drift

### Method 1: Use Linter
```bash
# Check for linting errors
# (Already integrated in IDE)
```

### Method 2: Search for Patterns
```bash
# Find hardcoded colors
grep -r "#[0-9a-fA-F]\{6\}" prototypes/advanced/

# Find hardcoded spacing
grep -r "gap:\s*\d\+px\|padding:\s*\d\+px\|margin:\s*\d\+px" prototypes/advanced/

# Find old variable references
grep -r "var(--c-\|var(--bg-\|var(--s-" prototypes/advanced/
```

### Method 3: Use This Report
Run this drift check periodically to catch new issues.

