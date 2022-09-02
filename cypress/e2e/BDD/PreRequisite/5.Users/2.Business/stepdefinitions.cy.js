/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And,Before} from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/subscriberCommands";
import "../../../../../support/BusinessUserCommands";
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import register from '../../../../../support/pageObjects/UserManagement/register';
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import { recurse } from 'cypress-recurse';


//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const myActivityPage = new myActivity()
const uuuid = () => Cypress._.random(1e3)
const SubMob='userData/subscriberReg.json'
amount = uuuid()
var loginId, mobile,KycValue, amount, name, ifscnum, accnumber
const uuid = () => Cypress._.random(1e8)
const timestamp = (new Date).getTime()
const kycid = timestamp
mobile = "77" + uuid()
var RegulatoryMarketingProfile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
var BankData = 'cypress/fixtures/userData/BankData.json'
var BuisnessReg = 'cypress/fixtures/userData/BusinessUsersData.json'
var BuisnessRegSuspension = 'cypress/fixtures/userData/BusinessUserSuspensionData.json'
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

And('Select User type as Business and Select user role', function () {

  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).focused()
  registerPage.getUserRole().contains(this.data2.userRole8).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
