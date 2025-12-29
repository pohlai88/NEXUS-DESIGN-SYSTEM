#!/usr/bin/env node
/**
 * Design Token Validation Script
 * Enterprise Quality Control - Similar to Salesforce/Palantir validation
 * 
 * Validates:
 * 1. Design token usage (prevents hardcoded values)
 * 2. Component class usage (prevents arbitrary styling)
 * 3. Typography hierarchy (prevents drift)
 * 4. Color usage (prevents non-token colors)
 * 5. CSS class name validation (detects invalid class names)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Extract valid CSS classes from input.css
function extractValidClasses(cssContent) {
    const classes = new Set();
    
    // Match class selectors: .na-class-name { or .na-class-name:state { or .na-class-name, .other-class {
    // This pattern matches:
    // - .na- followed by lowercase letters, numbers, and hyphens
    // - Optional pseudo-classes like :hover, :focus-visible
    // - Optional combinators or commas
    // - Followed by whitespace, comma, opening brace, or end of line
    const classPattern = /\.(na-[a-z0-9-]+)(?::[a-z-]+)?(?=\s*[,{.\s]|$)/g;
    
    let match;
    while ((match = classPattern.exec(cssContent)) !== null) {
        const className = match[1]; // Extract just the class name (group 1)
        if (className && className.startsWith('na-')) {
            classes.add(className);
        }
    }
    
    // Also extract classes from multi-selector rules like ".na-class1, .na-class2 {"
    const multiSelectorPattern = /\.(na-[a-z0-9-]+)(?::[a-z-]+)?/g;
    let multiMatch;
    while ((multiMatch = multiSelectorPattern.exec(cssContent)) !== null) {
        const className = multiMatch[1];
        if (className && className.startsWith('na-')) {
            classes.add(className);
        }
    }
    
    return classes;
}

// Load valid classes from input.css
let VALID_CLASSES = new Set();
try {
    // Resolve path to input.css relative to script location
    const inputCssPath = resolve(__dirname, '..', 'input.css');
    const cssContent = readFileSync(inputCssPath, 'utf-8');
    VALID_CLASSES = extractValidClasses(cssContent);
    // Also add common Tailwind classes that are allowed
    VALID_CLASSES.add('flex');
    VALID_CLASSES.add('grid');
    VALID_CLASSES.add('items-center');
    VALID_CLASSES.add('justify-between');
    VALID_CLASSES.add('gap-2');
    VALID_CLASSES.add('gap-4');
    VALID_CLASSES.add('gap-8');
    VALID_CLASSES.add('p-4');
    VALID_CLASSES.add('p-6');
    VALID_CLASSES.add('px-4');
    VALID_CLASSES.add('px-6');
    VALID_CLASSES.add('py-4');
    VALID_CLASSES.add('mt-4');
    VALID_CLASSES.add('mb-4');
    VALID_CLASSES.add('w-full');
    VALID_CLASSES.add('h-full');
} catch {
    // CSS loading failed, will validate what we can
}

const FORBIDDEN_PATTERNS = [
    // Hardcoded font sizes (should use tokens)
    { pattern: /text-\[\d+px\]/g, message: 'Hardcoded font size - use typography tokens (.na-h1, .na-h2, etc.)' },
    { pattern: /font-size:\s*\d+px/g, message: 'Hardcoded font-size - use CSS custom properties' },

    // Hardcoded colors (should use tokens)
    { pattern: /#[0-9a-fA-F]{3,6}(?![\w-])/g, message: 'Hardcoded hex color - use color tokens (--color-*)' },
    { pattern: /rgb\([^)]+\)(?![\w-])/g, message: 'Hardcoded RGB color - use color tokens' },

    // Arbitrary spacing (should use tokens)
    { pattern: /(?:p|m|gap|top|right|bottom|left)-\[\d+px\]/g, message: 'Hardcoded spacing - use spacing tokens' },

    // Arbitrary border-radius (should use tokens)
    { pattern: /rounded-\[\d+px\]/g, message: 'Hardcoded border-radius - use radius tokens' },
];

function scanFile(filePath) {
    const content = readFileSync(filePath, 'utf-8');
    const issues = [];

    // Check for forbidden patterns
    FORBIDDEN_PATTERNS.forEach(({ pattern, message }) => {
        const matches = content.matchAll(pattern);
        for (const match of matches) {
            const lineNumber = content.substring(0, match.index).split('\n').length;
            issues.push({
                file: filePath,
                line: lineNumber,
                message,
                match: match[0],
                type: 'pattern'
            });
        }
    });

    // Check for invalid CSS class names in HTML files
    if (filePath.endsWith('.html')) {
        const classPattern = /class=["']([^"']+)["']/g;
        const classMatches = content.matchAll(classPattern);
        
        for (const match of classMatches) {
            const lineNumber = content.substring(0, match.index).split('\n').length;
            const classAttr = match[1];
            const classes = classAttr.split(/\s+/).filter(c => c.trim());
            
            classes.forEach(className => {
                // Check if it's a na-* class
                if (className.startsWith('na-')) {
                    // Check for common typos
                    if (className.includes('_') || className.match(/[A-Z]/)) {
                        issues.push({
                            file: filePath,
                            line: lineNumber,
                            message: `Invalid CSS class name: "${className}" - na-* classes should be lowercase with hyphens only`,
                            match: className,
                            type: 'class-name'
                        });
                    } else if (!VALID_CLASSES.has(className) && !className.includes(':')) {
                        // Check if it's a valid class (allow pseudo-classes like :hover)
                        const baseClass = className.split(':')[0];
                        if (!VALID_CLASSES.has(baseClass)) {
                            // Check if it's a close match (typo detection)
                            const closeMatches = Array.from(VALID_CLASSES).filter(c => {
                                const distance = levenshteinDistance(baseClass, c);
                                return distance <= 2 && c.startsWith('na-');
                            });
                            
                            if (closeMatches.length > 0) {
                                issues.push({
                                    file: filePath,
                                    line: lineNumber,
                                    message: `Invalid CSS class name: "${className}" - Did you mean "${closeMatches[0]}"?`,
                                    match: className,
                                    type: 'class-name',
                                    suggestion: closeMatches[0]
                                });
                            } else {
                                issues.push({
                                    file: filePath,
                                    line: lineNumber,
                                    message: `Invalid CSS class name: "${className}" - Class not found in design system`,
                                    match: className,
                                    type: 'class-name'
                                });
                            }
                        }
                    }
                }
            });
        }
    }

    return issues;
}

// Simple Levenshtein distance for typo detection
function levenshteinDistance(str1, str2) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2[i - 1] === str1[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[str2.length][str1.length];
}

function findHtmlFiles(dir = '.') {
    const files = [];
    try {
        const entries = readdirSync(dir);
        for (const entry of entries) {
            const fullPath = join(dir, entry);
            try {
                const stat = statSync(fullPath);
                if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
                    files.push(...findHtmlFiles(fullPath));
                } else if (entry.endsWith('.html')) {
                    files.push(fullPath);
                }
            } catch {}
        }
    } catch {}
    return files;
}

function validateDesignTokens() {
    const htmlFiles = findHtmlFiles('.');
    const allIssues = [];

    console.log('🔍 Validating design token usage...\n');
    console.log(`📁 Found ${htmlFiles.length} HTML file(s) to validate\n`);

    htmlFiles.forEach(file => {
        const issues = scanFile(file);
        allIssues.push(...issues);
    });

    if (allIssues.length === 0) {
        console.log('✅ No design drift detected! All values use design tokens.');
        console.log('✅ All CSS class names are valid.\n');
        return 0;
    }

    // Group issues by type
    const patternIssues = allIssues.filter(i => i.type === 'pattern');
    const classIssues = allIssues.filter(i => i.type === 'class-name');

    if (patternIssues.length > 0) {
        console.log(`⚠️  Found ${patternIssues.length} design token issues:\n`);
        patternIssues.forEach(({ file, line, message, match }) => {
            console.log(`  ${file}:${line}`);
            console.log(`    ${message}`);
            console.log(`    Found: ${match}\n`);
        });
    }

    if (classIssues.length > 0) {
        console.log(`❌ Found ${classIssues.length} invalid CSS class name(s):\n`);
        classIssues.forEach(({ file, line, message, match, suggestion }) => {
            console.log(`  ${file}:${line}`);
            console.log(`    ${message}`);
            if (suggestion) {
                console.log(`    💡 Suggestion: Use "${suggestion}" instead\n`);
            } else {
                console.log(`    Found: "${match}"\n`);
            }
        });
    }

    console.log('💡 Recommendation: Replace hardcoded values with design tokens.');
    console.log('   See docs/DESIGN_SYSTEM.md for proper usage patterns.\n');

    return allIssues.length;
}

// Run validation
const exitCode = validateDesignTokens();
process.exit(exitCode > 0 ? 1 : 0);
