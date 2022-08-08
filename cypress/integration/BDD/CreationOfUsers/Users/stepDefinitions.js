/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';

import "../../../../support/commands";
import "../../../../support/subscriberCommands";
import "../../../../support/AdministratorCommands"
import "../../../../support/BusinessUserCommands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../support/pageObjects/UserManagement/manageUsers';
import myActivity from '../../../../support/pageObjects/MyActivity/myActivity';
import API from '../../../../support/pageObjects/API';



//----------------Object Declaration-----------------------------------------------------------------
const SubMob='userData/subscriberReg.json'
const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const APIPage = new API()
const myActivityPage = new myActivity()
const uuid = () => Cypress._.random(1e8)
const uuuid = () => Cypress._.random(1e3)
amount = uuuid()
var loginId, mobile, BusinessMobile, KycValue, amount, name, ifscnum, accnumber, BankData
const kycid = () => Cypress._.random(1e8)
const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp
mobile = "77" + uuid()
var lid, eid, CIF, mobile1, Mobile, Submobile, loginId, name
mobile1 = "77" + uuid()
var filename = 'cypress/fixtures/userData/AdministratorData.json'
var subRegistration = 'cypress/fixtures/userData/subscriberReg.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
let Profile
var BankData = 'cypress/fixtures/userData/BankData.json'
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
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Maker after Logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
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
  cy.getBArandomUserEmailID()
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.readFile(filename).then((data) => {
    data.BAMobileNumber = mobile
    cy.writeFile(filename, data)
  })
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  cy.wait(3000)
  registerPage.getCountry().select(this.data2.personalInfo.country)
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------Profile Data-----------------------------------------------------------------
  /*cy.readFile(SubProfileName).then((data) => {
    let Profile = data.businesAadmin*/
    registerPage.getSecurityProfile().select('BusinessAdminSecurityProfile', { force: true })
  //})
    /*cy.readFile(SubProfileName).then((data) => {
    let Profile = data.businesAadmin1*/
    registerPage.getAuthProfile().select('BusinessAdminDefault Profile', { force: true })
    //})
    registerPage.getNextButtonProfile().click({ force: true })
    registerPage.getSubmitButton().click({ force: true })

})

//-------------------------Confirmation Message displayed---------------------------------------------
Then('Confirmation message is displayed', function () {

  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
})


When('Navigate to Approvals and filter by Submitted status', function () {
  //welcomePage.getUserManagementOption().scrollIntoView()
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
And('Assert Created Business Admin Mobile Number', function(){
  cy.wait(2000)
  cy.getBAMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })
  cy.readFile(filename).then((user) => {
  let BAMobile = user.BAMobileNumber
  var BBAMobile = " "+BAMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',BBAMobile)
})
})

//------------------------------SubscriberCreation---------------------------------------------------------
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
  let mobileut1;
  const m = parseInt(Date.now()/100000);
  mobileut1 = "77" + m


  registerPage.getCIF().type(CIF, { force: true })
  cy.readFile(subRegistration).then((data) => {
    data.CIFnumber = CIF
    cy.writeFile(subRegistration, data)
  })

  recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut1, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  //cy.writeFile(subRegistration,{ subscriberMobile: mobile })
  cy.readFile(subRegistration).then((data) => {
    data.subscriberMobile = mobileut1
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


//-----------------------------------------Arpitha---------------------------------------------------


//-------------------------TC53----------Register  Businsess User.---------------------------------------

//-----------------------------------------Arpitha---------------------------------------------------


//-------------------------TC53----------Register  Businsess User.---------------------------------------

And('Select User type as Business and Select user role', function () {

  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).focused()
  registerPage.getUserRole().contains(this.data2.userRole8).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
//----------------------Basic Data---------------------------------------------------------------
And('Enter all the required business user details', function () {

  //const uuid = () => Cypress._.random(1e8)
  let mobileut;
  const m = parseInt(Date.now()/100000);
  mobileut = "77" + m

  cy.wait(2000)
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.name + lgid()
  cy.wait(2000)

  cy.iframe().find('select[data-test-id="title"]')
    .select(this.data2.personalInfo.Title, { force: true })
  //-----------------------Mobile Number OTP-------------------------------------------------------------------
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json',{registeredMobile:mobileut})
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.OTP(Cypress.env('apiBaseURL'))
  cy.wait(2000)
  //----------------email id otp---------------------------------------------------//
  cy.getBusinessrandomUserEmailID()
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
 cy.OTP(Cypress.env('apiBaseURL'))
  cy.wait(2000)

  registerPage.getSupportOnline().select(this.data2.personalInfo.online, { force: true })
  registerPage.getAdressLine1().type(this.data2.personalInfo.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.personalInfo.state, { force: true })
  registerPage.getCity().select(this.data2.personalInfo.city, { force: true })
  registerPage.getLatitude().type(this.data2.personalInfo.Latitude, { force: true })
  registerPage.getlongitude().type(this.data2.personalInfo.Longitude, { force: true })

  registerPage.getNextButtonBasic().eq(0).click({ force: true })

  
  //---------------------KYC-----------------------------------------------------------------------
  let kycut
  const k = parseInt(Date.now());

  kycut="A"+k
  registerPage.getKYCButton().eq(0).click({ force: true })
  cy.wait(2000)
  registerPage.getKYCIDType().select(this.data2.KycInfo8.KycIDType, { force: true })
  registerPage.getKYCIDValue().type(kycut, { force: true })
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
    data.RegisteredKyc = kycut
    cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json', data)

  })

  cy.wait(2000)
  registerPage.getMakeThisPrimaryButton().eq(2).click({ force: true })
  cy.wait(2000)
  registerPage.getNextButtonBasic1().click({ force: true })

  //-----------------------------Hierarchy---------------------------------------------------
//  registerPage.getParent().type(this.data2.personalInfo.Parent, { force: true })
  //registerPage.getGo().click({ force: true })
 // registerPage.getRadioButton().click({ force: true })
 // registerPage.getNextButtonBasic2().click({ force: true })




  //-----------------------------Profile---------------------------------------------------------------

  cy.wait(5000)
  //cy.readFile(SubProfileName).then((data) => {
  //  let Profile = data.Distributer
    registerPage.getSecurityProfile().select('WholesalerDefaultSecurityProfile', { force: true })
 // })
 // cy.readFile(SubAuthProfileName).then((data) => {
  //  let Profile1 = data.BusinessDistributor
    registerPage.getAuthProfile().select('WholesalerDefault Profile', { force: true })
  //})
 // registerPage.getReguProfile().select(this.data2.personalInfo.ReguProfile, { force: true })
 // cy.readFile(RegulatoryMarketingProfile).then((data) => {
   //    let RegProfile = data.RegulatoryProfileName
     registerPage.getReguProfile().select('FullKycprofile', { force: true })
    // })
  //registerPage.getMarketingProfile().select(this.data2.personalInfo.MarketProfile, { force: true })
 // cy.readFile(RegulatoryMarketingProfile).then((data) => {
   //   let MarProfile = data.MarketingProfileNameDistributer
       registerPage.getMarketingProfile().select('WHSDefaultMP', { force: true })
   //  })
   registerPage.getNextButtonBasic2().click({force:true})
   

   const t = parseInt(Date.now()/1000);
  ifscnum="S"+t

const uuidbkd = () => Cypress._.random(1e9)
accnumber="4239346"+uuidbkd()
   registerPage.getCurrency().select(this.data2.Bank.Currency, { force: true })
   cy.wait(3000)

   cy.readFile(BankData).then((data) => {
    data.CurrencyDetail= this.data2.Bank.Currency
    cy.writeFile(BankData, data)
  })
   cy.wait(3000)


 registerPage.getBankName().select(this.data2.Bank.BankName, {force:true})

 //cy.writeFile(BankData,{BankNameDetail:BankName})
 cy.wait(3000)
 
 cy.readFile(BankData).then((data) => {
  data.BankNameDetail= this.data2.Bank.BankName
  cy.writeFile(BankData, data)
})
 
 registerPage.getAccountNum().type(accnumber, { force: true })
 
 //cy.writeFile(BankData,{Accnum:accnumber})
 cy.wait(3000)
 cy.readFile(BankData).then((data) => {
  data.Accnum= accnumber
  cy.writeFile(BankData, data)
})
 registerPage.getConfirmAccNum().type(accnumber, { force: true })
 
 registerPage.getNickName().type(getRandomName(), { force: true })
 registerPage.getBankAccountType().select(this.data2.Bank.BankAccountType,{force:true})
// cy.writeFile(BankData,{BankAccountTYpeDetail:BankAccountType})

 cy.readFile(BankData).then((data) => {
  data.BankAccountTYpeDetail= this.data2.Bank.BankAccountType
  cy.writeFile(BankData, data)
})
 cy.wait(3000)
 
 registerPage.getBankIFSC().type(ifscnum, { force: true })
 //registerPage.getNextButtonBasic4().click({force:true})
 
 
 registerPage.getNextButtonBasic3().click({force:true})
 registerPage.getSubmitButton().click({ force: true })



})
