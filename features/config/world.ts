import { World as CucumberWorld } from "@cucumber/cucumber"
import { environments } from "./environments"
import { browsers } from "./browsers"
import { devices } from "./devices"
import { Browser, BrowserContext, Page } from "@playwright/test"
import { HomePage } from "../pageobjects/home.page"

export class World extends CucumberWorld {
    env!: keyof typeof environments
    browserName!: keyof typeof browsers
    headless!: boolean
    device!: keyof typeof devices
    browser!: Browser
    context!: BrowserContext
    page!: Page
    baseURL!: string
    isMobile!: boolean
    skip!: () => void
    homePage!: HomePage
}