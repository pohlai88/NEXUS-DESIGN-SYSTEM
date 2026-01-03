#!/usr/bin/env node

/**
 * Setup Vitest MCP Server Configuration
 * 
 * Updates .cursor/mcp.json to include Vitest MCP server
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const mcpConfigPath = join(rootDir, '.cursor', 'mcp.json');

console.log('🔧 Setting up Vitest MCP Server...\n');

// Read existing config
let config = {};
if (existsSync(mcpConfigPath)) {
  try {
    const content = readFileSync(mcpConfigPath, 'utf-8');
    config = JSON.parse(content);
    console.log('✅ Found existing MCP configuration');
  } catch (error) {
    console.error('❌ Error reading mcp.json:', error.message);
    process.exit(1);
  }
} else {
  console.log('📝 Creating new MCP configuration');
  config = { mcpServers: {} };
}

// Add Vitest MCP server
if (!config.mcpServers) {
  config.mcpServers = {};
}

if (config.mcpServers.vitest) {
  console.log('⚠️  Vitest MCP already configured');
  console.log('   Current config:', JSON.stringify(config.mcpServers.vitest, null, 2));
} else {
  config.mcpServers.vitest = {
    command: 'npx',
    args: ['-y', '@djankies/vitest-mcp']
  };
  
  // Write updated config
  try {
    writeFileSync(mcpConfigPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
    console.log('✅ Vitest MCP server added to .cursor/mcp.json');
    console.log('\n📋 Configuration:');
    console.log(JSON.stringify(config.mcpServers.vitest, null, 2));
  } catch (error) {
    console.error('❌ Error writing mcp.json:', error.message);
    console.error('\n📝 Please manually add to .cursor/mcp.json:');
    console.log(JSON.stringify({ vitest: config.mcpServers.vitest }, null, 2));
    process.exit(1);
  }
}

console.log('\n✅ Setup complete!');
console.log('📝 Next steps:');
console.log('   1. Install dependencies: pnpm install');
console.log('   2. Restart Cursor IDE to load MCP server');
console.log('\n🎉 Vitest MCP is ready to use!');

