/**
 * Validate Component Specifications
 * 
 * Validates all component specs before building.
 * Use this to catch errors early in development.
 * 
 * Usage:
 *   pnpm validate:specs              # Validate all specs
 *   pnpm validate:specs button      # Validate specific component
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { validateSpec, InvalidSpecError } from '../adapters/universal/errors.js';
import type { ComponentSpec } from '../types/component-spec.js';

/**
 * Load and validate a single spec file
 */
function validateSpecFile(filePath: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    const spec = JSON.parse(content) as ComponentSpec;
    
    try {
      validateSpec(spec);
      return { valid: true, errors: [] };
    } catch (error) {
      if (error instanceof InvalidSpecError) {
        errors.push(error.message);
      } else if (error instanceof Error) {
        errors.push(error.message);
      } else {
        errors.push(String(error));
      }
      return { valid: false, errors };
    }
  } catch (error) {
    errors.push(`Failed to parse JSON: ${error instanceof Error ? error.message : String(error)}`);
    return { valid: false, errors };
  }
}

/**
 * Validate all specs in directory
 */
function validateAllSpecs(specsDir: string, componentName?: string): {
  total: number;
  valid: number;
  invalid: number;
  errors: Array<{ file: string; errors: string[] }>;
} {
  const componentsDir = join(specsDir, 'components');
  
  if (!existsSync(componentsDir)) {
    throw new Error(`Specs directory not found: ${componentsDir}`);
  }
  
  const files = readdirSync(componentsDir)
    .filter(f => f.endsWith('.json'))
    .filter(f => !componentName || f.replace('.json', '') === componentName);
  
  const results: Array<{ file: string; errors: string[] }> = [];
  let valid = 0;
  let invalid = 0;
  
  for (const file of files) {
    const filePath = join(componentsDir, file);
    const result = validateSpecFile(filePath);
    
    if (result.valid) {
      valid++;
      console.log(`✅ ${file.replace('.json', '')}`);
    } else {
      invalid++;
      console.error(`❌ ${file.replace('.json', '')}`);
      result.errors.forEach(err => console.error(`   ${err}`));
      results.push({ file, errors: result.errors });
    }
  }
  
  return { total: files.length, valid, invalid, errors: results };
}

/**
 * Main execution
 */
function main() {
  const specsDir = join(process.cwd(), 'specs');
  const args = process.argv.slice(2);
  const componentName = args.find(arg => !arg.startsWith('--'));
  
  console.log('\n🔍 Validating Component Specifications');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  try {
    const result = validateAllSpecs(specsDir, componentName);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Total:   ${result.total}`);
    console.log(`Valid:   ${result.valid} ✅`);
    console.log(`Invalid: ${result.invalid} ❌`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    if (result.invalid > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

main();

