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
  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
  })
});

//--------------------------------------Login-------------------------------------------------------
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



//------------------------------------Add Wallet------------------------------------------------------

When('Navigate Multiple Wallet Management and Click on Add Wallet', function () {
  WalletManagementPage.getMultipleWalletManagement().click()
  WalletManagementPage.getAddWallet().click()
})
And('Enter Wallet name and click on Save', function () {
  cy.wait(2000)
  cy.readFile(filename).then((data) =>{
  let walletName = data.WalletName
  WalletManagementPage.getWalletName().type(walletName, { force: true })
  })
  WalletManagementPage.getSaveButton().click({ force: true })
})

And('Verify the success message text', function() { 
  WalletManagementPage.getviewWallet().should('have.text',this.data2.personalInfo.walletmsg)
})


//------------------------------------- Modify Wallet ----------------------------------------------------------------

When('Navigate Multiple Wallet Management and Click on Modify Wallet', function () {
  WalletManagementPage.getMultipleWalletManagement().click()
  WalletManagementPage.getModifyWallet().click()
})

And('Click on Added Wallet and Click on Update', function () {
  cy.wait(3000)
  WalletManagementPage.getModify().click({ force: true })
  cy.intercept(this.data20.UpdateBtn).as('mwallet')
  WalletManagementPage.getUpdateButton().click({ force: true })
  cy.wait('@mwallet')
  cy.intercept(this.data20.SaveWal).as('updatewallet')
  WalletManagementPage.getSaveWallet().click({ force: true })
  cy.wait('@updatewallet')
})