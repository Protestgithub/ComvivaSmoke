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
const SubMob='userData/subscriberReg.json'
amount = uuuid()
var loginId, mobile,KycValue, amount, name, ifscnum, accnumber
const uuid = () => Cypress._.random(1e8)
const timestamp = (new Date).getTime()
const kycid = timestamp
mobile = "77" + uuid()
var RegulatoryMarketingProfile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
var BankData = 'cypress/fixtures/userData/BankData.json'
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
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
 // cy.checkWelcomeText(this.data2.superadminm.superadminmaker)
})


Given('Login into Mobiquity Portal as Business admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
  cy.wait(8000)
  cy.readFile('cypress/fixtures/userData/BusinessUserSuspensionData.json').then((data)=>{
    var SuspendedId
    SuspendedId = data.LoginId
    cy.login(SuspendedId, this.data1.businessAdmin.DefaultPassword)
    
})
pageLogin.getUserLoginMessage().should('contain',this.data1.ErrorMessageLogin)
})

Given('Login into Mobiquity Portal as Business admin User1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
  cy.wait(8000)
  cy.readFile('cypress/fixtures/userData/BusinessUserSuspensionData.json').then((data)=>{
    var SuspendedId
    SuspendedId = data.LoginId
    cy.login(SuspendedId, this.data1.businessAdmin.DefaultPassword)
    cy.login1(this.data1.businessAdmin.businessadminPwd1)
    cy.wait(2000)
    cy.Passwordchange(this.data1.UserCreationSuccessMessage)
    pageLogin.getloginbtn1().click({force:true})
       

})
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


//-------------------------Confirmation Message displayed---------------------------------------------
Then('Confirmation message is displayed', function () {

  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
})

When('Navigate to Approvals and  click on suspended data', function () {
 // welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
 cy.wait(2000)
 welcomePage.getApprovalButtonTab().click()
 
 //------------------------------Added wait until------------------------------------------------
 
 cy.waitUntil(()=>{
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })
  
 cy.wait(2000)
  //------------------------------------Filter the data--------------------------------------------------
 

})

//------------------------------------Approve----------------------------------------------------------
And('Navigate to My Activity and Apply Add User filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  cy.wait(2000)
  myActivityPage.getAddUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})

And('Navigate to My Activity and Apply Modified User filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  cy.wait(2000)
  myActivityPage.getModificationOfUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})
//--------------------------------------------------------------------------------------------------------

And('Assert Created Buissness User Mobile Number and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(BuisnessReg).then((user) => {
  let BUMobile = user.registeredMobile
  var BUDMobile = " "+BUMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',BUDMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(BuisnessReg).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(BuisnessReg,data)
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

Then('User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})

When('Navigate to Manage User, and search Business Admin', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})
When('Navigate to UserManagement And Click on Manage Users', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})


And('System Admin is able to view details', function () {
  (manageUsersPage.getViewIcon().eq(0).click({ force: true }))
  cy.wait(3000)
})

Then('Confirm the edit details', function () {
  manageUsersPage.getConfirmButton().click({ force: true })
  cy.wait(2000)
  manageUsersPage.getDoneButton().click({ force: true })

})
Then('User modified is approved', function () {

  approvalPage.getApproveConfirmationMessage()
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
  cy.wait(3000)
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
  manageUsersPage.getConfirmButton().click({ force: true })
})

/*----------------------------------------Barring-------------------------------------------------*/
And('Enter Mobile number and KYC number in search menu', function () {
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getSearchUser().type(cy.readFile(('cypress/fixtures/userData/BusinessUsersData.json'),telcoMobile ), { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

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
/*-----------------------------telco operator------------------------------------------*/
And('Select User type as Business and click on Telco operator', function () {
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).focused()
  registerPage.getUserRole().contains(this.data2.userRole2).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
And('Enter all the mandatory Basic information details and click on next', function () {
const uuid1 = () => Cypress._.random(1e8)
  var mobile2 = "77" + uuid1()
  cy.wait(3000)
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
  cy.wait(2000)
  registerPage.getDenominationOptional().type("123", { force: true })
})
And('Click on Next >> click on Confirm', function () {
  registerPage.getNextButtonOperatorProfile().click({ force: true })
  registerPage.getNextButtonBasic3().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
})
Then('Confirmation message', function () {
  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
})

And('Assert Created Telco-Operator Mobile Number and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(BuisnessReg).then((user) => {
  let TEMobile = user.telcoMobile
  var TOMobile = " "+TEMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',TOMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(BuisnessReg).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(BuisnessReg,data)
  })
})
})

/*----------------------------Modify--telco operator----------------------------------*/
And('Enter Telco operator Mobile number and KYC number in search menu', function () {
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) =>
  {
    let mobile1 = data.telcoMobile
    manageUsersPage.getSearchUser().type(mobile1, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })
})

Then('Confirmation modify message', function () {
  cy.wait(1000)
  registerPage.getConfirmationText1().should('have.text', this.data2.personalInfo.successConfirm, { force: true })
})






/*------------------Unregistered number-----------------------------------------------------*/
When('Navigate to User Management and Click on register', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})

And('Select User type Business', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).focused()
  registerPage.getUserRole().contains(this.data2.userRole3).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })

})
And('Enter all the required details business', function () {
  cy.wait(2000)

 
  registerPage.getMobileNumber().type(mobile, { force: true })
  registerPage.getLastName().type(this.data2.personalInfo.lastName, { force: true })

  cy.OTP(Cypress.env('apiBaseURL'))

  cy.wait(2000)
  //----------------email id otp---------------------------------------------------//
  cy.getrandomUserEmailID("first", "last")
  registerPage.getFirstName().type(this.data2.personalInfo.firstName, { force: true })

cy.OTP(Cypress.env('apiBaseURL'))

  cy.wait(2000)
  registerPage.getTitle().select(this.data2.personalInfo.title, { force: true })

  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })

})
Then('Click on Next', function () {
  registerPage.getNextButtonBasic().click({ force: true })
})
And('Enter all the mandatory KYC details.', function () {
  
  KycValue = "Z" + kycid
  registerPage.getNextButtonBasic().click({ force: true })
  registerPage.getKYCButton().click({ force: true })
  registerPage.getKYCIDType().select(this.data2.subPersonalInfo.KYCIDType, { force: true })
  registerPage.getKYCIDValue().type(KycValue, { force: true })
  registerPage.getNextButtonBasic1().click({ force: true })

  registerPage.getPrimary().click({ force: true })
})
And('Enter all the mandatory Profile details like marketing profile,regulatory profile', function () {
  registerPage.getSecurityProfile().select(this.data2.subPersonalInfo.securityProfile0, { force: true })

  registerPage.getReguProfile().select(this.data2.subPersonalInfo.ReguProfile0, { force: true })
  registerPage.getMarkProfile().select(this.data2.subPersonalInfo.MarketProfile0, { force: true })

})
And('Click on Next >> click on Submit', function () {
  registerPage.getNextButtonBasic2().click({ force: true })
  cy.wait(2000)

  registerPage.getKYCIcon().eq(1).click({ force: true })
  registerPage.getNextButtonBasic1().click({ force: true })
  registerPage.getNextButtonBasic2().click({ force: true })

  registerPage.getSubmitButton().click({ force: true })
  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
})
//======================END UserManagement========================================================//


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

  let kycut
  const k = parseInt(Date.now());
  kycut="A"+k
  //---------------------KYC-----------------------------------------------------------------------
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
 cy.wait(3000)
 
 cy.readFile(BankData).then((data) => {
  data.BankNameDetail= this.data2.Bank.BankName
  cy.writeFile(BankData, data)
})
 
 registerPage.getAccountNum().type(accnumber, { force: true })
   cy.wait(3000)
 cy.readFile(BankData).then((data) => {
  data.Accnum= accnumber
  cy.writeFile(BankData, data)
})
 registerPage.getConfirmAccNum().type(accnumber, { force: true })
 
 registerPage.getNickName().type(getRandomName(), { force: true })
 registerPage.getBankAccountType().select(this.data2.Bank.BankAccountType,{force:true})
 cy.readFile(BankData).then((data) => {
  data.BankAccountTYpeDetail= this.data2.Bank.BankAccountType
  cy.writeFile(BankData, data)
})
 cy.wait(3000)
 
 registerPage.getBankIFSC().type(ifscnum, { force: true })
  registerPage.getNextButtonBasic3().click({force:true})
 registerPage.getSubmitButton().click({ force: true })



})

//####Creating Business User For Suspension
And('Enter all the required business user details1', function () {

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
  registerPage.getMobileNumber().type(mobileut, { force: true })
  cy.writeFile('cypress/fixtures/userData/BusinessUserSuspensionData.json', { registeredMobile: mobileut })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.OTP(Cypress.env('apiBaseURL'))
  cy.wait(2000)
  //----------------email id otp---------------------------------------------------//
  cy.getBusinessrandomUserEmailID1()
  registerPage.getFirstName().type(getRandomName(), { force: true })
  cy.OTP(Cypress.env('apiBaseURL'))
  cy.wait(2000)
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })

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
  kycut="A"+k
  //---------------------KYC-----------------------------------------------------------------------
  registerPage.getKYCButton().eq(0).click({ force: true })
  cy.wait(2000)
  registerPage.getKYCIDType().select(this.data2.KycInfo8.KycIDType, { force: true })
  registerPage.getKYCIDValue().type(kycut, { force: true })
  cy.wait(2000)
  registerPage.getMakeThisPrimaryButton().eq(2).click({ force: true })
  cy.wait(2000)
  registerPage.getNextButtonBasic1().click({ force: true })

   //-----------------------------Profile---------------------------------------------------------------

  cy.wait(5000)
  //cy.readFile(SubProfileName).then((data) => {
    //let Profile = data.Distributer
    registerPage.getSecurityProfile().select('WholesalerDefaultSecurityProfile', { force: true })
  //})
   // cy.readFile(RegulatoryMarketingProfile).then((data) => {
    //   let Profile = data.BusinessAgent1
//registerPage.getAuthProfile().select(Profile, { force: true })
// })
  registerPage.getAuthProfile().select('WholesalerDefault Profile', { force: true })
  //registerPage.getReguProfile().select(this.data2.personalInfo.ReguProfile, { force: true })
  //cy.readFile(RegulatoryMarketingProfile).then((data) => {
    //   let Profile = data.RegulatoryProfileName
registerPage.getReguProfile().select('FullKycprofile', { force: true })
 //})
 // registerPage.getMarketingProfile().select(this.data2.personalInfo.MarketProfile, { force: true })
  //cy.readFile(RegulatoryMarketingProfile).then((data) => {
   //let Profile = data.MarketingProfileNameDistributer
   registerPage.getMarketingProfile().select('WHSDefaultMP', { force: true })
// })
 cy.wait(3000)

  registerPage.getNextButtonBasic2().click({ force: true })
  
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
 cy.wait(3000)
 
 cy.readFile(BankData).then((data) => {
  data.BankNameDetail= this.data2.Bank.BankName
  cy.writeFile(BankData, data)
})
 
 registerPage.getAccountNum().type(accnumber, { force: true })
  
 cy.wait(3000)
 cy.readFile(BankData).then((data) => {
  data.Accnum= accnumber
  cy.writeFile(BankData, data)
})
 registerPage.getConfirmAccNum().type(accnumber, { force: true })
 
 registerPage.getNickName().type(getRandomName(), { force: true })
 registerPage.getBankAccountType().select(this.data2.Bank.BankAccountType,{force:true})
 cy.readFile(BankData).then((data) => {
  data.BankAccountTYpeDetail= this.data2.Bank.BankAccountType
  cy.writeFile(BankData, data)
})
 cy.wait(3000)
 
 registerPage.getBankIFSC().type(ifscnum, { force: true })
  registerPage.getNextButtonBasic3().click({force:true})
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
  registerPage.getNextButtonBasic2().click({ force: true })
})

//---------------------------EmailID------------------------------------------------------

And('Search with the EmailID', function () {
  pageLogin.getiFrame()
  cy.wait(3000)
  manageUsersPage.getSearchUser().click({ force: true })
  cy.wait(2000)
  cy.getBusinessUserEmailID()
  manageUsersPage.getSearchUserButton().click({ force: true })

})
//---------------------LoginID-----------------------------
And('Search with the LoginID', function () {
  pageLogin.getiFrame()
   cy.wait(3000)
  manageUsersPage.getSearchUser().click({ force: true })
  cy.getBusinessUserLoginID()
  manageUsersPage.getSearchUserButton().click({ force: true })

})

//---------------------KYC Number-----------------------------
And('Search with the KYC Number', function () {
  pageLogin.getiFrame()
  cy.wait(3000)
  manageUsersPage.getSearchUser().click({ force: true })
  cy.getBusinessUserKycID()
  manageUsersPage.getSearchUserButton().click({ force: true })

})




//---------------------------TC57----------Approve the Modification of the Businsess User.----------------------------------------------------------------------------
When('Navigate to Approvals and filter by Modification of user status', function () {
 
  welcomePage.getApprovalTab().click()
   cy.wait(2000)
 welcomePage.getApprovalButtonTab().click()
 
 //-----------------------------------added waituntil-------------------------------------
 cy.waitUntil(()=>{
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })
  
 cy.wait(2000)
  //----------Filter the data
  cy.wait(8000)
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.wait(2000)

  approvalPage.getModificationUserCheckBox().click({ force: true })
  cy.wait(8000)
  approvalPage.getApplyFilter().click({ force: true })
  cy.wait(3000)
})
//-----------Approve
And('Admin click on Modified user data', function () {
  cy.wait(4000)
  cy.getApproval(BuisnessReg)
})


Then('Verify the Confirmation message', function () {
  cy.wait(2000)
  approvalPage.getApproveConfirmationMessage().contains(this.data.confirmationMessage.addUser)
})
Then('View page is displayed', function () {
  cy.wait(3000)
  manageUsersPage.getViewDetailsUser().should('have.text', this.data2.personalInfo.ViewdetailsOfUser)
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
 cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((usermobile) => {
    let lid = usermobile.LoginId
    cy.log(lid)
    registerPage.getLoginID().type(lid,{force:true})
  })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
})

//-------------------------------------------TC_170---------------------------------------------------------------------


And('Enter registered email id value', function () {
cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((usermobile) => {
    let eid = usermobile.EmailID
    cy.log(eid)
    registerPage.getEmailID().type(eid,{force:true})
    })
    
    registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })

})




//------------------------------------Monica----------------------------------------------------------

//-----------------------------Test Scripts-----------------------------------------------------------------------------

//---------------------USER MANAGEMENNT MANAGE USER--------------------------------------------


//---------------------USER MANAGEMENNT MANAGE USER--------------------------------------------


And('Enter Mobile number and KYC number in search menu1', function () {
cy.readFile(cypress/fixtures/SubMob.json).then((user) => {
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
  manageUsersPage.getlockedmessage().should('have.text',this.data2.UnlockOutgoing)
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



//-----------------------------------------Sudheer----------------------------------------------------------

//----------TC_129-------To verify that Admin user can view all the transaction details under Order details menu------------


When('Click on user management and Manage users', function () {

  manageUsersPage.getUsermanagement().scrollIntoView()
  manageUsersPage.getUsermanagement().click()
  manageUsersPage.getManageUsers().click()
})

And('Enter Mobile numberin search Menu', function () {
  cy.wait(3000)
  pageLogin.getiFrame()
  manageUsersPage.getUserSearchDetails().click({ force: true })
  cy.getSubscriberMobileNumber()
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

//----------TC_130-------To verify that Admin user can check all the Order Details of a customer/ business users successfully------------

And('Enter Mobile number and KYC number in search menu for customer/ business users', function () {
  cy.wait(3000)
  manageUsersPage.getUserSearchDetails().type(this.data4.mobilenumber.businessUserMobile, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })
  //cy.getBAMobileNumber()

  manageUsersPage.getBusinessUserDetail().should('have.text', ' Business')
})

Then('Click on order details for customer/ business users', function () {
  cy.wait(3000)
  manageUsersPage.getOrderDetailsButton().click({ force: true })
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

Then('Click on transactions id view Details', function () {
  cy.wait(3000)
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  manageUsersPage.getDateRangeAssert().should('contain.text', 'More Details')
})
//-------TC_133------To verify that user can able to view all the wallet transactions by entering valid transaction id.------------


When('Click on user management and Manage users', function () {

  manageUsersPage.getUsermanagement().scrollIntoView()
  manageUsersPage.getUsermanagement().click()
  manageUsersPage.getManageUsers().click()
})

And('Enter Mobile number and KYC number in search menu for valid transaction with id', function () {
  cy.wait(3000)
  manageUsersPage.getUserSearchDetails().type(this.data2.mobilenumber.mobile, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })
})

And('Click on view Details for valid transaction with id', function () {
  cy.wait(3000)
  manageUsersPage.getViewAllDetailsButton().click({ force: true })
})

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

When('Click on user management and Manage users', function () {

  manageUsersPage.getUsermanagement().scrollIntoView()
  manageUsersPage.getUsermanagement().click()
  manageUsersPage.getManageUsers().click()
})

And('Enter Mobile number and KYC number in search menu for transaction type', function () {
  cy.wait(3000)
  manageUsersPage.getUserSearchDetails().type(this.data2.mobilenumber.mobile, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })
})

And('Click on view Details for transaction type', function () {
  cy.wait(3000)
  manageUsersPage.getViewAllDetailsButton().click({ force: true })
})

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

When('Click on user management and Manage users', function () {

  manageUsersPage.getUsermanagement().scrollIntoView()
  manageUsersPage.getUsermanagement().click()
  manageUsersPage.getManageUsers().click()
})

And('Enter Mobile number and KYC number in search menu based on the Date', function () {
  cy.wait(3000)
  manageUsersPage.getUserSearchDetails().type(this.data2.mobilenumber.mobile, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })
})

//-----TC_135-------To verify that user can able to fetch the Statement based on the Date range.------------

And('Click on view Details based on the Date', function () {
  cy.wait(3000)
  manageUsersPage.getViewAllDetailsButton().click({ force: true })
})

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




//-----------------------------------------------Kalyani-------------------------------------------------------





When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})
And('Enter Mobile number and KYC number in search for suspension', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  //Added to fetch business user mobile number and login id  for suspension
  cy.readFile('cypress/fixtures/userData/BusinessUserSuspensionData.json').then((data) => {
    var mobile
    mobile = data.registeredMobile 
    cy.log(mobile)
  manageUsersPage.getSearchUser().type(mobile, { force: true })
})
  manageUsersPage.getSearchUserButton().click({ force: true })

})
And('Assert Created Buissness User Mobile Number for Suspension and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(BuisnessRegSuspension).then((user) => {
  let BUMobile = user.registeredMobile
  var BUDMobile = " "+BUMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',BUDMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(BuisnessRegSuspension).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(BuisnessRegSuspension,data)
  })
})
})
And('Assert Buissness User Mobile Number for Suspension and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(BuisnessRegSuspension).then((user) => {
  let BUMobile = user.registeredMobile
  var BUDMobile = " "+BUMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',BUDMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(1).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(BuisnessRegSuspension).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(BuisnessRegSuspension,data)
  })
})
})
And('Select user type & enter Mobile number or KYC number in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  //manageUsersPage.getdropdown().select(this.data2.business.userType, { force: true })
  //Fetching Business mobile Number to see his details
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
    var mobile
    mobile = data.registeredMobile 
    cy.log(mobile)
  manageUsersPage.getSearchUser().type(mobile, { force: true })
})
  manageUsersPage.getSearchUserButton().click({ force: true })

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
Then('Verify the user resume Confirmation message', function () {
  approvalPage.getApproveConfirmationMessage().should("contain", this.data2.suspendResumeConfirmationMessage.suspendResumeUser)
})
When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
   cy.wait(2000)
 welcomePage.getApprovalButtonTab().click()
 
 //--------------------------------Added wait until-----------------------------
 
 cy.waitUntil(()=>{
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })
  
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
And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  cy.wait(3000)
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(3000)
})
Then('User status is Suspended', function () {
  approvalPage.getApproveConfirmationMessage().should("contain", this.data2.suspendResumeConfirmationMessage.userSuspended)
})

Then('User status is Resumed', function () {
  approvalPage.getApproveConfirmationMessage().should("contain", this.data2.suspendResumeConfirmationMessage.userResumed)
})


