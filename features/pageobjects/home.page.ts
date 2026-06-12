import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    constructor(page: Page, baseURL: string) {
        super(page, baseURL)
    }

    /**
     * Overwrite specific base page methods, if necessary
     */
    public open() {
        return super.open(``)
    }

    /**
     * Page locators
     */
    public get topMessage() {
        return this.page.locator(`div.testing-notification-bar`)
    }
    public get searchInput() {
        return this.page.locator(`#search-query`)
    }
    public get headerMenu() {
        return this.page.locator(`nav.navbar.navbar-expand-lg`)
    }
    public get pageTitle() {
        return this.page.locator(`a.navbar-brand`)
    }
    public get pageContent() {
        return this.page.locator(`div.container app-overview`)
    }
    public get productCards() {
        return this.page.locator(`a.card`)
    }
    public get footer() {
        return this.page.locator(`app-footer`)
    }
}