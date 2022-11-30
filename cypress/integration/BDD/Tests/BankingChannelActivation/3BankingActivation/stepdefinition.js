/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/bankingActivationCommands";
import BankingActivation from '../../../../../support/pageObjects/BankingActivation';
import "../../../../../support/commands";

//----------------Object Declaration----------------------------------------------------------
const welcomePage = new homePage()
const bankingActivationPage = new BankingActivation()
const timestamp = (new Date).getTime()
let mobtimestamp = timestamp.toString()
let mobtimestamp1 = mobtimestamp.substring(5)
let mobileNumberCIF = "77" + mobtimestamp1
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
  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
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
  cy.intercept(this.data20.BankingChannel).as('getBankingActivationPage')
   welcomePage.getBankingChannelActivation().click({ force: true })
  cy.wait('@getBankingActivationPage')
 
})

//--------TC_158-----------------------------------------------------------------------------------------
And('Enter the Full KYC mobile number and search for the user', function () {
  //cy.wait(2000)
  cy.waitUntil(()=>{

    return cy.iframe().find('div.panel-heading').eq(0).should('be.visible', { force: true })

  })
  bankingActivationPage.getEnterCIFNumber().type(mobileNumberCIF, { force: true })
  //cy.wait(2000)
  bankingActivationPage.getSearchButton().click()
})
And('Click on next and activate mobile Banking', function () {
  bankingActivationPage.getNextBtn().click({ force: true })
  bankingActivationPage.getNextBtn1().click({ force: true })
  cy.OTP1(Cypress.env('apiBaseURL'))
  cy.wait(2000)
  bankingActivationPage.getMobileBankingButton().click({ force: true })
  bankingActivationPage.getConfirmButton().contains('Confirm').click({force:true})

})

//--------TC_159-----------------------------------------------------------------------------------------

And('Click on next and activate internet Banking', function () {
 cy.wait(2000)
bankingActivationPage.getInternetBankingButton().click({ force: true })
 // bankingActivationPage.getConfirmButton().contains('Confirm').click({force:true})

})
//--------TC_160-----------------------------------------------------------------------------------------
And('Enter the mobile or CIF number which is not registered and search for the user', function () {
  //cy.wait(2000)
  cy.waitUntil(()=>{

    return cy.iframe().find('div.panel-heading').eq(0).should('be.visible', { force: true })

  })
  bankingActivationPage.getEnterCIFNumber().type(this.data6.NotRegisteredMSISDN, { force: true })
  //cy.wait(2000)
  bankingActivationPage.getSearchButton().click()
})

Then('verify admin is able to see the Message mobile or CIF number does not exist in the system', function () {
  bankingActivationPage.getInvalidNumber().should('contain.text', ' is valid. ')
})
