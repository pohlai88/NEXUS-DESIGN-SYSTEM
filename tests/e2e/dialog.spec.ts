import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Dialog Web Component (Critical Flows)
 * 
 * Tests real browser behaviors that JSDOM cannot reliably test:
 * - Open/close interactions
 * - Escape key handling
 * - Focus trap (real browser focus management)
 * - Focus restoration
 * 
 * These are the "golden" integration tests that prove the component works.
 */

test.describe('Dialog Web Component - Critical Flows', () => {
  test.beforeEach(async ({ page }) => {
    // Load test page with dialog component
    await page.goto('/components/html/examples/dialog-example.html');
    
    // Wait for component to be defined (tests registration implicitly)
    // Next.js best practice: Use E2E tests for component registration, not JSDOM
    await page.waitForFunction(() => customElements.get('na-dialog') !== undefined);
  });

  test('CRITICAL: component is registered', async ({ page }) => {
    // Explicitly test registration (Next.js pattern: E2E > Unit for components)
    const isRegistered = await page.evaluate(() => {
      return customElements.get('na-dialog') !== undefined;
    });
    expect(isRegistered).toBe(true);
    
    // Verify element can be created
    const dialog = page.locator('na-dialog').first();
    await expect(dialog).toBeVisible();
  });

  test('CRITICAL: opens and closes dialog', async ({ page }) => {
    const dialog = page.locator('na-dialog').first();
    const trigger = page.locator('#open-dialog');
    
    // Open
    await trigger.click();
    await expect(dialog).toHaveAttribute('open', '');
    await expect(dialog).toBeVisible();
    
    // Close
    const closeButton = dialog.locator('#close-dialog');
    await closeButton.click();
    await expect(dialog).not.toHaveAttribute('open', '');
  });

  test('CRITICAL: closes on Escape key', async ({ page }) => {
    const dialog = page.locator('na-dialog').first();
    const trigger = page.locator('#open-dialog');
    
    await trigger.click();
    await expect(dialog).toHaveAttribute('open', '');
    
    // Escape should close
    await page.keyboard.press('Escape');
    await expect(dialog).not.toHaveAttribute('open', '');
  });

  test('CRITICAL: traps focus within dialog', async ({ page }) => {
    const dialog = page.locator('na-dialog').first();
    const trigger = page.locator('#open-dialog');
    
    await trigger.click();
    await expect(dialog).toHaveAttribute('open', '');
    
    // Focus should be inside dialog (real browser focus)
    const focusedElement = await page.evaluateHandle(() => document.activeElement);
    const isInDialog = await page.evaluate((dialogEl, focusedEl) => {
      return dialogEl.contains(focusedEl);
    }, await dialog.elementHandle(), focusedElement);
    
    expect(isInDialog).toBe(true);
    
    // Tab should cycle within dialog (not escape to body)
    await page.keyboard.press('Tab');
    const newFocused = await page.evaluateHandle(() => document.activeElement);
    const stillInDialog = await page.evaluate((dialogEl, focusedEl) => {
      return dialogEl.contains(focusedEl);
    }, await dialog.elementHandle(), newFocused);
    
    expect(stillInDialog).toBe(true);
  });

  test('CRITICAL: restores focus after closing', async ({ page }) => {
    const dialog = page.locator('na-dialog').first();
    const trigger = page.locator('#open-dialog');
    
    // Focus trigger before opening
    await trigger.focus();
    await trigger.click();
    await expect(dialog).toHaveAttribute('open', '');
    
    // Close dialog
    await page.keyboard.press('Escape');
    await expect(dialog).not.toHaveAttribute('open', '');
    
    // Focus should return to trigger (real browser focus restoration)
    await expect(trigger).toBeFocused();
  });
});

