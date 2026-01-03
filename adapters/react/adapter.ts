/**
 * React Adapter
 * 
 * Generates React components from AIBOS component specifications.
 * 
 * Features:
 * - forwardRef support for DOM refs
 * - asChild prop for Radix UI Slot pattern
 * - Configurable import paths
 * - Better prop type handling with JSDoc
 * - Zod-based validation
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
import { getAllClasses, getStateClasses, getVariantClasses, usesRadixUI, hasParts } from '../universal/adapter.js';
import { validateSpec, InvalidSpecError } from '../universal/errors.js';

/**
 * Get import paths from config
 */
function getImportPaths(config: AdapterConfig) {
  const packageName = config.packageName || '@aibos/design-system';
  const utilsPath = config.utilsPath || 'utils';
  const cssPath = config.cssPath || 'css';
  
  return {
    utils: `${packageName}/${utilsPath}`,
    css: `${packageName}/${cssPath}`,
  };
}

/**
 * Generate React component from specification
 */
export function generateReactComponent(
  spec: ComponentSpec,
  config: AdapterConfig
): GeneratedComponent {
  // Validate specification before generation
  validateSpec(spec);
  
  const componentName = spec.name;
  const imports: string[] = [];
  const dependencies: string[] = ['react', 'react-dom'];

  // Add React imports
  imports.push(`import * as React from 'react';`);

  // Add Radix UI imports if needed
  if (usesRadixUI(spec) && spec.radixPrimitive) {
    imports.push(`import * as ${componentName}Primitive from '${spec.radixPrimitive}';`);
    dependencies.push(spec.radixPrimitive);
    
    // Add Slot for asChild support
    imports.push(`import { Slot } from '@radix-ui/react-slot';`);
    dependencies.push('@radix-ui/react-slot');
  }

  // Add utility imports with configurable paths
  const importPaths = getImportPaths(config);
  imports.push(`import { cn } from '${importPaths.utils}';`);
  imports.push(`import '${importPaths.css}';`);

  // Generate component code
  let code = '';

  if (hasParts(spec)) {
    // Composite component (e.g., Dialog)
    code = generateCompositeComponent(spec, componentName, importPaths);
  } else {
    // Simple component (e.g., Button)
    code = generateSimpleComponent(spec, componentName, importPaths);
  }

  return {
    name: componentName,
    code: `${imports.join('\n')}\n\n${code}`,
    imports,
    dependencies
  };
}

/**
 * Generate simple component with forwardRef and asChild support
 */
function generateSimpleComponent(
  spec: ComponentSpec,
  componentName: string,
  importPaths: { utils: string; css: string }
): string {
  const propsInterface = generatePropsInterface(spec, true);
  const defaultVariant = Object.keys(spec.variants)[0];
  
  const elementType = spec.nativeElement === 'button' ? 'Button' : 
                     spec.nativeElement === 'input' ? 'Input' : 'HTML';
  const htmlElement = spec.nativeElement || 'div';
  const htmlElementType = htmlElement.charAt(0).toUpperCase() + htmlElement.slice(1);

  // Build variant class map
  const variantClassMap = Object.entries(spec.variants)
    .map(([v, variant]) => `    '${v}': ${JSON.stringify(variant.aibosClasses)}`)
    .join(',\n');

  // Build state classes
  const disabledState = JSON.stringify(getStateClasses(spec, 'disabled') || []);
  const loadingState = JSON.stringify(getStateClasses(spec, 'loading') || []);

  return `
${generateJSDoc(spec)}

export interface ${componentName}Props extends React.${elementType}HTMLAttributes<HTML${htmlElementType}Element> {
${propsInterface}
}

const ${componentName} = React.forwardRef<HTML${htmlElementType}Element, ${componentName}Props>(
  ({ 
    variant = '${defaultVariant}',
    size = 'md',
    disabled = false,
    loading = false,
    className,
    ${usesRadixUI(spec) ? 'asChild = false,\n    ' : ''}...props 
  }, ref) => {
    const variantClassMap: Record<string, string[]> = {
${variantClassMap}
    };
    
    const variantClasses = variantClassMap[variant] || variantClassMap['${defaultVariant}'];
    const stateClasses: string[] = [];
    
    if (disabled) {
      stateClasses.push(...${disabledState});
    }
    if (loading) {
      stateClasses.push(...${loadingState});
    }
    
    const classes = cn(
      ...variantClasses,
      ...stateClasses,
      className
    );

    ${usesRadixUI(spec) ? generateAsChildLogic(htmlElement, componentName) : ''}
    
    return (
      <${htmlElement}
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      />
    );
  }
);

${componentName}.displayName = "${componentName}";

export { ${componentName} };
`;
}

/**
 * Generate asChild logic for Radix UI components
 */
function generateAsChildLogic(htmlElement: string, componentName: string): string {
  return `
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={classes}
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
  componentName: string,
  importPaths: { utils: string; css: string }
): string {
  if (!spec.parts) {
    throw new InvalidSpecError(
      componentName,
      'Composite component must have parts',
      spec
    );
  }

  const parts = Object.entries(spec.parts);
  const rootPart = parts.find(([name]) => name.toLowerCase() === 'root');
  const otherParts = parts.filter(([name]) => name.toLowerCase() !== 'root');
  const isRadixComponent = spec.radixPrimitive !== null;
  const nativeElement = spec.nativeElement || 'div';

  const propsInterface = generatePropsInterface(spec, false);

  // Generate root component
  let code = `
${generateJSDoc(spec)}

export interface ${componentName}Props {
${propsInterface}
  children?: React.ReactNode;
${isRadixComponent ? `  open?: boolean;
  onOpenChange?: (open: boolean) => void;` : ''}
}

// Root component
export function ${componentName}({ 
${isRadixComponent ? `  open, 
  onOpenChange, ` : ''}
  children, 
  className,
  ...props 
}: ${componentName}Props) {
  const defaultVariant = Object.keys(spec.variants)[0] || 'default';
  const variantClasses = getVariantClasses(spec, defaultVariant).join(' ');
  
  return (
${isRadixComponent ? `    <${componentName}Primitive.Root 
      ${isRadixComponent ? `open={open} 
      onOpenChange={onOpenChange} ` : ''}
      className={cn(variantClasses, className)}
      {...props}
    >
      {children}
    </${componentName}Primitive.Root>` : `    <${nativeElement}
      className={cn(variantClasses, className)}
      {...props}
    >
      {children}
    </${nativeElement}>`}
  );
}
`;

  // Generate part components with forwardRef
  for (const [partName, part] of otherParts) {
    const classes = part.aibosClasses.filter(c => c).join(' ');
    const partElement = part.radixComponent || nativeElement;

    if (isRadixComponent && part.radixComponent) {
      // Radix UI part
      code += `

export const ${componentName}${partName} = React.forwardRef<
  React.ElementRef<typeof ${componentName}Primitive.${part.radixComponent}>,
  React.ComponentPropsWithoutRef<typeof ${componentName}Primitive.${part.radixComponent}>
>(({ className, ...props }, ref) => {
  return (
    <${componentName}Primitive.${part.radixComponent}
      ref={ref}
      className={cn('${classes}', className)}
      {...props}
    />
  );
});

${componentName}${partName}.displayName = "${componentName}${partName}";
`;
    } else {
      // Native HTML element part
      code += `

export const ${componentName}${partName} = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <${partElement}
      ref={ref}
      className={cn('${classes}', className)}
      {...props}
    />
  );
});

${componentName}${partName}.displayName = "${componentName}${partName}";
`;
    }
  }

  return code;
}

/**
 * Generate TypeScript props interface with JSDoc
 */
function generatePropsInterface(spec: ComponentSpec, includeStandardProps: boolean): string {
  const props: string[] = [];

  // Add asChild prop for Radix UI components
  if (usesRadixUI(spec) && includeStandardProps) {
    props.push(`  /** Change the component to the HTML tag or custom component of the only child. */`);
    props.push(`  asChild?: boolean;`);
  }

  // Add variant prop
  if (includeStandardProps && spec.variants) {
    const variantKeys = Object.keys(spec.variants);
    if (variantKeys.length > 0) {
      const variantType = variantKeys.map(k => `"${k}"`).join(' | ');
      props.push(`  /** Visual variant of the component. */`);
      props.push(`  variant?: ${variantType};`);
    }
  }

  // Add standard props
  if (includeStandardProps) {
    props.push(`  /** Size of the component. */`);
    props.push(`  size?: "sm" | "md" | "lg";`);
    props.push(`  /** Whether the component is disabled. */`);
    props.push(`  disabled?: boolean;`);
    props.push(`  /** Whether the component is in a loading state. */`);
    props.push(`  loading?: boolean;`);
  }

  // Add custom props from spec
  if (spec.props) {
    for (const [name, prop] of Object.entries(spec.props)) {
      if (prop.description) {
        props.push(`  /** ${prop.description} */`);
      }
      const required = prop.required ? '' : '?';
      const typeStr = sanitizePropType(prop.type);
      const defaultValue = prop.default !== undefined ? ` = ${JSON.stringify(prop.default)}` : '';
      props.push(`  ${name}${required}: ${typeStr}${defaultValue};`);
    }
  }

  return props.join('\n');
}

/**
 * Sanitize prop type to handle complex types correctly
 */
function sanitizePropType(type: string): string {
  // Don't wrap function types, generics, or React types
  if (
    type.includes('=>') ||
    type.includes('<') ||
    type.includes('React.') ||
    type.includes('Array<') ||
    type.includes('Record<') ||
    type.includes('Promise<') ||
    type.includes('() =>')
  ) {
    return type;
  }
  
  // Handle union types - wrap string literals in quotes
  if (type.includes('|')) {
    return type.split('|').map(t => {
      const trimmed = t.trim();
      // If it's already a quoted string, a type (starts with capital), or a number, leave it
      if (
        trimmed.startsWith('"') || 
        trimmed.startsWith("'") ||
        /^[A-Z]/.test(trimmed) ||
        /^\d/.test(trimmed) ||
        trimmed === 'true' ||
        trimmed === 'false' ||
        trimmed === 'null' ||
        trimmed === 'undefined'
      ) {
        return trimmed;
      }
      // Otherwise quote it (it's a string literal)
      return `"${trimmed}"`;
    }).join(' | ');
  }
  
  return type;
}

/**
 * Generate JSDoc comment for component
 */
function generateJSDoc(spec: ComponentSpec): string {
  const lines: string[] = ['/**'];
  
  if (spec.description) {
    lines.push(` * ${spec.description}`);
    lines.push(' *');
  }
  
  lines.push(` * @component`);
  lines.push(` * @name ${spec.name}`);
  
  if (spec.metadata?.category) {
    lines.push(` * @category ${spec.metadata.category}`);
  }
  
  if (spec.metadata?.complexity) {
    lines.push(` * @complexity ${spec.metadata.complexity}`);
  }
  
  lines.push(' */');
  
  return lines.join('\n');
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

    // For composite components, we could generate separate files for each part
    // For now, they're all in one file with named exports

    return parts;
  },

  getDependencies(spec: ComponentSpec): string[] {
    const deps: string[] = ['react', 'react-dom'];
    
    if (usesRadixUI(spec) && spec.radixPrimitive) {
      deps.push(spec.radixPrimitive);
      deps.push('@radix-ui/react-slot');
    }

    return deps;
  }
};

