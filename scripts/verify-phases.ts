/**
 * Phase Verification Script
 * 
 * Manually verifies Phase 1, 2, and 3 without relying on test framework
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

function log(message: string, status: 'pass' | 'fail' | 'info' = 'info') {
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : 'ℹ️';
  const color = status === 'pass' ? GREEN : status === 'fail' ? RED : YELLOW;
  console.log(`${color}${icon}${RESET} ${message}`);
}

function checkFile(path: string, description: string): boolean {
  if (existsSync(path)) {
    log(`${description}: ${path}`, 'pass');
    return true;
  } else {
    log(`${description}: ${path} - NOT FOUND`, 'fail');
    return false;
  }
}

function checkContent(path: string, patterns: string[], description: string): boolean {
  if (!existsSync(path)) {
    log(`${description}: File not found`, 'fail');
    return false;
  }

  const content = readFileSync(path, 'utf-8');
  let allPassed = true;

  for (const pattern of patterns) {
    if (content.includes(pattern)) {
      log(`  ✓ Contains: ${pattern}`, 'pass');
    } else {
      log(`  ✗ Missing: ${pattern}`, 'fail');
      allPassed = false;
    }
  }

  return allPassed;
}

function checkNotContent(path: string, patterns: string[], description: string): boolean {
  if (!existsSync(path)) {
    log(`${description}: File not found`, 'fail');
    return false;
  }

  const content = readFileSync(path, 'utf-8');
  let allPassed = true;

  for (const pattern of patterns) {
    if (!content.includes(pattern)) {
      log(`  ✓ Does NOT contain: ${pattern}`, 'pass');
    } else {
      log(`  ✗ Should NOT contain: ${pattern}`, 'fail');
      allPassed = false;
    }
  }

  return allPassed;
}

console.log(`\n${BOLD}=== Phase Verification Report ===${RESET}\n`);

let phase1Pass = 0;
let phase1Fail = 0;
let phase2Pass = 0;
let phase2Fail = 0;
let phase3Pass = 0;
let phase3Fail = 0;

// ============================================
// Phase 1: Foundation & Runtime
// ============================================
console.log(`${BOLD}Phase 1: Foundation & Runtime${RESET}\n`);

// Runtime library build
if (checkFile(join(process.cwd(), 'dist/web/lib/primitives.js'), 'Runtime primitives')) {
  phase1Pass++;
  checkContent(
    join(process.cwd(), 'dist/web/lib/primitives.js'),
    ['DialogPrimitive', 'FocusPrimitive', 'AriaPrimitive', 'export'],
    'Primitives exports'
  ) ? phase1Pass++ : phase1Fail++;
} else {
  phase1Fail++;
}

if (checkFile(join(process.cwd(), 'dist/web/lib/utils.js'), 'Runtime utils')) {
  phase1Pass++;
  checkContent(
    join(process.cwd(), 'dist/web/lib/utils.js'),
    ['dispatchNaEvent', 'cn', 'export'],
    'Utils exports'
  ) ? phase1Pass++ : phase1Fail++;
} else {
  phase1Fail++;
}

// Primitives methods
if (existsSync(join(process.cwd(), 'dist/web/lib/primitives.js'))) {
  const primitivesContent = readFileSync(join(process.cwd(), 'dist/web/lib/primitives.js'), 'utf-8');
  const requiredMethods = ['setAriaAttributes', 'trapFocus', 'handleEscape', 'restoreFocus'];
  let methodsPass = true;
  for (const method of requiredMethods) {
    if (primitivesContent.includes(method)) {
      log(`  ✓ Has method: ${method}`, 'pass');
      phase1Pass++;
    } else {
      log(`  ✗ Missing method: ${method}`, 'fail');
      phase1Fail++;
      methodsPass = false;
    }
  }
}

console.log('');

// ============================================
// Phase 2: Adapter Generator
// ============================================
console.log(`${BOLD}Phase 2: Adapter Generator${RESET}\n`);

// Adapter registration
if (existsSync(join(process.cwd(), 'adapters/index.ts'))) {
  const indexContent = readFileSync(join(process.cwd(), 'adapters/index.ts'), 'utf-8');
  if (indexContent.includes('webAdapter') && indexContent.includes('vanilla: webAdapter')) {
    log('Adapter registered in adapters/index.ts', 'pass');
    phase2Pass++;
  } else {
    log('Adapter NOT registered correctly', 'fail');
    phase2Fail++;
  }
} else {
  log('adapters/index.ts not found', 'fail');
  phase2Fail++;
}

// Adapter implementation
if (checkFile(join(process.cwd(), 'adapters/web/generator/adapter.ts'), 'Adapter generator')) {
  phase2Pass++;
  const adapterContent = readFileSync(join(process.cwd(), 'adapters/web/generator/adapter.ts'), 'utf-8');
  if (adapterContent.includes('UniversalAdapter') && 
      adapterContent.includes('generate:') && 
      (adapterContent.includes('getDependencies:') || adapterContent.includes('getDependencies('))) {
    log('  ✓ Implements UniversalAdapter interface', 'pass');
    phase2Pass++;
  } else {
    log('  ✗ Missing UniversalAdapter implementation', 'fail');
    phase2Fail++;
  }
} else {
  phase2Fail++;
}

// Button component
if (checkFile(join(process.cwd(), 'dist/adapters/vanilla/button.js'), 'Button component')) {
  phase2Pass++;
  
  const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
  const buttonContent = readFileSync(buttonPath, 'utf-8');
  
  // Light DOM check
  if (buttonContent.includes('Light DOM') && !buttonContent.includes('attachShadow')) {
    log('  ✓ Uses Light DOM (no Shadow DOM)', 'pass');
    phase2Pass++;
  } else {
    log('  ✗ Shadow DOM detected or Light DOM missing', 'fail');
    phase2Fail++;
  }
  
  // Observed attributes
  if (buttonContent.includes('observedAttributes') && 
      buttonContent.includes('variant') && 
      buttonContent.includes('size') && 
      buttonContent.includes('disabled') && 
      buttonContent.includes('loading')) {
    log('  ✓ Has all observed attributes', 'pass');
    phase2Pass++;
  } else {
    log('  ✗ Missing observed attributes', 'fail');
    phase2Fail++;
  }
  
  // Variants
  if (buttonContent.includes("'primary'") && 
      buttonContent.includes("'secondary'") && 
      buttonContent.includes("'danger'") && 
      buttonContent.includes("'ghost'") &&
      buttonContent.includes('na-btn')) {
    log('  ✓ Has all variants', 'pass');
    phase2Pass++;
  } else {
    log('  ✗ Missing variants', 'fail');
    phase2Fail++;
  }
  
  // Size support
  if (buttonContent.includes('sizeClasses') && buttonContent.includes('na-button-')) {
    log('  ✓ Has size class support', 'pass');
    phase2Pass++;
  } else {
    log('  ✗ Missing size class support', 'fail');
    phase2Fail++;
  }
  
  // Events
  if (buttonContent.includes('ButtonEvents') && 
      buttonContent.includes('na-error') && 
      buttonContent.includes('dispatchNaEvent')) {
    log('  ✓ Has event system', 'pass');
    phase2Pass++;
  } else {
    log('  ✗ Missing event system', 'fail');
    phase2Fail++;
  }
  
  // Custom element registration
  if (buttonContent.includes("customElements.define('na-button'") && 
      buttonContent.includes('export { Button }')) {
    log('  ✓ Registered and exported', 'pass');
    phase2Pass++;
  } else {
    log('  ✗ Not registered or exported', 'fail');
    phase2Fail++;
  }
} else {
  phase2Fail++;
}

console.log('');

// ============================================
// Phase 3: Dialog Component
// ============================================
console.log(`${BOLD}Phase 3: Dialog Component${RESET}\n`);

// Dialog component
if (checkFile(join(process.cwd(), 'dist/adapters/vanilla/dialog.js'), 'Dialog component')) {
  phase3Pass++;
  
  const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');
  const dialogContent = readFileSync(dialogPath, 'utf-8');
  
  // Light DOM check
  if (dialogContent.includes('Light DOM') && !dialogContent.includes('attachShadow')) {
    log('  ✓ Uses Light DOM (no Shadow DOM)', 'pass');
    phase3Pass++;
  } else {
    log('  ✗ Shadow DOM detected or Light DOM missing', 'fail');
    phase3Fail++;
  }
  
  // Primitives import
  if (dialogContent.includes("import { DialogPrimitive }") && 
      dialogContent.includes("from '../lib/primitives.js'")) {
    log('  ✓ Imports primitives', 'pass');
    phase3Pass++;
  } else {
    log('  ✗ Missing primitives import', 'fail');
    phase3Fail++;
  }
  
  // Error handling
  if (dialogContent.includes('try {') && 
      dialogContent.includes('catch (error)') && 
      dialogContent.includes('setupComponentFallback') && 
      dialogContent.includes('na-error')) {
    log('  ✓ Has error handling', 'pass');
    phase3Pass++;
  } else {
    log('  ✗ Missing error handling', 'fail');
    phase3Fail++;
  }
  
  // Open/close methods
  if (dialogContent.includes('public open()') && dialogContent.includes('public close()')) {
    log('  ✓ Has open/close methods', 'pass');
    phase3Pass++;
  } else {
    log('  ✗ Missing open/close methods', 'fail');
    phase3Fail++;
  }
  
  // Events
  if (dialogContent.includes('DialogEvents') && 
      dialogContent.includes('na-open') && 
      dialogContent.includes('na-close') && 
      dialogContent.includes('na-open-change') && 
      dialogContent.includes('na-error')) {
    log('  ✓ Has complete event system', 'pass');
    phase3Pass++;
  } else {
    log('  ✗ Missing events', 'fail');
    phase3Fail++;
  }
  
  // Variants
  if (dialogContent.includes("'default'") && 
      dialogContent.includes("'center'") && 
      dialogContent.includes('na-modal')) {
    log('  ✓ Has variants', 'pass');
    phase3Pass++;
  } else {
    log('  ✗ Missing variants', 'fail');
    phase3Fail++;
  }
  
  // Custom element registration
  if (dialogContent.includes("customElements.define('na-dialog'") && 
      dialogContent.includes('export { Dialog }')) {
    log('  ✓ Registered and exported', 'pass');
    phase3Pass++;
  } else {
    log('  ✗ Not registered or exported', 'fail');
    phase3Fail++;
  }
} else {
  phase3Fail++;
}

// HTML example
if (checkFile(join(process.cwd(), 'components/html/examples/dialog-example.html'), 'HTML example')) {
  phase3Pass++;
  
  const examplePath = join(process.cwd(), 'components/html/examples/dialog-example.html');
  const exampleContent = readFileSync(examplePath, 'utf-8');
  
  if (exampleContent.includes('dist/adapters/vanilla/button.js') && 
      exampleContent.includes('dist/adapters/vanilla/dialog.js') && 
      exampleContent.includes('type="module"')) {
    log('  ✓ Imports Web Components', 'pass');
    phase3Pass++;
  } else {
    log('  ✗ Missing component imports', 'fail');
    phase3Fail++;
  }
  
  if (exampleContent.includes('<na-dialog') && 
      exampleContent.includes('na-button') && 
      exampleContent.includes('.open()')) {
    log('  ✓ Has dialog examples', 'pass');
    phase3Pass++;
  } else {
    log('  ✗ Missing dialog examples', 'fail');
    phase3Fail++;
  }
} else {
  phase3Fail++;
}

console.log('');

// ============================================
// Cross-Phase Verification
// ============================================
console.log(`${BOLD}Cross-Phase Verification${RESET}\n`);

// Light DOM consistency
const buttonPath = join(process.cwd(), 'dist/adapters/vanilla/button.js');
const dialogPath = join(process.cwd(), 'dist/adapters/vanilla/dialog.js');

if (existsSync(buttonPath) && existsSync(dialogPath)) {
  const buttonContent = readFileSync(buttonPath, 'utf-8');
  const dialogContent = readFileSync(dialogPath, 'utf-8');
  
  if (buttonContent.includes('Light DOM') && 
      dialogContent.includes('Light DOM') && 
      !buttonContent.includes('attachShadow') && 
      !dialogContent.includes('attachShadow')) {
    log('Light DOM strategy consistent across components', 'pass');
    phase3Pass++;
  } else {
    log('Light DOM strategy inconsistent', 'fail');
    phase3Fail++;
  }
  
  // Event naming consistency
  const buttonEvents = buttonContent.match(/['"]na-[^'"]+['"]/g) || [];
  const dialogEvents = dialogContent.match(/['"]na-[^'"]+['"]/g) || [];
  
  if (buttonEvents.length > 0 && dialogEvents.length > 0) {
    const allUseNaPrefix = [...buttonEvents, ...dialogEvents].every(e => e.includes('na-'));
    if (allUseNaPrefix) {
      log('Event naming consistent (na- prefix)', 'pass');
      phase3Pass++;
    } else {
      log('Event naming inconsistent', 'fail');
      phase3Fail++;
    }
  }
  
  // TypeScript event definitions
  if (buttonContent.includes('interface ButtonEvents') && 
      buttonContent.includes('HTMLElementEventMap') &&
      dialogContent.includes('interface DialogEvents') && 
      dialogContent.includes('HTMLElementEventMap')) {
    log('TypeScript event definitions present', 'pass');
    phase3Pass++;
  } else {
    log('Missing TypeScript event definitions', 'fail');
    phase3Fail++;
  }
}

console.log('');

// ============================================
// Summary
// ============================================
console.log(`${BOLD}=== Summary ===${RESET}\n`);

const totalPass = phase1Pass + phase2Pass + phase3Pass;
const totalFail = phase1Fail + phase2Fail + phase3Fail;
const total = totalPass + totalFail;
const percentage = total > 0 ? Math.round((totalPass / total) * 100) : 0;

console.log(`Phase 1: ${GREEN}${phase1Pass}${RESET} passed, ${RED}${phase1Fail}${RESET} failed`);
console.log(`Phase 2: ${GREEN}${phase2Pass}${RESET} passed, ${RED}${phase2Fail}${RESET} failed`);
console.log(`Phase 3: ${GREEN}${phase3Pass}${RESET} passed, ${RED}${phase3Fail}${RESET} failed`);
console.log(`\n${BOLD}Total: ${GREEN}${totalPass}${RESET}/${total} checks passed (${percentage}%)${RESET}\n`);

if (totalFail === 0) {
  console.log(`${GREEN}${BOLD}✅ ALL PHASES VERIFIED - READY FOR PHASE 4${RESET}\n`);
  process.exit(0);
} else {
  console.log(`${RED}${BOLD}❌ SOME CHECKS FAILED - REVIEW BEFORE PROCEEDING${RESET}\n`);
  process.exit(1);
}

