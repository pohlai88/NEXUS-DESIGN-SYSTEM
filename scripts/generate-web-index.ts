/**
 * Generate index.ts for Web Components
 */

import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const componentsDir = join(process.cwd(), 'dist/adapters/vanilla');
const componentFiles = readdirSync(componentsDir)
  .filter(f => f.endsWith('.js') && f !== 'index.ts')
  .sort();

const exports: string[] = [];

for (const file of componentFiles) {
  const componentName = file.replace('.js', '');
  // Convert kebab-case to PascalCase
  const className = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  exports.push(`export { ${className} } from './${componentName}';`);
}

const indexContent = exports.join('\n') + '\n';

writeFileSync(join(componentsDir, 'index.ts'), indexContent, 'utf-8');
console.log(`✅ Generated index.ts with ${exports.length} exports`);

