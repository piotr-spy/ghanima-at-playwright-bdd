import { After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep, setDefaultTimeout } from "@cucumber/cucumber"

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
Before(async function (scenario) {})

/**
 * Runs before each step
 * 
 * @param step
 */
BeforeStep(async function (step) {})

/**
 * Runs after each step
 * 
 * @param step
 */
AfterStep(async function (step) {})

/**
 * Runs after each scenario
 * 
 * @param scenario
 */
After(async function (scenario) {})

/**
 * Runs once after all scenarios
 */
AfterAll(async function () {
})