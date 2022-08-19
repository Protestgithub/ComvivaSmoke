/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';

import "../../../../../support/commands";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import DomainFieldspage from '../../../../../support/pageObjects/DomainManagement/DomainFieldspage';
import CircularJSON from 'circular-json';
import Flatted from 'flatted';
import TransferRulePage from '../../../../../support/pageObjects/TransferRules/TransferRulePage';
import Approval from '../../../../../support/pageObjects/TransferRules/Approval';
import O2C from '../../../../../support/pageObjects/TransferRules/O2C';
import O2CTransferInitiate from '../../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';
import DownloadAmb from '../../../../../support/pageObjects/AmbiguousTransaction/DownloadAmb';
import BulkSettlement from '../../../../../support/pageObjects/AmbiguousTransaction/BulkSettlement';
import 'cypress-file-upload';


//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage ()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const transferrulepage = new TransferRulePage()
const transferruleapprovalpage = new Approval()
const transferrulepageO2C = new O2C()
const domainPage = new DomainFieldspage()
const O2CTransferInitiatePage = new O2CTransferInitiate()
const DownloadAmbpage = new DownloadAmb()
const BulkSettlementpage = new BulkSettlement()
const TransferRuleApproval = new Approval()

var mobile


//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {      
  cy.fixture('login').then(function(data1)
   {
       this.data1 = data1;
   })
   cy.fixture('UserManagement').then(function(data2)
   {
       this.data2 = data2;
   })
   
   cy.fixture('TransferRules').then(function(data3)
   {
       this.data3 = data3;
   })
   cy.fixture('Domain&CategoryManagement').then(function(data4)
   {
       this.data4 = data4;
   })
   cy.fixture('OperatorToChannel').then(function(data5)
   {
       this.data5 = data5;
   })
   cy.fixture('AmbOrderTransaction').then(function(data6)
   {
       this.data6 = data6;
   })

});

//----------------Launch Mobiquity Portal URL and Login--------------------------------------

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
  cy.loginAgain(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
  cy.loginAgain(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)

})
Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})


//----------------------Ambiguous Transaction Management-------------------------------//
When('Click on Ambiguous Order Transaction >> Download Ambiguous Order',function(){
    welcomePage.getAmbiguousOrderTransacation().scrollIntoView()
    welcomePage.getAmbiguousOrderTransacation().click()
    welcomePage.getDownloadAmbiguousOrder().click()
  })
  And('Select Ambiguous Type and party type and party name',function(){
    cy.wait(2000)
    DownloadAmbpage.getAmbtype().select(this.data6.AmbType,{force:true})
    //cy.wait(2000)
    DownloadAmbpage.getPartyType().select(this.data6.PartyType,{force:true})
    //DownloadAmbpage.getPartyName().select()
  })
  And('Select From Date , To Date',function(){
    
    DownloadAmbpage.getFromdate().clear({force:true})
    DownloadAmbpage.getFromdate().type(this.data6.FromDate,{force:true})
    
    DownloadAmbpage.getTodate().clear({force:true})
    DownloadAmbpage.getTodate().type(this.data6.ToDate,{force:true})
    
  })
  Then('Click on Download button.',function(){
    DownloadAmbpage.getDownloadbttn().click()
  })
  //---------------------------Amb transaction upload file----------------------//
  When('Click on Ambiguous Order Transaction >> Bulk settlement initiation',function(){
    welcomePage.getAmbiguousOrderTransacation().scrollIntoView()
    welcomePage.getAmbiguousOrderTransacation().click()
    welcomePage.getBulkSettlement().click()
  })
  And('Select operation name',function(){
    cy.wait(4000)
    BulkSettlementpage.getOperatorName().select(this.data6.OperationName,{force:true})
  })
  And('Click on Download template and enter remark',function(){
    //BulkSettlementpage.getDownloadTemplate().click()
    BulkSettlementpage.getRemarks().type("remarks")
  })
  Then('Upload file',function(){
    const filepath ="AMBData.csv";
    
    BulkSettlementpage.getUploadfile().attachFile('AMBData.csv')
    cy.wait(1000)
    BulkSettlementpage.getSubmitbttn().click()
  })