/// <reference types="Cypress" />

/// <reference types = "Cypress-iframe"/>



//-------------------------------Imports---------------------------------------------------------------------

import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../support/pageObjects/homePage';

import "../../../../support/commands";
import RegulatoryProfile from '../../../../support/pageObjects/UserManagement/RegulatoryProfile';
import MarketingProfile from '../../../../support/pageObjects/UserManagement/MarketingProfile';

//import { when } from 'cypress/types/jquery';

//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()

const RegulatoryProfile1 = new RegulatoryProfile()

const MarketingProfile1 = new MarketingProfile()

const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
var RegulatoryFile = 'userData/Regulatory&MarketingProfile.json'



//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data) {
    this.data = data;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })

});


//----------------Test Scripts---------------------------------------------------------------

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
Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})

//------------------------------  REGULATORY PROFILE--------------------------------------------

When('Navigate to UserManagement And Click on Regulatory Profile', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getregulatoryprofile().click()
  cy.wait(3000)
})

And('click on Add Regulatory Profile and Enter Profile Code and Profile Name', function () {

  RegulatoryProfile1.getaddregulatoryprofile().click()
  RegulatoryProfile1.getregulatoryprofilecode().type(id, { force: true })
  cy.RPRandomName()
})

Then('Click On Save Regulatory Profile', function () {

  RegulatoryProfile1.getregulatorysavebtn().click()
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Sucess)
  cy.wait(3000)

})

And('Under Actions tab click on Modify Regulatory Profile icon and Enter Profile Name', function () {
  cy.fixture(RegulatoryFile).then((user) => {
    var RPCode = user.RegulatoryProfileCode
    cy.log(RPCode)
    RegulatoryProfile1.getRPSearchProfileCode().type(RPCode)
  })
    RegulatoryProfile1.getRegulatoryProfileSearchbtn().click()
  cy.wait(3000)
  RegulatoryProfile1.getmodifyregulatoryprofile().eq(0).click({ force: true })
  RegulatoryProfile1.getregulatoryprofilename().clear()
  cy.RPRandomName1()

})

Then('Click On Save Modified Regulatory Profile', function () {

  RegulatoryProfile1.getmodifyregulatoryprofilesavebtn().click()
  cy.wait(3000)
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Sucess)
})

Then('Enter detail to seach in textbox and click search', function () {

  cy.fixture(RegulatoryFile).then((user) => {
    var RPCode = user.RegulatoryProfileCode
    cy.log(RPCode)
    RegulatoryProfile1.getRPSearchProfileCode().type(RPCode)
  })
  RegulatoryProfile1.getRegulatoryProfileSearchbtn().click()
})

When('Navigate to UserManagement And Click on Marketing Profile', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getmarketingprofile().click()
  cy.wait(3000)
})

And('Add Marketing Profile', function () {
  MarketingProfile1.getAddMarketingProfile().click()
  MarketingProfile1.getMarketingProfileCode().type(id, { force: true })
  cy.MPRandomName()
  MarketingProfile1.getMarketingProfileDomainName().click()
  MarketingProfile1.getMarketingProfileDomainName1().click()
  MarketingProfile1.getMarketingProfileCategoryName().click()
  MarketingProfile1.getMarketingProfileCategoryName1().click()
  MarketingProfile1.getMarketingProfileMFSProvider().click()
  MarketingProfile1.getMarketingProfileMFSProvider1().click()
  MarketingProfile1.getMarketingProfileWalletType().click()
  MarketingProfile1.getMarketingProfileWalletType1().click()
  MarketingProfile1.getMarketingProfileGrade().click()
  MarketingProfile1.getMarketingProfileGrade1().click()
  MarketingProfile1.getMarketingProfileInstrumentTCP().click()
  MarketingProfile1.getMarketingProfileInstrumentTCP1().click()
  MarketingProfile1.getMarketingProfileAddBtn().click()
  cy.wait(3000)
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Marketing)
})

And('Enter detail to search in textbox and click search', function () {

  cy.fixture(RegulatoryFile).then((user) => {
    var MPCode = user.MarketingProfileCode
    cy.log(MPCode)
    RegulatoryProfile1.getRPSearchProfileCode().type(MPCode)
  })
    MarketingProfile1.getsearchbtn().click()
})
