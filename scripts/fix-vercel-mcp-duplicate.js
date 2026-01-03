#!/usr/bin/env node

/**
 * Fix Vercel MCP Tools Duplicate
 * 
 * Removes duplicate Vercel MCP server configurations
 * Option 1: Remove from global config (use Cursor's built-in)
 * Option 2: Keep custom one and note to disable built-in
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const globalMcpPath = join(process.env.USERPROFILE || process.env.HOME, '.cursor', 'mcp.json');

console.log('🔧 Fixing Vercel MCP Tools Duplicate...\n');

// Read global config
let config = {};
if (existsSync(globalMcpPath)) {
  try {
    const content = readFileSync(globalMcpPath, 'utf-8');
    config = JSON.parse(content);
    console.log('✅ Found global MCP configuration\n');
  } catch (error) {
    console.error('❌ Error reading global mcp.json:', error.message);
    process.exit(1);
  }
} else {
  console.error('❌ Global MCP configuration file not found at:', globalMcpPath);
  process.exit(1);
}

// Check for Vercel MCP server
const mcpServers = config.mcpServers || {};
const vercelKeys = Object.keys(mcpServers).filter(key => 
  key.toLowerCase().includes('vercel') ||
  JSON.stringify(mcpServers[key]).includes('vercel')
);

if (vercelKeys.length === 0) {
  console.log('ℹ️  No Vercel MCP servers found in global config.');
  console.log('   Duplicates may be from Cursor\'s built-in Vercel MCP.');
  console.log('   Check Cursor Settings → MCP to disable built-in servers.\n');
  process.exit(0);
}

console.log(`⚠️  Found ${vercelKeys.length} Vercel MCP server(s) in global config:\n`);
vercelKeys.forEach(key => {
  console.log(`   - "${key}"`);
  console.log(`     ${JSON.stringify(mcpServers[key], null, 2)}\n`);
});

// Remove Vercel entries
console.log('🗑️  Removing Vercel MCP server(s) from global config...\n');

let removed = 0;
vercelKeys.forEach(key => {
  delete mcpServers[key];
  removed++;
  console.log(`   ✅ Removed: "${key}"`);
});

// Update config
config.mcpServers = mcpServers;

// Write updated config
try {
  writeFileSync(globalMcpPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
  console.log(`\n✅ Successfully removed ${removed} Vercel MCP server(s) from global config.`);
  console.log(`   File updated: ${globalMcpPath}\n`);
} catch (error) {
  console.error('❌ Error writing global mcp.json:', error.message);
  console.error('\n📝 Please manually remove the following entries:');
  vercelKeys.forEach(key => {
    console.log(`   - "${key}"`);
  });
  process.exit(1);
}

console.log('📋 Remaining MCP Servers in Global Config:');
Object.keys(mcpServers).forEach(key => {
  console.log(`   ⚪ ${key}`);
});

console.log('\n💡 Next Steps:');
console.log('   1. ✅ Vercel MCP removed from global config');
console.log('   2. 🔄 Restart Cursor completely');
console.log('   3. ✅ Verify Vercel tools appear only once');
console.log('\n   Note: If duplicates persist, Cursor may have a built-in Vercel MCP.');
console.log('   Check Cursor Settings → MCP to disable built-in servers if needed.\n');

