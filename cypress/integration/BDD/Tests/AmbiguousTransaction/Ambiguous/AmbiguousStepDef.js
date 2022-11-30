/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import DownloadAmb from '../../../../../support/pageObjects/AmbiguousTransaction/DownloadAmb';
import BulkSettlement from '../../../../../support/pageObjects/AmbiguousTransaction/BulkSettlement';
import 'cypress-file-upload';


//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()
const DownloadAmbpage = new DownloadAmb()
const BulkSettlementpage = new BulkSettlement()


//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('AmbOrderTransaction').then(function (data6) {
    this.data6 = data6;
  })
  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
  })
});

//----------------Launch Mobiquity Portal URL and Login--------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminChecker1Name
    cy.checkWelcomeText(Name)
  })
})


//----------------------Ambiguous Transaction Management-------------------------------//
When('Click on Ambiguous Order Transaction >> Download Ambiguous Order', function () {
  welcomePage.getAmbiguousOrderTransacation().scrollIntoView()
  welcomePage.getAmbiguousOrderTransacation().click()
  cy.intercept(this.data20.DownloadAmbiguous).as('getambiguous')
  welcomePage.getDownloadAmbiguousOrder().click()
  cy.wait('@getambiguous')
})
And('Select Ambiguous Type and party type and party name', function () {
  DownloadAmbpage.getAmbtype().select(this.data6.AmbType, { force: true })
  DownloadAmbpage.getPartyType().select(this.data6.PartyType, { force: true })
})

Then('Click on Download button.', function () {
  DownloadAmbpage.getDownloadbttn().click()
})
//---------------------------Amb transaction upload file----------------------//
When('Click on Ambiguous Order Transaction >> Bulk settlement initiation', function () {
  welcomePage.getAmbiguousOrderTransacation().scrollIntoView()
  welcomePage.getAmbiguousOrderTransacation().click()
  cy.intercept(this.data20.BulkSettlement).as('getbulkoperation')
  welcomePage.getBulkSettlement().click()
  cy.wait('@getbulkoperation', { timeout: 10000 })
})
And('Select operation name', function () {
  BulkSettlementpage.getOperatorName().select(this.data6.OperationName, { force: true })
})
And('Click on Download template and enter remark', function () {
  BulkSettlementpage.getRemarks().type("remarks")
})
Then('Upload file', function () {
  const filepath = "AMBData.csv";
  BulkSettlementpage.getUploadfile().attachFile(filepath)
  BulkSettlementpage.getSubmitbttn().click()
})