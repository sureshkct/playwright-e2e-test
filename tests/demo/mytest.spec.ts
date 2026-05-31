
import { test, expect } from '@playwright/test';
/*
What it means: Think of Playwright as a toolbox. This line says, "Go into the @playwright/test package and pull out two specific tools: test and expect."
test: This tool is used to declare and structure your actual test cases.
expect: This is an "assertion" tool. It is used to validate conditions—checking if what is actually happening on the screen matches what should be happening.
*/
test('The Home Page Validation', async ({ page }) => {

   // test('Some Sample Test', { tag: '@smoke' }, async ({ page }, testinfo) => {
  //  });

    /*
    test('The Home Page Validation', ...): We use the test tool we imported. 
    The text in quotes is just a friendly label. When you run your automation in the terminal, 
    this is the name that will show up to tell you whether it passed or failed.
    
    async: This stands for asynchronous. In web automation, 
    things take time (waiting for a website to load, waiting for a button to appear). 
    async tells the computer: "This test is going to perform tasks that take time to finish. 
    Don't freeze up; wait for things when I tell you to."
    
    ({ page }): This is a built-in Playwright helper called a fixture. 
     It automatically opens a fresh, isolated browser tab (like a clean incognito window) 
     specifically for this test case so your tests don't interfere with each other.
    */

    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await expect(page).toHaveTitle('CURA Healthcare Service');
    await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');

}); 