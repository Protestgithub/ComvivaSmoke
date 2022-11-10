/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/BusinessUserCommands";
import O2CTransferInitiate from '../../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';
import TransferRulePage from '../../../../../support/pageObjects/TransferRules/TransferRulePage';
import Approval from '../../../../../support/pageObjects/TransferRules/Approval';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import stockInitiation from '../../../../../support/pageObjects/StockManagement/stockInitiation';
//----------------Object Declaration-----------------------------------------------------------------

const manageUsersPage = new manageUsers()
const stockInitiationPage = new stockInitiation()
const pageLogin = new loginPage()
const welcomePage = new homePage()
const O2CTransferInitiatePage = new O2CTransferInitiate()
const transferruleapprovalpage = new Approval()
const TransferRuleApproval = new Approval()
const uuid = () => Cypress._.random(1e8)
const ud = () => Cypress._.random(1e3)
const uuuid = () => Cypress._.random(1e3)
const uuid1 = () => Cypress._.random(1e8)
amount = uuuid()
mobile = "77" + uuid1()
var amount, mobile, name
var filenamestock = 'cypress/fixtures/StockManagement.json'
var TransferAmount = uuid()
var transferAmount = ud()
var ReferenceNumber = uuid()
var number = uuid()
var name, O2CMsisdn
var TransactionFleO2C = "cypress/fixtures/userData/TransactionFile.json"
var filename = "cypress/fixtures/userData/O2CBulkData.json"
var BBAFile = "cypress/fixtures/userData/BusinessUsersDataO2C.json"
var O2CFile = "cypress/fixtures/userData/O2Cdata.json"

//-------------------------------------------------------------------------------
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}
//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('OperatorToChannel').then(function (data5) {
    this.data5 = data5;
  })
  cy.fixture('StockManagement').then(function (data10) {
    this.data10 = data10;
  })
});


//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})

Given('Login into Mobiquity Portal as System admin Checker2', function () {
  cy.wait(2000)
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(4000)
  cy.SysAdminlogin3()
  cy.wait(3000)
})

And('logout the user', function () {
  welcomePage.getProfileIcon().click()
  cy.wait(2000)
  welcomePage.getLogOutbttn().click()
  cy.wait(2000)
  welcomePage.getLogOutYesbttn().click()
})


//------------------------------------TC_186-------------------------------------------------
When('Navigate to Operator to channel and click on O2C transfer initiate', function () {
  welcomePage.getOperatorToChannelOption().scrollIntoView()
  welcomePage.getOperatorToChannelOption().click()
  welcomePage.getO2CTransferInitiateOption().click()

})
And('Click on submit and Confirm', function () {
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(3000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
})

//-------------------------------- Stock management--------------------------------

When('Navigate to Stock Management and Click on Stock initiation', function () {
  cy.wait(3000)
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  welcomePage.getStockInitiationOption().click()
})

And('Select MFS provider and Enter Reference number and Amount', function () {
  cy.wait(5000)
  stockInitiationPage.getProvider().select(this.data10.stockInitiation.provider, { force: true })
  stockInitiationPage.getStockFrom().select(this.data10.stockInitiation.stockFrom, { force: true })
  stockInitiationPage.getReferenceNumber().type(mobile, { force: true })
  stockInitiationPage.getRequestedAmount().type(amount, { force: true })
})
Then('click on Submit and Confirm button', function () {
  cy.wait(5000)
  stockInitiationPage.getSubmitButton().click({ force: true })
  cy.wait(5000)
  stockInitiationPage.getBalance().eq(3).invoke('text').then((text) => {
    text = text.trim()
    cy.readFile(filenamestock).then((data) => {
      data.Balance = text
      cy.writeFile(filenamestock, data)
    })
  })
  cy.wait(5000)
})

Then('Assert Debited Stock', function () {
  stockInitiationPage.getSubmitButton().click({ force: true })
  cy.wait(5000)
  cy.readFile(filenamestock).then((data) => {
    let A = data.CreditedStock
    stockInitiationPage.getBalance().eq(3).contains(A)
  })
})


//------------------------------------- Likith-------------------------------------------------------
When('Navigate to Operator to channel and click on O2C transfer initiate', function () {
  welcomePage.getOperatorToChannelOption().scrollIntoView()
  welcomePage.getOperatorToChannelOption().click()
  welcomePage.getO2CTransferInitiateOption().click()
})

And('Enter All the Mandatory Details', function () {
  cy.wait(2000)
  cy.readFile(BBAFile).then((data) => {
    var O2CMsisdn = data.registeredMobileO2C
    //O2CTransferInitiatePage.getMSISDN().type("7735575036", {force: true})
    O2CTransferInitiatePage.getMSISDN().type(O2CMsisdn, { force: true })
    data.O2CMsisdn1 = O2CMsisdn
    cy.writeFile(O2CFile, data)
  })
  cy.wait(2000)
  cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
    const $body = $iframe.contents().find('body')
    const $win = $iframe[0].contentWindow
    const stub = cy.stub()
    if (cy.stub($win, 'alert', () => false)
      .as('windowConfirm')) {
    }
    else {
      cy.stub($win.console, 'log').as('consoleLog')
      cy.wrap($body)
        .find('input[name="amount"]').click({ force: true })
        .should(function () {
          expect(this.windowConfirm).to.be.calledWith("Channel User Does Not Exist")
        })
    }
  })
  O2CTransferInitiatePage.getTransferAmount().type(transferAmount, { force: true })
  cy.readFile(filenamestock).then((data) => {
    data.Amount = transferAmount
    cy.writeFile(filenamestock, data)
  })
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })
  cy.readFile(filenamestock).then((data) => {
    let x = data.Balance
    let y = data.Amount
    const num1 = x * 1
    const num2 = y * 1
    const sum = num1 - num2
    data.CreditedStock = sum
    cy.log(parseFloat(sum))
    cy.writeFile(filenamestock, data)
  })
})

Then('Click on submit and Confirm', function () {
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(2000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
  cy.O2CTransactionWriteData()
})
//------------------------------------------------------------
When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

And('enter user mobile number and search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  var O2CFile = "cypress/fixtures/userData/O2Cdata.json"
  cy.readFile(O2CFile).then((data) => {
    var O2CMsisdn = data.O2CMsisdn1
    manageUsersPage.getSearchUser().type(O2CMsisdn, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })
})
When('User Click on eye button', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
  cy.wait(3000)
})

And('click wallet Payment history.', function () {
  manageUsersPage.getWalletHistory().contains("Wallet Payment History").click({ force: true })
})
And('Enter TransactionID and check', function () {
  cy.O2CTransactionReadData()
})

And('Enter All the Mandatory Details1', function () {
  cy.wait(3000)
  cy.readFile(BBAFile).then((data) => {
    O2CMsisdn = data.registeredMobileO2C
    O2CTransferInitiatePage.getMSISDN().type(O2CMsisdn, { force: true })
    data.O2CMsisdn1 = O2CMsisdn
    cy.writeFile(O2CFile, data)
  })
  cy.wait(2000)
  cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
    const $body = $iframe.contents().find('body')
    const $win = $iframe[0].contentWindow

    const stub = cy.stub()
    if (cy.stub($win, 'alert', () => false)
      .as('windowConfirm')) {

    }

    else {
      cy.stub($win.console, 'log').as('consoleLog')
      cy.wrap($body)
        .find('input[name="amount"]').click({ force: true })
        .should(function () {
          expect(this.windowConfirm).to.be.calledWith("Channel User Does Not Exist")
        })
    }
  })
  O2CTransferInitiatePage.getTransferAmount().type(TransferAmount, { force: true })
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })
  cy.writeFile(filename, { msidnValue: O2CMsisdn, TransferAmt: TransferAmount, RefNum: ReferenceNumber })
})

Then('Click on submit and Confirm00', function () {
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(4000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
  cy.O2CTransactionWriteData()
  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID = data.TransactionID
    O2CTransferInitiatePage.getSuccessMsg().should('have.text', this.data5.O2CInitiateMsg + TransactionID)
  })
})

Then('Click on submit and Confirm0', function () {
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(3000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
  cy.O2CTransactionWriteData()
  cy.wait(3000)
  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID = data.TransactionID
    O2CTransferInitiatePage.getSuccessMsg().should('have.text', this.data5.O2CInitiateMsg + TransactionID)
  })
})

Then('Click on submit and Confirm1', function () {
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(2000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
  cy.O2CTransactionWriteData1()
  cy.wait(3000)
  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID = data.TransactionID1
    O2CTransferInitiatePage.getSuccessMsg().should('have.text', this.data5.O2CInitiateMsg + TransactionID)
  })

})

Then('Click on submit and Confirm2', function () {
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(2000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
  cy.O2CTransactionWriteData2()
  cy.wait(3000)
  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID = data.TransactionID2
    O2CTransferInitiatePage.getSuccessMsg().should('have.text', this.data5.O2CInitiateMsg + TransactionID)
  })
})

Then('Click on submit and Confirm', function () {
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(2000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
})


When('Navigate to Operator to channel and click on O2C transfer Approval1', function () {
  welcomePage.getOperatorToChannelOption().scrollIntoView()
  welcomePage.getOperatorToChannelOption().click()
  welcomePage.getOperatorToChannelApproval1().click()
  cy.wait(4000)
  O2CTransferInitiatePage.getRecentDatainO2C()
  TransferRuleApproval.getsubmitbttnTransferrule().click({ force: true })
  cy.wait(2000)
  transferruleapprovalpage.getApprovalTransferrule().click({ force: true })
  cy.wait(4000)
})

And('Assert Initiated O2C for Transaction1', function () {
  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID = data.TransactionID
    O2CTransferInitiatePage.getSuccessMsg().should('have.text', this.data5.O2CApproval1Msg + TransactionID)
  })
  cy.wait(2000)
})
And('Assert Initiated O2C for Transaction2', function () {
  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID = data.TransactionID1
    O2CTransferInitiatePage.getSuccessMsg().should('have.text', this.data5.O2CApproval1Msg + TransactionID)
  })
  cy.wait(2000)
})
And('Assert Initiated O2C for Transaction3', function () {
  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID = data.TransactionID2
    O2CTransferInitiatePage.getSuccessMsg().should('have.text', this.data5.O2CApproval1Msg + TransactionID)
  })
  cy.wait(2000)
})
//-------------------------O2C approal2------------------------------------
When('Navigate to Operator to channel and click on O2C transfer Approval2', function () {
  welcomePage.getOperatorToChannelOption().scrollIntoView()
  welcomePage.getOperatorToChannelOption().click()
  welcomePage.getOperatorToChannelApproval2().click()
  cy.wait(2000)
  welcomePage.getOperatorToChannelApproval2().click()
  cy.wait(4000)
  O2CTransferInitiatePage.getRecentDatainO2C()
  TransferRuleApproval.getsubmitbttnTransferrule().click({ force: true })
  cy.wait(2000)
  transferruleapprovalpage.getApprovalTransferrule().click({ force: true })
})

