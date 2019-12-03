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

        dob: {
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

    msgbox = {
        matchContinueBtn: By.id("MainContent_PatientMatch_btnContinue"),
        confirmRegBtn: By.id("MainContent_confirm_btnYes")
    }

    patientId = By.id("MainContent_lblPatientIDTop");

    register = async (reg: Registration) => {
        await this.fillup(reg);
        await this.submit();
        return await this.getPatientId();
    }


    fillup = async (reg: Registration) => {
        console.log(reg);
        await this.setLocationOfHospital(this.form.owner, reg);
        await this.sleep(1);
        await this.setHcn(this.form.hcn, reg);
        await this.sleep(1);
        this.setGender(this.form.gender, reg.gender);
        this.setRace(this.form.race, reg.race);

        this.setDate(this.form.date, reg.date);
        this.setDate(this.form.dob, reg.dob);
        this.setName(this.form.name, reg);
        this.setAddress(this.form.address, reg);
        this.setPayment(this.form.responsibilityForPayment, reg.responsibilityForPayment);
    }

    submit = async () => {
        await this.waitLocated(this.form.submitBtn, 5 * 1000);
        await this.click(this.form.submitBtn);
        await this.sleep(1);
        //await this.waitLocated(this.msgbox.matchContinueBtn);

        if (await this.isFound(this.msgbox.matchContinueBtn)) {
            await this.click(this.msgbox.matchContinueBtn);
        }
        await this.sleep(1);
        await this.waitLocated(this.msgbox.confirmRegBtn);
        await this.click(this.msgbox.confirmRegBtn);
        await this.sleep(1);
    }


    getPatientId = () => this.getText(this.patientId);

    launch = async (registerType: string) => {
        await this.click(By.linkText("Registration"));
        registerType === "Pregnancy" ?
            await this.click(By.id("MainContent_btRegisterPregnancy")) : //pregnancy registration
            await this.click(By.id("MainContent_btRegisterGlomerulonephrtis")); //Glomerulonephrtis registration
        return this;
    }
}