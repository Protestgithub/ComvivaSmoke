/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import "../../../../support/commands";
import "../../../../support/subscriberCommands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../support/pageObjects/UserManagement/manageUsers';
import { recurse } from 'cypress-recurse';
import "../../../../support/BusinessUserCommands";
//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
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

Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})
//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  // cy.checkWelcomeText(this.data2.superadminm.superadminmaker)
})

//DIST7779064594
Given('Login into Mobiquity Portal as Business admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.launchURL(Cypress.env('Adminurl')) + '/dfscontainer/#/business/'
  cy.wait(8000)
  cy.login(this.data1.businessAdmin.businessadminUser1, this.data1.businessAdmin.businessadminPwd1)
  cy.wait(10000)
  cy.checkWelcomeText(this.data2.business.distributerUser)
})

Given('Login into Mobiquity Portal as Business admin User2', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(8000)
  cy.readFile('cypress/fixtures/userData/AdministratorData.json').then((data) => {
    var BALogin
    BALogin = data.BALoginID
    cy.login(BALogin, this.data1.BAPassword)
  })
  cy.checkWelcomeText(this.data1.BAAdminText)

})
Given('Login into Mobiquity Portal as Business admin User1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(8000)
  cy.readFile('cypress/fixtures/userData/AdministratorData.json').then((data) => {
    var BALogin
    BALogin = data.BALoginID
    cy.login(BALogin, this.data1.businessAdmin.DefaultPassword)
    cy.login1(this.data1.BAPassword)
    cy.Passwordchange(this.data1.UserCreationSuccessMessage)
    pageLogin.getloginbtn1().click({ force: true })
    cy.wait(8000)
    cy.login(BALogin, this.data1.BAPassword)
  })
  cy.checkWelcomeText(this.data1.BAAdminText)

})


//----------------Navigate to User Management tab and Click on Register---------------------------------
When('Navigate to User Management and Click on register', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})

//-----------------Select User Type-----------------------------------------------------------
And('Select User type as Adminstrator and click on BusinessAdmin', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).focused()
  registerPage.getUserRole().contains(this.data2.userRole).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })

})
//----------------------Basic Data---------------------------------------------------------------
And('Enter all the required details', function () {

  //-------------------Random Data-----------------------------------------------------------------
  cy.wait(2000)
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.getrandomUserEmailID()
  recurse(
    () => registerPage.getMobileNumber().type(mobile, { force: true }),
    () => registerPage.getFirstName().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  cy.wait(3000)
  registerPage.getCountry().select(this.data2.personalInfo.country)
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------Profile Data-----------------------------------------------------------------
  //  cy.readFile(SubProfileName).then((data) => {
  //  let Profile = data.businesAadmin
  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
  //  })
  // cy.readFile(SubProfileName).then((data) => {
  //let Profile = data.CustomercareAdmin1
  // registerPage.getAuthProfile().select(Profile, { force: true })
  // })
  registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
  registerPage.getNextButtonProfile().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })

})

//-------------------------Confirmation Message displayed---------------------------------------------
Then('Confirmation message is displayed', function () {

  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
})


When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
 cy.wait(2000)
 welcomePage.getApprovalButtonTab().click()
 cy.wait(2000)
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.wait(2000)
  approvalPage.getAddUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })

})

//------------------------------------Approve----------------------------------------------------------

And('User click on submitted user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })

})

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
  registerPage.getLastName().type(getRandomName(), { force: true })
  recurse(
    () => registerPage.getFirstName().type(getRandomName(), { force: true }),
    () => cy.getrandomUserEmailID(),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )

  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  // cy.readFile(SubProfileName).then((data) => {
  // let Profile = data.subscriber
  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
  // })
  //cy.readFile(SubProfileName).then((data) => {
  //   let Profile = data.SubscriberProfileName1
  registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
  // })
  //  registerPage.getReguProfile().select(this.data2.KycInfo.ReguProfile, { force: true })
  // cy.readFile(RegulatoryMarketingProfile).then((data) => {
  //  let Profile = data.RegulatoryProfileName
  registerPage.getReguProfile().select("NoKycprofile", { force: true })
  // })
  //registerPage.getMarketingProfile().select(this.data2.KycInfo.MarketProfile, { force: true })
  //cy.readFile(RegulatoryMarketingProfile).then((data) => {
  //  let Profile = data.MarketingProfileName
  registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })
  // })
  registerPage.getNextButtonProfile().click({ force: true })
})

Then('Confirm the edit details', function () {
  manageUsersPage.getConfirmButton().click({ force: true })
  manageUsersPage.getDoneButton().click({ force: true })

})
Then('User modified is approved', function () {
  approvalPage.getApproveConfirmationMessage()
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
  // cy.readFile(SubProfileName).then((data) => {
  // let Profile = data.subscriber
  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
  // })
  //cy.readFile(SubProfileName).then((data) => {
  //   let Profile = data.SubscriberProfileName1
  registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
  // })
  //  registerPage.getReguProfile().select(this.data2.KycInfo.ReguProfile, { force: true })
  // cy.readFile(RegulatoryMarketingProfile).then((data) => {
  //  let Profile = data.RegulatoryProfileName
  registerPage.getReguProfile().select("NoKycprofile", { force: true })
  // })
  //registerPage.getMarketingProfile().select(this.data2.KycInfo.MarketProfile, { force: true })
  //cy.readFile(RegulatoryMarketingProfile).then((data) => {
  //  let Profile = data.MarketingProfileName
  registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })
  // })
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


//--------------------------------------------- Chethan--------------------------------------------

//--------------------------------------------- Chethan--------------------------------------------

//----TC_68--------------------------User Management(Subscriber)---------------------------------------

And('Select User type as Subscriber and click on Subscribers', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).click({ force: true })
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).focused()
  registerPage.getUserRole().contains(this.data2.subPersonalInfo.subUserRole).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
//----------------------Basic Data---------------------------------------------------------------
And('Enter all the required subscriber details', function () {

  //-------------------Random Data-----------------------------------------------------------------
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  CIF = "1" + lgid()
  cy.wait(2000)
  registerPage.getFirstName().type(getRandomName(), { force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })
  cy.readFile(subRegistration).then((data) => {
    data.subscriberLoginId = loginId
    cy.writeFile(subRegistration, data)
  })
  var CIF
  registerPage.getCIF().type(CIF, { force: true })
  cy.readFile(subRegistration).then((data) => {
    data.CIFnumber = CIF
    cy.writeFile(subRegistration, data)
  })

  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  //cy.writeFile(subRegistration,{ subscriberMobile: mobile })
  cy.readFile(subRegistration).then((data) => {
    data.subscriberMobile = mobile
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
  //cy.readFile(SubProfileName).then((data) => {
  //  let Profile = data.subscriber
  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
  // })
  // cy.readFile(SubProfileName).then((data) => {
  //   let Profile = data.SubscriberProfileName1
  registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
  // })
  //  registerPage.getReguProfile().select(this.data2.KycInfo.ReguProfile, { force: true })
  //  cy.readFile(RegulatoryMarketingProfile).then((data) => {
  //   let Profile = data.RegulatoryProfileName
  registerPage.getReguProfile().select("FullKycprofile", { force: true })
  // })
  //registerPage.getMarketingProfile().select(this.data2.personalInfo.MarketProfile, { force: true })
  //cy.readFile(RegulatoryMarketingProfile).then((data) => {
  // let Profile = data.MarketingProfileName
  registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })
  //  })
})
Then('SubscrigReg Confirmation message is displayed', function () {

  registerPage.getNextButtonBasic2().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
  registerPage.getConfirmationText()
})




//-----TC_69-------------------------Approve(Subscriber)--------------------------------------------------

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
  //cy.readFile(SubProfileName).then((data) => {
  //  let Profile = data.subscriber
  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
  // })
  // cy.readFile(SubProfileName).then((data) => {
  //   let Profile = data.SubscriberProfileName1
  registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
  // })
  //  registerPage.getReguProfile().select(this.data2.KycInfo.ReguProfile, { force: true })
  //  cy.readFile(RegulatoryMarketingProfile).then((data) => {
  //   let Profile = data.RegulatoryProfileName
  registerPage.getReguProfile().select("FullKycprofile", { force: true })
  // })
  //registerPage.getMarketingProfile().select(this.data2.personalInfo.MarketProfile, { force: true })
  //cy.readFile(RegulatoryMarketingProfile).then((data) => {
  // let Profile = data.MarketingProfileName
  registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })
  //  })
})


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
And('User Click on View Details', function () {
  (manageUsersPage.getEyeIcon().click({ force: true }))
  cy.wait(3000)
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





//--TC_71------------------------------------Approve Modified Subscriber-----------------------------------------
When('Navigate to Approvals and filter by Modification of user status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
 cy.wait(2000)
 welcomePage.getApprovalButtonTab().click()
 cy.wait(2000)
  //----------Filter the data
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.wait(2000)
  approvalPage.getModificationUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })

})
Then('Edited User status is approved', function () {

  approvalPage.getApproveConfirmationMessage().should('have.text', this.data2.confirmationMessage.editUser)
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

  // recurse(
  //     () => registerPage.getKycIDValue().type(KycValue, { force: true }),
  //     registerPage.getMakeThisPrimaryButton().click({ force: true }),
  //     (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().should('be.visible'),
  //     registerPage.getKycGracePeriod().click()
  // )

  registerPage.getKycIDValue().clear({ force: true }).type(KycValue, { force: true })
  registerPage.getMakeThisPrimaryButton().eq(0).click({ force: true })
  registerPage.getNextButtonKYC().eq(1).click({ force: true })
  registerPage.getNextButtonBasic2().click({ force: true })
  cy.wait(2000)

})
Then('verify message sent to user', () => {
  cy.getMessage()

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
 cy.wait(2000)
})

And('Admin click on Suspended user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })

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
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })
})
Then('Verify the user resume Confirmation message', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.suspendResumeConfirmationMessage.suspendResumeUser)
})
//----------------Approve----------------
And('Approve the Resumed User', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})
Then('Verify the user Resumed approval message', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.suspendResumeConfirmationMessage.userResumed)
})

//------------------------------------------THE END-----------------------------------------------------------------
//---------------------------------------------------Kalyani----------------------------------------------
And('Enter Mobile number or KYC number of subscriber user in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getSearchUser().type(this.data2.mob2, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})



When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

And('Select user type & enter Mobile number or KYC number for subscriber', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getdropdown().select(this.data2.business.userType, { force: true })
  manageUsersPage.getSearchUser().type(this.data2.mob7, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
And('Enter Mobile number and KYC number in search for suspension', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getSearchUser().type(this.data2.mob6, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
And('Enter Mobile number or KYC number in Search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  //Reading Subscriber mobile number from Subscriber registration Fixture to check his details
  cy.readFile('cypress/fixtures/userData/subscriberReg.json').then((data) => {
    Submobile = data.subscriberMobile
    cy.log(Submobile)
    manageUsersPage.getSearchUser().type(Submobile, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
And('Enter Mobile number or KYC number of subscriber user', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getSearchUser().type(this.data2.mob7, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
   cy.wait(2000)
 welcomePage.getApprovalButtonTab().click()
 cy.wait(2000)
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.wait(2000)
  approvalPage.getAddUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })

})
And('User click on submitted user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })

})
When('User Click on eye button', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
})
Then('Verify View Details Page', function () {
  manageUsersPage.getViewDetails().should("contain", this.data2.confirmationMessage.viewDetails)
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
And('Assert the user login', function () {

  cy.frameLoaded(pageLogin.getiFrame()).should("not.contain", Submobile)
  cy.wait(10000)
  //cy.url().should("not.contain", "/business");
})
Then('Verify the user resume Confirmation message', function () {
  approvalPage.getApproveConfirmationMessage().should("contain", this.data2.suspendResumeConfirmationMessage.suspendResumeUser)
})



Then('User status is Suspended', function () {
  approvalPage.getApproveConfirmationMessage().should("contain", this.data2.suspendResumeConfirmationMessage.userSuspended)
})
Then('User status is Resumed', function () {
  approvalPage.getApproveConfirmationMessage().should("contain", this.data2.suspendResumeConfirmationMessage.userResumed)
})


And('Assert the user login', function () {

  cy.frameLoaded(pageLogin.getiFrame()).should("not.contain", Submobile)
  cy.wait(10000)
  cy.url().should("not.contain", "/dfscontainer/#/business/");
})


//----------------------------------------------------Arpitha----------------------------------------------


//-------------------------------------------TC_169------------------------------------------------------------------------------------


And('Select User type as Business and Select Corporate', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).focused()
  registerPage.getUserRole().contains(this.data2.UserLoginId).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })

})

And('Enter registered login id value', function () {
  cy.iframe().find('select[data-test-id="title"]')
    .select(this.data2.personalInfo.Title, { force: true })
  registerPage.getFirstName().type(getRandomName(), { force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })

  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  //cy.getBusinessUserLoginID()
  cy.fixture('userData/BusinessUsersData.json').then((usermobile) => {
    lid = usermobile.LoginId
    cy.log(lid)
    registerPage.getLoginID().type(lid, { force: true })
  })


  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })



})
Then('Login id Error message is displayed', function () {
  registerPage.getLoginError().find('small.text-danger').should('have.text', ' Value is not unique ');
})

//-------------------------------------------TC_170---------------------------------------------------------------------


And('Enter registered email id value', function () {
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  cy.wait(2000)
  cy.iframe().find('select[data-test-id="title"]')
    .select(this.data2.personalInfo.Title, { force: true })
  registerPage.getFirstName().type(getRandomName(), { force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  cy.fixture('userData/BusinessUsersData.json').then((usermobile) => {
    eid = usermobile.EmailID
    cy.log(eid)
    registerPage.getEmailID().type(eid, { force: true })
  })


  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })

})
Then('Email Error message is displayed', function () {
  registerPage.getLoginError().find('small.text-danger').should('have.text', ' Value is not unique ');


})

//-------------------------------------------TC_183---------------------------------------------------------------------


And('Enter Invalid Login id value details', function () {
  cy.iframe().find('select[data-test-id="title"]')
    .select(this.data2.personalInfo.Title, { force: true })
  registerPage.getFirstName().type(getRandomName(), { force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(this.data2.InvalidLoginId, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })


})
Then('invalid value message is displayed', function () {
  registerPage.getLoginError().find('small.text-danger').should('have.text', ' Only alphabets and digits are allowed and max length is 20 ');

})

//-------------------------------------------TC_182---------------------------------------------------------------------

And('Enter the basic details and do not verify contact number', function () {

  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  cy.wait(2000)
  registerPage.getFirstName().type(getRandomName(), { force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })

  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  cy.getrandomUserEmailID()
  registerPage.getAdressLine1().click({ force: true })
})


Then('Verify that error button of contact number should be visible', function () {
  registerPage.getErrorIcon().should('be.visible')
})

//--------------------------Search Subscriber Mobile NUmber---------------------------------------------
And('Enter Mobile number of subscriber in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile('cypress/fixtures/userData/subscriberReg.json').then((data) => {
    var mobile
    mobile = data.subscriberMobile
    cy.log(mobile)
    manageUsersPage.getSearchUser().type(mobile, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})

//------------------------------------Monica----------------------------------------------------------

//-----------------------------Test Scripts-----------------------------------------------------------------------------

//---------------------USER MANAGEMENNT MANAGE USER--------------------------------------------


//---------------------USER MANAGEMENNT MANAGE USER--------------------------------------------


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

Then('Check All Wallet Details', function () {
  cy.wait(3000)
})
And('select either Lock outgoing payments or Lock incoming payments or Lock both', function () {

  manageUsersPage.getlockunclockWallets().click({ force: true })
  manageUsersPage.getLockOutgoingPayements().click({ force: true })
})
Then('Click On lock all', function () {
  manageUsersPage.getlockallbtn().click({ force: true })
  manageUsersPage.getconfirmationlock().type(getRandomName(), { force: true })
  manageUsersPage.getconfirmationbtn().click({ force: true })
  manageUsersPage.getlockedmessage().should('have.text', this.data2.LockOutgoing)
})
And('select either UNLock outgoing payments or UNLock incoming payments or Lock both', function () {

  manageUsersPage.getlockunclockWallets().click({ force: true })
  manageUsersPage.getUnlockoutgoingPayements().click({ force: true })

})
Then('Click On UNLock', function () {
  manageUsersPage.getunlockbtn().click({ force: true })
  manageUsersPage.getconfirmationlock().type(getRandomName(), { force: true })
  manageUsersPage.getconfirmationbtn().click({ force: true })
  manageUsersPage.getlockedmessage().should('have.text', this.data2.UnlockOutgoing)
})
And('Click on view Details and Click on Credentials', function () {

  manageUsersPage.getViewIcon().eq(0).click({ force: true })
  manageUsersPage.getcredentials().click({ force: true })
})
And('Click on refresh icon corresponding to the respective authentication factor', function () {
  manageUsersPage.getresetcredentials().eq(0).click({ force: true })
  manageUsersPage.getresetconfirmation().click({ force: true })
  manageUsersPage.getsuccessresetconfirmation().click({ force: true })
})

//-------------------------------SUDHEER----------------------------------------------------------------

//----------TC_129-------To verify that Admin user can view all the transaction details under Order details menu------------


When('Click on user management and Manage users', function () {

  manageUsersPage.getUsermanagement().scrollIntoView()
  manageUsersPage.getUsermanagement().click()
  manageUsersPage.getManageUsers().click()
})

And('Enter Mobile numberin search Menu', function () {
  cy.wait(3000)
  cy.getSubscriberMobNum()
})

And('Click on view Details', function () {
  cy.wait(3000)
  manageUsersPage.getViewAllDetailsButton().click({ force: true })
})

Then('Click on order details', function () {

  manageUsersPage.getOrderDetailsButton().click({ force: true })
  cy.wait(3000)
  manageUsersPage.getOrderDetailsMessage().should('have.text', ' Manage Users  > View Details')
})


// //---------TC_131------To verify that latest order transactions will be displayed on the first page of Order details screen.------------

Then('Click on order details for latest order transactions', function () {
  cy.wait(3000)
  manageUsersPage.getOrderDetailsButton().click({ force: true })
  manageUsersPage.getWalletExpandButton().click({ force: true })
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  manageUsersPage.getLatestTrasanction().should('have.text', '1')
})


//---------TC_132-----To verify that all the wallet transactions are displayed in statement screen sucessfully.------------

And('Click on Wallet Payment History', function () {
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on expand button', function () {
  manageUsersPage.getWalletExpandButton().click({ force: true })
})

Then('Click on wallet view Details', function () {
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  manageUsersPage.getDateRangeAssert().should('contain.text', 'More Details')
})



//-------TC_133------To verify that user can able to view all the wallet transactions by entering valid transaction id.------------


And('Click on Wallet Payment History for valid transaction with id', function () {
  cy.wait(3000)
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on expand button on valid transaction with id', function () {

  manageUsersPage.getSearchTransactionId().type(this.data2.transactionid.validid, { force: true })
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})

Then('Click on view Details for wallet transactions with id', function () {
  cy.wait(3000)
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  //  cy.get('.modal-content').should('have.text', 'Transaction ID')
})






//-----TC_134-----To verify that user can able to fetch the Statement based on the transaction type (success, fail etc.)------------


And('Click on Wallet Payment History for transaction type', function () {
  cy.wait(3000)
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on filter and Select status type and Select apply', function () {
  //cy.wait(3000)
  manageUsersPage.getFilterStatementButton().click({ force: true })
  manageUsersPage.getStatus().click()
  cy.wait(3000)
  manageUsersPage.getApplyFilterButton().click({ force: true })
})
And('Click on expand button for transaction type', function () {
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})

Then('Click on view Details for transaction', function () {
  cy.wait(3000)
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })

})


//-----TC_135-------To verify that user can able to fetch the Statement based on the Date range.------------

And('Click on Wallet Payment History based on the Date', function () {
  // cy.wait(3000)
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on filter', function () {
  cy.wait(3000)
  manageUsersPage.getFilterStatementButton().click({ force: true })
})
And('Select start date and end date and  Click apply', function () {
  cy.wait(3000)

  manageUsersPage.getDatePickerStart().click({ force: true })
  manageUsersPage.getStartDate().contains(this.data2.usercalender.startday).click({ force: true })

  manageUsersPage.getDatePickerEnd().click({ force: true })
  manageUsersPage.getEndDate().contains(this.data2.usercalender.endday).click({ force: true })

  manageUsersPage.getApplyFilterButton().click({ force: true })

})

And('Click on expand button based on the Date', function () {
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})
And('Click on filter', function () {
  cy.wait(3000)
  manageUsersPage.getFilterStatementButton().click({ force: true })
})
And('Select start date and end date and  Click apply', function () {
  cy.wait(3000)

  manageUsersPage.getDatePickerStart().click({ force: true })
  manageUsersPage.getStartDate().contains(this.data4.usercalender.startday).click({ force: true })

  manageUsersPage.getDatePickerEnd().click({ force: true })
  manageUsersPage.getEndDate().contains(this.data4.usercalender.endday).click({ force: true })

  manageUsersPage.getApplyFilterButton().click({ force: true })

})
And('Click on expand button based on the Date', function () {
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})

Then('Click on view Details based on the Date range', function () {
  cy.wait(3000)
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  manageUsersPage.getDateRangeAssert().should('contain.text', 'More Details')
})






//------------------------------------------THE END-----------------------------------------------------------------

