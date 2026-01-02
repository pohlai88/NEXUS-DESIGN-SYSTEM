/**
 * Generate IDE-friendly ESLint plugin configuration
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');

// ESLint plugin configuration
const eslintConfig = {
  version: '2.0.0',
  generated: new Date().toISOString(),
  description: 'AIBOS Design System ESLint plugin configuration',
  plugin: {
    name: 'eslint-plugin-neo-analog',
    version: '1.0.0',
    rules: [
      {
        name: 'no-arbitrary-values',
        description: 'Disallow arbitrary Tailwind values in favor of semantic classes',
        category: 'Best Practices',
        recommended: true,
        fixable: false,
        patterns: [
          {
            regex: 'text-[\\d+px]',
            message: 'Use semantic typography classes (.na-h*, .na-data) instead of arbitrary font sizes'
          },
          {
            regex: 'p-[\\d+px]',
            message: 'Use standard spacing tokens (p-4, p-6) instead of arbitrary padding'
          },
          {
            regex: 'm-[\\d+px]',
            message: 'Use standard spacing tokens (m-4, m-6) instead of arbitrary margin'
          },
          {
            regex: 'bg-[#.*?]',
            message: 'Use semantic color classes (bg-paper, bg-void) instead of hardcoded hex colors'
          },
          {
            regex: 'text-[#.*?]',
            message: 'Use semantic color classes (text-lux, text-clay) instead of hardcoded hex colors'
          },
          {
            regex: 'rounded-[\\d+px]',
            message: 'Use semantic radius classes (rounded-card, rounded-panel) instead of arbitrary border-radius'
          }
        ]
      },
      {
        name: 'prefer-semantic-classes',
        description: 'Suggest semantic classes for common patterns',
        category: 'Best Practices',
        recommended: true,
        fixable: false,
        suggestions: [
          {
            pattern: 'text-(xl|2xl|3xl)\\s+font-(bold|semibold)',
            suggest: 'na-h1, na-h2, or na-h3'
          },
          {
            pattern: 'text-(sm|base)\\s+font-mono',
            suggest: 'na-data'
          },
          {
            pattern: 'bg-(gray|zinc)-(900|950)',
            suggest: 'na-card or na-panel'
          }
        ]
      }
    ]
  },
  usage: {
    install: 'npm install --save-dev eslint-plugin-neo-analog',
    config: {
      extends: ['plugin:neo-analog/recommended'],
      rules: {
        'neo-analog/no-arbitrary-values': 'error',
        'neo-analog/prefer-semantic-classes': 'warn'
      }
    }
  }
};

// Write ESLint config (minify in production)
const isProduction = process.env.NODE_ENV === 'production';
writeFileSync(
  join(distDir, 'eslint-config.json'),
  isProduction ? JSON.stringify(eslintConfig) : JSON.stringify(eslintConfig, null, 2),
  'utf-8'
);

console.log('✅ ESLint configuration generated: dist/eslint-config.json');
console.log(`   - ${eslintConfig.plugin.rules.length} ESLint rules`);
console.log(`   - ${eslintConfig.plugin.rules[0].patterns.length} forbidden patterns`);

