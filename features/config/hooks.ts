

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