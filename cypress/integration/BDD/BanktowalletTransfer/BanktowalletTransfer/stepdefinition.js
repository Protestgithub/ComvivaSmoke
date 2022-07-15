/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import OrderDetailsCreations from '../../../../../support/pageObjects/OrderDetailsCreation/OrderDetailsCreations';

import "../../../../../support/commands";




//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const orderDetailsCreationPage = new OrderDetailsCreations()

var bamount
const uid = () => Cypress._.random(1e3)
bamount = uid()

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
    cy.fixture('login').then(function (data1) {
        this.data1 = data1;
    })
    cy.fixture('OrderDetailsCreation').then(function (data2) {
        this.data2 = data2;
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
//----------------Test Scripts---------------------------------------------------------------------------

//---------------------------------Kalyani_BA Login-------------------------------------------------------

Given('Login into Mobiquity Portal as Business admin User1', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.visit(Cypress.env("Adminurl") + "/Business/")
    cy.wait(3000)
    cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data)=>{
    var loginId
    loginId = data.LoginId
    cy.login(loginId, this.data1.businessAdmin.DefaultPassword)
    cy.login1(this.data1.businessAdmin.businessadminPwd1)
    cy.wait(2000)
    cy.Passwordchange(this.data1.UserCreationSuccessMessage)
    pageLogin.getloginbtn1().click({force:true})
    cy.login(loginId, this.data1.businessAdmin.businessadminPwd1)
        
    })
    cy.checkWelcomeText(this.data1.BAAdminText)

})



When('Navigate to Transfer to Bank', function () {
    cy.wait(3000)
    orderDetailsCreationPage.getBankServices().scrollIntoView()
    orderDetailsCreationPage.getBankServices().click({ force: true })
    orderDetailsCreationPage.getTransferToBank().click({ force: true })

})

And('Enter all the information', function () {
  //  pageLogin.getiFrame()
  cy.wait(3000)
    orderDetailsCreationPage.getCurrency().select(this.data2.Currency.value, { force: true })
    orderDetailsCreationPage.getWalletType().select(this.data2.wallettype.value, { force: true })
    cy.wait(3000)
    orderDetailsCreationPage.getAmount().type(bamount, { force: true })
    cy.wait(3000)
    orderDetailsCreationPage.getBankAccountNumber().select(0, { force: true })

})

Then('Click on Transfer Button', function () {
    cy.wait(3000)
    orderDetailsCreationPage.getTransferButtonSubmit({ force: true })
})



