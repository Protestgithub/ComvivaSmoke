

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
import Approval from '../../../../support/pageObjects/TransferRules/Approval';
import O2C from '../../../../support/pageObjects/TransferRules/O2C';
import O2CTransferInitiate from '../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';
import DownloadAmb from '../../../../support/pageObjects/AmbiguousTransaction/DownloadAmb';
import BulkSettlement from '../../../../support/pageObjects/AmbiguousTransaction/BulkSettlement';


//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
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
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })

  cy.fixture('TransferRules').then(function (data3) {
    this.data3 = data3;
  })
  cy.fixture('Domain&CategoryManagement').then(function (data4) {
    this.data4 = data4;
  })
  cy.fixture('OperatorToChannel').then(function (data5) {
    this.data5 = data5;
  })
  cy.fixture('AmbOrderTransaction').then(function (data6) {
    this.data6 = data6;
  })

});


//----------------Test Scripts---------------------------------------------------------------

//----------------Launch Mobiquity Portal URL and Login--------------------------------------
Given('Login into Mobiquity Portal as System admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin User2', function () {
  cy.wait(2000)
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
When('User Click on Transfer Rule.', function () {
  cy.wait(2000)
  welcomePage.getTransferRuleOption().click()
  cy.wait(2000)
  welcomePage.getTransferRule().click()
  cy.wait(2000)
})
//---------------------------creation ---------------

And('Select the Service Name and from detailss.', function () {


  cy.wait(2000)

  transferrulepage.getServiceName().select(this.data3.TransferRuleDataCreation.servicename, { force: true })
  cy.wait(4000)
  //cy.mfsprovider()
  transferrulepage.getFromMFSProvider().select(this.data3.TransferRuleDataCreation.FromMFSprovider, { force: true })
  transferrulepage.getFromeDomain().select(this.data3.TransferRuleDataCreation.FromDomain, { force: true })
  transferrulepage.getFromPaymentInstrument().select(this.data3.TransferRuleDataCreation.FromPaymentInstrument, { force: true })
  transferrulepage.getFromWallettype().select(this.data3.TransferRuleDataCreation.FromWallet, { force: true })
})


And('Select the To detailss.', function () {

  cy.wait(2000)

  transferrulepage.getToMFSProvider().select(this.data3.TransferRuleDataCreation.ToMFSprovider, { force: true })
  transferrulepage.getToDomain().select(this.data3.TransferRuleDataCreation.ToDomain, { force: true })
  cy.wait(2000)
  transferrulepage.getToPaymentInstrument().select(this.data3.TransferRuleDataCreation.ToPaymentInstrument, { force: true })
  transferrulepage.getToWallettype().select(this.data3.TransferRuleDataCreation.ToWallet, { force: true })


  transferrulepage.getSubmitbttn().click()
  cy.wait(2000)
})
And('Select the From & To categoryy.', function () {

  cy.wait(2000)

  transferrulepage.getFromCategory().select(this.data3.TransferRuleDataCreation.FromCategory, { force: true })
  transferrulepage.getToCategory().select(this.data3.TransferRuleDataCreation.ToCategory, { force: true })

  transferrulepage.getFromGrade().select(this.data3.TransferRuleDataCreation.FromGrade, { force: true })
  transferrulepage.getToGrade().select(this.data3.TransferRuleDataCreation.ToGrade, { force: true })

})
//-----------------------------------------------------------------------------------
When('User Click on Transfer Rule.', function () {
  cy.wait(2000)
  welcomePage.getTransferRuleOption().click()
  cy.wait(2000)
  welcomePage.getTransferRule().click()
  cy.wait(2000)
})

And('Select the Service Name and from details.', function () {


  cy.wait(2000)

  transferrulepage.getServiceName().select(this.data3.TransferRuleData.servicename, { force: true })
  cy.wait(4000)
  //cy.mfsprovider()
  transferrulepage.getFromMFSProvider().select(this.data3.TransferRuleData.FromMFSprovider, { force: true })
  transferrulepage.getFromeDomain().select(this.data3.TransferRuleData.FromDomain, { force: true })
  transferrulepage.getFromPaymentInstrument().select(this.data3.TransferRuleData.FromPaymentInstrument, { force: true })
  transferrulepage.getFromWallettype().select(this.data3.TransferRuleData.FromWallet, { force: true })
})


And('Select the To details.', function () {

  cy.wait(2000)

  transferrulepage.getToMFSProvider().select(this.data3.TransferRuleData.ToMFSprovider, { force: true })
  transferrulepage.getToDomain().select(this.data3.TransferRuleData.ToDomain, { force: true })
  transferrulepage.getToPaymentInstrument().select(this.data3.TransferRuleData.ToPaymentInstrument, { force: true })
  transferrulepage.getToWallettype().select(this.data3.TransferRuleData.ToWallet, { force: true })


  transferrulepage.getSubmitbttn().click()
  cy.wait(2000)
})
And('Select the From & To category.', function () {

  cy.wait(2000)

  transferrulepage.getFromCategory().select(this.data3.TransferRuleData.FromCategory, { force: true })
  transferrulepage.getToCategory().select(this.data3.TransferRuleData.ToCategory, { force: true })

  transferrulepage.getFromGrade().select(this.data3.TransferRuleData.FromGrade, { force: true })
  transferrulepage.getToGrade().select(this.data3.TransferRuleData.ToGrade, { force: true })

})
When('Click on Add Transfer Rule button.', function () {

  cy.wait(2000)

  transferrulepage.getAddToTransferbttn().click()
})
And('Select Status,Fixed Trf Level,Transfer type,Geographical Domain and Controlled Trf Level', function () {

  cy.wait(2000)

  transferrulepage.getStatus().select(this.data3.TransferRuleData.Status, { force: true })
  transferrulepage.getTransferType().select(this.data3.TransferRuleData.TransferType, { force: true })
  transferrulepage.getGeographicalDomain().select(this.data3.TransferRuleData.GeographicalDomain, { force: true })
})
Then('Click on submit button.', function () {

  cy.wait(2000)

  transferrulepage.getSubmitbttn2().click()
})
Then('Click on confirm button.', function () {

  cy.wait(2000)

  transferrulepage.getConfirmbttn().click()
})

//------------------------------------Testcase2--------------------------------------------------//
//----------------Modify--------------------------------------//


And('Select the Service Name and from details.', function () {


  cy.wait(2000)

  transferrulepage.getServiceName().select(this.data3.TransferRuleData3.servicename, { force: true })


  transferrulepage.getFromMFSProvider().select(this.data3.TransferRuleData.FromMFSprovider, { force: true })
  transferrulepage.getFromeDomain().select(this.data3.TransferRuleData.FromDomain, { force: true })
  transferrulepage.getFromPaymentInstrument().select(this.data3.TransferRuleData.FromPaymentInstrument, { force: true })
  transferrulepage.getFromWallettype().select(this.data3.TransferRuleData.FromWallet, { force: true })
})


And('Select the To details.', function () {

  cy.wait(2000)

  transferrulepage.getToMFSProvider().select(this.data3.TransferRuleData.ToMFSprovider, { force: true })
  transferrulepage.getToDomain().select(this.data3.TransferRuleData.ToDomain, { force: true })
  transferrulepage.getToPaymentInstrument().select(this.data3.TransferRuleData.ToPaymentInstrument, { force: true })
  transferrulepage.getToWallettype().select(this.data3.TransferRuleData.ToWallet, { force: true })


  transferrulepage.getSubmitbttn().click()
  cy.wait(2000)
})
And('Select the From & To category.', function () {

  cy.wait(2000)

  transferrulepage.getFromCategory().select(this.data3.TransferRuleData.FromCategory, { force: true })
  transferrulepage.getToCategory().select(this.data3.TransferRuleData.ToCategory, { force: true })

  transferrulepage.getFromGrade().select(this.data3.TransferRuleData.FromGrade, { force: true })
  transferrulepage.getToGrade().select(this.data3.TransferRuleData.ToGrade, { force: true })

})
When('Click on Add Transfer Rule button.', function () {

  cy.wait(2000)

  transferrulepage.getAddToTransferbttn().click()
})
And('Select Status,Fixed Trf Level,Transfer type,Geographical Domain and Controlled Trf Level', function () {

  cy.wait(2000)

  transferrulepage.getStatus().select(this.data3.TransferRuleData.Status, { force: true })
  transferrulepage.getTransferType().select(this.data3.TransferRuleData.TransferType, { force: true })
  transferrulepage.getGeographicalDomain().select(this.data3.TransferRuleData.GeographicalDomain, { force: true })
})
When('User clicks on edit option.', function () {

  transferrulepage.getEditOption().click()
})
Then('Click on submit button.', function () {

  cy.wait(2000)

  transferrulepage.getSubmitbttn2().click()
})
Then('Click on confirm button.', function () {

  cy.wait(2000)

  transferrulepage.getConfirmbttn().click()
})
// --------------------------------------view-------------------------------//
When('User clicks on view option.', function () {
  transferrulepage.getViewOption().click()
  cy.wait(2000)
  transferrulepage.getBackbttn().click({ force: true })
})
//-----------------------------------------delete------------------------------//
When('User clicks on Delete option.', function () {

  transferrulepage.getDeleteoption().click()
  cy.on('window:confirm', function () {

    return true
  })


})
//----------------------------suspend-----------------------------//

And('Select the Service Name and from detailsss.', function () {


  cy.wait(2000)

  transferrulepage.getServiceName().select(this.data3.TransferRuleDataSuspend.servicename, { force: true })
  cy.wait(4000)
  //cy.mfsprovider()
  transferrulepage.getFromMFSProvider().select(this.data3.TransferRuleDataSuspend.FromMFSprovider, { force: true })
  transferrulepage.getFromeDomain().select(this.data3.TransferRuleDataSuspend.FromDomain, { force: true })
  transferrulepage.getFromPaymentInstrument().select(this.data3.TransferRuleDataSuspend.FromPaymentInstrument, { force: true })
  transferrulepage.getFromWallettype().select(this.data3.TransferRuleDataSuspend.FromWallet, { force: true })
})


And('Select the To detailsss.', function () {

  cy.wait(2000)

  transferrulepage.getToMFSProvider().select(this.data3.TransferRuleDataSuspend.ToMFSprovider, { force: true })
  transferrulepage.getToDomain().select(this.data3.TransferRuleDataSuspend.ToDomain, { force: true })
  cy.wait(2000)
  transferrulepage.getToPaymentInstrument().select(this.data3.TransferRuleDataSuspend.ToPaymentInstrument, { force: true })
  transferrulepage.getToWallettype().select(this.data3.TransferRuleDataSuspend.ToWallet, { force: true })


  transferrulepage.getSubmitbttn().click()
  cy.wait(2000)
})
And('Select the From & To categoryyy.', function () {

  cy.wait(2000)

  transferrulepage.getFromCategory().select(this.data3.TransferRuleDataSuspend.FromCategory, { force: true })
  transferrulepage.getToCategory().select(this.data3.TransferRuleDataSuspend.ToCategory, { force: true })

  transferrulepage.getFromGrade().select(this.data3.TransferRuleDataSuspend.FromGrade, { force: true })
  transferrulepage.getToGrade().select(this.data3.TransferRuleDataSuspend.ToGrade, { force: true })

})
And('Suspend the status in transfer rule', function () {
  cy.wait(2000)

  transferrulepage.getStatus().select(this.data3.TransferRuleData.Status1, { force: true })
  transferrulepage.getTransferType().select(this.data3.TransferRuleData.TransferType, { force: true })
  transferrulepage.getGeographicalDomain().select(this.data3.TransferRuleData.GeographicalDomain, { force: true })
})

//----------------------------Transferrule approval----------------------------//
When('User clicks on transfer rule approval', function () {

  cy.wait(2000)
  welcomePage.getTransferRuleOption().click()
  welcomePage.getTransferRuleApproval().click()
  cy.wait(2000)
  transferruleapprovalpage.getTransferRule()
})
And('Select rule and approve', function () {
  cy.wait(3000)
  // transferruleapprovalpage.getFirstApproval().contains("Approve").click()
})
Then('click on submit', function () {
  cy.wait(2000)
  //  transferruleapprovalpage.getSubmitbttn().click()
})

//-------------------O2C transfer rules--------------------------------------------//
When('User clicks on O2C transfer rules', function () {
  cy.wait(2000)
  welcomePage.getTransferRuleOption().click()
  welcomePage.getO2CTransferRule().click()
})
And('Select Domain Name.', function () {
  cy.wait(2000)
  transferrulepageO2C.getDomainName().select(this.data3.O2CData.DoaminName, { force: true })
})
And('Select Category Name.', function () {
  transferrulepageO2C.getCategoryName().select(this.data3.O2CData.CategoryName, { force: true })
})
And('Select MFS Provider,Payment Instrument.', function () {
  transferrulepageO2C.getMFSprovider().select(this.data3.O2CData.MFSProvider, { force: true })
  transferrulepageO2C.getPaymentInstrument().select(this.data3.O2CData.Payement, { force: true })
  transferrulepageO2C.getLinkedBank().select(this.data3.O2CData.LinkedBank, { force: true })
})
Then('Enter First Approval Limit.', function () {
  transferrulepageO2C.getFirstApprovalLimit().type(this.data3.O2CData.FirstApproval, { force: true })
})
And('Click on submit.', function () {
  transferrulepageO2C.getSubmitbtn().click()
})
And('Click on confirm.', function () {
  cy.wait(2000)
  transferrulepageO2C.getconfirmbtn().click()
})



//-------------------------------------Narendra-----------------------------------------------

//--------------------------------------TC_163-----------------------------------------------
And('Confirm the Error Message', function () {
  cy.wait(2000)
  transferrulepage.getErrorMessage().should('have.text', this.data3.TransferRuleData.ErrorMessage)
  cy.wait(2000)
})

//------------------------------------TC_164----------------------------------------------

Then('Enter First Approval Limit', function () {
  transferrulepageO2C.getFirstApprovalLimit().type(this.data3.O2CData.FirstApproval, { force: true })
  transferrulepageO2C.getAmount().type(getRandomName(), { force: true })
})

And('confirm the displayed Error Message', function () {
  cy.wait(2000)
  transferrulepage.getErrorMessage().should('have.text', this.data3.O2CData.ErrorMessage)
  cy.wait(1000)
})

