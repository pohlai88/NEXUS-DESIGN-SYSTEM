/**
 * Generate Framework Adapter
 * 
 * Generates framework-specific component adapters from component specifications
 * Uses TypeScript adapters for type safety and consistency
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { getAdapter } from '../adapters/index.js';
import type { ComponentSpecification, ComponentSpec } from '../types/component-spec.js';
import { AdapterError, validateSpec } from '../adapters/universal/errors.js';
import type { Framework } from '../adapters/universal/adapter.js';

/**
 * Validate generated component code
 */
function validateGeneratedComponent(code: string, componentName: string): void {
  // Check for required exports
  if (!code.includes('export')) {
    throw new AdapterError(
      componentName,
      'Generated component missing exports'
    );
  }

  // Check for React imports if React component
  if (code.includes("from 'react'")) {
    if (!code.includes("import * as React from 'react'") && 
        !code.includes("import React from 'react'")) {
      throw new AdapterError(
        componentName,
        'React component missing React import'
      );
    }
  }

  // Basic syntax validation - check for balanced braces
  const openBraces = (code.match(/{/g) || []).length;
  const closeBraces = (code.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    throw new AdapterError(
      componentName,
      `Unbalanced braces in generated code (${openBraces} open, ${closeBraces} close)`
    );
  }
}

/**
 * Generate components for a framework
 */
async function generateComponents(
  specs: ComponentSpecification,
  framework: Framework = 'react',
  outputDir: string
): Promise<{ generated: number; errors: number }> {
  const adapter = getAdapter(framework);
  const frameworkDir = join(outputDir, framework);

  // Create output directory
  if (!existsSync(frameworkDir)) {
    mkdirSync(frameworkDir, { recursive: true });
  }

  const componentsToGenerate = Object.keys(specs.components);
  let generated = 0;
  let errors = 0;
  const generatedExports: string[] = [];

  for (const name of componentsToGenerate) {
    const spec = specs.components[name];

    if (!spec) {
      console.error(`❌ Component "${name}" not found in specifications`);
      errors++;
      continue;
    }

    try {
      // Validate specification
      validateSpec(spec);

      // Generate component using adapter
      const generatedComponent = adapter.generate(spec, {
        framework,
        outputDir: frameworkDir,
      });

      // Validate generated code
      validateGeneratedComponent(generatedComponent.code, spec.name);

      // Write component file (use .js for Web Components, .tsx for React)
      const extension = framework === 'vanilla' ? '.js' : '.tsx';
      const componentPath = join(frameworkDir, `${name}${extension}`);
      writeFileSync(componentPath, generatedComponent.code, 'utf-8');

      // Track for index file
      generatedExports.push(
        `export { ${spec.name} } from './${name}';`
      );

      console.log(`✅ Generated ${spec.name} → ${componentPath}`);
      generated++;
    } catch (error) {
      if (error instanceof AdapterError) {
        console.error(`❌ ${error.message}`);
      } else if (error instanceof Error) {
        console.error(`❌ Error generating ${name}:`, error.message);
      } else {
        console.error(`❌ Error generating ${name}:`, error);
      }
      errors++;
    }
  }

  // Write index file
  if (generatedExports.length > 0) {
    const indexPath = join(frameworkDir, 'index.ts');
    writeFileSync(indexPath, generatedExports.join('\n'), 'utf-8');
  }

  return { generated, errors };
}

/**
 * Main execution
 */
async function main() {
  const specsPath = join(process.cwd(), 'dist', 'component-specs.json');
  const outputDir = join(process.cwd(), 'dist', 'adapters');

  // Parse command line arguments
  const args = process.argv.slice(2);
  const componentName = args.find((arg) => !arg.startsWith('--')) || 'all';
  const frameworkArg = args.find((arg) => arg.startsWith('--framework='));
  const framework = (frameworkArg?.split('=')[1] || 'react') as Framework;

  // Validate specs file exists
  if (!existsSync(specsPath)) {
    console.error('❌ Component specifications not found. Run: pnpm generate:specs');
    process.exit(1);
  }

  // Load specifications
  let specs: ComponentSpecification;
  try {
    const specsContent = readFileSync(specsPath, 'utf-8');
    specs = JSON.parse(specsContent) as ComponentSpecification;
  } catch (error) {
    console.error('❌ Failed to parse component specifications:', error);
    process.exit(1);
  }

  // Filter components if specific component requested
  if (componentName !== 'all') {
    const filteredSpecs: ComponentSpecification = {
      version: specs.version,
      components: {},
    };

    if (specs.components[componentName]) {
      filteredSpecs.components[componentName] = specs.components[componentName];
    } else {
      console.error(`❌ Component "${componentName}" not found in specifications`);
      process.exit(1);
    }

    specs = filteredSpecs;
  }

  // Generate components
  const result = await generateComponents(specs, framework, outputDir);

  // Output summary
  console.log(`\n✅ Generated ${result.generated} component(s)`);
  if (result.errors > 0) {
    console.error(`❌ ${result.errors} error(s)`);
    process.exit(1);
  }
}

// Run if executed directly
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

export { generateComponents, validateGeneratedComponent };

