import { Builder, By, until, WebElement } from 'selenium-webdriver';
import { Page, findBy } from '../lib/page';
import { Registration } from "./../models/.";

export class registrationPage extends Page {
    
    //@findBy("MainContent_ddlHospital")
   
    owner = {
        hospital: By.id("MainContent_ddlHospital"), //selectbox
        location: By.id("MainContent_ddlLocation") //selectbox
    }
            
    date = {
        day: By.id("MainContent_dtClientVisitDate_txtDay"),
        month: By.id("MainContent_dtClientVisitDate_ddlMonth"), //selectbox
        year: By.id("MainContent_dtClientVisitDate_txtYear")
    };


    hcn = {
        notAvailable: By.id("MainContent_chkHCNAvailable"), //checkbox
        hcnNo: By.id("MainContent_txtHealthCardNo"),
        province: By.id("MainContent_ddlHCNProvince") //selectbox
    
    }

    responsibilityForPayment: By = By.id("MainContent_txtResponsibilityForPayment");

    name = {
        lastname: By.id("MainContent_txtLastName"),
        firstname: By.id("MainContent_txtFirstName")
    }

    bod = {
        day: By.id("MainContent_dtDOB_txtDay"),
        month: By.id("MainContent_dtDOB_ddlMonth"),
        year: By.id("MainContent_dtDOB_txtYear")
    };
            
    gender: By = By.id("MainContent_ddlGender"); //selectbox
    
    race: By = By.id("MainContent_ddlRace");//selectbox
    
    address = {
        street: By.id("MainContent_tbStreetAddress1"),
        province: By.id("MainContent_ddlProvince"),//selectbox
        postalcode: By.id("MainContent_txtPostalCode")

    }

    submitBtn: By = By.id("MainContent_btnFinish");//button

    matchContinueBtnId = "MainContent_PatientMatch_btnContinue";
    confirmRegBtnId = "MainContent_lblPatientIDTop";
    
    patientId = "MainContent_lblPatientIDTop";

    async register(reg: Registration) {
        this.setLocationOfHospital(this.owner, reg);
        this.setDate(this.date, reg.bod);
        this.setName(this.name, reg);
        this.setAddress(this.address, reg);
        this.setPayment(this.responsibilityForPayment, reg.responsibilityForPayment);
        this.setGender(this.gender, reg.gender);
        this.setRace(this.gender, reg.race);
        this.setHcn(this.hcn, reg);
        await this.click(this.submitBtn);

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
    }
}