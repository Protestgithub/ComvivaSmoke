/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//-------------------------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import loginPage from '../../../../../support/pageObjects/loginPage';
import SessionManagement from '../../../../../support/pageObjects/SessionManagement/SessionManagement';
//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()
const session = new SessionManagement()
const login = new loginPage()
const SubMob='userData/subscriberReg.json'

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data) {
    this.data = data;
  })
   cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
   

});


//----------------Test Scripts---------------------------------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as Subscriber', function () {
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/subscriber/") 
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/subscriber/")   
  cy.wait(3000)
  cy.readFile('cypress/fixtures/userData/subscriberReg.json').then((data)=>{
  var SubLogin
  SubLogin = data.subscriberLoginId
  cy.login(SubLogin, this.data.subscriber.subpwd)
  cy.wait(2000)
  })
})
And('Change Password', function () {
  login.getInputForm().eq(0).type(this.data.subscriber.subpwd1)
  login.getInputForm().eq(1).type(this.data.subscriber.subpwd1)
  login.getchangepassword().click()
  login.getloginbtn1().click()
})
And('Login into Mobiquity Portal as Subscriber1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/subscriber/")   
  cy.wait(3000)
  cy.intercept("/mobiquitypay/ums/v3/user/auth/web/login").as('getPwd')
  cy.readFile('cypress/fixtures/userData/subscriberReg.json').then((data)=>{
    var SubLogin
    SubLogin = data.subscriberLoginId
    cy.login(SubLogin, this.data.subscriber.subpwd1)  
  
  cy.wait(10000)
})
})
When('Navigate to SessionManagement', function () {
  welcomePage.getSessionManagementOption().scrollIntoView()
  welcomePage.getSessionManagementOption().click()
})
Then('Click On My Sessions', function () {
  welcomePage.getmysessionoption().click()
  cy.wait(3000)
})
And('Click On All Session and Enter Number to search', function () {
  welcomePage.getAllSessionsOption().click()
  cy.fixture(SubMob).then((user) => {
    var SubMob1 = user.subscriberMobile
    cy.log(SubMob1)
    session.getSearchUser().type(SubMob1)
  })
  session.getimg().click()
  session.getSearchBtn().click()
})
Then('Delete Devices', function () {
  session.getdevices().click({ multiple: true })
  session.getdeletedevices().click()
  session.getconfirmdelete().click()
})
