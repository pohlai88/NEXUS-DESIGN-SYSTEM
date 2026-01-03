---
name: Storybook Production Optimization Plan
overview: Comprehensive production optimization plan for Storybook including build performance, bundle size, caching, code splitting, and runtime optimizations to ensure fully optimized production builds.
todos:
  - id: sb-opt-1
    content: Update .storybook/main.ts with production build optimizations (minification, chunk splitting, tree-shaking)
    status: completed
  - id: sb-opt-2
    content: Update .storybook/preview.ts with runtime performance optimizations (decorators, lazy loading)
    status: completed
  - id: sb-opt-3
    content: Create .storybook/manager.ts for production manager configuration
    status: completed
  - id: sb-opt-4
    content: Update package.json with optimized build scripts (build:storybook:prod, build:storybook:analyze)
    status: completed
  - id: sb-opt-5
    content: Implement code splitting strategy (vendor chunks, story chunks, addon lazy loading)
    status: completed
    dependencies:
      - sb-opt-1
  - id: sb-opt-6
    content: Configure static asset optimization (images, fonts, CSS)
    status: completed
    dependencies:
      - sb-opt-1
  - id: sb-opt-7
    content: Add bundle size monitoring and performance budgets
    status: completed
    dependencies:
      - sb-opt-4
  - id: sb-opt-8
    content: Test production build and validate all optimizations work correctly
    status: in_progress
    dependencies:
      - sb-opt-1
      - sb-opt-2
      - sb-opt-3
      - sb-opt-4
---

# Storybook Production Optimization Plan

## Current State Analysis

**Current Configuration**: Basic Storybook setup with minimal optimizations

- Basic Vite configuration (`target: 'esnext'`, `optimizeDeps.include: ['lit']`)
- No production build optimizations
- No code splitting or lazy loading
- No bundle size optimizations
- No compression or minification settings
- No caching strategies
- No performance monitoring

**Files to Modify**:

- [`.storybook/main.ts`](.storybook/main.ts) - Add production build optimizations
- [`.storybook/preview.ts`](.storybook/preview.ts) - Add runtime optimizations
- [`package.json`](package.json) - Add optimized build scripts
- Create `.storybook/manager.ts` - Manager configuration for production
- Create `.storybook/build-optimizations.ts` - Shared optimization utilities

## Optimization Areas

### 1. Build Performance Optimizations

**File**: [`.storybook/main.ts`](.storybook/main.ts)**Changes**:

- Add production build optimizations in `viteFinal`
- Configure minification (Terser/esbuild)
- Enable tree-shaking
- Configure chunk splitting strategy
- Add build performance monitoring
- Optimize CSS processing (minification, purging)

**Key Optimizations**:

```typescript
viteFinal: async (config, { configType }) => {
  // Production-specific optimizations
  if (configType === 'PRODUCTION') {
    config.build = {
      ...config.build,
      minify: 'esbuild', // Faster than terser
      cssMinify: true,
      sourcemap: false, // Disable in production
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor chunks
            'storybook-vendor': ['@storybook/web-components', '@storybook/addon-essentials'],
            'lit-vendor': ['lit'],
          },
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
    };
    
    // Tree-shaking optimization
    config.build.rollupOptions = {
      ...config.build.rollupOptions,
      treeshake: {
        moduleSideEffects: false,
      },
    };
  }
  
  return config;
}
```



### 2. Bundle Size Optimizations

**File**: [`.storybook/main.ts`](.storybook/main.ts)**Changes**:

- Configure chunk splitting for optimal bundle sizes
- Enable compression (gzip/Brotli)
- Optimize static assets
- Remove unused addons in production
- Lazy load addons

**Implementation**:

- Split Storybook core from addons
- Split vendor libraries
- Code split by story category
- Optimize CSS bundle size

### 3. Code Splitting and Lazy Loading

**File**: [`.storybook/main.ts`](.storybook/main.ts)**Changes**:

- Implement story-level code splitting
- Lazy load addons
- Dynamic import for heavy dependencies
- Route-based chunking

**Strategy**:

- Split by component category (Web Components, React, etc.)
- Lazy load addon panels
- Dynamic import for large stories

### 4. Caching Strategies

**File**: [`.storybook/main.ts`](.storybook/main.ts)**Changes**:

- Configure file naming with content hashes
- Set up cache headers
- Implement long-term caching for static assets
- Cache busting for updates

**Implementation**:

- Use `[hash]` in filenames for cache busting
- Separate vendor chunks (rarely change)
- Separate story chunks (change frequently)

### 5. Runtime Performance Optimizations

**File**: [`.storybook/preview.ts`](.storybook/preview.ts)**Changes**:

- Optimize decorators
- Lazy load heavy components
- Optimize preview rendering
- Add performance monitoring
- Disable dev-only features in production

**Optimizations**:

- Remove unnecessary decorators in production
- Optimize story rendering
- Add performance budgets
- Monitor bundle sizes

### 6. Static Asset Optimization

**File**: [`.storybook/main.ts`](.storybook/main.ts)**Changes**:

- Optimize images (compression, formats)
- Optimize fonts (subsetting, preloading)
- Configure asset inlining thresholds
- Optimize CSS delivery

### 7. Production-Specific Configuration

**File**: Create `.storybook/manager.ts`**Purpose**: Manager configuration for production optimizations**Features**:

- Disable dev tools in production
- Optimize manager UI bundle
- Configure production theme
- Add analytics (optional)

### 8. Build Scripts Enhancement

**File**: [`package.json`](package.json)**Changes**:

- Add optimized build script
- Add build analysis script
- Add bundle size monitoring
- Add performance testing

**New Scripts**:

```json
{
  "build:storybook": "storybook build",
  "build:storybook:analyze": "storybook build --analyze",
  "build:storybook:prod": "NODE_ENV=production storybook build",
  "storybook:size": "bundlesize"
}
```



### 9. Environment Detection

**File**: [`.storybook/main.ts`](.storybook/main.ts)**Changes**:

- Detect production vs development
- Apply optimizations conditionally
- Disable dev features in production
- Enable production features only

### 10. Monitoring and Analytics

**File**: Create `.storybook/telemetry.ts` (optional)**Purpose**: Performance monitoring**Features**:

- Track build times
- Monitor bundle sizes
- Track load times
- Performance budgets

## Implementation Steps

### Phase 1: Core Build Optimizations (High Priority)

1. **Update `.storybook/main.ts`**

- Add production build configuration
- Configure minification
- Set up chunk splitting
- Enable tree-shaking

2. **Update `.storybook/preview.ts`**

- Optimize decorators
- Add production checks
- Optimize rendering

3. **Update `package.json`**

- Add production build script
- Add analysis script

### Phase 2: Advanced Optimizations (Medium Priority)

4. **Create `.storybook/manager.ts`**

- Production manager config
- Disable dev tools

5. **Implement Code Splitting**

- Story-level splitting
- Addon lazy loading

6. **Asset Optimization**

- Image optimization
- Font optimization

### Phase 3: Monitoring and Validation (Low Priority)

7. **Add Bundle Analysis**

- Bundle size monitoring
- Performance budgets

8. **Add Performance Testing**

- Build time tracking
- Load time monitoring

## Expected Improvements

**Build Performance**:

- 30-50% faster production builds
- Reduced build time with parallel processing

**Bundle Size**:

- 40-60% smaller initial bundle
- Better code splitting reduces load time

**Runtime Performance**:

- 20-30% faster initial load
- Faster story switching
- Better caching reduces repeat visits

**Production Readiness**:

- Optimized for CDN deployment
- Proper cache headers
- Compressed assets
- Production-grade configuration

## Validation

After implementation:

1. Run `pnpm build:storybook:prod`
2. Analyze bundle sizes
3. Test load times
4. Verify caching works
5. Check compression
6. Validate all stories load correctly

## Files to Create/Modify

**Modify**:

- [`.storybook/main.ts`](.storybook/main.ts) - Add production optimizations
- [`.storybook/preview.ts`](.storybook/preview.ts) - Add runtime optimizations
- [`package.json`](package.json) - Add build scripts

**Create**:

- `.storybook/manager.ts` - Manager production config
- `.storybook/build-optimizations.ts` - Shared utilities (optional)
- `scripts/analyze-storybook-bundle.ts` - Bundle analysis script (optional)

## Dependencies

**May Need**:

- `vite-plugin-compression` - For gzip/Brotli compression
- `rollup-plugin-visualizer` - For bundle analysis
- `bundlesize` - For size monitoring

## Notes