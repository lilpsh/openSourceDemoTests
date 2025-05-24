import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        baseURL: 'https://opensource-demo.orangehrmlive.com',
        headless: false, // <- увімкнено відображення
        screenshot: 'only-on-failure',
        video: 'retain-on-failure', // можна додати запис відео
        trace: 'on-first-retry',
    },
    testDir: './tests',
});