/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import CircularJSON from 'circular-json';



import "../../../../../support/commands";
import transferToUnregistred from '../../../../../support/pageObjects/TransferToUnregistered/transferToUnregistred';




//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const transferToUnregistredPage = new transferToUnregistred()
const welcomePage = new homePage()

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('transferedToUnregistered').then(function (data7) {
    this.data7 = data7;
  })

});

//----------------Test Scripts---------------------------------------------------------------

//----------------Launch Mobiquity Portal URL and Login--------------------------------------



//-------TC112---To verify that master/network Admin can add security questions in the mobiquity System--------------

//---------------------------------------------System Admin Login----------------------------------------------------
//----------TC_153------------Transfer to Unregistered------To verify that system admin should able to do enquiry of transaction 
//for un registred subscibers Subscribers who doesn't exists in system-----------------

When('Click on Transfer to Unregistered Users', function () {
  transferToUnregistredPage.getTransferToUnregistred().scrollIntoView()
  transferToUnregistredPage.getTransferToUnregistred().click()


})

And('Transfer to Unregistered Select the service type', function () {
  cy.wait(3000)
  transferToUnregistredPage.getTransferToUnregistredServiceType().click()
  transferToUnregistredPage.getTransferToUnregistredSubmit().click({ force: true })

})
And('Transfer to Unregistered Enter subscriber Mobile number or transaction ID', function () {
  cy.wait(3000)
  transferToUnregistredPage.getTransferToUnregisteredMSISDN().type(this.data7.msisdn.transfertoungegmsisdn, { force: true })
})

Then('Transfer to Unregistered Click on submit', function () {
  cy.wait(3000)
  transferToUnregistredPage.getTransferToUnregistredSubmitUpdate().click({ force: true })
  transferToUnregistredPage.getAssertMessage().should('contain.text', this.data7.errorMessage)
})
