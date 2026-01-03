#!/usr/bin/env node

/**
 * Convert input.css to JSON for revision
 * Extracts all tokens, keyframes, classes, and structure
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

const output = {
    metadata: {
        version: '1.0.0',
        generated: new Date().toISOString(),
        source: 'input.css',
        description: 'Neo-Analog Design System - Comfort Edition',
        philosophy: '15px Base, 24px Padding, Editorial Hierarchy',
        compliance: 'Figma Design System Standards: 100% COMPLIANCE'
    },
    theme: {},
    keyframes: {},
    base: {},
    utilities: {},
    components: {},
    structure: {
        sections: [],
        canonical: [],
        deprecated: []
    }
};

// Extract @theme block
const themeRegex = /@theme\s*\{([\s\S]*?)\}/;
const themeMatch = inputCSS.match(themeRegex);

if (themeMatch) {
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
        
        // Extract comment if present
        const commentMatch = value.match(/\/\*([^*]+)\*\//);
        const comment = commentMatch ? commentMatch[1].trim() : null;
        
        tokens[key.trim()] = {
            value: cleanValue,
            comment: comment
        };
    }
    
    // Organize tokens by category
    const categories = {
        primitives: {
            color: {},
            typography: {},
            spacing: {},
            radius: {},
            shadow: {},
            blur: {},
            opacity: {},
            motion: {},
            zIndex: {}
        },
        semantic: {},
        extensions: {}
    };
    
    Object.keys(tokens).forEach(key => {
        const token = tokens[key];
        
        if (key.startsWith('color-')) {
            const subKey = key.replace('color-', '');
            categories.primitives.color[subKey] = token;
        } else if (key.startsWith('font-')) {
            const subKey = key.replace('font-', '');
            categories.primitives.typography[subKey] = token;
        } else if (key.startsWith('spacing-')) {
            const subKey = key.replace('spacing-', '');
            categories.primitives.spacing[subKey] = token;
        } else if (key.startsWith('radius-')) {
            const subKey = key.replace('radius-', '');
            categories.primitives.radius[subKey] = token;
        } else if (key.startsWith('shadow-')) {
            const subKey = key.replace('shadow-', '');
            categories.primitives.shadow[subKey] = token;
        } else if (key.startsWith('blur-')) {
            const subKey = key.replace('blur-', '');
            categories.primitives.blur[subKey] = token;
        } else if (key.startsWith('opacity-')) {
            const subKey = key.replace('opacity-', '');
            categories.primitives.opacity[subKey] = token;
        } else if (key.startsWith('ease-')) {
            const subKey = key.replace('ease-', '');
            if (!categories.primitives.motion.easing) {
                categories.primitives.motion.easing = {};
            }
            categories.primitives.motion.easing[subKey] = token;
        } else if (key.startsWith('duration-')) {
            const subKey = key.replace('duration-', '');
            if (!categories.primitives.motion.duration) {
                categories.primitives.motion.duration = {};
            }
            categories.primitives.motion.duration[subKey] = token;
        } else if (key.startsWith('animate-')) {
            const subKey = key.replace('animate-', '');
            if (!categories.primitives.motion.animations) {
                categories.primitives.motion.animations = {};
            }
            categories.primitives.motion.animations[subKey] = token;
        } else if (key.startsWith('z-')) {
            const subKey = key.replace('z-', '');
            categories.primitives.zIndex[subKey] = token;
        } else if (key.startsWith('heading-') || key.startsWith('data-') || key.startsWith('metadata-')) {
            categories.extensions[key] = token;
        } else {
            categories.semantic[key] = token;
        }
    });
    
    output.theme = categories;
}

// Extract keyframes
const keyframeRegex = /@keyframes\s+([a-z-]+)\s*\{([^}]+)\}/g;
const keyframes = {};
let keyframeMatch;

while ((keyframeMatch = keyframeRegex.exec(inputCSS)) !== null) {
    const [, name, body] = keyframeMatch;
    const steps = {};
    
    // Parse keyframe steps
    const stepRegex = /(from|to|\d+%)\s*\{([^}]+)\}/g;
    let stepMatch;
    
    while ((stepMatch = stepRegex.exec(body)) !== null) {
        const [, step, props] = stepMatch;
        const properties = {};
        
        const propRegex = /([a-z-]+)\s*:\s*([^;]+);/g;
        let propMatch;
        
        while ((propMatch = propRegex.exec(props)) !== null) {
            properties[propMatch[1].trim()] = propMatch[2].trim();
        }
        
        steps[step] = properties;
    }
    
    keyframes[name] = steps;
}

output.keyframes = keyframes;

// Extract @layer base
const baseLayerRegex = /@layer\s+base\s*\{([\s\S]*?)\}(?=\s*@layer|\s*$)/;
const baseMatch = inputCSS.match(baseLayerRegex);

if (baseMatch) {
    const baseContent = baseMatch[1];
    const baseRules = {};
    
    // Extract rules
    const ruleRegex = /([^{]+)\{([^}]+)\}/g;
    let ruleMatch;
    
    while ((ruleMatch = ruleRegex.exec(baseContent)) !== null) {
        const selector = ruleMatch[1].trim();
        const body = ruleMatch[2];
        const properties = {};
        
        const propRegex = /([a-z-]+)\s*:\s*([^;]+);/g;
        let propMatch;
        
        while ((propMatch = propRegex.exec(body)) !== null) {
            properties[propMatch[1].trim()] = propMatch[2].trim();
        }
        
        baseRules[selector] = properties;
    }
    
    output.base = baseRules;
}

// Extract @layer utilities
const utilitiesLayerRegex = /@layer\s+utilities\s*\{([\s\S]*?)\}(?=\s*@layer|\s*$)/;
const utilitiesMatch = inputCSS.match(utilitiesLayerRegex);

if (utilitiesMatch) {
    const utilitiesContent = utilitiesMatch[1];
    const utilityClasses = {};
    
    const classRegex = /\.([a-z-]+)\s*\{([^}]+)\}/g;
    let classMatch;
    
    while ((classMatch = classRegex.exec(utilitiesContent)) !== null) {
        const className = classMatch[1];
        const body = classMatch[2];
        const properties = {};
        
        const propRegex = /([a-z-]+)\s*:\s*([^;]+);/g;
        let propMatch;
        
        while ((propMatch = propRegex.exec(body)) !== null) {
            properties[propMatch[1].trim()] = propMatch[2].trim();
        }
        
        utilityClasses[className] = properties;
    }
    
    output.utilities = utilityClasses;
}

// Extract @layer components
const componentsLayerRegex = /@layer\s+components\s*\{([\s\S]*?)\}(?=\s*@layer|\s*$)/;
const componentsMatch = inputCSS.match(componentsLayerRegex);

if (componentsMatch) {
    const componentsContent = componentsMatch[1];
    const componentClasses = {};
    
    // Extract classes with their full definitions including pseudo-selectors
    const classBlockRegex = /(?:^|\n)\s*\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\/\s*\n\s*\.([a-z-]+)(?:\s*,\s*\.([a-z-]+))?\s*\{([^}]+)\}/gm;
    let classBlockMatch;
    
    while ((classBlockMatch = classBlockRegex.exec(componentsContent)) !== null) {
        const className = classBlockMatch[1];
        const body = classBlockMatch[3];
        
        if (!componentClasses[className]) {
            componentClasses[className] = {
                properties: {},
                pseudoSelectors: {},
                mediaQueries: {}
            };
        }
        
        const propRegex = /([a-z-]+)\s*:\s*([^;]+);/g;
        let propMatch;
        
        while ((propMatch = propRegex.exec(body)) !== null) {
            componentClasses[className].properties[propMatch[1].trim()] = propMatch[2].trim();
        }
    }
    
    // Also extract simple class definitions
    const simpleClassRegex = /\.([a-z-]+)\s*\{([^}]+)\}/g;
    let simpleMatch;
    
    while ((simpleMatch = simpleClassRegex.exec(componentsContent)) !== null) {
        const className = simpleMatch[1];
        const body = simpleMatch[2];
        
        if (!componentClasses[className]) {
            componentClasses[className] = {
                properties: {},
                pseudoSelectors: {},
                mediaQueries: {}
            };
        }
        
        const propRegex = /([a-z-]+)\s*:\s*([^;]+);/g;
        let propMatch;
        
        while ((propMatch = propRegex.exec(body)) !== null) {
            componentClasses[className].properties[propMatch[1].trim()] = propMatch[2].trim();
        }
    }
    
    // Extract pseudo-selectors
    const pseudoRegex = /\.([a-z-]+)(:hover|:focus|:active|:focus-visible|::before|::after)\s*\{([^}]+)\}/g;
    let pseudoMatch;
    
    while ((pseudoMatch = pseudoRegex.exec(componentsContent)) !== null) {
        const className = pseudoMatch[1];
        const pseudo = pseudoMatch[2];
        const body = pseudoMatch[3];
        
        if (!componentClasses[className]) {
            componentClasses[className] = {
                properties: {},
                pseudoSelectors: {},
                mediaQueries: {}
            };
        }
        
        const properties = {};
        const propRegex = /([a-z-]+)\s*:\s*([^;]+);/g;
        let propMatch;
        
        while ((propMatch = propRegex.exec(body)) !== null) {
            properties[propMatch[1].trim()] = propMatch[2].trim();
        }
        
        componentClasses[className].pseudoSelectors[pseudo] = properties;
    }
    
    output.components = componentClasses;
}

// Extract CANONICAL and DEPRECATED markers
const canonicalRegex = /CANONICAL:\s*([^\n*]+)/g;
let canonicalMatch;
while ((canonicalMatch = canonicalRegex.exec(inputCSS)) !== null) {
    const lineNum = inputCSS.substring(0, canonicalMatch.index).split('\n').length;
    output.structure.canonical.push({
        title: canonicalMatch[1].trim(),
        line: lineNum
    });
}

const deprecatedRegex = /DEPRECATED[^*]*?:\s*([^\n*]+)/g;
let deprecatedMatch;
while ((deprecatedMatch = deprecatedRegex.exec(inputCSS)) !== null) {
    const lineNum = inputCSS.substring(0, deprecatedMatch.index).split('\n').length;
    output.structure.deprecated.push({
        note: deprecatedMatch[1].trim(),
        line: lineNum
    });
}

// Write JSON file
const outputPath = path.join(rootDir, 'input.css.json');
fs.writeFileSync(
    outputPath,
    JSON.stringify(output, null, 2)
);

console.log('✅ input.css converted to JSON successfully!');
console.log(`   - Written to: ${outputPath}`);
console.log(`   - Theme tokens: ${Object.keys(output.theme.primitives || {}).length} categories`);
console.log(`   - Keyframes: ${Object.keys(output.keyframes).length}`);
console.log(`   - Utility classes: ${Object.keys(output.utilities).length}`);
console.log(`   - Component classes: ${Object.keys(output.components).length}`);
console.log(`   - Canonical markers: ${output.structure.canonical.length}`);
console.log(`   - Deprecated markers: ${output.structure.deprecated.length}`);

