/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/BusinessUserCommands";
import O2CTransferInitiate from '../../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';


//----------------Object Declaration-----------------------------------------------------------------

const welcomePage = new homePage()
const O2CTransferInitiatePage = new O2CTransferInitiate()
const uid = () => Cypress._.random(1e10)
const uuid = () => Cypress._.random(1e5)
var TransferAmount = uuid()
var ReferenceNumber = uuid()
var number = uuid()
var Amount = uid()
var name
var BBAFile = "cypress/fixtures/userData/BusinessUsersDataO2C.json"

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
});


//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
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

//------------------------------------TC_186-------------------------------------------------
When('Navigate to Operator to channel and click on O2C transfer initiate', function () {
  welcomePage.getOperatorToChannelOption().scrollIntoView()
  welcomePage.getOperatorToChannelOption().click()
  welcomePage.getO2CTransferInitiateOption().click()
})
And('Enter All the Mandatory details', function () {
  cy.wait(3000)
  cy.fixture('userData/BusinessUserSuspensionData.json').then((usermobile) => {
    let BsnuserMobile = usermobile.registeredMobile
    O2CTransferInitiatePage.getMSISDN().type(BsnuserMobile, { force: true })
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
})
And('Click on submit and Confirm', function () {
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(3000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
})
Then('Confirm the Error message', function () {
  cy.wait(2000)
  O2CTransferInitiatePage.getErrorMessage().should('have.text', this.data5.O2CTransferInitiate.errorMessage, { force: true })

})

//-------------------------------------------------TC_165-----------------------------------------------------
And('Enter All the Mandatory details and type Invalid Character in Transfer amount', function () {
  cy.wait(3000)
  cy.readFile(BBAFile).then((usermobile) => {
    let BsnuserMobile = usermobile.registeredMobileO2C
    O2CTransferInitiatePage.getMSISDN().type(BsnuserMobile, { force: true })
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
  O2CTransferInitiatePage.getTransferAmount().type(getRandomName(), { force: true })
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })
})


Then('Click on submit and Confirm Error Message', function () {
  cy.wait(2000)
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(2000)
  O2CTransferInitiatePage.getErrorMessage().should('have.text', this.data5.O2CTransferInitiate.ErrorMessage, { force: true })
})

//-------------------------------------------------TC_166-----------------------------------------------------
And('Enter All the Details', function () {
  cy.wait(3000)
  cy.readFile(BBAFile).then((usermobile) => {
    let BsnuserMobile = usermobile.registeredMobileO2C
    O2CTransferInitiatePage.getMSISDN().type(BsnuserMobile, { force: true })
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
  O2CTransferInitiatePage.getTransferAmount().type(Amount, { force: true })
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })
})

