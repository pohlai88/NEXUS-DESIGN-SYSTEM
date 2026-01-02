/**
 * AIBOS Design System - CLI Filter System
 * 
 * Complete CLI filter system for data table filtering with autocomplete,
 * syntax highlighting, and governance rules.
 */

// Parser exports (FilterToken from parser)
export {
  parseSearchInput,
  parseFilter,
  highlightCommand,
  filterData,
  type FilterToken as ParserFilterToken,
  type ParsedFilter
} from './cli-parser.js';

// Commands exports
export {
  COMMAND_SCHEMA,
  type ValidCommand,
  type CommandSchema,
  type CommandType
} from './cli-commands.js';

// Autocomplete exports
export {
  AutocompleteEngine,
  type Suggestion,
  type ContextInfo
} from './cli-autocomplete.js';

// Filter engine exports (FilterToken from engine)
export {
  FilterEngine,
  type FilterToken as EngineFilterToken,
  type FilterContext,
  type AggregateMetrics
} from './cli-filter-engine.js';

// Utils exports
export * from './utils.js';

