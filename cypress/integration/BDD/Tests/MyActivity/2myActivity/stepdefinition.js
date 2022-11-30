/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/AdministratorCommands"
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import { recurse } from 'cypress-recurse';


//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const myActivityPage = new myActivity()
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()
var mobile
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
  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
  })
});
//----------------Test Scripts---------------------------------------------------------------------------

//--------------------------User Management--------------------------------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminChecker1Name
    cy.checkWelcomeText(Name)
  })
})
Then('Logout', function () {
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
  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
})


When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
  welcomePage.getApprovalButtonTab().click()
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.waitUntil(() => {
    return cy.iframe().find('label.text-secondary-light.font-weight-700').eq(0).should('be.visible', { force: true })
  })
  approvalPage.getAddUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })
})

//------------------------------------Approve----------------------------------------------------------

And('User click on submitted user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })
})

//-------------------------------------------------TC_123------------------------------------------------
And('Navigate to My Activity and Add the not Approved filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  cy.waitUntil(() => {
    return cy.iframe().find('p.text-secondary.text-capitalize.font-weight-700').should('be.visible', { force: true })
  })
  myActivityPage.getAddUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
  cy.waitUntil(() => {
    return cy.iframe().find('#expansion').eq(0).should('be.visible', { force: true })
  })
})


//----------------------------------------------TC_124---------------------------------------------------


And('Select User type as Adminstrator and click on Customer care Admin', function () {
  pageLogin.getiFrame()
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).focused()
  registerPage.getUserRole().contains(this.data2.userRole1).click({ force: true })
  cy.intercept(this.data20.RegistrationM).as('getregmode')
  registerPage.getRegistrationMode().eq(0).click({ force: true })
  cy.wait('@getregmode')
})

//------------------------------------------TC_125--------------------------------------------------------------

Then('Click on Expand and Resume button', function () {
  cy.wait(2000)
  myActivityPage.getExpandButton().click({ force: true })
  myActivityPage.getViewDetails().click({ force: true })
  myActivityPage.getResumeUser().click({ force: true })
})

And('Enter all the required details of the user', function () {
  cy.wait(2000)
  registerPage.getLastName().clear().type(getRandomName(), { force: true })
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country)
  registerPage.getNextButtonBasic().click({ force: true })
  registerPage.getSecurityProfile().select("CustomerCareAdminSecurityProfile", { force: true })
  registerPage.getAuthProfile().select("CCEDefault Profile", { force: true })
  registerPage.getNextButtonProfile().click({ force: true })
})

//--------------------------------------------TC_126---------------------------------------------------

And('Click the >> Submit Button', function () {
  registerPage.getSubmitButton().click({ force: true })
})


//--------------------------------------------TC_127---------------------------------------------------

Then('Click on Expand and Withdraw button', function () {
  cy.wait(2000)
  myActivityPage.getExpandButton().click({ force: true })
  myActivityPage.getWithDraw().click({ force: true })
  myActivityPage.getYesButton().click({ force: true })
})

//--------------------------------------------TC_128------------------------------------------------------


When('Navigate to My Activity and Add the Reject filter', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  cy.waitUntil(() => {
    return cy.iframe().find('label.text-secondary-light.font-weight-700').eq(0).should('be.visible', { force: true })
  })
  myActivityPage.getModificationOfUser().click({ force: true })
  myActivityPage.getRejectStatus().click({ force: true })
  myActivityPage.getApply().click({ force: true })
})
And('Enter all the details', function () {
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.getrandomUserEmailID()
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getFirstName().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country)
  registerPage.getNextButtonBasic().click({ force: true })
  registerPage.getSecurityProfile().select("CustomerCareAdminSecurityProfile", { force: true })
  registerPage.getAuthProfile().select("CCEDefault Profile", { force: true })
  registerPage.getNextButtonProfile().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
})

Then('Reject the Users', function () {
  approvalPage.getRejectButton().click({ force: true })
  approvalPage.getRejectComment().type(getRandomName(), { force: true })
  approvalPage.getRejectRequest().click({ force: true })
})

