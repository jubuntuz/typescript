const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: './reports/json/',
    reportPath: './reports/html/',
    metadata: {
        browser: {
            name: 'chrome',
            version: '75'
        },
        device: 'Local test machine',
        platform: {
            name: 'windows',
            version: '10'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            { label: 'Project', value: 'ORRS smoke test' },
            { label: 'Release', value: 'POC' },
            { label: 'Cycle', value: 'Alpha' },
            { label: 'Execution Start Time', value: '' },
            { label: 'Execution End Time', value: '' }
        ]
    }
});
