/**
 * Generate IDE-friendly documentation for helper functions and utilities
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');

// Helper functions documentation
const helpersDocs = {
  version: '2.0.0',
  generated: new Date().toISOString(),
  description: 'AIBOS Design System helper functions and utilities',
  utilities: {
    className: [
      {
        name: 'cn',
        description: 'Merges class names with Tailwind conflict resolution',
        signature: 'cn(...inputs: ClassValue[]): string',
        example: "cn('na-status', 'ok', isActive && 'active')",
        returns: 'Merged class string',
        category: 'className'
      },
      {
        name: 'buildAIBOSClass',
        description: 'Type-safe AIBOS class name builder',
        signature: 'buildAIBOSClass(base: string, modifier?: string): string',
        example: "buildAIBOSClass('status', 'ok')",
        returns: 'na-status ok',
        category: 'className'
      }
    ],
    nextui: [
      {
        name: 'withAIBOS',
        description: 'Combines AIBOS classes with NextUI component className',
        signature: 'withAIBOS(...classes: (string | undefined | null | false)[]): string',
        example: "<Card className={withAIBOS('na-card', 'na-p-6', customClass)} />",
        returns: 'Merged class string',
        category: 'integration'
      },
      {
        name: 'withAIBOSClasses',
        description: 'HOC to add AIBOS classes to any component',
        signature: 'withAIBOSClasses<P>(Component: ComponentType<P>, ...aibosClasses: string[]): ComponentType<P>',
        example: "const AIBOSCard = withAIBOSClasses(NextUICard, 'na-card', 'na-p-6');",
        returns: 'Enhanced component',
        category: 'integration'
      },
      {
        name: 'aibosTypography',
        description: 'Typography helper for NextUI components',
        signature: "aibosTypography(variant: 'h1' | 'h2' | 'h4' | 'data' | 'data-large' | 'metadata'): string",
        example: "aibosTypography('h4')",
        returns: 'na-h4',
        category: 'typography'
      },
      {
        name: 'aibosSpacing',
        description: 'Spacing helper for consistent padding/margins',
        signature: 'aibosSpacing(...spacing: string[]): string',
        example: "aibosSpacing('p-6', 'mt-4')",
        returns: 'Merged spacing classes',
        category: 'spacing'
      },
      {
        name: 'typographyClasses',
        description: 'Typography class map for reference',
        signature: 'const typographyClasses: Record<string, string>',
        example: 'typographyClasses.h1',
        returns: 'na-h1',
        category: 'reference'
      }
    ],
    cli: [
      {
        name: 'getValidCommands',
        description: 'Get all valid CLI filter commands',
        signature: 'getValidCommands(): ValidCommand[]',
        example: 'getValidCommands()',
        returns: "Array of valid command keys (e.g., ['status', 'revenue', 'health'])",
        category: 'cli'
      },
      {
        name: 'isValidCommand',
        description: 'Check if a command key is valid',
        signature: 'isValidCommand(key: string): key is ValidCommand',
        example: "isValidCommand('status')",
        returns: 'true if valid, false otherwise',
        category: 'cli'
      },
      {
        name: 'getCommandSchema',
        description: 'Get schema for a command',
        signature: 'getCommandSchema(key: string): CommandSchema | null',
        example: "getCommandSchema('status')",
        returns: 'Command schema object or null',
        category: 'cli'
      },
      {
        name: 'getCommandValues',
        description: 'Get valid values for an enum command',
        signature: 'getCommandValues(key: string): string[]',
        example: "getCommandValues('status')",
        returns: "Array of valid values (e.g., ['healthy', 'watch', 'error'])",
        category: 'cli'
      },
      {
        name: 'supportsOperators',
        description: 'Check if a command supports comparison operators',
        signature: 'supportsOperators(key: string): boolean',
        example: "supportsOperators('revenue')",
        returns: 'true if supports operators (>, <, =, etc.)',
        category: 'cli'
      },
      {
        name: 'autocompleteKeys',
        description: 'Get autocomplete suggestions for command keys',
        signature: 'autocompleteKeys(prefix: string): ValidCommand[]',
        example: "autocompleteKeys('sta')",
        returns: "Array of matching commands (e.g., ['status', 'stage'])",
        category: 'cli'
      },
      {
        name: 'isValidValue',
        description: 'Validate if a value is valid for a command',
        signature: 'isValidValue(key: string, value: string): boolean',
        example: "isValidValue('status', 'healthy')",
        returns: 'true if value is valid for the command',
        category: 'cli'
      }
    ]
  },
  exports: {
    utils: '@aibos/design-system/utils',
    react: '@aibos/design-system/react',
    cli: '@aibos/design-system/cli'
  }
};

// Write helpers documentation (minify in production)
const isProduction = process.env.NODE_ENV === 'production';
writeFileSync(
  join(distDir, 'helpers-docs.json'),
  isProduction ? JSON.stringify(helpersDocs) : JSON.stringify(helpersDocs, null, 2),
  'utf-8'
);

console.log('✅ Helpers documentation generated: dist/helpers-docs.json');
console.log(`   - ${helpersDocs.utilities.className.length} className utilities`);
console.log(`   - ${helpersDocs.utilities.nextui.length} NextUI helpers`);
console.log(`   - ${helpersDocs.utilities.cli.length} CLI utilities`);

