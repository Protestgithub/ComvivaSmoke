////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
const uid1 = () => Cypress._.random(1e2)
const Id = uid1()
var mobile
let Sysfilelogin = 'cypress/fixtures/userData/SystemAdminLogin.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
var name, SecurityProfile
var loginId
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
  cy.fixture('userData/SystemAdminLogin').then(function (data3) {
    this.data3 = data3;
  })
});
//--------------------------- Login -------------------------------------------------

//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
})

//superadminc
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
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

Given('Login into Mobiquity Portal as Business admin Created by Master', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.readFile(BAlogin).then((data) => {
    let loginId = data.LoginId
    cy.login(loginId, this.data1.DefaultPassword)
    cy.log(loginId)
    cy.login1(this.data1.BAPassword)
    cy.Passwordchange(this.data1.UserCreationSuccessMessage)
    cy.readFile(BAlogin).then((data) => {
      data.LoginId = loginId
      cy.writeFile(BAlogin, data)
    })
    cy.readFile(BAlogin).then((data) => {
      data.ChangePassword = this.data1.BAPassword
      cy.writeFile(BAlogin, data)
    })
    cy.readFile(BAlogin).then((data) => {
      data.MobileNumber = mobile
      cy.writeFile(BAlogin, data)
    })
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
  cy.login(loginId, this.data1.DefaultPassword)
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
  let data = firstname + ' ' + lastname
  cy.writeFile(Sysfilelogin, {SysAdminName:data})
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
  registerPage.getSubmitButton().click({ force: true })
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
  cy.readFile(Sysfilelogin).then((data)=>{
    data.MobileNumber = mobile
    cy.writeFile(Sysfilelogin,data)
  })
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
    return cy.iframe().find('h4.text-secondary')
  })
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
 // cy.wait(2000)
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
  cy.waitUntil(() => {
    return cy.iframe().find('.mat-simple-snackbar.ng-star-inserted > span').contains(this.data2.confirmationMessage.addUser)
  })
})


