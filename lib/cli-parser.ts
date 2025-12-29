/**
 * NEO-ANALOG CLI PARSER
 * 
 * Tokenizes user input for data table filters with governance rules.
 * Syntax: `key:value >operator <number status:active`
 * 
 * Example:
 * - `status:active` → key="status", value="active"
 * - `>100` → operator=">", value="100"
 * - `error` → raw value="error"
 */

export interface FilterToken {
  type: 'key' | 'operator' | 'value' | 'raw';
  text: string;
  start: number;
  end: number;
}

export interface ParsedFilter {
  tokens: FilterToken[];
  hasKey: boolean;
  hasOperator: boolean;
  raw: string;
}

/**
 * Parse search input into semantic tokens
 * Supports: `key:value`, `><=`, `"quoted values"`, and raw words
 */
export function parseSearchInput(input: string): FilterToken[] {
  const tokens: FilterToken[] = [];
  
  // Regex pattern:
  // - ([a-zA-Z0-9_-]+:) = key with colon (e.g., "status:")
  // - ([><=!]+) = operators (e.g., ">", "<=", "!=")
  // - (".*?"|[^"\s]+) = quoted strings or unquoted words
  // - (\s+) = whitespace (ignored)
  const regex = /([a-zA-Z0-9_-]+:)|([><=!]+)|(".*?"|[^"\s]+)|(\s+)/g;
  
  let match;
  while ((match = regex.exec(input)) !== null) {
    const [fullMatch, key, operator, value, whitespace] = match;
    const start = match.index;
    const end = start + fullMatch.length;

    if (whitespace) continue; // Skip pure whitespace

    if (key) {
      tokens.push({ type: 'key', text: key, start, end });
    } else if (operator) {
      tokens.push({ type: 'operator', text: operator, start, end });
    } else if (value) {
      // Remove quotes if present
      const cleanValue = value.startsWith('"') && value.endsWith('"')
        ? value.slice(1, -1)
        : value;
      tokens.push({ type: 'value', text: cleanValue, start, end });
    } else {
      tokens.push({ type: 'raw', text: fullMatch, start, end });
    }
  }

  return tokens;
}

/**
 * Advanced parser that returns structured filter object
 */
export function parseFilter(input: string): ParsedFilter {
  const tokens = parseSearchInput(input);
  const hasKey = tokens.some(t => t.type === 'key');
  const hasOperator = tokens.some(t => t.type === 'operator');

  return {
    tokens,
    hasKey,
    hasOperator,
    raw: input,
  };
}

/**
 * Generate HTML with syntax highlighting for display
 * Uses Neo-Analog color scheme:
 * - Keys (blue) = Data field names
 * - Operators (amber) = Comparison symbols
 * - Values (emerald) = Data values
 * - Raw (gray) = Unrecognized tokens
 */
export function highlightCommand(input: string, colorScheme: 'neo-analog' | 'monochrome' = 'neo-analog'): string {
  const tokens = parseSearchInput(input);
  let html = '';

  const colors = {
    'neo-analog': {
      key: 'text-blue-600 font-semibold',      // Keywords
      operator: 'text-amber-600 font-bold',    // Operators
      value: 'text-emerald-700',                // Values
      raw: 'text-gray-600',                     // Unrecognized
    },
    'monochrome': {
      key: 'text-gray-900 font-semibold',
      operator: 'text-gray-900 font-bold',
      value: 'text-gray-900',
      raw: 'text-gray-600 italic',
    },
  };

  const palette = colors[colorScheme];

  tokens.forEach(t => {
    const colorClass = palette[t.type];
    html += `<span class="${colorClass}">${escapeHtml(t.text)}</span> `;
  });

  return html.trim();
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

/**
 * Extract semantic key-value pairs from parsed tokens
 * Example: "status:active" → { status: "active" }
 */
export function extractKeyValues(tokens: FilterToken[]): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === 'key') {
      const key = token.text.slice(0, -1); // Remove trailing ':'
      const nextToken = tokens[i + 1];
      const value = nextToken?.type === 'value' ? nextToken.text : '';
      
      if (!result[key]) result[key] = [];
      if (value) result[key].push(value);
    }
  }

  return result;
}

/**
 * Filter array of objects based on parsed CLI input
 * @param data Array of objects to filter
 * @param input CLI-style filter string
 * @param keyMapping Map semantic keys to object properties
 */
export function filterData<T extends Record<string, any>>(
  data: T[],
  input: string,
  keyMapping?: Record<string, string>
): T[] {
  const parsed = parseFilter(input);
  const keyValues = extractKeyValues(parsed.tokens);

  // If no structured keys, do simple text search
  if (!parsed.hasKey) {
    const searchTerms = parsed.tokens
      .filter(t => t.type === 'value' || t.type === 'raw')
      .map(t => t.text.toLowerCase());

    return data.filter(item =>
      Object.values(item).some(val =>
        searchTerms.some(term =>
          String(val).toLowerCase().includes(term)
        )
      )
    );
  }

  // Filter by key-value pairs
  return data.filter(item => {
    for (const [key, values] of Object.entries(keyValues)) {
      const propKey = keyMapping?.[key] ?? key;
      const itemValue = String(item[propKey] ?? '').toLowerCase();

      if (!values.some(v => itemValue.includes(v.toLowerCase()))) {
        return false;
      }
    }
    return true;
  });
}
