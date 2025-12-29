#!/usr/bin/env node

/**
 * Token Extraction Script
 * Extracts design tokens from input.css and generates:
 * - tokens.json (JSON format)
 * - tokens/index.d.ts (TypeScript definitions)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read input.css
const inputCSS = fs.readFileSync(
    path.join(rootDir, 'input.css'),
    'utf8'
);

// Extract tokens from @theme block
const themeRegex = /@theme\s*\{([\s\S]*?)\}/;
const themeMatch = inputCSS.match(themeRegex);

if (!themeMatch) {
    console.error('No @theme block found in input.css');
    process.exit(1);
}

const themeContent = themeMatch[1];

// Parse CSS custom properties
const tokenRegex = /--([^:]+):\s*([^;]+);/g;
const tokens = {};
let match;

while ((match = tokenRegex.exec(themeContent)) !== null) {
    const [, key, value] = match;
    // Clean up value (remove comments, trim)
    const cleanValue = value
        .replace(/\/\*.*?\*\//g, '')
        .trim();
    tokens[key.trim()] = cleanValue;
}

// Convert flat tokens to nested structure
function nestTokens(flatTokens) {
    const nested = {};

    Object.keys(flatTokens).forEach(key => {
        // Skip keyframes and other non-token declarations
        if (key.startsWith('animate-') || key.includes('@')) {
            return;
        }

        const parts = key.split('-');
        let current = nested;

        // Handle special cases
        if (parts[0] === 'font' && parts[1] === 'family') {
            // --font-family-sans -> fontFamily.sans
            const familyName = parts.slice(2).join('');
            if (!current.fontFamily) {
                current.fontFamily = {};
            }
            current.fontFamily[familyName] = flatTokens[key];
            return;
        }

        // Standard nesting: --color-void -> color.void
        // Handle compound names: --color-paper-2 -> color.paper2 (not color.paper.2)
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            const nextPart = parts[i + 1];

            // Check if next part is numeric or if current part already has a value
            // If so, combine them: paper-2 -> paper2
            if (/^\d+/.test(nextPart) || (i < parts.length - 2 && typeof current[part] === 'string')) {
                // Combine current and next part
                const combinedPart = part + nextPart;
                if (!current[combinedPart]) {
                    current[combinedPart] = {};
                }
                current = current[combinedPart];
                i++; // Skip next part since we combined it
                continue;
            }

            if (!current[part]) {
                current[part] = {};
            } else if (typeof current[part] !== 'object' || Array.isArray(current[part])) {
                // If we've already assigned a primitive value here, combine with next part
                if (i < parts.length - 1) {
                    const combinedPart = part + parts[i + 1];
                    if (!current[combinedPart]) {
                        current[combinedPart] = {};
                    }
                    current = current[combinedPart];
                    i++; // Skip next part
                    continue;
                }
                console.warn(`Skipping token ${key}: conflict at ${part} (already has value)`);
                return;
            }
            current = current[part];
        }

        const lastPart = parts[parts.length - 1];
        // Check if we're trying to assign to a non-object
        if (typeof current === 'object' && !Array.isArray(current)) {
            current[lastPart] = flatTokens[key];
        } else {
            console.warn(`Skipping token ${key}: cannot assign to ${typeof current}`);
        }
    });

    return nested;
}

const nestedTokens = nestTokens(tokens);

// Ensure dist directory exists
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Write tokens.json
fs.writeFileSync(
    path.join(distDir, 'tokens.json'),
    JSON.stringify(nestedTokens, null, 2)
);

// Generate TypeScript definitions
// Note: Function kept for future TypeScript definitions export
// eslint-disable-next-line no-unused-vars
function generateTypeScript(tokens, indent = 0) {
    const spaces = '  '.repeat(indent);
    let output = '';

    Object.keys(tokens).forEach(key => {
        const value = tokens[key];
        const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

        if (typeof value === 'object' && value !== null) {
            output += `${spaces}${camelKey}: {\n`;
            output += generateTypeScript(value, indent + 1);
            output += `${spaces}},\n`;
        } else {
            // Token value (always stringified as JSON)
            output += `${spaces}${camelKey}: ${JSON.stringify(value)};\n`;
        }
    });

    return output;
}

const tsDefinitions = `/**
 * Neo-Analog Design System Tokens
 * Auto-generated from input.css
 * 
 * @generated
 */

export const tokens = ${JSON.stringify(nestedTokens, null, 2)} as const;

export type Tokens = typeof tokens;

// CSS Variable Helpers
export function getCSSVar(path: string): string {
  return \`var(--\${path.replace(/\\./g, '-')})\`;
}

// Token Path Types
${generateTokenPathTypes(nestedTokens)}
`;

// Generate token path types
function generateTokenPathTypes(tokens, prefix = '') {
    let paths = [];

    Object.keys(tokens).forEach(key => {
        const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        const fullPath = prefix ? `${prefix}.${camelKey}` : camelKey;
        const value = tokens[key];

        if (typeof value === 'object' && value !== null) {
            paths = paths.concat(generateTokenPathTypes(value, fullPath));
        } else {
            paths.push(`  | '${fullPath}'`);
        }
    });

    return `export type TokenPath =\n${paths.join('\n')};\n`;
}

// Write TypeScript definitions
const tokensDir = path.join(distDir, 'tokens');
if (!fs.existsSync(tokensDir)) {
    fs.mkdirSync(tokensDir, { recursive: true });
}

fs.writeFileSync(
    path.join(tokensDir, 'index.d.ts'),
    tsDefinitions
);

// Also create index.ts for runtime access
const tsRuntime = `/**
 * Neo-Analog Design System Tokens (Runtime)
 * Auto-generated from input.css
 */

import tokensData from '../tokens.json';

export const tokens = tokensData as const;

export type Tokens = typeof tokens;

export function getCSSVar(path: string): string {
  return \`var(--\${path.replace(/\\./g, '-')})\`;
}
`;

fs.writeFileSync(
    path.join(tokensDir, 'index.ts'),
    tsRuntime
);

// Extract semantic classes from input.css for headless map
function extractSemanticClasses(cssContent) {
  const classMap = {};
  
  // Match .na-* class definitions
  const classRegex = /\.(na-[a-z0-9-]+)\s*\{([^}]+)\}/g;
  let match;
  
  while ((match = classRegex.exec(cssContent)) !== null) {
    const className = match[1];
    const classBody = match[2];
    
    // Extract CSS properties
    const properties = {};
    const propRegex = /([a-z-]+)\s*:\s*([^;]+);/g;
    let propMatch;
    
    while ((propMatch = propRegex.exec(classBody)) !== null) {
      const prop = propMatch[1].trim();
      let value = propMatch[2].trim();
      
      // Clean up value (remove comments, @apply, etc.)
      value = value
        .replace(/\/\*.*?\*\//g, '')
        .replace(/@apply\s+/g, '')
        .trim();
      
      if (value && !value.includes('@')) {
        properties[prop] = value;
      }
    }
    
    if (Object.keys(properties).length > 0) {
      classMap[className] = properties;
    }
  }
  
  return classMap;
}

// Generate headless map
const semanticClasses = extractSemanticClasses(inputCSS);
const headlessMap = {
  version: '1.0.0',
  generated: new Date().toISOString(),
  classes: semanticClasses,
  tokens: nestedTokens,
};

// Write headless-map.json
fs.writeFileSync(
  path.join(distDir, 'headless-map.json'),
  JSON.stringify(headlessMap, null, 2)
);

console.log('✅ Tokens extracted successfully!');
console.log(`   - ${Object.keys(tokens).length} tokens found`);
console.log(`   - ${Object.keys(semanticClasses).length} semantic classes extracted`);
console.log(`   - Written to: dist/tokens.json`);
console.log(`   - Written to: dist/headless-map.json`);
console.log(`   - TypeScript definitions: dist/tokens/index.d.ts`);

