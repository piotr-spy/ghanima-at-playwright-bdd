import { chromium, firefox, webkit } from '@playwright/test'

/**
 * Browser capabilities
 */
const isHeadless = process.env.HEADLESS === 'true'

export const browsers = {
  chrome: {
    type: chromium,
    launchOptions: { headless: isHeadless }
  },
  safari: {
    type: webkit,
    launchOptions: { headless: isHeadless }
  },
  firefox: {
    type: firefox,
    launchOptions: { headless: isHeadless }
  }
}