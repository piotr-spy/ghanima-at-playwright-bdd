import { Then } from "@cucumber/cucumber";
import { World } from "../config/world";
import { expect } from "@playwright/test";

Then<World>(`Home page contains all the necessary sections`, async function () {
    await expect(this.homePage.topMessage).toBeVisible()
    await expect(this.homePage.searchInput).toBeEditable()
    await expect(this.homePage.headerMenu).toBeVisible()
    await expect(this.homePage.pageTitle).toBeVisible()
    await expect(this.homePage.pageContent).toBeVisible()
    for (const productCard of await this.homePage.productCards.all()) {
        await expect(productCard).toBeVisible()
        await expect(productCard).toBeEnabled()
    }
    await expect(this.homePage.footer).toBeVisible()
})