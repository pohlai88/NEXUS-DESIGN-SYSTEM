# Storybook Independent Deployment Guide

## Overview

**Yes, Storybook is completely independent!** It builds to its own directory (`storybook-static/`) and can be deployed separately from your main application.

---

## Directory Structure

```
AIBOS-DESIGN-SYSTEM/
├── .storybook/              # Storybook configuration
│   ├── main.ts              # Storybook config
│   └── preview.ts           # Preview config
├── components/              # Your components
├── dist/                    # Main app build output
├── storybook-static/        # ⭐ Storybook build output (INDEPENDENT)
│   ├── index.html
│   ├── iframe.html
│   ├── chunks/             # JavaScript chunks
│   ├── assets/              # CSS, images, fonts
│   └── sb-common-assets/   # Storybook assets
└── package.json
```

---

## Key Points

### 1. **Separate Build Output**

Storybook builds to `storybook-static/` directory, which is:
- ✅ **Completely self-contained** - All HTML, JS, CSS, assets included
- ✅ **Independent** - No dependency on main app build
- ✅ **Portable** - Can be copied/moved anywhere
- ✅ **Static** - Just HTML/CSS/JS files, no server needed

### 2. **Independent Deployment**

Storybook can be deployed:
- ✅ **Separate domain**: `storybook.yourdomain.com`
- ✅ **Separate subdomain**: `design-system.yourdomain.com`
- ✅ **Separate path**: `yourdomain.com/storybook`
- ✅ **Separate service**: Different hosting provider
- ✅ **Separate repository**: Can be in its own repo (optional)

### 3. **Build Process**

```bash
# Build Storybook independently
pnpm build:storybook:prod

# Output: storybook-static/ (ready to deploy)
# No need to build main app!
```

---

## Deployment Scenarios

### Scenario 1: Same Repository, Separate Deployment

**Structure**:
```
your-repo/
├── .storybook/
├── storybook-static/        # Built Storybook
└── dist/                    # Main app build
```

**Deployment**:
- Main app: Deploy `dist/` to `app.yourdomain.com`
- Storybook: Deploy `storybook-static/` to `storybook.yourdomain.com`

**Example** (Vercel):
```json
// vercel.json for Storybook
{
  "buildCommand": "pnpm build:storybook:prod",
  "outputDirectory": "storybook-static"
}
```

### Scenario 2: Separate Repository (Optional)

You can create a separate repository just for Storybook:

```
storybook-repo/
├── .storybook/
├── package.json
└── (only Storybook-related files)
```

**Benefits**:
- ✅ Separate CI/CD pipeline
- ✅ Independent versioning
- ✅ Different deployment schedule
- ✅ Separate access control

### Scenario 3: Monorepo with Multiple Deployments

If using a monorepo (like Turborepo):

```
monorepo/
├── apps/
│   ├── main-app/           # Main application
│   └── storybook/          # Storybook app
└── packages/
    └── design-system/      # Shared design system
```

Each can be deployed independently!

---

## Deployment Examples

### Example 1: Deploy Storybook to Subdomain

**Domain**: `storybook.yourdomain.com`

**Vercel Configuration**:
```json
{
  "buildCommand": "pnpm build:storybook:prod",
  "outputDirectory": "storybook-static"
}
```

**Netlify Configuration**:
```toml
[build]
  command = "pnpm build:storybook:prod"
  publish = "storybook-static"
```

### Example 2: Deploy to Subdirectory

**URL**: `yourdomain.com/storybook`

**Storybook Configuration** (`.storybook/main.ts`):
```typescript
const config: StorybookConfig = {
  // ... existing config
  // Add base path for subdirectory
  // base: '/storybook/',
};
```

**Deployment**: Deploy `storybook-static/` to `/storybook/` path

### Example 3: Separate Service

**Main App**: Deployed to Vercel
**Storybook**: Deployed to Netlify

Both can be completely independent!

---

## CI/CD Configuration

### GitHub Actions - Separate Workflows

**Main App Workflow** (`.github/workflows/deploy-app.yml`):
```yaml
name: Deploy Main App
on:
  push:
    branches: [main]
jobs:
  deploy:
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm build
      - run: # Deploy dist/ to main app
```

**Storybook Workflow** (`.github/workflows/deploy-storybook.yml`):
```yaml
name: Deploy Storybook
on:
  push:
    branches: [main]
    paths:
      - '.storybook/**'
      - 'components/**'
      - 'package.json'
jobs:
  deploy:
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm build:storybook:prod
      - run: # Deploy storybook-static/ to Storybook
```

**Benefits**:
- ✅ Storybook only rebuilds when Storybook files change
- ✅ Main app only rebuilds when app files change
- ✅ Independent deployment schedules
- ✅ Separate error handling

---

## Best Practices

### 1. **Separate Build Scripts**

```json
{
  "scripts": {
    "build": "pnpm build:css && pnpm build:ts",
    "build:storybook": "storybook build",
    "build:storybook:prod": "cross-env NODE_ENV=production storybook build"
  }
}
```

### 2. **Separate Deployment Configs**

- `vercel.json` - For main app
- `vercel-storybook.json` - For Storybook (or separate Vercel project)
- `netlify.toml` - For main app
- `netlify-storybook.toml` - For Storybook (or separate Netlify site)

### 3. **Environment Variables**

Storybook can have its own environment variables:

```bash
# .env.storybook
STORYBOOK_API_URL=https://api.example.com
STORYBOOK_ENV=production
```

### 4. **Separate Domains**

- Main app: `app.yourdomain.com`
- Storybook: `storybook.yourdomain.com` or `design-system.yourdomain.com`

---

## Current Setup

Your current setup:

✅ **Storybook builds to**: `storybook-static/`  
✅ **Independent build**: `pnpm build:storybook:prod`  
✅ **No dependency on main app**: Storybook is self-contained  
✅ **Ready to deploy**: Just deploy `storybook-static/` directory  

---

## Quick Deploy Commands

### Deploy Storybook Only

```bash
# Build Storybook
pnpm build:storybook:prod

# Deploy to Vercel
vercel --prod --cwd storybook-static

# Deploy to Netlify
netlify deploy --prod --dir=storybook-static

# Deploy to AWS S3
aws s3 sync storybook-static/ s3://your-storybook-bucket --delete
```

---

## Summary

✅ **Storybook has its own directory**: `storybook-static/`  
✅ **Can be deployed independently**: Separate from main app  
✅ **Self-contained**: All assets included  
✅ **Flexible deployment**: Any static hosting service  
✅ **Separate CI/CD**: Independent build and deployment pipelines  

**Your Storybook is ready to deploy independently!** 🚀

