/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/bankingActivationCommands";
import BankingActivation from '../../../../../support/pageObjects/BankingActivation';
import "../../../../../support/commands";

//----------------Object Declaration----------------------------------------------------------
const welcomePage = new homePage()
const bankingActivationPage = new BankingActivation()
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
//--------------------------------Banking Channel Activation-------------------------------------------
//------------TC_155-------------------------------------------------------------------------------------



//----------TC_156--------------------------------------------------------------------------------------


//-----------TC_157--------------------------------------------------------------------------------------

//--------TC_158-----------------------------------------------------------------------------------------
And('Enter the Full KYC mobile number and search for the user', function () {
  cy.wait(2000)
  bankingActivationPage.getEnterCIFNumber().type(this.data6.subscriberMobile, { force: true })
  cy.wait(2000)
  bankingActivationPage.getSearchButton().click()
})
And('Click on next and activate mobile Banking', function () {
  bankingActivationPage.getNextBtn().click({ force: true })
  bankingActivationPage.getNextBtn1().click({ force: true })
  cy.OTP1(Cypress.env('apiBaseURL'), Cypress.env('apiURL'))
  cy.wait(2000)
  bankingActivationPage.getMobileBankingButton().click({ force: true })
  bankingActivationPage.getConfirmButton().contains('Confirm').click({force:true})

})

//--------TC_159-----------------------------------------------------------------------------------------

And('Click on next and activate internet Banking', function () {
  bankingActivationPage.getNextBtn().click({ force: true })
  bankingActivationPage.getNextBtn1().click({ force: true })
  cy.OTP1(Cypress.env('apiBaseURL'), Cypress.env('apiURL'))
  cy.wait(2000)
  bankingActivationPage.getInternetBankingButton().click({ force: true })
  bankingActivationPage.getConfirmButton().contains('Confirm').click({force:true})

})
//--------TC_160-----------------------------------------------------------------------------------------
And('Enter the mobile or CIF number which is not registered and search for the user', function () {
  cy.wait(2000)
  bankingActivationPage.getEnterCIFNumber().type(this.data6.NotRegisteredMSISDN, { force: true })
  cy.wait(2000)
  bankingActivationPage.getSearchButton().click()
})

Then('verify admin is able to see the Message mobile or CIF number does not exist in the system', function () {
  bankingActivationPage.getInvalidNumber().should('contain.text', ' is invalid. Next ')
})
