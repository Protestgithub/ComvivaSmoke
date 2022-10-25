
/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/utils/Generic";
import "../../../../../support/utils/StockCommands";
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

    cy.fixture('StockManagement').then(function (data17) {
      this.data17 = data17;
    })
  });


//---------------------------------------TC_75--------------------------------------------------




Then('click on Submit and Confirm button', function () { 
  cy.wait(5000)
  stockInitiationPage.getSubmitButton().click({ force: true })
  cy.wait(5000)
  stockInitiationPage.getBalance().eq(3).invoke('text').then((text) => {
    text = text.trim()
    cy.readFile(filenamestock).then((data) =>{
      data.Balance = text
      data.Amount = amount
    cy.writeFile(filenamestock,data)
    })
    cy.readFile(filenamestock).then((data) =>{
      let x = data.Balance
      let y = data.Amount
      const num1 = x*1
      const num2 = y*1
      const sum = num1+num2
  
      data.CreditedStock = sum
      cy.log(parseFloat(sum))
    cy.writeFile(filenamestock,data)
    })
  })
  cy.wait(5000)
  stockInitiationPage.getConfirmButton().click({ force: true })
  cy.wait(5000)
  cy.StockTransactionWriteData()
  cy.wait(5000)
  stockInitiationPage.getSuccessMsg().contains(this.data17.stockInitiationAssertion)
})


//----------------------------------------TC_76----------------------------------------------------
When('Navigate to Stock Management and Click on Stock Approval 1', function () {
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  welcomePage.getApproval_1Option().click()
  cy.wait(3000)
 
})
And('Select MFS provider and Enter Reference number and Amount', function () {
    cy.wait(5000)
    stockInitiationPage.getProvider().select(this.data17.stockInitiation.provider,{ force: true })
    stockInitiationPage.getStockFrom().select(this.data17.stockInitiation.stockFrom, { force: true })
    stockInitiationPage.getReferenceNumber().type(mobile, { force: true })
    stockInitiationPage.getRequestedAmount().type(amount, { force: true })
  })
Then('Assert Credit Stock',function(){
  stockInitiationPage.getSubmitButton().click({ force: true })
  cy.wait(5000)
  cy.readFile(filenamestock).then((data) =>{
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
  cy.readFile(filenamestock).then((data)=>{
    let Msg = data.trasanctionid
    stockInitiationPage.getSuccessMsg().should('have.text',this.data17.stockApproval1Msg+Msg)
    cy.wait(1000)
  })
})


//--------------------------------------------------TC_77---------------------------------------------


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
  cy.readFile(filenamestock).then((data)=>{
    let Msg = data.trasanctionid
  stockInitiationPage.getSuccessMsg().should('have.text',this.data17.stockApproval2Msg+Msg)
  })
  cy.wait(1000)
  welcomePage.getStockManagementOption().click()

})