/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';
import "../../../../../support/utils/Generic";
import "../../../../../support/utils/authourizationcommands";

import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import authorizationManagement from '../../../../../support/pageObjects/AuthorizationProfileManagement/authorizationManagement';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';

//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const myActivityPage = new myActivity()
const approvalPage = new approvals()
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





//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------

//------------------------ Authorization Profile Management----------------------------------

When('Select Authorization profile and add profile', function () {

  authorizationProfilePage.getAuthorizationProfileManagement().scrollIntoView()
  cy.intercept('/mobiquitypay/v1/authorization-profiles').as('all')

  authorizationProfilePage.getAuthorizationProfileManagement().click({ force: true })
  authorizationProfilePage.getAddProfile().click({ force: true })
  cy.checkAPI('/mobiquitypay/v1/authorization-profiles')
})

And('select Subscriber user type and select user role', function () {
  cy.wait(2000)
  cy.intercept('/mobiquitypay/ums/channels').as('all')

  authorizationProfilePage.getAuthorizationUserType().click({ force: true })
  cy.wait(2000)

  authorizationProfilePage.getAdministratorType().focused()
  cy.wait(2000)

  authorizationProfilePage.getAuthorizationUserRole().contains('Subscriber').click({ force: true })
  cy.checkAPI('/mobiquitypay/ums/channels')

})
//-----------------------SubscriberM1S1----------------------

Then('Fill all Details and Create Subscriber authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    () => authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),

  )
  cy.writeFile(AuthProfileName, {})
  cy.readFile(AuthProfileName).then((data) => {
    data.SubscriberProfileName = profName
    cy.writeFile(AuthProfileName, data)
  })
  cy.selectModule()
  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  cy.wait(5000)
  cy.intercept('/mobiquitypay/v1/authorization-profile').as('all')
  authorizationProfilePage.getConfirm().click({ force: true })
  cy.checkAPI('/mobiquitypay/v1/authorization-profile')
  authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data7.authorizationprofilesuccess)
  cy.intercept('/mobiquitypay/v1/ums/workspace-categories?workspaceId=').as('all')
  authorizationProfilePage.getProfileDoneButton().click({ force: true })
  cy.checkAPI('/mobiquitypay/v1/ums/workspace-categories?workspaceId=')

})



//----------------------Approvals------------------------
Then('User approval for Authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getApprovals().scrollIntoView()
  authorizationProfilePage.getApprovals().click({ force: true })
  cy.wait(2000)

  cy.intercept('/mobiquitypay/sfm/levels').as('all')
  authorizationProfilePage.getApprovalButtonTab().click()
  cy.checkAPI('/mobiquitypay/sfm/levels')

  //-------------------Added wait until------------------------
  cy.waitUntil(() => {
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })

  cy.wait(2000)
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.wait(2000)
  approvalPage.getSubmittedCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })
  cy.getApproval(AuthProfileName)
  cy.wait(4000)
  cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('all')
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
  cy.checkAPI('/mobiquitypay/serviceRequest/resume/any')
})

Then('View Subscriber authorization profile and Write Created on time', function () {
  cy.wait(2000)
  myActivityPage.getAuthCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(AuthProfileName).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(AuthProfileName, data)
    })
  })
})

And('Navigate to My Activity for Subscriber authorization profile and Aplly required filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  cy.wait(2000)
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})


