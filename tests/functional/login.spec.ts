import { test, expect } from '@playwright/test';

test('should allow user to log in with valid credentials', async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await expect(page).toHaveTitle('CURA Healthcare Service');
    await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');
    //Click to Make a Appointment

    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await expect(page.getByText("Please login to make appointment.")).toBeVisible();

    // Login
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('John Doe');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify successful login
    await expect(page.locator('#appointment')).toBeVisible();
});

test('Negative: should display error message with invalid credentials', async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await expect(page).toHaveTitle('CURA Healthcare Service');
    await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');
    //Click to Make a Appointment
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await expect(page.getByText("Please login to make appointment.")).toBeVisible();

    // Login
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('John Smith');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    //Assert error message is displayed
    await expect(page.getByText('Login failed! Please ensure the username and password are valid.')).toBeVisible();
    // Verify successful login
});
