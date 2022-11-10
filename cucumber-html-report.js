const cypress = require('cypress');
const report = require('multiple-cucumber-html-reporter');
const timestamp = (new Date).getTime();

report.generate({
    jsonDir: './cypress/cucumber-json',
    reportPath: './reports/cucumber-htmlreport_PLATFORM_JENKINS_BUILD.html',
    displayDuration : true,
    scenarioTimestamp : true,
    launchReport : true,
    metadata:{
        browser: {
            name: 'chrome',
            version: '107'
        },
        device: 'Local test machine',
        platform: {
            name: 'Windows',
            version: '10'
        }
    },
    customData: {
        title: 'UIAutomation Report',
        data: [
            {label: 'Project', value: 'Mobiquity Pay'},
            {label: 'Release', value: 'X.07'},
            {label: 'Cycle', value: '10'}
        ]
    }
});