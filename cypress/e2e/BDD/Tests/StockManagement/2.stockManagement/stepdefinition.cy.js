/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/StockCommands";
import stockInitiation from '../../../../../support/pageObjects/StockManagement/stockInitiation';
import stockManagement from '../../../../../support/pageObjects/StockManagement/stockManagement';


//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const stockInitiationPage = new stockInitiation()
const stockManagementPage = new stockManagement()

var mobile
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()

var refno
refno = "12" + uuid()

var amount
const uuuid = () => Cypress._.random(1e3)
amount = uuuid()

var amount1
const uuuuid = () => Cypress._.random(1e4)
amount1 = uuuuid()

const uid = () => Cypress._.random(1e2)
const id = uid()
const testname = `testname${id}`

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;

  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('StockManagement').then(function (data10) {
    this.data10 = data10;
  })
});

//---------------------------------------------System Admin Login----------------------------------------------------

//---------------------------------------TC_75--------------------------------------------------

And('Select any Transaction ID from displayed list', function () {
  cy.wait(3000)
  stockManagementPage.getTrasanctionIDRadioButton().check()
})
Then('Click on View Submit button', function () {
  cy.wait(3000)
  stockManagementPage.getStockEnqRViewButtonSubmit().click({ force: true })
})

//--------------------------------reimbursement----------------------------------------------------------------

