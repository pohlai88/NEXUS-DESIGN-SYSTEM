/**
 * Tests for Web Components Adapter Generator
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { generateWebComponent, webAdapter } from '../../../../adapters/web/adapter.js';
import type { ComponentSpec, AdapterConfig } from '../../../../adapters/universal/adapter.js';
import buttonSpec from '../../../../specs/components/button.json';

describe('Web Components Adapter', () => {
  const config: AdapterConfig = {
    framework: 'vanilla',
    outputDir: 'dist/adapters/vanilla'
  };

  describe('generateWebComponent', () => {
    it('should generate a simple component (Button)', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.name).toBe('Button');
      expect(result.code).toContain('class Button extends HTMLElement');
      expect(result.code).toContain("customElements.define('na-button'");
      expect(result.code).toContain('Light DOM');
      expect(result.code).not.toContain('attachShadow');
    });

    it('should use Light DOM (no Shadow DOM)', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain('// CRITICAL: No Shadow DOM');
      expect(result.code).not.toContain('attachShadow');
      expect(result.code).not.toContain('shadowRoot');
    });

    it('should generate observed attributes', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain('observedAttributes');
      expect(result.code).toContain('variant');
      expect(result.code).toContain('size');
      expect(result.code).toContain('disabled');
      expect(result.code).toContain('loading');
    });

    it('should generate variant class mapping', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain('variantClassMap');
      expect(result.code).toContain("'primary'");
      expect(result.code).toContain("'secondary'");
      expect(result.code).toContain("'danger'");
      expect(result.code).toContain("'ghost'");
      expect(result.code).toContain('na-btn');
    });

    it('should generate state classes', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain('stateClasses');
      expect(result.code).toContain('disabled');
      expect(result.code).toContain('loading');
    });

    it('should generate accessibility setup', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain('setupAccessibility');
      expect(result.code).toContain('aria-label');
      expect(result.code).toContain('aria-disabled');
    });

    it('should generate event types for TypeScript', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain('ButtonEvents');
      expect(result.code).toContain('na-error');
      expect(result.code).toContain('CustomEvent');
    });

    it('should export the component class', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain('export { Button }');
    });
  });

  describe('webAdapter', () => {
    it('should implement UniversalAdapter interface', () => {
      expect(webAdapter.generate).toBeDefined();
      expect(typeof webAdapter.generate).toBe('function');
      expect(webAdapter.getDependencies).toBeDefined();
      expect(typeof webAdapter.getDependencies).toBe('function');
    });

    it('should generate component with correct structure', () => {
      const result = webAdapter.generate(buttonSpec as ComponentSpec, config);
      
      expect(result.name).toBe('Button');
      expect(result.code).toBeTruthy();
      expect(result.imports).toEqual([]);
      expect(result.dependencies).toEqual([]);
    });

    it('should return empty dependencies for non-Radix components', () => {
      const deps = webAdapter.getDependencies(buttonSpec as ComponentSpec);
      expect(deps).toEqual([]);
    });
  });

  describe('Event Naming Contract', () => {
    it('should use na- prefix for events', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain('na-error');
      expect(result.code).toContain('dispatchNaEvent');
    });

    it('should generate event types interface', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain('interface ButtonEvents');
      expect(result.code).toContain('HTMLElementEventMap');
    });
  });

  describe('Error Handling', () => {
    it('should include error event in event types', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain("'na-error': CustomEvent");
    });

    it('should have dispatchNaEvent method', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain('dispatchNaEvent');
      expect(result.code).toContain('CustomEvent');
    });
  });

  describe('Code Quality', () => {
    it('should generate valid JavaScript', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      // Check for balanced braces
      const openBraces = (result.code.match(/{/g) || []).length;
      const closeBraces = (result.code.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
      
      // Check for class definition
      expect(result.code).toContain('class Button');
      expect(result.code).toContain('extends HTMLElement');
    });

    it('should include JSDoc comments', () => {
      const result = generateWebComponent(buttonSpec as ComponentSpec, config);
      
      expect(result.code).toContain('/**');
      expect(result.code).toContain('Button');
      expect(result.code).toContain('@element');
    });
  });
});

