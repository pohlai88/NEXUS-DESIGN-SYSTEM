/**
 * Build Runtime Library
 * 
 * Transpiles adapters/web/runtime/*.ts to dist/web/lib/*.js
 * This compiles browser-side code for Web Components.
 */

import { readdirSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const runtimeSourceDir = join(rootDir, 'adapters/web/runtime');
const runtimeOutputDir = join(rootDir, 'dist/web/lib');

/**
 * Build runtime library using TypeScript compiler
 */
function buildRuntime(): void {
  console.log('🔨 Building Web Components Runtime Library...\n');

  // Create output directory
  if (!existsSync(runtimeOutputDir)) {
    mkdirSync(runtimeOutputDir, { recursive: true });
  }

  // Get all TypeScript files in runtime directory
  const files = readdirSync(runtimeSourceDir)
    .filter(file => file.endsWith('.ts'))
    .map(file => join(runtimeSourceDir, file));

  if (files.length === 0) {
    console.error('❌ No TypeScript files found in adapters/web/runtime/');
    process.exit(1);
  }

  try {
    // Use tsc to compile each file individually
    for (const file of files) {
      const fileName = file.split(/[/\\]/).pop() || '';
      console.log(`📦 Compiling ${fileName}...`);
      
      // Compile using tsc with specific options
      const tscCommand = `tsc "${file}" --outDir "${runtimeOutputDir}" --module ESNext --target ES2020 --declaration --declarationMap --skipLibCheck --moduleResolution node --esModuleInterop`;
      
      try {
        execSync(tscCommand, { 
          stdio: 'inherit',
          cwd: rootDir
        });
        console.log(`✅ Compiled: ${fileName}`);
      } catch (error) {
        console.error(`❌ Error compiling ${fileName}:`, error);
        throw error;
      }
    }

    console.log(`\n✨ Runtime library built successfully!`);
    console.log(`   Output: ${runtimeOutputDir}`);
  } catch (error) {
    console.error('\n⚠️  Build failed. Please check the errors above.');
    process.exit(1);
  }
}

// Run build
buildRuntime();
