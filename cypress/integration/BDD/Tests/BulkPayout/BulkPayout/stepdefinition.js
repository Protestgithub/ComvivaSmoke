/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import Approval from '../../../../../support/pageObjects/TransferRules/Approval';
import BulkPayout from '../../../../../support/pageObjects/BulkPayout';
import O2CTransferInitiate from '../../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';


//----------------Object Declaration-----------------------------------------------------------------

const welcomePage = new homePage()
const O2CTransferInitiatePage = new O2CTransferInitiate()
const BptPage = new BulkPayout()
const TransferRuleApproval = new Approval()
const transferruleapprovalpage = new Approval()

var CsvFile = 'cypress/fixtures/templates/BULK_O2C-template.csv';
var JsonFile = 'cypress/fixtures/BulkData/BULK_O2C-template.json';
const uuid = () => Cypress._.random(1e3)
var TransferAmount = uuid()
var ReferenceNumber = uuid()
var number = uuid()
var name
var BusinessMoBileData = "userData/BusinessUsersData.json"
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {

  cy.fixture(BusinessMoBileData).then(function (data6) {
    this.data6 = data6;

  })

  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })

  cy.fixture('bulkdata.json').then(function (data9) {
    this.data9 = data9
  })

  cy.fixture('userData/O2CBulkData.json').then(function (data7) {
    this.data7 = data7
  })

  cy.fixture('OperatorToChannel').then(function (data5) {
    this.data5 = data5;
  })

  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
  })

});
-
  //----------------Test Scripts---------------------------------------------------------------------------

  //--------------------------User Management--------------------------------------------------------------

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
  


//------------------------SC_53------------------------------------------------------------------------



//----------------Test Scripts---------------------------------------------------------------


When('Navigate to Operator to channel and click on O2C transfer initiate', function () {
  welcomePage.getOperatorToChannelOption().scrollIntoView()
  welcomePage.getOperatorToChannelOption().click()
  cy.intercept(this.data20.O2CTransferInitiate).as('getO2CTransferInitiate')
  welcomePage.getO2CTransferInitiateOption().click()
  cy.wait('@getO2CTransferInitiate')
})

And('Enter All the Mandatory Details', function () {
  var BBAFile = "cypress/fixtures/userData/BusinessUsersDataO2C.json"
  var O2CFile = "cypress/fixtures/userData/O2Cdata.json"
  cy.readFile(BBAFile).then((data) => {
    var O2CMsisdn = data.registeredMobileO2C
    O2CTransferInitiatePage.getMSISDN().type(O2CMsisdn, { force: true })
    data.O2CMsisdn1 = O2CMsisdn
    cy.writeFile(O2CFile, data)
  })
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
  O2CTransferInitiatePage.getTransferAmount().type(TransferAmount, { force: true })
  cy.readFile('cypress/fixtures/userData/O2CBulkData.json').then((data) => {
    data.TransferAmt = TransferAmount
    cy.writeFile('cypress/fixtures/userData/O2CBulkData.json', data)
  })
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  cy.readFile('cypress/fixtures/userData/O2CBulkData.json').then((data) => {
    data.RefNum = ReferenceNumber
    cy.writeFile('cypress/fixtures/userData/O2CBulkData.json', data)
  })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })
})


And('logout the user', function () {
  welcomePage.getProfileIcon().click()
  welcomePage.getLogOutbttn().click()
  welcomePage.getLogOutYesbttn().click()
})

When('Navigate to Operator to channel and click on O2C transfer Approval1', function () {
  welcomePage.getOperatorToChannelOption().scrollIntoView()
  welcomePage.getOperatorToChannelOption().click()
  cy.intercept(this.data20.OperatorToChannel).as('getApproval1')
  welcomePage.getOperatorToChannelApproval1().click()
  cy.wait('@getApproval1')
  O2CTransferInitiatePage.getRecentDatainO2C()
  cy.intercept(this.data20.submitbttn).as('getsubmittransfer')
  TransferRuleApproval.getsubmitbttnTransferrule().click({ force: true })
  cy.wait('@getsubmittransfer')
  transferruleapprovalpage.getApprovalTransferrule().click({ force: true })
})

Then('Click on submit and Confirm2', function () {
  cy.intercept(this.data20.SubmitButton).as('getsubmit')
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait('@getsubmit')
  cy.intercept(this.data20.ConfirmButton).as('getConfirmButton')
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait('@getConfirmButton')
})

When('Click on BulkPayout tool', function () {
  BptPage.getBulkPayoutLink().click({ force: true })
})

And('Click on Bulk Payout Initiate', function () {
  BptPage.getBulkPayoutInitiateLink().click({ force: true })
  cy.wait(10000)
})
And('Select service from dropdown list', function () {

  BptPage.getServicename().select(this.data2.personalInfo.ServiceName, { force: true })
})
And('Download a blank .csv file from Download a File template link', function () {
  BptPage.getDownloadTemplate().click({ force: true })
  cy.waitUntil(() => {
    return cy.iframe().find('button.btn.waves-effect.waves-light.submitBtn').should('be.visible', { force: true })
  })
})
And('Enter Common Remarks', function () {
  BptPage.getRemark().click({ force: true }).type('testing user1234')
  cy.csvToJSON(CsvFile, JsonFile)
})

Then('update the json data', function () {
  cy.readFile("cypress/fixtures/BulkData/BULK_O2C-template.json").then((data) => {
    data['Serial Number*'] = this.data9.SerialNumber,
      data['MFS Provider*'] = this.data9.MFSProvider,
      data['Receiver SVA Type ID*'] = this.data9.ReceiverSVATypeID,
      data['Receiver Mobile Number*'] = this.data6.registeredMobile,
      data['Amount*'] = this.data7.TransferAmt,
      data['Transfer Date*'] = this.data9.TransferDate,
      data['Payment Type*'] = this.data9.PaymentType,
      data['Reference number*'] = this.data7.RefNum,
      data['Remarks*'] = this.data9.Remarks,
      data['Payment Number'] = this.data9.PaymentNumber,
      data['Payment Date'] = this.data9.PaymentDate,
      data['Individual Remarks'] = this.data9.IndividualRemarks,
      data['Additional Parameter 1'] = ""
    data['Additional Parameter 2'] = ""
    data['Additional Parameter 3'] = ""
    data['Additional Parameter 4'] = ""
    data['Additional Parameter 5'] = ""
    data['Additional Parameter 6'] = ""
    data['Additional Parameter 7'] = ""
    data['Additional Parameter 8'] = ""
    data['Additional Parameter 9'] = ""
    data['Additional Parameter 10'] = ""
    cy.writeFile("cypress/fixtures/BulkData/BULK_O2C-template.json", data)
  })
})
And('Upload a .csv file with valid details', function () {
  cy.jsonToCSV(JsonFile, CsvFile)
  BptPage.getUploadLink().attachFile('templates/BULK_O2C-template.csv')
  cy.intercept(this.data20.Submit).as('getsubmit')
  BptPage.getSubmit().dblclick({ force: true })
  cy.wait('@getsubmit')
  BptPage.getTextBox().then(($btn) => {
    const txt = $btn.text()
    cy.log(txt)
  })
})

And('Click on Bulk Payout Approval link.', function () {
  BptPage.getBulkApprove().click({ force: true })
  cy.wait(5000)
})

And('Select initiated service.', function () {
  BptPage.getBulkInitiatedBy().click({ force: true })
})

And('Click on Approve button.', function () {
  BptPage.getBulkApproveButton().click({ force: true })
})

And('Click on Bulk Payout Dashboard', function () {
  BptPage.getBulkDashboard().click({ force: true })
})

And('Click on number of entries', function () {
  cy.wait(10000)
  BptPage.getNumberOfEntries().dblclick({ force: true })
  cy.waitUntil(() => {
    return cy.iframe().find('span.primary-color').eq(0).should('be.visible', { force: true })
  })
})

Then('Verify Batch Id', function () {
  BptPage.getBatchIDFromBox().invoke('text').then((elementText1) => {
    expect(elementText1).to.contain('BA')
  })
})

Then('Verify success', function () {
  BptPage.getSuccessAsOne().invoke('text').then((elementText) => {
    expect(elementText).to.contain('1')
  })
})