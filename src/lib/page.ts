import { By, until, WebElement, WebDriver } from 'selenium-webdriver';
import { Visit, Demographic, Payment } from "../models/orrsBase";
import { browser } from "./browser";

import * as form from "../pages/orrsInterface";
import 'reflect-metadata';

let timeout = 50 * 1000;

export class Page {

    title = () => browser.driver.getTitle();

    isPresent = (by: By) =>
        browser.driver.findElements(by).then(found => found.length != 0);

    text = (by: By) =>
        this.find(by)
            .then(async (element) => await browser.driver.wait(until.elementIsVisible(element), timeout))
            .then(async (element) => await element.getText());

    waitTextPresent = (by: By, content: string) =>
        this.find(by)
            .then(async (element) => await browser.driver.wait(until.elementTextContains(element, content), timeout));


    waitTitlePresent = (title: string) =>
        browser.driver.wait(until.titleIs(title), timeout);

    ready = () =>
        //until form is present
        browser.driver.wait(until.elementLocated(By.css("body")), timeout);


    find = (by: By) =>
        browser.driver.wait(until.elementLocated(by), timeout)
            .then(async () => await browser.driver.findElement(by));

    /*
    findAll = (by: By) =>
        browser.driver.wait(until.elementLocated(by), timeout)
            .then(async () => await browser.driver.findElements(by));
*/
    type = (by: By, text: string) =>
        this.find(by)
            .then(async (element) => await element.sendKeys(text));

    jClean = (id: string) =>
        this.find(By.id(id))
            .then(() => {
                browser.driver.executeScript("document.getElementById('" + id + "').value = ''");
            });


    jType = (id: string, value: string) =>
        this.find(By.id(id))
            .then(() => {
                browser.driver.executeScript("document.getElementById('" + id + "').value = '" + value + "\n'");
            });

    jClick = (id: string) =>
        this.find(By.id(id))
            .then(() => browser.driver.executeScript("document.getElementById('" + id + "').click()"));

    jcssClick = (css: string) =>
        this.find(By.css(css))
            .then(() => browser.driver.executeScript("document.querySelector('" + css + "').click()"));

    iClick = (css: string, index: number) =>
        this.find(By.css(css))
            .then(() => browser.driver.executeScript("document.querySelectorAll('" + css + "')[" + index + "].click()"));

    getAttrById = (id: string) =>
        this.find(By.id(id))
            .then(async (element) => await element.getAttribute("type"));

    //by: droplist locator
    getOptions = async (by: By) => {
        let elements = await this.find(by)
            .then(async (dropbox) => dropbox.findElements(By.css("option")));
        if (browser.browserName === "internet explorer" || browser.browserName === "ie") {
            return await elements[0].getAttribute("value");
        } else {
            return await Promise.all(elements.map(async (element) => await element.getAttribute("value")));
        }


    }

    isDisplayed = (by: By) =>
        this.find(by)
            .then(async (element: WebElement) => await element.isDisplayed());

    isDisabled = (by: By) =>
        this.find(by)
            .then(async (element) => await element.getAttribute('disabled') === 'disabled');

    //select with optgroup -> option by value
    selectInGrp = (by: By, value: string) =>
        this.find(by)
            .then(async (parent) => await parent.findElement(By.css("optgroup option[value='" + value + "']")).click())
            .then(async () => await this.sleep(1));


    //select by option value
    select = (by: By, value: string) =>
        this.find(by)
            .then(async (parent) => await parent.findElement(By.css("option[value='" + value + "']")).click())
            .then(async () => await this.sleep(1));

    click = async (by: By) =>
        await this.find(by).then(async (element) => await element.click());


    sleep(seconds: number) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    //checkbox
    async  check(by: By, toBeChecked: boolean) {
        let element = await this.find(by);
        if (await element.isSelected() !== toBeChecked) {
            await this.click(by);
        }
    }

    async setDate(dateLocator: form.dateBy, date: { year: string, month: string, day: string }) {
        //has to await for ie
        await this.type(dateLocator.yearTxt, date.year);
        await this.select(dateLocator.monthSel, date.month);
        await this.type(dateLocator.dayTxt, date.day);
    }


    async  setVisit(locator: form.visitBy, visit: Visit) {
        await this.select(locator.hospitalSel, visit.hospital);
        await this.selectInGrp(locator.locationSel, visit.location);
        await this.sleep(1);
        await this.setDate(locator.date, visit.date);
    }

    async setDemography(locator: form.demographicBy, demo: Demographic) {
        //has to await for ie
        await this.type(locator.name.firstnameTxt, demo.name.firstname);
        await this.type(locator.name.lastnameTxt, demo.name.lastname);

        await this.type(locator.address.streetTxt, demo.address.street);
        await this.select(locator.address.provinceSel, demo.address.province);
        await this.type(locator.address.postalcodeTxt, demo.address.postalcode);

        await this.setDate(locator.bod, demo.bod);
        await this.select(locator.genderSel, demo.gender);
        await this.select(locator.raceSel, demo.races);
    }

    async  setPayment(locator: form.paymentBy, payment: Payment) {
        await this.type(locator.responsibilityForPaymentTxt, payment.responsibilityForPayment);//has to await for ie
        await this.check(locator.notAvailableChk, payment.hcn.notAvailable);
        if (!payment.hcn.notAvailable) {//has to await for ie
            await this.type(locator.hcnNoTxt, payment.hcn.hcnNo);
            await this.select(locator.provinceSel, payment.hcn.province);
        }
    }
}

export function findBy(selector: string) {
    return (target: any, propertyKey: string) => {
        const type = Reflect.getMetadata('design:type', target, propertyKey);
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            get: function () {
                const promise = (this as any).browser.driver.findElement(selector);
                return new type(promise, selector);
            },
        });
    };
}
