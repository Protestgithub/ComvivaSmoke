/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/subscriberCommands";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import { recurse } from 'cypress-recurse';
import "../../../../../support/BusinessUserCommands";
//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const myActivityPage = new myActivity()
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

});
//----------------Test Scripts---------------------------------------------------------------------------

//--------------------------User Management--------------------------------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------

  //----------------Navigate to User Management tab and Click on Register---------------------------------
  
  
  
  //------------------------------------Approve----------------------------------------------------------
  
  //--------------------------------------------------------------------------------------------------------

  And('Assert Created Banking Subscriber Mobile Number and Write Created on time', function(){
    cy.wait(2000)
    cy.readFile(subRegistration).then((user) => {
    let SubMobile = user.subscriberMobileBankingActivation
    var SUBMobile = " "+SubMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text',SUBMobile)
  })
  cy.wait(2000)
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
    time= time.trim()
    cy.log(time)
    cy.readFile(subRegistration).then((data) => {
    data.CreatedOnTime = time
    cy.writeFile(subRegistration,data)
    })
  })
  })

  //-----------------------------------------------------------------------------------------------

  
  
  
  
//----TC_68--------------------------User Management(Subscriber)---------------------------------------

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




//-----TC_69-------------------------Approve(Subscriber)--------------------------------------------------




