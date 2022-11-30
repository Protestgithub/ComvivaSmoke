/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/subscriberCommands";
import "../../../../../support/BusinessUserCommands";
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import register from '../../../../../support/pageObjects/UserManagement/register';
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import { recurse } from 'cypress-recurse';


//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const myActivityPage = new myActivity()
const uuuid = () => Cypress._.random(1e3)
amount = uuuid()
var name,amount,mobile,loginId
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()

var BuisnessReg = 'cypress/fixtures/userData/BusinessUsersData.json'
var BuisnessRegSuspension = 'cypress/fixtures/userData/BusinessUserSuspensionData.json'
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
  cy.SysAdminlogin()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminChecker1Name
    cy.checkWelcomeText(Name)
  })
})
Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})

Given('Login into Mobiquity Portal as Business admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
  cy.wait(8000)
  cy.readFile('cypress/fixtures/userData/BusinessUserSuspensionData.json').then((data) => {
    var SuspendedId
    SuspendedId = data.LoginId
    cy.login(SuspendedId, this.data1.businessAdmin.DefaultPassword)

  })
  pageLogin.getUserLoginMessage().should('contain', this.data1.ErrorMessageLogin)
})

Given('Login into Mobiquity Portal as Business admin User1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
  cy.wait(8000)
  cy.readFile('cypress/fixtures/userData/BusinessUserSuspensionData.json').then((data) => {
    var SuspendedId
    SuspendedId = data.LoginId
    cy.login(SuspendedId, this.data1.businessAdmin.DefaultPassword)
    cy.login1(this.data1.businessAdmin.businessadminPwd1)
    cy.wait(2000)
    cy.Passwordchange(this.data1.UserCreationSuccessMessage)
    pageLogin.getloginbtn1().click({ force: true })
  })
})
//----------------Navigate to User Management tab and Click on Register---------------------------------
When('Navigate to User Management and Click on register', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})
//-------------------------Confirmation Message displayed---------------------------------------------
Then('Confirmation message is displayed', function () {
  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
})
When('Navigate to Approvals and  click on suspended data', function () {
  welcomePage.getApprovalTab().click()
  welcomePage.getApprovalButtonTab().click()

  //------------------------------Added wait until------------------------------------------------

  cy.waitUntil(() => {
    return cy.iframe().find('h4.text-secondary').should('be.visible')
  })
})
//------------------------------------Approve----------------------------------------------------------
And('Navigate to My Activity and Apply Add User filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  myActivityPage.getAddUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})

And('Navigate to My Activity and Apply Modified User filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  myActivityPage.getModificationOfUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})
//--------------------------------------------------------------------------------------------------------

And('Assert Created Buissness User Mobile Number and Write Created on time', function () {
  cy.readFile(BuisnessReg).then((user) => {
    let BUMobile = user.registeredMobile
    var BUDMobile = " " + BUMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', BUDMobile)
  })
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(BuisnessReg).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(BuisnessReg, data)
    })
  })
})


//-----------------------------------------------------------------------------------------------
And('User click on submitted user data', function () {
  cy.getApproval(BuisnessReg)
})
And('User click on Suspended submitted user data', function () {
  cy.getApproval(BuisnessRegSuspension)
})

And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})

And('Approve the Users and Check for SMS Notification sent to user', function () {
  cy.getBusinessUserMessage(Cypress.env('Adminurl'))
})
//-----------------------------------Likith------------------------------------------------------------

/*-----------------------UserMAnagement--------------------------------------*/

When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()
})

When('User Click on eye button', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
})

/*----------------------------------------Barring-------------------------------------------------*/
Then('Click on Suspend user icon', function () {
  manageUsersPage.getSuspendUser().click({ force: true })
})
And('write comments to Suspend user', function () {
  manageUsersPage.getDailogbox().type(this.data2.dailogbox, { force: true })
})
And('click on yes', function () {
  manageUsersPage.getYesbtn().click({ force: true })
})

And('Select User type as Business and Select user role', function () {
  pageLogin.getiFrame()
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().eq(2).click({ force: true })
  registerPage.getSelectUserTypeTab().eq(2).focused()
  registerPage.getUserRole().eq(9).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
//----------------------Basic Data---------------------------------------------------------------
And('Enter all the required business user details', function () {
  let mobileut;
  const m = parseInt(Date.now() / 100000);
  mobileut = "77" + m
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.name + lgid()
  cy.iframe().find('select[data-test-id="title"]')
    .select(this.data2.personalInfo.Title, { force: true })
  //-----------------------Mobile Number OTP-------------------------------------------------------------------
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data)=>{
    data.registeredMobile=mobileut
    cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json',data)

  })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.OTP(Cypress.env('apiBaseURL'))

  //----------------email id otp---------------------------------------------------//
  cy.getBusinessrandomUserEmailID()
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  cy.OTP(Cypress.env('apiBaseURL'))

  registerPage.getSupportOnline().select(this.data2.personalInfo.online, { force: true })
  registerPage.getAdressLine1().type(this.data2.personalInfo.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.personalInfo.state, { force: true })
  registerPage.getCity().select(this.data2.personalInfo.city, { force: true })
  registerPage.getLatitude().type(this.data2.personalInfo.Latitude, { force: true })
  registerPage.getlongitude().type(this.data2.personalInfo.Longitude, { force: true })

  registerPage.getNextButtonBasic().eq(0).click({ force: true })

  let kycut
  const k = parseInt(Date.now());
  kycut = "A" + k
  //---------------------KYC-----------------------------------------------------------------------
  registerPage.getKYCButton().eq(0).click({ force: true })
  registerPage.getKYCIDType().select(this.data2.KycInfo8.KycIDType, { force: true })
  registerPage.getKYCIDValue().type(kycut, { force: true })
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
    data.RegisteredKyc = kycut
    cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json', data)

  })
  registerPage.getMakeThisPrimaryButton().eq(2).click({ force: true })
  registerPage.getNextButtonBasic1().click({ force: true })
  registerPage.getSecurityProfile().select('WholesalerDefaultSecurityProfile', { force: true })
  registerPage.getAuthProfile().select('WholesalerDefault Profile', { force: true })
  registerPage.getReguProfile().select('FullKycprofile', { force: true })
  registerPage.getMarketingProfile().select('WHSDefaultMP', { force: true })
  registerPage.getNextButtonBasic2().click({ force: true })
  // registerPage.getNextButtonBasic3().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
})

//-----------------------------------------------Kalyani-------------------------------------------------------

And('Enter Mobile number and KYC number in search for suspension', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile('cypress/fixtures/userData/BusinessUserSuspensionData.json').then((data) => {
    var mobile
    mobile = data.registeredMobile
    cy.log(mobile)
    manageUsersPage.getSearchUser().type(mobile, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })
})

And('Assert Buissness User Mobile Number for Suspension and Write Created on time', function () {
  cy.readFile(BuisnessRegSuspension).then((user) => {
    let BUMobile = user.registeredMobile
    var BUDMobile = " " + BUMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', BUDMobile)
  })

  myActivityPage.getCreatedOnTime().eq(1).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(BuisnessRegSuspension).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(BuisnessRegSuspension, data)
    })
  })
})

Then('Verify View Details Page', function () {
  manageUsersPage.getViewDetails().should("contain", this.data2.confirmationMessage.viewDetails)
})

Then('Verify the user resume Confirmation message', function () {
  approvalPage.getApproveConfirmationMessage().should("contain", this.data2.suspendResumeConfirmationMessage.suspendResumeUser)
})
When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
  welcomePage.getApprovalButtonTab().click()

  //--------------------------------Added wait until----------------------------- 
  cy.waitUntil(() => {
    return cy.iframe().find('h4.text-secondary').should('be.visible')
  })

  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  approvalPage.getSubmittedCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })

})

Then('User status is Suspended', function () {
  cy.waitUntil(() => {
    return cy.iframe().find('.mat-simple-snackbar.ng-star-inserted > span').should('be.visible')
  })
  approvalPage.getApproveConfirmationMessage().should("contain", this.data2.suspendResumeConfirmationMessage.userSuspended)
})

Then('User status is Resumed', function () {
  cy.waitUntil(() => {
    return cy.iframe().find('.mat-simple-snackbar.ng-star-inserted > span').should('be.visible')
  })
  approvalPage.getApproveConfirmationMessage().should("contain", this.data2.suspendResumeConfirmationMessage.userResumed)
})


