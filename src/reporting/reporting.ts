var reporter = require('cucumber-html-reporter');
//bootstrap
//hierarchy
//foundation 
//simple
var options = {
    theme: 'bootstrap',
    jsonFile: './reports/json/report.json',
    output: './reports/html/report.html',
    reportSuiteAsScenarios: true,//Reports total number of passed/failed scenarios as HEADER.   //false: features 
    launchReport: true,
    name: 'ORRS',
    brandTitle: 'smoke test',
    storeScreenshots: true,
    noInlineScrrenshots: false,
    metadata: {
        "App Version": "0.3.2",
        "Test Environment": "STAGING",
        "Browser": "Chrome 54.0.2840.98",
        "Platform": "Windows 10",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    }
};

reporter.generate(options);
