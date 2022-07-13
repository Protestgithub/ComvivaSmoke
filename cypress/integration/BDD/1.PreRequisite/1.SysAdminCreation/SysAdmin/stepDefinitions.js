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
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const securityProfilePage = new SecurityProfilePage()
const uid1 = () => Cypress._.random(1e2)
const Id = uid1()
var mobile
const uid = () => Cypress._.random(0, 1e6)
const id = uid()
const uuid = () => Cypress._.random(1e10)
const uud = () => Cypress._.random(1e3)
let Sysfilelogin = 'cypress/fixtures/userData/SystemAdminLogin.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
var mobile
var name,SecurityProfile
var LoginId1
const uuid12 = () => Cypress._.random(1e8)
var LoginId1= uuid12()
const Password='000000'
const Password1 = 'Com@13579'
var loginId
function getRandomName() {
name = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var i=0; i<5; i++)
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
//-------------------------------------------------------------------------------------------------

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
Given('Login into Mobiquity Portal as System admin User after Logout', function () {
  cy.loginAgain(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
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
And('Click on add profile select user type as subscriber and fill the details', function () {

  securityProfilePage.getAddProfile().click()
  //securityProfilePage.getSelectSubUserTypeTab().click({ force: true })
 // securityProfilePage.getSelectSubUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(0).click({ force: true })
})
And('Fill the details-Subscriber Profile Name', function () {
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
  recurse(
    ()=>securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
    ()=>cy.wait(200),   
    (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
    ('Profile with same name already exists. Try another!').should('be.visible'),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
  )
  cy.readFile(SubProfileName).then((data) => {
    data.SystemAdminSecuirtyProfile = name
    cy.writeFile(SubProfileName, data)
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
  //securityProfilePage.getMultipleLoginsAllowedCount().type(this.data6.multipleLoginsAllowedCount)
  securityProfilePage.getSelectAllorClearLink().click({ force: true })
 // securityProfilePage.getIpGroupRadioButton().click({ force: true })
  cy.wait(2000)
//  securityProfilePage.getIpAddress().type(this.data6.getIpAddress)
  //securityProfilePage.getIpRangeTo().type(this.data6.getIpRangeTo)
  //securityProfilePage.getCoolOffPeriod().type(this.data6.getCoolOffPeriod)
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





//---------------------------------SystemAdmin Creation-------------------------------------------------
Given('Login into Mobiquity Portal as System admin Created by Master', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.log(loginId)
  cy.login(loginId,Password)
  cy.log(loginId)
  cy.login1(Password1)
  cy.wait(2000)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword = Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber = mobile
    cy.writeFile(Sysfilelogin, data)
    }) })

Given('Login into Mobiquity Portal as System admin Created by Master2', function () {
  cy.log(loginId)
  cy.loginAgain(loginId,Password)
  cy.log(loginId)
  cy.login1Again(Password1)
  cy.wait(2000)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId2 = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword2 = Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber2 = mobile
    cy.writeFile(Sysfilelogin, data)
})})

Given('Login into Mobiquity Portal as System admin Created by Master3', function () {
  cy.log(loginId)
  cy.loginAgain(loginId,Password)
  cy.log(loginId)
  cy.login1Again(Password1)
  cy.wait(2000)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)  
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId3 = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword3 = Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber3 = mobile
    cy.writeFile(Sysfilelogin, data)
}) })

Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})

And('Click on delete',function(){

  manageUsersPage.getdelete().click({force:true})
  manageUsersPage.getcomment().type(this.data2.comment)
  manageUsersPage.getreasonforclosure().select(this.data2.Reason)
  manageUsersPage.getintiatedelete().click({force:true})
})


When('Navigate to User Management and click on Register',function(){

  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()

})

And('Click On System Admin and select Single User',function(){
  registerPage.getUserRole().contains(this.data2.userRole4).click({force:true})
  registerPage.getRegistrationMode().eq(0).click({force: true})

})

And('Enter all required Fields',function(){
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  loginId = "SYS" + mobile
registerPage.getLastName().type(getRandomName(), {force: true})
cy.getrandomUserEmailID1()
registerPage.getLoginID().clear()
registerPage.getLoginID().type(loginId)
recurse(
  () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
  () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
  (uniqueness) => (uniqueness) == registerPage.getuniqueness()
)
cy.writeFile('userData/SystemAdminLogin.json',{MobileNumber:mobile})
cy.iframe().find('select[data-test-id="preferredLanguage"]')
.select(this.data2.personalInfo.preferredLang,{force: true})
registerPage.getCountry().select(this.data2.personalInfo.country,{force: true})
registerPage.getNextButtonBasic().click({force: true})

//----------------------Profile Data-----------------------------------------------------------------

cy.readFile(SubProfileName).then((user) => {
        SecurityProfile= user.SystemAdminSecuirtyProfile
        registerPage.getSecurityProfile().select(SecurityProfile, {force: true})
    })

registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile2, {force: true})
registerPage.getNextButtonProfile().click({force: true})
registerPage.getSubmitButton().click({force: true})

})
Then('Confirmation message is displayed', function() {

  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
  })
//------------------------------------Approve----------------------------------------------------------
When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getApprovalTab().click()
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
And('Approve the Users and save loginID', function () {
  approvalPage.getApproveButton().click({ force: true })
    cy.wait(3000)
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(3000)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.DefaultPassword = Password
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber = mobile
    cy.writeFile(Sysfilelogin, data)
    })  
    cy.log(loginId)
})
And('Approve the Users and save loginID2', function () {
  approvalPage.getApproveButton().click({ force: true })
    cy.wait(3000)
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(3000)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId2 = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword2 = Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber2 = mobile
    cy.writeFile(Sysfilelogin, data)
}) 
  cy.log(loginId)
})
And('Approve the Users and save loginID3', function () {
  approvalPage.getApproveButton().click({ force: true })
    cy.wait(3000)
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(3000)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId3 = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword3 = Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber3 = mobile
    cy.writeFile(Sysfilelogin, data)
})
cy.log(loginId)
})
Then('User status is approved', function() {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})


