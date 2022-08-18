/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';

import "../../../../../support/commands";
import "../../../../../support/BankCommands"
import walletManagement from '../../../../../support/pageObjects/WalletManagement/walletManagement';



//----------------Object Declaration-----------------------------------------------------------------

const WalletManagementPage = new walletManagement()
var filename = 'cypress/fixtures/WalletManagementdata.json'

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

});

//--------------------------------------Login-------------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
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
var name

And('Enter Wallet name and click on save', function () {
  WalletManagementPage.getWalletName().type(getRandomName(), { force: true })
  cy.writeFile(filename, { WalletName: name })
  WalletManagementPage.getSaveButton().click({ force: true })
  cy.wait(3000)
})

And('Enter Wallet name and click on Save', function () {
  cy.readFile(filename).then((data) =>{
  let walletName = data.WalletName
  WalletManagementPage.getWalletName().type(walletName, { force: true })
  })
  WalletManagementPage.getSaveButton().click({ force: true })
  cy.wait(3000)
 // cy.readFile(filename).then((data) =>{
  //  let walletName = data.ErrorMessage
   // WalletManagementPage.getErrorMessage().should('have.text',walletName)
 // })
  cy.wait(2000)
})


//------------------------------------- Modify Wallet ----------------------------------------------------------------

When('Navigate Multiple Wallet Management and Click on Modify Wallet', function () {
  WalletManagementPage.getMultipleWalletManagement().click()
  WalletManagementPage.getModifyWallet().click()
  cy.wait(2000)
})

And('Click on Added Wallet and Click on Update', function () {
  cy.wait(3000)
  cy.geCheckBox()
  cy.wait(2000)
  WalletManagementPage.getUpdateButton().click({ force: true })
  cy.wait(3000)
  WalletManagementPage.getSaveWallet().click({ force: true })
  cy.wait(3000)
})