/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
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
//import O2CTransferInitiate from '../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';
import DownloadAmb from '../../../../support/pageObjects/AmbiguousTransaction/DownloadAmb';
import BulkSettlement from '../../../../support/pageObjects/AmbiguousTransaction/BulkSettlement';
import myActivity from '../../../../support/pageObjects/MyActivity/myActivity';
import O2CTransferInitiate from '../../../../support/pageObjects/OperatorToChannel/O2CTransferInitiate';
import BulkPayout from '../../../../support/pageObjects/BulkPayout';


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

var loginId
var mobile 
var ProfileName
var KycValue

var CsvFile='cypress/fixtures/input/BULK_O2C-template.csv';
var JsonFile='cypress/fixtures/input/BULK_O2C-template.json';


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

   cy.fixture('bulkdata.json').then(function(data9)
   {
       this.data9=data9
   })

      if ( Cypress.browser.isHeadless ) {
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



When ('Click on BulkPayout tool', function()
{
      BptPage.getBulkPayoutLink().click({force:true})
})

And ('Click on Bulk Payout Initiate',function()
{
      BptPage.getBulkPayoutInitiateLink().click({force:true})
      cy.wait(20000)
     
     BptPage.getServicename().select(this.data2.personalInfo.ServiceName,{force:true})
     BptPage.getDownloadTemplate().click({force:true})
     cy.wait(1000)
     BptPage.getRemark().click({force:true}).type('testing user1234')

  cy.csvToJSON(CsvFile,JsonFile)
     
  // console.log(result)
      
})
Then('update the json data', function () {
  cy.readFile("cypress/fixtures/input/BULK_O2C-template.json").then((data) => {
    cy.readFile("cypress/fixtures/userData/O2CBulkData.json").then((data) => {
      data['Receiver Mobile Number*']=data.msidnValue,
      data['Amount*']=data.TransferAmt,
      data['Reference number*']=data.RefNum
    })
    data['Serial Number*'] = this.data9.SerialNumber,
    data['MFS Provider*'] = this.data9.MFSProvider, 
    data['Receiver SVA Type ID*']=this.data9.ReceiverSVATypeID,
    data['Transfer Date*']=this.data9.TransferDate,
    data['Payment Type*']=this.data9.PaymentType,
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
    BptPage.getUploadLink().attachFile('BULK_O2C-template.csv')
    cy.wait(10000)
 BptPage.getSubmit().dblclick({force:true})
 cy.wait(10000)

  
BptPage.getTextBox().invoke('split',' ').its(12).as('batchID');
cy.get('@batchID').then(id => cy.log(`batch **${id}**`))
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
  expect(elementText1).to.contain(batchID)
     
})    

})


Then ('Verify success',function(){
  cy.wait(10000)
BptPage.getSuccessAsOne().invoke('text').then((elementText) =>{
  expect(elementText).to.contain('1')

})

     
})
