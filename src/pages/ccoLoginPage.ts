import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { ccoUser } from "./../models/ccoUser";
import { browser } from "./../lib/browser";
import { Page } from './../lib/page';
import { page } from '.';

export class LoginPage extends Page {
    login = async (user: ccoUser) => {
        if (browser.browserName === "internet explorer") {
            await this.waitTitlePresent("This site isn’t secure");
            await browser.driver.findElement(By.id("infoBlockIDImage")).click();
            await browser.driver.findElement(By.id("overridelink")).click();
            await this.sleep(2);
        }
        if (await this.title() === "Home Realm Discovery") {
            if (browser.browserName === "internet explorer") {
                await this.jcssClick("span.largeTextNoWrap.indentNonCollapsible");
            } else {
                await this.click(By.css("div.idp[tabindex='1'] span.largeTextNoWrap.indentNonCollapsible"));
            }
        }
        await this.type(By.id("userNameInput"), `${user.domain}\\${user.username}`);
        await this.type(By.id("passwordInput"), user.password);
        await this.click(By.id("submitButton"));
        //await this.jClick("submitButton");
    }
}