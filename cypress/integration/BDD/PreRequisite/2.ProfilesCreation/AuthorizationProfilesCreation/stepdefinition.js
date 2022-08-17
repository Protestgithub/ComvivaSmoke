/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';
import "../../../../../support/commands";
import "../../../../../support/securityCommands";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import SecurityProfilePage from '../../../../../support/pageObjects/SecurityProfile/SecurityProfilePage';
import "../../../../../support/authourizationcommands"
import authorizationManagement from '../../../../../support/pageObjects/AuthorizationProfileManagement/authorizationManagement';

//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const securityProfilePage = new SecurityProfilePage()
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
  cy.wait(2000)
 // cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
 // cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin User after Logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
//  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin User after logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin2()
  cy.wait(2000)
//  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})

Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})

//----------------------------------------------------------------------------------------------------

Given('Login into Mobiquity Portal as masteradmin Maker', function () {
  cy.wait(3000)
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masterAdmin2.masterchckr1, this.data1.masterAdmin2.mstAdminPwd1)
  cy.wait(2000)
  // cy.checkWelcomeText(this.data2.SuperAdminChecker)
})
//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
})
//superadminc
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
})
Given('Login into Mobiquity Portal as Super admin Maker after Logout', function () {
  cy.loginAgain(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data2.superadminm.superadminmaker)
})

Given('Login into Mobiquity Portal as Super admin Checker after Logout', function () {
  cy.loginAgain(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data2.superadminc.superadminchecker)
})

Given('Login with Master Admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
})

//------------------------ Authorization Profile Management----------------------------------

//------------------------ Authorization Profile Management----------------------------------

//----------TC_149-----To verify that system admin should be able to add authorization profile------------------------------

When('Select Authorization profile and add profile', function () {

  authorizationProfilePage.getAuthorizationProfileManagement().scrollIntoView()
  authorizationProfilePage.getAuthorizationProfileManagement().click({ force: true })
  authorizationProfilePage.getAddProfile().click({ force: true })
})

And('select Subscriber user type and select user role', function () {
  cy.wait(2000)
  authorizationProfilePage.getAuthorizationUserType().click({ force: true })
  cy.wait(2000)
  authorizationProfilePage.getAdministratorType().focused() 
  cy.wait(2000)
  authorizationProfilePage.getAuthorizationUserRole().contains('Subscriber').click({ force: true })

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
  cy.readFile(AuthProfileName).then((data) => {
    data.SubscriberProfileName = profName
    cy.writeFile(AuthProfileName, data)
  })
  cy.selectModule()
  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  cy.wait(5000)
  authorizationProfilePage.getConfirm().click({ force: true })
  // authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
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
  //authorizationProfilePage.getApproveConfirmationMessage().should('contain.text'.this.data5.addconfirmationMessage)
})

//----------------------Administrator--------BusinessAdmin-----------------------------------
And('select BusinessAdmin user type and select user role', function () {
  cy.wait(2000)
  authorizationProfilePage.getAdministratorType().click({ force: true })
  cy.wait(2000)
  authorizationProfilePage.getAdministratorType().focused()
  cy.wait(2000)
  authorizationProfilePage.getAdministratorBusinessAdmin().contains('Business Admin').click({ force: true })
})

Then('Fill all Details and Create BusinessAdmin authorization profile', function () {

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
    data.businesAadmin = profName
    cy.writeFile(AuthProfileName, data)
  })
  // cy.wait(3000)

  cy.selectModule()

  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  // authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})
//----------------------Administrator--------CustomercareAdmin-----------------------------------
And('select CustomercareAdmin user type and select user role', function () {
  cy.wait(2000)
  authorizationProfilePage.getAdministratorType().click({ force: true })
  cy.wait(2000)
  authorizationProfilePage.getAdministratorType().focused()
  cy.wait(2000)
  authorizationProfilePage.getAdministratorBusinessAdmin().contains('Customer care Admin').click({ force: true })
})

Then('Fill all Details and Create CustomercareAdmin authorization profile', function () {
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
    data.CustomercareAdmin = profName
    cy.writeFile(AuthProfileName, data)
  })

  cy.selectModule()
  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  // authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})
//----------------------Business-------------Distributor---------------------------------------------------

And('select Distributor user type and select user role', function () {
  cy.wait(2000)
  authorizationProfilePage.getBusinessType().click({ force: true })
  cy.wait(2000)
  authorizationProfilePage.getBusinessType().focused()
  cy.wait(2000)
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
  // authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
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
    cy.wait(2000)
  authorizationProfilePage.getApprovalButtonTab().click()
  cy.wait(2000)
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

