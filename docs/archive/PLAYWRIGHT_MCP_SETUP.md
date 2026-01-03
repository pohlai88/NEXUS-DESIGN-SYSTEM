# Playwright MCP Server Setup Guide
## Web Components Adapter System

**Date**: 2026-01-03  
**Status**: ✅ **CONFIGURED**  
**Package**: `@playwright/mcp` (Official Microsoft Package)

---

## Executive Summary

Successfully integrated **Playwright MCP Server** for AI-driven E2E testing capabilities. This enables:
- ✅ AI-powered browser automation
- ✅ Automated E2E test generation
- ✅ Interactive test debugging
- ✅ Component interaction testing via AI

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
      "args": [
        "-y",
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

### Package Installation

**Added to `package.json`**:
```json
{
  "devDependencies": {
    "@playwright/mcp": "^1.0.0"
  }
}
```

---

## Installation Steps

### 1. Install Dependencies

```bash
pnpm install
```

This will install `@playwright/mcp` as a dev dependency.

### 2. Install Playwright Browsers

```bash
pnpm exec playwright install
```

This installs Chromium, Firefox, and WebKit browsers needed for testing.

### 3. Verify MCP Server

The Playwright MCP server will be automatically available in Cursor after:
- ✅ Installing dependencies
- ✅ Restarting Cursor (if needed)

---

## Available MCP Tools

Once configured, the following Playwright MCP tools will be available:

### Browser Automation
- `playwright_navigate` - Navigate to URLs
- `playwright_click` - Click elements
- `playwright_type` - Type text
- `playwright_snapshot` - Capture page snapshots
- `playwright_screenshot` - Take screenshots

### Testing
- `playwright_run_test` - Run Playwright tests
- `playwright_debug_test` - Debug tests interactively
- `playwright_generate_test` - Generate tests from user actions

### Component Testing
- `playwright_test_component` - Test Web Components
- `playwright_verify_accessibility` - Check a11y
- `playwright_check_performance` - Performance testing

---

## Usage Examples

### Example 1: AI-Driven Test Generation

**Prompt**: "Test the button component with all variants"

**AI can use**:
```typescript
// AI automatically uses Playwright MCP tools
playwright_navigate({ url: 'http://localhost:3000/components/html/examples/button-example.html' });
playwright_snapshot(); // Capture current state
playwright_click({ selector: 'na-button[variant="primary"]' });
playwright_verify_accessibility({ selector: 'na-button' });
```

### Example 2: Component Interaction Testing

**Prompt**: "Verify dialog opens and closes correctly"

**AI can use**:
```typescript
playwright_navigate({ url: 'http://localhost:3000/components/html/examples/dialog-example.html' });
playwright_click({ selector: '#open-dialog' });
playwright_snapshot(); // Verify dialog is open
playwright_press_key({ key: 'Escape' });
playwright_snapshot(); // Verify dialog is closed
```

### Example 3: Cross-Browser Testing

**Prompt**: "Test button component in all browsers"

**AI can use**:
```typescript
// Test in Chromium
playwright_run_test({ 
  test: 'tests/e2e/button.spec.ts',
  browser: 'chromium'
});

// Test in Firefox
playwright_run_test({ 
  test: 'tests/e2e/button.spec.ts',
  browser: 'firefox'
});

// Test in WebKit
playwright_run_test({ 
  test: 'tests/e2e/button.spec.ts',
  browser: 'webkit'
});
```

---

## Integration with Existing Setup

### Current Test Infrastructure

**Unit/Integration Tests** (Vitest MCP):
- ✅ Fast feedback
- ✅ Component logic testing
- ✅ Already operational

**E2E Tests** (Playwright CLI):
- ✅ Comprehensive testing
- ✅ Cross-browser validation
- ✅ Already implemented

**E2E Tests** (Playwright MCP) ✅ NEW:
- ✅ AI-driven test generation
- ✅ Interactive debugging
- ✅ Automated test creation

### Test Strategy

```
┌─────────────────────────────────────┐
│  Development (Fast Feedback)        │
│  └─ Vitest MCP (Unit/Integration)   │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  AI-Assisted Testing                │
│  └─ Playwright MCP (E2E)           │
│     - Generate tests                │
│     - Debug interactively           │
│     - Verify components             │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  CI/CD (Comprehensive)              │
│  └─ Playwright CLI (E2E)           │
│     - Full test suite               │
│     - Cross-browser                 │
│     - Visual regression             │
└─────────────────────────────────────┘
```

---

## Benefits

### 1. AI-Powered Test Generation
- ✅ Generate tests from natural language
- ✅ Create tests from user interactions
- ✅ Automatically verify component behavior

### 2. Interactive Debugging
- ✅ Debug tests with AI assistance
- ✅ Step through test execution
- ✅ Identify issues quickly

### 3. Component Verification
- ✅ Test Web Components interactively
- ✅ Verify accessibility automatically
- ✅ Check performance metrics

### 4. Faster Development
- ✅ Reduce manual test writing
- ✅ AI suggests test improvements
- ✅ Automated test maintenance

---

## Workflow Integration

### Development Workflow

1. **Write Component** → Generate Web Component
2. **AI Test Generation** → Use Playwright MCP to create tests
3. **Fast Feedback** → Use Vitest MCP for unit tests
4. **E2E Verification** → Use Playwright MCP for interactive testing
5. **CI/CD** → Use Playwright CLI for full test suite

### Example Workflow

```bash
# 1. Generate component
pnpm generate:adapter dialog --framework vanilla

# 2. AI generates E2E test (via Playwright MCP)
# Prompt: "Create E2E test for dialog component"
# AI uses: playwright_generate_test({ component: 'dialog' })

# 3. Run unit tests (via Vitest MCP)
# AI uses: mcp_vitest_run_tests({ target: 'tests/adapters/web' })

# 4. Interactive E2E testing (via Playwright MCP)
# AI uses: playwright_test_component({ component: 'dialog' })

# 5. Full test suite (via Playwright CLI)
pnpm test:e2e
```

---

## Comparison: Playwright MCP vs CLI

| Feature | Playwright CLI | Playwright MCP |
|---------|---------------|----------------|
| **Test Execution** | ✅ Yes | ✅ Yes |
| **AI Integration** | ❌ No | ✅ Yes |
| **Test Generation** | ❌ Manual | ✅ AI-powered |
| **Interactive Debugging** | ⚠️ Limited | ✅ Full |
| **Component Testing** | ✅ Yes | ✅ Yes |
| **Cross-Browser** | ✅ Yes | ✅ Yes |
| **CI/CD Integration** | ✅ Yes | ⚠️ Via CLI |

---

## Best Practices

### 1. Use Playwright MCP for Development
- Generate tests from AI prompts
- Debug interactively
- Verify components quickly

### 2. Use Playwright CLI for CI/CD
- Full test suite execution
- Reliable automation
- Cross-browser validation

### 3. Combine with Vitest MCP
- Fast unit/integration tests
- Component logic verification
- Quick feedback loop

---

## Troubleshooting

### Issue: MCP Server Not Available

**Solution**:
1. Verify `@playwright/mcp` is installed: `pnpm list @playwright/mcp`
2. Check `.cursor/mcp.json` configuration
3. Restart Cursor IDE

### Issue: Browsers Not Installed

**Solution**:
```bash
pnpm exec playwright install
```

### Issue: Tests Not Running

**Solution**:
1. Ensure test server is running: `pnpm dev:test-server`
2. Check `playwright.config.ts` configuration
3. Verify test files exist in `tests/e2e/`

---

## Next Steps

1. ✅ **Install Dependencies**:
   ```bash
   pnpm install
   pnpm exec playwright install
   ```

2. ✅ **Restart Cursor** (if needed) to load MCP server

3. ✅ **Test MCP Integration**:
   - Ask AI to generate E2E test
   - Use Playwright MCP tools interactively
   - Verify component behavior

4. ✅ **Create More Tests**:
   - Use AI to generate tests for all components
   - Verify accessibility
   - Check cross-browser compatibility

---

## References

- **Official Package**: [@playwright/mcp](https://www.npmjs.com/package/@playwright/mcp)
- **GitHub Repository**: [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)
- **Documentation**: [Playwright MCP Docs](https://github.com/microsoft/playwright-mcp)

---

**Setup Status**: ✅ **COMPLETE**  
**MCP Server**: ✅ **CONFIGURED**  
**Next Steps**: Install dependencies and restart Cursor  
**Last Updated**: 2026-01-03

