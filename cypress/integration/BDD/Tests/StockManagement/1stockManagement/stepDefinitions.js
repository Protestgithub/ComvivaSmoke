/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/StockCommands";
import stockInitiation from '../../../../../support/pageObjects/StockManagement/stockInitiation';
import stockManagement from '../../../../../support/pageObjects/StockManagement/stockManagement';
import { add } from 'lodash';


//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const stockInitiationPage = new stockInitiation()
const stockManagementPage = new stockManagement()
var filenamestock = 'cypress/fixtures/StockManagement.json'

var mobile
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()

var refno
refno = "12" + uuid()

var amount
const uuuid = () => Cypress._.random(1e3)
amount = uuuid()

var amount1
const uuuuid = () => Cypress._.random(1e11)
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
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin3()
  cy.wait(3000)
})


//---------------------------------------TC_75--------------------------------------------------

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
      data.Amount = amount
      cy.writeFile(filenamestock, data)
    })
    cy.readFile(filenamestock).then((data) => {
      let x = data.Balance
      let y = data.Amount
      const num1 = x * 1
      const num2 = y * 1
      const sum = num1 + num2

      data.CreditedStock = sum
      cy.log(parseFloat(sum))
      cy.writeFile(filenamestock, data)
    })
  })
  cy.wait(5000)
  stockInitiationPage.getConfirmButton().click({ force: true })
  cy.wait(5000)
  cy.StockTransactionWriteData()
  cy.wait(5000)
  stockInitiationPage.getSuccessMsg().contains(this.data10.stockInitiationAssertion)
})


//----------------------------------------TC_76----------------------------------------------------
When('Navigate to Stock Management and Click on Stock Approval 1', function () {
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  welcomePage.getApproval_1Option().click()
  cy.wait(3000)

})
Then('Assert Credit Stock', function () {
  stockInitiationPage.getSubmitButton().click({ force: true })
  cy.wait(5000)
  cy.readFile(filenamestock).then((data) => {
    let A = data.CreditedStock
    stockInitiationPage.getBalance().eq(3).contains(A)
  })
})
And('Click on Submit Button', function () {
  cy.wait(5000)
  stockInitiationPage.getSubmitButton_1().click({ force: true })
})

Then('Click on Approve button', function () {
  cy.wait(5000)
  stockInitiationPage.getApproveButton_1().click({ force: true })
  cy.wait(5000)
  cy.readFile(filenamestock).then((data) => {
    let Msg = data.trasanctionid
    stockInitiationPage.getSuccessMsg().should('have.text', this.data10.stockApproval1Msg + Msg)
    cy.wait(1000)
  })
})


//--------------------------------------------------TC_77---------------------------------------------
And('Select MFS provider and Enter reference number and amount', function () {
  cy.wait(3000)
  cy.getprovider()
  stockInitiationPage.getStockFrom().select(this.data10.stockInitiation.stockFrom, { force: true })
  stockInitiationPage.getReferenceNumber().type(mobile, { force: true })
  stockInitiationPage.getRequestedAmount().type(amount1, { force: true })
})

When('Navigate to Stock Management and Click on Stock Approval 2', function () {
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  welcomePage.getApproval_2Option().click()
  cy.wait(3000)
  welcomePage.getApproval_2Option().click()
  cy.wait(3000)

})

Then('Click on Submit and Approve the Stock at level 2', function () {
  cy.wait(5000)
  stockInitiationPage.getSubmitButton_2().click({ force: true })
  cy.wait(5000)
  stockInitiationPage.getApproveButton_2().click({ force: true })
  cy.wait(3000)
  cy.readFile(filenamestock).then((data) => {
    let Msg = data.trasanctionid
    stockInitiationPage.getSuccessMsg().should('have.text', this.data10.stockApproval2Msg + Msg)
  })
  cy.wait(1000)
  welcomePage.getStockManagementOption().click()

})


//----------------------------------------Sudheer----------------------------------------------------------
//............Navigate to Stock Management and Stock Transfer to EA...............


When('Navigate to Stock Management and Stock Transfer to EA', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getStockTransferToEA().click()
})

And('User Select MFS Provider', function () {
  cy.wait(3000)
  cy.mfsprovider()
})

And('User Should Enter Reference number', function () {
  cy.wait(3000)
  stockManagementPage.getReferenceNumber().type(refno, { force: true })
})

And('User Should Enter Amount', function () {
  cy.wait(3000)
  stockManagementPage.getTransferAmount().type(amount, { force: true })
})

And('User Click on Submit button', function () {
  cy.wait(1000)
  stockManagementPage.getEASubmitButton().type("{enter}").focused().click({ force: true })
})

Then('User Click on Confirm button', function () {
  cy.wait(1000)
  stockManagementPage.getEAConfirmButton().click({ force: true })
  cy.wait(3000)
  stockManagementPage.getStockInitiated().should('contain.text', this.data10.stockEAInitiated)
})



// //............Navigate to Stock Management and Stock Transfer to RA...............

When('Navigate to Stock Management and Stock Transfer to RA', function () {

  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getStockTransferToRA().click()
})

And('Enter Reference number', function () {
  cy.wait(3000)
  stockManagementPage.getRAReferenceNumber().type(refno, { force: true })
})

And('Select MFS Provider', function () {
  cy.wait(3000)
  cy.mfsproviders()
})


And('Enter Amount', function () {
  cy.wait(3000)
  stockManagementPage.getRARequestedAmount().type(amount, { force: true })

})

And('Click on Submit button', function () {
  cy.wait(3000)
  stockManagementPage.getRASubmitButton().click({ force: true })
})

Then('Click on Confirm button', function () {
  cy.wait(3000)
  stockManagementPage.getRAConfirmButton().click({ force: true })
  cy.wait(3000)
  stockManagementPage.getStockInitiated().should('contain.text', this.data10.stockEAInitiated)
})



//---------------- Stock Enquiry---------------------------------------------------------------------

When('Navigate to Stock Management and Stock Enquiry', function () {

  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getStockEnquiry().click()
})

And('Select any Transaction ID from the displayed list', function () {
  cy.wait(3000)
  cy.readFile(filenamestock).then((data) => {
    var transID = data.trasanctionid
    stockManagementPage.getTrasanctionID().type(transID, { force: true })
  })
  cy.wait(3000)
  stockManagementPage.getStockTypes().select(this.data10.stocktypeA.value, { force: true })
})

Then('Click on Enquiry Submit button', function () {
  stockManagementPage.getStockEnquirySubmit().click({ force: true })
  cy.wait(3000)
  stockManagementPage.getStockEnquiryViewSubmit().click({ force: true })
})

//---------------- Stock Transfer EA Enquiry---------------------------------------------------------------------

Then('click on approve button', function () {
  cy.wait(3000)
  stockManagementPage.getConfirmApprove().click({ force: true })
  cy.wait(3000)
  stockManagementPage.getReimbursementApproveMessage().should('contain.text', this.data10.stockReimbursementApproval)

})


//--------------------------------------------------------------------------------------
When('Navigate to Stock Management and Click on Stock Limit', function () {
  cy.wait(3000)
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  welcomePage.getStockLimit().click()
})

And('Enter the value for Approval Limit 1', function () {
  cy.wait(3000)
  stockInitiationPage.getApprovalLimit1().clear().type('1000')
})

Then('Click on Submit button for Stock Limit', function () {
  stockInitiationPage.getsubmitbutton().click()
})