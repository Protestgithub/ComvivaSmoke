/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import ChurnManagement from '../../../../../support/pageObjects/ChurnManagement/ChurnManagement';
import "../../../../../support/subscriberCommands";
import "../../../../../support/commands";
import "../../../../../support/comissioncommands";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import { recurse } from 'cypress-recurse';
import "../../../../../support/ChurnCommands";


//----------------Object Declaration-----------------------------------------------------------

const pageLogin = new loginPage()
const churnManagementPage = new ChurnManagement()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()


const churnSubRegistration = 'cypress/fixtures/userData/churnSubscriberReg.json'
var mobile
var CIF
var name
var RegulatoryMarketingProfile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
var loginId
var KycValue
var CsvFile = 'cypress/fixtures/templates/ChurnUserInitiation.csv'
var JSONFile = 'cypress/fixtures/churnData/ChurnUserInitiation.json'


function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}
//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('userData/churnSubscriberReg').then(function (data8) {
    this.data8 = data8;
  })
  cy.fixture('ChurnManagement').then(function (data3) {
    this.data3 = data3;
  })
  cy.fixture('userData/Regulatory&MarketingProfile').then(function (data4) {
    this.data4 = data4;
  })
 
});

//---------------------------------------------System Admin Login----------------------------------------------------
//----------------Navigate to User Management tab and Click on Register---------------------------------

//--------TC_105---------Churn Bulk Upload---------------------------------------------------------------------

And('update the json data for bulkupload', function () {
  cy.readFile(JSONFile).then((data) => {
    data['MSISDN*'] = this.data8.churnSubscriberRegistrationBulkUpload 
    data['CHURN_SUBSCRIBER*'] = 'Y'
    data['CHURN_CHANNEL_USER*'] = 'N'
    // data['MSISDN*'] = this.data8.churnSubscriberRegistration 
    // data['CHURN_SUBSCRIBER*'] = 'Y'
    // data['CHURN_CHANNEL_USER*'] = 'N'
    cy.writeFile(JSONFile, data)
  })
})


And('Upload Bulk csv file with valid details', function () {
  cy.wait(2000)
  churnManagementPage.getChurnInitiationUpload().attachFile('templates/ChurnUserInitiation.csv')
  cy.wait(3000)
  churnManagementPage.getChurnInitiationUploadSubmit().click({ force: true })
  cy.wait(3000)
  churnManagementPage.getChurnInitiationMessage().should('have.text', 'Churn initiation is completed')

})

//---TC_107---Churn Management---To verify that the System admin can approve the initiated churn process as Batch Reject-----------------

Then('Select the initiated churn request and click on Batch Reject', function () {
  cy.wait(3000)
  churnManagementPage.getLastRadioButton().click({ force: true })
  churnManagementPage.getCBatchReject().click({ force: true })
  cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
    const $body = $iframe.contents().find('body')
    const $win = $iframe[0].contentWindow
    cy.stub($win, 'confirm', () => true)
      .as('windowConfirm')
    cy.stub($win.console, 'log').as('consoleLog')
    cy.wrap($body)
    churnManagementPage.getChurnApprovalSubmitButton().click({ force: true }).should(function () {
        expect(this.windowConfirm).to.be.calledWith('Are you sure you want to Reject?')
        //expect(this.consoleLog).to.be.calledWith('CONFIRMED')  // passes
      })

  })
  cy.wait(3000)
  churnManagementPage.getChurnInitiationMessage().should('contain.text', this.data3.rejectmessage)
  //cy.on('window:confirm', () => true)
})
//---TC_108---Churn Management---To verify that the System admin can approve the initiated churn process as Approve/Reject by Selection-----------------

And('update the json data for Approve and Reject', function () {
  cy.readFile(JSONFile).then((data) => {
    data['MSISDN*'] = this.data8.churnSubscriberRegistrationChurnAprRej 
    data['CHURN_SUBSCRIBER*'] = 'Y'
    data['CHURN_CHANNEL_USER*'] = 'N'
    cy.writeFile(JSONFile, data)
  })
})

Then('Select the initiated churn request and click on Approve and Reject by Selection', function () {
  cy.wait(3000)
  churnManagementPage.getLastRadioButton().click({ force: true })
  churnManagementPage.getCBatchApproveRejectBySelection().click({ force: true })
  churnManagementPage.getChurnApprovalSubmitButton().click({ force: true })
  cy.wait(3000)
  churnManagementPage.getCheckAll().click({ force: true })
  cy.wait(3000)
  cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
    const $body = $iframe.contents().find('body')
    const $win = $iframe[0].contentWindow
    cy.stub($win, 'confirm', () => true)
      .as('windowConfirm')
    cy.stub($win.console, 'log').as('consoleLog')
    cy.wrap($body)
    churnManagementPage.getApprove().click({ force: true })
    // .should(function () {
    //  expect(this.windowConfirm).to.be.calledWith('Are you sure you want to Reject?')
    //     //expect(this.consoleLog).to.be.calledWith('CONFIRMED')  // passes
    //   })

  })

//  churnManagementPage.getChurnInitiationMessage1().should('contain.text', this.data3.approvalmessage)
  // cy.on('window:confirm', () => true)
})

