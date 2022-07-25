/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import "../../../../support/commands";
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../support/pageObjects/UserManagement/manageUsers';
import register from '../../../../support/pageObjects/UserManagement/register';
import DomainFieldspage from '../../../../support/pageObjects/DomainManagement/DomainFieldspage.js';
import CircularJSON from 'circular-json';
import Flatted from 'flatted';
import PricingEnginePage from '../../../../support/pageObjects/PricingEngine/PricingEnginePage';
import SecurityProfilePage from '../../../../support/pageObjects/SecurityProfile/SecurityProfilePage';
import TransferRulePage from '../../../../support/pageObjects/TransferRules/TransferRulePage';
import TransferControlProfile from '../../../../support/pageObjects/TransferControlProfile';
import { random } from 'lodash';
import stockInitiation from '../../../../support/pageObjects/StockManagement/stockInitiation';
import Approval from '../../../../support/pageObjects/TransferRules/Approval';
import O2C from '../../../../support/pageObjects/TransferRules/O2C';
import DownloadAmb from '../../../../support/pageObjects/AmbiguousTransaction/DownloadAmb';
import BulkSettlement from '../../../../support/pageObjects/AmbiguousTransaction/BulkSettlement';
import myActivity from '../../../../support/pageObjects/MyActivity/myActivity';
import BulkPayout from '../../../../support/pageObjects/BulkPayout';
import "../../../../support/commands";
import O2CTransferInitiate from '../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';


//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const transferrulepage = new TransferRulePage()
const domainPage = new DomainFieldspage()
const pricingEnginePage = new PricingEnginePage()
const securityProfilePage = new SecurityProfilePage()
const stockInitiationPage = new stockInitiation()
const myActivityPage = new myActivity()
const transferruleapprovalpage = new Approval()
const transferrulepageO2C = new O2C()
const tcpPage = new TransferControlProfile()
const O2CTransferInitiatePage = new O2CTransferInitiate()
const DownloadAmbpage = new DownloadAmb()
const BulkSettlementpage = new BulkSettlement()
const BptPage=new BulkPayout()
const TransferRuleApproval = new Approval()



var loginId
var mobile 
var ProfileName
var KycValue
var O2CMsisdn
var CsvFile='cypress/fixtures/input/BULK_O2C-template.csv';
var JsonFile='cypress/fixtures/input/BULK_O2C-template.json';


const uid = () => Cypress._.random(1e10)
const uuid = () => Cypress._.random(1e5)
var TransferAmount = uuid()
var ReferenceNumber = uuid()
var number = uuid()
var Amount = uid()
var name
var filename="cypress/fixtures/userData/O2CBulkData.json"
var BusinessMoBileData="userData/BusinessUsersData.json"
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {      
  cy.fixture('login').then(function(data1)

   {
       this.data1 = data1;

   })
   cy.fixture(BusinessMoBileData).then(function(data6)

   {
       this.data6 = data6;

   })

   cy.fixture('UserManagement').then(function(data2)
   {
       this.data2 = data2;
   })

   cy.fixture('bulkdata.json').then(function(data9)
   {
       this.data9=data9
   })

   cy.fixture('userData/O2CBulkData.json').then(function(data7)
   {
       this.data7=data7
   })

   cy.fixture('OperatorToChannel').then(function (data5) {
    this.data5 = data5;
  })


});
 -
//----------------Test Scripts---------------------------------------------------------------------------

//--------------------------User Management--------------------------------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Maker after Logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker2', function () {
  cy.wait(2000)
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin3()
  cy.wait(3000)
})

Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})
  

//------------------------SC_53------------------------------------------------------------------------


//----------------Test Scripts---------------------------------------------------------------


When('Navigate to Operator to channel and click on O2C transfer initiate', function () {

  welcomePage.getOperatorToChannelOption().scrollIntoView()

  welcomePage.getOperatorToChannelOption().click()

  welcomePage.getO2CTransferInitiateOption().click()



})

When('Navigate to Operator to channel and click on O2C transfer Approval2', function () {

  welcomePage.getOperatorToChannelOption().scrollIntoView()

  welcomePage.getOperatorToChannelOption().click()

  welcomePage.getOperatorToChannelApproval2().click()
  cy.wait(4000)

  O2CTransferInitiatePage.getRecentDatainO2C()
  TransferRuleApproval.getsubmitbttnTransferrule().click({ force: true })
  cy.wait(2000)
  transferruleapprovalpage.getApprovalTransferrule().click({ force: true })
})


And('Enter All the Mandatory Details', function(){
   cy.wait(3000)
        cy.wait(2000)

      cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
        const $body = $iframe.contents().find('body')
        const $win = $iframe[0].contentWindow
        cy.stub($win, 'confirm', () => true)
          .as('windowConfirm')
        cy.stub($win.console, 'log').as('consoleLog')
        cy.wrap($body)

        var BBAFile ="cypress/fixtures/userData/BusinessUsersData.json"
        var O2CFile= "cypress/fixtures/userData/O2Cdata.json"
        cy.readFile(BBAFile).then((data) => {
         O2CMsisdn = data.registeredMobile
        data.O2CMsisdn1 =O2CMsisdn
        cy.writeFile(O2CFile, data)
        O2CTransferInitiatePage.getMSISDN().type(O2CMsisdn, {force: true})
        O2CTransferInitiatePage.getTransferAmount().type(TransferAmount, {force: true}).should(function () {
            expect(this.windowConfirm).to.be.calledWith('Channel User Does Not Exist')
            //expect(this.consoleLog).to.be.calledWith('CONFIRMED')  // passes
          })
        })
      })

        
        O2CTransferInitiatePage.getReferenceNumber().type(ReferenceNumber, {force: true})
        O2CTransferInitiatePage.getType().select(this.data5.O2CTransferInitiate.type, {force: true})
        O2CTransferInitiatePage.getNumber().type(number, {force: true})
        O2CTransferInitiatePage.getRemarks().type(getRandomName(), {force: true})
        cy.writeFile(filename,{ msidnValue:O2CMsisdn,TransferAmt:TransferAmount, RefNum:ReferenceNumber} )
      
      
      })

And('logout the user', function () {

  welcomePage.getProfileIcon().click()
  cy.wait(2000)
  welcomePage.getLogOutbttn().click()
  cy.wait(2000)
  welcomePage.getLogOutYesbttn().click()
})

When('Navigate to Operator to channel and click on O2C transfer Approval1', function () {

  welcomePage.getOperatorToChannelOption().scrollIntoView()

  welcomePage.getOperatorToChannelOption().click()

  welcomePage.getOperatorToChannelApproval1().click()
  cy.wait(4000)

  O2CTransferInitiatePage.getRecentDatainO2C()
  TransferRuleApproval.getsubmitbttnTransferrule().click({ force: true })
  cy.wait(2000)
  transferruleapprovalpage.getApprovalTransferrule().click({ force: true })
})

      
     Then('Click on submit and Confirm2', function(){
      
        O2CTransferInitiatePage.getSubmitButton().click({force: true})
      
        cy.wait(2000)
      
        O2CTransferInitiatePage.getConfirmButton().click({force: true})
        cy.wait(3000)
       //cy.O2CTransactionWriteData2()
      })


When ('Click on BulkPayout tool', function()
{
      BptPage.getBulkPayoutLink().click({force:true})
})

And ('Click on Bulk Payout Initiate',function()
{
      BptPage.getBulkPayoutInitiateLink().click({force:true})
      cy.wait(10000)
     BptPage.getServicename().select(this.data2.personalInfo.ServiceName,{force:true})
     BptPage.getDownloadTemplate().click({force:true})
     cy.wait(10000)
     BptPage.getRemark().click({force:true}).type('testing user1234')

  cy.csvToJSON(CsvFile,JsonFile)
     
  // console.log(result)
      
})
Then('update the json data', function () {

  cy.readFile("cypress/fixtures/input/BULK_O2C-template.json").then((data) => {
    
    data['Serial Number*'] = this.data9.SerialNumber,
    data['MFS Provider*'] = this.data9.MFSProvider, 
    data['Receiver SVA Type ID*']=this.data9.ReceiverSVATypeID,
    data['Receiver Mobile Number*']=this.data6.registeredMobile,
    data['Amount*']=this.data7.TransferAmt,
    data['Transfer Date*']=this.data9.TransferDate,
    data['Payment Type*']=this.data9.PaymentType,
    data['Reference number*']=this.data7.RefNum,
    data['Remarks*']=this.data9.Remarks,
    data['Payment Number']=this.data9.PaymentNumber,
    data['Payment Date']=this.data9.PaymentDate,
    data['Individual Remarks']=this.data9.IndividualRemarks,
    data['Additional Parameter 1']=""
    data['Additional Parameter 2']=""
    data['Additional Parameter 3']=""
    data['Additional Parameter 4']=""
    data['Additional Parameter 5']=""
    data['Additional Parameter 6']=""
    data['Additional Parameter 7']=""
    data['Additional Parameter 8']=""
    data['Additional Parameter 9']=""
    data['Additional Parameter 10']=""
    cy.writeFile("cypress/fixtures/input/BULK_O2C-template.json", data)
 })
})
And('Upload the data', function() {
     cy.jsonToCSV(JsonFile,CsvFile)
    BptPage.getUploadLink().attachFile('input/BULK_O2C-template.csv')
    cy.wait(10000)
 BptPage.getSubmit().dblclick({force:true})
 cy.wait(10000)

  
/*BptPage.getTextBox().invoke('split',' ').its(12).as('batchID');
cy.get('@batchID').then(id => cy.log(`batch **${id}**`))
})*/



BptPage.getTextBox().then(($btn) => {
  const txt = $btn.text()
  cy.log(txt)
  

})


})
And('Click on Bulk Payout Approval link.',function(){
BptPage.getBulkApprove().click({force:true})
cy.wait(5000)
})
And ('Select initiated service.', function(){
BptPage.getBulkInitiatedBy().click({force:true})
})
And ('Click on Approve button.',function(){
BptPage.getBulkApproveButton().click({force:true})
})
And('Click on Bulk Payout Dashboard',function(){
BptPage.getBulkDashboard().click({force:true})
})
And ('Click on number of entries',function(){
  cy.wait(10000)
BptPage.getNumberOfEntries().dblclick({force:true})

})
Then ('Verify Batch Id',function(){
  cy.wait(10000)
 
BptPage.getBatchIDFromBox().invoke('text').then((elementText1) =>{
  expect(elementText1).to.contain('BA')
     
})    

})


Then ('Verify success',function(){
  cy.wait(10000)
BptPage.getSuccessAsOne().invoke('text').then((elementText) =>{
  expect(elementText).to.contain('0')

})

     
})