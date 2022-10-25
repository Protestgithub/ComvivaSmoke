/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';

import "../../../../../support/utils/Generic";
import TransferRulePage from '../../../../../support/pageObjects/TransferRules/TransferRulePage';
import Approval from '../../../../../support/pageObjects/TransferRules/Approval';
import O2C from '../../../../../support/pageObjects/TransferRules/O2C';


//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()
const transferrulepage = new TransferRulePage()
const transferruleapprovalpage = new Approval()
const transferrulepageO2C = new O2C()
var DataFile = "cypress/fixtures/userData/Domain&CAT.json"
var GradeFile = 'cypress/fixtures/userData/Gradedata.json'

var  name
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {


  cy.fixture('TransferRules').then(function (data13) {
    this.data13 = data13;
  })
});


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
  transferrulepage.getServiceName().select(this.data13.TransferRuleData.servicename, { force: true })
  cy.wait(4000)
  //cy.mfsprovider()
  transferrulepage.getFromMFSProvider().select(this.data13.TransferRuleData.FromMFSprovider, { force: true })
  cy.wait(4000)
  cy.readFile(DataFile).then((data) => {
    let Domain = data.Domainname
    transferrulepage.getFromeDomain().select(Domain, { force: true })
  })
  transferrulepage.getFromPaymentInstrument().select(this.data13.TransferRuleData.FromPaymentInstrument, { force: true })
  transferrulepage.getFromWallettype().select(this.data13.TransferRuleData.FromWallet, { force: true })
})


And('Select the To details for Initiaion', function () {
  cy.wait(2000)
  transferrulepage.getToMFSProvider().select(this.data13.TransferRuleData.ToMFSprovider, { force: true })
  transferrulepage.getToDomain().select(this.data13.TransferRuleData.ToDomain, { force: true })
  transferrulepage.getToPaymentInstrument().select(this.data13.TransferRuleData.ToPaymentInstrument, { force: true })
  transferrulepage.getToWallettype().select(this.data13.TransferRuleData.ToWallet, { force: true })
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
  transferrulepage.getToCategory().select(this.data13.TransferRuleData.ToCategory, { force: true })
  /*cy.readFile(GradeFile).then((data) => {
    let Grade = data.GradeName
    transferrulepage.getFromGrade().select(Grade, { force: true })
  })
  transferrulepage.getToGrade().select(this.data13.TransferRuleData.ToGrade, { force: true })*/

})

And('Select the From & To category for Transfer to Bank', function () {
  cy.wait(2000)
  transferrulepage.getFromCategory().select(this.data13.TransferRuleData.FromCategory, { force: true })
  cy.readFile(DataFile).then((data) => {
    let Domain = data.Domainname
    transferrulepage.getToCategory().select(Domain, { force: true })
  })
  /*transferrulepage.getFromGrade().select(this.data13.TransferRuleData.FromGrade, { force: true })
  cy.readFile(GradeFile).then((data) => {
    let Grade = data.GradeName
    transferrulepage.getToGrade().select(Grade, { force: true })
  })*/

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
  transferrulepage.getStatus().select(this.data13.TransferRuleData.Status, { force: true })
  transferrulepage.getTransferType().select(this.data13.TransferRuleData.TransferType, { force: true })
  transferrulepage.getGeographicalDomain().select(this.data13.TransferRuleData.GeographicalDomain, { force: true })
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
  transferrulepage.getAssertMessage().contains(this.data13.SuccessMessage)
})

Then('Verify Approval success Message', function () {
  cy.wait(2000)
  transferrulepage.getAssertMessage().contains('Transfer Rule is approved with ID')
})

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
    //transferruleapprovalpage.getFirstApproval().contains("Approve").click()
    // .should(function () {
    //  expect(this.windowConfirm).to.be.calledWith('Are you sure you want to Reject?')
    //     //expect(this.consoleLog).to.be.calledWith('CONFIRMED')  // passes
    //   })
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
  
 // transferrulepageO2C.getDomainName().select(this.data13.O2CData.DoaminName, { force: true })
})
And('Select Category Name.', function () {
  cy.wait(3000)
  cy.readFile(DataFile).then((data) => {
    let Category = data.CategoryName
    transferrulepageO2C.getCategoryName().select(Category, { force: true })
  })
 // transferrulepageO2C.getCategoryName().select(this.data13.O2CData.CategoryName, { force: true })
})
And('Select MFS Provider,Payment Instrument.', function () {
  transferrulepageO2C.getMFSprovider().select(this.data13.O2CData.MFSProvider, { force: true })
  transferrulepageO2C.getPaymentInstrument().select(this.data13.O2CData.Payement, { force: true })
  transferrulepageO2C.getLinkedBank().select(this.data13.O2CData.LinkedBank, { force: true })
})
Then('Enter First Approval Limit.', function () {
  transferrulepageO2C.getFirstApprovalLimit().type(this.data13.O2CData.FirstApproval, { force: true })
})
And('Click on submit.', function () {
  transferrulepageO2C.getSubmitbtn().click()
})
And('Click on confirm.', function () {
  cy.wait(5000)
  transferrulepageO2C.getconfirmbtn().click()
})