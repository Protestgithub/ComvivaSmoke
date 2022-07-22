/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import "../../../../support/commands";
import "../../../../support/StockCommands";
import stockInitiation from '../../../../support/pageObjects/StockManagement/stockInitiation';
import stockManagement from '../../../../support/pageObjects/StockManagement/stockManagement';


//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const stockInitiationPage = new stockInitiation()
const stockManagementPage = new stockManagement()
var name
var mobile
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()

var refno
refno = "12" + uuid()

var amount
const uuuid = () => Cypress._.random(1e3)
amount = uuuid()

var amount1
const uuuuid = () => Cypress._.random(1e13)
amount1 = uuuuid()

const uid = () => Cypress._.random(1e2)
const id = uid()
const testname = `testname${id}`
let message
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
Given('Login into Mobiquity Portal as System admin Maker after Logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
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

Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})

//---------------------------------------TC_75--------------------------------------------------

When('Navigate to Stock Management and Click on Stock initiation', function () {
  cy.wait(2000)
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  welcomePage.getStockInitiationOption().click()
})

And('Select MFS provider and Enter Reference number and Amount', function () {
  cy.wait(3000)
  cy.getprovider()
  stockInitiationPage.getStockFrom().select(this.data10.stockInitiation.stockFrom, { force: true })
  stockInitiationPage.getReferenceNumber().type(mobile, { force: true })
  stockInitiationPage.getRequestedAmount().type(amount, { force: true })
})
Then('click on Submit and Confirm button', function () {
  stockInitiationPage.getSubmitButton().click({ force: true })
  cy.wait(2000)
  stockInitiationPage.getConfirmButton().click({ force: true })
  cy.wait(2000)

})

//----------------------------------------TC_76----------------------------------------------------
When('Navigate to Stock Management and Click on Stock Approval 1', function () {
  welcomePage.getStockManagementOption().scrollIntoView()
  welcomePage.getStockManagementOption().click()
  welcomePage.getApproval_1Option().click()
})

And('Click on Submit Button', function () {
  cy.wait(5000)
  stockInitiationPage.getSubmitButton_1().click({ force: true })
})

Then('Click on Approve button', function () {
  cy.wait(3000)
  stockInitiationPage.getApproveButton_1().click({ force: true })
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
})

Then('Click on Submit and Approve the Stock at level 2', function () {
  cy.wait(5000)
  stockInitiationPage.getSubmitButton_2().click({ force: true })
  cy.wait(3000)
  stockInitiationPage.getApproveButton_2().click({ force: true })

})


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
  stockManagementPage.getTrasanctionID().type(this.data10.trasanctionid.id1, { force: true })
  cy.wait(3000)
  stockManagementPage.getStockTypes().select(this.data10.stocktypeA.value, { force: true })
  //  cy.stocktype()
})

Then('Click on Enquiry Submit button', function () {

  stockManagementPage.getStockEnquirySubmit().click({ force: true })
  cy.wait(3000)
  stockManagementPage.getStockEnquiryViewSubmit().click({ force: true })
  // cy.wait(3000)
  // stockManagementPage.getStockEnquiryConfirmID().should('have.value', this.data10.trasanctionid.id1)
})

//---------------- Stock Transfer EA Enquiry---------------------------------------------------------------------

When('Navigate to Stock Management and Stock Transfer EA Enquiry', function () {

  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getStockTransferEAEnquiry().click()
})

And('Select the From & To Dates and Transaction Status', function () {
  cy.wait(3000)

  stockManagementPage.getFromDate().clear({ force: true })
  stockManagementPage.getFromDate().type(this.data10.date.fromdate, { force: true })

  stockManagementPage.getToDate().clear({ force: true })
  stockManagementPage.getToDate().type(this.data10.date.todate, { force: true })
  stockManagementPage.getStockEnqLoadDetailsStatuses().select(this.data10.stockEnq_loadDetails_status.value, { force: true })

  //  cy.Enqstatus()
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

  // cy.selectUserType()
})


And('Enter MSISDN,Provider,Wallet Type,Reference Number and Remarks', function () {

    cy.getSubscriberMobileNumber()
  cy.reimbursementproviders()
  cy.wait(3000)
  stockManagementPage.getWalletTypes().select(this.data10.wallettype.value, { force: true })

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
  stockManagementPage.getWithdrawConfirmDisplayAmount().type(amount, { force: true })
  stockManagementPage.getWithdrawconfirmDisplayButn().click({ force: true })
  cy.wait(3000)
  stockManagementPage.getReimbursementMessage().should('contain.text', this.data10.reimbursementinitiated)

})


//---------------------------Login with another Admin credentials for reimbursement approval------------------------------------


When('Click on Stock management and stock reimbursement approval', function () {

  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getStockReimbursementApproval().click()
})

And('Select the initiated stock reimbursement request', function () {
  cy.wait(3000)
  stockManagementPage.getReimbursementApproval().check();
})
And('Click on approve submit', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawlActionApprovalButtonSubmit().click({ force: true })
})
Then('click on approve button', function () {
  cy.wait(3000)
  stockManagementPage.getConfirmApprove().click({ force: true })
  cy.wait(3000)
  stockManagementPage.getReimbursementApproveMessage().should('contain.text', this.data10.stockReimbursementApproval)

})

//------------------------- Error Messages------------------------------

//---------TC_171-------To verify that proper error message should be displayed when no stock is present in wallet
When('Navigate to Stock Management and Stock Withdrawal', function () {

  stockManagementPage.getStockManagement().scrollIntoView()
  stockManagementPage.getStockManagement().click()
  stockManagementPage.getStockWithdraw().click()
})

And('User Select Stock Withdraw Wallet Type', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawWalletType().select('IND01', { force: true })
  stockManagementPage.getWithdrawAvailableBalance().click({ force: true })
})
And('User Should select Stock Withdraw Bank', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawBankNames().select(this.data10.selectBank.bankname, { force: true })

  // cy.selectbank()
})
And('User Should Enter Stock Withdraw Bank Account Number', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawBankAccountNumbes().select(this.data10.bankaccnumber.number, { force: true })

  //cy.bankaccountnumber()
})
And('User Should Enter Stock Withdraw Amount', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawAmount().type(amount1, { force: true })
})
Then('User Click on Stock Withdraw Submit button', function () {
  cy.wait(3000)
  stockManagementPage.getStockWithdrawButtonSubmit().click({ force: true })
  cy.wait(6000)
  stockManagementPage.getStockWithdrwErrorMessage().should('have.text', this.data10.stockwithdrawerrormessage)
})


//---------TC_172------To verify that proper error message should be displayed when amount field contains any invalid character

And('User Should Enter Stock Withdraw invalid Amount', function () {
  cy.wait(3000)
  stockManagementPage.getWithdrawAmount().type(testname, { force: true })
})
Then('User Click on Stock Withdraw invalid Amount Submit button', function () {

  stockManagementPage.getStockWithdrawButtonSubmit().click({ force: true })
  cy.wait(3000)
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
  cy.wait(3000)
  stockManagementPage.getStockInitErrorMessage().should('have.text', this.data10.stockInitErrorMessage)

})
