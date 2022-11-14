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



//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const myActivityPage = new myActivity()
const uuuid = () => Cypress._.random(1e3)
amount = uuuid()
var mobile,amount, name, ifscnum, accnumber, loginId
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()
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
Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})

//----------------Navigate to User Management tab and Click on Register---------------------------------

//-------------------------Confirmation Message displayed---------------------------------------------
Then('Confirmation message is displayed', function () {

  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
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
//--------------------------------------------------------------------------------------------------------
And('User click on Suspended submitted user data for Suspension', function () {
  cy.getApproval(BuisnessRegSuspension)
})

And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(2000)
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


Then('User modified is approved', function () {

  approvalPage.getApproveConfirmationMessage()
})

When('Navigate to User Management and Click on register', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})

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
    cy.wait(5000)
  registerPage.getSecurityProfile().select('WholesalerDefaultSecurityProfile', { force: true })
  registerPage.getAuthProfile().select('WholesalerDefault Profile', { force: true })
  registerPage.getReguProfile().select('FullKycprofile', { force: true })
  registerPage.getMarketingProfile().select('WHSDefaultMP', { force: true })
  registerPage.getNextButtonBasic2().click({ force: true })

   //-----------------------------Profile---------------------------------------------------------------


  
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
  cy.wait(3000)
 
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
//----------------------------------------------------Arpitha----------------------------------------------
//-------------------------------------------TC_169------------------------------------------------------------------------------------

And('Enter registered login id value', function () {
 cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((usermobile) => {
    let lid = usermobile.LoginId
    cy.log(lid)
    registerPage.getLoginID().type(lid,{force:true})
  })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
})
Then('Login id Error message is displayed', function () {
  registerPage.getLoginError().find('small.text-danger').should('have.text', ' Value is not unique ');
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
Then('Email Error message is displayed', function () {
  registerPage.getLoginError().find('small.text-danger').should('have.text', ' Value is not unique ');


})
//-----------------------------------------------Kalyani-------------------------------------------------------

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
  approvalPage.getSubmittedCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })

})

