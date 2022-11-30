//-------------------------------------------------------------------Step-Definition------------------------------------------------------------------------
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
const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const APIPage = new API()
const myActivityPage = new myActivity()
const uuid = () => Cypress._.random(1e8)
const uuid1 = () => Cypress._.random(1e8)
const uuuid = () => Cypress._.random(1e3)
amount = uuuid()
var loginId, mobile,KycValue, amount, name, ifscnum, accnumber, BankData
const kycid = () => Cypress._.random(1e8)
const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp
mobile = "77" + uuid1()
var mobile1, Submobile, loginId, name
mobile1 = "77" + uuid()
var filename = 'cypress/fixtures/userData/AdministratorData.json'
var subRegistration = 'cypress/fixtures/userData/subscriberReg.json'
var BuisnessReg = 'cypress/fixtures/userData/BusinessUsersData.json'
var BuisnessRegO2C = 'cypress/fixtures/userData/BusinessUsersDataO2C.json'
var BankData = 'cypress/fixtures/userData/BusinessUsersDataO2C.json'
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
  cy.fixture('userData/SystemAdminLogin.json').then((data)=>{
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.fixture('userData/SystemAdminLogin.json').then((data)=>{
    let Name = data.SysAdminChecker1Name
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as Business admin User2', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.readFile('cypress/fixtures/userData/AdministratorData.json').then((data) => {
    var BALogin
    BALogin = data.BALoginID
    cy.login(BALogin, this.data1.BAPassword)
  })
})

Given('Login into Mobiquity Portal as Business admin User1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.readFile('cypress/fixtures/userData/AdministratorData.json').then((data)=>{
    var BALogin
    BALogin = data.BALoginID
    cy.login(BALogin, this.data1.DefaultPassword)
    cy.login1(this.data1.BAPassword)
    cy.Passwordchange(this.data1.UserCreationSuccessMessage)
    pageLogin.getloginbtn1().click({force:true})
    cy.login(BALogin, this.data1.BAPassword)
    })
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
//-------------------------Confirmation Message displayed---------------------------------------------
Then('Confirmation message is displayed', function () {
  cy.waitUntil(()=>{
    return cy.iframe().find('.text-center').should('be.visible')
  })
  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
})


When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getApprovalTab().click()
 //----------------------------------Added waituntil------------------------
 welcomePage.getApprovalButtonTab().click()
 cy.waitUntil(()=>{
    return cy.iframe().find('h4.text-secondary').should('be.visible')
  })
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  approvalPage.getAddUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })
})

//------------------------------------Approve----------------------------------------------------------
And('Navigate to My Activity and Aplly required filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  myActivityPage.getAddUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})
//--------------------------------------------------------------------------------------------------------

And('Assert Created Buissness User Mobile Number and Write Created on time', function(){
  cy.readFile(BuisnessReg).then((user) => {
  let BUMobile = user.registeredMobile
  var BUDMobile = " "+BUMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',BUDMobile)
})
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(BuisnessReg).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(BuisnessReg,data)
  })
})
})
And('Assert Created Buissness User Mobile Number and Write Created on time for O2C', function(){
  cy.readFile(BuisnessRegO2C).then((user) => {
  let BusinessMobile = user.registeredMobileO2C
  var BusinessUserMobile = " "+BusinessMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',BusinessUserMobile)
})
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(BuisnessRegO2C).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(BuisnessRegO2C,data)
  })
})
})
//-----------------------------------------------------------------------------------------------
And('User click on Buisness User submitted user data', function () {
  cy.getApproval(BuisnessReg)
})
And('User click on Buissness User submitted user data for O2C', function () {
  cy.getApproval(BuisnessRegO2C)
})
//---------------------------------------------------------------------------------------------
And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})

Then('User status is approved', function () {
  cy.waitUntil(()=>{
    return cy.iframe().find('.mat-simple-snackbar.ng-star-inserted > span').should('be.visible')
  })
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})


//-----------------------------------------Arpitha---------------------------------------------------
//-------------------------TC53----------Register  Businsess User.---------------------------------------

And('Select User type as Business and Select user role', function () {
  pageLogin.getiFrame()
  registerPage.getregisterPageTitle().should('be.visible')
  registerPage.getSelectUserTypeTab().eq(2).click({ force: true })
  registerPage.getSelectUserTypeTab().eq(2).focused()
  registerPage.getUserRole().eq(9).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
//----------------------Basic Data---------------------------------------------------------------
And('Enter all the required business user details', function () {
  let mobileut;
  const m = parseInt(Date.now()/100000);
  mobileut = "77" + m
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.name + lgid()
  cy.waitUntil(()=>{ 
    return cy.iframe().find('input[id="lastName"]').should('be.visible')
   })
  cy.iframe().find('select[data-test-id="title"]').select(this.data2.personalInfo.Title, { force: true })
  //-----------------------Mobile Number OTP-------------------------------------------------------------------
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data)=>{
    data.registeredMobile=mobileut
    cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json',data)
  })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.OTP(Cypress.env('apiBaseURL'))
  //----------------email id otp---------------------------------------------------//
  cy.getBusinessrandomUserEmailID()
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
 cy.OTP(Cypress.env('apiBaseURL'))
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
  registerPage.getKYCIDType().select(this.data2.KycInfo8.KycIDType, { force: true })
  registerPage.getKYCIDValue().type(kycut, { force: true })
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
    data.RegisteredKyc = kycut
    cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json', data)
  })
  registerPage.getMakeThisPrimaryButton().eq(2).click({ force: true })
  registerPage.getNextButtonBasic1().click({ force: true })
  
//-----------------------------Profile---------------------------------------------------------------
  registerPage.getSecurityProfile().select('WholesalerDefaultSecurityProfile', { force: true })
    registerPage.getAuthProfile().select('WholesalerDefault Profile', { force: true })
    registerPage.getReguProfile().select('FullKycprofile', { force: true })
    registerPage.getMarketingProfile().select('WHSDefaultMP', { force: true })
    registerPage.getNextButtonBasic2().click({force:true})
    // registerPage.getNextButtonBasic3().click({force:true})
    registerPage.getSubmitButton().click({ force: true })
})

And('Enter all the required business user details for O2C', function () {
  let mobileut;
  const m = parseInt(Date.now()/100000);
  mobileut = "77" + m
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.name + lgid()
  cy.waitUntil(()=>{ 
    return cy.iframe().find('input[id="lastName"]').should('be.visible')
   })
  cy.iframe().find('select[data-test-id="title"]').select(this.data2.personalInfo.Title, { force: true })
  //-----------------------Mobile Number OTP-------------------------------------------------------------------
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.readFile("cypress/fixtures/userData/BusinessUsersDataO2C.json").then((data)=>{
    data.registeredMobileO2C=mobileut
    cy.writeFile("cypress/fixtures/userData/BusinessUsersDataO2C.json",data)

  })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.OTP(Cypress.env('apiBaseURL'))
  //----------------email id otp---------------------------------------------------//
  cy.getBusinessrandomUserEmailIDO2C()
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
 cy.OTP(Cypress.env('apiBaseURL'))
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
  registerPage.getKYCIDType().select(this.data2.KycInfo8.KycIDType, { force: true })
  registerPage.getKYCIDValue().type(kycut, { force: true })
  registerPage.getMakeThisPrimaryButton().eq(2).click({ force: true })
  registerPage.getNextButtonBasic1().click({ force: true }) 
  //-----------------------------BANK Details---------------------------------------------------------------
   registerPage.getSecurityProfile().select('WholesalerDefaultSecurityProfile', { force: true })
   registerPage.getAuthProfile().select('WholesalerDefault Profile', { force: true })
   registerPage.getReguProfile().select('FullKycprofile', { force: true })
   registerPage.getMarketingProfile().select('WHSDefaultMP', { force: true })
   registerPage.getNextButtonBasic2().click({force:true})
   
   //----------------------------------PROFILE------------------------------------------------------------

    //const t = parseInt(Date.now()/1000);
    //ifscnum="S"+t
    //const uuidbkd = () => Cypress._.random(1e9)
    //accnumber="4239346"+uuidbkd()
    //registerPage.getCurrency().select(this.data2.Bank.Currency, { force: true })
    //cy.wait(3000)
    //cy.readFile(BankData).then((data) => {
    //data.CurrencyDetail= this.data2.Bank.Currency
    //cy.writeFile(BankData, data)
  //})
   //cy.wait(3000)
   //registerPage.getBankName().select(this.data2.Bank.BankName, {force:true})
   //cy.wait(3000)
   //cy.readFile(BankData).then((data) => {
   //data.BankNameDetail= this.data2.Bank.BankName
   //cy.writeFile(BankData, data)
  //})
 
   //registerPage.getAccountNum().type(accnumber, { force: true })
   //cy.wait(3000)
   //cy.readFile(BankData).then((data) => {
   //data.Accnum= accnumber
   //cy.writeFile(BankData, data)
  //})
   //registerPage.getConfirmAccNum().type(accnumber, { force: true })
   //registerPage.getNickName().type(getRandomName(), { force: true })
   //registerPage.getBankAccountType().select(this.data2.Bank.BankAccountType,{force:true})
   //cy.readFile(BankData).then((data) => {
   //data.BankAccountTYpeDetail= this.data2.Bank.BankAccountType
   //cy.writeFile(BankData, data)
   //})
   //cy.wait(3000)
   //registerPage.getBankIFSC().type(ifscnum, { force: true })
  //  registerPage.getNextButtonBasic3().click({force:true})
   registerPage.getSubmitButton().click({ force: true })
   })

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()
})

And('Enter Mobile number or KYC number in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile('cypress/fixtures/userData/AdministratorData.json').then((data) => {
    var Mobile
    Mobile = data.BAMobileNumber 
    cy.log(mobile)
  manageUsersPage.getSearchUser().type(Mobile, { force: true })
})
  manageUsersPage.getSearchUserButton().click({ force: true })
})

When('User Click on eye button', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
})

Then('Verify View Details Page', function () {
  manageUsersPage.getViewDetails().should("contain", this.data2.confirmationMessage.viewDetails)
})


And('Enter Mobile number or KYC number in Search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile('cypress/fixtures/userData/subscriberReg.json').then((data) => {
    Submobile = data.subscriberMobile
    cy.log(Submobile)
    manageUsersPage.getSearchUser().type(Submobile, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })
})



