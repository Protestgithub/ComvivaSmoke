/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';

import "../../../../../support/commands";
import "../../../../../support/BusinessUserCommands";
import "../../../../../support/subscriberCommands";
import { recurse } from 'cypress-recurse';
import O2CTransferInitiate from '../../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';
import TransferRulePage from '../../../../../support/pageObjects/TransferRules/TransferRulePage';
import Approval from '../../../../../support/pageObjects/TransferRules/Approval';
import TransactionCorrection from '../../../../../support/pageObjects/TransactionCorrection';

import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';

//----------------Object Declaration-----------------------------------------------------------------

const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()




//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const O2CTransferInitiatePage = new O2CTransferInitiate()
const transferrulepage = new TransferRulePage()
const transferruleapprovalpage = new Approval()
const TransferRuleApproval = new Approval()
const tranCorrPage = new TransactionCorrection()
const uid = () => Cypress._.random(1e10)
const uuid = () => Cypress._.random(1e5)
var TransferAmount = uuid()
var ReferenceNumber = uuid()
var number = uuid()
var Amount = uid()
var name, BAMobileNumber
var TransactionFleO2C = "cypress/fixtures/userData/TransactionFile.json"
var filename = "cypress/fixtures/userData/O2CBulkData.json"
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}
//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('TransactionCorrection').then(function (data6) {
    this.data6 = data6;
  })

  cy.fixture('OperatorToChannel').then(function (data5) {
    this.data5 = data5;
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
  cy.wait(2000)
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
  cy.wait(2000)
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(4000)
  cy.SysAdminlogin3()
  cy.wait(3000)
})

Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})


//------------------------------------TC_186-------------------------------------------------
When('Navigate to Operator to channel and click on O2C transfer initiate', function () {
  welcomePage.getOperatorToChannelOption().scrollIntoView()
  welcomePage.getOperatorToChannelOption().click()
  welcomePage.getO2CTransferInitiateOption().click()

})
And('Enter All the Mandatory details', function () {
  cy.wait(3000)
  O2CTransferInitiatePage.getMSISDN().type(this.data5.O2CTransferInitiate.msisdn, { force: true })
  O2CTransferInitiatePage.getTransferAmount().type(TransferAmount, { force: true })
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })

})
And('Click on submit and Confirm', function () {
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(3000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
})
Then('Confirm the Error message', function () {
  cy.wait(2000)
  O2CTransferInitiatePage.getErrorMessage().should('have.text', this.data5.O2CTransferInitiate.errorMessage, { force: true })

})

//-------------------------------------------------TC_165-----------------------------------------------------
And('Enter All the Mandatory details and type Invalid Character in Transfer amount', function () {
  cy.wait(3000)
  cy.fixture('userData/BusinessUsersData.json').then((usermobile) => {
    let BsnuserMobile = usermobile.registeredMobile
    O2CTransferInitiatePage.getMSISDN().type(BsnuserMobile, { force: true })
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
  O2CTransferInitiatePage.getTransferAmount().type(getRandomName(), { force: true })
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })
})


Then('Click on submit and Confirm Error Message', function () {
  cy.wait(2000)
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(2000)
  O2CTransferInitiatePage.getErrorMessage().should('have.text', this.data5.O2CTransferInitiate.ErrorMessage, { force: true })
})

//-------------------------------------------------TC_166-----------------------------------------------------
And('Enter All the Details', function () {
  cy.wait(3000)
  cy.fixture('userData/BusinessUsersData.json').then((usermobile) => {
    let BsnuserMobile = usermobile.registeredMobile
    O2CTransferInitiatePage.getMSISDN().type(BsnuserMobile, { force: true })
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
  O2CTransferInitiatePage.getTransferAmount().type(Amount, { force: true })
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })
})


And('Confirm the displayed Error Message', function () {
  cy.wait(3000)
  //O2CTransferInitiatePage.getErrorMessage1().should('have.text', this.data5.O2CTransferInitiate.ErrorMessage1, { force: true })
  cy.wait(2000)
})








//------------------------------------- Likith-------------------------------------------------------
When('Navigate to Operator to channel and click on O2C transfer initiate', function () {
  welcomePage.getOperatorToChannelOption().scrollIntoView()
  welcomePage.getOperatorToChannelOption().click()
  welcomePage.getO2CTransferInitiateOption().click()
})

And('Enter All the Mandatory Details', function () {
  cy.wait(3000)

  cy.wait(2000)
  var BBAFile = "cypress/fixtures/userData/BusinessUsersData.json"
  var O2CFile = "cypress/fixtures/userData/O2Cdata.json"
  cy.readFile(BBAFile).then((data) => {
    var O2CMsisdn = data.registeredMobile
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
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })

})

Then('Click on submit and Confirm', function () {
  O2CTransferInitiatePage.getSubmitButton().click({ force: true })
  cy.wait(2000)
  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
  cy.O2CTransactionWriteData()
})
//------------------------------------------------------------
When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

And('enter user mobile number and search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  var O2CFile = "cypress/fixtures/userData/O2Cdata.json"
  cy.readFile(O2CFile).then((data) => {
    var O2CMsisdn = data.O2CMsisdn1
    manageUsersPage.getSearchUser().type(O2CMsisdn, { force: true })

  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
When('User Click on eye button', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
  cy.wait(3000)
})

And('click wallet Payment history.', function () {
  manageUsersPage.getWalletHistory().contains("Wallet Payment History").click({ force: true })
})
And('Enter TransactionID and check', function () {
  cy.O2CTransactionReadData()


})
And('logout the user', function () {

  welcomePage.getProfileIcon().click()
  cy.wait(2000)
  welcomePage.getLogOutbttn().click()
  cy.wait(2000)
  welcomePage.getLogOutYesbttn().click()
})

var O2CMsisdn
And('Enter All the Mandatory Details1', function () {
  cy.wait(3000)
  cy.wait(2000)
  var BBAFile = "cypress/fixtures/userData/BusinessUsersData.json"
  var O2CFile = "cypress/fixtures/userData/O2Cdata.json"
  cy.readFile(BBAFile).then((data) => {
    O2CMsisdn = data.registeredMobile
    O2CTransferInitiatePage.getMSISDN().type("7735575036", { force: true })

    // O2CTransferInitiatePage.getMSISDN().type(O2CMsisdn, {force: true})
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
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })
  cy.writeFile(filename, { msidnValue: O2CMsisdn, TransferAmt: TransferAmount, RefNum: ReferenceNumber })



})

Then('Click on submit and Confirm00', function () {

  O2CTransferInitiatePage.getSubmitButton().click({ force: true })

  cy.wait(2000)

  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
  cy.O2CTransactionWriteData()
})

Then('Click on submit and Confirm0', function () {

  O2CTransferInitiatePage.getSubmitButton().click({ force: true })

  cy.wait(2000)

  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
  cy.O2CTransactionWriteData()
})

Then('Click on submit and Confirm1', function () {

  O2CTransferInitiatePage.getSubmitButton().click({ force: true })

  cy.wait(2000)

  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
  cy.O2CTransactionWriteData1()
})

Then('Click on submit and Confirm2', function () {

  O2CTransferInitiatePage.getSubmitButton().click({ force: true })

  cy.wait(2000)

  O2CTransferInitiatePage.getConfirmButton().click({ force: true })
  cy.wait(3000)
  cy.O2CTransactionWriteData2()
})


And('click wallet Payment history.', function () {
  manageUsersPage.getWalletHistory().contains("Wallet Payment History").click({ force: true })
})
And('Enter TransactionID and check', function () {
  cy.O2CTransactionReadData()


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
  transferruleapprovalpage.getApprovalTransferrule().click({ force: true })
})

//-------------------------O2C approal2------------------------------------
When('Navigate to Operator to channel and click on O2C transfer Approval2', function () {

  welcomePage.getOperatorToChannelOption().scrollIntoView()

  welcomePage.getOperatorToChannelOption().click()

  welcomePage.getOperatorToChannelApproval2().click()
  cy.wait(4000)
  welcomePage.getOperatorToChannelApproval2().click()
  cy.wait(4000)
  O2CTransferInitiatePage.getRecentDatainO2C()
  TransferRuleApproval.getsubmitbttnTransferrule().click({ force: true })
  cy.wait(2000)
  transferruleapprovalpage.getApprovalTransferrule().click({ force: true })
})

///////////////////// KALYANI /////////////////////////////////

And('Enter Mobile number or KYC number', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  var O2CFile = "cypress/fixtures/userData/O2Cdata.json"
  cy.readFile(O2CFile).then((data) => {
    BAMobileNumber = data.O2CMsisdn1
    manageUsersPage.getSearchUser().type(BAMobileNumber, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})

When('User Click on eye button for WalletHistory', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
  manageUsersPage.getexpandmore().click({ force: true })
  manageUsersPage.getwallet().click({ force: true })
  //manageUsersPage.getFilter().click({force:true})
  //manageUsersPage.getradiostatus().contains(this.data6.Status).click({force:true})
  //manageUsersPage.getcheckbox1().contains(this.data6.ServiceType1).click({force:true})
  // manageUsersPage.getcheckbox1().contains(this.data6.ServiceType2).click({force:true})
  //  manageUsersPage.getcheckbox1().contains(this.data6.ServiceType3).click({force:true})
  //  manageUsersPage.getservice().type('T')
  cy.wait(3000)
  // manageUsersPage.getTransactionCorrection().contains(this.data6.ServiceType4).click({force:true})
  // manageUsersPage.getApplyFilterButton().click({force:true})

  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID = data.TransactionID
    cy.log(TransactionID)
    manageUsersPage.getSearchTransactionId().type(TransactionID)
    manageUsersPage.getserachicon().click({ force: true })
  })
  // manageUsersPage.getserachicon().click({force:true})
  cy.wait(3000)
  manageUsersPage.getreversetransaction().eq(0).click()
  manageUsersPage.getreason().type('NIL')
  manageUsersPage.getreverseservicecharge().click({ force: true })
  cy.wait(2000)
  manageUsersPage.getreversecommission().click({ force: true })
  cy.wait(2000)
  manageUsersPage.getReverYes().click({ force: true })
  cy.wait(3000)
  /* manageUsersPage.gettransactionId().eq(1).then((data=>{
     
      var transid = data.text()
      cy.writeFile(TransactionFile,{TransactionId : transid })
      cy.log(transid)   
     
     }))  */

})
When('User Click on eye button for WalletHistory1', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
  manageUsersPage.getexpandmore().click({ force: true })
  manageUsersPage.getwallet().click({ force: true })
  // manageUsersPage.getFilter().click({force:true})
  //manageUsersPage.getradiostatus().contains(this.data6.Status).click({force:true})
  /* manageUsersPage.getcheckbox1().contains(this.data6.ServiceType1).click({force:true})
   manageUsersPage.getcheckbox1().contains(this.data6.ServiceType2).click({force:true})
   manageUsersPage.getcheckbox1().contains(this.data6.ServiceType3).click({force:true})
   manageUsersPage.getservice().type('T')
   cy.wait(3000)
   manageUsersPage.getTransactionCorrection().contains(this.data6.ServiceType4).click({force:true})*/
  //manageUsersPage.getApplyFilterButton().click({force:true})
  //manageUsersPage.getSearchTransactionId().type(this.data6.TransactionId2)
  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID1 = data.TransactionID1
    cy.log(TransactionID1)
    manageUsersPage.getSearchTransactionId().type(TransactionID1)
    manageUsersPage.getserachicon().click({ force: true })
  })
  cy.wait(3000)
  manageUsersPage.getreversetransaction().eq(0).click()
  manageUsersPage.getreason().type('NIL')
  manageUsersPage.getreverseservicecharge().click({ force: true })
  cy.wait(2000)
  manageUsersPage.getReverYes().click({ force: true })
  cy.wait(3000)
  /* manageUsersPage.gettransactionId().eq(1).then((data=>{
     
     var transid = data.text()
     cy.writeFile(TransactionFile,{TransactionId : transid })
     cy.log(transid)   
    
    }))*/
})
When('User Click on eye button for WalletHistory2', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
  manageUsersPage.getexpandmore().click({ force: true })
  manageUsersPage.getwallet().click({ force: true })
  // manageUsersPage.getFilter().click({force:true})
  //manageUsersPage.getradiostatus().contains(this.data6.Status).click({force:true})
  /* manageUsersPage.getcheckbox1().contains(this.data6.ServiceType1).click({force:true})
   manageUsersPage.getcheckbox1().contains(this.data6.ServiceType2).click({force:true})
   manageUsersPage.getcheckbox1().contains(this.data6.ServiceType3).click({force:true})
   manageUsersPage.getservice().type('T')
   cy.wait(3000)
   manageUsersPage.getTransactionCorrection().contains(this.data6.ServiceType4).click({force:true})*/
  //manageUsersPage.getApplyFilterButton().click({force:true})
  //manageUsersPage.getSearchTransactionId().type(this.data6.TransactionId3)
  cy.readFile(TransactionFleO2C).then((data) => {
    let TransactionID = data.TransactionID2
    cy.log(TransactionID)
    manageUsersPage.getSearchTransactionId().type(TransactionID)
    manageUsersPage.getserachicon().click({ force: true })
  })
  cy.wait(3000)
  manageUsersPage.getreversetransaction().eq(0).click()
  manageUsersPage.getreason().type('NIL')
  // manageUsersPage.getreverseservicecharge().click({ force: true })
  cy.wait(2000)
  manageUsersPage.getreversecommission().click({ force: true })
  cy.wait(2000)
  manageUsersPage.getReverYes().click({ force: true })
  cy.wait(3000)
  /* manageUsersPage.gettransactionId().eq(1).then((data=>{    
     var transid = data.text()
     cy.writeFile(TransactionFile,{TransactionId : transid })
     cy.log(transid)   
    
    })) */
})

When('Navigate to Transaction Correction and click on Transaction Approval', function () {
  welcomePage.getTransactionCorrection().click()
  welcomePage.getTransactionCorrectionApproval().click()
  cy.wait(3000)
  tranCorrPage.getcolumn().within(function () {
    cy.wait(3000)
    cy.readFile(TransactionFleO2C).then((data) => {
      var transID = data.TransactionID
      cy.log(transID)
      cy.get('td').contains(transID)

      tranCorrPage.getradiobutton().check()
      tranCorrPage.getsubmit().click({ force: true })
    })
    cy.wait(3000)

  })
  tranCorrPage.getcolumn().within(function () {
    cy.get('td').within(function () {
      tranCorrPage.getapprove().click({ force: true })
    })
  })
})
When('Navigate to Transaction Correction and click on Transaction Approval1', function () {
  welcomePage.getTransactionCorrection().click()
  welcomePage.getTransactionCorrectionApproval().click()
  cy.wait(3000)
  tranCorrPage.getcolumn().within(function () {
    cy.wait(3000)
    cy.readFile(TransactionFleO2C).then((data) => {
      var transID1 = data.TransactionID1
      cy.log(transID1)
      cy.get('td').contains(transID1)

      tranCorrPage.getradiobutton().check()
      tranCorrPage.getsubmit().click({ force: true })
    })
    cy.wait(3000)

  })
  tranCorrPage.getcolumn().within(function () {
    cy.get('td').within(function () {
      tranCorrPage.getapprove().click({ force: true })
    })
  })
})
When('Navigate to Transaction Correction and click on Transaction Approval2', function () {
  welcomePage.getTransactionCorrection().click()
  welcomePage.getTransactionCorrectionApproval().click()
  cy.wait(3000)
  tranCorrPage.getcolumn().within(function () {
    cy.wait(3000)
    cy.readFile(TransactionFleO2C).then((data) => {
      var transID2 = data.TransactionID2
      cy.log(transID2)
      cy.get('td').contains(transID2)

      tranCorrPage.getradiobutton().check()
      tranCorrPage.getsubmit().click({ force: true })
    })
    cy.wait(3000)

  })
  tranCorrPage.getcolumn().within(function () {
    cy.get('td').within(function () {
      tranCorrPage.getapprove().click({ force: true })
    })
  })
})

////////////////////////////// SUDHEER ////////////////////////////////////////

//----------TC_129-------To verify that Admin user can view all the transaction details under Order details menu------------


When('Click on user management and Manage users', function () {

  manageUsersPage.getUsermanagement().scrollIntoView()
  manageUsersPage.getUsermanagement().click()
  manageUsersPage.getManageUsers().click()
})

And('Enter Mobile numberin search Menu', function () {
  cy.wait(3000)
  cy.getBusinessUserMobNum()
})

And('Click on view Details', function () {
  cy.wait(3000)
  manageUsersPage.getViewAllDetailsButton().click({ force: true })
})

Then('Click on order details', function () {

  manageUsersPage.getOrderDetailsButton().click({ force: true })
  cy.wait(3000)

  manageUsersPage.getWalletExpandButton().click({ force: true })
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
})

//----------TC_130-------To verify that Admin user can check all the Order Details of a customer/ business users successfully------------


When('Click on user management and Manage users', function () {

  manageUsersPage.getUsermanagement().scrollIntoView()
  manageUsersPage.getUsermanagement().click()
  manageUsersPage.getManageUsers().click()
})


And('Enter Mobile number and KYC number in search menu for customer/ business users', function () {
  cy.wait(3000)

  cy.getBusinessUserMobNum()
  manageUsersPage.getBusinessUserDetail().should('have.text', ' Business')
})

And('Click on view Details', function () {
  cy.wait(3000)
  manageUsersPage.getViewAllDetailsButton().click({ force: true })
})

Then('Click on order details for customer/ business users', function () {
  cy.wait(3000)
  manageUsersPage.getOrderDetailsButton().click({ force: true })
  manageUsersPage.getOrderDetailsMessage().should('have.text', ' Manage Users  > View Details')
})

// //---------TC_131------To verify that latest order transactions will be displayed on the first page of Order details screen.------------

Then('Click on order details for latest order transactions', function () {
  cy.wait(3000)
  manageUsersPage.getOrderDetailsButton().click({ force: true })
  manageUsersPage.getWalletExpandButton().click({ force: true })
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  manageUsersPage.getLatestTrasanction().should('have.text', '1')
})


//---------TC_132-----To verify that all the wallet transactions are displayed in statement screen sucessfully.------------

And('Click on Wallet Payment History', function () {
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on expand button', function () {
  manageUsersPage.getWalletExpandButton().click({ force: true })
})

Then('Click on wallet view Details', function () {
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  manageUsersPage.getDateRangeAssert().should('contain.text', 'More Details')
})



//-------TC_133------To verify that user can able to view all the wallet transactions by entering valid transaction id.------------


And('Click on Wallet Payment History for valid transaction with id', function () {
  cy.wait(3000)
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on expand button on valid transaction with id', function () {

  manageUsersPage.getSearchTransactionId().type(this.data2.transactionid.validid, { force: true })
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})

Then('Click on view Details for wallet transactions with id', function () {
  cy.wait(3000)
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  //  cy.get('.modal-content').should('have.text', 'Transaction ID')
})






//-----TC_134-----To verify that user can able to fetch the Statement based on the transaction type (success, fail etc.)------------


And('Click on Wallet Payment History for transaction type', function () {
  cy.wait(3000)
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on filter and Select status type and Select apply', function () {
  //cy.wait(3000)
  manageUsersPage.getFilterStatementButton().click({ force: true })
  manageUsersPage.getStatus().click()
  cy.wait(3000)
  manageUsersPage.getApplyFilterButton().click({ force: true })
})
And('Click on expand button for transaction type', function () {
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})

Then('Click on view Details for transaction', function () {
  cy.wait(3000)
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })

})


//-----TC_135-------To verify that user can able to fetch the Statement based on the Date range.------------

And('Click on Wallet Payment History based on the Date', function () {
  // cy.wait(3000)
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on filter', function () {
  cy.wait(3000)
  manageUsersPage.getFilterStatementButton().click({ force: true })
})
And('Select start date and end date and  Click apply', function () {
  cy.wait(3000)

  manageUsersPage.getDatePickerStart().click({ force: true })
  manageUsersPage.getStartDate().contains(this.data2.usercalender.startday).click({ force: true })

  manageUsersPage.getDatePickerEnd().click({ force: true })
  manageUsersPage.getEndDate().contains(this.data2.usercalender.endday).click({ force: true })

  manageUsersPage.getApplyFilterButton().click({ force: true })

})

And('Click on expand button based on the Date', function () {
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})
And('Click on filter', function () {
  cy.wait(3000)
  manageUsersPage.getFilterStatementButton().click({ force: true })
})
And('Select start date and end date and  Click apply', function () {
  cy.wait(3000)

  manageUsersPage.getDatePickerStart().click({ force: true })
  manageUsersPage.getStartDate().contains(this.data2.usercalender.startday).click({ force: true })

  manageUsersPage.getDatePickerEnd().click({ force: true })
  manageUsersPage.getEndDate().contains(this.data2.usercalender.endday).click({ force: true })

  manageUsersPage.getApplyFilterButton().click({ force: true })

})
And('Click on expand button based on the Date', function () {
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})

Then('Click on view Details based on the Date range', function () {
  cy.wait(3000)
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  manageUsersPage.getDateRangeAssert().should('contain.text', 'More Details')
})
