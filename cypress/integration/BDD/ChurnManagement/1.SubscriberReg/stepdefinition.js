/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import ChurnManagement from '../../../../support/pageObjects/ChurnManagement/ChurnManagement';
import "../../../../support/subscriberCommands";
import "../../../../support/commands";
import "../../../../support/comissioncommands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import { recurse } from 'cypress-recurse';
import "../../../../support/ChurnCommands";


//----------------Object Declaration-----------------------------------------------------------

const pageLogin = new loginPage()
const churnManagementPage = new ChurnManagement()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()


const churnSubRegistration = 'cypress/fixtures/userData/churnSubscriberReg.json'
var mobile
var CIF
var name
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
var RegulatoryMarketingProfile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
var loginId
var KycValue
var CsvFile = 'cypress/fixtures/ChurnUserInitiation.csv'
var JSONFile = 'cypress/fixtures/churnData/ChurnUserInitiation.json'

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
  cy.fixture('userData/churnSubscriberReg').then(function (data8) {
    this.data8 = data8;
  })
  cy.fixture('ChurnManagement').then(function (data3) {
    this.data3 = data3;
  })
  cy.fixture('userData/Regulatory&MarketingProfile').then(function (data4) {
    this.data4 = data4;
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
//----------------Navigate to User Management tab and Click on Register---------------------------------
When('Navigate to User Management and Click on register', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
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
And('User click on submitted user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })
})
And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})
Then('Added User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})

//---------- Pre-Requisit ------ Subscriber initiation for Churn -------------------------------------------------

And('Select User type as Subscriber and click on Subscriber', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).click({ force: true })
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).focused()
  registerPage.getUserRole().contains(this.data2.subPersonalInfo.subUserRole).click({ force: true })
  cy.wait(2000)
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
//----------------------Basic Data------
And('Enter all the required subscriber details', function () {

  //-------------------Random Data-------
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  CIF = lgid()
  cy.wait(2000)
  registerPage.getFirstName().type(getRandomName(), { force: true })  
  registerPage.getLastName().type(getRandomName(), { force: true })     
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })
  
    recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  //cy.writeFile(subRegistration,{ subscriberMobile: mobile })
  cy.writeFile(churnSubRegistration, { churnSubscriberRegistration: mobile })


  cy.OTP(Cypress.env('apiBaseURL'))

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
    // registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
    registerPage.getMakeThisPrimaryButton().click({ force: true }),
    registerPage.getKycGracePeriod().select(this.data2.KycInfo.KycGracePeriod, { force: true })
  registerPage.getNextButtonBasic1().click({ force: true })

  //-----------------------Profile------------------------------------------------------------------------
  cy.wait(2000)
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
})
And('Enter all the required subscriber details for bulk payout', function () {

  //-------------------Random Data-------
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  CIF = lgid()
  cy.wait(2000)
  registerPage.getFirstName().type(getRandomName(), { force: true })  
  registerPage.getLastName().type(getRandomName(), { force: true })     
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })
  
    recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  //cy.writeFile(subRegistration,{ subscriberMobile: mobile })
  cy.writeFile(churnSubRegistration, { churnSubscriberRegistrationBulkPayout: mobile })


  cy.OTP(Cypress.env('apiBaseURL'))

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
    // registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
    registerPage.getMakeThisPrimaryButton().click({ force: true }),
    registerPage.getKycGracePeriod().select(this.data2.KycInfo.KycGracePeriod, { force: true })
  registerPage.getNextButtonBasic1().click({ force: true })

  //-----------------------Profile------------------------------------------------------------------------
  cy.wait(2000)
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
})

Then('SubscrigReg Confirmation message is displayed', function () {

  registerPage.getNextButtonBasic2().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
  registerPage.getConfirmationText()
})


//------------------------------Approve to (Reg Subscriber to churn)--------------------------------------------------

Then('Added User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})

