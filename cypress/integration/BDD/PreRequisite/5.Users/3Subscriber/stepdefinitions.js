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
const SubMob = 'userData/subscriberReg.json'
var lid, eid, CIF, mobile, Mobile, Submobile, loginId, KycValue, name
mobile = "77" + uuid()
Mobile = "77" + uuid()
var subRegistration = 'cypress/fixtures/userData/subscriberReg.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
var RegulatoryMarketingProfile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'



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

//---------------------------------------------System Admin Login----------------------------------------------------
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
//----------------Navigate to User Management tab and Click on Register---------------------------------
When('Navigate to User Management and Click on register', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})

//------------------------------------Approve----------------------------------------------------------
And('System Admin is able to view details', function () {
  (manageUsersPage.getViewIcon().click({ force: true }))
  cy.wait(3000)
})

//---------------------------------------Narendra-------------------------------------------------
//-------------------------------TC_182------------------------------------------------------------

And('Select User type as Subscriber and click on Subscriber', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo1.subUserType).click({ force: true })
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo1.subUserType).focused()
  registerPage.getUserRole().contains(this.data2.subPersonalInfo1.subUserRole).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
//----------------------Basic Data---------------------------------------------------------------
And('Fill all required details and Enter Email and Contact Number which are not verified and confirm Error message', function () {
  cy.wait(2000)
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.getrandomUserEmailID()
  recurse(
    () => registerPage.getMobileNumber().type(mobile, { force: true }),
    () => registerPage.getFirstName().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getAdressLine1().type(getRandomName(), { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo1.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo1.city, { force: true })

})

//---------------------------------------------TC_183--------------------------------------------------------
And('Fill all required details and Enter Invalid value and confirm Error message', function () {

  //-------------------Random Data-----------------------------------------------------------------
  cy.wait(2000)
  registerPage.getFirstName().type(this.data2.subPersonalInfo1.firstName, { force: true })
  cy.getrandomUserEmailID()
  recurse(
    () => registerPage.getMobileNumber().type(mobile, { force: true }),
    () => registerPage.getLastName().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getAdressLine1().type(getRandomName(), { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo1.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo1.city, { force: true })
})

//---------------------------------TC_184--------------------------------------------------

And('Enter all the mandatory KYC details and click on next', function () {
  registerPage.getNextButtonBasic().click({ force: true })
  registerPage.getKYCButton().click({ force: true })
  registerPage.getKYCIDType().select(this.data2.subPersonalInfo1.KYCIDType, { force: true })
  registerPage.getKYCIDValue().type(this.data2.subPersonalInfo1.KYCValue, { force: true })
  registerPage.getKYCGracePeriod().select(this.data2.subPersonalInfo1.KYCGracePeriod, { force: true })
  registerPage.getMakeThisPrimaryButton().click({ force: true })
  registerPage.getNextButtonBasic1().click({ force: true })
})
Then('Enter all the marketing ,regulatory, authorization profile details and click on next', function () {

  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })

  registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })

  registerPage.getReguProfile().select("NoKycprofile", { force: true })

  registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })

  registerPage.getNextButtonBasic2().click({ force: true })
})

//-------------------------------------TC_187-------------------------------------------------

And('Fill all required details and enter registered EmailID and confirm Error message', function () {

  cy.wait(2000)
  registerPage.getFirstName().type(this.data2.personalInfo.firstName, { force: true })
  registerPage.getLastName().type(this.data2.personalInfo.lastName, { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(this.data2.personalInfo.firstName, this.data2.personalInfo.lastName, { force: true })
  registerPage.getEmailID().type(this.data2.personalInfo.emailID, { force: true })
  registerPage.getMobileNumber().type(mobile, { force: true })
  registerPage.getAdressLine1().type(this.data2.subPersonalInfo1.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo1.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo1.city, { force: true })
})

And('User click on submitted user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ 'force': true })
  approvalPage.getApproveButton()
})

//----------------------------Prerequisite Subscriber Creation for Suspension and Resumption-------------------------------

//----TC_70--------------------------------Modify Subscriber-------------------------------------------------
When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

And('enter user mobile number and search the user', function () {

  cy.getSubscriberMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })

})
Then('Confirm the edit details', function () {
  manageUsersPage.getConfirmButton().click({ force: true })
  approvalPage.getSuccessMessage().should('have.text', this.data2.confirmationMessage.successMessage)
  manageUsersPage.getDoneButton().click({ force: true })
})


//------TC_72------------------------Notification to the User--------------------------------------------

And('System Admin is able to edit KYC details', function () {
  const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp
  manageUsersPage.getEditToolTip().eq(0).click({ force: true })
  registerPage.getNextButtonBasic().eq(0).click({ force: true })
  registerPage.getKycDropDownButton().eq(0).click({ force: true })
  cy.wait(5000)
  registerPage.getMakeThisPrimaryButton().eq(0).click({ force: true })
  registerPage.getAddMoreButton().click({ force: true })
  registerPage.getKycDropDownButton().eq(1).click({ force: true })
  cy.wait(5000)
  registerPage.getKycIDType().select(this.data2.ModifyKycInfo.KycIDType, { force: true })

  registerPage.getKycIDValue().clear({ force: true }).type(KycValue, { force: true })
  registerPage.getMakeThisPrimaryButton().eq(0).click({ force: true })
  registerPage.getNextButtonKYC().eq(1).click({ force: true })
  registerPage.getNextButtonBasic2().click({ force: true })
  cy.wait(2000)

})
Then('verify message sent to user', () => {
  cy.getSubMessage(Cypress.env('Adminurl'))

})

When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
  cy.wait(2000)
  welcomePage.getApprovalButtonTab().click()

  //-----------------------------------------Added waituntil-------------------------------------------------
  cy.waitUntil(() => {
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })

  cy.wait(2000)
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.wait(2000)
  approvalPage.getAddUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })
})

//----------------------------------------------Monica-----------------------------------------------------
//------------------------------------------Test Scripts---------------------------------------------------
//--------------------------------USER MANAGEMENNT MANAGE USER----------------------------------------------
And('Enter Mobile number and KYC number in search menu1', function () {
  cy.fixture(SubMob).then((user) => {
    var SubMob1 = user.subscriberMobile
    cy.log(SubMob1)
    manageUsersPage.getSearchUser().type(SubMob1)
  })
  manageUsersPage.getSearchUserButton().click({ force: true })
})
And('Click on view Details and Click on Account info', function () {

  manageUsersPage.getViewIcon().eq(0).click({ force: true })
  manageUsersPage.getAccountInfo().click({ force: true })
})
And('select either UNLock outgoing payments or UNLock incoming payments or Lock both', function () {

  manageUsersPage.getlockunclockWallets().click({ force: true })
  manageUsersPage.getLockOutgoingPayements().click({ force: true })

})
Then('Click On UNLock', function () {
  manageUsersPage.getunlockbtn().click({ force: true })
  manageUsersPage.getconfirmationlock().type(getRandomName(), { force: true })
  manageUsersPage.getconfirmationbtn().click({ force: true })
  manageUsersPage.getlockedmessage().should('have.text', this.data2.UnlockOutgoing)
})

