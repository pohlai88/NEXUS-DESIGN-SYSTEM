/**
 * CLI Autocomplete Engine
 * 
 * Context-aware suggestion engine that understands whether the user is:
 * - Typing a Command Key (e.g., "sta" -> "status:")
 * - Choosing a Value (e.g., "status:ac" -> "active ")
 * - Entering an Operator (e.g., "score:>" or "score:<")
 * 
 * See docs/CLI_FILTER_COMMANDS.md for the complete command specification.
 */

import { COMMAND_SCHEMA, type ValidCommand } from './cli-commands';

export interface Suggestion {
  label: string;
  type: 'key' | 'value' | 'operator';
  insertText: string;
  description?: string;
}

export interface ContextInfo {
  word: string;
  isKey: boolean;
  keyContext: ValidCommand | null;
  colonIndex: number;
}

/**
 * AutocompleteEngine
 * 
 * Analyzes cursor position and input text to generate context-aware suggestions.
 * The "Policeman" enforces valid commands and values.
 */
export class AutocompleteEngine {
  /**
   * Get suggestions based on current input and cursor position
   * 
   * @param fullText - Complete input text
   * @param cursorIndex - Current cursor position (0-based)
   * @returns Array of suggestions to display
   */
  getSuggestions(fullText: string, cursorIndex: number): Suggestion[] {
    const context = this.parseContext(fullText, cursorIndex);

    if (context.isKey) {
      // MODE A: Suggesting Keys
      return this.getSuggestionsForKeys(context.word);
    } else if (context.keyContext) {
      // MODE B: Suggesting Values or Operators
      return this.getSuggestionsForValues(context.keyContext, context.word);
    }

    return [];
  }

  /**
   * Get suggestions for command keys
   * 
   * When user types "sta", suggest "status:", "stage:"
   */
  private getSuggestionsForKeys(prefix: string): Suggestion[] {
    const validKeys = Object.keys(COMMAND_SCHEMA) as ValidCommand[];
    const lower = prefix.toLowerCase();

    return validKeys
      .filter(key => key.toLowerCase().startsWith(lower))
      .map((key): Suggestion => {
        const schema = COMMAND_SCHEMA[key];
        return {
          label: key,
          type: 'key' as const,
          insertText: key + ':', // Auto-append colon
          description: schema.description,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  /**
   * Get suggestions for values or operators
   * 
   * When user types "status:ac", suggest "active "
   * When user types "score:>", suggest "1", "100", etc.
   */
  private getSuggestionsForValues(
    key: ValidCommand,
    prefix: string
  ): Suggestion[] {
    const schema = COMMAND_SCHEMA[key];
    if (!schema) return [];

    // For ENUM types: Suggest matching values
    if (schema.type === 'enum' && schema.values) {
      const lower = prefix.toLowerCase();
      return schema.values
        .filter(val => val.toLowerCase().startsWith(lower))
        .map(val => ({
          label: val,
          type: 'value',
          insertText: val + ' ', // Auto-append space for next command
          description: `${key}: ${val}`,
        }));
    }

    // For NUMERIC types: Suggest operators first
    if (schema.type === 'numeric' && schema.supportsOperators) {
      const operators = ['>', '<', '=', '!=', '>=', '<='];
      const lower = prefix.toLowerCase();

      // If prefix is empty or starts with operator, suggest operators
      if (!prefix || operators.some(op => op.startsWith(lower))) {
        return operators
          .filter(op => op.startsWith(lower))
          .map(op => ({
            label: `Operator: ${op}`,
            type: 'operator',
            insertText: op,
            description: `${key}: ${op} [value]`,
          }));
      }

      // If already has operator, suggest example values
      return [
        { label: '0', type: 'value', insertText: '0 ', description: 'Number value' },
        { label: '10', type: 'value', insertText: '10 ', description: 'Number value' },
        { label: '100', type: 'value', insertText: '100 ', description: 'Number value' },
      ];
    }

    // For DATE types: Similar to numeric
    if (schema.type === 'date' && schema.supportsOperators) {
      const operators = ['>', '<', '='];
      const lower = prefix.toLowerCase();

      if (!prefix || operators.some(op => op.startsWith(lower))) {
        return operators
          .filter(op => op.startsWith(lower))
          .map(op => ({
            label: `Operator: ${op}`,
            type: 'operator',
            insertText: op,
            description: `${key}: ${op} YYYY-MM-DD`,
          }));
      }

      // Suggest date format
      const today = new Date();
      const isoToday = today.toISOString().split('T')[0];
      return [
        {
          label: isoToday,
          type: 'value',
          insertText: isoToday + ' ',
          description: 'Today',
        },
      ];
    }

    // For STRING types: No enum, accept any value
    // Return empty to avoid spam, user can type freely
    return [];
  }

  /**
   * Parse context from full text and cursor position
   * 
   * Determines:
   * - Are we typing a Key or Value?
   * - What's the current word?
   * - If Value, which Key is it for?
   */
  parseContext(fullText: string, cursorIndex: number): ContextInfo {
    // Get text up to cursor
    const leftText = fullText.slice(0, cursorIndex);

    // Find the start of the current token (after the last space)
    const lastSpaceIndex = leftText.lastIndexOf(' ');
    const currentToken = leftText.slice(lastSpaceIndex + 1);

    // Check if token contains a colon
    const colonIndex = currentToken.indexOf(':');

    if (colonIndex === -1) {
      // No colon found: we're typing a KEY
      return {
        word: currentToken,
        isKey: true,
        keyContext: null,
        colonIndex: -1,
      };
    } else {
      // Colon found: we're typing a VALUE
      const key = currentToken.slice(0, colonIndex);
      const valuePart = currentToken.slice(colonIndex + 1);

      return {
        word: valuePart,
        isKey: false,
        keyContext: key as ValidCommand, // Assume it's valid; schema will filter
        colonIndex,
      };
    }
  }

  /**
   * Get the text to insert and the resulting cursor position
   * 
   * This handles inserting the suggestion and positioning the cursor
   * for the next edit.
   */
  getInsertionInfo(
    fullText: string,
    cursorIndex: number,
    insertText: string
  ): { newText: string; newCursorPos: number } {
    // Find the start of the current token
    const leftText = fullText.slice(0, cursorIndex);
    const lastSpaceIndex = leftText.lastIndexOf(' ');
    const tokenStart = lastSpaceIndex + 1;

    // Build new text by replacing current token with insertText
    const newText =
      fullText.slice(0, tokenStart) +
      insertText +
      fullText.slice(cursorIndex);

    const newCursorPos = tokenStart + insertText.length;

    return { newText, newCursorPos };
  }
}
