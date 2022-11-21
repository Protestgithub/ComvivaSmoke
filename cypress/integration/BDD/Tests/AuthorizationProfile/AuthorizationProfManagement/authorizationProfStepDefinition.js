/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/authourizationcommands";

import authorizationManagement from '../../../../../support/pageObjects/AuthorizationProfileManagement/authorizationManagement';
import { recurse } from 'cypress-recurse';


//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const authorizationProfilePage = new authorizationManagement()
const welcomePage = new homePage()
const uid = () => Cypress._.random(1e6)
const id = uid()
var profName
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })

  cy.fixture('authorizationProfile').then(function (data5) {
    this.data5 = data5;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
});


function getRandomName() {
  profName = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 6; i++)
    profName += possible.charAt(Math.floor(Math.random() * possible.length));
  return profName;
}

//----------------Test Scripts---------------------------------------------------------------

//----------------Launch Mobiquity Portal URL and Login--------------------------------------


Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
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
Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})


//----------TC_150-----To verify that system admin should be able to ViewAuthorization profile for the selected category------------------------------
When('Select Authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getAuthorizationProfileManagement().click({ force: true })
})

Then('View Profiles', function () {
  cy.wait(3000)
  authorizationProfilePage.getViewProfile().click({ force: true })
  authorizationProfilePage.getViewProfileSuccess().should('have.text', this.data5.viewprofile)

})


//----------TC_151----To verify that system admin should be able to modify an already created authorization profile-------------------------------

Then('Click on Modify Icon in front of authorization profile to modify', function () {
  cy.wait(3000)
  authorizationProfilePage.getViewProfile().click({ force: true })
  authorizationProfilePage.getEditProfile().click({ force: true })
  authorizationProfilePage.getModifyProfile().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  authorizationProfilePage.getViewProfileModifyDone().click({ force: true })
})

//----------------------Approvals------------------------
Then('User approval for modified Authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getApprovals().scrollIntoView()
  authorizationProfilePage.getApprovals().click({ force: true })
  cy.wait(2000)
  authorizationProfilePage.getApprovalButtonTab().click()
  cy.wait(2000)
  authorizationProfilePage.getApproveButton().click({ force: true })
  authorizationProfilePage.getApproveButtonSubmit().click({ force: true })
})


//----------TC_152-------To verify that System admin should be able to delete an authorization profile----------------------------

Then('Click on Modify Icon in front of authorization profile to delete', function () {
  cy.wait(3000)
  authorizationProfilePage.getDeleteProfile().click({ force: true })
  authorizationProfilePage.getYesDeleteProfile().click({ force: true })
})

