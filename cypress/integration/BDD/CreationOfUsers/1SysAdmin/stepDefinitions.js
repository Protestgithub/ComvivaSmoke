/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';
import "../../../../support/commands";
import "../../../../support/securityCommands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';


//----------------Object Declaration----------------------------------------------------------
const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()
let Sysfilelogin = 'cypress/fixtures/userData/SystemAdminLogin.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
var name, SecurityProfile,loginId,mobile

//----------------------------------------------------------------------------------------
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

  if ( Cypress.browser.isHeadless ) {
    cy.clearCookie('shouldStop')
  } else {
    cy.getCookie('shouldStop').then(cookie => {
      if (
        cookie &&
        typeof cookie === 'object' &&
        cookie.value === 'true'
      ) {
        Cypress.runner.stop();
      }
    })
  }
});
//--------------------------- Login -------------------------------------------------
Given('Create Folder',function(){
 cy.FolderCreation()
})
//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.superadminm, this.data1.masteradminmaker.superadminmPwd)
  cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
})

//superadminc
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.superadminc, this.data1.masteradminchecker.superadmincPwd)
  cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
})


//---------------------------------SystemAdmin Creation-------------------------------------------------
Given('Login into Mobiquity Portal as System admin Created by Master', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.log(loginId)
  cy.login(loginId, this.data1.DefaultPassword)
  cy.log(loginId)
  cy.login1(this.data1.BAPassword)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword = this.data1.BAPassword
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber = mobile
    cy.writeFile(Sysfilelogin, data)
  })
})


Given('Login into Mobiquity Portal as System admin Created by Master2', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.log(loginId)
  cy.login(loginId, this.data1.DefaultPassword)
  cy.log(loginId)
  cy.login1(this.data1.BAPassword)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId2 = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword2 = this.data1.BAPassword
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber2 = mobile
    cy.writeFile(Sysfilelogin, data)
  })
})

Given('Login into Mobiquity Portal as System admin Created by Master3', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.log(loginId)
  cy.login(loginId,this.data1.DefaultPassword)
  cy.log(loginId)
  cy.login1(this.data1.BAPassword)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId3 = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword3 = this.data1.BAPassword
    cy.writeFile(Sysfilelogin, data)
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber3 = mobile
    cy.writeFile(Sysfilelogin, data)
  })
})


When('Navigate to User Management and click on Register', function () {
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})

And('Click On System Admin and select Single User', function () {
  registerPage.getUserRole().eq(2).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})

And('Enter all Maker required Fields for Maker', function () {
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
  cy.readFile(Sysfilelogin).then((data)=>{
    data.SysAdminMakerName = firstname + ' ' + lastname
    data.MobileNumber=mobile
   cy.writeFile(Sysfilelogin, data)
 })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
  .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })
  //----------------------Profile Data-----------------------------------------------------------------
  cy.readFile(SubProfileName).then((user) => {
    SecurityProfile = user.SystemAdminSecuirtyProfile
    registerPage.getSecurityProfile().select("adminSecurityProfile", { force: true })
  })
  registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile2, { force: true })
  registerPage.getNextButtonProfile().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
})


And('Enter all required Fields for checker1', function () {
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
  cy.readFile(Sysfilelogin).then((data)=>{
    data.MobileNumber = mobile
    data.SysAdminChecker1Name = firstname + ' ' + lastname
    cy.writeFile(Sysfilelogin,data)
  })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------Profile Data-----------------------------------------------------------------
  cy.readFile(SubProfileName).then((user) => {
    SecurityProfile = user.SystemAdminSecuirtyProfile
    registerPage.getSecurityProfile().select("adminSecurityProfile", { force: true })
  })
  registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile2, { force: true })
  registerPage.getNextButtonProfile().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
})
And('Enter all required Fields for checker2', function () {
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
  cy.readFile(Sysfilelogin).then((data)=>{
    data.MobileNumber = mobile
    data.SysAdminChecker2Name = firstname + ' ' + lastname
    cy.writeFile(Sysfilelogin,data)
  })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------Profile Data-----------------------------------------------------------------

  cy.readFile(SubProfileName).then((user) => {
    SecurityProfile = user.SystemAdminSecuirtyProfile
    registerPage.getSecurityProfile().select("adminSecurityProfile", { force: true })
  })
  registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile2, { force: true })
  registerPage.getNextButtonProfile().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
})

Then('Confirmation message is displayed', function () {
  cy.waitUntil(() => {
    return cy.iframe().find('.text-center').should('have.text', this.data2.personalInfo.successConfirmationMessage)
  })
  registerPage.getDoneButton().click()
})
//------------------------------------Approve----------------------------------------------------------
When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getApprovaltab().click()
  cy.waitUntil(() => {
    return cy.get('[title="Approvals"]').click()
  })
  //-----------------------Added waituntil--------------------------------------------------------------
  cy.waitUntil(() => {
    return cy.iframe().find('h4.text-secondary').should('be.visible')
  })
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  approvalPage.getAddUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })
})
And('User click on submitted user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })
})
And('Approve the Users and save loginID', function () {
  cy.waitUntil(() => {
    return cy.iframe().find('button[id="approve-expanded-record"]').click({ force: true })
  })
  cy.waitUntil(() => {
    return cy.iframe().find('.mat-dialog-actions > button.mat-focus-indicator.btn-rounded.button-primary').click({ force: true })
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber = mobile
    cy.writeFile(Sysfilelogin, data)
  })
  cy.log(loginId)
})

And('Approve the Users and save loginID2', function () {
  cy.waitUntil(() => {
    return cy.iframe().find('button[id="approve-expanded-record"]').click({ force: true })
  })
  cy.waitUntil(() => {
    return cy.iframe().find('.mat-dialog-actions > button.mat-focus-indicator.btn-rounded.button-primary').click({ force: true })
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId2 = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber2 = mobile
    cy.writeFile(Sysfilelogin, data)
  })
  cy.log(loginId)
})
And('Approve the Users and save loginID3', function () {
  cy.waitUntil(() => {
    return cy.iframe().find('button[id="approve-expanded-record"]').click({ force: true })
  })
  cy.waitUntil(() => {
    return cy.iframe().find('.mat-dialog-actions > button.mat-focus-indicator.btn-rounded.button-primary').click({ force: true })
  })
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId3 = loginId
    cy.writeFile(Sysfilelogin, data)
  })
  
  cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber3 = mobile
    cy.writeFile(Sysfilelogin, data)
  })
  cy.log(loginId)
})
Then('User status is approved', function () {
  cy.waitUntil(() => {
    return cy.iframe().find('.mat-simple-snackbar.ng-star-inserted > span').contains(this.data2.confirmationMessage.addUser)
  })
})


