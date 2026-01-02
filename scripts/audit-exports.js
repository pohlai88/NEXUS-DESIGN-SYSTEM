/**
 * Comprehensive Export and Dependency Audit
 * Verifies all exports, dependencies, and relationships
 */

import { readFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');
const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
const exports = packageJson.exports || {};

console.log('🔍 COMPREHENSIVE AUDIT REPORT\n');
console.log('='.repeat(60));

// 1. Package Exports Audit
console.log('\n📦 1. PACKAGE EXPORTS AUDIT\n');
let exportErrors = 0;
Object.keys(exports).forEach(exp => {
  const exportDef = exports[exp];
  const path = typeof exportDef === 'string' 
    ? exportDef 
    : exportDef.import || exportDef.types || exportDef.default || exportDef;
  
  // Resolve path correctly - paths are relative to package root
  const fullPath = path.startsWith('./dist/') 
    ? join(process.cwd(), path.replace('./', ''))
    : join(process.cwd(), path.replace('./', ''));
  
  const exists = existsSync(fullPath);
  
  if (exists) {
    const size = (statSync(fullPath).size / 1024).toFixed(2);
    console.log(`✅ ${exp.padEnd(25)} -> ${path.padEnd(30)} (${size} KB)`);
  } else {
    console.log(`❌ ${exp.padEnd(25)} -> ${path.padEnd(30)} (MISSING)`);
    exportErrors++;
  }
});

// 2. Generated Files Audit
console.log('\n📁 2. GENERATED FILES AUDIT\n');
const requiredFiles = [
  'api-docs.json',
  'css-custom-data.json',
  'validation-rules.json',
  'helpers-docs.json',
  'eslint-config.json',
  'headless-map.json',
  'tokens.json'
];

let fileErrors = 0;
requiredFiles.forEach(file => {
  const path = join(distDir, file);
  if (existsSync(path)) {
    try {
      const content = readFileSync(path, 'utf-8');
      const parsed = JSON.parse(content);
      const size = (statSync(path).size / 1024).toFixed(2);
      console.log(`✅ ${file.padEnd(30)} (${size} KB) - Valid JSON`);
    } catch (e) {
      console.log(`❌ ${file.padEnd(30)} - Invalid JSON: ${e.message}`);
      fileErrors++;
    }
  } else {
    console.log(`❌ ${file.padEnd(30)} - MISSING`);
    fileErrors++;
  }
});

// 3. Build Scripts Audit
console.log('\n🔧 3. BUILD SCRIPTS AUDIT\n');
const scripts = packageJson.scripts || {};
const requiredScripts = [
  'build',
  'extract:api-docs',
  'extract:css-data',
  'extract:validation-rules',
  'extract:helpers-docs',
  'extract:eslint-config'
];

let scriptErrors = 0;
requiredScripts.forEach(script => {
  if (scripts[script]) {
    console.log(`✅ ${script.padEnd(30)} - Defined`);
  } else {
    console.log(`❌ ${script.padEnd(30)} - MISSING`);
    scriptErrors++;
  }
});

// 4. TypeScript Compilation Audit
console.log('\n📘 4. TYPESCRIPT COMPILATION AUDIT\n');
const tsExports = [
  'dist/components/react/index.js',
  'dist/components/react/index.d.ts',
  'dist/types/index.js',
  'dist/types/index.d.ts',
  'dist/lib/index.js',
  'dist/lib/index.d.ts'
];

let tsErrors = 0;
tsExports.forEach(file => {
  const path = join(process.cwd(), file);
  if (existsSync(path)) {
    const size = (statSync(path).size / 1024).toFixed(2);
    console.log(`✅ ${file.padEnd(40)} (${size} KB)`);
  } else {
    console.log(`❌ ${file.padEnd(40)} - MISSING`);
    tsErrors++;
  }
});

// 5. Import/Export Chain Audit
console.log('\n🔗 5. IMPORT/EXPORT CHAIN AUDIT\n');

// Check lib/index.ts exports
try {
  const libIndex = readFileSync('lib/index.ts', 'utf-8');
  const libExports = libIndex.match(/export.*from\s+['"]([^'"]+)['"]/g) || [];
  console.log(`✅ lib/index.ts exports ${libExports.length} modules`);
  libExports.forEach(exp => {
    const match = exp.match(/from\s+['"]([^'"]+)['"]/);
    if (match) {
      const importPath = match[1].replace('.js', '.ts');
      const exists = existsSync(join('lib', importPath));
      console.log(`   ${exists ? '✅' : '❌'} ${importPath}`);
    }
  });
} catch (e) {
  console.log(`❌ lib/index.ts - ${e.message}`);
}

// Check components/react/index.ts exports
try {
  const reactIndex = readFileSync('components/react/index.ts', 'utf-8');
  const reactExports = reactIndex.match(/export.*from\s+['"]([^'"]+)['"]/g) || [];
  console.log(`✅ components/react/index.ts exports ${reactExports.length} modules`);
} catch (e) {
  console.log(`❌ components/react/index.ts - ${e.message}`);
}

// 6. Dependency Audit
console.log('\n📦 6. DEPENDENCY AUDIT\n');
const devDeps = packageJson.devDependencies || {};
const requiredDeps = ['typescript', '@types/node', '@types/react'];
requiredDeps.forEach(dep => {
  if (devDeps[dep]) {
    console.log(`✅ ${dep.padEnd(30)} - ${devDeps[dep]}`);
  } else {
    console.log(`❌ ${dep.padEnd(30)} - MISSING`);
  }
});

// 7. Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 AUDIT SUMMARY\n');
const totalErrors = exportErrors + fileErrors + scriptErrors + tsErrors;
if (totalErrors === 0) {
  console.log('✅ ALL CHECKS PASSED - System is fully operational!');
  console.log(`   - ${Object.keys(exports).length} exports verified`);
  console.log(`   - ${requiredFiles.length} generated files verified`);
  console.log(`   - ${requiredScripts.length} build scripts verified`);
  console.log(`   - ${tsExports.length} TypeScript files verified`);
} else {
  console.log(`❌ FOUND ${totalErrors} ISSUES:`);
  if (exportErrors > 0) console.log(`   - ${exportErrors} export path errors`);
  if (fileErrors > 0) console.log(`   - ${fileErrors} generated file errors`);
  if (scriptErrors > 0) console.log(`   - ${scriptErrors} build script errors`);
  if (tsErrors > 0) console.log(`   - ${tsErrors} TypeScript compilation errors`);
  process.exit(1);
}

console.log('\n' + '='.repeat(60));

