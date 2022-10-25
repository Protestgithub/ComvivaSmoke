/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/utils/Generic";
import BulkPayout from '../../../../../support/pageObjects/BulkPayout';
import O2CTransferInitiate from '../../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';
import Approval from '../../../../../support/pageObjects/TransferRules/Approval';


//----------------Object Declaration-----------------------------------------------------------------

const welcomePage = new homePage()
const O2CTransferInitiatePage = new O2CTransferInitiate()
const BptPage = new BulkPayout()
const TransferRuleApproval = new Approval()
var CsvFile = 'cypress/fixtures/templates/BULK_O2C-template.csv';
var JsonFile = 'cypress/fixtures/BulkData/BULK_O2C-template.json';
const uid = () => Cypress._.random(1e10)
const uuid = () => Cypress._.random(1e5)
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

//----------------Test Scripts---------------------------------------------------------------------------
//----------------BDD Hooks------------------------
Before(() => {
  cy.fixture('TransferControlProfile').then(function (data5) {
    this.data5 = data5;
  })

  cy.fixture('bulkdata').then(function (data009) {
    this.data009 = data009;
  })

  cy.fixture('userData/BusinessUsersData').then(function (data006) {
    this.data006 = data006;
  })

  cy.fixture('userData/O2CBulkData').then(function (data007) {
    this.data007 = data007;
  })

});
//--------------------------User Management--------------------------------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------
//------------------------SC_53------------------------------------------------------------------------


//----------------Test Scripts---------------------------------------------------------------



And('Enter All the Mandatory Details for bulkpayout', function () {
  cy.wait(3000)
  var BBAFile = "cypress/fixtures/userData/BusinessUsersDataO2C.json"
  var O2CFile = "cypress/fixtures/userData/O2Cdata.json"
  cy.readFile(BBAFile).then((data) => {
    var O2CMsisdn = data.registeredMobileO2C
    //O2CTransferInitiatePage.getMSISDN().type("7735575036", {force: true})

    O2CTransferInitiatePage.getMSISDN().type(O2CMsisdn, { force: true })
    data.O2CMsisdn1 = O2CMsisdn
    cy.writeFile(O2CFile, data)
  })
  cy.wait(6000)



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
  cy.wait(2000)
  welcomePage.getLogOutbttn().click()
  cy.wait(2000)
  welcomePage.getLogOutYesbttn().click()
})

When('Navigate to Operator to channel and click on O2C transfer Approval1', function () {
  welcomePage.getOperatorToChannelOption().scrollIntoView()
  welcomePage.getOperatorToChannelOption().click()
  welcomePage.getOperatorToChannelApproval1().click()
  cy.wait(4000)
  O2CTransferInitiatePage.getRecentDatainO2C()
  TransferRuleApproval.getsubmitbttnTransferrule().click({ force: true })
  cy.wait(2000)
  TransferRuleApproval.getApprovalTransferrule().click({ force: true })
})

When('Navigate to Operator to channel and click on O2C transfer initiate', function () {
  welcomePage.getOperatorToChannelOption().scrollIntoView()
  welcomePage.getOperatorToChannelOption().click()
  welcomePage.getO2CTransferInitiateOption().click()
  cy.wait(2000)

})

Then('Click on submit and Confirm2 for bulk', function () {

  cy.wait(3000)
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(6000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(9000)
  //cy.O2CTransactionWriteData2()
})


When('Click on BulkPayout tool', function () {
  BptPage.getBulkPayoutLink().click({ force: true })
})

And('Click on Bulk Payout Initiate', function () {
  cy.intercept('/CoreWeb/nayapaisa/bulk-api/jigsaw/bulk/payoutServices/payout').as('all')
  BptPage.getBulkPayoutInitiateLink().click({ force: true })
  cy.checkAPI('/CoreWeb/nayapaisa/bulk-api/jigsaw/bulk/payoutServices/payout')
  cy.wait(10000)
})
And('Select service from dropdown list', function () {

  BptPage.getServicename().select(this.data2.personalInfo.ServiceName, { force: true })
})
And('Download a blank .csv file from Download a File template link', function () {
  BptPage.getDownloadTemplate().click({ force: true })
  cy.wait(10000)
})
And('Enter Common Remarks', function () {
  BptPage.getRemark().click({ force: true }).type('testing user1234')
  cy.csvToJSON(CsvFile, JsonFile)
})





// console.log(result)

Then('update the json data for initiate the Bulk Payout', function () {

  cy.readFile("cypress/fixtures/BulkData/BULK_O2C-template.json").then((data) => {

    data['Serial Number*'] = this.data009.SerialNumber,
      data['MFS Provider*'] = this.data009.MFSProvider,
      data['Receiver SVA Type ID*'] = this.data009.ReceiverSVATypeID,
      data['Receiver Mobile Number*'] = this.data006.registeredMobile,
      data['Amount*'] = this.data007.TransferAmt,
      data['Transfer Date*'] = this.data009.TransferDate,
      data['Payment Type*'] = this.data009.PaymentType,
      data['Reference number*'] = this.data007.RefNum,
      data['Remarks*'] = this.data009.Remarks,
      data['Payment Number'] = this.data009.PaymentNumber,
      data['Payment Date'] = this.data009.PaymentDate,
      data['Individual Remarks'] = this.data009.IndividualRemarks,
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
  cy.wait(10000)
  cy.intercept('/CoreWeb/nayapaisa/bulk-api/jigsaw/bulk/status/').as('all')
  BptPage.getSubmit().dblclick({ force: true })
  cy.checkAPI('/CoreWeb/nayapaisa/bulk-api/jigsaw/bulk/status/')
  cy.wait(10000)
  /*BptPage.getTextBox().invoke('split',' ').its(12).as('batchID');
  cy.get('@batchID').then(id => cy.log(`batch **${id}**`))
  })*/
  BptPage.getTextBox().then(($btn) => {
    const txt = $btn.text()
    cy.log(txt)
  })


})
And('Click on Bulk Payout Approval link.', function () {
  cy.intercept('CoreWeb/nayapaisa/bulk-api/jigsaw/bulk/requests/payout/1').as('all')
  BptPage.getBulkApprove().click({ force: true })
  cy.checkAPI('CoreWeb/nayapaisa/bulk-api/jigsaw/bulk/requests/payout/1')
  cy.wait(5000)
})
And('Select initiated service.', function () {
  cy.intercept('/CoreWeb/nayapaisa/bulk-api/jigsaw/approvalRequests/bankList/101').as('all')
  BptPage.getBulkInitiatedBy().click({ force: true })
  cy.checkAPI('/CoreWeb/nayapaisa/bulk-api/jigsaw/approvalRequests/bankList/101')
})
And('Click on Approve button.', function () {
  cy.intercept('/CoreWeb/nayapaisa/bulk-api/jigsaw/serviceRequest/resume/INITIATE_BULK_UPLOAD').as('all')
  BptPage.getBulkApproveButton().click({ force: true })
  cy.checkAPI('/CoreWeb/nayapaisa/bulk-api/jigsaw/serviceRequest/resume/INITIATE_BULK_UPLOAD')
})
And('Click on Bulk Payout Dashboard', function () {
  BptPage.getBulkDashboard().click({ force: true })
})
And('Click on number of entries', function () {
  cy.intercept('/CoreWeb/nayapaisa/bulk-api/jigsaw/bulk/payoutServices/payout').as('all')
  cy.wait(10000)
  BptPage.getNumberOfEntries().dblclick({ force: true })
  cy.checkAPI('/CoreWeb/nayapaisa/bulk-api/jigsaw/bulk/payoutServices/payout')

})
Then('Verify Batch Id', function () {
  cy.wait(10000)
  BptPage.getBatchIDFromBox().invoke('text').then((elementText1) => {
    expect(elementText1).to.contain('BA')
  })
})


Then('Verify success', function () {
  cy.wait(10000)
  BptPage.getSuccessAsOne().invoke('text').then((elementText) => {
    expect(elementText).to.contain('1')
  })
})