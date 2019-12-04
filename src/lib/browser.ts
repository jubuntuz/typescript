const webdriver = require('selenium-webdriver');
import { WebDriver, Capabilities, By } from 'selenium-webdriver';
const pkg = require('./../../package.json');

const chrome = require('chromedriver').path;
const ie = require('iedriver').path;

export class browser {
    static driver: WebDriver;
    static browserName: string;

    constructor() {
        browser.browserName = pkg.test.browser;
    }

    async tearup() {
        let url = pkg.application;

        if (browser.browserName === "internet explorer" || browser.browserName == "ie") {
            let cap = webdriver.Capabilities.ie();
            cap.set("ignoreProtectedModeSettings", true);
            cap.set("ignoreZoomSetting", true);
            cap.set("nativeEvents", false);
            console.log(ie);
            browser.driver = await new webdriver.Builder(ie)
                .forBrowser("internet explorer")
                .withCapabilities(Capabilities.ie())
                .build();
        } else {
            browser.driver = await new webdriver.Builder(chrome)
                .forBrowser("chrome")
                .withCapabilities(Capabilities.chrome())
                .build();
        }
        await browser.driver.manage().window().maximize();
        await browser.driver.get(url);
    }

    teardown() {
        browser.driver.quit();
    }
}


