# Storybook Deployment Guide
## AIBOS Design System

**Date**: 2026-01-03  
**Status**: ✅ **Production Ready**  
**Build Output**: `storybook-static/`

---

## Quick Start

Your Storybook is production-optimized and ready to deploy. The build output is in `storybook-static/` directory.

**Build Command**:
```bash
pnpm build:storybook:prod
```

**Output Directory**: `storybook-static/`

---

## Deployment Options

### 1. Vercel (Recommended - Easiest)

**Why Vercel**: Zero-config deployment, automatic HTTPS, CDN, and excellent performance.

#### Option A: Vercel CLI (Quick Deploy)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Build Command**: `pnpm build:storybook:prod`
   - **Output Directory**: `storybook-static`
   - **Install Command**: `pnpm install`
5. Click "Deploy"

#### Option C: Vercel Configuration File

Create `vercel.json` in project root:

```json
{
  "buildCommand": "pnpm build:storybook:prod",
  "outputDirectory": "storybook-static",
  "installCommand": "pnpm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Benefits**:
- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs
- ✅ Custom domains
- ✅ Analytics included

---

### 2. Netlify

**Why Netlify**: Great for static sites, easy configuration, and good free tier.

#### Option A: Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
pnpm build:storybook:prod

# Deploy
netlify deploy --prod --dir=storybook-static
```

#### Option B: Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure:
   - **Build command**: `pnpm build:storybook:prod`
   - **Publish directory**: `storybook-static`
   - **Base directory**: (leave empty)
5. Click "Deploy site"

#### Option C: Netlify Configuration File

Create `netlify.toml` in project root:

```toml
[build]
  command = "pnpm build:storybook:prod"
  publish = "storybook-static"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Benefits**:
- ✅ Automatic deployments
- ✅ Branch previews
- ✅ Form handling
- ✅ Edge functions

---

### 3. GitHub Pages

**Why GitHub Pages**: Free hosting for public repos, integrated with GitHub.

#### Setup Steps

1. **Create GitHub Actions Workflow**

Create `.github/workflows/deploy-storybook.yml`:

```yaml
name: Deploy Storybook to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build Storybook
        run: pnpm build:storybook:prod
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './storybook-static'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. **Enable GitHub Pages**

- Go to repository Settings → Pages
- Under "Source", select "GitHub Actions"
- Save

3. **Configure Base Path (if needed)**

If deploying to a subdirectory (e.g., `/storybook`), update `.storybook/main.ts`:

```typescript
const config: StorybookConfig = {
  // ... existing config
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  // Add this for GitHub Pages subdirectory
  // base: '/your-repo-name/storybook/',
};
```

**Benefits**:
- ✅ Free for public repos
- ✅ Integrated with GitHub
- ✅ Custom domains supported

---

### 4. AWS S3 + CloudFront

**Why AWS**: Enterprise-grade, scalable, and highly customizable.

#### Setup Steps

1. **Create S3 Bucket**

```bash
aws s3 mb s3://your-storybook-bucket-name
```

2. **Configure S3 for Static Website Hosting**

```bash
aws s3 website s3://your-storybook-bucket-name \
  --index-document index.html \
  --error-document index.html
```

3. **Set Bucket Policy**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-storybook-bucket-name/*"
    }
  ]
}
```

4. **Build and Deploy**

```bash
# Build
pnpm build:storybook:prod

# Deploy
aws s3 sync storybook-static/ s3://your-storybook-bucket-name --delete
```

5. **Setup CloudFront (Optional - for CDN)**

- Create CloudFront distribution
- Set origin to S3 bucket
- Configure caching rules

**Benefits**:
- ✅ Enterprise-grade
- ✅ Highly scalable
- ✅ Custom domains and SSL
- ✅ Advanced caching

---

### 5. Azure Static Web Apps

**Why Azure**: Good integration with Microsoft ecosystem, free tier available.

#### Setup Steps

1. **Create `azure-static-web-apps.yml`**

Create `.github/workflows/azure-static-web-apps.yml`:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          lfs: false
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build Storybook
        run: pnpm build:storybook:prod
      
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          output_location: "storybook-static"
```

2. **Create Azure Static Web App**

- Go to Azure Portal
- Create Static Web App resource
- Connect to GitHub repository
- Azure will automatically create the workflow

**Benefits**:
- ✅ Free tier available
- ✅ Integrated CI/CD
- ✅ Custom domains
- ✅ Serverless functions support

---

## Best Practices

### 1. Environment Variables

If you need environment-specific configs, use `.env` files:

```bash
# .env.production
STORYBOOK_BASE_URL=https://your-storybook-domain.com
```

### 2. Custom Domain Setup

Most platforms support custom domains:

- **Vercel**: Settings → Domains
- **Netlify**: Site settings → Domain management
- **GitHub Pages**: Settings → Pages → Custom domain
- **AWS**: CloudFront distribution settings

### 3. Performance Optimization

Your Storybook is already optimized with:
- ✅ Code splitting (25 chunks)
- ✅ Minification (esbuild)
- ✅ CSS optimization
- ✅ Asset optimization
- ✅ Content-based hashing

### 4. Monitoring

Consider adding:
- **Analytics**: Google Analytics, Plausible
- **Error Tracking**: Sentry
- **Performance**: Lighthouse CI

### 5. CI/CD Integration

All deployment options support automatic deployments:
- Push to `main` → Deploy to production
- Pull request → Deploy preview

---

## Deployment Checklist

Before deploying:

- [ ] Build succeeds: `pnpm build:storybook:prod`
- [ ] All stories load correctly
- [ ] Assets are optimized
- [ ] No console errors
- [ ] Performance budgets met
- [ ] Custom domain configured (if needed)
- [ ] Analytics configured (optional)
- [ ] Error tracking setup (optional)

---

## Troubleshooting

### Issue: 404 on Refresh

**Solution**: Configure redirects to `index.html` (SPA routing)

- **Vercel**: Already handled by `vercel.json`
- **Netlify**: Add redirect rule in `netlify.toml`
- **GitHub Pages**: Use `404.html` redirect

### Issue: Assets Not Loading

**Solution**: Check base path configuration

If deploying to subdirectory, update `.storybook/main.ts`:
```typescript
base: '/your-subdirectory/',
```

### Issue: Build Fails

**Solution**: Check build logs

```bash
# Test build locally
pnpm build:storybook:prod

# Check output
ls -la storybook-static/
```

---

## Recommended Setup

For this project, I recommend:

1. **Primary**: Vercel (easiest, best DX)
2. **Alternative**: Netlify (good free tier)
3. **Enterprise**: AWS S3 + CloudFront (if you need AWS integration)

---

## Quick Deploy Commands

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
pnpm build:storybook:prod
netlify deploy --prod --dir=storybook-static
```

### AWS S3
```bash
pnpm build:storybook:prod
aws s3 sync storybook-static/ s3://your-bucket --delete
```

---

## Next Steps

1. Choose your deployment platform
2. Follow the setup steps above
3. Configure custom domain (optional)
4. Set up monitoring (optional)
5. Share your Storybook URL! 🎉

---

**Last Updated**: 2026-01-03  
**Status**: ✅ **Ready for Deployment**

