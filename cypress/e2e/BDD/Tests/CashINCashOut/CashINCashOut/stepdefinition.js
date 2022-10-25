
/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";

import ChurnManagement from '../../../../../support/pageObjects/ChurnManagement/ChurnManagement';
import "../../../../../support/utils/subscriberCommands";
import "../../../../../support/utils/Generic";

import register from '../../../../../support/pageObjects/UserManagement/register';
import loginPage from '../../../../../support/pageObjects/loginPage';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import { recurse } from 'cypress-recurse';
import "../../../../../support/utils/ChurnCommands";
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import homePage from '../../../../../support/pageObjects/homePage';
import CashInCashOut from '../../../../../support/pageObjects/CashInCashOut/CashInCashOut';
//----------------Object Declaration-----------------------------------------------------------

const cashincashoutPage=new CashInCashOut()
const registerPage = new register()
const approvalPage = new approvals()
const myActivityPage = new myActivity()
const manageUsersPage = new manageUsers()
const welcomePage=new homePage()
const pageLogin=new loginPage()
const uuid = () => Cypress._.random(1e3)
Amount = uuid()

const SubMob = 'userData/subscriberReg.json'
var Amount
var name
var loginId
var KycValue
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

//----------------Business user login---------------------------------------------------------------------------

Given('Login into Mobiquity Portal as Business admin User3', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
    cy.wait(3000)
    cy.readFile('cypress/fixtures/userData/BusinessUsersDataO2C.json').then((data) => {
      var loginId
      loginId = data.LoginId
      // cy.login(loginId, this.data1.businessAdmin.DefaultPassword)
       //cy.login1(this.data1.businessAdmin.businessadminPwd1)
       //cy.wait(2000)
       //cy.Passwordchange(this.data1.UserCreationSuccessMessage)
       //pageLogin.getloginbtn1().click({ force: true })
      cy.wait(2000)
      cy.login(loginId, this.data1.businessAdmin.businessadminPwd1)
    })
   // cy.checkWelcomeText(this.data1.BAAdminText)
  
  })


  Given('Login into Mobiquity Portal as Business admin User4', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
    cy.wait(3000)
    cy.readFile('cypress/fixtures/userData/BusinessUsersDataO2C.json').then((data) => {
      var loginId
      loginId = data.LoginId
      // cy.login(loginId, this.data1.businessAdmin.DefaultPassword)
      // cy.login1(this.data1.businessAdmin.businessadminPwd1)
      // cy.wait(2000)
      // cy.Passwordchange(this.data1.UserCreationSuccessMessage)
      // pageLogin.getloginbtn1().click({ force: true })
      cy.wait(2000)
      cy.login(loginId, this.data1.businessAdmin.businessadminPwd1)
    })
   // cy.checkWelcomeText(this.data1.BAAdminText)
  
  })


  
  When('Navigate to Cash in or Cash out and Click on Cash in', function () {
  welcomePage.getCashinOrCashout().click({force:true})
  cy.wait(3000)
  welcomePage.getCashin().click({force:true})
  cy.wait(3000)
  })
  
  When('Navigate to Cash in or Cash out and Click on Cash Out', function () {
    welcomePage.getCashinOrCashout().click({force:true})
    cy.wait(3000)
    welcomePage.getCashOut().click({force:true})
    cy.wait(3000)
    })

  And('Enter all Mandatory details',function(){
 
   cy.fixture(SubMob).then((user) => {
    var SubMob1 = user.subscriberMobile
    
   cashincashoutPage.getMSISDN().type(SubMob1)
  })
  cashincashoutPage.getAmount().type(Amount)
  cashincashoutPage.getPaymentID().type(Amount)
  })
  
  Then('Click on Submit and Click on Confirm Button',function(){
  cashincashoutPage.getSubmitButton().click()
  cy.wait(3000)
  cashincashoutPage.getConfirmButton().click()
  })


