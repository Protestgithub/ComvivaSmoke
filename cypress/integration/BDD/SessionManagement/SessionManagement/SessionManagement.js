/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//-------------------------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../support/pageObjects/homePage';
import "../../../../support/commands";
import loginPage from '../../../../support/pageObjects/loginPage';
import SessionManagement from '../../../../support/pageObjects/SessionManagement/SessionManagement';
import API from '../../../../support/pageObjects/API';
//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()
const session = new SessionManagement()
const login = new loginPage()
const APIPage = new API()
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
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
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
  cy.loginAgain(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
  cy.loginAgain(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)

})
Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})
Given('Login into Mobiquity Portal as Subscriber', function () {
  cy.visit(Cypress.env("Adminurl"))
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
  cy.visit(Cypress.env("Adminurl"))
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/subscriber/")   
  cy.wait(3000)
  cy.intercept("/mobiquitypay/ums/v3/user/auth/web/login").as('getPwd')
  cy.readFile('cypress/fixtures/userData/subscriberReg.json').then((data)=>{
    var SubLogin
    SubLogin = data.subscriberLoginId
    cy.login(SubLogin, this.data.subscriber.subpwd)  
  
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
