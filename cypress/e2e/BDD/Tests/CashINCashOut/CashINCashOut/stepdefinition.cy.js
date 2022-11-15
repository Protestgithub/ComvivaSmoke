
/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import ChurnManagement from '../../../../../support/pageObjects/ChurnManagement/ChurnManagement';
import "../../../../../support/utils/subscriberCommands";
import "../../../../../support/utils/Generic";
import loginPage from '../../../../../support/pageObjects/loginPage';
import "../../../../../support/utils/ChurnCommands";
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import homePage from '../../../../../support/pageObjects/homePage';
import CashInCashOut from '../../../../../support/pageObjects/CashInCashOut/CashInCashOut';
//----------------Object Declaration-----------------------------------------------------------

const cashincashoutPage=new CashInCashOut()
const churnManagementPage=new ChurnManagement()
const manageUsersPage = new manageUsers()
const welcomePage=new homePage()
const pageLogin=new loginPage()
const uuid = () => Cypress._.random(1e2)
PaymentID = uuid
PaymentID1 = uuid
CashInAmount = 10
CashOutAmont = 1
var CashIO = 'cypress/fixtures/userData/cashIn&cashout.json'
const SubMob = 'userData/subscriberReg.json'
var CashInAmount, CashOutAmont, name, PaymentID, PaymentID1
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
        cy.login(loginId, this.data1.businessAdmin.DefaultPassword)
        cy.login1(this.data1.businessAdmin.businessadminPwd1)
        cy.wait(2000)
        cy.Passwordchange(this.data1.UserCreationSuccessMessage)
        pageLogin.getloginbtn1().click({ force: true })
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
       //cy.login(loginId, this.data1.businessAdmin.DefaultPassword)
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

  And('Enter all Mandatory details for Cashin',function(){
    cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
      const $body = $iframe.contents().find('body')
      const $win = $iframe[0].contentWindow
    
      const stub = cy.stub()
      if (cy.stub($win, 'alert', () => false)
        .as('windowConfirm')) {
    
      }
    
      else {
        cy.stub($win.console, 'log').as('consoleLog')
        cy.wrap($body)
          .find('input[name="amount"]').click({ force: true })
          .should(function () {
    
            expect(this.windowConfirm).to.be.calledWith("You must enter value in MSISDN")
    
          })
      }
    
    })
   cy.fixture(SubMob).then((user) => {
    var SubMob1 = user.subscriberMobile
    
   cashincashoutPage.getMSISDN().type(SubMob1)
  })
  cashincashoutPage.getAmount().type(CashInAmount)
  //cashincashoutPage.getPaymentID().type(PaymentID)
  })

  And('Enter all Mandatory details CashOut',function(){
    cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
      const $body = $iframe.contents().find('body')
      const $win = $iframe[0].contentWindow
    
      const stub = cy.stub()
      if (cy.stub($win, 'alert', () => false)
        .as('windowConfirm')) {
    
      }
    
      else {
        cy.stub($win.console, 'log').as('consoleLog')
        cy.wrap($body)
          .find('input[name="amount"]').click({ force: true })
          .should(function () {
    
            expect(this.windowConfirm).to.be.calledWith("You must enter value in MSISDN")
    
          })
      }
    
    })
   cy.fixture(SubMob).then((user) => {
    var SubMob1 = user.subscriberMobile
    
   cashincashoutPage.getMSISDN().type(SubMob1)
  })
  cashincashoutPage.getAmount().type(CashOutAmont)
  //cashincashoutPage.getPaymentID().type(PaymentID1)
  })
  
  Then('Click on Submit and Click on Confirm Button',function(){
    cashincashoutPage.getSubmitButton().click()
    cy.wait(3000)
    cashincashoutPage.getConfirmButton().click()
    cy.wait(5000)
    churnManagementPage.getChurnInitiationMessage().then((al => {
      let q = al.text()
      cy.log(q)
      let a = q.split(':')
      let b = a[1].trim()
      cy.log(b)
    
      cy.writeFile(CashIO,{cashinTransactionID:b} )
    }))
    cy.readFile(CashIO).then((data)=>{
      let Msg = data.cashinTransactionID
      churnManagementPage.getChurnInitiationMessage().should('have.text',this.data003.cashInSucsessMsg+Msg)
      cy.wait(2000)
    })
  })

  Then('Click on Submit and Click on Confirm Button for cashout',function(){
    cashincashoutPage.getSubmitButton1().click()
    cy.wait(3000)
    cashincashoutPage.getConfirmButton().click()
    cy.wait(5000)
    churnManagementPage.getChurnInitiationMessage().then((al => {
      let q = al.text()
      cy.log(q)
      let a = q.split(':')
      let b = a[1].trim()
      cy.log(b)
    
    cy.readFile(CashIO).then((data)=>{
      data.cashoutTransactionID=b
      cy.writeFile(CashIO,data)
      let Msg = data.cashoutTransactionID
      churnManagementPage.getChurnInitiationMessage().should('have.text',this.data003.cashOutMsg+Msg)
      cy.wait(2000)
    })
  }))
  })

  Then('Assert that Transaction is done Successfully',function(){
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.fixture(SubMob).then((user) => {
    var SubMob1 = user.subscriberMobile
    manageUsersPage.getSearchUser().type(SubMob1, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })
  manageUsersPage.getEyeIcon().click({ force: true })
  manageUsersPage.getexpandmore().click({ force: true })
  manageUsersPage.getwallet().click({ force: true })
  cy.wait(3000)
  cy.readFile(CashIO).then((data) => {
    const TransactionID = data.cashinTransactionID
    cy.log(TransactionID)
    manageUsersPage.getSearchTransactionId().type(TransactionID)
    manageUsersPage.getserachicon().click({ force: true })
  })
  cy.wait(3000)
  manageUsersPage.getSucess().should('have.text',' Success')
  })






