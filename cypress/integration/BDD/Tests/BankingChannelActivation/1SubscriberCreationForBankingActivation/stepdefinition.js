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
Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})
//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
 
})

  //----------------Navigate to User Management tab and Click on Register---------------------------------
  When('Navigate to User Management and Click on register', function () {
  
    welcomePage.getUserManagementOption().scrollIntoView()
    welcomePage.getUserManagementOption().click()
    welcomePage.getRegisterOption().click()
  })
  
  
  When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getApprovalTab().click()
 cy.wait(2000)
 welcomePage.getApprovalButtonTab().click()
 cy.wait(2000)
 //--------------------------------------------Added Waituntil---------------------------------------
 
 cy.waitUntil(()=>{
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })
  
    //------------------------------------Filter the data--------------------------------------------------
    pageLogin.getiFrame()
    approvalPage.getFilter().click({ force: true })
    cy.wait(2000)
    approvalPage.getAddUserCheckBox().click({ force: true })
    approvalPage.getApplyFilter().click({ force: true })
  
  })
  
  //------------------------------------Approve----------------------------------------------------------
  
  And('Navigate to My Activity and Aplly required filters', function () {
    welcomePage.getMyActivity().click()
    myActivityPage.getFilter().click({ force: true })
    cy.wait(2000)
    myActivityPage.getAddUser().click({ force: true })
    myActivityPage.getSubmittedStatus().click()
    myActivityPage.getApply().click()
  })
  //--------------------------------------------------------------------------------------------------------

  And('Assert Created Subscriber Mobile Number and Write Created on time', function(){
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

  And('User click on Subscriber submitted user data', function () {
    cy.getApproval(subRegistration)
      })
  
  
  And('Approve the Users', function () {
    approvalPage.getApproveButton().click({ force: true })
    approvalPage.getApproveRequest().click({ force: true })
    cy.wait(2000)

  })
  
  
//----TC_68--------------------------User Management(Subscriber)---------------------------------------

And('Select User type as Subscriber and click on Subscriber', function () {
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

    registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
     registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
      registerPage.getReguProfile().select("FullKycprofile", { force: true })
     registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })
 
})
Then('SubscrigReg Confirmation message is displayed', function () {
  registerPage.getNextButtonBasic2().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
  registerPage.getConfirmationText().should('have.text',this.data2.confirmationMessage.editUser1)
})




//-----TC_69-------------------------Approve(Subscriber)--------------------------------------------------

Then('Added User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})



