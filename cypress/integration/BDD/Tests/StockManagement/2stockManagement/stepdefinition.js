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


//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const stockInitiationPage = new stockInitiation()
const stockManagementPage = new stockManagement()

var mobile
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()

var refno
refno = "12" + uuid()

var amount
const uuuid = () => Cypress._.random(1e2)
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
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})

Then('Click on Approve button', function () {
  cy.wait(3000)
  stockInitiationPage.getApproveButton_1().click({ force: true })
})


//---------------- Stock Transfer EA Enquiry---------------------------------------------------------------------

When('Navigate to Stock Management and Stock Transfer EA Enquiry', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getStockTransferEAEnquiry().click()
})

And('Select the From & To Dates and Transaction Status', function () {
  cy.wait(3000)
  stockManagementPage.getStockEnqLoadDetailsStatuses().select(this.data10.stockEnq_loadDetails_status.value, { force: true })
})

And('Click on Submit', function () {
  cy.wait(3000)
  stockManagementPage.getStockEnqLoadDetailsButtonSubmit().click({ force: true })
})
And('Select any Transaction ID from displayed list', function () {
  cy.wait(3000)
  stockManagementPage.getTrasanctionIDRadioButton().check()
})
Then('Click on View Submit button', function () {
  cy.wait(3000)
  stockManagementPage.getStockEnqRViewButtonSubmit().click({ force: true })
})

//--------------------------------reimbursement----------------------------------------------------------------

When('Click on Stock Management and Reimbursement', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getReimbursement().click()
})

And('Select User type', function () {
  cy.wait(3000)
  stockManagementPage.getUserTypes().select(this.data10.usertype.value, { force: true })
})


And('Enter MSISDN,Provider,Wallet Type,Reference Number and Remarks', function () {
  cy.getMobileNumber()
  cy.wait(3000)
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
  stockManagementPage.getWithdrawConfirmDisplayAmount().type(amount, { force: true })
  stockManagementPage.getWithdrawconfirmDisplayButn().click({ force: true })
  cy.wait(3000)
  stockManagementPage.getReimbursementMessage().should('contain.text', "Reimbursement is successfully initiated")
})


//---------------------------Login with another Admin credentials for reimbursement approval------------------------------------


When('Click on Stock management and stock reimbursement approval', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getStockReimbursementApproval().click()
})

And('Select the initiated stock reimbursement request', function () {
  cy.wait(3000)
  cy.iframe().find('.tabcol').then(($data) => {
    cy.log($data)
    if ($data.text().includes(this.data10.stockReimbursementApprovalErrorMessage)) {
      cy.iframe().find('.tabcol').should('contain.text', this.data10.stockReimbursementApprovalErrorMessage)
    }
    else {
      stockManagementPage.getReimbursementApproval().check();
      stockManagementPage.getWithdrawlActionApprovalButtonSubmit().click({ force: true })
      cy.wait(3000)
      stockManagementPage.getConfirmApprove().click({ force: true })
      cy.wait(3000)
      stockManagementPage.getReimbursementApproveMessage().should('contain.text', "successful with the transaction ID")
    }
  })
})


//------------------------- Error Messages------------------------------

//---------TC_171-------To verify that proper error message should be displayed when no stock is present in wallet
When('Navigate to Stock Management and Stock Withdrawal', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getStockWithdraw().click()
})

And('User Select Stock Withdraw Wallet Type', function () {
  cy.wait(5000)
  stockManagementPage.getWithdrawWalletType().select('IND01', { force: true })
  stockManagementPage.getWithdrawAvailableBalance().click({ force: true })
})
And('User Should select Stock Withdraw Bank', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawBankNames().select(this.data10.selectBank.bankname, { force: true })
})
And('User Should Enter Stock Withdraw Bank Account Number', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawBankAccountNumbes().select(this.data10.bankaccnumber.number, { force: true })
})
And('User Should Enter Stock Withdraw Amount', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawAmount().type(amount1, { force: true })
})
Then('User Click on Stock Withdraw Submit button', function () {
  cy.wait(3000)
  stockManagementPage.getStockWithdrawButtonSubmit().click({ force: true })
  cy.wait(10000)
  stockManagementPage.getStockWithdrwErrorMessage().should('have.text', this.data10.stockwithdrawerrormessage)
})


//---------TC_172------To verify that proper error message should be displayed when amount field contains any invalid character

And('User Should Enter Stock Withdraw invalid Amount', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawAmount().type(testname, { force: true })
})
Then('User Click on Stock Withdraw invalid Amount Submit button', function () {
  stockManagementPage.getStockWithdrawButtonSubmit().click({ force: true })
  cy.wait(5000)
  stockManagementPage.getStockWithdrwErrorMessage().should('contain.text', this.data10.stockwithdrawerrormessage2)
})

//---------TC_173-------To verify that proper error message should be displayed when no stock is present in wallet
When('Navigate to Stock Management and Stock Initiation', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getStockInitiation().click()
})

And('User Should Enter Stock Initiation Reference number', function () {
  cy.wait(3000)
  stockManagementPage.getStockInitRefNo().type(refno, { force: true })
})
And('User Should Enter Stock Initiation Amount', function () {
  cy.wait(3000)
  stockManagementPage.getStockInitWithdrawAmount().type(testname, { force: true })
})

Then('User Click on Stock Initiation Submit button', function () {
  cy.wait(3000)
  stockManagementPage.getStockInitButtonSubmit().click({ force: true })
  cy.wait(5000)
  stockManagementPage.getStockInitErrorMessage().should('have.text', this.data10.stockInitErrorMessage)
})
