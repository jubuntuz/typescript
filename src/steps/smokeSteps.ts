import { TableDefinition, Given, When, Then, setDefaultTimeout } from 'cucumber';
var expect = require("chai").expect;
import { browser } from '../lib/browser';
import { user, Registration } from '../models';
import { loginPage, registrationPage, censusPage } from './../pages';

let page = require("../pages").page;
let patientId!: string;

setDefaultTimeout(500 * 1000);

Given('I launch ORRS as a user:', async (dataTable: TableDefinition) => {
    Object.assign(user, dataTable.hashes()[0]);
    await new browser().tearup();
    await new loginPage().login();
});

When('I register a Pregnancy patient at {string}, {string}', async (hospital: string, location: string, dataTable: TableDefinition) => {
    page = await new registrationPage().launch("Pregnancy");
    let reg = new Registration().basic(dataTable.hashes()[0]);
    reg.location = location;
    reg.hospital = hospital;
    patientId = await page.register(reg);
    console.log(`patientId: ${patientId}`);
    console.log(patientId);
});

Then('I should see patientId in the page', function () {
    console.log(`patientId: ${patientId}`);
    expect(patientId).to.not.null;
});

Given('I have a patient in manage Census page at {string}', async (location: string) => {
    page = await new censusPage();
    await page.launch(location, "Manage Census");
});

When('I add {string} treatment', async (treatment: string) =>
    await page.addTreatment(treatment)
    
);

Then('I should not see any of {string} in Modality dropdown list', async (invalidModality: string) => {
    var invalid = invalidModality.split(',');
    //get modalities from dropdown list
    var modalities = await page.getModalityOptions();
    console.log(`dropdown list: ${modalities}`);
    invalid.forEach(async (mod) =>
        await expect(modalities).to.not.include(mod.trim()));
});

Then('I should see an error {string} while input any of {string} in Modality code', async (error: string, invalid: string) => {
    let invalids = invalid.split(',');
    //let errors = await Promise.all(invalids.map(async (mod) => await page.modality(mod)));
    let err = await page.setModality(invalids[0]);
    console.log(err);
    await expect(err).to.be.equal(error);
}); 
