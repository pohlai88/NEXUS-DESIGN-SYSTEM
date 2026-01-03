# Playwright MCP Quick Start
## Web Components Adapter System

**Date**: 2026-01-03  
**Status**: ✅ **READY TO USE**

---

## Quick Setup (3 Steps)

### Step 1: Run Setup Script

```bash
node scripts/setup-playwright-mcp.js
```

This automatically updates `.cursor/mcp.json` with Playwright MCP configuration.

### Step 2: Install Dependencies

```bash
pnpm install
pnpm exec playwright install
```

### Step 3: Restart Cursor

Restart Cursor IDE to load the Playwright MCP server.

---

## Manual Configuration (If Script Fails)

If the script can't update `.cursor/mcp.json` (file protected), manually add:

```json
{
  "mcpServers": {
    "github": {
      // ... existing config ...
    },
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

---

## Verify Setup

After restarting Cursor, you should see Playwright MCP tools available:
- `playwright_navigate` - Navigate to URLs
- `playwright_click` - Click elements
- `playwright_snapshot` - Capture page state
- `playwright_generate_test` - Generate tests
- And more...

---

## Usage Example

**Ask AI**: "Test the button component with Playwright"

**AI will use**:
- Playwright MCP tools to navigate
- Click buttons
- Verify behavior
- Generate tests

---

**See**: `docs/PLAYWRIGHT_MCP_SETUP.md` for detailed documentation.

