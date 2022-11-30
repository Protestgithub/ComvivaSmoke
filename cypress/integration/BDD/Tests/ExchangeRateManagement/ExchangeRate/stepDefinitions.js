/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//-------------------------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';
import AddExchangeRateManagement from '../../../../../support/pageObjects/ExchangeRateManagement/AddExchangeRateManagement';
import "../../../../../support/commands";
import ApproveRejectExchangeRate from '../../../../../support/pageObjects/ExchangeRateManagement/ApproveRejectExchangeRate';
import UpdateExchangeRate from '../../../../../support/pageObjects/ExchangeRateManagement/UpdateExchangeRate';
import UpdatedApproveRejectExchangeRate from '../../../../../support/pageObjects/ExchangeRateManagement/UpdatedApproveRejectExchangeRate';

//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()
const ERM = new AddExchangeRateManagement()
const ARER = new ApproveRejectExchangeRate()
const UER = new UpdateExchangeRate()
const UARER = new UpdatedApproveRejectExchangeRate()
const d = new Date()
let msg = "An exchange rate is already within the range."


//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data) {
    this.data = data;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })

  cy.fixture('erm').then(function (data1) {
    this.data1 = data1;
  })

  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
  })
});


//----------------Test Scripts---------------------------------------------------------------

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

Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})
//----------------------------EXCHANGE RATE MANAGEMENT-------------------------------------------
When('Navigate to Exchange Rate Management and Click on Add Exchange Rate', function () {
  welcomePage.getExchangeRateManagementOption().scrollIntoView()
  welcomePage.getExchangeRateManagementOption().click()
  cy.intercept(this.data20.AddExchange).as('adderm')
  welcomePage.getAddExchangeRate().click()
  cy.wait('@adderm')
})

And('Enter all the required details and click on Submit', function () {
  ERM.getbasecurrency().select(this.data1.erm.fromTargetCurrecny, { force: true })
  ERM.gettargetcurrency().select(this.data1.erm.frombasecurrency, { force: true })
  ERM.getvalidfrom().type(d.toLocaleDateString('en-GB'), { force: true })
  ERM.getvalidTo().click()
  ERM.getnextyear().click()
  ERM.getnextmonth().click()
  ERM.getdates().click({ force: true })
  ERM.getForexRate().type(this.data1.erm.forexRate, { force: true })
  ERM.getsubmitbtn().click({ force: true })
})

Then('System Admin can initiate Add Exchange Rate', function () {
  //ERM.getError().should('have.text',this.data1.erm.Error)
})

And('Navigate to Exchange Rate Management and Click Approve or Reject ER', function () {
  welcomePage.getExchangeRateManagementOption().scrollIntoView()
  welcomePage.getExchangeRateManagementOption().click()
  welcomePage.getApproveRejectER().click()
})

And('Approve Or Reject ER', function () {
  cy.wait(3000)
  cy.iframe().find('div .wwFormTableC').each(($elm) => {
    const t = $elm.text()
    if (t.includes('ER')) {
      ARER.getapproveER().click({ force: true })
      ARER.getapproveDER().contains(this.data1.erm.Approve)
    }

    else {
      cy.log(msg)
    }
  })
})

And('Navigate to Exchange Rate Management and Click Show Modification History', function () {
  welcomePage.getExchangeRateManagementOption().scrollIntoView()
  welcomePage.getExchangeRateManagementOption().click()
  welcomePage.getShowModificationHistory().click()
})

When('Navigate to Exchange Rate Management and Click Update Exchange Rate', function () {
  welcomePage.getExchangeRateManagementOption().scrollIntoView()
  welcomePage.getExchangeRateManagementOption().click()
  welcomePage.getUpdateER().click()
})

And('Enter all details and click on Submit', function () {
  cy.wait(3000)
  UER.getupdatedbasecurrency().select(this.data1.updateder.fromTargetCurrecny1, { force: true })
  UER.getupdatedtargetcurrency().select(this.data1.updateder.frombasecurrency1, { force: true })
  ERM.getvalidfrom().type(d.toLocaleDateString('en-GB'), { force: true })
  UER.getupdatedvalidto().within(function () {
    cy.get('td').eq(1)
    cy.get('span#validTo img').eq(0).click()
  })
  ERM.getnextyear().click()
  ERM.getnextmonth().click()
  ERM.getdates().click({ force: true })
  UER.getupdatedforexrate().type(this.data1.updateder.forexRate1, { force: true })
  UER.getupdatebutton().click({ force: true })
})


And('Navigate to Exchange Rate Management and Click Approve or Reject Updated Exchange Rate', function () {
  welcomePage.getExchangeRateManagementOption().scrollIntoView()
  welcomePage.getExchangeRateManagementOption().click()
  welcomePage.getApproveupdateER().click()
})

Then('Click on Approve to Approve Exchange Rate', function () {
  cy.wait(3000)
  cy.iframe().find('div .wwFormTableC').each(($elm) => {
    const t = $elm.text()
    if (t.includes('ER')) {
      UARER.getUpdatedapproveER().click({ force: true })
      ARER.getapproveDER().contains(this.data1.erm.Approve)
    }
    else {
      cy.log(msg)
    }
  })
})
