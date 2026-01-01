# NPM Publish Script with OTP Support
# Usage: .\scripts\publish-npm.ps1 [OTP_CODE]

param(
    [string]$OtpCode = ""
)

Write-Host "🚀 Publishing @aibos/design-system to npm..." -ForegroundColor Cyan

# Check if logged in
Write-Host "`n📋 Checking npm authentication..." -ForegroundColor Yellow
$whoami = npm whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged in to npm. Please run: npm login" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Logged in as: $whoami" -ForegroundColor Green

# Build package
Write-Host "`n🔨 Building package..." -ForegroundColor Yellow
pnpm build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful!" -ForegroundColor Green

# Publish
Write-Host "`n📦 Publishing to npm..." -ForegroundColor Yellow
if ($OtpCode) {
    Write-Host "Using OTP code provided..." -ForegroundColor Cyan
    npm publish --access public --otp=$OtpCode
} else {
    Write-Host "⚠️  No OTP code provided. npm will prompt for it." -ForegroundColor Yellow
    Write-Host "💡 Tip: Get OTP from your authenticator app and run:" -ForegroundColor Cyan
    Write-Host "   .\scripts\publish-npm.ps1 -OtpCode YOUR_OTP_CODE" -ForegroundColor Cyan
    Write-Host "`nAttempting publish (you'll be prompted for OTP)..." -ForegroundColor Yellow
    npm publish --access public
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Package published successfully!" -ForegroundColor Green
    Write-Host "📦 Package: @aibos/design-system" -ForegroundColor Cyan
    Write-Host "🌐 View at: https://www.npmjs.com/package/@aibos/design-system" -ForegroundColor Cyan
    
    # Verify
    Write-Host "`n🔍 Verifying publication..." -ForegroundColor Yellow
    npm view @aibos/design-system
} else {
    Write-Host "`n❌ Publish failed!" -ForegroundColor Red
    Write-Host "💡 If you need an OTP code, get it from your authenticator app and run:" -ForegroundColor Yellow
    Write-Host "   .\scripts\publish-npm.ps1 -OtpCode YOUR_OTP_CODE" -ForegroundColor Cyan
    exit 1
}

