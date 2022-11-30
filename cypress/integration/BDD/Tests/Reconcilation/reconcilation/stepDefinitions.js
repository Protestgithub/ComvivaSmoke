/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import Reconcilation from '../../../../../support/pageObjects/Reconcilation/Reconcilation';

//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const ReconPage = new Reconcilation()

Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;

  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
  })
});


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

Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})
And('Click on Reconcilation', function () {
  welcomePage.getreconcilationpage().click({ force: true })
  cy.wait(4000)
  ReconPage.getcolumn().within(function () {
    cy.getprovider()
  })
  cy.intercept(this.data20.submit).as('getsubmit')
  ReconPage.getsubmit().click({ force: true })
  cy.wait('@getsubmit')
  pageLogin.getiFrame()
  ReconPage.getmismatch().within(function () {
    ReconPage.getmismatchvalue().should("contain", "No Mismatch found")
  })

})

