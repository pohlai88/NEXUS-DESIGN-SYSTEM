/**
 * Generate IDE-friendly validation rules JSON
 * Extracts drift detection rules for IDE integration
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');

// Extract validation rules from enforce-semantics.cjs
const validationRules = {
  version: '2.0.0',
  generated: new Date().toISOString(),
  description: 'AIBOS Design System validation rules for drift prevention',
  rules: [
    {
      id: 'no-arbitrary-font-size',
      pattern: 'text-[\\d+px]',
      message: 'Hardcoded font size detected. Use .na-h* or .na-data classes.',
      fix: 'Replace with semantic typography class (e.g., .na-h1, .na-h2, .na-data)',
      severity: 'error',
      category: 'typography'
    },
    {
      id: 'no-arbitrary-padding',
      pattern: 'p-[\\d+px]',
      message: 'Arbitrary padding detected. Use standard spacing tokens (p-4, p-6).',
      fix: 'Replace with standard spacing (e.g., p-4, p-6, p-8)',
      severity: 'error',
      category: 'spacing'
    },
    {
      id: 'no-arbitrary-margin',
      pattern: 'm-[\\d+px]',
      message: 'Arbitrary margin detected. Use standard spacing tokens (m-4, m-6).',
      fix: 'Replace with standard spacing (e.g., m-4, m-6, m-8)',
      severity: 'error',
      category: 'spacing'
    },
    {
      id: 'no-hardcoded-hex-bg',
      pattern: 'bg-[#.*?]',
      message: 'Hardcoded hex background. Use semantic bg-* classes.',
      fix: 'Replace with semantic color class (e.g., bg-paper, bg-void)',
      severity: 'error',
      category: 'color'
    },
    {
      id: 'no-hardcoded-hex-text',
      pattern: 'text-[#.*?]',
      message: 'Hardcoded hex text color. Use semantic text-* classes.',
      fix: 'Replace with semantic color class (e.g., text-lux, text-clay)',
      severity: 'error',
      category: 'color'
    },
    {
      id: 'no-arbitrary-radius',
      pattern: 'rounded-[\\d+px]',
      message: 'Hardcoded radius. Use .rounded-card, .rounded-panel.',
      fix: 'Replace with semantic radius class (e.g., rounded-card, rounded-panel)',
      severity: 'error',
      category: 'border'
    },
    {
      id: 'no-direct-font-family',
      pattern: 'font-family:\\s*(?!var\\(--font-)',
      message: 'Direct font-family usage. Use var(--font-*) tokens or semantic classes.',
      fix: 'Use CSS variable: var(--font-sans) or semantic class',
      severity: 'warning',
      category: 'typography'
    }
  ],
  suggestions: [
    {
      pattern: 'text-(xl|2xl|3xl)\\s+font-(bold|semibold)',
      suggest: 'na-h1, na-h2, or na-h3',
      category: 'typography'
    },
    {
      pattern: 'text-(sm|base)\\s+font-mono',
      suggest: 'na-data',
      category: 'typography'
    },
    {
      pattern: 'bg-(gray|zinc)-(900|950)',
      suggest: 'na-card or na-panel',
      category: 'component'
    }
  ],
  semanticClasses: {
    typography: [
      'na-h1', 'na-h2', 'na-h3', 'na-h4', 'na-h5', 'na-h6',
      'na-data', 'na-data-large', 'na-metadata', 'na-metadata-small'
    ],
    components: [
      'na-card', 'na-panel', 'na-btn', 'na-btn-primary', 'na-btn-secondary',
      'na-status', 'na-input', 'na-label', 'na-field'
    ],
    layout: [
      'na-shell', 'na-shell-omni', 'na-shell-head', 'na-shell-rail', 'na-shell-main',
      'na-grid', 'na-grid-frozen', 'na-table-frozen'
    ],
    colors: [
      'bg-void', 'bg-paper', 'bg-paper-2', 'text-lux', 'text-lux-dim', 'text-clay',
      'bg-success', 'bg-warning', 'bg-error', 'bg-info'
    ]
  }
};

// Write validation rules (minify in production)
const isProduction = process.env.NODE_ENV === 'production';
writeFileSync(
  join(distDir, 'validation-rules.json'),
  isProduction ? JSON.stringify(validationRules) : JSON.stringify(validationRules, null, 2),
  'utf-8'
);

console.log('✅ Validation rules generated: dist/validation-rules.json');
console.log(`   - ${validationRules.rules.length} validation rules`);
console.log(`   - ${validationRules.suggestions.length} suggestions`);
console.log(`   - ${Object.keys(validationRules.semanticClasses).length} semantic class categories`);

