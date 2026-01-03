/**
 * Build Components from Specifications
 * 
 * Main build script for the Design-to-Code Engine.
 * Generates React components from component specifications.
 * 
 * Usage:
 *   pnpm build:components                    # Generate all components
 *   pnpm build:components button             # Generate specific component
 *   pnpm build:components --framework react  # Specify framework
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { getAdapter } from '../adapters/index.js';
import type { ComponentSpecification, ComponentSpec } from '../types/component-spec.js';
import { AdapterError, validateSpec } from '../adapters/universal/errors.js';
import type { Framework, AdapterConfig } from '../adapters/universal/adapter.js';

/**
 * Default adapter configuration
 */
const DEFAULT_CONFIG: Omit<AdapterConfig, 'framework' | 'outputDir'> = {
    packageName: '@aibos/design-system',
    utilsPath: 'utils',
    cssPath: 'css',
};

/**
 * Load component specification from JSON file
 */
function loadSpecFromFile(filePath: string): ComponentSpec {
    try {
        const content = readFileSync(filePath, 'utf-8');
        return JSON.parse(content) as ComponentSpec;
    } catch (error) {
        throw new AdapterError(
            'Unknown',
            `Failed to load spec from ${filePath}: ${error instanceof Error ? error.message : String(error)}`
        );
    }
}

/**
 * Load all component specifications from directory
 */
function loadAllSpecs(specsDir: string): ComponentSpecification {
    const components: Record<string, ComponentSpec> = {};
    const componentsDir = join(specsDir, 'components');

    if (!existsSync(componentsDir)) {
        throw new AdapterError(
            'Unknown',
            `Specs directory not found: ${componentsDir}`
        );
    }

    // Read all JSON files in components directory
    const files = readdirSync(componentsDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const filePath = join(componentsDir, file);
        const spec = loadSpecFromFile(filePath);
        const key = file.replace('.json', '').toLowerCase();
        components[key] = spec;
    }

    return {
        version: '1.0.0',
        components,
    };
}

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
    framework: Framework,
    config: AdapterConfig
): Promise<{ generated: number; errors: number; files: string[] }> {
    const adapter = getAdapter(framework);
    const frameworkDir = join(config.outputDir, framework);

    // Create output directory
    if (!existsSync(frameworkDir)) {
        mkdirSync(frameworkDir, { recursive: true });
    }

    const componentsToGenerate = Object.keys(specs.components);
    let generated = 0;
    let errors = 0;
    const generatedExports: string[] = [];
    const generatedFiles: string[] = [];

    for (const name of componentsToGenerate) {
        const spec = specs.components[name];

        if (!spec) {
            console.error(`❌ Component "${name}" not found in specifications`);
            errors++;
            continue;
        }

        try {
            // Validate specification (this also ensures spec is valid ComponentSpec)
            const validatedSpec = validateSpec(spec);

            // Generate component using adapter
            const generatedComponent = adapter.generate(validatedSpec, config);

            // Validate generated code
            validateGeneratedComponent(generatedComponent.code, validatedSpec.name);

            // Write component file
            const componentPath = join(frameworkDir, `${name}.tsx`);
            writeFileSync(componentPath, generatedComponent.code, 'utf-8');
            generatedFiles.push(componentPath);

            // Track for index file
            generatedExports.push(
                `export { ${validatedSpec.name} } from './${name}';`
            );

            console.log(`✅ Generated ${validatedSpec.name} → ${componentPath}`);
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
        generatedFiles.push(indexPath);
    }

    return { generated, errors, files: generatedFiles };
}

/**
 * Main execution
 */
async function main() {
    const specsDir = join(process.cwd(), 'specs');
    const outputDir = join(process.cwd(), 'dist', 'components');

    // Parse command line arguments
    const args = process.argv.slice(2);
    const componentName = args.find((arg) => !arg.startsWith('--')) || 'all';
    const frameworkArg = args.find((arg) => arg.startsWith('--framework='));
    const framework = (frameworkArg?.split('=')[1] || 'react') as Framework;

    // Parse config overrides
    const packageNameArg = args.find((arg) => arg.startsWith('--package='));
    const utilsPathArg = args.find((arg) => arg.startsWith('--utils='));
    const cssPathArg = args.find((arg) => arg.startsWith('--css='));

    // Build configuration
    const config: AdapterConfig = {
        framework,
        outputDir,
        packageName: packageNameArg?.split('=')[1] || DEFAULT_CONFIG.packageName,
        utilsPath: utilsPathArg?.split('=')[1] || DEFAULT_CONFIG.utilsPath,
        cssPath: cssPathArg?.split('=')[1] || DEFAULT_CONFIG.cssPath,
    };

    // Validate specs directory exists
    if (!existsSync(specsDir)) {
        console.error('❌ Specs directory not found. Expected:', specsDir);
        process.exit(1);
    }

    // Load specifications
    let specs: ComponentSpecification;
    try {
        specs = loadAllSpecs(specsDir);
    } catch (error) {
        console.error('❌ Failed to load component specifications:', error);
        process.exit(1);
    }

    // Filter components if specific component requested
    if (componentName !== 'all') {
        const filteredSpecs: ComponentSpecification = {
            version: specs.version,
            components: {},
        };

        const componentSpec = specs.components[componentName];
        if (componentSpec) {
            filteredSpecs.components[componentName] = componentSpec;
        } else {
            console.error(`❌ Component "${componentName}" not found in specifications`);
            console.error(`   Available components: ${Object.keys(specs.components).join(', ')}`);
            process.exit(1);
        }

        specs = filteredSpecs;
    }

    // Display configuration
    console.log('\n📦 Design-to-Code Engine');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Framework:     ${framework}`);
    console.log(`Output:       ${outputDir}`);
    console.log(`Package:      ${config.packageName}`);
    console.log(`Utils Path:   ${config.utilsPath}`);
    console.log(`CSS Path:     ${config.cssPath}`);
    console.log(`Components:   ${Object.keys(specs.components).length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Generate components
    const result = await generateComponents(specs, framework, config);

    // Output summary
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Generated ${result.generated} component(s)`);
    if (result.errors > 0) {
        console.error(`❌ ${result.errors} error(s)`);
        process.exit(1);
    }
    console.log(`📁 Files written: ${result.files.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Run if executed directly
main().catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});

export { generateComponents, loadAllSpecs, validateGeneratedComponent };

