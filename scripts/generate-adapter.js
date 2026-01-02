/**
 * Generate Framework Adapter
 * 
 * Generates framework-specific component adapters from component specifications
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Simple React component generator (inline version)
function generateReactComponent(spec, config) {
  const componentName = spec.name;
  const imports = [];
  const dependencies = [];

  // Add React imports
  imports.push(`import * as React from 'react';`);

  // Add Radix UI imports if needed
  if (spec.radixPrimitive) {
    imports.push(`import * as ${componentName}Primitive from '${spec.radixPrimitive}';`);
    dependencies.push(spec.radixPrimitive);
  }

  // Add utility imports
  imports.push(`import { cn } from '@/lib/utils';`);
  imports.push(`import '@aibos/design-system/css';`);

  // Generate props interface
  let propsInterface = '';
  if (spec.props) {
    propsInterface = Object.entries(spec.props)
      .map(([name, prop]) => {
        const required = prop.required ? '' : '?';
        // Wrap union types in quotes if they contain | (but not if it's already a proper type)
        const typeStr = prop.type.includes('|') && !prop.type.includes('=>') && !prop.type.includes('(')
          ? `"${prop.type.replace(/\s*\|\s*/g, '" | "')}"`
          : prop.type;
        return `  ${name}${required}: ${typeStr};`;
      })
      .join('\n');
  }

  // Generate variant class map
  const defaultVariant = Object.keys(spec.variants)[0];
  const variantClassMap = Object.entries(spec.variants)
    .map(([v, variant]) => `    '${v}': ${JSON.stringify(variant.aibosClasses)}`)
    .join(',\n');

  // Generate component code
  let code = '';

  if (spec.parts && Object.keys(spec.parts).length > 0) {
    // Composite component
    code = generateCompositeComponent(spec, componentName, propsInterface);
  } else {
    // Simple component
    code = generateSimpleComponent(spec, componentName, propsInterface, variantClassMap, defaultVariant);
  }

  return {
    name: componentName,
    code: `${imports.join('\n')}\n\n${code}`,
    imports,
    dependencies
  };
}

function generateSimpleComponent(spec, componentName, propsInterface, variantClassMap, defaultVariant) {
  const elementType = spec.nativeElement === 'button' ? 'Button' : 
                     spec.nativeElement === 'input' ? 'Input' : 'HTML';
  const htmlElement = spec.nativeElement || 'div';
  const htmlElementType = htmlElement.charAt(0).toUpperCase() + htmlElement.slice(1);

  return `
export interface ${componentName}Props extends React.${elementType}HTMLAttributes<HTML${htmlElementType}Element> {
${propsInterface ? propsInterface : ''}
}

export function ${componentName}({
  variant = '${defaultVariant}',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  ...props
}: ${componentName}Props) {
  const variantClassMap: Record<string, string[]> = {
${variantClassMap}
  };
  
  // Validate variant
  const validVariant = variantClassMap[variant] ? variant : '${defaultVariant}';
  const variantClasses = variantClassMap[validVariant] || variantClassMap['${defaultVariant}'];
  
  // Build state classes
  const stateClasses: string[] = [];
  
  if (disabled) {
    const disabledState = ${JSON.stringify((spec.states?.disabled?.aibosClasses || []))};
    stateClasses.push(...disabledState);
  }
  if (loading) {
    const loadingState = ${JSON.stringify((spec.states?.loading?.aibosClasses || []))};
    stateClasses.push(...loadingState);
  }
  
  // Merge all classes
  const classes = cn(
    ...variantClasses,
    ...stateClasses,
    className
  );

  return (
    <${spec.nativeElement || 'div'}
      className={classes}
      disabled={disabled || loading}
      {...props}
    />
  );
}
`;
}

function generateCompositeComponent(spec, componentName, propsInterface) {
  const parts = Object.entries(spec.parts);
  const rootPart = parts.find(([name]) => name === 'Root');
  const otherParts = parts.filter(([name]) => name !== 'Root');

  let code = `
export interface ${componentName}Props {
${propsInterface}
  children?: React.ReactNode;
}

// Root component
export function ${componentName}({ open, onOpenChange, children, ...props }: ${componentName}Props) {
  return (
    <${componentName}Primitive.Root open={open} onOpenChange={onOpenChange} {...props}>
      {children}
    </${componentName}Primitive.Root>
  );
}
`;

  // Generate part components
  for (const [partName, part] of otherParts) {
    const radixComponent = part.radixComponent || partName;
    const classes = part.aibosClasses.filter(c => c).join(' ');

    code += `

export function ${componentName}${partName}({ 
  className, 
  ...props 
}: React.ComponentPropsWithoutRef<typeof ${componentName}Primitive.${radixComponent}>) {
  return (
    <${componentName}Primitive.${radixComponent}
      className={cn('${classes}', className)}
      {...props}
    />
  );
}
`;
  }

  return code;
}

const specsPath = join(process.cwd(), 'dist', 'component-specs.json');
const outputDir = join(process.cwd(), 'dist', 'adapters');

// Parse command line arguments
const args = process.argv.slice(2);
const componentName = args.find(arg => !arg.startsWith('--')) || 'all';
const framework = args.find(arg => arg.startsWith('--framework='))?.split('=')[1] || 'react';
const outputFramework = args.find(arg => arg.startsWith('--output='))?.split('=')[1] || framework;

if (!existsSync(specsPath)) {
  console.error('❌ Component specifications not found. Run: pnpm generate:specs');
  process.exit(1);
}

const specs = JSON.parse(readFileSync(specsPath, 'utf-8'));

// Create output directory
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const frameworkDir = join(outputDir, outputFramework);
if (!existsSync(frameworkDir)) {
  mkdirSync(frameworkDir, { recursive: true });
}

// Generate components
const componentsToGenerate = componentName === 'all' 
  ? Object.keys(specs.components)
  : [componentName];

let generated = 0;
let errors = 0;

for (const name of componentsToGenerate) {
  const spec = specs.components[name];
  
  if (!spec) {
    console.error(`❌ Component "${name}" not found in specifications`);
    errors++;
    continue;
  }

  try {
    let generatedComponent;
    
    switch (framework) {
      case 'react':
        generatedComponent = generateReactComponent(spec, {
          framework: 'react',
          outputDir: frameworkDir
        });
        break;
      default:
        console.error(`❌ Framework "${framework}" not yet implemented`);
        errors++;
        continue;
    }

    // Write component file
    const componentPath = join(frameworkDir, `${name}.tsx`);
    writeFileSync(componentPath, generatedComponent.code, 'utf-8');

    // Write index file
    const indexPath = join(frameworkDir, 'index.ts');
    const indexContent = componentsToGenerate
      .map(n => `export { ${specs.components[n]?.name || n} } from './${n}';`)
      .join('\n');
    writeFileSync(indexPath, indexContent, 'utf-8');

    console.log(`✅ Generated ${name} → ${componentPath}`);
    generated++;
  } catch (error) {
    console.error(`❌ Error generating ${name}:`, error.message);
    errors++;
  }
}

console.log(`\n✅ Generated ${generated} component(s)`);
if (errors > 0) {
  console.error(`❌ ${errors} error(s)`);
  process.exit(1);
}
