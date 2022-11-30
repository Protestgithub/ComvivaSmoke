/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';
import "../../../../../support/commands";
import "../../../../../support/securityCommands";
import 'cypress-file-upload'
import SecurityProfilePage from '../../../../../support/pageObjects/SecurityProfile/SecurityProfilePage';



//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()
const securityProfilePage = new SecurityProfilePage()
var SecurityProfilePath = 'cypress/fixtures/profileData/SecurityProfileName.json'
var name

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
  cy.fixture('SecurityProfile').then(function (data6) {
    this.data6 = data6;
  })
  
}); 

//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.fixture('userData/SystemAdminLogin.json').then((data)=>{
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
//------------TC_109-----------------Security Profile Creation-----------------------------------------------
//----------------------------------------Subscriber---------------------------------------------------------

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
  securityProfilePage.getUserRole().contains(' Subscriber ').click({ force: true })
})
And('Fill the details-Subscriber Profile Name', function () {
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().eq(1).click({ force: true }), 
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().eq(1).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
      data.subscriber = name
      cy.writeFile(SecurityProfilePath, data)
    })  
})
And('Fill the details-PasswordRestrictios', function () {
  securityProfilePage.getMinPasswordLength().type(this.data6.minPasswordLength)
  securityProfilePage.getMaxPasswordLength().type(this.data6.maxPasswordLength)
  securityProfilePage.getCheckBox().eq(0).click({ force: true })
  securityProfilePage.getCheckBox().eq(2).click({ force: true })
  securityProfilePage.getCheckBox().eq(1).click({ force: true })
  securityProfilePage.getCheckBox().contains(this.data6.checkBox4).click({ force: true })
  securityProfilePage.getFailedPwdLoginCAPTCHA().type(this.data6.failedLoginCAPTCHA)
  securityProfilePage.getFailedPasswordAttempts().click({ force: true }).type(this.data6.failedPwdAttempts)
  securityProfilePage.getAllowedSplChar().type(this.data6.specialCharacters)
  securityProfilePage.getPasswordExpiry().type(this.data6.passwordExpiryDays)
  securityProfilePage.getLastNonRepeatingPWD().type(this.data6.lastNonRepeatingPassword) 
})
And('Fill the details-PinRestrictions', function () {
  securityProfilePage.getPIN().click({ force: true })
  securityProfilePage.getPinLength().type(this.data6.pinLength)
  securityProfilePage.getSequentialNumberCheckBox().click({ force: true })
  securityProfilePage.getPinBlock().type(this.data6.failedAttemptsToBlock)
  securityProfilePage.getFailedPinLoginCAPTCHA().type(this.data6.failedPin)
  securityProfilePage.getRepeatingNumberCheckBox().click({ force: true })
  securityProfilePage.getPinExpiry().type(this.data6.pinExpiry)
  securityProfilePage.getNonRepeatingLastPins().type(this.data6.lastNonRepeatingPin)
})
And('Fill the details-AuthRestrictions', function () {
  securityProfilePage.getTwoFactorAuth().click({ force: true })
  securityProfilePage.getGeoLocation().click({ force: true })
})
And('Fill the details-loginRestrictions', function () {
  securityProfilePage.getLoginRestrictions().click({ force: true })
  securityProfilePage.getMultipleLoginsAllowedCount().type(this.data6.multipleLoginsAllowedCount)
  securityProfilePage.getSelectAllorClearLink().click({ force: true })    
  securityProfilePage.getCoolOffPeriod().type(this.data6.getCoolOffPeriod)
  securityProfilePage.getAutoLogoutTime().type(this.data6.autoLogoutTime)
  securityProfilePage.getAuthSystem().select(this.data6.authSystem)
  securityProfilePage.getNotifyOnDeviceChangeCheckBox().click({ force: true })
})
  Then('Click on add and confirm',function () {
  securityProfilePage.getAddButton().click({ force: true })
  securityProfilePage.getConfirmButton().click({ force: true })
  securityProfilePage.getSuccessMessage().contains(this.data6.successMessage)
  securityProfilePage.getDoneButton().click({ force: true })
})
//--------------------------------Administrator -- BusinessAdmin-----------------------------------------------
And('Fill the details-BusinessAdmin Profile Name', function () {
  recurse(
  ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().eq(0).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.businesAadmin = name
    cy.writeFile(SecurityProfilePath, data)
  })
  
})
And('Click on add profile select user type as BusinessAdmin and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectAdminUserTypeTab().click({ force: true })
  securityProfilePage.getSelectAdminUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Business Admin ').click({ force: true })
})
//--------------------------Administrator -- CustomercareAdmin----------------------------------------------
And('Fill the details-CustomercareAdmin Profile Name', function () {
  
  recurse(
    ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().eq(0).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.CustomercareAdmin = name
    cy.writeFile(SecurityProfilePath, data)
  })
  
})
And('Click on add profile select user type as CustomercareAdmin and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectAdminUserTypeTab().click({ force: true })
  securityProfilePage.getSelectSubUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(1).click({ force: true })
})


//----------------------------------Business -- Distributer---(pin present)-------------------------------------
And('Fill the details-Distributer Profile Name', function () {
  recurse(
    ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().eq(0).click({ force: true }), 
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().eq(0).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.Distributer = name
    cy.writeFile(SecurityProfilePath, data)
  })
})
And('Click on add profile select user type as Distributer and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(10).click({ force: true })
})
