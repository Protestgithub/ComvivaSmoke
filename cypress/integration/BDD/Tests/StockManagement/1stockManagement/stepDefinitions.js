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
  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
  })
});

//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminChecker1Name
    cy.checkWelcomeText(Name)
  })
})

Given('Login into Mobiquity Portal as System admin Checker2', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin3()
})


//---------------------------------------TC_75--------------------------------------------------

When('Navigate to Stock Management and Click on Stock initiation', function () {
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  cy.intercept(this.data20.StockIni).as('StckInitiation')
  welcomePage.getStockInitiationOption().click()
  cy.wait('@StckInitiation')
})

And('Select MFS provider and Enter Reference number and Amount', function () {
  stockInitiationPage.getProvider().select(this.data10.stockInitiation.provider, { force: true })
  stockInitiationPage.getStockFrom().select(this.data10.stockInitiation.stockFrom, { force: true })
  stockInitiationPage.getReferenceNumber().type(mobile, { force: true })
  cy.readFile(filenamestock).then((data) => {
    data.ReferenceNumber = mobile
    cy.writeFile(filenamestock, data)
  })
  stockInitiationPage.getRequestedAmount().type(amount, { force: true })
})

Then('click on Submit and Confirm button', function () {
  cy.intercept(this.data20.SubmitButtonSI).as('submittBtn')
  stockInitiationPage.getSubmitButton().click({ force: true })
  cy.wait('@submittBtn')
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
  stockInitiationPage.getConfirmButton().click({ force: true })
  cy.wait(5000)
  stockInitiationPage.getSuccessMsg().contains(this.data10.stockInitiationAssertion)
})


//----------------------------------------TC_76----------------------------------------------------
When('Navigate to Stock Management and Click on Stock Approval 1', function () {
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  cy.intercept(this.data20.Approval_1Opt).as('stockAproval1')
  welcomePage.getApproval_1Option().click()
  cy.wait('@stockAproval1')
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
  cy.StockTransactionWriteData()
  cy.wait(5000)
  stockInitiationPage.getSubmitButton_1().click({ force: true })
})

Then('Click on Approve button', function () {
  cy.wait(3000)
  stockInitiationPage.getApproveButton_1().click({ force: true })
  cy.wait(3000)
  cy.readFile(filenamestock).then((data) => {
    let Msg = data.trasanctionid
    stockInitiationPage.getSuccessMsg().should('have.text', this.data10.stockApproval1Msg + Msg)
  })
})


//--------------------------------------------------TC_77---------------------------------------------
And('Select MFS provider and Enter reference number and amount', function () {
  cy.wait(3000)
  stockInitiationPage.getProvider().select(this.data10.stockInitiation.provider)
  stockInitiationPage.getStockFrom().select(this.data10.stockInitiation.stockFrom, { force: true })
  stockInitiationPage.getReferenceNumber().type(mobile, { force: true })
  stockInitiationPage.getRequestedAmount().type(amount1, { force: true })
})

When('Navigate to Stock Management and Click on Stock Approval 2', function () {
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  cy.intercept(this.data20.Approval_2Opt).as('ApprBtn2')
  welcomePage.getApproval_2Option().click()
  cy.wait('@ApprBtn2')
})

Then('Click on Submit and Approve the Stock at level 2', function () {
  cy.intercept(this.data20.SubmitButton2).as('submitBtn2')
  stockInitiationPage.getSubmitButton_2().click({ force: true })
  cy.wait('@submitBtn2')
  
  cy.intercept(this.data20.ApproveButton).as('ApprvBtn2')
  stockInitiationPage.getApproveButton_2().click({ force: true })
  cy.wait('@ApprvBtn2')
  cy.wait(3000)
  cy.readFile(filenamestock).then((data) => {
    let Msg = data.trasanctionid
    stockInitiationPage.getSuccessMsg().should('have.text', this.data10.stockApproval2Msg + Msg)
  })
  welcomePage.getStockManagementOption().click()
})


//----------------------------------------Sudheer----------------------------------------------------------
//............Navigate to Stock Management and Stock Transfer to EA...............


When('Navigate to Stock Management and Stock Transfer to EA', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  cy.intercept(this.data20.StockTransferToEA).as('stockTransferEA')
  stockManagementPage.getStockTransferToEA().click()
  cy.wait('@stockTransferEA')
})

And('User Select MFS Provider', function () {
 
  cy.mfsprovider()
})

And('User Should Enter Reference number', function () {
  
  stockManagementPage.getReferenceNumber().type(refno, { force: true })
})

And('User Should Enter Amount', function () {
  
  stockManagementPage.getTransferAmount().type(amount, { force: true })
})

And('User Click on Submit button', function () {

  cy.intercept(this.data20.EASubmit).as('EASubmitBtn')
  stockManagementPage.getEASubmitButton().type("{enter}").focused().click({ force: true })
  cy.wait('@EASubmitBtn')
})

Then('User Click on Confirm button', function () {
  
  cy.intercept(this.data20.EAConfirm).as('EAConfirmBtn')
  stockManagementPage.getEAConfirmButton().click({ force: true })
  cy.wait('@EAConfirmBtn')
  
  stockManagementPage.getStockInitiated().should('contain.text', this.data10.stockEAInitiated)
})



// //............Navigate to Stock Management and Stock Transfer to RA...............

When('Navigate to Stock Management and Stock Transfer to RA', function () {

  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  cy.intercept(this.data20.StockTrans).as('stockTransferRA')
  stockManagementPage.getStockTransferToRA().click()
  cy.wait('@stockTransferRA')
})

And('Enter Reference number', function () {
  
  stockManagementPage.getRAReferenceNumber().type(refno, { force: true })
})

And('Select MFS Provider', function () {
  
  cy.mfsproviders()
})


And('Enter Amount', function () {
  
  stockManagementPage.getRARequestedAmount().type(amount, { force: true })

})

And('Click on Submit button', function () {
  
  cy.intercept(this.data20.RASubmit).as('RAsubmitBtn')
  stockManagementPage.getRASubmitButton().click({ force: true })
  cy.wait('@RAsubmitBtn')
})

Then('Click on Confirm button', function () {
  
  cy.intercept(this.data20.RAConfirm).as('RAConfirmBtn')
  stockManagementPage.getRAConfirmButton().click({ force: true })
  cy.wait('@RAConfirmBtn')
  
  stockManagementPage.getStockInitiated().should('contain.text', this.data10.stockEAInitiated)
})



//---------------- Stock Enquiry---------------------------------------------------------------------

When('Navigate to Stock Management and Stock Enquiry', function () {

  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  cy.intercept(this.data20.StockEn).as('stockEnquiry')
  stockManagementPage.getStockEnquiry().click()
  cy.wait('@stockEnquiry')
})

And('Select any Transaction ID from the displayed list', function () {
  
  cy.readFile(filenamestock).then((data) => {
    var transID = data.trasanctionid
    stockManagementPage.getTrasanctionID().type('XX221125.0922.A85005', { force: true })
  })
  cy.wait(3000)
  stockManagementPage.getStockTypes().select(this.data10.stocktypeA.value, { force: true })
})

Then('Click on Enquiry Submit button', function () {
  cy.intercept(this.data20.StockEnquirySub).as('stockEnquirySubmit')
  stockManagementPage.getStockEnquirySubmit().click({ force: true })
  cy.wait('@stockEnquirySubmit')
  
  cy.intercept(this.data20.StockEnquiryView).as('stockEnquiryViewSubmit')
  stockManagementPage.getStockEnquiryViewSubmit().click({ force: true })
  cy.wait(2000)
})

//---------------- Stock Transfer EA Enquiry---------------------------------------------------------------------

Then('click on approve button', function () {
  stockManagementPage.getConfirmApprove().click({ force: true })
  stockManagementPage.getReimbursementApproveMessage().should('contain.text', this.data10.stockReimbursementApproval)
})


//--------------------------------------------------------------------------------------
When('Navigate to Stock Management and Click on Stock Limit', function () {
 
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  //cy.intercept('/CoreWeb/stock/StockApprovalTransferLimitActionWithdraw_input.action').as('getStockLIMIT')
  welcomePage.getStockLimit().click()
  //cy.wait('@getStockLIMIT', { timeout: 5000 })
})

And('Enter the value for Approval Limit 1', function () {
  cy.wait(3000)
  stockInitiationPage.getApprovalLimit1().clear().type('1000')
})

Then('Click on Submit button for Stock Limit', function () {
  stockInitiationPage.getsubmitbutton().click()
})