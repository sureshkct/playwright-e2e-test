import { test, expect } from '@playwright/test';

test.describe('Multiple Windows Functionality', () => {

    test('should handle multiple windows and navigate between them', async ({ context, page }) => {
        
        // Navigate to the site
        await page.goto('https://the-internet.herokuapp.com/');
        
        // Click on "Multiple Windows" link
        await page.getByRole('link', { name: 'Multiple Windows' }).click();
        
        // Wait for new window and assert the header
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.getByRole('link', { name: /click here/i }).click()
        ]);
        
        // Navigate to the newly opened window and assert the header
        await newPage.waitForLoadState();
        await expect(page.locator('h1')).toHaveText('Opening a new window');
        
        // Click the link on that new window to open another window
        const [thirdPage] = await Promise.all([
            context.waitForEvent('page'),
            newPage.locator('a').click()
        ]);
        
        // Navigate to the next window that is opened
        await thirdPage.waitForLoadState();
        
        // Assert the header text on the third page
        const thirdPageHeader = thirdPage.locator('h1');
        await expect(thirdPageHeader).toContainText('New Window');
        
        // Come back to the parent window
        await page.bringToFront();
        const parentHeader = page.locator('h1');
        await expect(parentHeader).toHaveText('Opening a new window');
    });
});
