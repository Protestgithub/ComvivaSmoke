/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import OrderDetailsCreation from '../../../../../support/pageObjects/OrderDetailsCreation/OrderDetailsCreation';
import "../../../../../support/commands";


import O2CTransferInitiate from '../../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';
import TransferRulePage from '../../../../../support/pageObjects/TransferRules/TransferRulePage';
import Approval from '../../../../../support/pageObjects/TransferRules/Approval';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';


//----------------Object Declaration-----------------------------------------------------------------

const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()

const O2CTransferInitiatePage = new O2CTransferInitiate()
const transferruleapprovalpage = new Approval()
const TransferRuleApproval = new Approval()
const uuid = () => Cypress._.random(1e5)
var TransferAmount = uuid()
var ReferenceNumber = uuid()
var number = uuid()

const pageLogin = new loginPage()
const welcomePage = new homePage()
const orderDetailsCreationPage = new OrderDetailsCreation()
const transferrulepage = new TransferRulePage()


var BankData = 'cypress/fixtures/userData/BankData.json'
var accNum

var currency
var wallet
var bamount
const uid = () => Cypress._.random(1e3)
bamount = uid()
var name

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('OrderDetailsCreation').then(function (data2) {
    this.data2 = data2;
  })

});
//----------------Test Scripts---------------------------------------------------------------------------

Given('Login into Mobiquity Portal as Business admin User1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
  cy.wait(3000)
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
    var loginId
    loginId = data.LoginId
    cy.login(loginId, this.data1.businessAdmin.DefaultPassword)
    cy.login1(this.data1.businessAdmin.businessadminPwd1)
    cy.wait(2000)
    cy.Passwordchange(this.data1.UserCreationSuccessMessage)
    pageLogin.getloginbtn1().click({ force: true })
    cy.wait(10000)
    cy.login(loginId, this.data1.businessAdmin.businessadminPwd1)

  })
  cy.checkWelcomeText(this.data1.BAAdminText)

})



//----------------------------------Transfer to Bank--------------------------
When('Navigate to Transfer to Bank', function () {
  cy.wait(3000)
  orderDetailsCreationPage.getBankServices().scrollIntoView()
  orderDetailsCreationPage.getBankServices().click({ force: true })
  orderDetailsCreationPage.getTransferToBank().click({ force: true })

})

And('Enter all the information', function () {
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
  orderDetailsCreationPage.getAssertMessage().should('contain.text', this.data2.errorMessage)
})