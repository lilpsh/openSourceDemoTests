import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login Tests', () => {
    const loginUrl = '/web/index.php/auth/login';

    test.beforeEach(async ({ page }) => {
        await page.goto(loginUrl);
    });

    test('Успішний вхід у систему', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        // Тепер перевіряємо заголовок Dashboard
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Помилковий вхід у систему (неправильний пароль)', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('wrongpassword');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });

    test('Перехід до сторінки "My Info" після входу', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL(/dashboard/);

        await page.getByRole('link', { name: 'My Info' }).click();

        // Тепер перевіряємо заголовок Personal Details
        await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
        await expect(page).toHaveURL(/pim\/viewPersonalDetails/);
    });
});
