import { Page } from "@playwright/test"

/**
 * Base Page contains methods, selectors, and functionalities
 * shared across page objects
 */
export abstract class BasePage {
  constructor(protected readonly page: Page, protected readonly baseURL: string) {}

  public async getTitle(): Promise<string> {
    return await this.page.title()
  }

  public open(path: string) {
    return this.page.goto(`${this.baseURL}/${path}`)
  }
}