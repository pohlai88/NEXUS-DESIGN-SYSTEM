/**
 * Generate IDE-friendly JSON API documentation
 * Creates structured JSON files that IDEs can consume for IntelliSense
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');
const headlessMap = JSON.parse(readFileSync(join(distDir, 'headless-map.json'), 'utf-8'));

// Extract classes from headless map
const classes = Object.keys(headlessMap.classes || {}).map(className => {
  const classData = headlessMap.classes[className];
  return {
    name: className,
    description: getClassDescription(className),
    category: getClassCategory(className),
    properties: Object.keys(classData),
    example: getClassExample(className)
  };
});

// API Documentation Structure
const apiDocs = {
  version: '2.0.0',
  generated: new Date().toISOString(),
  designSystem: {
    name: 'Neo-Analog Design System',
    version: '2.0.0',
    description: 'Enterprise-grade design system with 254 tokens, 171 semantic classes'
  },
  typography: {
    headings: [
      { class: 'na-h1', size: '32px', weight: '700', lineHeight: '1.2', usage: 'Page titles (unique H1 per page)' },
      { class: 'na-h2', size: '24px', weight: '600', lineHeight: '1.3', usage: 'Section titles (major page divisions)' },
      { class: 'na-h3', size: '20px', weight: '600', lineHeight: '1.4', usage: 'Subsection titles (within sections)' },
      { class: 'na-h4', size: '18px', weight: '600', lineHeight: '1.4', usage: 'Card titles (inside .na-card)' },
      { class: 'na-h5', size: '16px', weight: '600', lineHeight: '1.5', usage: 'Small titles (minor groupings)' },
      { class: 'na-h6', size: '14px', weight: '600', lineHeight: '1.5', usage: 'Micro titles (tooltips, tiny headers)' }
    ],
    data: [
      { class: 'na-data', size: '14px', weight: '400', font: 'Monospace', usage: 'Primary data values, table cells, user input' },
      { class: 'na-data-large', size: '30px', weight: '500', font: 'Serif', usage: 'KPI values, hero numbers, dashboard stats' },
      { class: 'na-metadata', size: '11px', weight: '500', font: 'Sans', usage: 'Field labels, column headers (uppercase, tracked)' },
      { class: 'na-metadata-small', size: '10px', weight: '400', font: 'Sans', usage: 'Timestamps, IDs, footnotes, secondary info' }
    ]
  },
  components: {
    cards: [
      { class: 'na-card', description: 'Paper background, shadow, filament top border', example: '<div class="na-card na-p-6">Content</div>' },
      { class: 'na-panel', description: 'Muted background, internal separation', example: '<div class="na-panel na-p-4">Panel</div>' }
    ],
    buttons: [
      { class: 'na-btn', description: 'Standard button', example: '<button class="na-btn">Click</button>' },
      { class: 'na-btn-primary', description: 'Primary action button', example: '<button class="na-btn-primary">Submit</button>' },
      { class: 'na-btn-secondary', description: 'Secondary button', example: '<button class="na-btn-secondary">Cancel</button>' }
    ],
    status: [
      { class: 'na-status', description: 'Status indicator base', example: '<div class="na-status ok">Active</div>' },
      { class: 'na-status-ok', description: 'Success status', example: '<div class="na-status ok">Success</div>' },
      { class: 'na-status-pending', description: 'Pending status', example: '<div class="na-status pending">Pending</div>' },
      { class: 'na-status-bad', description: 'Error status', example: '<div class="na-status bad">Error</div>' }
    ]
  },
  layout: {
    shell: [
      { class: 'na-shell', description: 'Sidebar + Main area grid', example: '<div class="na-shell">...</div>' },
      { class: 'na-shell-omni', description: 'Omni shell layout (grid-based)', example: '<div class="na-shell-omni">...</div>' },
      { class: 'na-shell-head', description: 'Shell header', example: '<header class="na-shell-head">Header</header>' },
      { class: 'na-shell-rail', description: 'Shell sidebar', example: '<aside class="na-shell-rail">Sidebar</aside>' },
      { class: 'na-shell-main', description: 'Shell main content area', example: '<main class="na-shell-main">Content</main>' }
    ],
    grid: [
      { class: 'na-grid', description: 'Standard grid with 24px gap', example: '<div class="na-grid gap-6">...</div>' },
      { class: 'na-grid-frozen', description: 'Bi-directional sticky grid (frozen panes)', example: '<div class="na-grid-frozen">...</div>' },
      { class: 'na-table-frozen', description: 'Frozen table (sticky columns/rows)', example: '<table class="na-table-frozen">...</table>' }
    ]
  },
  classes: classes.filter(c => c.category !== 'unknown').slice(0, 100), // Limit for performance
  tokens: {
    colors: {
      base: [
        { token: '--color-void', value: '#09090b', usage: 'Main background (dark)' },
        { token: '--color-paper', value: '#121214', usage: 'Panel background' },
        { token: '--color-paper-2', value: '#18181b', usage: 'Hover state / input' },
        { token: '--color-lux', value: '#f4f4f5', usage: 'Primary text (light)' },
        { token: '--color-lux-dim', value: '#a1a1aa', usage: 'Secondary text' },
        { token: '--color-clay', value: '#71717a', usage: 'Metadata / labels' },
        { token: '--color-gold', value: '#eab308', usage: 'Primary accent' }
      ],
      status: [
        { token: '--color-success', value: '#10b981', usage: 'Success / positive' },
        { token: '--color-warning', value: '#f59e0b', usage: 'Warning / attention' },
        { token: '--color-error', value: '#f43f5e', usage: 'Error / destructive' },
        { token: '--color-info', value: '#3b82f6', usage: 'Info / neutral' }
      ]
    }
  },
  exports: {
    css: '@aibos/design-system/css',
    tokens: '@aibos/design-system/tokens',
    tokensTypescript: '@aibos/design-system/tokens/typescript',
    react: '@aibos/design-system/react',
    types: '@aibos/design-system/types',
    utils: '@aibos/design-system/utils',
    cli: '@aibos/design-system/cli'
  }
};

// Helper functions
function getClassDescription(className) {
  const descriptions = {
    'na-h1': 'Page title (32px bold)',
    'na-h2': 'Section title (24px semibold)',
    'na-h3': 'Subsection title (20px semibold)',
    'na-h4': 'Card title (18px semibold)',
    'na-card': 'Paper background, shadow, filament top border',
    'na-btn': 'Standard button',
    'na-btn-primary': 'Primary action button',
    'na-data': 'Primary data values, table cells',
    'na-data-large': 'KPI values, hero numbers',
    'na-metadata': 'Field labels, column headers',
    'na-shell': 'Sidebar + Main area grid',
    'na-grid': 'Standard grid with 24px gap'
  };
  return descriptions[className] || `AIBOS design system class: ${className}`;
}

function getClassCategory(className) {
  if (className.startsWith('na-h')) return 'typography';
  if (className.startsWith('na-btn')) return 'button';
  if (className.startsWith('na-card') || className.startsWith('na-panel')) return 'component';
  if (className.startsWith('na-status')) return 'status';
  if (className.startsWith('na-shell') || className.startsWith('na-grid')) return 'layout';
  if (className.startsWith('na-data') || className.startsWith('na-metadata')) return 'typography';
  return 'utility';
}

function getClassExample(className) {
  return `<div class="${className}">Content</div>`;
}

// Write API docs (minify in production)
const isProduction = process.env.NODE_ENV === 'production';
writeFileSync(
  join(distDir, 'api-docs.json'),
  isProduction ? JSON.stringify(apiDocs) : JSON.stringify(apiDocs, null, 2),
  'utf-8'
);

console.log('✅ API documentation generated: dist/api-docs.json');
console.log(`   - ${classes.length} classes documented`);
console.log(`   - Typography: ${apiDocs.typography.headings.length + apiDocs.typography.data.length} classes`);
console.log(`   - Components: ${apiDocs.components.cards.length + apiDocs.components.buttons.length + apiDocs.components.status.length} classes`);

