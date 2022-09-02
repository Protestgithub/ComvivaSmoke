/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And,Before} from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';

import "../../../../../support/commands";
import BankManagement from '../../../../../support/pageObjects/BankManagement';
import 'cypress-file-upload'
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import DomainFieldspage from '../../../../../support/pageObjects/DomainManagement/DomainFieldspage';
import "../../../../../support/authourizationcommands"
import authorizationManagement from '../../../../../support/pageObjects/AuthorizationProfileManagement/authorizationManagement';
import AddCategory from '../../../../../support/pageObjects/CategoryManagement/AddCategory';
import AddGrades from '../../../../../support/pageObjects/GradeManagement/AddGrades';


//----------------Object Declaration----------------------------------------------------------
const AddCategoryPage = new AddCategory()
const AddGradePage = new AddGrades()
var Gradedata = "cypress/fixtures/userData/Gradedata.json"
var DataFile = "cypress/fixtures/userData/Domain&CAT.json"
let GradeCode
var name
const pageLogin = new loginPage()
const welcomePage = new homePage()
const domainPage = new DomainFieldspage()
const uuid = () => Cypress._.random(1e4)
const uid = () => Cypress._.random(1e5)
const id = () => Cypress._.random(1e2)
var DomainName = uuid()
var code = uid()
var Category = id()



//----------------BDD Hooks-----------------------------------------------------------------
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
  if (Cypress.browser.isHeadless) {
    cy.clearCookie('shouldStop')
  } else {
    cy.getCookie('shouldStop').then(cookie => {
      if (
        cookie &&
        typeof cookie === 'object' &&
        cookie.value === 'true'
      ) {
        Cypress.runner.stop();
      }
    })
  }

});

//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
//----------------------------------------Domain Creation---------------------------------------------

When('User Click on Domain Management >> Add Domain', function () {
  welcomePage.getDomainManagementOption().click()
})
And('Enter Domain Name and Domain Code.', function () {
  cy.wait(3000)
  domainPage.getDomainName().type(this.data4.domainData.domainName + DomainName, { force: true })
  cy.writeFile(DataFile, { Domainname: this.data4.domainData.domainName + DomainName })
  domainPage.getDomainCode().type(code, { force: true })
  cy.readFile(DataFile).then((data) => {
    data.DomainCode = code
    cy.writeFile(DataFile, data)
  })
  domainPage.getDomainCategories().type(Category, { force: true })
  cy.readFile(DataFile).then((data) => {
    data.CategoryNum = Category
    cy.writeFile(DataFile, data)
  })

})
Then('Click on submit button.', function () {
  domainPage.getDomainSubmitbtn().click({ force: true })
  cy.wait(2000)
  domainPage.getSUbMIT2().click({ force: true })
  cy.wait(2000)
})




And('Click Category Management.', function () {
  welcomePage.getCategoryManagementOption().click({ force: true })
})
Then('Select Add Category.', function () {
  welcomePage.getAddCategory().click({ force: true })
})
And('Enter Category Code and Category Name.', function () {
  cy.wait(2000)
  cy.readFile(DataFile).then((data) => {
    var CatNam = data.Domainname
    AddCategoryPage.getCategoryName().type(CatNam, { force: true })
    data.CategoryName = CatNam
    cy.writeFile(DataFile, data)
  })
  cy.readFile(DataFile).then((data) => {
    var Catcode = data.DomainCode
    AddCategoryPage.getCategoryCode().type(Catcode, { force: true })
    data.CategoryCode = Catcode
    cy.writeFile(DataFile, data)
  })
})
Then('Select Domain and Parent Category.', function () {
  cy.wait(2000)
  cy.readFile(DataFile).then((data) => {
    var CatNam = data.Domainname
    AddCategoryPage.getDomainName().select(CatNam, { force: true })
    data.CategoryDomainName = CatNam
    cy.writeFile(DataFile, data)
  })
  cy.readFile(DataFile).then((data) => {
    var CatNam = data.Domainname
    AddCategoryPage.getParentCategory().select(CatNam, { force: true })
    data.ParentCategoryName = CatNam
    cy.writeFile(DataFile, data)
  })
})
And('Click on Submit & confirm button.', function () {
  AddCategoryPage.getCategorySubmit().click({ force: true })
  cy.wait(2000)
  AddCategoryPage.getConfirmbttn().click({ force: true })
})
//--------------------------------------Approval-----------------------------------------
And('logout the user', function () {

  welcomePage.getProfileIcon().click()
  cy.wait(2000)
  welcomePage.getLogOutbttn().click()
  cy.wait(2000)
  welcomePage.getLogOutYesbttn().click()
})
And('Click Add category approval.', function () {
  welcomePage.getCAtegoryApprovalOption().click({ force: true })
  cy.wait(2000)
  welcomePage.getCAtegoryApprovalOption().click({ force: true })
})
Then('Select Category approval.', function () {
  cy.wait(2000)
  cy.readFile(DataFile).then((data) => {
    var CatNam = data.Domainname
    AddCategoryPage.getDomainName().select(CatNam, { force: true })
    data.CategoryDomainName = CatNam
    cy.writeFile(DataFile, data)
  })
  cy.readFile(DataFile).then((data) => {
    var CatNam = data.Domainname
    AddCategoryPage.getParentCategory().select(CatNam, { force: true })
    data.ParentCategoryName = CatNam
    cy.writeFile(DataFile, data)
  })
  cy.readFile(DataFile).then((data) => {
    var Catcode = data.CategoryName
    AddCategoryPage.getCategoryCode().select(Catcode, { force: true })
    data.CategoryCode = Catcode
    cy.writeFile(DataFile, data)
  })
  //  cy.iframe().find("#newCategoryCode").type(this.data4.CategoryData.categoryname,{force:true})

})
Then('Select the category that needs to be approved', function () {
  AddCategoryPage.getApprovalCategory().click({ force: true })
  cy.wait(3000)
  AddCategoryPage.getAllCheckBox()
  cy.wait(3000)
  AddCategoryPage.getAllCheckBox()
  cy.wait(3000)
  AddCategoryPage.getAllCheckBox()

  cy.wait(3000)
  AddCategoryPage.getFinalSubmit()
  cy.wait(5000)
})



//-----------------------------------------Grade Creation------------------------------------------

When('Click on User Profile Management >> Add Grade', function () {
  welcomePage.getUserprofileManagementOption().click({ force: true })
  welcomePage.getADDGrades().click({ force: true })

})
And('Select the domain & category for which grade needs to be added.', function () {
  const uuid = () => Cypress._.random(1e4)
  GradeCode = uuid()
  cy.wait(2000)

  AddGradePage.getAddbttn().click({ force: true })
  cy.wait(2000)
  cy.GradeName()

  cy.readFile(DataFile).then((data) => {
    var CatNam = data.Domainname
    AddGradePage.getDomainName().select(CatNam, { force: true })

    cy.readFile(Gradedata).then((grade) => {
      grade.DomainName = CatNam
      cy.writeFile(Gradedata, grade)

    })
  })

  cy.readFile(DataFile).then((data) => {
    var CatNam = data.Domainname
    AddGradePage.getCatergoryName().select(CatNam, { force: true })

    cy.readFile(Gradedata).then((grade) => {
      grade.CategoryName = CatNam
      cy.writeFile(Gradedata, grade)

    })
  })


  AddGradePage.getgradeCode().type(GradeCode, { force: true })
  cy.readFile(Gradedata).then((data) => {
    data.GradeCode = GradeCode
    cy.writeFile(Gradedata, data)
  })
  AddGradePage.getSavebttn().click({ force: true })
  cy.wait(2000)
  AddGradePage.getConfirmbttn().click({ force: true })
  cy.wait(2000)
})    
