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
  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
  })
});

//----------------Test Scripts---------------------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminChecker1Name
    cy.checkWelcomeText(Name)
  })
})

//----------TC_154------------Commision disbursment-----To verify that system admin should able to disburse commisson to channel users-----------------

When('Commission Disbursement Process and Commission Disbursement', function () {
  commisionDisbursmentPage.getCommisionDisbursmentProcess().scrollIntoView()
  commisionDisbursmentPage.getCommisionDisbursmentProcess().click()
  cy.intercept(this.data20.CommisionDisbursment).as('getcommissionmang')
  commisionDisbursmentPage.getCommisionDisbursment().click()
  cy.wait('@getcommissionmang')
})

And('Commision disbursment Select MFS provider and enter Mobile number', function () {
  commisionDisbursmentPage.getCDMFSProviders().select(this.data6.Provider, { force: true })
  commisionDisbursmentPage.getDomain().select(this.data6.domain, { force: true })
  commisionDisbursmentPage.getCategory().select(this.data6.category, { force: true })
  cy.intercept(this.data20.CDButtonSubmit).as('getcommiciondisb')
  commisionDisbursmentPage.getCDButtonSubmit().click({ force: true })
  cy.wait('@getcommiciondisb')
})
And('Commision disbursment Download the .csv file', function () {
  commisionDisbursmentPage.getCDCheckBox().check()
  commisionDisbursmentPage.getCDDownloadCSVButton().click({ force: true })
})

Then('Commision disbursment upload the downloaded file on bulk payout tool to initiate commision disbursement', function () {
  commisionDisbursmentPage.getBulkPayoutTool().scrollIntoView()
  commisionDisbursmentPage.getBulkPayoutTool().click()
  cy.intercept(this.data20.BulkPayoutInitiate).as('getbulkinitiate')
  commisionDisbursmentPage.getBulkPayoutInitiate().click()
  cy.wait('@getbulkinitiate', { timeout: 10000 })
  commisionDisbursmentPage.getFileUpload().attachFile(cdCSVFile)
  cy.intercept(this.data20.FileUpload).as('getambiguous')
  commisionDisbursmentPage.getFileUploadSubmitButton().click({ force: true })
  cy.wait('@getambiguous')
  commisionDisbursmentPage.getUploadCSVAlertSuccess().should('contain.text', this.data6.alertmessage)
})