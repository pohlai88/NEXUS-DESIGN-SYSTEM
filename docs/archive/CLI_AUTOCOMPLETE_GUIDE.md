# CLI Filter: Autocomplete Engine

## Overview

The **AutocompleteEngine** is the "voice" of your governance policy. It analyzes what the user is typing and suggests only valid options from your `COMMAND_SCHEMA`.

The engine is **context-aware**: it knows whether you're typing a Key, a Value, or an Operator—and suggests accordingly.

## Core Concept: The Three Modes

### Mode A: Typing a Key (Command)
When the user hasn't typed a colon yet:
```
User types:        "st"
Suggestions:       → "status:" (with auto-appended colon)
                   → "stage:"
```

### Mode B: Typing a Value (After Colon)
When the user has typed a colon and is now entering the value:
```
User types:        "status:ac"
Suggestions:       → "active" (with auto-appended space)
                   → "archived"
```

### Mode C: Typing an Operator (Numeric/Date Fields)
When the user types a numeric or date key:
```
User types:        "score:"
Suggestions:       → ">" (operator)
                   → "<"
                   → "="
```

## Architecture

### File Structure

```
lib/cli-autocomplete.ts          ← The engine class
lib/cli-commands.ts              ← The schema it enforces (COMMAND_SCHEMA)
lib/cli-parser.ts                ← Token parser (for highlighting)
prototypes/prototype-cli-filter-autocomplete.html  ← Full working demo
```

### AutocompleteEngine API

```typescript
import { AutocompleteEngine } from '@/lib/cli-autocomplete';

const engine = new AutocompleteEngine();

// Get suggestions for current cursor position
const suggestions = engine.getSuggestions(fullText, cursorIndex);
// Returns: Suggestion[] with { label, type, insertText, description }

// Parse context from text
const context = engine.parseContext(fullText, cursorIndex);
// Returns: { word, isKey, keyContext, colonIndex }

// Calculate insertion point
const { newText, newCursorPos } = engine.getInsertionInfo(
  fullText, 
  cursorIndex, 
  insertText
);
```

### Suggestion Interface

```typescript
interface Suggestion {
  label: string;           // e.g. "status", "active", ">"
  type: 'key' | 'value' | 'operator';
  insertText: string;      // What gets inserted: "status:", "active ", ">"
  description?: string;    // UI tooltip: "Item lifecycle status"
}
```

## UX: Smart Text Insertion

This is where the "CLI rhythm" comes from:

| Action | Suggestion | insertText | Result | Cursor |
|--------|-----------|------------|--------|--------|
| Select "status" key | Label: `status` | `status:` | `status:` | After `:` |
| Select "active" value | Label: `active` | `active ` | `status:active ` | After space |
| Select `>` operator | Label: `Operator: >` | `>` | `score:>` | After `>` |

**Key Detail:** Notice the auto-appended character:
- Keys get `:` appended → users immediately see value options
- Values get ` ` (space) appended → users immediately see the next key options
- Operators get nothing → users must type the value

This creates a **natural flow**: Key → Value → Key → Value → ...

## Integration Example

### React Component

```tsx
import { useRef, useState } from 'react';
import { AutocompleteEngine } from '@/lib/cli-autocomplete';

export function CliSearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const engineRef = useRef(new AutocompleteEngine());

  const handleInput = (e) => {
    const cursor = e.currentTarget.selectionStart || 0;
    const newSuggestions = engineRef.current.getSuggestions(
      e.currentTarget.value,
      cursor
    );
    setSuggestions(newSuggestions);
    setSelectedIndex(newSuggestions.length > 0 ? 0 : -1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      acceptSuggestion(suggestions[selectedIndex]);
    }
  };

  const acceptSuggestion = (suggestion: Suggestion) => {
    const input = inputRef.current;
    if (!input) return;

    const cursor = input.selectionStart || 0;
    const { newText, newCursorPos } = engineRef.current.getInsertionInfo(
      input.value,
      cursor,
      suggestion.insertText
    );

    input.value = newText;
    input.selectionStart = input.selectionEnd = newCursorPos;
    setSuggestions([]);
    input.focus();
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="> filter..."
      />
      
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 border border-slate-200 shadow-lg rounded-md w-full z-50">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className={i === selectedIndex ? 'bg-slate-100' : ''}
              onClick={() => acceptSuggestion(s)}
            >
              <span className={`text-${s.type}`}>{s.label}</span>
              <span className="text-xs text-slate-500">{s.type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Keyboard Shortcuts

| Key | Action | Notes |
|-----|--------|-------|
| **↓** | Select next suggestion | Wraps to top |
| **↑** | Select previous suggestion | Wraps to bottom |
| **Enter** | Accept selected suggestion | Inserts and closes menu |
| **Esc** | Close menu | Menu closes, input stays |
| **Tab** | (Optional) Accept and focus next field | For form flows |

## Governance in Action

The schema enforcement happens in `getSuggestionsForKeys()` and `getSuggestionsForValues()`:

```typescript
// Only suggest keys that are in COMMAND_SCHEMA
getSuggestionsForKeys(prefix: string): Suggestion[] {
  const validKeys = Object.keys(COMMAND_SCHEMA); // ← The Law
  return validKeys
    .filter(key => key.toLowerCase().startsWith(prefix.toLowerCase()))
    .map(key => ({
      label: key,
      type: 'key',
      insertText: key + ':',
      description: COMMAND_SCHEMA[key].description
    }));
}
```

**What this means:**
- ✅ User types "st" → Sees "status", "stage", "score" (all valid)
- ❌ User types "xyz" → Sees nothing (invalid key, no suggestion)
- ✅ User types "status:ac" → Sees "active", "archived" (valid enum values)
- ❌ User types "status:invalid" → Sees nothing (not in enum)

## Advanced: Custom Context

The engine accepts optional context for runtime suggestions:

```typescript
engine.getSuggestionsForValues('owner', '', {
  owners: ['alice', 'bob', 'charlie']  // From API
});
// Returns suggestions for each owner in your team
```

This allows dynamic suggestions based on your actual data.

## Testing

### Unit Test Examples

```typescript
import { AutocompleteEngine } from '@/lib/cli-autocomplete';

describe('AutocompleteEngine', () => {
  const engine = new AutocompleteEngine();

  test('suggests valid keys', () => {
    const suggestions = engine.getSuggestions('st', 2);
    expect(suggestions.some(s => s.label === 'status')).toBe(true);
    expect(suggestions.some(s => s.label === 'stage')).toBe(true);
  });

  test('suggests values after colon', () => {
    const suggestions = engine.getSuggestions('status:ac', 9);
    expect(suggestions.some(s => s.label === 'active')).toBe(true);
  });

  test('handles operators for numeric fields', () => {
    const suggestions = engine.getSuggestions('score:', 6);
    expect(suggestions.some(s => s.insertText === '>')).toBe(true);
  });

  test('inserts text correctly', () => {
    const { newText, newCursorPos } = engine.getInsertionInfo(
      'st',
      2,
      'status:'
    );
    expect(newText).toBe('status:');
    expect(newCursorPos).toBe(7);
  });
});
```

## Files Reference

- [lib/cli-autocomplete.ts](../lib/cli-autocomplete.ts) — Full engine implementation (300+ lines)
- [lib/cli-commands.ts](../lib/cli-commands.ts) — COMMAND_SCHEMA (the law)
- [lib/cli-parser.ts](../lib/cli-parser.ts) — Token parser for syntax highlighting
- [prototypes/prototype-cli-filter-autocomplete.html](../prototypes/prototype-cli-filter-autocomplete.html) — Working demo with keyboard support
- [CLI_FILTER_COMMANDS.md](./CLI_FILTER_COMMANDS.md) — Complete command specification

## Next Steps

1. ✅ **Context-aware suggestions** (done)
2. ✅ **Keyboard navigation** (done)
3. 🔲 **Dynamic value suggestions** (user roster, component names)
4. 🔲 **Query templates** ("last week's bugs", "my open issues")
5. 🔲 **Saved filters** (persist and reuse complex queries)
6. 🔲 **AND/OR logic** (multi-clause queries)
