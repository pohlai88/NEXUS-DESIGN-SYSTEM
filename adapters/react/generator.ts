/**
 * React Adapter Generator
 * 
 * Generates React components from AIBOS component specifications
 */

import type {
  ComponentSpec,
  ComponentPart,
  RadixPrimitive
} from '../../types/component-spec.js';
import type {
  UniversalAdapter,
  GeneratedComponent,
  AdapterConfig
} from '../universal/adapter.js';
import { getAllClasses, getStateClasses, usesRadixUI, hasParts } from '../universal/adapter.js';

/**
 * Map Radix UI primitive to import path
 */
function getRadixImport(primitive: RadixPrimitive): string {
  if (!primitive) return '';
  return primitive;
}

/**
 * Generate React component from specification
 */
export function generateReactComponent(
  spec: ComponentSpec,
  config: AdapterConfig
): GeneratedComponent {
  const componentName = spec.name;
  const imports: string[] = [];
  const dependencies: string[] = [];

  // Add React imports
  imports.push(`import * as React from 'react';`);

  // Add Radix UI imports if needed
  if (usesRadixUI(spec) && spec.radixPrimitive) {
    const radixImport = getRadixImport(spec.radixPrimitive);
    const primitiveName = radixImport.split('/').pop()?.replace('react-', '') || 'Primitive';
    imports.push(`import * as ${componentName}Primitive from '${radixImport}';`);
    dependencies.push(spec.radixPrimitive);
  }

  // Add utility imports
  imports.push(`import { cn } from '@/lib/utils';`);
  imports.push(`import '@aibos/design-system/css';`);

  // Generate component code
  let code = '';

  if (hasParts(spec)) {
    // Composite component (e.g., Dialog)
    code = generateCompositeComponent(spec, componentName);
  } else {
    // Simple component (e.g., Button)
    code = generateSimpleComponent(spec, componentName);
  }

  return {
    name: componentName,
    code: `${imports.join('\n')}\n\n${code}`,
    imports,
    dependencies
  };
}

/**
 * Generate simple component (no parts)
 */
function generateSimpleComponent(
  spec: ComponentSpec,
  componentName: string
): string {
  const propsInterface = generatePropsInterface(spec);
  const defaultVariant = Object.keys(spec.variants)[0];
  const defaultClasses = getAllClasses(spec, defaultVariant);

  const elementType = spec.nativeElement === 'button' ? 'Button' : 
                     spec.nativeElement === 'input' ? 'Input' : 'HTML';
  const htmlElement = spec.nativeElement === 'button' ? 'Button' :
                     spec.nativeElement === 'input' ? 'Input' :
                     spec.nativeElement || 'div';
  const htmlElementType = htmlElement.charAt(0).toUpperCase() + htmlElement.slice(1);

  return `
export interface ${componentName}Props extends React.${elementType}HTMLAttributes<HTML${htmlElementType}Element> {
${propsInterface}
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
${Object.entries(spec.variants).map(([v, variant]) => 
    `    '${v}': ${JSON.stringify(variant.aibosClasses)}`
  ).join(',\n')}
  };
  
  const variantClasses = variantClassMap[variant] || variantClassMap['${defaultVariant}'];
  const stateClasses: string[] = [];
  
  if (disabled) {
    const disabledState = ${JSON.stringify(getStateClasses(spec, 'disabled') || [])};
    stateClasses.push(...disabledState);
  }
  if (loading) {
    const loadingState = ${JSON.stringify(getStateClasses(spec, 'loading') || [])};
    stateClasses.push(...loadingState);
  }
  
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

/**
 * Generate composite component (with parts)
 */
function generateCompositeComponent(
  spec: ComponentSpec,
  componentName: string
): string {
  if (!spec.parts || !spec.radixPrimitive) {
    throw new Error('Composite component must have parts and radixPrimitive');
  }

  const parts = Object.entries(spec.parts);
  const rootPart = parts.find(([name]) => name === 'Root');
  const otherParts = parts.filter(([name]) => name !== 'Root');

  const propsInterface = generatePropsInterface(spec);

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
    const classes = part.aibosClasses.join(' ');

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

/**
 * Generate TypeScript props interface
 */
function generatePropsInterface(spec: ComponentSpec): string {
  if (!spec.props) return '';

  return Object.entries(spec.props)
    .map(([name, prop]) => {
      const required = prop.required ? '' : '?';
      const defaultValue = prop.default !== undefined ? ` = ${JSON.stringify(prop.default)}` : '';
      return `  ${name}${required}: ${prop.type}${defaultValue};`;
    })
    .join('\n');
}

/**
 * React adapter implementation
 */
export const reactAdapter: UniversalAdapter = {
  generate: generateReactComponent,
  
  generateParts(spec: ComponentSpec, config: AdapterConfig): GeneratedComponent[] {
    if (!hasParts(spec)) {
      return [generateReactComponent(spec, config)];
    }

    const parts: GeneratedComponent[] = [];
    const mainComponent = generateReactComponent(spec, config);
    parts.push(mainComponent);

    // Generate individual part components
    // This would be expanded to generate separate files for each part

    return parts;
  },

  getDependencies(spec: ComponentSpec): string[] {
    const deps: string[] = ['react', 'react-dom'];
    
    if (usesRadixUI(spec) && spec.radixPrimitive) {
      deps.push(spec.radixPrimitive);
    }

    return deps;
  }
};
