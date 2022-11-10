/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/bankingActivationCommands";
import BankingActivation from '../../../../../support/pageObjects/BankingActivation';
import "../../../../../support/commands";
import loginPage from "../../../../../support/pageObjects/loginPage"

//----------------Object Declaration----------------------------------------------------------
const welcomePage = new homePage()
const bankingActivationPage = new BankingActivation()
const pageLogin = new loginPage()
//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('userData/subscriberReg').then(function (data6) {
    this.data6 = data6;
  })
});
//----------------------------------------POC - CODE-------------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})
//--------------------------------Banking Channel Activation-------------------------------------------
//------------TC_155-------------------------------------------------------------------------------------

When('Navigate to Banking Channel Activation and click', function () {

  cy.intercept('/assistedactivationui/').as('getBankingActivationPage')
   welcomePage.getBankingChannelActivation().click({ force: true })
  cy.wait('@getBankingActivationPage')
      cy.frameLoaded(pageLogin.getiFrame())
 
})

And('Enter the CIF number and search for the user', function () {
 
  bankingActivationPage.getEnterCIFNumber().type(this.data6.CIFnumberBanking, { force: true })
  cy.wait(2000)
  bankingActivationPage.getSearchButton().click()
})
And('Click on Mobile Banking Activation', function () {
  cy.wait(2000)
  bankingActivationPage.getMobileBankingButton().click({ force: true })
})
Then('Confirm and Verify the Mob Banking Activtion Message sent to user', function () {
  cy.wait(2000)
  cy.getMobBankingActivationMessage(Cypress.env('Adminurl'))

})
//----------TC_156--------------------------------------------------------------------------------------

And('Click on Internet Banking Activation', function () {
  cy.wait(2000)
  bankingActivationPage.getInternetBankingButton().click({ force: true })

})

Then('Confirm and Verify the Internet Banking Activtion Message sent to user', function () {
  cy.wait(2000)
  cy.getInternetBankingActivationMessage(Cypress.env('Adminurl'))

})
//-----------TC_157--------------------------------------------------------------------------------------

And('Enter the Activated CIF number and search for the user', function () {

  bankingActivationPage.getEnterCIFNumber().type(this.data6.CIFnumberBanking, { force: true })
  bankingActivationPage.getSearchButton().click({ force: true })
})

Then('verify admin is able to see the Activated Message', function () {
  cy.wait(3000)
  bankingActivationPage.getMobActivatedMsg().eq(0).should('include.text', ' Mobile Banking Activated ')
  cy.wait(3000)
  bankingActivationPage.getInternetActivatedMsg().should('include.text', ' Internet Banking Activated ')

})

