/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';

import "../../../../support/commands";
import "../../../../support/comissioncommands";

import commisionDisbursment from '../../../../support/pageObjects/CommisionDisbursment/commisionDisbursment';




//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const commisionDisbursmentPage = new commisionDisbursment()


const cdCSVFile = 'bulk-upload-BA220510.csv'

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })

  cy.fixture('CommisionDisbursment').then(function (data6) {
    this.data6 = data6;
  })


});

//----------------Test Scripts---------------------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Maker after Logout', function () {
  cy.loginAgain(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
  cy.loginAgain(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)

})
Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})

//----------------Launch Mobiquity Portal URL and Login--------------------------------------



//-------TC112---To verify that master/network Admin can add security questions in the mobiquity System--------------



//----------TC_154------------Commision disbursment-----To verify that system admin should able to disburse commisson to channel users-----------------

When('Commission Disbursement Process and Commission Disbursement', function () {
  commisionDisbursmentPage.getCommisionDisbursmentProcess().scrollIntoView()
  commisionDisbursmentPage.getCommisionDisbursmentProcess().click()
  commisionDisbursmentPage.getCommisionDisbursment().click()

})

And('Commision disbursment Select MFS provider and enter Mobile number', function () {
  cy.wait(3000)
   commisionDisbursmentPage.getCDMFSProviders().select(this.data6.Provider, { force: true })
  //cy.cdmfsProvider()
  //commisionDisbursmentPage.getCDMSISDN().select(this.data6.Provider, { force: true })
  commisionDisbursmentPage.getCDMSISDN().type(this.data6.msisdn.comissiondismsisdn, { force: true })
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

  // cy.wait(3000)
  // commisionDisbursmentPage.getUploadCSVAlertSuccess().should('contain.text', this.data6.alertmessage)


})