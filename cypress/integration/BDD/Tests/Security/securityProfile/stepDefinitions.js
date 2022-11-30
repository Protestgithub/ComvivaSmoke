/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';

import "../../../../../support/securityCommands";
import "../../../../../support/commands";
import SecurityProfilePage from '../../../../../support/pageObjects/SecurityProfile/SecurityProfilePage';
import register from '../../../../../support/pageObjects/UserManagement/register';
import { recurse } from 'cypress-recurse';

//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const securityProfilePage = new SecurityProfilePage()
const registerPage = new register()

var SubProfileName = 'cypress/fixtures/profileData/securityProfile.json'
var profName

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('SecurityProfile').then(function (data6) {
    this.data6 = data6;
  })

});




//----------------------------------------POC - CODE-------------------------------------------------------
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

//------------TC_109--------------------------Security Profile------------------------------------------------
//----------------------------------------Subscriber----------------------------------------------------

When('Navigate to Security and click to select security profile', function () {
  welcomePage.getSecurityLink().scrollIntoView()
  welcomePage.getSecurityLink().click({ force: true })
  welcomePage.getSecurityProfileLink().click({ force: true })
  securityProfilePage.getSecurityProfilePageTitle().should('have.text', this.data6.securityProfilePageTitle)
})



//------------TC_110--------------------default security profile------------------------------------------------

And('Filter by slecting Default', function () {
  pageLogin.getiFrame()
  securityProfilePage.getFilter().click({ force: true })
  securityProfilePage.getDefaultCheckBox().click()
  securityProfilePage.getApplyFilter().scrollIntoView()
  securityProfilePage.getApplyFilter().click()
  securityProfilePage.getShowDropDown().click({ force: true })
  securityProfilePage.getSelectFromDropDown().click({ force: true })

})

Then('Assert each workspace have one default Profile', function () {
  if (securityProfilePage.getCategory().contains(' System Admin ')) {
    securityProfilePage.getCreatedBy().eq(0).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Business Admin ')) {
    securityProfilePage.getCreatedBy().eq(1).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Customer care Admin ')) {
    securityProfilePage.getCreatedBy().eq(2).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' AtmMachine ')) {
    securityProfilePage.getCreatedBy().eq(3).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Merchant ')) {
    securityProfilePage.getCreatedBy().eq(4).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Agent ')) {
    securityProfilePage.getCreatedBy().eq(5).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Distributer ')) {
    securityProfilePage.getCreatedBy().eq(6).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Head Merchant ')) {
    securityProfilePage.getCreatedBy().eq(7).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Super Agent ')) {
    securityProfilePage.getCreatedBy().eq(8).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Biller ')) {
    securityProfilePage.getCreatedBy().eq(9).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Telco Operator ')) {
    securityProfilePage.getCreatedBy().eq(10).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Payment Gateway ')) {
    securityProfilePage.getCreatedBy().eq(11).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Corporate ')) {
    securityProfilePage.getCreatedBy().eq(12).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Subscriber ')) {
    securityProfilePage.getCreatedBy().eq(13).should('have.text', ' system ')
  }
})

//-------------TC_111-------------------SecurityProfileExist----------------------------------------------------
When('Navigate to User Management and Click on register', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})

And('Select User type as Subscriber and click on Subscriber', function () {
  pageLogin.getiFrame()
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType, { force: true }).click({ force: true })
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).focused()
  registerPage.getUserRole().contains(this.data2.subPersonalInfo.subUserRole).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
  registerPage.getNextButtonBasic().click({ force: true })
  registerPage.getNextButtonBasic1().click({ force: true })
})

Then('Verify User registration have security profile', function () {
  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true }).should("contain.text", "subscriberSecurityProfile")
})

