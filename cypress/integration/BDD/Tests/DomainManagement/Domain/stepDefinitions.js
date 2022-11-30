/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';

import "../../../../../support/commands";
import DomainFieldspage from '../../../../../support/pageObjects/DomainManagement/DomainFieldspage';

const domainPage = new DomainFieldspage()
const welcomePage = new homePage()
var DataFile = "cypress/fixtures/userData/Domain&CAT.json"

Before(() => {
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('Domain&CategoryManagement').then(function (data4) {
    this.data4 = data4;
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
//-------------------------------------------------------------------------------------------------------

When('User Click on Domain Management >> Add Domain', function () {
  welcomePage.getDomainManagementOption().click()
})
And('Enter Domain Name and Domain code.', function () {
  cy.wait(3000)
  cy.readFile(DataFile).then((data) => {
    var CatNam = data.Domainname
    domainPage.getDomainName().type(CatNam, { force: true })
  })
  cy.readFile(DataFile).then((data) => {
    var Catcode = data.DomainCode
    domainPage.getDomainCode().type(Catcode, { force: true })
  })
  cy.readFile(DataFile).then((data) => {
    var Category = data.CategoryNum
    domainPage.getDomainCategories().type(Category, { force: true })
  })
})
//-------------------------------------Error-------------------------------------------

Then('Click on submit buttonn', function () {
  cy.intercept(this.data20.DomainSubmitbtn).as('getdomainsubmit')
  domainPage.getDomainSubmitbtn().click({ force: true })
  cy.wait('@getdomainsubmit')
  domainPage.getErrormsg().should('have.text', this.data4.Errormsg)
})
