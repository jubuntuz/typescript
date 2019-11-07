import { Builder, By, until } from 'selenium-webdriver';
import { Page, findBy } from './../lib/page';
import { demographicBy, paymentBy, visitBy } from './orrsInterface';
import { orrsBasicRegistration } from "../models/orrsBasicRegistration";

export interface orrsBasicRegistrationForm {
    demoLocator: demographicBy
    visitLocator: visitBy
    paymentLocator: paymentBy
}

export class orrsBasicRegistrationPage extends Page {
    form = {
        visitLocator: {
            hospitalSel: By.id("MainContent_ddlHospital"),
            locationSel: By.id("MainContent_ddlLocation"),
            date: {
                dayTxt: By.id("MainContent_dtClientVisitDate_txtDay"),
                monthSel: By.id("MainContent_dtClientVisitDate_ddlMonth"),
                yearTxt: By.id("MainContent_dtClientVisitDate_txtYear")
            }
        },

        paymentLocator: {
            notAvailableChk: By.id("MainContent_chkHCNAvailable"),
            hcnNoTxt: By.id("MainContent_txtHealthCardNo"),
            provinceSel: By.id("MainContent_ddlHCNProvince"),
            responsibilityForPaymentTxt: By.id("MainContent_txtResponsibilityForPayment")
        },

        demoLocator: {
            name: {
                lastnameTxt: By.id("MainContent_txtLastName"),
                firstnameTxt: By.id("MainContent_txtFirstName")
            },
            bod: {
                dayTxt: By.id("MainContent_dtDOB_txtDay"),
                monthSel: By.id("MainContent_dtDOB_ddlMonth"),
                yearTxt: By.id("MainContent_dtDOB_txtYear")
            },
            genderSel: By.id("MainContent_ddlGender"),
            raceSel: By.id("MainContent_ddlRace"),
            address: {
                streetTxt: By.id("MainContent_tbStreetAddress1"),
                provinceSel: By.id("MainContent_ddlProvince"),
                postalcodeTxt: By.id("MainContent_txtPostalCode")
            }
        },
        submitBtn: By.id("MainContent_btnFinish")
    }

    submitBtn = By.id("MainContent_btnFinish")

    async fillForm(pageObj: orrsBasicRegistrationForm, regModel: orrsBasicRegistration) {
        await this.setVisit(pageObj.visitLocator, regModel.visit);
        await this.setDemography(pageObj.demoLocator, regModel.demographic);
        await this.setPayment(pageObj.paymentLocator, regModel.payment); //will refresh part of the form*/
    }

    async register(registerObj: orrsBasicRegistration) {
        await this.ready();
        await this.fillForm(this.form, registerObj);
        await this.sleep(1);
        await this.click(this.submitBtn);
        if (await this.find(By.id("MainContent_PatientMatch_btnContinue")) !== undefined) {//warning div
            await this.click(By.id("MainContent_PatientMatch_btnContinue"));
        }
        await this.sleep(1);
        //confirm registration div
        await this.click(By.id('MainContent_confirm_btnYes'));
        return await this.text(By.id("MainContent_lblPatientIDTop"));
    }

    async  launch(registrationType: string) {
        await this.sleep(1);
        await this.click(By.linkText("Registration"));
        // await this.jcssClick("#pnlMenu ul li[3]")
        switch (registrationType) {
            case "Pregnancy":
                //await this.jClick("MainContent_btRegisterPregnancy");
                await this.click(By.id("MainContent_btRegisterPregnancy"));
                break;
            case "Glomerulonephritis":
                await this.click(By.id("MainContent_btRegisterGlomerulonephrtis"));
                break;
        }
    }
}