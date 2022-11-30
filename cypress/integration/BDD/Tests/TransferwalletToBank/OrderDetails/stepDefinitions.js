/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import "../../../../../support/commands";
import "../../../../../support/BusinessUserCommands";
import "../../../../../support/subscriberCommands";
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';

//----------------Object Declaration-----------------------------------------------------------------

const manageUsersPage = new manageUsers()

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
});

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

////////////////////////////// SUDHEER ////////////////////////////////////////

//----------TC_129-------To verify that Admin user can view all the transaction details under Order details menu------------


When('Click on user management and Manage users', function () {

  manageUsersPage.getUsermanagement().scrollIntoView()
  manageUsersPage.getUsermanagement().click()
  manageUsersPage.getManageUsers().click()
})

And('Enter Mobile numberin search Menu', function () {

  cy.getBankMobNum()
})

And('Click on view Details', function () {

  manageUsersPage.getViewAllDetailsButton().click({ force: true })
})

Then('Click on order details', function () {

  manageUsersPage.getOrderDetailsButton().click({ force: true })

  manageUsersPage.getWalletExpandButton().click({ force: true })
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
})



// //---------TC_131------To verify that latest order transactions will be displayed on the first page of Order details screen.------------

Then('Click on order details for latest order transactions', function () {

  manageUsersPage.getOrderDetailsButton().click({ force: true })
  manageUsersPage.getWalletExpandButton().click({ force: true })
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  manageUsersPage.getLatestTrasanction().should('have.text', '1')
})


