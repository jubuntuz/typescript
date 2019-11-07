const webdriver = require('selenium-webdriver');
import { WebDriver, Capabilities, By } from 'selenium-webdriver';
const chrome = require('chromedriver').path;
const ie = require('iedriver').path;


export class browser {
    static driver: WebDriver;
    static browserName: string;

    constructor(browserName: string = "chrome") {
        browser.browserName = browserName;
    }

    async launch(url: string = "https://localhost/orrs.web") {
        if (browser.browserName === "internet explorer") {
            let cap = webdriver.Capabilities.ie();
            cap.set("ignoreProtectedModeSettings", true);
            cap.set("ignoreZoomSetting", true);
            cap.set("nativeEvents", false);
            browser.driver = await new webdriver.Builder(ie)
                .forBrowser("internet explorer")
                .withCapabilities(cap)
                .build();
        } else {
            browser.driver = new webdriver.Builder(chrome)
                .forBrowser("chrome")
                .withCapabilities(Capabilities.chrome())
                .build();
            browser.driver.manage().window().maximize();
        }
        await browser.driver.get(url);
    }

    quit() {
        browser.driver.quit();
    }
}


