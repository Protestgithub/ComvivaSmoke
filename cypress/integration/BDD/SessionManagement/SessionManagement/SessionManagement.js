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
});


//----------------Test Scripts---------------------------------------------------------------

//----------------Launch Mobiquity Portal URL and Login--------------------------------------
Given('Login into Mobiquity Portal as System admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as Subscriber', function () {
  cy.visit("http://ec2-35-161-219-222.us-west-2.compute.amazonaws.com/dfscontainer/#/subscriber")
  cy.visit("http://ec2-35-161-219-222.us-west-2.compute.amazonaws.com/dfscontainer/#/subscriber")
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
  cy.visit("http://ec2-35-161-219-222.us-west-2.compute.amazonaws.com/dfscontainer/#/subscriber")
  cy.visit("http://ec2-35-161-219-222.us-west-2.compute.amazonaws.com/dfscontainer/#/subscriber")
  cy.wait(3000)
  cy.intercept('http://ec2-35-161-219-222.us-west-2.compute.amazonaws.com/mobiquitypay/ums/v3/user/auth/web/login').as('getPwd')
  cy.readFile('cypress/fixtures/userData/subscriberReg.json').then((data)=>{
    var SubLogin
    SubLogin = data.subscriberLoginId
    cy.login(SubLogin, this.data.subscriber.subpwd)  
  
  cy.wait(2000)
  cy.wait('@getPwd').then((interception) => {
    let response = interception.response.body
    const resValues = Object.values(response)
    const serviceRequestID = resValues[0]
    cy.log(serviceRequestID)
    let url1 = 'http://ec2-35-161-219-222.us-west-2.compute.amazonaws.com/otpservice/internal/genotp/'
    let getURL = url1.concat(serviceRequestID)
    cy.request({
      url: getURL,
      headers: {
        'Authorization': 'Basic YWRtaW46c2VjcmV0',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      let res1 = res.body
      const res3 = Object.values(res1)
      let OTP = res3[4]
      var OTPArr = Array.from({ length: 6 }, (v, k) => k + 1)
      cy.wrap(OTPArr).each((index) => {
        APIPage.getOTPDailogbox1().eq(index - 1).type(OTP[index - 1])
      })
      APIPage.getVerifybttn1().click()
    })
  })
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