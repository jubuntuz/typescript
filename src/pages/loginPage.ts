import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { user } from "../models";
import { browser, Page } from "../lib";


export class loginPage extends Page {
    login = (async () => {
        if (browser.browserName === "internet explorer") {
            await this.waitTitlePresent("This site isn’t secure");
            await this.click(By.id("infoBlockIDImage"));
            await this.click(By.id("overridelink"));
            await this.sleep(2);
        }
        if (await this.title() === "Home Realm Discovery") {
            await this.click(By.css("div.idp[tabindex='1'] span.largeTextNoWrap.indentNonCollapsible"));
        }
        await this.type(By.id("userNameInput"), `${user.domain}\\${user.username}`);
        await this.type(By.id("passwordInput"), user.password);
        await this.click(By.id("submitButton"));
    });
}

