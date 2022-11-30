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
//
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
  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
  })
});


//----------------Test Scripts---------------------------------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.fixture('userData/SystemAdminLogin.json').then((data)=>{
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.fixture('userData/SystemAdminLogin.json').then((data)=>{
    let Name = data.SysAdminChecker1Name
    cy.checkWelcomeText(Name)
  })
})
Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})

//----------------------------------------------------------------------------------------------------

When('User Click on Transfer Rule.', function () {
  welcomePage.getTransferRuleOption().click()
  welcomePage.getTransferRule().click()
})
//---------------------------creation ---------------
And('Select the Service Name and from details.', function () {
  cy.wait(2000)
  transferrulepage.getServiceName().select(this.data3.TransferRuleData.servicename, { force: true })
  cy.intercept(this.data20.MFSProvid).as('wallet')
  transferrulepage.getFromMFSProvider().select(this.data3.TransferRuleData.FromMFSprovider, { force: true })
  cy.wait('@wallet')
  cy.readFile(DataFile).then((data) => {
    let Domain = data.Domainname
    transferrulepage.getFromeDomain().select(Domain, { force: true })
  })
  transferrulepage.getFromPaymentInstrument().select(this.data3.TransferRuleData.FromPaymentInstrument, { force: true })
  transferrulepage.getFromWallettype().select(this.data3.TransferRuleData.FromWallet, { force: true })
})


And('Select the To details for Initiaion', function () {
  transferrulepage.getToMFSProvider().select(this.data3.TransferRuleData.ToMFSprovider, { force: true })
  transferrulepage.getToDomain().select(this.data3.TransferRuleData.ToDomain, { force: true })
  transferrulepage.getToPaymentInstrument().select(this.data3.TransferRuleData.ToPaymentInstrument, { force: true })
  transferrulepage.getToWallettype().select(this.data3.TransferRuleData.ToWallet, { force: true })
  cy.intercept(this.data20.TransfSubmitbtn).as('transfersubmit')
  transferrulepage.getSubmitbttn().click()
  cy.wait('@transfersubmit')
})

And('Select the Service Name and from Details for Transfer to Bank', function () {
  cy.wait(2000)
  transferrulepage.getServiceName().select(this.data3.TransferRuleDataCreation.servicename1, { force: true })
  cy.intercept(this.data20.FromMFSPro).as('wallet')
  transferrulepage.getFromMFSProvider().select(this.data3.TransferRuleDataCreation.FromMFSprovider, { force: true })
  cy.wait('@wallet')
  transferrulepage.getFromeDomain().select(this.data3.TransferRuleDataCreation.FromDomain, { force: true })
  transferrulepage.getFromPaymentInstrument().select(this.data3.TransferRuleDataCreation.FromPaymentInstrument, { force: true })
  transferrulepage.getFromWallettype().select(this.data3.TransferRuleDataCreation.FromWallet, { force: true })
})


And('Select the To details for Transfer to Bank', function () {
  transferrulepage.getToMFSProvider().select(this.data3.TransferRuleDataCreation.ToMFSprovider, { force: true })
  cy.readFile(DataFile).then((data) => {
    let Domain = data.Domainname
    transferrulepage.getToDomain().select(Domain, { force: true })
  })
  transferrulepage.getToPaymentInstrument().select(this.data3.TransferRuleDataCreation.ToPaymentInstrument, { force: true })
  transferrulepage.getToWallettype().select(this.data3.TransferRuleDataCreation.ToWallet1, { force: true })
  cy.intercept(this.data20.SubmitbttnTransf).as('transfersubmit')
  transferrulepage.getSubmitbttn().click()
  cy.wait('@transfersubmit')
})

//-----------------------------------------------------------------------------------

And('Select the From & To category.', function () { 
  cy.readFile(DataFile).then((data) => {
    let Domain = data.Domainname
    transferrulepage.getFromCategory().select(Domain, { force: true })
  })
  transferrulepage.getToCategory().select(this.data3.TransferRuleData.ToCategory, { force: true })
})

And('Select the From & To category for Transfer to Bank', function () {
  transferrulepage.getFromCategory().select(this.data3.TransferRuleData.FromCategory, { force: true })
  cy.readFile(DataFile).then((data) => {
    let Domain = data.Domainname
    transferrulepage.getToCategory().select(Domain, { force: true })
  })
})

When('Click on Add Transfer Rule button.', function () {
  cy.intercept(this.data20.AddToTransf).as('addtransferrule')
  transferrulepage.getAddToTransferbttn().click()
  cy.wait('@addtransferrule')
})

And('Select Status,Fixed Trf Level,Transfer type,Geographical Domain and Controlled Trf Level', function () {
  const uuid = () => Cypress._.random(1e3)
  const uuid1 = () => Cypress._.random(1e4)
  MinimumTransferAmount = uuid()
  MaximumTransferAmount = uuid1()
  let MinimumTransferAmount, MaximumTransferAmount
  transferrulepage.getStatus().select(this.data3.TransferRuleData.Status, { force: true })
  transferrulepage.getTransferType().select(this.data3.TransferRuleData.TransferType, { force: true })
  transferrulepage.getGeographicalDomain().select(this.data3.TransferRuleData.GeographicalDomain, { force: true })
  transferrulepage.getMinimumTransferAmount().type(MinimumTransferAmount, { force: true })
  transferrulepage.getMaximumTransferAmount().type(MaximumTransferAmount, { force: true })
})

Then('Click on submit button.', function () {
  cy.intercept(this.data20.SubmitbttnTransf2).as('submittransferrule')
   transferrulepage.getSubmitbttn2().click()
   cy.wait('@submittransferrule')
 })
 Then('Click on confirm button.', function () {
   cy.wait(2000)
   transferrulepage.getConfirmbttn().click()
 })

//---------------------------------------------------------------------------------------


Then('Verify Delete initiate Message', function () {
  cy.wait(2000)
  transferrulepage.getAssertMessage().contains('Transfer Rule successfully delete initiated with ID')
})
Then('Verify Delete Approval Message', function () {
  cy.wait(4000)
  transferrulepage.getAssertMessage().contains('Transfer Rule successfully deleted with ID')
})

Then('Verify Approval success Message', function () {
  cy.wait(2000)
  transferrulepage.getAssertMessage().contains('Transfer Rule is approved with ID')
})
Then('Verify O2C Transfer rule success Message', function () {
  transferrulepage.getAssertMessage().should('have.text', 'Transfer rule successfully defined')
})
Then('Verify initiate success Message', function () {
  cy.wait(2000)
  transferrulepage.getAssertMessage().contains(this.data3.SuccessMessage)
})

//------------------------------------Testcase2--------------------------------------------------//
//----------------Modify--------------------------------------//
When('User clicks on edit option.', function () {
  cy.intercept(this.data20.EditOption).as('edittransferrule')
  transferrulepage.getEditOption().click()
  cy.wait('@edittransferrule')
})

// --------------------------------------view-------------------------------//
When('User clicks on view option.', function () {
  cy.intercept(this.data20.ViewOption).as('viewtransferrule')
  transferrulepage.getViewOption().click()
  cy.wait('@viewtransferrule')
  transferrulepage.getBackbttn().click({ force: true })
})
//-----------------------------------------delete------------------------------//
When('User clicks on Delete option.', function () {
  transferrulepage.getDeleteoption().click()
  cy.on('window:confirm', function () {
    return true
  })
})
//----------------------------suspend-----------------------------//


And('Suspend the status in transfer rule', function () {
  transferrulepage.getStatus().select(this.data3.TransferRuleData.Status1, { force: true })
  transferrulepage.getTransferType().select(this.data3.TransferRuleData.TransferType, { force: true })
  transferrulepage.getGeographicalDomain().select(this.data3.TransferRuleData.GeographicalDomain, { force: true })
})

//----------------------------Transferrule approval----------------------------//
When('User clicks on transfer rule approval', function () {
  welcomePage.getTransferRuleOption().click()
  welcomePage.getTransferRuleApproval().click()
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
  cy.intercept(this.data20.SubmitButtonTransf).as('trulesubmit')
  transferruleapprovalpage.getSubmitbttn().click()
  cy.wait('@trulesubmit')
})

//-------------------O2C transfer rules--------------------------------------------//
When('User clicks on O2C transfer rules', function () {
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
Then('Enter First Approval Limit.', function () {
  transferrulepageO2C.getFirstApprovalLimit().type(this.data3.O2CData.FirstApproval, { force: true })
})
And('Click on submit.', function () {
  cy.intercept(this.data20.SubmitBTN).as('errortrule')
  transferrulepageO2C.getSubmitbtn().click()
  cy.wait('@errortrule')
})
And('Click on confirm.', function () {
  cy.intercept(this.data20.confirmbtn).as('confirmo2c')
  transferrulepageO2C.getconfirmbtn().click()
  cy.wait('@confirmo2c')
})

//------------------------------------TC_164----------------------------------------------

Then('Enter First Approval Limit', function () {
  transferrulepageO2C.getFirstApprovalLimit().type(this.data3.O2CData.FirstApproval, { force: true })
  transferrulepageO2C.getAmount().type(getRandomName(), { force: true })
})


