const webdriver = require('selenium-webdriver');
import { WebDriver, Capabilities, By } from 'selenium-webdriver';
import { exists } from 'fs';
const pkg = require('./../../package.json');
const chrome = require('chromedriver').path;
const ie = require('iedriver').path;


export class browser {
    static driver: WebDriver;
    static browserName: string;

    constructor(browserName: string = "chrome") {
        browser.browserName = browserName;
    }

    async launch() {
        let url = pkg.application;
        console.log(`launching ${url}`);
        if (browser.browserName === "internet explorer" || browser.browserName == "ie") {
            let cap = webdriver.Capabilities.ie(); //not working
            cap.set("ignoreProtectedModeSettings", true);
            cap.set("ignoreZoomSetting", true);
            cap.set("nativeEvents", true);
            browser.driver = await new webdriver.Builder(ie)
                .forBrowser("internet explorer")
                .withCapabilities(cap)
                .build();
        } else {
            browser.driver = await new webdriver.Builder()
                .forBrowser("chrome")
                .withCapabilities(Capabilities.chrome())
                .build();
        }
        await browser.driver.manage().window().maximize();
        await browser.driver.get(url);
    }

    quit() {
        browser.driver.quit();
    }
}


