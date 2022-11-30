/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import OrderDetailsCreation from '../../../../../support/pageObjects/OrderDetailsCreation/OrderDetailsCreation';
import "../../../../../support/commands";
import "../../../../../support/BusinessUserCommands";
//----------------Object Declaration-----------------------------------------------------------------

const orderDetailsCreationPage = new OrderDetailsCreation()
var BankData = 'cypress/fixtures/userData/BusinessUsersDataO2C.json'
var accNum
var bamount
const uid = () => Cypress._.random(1e2)
bamount = uid()



//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('OrderDetailsCreation').then(function (data2) {
    this.data2 = data2;
  })
});



//----------------Business user login---------------------------------------------------------------------------

Given('Login into Mobiquity Portal as Business admin User3', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
  cy.wait(3000)
  cy.readFile('cypress/fixtures/userData/BusinessUsersDataO2C.json').then((data) => {
    var loginId
    loginId = data.LoginId
    cy.wait(2000)
    cy.login(loginId, this.data1.businessAdmin.businessadminPwd1)
  })
  // cy.checkWelcomeText(this.data1.BAAdminText)

})

//----------------------------------Transfer to Bank--------------------------
When('Navigate to Transfer to Bank', function () {
  cy.wait(3000)
  orderDetailsCreationPage.getBankServices().scrollIntoView()
  orderDetailsCreationPage.getBankServices().click({ force: true })
  orderDetailsCreationPage.getTransferToBank().click({ force: true })

})

And('Enter all the information for Bank to Wallet transfer', function () {
  cy.wait(3000)
  orderDetailsCreationPage.getCurrency().select(this.data2.Currency.value, { force: true })
  orderDetailsCreationPage.getWalletType().select(this.data2.wallettype.value, { force: true })
  cy.wait(3000)
  orderDetailsCreationPage.getAmount().type(bamount, { force: true })
  cy.wait(5000)
  cy.readFile(BankData).then((data) => {
    accNum = "128191 - " + data.Accnum
    orderDetailsCreationPage.getBankAccountNumber().select(accNum, { force: true })

  })

})

Then('Click on Transfer Button', function () {
  cy.wait(3000)
  orderDetailsCreationPage.getTransferButtonSubmit().click({ force: true })
  cy.wait(3000)
  orderDetailsCreationPage.getConfirmSubmitButton().click({ force: true })
})
