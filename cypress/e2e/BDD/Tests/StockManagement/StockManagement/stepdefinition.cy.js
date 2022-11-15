/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import "../../../../../support/utils/Generic";
import "../../../../../support/utils/StockCommands";
import stockManagement from '../../../../../support/pageObjects/StockManagement/stockManagement'




//----------------Object Declaration-----------------------------------------------------------------


//const stockInitiationPage = new stockInitiation()
const stockManagementPage = new stockManagement()
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

//----------------------------------------Sudheer----------------------------------------------------------


//--------------Stock Management------------------------------------------------------------------------------------

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
  cy.wait(3000)
  stockManagementPage.getEASubmitButton().type("{enter}").focused().click({ force: true })
})

Then('User Click on Confirm button', function () {
  cy.wait(3000)
  stockManagementPage.getEAConfirmButton().click({ force: true })
  cy.wait(3000)
  //stockManagementPage.getStockInitiated().should('contain.text', this.data1.stockapproval1message)
  stockManagementPage.getStockInitiated().should('contain.text', this.data17.stockEAInitiated)

})


//-------------------------Stock Transfer to EA Approval 1--------------------------------

When('Click on Stock Management', function () {

  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
})

And('Click on Stock Transfer to EA Approval 1', function () {
  cy.wait(3000)
  stockManagementPage.getStockEAApproval1().click()

})

And('Click on Submit', function () {
  cy.wait(3000)
  stockManagementPage.getEAApprovalSubmitButton().click({ force: true })
})


Then('Click on Approve', function () {
  cy.wait(1000)
  stockManagementPage.getEAApprovalConfirmButton().click({ force: true })
  cy.wait(3000)
  stockManagementPage.getStockInitiated().should('contain.text', this.data17.stockEAapproval1message)
})

//-------------------------Stock Transfer to EA Approval 2--------------------------------

// When('Click on Stock Management', function () {

//   stockManagementPage.getStockManagement().scrollIntoView()
//   stockManagementPage.getStockManagement().click()
// })

And('Click on Stock Transfer to EA Approval 2', function () {
  cy.wait(3000)
  stockManagementPage.getStockEAApproval2().click()

})

And('Click on Submit Approval2', function () {
  cy.wait(3000)
  stockManagementPage.getEAApproval2SubmitButton().click({ force: true })
})


Then('Click on Approve of Approval2', function () {
  cy.wait(1000)
  stockManagementPage.getEAApproval2ConfirmButton().click({ force: true })
  cy.wait(3000)
  stockManagementPage.getStockInitiated().should('contain.text', this.data17.stockEAapprovedmessage)
})


//--------------------------------reimbursement----------------------------------------------------------------

When('Click on Stock Management and Reimbursement', function () {

  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getReimbursement().click()
})

And('Select User type', function () {
  cy.wait(3000)
  stockManagementPage.getUserTypes().select(this.data17.usertype.value, { force: true })

  // cy.selectUserType()
})


And('Enter MSISDN,Provider,Wallet Type,Reference Number and Remarks', function () {
  cy.getMobileNumber()
  // cy.reimbursementproviders()
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
        .find('input[id="withdraw_confirmDisplay_referenceNumber"]').click({ force: true })
        .should(function () {
          expect(this.windowConfirm).to.be.calledWith("MSISDN does not exist or is not in the selected type or profile")
        })

    }

  })
   cy.wait(3000)
   //stockManagementPage.getWalletTypes().select(this.data10.wallettype.value, { force: true })
    //cy.selectWalletType()
   stockManagementPage.getReimbursementReferenceNumber().type(refno, { force: true })
   stockManagementPage.getRemark().type(testname, { force: true })
   cy.selectInstrumentType()
})

And('Click on reimbursement submit', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawconfirmDisplayButtonSubmit().click({ force: true })
})

Then('Enter amount and click on confirm', function () {
  cy.wait(3000)
  cy.iframe().find('#page').then(($data) => {
    cy.log($data)
    if ($data.text().includes(this.data17.stockReimbursementInsufficientBalance)) {

      cy.iframe().find('#page').should('contain.text', this.data17.stockReimbursementInsufficientBalance)
    }
    else {
      stockManagementPage.getWithdrawConfirmDisplayAmount().type(amount, { force: true })
      stockManagementPage.getWithdrawconfirmDisplayButn().click({ force: true })
      cy.wait(3000)
      stockManagementPage.getStockInitiated().should('contain.text', this.data17.reimbursementinitiated)
      
      
    }

  })



})

