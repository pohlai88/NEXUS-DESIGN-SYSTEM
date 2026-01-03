# Design System Governance

**Rules and best practices for using Neo-Analog design system**

---

## Core Principles

### 1. **Semantic Over Arbitrary**

❌ **WRONG:** Hardcoded values prevent system consistency  
```css
.element {
  color: #f4f4f5;           /* Hardcoded */
  padding: 24px;            /* Hardcoded */
  font-size: 14px;          /* Hardcoded */
  border-radius: 12px;      /* Hardcoded */
}
```

✅ **CORRECT:** Use token variables for automatic consistency  
```css
.element {
  color: var(--color-lux);
  padding: var(--spacing-6);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-card);
}
```

### 2. **Typography Hierarchy**

Never use arbitrary font sizes. Always use the heading hierarchy:

| Use This | Not This | When |
|----------|----------|------|
| `.na-h1` | `.text-4xl` | Page titles (32px) |
| `.na-h2` | `.text-3xl` | Section titles (24px) |
| `.na-h3` | `.text-2xl` | Subsection titles (20px) |
| `.na-h4` | `.text-xl` | Card titles (18px) |
| `.na-h5` | `.text-lg` | Small titles (16px) |
| `.na-h6` | `.text-base` | Micro titles (14px) |
| `.na-data` | `.text-sm` | Data values (14px, mono) |
| `.na-metadata` | `.text-xs` | Labels/captions (11px) |

**Why:** Consistent typography across products, easier updates, prevents drift.

### 3. **Color Semantics**

Use semantic colors instead of generic names:

| Semantic | Not | Reason |
|----------|-----|--------|
| `var(--color-lux)` | `.text-white` | White is too generic |
| `var(--color-clay)` | `.text-gray-500` | Semantic meaning |
| `var(--color-gold)` | `.text-yellow-500` | Brand-specific |
| `var(--color-error)` | `.text-red-500` | Semantic meaning |
| `var(--color-paper)` | `.bg-gray-900` | Semantic meaning |

**Why:** Color meanings stay consistent even if palette changes.

### 4. **Spacing System**

Use the 4px increment spacing scale, never arbitrary values:

| Use | Not | Spacing |
|-----|-----|---------|
| `p-4` | `p-[20px]` | 16px (Tailwind) |
| `p-6` | `p-[24px]` | 24px **Comfort standard** |
| `gap-6` | `gap-[20px]` | 24px |
| `m-8` | `m-[30px]` | 32px |
| `var(--spacing-6)` | `padding: 24px;` | In CSS |

**Why:** Consistent visual rhythm, easier alignment, scalable layouts.

### 5. **Border Radius Strategy**

Use semantic radius tokens, not arbitrary values:

| Semantic | Use Case |
|----------|----------|
| `rounded-control` (`--radius-control`) | Buttons, inputs (8px) |
| `rounded-card` (`--radius-card`) | Cards, panels (12px) |
| `rounded-panel` (`--radius-panel`) | Large panels (16px) |
| `rounded-full` | Avatars, circles |

**Why:** Consistent shape language, brand coherence.

### 6. **Shadow Consistency**

Always use shadow tokens, not arbitrary box-shadow:

| Token | Use Case |
|-------|----------|
| `shadow-sm` | Subtle elevation |
| `shadow-card` | Card/panel elevation |
| `shadow-lift` | Hover state |
| `shadow-deep` | Modal/prominent |
| `shadow-gilded` | Accent highlight |

**Why:** Consistent depth system, Neo-Analog aesthetic.

---

## DO's ✅

### Typography
- ✅ Use `.na-h1` through `.na-h6` for headings
- ✅ Use `.na-data` for data values
- ✅ Use `.na-metadata` for labels/captions
- ✅ Use `text-lux`, `text-clay`, `text-gold` classes
- ✅ Use `font-sans`, `font-serif`, `font-mono` families

### Colors
- ✅ Use semantic color tokens: `--color-primary`, `--color-destructive`
- ✅ Use color classes: `text-lux`, `bg-paper`, `border-stroke`
- ✅ Use `var(--color-*)` in CSS
- ✅ Use status colors for meaningful states: `--color-success`, `--color-warning`, `--color-error`

### Spacing
- ✅ Use Tailwind spacing: `p-4`, `m-6`, `gap-3`
- ✅ Use `var(--spacing-*)` in CSS
- ✅ Default to `--spacing-6` (24px) for padding
- ✅ Use `--spacing-4` (16px) for smaller elements
- ✅ Use `--spacing-8` (32px) for larger elements

### Radius & Shadows
- ✅ Use `rounded-card`, `rounded-panel`, `rounded-control`
- ✅ Use `shadow-card`, `shadow-lift`, `shadow-deep`
- ✅ Use `rounded-full` for circles only
- ✅ Combine radius + shadow for depth

### Components
- ✅ Use `.na-field` for form sections
- ✅ Use `.na-label` for form labels
- ✅ Use `.na-input` for input fields
- ✅ Use `.na-card` for card containers
- ✅ Use `.na-panel` for panel containers

### Animation
- ✅ Use `--duration-*` for transition speeds
- ✅ Use `--ease-premium` for natural motion
- ✅ Respect `prefers-reduced-motion`
- ✅ Keep animations under 500ms for default UI

---

## DON'Ts ❌

### Typography
- ❌ Don't hardcode font sizes: `font-size: 14px;`
- ❌ Don't use arbitrary Tailwind sizes: `.text-[14px]`
- ❌ Don't mix heading levels arbitrarily
- ❌ Don't use `text-white` or `text-black`

### Colors
- ❌ Don't hardcode hex colors: `color: #f4f4f5;`
- ❌ Don't use generic color names: `.text-gray-500`
- ❌ Don't invent new colors
- ❌ Don't use hardcoded RGB values: `rgb(244, 244, 245)`

### Spacing
- ❌ Don't hardcode padding/margin: `padding: 24px;`
- ❌ Don't use arbitrary values: `.p-[20px]`, `.m-[30px]`
- ❌ Don't mix spacing systems
- ❌ Don't use non-4px increments

### Radius & Shadows
- ❌ Don't hardcode border-radius: `border-radius: 12px;`
- ❌ Don't use arbitrary box-shadow
- ❌ Don't mix shadow systems
- ❌ Don't use rounded-full for cards/buttons

### Components
- ❌ Don't create custom form components
- ❌ Don't style buttons without card + shadow
- ❌ Don't mix component styles
- ❌ Don't ignore accessibility

### Animation
- ❌ Don't use non-standard easing
- ❌ Don't create animations that ignore `prefers-reduced-motion`
- ❌ Don't use durations over 1000ms for standard UI
- ❌ Don't animate expensive properties (use `transform`, `opacity`)

---

## Governance Checklist

Before committing code, verify:

- [ ] **Typography:** All text uses hierarchy classes (`.na-h1` through `.na-h6`, `.na-data`, `.na-metadata`)
- [ ] **Colors:** All colors use tokens or semantic classes (no hex, no hardcoded)
- [ ] **Spacing:** All padding/margin uses tokens or Tailwind utilities (no hardcoded values)
- [ ] **Radius:** All border-radius uses semantic tokens (`.rounded-card`, etc.)
- [ ] **Shadows:** All shadows use token shadows, not arbitrary box-shadow
- [ ] **Components:** All form elements use `.na-field`, `.na-label`, `.na-input`
- [ ] **Accessibility:** Focus states visible, colors have sufficient contrast, animations respect `prefers-reduced-motion`
- [ ] **No Magic Numbers:** No arbitrary pixel values, only tokens
- [ ] **Consistent Spacing:** Spacing follows 4px increment system
- [ ] **No CSS Hacks:** No `!important`, no inline styles, no utility class overrides

---

## Review Checklist (For Code Reviews)

| Item | ✅ | Notes |
|------|----|----|
| Uses typography tokens (`.na-h*`, `.na-data`, etc.) | | |
| Uses color tokens/classes (no hardcoded colors) | | |
| Uses spacing tokens (no hardcoded padding/margin) | | |
| Uses semantic radius tokens | | |
| Uses shadow tokens | | |
| Form elements use `.na-field`, `.na-label` | | |
| No magic numbers or hardcoded values | | |
| Accessibility standards met (focus, contrast) | | |
| Animations respect `prefers-reduced-motion` | | |
| Component naming consistent (`.na-*` prefix) | | |

---

## Maintenance

### Token Updates

When updating tokens:

1. Edit [input.css](../input.css)
2. Run `pnpm run build` to compile
3. Verify [style.css](../style.css) updated
4. Check [dist/tokens.json](../dist/tokens.json) output
5. Test in `prototypes/` before publishing

### Adding New Tokens

Before adding a new token:

1. **Does it map to a primitive?** All tokens should extend primitives
2. **Is it semantic?** Tokens should have meaning
3. **Is it reusable?** Used in 2+ places?
4. **Is it documented?** Add to [TOKEN_REFERENCE.md](TOKEN_REFERENCE.md)

Example:
```css
/* ❌ WRONG: New arbitrary token */
--my-custom-spacing: 18px;

/* ✅ CORRECT: Extends primitive scale */
--spacing-4_5: 1.125rem; /* Fills gap in scale */
```

### Deprecating Tokens

When deprecating:

1. Mark old token as `@deprecated`
2. Document replacement token
3. Update usage across codebase
4. Announce in changelog
5. Remove in next major version

---

## Common Issues

### "Should I create a new token?"

**Ask these questions:**

1. **Is it a variation of an existing token?**  
   → Use the existing token with modifiers

2. **Does it break the semantic meaning?**  
   → Don't create tokens that contradict system semantics

3. **Is it used more than once?**  
   → Only create tokens for reusable values

4. **Can it be expressed with existing tokens?**  
   → Compose, don't duplicate

### "Why can't I use arbitrary values?"

- **Prevents drift:** Consistent look across products
- **Enables updates:** Change token once, updates everywhere
- **Scales:** Easy to manage 254 tokens, impossible to manage 1,000+ arbitrary values
- **Collaboration:** Designers and developers speak same language

### "What if I need a value not in the scale?"

1. **First:** Check if an existing token works (often it does)
2. **Second:** Propose adding to the scale (submit PR)
3. **Last resort:** Use a token + adjust: `calc(var(--spacing-6) - 2px)`

---

## Support & Questions

- **Token Reference:** [TOKEN_REFERENCE.md](TOKEN_REFERENCE.md)
- **Integration Guide:** [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)
- **Design System:** [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md)

---

**Version:** 1.0  
**Last Updated:** 2025-01-24  
**Maintained By:** Neo-Analog Design System Team
