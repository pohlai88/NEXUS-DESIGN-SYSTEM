# Neo-Analog CLI Filter: Integration Guide

## Overview

The **CLI Filter** is a high-governance data table feature that transforms a standard search input into a "Command Line" interface for semantic filtering. Users can type natural commands like:

```
status:active >100 error "high priority"
```

And the system will:
1. **Parse** the command into tokens (keys, operators, values)
2. **Highlight** each token type with Neo-Analog colors (blue=keys, amber=operators, emerald=values)
3. **Filter** the table data based on extracted key-value pairs
4. **Validate** the syntax in real-time

## Architecture

### 1. Token Types

| Type | Syntax | Example | Color |
|------|--------|---------|-------|
| **Key** | `word:` | `status:`, `owner:` | Blue (#3b82f6) |
| **Operator** | `>`, `<`, `=`, `<=`, `!=` | `>100`, `<=50` | Amber (#f59e0b) |
| **Value** | Any word or `"quoted phrase"` | `active`, `"high priority"` | Emerald (#10b981) |
| **Raw** | Unrecognized text | `error`, `bug` | Gray (#6b7280) |

### 2. Input Overlay Technique

The magic is in the CSS positioning trick:

```html
<div class="cli-input-container">
    <!-- Background layer with colored tokens -->
    <div class="cli-input-backdrop" id="backdrop"></div>
    
    <!-- Transparent input with visible caret -->
    <input type="text" class="cli-input-field" id="cliInput" />
</div>
```

**Key CSS Properties:**
- `.cli-input-field` has `color: transparent` and `caret-color: black`
- `.cli-input-backdrop` is `position: absolute` with `pointer-events: none`
- Both share the same font, padding, and line-height for pixel-perfect alignment
- HTML inside backdrop uses `white-space: pre-wrap` to match text wrapping

### 3. Parser Implementation

Located in: `lib/cli-parser.ts`

**Core Functions:**

#### `parseSearchInput(input: string): FilterToken[]`
Tokenizes the input using a single regex:
```typescript
const regex = /([a-zA-Z0-9_-]+:)|([><=!]+)|(".*?"|[^"\s]+)|(\s+)/g;
```

Returns array of `{ type, text, start, end }` objects.

#### `highlightCommand(input: string): string`
Converts tokens to HTML with color spans:
```typescript
<span class="text-blue-600">status:</span> <span class="text-emerald-700">active</span>
```

#### `extractKeyValues(tokens: FilterToken[]): Record<string, string[]>`
Pulls out structured filters:
```typescript
Input:  "status:active owner:alice >100"
Output: { status: ["active"], owner: ["alice"] }
// Note: Operators are separate from key-value extraction
```

#### `filterData<T>(data: T[], input: string, keyMapping?): T[]`
Apply parsed filters to array of objects:
```typescript
const data = [
  { status: 'active', score: 150, name: 'Task A' },
  { status: 'closed', score: 50, name: 'Task B' },
];

const filtered = filterData(data, 'status:active >100');
// Returns: [Task A]
```

## Implementation Steps

### Step 1: Add CLI Parser to Your Project

```bash
# Already created in lib/cli-parser.ts
# Import it where needed:
import { parseSearchInput, highlightCommand, filterData } from '@/lib/cli-parser';
```

### Step 2: Create Filter UI Component (React Example)

```tsx
import { useState } from 'react';
import { parseSearchInput, highlightCommand, filterData } from '@/lib/cli-parser';

export function CliDataTable({ data }) {
  const [query, setQuery] = useState('');
  const [backdropHtml, setBackdropHtml] = useState('');

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Update backdrop with highlighted tokens
    setBackdropHtml(highlightCommand(value));
  };

  const filtered = filterData(data, query);

  return (
    <div>
      {/* CLI Input with Overlay */}
      <div className="cli-input-container">
        <div 
          className="cli-input-backdrop"
          dangerouslySetInnerHTML={{ __html: backdropHtml }}
        />
        <input
          type="text"
          className="cli-input-field"
          value={query}
          onChange={handleInput}
          placeholder="Try: status:active >100"
        />
      </div>

      {/* Data Table (filtered) */}
      <table className="data-table">
        <tbody>
          {filtered.map((row, i) => (
            <tr key={i}>
              <td>{row.status}</td>
              <td>{row.score}</td>
              <td>{row.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Step 3: CSS Setup

Add to your stylesheet or Tailwind config:

```css
.cli-input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.cli-input-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: inherit;
  font: inherit;
  color: transparent;
  pointer-events: none;
  z-index: 1;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}

.cli-input-field {
  position: relative;
  z-index: 2;
  background: transparent;
  color: transparent;
  caret-color: #09090b; /* Visible caret */
  outline: none;
  resize: none;
}

/* Token colors (Neo-Analog) */
.token-key { @apply text-blue-600 font-semibold; }
.token-operator { @apply text-amber-600 font-bold; }
.token-value { @apply text-emerald-700; }
.token-raw { @apply text-gray-600; }
```

### Step 4: Key Mapping (Optional)

If your data fields don't match CLI key names:

```typescript
const keyMapping = {
  'status': 'statusCode',
  'owner': 'assignedTo',
  'type': 'issueType',
};

const filtered = filterData(data, query, keyMapping);
```

## Advanced Features

### Operator Support

The parser recognizes comparison operators:
- `>value` - greater than
- `<value` - less than
- `=value` - equals
- `<=value` - less than or equal
- `!=value` - not equals

**Note:** Current `filterData()` only supports key:value matching. To implement numeric comparison:

```typescript
function applyOperators(data, operators) {
  return data.filter(item => {
    for (const [field, op, value] of operators) {
      const itemVal = Number(item[field]);
      const filterVal = Number(value);
      
      if (op === '>' && !(itemVal > filterVal)) return false;
      if (op === '<' && !(itemVal < filterVal)) return false;
      if (op === '=' && !(itemVal === filterVal)) return false;
      // ... etc
    }
    return true;
  });
}
```

### Quoted Phrase Support

The parser handles quoted strings:
```
"high priority" owner:"alice smith"
```

This is preserved in the token value:
```javascript
{ type: 'value', text: 'high priority' }
```

### Multi-Field Search

Users can chain multiple filters:
```
status:active owner:alice type:bug >100
```

The `extractKeyValues()` function builds:
```javascript
{
  status: ['active'],
  owner: ['alice'],
  type: ['bug']
}
```

## Testing

### Unit Test Example (Vitest)

```typescript
import { parseSearchInput, extractKeyValues, filterData } from '@/lib/cli-parser';

describe('CLI Parser', () => {
  test('should parse key:value syntax', () => {
    const tokens = parseSearchInput('status:active');
    expect(tokens).toEqual([
      { type: 'key', text: 'status:', start: 0, end: 7 },
      { type: 'value', text: 'active', start: 7, end: 13 },
    ]);
  });

  test('should extract key-value pairs', () => {
    const tokens = parseSearchInput('status:active owner:alice');
    const result = extractKeyValues(tokens);
    expect(result).toEqual({
      status: ['active'],
      owner: ['alice'],
    });
  });

  test('should filter data', () => {
    const data = [
      { status: 'active', name: 'Task A' },
      { status: 'closed', name: 'Task B' },
    ];
    const filtered = filterData(data, 'status:active');
    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('Task A');
  });
});
```

## Live Demo

Open `prototypes/prototype-cli-filter.html` in your browser to see:
- Real-time syntax highlighting
- Token parsing output
- Filter extraction
- Neo-Analog color scheme in action

## Governance Benefits

✅ **Semantic:** Users learn your data model (status, owner, type)  
✅ **Consistent:** Same syntax everywhere in the app  
✅ **Discoverable:** Auto-complete can suggest valid keys  
✅ **Powerful:** Supports complex multi-field queries  
✅ **Accessible:** Works with keyboard-only navigation  
✅ **Auditable:** Parsed filters can be logged/saved  

## Next Steps

1. Wire up to your actual data source
2. Add auto-complete for valid keys and values
3. Implement numeric operator support (>, <, =, !=)
4. Add query history/saved filters
5. Create "filter templates" for common searches
