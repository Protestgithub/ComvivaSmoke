/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import ChurnManagement from '../../../../../support/pageObjects/ChurnManagement/ChurnManagement';
import "../../../../../support/subscriberCommands";
import "../../../../../support/commands";
import "../../../../../support/comissioncommands";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import { recurse } from 'cypress-recurse';
import "../../../../../support/ChurnCommands";
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
//----------------Object Declaration-----------------------------------------------------------

const pageLogin = new loginPage()
const churnManagementPage = new ChurnManagement()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const myActivityPage = new myActivity()
const manageUsersPage = new manageUsers()


const churnSubRegistration = 'cypress/fixtures/userData/churnSubscriberReg.json'
var mobile
var CIF
var name
var RegulatoryMarketingProfile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
var loginId
var KycValue
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

});

//---------------------------------------------System Admin Login----------------------------------------------------
//----------------Navigate to User Management tab and Click on Register---------------------------------

  
//--------------------------------------------------------------------------------------------------------

And('Assert Created Churn Subscriber Mobile Number and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(churnSubRegistration).then((user) => {
  let SubMobile = user.churnSubscriberRegistration
  var SUBMobile = " "+SubMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',SUBMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(churnSubRegistration).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(churnSubRegistration,data)
  })
})
})
And('Assert Created Subscriber Mobile Number for Batch Reject and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(churnSubRegistration).then((user) => {
  let SubMobile = user.churnSubRegBatchReject
  var SUBMobile = " "+SubMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',SUBMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(churnSubRegistration).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(churnSubRegistration,data)
  })
})
})


And('Assert Created Subscriber Mobile Number for ApprRej and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(churnSubRegistration).then((user) => {
  let SubMobile = user.churnSubscriberRegistrationChurnAprRej
  var SUBMobile = " "+SubMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',SUBMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(churnSubRegistration).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(churnSubRegistration,data)
  })
})
})
//-----------------------------------------------------------------------------------------------

And('User click on Churn Subscriber submitted user data', function () {
  cy.getApproval(churnSubRegistration)
})


//---------- Pre-Requisit ------ Subscriber initiation for Churn -------------------------------------------------

//----------------------Basic Data------
And('Enter all the required subscriber details for churn intiation', function () {

  //-------------------Random Data-------
  /*const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()*/
  let mobileut1;
  const m = parseInt(Date.now()/100000);
  mobileut1 = "77" + m
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  CIF = lgid()
  cy.wait(2000)
  registerPage.getFirstName().type(getRandomName(), { force: true })  
  registerPage.getLastName().type(getRandomName(), { force: true })     
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })
  
    recurse(
    () => registerPage.getMobileNumber().type(mobileut1, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  //cy.writeFile(subRegistration,{ subscriberMobile: mobile })
  cy.writeFile(churnSubRegistration, { churnSubscriberRegistration: mobileut1 })


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
And('Enter all the required subscriber details for Batch Reject', function () {

  //-------------------Random Data-------
  /*const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()*/
  let mobileut4;
  const m = parseInt(Date.now()/100000);
  mobileut4 = "77" + m
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  CIF = lgid()
  cy.wait(2000)
  registerPage.getFirstName().type(getRandomName(), { force: true })  
  registerPage.getLastName().type(getRandomName(), { force: true })     
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })
  
    recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut4, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  //cy.writeFile(subRegistration,{ subscriberMobile: mobile })
    cy.readFile(churnSubRegistration).then((data) => {
    data.churnSubRegBatchReject = mobileut4
    cy.writeFile(churnSubRegistration, data)
    })

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

And('Enter all the required subscriber details for bulk upload', function () {

  //-------------------Random Data-------
  /*const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()*/
  let mobileut2;
  const m = parseInt(Date.now()/100000);
  mobileut2 = "77" + m
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  CIF = lgid()
  cy.wait(2000)
  registerPage.getFirstName().type(getRandomName(), { force: true })  
  registerPage.getLastName().type(getRandomName(), { force: true })     
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })
  
    recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut2, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  //cy.writeFile(subRegistration,{ subscriberMobile: mobile })
  
  cy.readFile(churnSubRegistration).then((data) => {
data.churnSubscriberRegistrationBulkUpload = mobileut2
cy.writeFile(churnSubRegistration, data)
})

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



//------------------------------Approve to (Reg Subscriber to churn)--------------------------------------------------

// Then('Added User status is approved', function () {
//   approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
// })


//-------------------------------- Subscriber Registration for churn Approve or Reject-------

And('Enter all the required subscriber details for churn approve or reject',function() {
//-------------------Random Data-------
/*const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()*/
let mobileut3;
const m = parseInt(Date.now()/100000);
mobileut3 = "77" + m
const lgid = () => Cypress._.random(1e5)
loginId = this.data2.personalInfo.firstName + lgid()
CIF = lgid()
cy.wait(2000)
registerPage.getFirstName().type(getRandomName(), { force: true })  
registerPage.getLastName().type(getRandomName(), { force: true })     
cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
registerPage.getLoginID().type(loginId, { force: true })

  recurse(
  () => registerPage.getMobileNumber().clear().type(mobileut3, { force: true }),
  () => registerPage.getAdressLine1().click({ force: true }),
  (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
    ('Value is not unique').should('be.visible'),
  registerPage.getAdressLine1().click({ force: true }),
)
//cy.writeFile(subRegistration,{ subscriberMobile: mobile })

cy.readFile(churnSubRegistration).then((data) => {
data.churnSubscriberRegistrationChurnAprRej = mobileut3
cy.writeFile(churnSubRegistration, data)
})

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
