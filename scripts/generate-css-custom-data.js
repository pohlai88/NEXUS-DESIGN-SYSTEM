/**
 * Generate VS Code CSS Custom Data for IntelliSense
 * This enables autocomplete for .na-* classes in VS Code
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');
const headlessMap = JSON.parse(readFileSync(join(distDir, 'headless-map.json'), 'utf-8'));

// VS Code CSS Custom Data format
const cssCustomData = {
  version: '2.0.0',
  atDirectives: [],
  pseudoClasses: [],
  pseudoElements: [],
  properties: [],
  // Custom classes for AIBOS design system
  classes: Object.keys(headlessMap.classes || {}).map(className => {
    const classData = headlessMap.classes[className];
    return {
      name: className,
      description: getClassDescription(className),
      references: [
        {
          name: 'AIBOS Design System',
          url: 'https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM'
        }
      ]
    };
  }).slice(0, 200) // Limit for performance
};

// Helper function
function getClassDescription(className) {
  const descriptions = {
    'na-h1': 'Page title - 32px bold (unique H1 per page)',
    'na-h2': 'Section title - 24px semibold (major page divisions)',
    'na-h3': 'Subsection title - 20px semibold (within sections)',
    'na-h4': 'Card title - 18px semibold (inside .na-card)',
    'na-h5': 'Small title - 16px semibold (minor groupings)',
    'na-h6': 'Micro title - 14px semibold (tooltips, tiny headers)',
    'na-data': 'Primary data - 14px monospace (table cells, user input)',
    'na-data-large': 'KPI data - 30px serif (hero numbers, dashboard stats)',
    'na-metadata': 'Metadata - 11px uppercase (field labels, column headers)',
    'na-metadata-small': 'Small metadata - 10px (timestamps, IDs, footnotes)',
    'na-card': 'Card component - Paper background, shadow, filament top border',
    'na-panel': 'Panel component - Muted background, internal separation',
    'na-btn': 'Standard button',
    'na-btn-primary': 'Primary action button',
    'na-btn-secondary': 'Secondary button',
    'na-status': 'Status indicator base',
    'na-status-ok': 'Success status indicator',
    'na-status-pending': 'Pending status indicator',
    'na-status-bad': 'Error status indicator',
    'na-shell': 'Shell layout - Sidebar + Main area grid',
    'na-shell-omni': 'Omni shell layout - Grid-based',
    'na-shell-head': 'Shell header',
    'na-shell-rail': 'Shell sidebar',
    'na-shell-main': 'Shell main content area',
    'na-grid': 'Standard grid with 24px gap',
    'na-grid-frozen': 'Bi-directional sticky grid (frozen panes)',
    'na-table-frozen': 'Frozen table (sticky columns/rows)'
  };
  
  return descriptions[className] || `AIBOS design system class: ${className}`;
}

// Write CSS custom data (minify in production)
const isProduction = process.env.NODE_ENV === 'production';
writeFileSync(
  join(distDir, 'css-custom-data.json'),
  isProduction ? JSON.stringify(cssCustomData) : JSON.stringify(cssCustomData, null, 2),
  'utf-8'
);

console.log('✅ CSS Custom Data generated: dist/css-custom-data.json');
console.log(`   - ${cssCustomData.classes.length} classes for VS Code IntelliSense`);

