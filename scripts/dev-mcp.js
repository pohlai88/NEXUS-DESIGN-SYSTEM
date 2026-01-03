#!/usr/bin/env node
/**
 * Development Server for MCP (Model Context Protocol)
 * 
 * Runs development services needed for MCP tools to function:
 * - TypeScript compilation watch mode
 * - CSS build watch mode
 * - Optional: Next.js dev server (if apps exist)
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const processes = [];

function spawnProcess(name, command, args, options = {}) {
  console.log(`🚀 Starting ${name}...`);
  const proc = spawn(command, args, {
    ...options,
    cwd: rootDir,
    stdio: 'inherit',
    shell: true,
  });

  proc.on('error', (error) => {
    console.error(`❌ Error starting ${name}:`, error);
  });

  proc.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`❌ ${name} exited with code ${code}`);
    }
  });

  processes.push({ name, process: proc });
  return proc;
}

// Cleanup on exit
function cleanup() {
  console.log('\n🛑 Shutting down dev services...');
  processes.forEach(({ name, process: proc }) => {
    console.log(`   Stopping ${name}...`);
    proc.kill('SIGTERM');
  });
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start TypeScript watch mode
spawnProcess(
  'TypeScript Compiler',
  'pnpm',
  ['exec', 'tsc', '-p', 'tsconfig.build.json', '--watch']
);

// Start CSS watch mode
spawnProcess(
  'CSS Builder',
  'pnpm',
  ['exec', 'postcss', 'styles/input.css', '-o', 'style.css', '--watch']
);

// Check if Next.js app exists and start it
const nextAppPath = join(rootDir, 'apps', 'portal');
if (existsSync(nextAppPath)) {
  console.log('📱 Next.js app detected, starting dev server...');
  spawnProcess(
    'Next.js Dev Server',
    'pnpm',
    ['--filter', '@aibos/portal', 'dev'],
    { cwd: rootDir }
  );
} else {
  console.log('ℹ️  No Next.js app found. MCP tools will work with design system only.');
  console.log('   To use Next.js MCP tools, create an app in apps/portal');
}

console.log('\n✅ Dev services started!');
console.log('   Press Ctrl+C to stop all services\n');

// Keep process alive
process.stdin.resume();

