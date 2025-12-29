# CLI Filter: Valid Commands Reference

This document lists all valid filter keys for the Neo-Analog CLI Filter, organized by semantic category.

## Status & Lifecycle

| Key | Type | Valid Values | Example |
|-----|------|--------------|---------|
| `status` | enum | `active`, `pending`, `completed`, `archived`, `paused` | `status:active` |
| `stage` | enum | `backlog`, `todo`, `in-progress`, `in-review`, `done` | `stage:in-progress` |
| `priority` | enum | `critical`, `high`, `medium`, `low`, `none` | `priority:high` |
| `severity` | enum | `blocker`, `major`, `minor`, `trivial`, `info` | `severity:major` |

## People & Teams

| Key | Type | Valid Values | Example |
|-----|------|--------------|---------|
| `owner` | string | Username or full name | `owner:alice` or `owner:"Alice Smith"` |
| `assignee` | string | Username or full name | `assignee:bob` |
| `reviewer` | string | Username or full name | `reviewer:charlie` |
| `created-by` | string | Username or full name | `created-by:diana` |
| `team` | string | Team slug or name | `team:backend` or `team:"Platform Team"` |

## Classification

| Key | Type | Valid Values | Example |
|-----|------|--------------|---------|
| `type` | enum | `bug`, `feature`, `enhancement`, `task`, `spike`, `doc`, `refactor` | `type:bug` |
| `component` | string | Component name | `component:dashboard` |
| `area` | string | Area of codebase | `area:auth` or `area:"User Management"` |
| `tag` | string | Custom tag | `tag:urgent` |

## Metrics & Comparisons

| Key | Operator | Valid Syntax | Example |
|-----|----------|--------------|---------|
| `score` | `>`, `<`, `=`, `!=` | Numeric value | `score:>80` or `score:<20` |
| `effort` | `>`, `<`, `=` | Numeric (1-10 scale) | `effort:>5` |
| `duration` | `>`, `<` | Numeric (days/hours) | `duration:>7` |
| `age` | `>`, `<` | Numeric (days) | `age:<30` |
| `count` | `>`, `<`, `=` | Numeric | `count:>10` |

## Time-Based

| Key | Type | Valid Format | Example |
|-----|------|--------------|---------|
| `created` | date | `YYYY-MM-DD` or `relative` | `created:2025-01-01` or `created:>2025-01-01` |
| `updated` | date | `YYYY-MM-DD` or `relative` | `updated:<2024-12-01` |
| `due` | date | `YYYY-MM-DD` | `due:2025-12-31` |
| `week` | relative | `current`, `next`, `last`, number | `week:next` |
| `month` | relative | `current`, `next`, `last`, year-month | `month:current` |

## Flags & Booleans

| Key | Type | Usage | Example |
|-----|------|-------|---------|
| `is` | enum | `blocked`, `duplicate`, `blocker`, `breaking`, `hotfix` | `is:blocked` |
| `has` | enum | `label`, `assignee`, `reviewer`, `dependencies` | `has:assignee` |
| `no` | enum | `owner`, `reviewer`, `description` | `no:owner` |

## Raw Text Search

| Pattern | Meaning | Example |
|---------|---------|---------|
| `"quoted phrase"` | Phrase search (matches description/title) | `"high priority"` |
| `word` | Unquoted text search (catch-all) | `error` or `bug` |
| `@mention` | Find issues mentioning user | `@alice` |
| `#id` | Find by issue ID | `#123` |

## Combined Examples

### Single Filters
```
status:active
priority:high
owner:alice
```

### Multiple Filters (AND logic)
```
status:active priority:high owner:alice
stage:in-progress team:backend
type:bug severity:blocker is:blocked
```

### With Metrics
```
status:active score:>80
age:<30 priority:high
effort:>5 team:frontend
```

### With Quoted Phrases
```
"high priority" owner:alice
status:active "user authentication" type:bug
```

### Complex Query
```
status:active priority:high owner:alice score:>75 type:feature "critical path"
```

## Syntax Rules

### Keys
- Format: `word-chars` followed by `:`
- Case-insensitive
- Can contain hyphens and underscores: `created-by:`, `in_progress`

### Values
- **Unquoted**: Single word, alphanumeric + hyphens/underscores
  - Example: `status:active`, `owner:alice_123`
- **Quoted**: Any characters, enclosed in double quotes
  - Example: `owner:"Alice Smith"`, `area:"User Management"`

### Operators
- Numeric comparisons: `>`, `<`, `=`, `!=`, `>=`, `<=`
- Format: `key:>value` or `key:=value`
- Example: `score:>80`, `age:<30`

### Spacing
- Filters are separated by spaces
- Multiple values for same key must be chained: `status:active status:pending` (OR)
- OR within parentheses: `(status:active OR status:pending)` *(future enhancement)*

## Semantic Validation

The CLI parser validates against this schema. Invalid keys or values are treated as raw text search.

**Valid keys** must appear in the Commands Registry (this file).

**Valid enum values** are predefined per key.

**String values** accept any quoted phrase or single word.

**Numeric values** must be valid JavaScript numbers (no units).

## Auto-Complete Strategy

When user types:

1. **`sta`** → Suggest `status:`, `stage:`
2. **`status:`** → Suggest valid values: `active`, `pending`, `completed`, `archived`, `paused`
3. **`owner:`** → Suggest usernames from team roster
4. **`>`** after numeric key → Suggest common comparison operators
5. **`"`** → Hint that quoted phrases are allowed

## Extension Points

### Adding New Commands

To add a new filter key:

1. Add entry to this document in appropriate category
2. Add TypeScript type to [lib/cli-commands.ts](../lib/cli-commands.ts)
3. Update `VALID_COMMANDS` registry
4. Update autocomplete datasource
5. Implement filter logic in `filterData()` function

### Examples

```typescript
// Add new command:
export type ValidCommand = 
  | 'status' | 'stage' | 'priority'
  | 'owner' | 'assignee'
  | 'type' | 'component'
  | 'score' | 'effort'
  | 'created' | 'updated'
  | 'custom-field';  // ← Add here

export const COMMAND_SCHEMA: Record<ValidCommand, CommandSchema> = {
  'custom-field': {
    type: 'enum',
    values: ['option1', 'option2', 'option3'],
    description: 'Custom field values'
  }
}
```

## Neo-Analog Syntax Colors

| Token Type | Color | Hex | Usage |
|-----------|-------|-----|-------|
| **Key** (e.g., `status:`) | Blue-600 | `#2563eb` | Filter field names |
| **Operator** (e.g., `>`, `<`) | Amber-600 | `#d97706` | Comparison operators |
| **Value** (e.g., `active`) | Emerald-600 | `#059669` | Filter values |
| **Error** (e.g., invalid key) | Red-600 | `#dc2626` | Invalid syntax |

---

## Related Files

- [CLI Filter Integration Guide](./CLI_FILTER_INTEGRATION.md)
- [lib/cli-parser.ts](../lib/cli-parser.ts) - Parser implementation
- [lib/cli-commands.ts](../lib/cli-commands.ts) - TypeScript constants
- [prototypes/prototype-cli-filter.html](../prototypes/prototype-cli-filter.html) - Basic demo
- [prototypes/prototype-cli-filter-phantom.html](../prototypes/prototype-cli-filter-phantom.html) - Phantom Input pattern demo
