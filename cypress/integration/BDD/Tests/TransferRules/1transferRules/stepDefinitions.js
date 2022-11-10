/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import TransferRulePage from '../../../../../support/pageObjects/TransferRules/TransferRulePage';
import Approval from '../../../../../support/pageObjects/TransferRules/Approval';
import O2C from '../../../../../support/pageObjects/TransferRules/O2C';


//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()
const transferrulepage = new TransferRulePage()
const transferruleapprovalpage = new Approval()
const transferrulepageO2C = new O2C()
var DataFile = "cypress/fixtures/userData/Domain&CAT.json"
var name

//-------------------------------------------------------------
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
  cy.fixture('TransferRules').then(function (data3) {
    this.data3 = data3;
  })
});


//----------------Test Scripts---------------------------------------------------------------

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

//------------------------------------------------------------------------------
When('User Click on Transfer Rule.', function () {
  cy.wait(2000)
  welcomePage.getTransferRuleOption().click()
  cy.wait(2000)
  welcomePage.getTransferRule().click()
  cy.wait(2000)
})
//---------------------------creation ---------------
And('Select the Service Name and from details.', function () {
  cy.wait(2000)
  transferrulepage.getServiceName().select(this.data3.TransferRuleData.servicename, { force: true })
  cy.wait(4000)
  transferrulepage.getFromMFSProvider().select(this.data3.TransferRuleData.FromMFSprovider, { force: true })
  cy.wait(4000)
  cy.readFile(DataFile).then((data) => {
    let Domain = data.Domainname
    transferrulepage.getFromeDomain().select(Domain, { force: true })
  })
  transferrulepage.getFromPaymentInstrument().select(this.data3.TransferRuleData.FromPaymentInstrument, { force: true })
  transferrulepage.getFromWallettype().select(this.data3.TransferRuleData.FromWallet, { force: true })
})


And('Select the To details for Initiaion', function () {
  cy.wait(2000)
  transferrulepage.getToMFSProvider().select(this.data3.TransferRuleData.ToMFSprovider, { force: true })
  transferrulepage.getToDomain().select(this.data3.TransferRuleData.ToDomain, { force: true })
  transferrulepage.getToPaymentInstrument().select(this.data3.TransferRuleData.ToPaymentInstrument, { force: true })
  transferrulepage.getToWallettype().select(this.data3.TransferRuleData.ToWallet, { force: true })
  transferrulepage.getSubmitbttn().click()
  cy.wait(2000)
})


//-----------------------------------------------------------------------------------

And('Select the From & To category.', function () {
  cy.wait(2000)
  cy.readFile(DataFile).then((data) => {
    let Domain = data.Domainname
    transferrulepage.getFromCategory().select(Domain, { force: true })
  })
  transferrulepage.getToCategory().select(this.data3.TransferRuleData.ToCategory, { force: true })
})


When('Click on Add Transfer Rule button.', function () {
  cy.wait(2000)
  transferrulepage.getAddToTransferbttn().click()
})

And('Select Status,Fixed Trf Level,Transfer type,Geographical Domain and Controlled Trf Level', function () {
const uuid = () => Cypress._.random(1e3)
const uuid1 = () => Cypress._.random(1e4)
let MinimumTransferAmount,MaximumTransferAmount
MinimumTransferAmount = uuid()
MaximumTransferAmount = uuid1()
  cy.wait(2000)
  transferrulepage.getStatus().select(this.data3.TransferRuleData.Status, { force: true })
  transferrulepage.getTransferType().select(this.data3.TransferRuleData.TransferType, { force: true })
  transferrulepage.getGeographicalDomain().select(this.data3.TransferRuleData.GeographicalDomain, { force: true })
  transferrulepage.getMinimumTransferAmount().type(MinimumTransferAmount,{ force: true })
  transferrulepage.getMaximumTransferAmount().type(MaximumTransferAmount,{ force: true })
})

Then('Click on submit button.', function () {
  cy.wait(2000)
  transferrulepage.getSubmitbttn2().click()
})
Then('Click on confirm button.', function () {
  cy.wait(2000)
  transferrulepage.getConfirmbttn().click()
})
Then('Verify initiate success Message', function () {
  cy.wait(2000)
  transferrulepage.getAssertMessage().contains(this.data3.SuccessMessage)
})
Then('Verify Modify success Message', function () {
  cy.wait(2000)
  transferrulepage.getAssertMessage().contains(this.data3.ModifyMessage)
})
Then('Verify Approval success Message', function () {
  cy.wait(2000)
  transferrulepage.getAssertMessage().contains('Transfer Rule is approved with ID')
})

//------------------------------------Testcase2--------------------------------------------------//
//----------------Modify--------------------------------------//
When('User clicks on edit option.', function () {
  transferrulepage.getEditOption().click()
})

//----------------------------Transferrule approval----------------------------//
When('User clicks on transfer rule approval', function () {
  cy.wait(2000)
  welcomePage.getTransferRuleOption().click()
  welcomePage.getTransferRuleApproval().click()
  cy.wait(2000)
})
And('Select rule and approve', function () {
  cy.wait(3000)
  cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
    const $body = $iframe.contents().find('body')
    const $win = $iframe[0].contentWindow
    cy.stub($win, 'confirm', () => true)
      .as('windowConfirm')
    cy.stub($win.console, 'log').as('consoleLog')
    cy.wrap($body)
    cy.getTransferApproval()
  })
})
Then('click on submit', function () {
  cy.wait(5000)
  transferruleapprovalpage.getSubmitbttn().click()
})

//-------------------O2C transfer rules--------------------------------------------//
When('User clicks on O2C transfer rules', function () {
  cy.wait(2000)
  welcomePage.getTransferRuleOption().click()
  welcomePage.getO2CTransferRule().click()
})
And('Select Domain Name.', function () {
  cy.wait(2000)
  cy.readFile(DataFile).then((data) => {
    let Domain = data.Domainname
    transferrulepageO2C.getDomainName().select(Domain, { force: true })
  })
})
And('Select Category Name.', function () {
    cy.readFile(DataFile).then((data) => {
    let Category = data.CategoryName
    transferrulepageO2C.getCategoryName().select(Category, { force: true })
  })
})
And('Select MFS Provider,Payment Instrument.', function () {
  transferrulepageO2C.getMFSprovider().select(this.data3.O2CData.MFSProvider, { force: true })
  transferrulepageO2C.getPaymentInstrument().select(this.data3.O2CData.Payement, { force: true })
  transferrulepageO2C.getLinkedBank().select(this.data3.O2CData.LinkedBank, { force: true })
})

And('Click on submit.', function () {
  transferrulepageO2C.getSubmitbtn().click()
})

//-------------------------------------Narendra-----------------------------------------------

//--------------------------------------TC_163-----------------------------------------------
And('Confirm the Error Message', function () {
  cy.wait(2000)
  transferrulepage.getErrorMessage().should('have.text', this.data3.TransferRuleData.ErrorMessage)
  cy.wait(2000)
})

//------------------------------------TC_164----------------------------------------------

Then('Enter First Approval Limit', function () {
  transferrulepageO2C.getFirstApprovalLimit().type(this.data3.O2CData.FirstApproval, { force: true })
  transferrulepageO2C.getAmount().type(getRandomName(), { force: true })
})

And('confirm the displayed Error Message', function () {
  cy.wait(2000)
  transferrulepage.getErrorMessage().should('have.text', this.data3.O2CData.ErrorMessage)
  cy.wait(1000)
})

