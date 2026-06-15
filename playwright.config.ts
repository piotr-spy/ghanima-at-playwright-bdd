import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './api/tests',
  reporter: [
    ['allure-playwright', { resultsDir: 'allure-results/api' }]
  ],
  use: {
    // baseURL: '',
  },
})