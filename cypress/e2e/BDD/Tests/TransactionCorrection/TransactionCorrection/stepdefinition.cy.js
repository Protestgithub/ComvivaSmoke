/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/utils/Generic";
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import TransactionCorrection from '../../../../../support/pageObjects/TransactionCorrection';


//----------------Object Declaration-----------------------------------------------------------------

const manageUsersPage = new manageUsers()
const pageLogin = new loginPage()
const welcomePage = new homePage()
const tranCorrPage = new TransactionCorrection()
var  BAMobileNumber
var TransactionFle = "cypress/fixtures/userData/cashIn&cashout.json"
var TransactionFleO2C = "cypress/fixtures/userData/TransactionFile.json"

///////////////////// KALYANI /////////////////////////////////

 

And('Enter Mobile number or KYC number', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  var O2CFile = "cypress/fixtures/userData/O2Cdata.json"
  cy.readFile(O2CFile).then((data) => {
    BAMobileNumber = data.O2CMsisdn1
    manageUsersPage.getSearchUser().type(BAMobileNumber, { force: true })
  })
  //cy.intercept('/mobiquitypay/v1/ums/user/search?searchValue').as('all')
  manageUsersPage.getSearchUserButton().click({ force: true })
  //cy.checkAPI('/mobiquitypay/v1/ums/user/search?searchValue')
})

And('User Click on eye button for WalletHistory', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
  manageUsersPage.getexpandmore().click({ force: true })
  manageUsersPage.getwallet().click({ force: true })
  //manageUsersPage.getFilter().click({force:true})
  //manageUsersPage.getradiostatus().contains(this.data10.Status).click({force:true})
  //manageUsersPage.getcheckbox1().contains(this.data10.ServiceType1).click({force:true})
  // manageUsersPage.getcheckbox1().contains(this.data10.ServiceType2).click({force:true})
  //  manageUsersPage.getcheckbox1().contains(this.data10.ServiceType3).click({force:true})
  //  manageUsersPage.getservice().type('T')
  cy.wait(3000)
  // manageUsersPage.getTransactionCorrection().contains(this.data10.ServiceType4).click({force:true})
  // manageUsersPage.getApplyFilterButton().click({force:true})

  cy.readFile(TransactionFle).then((data) => {
    const TransactionID = data.cashinTransactionID
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
  //cy.intercept('/mobiquitypay/serviceRequest/TXNCORRECT').as('all')
  manageUsersPage.getReverYes().click({ force: true })
  //cy.checkAPI('/mobiquitypay/serviceRequest/TXNCORRECT')
  cy.wait(10000)
  manageUsersPage.getintiatedmessage().should('have.text',this.data21.initiatedMessage)
  /* manageUsersPage.gettransactionId().eq(1).then((data=>{
     
      var transid = data.text()
      cy.writeFile(TransactionFile,{TransactionId : transid })
      cy.log(transid)   
     
     }))  */

})
And('User Click on eye button for WalletHistory1', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
  manageUsersPage.getexpandmore().click({ force: true })
  manageUsersPage.getwallet().click({ force: true })
  // manageUsersPage.getFilter().click({force:true})
  //manageUsersPage.getradiostatus().contains(this.data10.Status).click({force:true})
  /* manageUsersPage.getcheckbox1().contains(this.data10.ServiceType1).click({force:true})
   manageUsersPage.getcheckbox1().contains(this.data10.ServiceType2).click({force:true})
   manageUsersPage.getcheckbox1().contains(this.data10.ServiceType3).click({force:true})
   manageUsersPage.getservice().type('T')
   cy.wait(3000)
   manageUsersPage.getTransactionCorrection().contains(this.data10.ServiceType4).click({force:true})*/
  //manageUsersPage.getApplyFilterButton().click({force:true})
  //manageUsersPage.getSearchTransactionId().type(this.data10.TransactionId2)
  cy.readFile(TransactionFleO2C).then((data) => {
    const TransactionID1 = data.TransactionID
    cy.log(TransactionID1)
    manageUsersPage.getSearchTransactionId().type(TransactionID1)
    manageUsersPage.getserachicon().click({ force: true })
  })
  cy.wait(3000)
  manageUsersPage.getreversetransaction().eq(0).click()
  manageUsersPage.getreason().type('NIL')
  //manageUsersPage.getreverseservicecharge().click({ force: true })
  cy.wait(2000)
  //cy.intercept('/mobiquitypay/serviceRequest/TXNCORRECT').as('all')
  manageUsersPage.getReverYes().click({ force: true })
  //cy.checkAPI('/mobiquitypay/serviceRequest/TXNCORRECT')
  cy.wait(10000)
  /* manageUsersPage.gettransactionId().eq(1).then((data=>{
     
     var transid = data.text()
     cy.writeFile(TransactionFile,{TransactionId : transid })
     cy.log(transid)   
    
    }))*/
    manageUsersPage.getintiatedmessage().should('have.text',this.data21.initiatedMessage)

})

When('Navigate to Transaction Correction and click on Transaction Approval', function () {
  welcomePage.getTransactionCorrection().click()
  welcomePage.getTransactionCorrectionApproval().click()
  cy.wait(3000)
  tranCorrPage.getcolumn().within(function () {
    cy.wait(3000)
    cy.readFile(TransactionFle).then((data) => {
      var transID = data.cashinTransactionID
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
  cy.wait(10000)
  tranCorrPage.getsuccessmessage().contains(this.data21.successmessage)
  
cy.TransactionCorrectionIDWriteData()
})



//---------------------------------------------System Admin Login----------------------------------------------------


//------------------------------------TC_186-------------------------------------------------

When('Navigate to Transaction Correction and click on Transaction Approval1', function () {
  welcomePage.getTransactionCorrection().click()
  welcomePage.getTransactionCorrectionApproval().click()
  cy.wait(3000)
  tranCorrPage.getcolumn().within(function () {
    cy.wait(3000)
    cy.readFile(TransactionFleO2C).then((data) => {
      var transID1 = data.TransactionID
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
  cy.wait(10000)
  tranCorrPage.getsuccessmessage().contains(this.data21.successmessage)
  
cy.TransactionCorrectionIDWriteData1()
})
