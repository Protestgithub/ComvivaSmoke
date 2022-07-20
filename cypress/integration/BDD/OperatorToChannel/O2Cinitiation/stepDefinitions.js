/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';

import "../../../../support/commands";
import O2CTransferInitiate from '../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';
import TransferRulePage from '../../../../support/pageObjects/TransferRules/TransferRulePage';
import Approval from '../../../../support/pageObjects/TransferRules/Approval';


import manageUsers from '../../../../support/pageObjects/UserManagement/manageUsers';
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';

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
const uid = () => Cypress._.random(1e10)
const uuid = () => Cypress._.random(1e5)
var TransferAmount = uuid()
var ReferenceNumber = uuid()
var number = uuid()
var Amount = uid()
var name
var filename="cypress/fixtures/userData/O2CBulkData.json"
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

  cy.fixture('OperatorToChannel').then(function (data5) {
    this.data5 = data5;
  })
    if ( Cypress.browser.isHeadless ) {
    cy.clearCookie('shouldStop')
  } else {
    cy.getCookie('shouldStop').then(cookie => {
      if (
        cookie &&
        typeof cookie === 'object' &&
        cookie.value === 'true'
      ) {
        Cypress.runner.stop();
      }
    })
  }

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
  O2CTransferInitiatePage.getTransferAmount().type(getRandomName(), { force: true })
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })
})

Then('Click on submit and Confirm Error Message', function () {
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
    O2CTransferInitiatePage.getTransferAmount().type(Amount, { force: true })
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, { force: true })
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, { force: true })
  O2CTransferInitiatePage.getNumber().type(number, { force: true })
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), { force: true })
})


And('Confirm the displayed Error Message', function () {
  cy.wait(3000)
 // O2CTransferInitiatePage.getErrorMessage1().should('have.text', this.data5.O2CTransferInitiate.ErrorMessage1, { force: true })
 // cy.wait(2000)
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
  var BBAFile ="cypress/fixtures/userData/BusinessUsersData.json"
  var O2CFile= "cypress/fixtures/userData/O2Cdata.json"
  cy.readFile(BBAFile).then((data) => {
  var O2CMsisdn = data.registeredMobile
  //O2CTransferInitiatePage.getMSISDN().type("7735575036", {force: true})

 O2CTransferInitiatePage.getMSISDN().type(O2CMsisdn, {force: true})
  data.O2CMsisdn1 =O2CMsisdn
  cy.writeFile(O2CFile, data)
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
When ('Navigate to User Management and Click on manage user', function(){
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

And ('enter user mobile number and search', function(){
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({force: true})
  var O2CFile= "cypress/fixtures/userData/O2Cdata.json"
  cy.readFile(O2CFile).then((data) => {
  var O2CMsisdn = data.O2CMsisdn1
  manageUsersPage.getSearchUser().type(O2CMsisdn, {force:true})
  
  })
  manageUsersPage.getSearchUserButton().click({force: true})

})
When('User Click on eye button', function(){
  manageUsersPage.getEyeIcon().click({force:true})
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

  O2CTransferInitiatePage.getRecentDatainO2C()
  TransferRuleApproval.getsubmitbttnTransferrule().click({ force: true })
  cy.wait(2000)
  transferruleapprovalpage.getApprovalTransferrule().click({ force: true })
})
var O2CMsisdn
      And('Enter All the Mandatory Details', function(){
        cy.wait(3000)
        cy.wait(2000)
        var BBAFile ="cypress/fixtures/userData/BusinessUsersData.json"
        var O2CFile= "cypress/fixtures/userData/O2Cdata.json"
        cy.readFile(BBAFile).then((data) => {
         O2CMsisdn = data.registeredMobile
        O2CTransferInitiatePage.getMSISDN().type(O2CMsisdn, {force: true})
        data.O2CMsisdn1 =O2CMsisdn
        cy.writeFile(O2CFile, data)
      })
              O2CTransferInitiatePage.getTransferAmount().type(TransferAmount, {force: true})
        O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, {force: true})
        O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, {force: true})
        O2CTransferInitiatePage.getNumber().type(number, {force: true})
        O2CTransferInitiatePage.getRemarks().type(getRandomName(), {force: true})
        cy.writeFile(filename,{ msidnValue:O2CMsisdn,TransferAmt:TransferAmount, RefNum:ReferenceNumber} )


      
      })
      
      Then('Click on submit and Confirm00', function(){
      
        O2CTransferInitiatePage.getSubmitButton().click({force: true})
      
        cy.wait(2000)
      
        O2CTransferInitiatePage.getConfirmButton().click({force: true})
        cy.wait(3000)
       cy.O2CTransactionWriteData()
      })

      Then('Click on submit and Confirm0', function(){
      
        O2CTransferInitiatePage.getSubmitButton().click({force: true})
      
        cy.wait(2000)
      
        O2CTransferInitiatePage.getConfirmButton().click({force: true})
        cy.wait(3000)
       cy.O2CTransactionWriteData()
      })

      Then('Click on submit and Confirm1', function(){
      
        O2CTransferInitiatePage.getSubmitButton().click({force: true})
      
        cy.wait(2000)
      
        O2CTransferInitiatePage.getConfirmButton().click({force: true})
        cy.wait(3000)
       cy.O2CTransactionWriteData1()
      })

      Then('Click on submit and Confirm2', function(){
      
        O2CTransferInitiatePage.getSubmitButton().click({force: true})
      
        cy.wait(2000)
      
        O2CTransferInitiatePage.getConfirmButton().click({force: true})
        cy.wait(3000)
       cy.O2CTransactionWriteData2()
      })


      And('click wallet Payment history.',function(){
        manageUsersPage.getWalletHistory().contains("Wallet Payment History").click({force:true})
      })
    And('Enter TransactionID and check',function(){
      cy.O2CTransactionReadData()
        
    
      })
      And('logout the user',function(){
    
        welcomePage.getProfileIcon().click()
        cy.wait(2000)
        welcomePage.getLogOutbttn().click()
        cy.wait(2000)
          welcomePage.getLogOutYesbttn().click()
      })
      When('Navigate to Operator to channel and click on O2C transfer Approval1', function(){
    
        welcomePage.getOperatorToChannelOption().scrollIntoView()
        
        welcomePage.getOperatorToChannelOption().click()
        
        welcomePage.getOperatorToChannelApproval1().click()
        cy.wait(4000)
        
        O2CTransferInitiatePage.getRecentDatainO2C()
        TransferRuleApproval.getsubmitbttnTransferrule().click({force:true})
        cy.wait(2000)
         transferruleapprovalpage.getApprovalTransferrule().click({force:true})
          })
          
     //-------------------------O2C approal2------------------------------------
     When('Navigate to Operator to channel and click on O2C transfer Approval2', function(){
    
      welcomePage.getOperatorToChannelOption().scrollIntoView()
      
      welcomePage.getOperatorToChannelOption().click()
      
      welcomePage.getOperatorToChannelApproval2().click()
      cy.wait(4000)
      
      O2CTransferInitiatePage.getRecentDatainO2C()
      TransferRuleApproval.getsubmitbttnTransferrule().click({force:true})
      cy.wait(2000)
       transferruleapprovalpage.getApprovalTransferrule().click({force:true})
        })  
      
