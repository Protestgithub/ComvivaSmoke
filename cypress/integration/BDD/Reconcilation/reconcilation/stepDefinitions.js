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
import Reconcilation from '../../../../support/pageObjects/Reconcilation/Reconcilation';

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
const ReconPage = new Reconcilation()

Before(() => {
    cy.fixture('login').then(function (data1) {
        this.data1 = data1;

    })
    cy.fixture('UserManagement').then(function (data2) {
        this.data2 = data2;
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
  And('Click on Reconcilation', function () {
    welcomePage.getreconcilationpage().click({ force: true })
    cy.wait(4000)
    ReconPage.getcolumn().within(function () {
        cy.wait(2000)
        cy.getprovider()
    })
    ReconPage.getsubmit().click({ force: true })

})

