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

//------------------------------------Add Wallet------------------------------------------------------


When('Navigate Multiple Wallet Management and Click on View Wallet', function () {
  WalletManagementPage.getMultipleWalletManagement().click()
  WalletManagementPage.getViewWallet().click()
  cy.wait(2000)
})

When('Navigate to MFS provider Wallet Type Master and click modify delete Wallet',function(){
  welcomePage.getMFSProviderwalletType().click()
  welcomePage.getMFSModifyWallet().click()
})
And('Select the MFS that needs to be Associated Or Deassociated',function(){
  cy.wait(3000)
  welcomePage.getmfs1().click()
  welcomePage.getmfsmodify().click()
})
Then('Associate MFS',function(){
  cy.wait(3000)
  welcomePage.getmodify().click()
  cy.wait(4000)
  welcomePage.getselectall().click()
  welcomePage.getsubmit().click()
  cy.wait(15000)
  welcomePage.getmessage().should('have.text','Wallet Mapping Updated Successfully')
})
