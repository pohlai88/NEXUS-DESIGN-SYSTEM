# Publish to npm Locally (Direct)

This guide shows you how to publish the Neo-Analog Design System directly to npm from your local machine.

## Prerequisites

1. ✅ npm account created
2. ✅ npm token ready: `YOUR_NPM_TOKEN_HERE`
3. ✅ Package built and ready

## Step 1: Login to npm

```powershell
# Login to npm using your token
npm login --auth-type=legacy

# When prompted:
# Username: (your npm username)
# Password: (your npm password)
# Email: (your npm email)
```

**OR** use token directly:

```powershell
# Set npm token
$env:NPM_TOKEN = "YOUR_NPM_TOKEN_HERE"

# Create .npmrc file
echo "//registry.npmjs.org/:_authToken=$env:NPM_TOKEN" > .npmrc
```

## Step 2: Verify Package

```powershell
# Check what will be published
npm pack --dry-run

# Verify package.json
npm view @aibos/design-system 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "✅ Package name is available"
} else {
    Write-Host "⚠️ Package already exists - will update version"
}
```

## Step 3: Build Package

```powershell
# Build the package
pnpm build

# Verify build output
if (Test-Path "style.css" -and Test-Path "dist/tokens.json") {
    Write-Host "✅ Build successful"
} else {
    Write-Host "❌ Build failed - missing files"
    exit 1
}
```

## Step 4: Run Quality Checks (Optional but Recommended)

```powershell
# Run quality checks
pnpm quality
```

## Step 5: Publish to npm

```powershell
# Publish to npm (public)
npm publish --access public

# Or with pnpm
pnpm publish --access public
```

## Step 6: Verify Publication

```powershell
# Check package on npm
npm view @aibos/design-system

# Test install
npm install @aibos/design-system --dry-run
```

## Complete Script

Here's a complete PowerShell script to publish:

```powershell
# Set npm token
$env:NPM_TOKEN = "YOUR_NPM_TOKEN_HERE"
echo "//registry.npmjs.org/:_authToken=$env:NPM_TOKEN" > .npmrc

# Build
Write-Host "Building package..." -ForegroundColor Cyan
pnpm build

# Verify build
if (-not (Test-Path "style.css")) {
    Write-Host "❌ style.css not found" -ForegroundColor Red
    exit 1
}
if (-not (Test-Path "dist/tokens.json")) {
    Write-Host "❌ dist/tokens.json not found" -ForegroundColor Red
    exit 1
}

# Quality check
Write-Host "Running quality checks..." -ForegroundColor Cyan
pnpm quality

# Publish
Write-Host "Publishing to npm..." -ForegroundColor Cyan
npm publish --access public

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Published successfully!" -ForegroundColor Green
    Write-Host "Package: https://www.npmjs.com/package/@aibos/design-system" -ForegroundColor Green
} else {
    Write-Host "❌ Publish failed" -ForegroundColor Red
}
```

## Troubleshooting

### Error: "You do not have permission to publish"

**Solution:**
- Verify you're logged in: `npm whoami`
- Check if `@aibos` organization exists on npm
- Ensure you have publish permissions for the organization

### Error: "Package name already exists"

**Solution:**
- Check current version: `npm view @aibos/design-system version`
- Update version in `package.json` if needed
- Or use a different package name

### Error: "Invalid token"

**Solution:**
- Regenerate npm token at https://www.npmjs.com/settings/YOUR_USERNAME/tokens
- Update the token in `.npmrc` or environment variable

## After Publishing

1. ✅ Verify on npm: https://www.npmjs.com/package/@aibos/design-system
2. ✅ Test installation: `npm install @aibos/design-system`
3. ✅ Update documentation if needed
4. ✅ Create Git tag: `git tag v1.0.0 && git push origin v1.0.0`

---

**Ready to publish?** Run the script above or follow the steps manually!

