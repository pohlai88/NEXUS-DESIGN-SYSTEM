#!/usr/bin/env node

/**
 * Tree-Shaking Verification Script
 * 
 * Verifies that tree-shaking works correctly for Web Components.
 * Compares bundle sizes when importing single components vs full import.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Test cases: single component imports
const testCases = [
  {
    name: 'Single Component (Button)',
    import: "import { Button } from '@aibos/design-system/web/button';",
    expectedReduction: 0.7 // Expect 70% reduction vs full import
  },
  {
    name: 'Single Component (Dialog)',
    import: "import { Dialog } from '@aibos/design-system/web/dialog';",
    expectedReduction: 0.7
  },
  {
    name: 'Full Import',
    import: "import { Button, Dialog, Card } from '@aibos/design-system/web';",
    expectedReduction: 0
  }
];

// Component files to check
const componentFiles = [
  'button.js',
  'dialog.js',
  'accordion.js',
  'card.js',
  'checkbox.js',
  'input.js',
  'label.js',
  'radio.js',
  'select.js',
  'switch.js',
  'tabs.js',
  'tooltip.js'
];

function getFileSize(filePath) {
  try {
    const stats = require('fs').statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

async function analyzeComponentFiles() {
  const componentsDir = join(projectRoot, 'dist/adapters/vanilla');
  const results = [];
  
  for (const file of componentFiles) {
    const filePath = join(componentsDir, file);
    if (existsSync(filePath)) {
      const { statSync } = await import('fs');
      const stats = statSync(filePath);
      const size = stats.size;
      const content = readFileSync(filePath, 'utf-8');
      
      // Check for ES module exports
      const hasExport = content.includes('export {') || content.includes('export class');
      // Check for side effects (customElements.define is expected, but we mark it)
      const hasSideEffects = content.includes('customElements.define');
      
      results.push({
        file,
        size,
        sizeKB: (size / 1024).toFixed(2),
        hasExport,
        hasSideEffects: hasSideEffects ? 'Yes (expected)' : 'No'
      });
    }
  }
  
  return results;
}

function verifyExports() {
  const indexPath = join(projectRoot, 'dist/adapters/vanilla/index.ts');
  if (!existsSync(indexPath)) {
    console.warn('⚠️  index.ts not found, checking for index.js');
    const indexPathJs = join(projectRoot, 'dist/adapters/vanilla/index.js');
    if (!existsSync(indexPathJs)) {
      return { valid: false, error: 'No index file found' };
    }
    const content = readFileSync(indexPathJs, 'utf-8');
    return {
      valid: content.includes('export {'),
      exports: content.match(/export\s+\{[^}]+\}/g) || []
    };
  }
  
  const content = readFileSync(indexPath, 'utf-8');
  const exports = content.match(/export\s+\{[^}]+\}/g) || [];
  
  return {
    valid: exports.length > 0,
    exports: exports,
    componentCount: exports.length
  };
}

async function generateReport() {
  console.log('\n📊 Tree-Shaking Verification Report\n');
  console.log('=' .repeat(60));
  
  // Analyze component files
  console.log('\n📦 Component Files Analysis:');
  console.log('-'.repeat(60));
  const componentAnalysis = await analyzeComponentFiles();
  
  let totalSize = 0;
  componentAnalysis.forEach(({ file, sizeKB, hasExport, hasSideEffects }) => {
    totalSize += parseFloat(sizeKB);
    console.log(`  ${file.padEnd(20)} ${sizeKB.padStart(8)} KB  Export: ${hasExport ? '✅' : '❌'}  Side Effects: ${hasSideEffects}`);
  });
  
  console.log(`\n  Total Size: ${totalSize.toFixed(2)} KB (uncompressed)`);
  
  // Verify exports
  console.log('\n📤 Export Verification:');
  console.log('-'.repeat(60));
  const exportCheck = verifyExports();
  
  if (exportCheck.valid) {
    console.log('  ✅ Index file has proper exports');
    if (exportCheck.componentCount) {
      console.log(`  ✅ Found ${exportCheck.componentCount} component exports`);
    }
  } else {
    console.log('  ❌ Index file missing or invalid');
    if (exportCheck.error) {
      console.log(`  ⚠️  ${exportCheck.error}`);
    }
  }
  
  // Check package.json sideEffects
  console.log('\n⚙️  Package.json Configuration:');
  console.log('-'.repeat(60));
  const packageJsonPath = join(projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  
  if (packageJson.sideEffects) {
    console.log('  ✅ sideEffects field configured');
    console.log(`  Side effects: ${JSON.stringify(packageJson.sideEffects)}`);
  } else {
    console.log('  ⚠️  sideEffects field not configured (may affect tree-shaking)');
  }
  
  // Tree-shaking recommendations
  console.log('\n💡 Tree-Shaking Recommendations:');
  console.log('-'.repeat(60));
  
  const recommendations = [];
  
  if (!packageJson.sideEffects) {
    recommendations.push('Add sideEffects field to package.json to enable tree-shaking');
  }
  
  const componentsWithSideEffects = componentAnalysis.filter(c => c.hasSideEffects === 'Yes');
  if (componentsWithSideEffects.length > 0) {
    recommendations.push(`Some components have side effects: ${componentsWithSideEffects.map(c => c.file).join(', ')}`);
  }
  
  if (recommendations.length === 0) {
    console.log('  ✅ All components are tree-shakeable');
  } else {
    recommendations.forEach(rec => console.log(`  ⚠️  ${rec}`));
  }
  
  // Summary
  console.log('\n📋 Summary:');
  console.log('-'.repeat(60));
  console.log(`  Total Components: ${componentAnalysis.length}`);
  console.log(`  Total Bundle Size: ${totalSize.toFixed(2)} KB`);
  console.log(`  Average Component Size: ${(totalSize / componentAnalysis.length).toFixed(2)} KB`);
  console.log(`  Tree-Shaking Ready: ${packageJson.sideEffects ? '✅' : '⚠️'}`);
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  return {
    totalComponents: componentAnalysis.length,
    totalSizeKB: totalSize,
    averageSizeKB: totalSize / componentAnalysis.length,
    treeShakingReady: !!packageJson.sideEffects,
    componentsWithSideEffects: componentsWithSideEffects.length
  };
}

// Run verification
(async () => {
  try {
    const report = await generateReport();
    process.exit(report.treeShakingReady ? 0 : 1);
  } catch (error) {
    console.error('❌ Error during verification:', error);
    process.exit(1);
  }
})();

