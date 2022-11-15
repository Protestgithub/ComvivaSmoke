/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';
import "../../../../support/utils/Generic"
import "../../../../support/utils/securityCommands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import SecurityProfilePage from '../../../../support/pageObjects/SecurityProfile/SecurityProfilePage';


//----------------Object Declaration----------------------------------------------------------
const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const securityProfilePage = new SecurityProfilePage()
var mobile
let Sysfilelogin = 'cypress/fixtures/userData/SystemAdminLogin.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
var name, SecurityProfile
var loginId
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()

//----------------BDD Hooks------------------------
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
  cy.fixture('userData/SystemAdminLogin').then(function (data3) {
    this.data3 = data3;
  })
  cy.fixture('userData/BusinessUsersData').then(function (data33) {
    this.data33 = data33;
  })
  cy.fixture('StockManagement').then(function (data17) {
    this.data17 = data17;
  })
  cy.fixture('authorizationProfile').then(function (data7) {
    this.data7 = data7;
  })

  cy.fixture('BankManagement').then(function (data03) {
    this.data03 = data03;
  })
  cy.fixture('Domain&CategoryManagement').then(function (data4) {
    this.data4 = data4;
  })

  cy.fixture('TransferControlProfile').then(function (data5) {
    this.data5 = data5;
  })
  cy.fixture('bulkdata').then(function (data009) {
    this.data009 = data009;
  })

  cy.fixture('userData/BusinessUsersData').then(function (data006) {
    this.data006 = data006;
  })

  cy.fixture('userData/O2CBulkData').then(function (data007) {
    this.data007 = data007;
  })

  cy.fixture('ChanneltoChannel').then(function(data20){
    this.data20 =data20;
  })


  cy.fixture('userData/churnSubscriberReg').then(function (data008) {
    this.data008 = data008;
})
cy.fixture('ChurnManagement').then(function (data003) {

  this.data003 = data003;

})
cy.fixture('PricingEngine').then(function (data05) {
  this.data05 = data05;
})
cy.fixture('OperatorToChannel').then(function (data15) {
  this.data15 = data15;
})
cy.fixture('TransactionCorrection').then(function (data21) {
  this.data21 = data21;
})
cy.fixture('TransferRules').then(function (data13) {
  this.data13 = data13;
}) 
});



//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  //cy.intercept('/mobiquitypay/v1/container/menus').as('all')
  cy.wait(2000)
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
})
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker2', function () {
  cy.wait(2000)
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(4000)
  cy.SysAdminlogin3()
  cy.wait(3000)
})

Then('Logout', function () {
  welcomePage.getUserMenu().click()
  //cy.intercept('/mobiquitypay/v1/ums/user/logout').as('all')
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
  //cy.checkAPI('/mobiquitypay/v1/ums/user/logout')
})
//-------------------------------------------------------------------------------------------------

//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(5000)
 // cy.intercept('/mobiquitypay/v1/container/menus').as('all')
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  //cy.checkAPI('/mobiquitypay/v1/container/menus')
  cy.wait(4000)
  //cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
})
//superadminc
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(5000)
 // cy.intercept('/mobiquitypay/v1/container/menus').as('all')
  cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
 // cy.checkAPI('/mobiquitypay/v1/container/menus')
  cy.wait(4000)
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
  //cy.intercept('/mobiquitypay/ums/v1/user/auth/web/system-token').as('all')
  cy.loginAgain(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  //cy.checkAPI('/mobiquitypay/ums/v1/user/auth/web/system-token')
  cy.wait(2000)
  //cy.checkWelcomeText(this.data2.superadminc.superadminchecker)
})

//----------------------------Security Profile Creation for system Admin-------------------------------
//-------------------------------------Security Profile------------------------------------------------
//----------------------------------------Subscriber----------------------------------------------------

When('Navigate to Security and click to select security profile', function () {

  welcomePage.getSecurityLink().scrollIntoView()
  welcomePage.getSecurityLink().click({ force: true })
  //cy.intercept('/mobiquitypay/v1/security-profiles?profileType=&categoryCodes=').as('all')

  welcomePage.getSecurityProfileLink().click({ force: true })
  //cy.checkAPI('/mobiquitypay/v1/security-profiles?profileType=&categoryCodes=')

  securityProfilePage.getSecurityProfilePageTitle().should('have.text', this.data6.securityProfilePageTitle)
})
And('Click on add profile select user type systemadmin and fill the details', function () {

  securityProfilePage.getAddProfile().click({ force: true })
  //securityProfilePage.getSelectSubUserTypeTab().click({ force: true })
  // securityProfilePage.getSelectSubUserTypeTab().focused()
  securityProfilePage.getUserRole().eq(0).click({ force: true })
})
And('Fill the details-SystemAdmin Profile Name', function () {
  securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      () => securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
      () => securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
      () => cy.wait(200),
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
        ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })
    )
  cy.readFile(SubProfileName).then((data) => {
    data.SystemAdminSecuirtyProfile = name
    cy.writeFile(SubProfileName, data)
  })

})
And('Fill the details-PasswordRestrictios for systemadmin', function () {
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

And('Fill the details-loginRestrictions for system admin', function () {
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
Then('Click on add and confirm', function () {
  securityProfilePage.getAddButton().click({ force: true })
  cy.wait(5000)
  //cy.intercept('/mobiquitypay/v1/security-profile').as('all')
  securityProfilePage.getConfirmButton().click({ force: true })
  securityProfilePage.getSuccessMessage().contains(this.data6.successMessage)
  securityProfilePage.getDoneButton().click({ force: true })
  //cy.checkAPI('/mobiquitypay/v1/security-profile')
})





//---------------------------------SystemAdmin Creation-------------------------------------------------
Given('Login into Mobiquity Portal as System admin Created by Master', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.log(loginId)
  cy.login(loginId, this.data3.Password)
  //cy.intercept('/mobiquitypay/ums/v2/user/auth/change-credential').as('all')
  cy.log(loginId)
  cy.login1(this.data3.Password1)
 // cy.checkAPI('/mobiquitypay/ums/v2/user/auth/change-credential')
  cy.wait(2000)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword = this.data3.Password1
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber = mobile
    cy.writeFile(Sysfilelogin, data)
  })
})

Given('Login into Mobiquity Portal as System admin Created by Master2', function () {
  cy.log(loginId)
  cy.loginAgain(loginId, this.data3.Password)
  cy.log(loginId)
  //cy.intercept('/mobiquitypay/ums/v2/user/auth/change-credential').as('all')
  cy.login1Again(this.data3.Password1)
  //cy.checkAPI('/mobiquitypay/ums/v2/user/auth/change-credential')
  cy.wait(2000)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId2 = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword2 = this.data3.Password1
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber2 = mobile
    cy.writeFile(Sysfilelogin, data)
  })
})

Given('Login into Mobiquity Portal as System admin Created by Master3', function () {
  cy.log(loginId)
  cy.loginAgain(loginId, this.data3.Password)
  cy.log(loginId)
 // cy.intercept('/mobiquitypay/ums/v2/user/auth/change-credential').as('all')
  cy.login1Again(this.data3.Password1)
  //cy.checkAPI('/mobiquitypay/ums/v2/user/auth/change-credential')


  cy.wait(2000)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId3 = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword3 = this.data3.Password1
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber3 = mobile
    cy.writeFile(Sysfilelogin, data)
  })
})

When('Navigate to User Management and click on Register',function(){

  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
  cy.waitUntil(() => {     
    return cy.iframe().find('div > h4[class="font-weight-bold mt-4 mb-2"]').contains(' Select User Role ')
  })
})


When('Navigate to User Management and click on Register for superadmin', function () {
  //cy.intercept('mobiquitypay/v1/ums/workspace-categories?workspaceId=').as('all')
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
  cy.waitUntil(() => {
    return cy.iframe().find('div > h4[class="font-weight-bold mt-4 mb-2"]').contains(' Select User Role ')
  })
 // cy.checkAPI('mobiquitypay/v1/ums/workspace-categories?workspaceId=')
})

And('Click On System Admin and select Single User', function () {
 // cy.intercept('/mobiquitypay/v1/languages').as('all')
  registerPage.getUserRole().contains(this.data2.userRole4).click({ force: true })
  //cy.checkAPI('/mobiquitypay/v1/languages')
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
And('Enter all Maker required Fields', function () {
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  loginId = "SY" + mobile
  let lastname = getRandomName()
  let firstname = getRandomName()
  registerPage.getLastName().type(lastname, { force: true })
  cy.getrandomUserEmailID1()
  registerPage.getLoginID().clear()
  registerPage.getLoginID().type(loginId)
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getFirstName().clear().type(firstname, { force: true }),

    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.readFile(Sysfilelogin).then((data) => {
    data.SysAdminName = firstname + '' + lastname
    cy.writeFile(Sysfilelogin, data)
  })

  cy.writeFile('userData/SystemAdminLogin.json', { MobileNumber: mobile })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------Profile Data-----------------------------------------------------------------

  cy.readFile(SubProfileName).then((user) => {
    SecurityProfile = user.SystemAdminSecuirtyProfile
    registerPage.getSecurityProfile().select(SecurityProfile, { force: true })
  })

  registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile2, { force: true })
  registerPage.getNextButtonProfile().click({ force: true })
  //cy.intercept('/mobiquitypay/v1/ums/user').as('all')
  registerPage.getSubmitButton().click({ force: true })
  //cy.checkAPI('/mobiquitypay/v1/ums/user')
})

And('Enter all required Fields', function () {
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  loginId = "SY" + mobile
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.getrandomUserEmailID1()
  registerPage.getLoginID().clear()
  registerPage.getLoginID().type(loginId)
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.writeFile('userData/SystemAdminLogin.json', { MobileNumber: mobile })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------Profile Data-----------------------------------------------------------------

  cy.readFile(SubProfileName).then((user) => {
    SecurityProfile = user.SystemAdminSecuirtyProfile
    registerPage.getSecurityProfile().select(SecurityProfile, { force: true })
  })

  registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile2, { force: true })
  registerPage.getNextButtonProfile().click({ force: true })
  //cy.intercept('/mobiquitypay/v1/ums/user').as('all')
  registerPage.getSubmitButton().click({ force: true })
  //cy.checkAPI('/mobiquitypay/v1/ums/user')

})
Then('Confirmation message is displayed', function () {
 // cy.intercept('/mobiquitypay/audit').as('all')
  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
  cy.wait(20000)
 // cy.checkAPI('/mobiquitypay/audit')
})
//------------------------------------Approve----------------------------------------------------------
When('Navigate to Approvals and filter by Submitted status for SystemAdmin', function () {
 // cy.intercept('/mobiquitypay/v1/ums/workspace-categories?workspaceId=').as('all')
  welcomePage.getApprovaltab().click()
  cy.wait(2000)
  welcomePage.getApprovalButtonTab().click()
  cy.waitUntil(() => {

    return cy.iframe().find('h4.text-secondary').contains('Approvals')

  })
  //cy.checkAPI('/mobiquitypay/v1/ums/workspace-categories?workspaceId=')
  //-----------------------Added waituntil--------------------------------------------------------------
  cy.waitUntil(()=>{
    return cy.iframe().find('.mat-button-wrapper > span').contains('Filters')
  })
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.wait(2000)
  approvalPage.getAddUserCheckBox().click({ force: true })
 // cy.intercept('/mobiquitypay/v2/workflow_management/workflow/pending_records/MasterAdminChecker/').as('all')
  approvalPage.getApplyFilter().click({ force: true })
 // cy.checkAPI('/mobiquitypay/v2/workflow_management/workflow/pending_records/MasterAdminChecker/')

})
And('User click on System admin submitted user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })
  
  
 // approvalPage.getUpload().click({ force: true })
  //cy.wait(2000)
 // approvalPage.getClickHere().selectFile('cypress/fixtures/Upload.png', { action: 'drag-drop' })
  //cy.wait(5000)
 // approvalPage.getUploadDocument().click()
  //cy.wait(2000)

})
And('Approve the Users and save loginID', function () {
  //cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('all')
  approvalPage.getApproveButton().click({ force: true })
 // cy.checkAPI('/mobiquitypay/serviceRequest/resume/any')
  cy.wait(3000)
 // cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('all')
  approvalPage.getApproveRequest().click({ force: true })
  //cy.checkAPI('/mobiquitypay/serviceRequest/resume/any')
  cy.wait(3000)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.DefaultPassword = this.data3.Password
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber = mobile
    cy.writeFile(Sysfilelogin, data)
  })
  cy.log(loginId)
})
And('Approve the Users and save loginID2', function () {
 // cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('all')
  approvalPage.getApproveButton().click({ force: true })
 // cy.checkAPI('/mobiquitypay/serviceRequest/resume/any')
  cy.wait(3000)
 // cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('all')
  approvalPage.getApproveRequest().click({ force: true })
 // cy.checkAPI('/mobiquitypay/serviceRequest/resume/any')

  cy.wait(3000)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId2 = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword2 = this.data3.Password1
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber2 = mobile
    cy.writeFile(Sysfilelogin, data)
  })
  cy.log(loginId)
})
And('Approve the Users and save loginID3', function () {
  //cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('all')
  approvalPage.getApproveButton().click({ force: true })
  //cy.checkAPI('/mobiquitypay/serviceRequest/resume/any')

  cy.wait(3000)
  //cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('all')
  approvalPage.getApproveRequest().click({ force: true })
  //cy.checkAPI('/mobiquitypay/serviceRequest/resume/any')
  cy.wait(3000)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId3 = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword3 = this.data3.Password1
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber3 = mobile
    cy.writeFile(Sysfilelogin, data)
  })
  cy.log(loginId)
})
Then('User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})


And('User click on submitted user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })
  //approvalPage.getUpload().click({ force: true })
  //cy.wait(2000)
 //approvalPage.getClickHere().selectFile('cypress/fixtures/Upload.png', { action: 'drag-drop' })
  //cy.wait(5000)
  //approvalPage.getUploadDocument().click()
  //cy.wait(2000)

})

And('Approve the Users and save loginID5', function () {
  approvalPage.getApproveButton().click({ force: true })
    cy.wait(3000)
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(3000)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId5 = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword5 = this.data3.Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber5 = mobile
    cy.writeFile(Sysfilelogin, data)
})
cy.log(loginId)
})





Given('Login into Mobiquity Portal as System admin Created by Master5', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.log(loginId)
  cy.loginAgain(loginId,this.data3.Password)
  cy.log(loginId)
  cy.login1Again(this.data3.Password1)
  cy.wait(2000)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)  
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId5 = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword5 = this.data3.Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber5 = mobile
    cy.writeFile(Sysfilelogin, data)
}) })



Given('Login into Mobiquity Portal as Systemadmin5', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin5()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})

When ('Navigate to Profile icon and Click on Profile icon', function (){
  welcomePage.getProfileIcon().click()
})

And ('Click On Setting and click on Change Password', function () {
welcomePage.getSettings().click({ force: true })
cy.wait(5000)
welcomePage.getChangePassword().click({ force: true })
})

And ('Enter Old password and Enter New Password and Confirm New Password', function () {
  
  pageLogin.getInputForm().eq(0).type(this.data3.ChangePassword5)
  pageLogin.getInputForm().eq(1).type(this.data3.NewPassword)
  pageLogin.getInputForm().eq(2).type(this.data3.NewPassword)
})

Then ('Click on the change Password Button', function () {
  pageLogin.getchangepassword().click({ force: true }) 
  pageLogin.getloginbtn1().click({ force: true })

})
Given('Login into Mobiquity Portal as System admin with newly created Password', function () {
  cy.launchURL(Cypress.env('Adminurl'))
cy.SysAdminlogin4()
cy.wait(2000)
cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
