import { TableDefinition, Given, When, Then, setDefaultTimeout } from 'cucumber';
//import { expect } from 'chai';
var expect = require("chai").expect;
import { browser } from './../lib/browser';
import { ccoUser, orrsBasicRegistration } from '../models';
import { LoginPage, orrsBasicRegistrationPage, orrsCensusPage } from './../pages';
let page = require("./../pages").page;

setDefaultTimeout(500 * 1000);

Given('I launch ORRS as a user:', async function (dataTable: TableDefinition) {
    // Write code here that turns the phrase above into concrete actions

    let user = new ccoUser();
    if (dataTable !== undefined) {
        Object.assign(user, dataTable.hashes());
    }
    await new browser(/*"internet explorer"*/).launch();
    await new LoginPage().login(user);
});

When('I register a Pregnancy patient at {string}', async function (location: string, dataTable: TableDefinition) {
    // Write code here that turns the phrase above into concrete actions
    page = await new orrsBasicRegistrationPage();
    await page.launch("Pregnancy");
    let registration = await new orrsBasicRegistration(dataTable.hashes());
    registration.visit.location = location;
    await page.register(registration);
});

Then('I should see patientId in the page', function () {
    // Write code here that turns the phrase above into concrete actions
    expect.ok;
});

Given('I have a patient in manage Census page at {string}', async function (location: string) {
    // Write code here that turns the phrase above into concrete actions
    page = await new orrsCensusPage();
    await page.launch(location, "Manage Census");
});

When('I add {string} treatment', async function (treatment: string) {
    // Write code here that turns the phrase above into concrete actions
    await page.addTreatment(treatment);
});

Then('I should not see any of {string} in Modality dropdown list', async function (invalidModality: string) {
    // Write code here that turns the phrase above into concrete actions
    var invalid = invalidModality.split(',');
    console.log("invalid:" + invalid);
    //get modalities from dropdown list
    var modalities = await page.getModalityOptions();
    console.log(`dropdown list: ${modalities}`);
    invalid.forEach(async (mod) =>
        await expect(modalities).to.not.include(mod.trim()));
});

Then('I should see an error {string} while input any of {string} in Modality code', async function (error: string, invalid: string) {
    // Write code here that turns the phrase above into concrete actions
    let invalids = invalid.split(',');
    //let errors = await Promise.all(invalids.map(async (mod) => await page.modality(mod)));
    let err = await page.modality(invalids[0]);
    await expect(err).to.be.equal(error);
}); 
