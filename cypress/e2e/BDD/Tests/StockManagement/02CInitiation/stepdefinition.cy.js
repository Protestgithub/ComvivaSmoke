/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/utils/Generic";
import "../../../../../support/utils/BusinessUserCommands";
import "../../../../../support/utils/subscriberCommands";
import O2CTransferInitiate from '../../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';
import Approval from '../../../../../support/pageObjects/TransferRules/Approval';
import stockInitiation from '../../../../../support/pageObjects/StockManagement/stockInitiation';
//----------------Object Declaration-----------------------------------------------------------------

const stockInitiationPage = new stockInitiation()
var filenamestock = 'cypress/fixtures/StockManagement.json'
var amount
const uuuid = () => Cypress._.random(1e3)
amount = uuuid()
var mobile
const uuid1 = () => Cypress._.random(1e8)
mobile = "77" + uuid1()


//----------------Object Declaration-----------------------------------------------------------------

const welcomePage = new homePage()
const O2CTransferInitiatePage = new O2CTransferInitiate()
const TransferRuleApproval = new Approval()
const uid = () => Cypress._.random(1e10)
const uuid = () => Cypress._.random(1e8)
const ud = () => Cypress._.random(1e3)
var transferAmount = ud()
var ReferenceNumber = uuid()
var number = uuid()
var name, BAMobileNumber
var TransactionFleO2C = "cypress/fixtures/userData/TransactionFile.json"
var BBAFile = "cypress/fixtures/userData/BusinessUsersDataO2C.json"
var O2CFile = "cypress/fixtures/userData/O2Cdata.json"

function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}
//----------------BDD Hooks-----------------------------------------------------------------

When('Navigate to Stock Management and Click on Stock initiation', function () {
  cy.wait(3000)
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  welcomePage.getStockInitiationOption().click()
})



Then('Assert Debited Stock', function () {
  stockInitiationPage.getSubmitButton().click({ force: true })
  cy.wait(5000)
  cy.readFile(filenamestock).then((data) => {
    let A = data.CreditedStock
    stockInitiationPage.getBalance().eq(3).contains(A)
  })
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
  O2CTransferInitiatePage.getType().select(this.data15.O2CTransferInitiate.type, { force: true })
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



var O2CMsisdn

Then('Click on submit and Confirm00', function () {
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(4000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
  cy.O2CTransactionWriteData()
  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID = data.TransactionID
    O2CTransferInitiatePage.getSuccessMsg().should('have.text', this.data15.O2CInitiateMsg + TransactionID)
  })
})




And('Assert Initiated O2C for Transaction1',function(){
  cy.wait(3000)
  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID = data.TransactionID
    O2CTransferInitiatePage.getSuccessMsg().should('have.text', this.data15.O2CApproval1Msg + TransactionID)
  })
  cy.wait(2000)
})
