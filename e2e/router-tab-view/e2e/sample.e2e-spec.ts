import { AppiumDriver, createDriver, SearchOptions } from "nativescript-dev-appium";
import { assert } from "chai";

describe("sample scenario", () => {
    const defaultWaitTime = 5000;
    let driver: AppiumDriver;

    before(async () => {
        driver = await createDriver();
    });

    after(async () => {
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logScreenshot(this.currentTest.title);
        }
    });


    it("should find an tabs by text", async () => {
        const playerTab = await driver.findElementByText("Players", SearchOptions.exact);
        const teamsTab = await driver.findElementByText("Teams", SearchOptions.exact);
        const navBar = await driver.findElementByText("Player List", SearchOptions.exact);
    });

    it("should be able to switch between tabs", async () => {
        let actionBar = await driver.findElementByText("Player List", SearchOptions.exact);

        const teamsTab = await driver.findElementByText("Teams", SearchOptions.exact);
        await teamsTab.click();
        actionBar = await driver.findElementByText("Team List", SearchOptions.exact);

        const playerTab = await driver.findElementByText("Players", SearchOptions.exact);
        await playerTab.click();
        actionBar = await driver.findElementByText("Player List", SearchOptions.exact);
    });
});