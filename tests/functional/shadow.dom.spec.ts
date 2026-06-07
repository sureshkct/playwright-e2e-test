import { test, expect } from '@playwright/test';

test.describe('Shadow DOM Functionality', () => {

    test.beforeEach('Navigate to Shadow DOM page', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/shadowdom');
        await page.waitForLoadState('networkidle');
        // Wait for custom element to be present
        await expect(page.locator('my-paragraph')).toBeTruthy();
    });

    test('should interact with Shadow DOM element - verify custom element exists', async ({ page }) => {
        
        // Verify that my-paragraph custom element exists
        const customElements = page.locator('my-paragraph');
        
        // Count custom elements
        const elementCount = await customElements.count();
        console.log('Found custom elements:', elementCount);
        
        // Verify at least one custom element is present
        expect(elementCount).toBeGreaterThan(0);
        
        // Verify the first custom element is visible
        const firstElement = customElements.first();
        await expect(firstElement).toBeVisible();
    });

    test('should interact with Shadow DOM element - verify text content inside custom element', async ({ page }) => {
        
        // Get all custom elements
        const customElements = page.locator('my-paragraph');
        
        // Verify the first element is visible
        const firstElement = customElements.first();
        await expect(firstElement).toBeVisible();
        
        // Use Playwright's pierce handler to access Shadow DOM content
        // The syntax: my-paragraph >>> p will pierce through the shadow boundary
        const paragraphs = page.locator('my-paragraph >>> p');
        
        // Verify that we can access the paragraph inside shadow DOM
        const paragraphCount = await paragraphs.count();
        console.log('Paragraphs found in Shadow DOM:', paragraphCount);
        
        expect(paragraphCount).toBeGreaterThan(0);
        
        // Get text content from the first paragraph in Shadow DOM
        const firstParagraph = paragraphs.first();
        const textContent = await firstParagraph.textContent();
        console.log('Text from Shadow DOM:', textContent);
        
        expect(textContent).toBeTruthy();
        expect(textContent?.length).toBeGreaterThan(0);
    });

    test('should verify Shadow DOM content structure - access elements through pierce', async ({ page }) => {
        
        // Verify custom element is present
        const customElement = page.locator('my-paragraph').first();
        await expect(customElement).toBeVisible();
        
        // Access elements inside Shadow DOM using pierce (>>>)
        const shadowParagraphs = page.locator('my-paragraph >>> p');
        
        // Get count of paragraphs in shadow DOM
        const paragraphCount = await shadowParagraphs.count();
        console.log('Paragraphs in Shadow DOM:', paragraphCount);
        
        expect(paragraphCount).toBeGreaterThan(0);
        
        // Access multiple elements through the shadow boundary
        const allElements = page.locator('my-paragraph >>> *');
        const elementCount = await allElements.count();
        
        console.log('Total elements in Shadow DOM:', elementCount);
        expect(elementCount).toBeGreaterThan(0);
    });

    test('should interact with multiple Shadow DOM elements - access all custom elements', async ({ page }) => {
        
        // Get all my-paragraph custom elements
        const customElements = page.locator('my-paragraph');
        
        // Get count of custom elements
        const elementCount = await customElements.count();
        console.log('Total custom elements (my-paragraph):', elementCount);
        
        expect(elementCount).toBeGreaterThan(0);
        
        // Access and verify each custom element
        for (let i = 0; i < Math.min(elementCount, 5); i++) {
            const element = customElements.nth(i);
            
            // Verify each element is visible
            await expect(element).toBeVisible();
            
            // Get text content from inside the shadow DOM
            const innerText = await element.textContent();
            console.log(`Element ${i} text content:`, innerText?.substring(0, 50));
            
            expect(innerText).toBeTruthy();
        }
        
        // Verify interaction with multiple elements
        expect(elementCount).toBeGreaterThan(0);
    });

    test('should verify Shadow DOM text content - pierce through shadow boundary', async ({ page }) => {
        
        // Verify custom element exists
        const customElements = page.locator('my-paragraph');
        const elementCount = await customElements.count();
        
        expect(elementCount).toBeGreaterThan(0);
        
        // Access all paragraphs within all custom elements using pierce
        const shadowParagraphs = page.locator('my-paragraph >>> p');
        
        // Get the count of paragraphs accessible through shadow DOM
        const paragraphCount = await shadowParagraphs.count();
        console.log('Paragraphs accessible through Shadow DOM:', paragraphCount);
        
        expect(paragraphCount).toBeGreaterThan(0);
        
        // Get text content from first shadow DOM paragraph
        const firstParagraph = shadowParagraphs.first();
        const textContent = await firstParagraph.textContent();
        
        console.log('Text content from Shadow DOM:', textContent);
        
        // Verify the text content is accessible
        expect(textContent).toBeTruthy();
        expect(textContent?.trim().length).toBeGreaterThan(0);
    });
});
