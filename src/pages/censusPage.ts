import { Builder, By, until } from 'selenium-webdriver';
import { Page, findBy } from '../lib/page';

export class censusPage extends Page {

    addTreatment = async (treatment: string) => {
        //select the first available patient
        let locator = {
            plusBtn: By.css("#MainContent_grdPatients_grdGrid_TreatmentEvents_0 tbody input.plus[type='button']"),
            trtEvent: By.id("MainContent_grdPatients_grdGrid_RowControl_0_ddlChangeCode_0"),
            changeBtn: By.css("input#MainContent_grdPatients_grdGrid_RowControl_0_btnCreateEvent_0")
        }
        await this.click(locator.plusBtn);
        await this.select(locator.trtEvent, treatment);
        await this.click(locator.changeBtn);
        await this.sleep(5);
    }

    getModalityOptions = async () =>
        await this.getOptions(By.id("ddlModality"));


    setModality = async (modality: string) => {
        let locator = {
            modality: By.id("txtModalityCode"),
            warningbox: By.id("MainContent_grdPatients_grdGrid_RowControl_0_cvValModalityCode_0")
        }
        await this.type(locator.modality, modality + "\n");
        await this.sleep(12);
        return await this.getText(locator.warningbox);
    }

    //lauch to patient list page
    async launch(location: string, tab: string = "Manage Census", period: string = "") {
        if (tab.toLowerCase() !== "manage census" && tab.toLowerCase() !== "manage period") return false;
        await this.click(By.linkText("Census"));
        await this.click(By.linkText(tab));
        await this.selectInGrp(By.id("ddlLocation"), location);
        await this.click(By.id("MainContent_btnApplyFilters"));
        await this.sleep(10);
        console.log(await this.getText(By.css("#MainContent_grdPatients_grdGrid table tr td strong")));
    }
}
