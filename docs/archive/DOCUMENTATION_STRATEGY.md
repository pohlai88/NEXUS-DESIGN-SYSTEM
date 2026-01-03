# Documentation Strategy - Single Source of Truth

**Date**: 2026-01-03  
**Status**: ✅ **Active Strategy**  
**Philosophy**: Code is the source of truth. Documentation should be auto-generated from codebase.

---

## Executive Summary

This document defines the **single source of truth** for documentation management in the Neo-Analog Design System repository.

### Core Principles

1. **Auto-Generation First**: All API, token, and component docs are generated from code
2. **Minimal Manual Docs**: Only guides, examples, and governance are manual
3. **Zero Drift**: Documentation always matches codebase
4. **Build Integration**: Docs regenerate on every build
5. **CI/CD Validation**: Automated checks ensure docs stay current

---

## Documentation Structure

### Auto-Generated Documentation

These files are **automatically generated** from the codebase and should **never be manually edited**:

| File | Source | Generator | Frequency |
|------|--------|-----------|-----------|
| `docs/API_REFERENCE.md` | TypeScript source files | `scripts/generate-api-docs.js` | On build |
| `docs/TOKEN_REFERENCE.md` | `dist/tokens.json` + CSS | `scripts/generate-token-docs.js` | On build |
| `docs/COMPONENTS.md` | Component source files | `scripts/generate-component-docs.js` | On build |
| `docs/DESIGN_SYSTEM.md` | All generated docs | `scripts/generate-design-system-index.js` | On build |
| `CHANGELOG.md` | Git commits | `conventional-changelog` | On release |

### Manual Documentation (Keep)

These files are **manually maintained** and contain guides, examples, and governance:

#### Root Level
- `README.md` - Main entry point
- `QUICK_REFERENCE.md` - Cheat sheet
- `LICENSE` - Legal requirement

#### User-Facing Guides
- `docs/EXTERNAL_USAGE.md` - npm package usage guide
- `docs/INTEGRATION_GUIDE.md` - Framework integration guide
- `docs/IDE_INTEGRATION.md` - IDE setup guide
- `docs/MIGRATION_GUIDE.md` - Version migration guide
- `docs/GOVERNANCE.md` - Design system governance rules
- `docs/COMPONENT_USAGE_EXAMPLES.md` - Component examples
- `docs/MOTION_DESIGN_SYSTEM.md` - Motion design guidelines

#### Next.js Integration
- `docs/NEXTJS_INTEGRATION.md` - Next.js setup
- `docs/NEXTJS_WEB_COMPONENTS_OPTIMIZATION.md` - Web components optimization
- `docs/NEXTJS_MCP_SETUP.md` - MCP setup for Next.js

#### Storybook
- `docs/STORYBOOK_DEPLOYMENT_GUIDE.md` - Deployment guide
- `docs/STORYBOOK_SETUP_AND_OPTIMIZATION.md` - Setup guide
- `docs/STORYBOOK_INDEPENDENT_DEPLOYMENT.md` - Independent deployment
- `docs/STORYBOOK_CLI_AND_CONSISTENCY_TOOLS.md` - CLI tools

#### Testing
- `docs/TESTING_QUICK_REFERENCE.md` - Testing quick reference
- `docs/TESTING_NEXTJS_ALIGNMENT.md` - Next.js testing alignment
- `docs/PLAYWRIGHT_MCP_SETUP.md` - Playwright MCP setup
- `docs/PLAYWRIGHT_MCP_QUICK_START.md` - Playwright quick start
- `docs/PLAYWRIGHT_E2E_MCP_INTEGRATION.md` - E2E integration
- `docs/VITEST_MCP_STATUS.md` - Vitest MCP status
- `docs/VITEST_MCP_HELP.md` - Vitest MCP help

#### System Management
- `docs/MULTI_REPO_MANAGEMENT.md` - Multi-repo management
- `docs/QUICK_REMOTE_REFERENCE.md` - Quick remote reference
- `docs/VERCEL_MCP_DUPLICATE_DIAGNOSIS.md` - Vercel MCP diagnosis

#### Theme System (Manual Guides)
- `docs/THEME_SYSTEM_COMPLETE_GUIDE.md` - Complete theme guide
- `docs/DEVELOPER_GUIDE_THEMES.md` - Theme developer guide
- Individual theme guides (if needed for specific themes)

#### Shell System (Manual Guides)
- `docs/SHELL_SYSTEM_COMPLETE_DOCUMENTATION.md` - Complete shell documentation
- `docs/SHELL_SYSTEM_GUIDE.md` - Basic shell guide
- `docs/ADVANCED_SHELLS_COMPLETE_GUIDE.md` - Advanced shells
- `docs/MODAL_SHELLS_COMPLETE.md` - Modal shells
- `docs/EXCEPTION_SHELL_COMPLETE.md` - Exception shell
- `docs/SHELL_SYSTEM_QUICK_REFERENCE.md` - Shell quick reference

**Total Manual Files**: ~30 files

---

## Files to Delete

All files that are **not** in the "Keep" lists above should be deleted. This includes:

### Status/Completion Reports (Delete All)
- All `*_COMPLETE.md`, `*_STATUS.md`, `*_SUMMARY.md` files
- All `PHASE_*` reports
- All audit reports
- All implementation process docs

### Analysis/Research (Delete All)
- All comparison analyses
- All optimization recommendations
- All research documents
- All assessment docs

### Duplicates/Outdated (Delete All)
- Multiple index files
- Outdated guides
- Temporary planning docs

**Estimated Files to Delete**: ~120 files

---

## Automation Scripts

### Cleanup Script

**File**: `scripts/cleanup-docs.js`  
**Usage**: 
```bash
pnpm cleanup:docs          # Delete files
pnpm cleanup:docs:dry-run  # Preview deletions
```

**Function**: Removes all outdated/redundant documentation files based on the keep/delete lists above.

### Documentation Generation

**File**: `scripts/generate-all-docs.js`  
**Usage**: `pnpm generate:docs`

**Function**: Generates all auto-generated documentation files.

**Individual Generators**:
- `scripts/generate-api-docs.js` - API reference from TypeScript
- `scripts/generate-token-docs.js` - Token reference from tokens.json
- `scripts/generate-component-docs.js` - Component docs from source
- `scripts/generate-design-system-index.js` - Design system index

---

## Build Integration

Documentation generation is integrated into the build process:

```json
{
  "scripts": {
    "build": "... && pnpm generate:docs",
    "generate:docs": "node scripts/generate-all-docs.js",
    "cleanup:docs": "node scripts/cleanup-docs.js",
    "cleanup:docs:dry-run": "node scripts/cleanup-docs.js --dry-run"
  }
}
```

### Build Workflow

1. **Build CSS** → `build:css`
2. **Build TypeScript** → `build:ts`
3. **Extract Tokens** → `extract:tokens`
4. **Generate Docs** → `generate:docs` (auto-generates all docs)
5. **Validate** → `validate:all`

---

## CI/CD Integration

### Documentation Validation

Add to GitHub Actions workflow:

```yaml
- name: Generate Documentation
  run: pnpm generate:docs

- name: Check Documentation is Up-to-Date
  run: |
    if [ -n "$(git diff docs/ CHANGELOG.md)" ]; then
      echo "❌ Documentation is out of date!"
      echo "Run: pnpm generate:docs"
      exit 1
    fi
```

This ensures documentation is always current with the codebase.

---

## Maintenance Workflow

### Daily Development

1. Write code with JSDoc comments
2. Build automatically generates docs
3. Commit code + generated docs together

### Before Release

1. Run `pnpm generate:docs` to ensure docs are current
2. Run `pnpm cleanup:docs:dry-run` to check for outdated files
3. Review generated documentation
4. Commit any doc updates

### Periodic Cleanup

1. Run `pnpm cleanup:docs:dry-run` to preview deletions
2. Review preview
3. Run `pnpm cleanup:docs` to clean up
4. Commit cleanup

---

## File Naming Conventions

### Auto-Generated Files
- Always in `docs/` directory
- UPPERCASE with underscores: `API_REFERENCE.md`
- Include "Auto-generated" header comment
- Include last updated timestamp

### Manual Files
- Descriptive names
- UPPERCASE with underscores for guides
- Lowercase with hyphens for specific topics

---

## Documentation Quality Standards

### Auto-Generated Docs Must Include

1. **Header**: Auto-generated notice + timestamp
2. **Table of Contents**: For long documents
3. **Code Examples**: From test files or examples
4. **Type Information**: From TypeScript types
5. **Usage Guidelines**: From JSDoc comments

### Manual Docs Must Include

1. **Purpose**: Clear explanation of what the doc covers
2. **Audience**: Who should read this
3. **Examples**: Real-world usage examples
4. **Links**: Cross-references to related docs

---

## Migration Plan

### Phase 1: Cleanup (Week 1)
- [ ] Run cleanup script (dry-run first)
- [ ] Review and approve deletions
- [ ] Execute cleanup
- [ ] Verify kept files are current

### Phase 2: Enhance Generation (Week 1-2)
- [ ] Enhance API docs generator
- [ ] Create token docs generator
- [ ] Create component docs generator
- [ ] Create design system index generator
- [ ] Test all generators

### Phase 3: Integration (Week 2)
- [ ] Integrate into build process
- [ ] Set up CI/CD validation
- [ ] Test full workflow
- [ ] Update README with new structure

### Phase 4: Maintenance (Ongoing)
- [ ] Monitor doc generation
- [ ] Update generators as needed
- [ ] Periodic cleanup reviews

---

## Success Metrics

- ✅ **Zero Manual API Docs**: All API docs auto-generated
- ✅ **Build Integration**: Docs generate on every build
- ✅ **CI/CD Validation**: Automated checks prevent drift
- ✅ **Reduced File Count**: From 149 → ~30 manual files
- ✅ **Always Current**: Docs match codebase 100%

---

## Troubleshooting

### Docs Not Generating

1. Check build process completed successfully
2. Verify generator scripts exist and are executable
3. Check for errors in generator scripts
4. Verify source files exist

### Docs Out of Date

1. Run `pnpm generate:docs` manually
2. Check CI/CD validation is working
3. Verify build process includes doc generation

### Too Many Files

1. Run `pnpm cleanup:docs:dry-run`
2. Review preview
3. Update cleanup script if needed
4. Run cleanup

---

**Last Updated**: 2026-01-03  
**Maintainer**: AI-BOS Team  
**Review Frequency**: Quarterly

