/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And,Before} from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';
import "../../../../support/commands";
import "../../../../support/subscriberCommands";
import "../../../../support/AdministratorCommands"
import "../../../../support/BusinessUserCommands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../support/pageObjects/UserManagement/manageUsers';
import myActivity from '../../../../support/pageObjects/MyActivity/myActivity';
import API from '../../../../support/pageObjects/API';



//----------------Object Declaration-----------------------------------------------------------------
const SubMob='userData/subscriberReg.json'
const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const APIPage = new API()
const myActivityPage = new myActivity()
const uuid = () => Cypress._.random(1e8)
const uuid1 = () => Cypress._.random(1e8)
const uuuid = () => Cypress._.random(1e3)
amount = uuuid()
var loginId, mobile, BusinessMobile, KycValue, amount, name, ifscnum, accnumber, BankData
const kycid = () => Cypress._.random(1e8)
const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp
mobile = "77" + uuid1()
var lid, eid, CIF, mobile1, Mobile, Submobile, loginId, name
mobile1 = "77" + uuid()
var filename = 'cypress/fixtures/userData/AdministratorData.json'
var subRegistration = 'cypress/fixtures/userData/subscriberReg.json'
var BuisnessReg = 'cypress/fixtures/userData/BusinessUsersData.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
let Profile
var BankData = 'cypress/fixtures/userData/BankData.json'
var RegulatoryMarketingProfile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
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


//-----------------Select User Type-----------------------------------------------------------
And('Select User type as Adminstrator and click on BusinessAdmin', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).focused()
  registerPage.getUserRole().contains(this.data2.userRole).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })

})
