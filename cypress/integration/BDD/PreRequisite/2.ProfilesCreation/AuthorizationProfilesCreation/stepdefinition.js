/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';
import "../../../../../support/commands";
import "../../../../../support/securityCommands";
import "../../../../../support/authourizationcommands"
import authorizationManagement from '../../../../../support/pageObjects/AuthorizationProfileManagement/authorizationManagement';

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
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('authorizationProfile').then(function (data7) {
    this.data7 = data7;
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
//--------------------------------------------------------------------------------------------------------

//------------------------------------- Authorization Profile Management----------------------------------

//----------TC_149-----To verify that system admin should be able to add authorization profile------------

When('Select Authorization profile and add profile', function () {
  authorizationProfilePage.getAuthorizationProfileManagement().scrollIntoView()
  authorizationProfilePage.getAuthorizationProfileManagement().click({ force: true })
  authorizationProfilePage.getAddProfile().click({ force: true })
})

And('select Subscriber user type and select user role', function () {
  authorizationProfilePage.getAuthorizationUserType().click({ force: true })
  authorizationProfilePage.getAdministratorType().focused() 
  authorizationProfilePage.getAuthorizationUserRole().click({ force: true })

})
//-----------------------SubscriberM1S1----------------------

Then('Fill all Details and Create Subscriber authorization profile', function () {
  authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
  cy.wait(3000)
  authorizationProfilePage.getUserServicePreferences().click({ force: true })
  cy.readFile(AuthProfileName).then((data) => {
    data.SubscriberProfileName = profName
    cy.writeFile(AuthProfileName, data)
  })
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  authorizationProfilePage.getProfileDoneButton().click({ force: true })
})

//----------------------Approvals------------------------
Then('User approval for Authorization profile', function () {
  authorizationProfilePage.getApprovals().scrollIntoView()
  authorizationProfilePage.getApprovals().click({ force: true })
  authorizationProfilePage.getApprovalButtonTab().click()
  
  //-------------------Added wait until------------------------
  cy.waitUntil(()=>{
    return cy.iframe().find('h4.text-secondary').should('be.visible')
  })
  authorizationProfilePage.getApproveButton().click({ force: true })
  authorizationProfilePage.getApproveButtonSubmit().click({ force: true })  
})