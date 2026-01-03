import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Button Web Component
 * 
 * Tests critical user interactions and accessibility
 * Based on best practices from Vuesion and Stencil.js
 */

test.describe('Button Web Component', () => {
  test.beforeEach(async ({ page }) => {
    // Load test page with button component
    await page.goto('/components/html/examples/button-example.html');
    
    // Wait for component to be defined
    await page.waitForFunction(() => customElements.get('na-button') !== undefined);
  });

  test('should render button with text', async ({ page }) => {
    const button = page.locator('na-button').first();
    await expect(button).toBeVisible();
    await expect(button).toContainText('Click me');
  });

  test('should handle click events', async ({ page }) => {
    const button = page.locator('na-button').first();
    const clickCount = page.locator('#click-count');
    
    await button.click();
    await expect(clickCount).toHaveText('1');
  });

  test('should be disabled when disabled attribute is set', async ({ page }) => {
    const button = page.locator('na-button[disabled]').first();
    await expect(button).toHaveAttribute('disabled', '');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('should show loading state', async ({ page }) => {
    const button = page.locator('na-button[loading]').first();
    await expect(button).toHaveAttribute('loading', '');
    await expect(button).toHaveAttribute('aria-busy', 'true');
  });

  test('should support keyboard navigation', async ({ page }) => {
    const button = page.locator('na-button').first();
    
    // Tab to button
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    
    // Activate with Enter
    await page.keyboard.press('Enter');
    const clickCount = page.locator('#click-count');
    await expect(clickCount).toHaveText('1');
  });

  test('should apply variant classes', async ({ page }) => {
    const button = page.locator('na-button[variant="primary"]').first();
    await expect(button).toHaveClass(/na-button--primary/);
  });

  test('should apply size classes', async ({ page }) => {
    const button = page.locator('na-button[size="lg"]').first();
    await expect(button).toHaveClass(/na-button--lg/);
  });
});

