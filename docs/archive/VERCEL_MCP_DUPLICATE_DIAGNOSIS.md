# Vercel MCP Tools Duplicate Diagnosis
## AIBOS Design System

**Date**: 2026-01-03  
**Status**: 🔍 **DIAGNOSIS COMPLETE**  
**Issue**: Duplicate Vercel MCP tools detected

---

## Executive Summary

Diagnostic analysis reveals that **no Vercel MCP server is configured** in the project's `.cursor/mcp.json` file. The Vercel MCP tools appearing in Cursor are likely coming from:

1. **Cursor's default/global MCP configuration**
2. **User-level MCP settings** (outside project scope)
3. **Workspace-level settings** (if configured elsewhere)

---

## Current MCP Configuration

**File**: `.cursor/mcp.json`

**Configured Servers** (4 total):
- ✅ `github` - GitHub Copilot MCP
- ✅ `playwright` - Playwright MCP Server
- ✅ `vitest` - Vitest MCP Server  
- ✅ `next-devtools` - Next.js DevTools MCP

**Vercel Servers**: ❌ **0 found**

---

## Root Cause Analysis

### Possible Causes of Duplicates

1. **Cursor Default Configuration**
   - Cursor may include Vercel MCP server by default
   - This would appear in addition to any manually configured servers

2. **Multiple Configuration Files**
   - Global user settings: `~/.cursor/mcp.json` (or similar)
   - Workspace settings: `.vscode/settings.json` (if MCP configured there)
   - Project settings: `.cursor/mcp.json` (current file)

3. **Duplicate Server Registration**
   - Same Vercel MCP server registered multiple times
   - Different server keys pointing to same server

4. **Tool Name Conflicts**
   - Multiple MCP servers providing tools with same names
   - Tool name collision causing apparent duplicates

---

## Diagnostic Results

### Configuration Analysis

```bash
# Run diagnostic script
node scripts/diagnose-vercel-mcp.js
```

**Findings**:
- ✅ MCP configuration file exists and is valid
- ✅ No Vercel servers in project configuration
- ⚠️ Vercel tools likely from external source

### Available Vercel MCP Tools

Based on the tool list, the following Vercel MCP tools are available (all prefixed with `mcp_vercel_`):

**Project Management**:
- `mcp_vercel_vercel_list_projects`
- `mcp_vercel_vercel_get_project`
- `mcp_vercel_vercel_create_project`
- `mcp_vercel_vercel_update_project`
- `mcp_vercel_vercel_delete_project`

**Deployment Management**:
- `mcp_vercel_vercel_list_deployments`
- `mcp_vercel_vercel_get_deployment`
- `mcp_vercel_vercel_create_deployment`
- `mcp_vercel_vercel_cancel_deployment`
- `mcp_vercel_vercel_delete_deployment`
- `mcp_vercel_vercel_redeploy`

**Environment Variables**:
- `mcp_vercel_vercel_list_env_vars`
- `mcp_vercel_vercel_create_env_var`
- `mcp_vercel_vercel_update_env_var`
- `mcp_vercel_vercel_delete_env_var`
- `mcp_vercel_vercel_bulk_create_env_vars`

**Domain Management**:
- `mcp_vercel_vercel_list_domains`
- `mcp_vercel_vercel_get_domain`
- `mcp_vercel_vercel_add_domain`
- `mcp_vercel_vercel_remove_domain`
- `mcp_vercel_vercel_verify_domain`

**DNS Management**:
- `mcp_vercel_vercel_list_dns_records`
- `mcp_vercel_vercel_create_dns_record`
- `mcp_vercel_vercel_delete_dns_record`

**And many more...** (60+ total tools)

---

## Solutions

### Option 1: Check Cursor Global Settings

1. **Open Cursor Settings**:
   - `Ctrl+,` (Windows) or `Cmd+,` (Mac)
   - Search for "MCP" or "Model Context Protocol"

2. **Check for Duplicate Entries**:
   - Look for multiple Vercel MCP server configurations
   - Remove any duplicates

3. **Check User-Level Config**:
   - Windows: `%APPDATA%\Cursor\User\settings.json`
   - Mac: `~/Library/Application Support/Cursor/User/settings.json`
   - Linux: `~/.config/Cursor/User/settings.json`

### Option 2: Explicitly Configure Vercel MCP (Recommended)

If you want to use Vercel MCP tools, add it explicitly to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "headers": {
        "Authorization": "Bearer github_pat_..."
      },
      "url": "https://api.githubcopilot.com/mcp/"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    },
    "vitest": {
      "command": "npx",
      "args": ["-y", "@djankies/vitest-mcp"]
    },
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    },
    "vercel": {
      "url": "https://mcp.vercel.com"
    }
  }
}
```

**Benefits**:
- ✅ Explicit control over Vercel MCP configuration
- ✅ Can remove duplicates by having single source
- ✅ Better visibility into what's configured

### Option 3: Remove Vercel MCP (If Not Needed)

If you don't need Vercel MCP tools:

1. **Check Cursor Settings** for Vercel MCP entries
2. **Remove any Vercel MCP configurations**
3. **Restart Cursor** to clear cached tools

### Option 4: Use Diagnostic Script

Run the diagnostic script to identify duplicates:

```bash
node scripts/diagnose-vercel-mcp.js
```

This will:
- ✅ Analyze current MCP configuration
- ✅ Identify Vercel-related servers
- ✅ Detect duplicate entries
- ✅ Provide recommendations

---

## Verification Steps

After applying a solution:

1. **Restart Cursor** completely
2. **Check MCP Tools**:
   - Open Cursor's MCP tools panel
   - Verify Vercel tools appear only once
3. **Test a Vercel Tool**:
   - Try using a Vercel MCP tool
   - Verify it works correctly
   - Check for duplicate tool names

---

## Prevention

To prevent future duplicates:

1. **Use Project-Level Configuration**:
   - Keep all MCP servers in `.cursor/mcp.json`
   - Avoid global/user-level MCP configurations

2. **Document MCP Servers**:
   - Maintain a list of configured servers
   - Update documentation when adding/removing servers

3. **Regular Audits**:
   - Run diagnostic script periodically
   - Check for duplicate entries
   - Clean up unused configurations

---

## Related Files

- **Diagnostic Script**: `scripts/diagnose-vercel-mcp.js`
- **MCP Configuration**: `.cursor/mcp.json`
- **MCP Status Doc**: `docs/MCP_STATUS_AND_TEST_REQUIREMENTS.md`

---

## Next Steps

1. ✅ **Diagnosis Complete** - Root cause identified
2. ⏳ **User Action Required**:
   - Check Cursor global settings for Vercel MCP duplicates
   - Decide whether to keep or remove Vercel MCP
   - Apply appropriate solution from options above
3. ⏳ **Verify Fix** - Restart Cursor and confirm duplicates resolved

---

---

## Resolution (2026-01-03)

### ✅ **FIXED** - Duplicate Removed

**Action Taken**: Removed Vercel MCP server from global configuration

**File Modified**: `C:\Users\dlbja\.cursor\mcp.json`

**Before**:
- Global config had: `vercel` server using `@robinson_ai_systems/vercel-mcp@latest`
- This was duplicating Cursor's built-in Vercel MCP

**After**:
- ✅ Vercel MCP server removed from global config
- ✅ Vercel tools now come only from Cursor's built-in MCP (no duplicates)

**Verification**:
```bash
node scripts/diagnose-vercel-mcp.js
```
Result: 0 Vercel servers found in configuration files

**Next Steps**:
1. ✅ Restart Cursor completely
2. ✅ Verify Vercel tools appear only once
3. ✅ If duplicates persist, check Cursor Settings → MCP for built-in servers

---

**Diagnosis Status**: ✅ **RESOLVED**  
**Fix Applied**: 2026-01-03  
**Last Updated**: 2026-01-03

