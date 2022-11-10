/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/AdministratorCommands"
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import { recurse } from 'cypress-recurse';
import API from '../../../../../support/pageObjects/API';



//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const myActivityPage = new myActivity()
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()
var mobile
var name
var filename = 'cypress/fixtures/userData/AdministratorData.json'
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}


//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })

});
//----------------Test Scripts---------------------------------------------------------------------------

//--------------------------User Management--------------------------------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
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


When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getApprovalTab().click()
  cy.wait(2000)
  welcomePage.getApprovalButtonTab().click()
  //-------------------------------------Added waituntil--------------------
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
})
//------------------------------------Approve----------------------------------------------------------

And('Navigate to My Activity and Apply Modified User filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  cy.wait(2000)
  myActivityPage.getModificationOfUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})
//--------------------------------------------------------------------------------------------------------
And('Assert Created Business Admin Mobile Number and Write Created on time', function () {
  cy.wait(2000)
  cy.readFile(filename).then((user) => {
    let BAMobile = user.BAMobileNumber
    var BBAMobile = " " + BAMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', BBAMobile)
  })
  cy.wait(2000)
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(filename).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(filename, data)
    })
  })
})

And('Assert Created Customer care Admin Mobile Number and Write Created on time', function () {
  cy.wait(2000)
  cy.readFile(filename).then((user) => {
    let CAMobile = user.CCAMobileNumber
    var CCAMobile = " " + CAMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', CCAMobile)
  })
  cy.wait(2000)
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(filename).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(filename, data)
    })
  })
})

//-----------------------------------------------------------------------------------------------
And('User click on submitted user data', function () {
  cy.getApproval(filename)
})
//------------------------------------Approve----------------------------------------------------------


And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})

Then('User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})

When('Navigate to Manage User, and search Business Admin', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

And('Search Business Admin', function () {
  cy.wait(2000)
  cy.getBAMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })
})

And('System Admin is able to view details', function () {
  (manageUsersPage.getViewIcon().click({ force: true }))
  cy.wait(3000)
})

And('System Admin is able to edit details', function () {
  manageUsersPage.getEditToolTip().eq(0).click({ force: true })
  registerPage.getLastName().clear().type(getRandomName(), { force: true })
  recurse(
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    () => registerPage.getLastName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )

  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })
  registerPage.getNextButtonProfile().click({ force: true })
})

Then('Confirm the edit details', function () {
  manageUsersPage.getConfirmButton().click({ force: true })
  manageUsersPage.getDoneButton().click({ force: true })
})
Then('User modified is approved', function () {
  approvalPage.getApproveConfirmationMessage()
})

//===================================USER MANAGEMENT======================================================
And('Assert Created Customer Admin Mobile Number', function () {
  cy.wait(2000)
  cy.getCCAMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })
  cy.readFile(filename).then((user) => {
    let CCAMobile = user.CCAMobileNumber
    var CAMobile = " " + CCAMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', CAMobile)
    cy.wait(2000)
  })
})
//-----------------------------SC_45----------------------------------------------------------
//---------------------------Login with another Admin credentials------------------------------------

//------------------------------------MobileNumber------------------------------------------------------
And('Search with Mobile Number', function () {
  cy.wait(2000)
  cy.getCCAMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })

})

And('System Admin is able to edit details of the user', function () {
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  manageUsersPage.getEditToolTip().eq(0).click({ force: true })
  recurse(
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    () => registerPage.getLastName().clear().type(getRandomName()),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  manageUsersPage.getNextbttn().eq(0).click({ force: true })
  manageUsersPage.getNextbttn().eq(1).click({ force: true })
})

And('Confirm the edit details Of the User', function () {
  manageUsersPage.getConfirmButton().click({ force: true })
  cy.wait(2000)
  registerPage.getConfirmationText1().should('have.text', this.data2.confirmationMessage.editUser1)
  manageUsersPage.getDoneButton().click({ force: true })
})
And('Navigate to the Approvals', function () {
  welcomePage.getApprovalTab().click()
  cy.wait(2000)
  welcomePage.getApprovalButtonTab().click()
  //-------------------Added waituntil----------------------------------
  cy.waitUntil(() => {
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })
  cy.wait(2000)
  pageLogin.getiFrame()
})
//------------------------------------------TC_46------------------------------------------

And('Approve the Users and Check for SMS Notification sent to user', function () {
  cy.wait(2000)
  cy.getMessage(Cypress.env('Adminurl'))
})


//-------------------------------SC_48--------------------------------------------------------------

//---------------------------Login with another Admin credentials------------------------------------

And('Search Business or Customer care Admin', function () {
  cy.wait(2000)
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile(filename).then((user) => {
    let CCAMobile = user.CCAMobileNumber
    manageUsersPage.getSearchUser().type(CCAMobile, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})

Then('System Admin is able to Delete the User', function () {
  (manageUsersPage.getViewIcon().click({ force: true }))
  cy.wait(2000)
  manageUsersPage.getDelete().eq(0).click({ force: true })
  manageUsersPage.getComment().type(getRandomName(), { force: true })
  cy.getreason()
  manageUsersPage.getDeleteButton().click({ force: true })
})

//-----------------------------------SC_50--------------------------------------------------------

Then('Reject the Users', function () {
  approvalPage.getRejectButton().click({ force: true })
  approvalPage.getRejectComment().type(getRandomName(), { force: true })
  approvalPage.getRejectRequest().click({ force: true })

})
Then('verify user is rejected', function () {
  manageUsersPage.getRejectErrorMessage().contains(this.data2.personalInfo.rejecterrormessage)
})

Then('verify user is deleted', function () {
  cy.wait(2000)
  manageUsersPage.getRejectErrorMessage().contains(this.data2.personalInfo.deletemessage)
})
