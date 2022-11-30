/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import "../../../../../support/commands";
import BankManagement from '../../../../../support/pageObjects/BankManagement';
import 'cypress-file-upload'
import walletManagement from '../../../../../support/pageObjects/WalletManagement/walletManagement';

//----------------Object Declaration----------------------------------------------------------
const pageLogin = new loginPage()
const BankManagementPage = new BankManagement()
const WalletManagementPage = new walletManagement()
const uuid = () => Cypress._.random(1e10)
const uud = () => Cypress._.random(1e10)
PoolAccountNo = uuid()
BankID = uuid()
Priority = uud()
var name, PoolAccountNo, BankID, Priority
var filename = 'cypress/fixtures/BankManagement.json'
var filename1 = 'cypress/fixtures/userData/WalletManagementdata.json'

//-----------------------------------------------------------------------------------------

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

});

//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.fixture('userData/SystemAdminLogin.json').then((data)=>{
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.fixture('userData/SystemAdminLogin.json').then((data)=>{
    let Name = data.SysAdminChecker1Name
    cy.checkWelcomeText(Name)
  })
})

//----------------------------------------------------------------------------------------------------


Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.superadminm, this.data1.masteradminmaker.superadminmPwd)
  cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
})
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.superadminc, this.data1.masteradminchecker.superadmincPwd)
  cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
})

//-------------------------------------Bank Creation-------------------------------------------------
When('Navigate to Bank Master and Click on it', function () {
  BankManagementPage.getBankMaster().should('be.visible').click({ force: true })
  BankManagementPage.getAddBank().click()
})

And('Enter All the Required Details', function () {
  pageLogin.getiFrame()
  cy.wait(3000)
  BankManagementPage.getBankName().type(getbankName(), { force: true })
  cy.getCSVfile()
  BankManagementPage.getProvider().select(this.data03.bankMaster.Provider, { force: true })
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
  BankManagementPage.getSubmitButton().click({force:true})
  cy.wait(2000)
  BankManagementPage.getAsserMessage().contains(this.data03.bankMaster.assert)
})

//--------------------------------------Wallet Creation----------------------------------------------


//------------------------------------Add Wallet------------------------------------------------------

When('Navigate Multiple Wallet Management and Click on Add Wallet', function () {
  WalletManagementPage.getMultipleWalletManagement().click()
  WalletManagementPage.getAddWallet().click()
})

And('Enter Wallet name and click on save', function () {
  cy.wait(2000)
  WalletManagementPage.getWalletName().type(getRandomName(), { force: true })
  WalletManagementPage.getSaveButton().click({ force: true })
  cy.readFile(filename1).then((data) => {
    data.WalletName = name
    cy.writeFile(filename1, data)
  })
})
