/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import CircularJSON from 'circular-json';
import Flatted from 'flatted';


import "../../../../support/commands";
import transferToUnregistred from '../../../../support/pageObjects/TransferToUnregistered/transferToUnregistred';
import { should } from 'chai';



//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const transferToUnregistredPage = new transferToUnregistred()
const welcomePage = new homePage()

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })

  cy.fixture('transferedToUnregistered').then(function (data7) {
    this.data7 = data7;
  })
    if ( Cypress.browser.isHeadless ) {
    cy.clearCookie('shouldStop')
  } else {
    cy.getCookie('shouldStop').then(cookie => {
      if (
        cookie &&
        typeof cookie === 'object' &&
        cookie.value === 'true'
      ) {
        Cypress.runner.stop();
      }
    })
  }
});

//----------------Test Scripts---------------------------------------------------------------

//----------------Launch Mobiquity Portal URL and Login--------------------------------------



//-------TC112---To verify that master/network Admin can add security questions in the mobiquity System--------------

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
})
