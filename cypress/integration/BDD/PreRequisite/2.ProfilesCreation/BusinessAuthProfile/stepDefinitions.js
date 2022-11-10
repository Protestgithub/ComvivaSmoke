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
    cy.wait(2000)
  })
Given('Login into Mobiquity Portal as another System admin User after logout', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.wait(2000)
    cy.SysAdminlogin2()
    cy.wait(2000)
  })
Then('Logout', function () {
    welcomePage.getUserMenu().click()
    welcomePage.getLogoutButton().click()
    welcomePage.getLogoutYesButton().click()
  })
  
  //----------------------------------------------------------------------------------------------------

  When('Select Authorization profile and add profile', function () {

    authorizationProfilePage.getAuthorizationProfileManagement().scrollIntoView()
    authorizationProfilePage.getAuthorizationProfileManagement().click({ force: true })
    authorizationProfilePage.getAddProfile().click({ force: true })
  })
And('select Distributor user type and select user role', function () {
    cy.wait(4000)
    authorizationProfilePage.getBusinessType().click({ force: true })
    cy.wait(4000)
    authorizationProfilePage.getBusinessType().focused()
    cy.wait(4000)
    authorizationProfilePage.getBusinessType().click({ force: true })
    cy.wait(4000)
    authorizationProfilePage.getBusinessATMRole().contains('Distributer').click({ force: true })
  
  })
  
Then('Fill all Details and Create Distributor authorization profile', function () {
    cy.wait(3000)
    authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
      authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
    recurse(
      () => authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
      () => authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
      (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
        ('Authorization profile name already exists,please try with different name').should('be.visible'),
      authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  
    )
  
    cy.readFile(AuthProfileName).then((data) => {
      data.BusinesseDistributor = profName
      cy.writeFile(AuthProfileName, data)
    })
  
    cy.selectModule()
    cy.wait(3000)
    authorizationProfilePage.getAdd().click({ force: true })
    authorizationProfilePage.getConfirm().click({ force: true })
    authorizationProfilePage.getProfileDoneButton().click({ force: true })
  
  })
//----------------------Approvals------------------------
Then('User approval for Authorization profile', function () {
    cy.wait(3000)
    authorizationProfilePage.getApprovals().scrollIntoView()
    authorizationProfilePage.getApprovals().click({ force: true })
      cy.wait(2000)
    authorizationProfilePage.getApprovalButtonTab().click()
    
    //-------------------Added wait until------------------------
    cy.waitUntil(()=>{
      return cy.iframe().find('h4.text-secondary').contains('Approvals')
    })
    cy.wait(2000)
    authorizationProfilePage.getApproveButton().click({ force: true })
    authorizationProfilePage.getApproveButtonSubmit().click({ force: true })
    
  })  