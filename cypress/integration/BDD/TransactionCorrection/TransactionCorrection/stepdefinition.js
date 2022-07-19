/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';

import "../../../../support/commands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../support/pageObjects/UserManagement/manageUsers';
import DomainFieldspage from '../../../../support/pageObjects/DomainManagement/DomainFieldspage';
import CircularJSON from 'circular-json';
import Flatted from 'flatted';
import TransferRulePage from '../../../../support/pageObjects/TransferRules/TransferRulePage';
import TransferControlProfile from '../../../../support/pageObjects/TransferControlProfile';
import TransactionCorrection from '../../../../support/pageObjects/TransactionCorrection';
import { eq } from 'lodash';


//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const transferrulepage = new TransferRulePage()
const domainPage = new DomainFieldspage()
const tcpPage = new TransferControlProfile()
const tranCorrPage = new TransactionCorrection()
var mobile,BAMobileNumber
var ProfileName
var number
const TransactionFile ='cypress/fixtures/userData/TransactionCorrectionData.json'
var O2CData ="cypress/fixtures/userData/O2Cdata.json"

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  /* cy.fixture('TransferRules').then(function(data3)
   {
       this.data3 = data3;
   })
   cy.fixture('DomainManagement').then(function(data4)
   {
       this.data4 = data4;
   })*/
  cy.fixture('TransferControlProfile').then(function (data5) {
    this.data5 = data5;
  })
  cy.fixture('TransactionCorrection').then(function (data6) {
    this.data6 = data6;
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

Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})
When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

And('Enter Mobile number or KYC number', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  var O2CFile ="cypress/fixtures/userData/O2Cdata.json"
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
  
    cy.readFile(O2CData).then((data) => {
    const TransactionID = data.TransactionID
    cy.log(TransactionID)
  manageUsersPage.getSearchTransactionId().type(TransactionID)
  manageUsersPage.getserachicon().click({force:true})
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
  cy.readFile(O2CData).then((data) => {
    const TransactionID = data.TransactionID1
    cy.log(TransactionID)
  manageUsersPage.getSearchTransactionId().type(TransactionID)
  manageUsersPage.getserachicon().click({force:true})
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
  cy.readFile(O2CData).then((data) => {
    const TransactionID = data.TransactionID2
    cy.log(TransactionID)
  manageUsersPage.getSearchTransactionId().type(TransactionID)
  manageUsersPage.getserachicon().click({force:true})
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
  tranCorrPage.getcolumn().within(function(){
    cy.wait(3000) 
    cy.readFile(O2CData).then((data) => {
      var transID = data.TransactionID
      cy.log(transID)
        cy.get('td').contains(transID)
      
          tranCorrPage.getradiobutton().check()
          tranCorrPage.getsubmit().click({force:true})
        })
          cy.wait(3000)
           
         })
  tranCorrPage.getcolumn().within(function(){
  cy.get('td').within(function(){
    tranCorrPage.getapprove().click({force:true})
  })
  })
})
When('Navigate to Transaction Correction and click on Transaction Approval1', function () {
  welcomePage.getTransactionCorrection().click()
  welcomePage.getTransactionCorrectionApproval().click()
  cy.wait(3000)
  tranCorrPage.getcolumn().within(function(){
    cy.wait(3000)    
    cy.readFile(TransactionFile).then((data) => {
      var transID1 = data.TransactionID
      cy.log(transID1)
        cy.get('td').contains(transID1)
      
          tranCorrPage.getradiobutton().check()
          tranCorrPage.getsubmit().click({force:true})
        })
          cy.wait(3000)
           
         })
  tranCorrPage.getcolumn().within(function(){
  cy.get('td').within(function(){
    tranCorrPage.getapprove().click({force:true})
  })
  })
})
When('Navigate to Transaction Correction and click on Transaction Approval2', function () {
  welcomePage.getTransactionCorrection().click()
  welcomePage.getTransactionCorrectionApproval().click()
  cy.wait(3000)
  tranCorrPage.getcolumn().within(function(){
    cy.wait(3000)    
    cy.readFile(TransactionFile).then((data) => {
      var transID2 = data.TransactionId
      cy.log(transID2)
        cy.get('td').contains(transID2)
      
          tranCorrPage.getradiobutton().check()
          tranCorrPage.getsubmit().click({force:true})
        })
          cy.wait(3000)
           
         })
  tranCorrPage.getcolumn().within(function(){
  cy.get('td').within(function(){
    tranCorrPage.getapprove().click({force:true})
  })
  })
})