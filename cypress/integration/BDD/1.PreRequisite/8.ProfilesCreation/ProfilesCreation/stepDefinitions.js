/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';

import "../../../../../support/commands";
import "../../../../../support/securityCommands";
import "../../../../../support/TransferControlProfileCommand";
import BankManagement from '../../../../../support/pageObjects/BankManagement';
import 'cypress-file-upload'
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import DomainFieldspage from '../../../../../support/pageObjects/DomainManagement/DomainFieldspage';
import CircularJSON from 'circular-json';
import Flatted from 'flatted';
import TransferRulePage from '../../../../../support/pageObjects/TransferRules/TransferRulePage';
import TransferControlProfile from '../../../../../support/pageObjects/TransferControlProfile';
import TransactionCorrection from '../../../../../support/pageObjects/TransactionCorrection';
import ErrorMessage from '../../../../../support/pageObjects/UserManagement/ErrorMessage';
import walletManagement from '../../../../../support/pageObjects/WalletManagement/walletManagement';
import AddGrades from '../../../../../support/pageObjects/GradeManagement/AddGrades';
import ModifyGrades from '../../../../../support/pageObjects/GradeManagement/ModifyGrades';
import DeleteGrades from '../../../../../support/pageObjects/GradeManagement/DeleteGrades';
import AddCategory from '../../../../../support/pageObjects/CategoryManagement/AddCategory';
import SecurityProfilePage from '../../../../../support/pageObjects/SecurityProfile/SecurityProfilePage';
import "../../../../../support/authourizationcommands"
import authorizationManagement from '../../../../../support/pageObjects/AuthorizationProfileManagement/authorizationManagement';
import RegulatoryProfile from '../../../../../support/pageObjects/UserManagement/RegulatoryProfile';
import MarketingProfile from '../../../../../support/pageObjects/UserManagement/MarketingProfile';




//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const securityProfilePage = new SecurityProfilePage()
const authorizationProfilePage = new authorizationManagement()
var RegulatoryFile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
var ProfileName = 'cypress/fixtures/profileData/Profile.json'
const MarketingProfile1 = new MarketingProfile()
const RegulatoryProfile1 = new RegulatoryProfile()
const uid = () => Cypress._.random(0, 1e6)
const id = uid()
const ITCP="userData/TCPdata.json"
const ITCP1="userData/TCPdata1.json"
var name,profName
var LoginId1
const uuid12 = () => Cypress._.random(1e8)
LoginId1= uuid12()
function getRandomName() {
profName = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var i=0; i<5; i++)
profName += possible.charAt(Math.floor(Math.random() * possible.length));
return profName;
}




//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('BankManagement').then(function(data03)
  {
     this.data03 = data03;
  })
  cy.fixture('Domain&CategoryManagement').then(function(data4)
  {
      this.data4 = data4;
  })
  cy.fixture('TransferControlProfile').then(function (data5) {
    this.data5 = data5;
  })

  cy.fixture('GradeManagement').then(function(data01)
  {
      this.data01 = data01;
  })
  cy.fixture('SecurityProfile').then(function (data6) {
    this.data6 = data6;
  })
  cy.fixture('authorizationProfile').then(function (data7) {
    this.data7 = data7;
  })

}); 

//---------------------------------------------Login----------------------------------------------------
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
Given('Login into Mobiquity Portal as System admin User after Logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin User after logout', function () {
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

//----------------------------------------------------------------------------------------------------

Given('Login into Mobiquity Portal as masteradmin Maker', function(){
    cy.wait(3000)
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.masterAdmin2.masterchckr1, this.data1.masterAdmin2.mstAdminPwd1)
    cy.wait(2000)
   // cy.checkWelcomeText(this.data2.SuperAdminChecker)
  })  
//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
})
//superadminc
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
})
Given('Login into Mobiquity Portal as Super admin Maker after Logout', function () {
  cy.loginAgain(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data2.superadminm.superadminmaker)
})

Given('Login into Mobiquity Portal as Super admin Checker after Logout', function () {
  cy.loginAgain(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data2.superadminc.superadminchecker)
})

Given ('Login with Master Admin Checker', function(){
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
    cy.wait(2000)
  })
//----------------------------Security Profile Creation for system Admin-------------------------------
//-------------------------------------Security Profile------------------------------------------------
//----------------------------------------Subscriber----------------------------------------------------

When('Navigate to Security and click to select security profile', function () {

  welcomePage.getSecurityLink().scrollIntoView()
  welcomePage.getSecurityLink().click({ force: true })
  welcomePage.getSecurityProfileLink().click({ force: true })
  securityProfilePage.getSecurityProfilePageTitle().should('have.text', this.data6.securityProfilePageTitle)
})

And('Fill the details-Subscriber Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )

  cy.readFile(ProfileName).then((data) => {
      data.SystemAdmin = name
      cy.writeFile(ProfileName, data)
    })  
})
And('Fill the details-PasswordRestrictios', function () {
  securityProfilePage.getMinPasswordLength().type(this.data6.minPasswordLength)
  securityProfilePage.getMaxPasswordLength().type(this.data6.maxPasswordLength)
  securityProfilePage.getCheckBox().contains(this.data6.checkBox1).click({ force: true })
  securityProfilePage.getCheckBox().contains(this.data6.checkBox2).click({ force: true })
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })
  securityProfilePage.getFailedPwdLoginCAPTCHA().type(this.data6.failedLoginCAPTCHA)
  securityProfilePage.getFailedPasswordAttempts().click({ force: true }).type(this.data6.failedPwdAttempts)
  securityProfilePage.getAllowedSplChar().type(this.data6.specialCharacters)
  securityProfilePage.getPasswordExpiry().type(this.data6.passwordExpiryDays)
  securityProfilePage.getLastNonRepeatingPWD().type(this.data6.lastNonRepeatingPassword)
  securityProfilePage.getCheckBox().contains(this.data6.resetForgetPassword).click({ force: true })

})
And('Fill the details-AuthRestrictions', function () {
  //securityProfilePage.getTwoFactorAuth().click({ force: true })
  //securityProfilePage.getGeoLocation().click({ force: true })
})
And('Fill the details-loginRestrictions', function () {
  securityProfilePage.getLoginRestrictions().click({ force: true })
  securityProfilePage.getMultipleLoginsAllowedCount().type(this.data6.multipleLoginsAllowedCount)
  securityProfilePage.getSelectAllorClearLink().click({ force: true })
  securityProfilePage.getIpGroupRadioButton().click({ force: true })
  cy.wait(2000)
  securityProfilePage.getIpAddress().type(this.data6.getIpAddress)
  //securityProfilePage.getIpRangeTo().type(this.data6.getIpRangeTo)
  securityProfilePage.getCoolOffPeriod().type(this.data6.getCoolOffPeriod)
  //securityProfilePage.getAutoLogoutTime().type(this.data6.getAutoLogoutTime)
  securityProfilePage.getAuthSystem().select(this.data6.authSystem)
  securityProfilePage.getNotifyOnDeviceChangeCheckBox().click({ force: true })
  securityProfilePage.getMinSecurityQuestionToResetCredentials().type(this.data6.minQuestions)
  securityProfilePage.getMaxSecurityQuestionToResetCredentials().type(this.data6.maxQuestions)
})
  Then('Click on add and confirm',function () {
  securityProfilePage.getAddButton().click({ force: true })
  cy.wait(3000)
  securityProfilePage.getConfirmButton().click({ force: true })
  securityProfilePage.getSuccessMessage().should('have.text', this.data6.successMessage)
  securityProfilePage.getDoneButton().click({ force: true })
})


    //---------------------------------------------Security Profile Creation -------------------------------
  //------------TC_109--------------------------Security Profile------------------------------------------------
//----------------------------------------Subscriber----------------------------------------------------

When('Navigate to Security and click to select security profile', function () {

  welcomePage.getSecurityLink().scrollIntoView()
  welcomePage.getSecurityLink().click({ force: true })
  welcomePage.getSecurityProfileLink().click({ force: true })
  securityProfilePage.getSecurityProfilePageTitle().should('have.text', this.data6.securityProfilePageTitle)
})
And('Click on add profile select user type as subscriber and fill the details', function () {

  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectSubUserTypeTab().click({ force: true })
  securityProfilePage.getSelectSubUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(0).click({ force: true })
})
And('Fill the details-Subscriber Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )

  cy.readFile(SubProfileName).then((data) => {
      data.subscriber = name
      cy.writeFile(SubProfileName, data)
    })  
})
And('Fill the details-PasswordRestrictios', function () {
  securityProfilePage.getMinPasswordLength().type(this.data6.minPasswordLength)
  securityProfilePage.getMaxPasswordLength().type(this.data6.maxPasswordLength)
  securityProfilePage.getCheckBox().contains(this.data6.checkBox1).click({ force: true })
  securityProfilePage.getCheckBox().contains(this.data6.checkBox2).click({ force: true })
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })
  securityProfilePage.getCheckBox().contains(this.data6.checkBox4).click({ force: true })
  securityProfilePage.getFailedPwdLoginCAPTCHA().type(this.data6.failedLoginCAPTCHA)
  securityProfilePage.getFailedPasswordAttempts().click({ force: true }).type(this.data6.failedPwdAttempts)
  securityProfilePage.getAllowedSplChar().type(this.data6.specialCharacters)
  securityProfilePage.getPasswordExpiry().type(this.data6.passwordExpiryDays)
  securityProfilePage.getLastNonRepeatingPWD().type(this.data6.lastNonRepeatingPassword)
  securityProfilePage.getCheckBox().contains(this.data6.resetForgetPassword).click({ force: true })

})
And('Fill the details-PinRestrictions', function () {
  securityProfilePage.getPIN().click({ force: true })
  securityProfilePage.getPinLength().type(this.data6.pinLength)
  securityProfilePage.getSequentialNumberCheckBox().click({ force: true })
  cy.wait(2000)
  securityProfilePage.getPinBlock().type(this.data6.failedAttemptsToBlock)

  cy.wait(2000)
  securityProfilePage.getFailedPinLoginCAPTCHA().type(this.data6.failedPin)

  securityProfilePage.getRepeatingNumberCheckBox().click({ force: true })
  securityProfilePage.getPinExpiry().type(this.data6.pinExpiry)
  securityProfilePage.getNonRepeatingLastPins().type(this.data6.lastNonRepeatingPin)
  securityProfilePage.getSelectAllorClearLink().click({ force: true })
})
And('Fill the details-AuthRestrictions', function () {
  securityProfilePage.getTwoFactorAuth().click({ force: true })
  securityProfilePage.getGeoLocation().click({ force: true })
})
And('Fill the details-loginRestrictions', function () {
  securityProfilePage.getLoginRestrictions().click({ force: true })
  securityProfilePage.getMultipleLoginsAllowedCount().type(this.data6.multipleLoginsAllowedCount)
  securityProfilePage.getSelectAllorClearLink().click({ force: true })
  securityProfilePage.getIpGroupRadioButton().click({ force: true })
  cy.wait(2000)
  securityProfilePage.getIpAddress().type(this.data6.getIpAddress)
  //securityProfilePage.getIpRangeTo().type(this.data6.getIpRangeTo)
  securityProfilePage.getCoolOffPeriod().type(this.data6.getCoolOffPeriod)
  securityProfilePage.getAutoLogoutTime().type(this.data6.getAutoLogoutTime)
  securityProfilePage.getAuthSystem().select(this.data6.authSystem)
  securityProfilePage.getNotifyOnDeviceChangeCheckBox().click({ force: true })
  securityProfilePage.getMinSecurityQuestionToResetCredentials().type(this.data6.minQuestions)
  securityProfilePage.getMaxSecurityQuestionToResetCredentials().type(this.data6.maxQuestions)
})
  Then('Click on add and confirm',function () {
  securityProfilePage.getAddButton().click({ force: true })
  cy.wait(3000)
  securityProfilePage.getConfirmButton().click({ force: true })
  securityProfilePage.getSuccessMessage().should('have.text', this.data6.successMessage)
  securityProfilePage.getDoneButton().click({ force: true })
})
//--------------------------------Administrator -- BusinessAdmin-----------------------------------------------
And('Fill the details-BusinessAdmin Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),  
  recurse(
  ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  //cy.writeFile(SubProfileName, { subscriber:cy.name})
  cy.readFile(SubProfileName).then((data) => {
    data.businesAadmin = name
    cy.writeFile(SubProfileName, data)
  })
  //cy.writeFile('cypress/fixtures/profileData/administratorProfile.json', { administrator: name })
})
And('Click on add profile select user type as BusinessAdmin and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectAdminUserTypeTab().click({ force: true })
  securityProfilePage.getSelectAdminUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(0).click({ force: true })
})
//--------------------------Administrator -- CustomercareAdmin----------------------------------------------
And('Fill the details-CustomercareAdmin Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.CustomercareAdmin = name
    cy.writeFile(SubProfileName, data)
  })
  //cy.writeFile('cypress/fixtures/profileData/customercareAdminProfile.json', { customercareAdmin: name })
})
And('Click on add profile select user type as CustomercareAdmin and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectAdminUserTypeTab().click({ force: true })
  securityProfilePage.getSelectSubUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(1).click({ force: true })
})
//--------------------------------Business -- ATMMachine-----------------------------------------------------
And('Fill the details-ATMMachine Profile Name', function () {
  
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.ATMMachine =name
    cy.writeFile(SubProfileName, data)
  })
  //cy.writeFile('cypress/fixtures/profileData/ATMMachineProfile.json', { ATMMachine: name })
})
And('Click on add profile select user type as ATMMachine and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(0).click({ force: true })
})
//-----------------------------Business -- HeadMerchant-----(Pin present)------------------------------------
And('Fill the details-HeadMerchant Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.HeadMerchant =name
    cy.writeFile(SubProfileName, data)
  })
})
And('Click on add profile select user type as HeadMerchant and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(3).click({ force: true })
})
//------------------------------Business -- PaymentGateway-----------------------------------------------------
And('Fill the details-PaymentGateway Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.PaymentGateway =name
    cy.writeFile(SubProfileName, data)
  })
})
And('Click on add profile select user type as PaymentGateway and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(6).click({ force: true })
})
//--------------------------------Business -- Biller-(PIN Present)----------------------------------------------
And('Fill the details-Biller Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.Biller = name
    cy.writeFile(SubProfileName, data)
  })
})
And('Click on add profile select user type as Biller and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(9).click({ force: true })
})
//-----------------------------------Business -- Employee-(Pin Present)----------------------------------------
And('Fill the details-Employee Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.Employee =name
    cy.writeFile(SubProfileName, data)
  })
})
And('Click on add profile select user type as Employee and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(1).click({ force: true })
})
//-----------------------------------Business -- Merchant-(Pin Present)-----------------------------------------
And('Fill the details-Merchant Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.Merchant =name
    cy.writeFile(SubProfileName, data)
  })
})
And('Click on add profile select user type as Merchant and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(4).click({ force: true })
})
//-----------------------------------Business -- Agent - (Pin Present)-----------------------------------------
And('Fill the details-Agent Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.Agent = name
    cy.writeFile(SubProfileName, data)
  })
})
And('Click on add profile select user type as Agent and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(7).click({ force: true })
})
//----------------------------------Business -- Distributer---(pin present)-------------------------------------
And('Fill the details-Distributer Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.Distributer = name
    cy.writeFile(SubProfileName, data)
  })
})
And('Click on add profile select user type as Distributer and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(10).click({ force: true })
})
//-----------------------------------Business -- Corporate -- (Pin present)-------------------------------------
And('Fill the details-Corporate Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.Corporate =name
    cy.writeFile(SubProfileName, data)
  })
})
And('Click on add profile select user type as Corporate and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(2).click({ force: true })
})
//------------------------------------Business -- TelcoOperator --(pin Present)--------------------------------
And('Fill the details-TelcoOperator Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.TelcoOperator = name
    cy.writeFile(SubProfileName, data)
  })
})
And('Click on add profile select user type as TelcoOperator and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(5).click({ force: true })
})
//-------------------------------Business -- SuperAgent --(pin present)---------------------------------------
And('Fill the details-SuperAgent Profile Name', function () {
  securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.SuperAgent = name
    cy.writeFile(SubProfileName, data)
  })
})
And('Click on add profile select user type as SuperAgent and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(8).click({ force: true })
})








//------------------------ Authorization Profile Management----------------------------------

//------------------------ Authorization Profile Management----------------------------------

//----------TC_149-----To verify that system admin should be able to add authorization profile------------------------------

When('Select Authorization profile and add profile', function () {

  authorizationProfilePage.getAuthorizationProfileManagement().scrollIntoView()
  authorizationProfilePage.getAuthorizationProfileManagement().click({ force: true })
  authorizationProfilePage.getAddProfile().click({ force: true })
})

And('select Subscriber user type and select user role', function () {
  // cy.wait(3000)
  authorizationProfilePage.getAuthorizationUserType().click({ force: true })
  authorizationProfilePage.getAuthorizationUserType().focused()
  authorizationProfilePage.getAuthorizationUserRole().click({ force: true })

})
//-----------------------SubscriberM1S1----------------------

Then('Fill all Details and Create Subscriber authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    () => authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
   
  )
  cy.readFile(SubProfileName).then((data) => {
    data.SubscriberProfileName = profName
    cy.writeFile(SubProfileName, data)
  })
  cy.selectModule()
  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  cy.wait(5000)
  authorizationProfilePage.getConfirm().click({ force: true })
 // authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})



//----------------------Approvals------------------------
Then('User approval for Authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getApprovals().scrollIntoView()
  authorizationProfilePage.getApprovals().click({ force: true })
  authorizationProfilePage.getApproveButton().click({ force: true })
  authorizationProfilePage.getApproveButtonSubmit().click({ force: true })
  //authorizationProfilePage.getApproveConfirmationMessage().should('contain.text'.this.data5.addconfirmationMessage)
})

//----------------------Administrator--------BusinessAdmin-----------------------------------
And('select BusinessAdmin user type and select user role', function () {
  //cy.wait(3000)
  authorizationProfilePage.getAdministratorType().click({ force: true })
  authorizationProfilePage.getAdministratorType().focused()
  authorizationProfilePage.getAdministratorBusinessAdmin().eq(0).click({ force: true })
})

Then('Fill all Details and Create BusinessAdmin authorization profile', function () {

  authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    () => authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })

  )
  cy.readFile(SubProfileName).then((data) => {
    data.businesAadmin = profName
    cy.writeFile(SubProfileName, data)
  })
  // cy.wait(3000)

  cy.selectModule()

  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
 // authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})
//----------------------Administrator--------CustomercareAdmin-----------------------------------
And('select CustomercareAdmin user type and select user role', function () {
  //cy.wait(3000)
  authorizationProfilePage.getAdministratorType().click({ force: true })
  authorizationProfilePage.getAdministratorType().focused()
  authorizationProfilePage.getAdministratorBusinessAdmin().eq(1).click({ force: true })
})

Then('Fill all Details and Create CustomercareAdmin authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    () => authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })

  )
  cy.readFile(SubProfileName).then((data) => {
    data.CustomercareAdmin = profName
    cy.writeFile(SubProfileName, data)
  })

  cy.selectModule()
  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
 // authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})
//----------------------Business-------------Distributor---------------------------------------------------

And('select Distributor user type and select user role', function () {
  // cy.wait(3000)
  authorizationProfilePage.getBusinessType().click({ force: true })
  authorizationProfilePage.getBusinessType().focused()
  authorizationProfilePage.getBusinessATMRole().eq(10).click({ force: true })

})

Then('Fill all Details and Create Distributor authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({ force: true }).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    () => authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })

  )

  cy.readFile(SubProfileName).then((data) => {
    data.BusinesselcoOperator = profName
    cy.writeFile(SubProfileName, data)
  })

  cy.selectModule()
  cy.wait(3000)
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
 // authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})

//----------TC_150-----To verify that system admin should be able to ViewAuthorization profile for the selected category------------------------------
When('Select Authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getAuthorizationProfileManagement().click({ force: true })
})

Then('View Profiles', function () {
  cy.wait(3000)
  // authorizationProfilePage.getViewProfile().any().click({ force: true });
  authorizationProfilePage.getViewProfile().click({ force: true })
  authorizationProfilePage.getViewProfileSuccess().should('have.text', this.data5.viewprofile)

})


//----------TC_151----To verify that system admin should be able to modify an already created authorization profile-------------------------------

Then('Click on Modify Icon in front of authorization profile to modify', function () {
  cy.wait(3000)
  authorizationProfilePage.getEditProfile().click({ force: true })
  authorizationProfilePage.getModifyProfile().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  //authorizationProfilePage.getViewProfileModifySuccess().should('have.text', this.data5.modifysuccessmessage)
  authorizationProfilePage.getViewProfileModifyDone().click({ force: true })
})

//----------------------Approvals------------------------
Then('User approval for modified Authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getApprovals().scrollIntoView()
  authorizationProfilePage.getApprovals().click({ force: true })
  authorizationProfilePage.getApproveButton().click({ force: true })
  authorizationProfilePage.getApproveButtonSubmit().click({ force: true })
  // authorizationProfilePage.getApproveConfirmationMessage().should('contain.text', this.data5.modifyconfirmationMessage)
})


//----------TC_152-------To verify that System admin should be able to delete an authorization profile----------------------------

Then('Click on Modify Icon in front of authorization profile to delete', function () {
  cy.wait(3000)
  authorizationProfilePage.getDeleteProfile().click({ force: true })
  authorizationProfilePage.getYesDeleteProfile().click({ force: true })
  //authorizationProfilePage.getApproveConfirmationMessage().should('contain.text', this.data5.deletemessagesuccess)
})

//------------------------------  REGULATORY PROFILE--------------------------------------------
When('Navigate to UserManagement And Click on Regulatory Profile', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getregulatoryprofile().click()
  cy.wait(3000)
})

And('click on Add Regulatory Profile and Enter Profile Code and Profile Name', function () {
  cy.iframe().find('[id="profileCode"]').type(id)
  recurse(
    () => cy.iframe().find('[id="profileCode"]').clear().type(id),
    () => cy.iframe().find('.MuiButton-label').contains("Search").click({force: true}),
    (uniqueness) => (uniqueness) == cy.iframe().find('table > tbody').should('have.length', "1")
  )
  cy.log(id)
  RegulatoryProfile1.getaddregulatoryprofile().click(),
  RegulatoryProfile1.getregulatoryprofilecode().type(id,{force:true}),
  cy.RPRandomName(),
  RegulatoryProfile1.getregulatorysavebtn().click()
  cy.readFile(RegulatoryFile).then((data) => {
    data.RegulatoryProfileCode = id
    cy.writeFile(RegulatoryFile, data)

  })
})

Then('Click On Save Regulatory Profile', function () {
    RegulatoryProfile1.getrpsuccess().contains(this.data2.Sucess)
  cy.wait(3000)

})

//------------------------------  MARKETING PROFILE--------------------------------------------

When('Navigate to UserManagement And Click on Marketing Profile', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getmarketingprofile().click()
  cy.wait(3000)
})

And('Add Marketing Profile', function () {
  cy.iframe().find('[id="profileCode"]').type(id)
  recurse(
    () => cy.iframe().find('[id="profileCode"]').clear().type(id),
    () => cy.iframe().find('.MuiButton-label').contains("Search").click({force: true}),
    (uniqueness) => (uniqueness) == cy.iframe().find('table > tbody').should('have.length', "1")
  )
  MarketingProfile1.getAddMarketingProfile().click()
  MarketingProfile1.getMarketingProfileCode().type(id, { force: true })
  cy.MPRandomName1()
  MarketingProfile1.getMarketingProfileDomainName().click()
  MarketingProfile1.getMarketingProfileDomainName1().click()
  MarketingProfile1.getMarketingProfileCategoryName().click()
  MarketingProfile1.getMarketingProfileCategoryName1().click()
  MarketingProfile1.getMarketingProfileMFSProvider().click()
  MarketingProfile1.getMarketingProfileMFSProvider1().click()
  MarketingProfile1.getMarketingProfileWalletType().click()
  MarketingProfile1.getMarketingProfileWalletType1().click()
  MarketingProfile1.getMarketingProfileGrade().click()
  MarketingProfile1.getMarketingProfileGrade1().click()
  cy.fixture(ITCP1).then((user)=>{
    var SITCP=user.TcpProfileNameSub
    cy.log(SITCP)
    MarketingProfile1.getMarketingProfileInstrumentTCP().click()
    MarketingProfile1.getMarketingProfileInstrumentTCP1().contains(SITCP).click()
  })
  MarketingProfile1.getMarketingProfileAddBtn().click()
  cy.wait(3000)
  cy.readFile(RegulatoryFile).then((data) => {
    data.MarketingProfileCodeDistributer = id
    cy.writeFile(RegulatoryFile, data)
  })
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Marketing)
})


And('Add Marketing Profile Wholesaler', function () {
  cy.iframe().find('[id="profileCode"]').type(LoginId1)
  recurse(
    () => cy.iframe().find('[id="profileCode"]').clear().type(LoginId1),
    () => cy.iframe().find('.MuiButton-label').contains("Search").click({force: true}),
    (uniqueness) => (uniqueness) == cy.iframe().find('table > tbody').should('have.length', "1")
  )
  MarketingProfile1.getAddMarketingProfile().click()
  MarketingProfile1.getMarketingProfileCode().type(LoginId1, { force: true })
  cy.MPRandomName()
  MarketingProfile1.getMarketingProfileDomainName().click()
  MarketingProfile1.getMarketingProfileDomainWholesaler().click()
  MarketingProfile1.getMarketingProfileCategoryName().click()
  MarketingProfile1.getMarketingProfileCategoryWholesaler().click()
  MarketingProfile1.getMarketingProfileMFSProvider().click()
  MarketingProfile1.getMarketingProfileMFSProvider1().click()
  MarketingProfile1.getMarketingProfileWalletType().click()
  MarketingProfile1.getMarketingProfileWalletType1().click()
  MarketingProfile1.getMarketingProfileGrade().click()
  MarketingProfile1.getMarketingProfileGradeWholesaler().click()
  cy.fixture(ITCP).then((user)=>{
    var WITCP=user.TcpProfileName
    cy.log(WITCP)
    MarketingProfile1.getMarketingProfileInstrumentTCP().click()
    MarketingProfile1.getMarketingProfileInstrumentTCP1().contains(WITCP).click()
  })
  MarketingProfile1.getMarketingProfileAddBtn1().click()
  cy.wait(3000)
  cy.readFile(RegulatoryFile).then((data) => {
    data.MarketingProfileCode = LoginId1
    cy.writeFile(RegulatoryFile, data)
  })
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Marketing)
})

