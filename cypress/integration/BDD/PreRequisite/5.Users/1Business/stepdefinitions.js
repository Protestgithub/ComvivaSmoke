// <reference types="Cypress" />
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
var mobile, amount, name
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()
var BuisnessReg = 'cypress/fixtures/userData/BusinessUsersData.json'
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
  cy.waitUntil(() => {
    return cy.iframe().find('div > h4[class="font-weight-bold mt-4 mb-2"]')
  })

})
//-------------------------Confirmation Message displayed---------------------------------------------
Then('Confirmation message is displayed', function () {
  cy.waitUntil(() => {
    return cy.iframe().find('.text-center').should('be.visible')
  })
  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
})

//------------------------------------Approve----------------------------------------------------------
And('Navigate to My Activity and Apply Add User filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })

  cy.waitUntil(() => {
    return cy.iframe().find('p.text-secondary.text-capitalize.font-weight-700').should('be.visible', { force: true })
  })
  myActivityPage.getAddUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
  cy.waitUntil(() => {
    return cy.iframe().find('#expansion').eq(0).should('be.visible', { force: true })
  })
})

And('Navigate to My Activity and Apply Modified User filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })

  cy.waitUntil(() => {
    return cy.iframe().find('p.text-secondary.text-capitalize.font-weight-700').should('be.visible', { force: true })
  })
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
And('User click on submitted user data for Unregistered', function () {
  cy.getApproval(BuisnessReg)
})
And('User click on submitted user data for Telco-Operator', function () {
  cy.getApproval(BuisnessReg)
})
And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})

When('Navigate to Manage User, and search Business Admin', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})
And('System Admin is able to view details', function () {
  (manageUsersPage.getViewIcon().eq(0).click({ force: true }))

})

Then('Confirm the edit details', function () {
  manageUsersPage.getConfirmButton().click({ force: true })

  manageUsersPage.getDoneButton().click({ force: true })

})
//-----------------------------------Likith------------------------------------------------------------

/*-----------------------UserMAnagement--------------------------------------*/

When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

And('enter user mobile number and search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.getBusinessUserMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })

})

When('User Click on eye button', function () {

  manageUsersPage.getEyeIcon().click({ force: true })

})
And('goto credencials submenu', function () {
  manageUsersPage.getMore().eq(0).click({ force: true })
  manageUsersPage.getCredentials().click({ force: true })
})
And('Click on reset icon to reset password', function () {
  manageUsersPage.getResetbttn().click({ force: true })
  manageUsersPage.getConfirmReset().click({ force: true })

})
/*----------------------edit user management----------------------------------------------------*/

When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

And('enter user mobile number and search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getSearchUser().type(this.data2.mob, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})

And('Click on edit', function () {
  manageUsersPage.getEditIcon().eq(1).click({ force: true })
})
And('Edit the required details >> Click on Next', function () {
  manageUsersPage.getNextbttn().eq(0).click({ force: true })
  manageUsersPage.getNextbttn().eq(1).click({ force: true })
  manageUsersPage.getNextbttn().eq(2).click({ force: true })

})
And('Click on save', function () {
  cy.intercept('/mobiquitypay/v1/ums/user').as('getconfirm')
  manageUsersPage.getConfirmButton().click({ force: true })
  cy.wait('@getconfirm')
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
Then('Verify the user suspend Confirmation message', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.suspendResumeConfirmationMessage.suspendResumeUser)
})

Then('Verify Error message', function () {
  manageUsersPage.getErrormessage().contains(this.data2.personalInfo.errmsg)

})


/*-----------------------------telco operator------------------------------------------*/
And('Select User type as Business and click on Telco operator', function () {
  registerPage.getSelectUserTypeTab().eq(2).click({ force: true })
  registerPage.getSelectUserTypeTab().eq(2).focused()
  registerPage.getUserRole().eq(4).click({ force: true })

  cy.waitUntil(() => {
    return cy.iframe().find('div.row.px-2').eq(0).should('be.visible', { force: true })
  })

  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
And('Enter all the mandatory Basic information details and click on next', function () {
  const uuid1 = () => Cypress._.random(1e8)
  var mobile2 = "77" + uuid1()

  cy.waitUntil(() => {
    return cy.iframe().find('h4.font-weight-bold.ng-star-inserted').eq(0).should('be.visible', { force: true })
  })
  registerPage.getTitle().select(this.data2.personalInfo.title, { force: true })
  registerPage.getLastName().type(this.data2.personalInfo.lastName, { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile2, { force: true }),
    () => registerPage.getFirstName().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
    data.telcoMobile = mobile2
    cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json', data)
  })
  registerPage.getNextButtonBasic().click({ force: true })
})
Then('Enter all the mandatory Profile details like marketing profile,regulatory profile,Operator profile.', function () {
  registerPage.getRegulatory().select('FullKycprofile', { force: true })
  registerPage.getMarketing().select('TELOPTDefaultMP', { force: true })
  registerPage.getNextButtonProfile().click({ force: true })
  registerPage.getSMSC().select(this.data2.personalInfo.smscid, { force: true })
  registerPage.getTopUpId().select(this.data2.personalInfo.topupid, { force: true })
  registerPage.getVouchers().click({ force: true })
  registerPage.getRechargingOpt().select(this.data2.personalInfo.recharge, { force: true })
  registerPage.getDenominationOptional().type("123", { force: true })
})
And('Click on Next >> click on Confirm', function () {
  registerPage.getNextButtonOperatorProfile().click({ force: true })
  // registerPage.getNextButtonBasic3().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
})
Then('Confirmation message', function () {
  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
})

And('Assert Created Telco-Operator Mobile Number and Write Created on time', function () {
  cy.readFile(BuisnessReg).then((user) => {
    let TEMobile = user.telcoMobile
    var TOMobile = " " + TEMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', TOMobile)
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

And('Assert Created Buissness User Mobile Number and Write Created on time for UnRegisteredMobile', function () {
  cy.readFile(BuisnessReg).then((user) => {
    let BUMobile = user.UnregisteredMobile
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

/*----------------------------Modify--telco operator----------------------------------*/
And('Enter Telco operator Mobile number and KYC number in search menu', function () {
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
    let mobile1 = data.telcoMobile
    manageUsersPage.getSearchUser().type(mobile1, { force: true })
  })
  cy.intercept('/mobiquitypay/v1/regulatoryProfile').as('getsearch')
  manageUsersPage.getSearchUserButton().click({ force: true })
  cy.wait('@getsearch')
})

Then('Confirmation modify message', function () {
  registerPage.getConfirmationText1().should('have.text', this.data2.personalInfo.successConfirm, { force: true })
})
/*------------------Unregistered number-----------------------------------------------------*/
When('Navigate to User Management and Click on register', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})
Then('Click on Next', function () {
  registerPage.getNextButtonBasic().click({ force: true })
})
//======================END UserManagement========================================================//


//-----------------------------------------Arpitha---------------------------------------------------
//-------------------------TC53----------Register  Businsess User - Distributer.---------------------------------------
And('Select User type as Business and Select user role', function () {
  pageLogin.getiFrame()
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
  const loginId = this.data2.personalInfo.name + lgid()
  cy.iframe().find('select[data-test-id="title"]')
    .select(this.data2.personalInfo.Title, { force: true })
  //-----------------------Mobile Number OTP-------------------------------------------------------------------
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
    data.UnregisteredMobile = mobileut
    cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json', data)
  })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.OTP(Cypress.env('apiBaseURL'))
  //----------------email id otp---------------------------------------------------//
  cy.getrandomUserEmailID()
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
  cy.wait(2000)
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
  //-----------------------------Profile---------------------------------------------------------------
  // registerPage.getNextButtonBasic3().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
})

//--------------------TC54-------------Approve initiation of businsess user successfully.--------------------------------------------------
//----------Login with another Admin credentials

//---------------------TC55-------------Notification sent to the user------------------------------------------

//-------------------------TC56--------------------Modification of the Businsess User------------------------------------------------------

And('Search with the Mobile Number', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.getBusinessUserMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })

})

And('System Admin is able to edit details of the user', function () {
  manageUsersPage.getEditToolTip().eq(0).click({ force: true })
  registerPage.getFirstName().type(this.data2.modifyPersonalInfo8.firstName, { force: true })
  registerPage.getLastName().type(this.data2.modifyPersonalInfo8.lastName, { force: true })
  cy.getrandomUserEmailID(this.data2.modifyPersonalInfo8.firstName, this.data2.modifyPersonalInfo8.lastName)
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getNextButtonBasic().eq(0).click({ force: true })
  registerPage.getNextButtonBasic1().click({ force: true })
  // registerPage.getNextButtonBasic2().click({ force: true })
})
//---------------------------TC57----------Approve the Modification of the Businsess User.----------------------------------------------------------------------------
When('Navigate to Approvals and filter by Modification of user status', function () {
  welcomePage.getApprovalTab().click()
  welcomePage.getApprovalButtonTab().click()
  //-----------------------------------added waituntil-------------------------------------
  cy.waitUntil(() => {
    return cy.iframe().find('h4.text-secondary')
  })
  //----------Filter the data
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.waitUntil(() => {
    return cy.iframe().find('p.text-secondary.text-capitalize.font-weight-700').should('be.visible', { force: true })
  })
  approvalPage.getModificationUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })
})
//-----------Approve

Then('Added User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})
Then('Edited User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().should('have.text', this.data2.confirmationMessage.editUser)
})
//-----------------------------------------------Kalyani-------------------------------------------------------

When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()
})

When('User Click on eye button', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
  cy.waitUntil(() => {
    return cy.iframe().find('h3.font-weight-bold').eq(0).should('be.visible', { force: true })
  })
})

Then('Click on Suspend user icon', function () {
  manageUsersPage.getSuspendUser().click({ force: true })
})
And('write comments to Suspend user', function () {
  manageUsersPage.getDailogbox().type(this.data2.dailogbox, { force: true })
})
And('click on yes', function () {
  manageUsersPage.getYesbtn().click({ force: true })
})
When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
  welcomePage.getApprovalButtonTab().click()
  //--------------------------------Added wait until-----------------------------
  cy.waitUntil(() => {
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.waitUntil(() => {
    return cy.iframe().find('p.text-secondary.text-capitalize.font-weight-700').should('be.visible', { force: true })
  })
  approvalPage.getSubmittedCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })
})

And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})
