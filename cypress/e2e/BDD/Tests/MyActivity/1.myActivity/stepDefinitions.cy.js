/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/AdministratorCommands"
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import { recurse } from 'cypress-recurse';


//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
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

});
//----------------Test Scripts---------------------------------------------------------------------------

//--------------------------User Management--------------------------------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------
//----------------Navigate to User Management tab and Click on Register---------------------------------



//-------------------------Confirmation Message displayed---------------------------------------------



//------------------------------------Approve----------------------------------------------------------





//-------------------------------------------------TC_123------------------------------------------------
And('Navigate to My Activity and Add the not Approved filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  cy.wait(2000)
  myActivityPage.getAddUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})
And('Enter all the User details', function () {

  //-------------------Random Data-----------------------------------------------------------------
  cy.wait(2000)
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.getBArandomUserEmailID()
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  cy.wait(3000)
  registerPage.getCountry().select(this.data2.personalInfo.country)
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------Profile Data-----------------------------------------------------------------
 // cy.readFile(SubProfileName).then((data) => {
 //   let Profile = data.CustomercareAdmin
    registerPage.getSecurityProfile().select("CustomerCareAdminSecurityProfile", { force: true })

 // })
 // cy.readFile(SubProfileName).then((data) => {
//    let Profile = data.CustomercareAdmin1
    registerPage.getAuthProfile().select("CCEDefault Profile", { force: true })

 // })
  registerPage.getSaveButton().click({ force: true })
})

//----------------------------------------------TC_124---------------------------------------------------


When('Navigate to My Activity and Add the required filter', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  cy.wait(2000)
  myActivityPage.getAddUser().click({ force: true })
  myActivityPage.getSavedStatus().click()
  myActivityPage.getApply().click()
})
Then('Click on Expand and View Details button', function () {
  cy.wait(3000)
  myActivityPage.getExpandButton().click()
  myActivityPage.getViewDetails().click({ force: true })
})


//------------------------------------------TC_125--------------------------------------------------------------

Then('Click on Expand and Resume button', function () {
  cy.wait(2000)
  myActivityPage.getExpandButton().click({ force: true })
  myActivityPage.getViewDetails().click({ force: true })
  myActivityPage.getResumeUser().click({ force: true })
  cy.wait(3000)
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


  //----------------------Profile Data-----------------------------------------------------------------

  //cy.readFile(SubProfileName).then((data) => {
//    let Profile = data.CustomercareAdmin
    registerPage.getSecurityProfile().select("CustomerCareAdminSecurityProfile", { force: true })

 // })
 // cy.readFile(SubProfileName).then((data) => {
   // let Profile = data.CustomercareAdmin1
    registerPage.getAuthProfile().select("CCEDefault Profile", { force: true })

 // })
  registerPage.getNextButtonProfile().click({ force: true })

})

//--------------------------------------------TC_126---------------------------------------------------

And('Click the >> Submit Button', function () {
  cy.wait(2000)
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



And('Enter all the details for CCA', function () {
  cy.wait(2000)
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


  //----------------------Profile Data-----------------------------------------------------------------

   //cy.readFile(SubProfileName).then((data) => {
//    let Profile = data.CustomercareAdmin
    registerPage.getSecurityProfile().select("CustomerCareAdminSecurityProfile", { force: true })

 // })
 // cy.readFile(SubProfileName).then((data) => {
   // let Profile = data.CustomercareAdmin1
    registerPage.getAuthProfile().select("CCEDefault Profile", { force: true })

 // })

  registerPage.getNextButtonProfile().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
})


