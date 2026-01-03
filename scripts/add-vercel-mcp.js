#!/usr/bin/env node

/**
 * Add Vercel MCP Server to Global Configuration
 * 
 * Adds Vercel MCP server to the global Cursor MCP configuration
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const globalMcpPath = join(process.env.USERPROFILE || process.env.HOME, '.cursor', 'mcp.json');

console.log('🔧 Adding Vercel MCP Server to Global Configuration...\n');

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
  console.log('📝 Creating new global MCP configuration');
  config = { mcpServers: {} };
}

// Ensure mcpServers exists
if (!config.mcpServers) {
  config.mcpServers = {};
}

// Check if Vercel MCP already exists
if (config.mcpServers.vercel) {
  console.log('⚠️  Vercel MCP server already exists in configuration:');
  console.log(JSON.stringify(config.mcpServers.vercel, null, 2));
  console.log('\n💡 To update, remove the existing entry first.\n');
  process.exit(0);
}

// Add Vercel MCP server
// Note: Vercel MCP uses URL-based connection, not npm package
config.mcpServers.vercel = {
  url: 'https://mcp.vercel.com'
};

// Write updated config
try {
  writeFileSync(globalMcpPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
  console.log('✅ Successfully added Vercel MCP server to global config.');
  console.log(`   File updated: ${globalMcpPath}\n`);
  console.log('📋 Vercel MCP Configuration:');
  console.log(JSON.stringify(config.mcpServers.vercel, null, 2));
} catch (error) {
  console.error('❌ Error writing global mcp.json:', error.message);
  console.error('\n📝 Please manually add to', globalMcpPath, ':');
  console.log(JSON.stringify({ vercel: config.mcpServers.vercel }, null, 2));
  process.exit(1);
}

console.log('\n📋 All MCP Servers in Global Config:');
Object.keys(config.mcpServers).forEach(key => {
  const marker = key === 'vercel' ? '🔵' : '⚪';
  console.log(`   ${marker} ${key}`);
});

console.log('\n💡 Next Steps:');
console.log('   1. ✅ Vercel MCP server added to global config');
console.log('   2. 🔄 Restart Cursor completely');
console.log('   3. 🔐 Cursor will prompt you to authenticate with Vercel');
console.log('   4. ✅ Verify Vercel MCP tools are available\n');
console.log('   Note: Vercel MCP uses URL-based connection.');
console.log('   Authentication is handled through Cursor\'s OAuth flow.\n');

