import { test, expect } from '@playwright/test';

test.describe('JavaScript Alerts Functionality', () => {

    test.beforeEach('Navigate to JavaScript Alerts page', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.getByRole('link', { name: 'JavaScript Alerts' }).click();
        await page.waitForLoadState('networkidle');
        await expect(page.getByRole('heading', { name: 'JavaScript Alerts' })).toBeVisible();
    });

    test('should handle JS Alert - accept it and assert result text', async ({ page }) => {
        
        // Listen for the alert dialog
        page.once('dialog', async dialog => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe('I am a JS Alert');
            await dialog.accept();
        });

        // Click on the first button to trigger JS Alert
        await page.getByRole('button', { name: 'Click for JS Alert' }).click();

        // Assert the result text
        await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
    });

    test('should handle JS Confirm - dismiss/cancel it and assert result text', async ({ page }) => {
        
        // Listen for the confirm dialog
        page.once('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toBe('I am a JS Confirm');
            await dialog.dismiss();
        });

        // Click on the second button to trigger JS Confirm
        await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

        // Assert the result text
        await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
    });

    test('should handle JS Prompt - enter text, accept it, and assert result text', async ({ page }) => {
        
        // Listen for the prompt dialog
        page.once('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.accept('Playwright Automation');
        });

        // Click on the third button to trigger JS Prompt
        await page.getByRole('button', { name: 'Click for JS Prompt' }).click();

        // Assert the result text
        await expect(page.locator('#result')).toHaveText('You entered: Playwright Automation');
    });
});
