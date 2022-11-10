/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import "../../../../../support/commands";
import "../../../../../support/comissioncommands";

import commisionDisbursment from '../../../../../support/pageObjects/CommisionDisbursment/commisionDisbursment';

//----------------Object Declaration----------------------------------------------------------

const commisionDisbursmentPage = new commisionDisbursment()
const cdCSVFile = 'templates/CommissionDisbursement.csv'

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('CommisionDisbursment').then(function (data6) {
    this.data6 = data6;
  })
});

//----------------Test Scripts---------------------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})

//----------TC_154------------Commision disbursment-----To verify that system admin should able to disburse commisson to channel users-----------------

When('Commission Disbursement Process and Commission Disbursement', function () {
  commisionDisbursmentPage.getCommisionDisbursmentProcess().scrollIntoView()
  commisionDisbursmentPage.getCommisionDisbursmentProcess().click()
  commisionDisbursmentPage.getCommisionDisbursment().click()

})

And('Commision disbursment Select MFS provider and enter Mobile number', function () {
  cy.wait(3000)
  commisionDisbursmentPage.getCDMFSProviders().select(this.data6.Provider, { force: true })
  cy.wait(3000)
  commisionDisbursmentPage.getDomain().select(this.data6.domain, { force: true })
  cy.wait(3000)
  commisionDisbursmentPage.getCategory().select(this.data6.category, { force: true })
  commisionDisbursmentPage.getCDButtonSubmit().click({ force: true })
})
And('Commision disbursment Download the .csv file', function () {
  cy.wait(3000)
  commisionDisbursmentPage.getCDCheckBox().check()
  commisionDisbursmentPage.getCDDownloadCSVButton().click({ force: true })
})

Then('Commision disbursment upload the downloaded file on bulk payout tool to initiate commision disbursement', function () {
  cy.wait(3000)
  commisionDisbursmentPage.getBulkPayoutTool().scrollIntoView()
  commisionDisbursmentPage.getBulkPayoutTool().click()
  commisionDisbursmentPage.getBulkPayoutInitiate().click()
  cy.wait(10000)
  commisionDisbursmentPage.getFileUpload().attachFile(cdCSVFile)
  commisionDisbursmentPage.getFileUploadSubmitButton().click({ force: true })
  cy.wait(5000)
  commisionDisbursmentPage.getUploadCSVAlertSuccess().should('contain.text', this.data6.alertmessage)

})