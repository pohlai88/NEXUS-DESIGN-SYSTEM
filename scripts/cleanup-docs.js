#!/usr/bin/env node
/**
 * Documentation Cleanup Script
 * Removes outdated/redundant documentation files
 * 
 * Usage: node scripts/cleanup-docs.js [--dry-run]
 */

import { readFileSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = new URL('.', import.meta.url).pathname;

const DRY_RUN = process.argv.includes('--dry-run');

// Files to KEEP (Essential UI/Design System Documentation)
// See docs/DOCUMENTATION_STRATEGY.md for complete strategy
const FILES_TO_KEEP = new Set([
  'README.md',
  'QUICK_REFERENCE.md',
  'API_REFERENCE.md', // Auto-generated
  'EXTERNAL_USAGE.md',
  'INTEGRATION_GUIDE.md',
  'DESIGN_SYSTEM.md', // Auto-generated
  'GOVERNANCE.md',
  'TOKEN_REFERENCE.md', // Auto-generated
  'COMPONENTS.md', // Auto-generated
  'COMPONENT_USAGE_EXAMPLES.md',
  'MOTION_DESIGN_SYSTEM.md',
  'NEXTJS_INTEGRATION.md',
  'NEXTJS_WEB_COMPONENTS_OPTIMIZATION.md',
  'STORYBOOK_DEPLOYMENT_GUIDE.md',
  'STORYBOOK_SETUP_AND_OPTIMIZATION.md',
  'STORYBOOK_INDEPENDENT_DEPLOYMENT.md',
  'STORYBOOK_CLI_AND_CONSISTENCY_TOOLS.md',
  'TESTING_QUICK_REFERENCE.md',
  'TESTING_NEXTJS_ALIGNMENT.md',
  'TESTING_NEXTJS_BEST_PRACTICES.md',
  'PLAYWRIGHT_MCP_SETUP.md',
  'PLAYWRIGHT_MCP_QUICK_START.md',
  'PLAYWRIGHT_E2E_MCP_INTEGRATION.md',
  'VITEST_MCP_STATUS.md',
  'VITEST_MCP_HELP.md',
  'NEXTJS_MCP_SETUP.md',
  'VERCEL_MCP_DUPLICATE_DIAGNOSIS.md',
  'MULTI_REPO_MANAGEMENT.md',
  'QUICK_REMOTE_REFERENCE.md',
  'MIGRATION_GUIDE.md',
  'IDE_INTEGRATION.md',
  'THEME_SYSTEM_COMPLETE_GUIDE.md',
  'DEVELOPER_GUIDE_THEMES.md',
  'SHELL_SYSTEM_COMPLETE_DOCUMENTATION.md',
  'SHELL_SYSTEM_GUIDE.md',
  'ADVANCED_SHELLS_COMPLETE_GUIDE.md',
  'MODAL_SHELLS_COMPLETE.md',
  'EXCEPTION_SHELL_COMPLETE.md',
  'SHELL_SYSTEM_QUICK_REFERENCE.md',
  'DOCUMENTATION_STRATEGY.md', // This is the strategy document
]);

const FILES_TO_DELETE = [
  // Status/completion reports
  'docs/360_AUDIT_REPORT_2026.md',
  'docs/360_DEEP_DIVE_AUDIT.md',
  'docs/AUDIT_REPORT.md',
  'docs/AUDIT_REPORT_2025.md',
  'docs/COMPLETION_REPORT.md',
  'docs/FINAL_IMPLEMENTATION_STATUS.md',
  'docs/FINAL_SUMMARY.md',
  'docs/WORK_SUMMARY.md',
  'docs/CHANGES.md',
  'docs/CLEANUP_SUMMARY.md',
  'docs/CLEANUP_EXECUTION_SUMMARY.md',
  'docs/COMPONENT_LIBRARY_SUMMARY.md',
  'docs/DESIGN_SYSTEM_FINAL_STATUS.md',
  'docs/ESSENTIAL_NEXT_STEPS.md',
  'docs/FILE_INVENTORY.md',
  'docs/PHASE_1-3_TEST_REPORT.md',
  'docs/PHASE_1_COMPLETE_REPORT.md',
  'docs/PHASE_2_COMPLETE_REPORT.md',
  'docs/PHASE_2_STATUS.md',
  'docs/PHASE_3_COMPLETE_REPORT.md',
  'docs/PHASE_4_COMPLETE_REPORT.md',
  'docs/PHASE_5_COMPLETE_REPORT.md',
  'docs/PHASE_5_STATUS.md',
  'docs/REMAINING_WORK_SUMMARY.md',
  'docs/REORGANIZATION_COMPLETE.md',
  'docs/README_COMPLETION.md',
  'docs/README_QUICKREF_AUDIT_2026.md',
  'docs/README_QUICKREF_OPTIMIZATION_SUMMARY.md',
  'docs/README_THEMES_SECTION.md',
  'docs/THEME_SYSTEM_SUMMARY.md',
  'docs/TESTING_AND_THEME_SUMMARY.md',
  'docs/TESTING_OPTIMIZATION_SUMMARY.md',
  'docs/TESTING_CHANGES_SUMMARY.md',
  'docs/TESTING_IMPLEMENTATION_SUMMARY.md',
  'docs/TESTING_UPDATE_SUMMARY.md',
  'docs/TESTING_REMAINING_WORK.md',
  'docs/TESTING_STRATEGY_OPTION_A.md',
  'docs/TEST_FIXES_REPORT.md',
  'docs/UNIT_TESTING_COMPLETE.md',
  
  // Radix UI implementation (all - implementation complete)
  'docs/RADIX_UI_CONTINUATION_SUMMARY.md',
  'docs/RADIX_UI_IMPLEMENTATION_COMPLETE.md',
  'docs/RADIX_UI_IMPLEMENTATION_GUIDE.md',
  'docs/RADIX_UI_IMPLEMENTATION_ROADMAP.md',
  'docs/RADIX_UI_IMPLEMENTATION_STATUS.md',
  'docs/RADIX_UI_OPTIMIZATION_ANALYSIS.md',
  'docs/RADIX_UI_UNIVERSAL_ADAPTER_ARCHITECTURE.md',
  'docs/RADIX_UI_QUICK_START.md',
  
  // Shell optimization (keep only guides, delete status reports)
  'docs/SHELL_SYSTEM_DOCUMENTATION_COMPLETE.md',
  'docs/SHELL_SYSTEM_SUMMARY.md',
  'docs/SHELL_SYSTEM_EXAMPLES_GUIDE.md',
  'docs/SHELL_OPTIMIZATION_PHASE1_COMPLETE.md',
  'docs/SHELL_OPTIMIZATION_PHASE2_COMPLETE.md',
  'docs/SHELL_OPTIMIZATION_ANALYSIS.md',
  'docs/SHELL_OPTIMIZATION_IMPLEMENTATION_PLAN.md',
  'docs/SHELL_TAXONOMY_ANALYSIS.md',
  'docs/SHELL_INVENTORY.md',
  'docs/ROOTSHELL_ENHANCEMENT_COMPLETE.md',
  'docs/ADVANCED_BUSINESS_SHELLS_RESEARCH.md',
  // Note: Keep SHELL_SYSTEM_COMPLETE_DOCUMENTATION.md, SHELL_SYSTEM_GUIDE.md, 
  // ADVANCED_SHELLS_COMPLETE_GUIDE.md, MODAL_SHELLS_COMPLETE.md, EXCEPTION_SHELL_COMPLETE.md, SHELL_SYSTEM_QUICK_REFERENCE.md
  
  // Analysis/research (all - historical)
  'docs/DESIGN_SYSTEM_COMPARISON_ANALYSIS.md',
  'docs/DESIGN_SYSTEM_OPTIMIZATION_RECOMMENDATIONS.md',
  'docs/HEADLESS_GAP_ANALYSIS.md',
  'docs/OPTIMIZATION_RECOMMENDATIONS.md',
  'docs/OPTIMIZATIONS_APPLIED.md',
  'docs/ORGANIZATION_RECOMMENDATIONS.md',
  'docs/NEXT_STEPS_RECOMMENDATIONS.md',
  'docs/NEXT_DEVELOPMENT_PROPIMIZATION.md',
  'docs/NEXT_DEVELOPMENT_PROPOSAL.md',
  'docs/COMPONENT_QUALITY_IMPROVEMENTS.md',
  'docs/ARCHITECTURAL_IMPROVEMENTS_REPORT.md',
  'docs/GITHUB_SEARCH_RESULTS_WEB_COMPONENTS.md',
  'docs/GITHUB_SOLUTIONS_ANALYSIS.md',
  'docs/GITHUB_OPTIMIZATION_OPPORTUNITIES.md',
  'docs/WEB_COMPONENTS_PRD_OPTIMIZATION_ANALYSIS.md',
  'docs/SCROLLBAR_DIAGNOSIS.md',
  'docs/input-css-diagnosis.md',
  'docs/BEST_PRACTICES_IMPLEMENTATION.md',
  'docs/BUILD_WORKFLOW.md',
  
  // Theme engine technical (historical - keep only guides)
  'docs/THEME_ENGINE_EVALUATION.md',
  'docs/THEME_ENGINE_MCP_AUDIT.md',
  'docs/THEME_ENGINE_INTEGRATION_EXAMPLES.md',
  'docs/IDE_INTEGRATION_THEMES.md',
  'docs/TESTING_AND_THEME_GUIDE.md',
  // Note: Individual theme guides kept if they exist (ATTRACTIVE_THEME_GUIDE.md, etc.)
  
  // Testing (consolidate - keep only essential)
  'docs/TESTING_OPTIMIZATION_GUIDE.md',
  
  // Index duplicates
  'docs/INDEX.md',
  'docs/DOCUMENTATION_INDEX.md',
  
  // CLI/HUD (not UI-focused)
  'docs/CLI_FILTER_COMMANDS.md',
  'docs/CLI_REACTIVE_HUD_COMPLETE_GUIDE.md',
  'docs/CLI_REACTIVE_HUD_FINAL_STATUS.md',
  
  // Assessment/planning docs (historical)
  'docs/NPM_PACKAGE_FEATURE_ASSESSMENT.md',
  'docs/DOCUMENTATION_STRATEGY_RECOMMENDATION.md',
  'docs/DOCUMENTATION_AUDIT_REAL.md',
  'docs/DOCUMENTATION_CLEANUP_AND_AUTOMATION_PLAN.md', // Old plan (replaced by DOCUMENTATION_STRATEGY.md)
  'docs/DOCUMENTATION_CLEANUP_PLAN_2026.md', // Old plan (replaced by DOCUMENTATION_STRATEGY.md)
  'docs/100_PERCENT_AUTO_GENERATED_DOCS_RECOMMENDATION.md',
  'docs/PRD_DOCUMENTATION_AUDIT.md',
  'docs/PRD_VALIDATION_REPORT.md',
  
  // Implementation process docs (historical)
  'docs/IMPLEMENTATION_CHECKLIST.md',
  'docs/IMPLEMENTATION_COMPLETE.md',
  'docs/IDE_FEATURES_COMPLETE.md',
  'docs/MCP_STATUS_AND_TEST_REQUIREMENTS.md',
  'docs/PLAYWRIGHT_INSTALLATION_FIX.md',
  'docs/PLAYWRIGHT_OPTIMIZATION_REPORT.md',
  'docs/PLAYWRIGHT_SETUP_INSTRUCTIONS.md',
  
  // Migration/legacy (keep MIGRATION_GUIDE.md, delete others)
  'docs/PACKAGE_NAMING_STRATEGY.md',
];

function deleteFile(filePath) {
  const fullPath = join(process.cwd(), filePath);
  
  if (!existsSync(fullPath)) {
    return { deleted: false, notFound: true };
  }
  
  if (DRY_RUN) {
    console.log(`[DRY RUN] Would delete: ${filePath}`);
    return { deleted: false, dryRun: true };
  }
  
  try {
    unlinkSync(fullPath);
    console.log(`✅ Deleted: ${filePath}`);
    return { deleted: true, notFound: false };
  } catch (error) {
    console.error(`❌ Error deleting ${filePath}:`, error.message);
    return { deleted: false, error: true };
  }
}

function main() {
  console.log(DRY_RUN ? '🧹 [DRY RUN] Documentation cleanup preview...\n' : '🧹 Starting documentation cleanup...\n');
  
  const stats = {
    deleted: 0,
    notFound: 0,
    errors: 0,
    dryRun: 0,
  };
  
  FILES_TO_DELETE.forEach(file => {
    const result = deleteFile(file);
    if (result.deleted) stats.deleted++;
    if (result.notFound) stats.notFound++;
    if (result.error) stats.errors++;
    if (result.dryRun) stats.dryRun++;
  });
  
  console.log(`\n📊 Summary:`);
  if (DRY_RUN) {
    console.log(`   Would delete: ${stats.dryRun} files`);
    console.log(`   Not found: ${stats.notFound} files`);
    console.log(`\n💡 Run without --dry-run to actually delete files`);
  } else {
    console.log(`   Deleted: ${stats.deleted} files`);
    console.log(`   Not found: ${stats.notFound} files`);
    console.log(`   Errors: ${stats.errors} files`);
  }
  
  console.log(`\n✅ Cleanup ${DRY_RUN ? 'preview' : 'complete'}!`);
  
  if (!DRY_RUN) {
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Review remaining docs/ directory`);
    console.log(`   2. Implement auto-generation scripts`);
    console.log(`   3. Run: pnpm generate:docs`);
  }
}

// Run if executed directly
main();

export { deleteFile, FILES_TO_DELETE };

