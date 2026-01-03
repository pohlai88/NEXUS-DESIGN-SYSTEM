/**
 * Generate TypeScript Definition Files for Web Components
 * 
 * Generates .d.ts files for all generated Web Components
 * This enables TypeScript IntelliSense for consumers
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const componentsDir = join(process.cwd(), 'dist/adapters/vanilla');
const outputDir = componentsDir;

if (!existsSync(componentsDir)) {
  console.error('❌ Web Components directory not found. Run: pnpm generate:adapter vanilla');
  process.exit(1);
}

const componentFiles = readdirSync(componentsDir)
  .filter(f => f.endsWith('.js') && f !== 'index.ts')
  .sort();

let generated = 0;

/**
 * Extract component class name from file
 */
function getComponentName(fileName: string): string {
  const name = fileName.replace('.js', '');
  // Convert kebab-case to PascalCase
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Extract event interfaces from component code
 */
function extractEventInterfaces(content: string): string {
  const eventInterfaceMatch = content.match(/export interface (\w+Events) \{[\s\S]*?\}/);
  const globalDeclareMatch = content.match(/declare global \{[\s\S]*?interface HTMLElementEventMap[\s\S]*?\}/);
  
  if (!eventInterfaceMatch && !globalDeclareMatch) {
    return '';
  }
  
  const parts: string[] = [];
  if (eventInterfaceMatch) {
    parts.push(eventInterfaceMatch[0]);
  }
  if (globalDeclareMatch) {
    parts.push(globalDeclareMatch[0]);
  }
  
  return parts.join('\n\n');
}

/**
 * Extract observed attributes from component code
 */
function extractObservedAttributes(content: string): string[] {
  const match = content.match(/static get observedAttributes\(\) \{[\s\S]*?return \[([\s\S]*?)\];[\s\S]*?\}/);
  if (!match) return [];
  
  const attrsString = match[1];
  // Extract quoted strings
  const attrs = attrsString.match(/'([^']+)'/g)?.map(a => a.slice(1, -1)) || [];
  return attrs;
}

/**
 * Generate TypeScript definition for a Web Component
 */
function generateComponentTypes(fileName: string): string {
  const componentName = getComponentName(fileName);
  const filePath = join(componentsDir, fileName);
  const content = readFileSync(filePath, 'utf-8');
  
  // Extract event interfaces
  const eventInterfaces = extractEventInterfaces(content);
  
  // Extract observed attributes
  const observedAttrs = extractObservedAttributes(content);
  
  // Extract tag name (na-button, na-dialog, etc.)
  const tagNameMatch = content.match(/@element (na-\w+)/);
  const tagName = tagNameMatch ? tagNameMatch[1] : `na-${fileName.replace('.js', '')}`;
  
  // Extract JSDoc description
  const jsdocMatch = content.match(/\/\*\*[\s\S]*?\*\/\s*export interface/);
  const description = jsdocMatch 
    ? jsdocMatch[0].replace(/\/\*\*|\*\/|\*/g, '').trim().split('\n')[0]
    : `${componentName} Web Component`;
  
  // Generate the definition file
  const dtsContent = `/**
 * ${description}
 * 
 * @element ${tagName}
 * 
 * Auto-generated TypeScript definitions for ${componentName} Web Component
 * Source: ${fileName}
 */

${eventInterfaces}

/**
 * ${componentName} Web Component
 * 
 * Custom element: <${tagName}>
 */
export class ${componentName} extends HTMLElement {
  /**
   * Observed attributes that trigger attributeChangedCallback
   */
  static readonly observedAttributes: ReadonlyArray<${observedAttrs.map(a => `'${a}'`).join(' | ')}>;
  
  /**
   * Variant prop
   */
  variant: string;
  
  /**
   * Size prop
   */
  size: string;
  
  /**
   * Disabled state
   */
  disabled: boolean;
  
  /**
   * Loading state
   */
  loading: boolean;
  
  /**
   * Open state (for dialog-like components)
   */
  open?: boolean;
  
  /**
   * Add event listener for component events
   */
  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  
  /**
   * Remove event listener
   */
  removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
}

/**
 * Register the custom element
 */
export function register${componentName}(): void {
  if (typeof window !== 'undefined' && !customElements.get('${tagName}')) {
    customElements.define('${tagName}', ${componentName});
  }
}

declare global {
  interface HTMLElementTagNameMap {
    '${tagName}': ${componentName};
  }
}
`;

  return dtsContent;
}

// Generate types for all components
for (const file of componentFiles) {
  try {
    const dtsContent = generateComponentTypes(file);
    const dtsPath = join(outputDir, `${file.replace('.js', '')}.d.ts`);
    writeFileSync(dtsPath, dtsContent, 'utf-8');
    console.log(`✅ Generated types: ${file.replace('.js', '')}.d.ts`);
    generated++;
  } catch (error) {
    console.error(`❌ Error generating types for ${file}:`, error instanceof Error ? error.message : error);
  }
}

// Generate index.d.ts
const indexDtsContent = `/**
 * Web Components Type Definitions
 * 
 * Auto-generated index declaration file
 * Generated: ${new Date().toISOString()}
 * 
 * This file exports all Web Component type definitions
 */

${componentFiles.map(f => {
  const name = f.replace('.js', '');
  return `export * from './${name}';`;
}).join('\n')}

/**
 * All available Web Component tag names
 */
export type WebComponentTagName = 
${componentFiles.map(f => {
  const tagNameMatch = readFileSync(join(componentsDir, f), 'utf-8').match(/@element (na-\w+)/);
  const tagName = tagNameMatch ? tagNameMatch[1] : `na-${f.replace('.js', '')}`;
  return `  | '${tagName}'`;
}).join('\n')};

/**
 * Register all Web Components
 */
export function registerAllComponents(): void {
${componentFiles.map(f => {
  const componentName = getComponentName(f);
  return `  import('./${f.replace('.js', '')}').then(m => m.register${componentName}());`;
}).join('\n')}
}
`;

const indexDtsPath = join(outputDir, 'index.d.ts');
writeFileSync(indexDtsPath, indexDtsContent, 'utf-8');
console.log(`✅ Generated index.d.ts`);

console.log(`\n✨ Generated ${generated} component type definitions + index.d.ts`);


