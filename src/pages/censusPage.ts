import { Builder, By, until } from 'selenium-webdriver';
import { Page, findBy, browser } from './../lib';

let timeout = 15 * 1000;

export class censusPage extends Page {


    addTreatment = async (treatment: string) => {
        //select the first available patient
        let locator = {
            plusBtn: By.css("#MainContent_grdPatients_grdGrid_TreatmentEvents_0 tbody input.plus[type='button']"),
            trtEvent: By.id("MainContent_grdPatients_grdGrid_RowControl_0_ddlChangeCode_0"),
            changeBtn: By.id("MainContent_grdPatients_grdGrid_RowControl_0_btnCreateEvent_0")
        }
        await this.click(locator.plusBtn);
        await this.select(locator.trtEvent, treatment);
        await this.sleep(1);
        await this.click(locator.changeBtn);
    }

    getModalityOptions = async () => {
        let locator = {
            modality: By.id("ddlModality")
        }
        await this.waitLocated(locator.modality, timeout);
        return await this.getOptions(locator.modality);
    }

    setModality = async (modality: string) => {
        let locator = {
            modality: By.id("txtModalityCode"),
            errorbox: By.id("MainContent_grdPatients_grdGrid_RowControl_0_cvValModalityCode_0")
        }

        await this.waitLocated(locator.modality);
        await this.type(locator.modality, modality + "\n");
        await this.sleep(15);
        /*console.log(await browser.driver.findElement(locator.errorbox).isDisplayed());
        console.log(await browser.driver.findElement(locator.errorbox).getAttribute("style"));
*/
        return await this.getText(locator.errorbox);
    }

    //lauch to patient list page
    async launch(location: string, tab: string = "Manage Census", period: string = "") {

        if (tab.toLowerCase() !== "manage census" && tab.toLowerCase() !== "manage period") return false;
        await this.click(By.linkText("Census"));
        await this.click(By.linkText(tab));
        await this.selectInGrp(By.id("ddlLocation"), location);
        await this.click(By.id("MainContent_btnApplyFilters"));
        await this.sleep(15);
        console.log(await this.getText(By.css("#MainContent_grdPatients_grdGrid table tr td strong")));
    }
}
