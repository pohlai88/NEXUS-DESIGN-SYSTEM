# Setup Script for Separate Storybook Repository
# This script prepares Storybook files for a separate repository

Write-Host "Setting up Storybook for separate repository..." -ForegroundColor Cyan

# Check if storybook-repo directory exists
$storybookRepoPath = "../Storybook"
if (Test-Path $storybookRepoPath) {
    Write-Host "Directory $storybookRepoPath already exists" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to remove it and start fresh? (y/n)"
    if ($overwrite -eq "y") {
        Remove-Item -Recurse -Force $storybookRepoPath
        Write-Host "Removed existing directory" -ForegroundColor Green
    } else {
        Write-Host "Aborted" -ForegroundColor Red
        exit 1
    }
}

# Create directory
New-Item -ItemType Directory -Path $storybookRepoPath -Force | Out-Null
Write-Host "Created directory: $storybookRepoPath" -ForegroundColor Green

# Copy Storybook configuration files
Write-Host "Copying Storybook configuration files..." -ForegroundColor Cyan
Copy-Item -Recurse -Force ".storybook" "$storybookRepoPath/.storybook"
Write-Host "Copied .storybook directory" -ForegroundColor Green

# Copy components (needed for stories)
Write-Host "Copying components..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path "$storybookRepoPath/components" -Force | Out-Null
Copy-Item -Recurse -Force "components/html" "$storybookRepoPath/components/html"
Write-Host "Copied components" -ForegroundColor Green

# Copy public directory if it exists
if (Test-Path "public") {
    Copy-Item -Recurse -Force "public" "$storybookRepoPath/public"
    Write-Host "Copied public directory" -ForegroundColor Green
}

# Copy styles (needed for Storybook)
Write-Host "Copying styles..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path "$storybookRepoPath/styles" -Force | Out-Null
Copy-Item -Recurse -Force "styles" "$storybookRepoPath/styles"
Copy-Item -Force "style.css" "$storybookRepoPath/style.css" -ErrorAction SilentlyContinue
Write-Host "Copied styles" -ForegroundColor Green

# Copy dist directory (for vanilla adapters stories)
if (Test-Path "dist/adapters/vanilla") {
    New-Item -ItemType Directory -Path "$storybookRepoPath/dist/adapters/vanilla" -Force | Out-Null
    Copy-Item -Recurse -Force "dist/adapters/vanilla" "$storybookRepoPath/dist/adapters/vanilla"
    Write-Host "Copied dist/adapters/vanilla" -ForegroundColor Green
}

# Create package.json for Storybook
Write-Host "Creating package.json for Storybook..." -ForegroundColor Cyan
$packageJson = @{
    name = "@aibos/storybook"
    version = "1.0.0"
    description = "AIBOS Design System Storybook"
    private = $true
    scripts = @{
        storybook = "storybook dev -p 6006"
        "build:storybook" = "storybook build"
        "build:storybook:prod" = "cross-env NODE_ENV=production storybook build"
    }
    devDependencies = @{
        "@storybook/addon-a11y" = "^8.6.15"
        "@storybook/addon-docs" = "^8.6.15"
        "@storybook/addon-essentials" = "^8.6.15"
        "@storybook/addon-interactions" = "^8.6.15"
        "@storybook/addon-links" = "^8.6.15"
        "@storybook/web-components" = "^8.6.15"
        "@storybook/web-components-vite" = "^8.6.15"
        "storybook" = "^8.6.15"
        "cross-env" = "^10.1.0"
        "lit" = "^3.2.0"
        "postcss" = "^8.5.6"
        "postcss-cli" = "^11.0.1"
        "@tailwindcss/postcss" = "^4.1.18"
        "tailwindcss" = "^4.1.18"
        "typescript" = "^5.6.0"
    }
} | ConvertTo-Json -Depth 10

$packageJson | Out-File -FilePath "$storybookRepoPath/package.json" -Encoding UTF8
Write-Host "Created package.json" -ForegroundColor Green

# Copy TypeScript config if exists
if (Test-Path "tsconfig.json") {
    Copy-Item -Force "tsconfig.json" "$storybookRepoPath/tsconfig.json"
    Write-Host "Copied tsconfig.json" -ForegroundColor Green
}

# Copy postcss config if exists
if (Test-Path "postcss.config.js") {
    Copy-Item -Force "postcss.config.js" "$storybookRepoPath/postcss.config.js"
    Write-Host "Copied postcss.config.js" -ForegroundColor Green
}

# Copy tailwind config if exists
if (Test-Path "tailwind.config.js") {
    Copy-Item -Force "tailwind.config.js" "$storybookRepoPath/tailwind.config.js"
    Write-Host "Copied tailwind.config.js" -ForegroundColor Green
}

# Create README
Write-Host "Creating README..." -ForegroundColor Cyan
$readme = @"
# AIBOS Design System Storybook

This repository contains the Storybook documentation for the AIBOS Design System.

## Setup

\`\`\`bash
pnpm install
\`\`\`

## Development

\`\`\`bash
pnpm storybook
\`\`\`

## Build

\`\`\`bash
pnpm build:storybook:prod
\`\`\`

## Deployment

The built Storybook is in \`storybook-static/\` directory and can be deployed to any static hosting service.

See deployment guide: [docs/STORYBOOK_DEPLOYMENT_GUIDE.md](docs/STORYBOOK_DEPLOYMENT_GUIDE.md)
"@

$readme | Out-File -FilePath "$storybookRepoPath/README.md" -Encoding UTF8
Write-Host "Created README.md" -ForegroundColor Green

# Create .gitignore
Write-Host "Creating .gitignore..." -ForegroundColor Cyan
$gitignorePath = Join-Path $storybookRepoPath ".gitignore"
$gitignoreContent = "node_modules/`nstorybook-static/`ndist/`n.env`n.env.local`n*.log`n.DS_Store"
$gitignoreContent | Out-File -FilePath $gitignorePath -Encoding UTF8
Write-Host "Created .gitignore" -ForegroundColor Green

# Copy deployment configs
Write-Host "Copying deployment configurations..." -ForegroundColor Cyan
if (Test-Path "vercel.json") {
    Copy-Item -Force "vercel.json" "$storybookRepoPath/vercel.json"
    Write-Host "Copied vercel.json" -ForegroundColor Green
}
if (Test-Path "netlify.toml") {
    Copy-Item -Force "netlify.toml" "$storybookRepoPath/netlify.toml"
    Write-Host "Copied netlify.toml" -ForegroundColor Green
}

# Create docs directory and copy deployment guide
Write-Host "Copying documentation..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path "$storybookRepoPath/docs" -Force | Out-Null
if (Test-Path "docs/STORYBOOK_DEPLOYMENT_GUIDE.md") {
    Copy-Item -Force "docs/STORYBOOK_DEPLOYMENT_GUIDE.md" "$storybookRepoPath/docs/STORYBOOK_DEPLOYMENT_GUIDE.md"
    Write-Host "Copied deployment guide" -ForegroundColor Green
}

Write-Host ""
Write-Host "Storybook repository setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. cd $storybookRepoPath" -ForegroundColor Yellow
Write-Host "2. git init" -ForegroundColor Yellow
Write-Host "3. git add ." -ForegroundColor Yellow
Write-Host "4. git commit -m 'Initial Storybook setup'" -ForegroundColor Yellow
Write-Host "5. git remote add origin https://github.com/pohlai88/Storybook.git" -ForegroundColor Yellow
Write-Host "6. git branch -M main" -ForegroundColor Yellow
Write-Host "7. git push -u origin main" -ForegroundColor Yellow
Write-Host ""

