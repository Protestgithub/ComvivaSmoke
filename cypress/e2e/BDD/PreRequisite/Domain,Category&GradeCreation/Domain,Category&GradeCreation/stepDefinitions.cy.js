/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And,Before} from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/utils/Generic";
import 'cypress-file-upload'
import DomainFieldspage from '../../../../../support/pageObjects/DomainManagement/DomainFieldspage';
import "../../../../../support/utils/authourizationcommands";
import AddCategory from '../../../../../support/pageObjects/CategoryManagement/AddCategory';
import AddGrades from '../../../../../support/pageObjects/GradeManagement/AddGrades';

//----------------Object Declaration----------------------------------------------------------
const AddCategoryPage = new AddCategory()
const AddGradePage=new AddGrades()
var Gradedata = "cypress/fixtures/userData/Gradedata.json"
var DataFile = "cypress/fixtures/userData/Domain&CAT.json"
let GradeCode
const welcomePage = new homePage()
const domainPage = new DomainFieldspage()
const uuid = () => Cypress._.random(1e4)
const uid = () => Cypress._.random(1e5)
const id = () => Cypress._.random(1e2)
var DomainName = uuid()
var DomainName1 = uuid()
var code = uid()
var code1 = uid()
var Category = id()

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

const domain = ["AtmMachine","Corporate","Head Merchant","Merchant","Telco Operator","Payment Gateway","Agent","Super Agent","Biller","Distributer"];
const domainName = getRandomDifferent(domain)
const domainName1 = getRandomDifferent(domain)



//---------------------------------------------Login----------------------------------------------------
Given('Login into Mobiquity Portal as masteradmin Maker', function () {
  cy.wait(3000)
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masterAdmin2.masterchckr1, this.data1.masterAdmin2.mstAdminPwd1)
  cy.wait(2000)
  // cy.checkWelcomeText(this.data2.SuperAdminChecker)
})
//---------------------------------------------System Admin Login----------------------------------------------------
//----------------------------------------Domain Creation---------------------------------------------

When('User Click on Domain Management >> Add Domain', function () {
  welcomePage.getDomainManagementOption().click()
})
And('Enter Domain Name and Domain Code.', function () {
  cy.wait(3000)
  let Name = domainName + DomainName
  domainPage.getDomainName().type(Name, { force: true })
  cy.writeFile(DataFile, { Domainname: Name})
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
Then('Click on submit button in domain.', function () {
  domainPage.getDomainSubmitbtn().click({ force: true })
  cy.wait(2000)
  domainPage.getSUbMIT2().click({ force: true })
  cy.wait(2000)
  cy.readFile(DataFile).then((data) => {
    let domain
    domain =data.Domainname
    domainPage.getSuccessMsg().contains(domain+this.data4.Successmsg)
  })
  
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




Given('Login into Mobiquity Portal as Business admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.BAlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})

And('Enter Domain Name and Domain Code for BA', function () {
  cy.wait(3000)
  let Name = domainName1 + DomainName1
  domainPage.getDomainName().type(Name, { force: true })
  cy.readFile(DataFile).then((data)=>{
    data.BADomainname = domainName1 + DomainName1
    cy.writeFile(DataFile,data)
  })
  domainPage.getDomainCode().type(code1, { force: true })
  cy.readFile(DataFile).then((data) => {
    data.BADomainCode = code1
    cy.writeFile(DataFile, data)
  })
  domainPage.getDomainCategories().type(Category, { force: true })
  cy.readFile(DataFile).then((data) => {
    data.BACategoryNum = Category
    cy.writeFile(DataFile, data)
  })
})


Then('Click on submit button for BA', function () {
  domainPage.getDomainSubmitbtn().click({ force: true })
  cy.wait(2000)
  domainPage.getSUbMIT2().click({ force: true })
  cy.wait(2000)
  cy.readFile(DataFile).then((data) => {
    let domain
    domain =data.BADomainname
    domainPage.getSuccessMsg().contains(domain+this.data4.Successmsg)
  })
})




//////////////////////////////////////////////////////////////////////////////////////////////

And('Click Category Management in BA', function () {
  welcomePage.getCategoryManagement().click({ force: true })
})


And('Enter Category Code and Category Name for BA', function () {
  cy.wait(2000)
  cy.readFile(DataFile).then((data) => {
    var CatNam = data.BADomainname
    AddCategoryPage.getCategoryName().type(CatNam, { force: true })
    data.BACategoryName = CatNam
    cy.writeFile(DataFile, data)
  })
  cy.readFile(DataFile).then((data) => {
    var Catcode = data.BADomainCode
    AddCategoryPage.getCategoryCode().type(Catcode, { force: true })
    data.BACategoryCode = Catcode
    cy.writeFile(DataFile, data)
  })
})
Then('Select Domain and Parent Category for BA', function () {
  cy.wait(2000)
  cy.readFile(DataFile).then((data) => {
    var CatNam = data.BADomainname
    AddCategoryPage.getDomainName().select(CatNam, { force: true })
    data.BACategoryDomainName = CatNam
    cy.writeFile(DataFile, data)
  })
  cy.readFile(DataFile).then((data) => {
    var CatNam = data.BADomainname
    AddCategoryPage.getParentCategory().select(CatNam, { force: true })
    data.BAParentCategoryName = CatNam
    cy.writeFile(DataFile, data)
  })
})

Then('Select Category approval for BA', function () {
  cy.wait(4000)
  cy.readFile(DataFile).then((data) => {
    var CatNam = data.BADomainname
    AddCategoryPage.getDomainName().select(CatNam, { force: true })
    data.BACategoryDomainName = CatNam
    cy.writeFile(DataFile, data)
  })
  cy.readFile(DataFile).then((data) => {
    var CatNam = data.BADomainname
    AddCategoryPage.getParentCategory().select(CatNam, { force: true })
    data.BAParentCategoryName = CatNam
    cy.writeFile(DataFile, data)
  })
  cy.readFile(DataFile).then((data) => {
    var Catcode = data.BACategoryName
    AddCategoryPage.getCategoryCode().select(Catcode, { force: true })
    data.BACategoryCode = Catcode
    cy.writeFile(DataFile, data)
  })
  //  cy.iframe().find("#newCategoryCode").type(this.data4.CategoryData.categoryname,{force:true})

})


