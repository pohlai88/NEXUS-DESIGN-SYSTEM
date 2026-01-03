# Development Server for MCP (Model Context Protocol)
# 
# Runs development services needed for MCP tools to function:
# - TypeScript compilation watch mode
# - CSS build watch mode
# - Optional: Next.js dev server (if apps exist)

Write-Host "🚀 Starting MCP Development Services..." -ForegroundColor Green
Write-Host ""

$rootDir = $PSScriptRoot | Split-Path -Parent
Set-Location $rootDir

$jobs = @()

# Start TypeScript watch mode
Write-Host "📦 Starting TypeScript Compiler (watch mode)..." -ForegroundColor Cyan
$tsJob = Start-Job -ScriptBlock {
    Set-Location $using:rootDir
    pnpm exec tsc -p tsconfig.build.json --watch
}
$jobs += @{ Name = "TypeScript Compiler"; Job = $tsJob }

# Start CSS watch mode
Write-Host "🎨 Starting CSS Builder (watch mode)..." -ForegroundColor Cyan
$cssJob = Start-Job -ScriptBlock {
    Set-Location $using:rootDir
    pnpm exec postcss styles/input.css -o style.css --watch
}
$jobs += @{ Name = "CSS Builder"; Job = $cssJob }

# Check if Next.js app exists
$nextAppPath = Join-Path $rootDir "apps\portal"
if (Test-Path $nextAppPath) {
    Write-Host "📱 Next.js app detected, starting dev server..." -ForegroundColor Cyan
    $nextJob = Start-Job -ScriptBlock {
        Set-Location $using:rootDir
        pnpm --filter @aibos/portal dev
    }
    $jobs += @{ Name = "Next.js Dev Server"; Job = $nextJob }
} else {
    Write-Host "ℹ️  No Next.js app found. MCP tools will work with design system only." -ForegroundColor Yellow
    Write-Host "   To use Next.js MCP tools, create an app in apps/portal" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Dev services started!" -ForegroundColor Green
Write-Host "   Press Ctrl+C to stop all services" -ForegroundColor Yellow
Write-Host ""

# Monitor jobs
try {
    while ($true) {
        Start-Sleep -Seconds 1
        
        # Check if any job failed
        foreach ($item in $jobs) {
            if ($item.Job.State -eq "Failed") {
                Write-Host "❌ $($item.Name) failed!" -ForegroundColor Red
                Receive-Job $item.Job
            }
        }
    }
} finally {
    Write-Host ""
    Write-Host "🛑 Shutting down dev services..." -ForegroundColor Yellow
    
    foreach ($item in $jobs) {
        Write-Host "   Stopping $($item.Name)..." -ForegroundColor Yellow
        Stop-Job $item.Job
        Remove-Job $item.Job
    }
    
    Write-Host "✅ All services stopped." -ForegroundColor Green
}

