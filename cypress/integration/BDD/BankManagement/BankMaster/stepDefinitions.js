/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import "../../../../support/BankCommands";
import BankManagement from '../../../../support/pageObjects/BankManagement';
import 'cypress-file-upload'



//----------------Object Declaration-----------------------------------------------------------------

const BankManagementPage = new BankManagement()
const uuid = () => Cypress._.random(1e10)
const uud = () => Cypress._.random(1e3)
PoolAccountNo =  uuid()
BankID = uuid()
Priority = uud()
var name
var PoolAccountNo
var BankID
var Priority
var filename = 'cypress/fixtures/BankManagement.json'


function getbankName() {
name = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
   cy.fixture('BankManagement').then(function(data2)
   {
      this.data2 = data2;
   })

  })


//-------------------------------------------------TC_04----------------------------------------------------

Given ('Login with Master Admin Checker', function(){
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
})
When ('Navigate to Bank Master and Click on it', function(){
  BankManagementPage.getBankMaster().click({force: true})
  cy.wait(3000)
})
  
And ('Enter All the Required Details', function(){
//cy.getCSVfile()
BankManagementPage.getProvider().select(this.data2.bankMaster.Provider, {force:true})
BankManagementPage.getBankName().type(getbankName(), {force:true})
cy.readFile(filename).then((data) => {
  data.BankName = name
  cy.writeFile(filename, data)
})
BankManagementPage.getPoolAccountNo().type(PoolAccountNo)
BankManagementPage.getBankId().type(BankID)
BankManagementPage.getBankType().select(this.data2.bankMaster.BankType, {force:true})
BankManagementPage.getPoolAccountType().select(this.data2.bankMaster.PoolAccountType, {force:true})
//BankManagementPage.getCBSType().select(this.data2.bankMaster.CBSType, {force:true})
BankManagementPage.getPriority().type(Priority)
//BankManagementPage.getChooseFile().attachFile('AddBranches.csv')
BankManagementPage.getSubmitButton().click({force: true})
cy.wait(5000)
BankManagementPage.getAssert().should('have.text',this.data2.bankMaster.assert)
})

And ('Navigate to MFS provider Bank type master and Click on Modify or Delete Bank', function(){
cy.wait(2000)
  BankManagementPage.getMFSproviderBankTypeMaster().click()
  BankManagementPage.getModifyORDelete().click()
})

Then ('Select the bank and associate new services', function(){
  cy.wait(2000)
  BankManagementPage.getMFS1().click()
  BankManagementPage.getModify().click()
  cy.wait(2000)
  cy.getbankType()
  cy.getBox()
  cy.wait(2000)
  BankManagementPage.getModify().click({force:true})
  cy.wait(5000)
  BankManagementPage.getSelectAll().click()
  BankManagementPage.getSubmit().click()
})    

  //-----------------------------------TC_05---------------------------------------------------------------
   
When ('Click on Bank Master', function(){
  BankManagementPage.getBankMaster().click({force: true})
  cy.wait(3000)

})   

  //--------------------------------------------TC_06-----------------------------------------------------

And ('Enter all the details Except Bank Name', function(){
  cy.getCSVfile()
  BankManagementPage.getProvider().select(this.data2.bankMaster.Provider, {force:true})
  PoolAccountNo =  uuid()
  BankID = uuid()
  BankManagementPage.getProvider().select(this.data2.bankMaster.Provider)
  BankManagementPage.getPoolAccountNo().type(PoolAccountNo)
  BankManagementPage.getBankId().type(BankID)
  BankManagementPage.getBankType().select(this.data2.bankMaster.BankType, {force:true})
  BankManagementPage.getPoolAccountType().select(this.data2.bankMaster.PoolAccountType, {force:true})
  BankManagementPage.getCBSType().select(this.data2.bankMaster.CBSType, {force:true})
  BankManagementPage.getPriority().type(Priority)
  BankManagementPage.getChooseFile().attachFile('AddBranches.csv')
  BankManagementPage.getSubmitButton().click({force: true})
}) 

Then ('Confirm the Error message', function(){
  cy.wait(3000)
  BankManagementPage.getErrorMessage().should('have.text',this.data2.bankMaster.ErrorMessage)

})  

  