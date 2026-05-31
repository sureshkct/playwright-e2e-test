import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {

    test.beforeEach("Go to Login Page", async ({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await expect(page).toHaveTitle('CURA Healthcare Service');
        await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');
        //Click to Make a Appointment
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await expect(page.getByText("Please login to make appointment.")).toBeVisible();

        //  Login the application
        await page.getByLabel('Username').click();
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();

    });

    test('Make a Appointment', async ({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await page.getByLabel('Facility').selectOption('Seoul CURA Healthcare Center');
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
        await page.getByRole('radio', { name: 'Medicaid' }).check();
        await page.locator('span').click();
        await page.getByRole('columnheader', { name: '»' }).click();
        await page.getByRole('cell', { name: '12' }).click();
        await page.getByRole('textbox', { name: 'Comment' }).click();
        await page.getByRole('textbox', { name: 'Comment' }).fill('This is demo testcause. ');
        await page.getByRole('button', { name: 'Book Appointment' }).click();
        await expect(page.locator('h2')).toContainText('Appointment Confirmation');
        await page.getByRole('link', { name: 'Go to Homepage' }).click();
    });
});
