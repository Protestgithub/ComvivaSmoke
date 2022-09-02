/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';

import "../../../../../support/commands";
import DomainFieldspage from '../../../../../support/pageObjects/DomainManagement/DomainFieldspage';

const domainPage = new DomainFieldspage()
const welcomePage = new homePage()
var DataFile = "cypress/fixtures/userData/Domain&CAT.json"

Before(() => {

  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })

  cy.fixture('Domain&CategoryManagement').then(function (data4) {
    this.data4 = data4;
  })

});

//---------------------------------------------System Admin Login----------------------------------------------------
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
  domainPage.getDomainSubmitbtn().click({ force: true })
  cy.wait(2000)
  // domainPage.getSUbMIT2().click({force:true})
  cy.wait(2000)
  domainPage.getErrormsg().should('have.text', this.data4.Errormsg)
})
