/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import "../../../../../support/commands";
import "../../../../../support/BankCommands"
import walletManagement from '../../../../../support/pageObjects/WalletManagement/walletManagement';

//----------------Object Declaration-----------------------------------------------------------------

const WalletManagementPage = new walletManagement()
var filename = 'cypress/fixtures/WalletManagementdata.json'

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })

});

//--------------------------------------Login-------------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})



//------------------------------------Add Wallet------------------------------------------------------

When('Navigate Multiple Wallet Management and Click on Add Wallet', function () {
  WalletManagementPage.getMultipleWalletManagement().click()
  WalletManagementPage.getAddWallet().click()
  cy.wait(2000)
})
And('Enter Wallet name and click on Save', function () {
  cy.readFile(filename).then((data) =>{
  let walletName = data.WalletName
  WalletManagementPage.getWalletName().type(walletName, { force: true })
  })
  WalletManagementPage.getSaveButton().click({ force: true })
  cy.wait(3000)
})

And('Verify the success message text', function() { 
  WalletManagementPage.getviewWallet().should('have.text',this.data2.personalInfo.walletmsg)
})


//------------------------------------- Modify Wallet ----------------------------------------------------------------

When('Navigate Multiple Wallet Management and Click on Modify Wallet', function () {
  WalletManagementPage.getMultipleWalletManagement().click()
  WalletManagementPage.getModifyWallet().click()
  cy.wait(2000)
})

And('Click on Added Wallet and Click on Update', function () {
  cy.wait(3000)
  WalletManagementPage.getModify().click({ force: true })
  cy.wait(2000)
  WalletManagementPage.getUpdateButton().click({ force: true })
  cy.wait(3000)
  WalletManagementPage.getSaveWallet().click({ force: true })
  cy.wait(3000)
})