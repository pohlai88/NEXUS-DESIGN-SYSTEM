# Publish Neo-Analog Design System to npm (Local)
# Run this script to publish directly to npm from your local machine

Write-Host "🚀 Publishing @aibos/design-system to npm..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Set npm token
# Replace with your actual npm token
$NPM_TOKEN = "YOUR_NPM_TOKEN_HERE"
Write-Host "📝 Setting up npm authentication..." -ForegroundColor Yellow
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc
Write-Host "✅ npm authentication configured" -ForegroundColor Green

# Step 2: Verify npm login
Write-Host ""
Write-Host "🔍 Verifying npm authentication..." -ForegroundColor Yellow
$whoami = npm whoami 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Logged in as: $whoami" -ForegroundColor Green
} else {
    Write-Host "⚠️ Could not verify login, but continuing..." -ForegroundColor Yellow
}

# Step 3: Check if package exists
Write-Host ""
Write-Host "🔍 Checking if package exists on npm..." -ForegroundColor Yellow
$packageInfo = npm view @aibos/design-system 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "⚠️ Package already exists on npm" -ForegroundColor Yellow
    $version = npm view @aibos/design-system version
    Write-Host "   Current version on npm: $version" -ForegroundColor Yellow
    $localVersion = (Get-Content package.json | ConvertFrom-Json).version
    Write-Host "   Local version: $localVersion" -ForegroundColor Yellow
} else {
    Write-Host "✅ Package name is available" -ForegroundColor Green
}

# Step 4: Build package
Write-Host ""
Write-Host "🔨 Building package..." -ForegroundColor Yellow
pnpm build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Step 5: Verify build output
Write-Host ""
Write-Host "✅ Verifying build output..." -ForegroundColor Yellow
if (-not (Test-Path "style.css")) {
    Write-Host "❌ style.css not found after build" -ForegroundColor Red
    exit 1
}
if (-not (Test-Path "dist/tokens.json")) {
    Write-Host "❌ dist/tokens.json not found after build" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build output verified" -ForegroundColor Green

# Step 6: Run quality checks (optional)
Write-Host ""
$runQuality = Read-Host "Run quality checks before publishing? (y/n)"
if ($runQuality -eq "y" -or $runQuality -eq "Y") {
    Write-Host "🔍 Running quality checks..." -ForegroundColor Yellow
    pnpm quality
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️ Quality checks failed, but continuing..." -ForegroundColor Yellow
    } else {
        Write-Host "✅ Quality checks passed" -ForegroundColor Green
    }
}

# Step 7: Show what will be published
Write-Host ""
Write-Host "📦 Package contents:" -ForegroundColor Yellow
npm pack --dry-run 2>&1 | Select-String "package size"

# Step 8: Confirm publish
Write-Host ""
$confirm = Read-Host "Ready to publish to npm? (y/n)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "❌ Publish cancelled" -ForegroundColor Yellow
    exit 0
}

# Step 9: Publish
Write-Host ""
Write-Host "🚀 Publishing to npm..." -ForegroundColor Cyan
npm publish --access public

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully published to npm!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📦 Package: https://www.npmjs.com/package/@aibos/design-system" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🧪 Test installation:" -ForegroundColor Yellow
    Write-Host "   npm install @aibos/design-system" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Publish failed. Check the error messages above." -ForegroundColor Red
    exit 1
}

# Cleanup
Write-Host ""
Write-Host "🧹 Cleaning up..." -ForegroundColor Yellow
Remove-Item .npmrc -ErrorAction SilentlyContinue
Write-Host "✅ Done!" -ForegroundColor Green

