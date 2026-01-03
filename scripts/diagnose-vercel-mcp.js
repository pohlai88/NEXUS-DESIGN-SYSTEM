#!/usr/bin/env node

/**
 * Diagnose Vercel MCP Tools Duplicates
 * 
 * Checks for duplicate Vercel MCP server configurations
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const projectMcpPath = join(rootDir, '.cursor', 'mcp.json');
const globalMcpPath = join(process.env.USERPROFILE || process.env.HOME, '.cursor', 'mcp.json');

console.log('🔍 Diagnosing Vercel MCP Tools Configuration...\n');

// Read both project and global MCP configs
const configs = {};

// Project config
if (existsSync(projectMcpPath)) {
  try {
    const content = readFileSync(projectMcpPath, 'utf-8');
    configs.project = JSON.parse(content);
    console.log('✅ Found project MCP configuration:', projectMcpPath);
  } catch (error) {
    console.error('❌ Error reading project mcp.json:', error.message);
  }
} else {
  console.log('ℹ️  No project MCP configuration found:', projectMcpPath);
}

// Global config
if (existsSync(globalMcpPath)) {
  try {
    const content = readFileSync(globalMcpPath, 'utf-8');
    configs.global = JSON.parse(content);
    console.log('✅ Found global MCP configuration:', globalMcpPath);
  } catch (error) {
    console.error('❌ Error reading global mcp.json:', error.message);
  }
} else {
  console.log('ℹ️  No global MCP configuration found:', globalMcpPath);
}

console.log('');

// Check for Vercel MCP servers in both configs
const allVercelServers = {};

console.log('📋 Analyzing MCP Servers Configuration:\n');

// Check project config
if (configs.project) {
  const projectServers = configs.project.mcpServers || {};
  console.log(`📁 Project Config: ${Object.keys(projectServers).length} servers`);
  
  Object.keys(projectServers).forEach(key => {
    const server = projectServers[key];
    const serverString = JSON.stringify(server);
    
    if (
      serverString.includes('vercel') ||
      serverString.includes('@vercel') ||
      key.toLowerCase().includes('vercel')
    ) {
      allVercelServers[`project:${key}`] = { source: 'project', key, server };
    }
  });
}

// Check global config
if (configs.global) {
  const globalServers = configs.global.mcpServers || {};
  console.log(`🌐 Global Config: ${Object.keys(globalServers).length} servers`);
  
  Object.keys(globalServers).forEach(key => {
    const server = globalServers[key];
    const serverString = JSON.stringify(server);
    
    if (
      serverString.includes('vercel') ||
      serverString.includes('@vercel') ||
      key.toLowerCase().includes('vercel')
    ) {
      allVercelServers[`global:${key}`] = { source: 'global', key, server };
    }
  });
}

console.log(`\n🔵 Vercel-related Servers Found: ${Object.keys(allVercelServers).length}\n`);

if (Object.keys(allVercelServers).length === 0) {
  console.log('ℹ️  No Vercel MCP servers found in configuration files.');
  console.log('   This means Vercel tools might be coming from:');
  console.log('   - Default Cursor configuration');
  console.log('   - Built-in MCP servers');
  console.log('   - Another configuration file\n');
} else {
  console.log('⚠️  Found Vercel MCP server(s):\n');
  Object.keys(allVercelServers).forEach(fullKey => {
    const { source, key, server } = allVercelServers[fullKey];
    console.log(`   📍 ${source.toUpperCase()}: "${key}"`);
    console.log(`   Configuration: ${JSON.stringify(server, null, 2)}\n`);
  });
  
  // Check for duplicates
  const serverConfigs = Object.values(allVercelServers).map(v => JSON.stringify(v.server));
  const uniqueConfigs = new Set(serverConfigs);
  
  if (serverConfigs.length > uniqueConfigs.size) {
    console.log('❌ DUPLICATE DETECTED: Multiple Vercel servers with same configuration!\n');
    console.log('   Duplicate entries:');
    const configGroups = {};
    Object.keys(allVercelServers).forEach(fullKey => {
      const configStr = JSON.stringify(allVercelServers[fullKey].server);
      if (!configGroups[configStr]) {
        configGroups[configStr] = [];
      }
      configGroups[configStr].push(fullKey);
    });
    Object.values(configGroups).forEach(group => {
      if (group.length > 1) {
        console.log(`   - ${group.join(', ')}`);
      }
    });
  } else if (Object.keys(allVercelServers).length > 1) {
    console.log('⚠️  Multiple Vercel servers found:');
    Object.keys(allVercelServers).forEach(fullKey => {
      const { source, key } = allVercelServers[fullKey];
      console.log(`   - ${source}:${key}`);
    });
    console.log('\n   💡 This may cause duplicate tools to appear in Cursor.');
  } else {
    console.log('✅ Only one Vercel MCP server found.');
  }
}

// List all servers for reference
console.log('\n📋 All Configured MCP Servers:\n');

if (configs.project) {
  console.log('📁 Project Servers:');
  const projectServers = configs.project.mcpServers || {};
  Object.keys(projectServers).forEach(key => {
    const server = projectServers[key];
    const isVercel = Object.keys(allVercelServers).some(k => allVercelServers[k].source === 'project' && allVercelServers[k].key === key);
    const marker = isVercel ? '🔵' : '⚪';
    console.log(`   ${marker} ${key}`);
    if (server.command) {
      console.log(`      Command: ${server.command} ${(server.args || []).join(' ')}`);
    } else if (server.url) {
      console.log(`      URL: ${server.url}`);
    }
  });
  console.log('');
}

if (configs.global) {
  console.log('🌐 Global Servers:');
  const globalServers = configs.global.mcpServers || {};
  Object.keys(globalServers).forEach(key => {
    const server = globalServers[key];
    const isVercel = Object.keys(allVercelServers).some(k => allVercelServers[k].source === 'global' && allVercelServers[k].key === key);
    const marker = isVercel ? '🔵' : '⚪';
    console.log(`   ${marker} ${key}`);
    if (server.command) {
      console.log(`      Command: ${server.command} ${(server.args || []).join(' ')}`);
    } else if (server.url) {
      console.log(`      URL: ${server.url}`);
    }
  });
  console.log('');
}

console.log('\n💡 Recommendations:');
if (Object.keys(allVercelServers).length > 1) {
  console.log('   ❌ DUPLICATE DETECTED - Action Required:');
  console.log('   1. Keep Vercel MCP in only ONE location:');
  console.log('      - Either in project config (.cursor/mcp.json)');
  console.log('      - OR in global config (~/.cursor/mcp.json)');
  console.log('   2. Remove the duplicate entry from the other config');
  console.log('   3. Restart Cursor after making changes');
  console.log('\n   📝 To fix:');
  const globalVercel = Object.keys(allVercelServers).filter(k => allVercelServers[k].source === 'global');
  const projectVercel = Object.keys(allVercelServers).filter(k => allVercelServers[k].source === 'project');
  if (globalVercel.length > 0 && projectVercel.length > 0) {
    console.log('      - Remove Vercel from one of the configs');
    console.log(`      - Global: ${globalMcpPath}`);
    console.log(`      - Project: ${projectMcpPath}`);
  } else if (globalVercel.length > 1) {
    console.log(`      - Remove duplicate entries from: ${globalMcpPath}`);
  } else if (projectVercel.length > 1) {
    console.log(`      - Remove duplicate entries from: ${projectMcpPath}`);
  }
} else if (Object.keys(allVercelServers).length === 0) {
  console.log('   ℹ️  No Vercel MCP servers found in config files.');
  console.log('   If duplicates appear, they may be from:');
  console.log('   - Cursor\'s built-in/default MCP servers');
  console.log('   - Another configuration location');
} else {
  console.log('   ✅ Only one Vercel MCP server found.');
  console.log('   If duplicates still appear, they may be from:');
  console.log('   - Cursor\'s built-in Vercel MCP server');
  console.log('   - Try disabling built-in servers in Cursor settings');
}

console.log('\n');

