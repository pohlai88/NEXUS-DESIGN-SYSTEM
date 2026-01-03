# Next.js MCP Server Setup Guide
## AIBOS Design System

**Date**: 2026-01-03  
**Status**: ✅ **CONFIGURED**  
**Package**: `next-devtools-mcp` (Official Next.js Package)

---

## Executive Summary

Successfully integrated **Next.js MCP Server** for AI-driven Next.js development capabilities. This enables:
- ✅ Real-time error detection from Next.js dev server
- ✅ Live state queries and runtime diagnostics
- ✅ Page metadata and route discovery
- ✅ Server Actions inspection
- ✅ Development logs access

---

## Configuration

### MCP Server Configuration

**File**: `.cursor/mcp.json`

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
    }
  }
}
```

**Status**: ✅ **CONFIGURED** - Added to `.cursor/mcp.json`

---

## How It Works

### Auto-Discovery

The Next.js MCP server automatically discovers running Next.js development servers:

1. **Start your Next.js app**:
   ```bash
   # In your Next.js app directory
   pnpm dev
   # or
   npm run dev
   ```

2. **MCP auto-discovers** the running server on the default port (3000)

3. **AI agents can now access**:
   - Build errors
   - Runtime errors
   - Type errors
   - Page routes
   - Component hierarchies
   - Server Actions
   - Development logs

---

## Available MCP Tools

Once configured and a Next.js server is running, the following tools are available:

### Error Detection
- **Get build errors** - Current TypeScript/build errors
- **Get runtime errors** - Runtime errors from the dev server
- **Get type errors** - TypeScript type checking errors

### Live State Queries
- **Query page routes** - Discover all routes in your app
- **Get component info** - Component metadata and props
- **Inspect Server Actions** - Server Action definitions

### Development Tools
- **Access dev logs** - Development server console output
- **Check route status** - Route rendering status
- **Component hierarchy** - Component tree structure

---

## Usage with AIBOS Design System

### Example: Testing Components in Next.js

1. **Create a Next.js app** that uses `@aibos/design-system`:
   ```bash
   npx create-next-app@latest my-app
   cd my-app
   pnpm add @aibos/design-system
   ```

2. **Use components in your app**:
   ```tsx
   // app/page.tsx
   import { Button, Card } from '@aibos/design-system/react';
   
   export default function Page() {
     return (
       <Card>
         <Button>Click me</Button>
       </Card>
     );
   }
   ```

3. **Start dev server**:
   ```bash
   pnpm dev
   ```

4. **MCP tools can now**:
   - Check if components are loading correctly
   - Detect any build/runtime errors
   - Inspect component usage
   - Verify routes are working

---

## Integration with Other MCP Servers

### Combined Workflow

You can use Next.js MCP alongside other MCP servers:

1. **Next.js MCP** - Check app status, errors, routes
2. **Vitest MCP** - Run unit/integration tests
3. **Playwright MCP** - Run E2E tests in browser
4. **GitHub MCP** - Manage issues, PRs, code

### Example Workflow

```typescript
// 1. Check Next.js app status (Next.js MCP)
// 2. Run unit tests (Vitest MCP)
// 3. Run E2E tests (Playwright MCP)
// 4. Create PR with results (GitHub MCP)
```

---

## Troubleshooting

### MCP Server Not Connecting

**Issue**: Next.js MCP shows as disconnected

**Solutions**:
1. Ensure Next.js dev server is running (`pnpm dev`)
2. Check if server is on default port (3000)
3. Restart Cursor to reload MCP configuration
4. Verify `.cursor/mcp.json` has correct configuration

### No Tools Available

**Issue**: Next.js MCP tools not showing up

**Solutions**:
1. Ensure `next-devtools-mcp` package is available (installed via npx)
2. Check Next.js version (requires Next.js 16+)
3. Verify dev server is running and accessible
4. Check Cursor MCP status (should show green/connected)

---

## Next Steps

1. ✅ **Configuration Complete** - Next.js MCP is configured
2. **Create Next.js App** - Set up a Next.js app using this design system
3. **Start Dev Server** - Run `pnpm dev` in your Next.js app
4. **Use MCP Tools** - AI agents can now access Next.js internals

---

## References

- [Next.js MCP Documentation](https://nextjs.org/docs/app/guides/mcp)
- [MCP Stack - Next.js Template](https://www.mcpstack.org/frameworks/nextjs/nextjs-mcp-server-template)
- [AIBOS Next.js Integration Guide](../docs/NEXTJS_INTEGRATION.md)

---

**Status**: ✅ **READY TO USE**

Once you have a Next.js app running with this design system, the MCP tools will automatically be available for AI-assisted development!

