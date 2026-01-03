/**
 * Phase Verification Tests
 * 
 * Comprehensive tests for Phase 1, 2, and 3 to ensure all functionality works
 * before proceeding to Phase 4.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('Phase 1: Foundation & Runtime', () => {
  describe('Runtime Library Build', () => {
    it('should build runtime library to dist/web/lib', () => {
      const primitivesPath = join(process.cwd(), 'dist/web/lib/primitives.js');
      const utilsPath = join(process.cwd(), 'dist/web/lib/utils.js');
      
      expect(existsSync(primitivesPath)).toBe(true);
      expect(existsSync(utilsPath)).toBe(true);
    });

    it('should export primitives from runtime library', () => {
      const primitivesPath = join(process.cwd(), 'dist/web/lib/primitives.js');
      const content = readFileSync(primitivesPath, 'utf-8');
      
      expect(content).toContain('DialogPrimitive');
      expect(content).toContain('FocusPrimitive');
      expect(content).toContain('AriaPrimitive');
      expect(content).toContain('export');
    });

    it('should export utils from runtime library', () => {
      const utilsPath = join(process.cwd(), 'dist/web/lib/utils.js');
      const content = readFileSync(utilsPath, 'utf-8');
      
      expect(content).toContain('dispatchNaEvent');
      expect(content).toContain('cn');
      expect(content).toContain('export');
    });
  });

  describe('Runtime Primitives', () => {
    it('should have DialogPrimitive with required methods', () => {
      const primitivesPath = join(process.cwd(), 'dist/web/lib/primitives.js');
      const content = readFileSync(primitivesPath, 'utf-8');
      
      expect(content).toContain('setAriaAttributes');
      expect(content).toContain('trapFocus');
      expect(content).toContain('handleEscape');
      expect(content).toContain('restoreFocus');
    });

    it('should have FocusPrimitive', () => {
      const primitivesPath = join(process.cwd(), 'dist/web/lib/primitives.js');
      const content = readFileSync(primitivesPath, 'utf-8');
      
      expect(content).toContain('FocusPrimitive');
    });

    it('should have AriaPrimitive', () => {
      const primitivesPath = join(process.cwd(), 'dist/web/lib/primitives.js');
      const content = readFileSync(primitivesPath, 'utf-8');
      
      expect(content).toContain('AriaPrimitive');
    });
  });
});

describe('Phase 2: Adapter Generator', () => {
  describe('Adapter Registration', () => {
    it('should register webAdapter in adapters/index.ts', () => {
      const indexPath = join(process.cwd(), 'adapters/index.ts');
      const content = readFileSync(indexPath, 'utf-8');
      
      expect(content).toContain('webAdapter');
      expect(content).toContain('vanilla: webAdapter');
      expect(content).toContain('export { webAdapter }');
    });

    it('should implement UniversalAdapter interface', () => {
      const adapterPath = join(process.cwd(), 'adapters/web/adapter.ts');
      const content = readFileSync(adapterPath, 'utf-8');
      
      expect(content).toContain('UniversalAdapter');
      expect(content).toContain('generate:');
      expect(content).toContain('getDependencies');
    });
  });

  describe('Button Component Generation', () => {
    it('should generate Button component', () => {
      const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
      expect(existsSync(buttonPath)).toBe(true);
    });

    it('should use Light DOM (no Shadow DOM)', () => {
      const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
      const content = readFileSync(buttonPath, 'utf-8');
      
      expect(content).toContain('Light DOM');
      expect(content).not.toContain('attachShadow');
      expect(content).not.toContain('shadowRoot');
    });

    it('should have observed attributes', () => {
      const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
      const content = readFileSync(buttonPath, 'utf-8');
      
      expect(content).toContain('observedAttributes');
      expect(content).toContain('variant');
      expect(content).toContain('size');
      expect(content).toContain('disabled');
      expect(content).toContain('loading');
    });

    it('should have variant classes', () => {
      const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
      const content = readFileSync(buttonPath, 'utf-8');
      
      expect(content).toContain("'primary'");
      expect(content).toContain("'secondary'");
      expect(content).toContain("'danger'");
      expect(content).toContain("'ghost'");
      expect(content).toContain('na-btn');
    });

    it('should have size class support', () => {
      const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
      const content = readFileSync(buttonPath, 'utf-8');
      
      expect(content).toContain('sizeClasses');
      expect(content).toContain('na-button-');
    });

    it('should have event system', () => {
      const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
      const content = readFileSync(buttonPath, 'utf-8');
      
      expect(content).toContain('ButtonEvents');
      expect(content).toContain('na-error');
      expect(content).toContain('dispatchNaEvent');
    });

    it('should register custom element', () => {
      const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
      const content = readFileSync(buttonPath, 'utf-8');
      
      expect(content).toContain("customElements.define('na-button'");
      expect(content).toContain('export { Button }');
    });
  });
});

describe('Phase 3: Dialog Component', () => {
  describe('Dialog Component Generation', () => {
    it('should generate Dialog component', () => {
      const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
      expect(existsSync(dialogPath)).toBe(true);
    });

    it('should use Light DOM (no Shadow DOM)', () => {
      const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
      const content = readFileSync(dialogPath, 'utf-8');
      
      expect(content).toContain('Light DOM');
      expect(content).not.toContain('attachShadow');
      expect(content).not.toContain('shadowRoot');
    });

    it('should import primitives', () => {
      const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
      const content = readFileSync(dialogPath, 'utf-8');
      
      expect(content).toContain("import { DialogPrimitive }");
      expect(content).toContain("from '../lib/primitives.js'");
    });

    it('should have error handling', () => {
      const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
      const content = readFileSync(dialogPath, 'utf-8');
      
      expect(content).toContain('try {');
      expect(content).toContain('catch (error)');
      expect(content).toContain('setupComponentFallback');
      expect(content).toContain('na-error');
    });

    it('should have open/close methods', () => {
      const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
      const content = readFileSync(dialogPath, 'utf-8');
      
      expect(content).toContain('public open()');
      expect(content).toContain('public close()');
    });

    it('should have event system', () => {
      const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
      const content = readFileSync(dialogPath, 'utf-8');
      
      expect(content).toContain('DialogEvents');
      expect(content).toContain('na-open');
      expect(content).toContain('na-close');
      expect(content).toContain('na-open-change');
      expect(content).toContain('na-error');
    });

    it('should have variant support', () => {
      const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
      const content = readFileSync(dialogPath, 'utf-8');
      
      expect(content).toContain("'default'");
      expect(content).toContain("'center'");
      expect(content).toContain('na-modal');
    });

    it('should register custom element', () => {
      const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
      const content = readFileSync(dialogPath, 'utf-8');
      
      expect(content).toContain("customElements.define('na-dialog'");
      expect(content).toContain('export { Dialog }');
    });
  });

  describe('HTML Shell Example', () => {
    it('should have HTML example file', () => {
      const examplePath = join(process.cwd(), 'components/html/examples/dialog-example.html');
      expect(existsSync(examplePath)).toBe(true);
    });

    it('should import Web Components', () => {
      const examplePath = join(process.cwd(), 'components/html/examples/dialog-example.html');
      const content = readFileSync(examplePath, 'utf-8');
      
      expect(content).toContain('dist/adapters/vanilla/button.js');
      expect(content).toContain('dist/adapters/vanilla/dialog.js');
      expect(content).toContain('type="module"');
    });

    it('should have dialog examples', () => {
      const examplePath = join(process.cwd(), 'components/html/examples/dialog-example.html');
      const content = readFileSync(examplePath, 'utf-8');
      
      expect(content).toContain('<na-dialog');
      expect(content).toContain('na-button');
      expect(content).toContain('.open()');
    });

    it('should have event listeners', () => {
      const examplePath = join(process.cwd(), 'components/html/examples/dialog-example.html');
      const content = readFileSync(examplePath, 'utf-8');
      
      expect(content).toContain('addEventListener');
      expect(content).toContain('na-open');
      expect(content).toContain('na-close');
    });
  });
});

describe('Cross-Phase Verification', () => {
  it('should have consistent Light DOM strategy across all components', () => {
    const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
    const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
    
    const buttonContent = readFileSync(buttonPath, 'utf-8');
    const dialogContent = readFileSync(dialogPath, 'utf-8');
    
    expect(buttonContent).toContain('Light DOM');
    expect(dialogContent).toContain('Light DOM');
    expect(buttonContent).not.toContain('attachShadow');
    expect(dialogContent).not.toContain('attachShadow');
  });

  it('should have consistent event naming (na- prefix)', () => {
    const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
    const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
    
    const buttonContent = readFileSync(buttonPath, 'utf-8');
    const dialogContent = readFileSync(dialogPath, 'utf-8');
    
    // Check that events use na- prefix
    const buttonEvents = buttonContent.match(/['"]na-[^'"]+['"]/g) || [];
    const dialogEvents = dialogContent.match(/['"]na-[^'"]+['"]/g) || [];
    
    expect(buttonEvents.length).toBeGreaterThan(0);
    expect(dialogEvents.length).toBeGreaterThan(0);
    
    // All events should start with na-
    buttonEvents.forEach(event => {
      expect(event).toMatch(/['"]na-/);
    });
    dialogEvents.forEach(event => {
      expect(event).toMatch(/['"]na-/);
    });
  });

  it('should have TypeScript event definitions', () => {
    const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
    const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
    
    const buttonContent = readFileSync(buttonPath, 'utf-8');
    const dialogContent = readFileSync(dialogPath, 'utf-8');
    
    expect(buttonContent).toContain('interface ButtonEvents');
    expect(buttonContent).toContain('HTMLElementEventMap');
    expect(dialogContent).toContain('interface DialogEvents');
    expect(dialogContent).toContain('HTMLElementEventMap');
  });

  it('should export all components', () => {
    const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
    const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
    
    const buttonContent = readFileSync(buttonPath, 'utf-8');
    const dialogContent = readFileSync(dialogPath, 'utf-8');
    
    expect(buttonContent).toContain('export { Button }');
    expect(dialogContent).toContain('export { Dialog }');
  });
});

