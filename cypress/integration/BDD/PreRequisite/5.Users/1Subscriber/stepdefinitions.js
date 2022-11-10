/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/subscriberCommands";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import { recurse } from 'cypress-recurse';

//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const myActivityPage = new myActivity()
const manageUsersPage = new manageUsers()
const uuid = () => Cypress._.random(1e8)
var CIF, mobile, Mobile, loginId, KycValue, name
mobile = "77" + uuid()
Mobile = "77" + uuid()
var subRegistration = 'cypress/fixtures/userData/subscriberReg.json'

function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })

});
//----------------Test Scripts---------------------------------------------------------------------------

//--------------------------User Management--------------------------------------------------------------

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
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})

//----------------Navigate to User Management tab and Click on Register---------------------------------
When('Navigate to User Management and Click on register', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})
//----------------------Basic Data---------------------------------------------------------------

When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
  cy.wait(2000)
  welcomePage.getApprovalButtonTab().click()

  //-------------------------------------------------Added wait until-------------------------------
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
And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(2000)
})


And('System Admin is able to view details', function () {
  (manageUsersPage.getViewIcon().click({ force: true }))
  cy.wait(3000)
})

And('Select User type as Subscriber and click on Subscriber', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo1.subUserType).click({ force: true })
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo1.subUserType).focused()
  registerPage.getUserRole().contains(this.data2.subPersonalInfo1.subUserRole).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})

//--------------------------------------------- Chethan--------------------------------------------

//----TC_68--------------------------User Management(Subscriber)---------------------------------------

//----------------------Basic Data---------------------------------------------------------------
Then('SubscrigReg Confirmation message is displayed', function () {

  registerPage.getNextButtonBasic2().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
  registerPage.getConfirmationText()
})

//-----TC_69-------------------------Approve(Subscriber)--------------------------------------------------
And('Navigate to My Activity and Apply Add User filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  cy.wait(2000)
  myActivityPage.getAddUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})

And('Navigate to My Activity and Apply Modified User filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  cy.wait(2000)
  myActivityPage.getModificationOfUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})

//--------------------------------------------------------------------------------------------------------

And('Assert Created Subscriber Mobile Number and Write Created on time', function () {
  cy.wait(2000)
  cy.readFile(subRegistration).then((user) => {
    let SubMobile = user.subscriberMobile
    var SUBMobile = " " + SubMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', SUBMobile)
  })
  cy.wait(2000)
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(subRegistration).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(subRegistration, data)
    })
  })
})
And('Assert Suspension creation Subscriber Mobile Number and Write Created on time', function () {
  cy.wait(2000)
  cy.readFile(subRegistration).then((user) => {
    let SubMobile = user.subscriberMobileSuspend
    var SUBMobile = " " + SubMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', SUBMobile)
  })
  cy.wait(2000)
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(subRegistration).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(subRegistration, data)
    })
  })
})
And('Assert Suspension of Subscriber Mobile Number and Write Created on time', function () {
  cy.wait(2000)
  cy.readFile(subRegistration).then((user) => {
    let SubMobile = user.subscriberMobileSuspend
    var SUBMobile = " " + SubMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', SUBMobile)
  })
  cy.wait(2000)
  myActivityPage.getCreatedOnTime().eq(1).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(subRegistration).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(subRegistration, data)
    })
  })
})

//-----------------------------------------------------------------------------------------------

And('User click on submitted user data for suspension', function () {
  cy.getApproval(subRegistration)
})

Then('Added User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})
//----------------------------Prerequisite Subscriber Creation for Suspension and Resumption-------------------------------

And('Enter all the required subscriber details for suspension and Resumption', function () {

  //-------------------Random Data-----------------------------------------------------------------

  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  CIF = "1" + lgid()
  cy.wait(2000)
  registerPage.getFirstName().type(getRandomName(), { force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })

  registerPage.getCIF().type(CIF, { force: true })

  recurse(
    () => registerPage.getMobileNumber().clear().type(Mobile, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  //cy.writeFile(subRegistration,{ subscriberMobile: mobile })
  cy.readFile(subRegistration).then((data) => {
    data.subscriberMobileSuspend = Mobile
    cy.writeFile(subRegistration, data)
  })


  cy.OTP(Cypress.env('apiBaseURL'), Cypress.env('apiURL'))

  //------------------------------------------------------------------------------------------------------------    
  registerPage.getAdressLine1().type(this.data2.subPersonalInfo.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo.city, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------KYC-----------------------------------------------------------------------
  const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp
  registerPage.getKycDropDownButton().eq(0).click({ force: true })
  registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
  registerPage.getKycIDValue().type(KycValue, { force: true }),
    registerPage.getMakeThisPrimaryButton().click({ force: true }),
    registerPage.getKycGracePeriod().select(this.data2.KycInfo.KycGracePeriod, { force: true })
  registerPage.getNextButtonBasic1().click({ force: true })

  //-----------------------Profile------------------------------------------------------------------------
  cy.wait(2000)
  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
  registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
  registerPage.getReguProfile().select("FullKycprofile", { force: true })
  registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })
})

And('enter user mobile number and search the user', function () {

  cy.getSubscriberMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })
})

And('System Admin is able to edit subscriber details', function () {

  manageUsersPage.getEditToolTip().eq(0).click({ force: true })

  registerPage.getFirstName().clear().type(getRandomName(), { force: true })
  registerPage.getLastName().clear().type(getRandomName(), { force: true })
  registerPage.getNextButtonBasic().click({ force: true })
  registerPage.getNextButtonBasic1().click({ force: true })
  registerPage.getNextButtonBasic2().click({ force: true })
})

Then('Confirm the edit details', function () {
  manageUsersPage.getConfirmButton().click({ force: true })
  approvalPage.getSuccessMessage().should('have.text', this.data2.confirmationMessage.successMessage)
  manageUsersPage.getDoneButton().click({ force: true })
})

//------TC_73-------------------------Admin Suspends Subscriber-------------------------------------------

And('enter user mobile number and search the SuspendResume user', function () {

  manageUsersPage.getUserSearchDetails().click({ force: true })
  cy.getSubscriberMobileNumberSuspension()
  manageUsersPage.getSearchUserButton().click({ force: true })

})

And('Suspend the user by giving the comment', function () {
  manageUsersPage.getSuspendUser().click({ force: true })
  manageUsersPage.getCommentBox().type(this.data2.modifyPersonalInfo8.comments, { force: true })
  manageUsersPage.getSubmitSuspendResumeButton().click({ force: true })
})

Then('Verify the user suspend Confirmation message', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.suspendResumeConfirmationMessage.suspendResumeUser)
})


When('Navigate to Approvals', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
  cy.wait(2000)
  welcomePage.getApprovalButtonTab().click()

  //-------------------------Added waituntil----------------------------------------------------------
  cy.waitUntil(() => {
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })

  cy.wait(2000)
})

And('Admin click on Suspended user data', function () {
  cy.getApproval(subRegistration)

})
And('Approve to suspended the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})

Then('Verify the user Suspended approval message', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.suspendResumeConfirmationMessage.userSuspended)
})


//--------TC_74-----------------------Admin Resumes Subscriber-------------------------------------------


And('Resume the user by giving the comment', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
  manageUsersPage.getSuspendUser().click({ force: true })
  manageUsersPage.getCommentBox().type(this.data2.modifyPersonalInfo8.comments, { force: true })
  manageUsersPage.getSubmitSuspendResumeButton().click({ force: true })
})
And('Admin click on Resumeded user data', function () {
  cy.getApproval(subRegistration)
})

//----------------Approve----------------
And('Approve the Resumed User', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})
Then('Verify the user Resumed approval message', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.suspendResumeConfirmationMessage.userResumed)
})


When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

Then('Verify the user resume Confirmation message', function () {
  approvalPage.getApproveConfirmationMessage().should("contain", this.data2.suspendResumeConfirmationMessage.suspendResumeUser)
})