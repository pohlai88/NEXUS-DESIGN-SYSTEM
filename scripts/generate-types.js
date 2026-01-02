/**
 * Generate TypeScript Declaration Files
 * 
 * Generates .d.ts files for generated React components
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const adaptersDir = join(process.cwd(), 'dist', 'adapters', 'react');
const outputDir = adaptersDir;

if (!existsSync(adaptersDir)) {
  console.error('❌ React adapters directory not found. Run: pnpm generate:adapter');
  process.exit(1);
}

const componentFiles = readdirSync(adaptersDir).filter(f => f.endsWith('.tsx'));

let generated = 0;

for (const file of componentFiles) {
  const componentName = file.replace('.tsx', '');
  const filePath = join(adaptersDir, file);
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Extract exports from the file
    const exports = [];
    const exportRegex = /export\s+(?:interface|function|type|const)\s+(\w+)/g;
    let match;
    
    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }
    
    // Generate declaration file content
    // For now, we'll just create a simple re-export declaration
    // In a real scenario, we'd parse the TypeScript and generate proper declarations
    const dtsContent = `// Auto-generated declaration file for ${componentName}
// Source: ${file}

export * from './${componentName}';
`;

    const dtsPath = join(outputDir, `${componentName}.d.ts`);
    writeFileSync(dtsPath, dtsContent, 'utf-8');
    
    generated++;
  } catch (error) {
    console.error(`❌ Error generating types for ${componentName}:`, error.message);
  }
}

// Generate index.d.ts
const indexDtsContent = `// Auto-generated index declaration file
// Generated: ${new Date().toISOString()}

${componentFiles.map(f => {
  const name = f.replace('.tsx', '');
  return `export * from './${name}';`;
}).join('\n')}
`;

const indexDtsPath = join(outputDir, 'index.d.ts');
writeFileSync(indexDtsPath, indexDtsContent, 'utf-8');

console.log(`✅ Generated ${generated} declaration file(s)`);
console.log(`   - Output: ${outputDir}`);

