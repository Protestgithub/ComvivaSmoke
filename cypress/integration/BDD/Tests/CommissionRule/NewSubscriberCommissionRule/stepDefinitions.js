/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/BusinessUserCommands";
import "../../../../../support/subscriberCommands";
import NewSubscriberCommission from '../../../../../support/pageObjects/ServiceCharge/NewSubscriberCommission';
//----------------Object Declaration-----------------------------------------------------------------

const newSubCommission = new NewSubscriberCommission()

var name
function getRandomName() {
  name = "SubComRule";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

//----------------Object Declaration-----------------------------------------------------------------

const welcomePage = new homePage()


//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('API/APIEndPoints').then(function (data20) {
    this.data20 = data20;
  })
});


//-----------------------------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------------------
When('Navigate to Service Charge>>New Subscriber Commission Rule', function () {
  welcomePage.getServiceCharge().click({ force: true })
  cy.intercept(this.data20.NewSubscriberComm).as('getnewsubscibercomm')
  welcomePage.getNewSubscriberCommissionRule().click({ force: true })
  cy.wait(2000)
  newSubCommission.getSubscriberCommissionRuleName().type(getRandomName())
  newSubCommission.getCount().type("1")
  newSubCommission.getValidity().type("10")
  newSubCommission.getCheckAll().click({ force: true })
  newSubCommission.getSaveButton().click({ force: true })
})