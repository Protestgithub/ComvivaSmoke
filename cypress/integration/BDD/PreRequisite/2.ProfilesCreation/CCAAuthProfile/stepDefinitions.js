/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import { And, Before, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import 'cypress-iframe';
import { recurse } from 'cypress-recurse';
import "../../../../../support/authourizationcommands";
import "../../../../../support/commands";
import authorizationManagement from '../../../../../support/pageObjects/AuthorizationProfileManagement/authorizationManagement';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/securityCommands";

//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()
const authorizationProfilePage = new authorizationManagement()
var AuthProfileName = 'cypress/fixtures/profileData/AuthProfile.json'
var profName


function getRandomName() {
  profName = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    profName += possible.charAt(Math.floor(Math.random() * possible.length));
  return profName;
}
//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
});

//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.fixture('userData/SystemAdminLogin.json').then((data)=>{
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.fixture('userData/SystemAdminLogin.json').then((data)=>{
    let Name = data.SysAdminChecker1Name
    cy.checkWelcomeText(Name)
  })
})

//----------------------------------------------------------------------------------------------------

When('Select Authorization profile and add profile', function () {
  authorizationProfilePage.getAuthorizationProfileManagement().scrollIntoView()
  authorizationProfilePage.getAuthorizationProfileManagement().click({ force: true })
  authorizationProfilePage.getAddProfile().click({ force: true })
})


And('select CustomercareAdmin user type and select user role', function () {
  authorizationProfilePage.getAdministratorType().click({ force: true })
 authorizationProfilePage.getAdministratorType().focused()
  authorizationProfilePage.getAdministratorCC().click({ force: true })
})

Then('Fill all Details and Create CustomercareAdmin authorization profile', function () {
  authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
  cy.wait(3000)
    authorizationProfilePage.getUserServicePreferences().click({ force: true })
  cy.readFile(AuthProfileName).then((data) => {
    data.CustomercareAdmin = profName
    cy.writeFile(AuthProfileName, data)
  })                                         
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  authorizationProfilePage.getProfileDoneButton().click({ force: true })
})

Then('User approval for Authorization profile', function () {
  authorizationProfilePage.getApprovals().scrollIntoView()
  authorizationProfilePage.getApprovals().click({ force: true })
  authorizationProfilePage.getApprovalButtonTab().click()

  //-------------------Added wait until------------------------
  cy.waitUntil(() => {
    return cy.iframe().find('h4.text-secondary').should('be.visible')
  })
  authorizationProfilePage.getApproveButton().click({ force: true })
  authorizationProfilePage.getApproveButtonSubmit().click({ force: true })
})