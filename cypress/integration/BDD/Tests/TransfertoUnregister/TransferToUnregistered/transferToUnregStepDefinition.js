/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import "../../../../../support/commands";
import transferToUnregistred from '../../../../../support/pageObjects/TransferToUnregistered/transferToUnregistred';



//----------------Object Declaration----------------------------------------------------------

const transferToUnregistredPage = new transferToUnregistred()

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
 
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('transferedToUnregistered').then(function (data7) {
    this.data7 = data7;
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

//----------TC_153------------Transfer to Unregistered------To verify that system admin should able to do enquiry of transaction 
//for un registred subscibers Subscribers who doesn't exists in system-----------------

When('Click on Transfer to Unregistered Users', function () {
  transferToUnregistredPage.getTransferToUnregistred().scrollIntoView()
  transferToUnregistredPage.getTransferToUnregistred().click()
})

And('Transfer to Unregistered Select the service type', function () {
  cy.wait(3000)
  transferToUnregistredPage.getTransferToUnregistredServiceType().click()
  cy.intercept(this.data20.TransferToUnreg).as('ttusubmit')
  transferToUnregistredPage.getTransferToUnregistredSubmit().click({ force: true })
  cy.wait('@ttusubmit')
})
And('Transfer to Unregistered Enter subscriber Mobile number or transaction ID', function () {
  
  transferToUnregistredPage.getTransferToUnregisteredMSISDN().type(this.data7.msisdn.transfertoungegmsisdn, { force: true })
})

Then('Transfer to Unregistered Click on submit', function () {
  cy.intercept(this.data20.TransferToUnSubUp).as('ttusubmit1')
  transferToUnregistredPage.getTransferToUnregistredSubmitUpdate().click({ force: true })
  cy.wait('@ttusubmit1')
  transferToUnregistredPage.getAssertMessage().should('contains.text', this.data7.errorMessage +' "P2P Unregistered"')
})
