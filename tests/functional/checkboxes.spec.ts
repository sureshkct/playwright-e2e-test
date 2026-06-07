import { test, expect } from '@playwright/test';

test.describe('Checkboxes Functionality', () => {

    test.beforeEach('Navigate to Checkboxes page', async ({ page }) => {
        // Navigate directly to the checkboxes page URL
        await page.goto('https://the-internet.herokuapp.com/checkboxes', { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Wait for the heading to be visible
        await expect(page.getByRole('heading', { name: 'Checkboxes' })).toBeVisible({ timeout: 10000 });
    });

    test('should verify initial checkbox states', async ({ page }) => {
        
        // Get all checkboxes
        const checkboxes = await page.locator('input[type="checkbox"]').all();
        
        // Verify there are 2 checkboxes
        expect(checkboxes.length).toBe(2);
        
        // Verify first checkbox is unchecked
        const firstCheckbox = page.locator('input[type="checkbox"]').nth(0);
        await expect(firstCheckbox).not.toBeChecked();
        
        // Verify second checkbox is checked
        const secondCheckbox = page.locator('input[type="checkbox"]').nth(1);
        await expect(secondCheckbox).toBeChecked();
    });

    test('should check unchecked checkbox and verify state', async ({ page }) => {
        
        // Get the first checkbox (initially unchecked)
        const firstCheckbox = page.locator('input[type="checkbox"]').nth(0);
        
        // Verify it's initially unchecked
        await expect(firstCheckbox).not.toBeChecked();
        
        // Click to check the checkbox
        await firstCheckbox.click();
        
        // Verify it's now checked
        await expect(firstCheckbox).toBeChecked();
    });

    test('should uncheck checked checkbox and verify state', async ({ page }) => {
        
        // Get the second checkbox (initially checked)
        const secondCheckbox = page.locator('input[type="checkbox"]').nth(1);
        
        // Verify it's initially checked
        await expect(secondCheckbox).toBeChecked();
        
        // Click to uncheck the checkbox
        await secondCheckbox.click();
        
        // Verify it's now unchecked
        await expect(secondCheckbox).not.toBeChecked();
    });

    test('should toggle both checkboxes and verify final states', async ({ page }) => {
        
        const firstCheckbox = page.locator('input[type="checkbox"]').nth(0);
        const secondCheckbox = page.locator('input[type="checkbox"]').nth(1);
        
        // Initial states: first unchecked, second checked
        await expect(firstCheckbox).not.toBeChecked();
        await expect(secondCheckbox).toBeChecked();
        
        // Toggle first checkbox (unchecked -> checked)
        await firstCheckbox.click();
        await expect(firstCheckbox).toBeChecked();
        
        // Toggle second checkbox (checked -> unchecked)
        await secondCheckbox.click();
        await expect(secondCheckbox).not.toBeChecked();
        
        // Verify final states are reversed from initial
        await expect(firstCheckbox).toBeChecked();
        await expect(secondCheckbox).not.toBeChecked();
    });

    test('should toggle multiple times and track state changes', async ({ page }) => {
        
        const firstCheckbox = page.locator('input[type="checkbox"]').nth(0);
        
        // Initial: unchecked
        await expect(firstCheckbox).not.toBeChecked();
        
        // Toggle 1: check
        await firstCheckbox.click();
        await expect(firstCheckbox).toBeChecked();
        
        // Toggle 2: uncheck
        await firstCheckbox.click();
        await expect(firstCheckbox).not.toBeChecked();
        
        // Toggle 3: check
        await firstCheckbox.click();
        await expect(firstCheckbox).toBeChecked();
        
        // Verify final state
        await expect(firstCheckbox).toBeChecked();
    });
});
