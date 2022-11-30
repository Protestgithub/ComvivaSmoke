/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import 'cypress-file-upload'
import DomainFieldspage from '../../../../../support/pageObjects/DomainManagement/DomainFieldspage';
import "../../../../../support/authourizationcommands"
import AddCategory from '../../../../../support/pageObjects/CategoryManagement/AddCategory';
import AddGrades from '../../../../../support/pageObjects/GradeManagement/AddGrades';


//----------------Object Declaration----------------------------------------------------------
const AddCategoryPage = new AddCategory()
const AddGradePage = new AddGrades()
const welcomePage = new homePage()
const domainPage = new DomainFieldspage()
const uuid = () => Cypress._.random(1e4)
const uid = () => Cypress._.random(1e5)
const id = () => Cypress._.random(1e2)
const domain = ["AtmMachine", "Corporate", "Head Merchant", "Merchant", "Telco Operator", "Payment Gateway", "Agent", "Super Agent", "Biller", "Distributer"];
const domainName = getRandomDifferent(domain)


var DomainName = uuid()
var code = uid()
var Category = id()
var Gradedata = "cypress/fixtures/userData/Gradedata.json"
var DataFile = "cypress/fixtures/userData/Domain&CAT.json"
let GradeCode
//---------------------------------------------------------------------------------------

function getRandomDifferent(arr, last = undefined) {
  if (arr.length === 0) {
    return null;
  } else if (arr.length === 1) {
    return arr[0];
  } else {
    let num = 0;
    do {
      num = Math.floor(Math.random() * arr.length);
    } while (arr[num] === last);
    return arr[num];
  }
}

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
  cy.fixture('API/APIEndPoints.json').then(function(data20){
    this.data20 = data20;
  })
});

//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.fixture('userData/SystemAdminLogin.json').then((data)=>{
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.fixture('userData/SystemAdminLogin.json').then((data)=>{
    let Name = data.SysAdminChecker1Name
    cy.checkWelcomeText(Name)
  })
})
//----------------------------------------------------------------------------------------------------
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.superadminm, this.data1.masteradminmaker.superadminmPwd)
  cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
})
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.superadminc, this.data1.masteradminchecker.superadmincPwd)
  cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
})
//----------------------------------------Domain Creation---------------------------------------------

When('User Click on Domain Management >> Add Domain', function () {
  welcomePage.getDomainManagementOption().should('be.visible').click()
})
And('Enter Domain Name and Domain Code.', function () {
  let Name = domainName + DomainName
  cy.wait(4000)
  cy.waitUntil(()=>{
    return cy.iframe().find('#confirmAddDomain_viewDetail_domainName').type(Name, { force: true })
  })
  cy.readFile(DataFile).then((data)=>{
    data.Domainname = Name
    cy.writeFile(DataFile,data)
  })
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
  cy.intercept(this.data20.domainSubmit).as('getdomainsubmit')
  domainPage.getDomainSubmitbtn().click({ force: true })
  cy.wait('@getdomainsubmit')
  cy.intercept(this.data20.domainConfirm).as('getconfirm')
  cy.waitUntil(()=>{
    return cy.iframe().find('#confirmAddDomain_getNonFinancialSerForCat_button_submit').click({ force: true })
  })
  cy.wait('@getconfirm')
  cy.readFile(DataFile).then((data) => {
    let domain
    domain = data.Domainname
    cy.waitUntil(()=>{
      return cy.iframe().find('.actionMessage').should('be.visible').contains(domain + this.data4.Successmsg)
    })
  })
})
//-----------------------------------------------------------------------------------------

And('Click Category Management.', function () {
  welcomePage.getCategoryManagementOption().click({ force: true })
})
Then('Select Add Category.', function () {
  welcomePage.getAddCategory().click({ force: true })
})
And('Enter Category Code and Category Name.', function () {
  cy.wait(4000)
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
  cy.wait(3000)
  cy.intercept(this.data20.categorySubmit).as('getConfirm')
  AddCategoryPage.getConfirmbttn().click({ force: true })
  cy.wait('@getConfirm')
  domainPage.getSuccessMsg().contains(this.data4.Successmsg1)
})
//--------------------------------------Approval-----------------------------------------

And('Click Add category approval.', function () {
  welcomePage.getCAtegoryApprovalOption().click({ force: true })
  welcomePage.getCAtegoryApprovalOption().should('be.visible').click({ force: true })
})
Then('Select Category approval.', function () {
  cy.wait(4000)
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
})
Then('Select the category that needs to be approved', function () {
  AddCategoryPage.getApprovalCategory().click({ force: true })
  cy.wait(4000)
  AddCategoryPage.getAllCheckBox()
  AddCategoryPage.getAllCheckBox()
  AddCategoryPage.getAllCheckBox()
  cy.wait(4000)
  AddCategoryPage.getFinalSubmit()
})



//-----------------------------------------Grade Creation------------------------------------------

When('Click on User Profile Management >> Add Grade', function () {
  welcomePage.getUserprofileManagementOption().click({ force: true })
  welcomePage.getADDGrades().click({ force: true })
})
And('Select the domain & category for which grade needs to be added.', function () {
  const uuid = () => Cypress._.random(1e4)
  GradeCode = uuid()
  cy.wait(3000)
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

})


