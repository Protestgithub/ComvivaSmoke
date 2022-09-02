/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And,Before} from "@badeball/cypress-cucumber-preprocessor";
import { recurse } from 'cypress-recurse';

import "../../../../../support/commands";
import BankManagement from '../../../../../support/pageObjects/BankManagement';
import 'cypress-file-upload'
import walletManagement from '../../../../../support/pageObjects/WalletManagement/walletManagement';

//----------------Object Declaration----------------------------------------------------------

const BankManagementPage = new BankManagement()
const WalletManagementPage = new walletManagement()
const uid = () => Cypress._.random(0, 1e6)
const id = uid()
const uuid = () => Cypress._.random(1e10)
const uud = () => Cypress._.random(1e10)
PoolAccountNo = uuid()
BankID = uuid()
Priority = uud()
var name, PoolAccountNo, BankID, Priority
var filename = 'cypress/fixtures/BankManagement.json'
var filename1 = 'cypress/fixtures/WalletManagementdata.json'
function getbankName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}
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
  cy.fixture('BankManagement').then(function (data03) {
    this.data03 = data03;
  })
  if (Cypress.browser.isHeadless) {
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

//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
//-------------------------------------Bank Creation-------------------------------------------------
When('Navigate to Bank Master and Click on it', function () {
  BankManagementPage.getBankMaster().click({ force: true })
  BankManagementPage.getAddBank().click()
  cy.wait(3000)
})

And('Enter All the Required Details', function () {
  cy.getCSVfile()
  BankManagementPage.getProvider().select(this.data03.bankMaster.Provider, { force: true })
  BankManagementPage.getBankName().type(getbankName(), { force: true })
  cy.readFile(filename).then((data) => {
    data.BankName = name
    cy.writeFile(filename, data)
  })
  BankManagementPage.getPoolAccountNo().type(PoolAccountNo)
  BankManagementPage.getBankId().type(BankID)
  BankManagementPage.getBankType().select(this.data03.bankMaster.BankType, { force: true })
  BankManagementPage.getPoolAccountType().select(this.data03.bankMaster.PoolAccountType, { force: true })
  BankManagementPage.getCBSType().select(this.data03.bankMaster.CBSType, { force: true })
  BankManagementPage.getPriority().type(Priority)
  BankManagementPage.getChooseFile().attachFile('templates/AddBranches.csv')
  BankManagementPage.getSubmitButton().click({ force: true })
  cy.wait(5000)
  // BankManagementPage.getAssert().should('have.text',this.data03.bankMaster.assert)
})


//--------------------------------------Wallet Creation----------------------------------------------


//------------------------------------Add Wallet------------------------------------------------------

When('Navigate Multiple Wallet Management and Click on Add Wallet', function () {
  WalletManagementPage.getMultipleWalletManagement().click()
  WalletManagementPage.getAddWallet().click()
  cy.wait(2000)
})

And('Enter Wallet name and click on save', function () {
  WalletManagementPage.getWalletName().type(getRandomName(), { force: true })
  WalletManagementPage.getSaveButton().click({ force: true })
  cy.wait(3000)
  cy.writeFile(filename1, { WalletName: name })

})
