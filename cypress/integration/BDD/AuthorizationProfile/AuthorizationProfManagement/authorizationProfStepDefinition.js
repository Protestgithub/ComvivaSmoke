/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';

import "../../../../support/commands";
import "../../../../support/authourizationcommands";

import authorizationManagement from '../../../../support/pageObjects/AuthorizationProfileManagement/authorizationManagement';
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

//------------------------ Authorization Profile Management----------------------------------

//----------TC_149-----To verify that system admin should be able to add authorization profile------------------------------

When('Select Authorization profile and add profile', function () {

  authorizationProfilePage.getAuthorizationProfileManagement().scrollIntoView()
  authorizationProfilePage.getAuthorizationProfileManagement().click({ force: true })
  authorizationProfilePage.getAddProfile().click({ force: true })
})

And('select Subscriber user type and select user role', function () {
  // cy.wait(3000)
  authorizationProfilePage.getAuthorizationUserType().click({ force: true })
  authorizationProfilePage.getAuthorizationUserType().focused()
  authorizationProfilePage.getAuthorizationUserRole().click({ force: true })

})
//-----------------------SubscriberM1S1----------------------

Then('Fill all Details and Create Subscriber authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    () => authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
   
  )
  cy.readFile(SubProfileName).then((data) => {
    data.SubscriberProfileName = profName
    cy.writeFile(SubProfileName, data)
  })
  cy.selectModule()
  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  cy.wait(5000)
  authorizationProfilePage.getConfirm().click({ force: true })
  authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})



//----------------------Approvals------------------------
Then('User approval for Authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getApprovals().scrollIntoView()
  authorizationProfilePage.getApprovals().click({ force: true })
  authorizationProfilePage.getApproveButton().click({ force: true })
  authorizationProfilePage.getApproveButtonSubmit().click({ force: true })
  //authorizationProfilePage.getApproveConfirmationMessage().should('contain.text'.this.data5.addconfirmationMessage)
})

//----------------------Administrator--------BusinessAdmin-----------------------------------
And('select BusinessAdmin user type and select user role', function () {
  //cy.wait(3000)
  authorizationProfilePage.getAdministratorType().click({ force: true })
  authorizationProfilePage.getAdministratorType().focused()
  authorizationProfilePage.getAdministratorBusinessAdmin().eq(0).click({ force: true })
})

Then('Fill all Details and Create BusinessAdmin authorization profile', function () {

  authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    () => authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })

  )
  cy.readFile(SubProfileName).then((data) => {
    data.businesAadmin = profName
    cy.writeFile(SubProfileName, data)
  })
  // cy.wait(3000)

  cy.selectModule()

  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})
//----------------------Administrator--------CustomercareAdmin-----------------------------------
And('select CustomercareAdmin user type and select user role', function () {
  //cy.wait(3000)
  authorizationProfilePage.getAdministratorType().click({ force: true })
  authorizationProfilePage.getAdministratorType().focused()
  authorizationProfilePage.getAdministratorBusinessAdmin().eq(1).click({ force: true })
})

Then('Fill all Details and Create CustomercareAdmin authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    () => authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })

  )
  cy.readFile(SubProfileName).then((data) => {
    data.CustomercareAdmin = profName
    cy.writeFile(SubProfileName, data)
  })

  cy.selectModule()
  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})
//----------------------Business-------------Distributor---------------------------------------------------

And('select Distributor user type and select user role', function () {
  // cy.wait(3000)
  authorizationProfilePage.getBusinessType().click({ force: true })
  authorizationProfilePage.getBusinessType().focused()
  authorizationProfilePage.getBusinessATMRole().eq(5).click({ force: true })

})

Then('Fill all Details and Create Distributor authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    () => authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })

  )

  cy.readFile(SubProfileName).then((data) => {
    data.BusinesselcoOperator = profName
    cy.writeFile(SubProfileName, data)
  })

  cy.selectModule()
  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})

//----------TC_150-----To verify that system admin should be able to ViewAuthorization profile for the selected category------------------------------
When('Select Authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getAuthorizationProfileManagement().click({ force: true })
})

Then('View Profiles', function () {
  cy.wait(3000)
  // authorizationProfilePage.getViewProfile().any().click({ force: true });
  authorizationProfilePage.getViewProfile().click({ force: true })
  authorizationProfilePage.getViewProfileSuccess().should('have.text', this.data5.viewprofile)

})


//----------TC_151----To verify that system admin should be able to modify an already created authorization profile-------------------------------

Then('Click on Modify Icon in front of authorization profile to modify', function () {
  cy.wait(3000)
  authorizationProfilePage.getEditProfile().click({ force: true })
  authorizationProfilePage.getModifyProfile().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  //authorizationProfilePage.getViewProfileModifySuccess().should('have.text', this.data5.modifysuccessmessage)
  authorizationProfilePage.getViewProfileModifyDone().click({ force: true })
})

//----------------------Approvals------------------------
Then('User approval for modified Authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getApprovals().scrollIntoView()
  authorizationProfilePage.getApprovals().click({ force: true })
  authorizationProfilePage.getApproveButton().click({ force: true })
  authorizationProfilePage.getApproveButtonSubmit().click({ force: true })
  // authorizationProfilePage.getApproveConfirmationMessage().should('contain.text', this.data5.modifyconfirmationMessage)
})


//----------TC_152-------To verify that System admin should be able to delete an authorization profile----------------------------

Then('Click on Modify Icon in front of authorization profile to delete', function () {
  cy.wait(3000)
  authorizationProfilePage.getDeleteProfile().click({ force: true })
  authorizationProfilePage.getYesDeleteProfile().click({ force: true })
  //authorizationProfilePage.getApproveConfirmationMessage().should('contain.text', this.data5.deletemessagesuccess)
})

