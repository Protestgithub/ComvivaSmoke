/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';

import "../../../../support/commands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../support/pageObjects/UserManagement/manageUsers';
import DomainFieldspage from '../../../../support/pageObjects/DomainManagement/DomainFieldspage';

const domainPage = new DomainFieldspage()
const welcomePage = new homePage()
const uuid = () => Cypress._.random(1e2)
const uid = () => Cypress._.random(1e4)
const id = () => Cypress._.random(1e1)
var DomainName = uuid()
var code = uid()
var Category = id()

var DataFile ="cypress/fixtures/userData/Domain&CAT.json"

Before(() => {

    cy.fixture('login').then(function (data1) {
        this.data1 = data1;
    })
    cy.fixture('UserManagement').then(function (data2) {
        this.data2 = data2;
    })

    cy.fixture('Domain&CategoryManagement').then(function (data4) {
        this.data4 = data4;
    })


});

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
When('User Click on Domain Management >> Add Domain', function () {
    welcomePage.getDomainManagementOption().click()
})
And('Enter Domain Name and Domain Code.',function(){
  cy.wait(3000)
 domainPage.getDomainName().type(this.data4.domainData.domainName+DomainName,{force:true})
 cy.writeFile(DataFile,{Domainname:this.data4.domainData.domainName+DomainName})

 domainPage.getDomainCode().type(this.data4.domainData.domainCode+code,{force:true})
 cy.readFile(DataFile).then((data) => {
     data.DomainCode = this.data4.domainData.domainCode
     cy.writeFile(DataFile, data)
   })
 domainPage.getDomainCategories().type(Category,{force:true})
 cy.readFile(DataFile).then((data) => {
     data.CategoryNum = Category
     cy.writeFile(DataFile, data)
   })

})

//-------------------------------------Error-------------------------------------------

Then('Click on submit buttonn',function(){
 domainPage.getDomainSubmitbtn().click({force:true})
 cy.wait(2000)
// domainPage.getSUbMIT2().click({force:true})
 cy.wait(2000)
 domainPage.getErrormsg().should('have.text',this.data4.Errormsg)
})
