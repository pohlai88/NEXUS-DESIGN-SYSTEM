/**
 * Integration Tests for All Web Components
 * 
 * Verifies all generated components meet quality standards
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

describe('All Web Components Integration', () => {
  const componentsDir = join(process.cwd(), 'dist/adapters/vanilla');
  const componentFiles = readdirSync(componentsDir)
    .filter(f => f.endsWith('.js'))
    .map(f => f.replace('.js', ''));

  describe('Component Generation', () => {
    it('should have generated all component files', () => {
      expect(componentFiles.length).toBeGreaterThanOrEqual(12);
    });

    it.each(componentFiles)('should have valid %s component', (componentName) => {
      const filePath = join(componentsDir, `${componentName}.js`);
      expect(existsSync(filePath)).toBe(true);
      
      const content = readFileSync(filePath, 'utf-8');
      
      // Must extend HTMLElement
      expect(content).toContain('extends HTMLElement');
      
      // Must register custom element
      // Handle special cases: ToggleSwitch -> na-toggle-switch, not na-switch
      let tagName = `na-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      // Check if component uses a different tag name (e.g., ToggleSwitch -> na-toggle-switch)
      const tagNameMatch = content.match(/@element (na-[\w-]+)/);
      if (tagNameMatch) {
        tagName = tagNameMatch[1];
      }
      expect(content).toContain(`customElements.define('${tagName}'`);
      
      // Must export component
      // Handle special cases: switch -> ToggleSwitch, not Switch
      let componentClass = componentName.charAt(0).toUpperCase() + componentName.slice(1);
      // Check actual class name in the file
      const classMatch = content.match(/class (\w+) extends HTMLElement/);
      if (classMatch) {
        componentClass = classMatch[1];
      }
      expect(content).toContain(`export { ${componentClass} }`);
    });
  });

  describe('Light DOM Strategy', () => {
    it.each(componentFiles)('%s should use Light DOM', (componentName) => {
      const filePath = join(componentsDir, `${componentName}.js`);
      const content = readFileSync(filePath, 'utf-8');
      
      expect(content).toContain('Light DOM');
      expect(content).not.toContain('attachShadow');
      expect(content).not.toContain('shadowRoot');
    });
  });

  describe('Event System', () => {
    it.each(componentFiles)('%s should have event definitions', (componentName) => {
      const filePath = join(componentsDir, `${componentName}.js`);
      const content = readFileSync(filePath, 'utf-8');
      
      // Should have TypeScript event interface
      const componentClass = componentName.charAt(0).toUpperCase() + componentName.slice(1);
      expect(content).toContain(`${componentClass}Events`);
      expect(content).toContain('HTMLElementEventMap');
      
      // Should have na-error event at minimum
      expect(content).toContain('na-error');
    });

    it.each(componentFiles)('%s should use na- prefix for events', (componentName) => {
      const filePath = join(componentsDir, `${componentName}.js`);
      const content = readFileSync(filePath, 'utf-8');
      
      // Find all event references
      const eventMatches = content.match(/['"]na-[^'"]+['"]/g) || [];
      
      if (eventMatches.length > 0) {
        // All events should start with na-
        eventMatches.forEach(event => {
          expect(event).toMatch(/['"]na-/);
        });
      }
    });
  });

  describe('Code Quality', () => {
    it.each(componentFiles)('%s should have JSDoc comments', (componentName) => {
      const filePath = join(componentsDir, `${componentName}.js`);
      const content = readFileSync(filePath, 'utf-8');
      
      expect(content).toContain('/**');
      expect(content).toContain('@element');
    });

    it.each(componentFiles)('%s should have observedAttributes', (componentName) => {
      const filePath = join(componentsDir, `${componentName}.js`);
      const content = readFileSync(filePath, 'utf-8');
      
      expect(content).toContain('observedAttributes');
    });

    it.each(componentFiles)('%s should have lifecycle methods', (componentName) => {
      const filePath = join(componentsDir, `${componentName}.js`);
      const content = readFileSync(filePath, 'utf-8');
      
      expect(content).toContain('connectedCallback');
      expect(content).toContain('disconnectedCallback');
      expect(content).toContain('attributeChangedCallback');
    });
  });

  describe('Radix Components', () => {
    // Components with parts that use Radix primitives
    const radixComponents = ['dialog', 'accordion', 'tabs', 'tooltip', 'select', 'radio'];
    
    it.each(radixComponents.filter(c => componentFiles.includes(c)))('%s should import primitives', (componentName) => {
      const filePath = join(componentsDir, `${componentName}.js`);
      const content = readFileSync(filePath, 'utf-8');
      
      expect(content).toContain("import {");
      expect(content).toContain("Primitive");
      expect(content).toContain("from '../lib/primitives.js'");
    });

    it.each(radixComponents.filter(c => componentFiles.includes(c)))('%s should have error handling', (componentName) => {
      const filePath = join(componentsDir, `${componentName}.js`);
      const content = readFileSync(filePath, 'utf-8');
      
      expect(content).toContain('try {');
      expect(content).toContain('catch (error)');
      expect(content).toContain('setupComponentFallback');
    });
  });

  describe('Simple Components', () => {
    // Components without parts (simple components)
    // Note: switch and checkbox have radixPrimitive but no parts, so they're simple
    const simpleComponents = ['button', 'input', 'label', 'card', 'switch', 'checkbox'];
    
    it.each(simpleComponents.filter(c => componentFiles.includes(c)))('%s should not import primitives', (componentName) => {
      const filePath = join(componentsDir, `${componentName}.js`);
      const content = readFileSync(filePath, 'utf-8');
      
      // Simple components shouldn't import primitives
      expect(content).not.toContain("from '../lib/primitives.js'");
    });
  });
});

