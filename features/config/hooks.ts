import { After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep, setDefaultTimeout } from "@cucumber/cucumber"
import { HomePage } from "../pageobjects/home.page"
import { environments } from "./environments"
import { browsers } from "./browsers"
import { devices } from "./devices"
import { World } from "./world"

/**
 * Execution parameters
 */
const ENV = process.env.ENV
if (!ENV || !['local', 'dev', 'stage', 'prod'].includes(ENV)) {
    console.error("Please define appropriate ENV variable : ENV=local||dev||stage||prod")
    process.exit(1)
}

const BROWSER = process.env.BROWSER
if (!BROWSER || !['chrome', 'safari', 'firefox'].includes(BROWSER)) {
    console.error("Please define appropriate BROWSER variable : BROWSER=chrome||safari||firefox")
    process.exit(1)
}

const HEADLESS = process.env.HEADLESS
if (!HEADLESS || !['true', 'false'].includes(HEADLESS)) {
    console.error("Please pass appropriate HEADLESS variable : HEADLESS=true||false");
    process.exit(1);
}

const DEVICE = process.env.DEVICE
if (!DEVICE || !['desktopHD', 'desktop1440p', 'iphone14ProMax', 'galaxyS20Ultra'].includes(DEVICE)) {
    console.error("Please define appropriate DEVICE variable : DEVICE=desktopHD||desktop1440p||iphone14ProMax||galaxyS20Ultra")
    process.exit(1)
}

// Set maximum allowable timeout - to be overridden by step timeouts
setDefaultTimeout(30000)

/**
 * HOOKS
 */

/**
 * Runs once before all scenarios
 */
BeforeAll(async function () {})

/**
 * Runs before each scenario
 * 
 * @param scenario
 */
Before<World>(async function (scenario) {
    // Set scenario context variables
    this.env = ENV as keyof typeof environments
    this.browserName = BROWSER as keyof typeof browsers
    this.headless = HEADLESS === 'true'
    this.device = DEVICE as keyof typeof devices
    this.isMobile = devices[this.device].isMobile
    this.baseURL = environments[this.env].baseURL

    // Filter out desktop only scenarios on mobile and vice versa
    const scenarioTags = scenario.pickle.tags.map(tag => tag.name)
    this.isMobile && scenarioTags.includes(`@desktopOnly`) ||
    !this.isMobile && scenarioTags.includes(`@mobileOnly`) ? this.skip() : undefined

    // Set up browser, context, and page
    this.browser = await browsers[this.browserName].type.launch(browsers[this.browserName].launchOptions)
    this.context = await this.browser.newContext({
        viewport: devices[this.device].viewport
    })
    this.page = await this.context.newPage()

    // Initialize page objects
    this.homePage = new HomePage(this.page, this.baseURL)
})

/**
 * Runs before each step
 * 
 * @param step
 */
BeforeStep<World>(async function (step) {})

/**
 * Runs after each step
 * 
 * @param step
 */
AfterStep<World>(async function ({ result }) {
    // Capture screenshot on failure
    if (result.status !== 'PASSED' && this.page) {
        const screenshot = await this.page.screenshot({ type: 'jpeg', quality: 75 })
        this.attach(screenshot, 'image/jpeg')
    }
})

/**
 * Runs after each scenario
 * 
 * @param scenario
 */
After<World>(async function (scenario) {
    if (this.page) await this.page.close()
    if (this.context) await this.context.close()
    if (this.browser) await this.browser.close()
})

/**
 * Runs once after all scenarios
 */
AfterAll(async function () {
})