/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';

import "../../../../support/commands";
import O2CTransferInitiate from '../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';
import TransferRulePage from '../../../../support/pageObjects/TransferRules/TransferRulePage';
import Approval from '../../../../support/pageObjects/TransferRules/Approval';


//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage ()
const O2CTransferInitiatePage = new O2CTransferInitiate()
const transferrulepage = new TransferRulePage()
const transferruleapprovalpage = new Approval()
const TransferRuleApproval = new Approval()
const uid =  () => Cypress._.random(1e9)
const uuid = () => Cypress._.random(1e5)
var TransferAmount = uuid()
var ReferenceNumber = uuid()
var number = uuid()
var Amount =uid()
var name
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i=0; i<5; i++)
  name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
  }
//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {      
  cy.fixture('login').then(function(data1)
   {
       this.data1 = data1;
   })
   cy.fixture('UserManagement').then(function(data2)
   {
       this.data2 = data2;
   })
   
   cy.fixture('OperatorToChannel').then(function(data5)
   {
      this.data5 = data5;
   })   

  })

  
//----------------Launch Mobiquity Portal URL and Login--------------------------------------------------
Given('Login into Mobiquity Portal as System admin User', function(){
    cy.launchURL(Cypress.env('Adminurl'))
    cy.SysAdminlogin()
    cy.wait(2000)
    cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
  })

Given('Login into Mobiquity Portal as System admin User2', function(){
    cy.wait(2000)
    cy.launchURL(Cypress.env('Adminurl'))
    cy.SysAdminlogin2()
    cy.wait(2000)
    cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
  })

  Given('Login into Mobiquity Portal as System admin User3', function(){
    cy.wait(2000)
    cy.launchURL(Cypress.env('Adminurl'))
    cy.SysAdminlogin3()
    cy.wait(2000)
})  
  

//------------------------------------TC_186-------------------------------------------------
When('Navigate to Operator to channel and click on O2C transfer initiate', function(){
    welcomePage.getOperatorToChannelOption().scrollIntoView()
    welcomePage.getOperatorToChannelOption().click()
    welcomePage.getO2CTransferInitiateOption().click()
    
    })
    And('Enter All the Mandatory details', function(){
      cy.wait(3000)
      O2CTransferInitiatePage.getMSISDN().type(this.data5.O2CTransferInitiate.msisdn, {force: true})  
      O2CTransferInitiatePage.getTransferAmount().type(TransferAmount, {force: true})
      O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, {force: true})
      O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, {force: true})
      O2CTransferInitiatePage.getNumber().type(number, {force: true})
      O2CTransferInitiatePage.getRemarks().type(getRandomName(), {force: true})
    
    })
    And('Click on submit and Confirm', function(){
      O2CTransferInitiatePage.getSubmitButton().click({force: true})
      cy.wait(3000)
      O2CTransferInitiatePage.getConfirmButton().click({force: true})
    })
    Then('Confirm the Error message', function(){
      cy.wait(2000)
      O2CTransferInitiatePage.getErrorMessage().should('have.text',this.data5.O2CTransferInitiate.errorMessage, {force:true})
    
    })
    
//-------------------------------------------------TC_165-----------------------------------------------------
And('Enter All the Mandatory details and type Invalid Character in Transfer amount', function(){
  cy.wait(3000)
  O2CTransferInitiatePage.getMSISDN().type(this.data5.O2CTransferInitiate.msisdn1, {force: true})  
  O2CTransferInitiatePage.getTransferAmount().type(getRandomName(), {force: true})
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, {force: true})
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, {force: true})
  O2CTransferInitiatePage.getNumber().type(number, {force: true})
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), {force: true})
})

Then('Click on submit and Confirm Error Message', function(){
O2CTransferInitiatePage.getSubmitButton().click({force: true})
cy.wait(2000)
O2CTransferInitiatePage.getErrorMessage().should('have.text',this.data5.O2CTransferInitiate.ErrorMessage, {force:true})   
})

//-------------------------------------------------TC_166-----------------------------------------------------
And('Enter All the Details', function(){
  cy.wait(3000)
  O2CTransferInitiatePage.getMSISDN().type(this.data5.O2CTransferInitiate.msisdn1, {force: true})  
  O2CTransferInitiatePage.getTransferAmount().type(Amount, {force: true})
  O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, {force: true})
  O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, {force: true})
  O2CTransferInitiatePage.getNumber().type(number, {force: true})
  O2CTransferInitiatePage.getRemarks().type(getRandomName(), {force: true})
})

And ('Confirm the displayed Error Message', function(){
  cy.wait(3000)
  O2CTransferInitiatePage.getErrorMessage1().should('have.text',this.data5.O2CTransferInitiate.ErrorMessage1, {force:true})
  cy.wait(2000)
})


    //------------------------------------- Likith-------------------------------------------------------
    When('Navigate to Operator to channel and click on O2C transfer initiate', function(){

      welcomePage.getOperatorToChannelOption().scrollIntoView()
      
      welcomePage.getOperatorToChannelOption().click()
      
      welcomePage.getO2CTransferInitiateOption().click()
      
      
      
      })
      
      And('Enter All the Mandatory Details', function(){
        cy.wait(3000)
        O2CTransferInitiatePage.getMSISDN().type(this.data5.O2CTransferInitiate.msisdn1, {force: true})  
        O2CTransferInitiatePage.getTransferAmount().type(TransferAmount, {force: true})
        O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, {force: true})
        O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, {force: true})
        O2CTransferInitiatePage.getNumber().type(number, {force: true})
        O2CTransferInitiatePage.getRemarks().type(getRandomName(), {force: true})
      
      })
      
      Then('Click on submit and Confirm', function(){
      
        O2CTransferInitiatePage.getSubmitButton().click({force: true})
      
        cy.wait(2000)
      
        O2CTransferInitiatePage.getConfirmButton().click({force: true})
        cy.wait(3000)
       cy.O2CTransactionWriteData()
      })
      And('click wallet Payment history.',function(){
        manageUsersPage.getWalletHistory().contains("Wallet Payment History").click({force:true})
      })
    And('Enter TransactionID and check',function(){
      cy.O2CTransactionReadData()
        
    
      })
      And('logout the user',function(){
    
        welcomePage.getProfileIcon().click()
        cy.wait(2000)
        welcomePage.getLogOutbttn().click()
        cy.wait(2000)
          welcomePage.getLogOutYesbttn().click()
      })
      When('Navigate to Operator to channel and click on O2C transfer Approval1', function(){
    
        welcomePage.getOperatorToChannelOption().scrollIntoView()
        
        welcomePage.getOperatorToChannelOption().click()
        
        welcomePage.getOperatorToChannelApproval1().click()
        cy.wait(4000)
        
        O2CTransferInitiatePage.getRecentDatainO2C()
        TransferRuleApproval.getsubmitbttnTransferrule().click({force:true})
        cy.wait(2000)
         transferruleapprovalpage.getApprovalTransferrule().click({force:true})
          })
          
     //-------------------------O2C approal2------------------------------------
     When('Navigate to Operator to channel and click on O2C transfer Approval2', function(){
    
      welcomePage.getOperatorToChannelOption().scrollIntoView()
      
      welcomePage.getOperatorToChannelOption().click()
      
      welcomePage.getOperatorToChannelApproval2().click()
      cy.wait(4000)
      
      O2CTransferInitiatePage.getRecentDatainO2C()
      TransferRuleApproval.getsubmitbttnTransferrule().click({force:true})
      cy.wait(2000)
       transferruleapprovalpage.getApprovalTransferrule().click({force:true})
        })  
      
        