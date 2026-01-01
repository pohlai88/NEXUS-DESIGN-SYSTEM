# NPM Package Deprecation Guide

**Old Package**: `aibos-design-system` (deprecated)  
**New Package**: `@aibos/design-system` (current)

---

## Steps to Deprecate Old Package on npm

### Prerequisites

1. **Publish the new package** `@aibos/design-system` first
2. **Ensure you have access** to the old `aibos-design-system` package on npm
3. **Login to npm** with the account that owns the old package

### Step 1: Login to npm

```bash
npm login
```

Verify you're logged in:
```bash
npm whoami
```

### Step 2: Deprecate the Old Package

Deprecate all versions of `aibos-design-system` with a message pointing to the new package:

```bash
npm deprecate aibos-design-system@* "This package has been moved to @aibos/design-system. Please install @aibos/design-system instead. See https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM/blob/main/docs/MIGRATION_GUIDE.md for migration instructions."
```

Or deprecate specific versions:

```bash
# Deprecate all versions
npm deprecate aibos-design-system@* "Moved to @aibos/design-system"

# Deprecate specific version range
npm deprecate aibos-design-system@"<2.0.0" "Moved to @aibos/design-system"
```

### Step 3: Verify Deprecation

Check that the deprecation notice appears:

```bash
npm view aibos-design-system
```

You should see a deprecation warning in the output.

### Step 4: Update Package README (Optional)

If you have access to update the old package's README, add a deprecation notice at the top:

```markdown
# ⚠️ DEPRECATED

This package has been moved to `@aibos/design-system`.

**Please install the new package:**
```bash
npm install @aibos/design-system
```

See [Migration Guide](https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM/blob/main/docs/MIGRATION_GUIDE.md) for instructions.
```

---

## Publishing the New Package

### Step 1: Ensure @aibos Organization Exists

1. Go to https://www.npmjs.com/org/create
2. Create the `@aibos` organization (if it doesn't exist)
3. Add team members as needed

### Step 2: Build the Package

```bash
pnpm build
```

### Step 3: Publish the New Package

```bash
# Login to npm (if not already logged in)
npm login

# Publish with public access (required for scoped packages)
npm publish --access public
```

### Step 4: Verify Publication

```bash
npm view @aibos/design-system
```

Visit the package page: https://www.npmjs.com/package/@aibos/design-system

---

## Complete Workflow

```bash
# 1. Build
pnpm build

# 2. Login
npm login

# 3. Publish new package
npm publish --access public

# 4. Verify new package
npm view @aibos/design-system

# 5. Deprecate old package
npm deprecate aibos-design-system@* "This package has been moved to @aibos/design-system. Please install @aibos/design-system instead."

# 6. Verify deprecation
npm view aibos-design-system
```

---

## What Happens After Deprecation

1. **Users installing the old package** will see a deprecation warning:
   ```
   npm WARN deprecated aibos-design-system@1.1.0: This package has been moved to @aibos/design-system
   ```

2. **The old package remains installable** but won't receive updates

3. **npm search results** will show the deprecation notice

4. **Package page** will display a deprecation banner

---

## Reverting Deprecation (If Needed)

If you need to revert the deprecation:

```bash
npm deprecate aibos-design-system@* ""
```

(Empty string removes the deprecation notice)

---

## Best Practices

1. ✅ **Publish new package first** before deprecating old one
2. ✅ **Provide clear migration path** in deprecation message
3. ✅ **Update documentation** with migration guide
4. ✅ **Give users time** to migrate (don't remove immediately)
5. ✅ **Monitor downloads** of old package to track migration progress

---

## Timeline Recommendation

- **Week 1**: Publish `@aibos/design-system`
- **Week 2**: Announce migration in release notes
- **Week 3**: Deprecate `aibos-design-system` with migration notice
- **Month 3+**: Consider removing old package (if downloads drop significantly)

---

**Questions?** Check the [Migration Guide](./docs/MIGRATION_GUIDE.md) or open an issue on GitHub.

