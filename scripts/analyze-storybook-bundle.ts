/**
 * Storybook Bundle Analysis Script
 * 
 * Analyzes Storybook build output for bundle sizes and performance metrics
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

interface BundleStats {
  totalSize: number;
  chunkCount: number;
  largestChunks: Array<{ name: string; size: number }>;
  assetCount: number;
  totalAssetsSize: number;
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Analyze Storybook build output
 */
function analyzeStorybookBuild(): BundleStats {
  const storybookStaticDir = join(process.cwd(), 'storybook-static');
  
  if (!statSync(storybookStaticDir).isDirectory()) {
    throw new Error('Storybook static directory not found. Run: pnpm build:storybook first');
  }

  const stats: BundleStats = {
    totalSize: 0,
    chunkCount: 0,
    largestChunks: [],
    assetCount: 0,
    totalAssetsSize: 0,
  };

  // Analyze chunks
  const chunksDir = join(storybookStaticDir, 'chunks');
  if (statSync(chunksDir).isDirectory()) {
    const chunkFiles = readdirSync(chunksDir).filter(f => f.endsWith('.js'));
    stats.chunkCount = chunkFiles.length;
    
    chunkFiles.forEach(file => {
      const filePath = join(chunksDir, file);
      const size = statSync(filePath).size;
      stats.totalSize += size;
      stats.largestChunks.push({ name: file, size });
    });
    
    // Sort by size
    stats.largestChunks.sort((a, b) => b.size - a.size);
  }

  // Analyze assets
  const assetsDir = join(storybookStaticDir, 'assets');
  if (statSync(assetsDir).isDirectory()) {
    const assetFiles = readdirSync(assetsDir, { recursive: true });
    stats.assetCount = assetFiles.length;
    
    assetFiles.forEach(file => {
      const filePath = join(assetsDir, file);
      if (statSync(filePath).isFile()) {
        stats.totalAssetsSize += statSync(filePath).size;
      }
    });
  }

  // Calculate total
  stats.totalSize += stats.totalAssetsSize;

  return stats;
}

/**
 * Performance budgets
 */
const PERFORMANCE_BUDGETS = {
  totalSize: 5 * 1024 * 1024, // 5MB total
  initialChunk: 1 * 1024 * 1024, // 1MB initial chunk
  chunkSize: 500 * 1024, // 500KB per chunk
  assetSize: 2 * 1024 * 1024, // 2MB assets
};

/**
 * Check performance budgets
 */
function checkBudgets(stats: BundleStats): Array<{ type: string; status: 'pass' | 'warn' | 'fail'; message: string }> {
  const results: Array<{ type: string; status: 'pass' | 'warn' | 'fail'; message: string }> = [];

  // Total size check
  if (stats.totalSize > PERFORMANCE_BUDGETS.totalSize) {
    results.push({
      type: 'total-size',
      status: stats.totalSize > PERFORMANCE_BUDGETS.totalSize * 1.5 ? 'fail' : 'warn',
      message: `Total bundle size ${formatBytes(stats.totalSize)} exceeds budget of ${formatBytes(PERFORMANCE_BUDGETS.totalSize)}`,
    });
  } else {
    results.push({
      type: 'total-size',
      status: 'pass',
      message: `Total bundle size ${formatBytes(stats.totalSize)} is within budget`,
    });
  }

  // Largest chunk check
  if (stats.largestChunks.length > 0) {
    const largest = stats.largestChunks[0];
    if (largest.size > PERFORMANCE_BUDGETS.chunkSize) {
      results.push({
        type: 'chunk-size',
        status: largest.size > PERFORMANCE_BUDGETS.chunkSize * 2 ? 'fail' : 'warn',
        message: `Largest chunk ${largest.name} (${formatBytes(largest.size)}) exceeds budget of ${formatBytes(PERFORMANCE_BUDGETS.chunkSize)}`,
      });
    } else {
      results.push({
        type: 'chunk-size',
        status: 'pass',
        message: `Largest chunk ${largest.name} (${formatBytes(largest.size)}) is within budget`,
      });
    }
  }

  // Asset size check
  if (stats.totalAssetsSize > PERFORMANCE_BUDGETS.assetSize) {
    results.push({
      type: 'asset-size',
      status: stats.totalAssetsSize > PERFORMANCE_BUDGETS.assetSize * 1.5 ? 'fail' : 'warn',
      message: `Total assets size ${formatBytes(stats.totalAssetsSize)} exceeds budget of ${formatBytes(PERFORMANCE_BUDGETS.assetSize)}`,
    });
  } else {
    results.push({
      type: 'asset-size',
      status: 'pass',
      message: `Total assets size ${formatBytes(stats.totalAssetsSize)} is within budget`,
    });
  }

  return results;
}

/**
 * Main execution
 */
function main() {
  try {
    console.log('📊 Analyzing Storybook bundle...\n');
    
    const stats = analyzeStorybookBuild();
    const budgets = checkBudgets(stats);

    // Print statistics
    console.log('📦 Bundle Statistics:');
    console.log(`   Total Size: ${formatBytes(stats.totalSize)}`);
    console.log(`   Chunks: ${stats.chunkCount}`);
    console.log(`   Assets: ${stats.assetCount} (${formatBytes(stats.totalAssetsSize)})`);
    console.log('\n📈 Largest Chunks:');
    stats.largestChunks.slice(0, 10).forEach((chunk, i) => {
      console.log(`   ${i + 1}. ${chunk.name}: ${formatBytes(chunk.size)}`);
    });

    // Print budget results
    console.log('\n🎯 Performance Budgets:');
    budgets.forEach(budget => {
      const icon = budget.status === 'pass' ? '✅' : budget.status === 'warn' ? '⚠️' : '❌';
      console.log(`   ${icon} ${budget.type}: ${budget.message}`);
    });

    // Exit with error if any failures
    const hasFailures = budgets.some(b => b.status === 'fail');
    if (hasFailures) {
      console.log('\n❌ Performance budget failures detected!');
      process.exit(1);
    } else {
      console.log('\n✅ All performance budgets met!');
    }
  } catch (error) {
    console.error('❌ Error analyzing bundle:', error);
    process.exit(1);
  }
}

main();

