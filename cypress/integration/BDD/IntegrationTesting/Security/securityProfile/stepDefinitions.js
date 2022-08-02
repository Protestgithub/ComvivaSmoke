/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';

import "../../../../../support/securityCommands";
import "../../../../../support/commands";
import SecurityProfilePage from '../../../../../support/pageObjects/SecurityProfile/SecurityProfilePage';
import register from '../../../../../support/pageObjects/UserManagement/register';
import { recurse } from 'cypress-recurse';

//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const securityProfilePage = new SecurityProfilePage()
const registerPage = new register()

var SubProfileName = 'cypress/fixtures/profileData/securityProfile.json'
var profName

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


  function getRandomName() {
      profName = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (var i = 0; i < 5; i++)
          profName += possible.charAt(Math.floor(Math.random() * possible.length));
      return profName;
  }    


//----------------------------------------POC - CODE-------------------------------------------------------
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
  cy.loginAgain(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
  cy.loginAgain(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)

})
Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})
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
    data.subscriber = profName
  cy.writeFile(SubProfileName, {subscriber:data})
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
  securityProfilePage.getEverytime().click({ force: true })
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
    data.businesAadmin = profName
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
    data.CustomercareAdmin = profName
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
    data.ATMMachine =profName
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
    data.HeadMerchant =profName
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
    data.PaymentGateway =profName
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
    data.Biller = profName
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
    data.Employee =profName
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
    data.Merchant =profName
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
    data.Agent = profName
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
    data.Distributer = profName
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
    data.Corporate =profName
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
    data.TelcoOperator = profName
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
    data.SuperAgent = profName
    cy.writeFile(SubProfileName, data)
  })
})
And('Click on add profile select user type as SuperAgent and fill the details', function () {
  securityProfilePage.getAddProfile().click()
  securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
  securityProfilePage.getSelectBusinessUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(8).click({ force: true })
})


//------------TC_110--------------------default security profile------------------------------------------------

And('Filter by slecting Default', function () {
  pageLogin.getiFrame()
  securityProfilePage.getFilter().click({ force: true })
  cy.wait(2000)
  securityProfilePage.getDefaultCheckBox().click()
  cy.wait(3000)
  securityProfilePage.getApplyFilter().scrollIntoView()

  securityProfilePage.getApplyFilter().click()
  cy.wait(3000)
  securityProfilePage.getShowDropDown().click({ force: true })
  securityProfilePage.getSelectFromDropDown().click({ force: true })

})

Then('Assert each workspace have one default Profile', function () {
  if (securityProfilePage.getCategory().contains(' System Admin ')) {
    securityProfilePage.getCreatedBy().eq(0).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Business Admin ')) {
    securityProfilePage.getCreatedBy().eq(1).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Customer care Admin ')) {
    securityProfilePage.getCreatedBy().eq(2).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' AtmMachine ')) {
    securityProfilePage.getCreatedBy().eq(3).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Merchant ')) {
    securityProfilePage.getCreatedBy().eq(4).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Agent ')) {
    securityProfilePage.getCreatedBy().eq(5).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Distributer ')) {
    securityProfilePage.getCreatedBy().eq(6).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Head Merchant ')) {
    securityProfilePage.getCreatedBy().eq(7).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Super Agent ')) {
    securityProfilePage.getCreatedBy().eq(8).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Biller ')) {
    securityProfilePage.getCreatedBy().eq(9).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Telco Operator ')) {
    securityProfilePage.getCreatedBy().eq(10).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Payment Gateway ')) {
    securityProfilePage.getCreatedBy().eq(11).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Corporate ')) {
    securityProfilePage.getCreatedBy().eq(12).should('have.text', ' system ')
  }
  if (securityProfilePage.getCategory().contains(' Subscriber ')) {
    securityProfilePage.getCreatedBy().eq(13).should('have.text', ' system ')
  }
})

//-------------TC_111-------------------SecurityProfileExist----------------------------------------------------
When('Navigate to User Management and Click on register', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})

And('Select User type as Subscriber and click on Subscriber', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType, { force: true }).click({ force: true })
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).focused()
  registerPage.getUserRole().contains(this.data2.subPersonalInfo.subUserRole).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })

  registerPage.getNextButtonBasic().click({ force: true })
  registerPage.getNextButtonBasic1().click({ force: true })
})

Then('Verify User registration have security profile', function () {
  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true }).should("contain.text","subscriberSecurityProfile")
})

