#!/usr/bin/env node
/**
 * Generate Component Documentation
 * 
 * Generates component documentation from React component source files
 * Output: docs/COMPONENTS.md
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const componentsDir = join(process.cwd(), 'components', 'react');
const outputFile = join(process.cwd(), 'docs', 'COMPONENTS.md');

if (!existsSync(componentsDir)) {
  console.error('❌ components/react directory not found');
  process.exit(1);
}

function findComponentFiles(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      findComponentFiles(fullPath, files);
    } else if (entry.name.endsWith('.tsx') && !entry.name.endsWith('.test.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function extractComponentInfo(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const relativePath = filePath.replace(process.cwd(), '').replace(/\\/g, '/');
  
  // Extract component name from file
  const fileName = filePath.split(/[/\\]/).pop()?.replace('.tsx', '') || 'Unknown';
  const componentName = fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Extract JSDoc comment
  const jsdocMatch = content.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
  const jsdocContent = jsdocMatch ? jsdocMatch[1] : '';
  
  // Extract description (lines before @ tags)
  const description = jsdocContent
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, '').trim())
    .filter(line => line && !line.startsWith('@'))
    .join(' ')
    || `Component: ${componentName}`;
  
  // Extract @example blocks from JSDoc
  const exampleMatches = jsdocContent.match(/@example\s*([\s\S]*?)(?=@|\*\/|$)/g);
  const jsdocExamples = exampleMatches 
    ? exampleMatches.map(ex => {
        const codeMatch = ex.match(/```[\w]*\n([\s\S]*?)```/);
        if (codeMatch) {
          return codeMatch[1]
            .split('\n')
            .map(line => line.replace(/^\s*\*\s?/, '').trim())
            .filter(line => line && !line.startsWith('*'))
            .join('\n')
            .trim();
        }
        return ex.replace(/@example\s*/, '').replace(/^\s*\*\s?/gm, '').trim();
      })
    : [];
  
  // Extract props interface - try multiple patterns
  // Pattern 1: ComponentNameProps (most common)
  let propsInterfaceMatch = content.match(new RegExp(`interface\\s+${componentName}Props\\s*[\\s\\S]*?\\{([\\s\\S]*?)\\}(?=\\s*(?:export|const|function|type|interface|\\/\\*))`, 'm'));
  
  // Pattern 2: Any *Props interface
  if (!propsInterfaceMatch) {
    propsInterfaceMatch = content.match(/interface\s+(\w+Props)\s*[^{]*\{([\s\S]*?)\}(?=\s*(?:export|const|function|type|interface|\/\*))/);
  }
  
  // Pattern 3: Props interface that extends something
  if (!propsInterfaceMatch) {
    propsInterfaceMatch = content.match(/interface\s+(\w+Props)\s+extends[^{]*\{([\s\S]*?)\}(?=\s*(?:export|const|function|type|interface|\/\*))/);
  }
  
  const props = propsInterfaceMatch 
    ? extractPropsFromInterface(propsInterfaceMatch[propsInterfaceMatch.length - 1], content)
    : [];
  
  // Extract default values from function parameters
  const functionDefaults = extractDefaultValuesFromFunction(content, componentName);
  
  // Merge default values from function into props (function defaults override JSDoc defaults)
  props.forEach(prop => {
    if (functionDefaults[prop.name] !== undefined) {
      // Function parameter defaults take precedence
      prop.defaultValue = functionDefaults[prop.name];
    } else if (!prop.defaultValue) {
      // If no default found yet, keep JSDoc default if it's a simple value
      if (prop.defaultValue && prop.defaultValue.length > 30) {
        // Too long/complex, don't use it
        prop.defaultValue = null;
      }
    }
  });
  
  // Extract exports
  const exportMatch = content.match(/export\s+(?:const|function)\s+(\w+)/);
  const exportName = exportMatch ? exportMatch[1] : componentName;
  
  // Find example usage in tests
  const testExample = findExampleUsage(filePath);
  
  // Combine examples (JSDoc examples first, then test examples)
  const allExamples = [...jsdocExamples, testExample].filter(Boolean);
  
  return {
    name: componentName,
    fileName,
    exportName,
    description,
    props,
    examples: allExamples,
    example: allExamples[0] || null, // Keep for backward compatibility
    filePath: relativePath,
  };
}

function extractPropsFromInterface(interfaceContent, fullContent = '') {
  const props = [];
  
  // Match prop definitions with their preceding JSDoc comments
  // Pattern: /** ... */ followed by propName?: type; or propName?: type = defaultValue;
  // Also handle quoted property names like 'aria-live'
  const propPattern = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*['"]?(\w+)['"]?(\??):\s*([^;=]+)(?:=\s*([^;]+))?;/g;
  let match;
  
  const processedProps = new Set();
  
  while ((match = propPattern.exec(interfaceContent)) !== null) {
    const [, jsdocContent, name, optional, type, defaultValue] = match;
    
    // Extract description from JSDoc (lines before @ tags)
    let propDescription = jsdocContent
      .split('\n')
      .map(line => line.replace(/^\s*\*\s?/, '').trim())
      .filter(line => line && !line.startsWith('@'))
      .join(' ')
      .trim();
    
    // Extract default value from JSDoc if mentioned (e.g., "Default: true")
    // But remove it from description to avoid duplication
    let defaultFromJSDoc = null;
    const defaultMatch = propDescription.match(/[Dd]efault:\s*([^\n.()]+)/);
    if (defaultMatch) {
      const defaultText = defaultMatch[1].trim();
      // Only use if it's a simple value (true, false, number, simple string)
      if (/^(true|false|null|undefined|\d+|'[^']+'|"[^"]+"|\w+)$/.test(defaultText)) {
        defaultFromJSDoc = defaultText.replace(/^['"]|['"]$/g, '');
        // Remove "Default: ..." from description
        propDescription = propDescription.replace(/[Dd]efault:\s*[^\n.()]+/g, '').trim();
      }
    }
    
    // Clean type (remove default value if present)
    const cleanType = type.trim();
    
    // Determine final default value (prefer interface default, then JSDoc default)
    let finalDefault = null;
    if (defaultValue) {
      finalDefault = defaultValue.trim().replace(/^['"]|['"]$/g, '');
    } else if (defaultFromJSDoc) {
      // Clean up JSDoc default (remove parentheses, extra text)
      finalDefault = defaultFromJSDoc.replace(/^\(|\)$/g, '').replace(/['"]/g, '').trim();
      // If it's a long description, try to extract just the value
      if (finalDefault.length > 30) {
        // Try to extract a simple value from the description
        const valueMatch = finalDefault.match(/(?:default|is|uses)\s*['"]?([^'"]{1,20})['"]?/i);
        if (valueMatch && valueMatch[1].length <= 20) {
          finalDefault = valueMatch[1].trim();
        } else {
          // If we can't extract a simple value, just use first word or common defaults
          const firstWord = finalDefault.split(/\s+/)[0];
          if (['true', 'false', 'null', 'undefined'].includes(firstWord.toLowerCase())) {
            finalDefault = firstWord.toLowerCase();
          } else {
            // Too complex, don't show default
            finalDefault = null;
          }
        }
      }
    }
    
    props.push({
      name,
      type: cleanType,
      optional: optional === '?',
      description: propDescription || '-',
      defaultValue: finalDefault,
    });
    
    processedProps.add(name);
  }
  
  // Also match props without JSDoc (for completeness)
  // Handle both regular and quoted property names
  const propsWithoutDoc = interfaceContent.match(/(?:^|\n)\s*['"]?(\w+)['"]?(\??):\s*([^;=]+)(?:=\s*([^;]+))?;/g);
  if (propsWithoutDoc) {
    propsWithoutDoc.forEach(propLine => {
      const propMatch = propLine.match(/['"]?(\w+)['"]?(\??):\s*([^;=]+)(?:=\s*([^;]+))?;/);
      if (propMatch) {
        const [, name, optional, type, defaultValue] = propMatch;
        // Only add if not already in props (from JSDoc extraction)
        if (!processedProps.has(name)) {
          props.push({
            name,
            type: type.trim(),
            optional: optional === '?',
            description: '-',
            defaultValue: defaultValue ? defaultValue.trim().replace(/^['"]|['"]$/g, '') : null,
          });
        }
      }
    });
  }
  
  return props;
}

function extractDefaultValuesFromFunction(content, componentName) {
  const defaults = {};
  
  // Find the component function definition
  // Pattern 1: export function ComponentName({ prop = value, ... }: Type)
  // Pattern 2: export const ComponentName = ({ prop = value, ... }: Type) =>
  // We need to match the destructured params before the type annotation
  const functionPattern1 = new RegExp(`export\\s+function\\s+${componentName}\\s*\\(\\{([\\s\\S]*?)\\}`, 'm');
  const functionPattern2 = new RegExp(`export\\s+(?:const|function)\\s+${componentName}\\s*=\\s*\\(\\{([\\s\\S]*?)\\}`, 'm');
  
  let params = '';
  const match1 = content.match(functionPattern1);
  const match2 = content.match(functionPattern2);
  
  if (match1) {
    // Extract up to the closing brace or type annotation
    params = match1[1].split(/:|}/)[0];
  } else if (match2) {
    params = match2[1].split(/:|}/)[0];
  }
  
  if (params) {
    // Extract default values from destructured parameters
    // Pattern: propName = defaultValue or 'prop-name' = defaultValue
    // Stop at closing brace, rest operator, or type annotation
    const defaultPattern = /['"]?(\w+)['"]?\s*=\s*([^,}]+?)(?=\s*[,}])/g;
    let match;
    
    while ((match = defaultPattern.exec(params)) !== null) {
      const [, name, value] = match;
      // Clean up the value (remove quotes, trim)
      let cleanValue = value.trim();
      
      // Remove surrounding quotes
      cleanValue = cleanValue.replace(/^['"]|['"]$/g, '');
      
      // If it's a simple literal (string, number, boolean, null), keep it
      // Check if it's a simple value first
      const simpleValuePattern = /^(['"]?)(true|false|null|undefined|\d+|\w+)\1$/;
      const simpleMatch = cleanValue.match(simpleValuePattern);
      
      if (simpleMatch) {
        // It's a simple value, use it
        cleanValue = simpleMatch[2];
        defaults[name] = cleanValue;
      } else if (cleanValue.length <= 30) {
        // Short enough, might be valid
        defaults[name] = cleanValue;
      }
      // If too long/complex, skip it
    }
  }
  
  return defaults;
}

function findExampleUsage(componentPath) {
  // Look for test file
  const testPath = componentPath.replace('.tsx', '.test.tsx');
  if (existsSync(testPath)) {
    const testContent = readFileSync(testPath, 'utf-8');
    const exampleMatch = testContent.match(/<(\w+)[^>]*>[\s\S]*?<\/\1>/);
    if (exampleMatch) {
      return exampleMatch[0].trim();
    }
  }
  
  // Look in examples directory
  const examplesDir = join(process.cwd(), 'examples', 'react');
  if (existsSync(examplesDir)) {
    const exampleFiles = readdirSync(examplesDir);
    for (const file of exampleFiles) {
      if (file.includes(componentPath.split(/[/\\]/).pop()?.replace('.tsx', ''))) {
        const exampleContent = readFileSync(join(examplesDir, file), 'utf-8');
        const exampleMatch = exampleContent.match(/<(\w+)[^>]*>[\s\S]*?<\/\1>/);
        if (exampleMatch) {
          return exampleMatch[0].trim();
        }
      }
    }
  }
  
  return null;
}

function generateMarkdown(components) {
  const timestamp = new Date().toISOString();
  
  let markdown = `# Component Reference

> **Auto-generated** from React component source files  
> **Last updated**: ${timestamp}  
> **Source**: \`components/react/\`

---

## Overview

This document provides a complete reference for all React components in the Neo-Analog Design System.

**Total Components**: ${components.length}

---

`;

  // Group components by category (if we can determine categories)
  const categories = groupComponentsByCategory(components);
  
  for (const [category, categoryComponents] of Object.entries(categories)) {
    markdown += `## ${category}\n\n`;
    
    for (const component of categoryComponents) {
      markdown += generateComponentSection(component);
    }
  }

  markdown += `
---

## Usage

All components are exported from \`@aibos/design-system/react\`:

\`\`\`typescript
import { ${components.map(c => c.exportName).join(', ')} } from '@aibos/design-system/react';
\`\`\`

---

**Generated by**: \`scripts/generate-component-docs.js\`  
**Source**: \`components/react/\`
`;

  return markdown;
}

function groupComponentsByCategory(components) {
  const categories = {
    'Layout': [],
    'Forms': [],
    'Display': [],
    'Navigation': [],
    'Feedback': [],
    'Other': [],
  };
  
  for (const component of components) {
    const name = component.name.toLowerCase();
    if (name.includes('card') || name.includes('panel') || name.includes('shell') || name.includes('grid')) {
      categories['Layout'].push(component);
    } else if (name.includes('button') || name.includes('input') || name.includes('select') || name.includes('form')) {
      categories['Forms'].push(component);
    } else if (name.includes('badge') || name.includes('avatar') || name.includes('separator')) {
      categories['Display'].push(component);
    } else if (name.includes('menu') || name.includes('nav') || name.includes('tabs')) {
      categories['Navigation'].push(component);
    } else if (name.includes('dialog') || name.includes('toast') || name.includes('alert')) {
      categories['Feedback'].push(component);
    } else {
      categories['Other'].push(component);
    }
  }
  
  // Remove empty categories
  return Object.fromEntries(
    Object.entries(categories).filter(([, comps]) => comps.length > 0)
  );
}

function generateComponentSection(component) {
  let section = `### ${component.name}

${component.description}

**File**: \`${component.filePath}\`  
**Export**: \`${component.exportName}\`

`;

  if (component.props.length > 0) {
    section += `#### Props\n\n| Prop | Type | Required | Default | Description |\n|------|------|----------|---------|-------------|\n`;
    for (const prop of component.props) {
      const defaultVal = prop.defaultValue ? `\`${prop.defaultValue}\`` : '-';
      const description = prop.description || '-';
      section += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.optional ? 'No' : 'Yes'} | ${defaultVal} | ${description} |\n`;
    }
    section += '\n';
  }

  // Show all examples if available
  if (component.examples && component.examples.length > 0) {
    if (component.examples.length === 1) {
      section += `#### Example\n\n\`\`\`tsx\n${component.examples[0]}\n\`\`\`\n\n`;
    } else {
      section += `#### Examples\n\n`;
      component.examples.forEach((example, index) => {
        section += `**Example ${index + 1}:**\n\n\`\`\`tsx\n${example}\n\`\`\`\n\n`;
      });
    }
  } else if (component.example) {
    // Fallback to single example for backward compatibility
    section += `#### Example\n\n\`\`\`tsx\n${component.example}\n\`\`\`\n\n`;
  }

  section += '---\n\n';
  return section;
}

// Generate documentation
try {
  const componentFiles = findComponentFiles(componentsDir);
  const components = componentFiles.map(extractComponentInfo);
  
  const markdown = generateMarkdown(components);
  writeFileSync(outputFile, markdown, 'utf-8');
  
  console.log('✅ Component documentation generated: docs/COMPONENTS.md');
  console.log(`   - ${components.length} components documented`);
} catch (error) {
  console.error('❌ Error generating component docs:', error.message);
  process.exit(1);
}

