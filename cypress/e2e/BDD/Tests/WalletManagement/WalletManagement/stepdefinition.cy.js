/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/utils/Generic"
import "../../../../../support/utils/BankCommands"
import walletManagement from '../../../../../support/pageObjects/WalletManagement/walletManagement';


//----------------Object Declaration-----------------------------------------------------------------

const welcomePage = new homePage()
const WalletManagementPage = new walletManagement()
const uuid = () => Cypress._.random(1e10)
const uud = () => Cypress._.random(1e10)
PoolAccountNo = uuid()
BankID = uuid()
Priority = uud()
var name, PoolAccountNo, BankID, Priority

//------------------------------------View Wallet------------------------------------------------------


When('Navigate Multiple Wallet Management and Click on View Wallet', function () {
  WalletManagementPage.getMultipleWalletManagement().click()
  WalletManagementPage.getViewWallet().click()
  cy.wait(2000)
})

//------------------------------------Associate Wallet------------------------------------------------------

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
