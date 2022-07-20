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
const SubMob='userData/subscriberReg.json'
var lid
var eid

mobile = "77" + uuid()
var mobile
var loginId
var KycValue
var name
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

Then('Logout', function(){
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
  cy.launchURL(Cypress.env('Adminurl')) + 'Business/'
  cy.wait(8000)
  cy.login(this.data1.businessAdmin.businessadminUser1, this.data1.businessAdmin.businessadminPwd1)
  cy.wait(10000)
  cy.checkWelcomeText(this.data2.business.distributerUser)
})

Given('Login into Mobiquity Portal as Business admin User1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(8000)
  cy.readFile('cypress/fixtures/userData/AdministratorData.json').then((data)=>{
    var BALogin
    BALogin = data.BALoginID
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
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  CIF = "1"+ lgid()
  cy.wait(2000)
  registerPage.getFirstName().type(getRandomName(), { force: true })  
  registerPage.getLastName().type(getRandomName(), { force: true })     
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })
  var CIF 
registerPage.getCIF().type(CIF, { force: true })
cy.readFile(subRegistration).then((data) => {
data.CIFnumberBanking = CIF
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
    data.subscriberMobileBankingActivation = mobile
    cy.writeFile(subRegistration, data)
  }) 


  cy.OTP(Cypress.env('apiBaseURL'),Cypress.env('apiURL'))

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



