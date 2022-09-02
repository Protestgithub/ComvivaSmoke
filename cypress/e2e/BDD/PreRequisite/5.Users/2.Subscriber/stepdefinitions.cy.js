/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And,Before} from "@badeball/cypress-cucumber-preprocessor";
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
