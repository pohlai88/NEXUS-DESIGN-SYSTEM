/**
 * CLI Filter Command Registry
 * 
 * Centralized source of truth for valid filter keys, values, and behavior.
 * Used by parser, autocomplete, and validation systems.
 * 
 * See docs/CLI_FILTER_COMMANDS.md for the full specification.
 */

export type CommandType = 'enum' | 'string' | 'numeric' | 'date' | 'boolean';

export interface CommandSchema {
  type: CommandType;
  description: string;
  values?: string[]; // For enum types
  supportsOperators?: boolean; // For numeric/date types
}

export type ValidCommand =
  // Status & Lifecycle
  | 'status'
  | 'stage'
  | 'priority'
  | 'severity'
  // People & Teams
  | 'owner'
  | 'assignee'
  | 'reviewer'
  | 'created-by'
  | 'team'
  // Classification
  | 'type'
  | 'component'
  | 'area'
  | 'tag'
  // Metrics & Comparisons
  | 'score'
  | 'effort'
  | 'duration'
  | 'age'
  | 'count'
  // Time-Based
  | 'created'
  | 'updated'
  | 'due'
  | 'week'
  | 'month'
  // Flags & Booleans
  | 'is'
  | 'has'
  | 'no';

/**
 * Full command schema registry
 * 
 * Defines the type, valid values, and behavior of each filter key.
 * Update this when adding new filter commands to the system.
 */
export const COMMAND_SCHEMA: Record<ValidCommand, CommandSchema> = {
  // ============== Status & Lifecycle ==============
  status: {
    type: 'enum',
    description: 'Item lifecycle status',
    values: ['active', 'pending', 'completed', 'archived', 'paused'],
  },
  stage: {
    type: 'enum',
    description: 'Workflow stage',
    values: ['backlog', 'todo', 'in-progress', 'in-review', 'done'],
  },
  priority: {
    type: 'enum',
    description: 'Priority level',
    values: ['critical', 'high', 'medium', 'low', 'none'],
  },
  severity: {
    type: 'enum',
    description: 'Issue severity',
    values: ['blocker', 'major', 'minor', 'trivial', 'info'],
  },

  // ============== People & Teams ==============
  owner: {
    type: 'string',
    description: 'Person who owns the item',
  },
  assignee: {
    type: 'string',
    description: 'Person assigned to work on item',
  },
  reviewer: {
    type: 'string',
    description: 'Person reviewing the item',
  },
  'created-by': {
    type: 'string',
    description: 'Person who created the item',
  },
  team: {
    type: 'string',
    description: 'Team responsible for item',
  },

  // ============== Classification ==============
  type: {
    type: 'enum',
    description: 'Item type or category',
    values: ['bug', 'feature', 'enhancement', 'task', 'spike', 'doc', 'refactor'],
  },
  component: {
    type: 'string',
    description: 'Component or module name',
  },
  area: {
    type: 'string',
    description: 'Area of codebase',
  },
  tag: {
    type: 'string',
    description: 'Custom tag or label',
  },

  // ============== Metrics & Comparisons ==============
  score: {
    type: 'numeric',
    description: 'Numeric score (supports comparison operators)',
    supportsOperators: true,
  },
  effort: {
    type: 'numeric',
    description: 'Effort estimate (1-10 scale)',
    supportsOperators: true,
  },
  duration: {
    type: 'numeric',
    description: 'Duration in days/hours',
    supportsOperators: true,
  },
  age: {
    type: 'numeric',
    description: 'Age in days',
    supportsOperators: true,
  },
  count: {
    type: 'numeric',
    description: 'Count of items',
    supportsOperators: true,
  },

  // ============== Time-Based ==============
  created: {
    type: 'date',
    description: 'Creation date (YYYY-MM-DD format)',
    supportsOperators: true,
  },
  updated: {
    type: 'date',
    description: 'Last update date',
    supportsOperators: true,
  },
  due: {
    type: 'date',
    description: 'Due date',
  },
  week: {
    type: 'enum',
    description: 'Week relative to current',
    values: ['current', 'next', 'last'],
  },
  month: {
    type: 'enum',
    description: 'Month relative to current',
    values: ['current', 'next', 'last'],
  },

  // ============== Flags & Booleans ==============
  is: {
    type: 'enum',
    description: 'State flags',
    values: ['blocked', 'duplicate', 'blocker', 'breaking', 'hotfix'],
  },
  has: {
    type: 'enum',
    description: 'Presence check',
    values: ['label', 'assignee', 'reviewer', 'dependencies'],
  },
  no: {
    type: 'enum',
    description: 'Absence check',
    values: ['owner', 'reviewer', 'description'],
  },
};

/**
 * Get all valid command keys for autocomplete
 */
export function getValidCommands(): ValidCommand[] {
  return Object.keys(COMMAND_SCHEMA) as ValidCommand[];
}

/**
 * Check if a key is a valid command
 */
export function isValidCommand(key: string): key is ValidCommand {
  return key in COMMAND_SCHEMA;
}

/**
 * Get the schema for a specific command
 */
export function getCommandSchema(key: string): CommandSchema | null {
  if (!isValidCommand(key)) return null;
  return COMMAND_SCHEMA[key];
}

/**
 * Get valid values for an enum command
 */
export function getCommandValues(key: string): string[] {
  const schema = getCommandSchema(key);
  if (schema?.type === 'enum' && schema.values) {
    return schema.values;
  }
  return [];
}

/**
 * Check if a command supports comparison operators
 */
export function supportsOperators(key: string): boolean {
  const schema = getCommandSchema(key);
  return schema?.supportsOperators ?? false;
}

/**
 * Autocomplete suggestions
 * 
 * Returns matching keys based on partial input
 * Used by autocomplete menu to suggest valid commands
 */
export function autocompleteKeys(prefix: string): ValidCommand[] {
  const lower = prefix.toLowerCase();
  return getValidCommands().filter(key =>
    key.toLowerCase().startsWith(lower)
  );
}

/**
 * Autocomplete values for a given key
 * 
 * For enum commands, returns predefined values.
 * For string commands, should be populated from data source (usernames, components, etc.)
 * For numeric/date commands, returns example syntax.
 */
export function autocompleteValues(key: string, context?: Record<string, any>): string[] {
  const schema = getCommandSchema(key);

  if (!schema) return [];

  // Enum types: return predefined values
  if (schema.type === 'enum' && schema.values) {
    return schema.values;
  }

  // String types: return from context (usernames, components, etc.)
  if (schema.type === 'string') {
    const field = key === 'created-by' ? 'createdBy' : key;
    if (context?.[field]) {
      return Array.isArray(context[field])
        ? context[field]
        : [String(context[field])];
    }
    return [];
  }

  // Numeric types: return operator hints
  if (schema.type === 'numeric') {
    return ['>', '<', '=', '!=', '>=', '<='];
  }

  // Date types: return format hint
  if (schema.type === 'date') {
    return ['YYYY-MM-DD', '>', '<'];
  }

  return [];
}

/**
 * Validation: Check if a value is valid for a command
 * 
 * For enum types, checks against predefined list.
 * For string types, always accepts (open-ended).
 * For numeric types, validates number format.
 * For date types, validates YYYY-MM-DD format.
 */
export function isValidValue(key: string, value: string): boolean {
  const schema = getCommandSchema(key);
  if (!schema) return false;

  switch (schema.type) {
    case 'enum':
      return schema.values?.includes(value) ?? false;

    case 'string':
      // All strings are valid
      return true;

    case 'numeric':
      // Check if value (after stripping operators) is a valid number
      const numMatch = value.match(/[><=!]+(\d+)/);
      return numMatch ? !isNaN(Number(numMatch[1])) : !isNaN(Number(value));

    case 'date':
      // Validate YYYY-MM-DD format
      return /^\d{4}-\d{2}-\d{2}$/.test(value) || /^[><=!]+\d{4}-\d{2}-\d{2}$/.test(value);

    case 'boolean':
      return value === 'true' || value === 'false';

    default:
      return true;
  }
}

/**
 * Get autocomplete suggestions for next word
 * 
 * Analyzes current input and suggests:
 * - Keys if none selected yet
 * - Values if a key is selected
 * - Operators if key supports them
 */
export function getContextualSuggestions(
  input: string,
  position: number,
  context?: Record<string, any>
): { type: 'key' | 'value' | 'operator'; suggestions: string[] } {
  // Simple heuristic: if input ends with ':', suggest values
  if (input.slice(0, position).endsWith(':')) {
    const keyMatch = input.slice(0, position).match(/([a-z-]+):$/);
    if (keyMatch) {
      const key = keyMatch[1];
      return {
        type: supportsOperators(key) ? 'operator' : 'value',
        suggestions: autocompleteValues(key, context),
      };
    }
  }

  // Otherwise suggest keys
  const partialKey = input.slice(0, position).split(/\s+/).pop() || '';
  return {
    type: 'key',
    suggestions: autocompleteKeys(partialKey),
  };
}

/**
 * Export schema for testing/debugging
 */
export function dumpSchema(): object {
  return COMMAND_SCHEMA;
}
