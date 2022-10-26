
/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//-----------------------------------------Imports----------------------------------------------------

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/utils/Generic";
import { recurse } from 'cypress-recurse';
import "../../../../../support/utils/securityCommands";
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
  cy.writeFile(SecurityProfilePath,{subscriber:""})
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


