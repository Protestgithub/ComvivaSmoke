/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/utils/Generic"
import "../../../../../support/utils/BankCommands"
import walletManagement from '../../../../../support/pageObjects/WalletManagement/walletManagement';
import BankManagement from '../../../../../support/pageObjects/BankManagement';


//----------------Object Declaration-----------------------------------------------------------------

var filename = 'cypress/fixtures/WalletManagementdata.json'
const BankManagementPage = new BankManagement()
const welcomePage = new homePage()
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

Before(() => {

cy.fixture('BankManagement').then(function (data03) {
    this.data03 = data03;
  })
});

//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
//-------------------------------------Bank Creation-------------------------------------------------

Given('Login with Master Admin Checker', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
    cy.wait(2000)
  })
When('Navigate to Bank Master and Click on it', function () {
  BankManagementPage.getBankMaster().click({ force: true })
  BankManagementPage.getAddBank().click()
  cy.wait(3000)
})

And('Enter All the Required Details', function () {
    cy.wait(3000)
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





