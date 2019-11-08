import { Builder, By, until } from 'selenium-webdriver';
import { Page, findBy } from './../lib/page';

export class orrsCensusPage extends Page {

    addTreatment = async (treatment: string) => {
        //select the first available patient
        await this.click(By.css("#MainContent_grdPatients_grdGrid_TreatmentEvents_0 tbody input.plus[type='button']"));
        await this.select(By.id("MainContent_grdPatients_grdGrid_RowControl_0_ddlChangeCode_0"), treatment);
        await this.click(By.css("input#MainContent_grdPatients_grdGrid_RowControl_0_btnCreateEvent_0"));
        await this.sleep(5);//added for ie
    }

    getModalityOptions = async () => 
        await this.getOptions(By.id("ddlModality"));
    

    modality = async (modality: string) => {
        await this.type(By.id("txtModalityCode"), modality + "\n");
        await this.sleep(8);
        return await this.text(By.id("MainContent_grdPatients_grdGrid_RowControl_0_cvValModalityCode_0"));
    }

    //lauch to patient list page
    async launch(location: string, tab: string = "Manage Census", period: string = "") {
        if (tab.toLowerCase() !== "manage census" && tab.toLowerCase() !== "manage period") return false;
        await this.click(By.linkText("Census"));
        await this.click(By.linkText(tab));
        await this.selectInGrp(By.id("ddlLocation"), location);
        await this.click(By.id("MainContent_btnApplyFilters"));
        await this.sleep(15);
        /* await this.sleep(1);
         await this.waitTextPresent(By.css("#MainContent_grdPatients_grdGrid table tr td strong"), `/${location}`);*/
        console.log(await this.text(By.css("#MainContent_grdPatients_grdGrid table tr td strong")));
    }
}
