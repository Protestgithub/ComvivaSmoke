/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And,Before} from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';
import "../../../../../support/commands";
import "../../../../../support/securityCommands";
//import 'cypress-file-upload';
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
//------------TC_109-----------------Security Profile Creation-----------------------------------------------
//----------------------------------------Subscriber---------------------------------------------------------

And('Click on add profile select user type as subscriber and fill the details', function () {

  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectSubUserTypeTab().click({ force: true })
  securityProfilePage.getSelectSubUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Subscriber ').click({ force: true })
})
And('Fill the details-Subscriber Profile Name', function () {
  
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
      data.subscriber = name
      cy.writeFile(SecurityProfilePath, data)
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
  //securityProfilePage.getCheckBox().contains(this.data6.resetForgetPassword).click({ force: true })

})
And('Fill the details-PinRestrictions', function () {
  securityProfilePage.getPIN().click({ force: true })
  securityProfilePage.getPinLength().type(this.data6.pinLength)
  securityProfilePage.getSequentialNumberCheckBox().click({ force: true })
  cy.wait(2000)
  securityProfilePage.getPinBlock().type(this.data6.failedAttemptsToBlock)
  securityProfilePage.getFailedPinLoginCAPTCHA().type(this.data6.failedPin)
  securityProfilePage.getRepeatingNumberCheckBox().click({ force: true })
  securityProfilePage.getPinExpiry().type(this.data6.pinExpiry)
  securityProfilePage.getNonRepeatingLastPins().type(this.data6.lastNonRepeatingPin)
  //securityProfilePage.getSelectAllorClearLink().click({ force: true })
})
And('Fill the details-AuthRestrictions', function () {
  securityProfilePage.getTwoFactorAuth().click({ force: true })
  securityProfilePage.getGeoLocation().click({ force: true })
})
And('Fill the details-loginRestrictions', function () {
  securityProfilePage.getLoginRestrictions().click({ force: true })
  securityProfilePage.getMultipleLoginsAllowedCount().type(this.data6.multipleLoginsAllowedCount)
  securityProfilePage.getSelectAllorClearLink().click({ force: true })
  //securityProfilePage.getIpGroupRadioButton().click({ force: true })
  cy.wait(2000)
  //securityProfilePage.getIpAddress().type(this.data6.getIpAddress)
  //securityProfilePage.getIpRangeTo().type(this.data6.getIpRangeTo)
  securityProfilePage.getCoolOffPeriod().type(this.data6.getCoolOffPeriod)
  securityProfilePage.getAutoLogoutTime().type(this.data6.autoLogoutTime)
  securityProfilePage.getAuthSystem().select(this.data6.authSystem)
  securityProfilePage.getNotifyOnDeviceChangeCheckBox().click({ force: true })
  //securityProfilePage.getMinSecurityQuestionToResetCredentials().type(this.data6.minQuestions)
  //securityProfilePage.getMaxSecurityQuestionToResetCredentials().type(this.data6.maxQuestions)
})
  
//--------------------------------Administrator -- BusinessAdmin-----------------------------------------------
And('Fill the details-BusinessAdmin Profile Name', function () {
 
  recurse(
  ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  //cy.writeFile(SecurityProfilePath, { subscriber:cy.name})
  cy.readFile(SecurityProfilePath).then((data) => {
    data.businesAadmin = name
    cy.writeFile(SecurityProfilePath, data)
  })
  //cy.writeFile('cypress/fixtures/profileData/administratorProfile.json', { administrator: name })
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
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.CustomercareAdmin = name
    cy.writeFile(SecurityProfilePath, data)
  })
  //cy.writeFile('cypress/fixtures/profileData/customercareAdminProfile.json', { customercareAdmin: name })
})
And('Click on add profile select user type as CustomercareAdmin and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectAdminUserTypeTab().click({ force: true })
  securityProfilePage.getSelectSubUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Customer care Admin ').click({ force: true })
})
//--------------------------------Business -- ATMMachine-----------------------------------------------------
And('Fill the details-ATMMachine Profile Name', function () {
  
  recurse(
    ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.ATMMachine =name
    cy.writeFile(SecurityProfilePath, data)
  })
  //cy.writeFile('cypress/fixtures/profileData/ATMMachineProfile.json', { ATMMachine: name })
})
And('Click on add profile select user type as ATMMachine and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' AtmMachine ').click({ force: true })
})
//-----------------------------Business -- HeadMerchant-----(Pin present)------------------------------------
And('Fill the details-HeadMerchant Profile Name', function () {
  
  recurse(
    ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.HeadMerchant =name
    cy.writeFile(SecurityProfilePath, data)
  })
})
And('Click on add profile select user type as HeadMerchant and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Head Merchant ').click({ force: true })
})
//------------------------------Business -- PaymentGateway-----------------------------------------------------
And('Fill the details-PaymentGateway Profile Name', function () {
  
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.PaymentGateway =name
    cy.writeFile(SecurityProfilePath, data)
  })
})
And('Click on add profile select user type as PaymentGateway and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Payment Gateway ').click({ force: true })
})
//--------------------------------Business -- Biller-(PIN Present)----------------------------------------------
And('Fill the details-Biller Profile Name', function () {
 
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.Biller = name
    cy.writeFile(SecurityProfilePath, data)
  })
})
And('Click on add profile select user type as Biller and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Biller ').click({ force: true })
})
//-----------------------------------Business -- Employee-(Pin Present)----------------------------------------
And('Fill the details-Employee Profile Name', function () {
  
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.Employee =name
    cy.writeFile(SecurityProfilePath, data)
  })
})
And('Click on add profile select user type as Employee and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Employee ').click({ force: true })
})
//-----------------------------------Business -- Merchant-(Pin Present)-----------------------------------------
And('Fill the details-Merchant Profile Name', function () {
 
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.Merchant =name
    cy.writeFile(SecurityProfilePath, data)
  })
})
And('Click on add profile select user type as Merchant and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Merchant ').click({ force: true })
})
//-----------------------------------Business -- Agent - (Pin Present)-----------------------------------------
And('Fill the details-Agent Profile Name', function () {
 
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.Agent = name
    cy.writeFile(SecurityProfilePath, data)
  })
})
And('Click on add profile select user type as Agent and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Agent ').click({ force: true })
})
//----------------------------------Business -- Distributer---(pin present)-------------------------------------
And('Fill the details-Distributer Profile Name', function () {
 
  recurse(
    ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
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
  securityProfilePage.getUserRole().contains(' Distributer ').click({ force: true })
})
//-----------------------------------Business -- Corporate -- (Pin present)-------------------------------------
And('Fill the details-Corporate Profile Name', function () {
  
  recurse(
    ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.Corporate =name
    cy.writeFile(SecurityProfilePath, data)
  })
})
And('Click on add profile select user type as Corporate and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Corporate ').click({ force: true })
})
//------------------------------------Business -- TelcoOperator --(pin Present)--------------------------------
And('Fill the details-TelcoOperator Profile Name', function () {
  
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.TelcoOperator = name
    cy.writeFile(SecurityProfilePath, data)
  })
})
And('Click on add profile select user type as TelcoOperator and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Telco Operator ').click({ force: true })
})
//-------------------------------Business -- SuperAgent --(pin present)---------------------------------------
And('Fill the details-SuperAgent Profile Name', function () {
 
  recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SecurityProfilePath).then((data) => {
    data.SuperAgent = name
    cy.writeFile(SecurityProfilePath, data)
  })
})
And('Click on add profile select user type as SuperAgent and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().contains(' Super Agent ').click({ force: true })
})