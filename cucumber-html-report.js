const cypress = require('cypress');
const report = require('multiple-cucumber-html-reporter');
const timestamp = (new Date).getTime();

report.generate({
    jsonDir: './cypress/cucumber-json',
    reportPath: './reports/'+ timestamp +'/cucumber-htmlreport.html',
    displayDuration : true,
    metadata:{
        browser: {
            name: 'chrome',
            version: '102'
        },
        device: 'Local test machine',
        platform: {
            name: 'Windows',
            version: '10'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Custom project'},
            {label: 'Release', value: '1.2.3'},
            {label: 'Cycle', value: 'B11221.34321'},
            {label: 'Execution Start Time'},
            {label: 'Execution End Time'}
        ]
    }
});