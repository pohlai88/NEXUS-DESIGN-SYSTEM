# Design System Drift Checker
# Checks for hardcoded values that should use design system tokens

Write-Host "🔍 Checking for design system drift..." -ForegroundColor Cyan
Write-Host ""

$files = Get-ChildItem *.html
$totalIssues = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $issues = @()
    
    # Check for hardcoded hex colors
    $hexMatches = [regex]::Matches($content, '#[0-9a-fA-F]{6}')
    if ($hexMatches.Count -gt 0) {
        $issues += "  🔴 $($hexMatches.Count) hardcoded hex colors found"
    }
    
    # Check for old variable references
    $oldVarMatches = [regex]::Matches($content, 'var\(--[cbs]-[^)]+\)')
    if ($oldVarMatches.Count -gt 0) {
        $issues += "  🔴 $($oldVarMatches.Count) old variable references found"
    }
    
    # Check for hardcoded spacing (common patterns)
    $spacingMatches = [regex]::Matches($content, '(gap|padding|margin):\s*\d+px')
    if ($spacingMatches.Count -gt 10) {
        $issues += "  🟡 $($spacingMatches.Count) hardcoded spacing values (consider using tokens)"
    }
    
    # Check for hardcoded font sizes
    $fontMatches = [regex]::Matches($content, 'font-size:\s*\d+px')
    if ($fontMatches.Count -gt 5) {
        $issues += "  🟡 $($fontMatches.Count) hardcoded font sizes (consider using tokens)"
    }
    
    if ($issues.Count -gt 0) {
        Write-Host "📄 $($file.Name)" -ForegroundColor Yellow
        foreach ($issue in $issues) {
            Write-Host $issue
            $totalIssues++
        }
        Write-Host ""
    }
}

if ($totalIssues -eq 0) {
    Write-Host "✅ No drift detected! All files are using design system tokens." -ForegroundColor Green
} else {
    Write-Host "⚠️  Found $totalIssues issue(s) that may need attention." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 Tip: See DRIFT_CHECK.md for detailed recommendations" -ForegroundColor Cyan
}

