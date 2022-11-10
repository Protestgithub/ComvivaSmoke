/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';


import "../../../../../support/commands";
import securityQuestion from '../../../../../support/pageObjects/SecurityQuestion/securityQuestion';
import "../../../../../support/SecurityQuestionCommands";
import { recurse } from 'cypress-recurse';

//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const securityPage = new securityQuestion()
var q1, q3
const SecurityQuetion = 'cypress/fixtures/securitys.json'


//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {

  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })

  cy.fixture('SecurityAssertion').then(function (data3) {
    this.data3 = data3;
  })


});

//----------------Test Scripts---------------------------------------------------------------

//-------TC112---To verify that master/network Admin can add security questions in the mobiquity System--------------

//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})


When('Navigate to security and click on security questions', function () {
  securityPage.getSecurityQuestionOption().scrollIntoView()
  securityPage.getSecurityQuestionOption().click()
  securityPage.getSecurityOption().click()
})

And('User click on add questions and Enter question in the textbox', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  securityPage.getAddQuestion().click({ force: true })
  cy.RandomQuestions()
  recurse(
    () => cy.RandomQuestions(),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == securityPage.getProfileNameExist().contains
      (this.data3.questionpresent).should('be.visible')
  )
})

And('User click on Add', function () {
  pageLogin.getiFrame()
  securityPage.getAddButton().click({ force: true })
})

Then('User click on save', function () {
  pageLogin.getiFrame()
  securityPage.getConfirmButton().click({ force: true })
  securityPage.getMessage().contains(this.data3.addquestion)
  securityPage.getDoneButton().click({ force: true })

})


//--------TC113---To verify that master/network Admin is not able to add duplicate question-------------------------

//............Navigate to security and click on security questions...............

When('Navigate to security and click on security questions', function () {
  securityPage.getSecurityQuestionOption().scrollIntoView()
  securityPage.getSecurityQuestionOption().click()
  securityPage.getSecurityOption().click()
})

And('User click on add questions and question is already existing', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  securityPage.getAddQuestion().click({ force: true })
  cy.readFile(SecurityQuetion).then((data) => {
    q1 = data.SecurityQuestion1
    securityPage.getSearchBox().type(q1, { force: true })
  })


})

And('User click on Add Button', function () {
  pageLogin.getiFrame()
  securityPage.getAddButton().click({ force: true })
})

Then('User click on save Button', function () {
  pageLogin.getiFrame()
  securityPage.getConfirmButton().click({ force: true })
  securityPage.getMessage().contains(this.data3.questionpresent)
  securityPage.getDoneButton().click({ force: true })
})



//----------TC114---To verify that security question which are added by the user will be added in default system language----------------

When('Navigate to security and click on security questions', function () {
  securityPage.getSecurityQuestionOption().scrollIntoView()
  securityPage.getSecurityQuestionOption().click()
  securityPage.getSecurityOption().click()
})

And('User click on add questions button and Enter question in the textbox', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  securityPage.getAddQuestion().click({ force: true })
  securityPage.getDefaultSystemLanguage().should('be.disabled')
  cy.RandomQuestion()
  recurse(
    () => cy.RandomQuestion(),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == securityPage.getProfileNameExist().contains
      (this.data3.questionpresent).should('be.visible'),
  )
})

And('User click on Button Add', function () {
  pageLogin.getiFrame()
  securityPage.getAddButton().click({ force: true })
})

Then('User click on Button save', function () {
  pageLogin.getiFrame()
  securityPage.getConfirmButton().click({ force: true })
  securityPage.getMessage().contains(this.data3.addquestion)
  securityPage.getDoneButton().click({ force: true })
})

//------TC115----To verify that if other language is selected while adding the security question then it is mandatory to add question in other language also---------------

When('Navigate to security and click on security questions', function () {
  securityPage.getSecurityQuestionOption().scrollIntoView()
  securityPage.getSecurityQuestionOption().click()
  securityPage.getSecurityOption().click()
})

And('User click on add questions Button', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  securityPage.getAddQuestion().click({ force: true })
  cy.RandomQuestion2()
  recurse(
    () => cy.RandomQuestion2(),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == securityPage.getProfileNameExist().contains
      (this.data3.questionpresent).should('be.visible'),
  )
})

And('User click on other language and enter the questions other language in question textbox', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  securityPage.getAddLanguage().click({ force: true })
  cy.wait(2000)
  securityPage.getLanguageDropDowns().select(this.data3.languages.language1, { force: true })
  cy.readFile(SecurityQuetion).then((data) => {
    q3 = data.SecurityQuestion3
    securityPage.getOtherLanguageQuestion().type(q3, { force: true })
  })

})

And('Click on add Button', function () {
  pageLogin.getiFrame()
  securityPage.getAdd().click({ force: true })
})

Then('Click on Confirm Button', function () {
  pageLogin.getiFrame()
  securityPage.getConfirm().click({ force: true })
  securityPage.getOtherLanguageSuccess().contains(this.data3.addquestion)
  securityPage.getDoneOtherLanguage().click({ force: true })
})
//--------------Security Question END-------------------------------------------------------------------------------
