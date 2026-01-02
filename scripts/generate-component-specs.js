/**
 * Generate Component Specifications
 * 
 * Validates and generates component specification index from individual component files
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const specsDir = join(process.cwd(), 'specs', 'components');
const schemaPath = join(process.cwd(), 'schemas', 'component.schema.json');
const outputPath = join(process.cwd(), 'dist', 'component-specs.json');

// Initialize JSON Schema validator
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Load schema
const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
// Create validator for individual components
const validateComponent = ajv.compile(schema);

// Load all component specifications
const components = {};
const errors = [];

if (!existsSync(specsDir)) {
  console.error(`❌ Specs directory not found: ${specsDir}`);
  process.exit(1);
}

const componentFiles = readdirSync(specsDir).filter(f => f.endsWith('.json'));

for (const file of componentFiles) {
  const filePath = join(specsDir, file);
  const componentName = file.replace('.json', '');
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    const spec = JSON.parse(content);
    
    // Validate against component schema
    const valid = validateComponent(spec);
    
    if (!valid) {
      console.error(`❌ Validation failed for ${componentName}:`);
      console.error(validateComponent.errors);
      errors.push({ component: componentName, errors: validateComponent.errors });
      continue;
    }
    
    components[componentName] = spec;
    console.log(`✅ ${componentName} - validated`);
  } catch (error) {
    console.error(`❌ Error loading ${componentName}:`, error.message);
    errors.push({ component: componentName, error: error.message });
  }
}

// Generate index
const index = {
  version: '1.0.0',
  generated: new Date().toISOString(),
  components,
  stats: {
    totalComponents: Object.keys(components).length,
    totalVariants: Object.values(components).reduce((sum, c) => sum + Object.keys(c.variants || {}).length, 0),
    totalStates: Object.values(components).reduce((sum, c) => sum + Object.keys(c.states || {}).length, 0),
    radixComponents: Object.values(components).filter(c => c.radixPrimitive !== null).length,
    nativeComponents: Object.values(components).filter(c => c.radixPrimitive === null).length
  }
};

// Write output
writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf-8');

console.log('\n✅ Component specifications generated:');
console.log(`   - ${index.stats.totalComponents} components`);
console.log(`   - ${index.stats.totalVariants} variants`);
console.log(`   - ${index.stats.totalStates} states`);
console.log(`   - ${index.stats.radixComponents} Radix UI components`);
console.log(`   - ${index.stats.nativeComponents} native components`);
console.log(`   - Output: ${outputPath}`);

if (errors.length > 0) {
  console.error(`\n❌ ${errors.length} component(s) failed validation`);
  process.exit(1);
}

