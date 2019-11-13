import { Builder, By, until, WebElement } from 'selenium-webdriver';
import { Page, findBy } from '../lib/page';
import { Registration } from "../models";

export class registrationPage extends Page {

    //@findBy("MainContent_ddlHospital")
    form = {
        owner: {
            hospital: By.id("MainContent_ddlHospital"), //selectbox
            location: By.id("MainContent_ddlLocation") //selectbox
        },

        date: {
            day: By.id("MainContent_dtClientVisitDate_txtDay"),
            month: By.id("MainContent_dtClientVisitDate_ddlMonth"), //selectbox
            year: By.id("MainContent_dtClientVisitDate_txtYear")
        },

        hcn: {
            notAvailable: By.id("MainContent_chkHCNAvailable"), //checkbox
            hcnNo: By.id("MainContent_txtHealthCardNo"),
            province: By.id("MainContent_ddlHCNProvince") //selectbox
        },

        responsibilityForPayment: By.id("MainContent_txtResponsibilityForPayment"),

        name: {
            lastname: By.id("MainContent_txtLastName"),
            firstname: By.id("MainContent_txtFirstName")
        },

        bod: {
            day: By.id("MainContent_dtDOB_txtDay"),
            month: By.id("MainContent_dtDOB_ddlMonth"),
            year: By.id("MainContent_dtDOB_txtYear")
        },

        gender: By.id("MainContent_ddlGender"), //selectbox

        race: By.id("MainContent_ddlRace"),//selectbox

        address: {
            street: By.id("MainContent_tbStreetAddress1"),
            province: By.id("MainContent_ddlProvince"),//selectbox
            postalcode: By.id("MainContent_txtPostalCode")

        },

        submitBtn: By.id("MainContent_btnFinish")//button
    }

    matchContinueBtnId = "MainContent_PatientMatch_btnContinue";
    confirmRegBtnId = "MainContent_lblPatientIDTop";

    patientId = "MainContent_lblPatientIDTop";

    register = async (reg: Registration) => {
        this.setLocationOfHospital(this.form.owner, reg);
        this.setDate(this.form.date, reg.bod);
        this.setName(this.form.name, reg);
        this.setAddress(this.form.address, reg);
        this.setPayment(this.form.responsibilityForPayment, reg.responsibilityForPayment);
        this.setGender(this.form.gender, reg.gender);
        this.setRace(this.form.gender, reg.race);
        this.setHcn(this.form.hcn, reg);
        await this.click(this.form.submitBtn);

        //warning if patient exists
        if (await this.isFound(By.id(this.matchContinueBtnId))) {
            await this.click(By.id(this.matchContinueBtnId));
        }
        //confirm registration 
        await this.click(By.id(this.confirmRegBtnId));
        return await this.getPatientId;
    }


    getPatientId = () => this.getText(By.id(this.patientId));

    launch = async (registerType: string) => {
        await this.click(By.linkText("Registration"));
        registerType === "Pregnancy" ?
            await this.click(By.id("MainContent_btRegisterPregnancy")) : //pregnancy registration
            await this.click(By.id("MainContent_btRegisterGlomerulonephrtis")); //Glomerulonephrtis registration
        return this;
    }
}