import { When } from "@cucumber/cucumber";
import { World } from "../config/world";


When<World>(/^User (?:navigates to|is on) (.*) page$/, async function (page: string) {
    switch (page.toUpperCase()) {
        case `HOME`:
            await this.homePage.open()
            break
        default:
            throw new Error(`Unknown page parameter, please verify: "${page}"`)
    }
})