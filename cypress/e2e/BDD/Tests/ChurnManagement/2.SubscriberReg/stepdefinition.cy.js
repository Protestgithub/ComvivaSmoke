/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import ChurnManagement from '../../../../../support/pageObjects/ChurnManagement/ChurnManagement';
import "../../../../../support/subscriberCommands";
import "../../../../../support/commands";
import "../../../../../support/comissioncommands";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import { recurse } from 'cypress-recurse';
import "../../../../../support/ChurnCommands";
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
//----------------Object Declaration-----------------------------------------------------------

const pageLogin = new loginPage()
const churnManagementPage = new ChurnManagement()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const myActivityPage = new myActivity()
const manageUsersPage = new manageUsers()


const churnSubRegistration = 'cypress/fixtures/userData/churnSubscriberReg.json'
var mobile
var CIF
var name
var RegulatoryMarketingProfile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
var loginId
var KycValue
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
  cy.fixture('userData/churnSubscriberReg').then(function (data8) {
    this.data8 = data8;
  })
  cy.fixture('ChurnManagement').then(function (data3) {
    this.data3 = data3;
  })
  cy.fixture('userData/Regulatory&MarketingProfile').then(function (data4) {
    this.data4 = data4;
  })

});

//---------------------------------------------System Admin Login----------------------------------------------------
//----------------Navigate to User Management tab and Click on Register---------------------------------



And('Assert Created Subscriber Mobile Number for Bulk and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(churnSubRegistration).then((user) => {
  let SubMobile = user.churnSubscriberRegistrationBulkUpload
  var SUBMobile = " "+SubMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',SUBMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(churnSubRegistration).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(churnSubRegistration,data)
  })
})
})
