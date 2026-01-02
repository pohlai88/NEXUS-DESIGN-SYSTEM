/**
 * Production Build Script
 * Sets NODE_ENV=production and runs build
 */

import { execSync } from 'child_process';

process.env.NODE_ENV = 'production';

console.log('🚀 Starting production build (minified JSON)...\n');
execSync('pnpm build', { stdio: 'inherit' });

