import { By, until, WebElement, WebDriver } from 'selenium-webdriver';
import { browser } from "./browser";
import 'reflect-metadata';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';

let timeout = 50 * 1000;

export class Page {

    title = () => browser.driver.getTitle();

    //wait
    waitTextPresent = (by: By, content: string) =>
        this.find(by)
            .then((element) => browser.driver.wait(until.elementTextContains(element, content), timeout));

    waitPresent = (by: By) =>
        browser.driver.wait(until.elementLocated(by), timeout);


    waitTitlePresent = (title: string) =>
        browser.driver.wait(until.titleIs(title), timeout);

    waitReady = () =>
        //until form is present
        browser.driver.wait(until.elementLocated(By.css("body")), timeout);

    // mouse behavior
    find = (by: By) =>
        browser.driver.wait(until.elementLocated(by), timeout)
            .then(() => browser.driver.findElement(by));

    type = (by: By, text: string) =>
        this.find(by)
            .then(element => element.sendKeys(text));

    selectInGrp = (by: By, value: string) => //select with optgroup - by option value
        this.find(by)
            .then(parent => parent.findElement(By.css("optgroup option[value='" + value + "']")).click())

    select = (by: By, value: string) => //select by option value
        this.find(by)
            .then(parent => parent.findElement(By.css("option[value='" + value + "']")).click())

    click = (by: By) =>
        this.find(by).then(element => element.click());

    check = (by: By, toBeChecked: boolean) =>
        this.find(by)
            .then(async (element) => {
                if (await element.isSelected() !== toBeChecked) {
                    this.click(by);
                }
            });


    //get
    getAttrById = (id: string, attr: string) =>
        this.find(By.id(id))
            .then(element => element.getAttribute(attr));


    getOptions = (by: By) => {
        this.find(by)
            .then(dropbox => dropbox.findElements(By.css("option")))
            .then(async elements => {
                if (browser.browserName === "internet explorer" || browser.browserName === "ie") {
                    return Promise.resolve(elements[0].getAttribute("value"));
                } else {
                    return Promise.all(elements.map(element => element.getAttribute("value")));
                }
            });
    }

    getText = (by: By) =>
        this.find(by)
            .then((element) => element.getText());

    //bool - is
    isFound = (by: By) =>
        browser.driver.findElements(by).then(found => found.length != 0);

    isDisplayed = (by: By) =>
        this.find(by)
            .then((element) => element.isDisplayed());

    isDisabled = (by: By) =>
        this.find(by)
            .then(async (element) => await element.getAttribute('disabled') === 'disabled');

    sleep = (seconds: number) =>
        new Promise(resolve => setTimeout(resolve, seconds * 1000));

    //orrs
    setDate = (locator: { year: By, month: By, day: By }, date: Date) => {
        this.type(locator.year, date.getUTCFullYear().toString());
        this.select(locator.month, (date.getUTCMonth() + 1).toString());
        this.type(locator.day, date.getUTCDate().toString());
    }

    setLocationOfHospital = async (locator: { hospital: By, location: By }, visit: { hospital: string, location: string }) => {
        await this.select(locator.hospital, visit.hospital);
        await this.sleep(1);
        await this.selectInGrp(locator.location, visit.location);
    }

    setName = (locator: { firstname: By, lastname: By }, name: { firstname: string, lastname: string }) => {
        this.type(locator.firstname, name.firstname);
        this.type(locator.lastname, name.lastname);
    }

    setAddress = (locator: { street: By, province: By, postalcode: By }, address: { street: string, addrProvince: string, postalcode: string }) => {
        this.type(locator.street, address.street);
        this.select(locator.province, address.addrProvince);
        this.type(locator.postalcode, address.postalcode);
    }

    setRace = (locator: By, race: string) =>
        this.select(locator, race);

    setGender = (locator: By, gender: string) =>
        this.select(locator, gender);

    setPayment = (locator: By, responsibilityForPayment: string) =>
        this.type(locator, responsibilityForPayment);


    setHcn = (locator: { notAvailable: By, hcnNo: By, province: By }, hcn: { hcnNotAvailable: boolean, hcnProvince: string, hcnNo: string }) => {
        this.check(locator.notAvailable, hcn.hcnNotAvailable);
        if (!hcn.hcnNotAvailable) {
            this.type(locator.hcnNo, hcn.hcnNo);
            this.select(locator.province, hcn.hcnProvince);
        }
    }

    //jsExecutor
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

//export var page: Page;