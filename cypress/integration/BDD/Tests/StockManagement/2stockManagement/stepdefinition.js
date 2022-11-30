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
  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
  })
});

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

Then('Click on Approve button', function () {
  
  stockInitiationPage.getApproveButton_1().click({ force: true })
})


//---------------- Stock Transfer EA Enquiry---------------------------------------------------------------------

When('Navigate to Stock Management and Stock Transfer EA Enquiry', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  cy.intercept(this.data20.StockTransferEAEn).as('stockenquiry')
  stockManagementPage.getStockTransferEAEnquiry().click()
  cy.wait('@stockenquiry')
})

And('Select the From & To Dates and Transaction Status', function () {
  stockManagementPage.getStockEnqLoadDetailsStatuses().select(this.data10.stockEnq_loadDetails_status.value, { force: true })
})

And('Click on Submit', function () {
  cy.intercept(this.data20.StockEnqLoadD).as('enquirysubmit')
  stockManagementPage.getStockEnqLoadDetailsButtonSubmit().click({ force: true })
  cy.wait('@enquirysubmit')
})
And('Select any Transaction ID from displayed list', function () {
  stockManagementPage.getTrasanctionIDRadioButton().check()
})
Then('Click on View Submit button', function () {
  cy.intercept(this.data20.StockEnqRView).as('enquiryconfirm')
  stockManagementPage.getStockEnqRViewButtonSubmit().click({ force: true })
  cy.wait('@enquiryconfirm')
})

//--------------------------------reimbursement----------------------------------------------------------------

When('Click on Stock Management and Reimbursement', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  cy.intercept(this.data20.Reimbursement).as('reimbursement')
  stockManagementPage.getReimbursement().click()
  cy.wait('@reimbursement')
})

And('Select User type', function () {
  stockManagementPage.getUserTypes().select(this.data10.usertype.value, { force: true })
})


And('Enter MSISDN,Provider,Wallet Type,Reference Number and Remarks', function () {
  cy.getMobileNumber()
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
  stockManagementPage.getReimbursementReferenceNumber().type(refno, { force: true })
  stockManagementPage.getRemark().type(testname, { force: true })
  cy.selectInstrumentType()
})

And('Click on reimbursement submit', function () {
  cy.intercept(this.data20.Withdrawconfirm).as('CDBSubmit')
  stockManagementPage.getWithdrawconfirmDisplayButtonSubmit().click({ force: true })
  cy.wait('@CDBSubmit')
})
Then('Enter amount and click on confirm', function () {
  stockManagementPage.getWithdrawConfirmDisplayAmount().type(amount, { force: true })
  cy.intercept(this.data20.WithdrawconfirmDis).as('ConfirmDisBtn')
  stockManagementPage.getWithdrawconfirmDisplayButn().click({ force: true })
  cy.wait('@ConfirmDisBtn')

  stockManagementPage.getReimbursementMessage().should('contain.text', "Reimbursement is successfully initiated")
})


//---------------------------Login with another Admin credentials for reimbursement approval------------------------------------


When('Click on Stock management and stock reimbursement approval', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  cy.intercept(this.data20.StockReimb).as('ReimApproval')
  stockManagementPage.getStockReimbursementApproval().click()
  cy.wait('@ReimApproval')
})

And('Select the initiated stock reimbursement request', function () {
  cy.iframe().find('.tabcol').then(($data) => {
    cy.log($data)
    if ($data.text().includes(this.data10.stockReimbursementApprovalErrorMessage)) {
      cy.iframe().find('.tabcol').should('contain.text', this.data10.stockReimbursementApprovalErrorMessage)
    }
    else {
      stockManagementPage.getReimbursementApproval().check();
      cy.intercept(this.data20.WithdrawlActionApp).as('WAcApBtnSub')
      stockManagementPage.getWithdrawlActionApprovalButtonSubmit().click({ force: true })
      cy.wait('@WAcApBtnSub')
      cy.intercept(this.data20.ConfirmApp).as('confirmApprv')
      stockManagementPage.getConfirmApprove().click({ force: true })
      cy.wait('@confirmApprv')
      stockManagementPage.getReimbursementApproveMessage().should('contain.text', "successful with the transaction ID")
    }
  })
})


//------------------------- Error Messages------------------------------

//---------TC_171-------To verify that proper error message should be displayed when no stock is present in wallet
When('Navigate to Stock Management and Stock Withdrawal', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  cy.intercept(this.data20.StockWithd).as('stockWithdrawal')
  stockManagementPage.getStockWithdraw().click()
  cy.wait('@stockWithdrawal')
})

And('User Select Stock Withdraw Wallet Type', function () {
  stockManagementPage.getWithdrawWalletType().select('IND01', { force: true })
  stockManagementPage.getWithdrawAvailableBalance().click({ force: true })
 
})
And('User Should Enter Stock Withdraw Amount', function () {
  
  stockManagementPage.getWithdrawAmount().type(amount1, { force: true })
  cy.waitUntil(()=>{
    return cy.iframe().find('label[class="label"]').eq(3).should('be.visible',{force:true})
  })
})
Then('User Click on Stock Withdraw Submit button', function () {
  cy.intercept(this.data20.StockWithdrawBtn).as('stk')
  stockManagementPage.getStockWithdrawButtonSubmit().click({ force: true })
  cy.wait('@stk',{timeout:10000})
  stockManagementPage.getStockWithdrwErrorMessage().should('have.text', this.data10.stockwithdrawerrormessage)
})

//---------TC_172------To verify that proper error message should be displayed when amount field contains any invalid character

And('User Should select Stock Withdraw Bank', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawBankNames().select(this.data10.selectBank.bankname, { force: true })
})
And('User Should Enter Stock Withdraw Bank Account Number', function () {
  cy.wait(2000)
  stockManagementPage.getWithdrawBankAccountNumbes().select(this.data10.bankaccnumber.number, { force: true })
})

And('User Should Enter Stock Withdraw invalid Amount', function () {
  stockManagementPage.getWithdrawAmount().type(testname, { force: true })
})
Then('User Click on Stock Withdraw invalid Amount Submit button', function () {
  cy.intercept(this.data20.StockWithSubBtn).as('stk')
  stockManagementPage.getStockWithdrawButtonSubmit().click({ force: true })
  cy.wait('@stk',{timeout:10000})
  stockManagementPage.getStockWithdrwErrorMessage().should('contain.text', this.data10.stockwithdrawerrormessage2)
})

//---------TC_173-------To verify that proper error message should be displayed when no stock is present in wallet
When('Navigate to Stock Management and Stock Initiation', function () {
  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  cy.intercept(this.data20.StockInit).as('stockinitiation')
  stockManagementPage.getStockInitiation().click()
  cy.wait('@stockinitiation')
})

And('User Should Enter Stock Initiation Reference number', function () {
  stockManagementPage.getStockInitRefNo().type(refno, { force: true })
})
And('User Should Enter Stock Initiation Amount', function () {
  stockManagementPage.getStockInitWithdrawAmount().type(testname, { force: true })
})

Then('User Click on Stock Initiation Submit button', function () {
  cy.intercept(this.data20.StockInitButtonSub).as('stockInitiationBtn')
  stockManagementPage.getStockInitButtonSubmit().click({ force: true })
  cy.wait('@stockInitiationBtn')
  stockManagementPage.getStockInitErrorMessage().should('have.text', this.data10.stockInitErrorMessage)
})
