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
import AddCategory from '../../../../support/pageObjects/CategoryManagement/AddCategory';

const AddCategoryPage = new AddCategory()
const welcomePage = new homePage ()
var DataFile ="cypress/fixtures/userData/Domain&CAT.json"

Before(() => {      
   
    cy.fixture('login').then(function(data1)
    {
        this.data1 = data1;
    })
    cy.fixture('UserManagement').then(function(data2)
   {
       this.data2 = data2;
   })
   
     cy.fixture('Domain&CategoryManagement').then(function(data4)
     {
         this.data4 = data4;
     })
    
     
  });

Given('Login into Mobiquity Portal as System admin Maker', function(){
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
    cy.wait(2000)
    cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})

Given('Login into Mobiquity Portal as System admin Checker1', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.SysAdminlogin2()
    cy.wait(2000)
    cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
  

And('Click Category Management.',function(){
    welcomePage.getCategoryManagementOption().click({force:true})
    })
    Then('Select Add Category.',function(){
        welcomePage.getAddCategory().click({force:true})
    })
    And('Enter Category Code and Category Name.',function(){
        cy.wait(2000)
        cy.readFile(DataFile).then((data) => {
          var CatNam = data.Domainname
          AddCategoryPage.getCategoryName().type(CatNam,{force:true})
          data.CategoryName =CatNam
          cy.writeFile(DataFile, data)
        })
        cy.readFile(DataFile).then((data) => {
          var Catcode = data.DomainCode
          AddCategoryPage.getCategoryCode().type(Catcode,{force:true})
          data.CategoryCode =Catcode
          cy.writeFile(DataFile, data)
        })
    })
    Then('Select Domain and Parent Category.',function(){
        cy.wait(2000)
        cy.readFile(DataFile).then((data) => {
          var CatNam = data.Domainname
          AddCategoryPage.getDomainName().select(CatNam,{force:true})
          data.CategoryDomainName =CatNam
          cy.writeFile(DataFile, data)
        })
        cy.readFile(DataFile).then((data) => {
          var CatNam = data.Domainname
          AddCategoryPage.getParentCategory().select(CatNam,{force:true})
          data.ParentCategoryName =CatNam
          cy.writeFile(DataFile, data)
        })
    })
    And('Click on Submit & confirm button.',function(){
        AddCategoryPage.getCategorySubmit().click({force:true})
        cy.wait(2000)
        AddCategoryPage.getConfirmbttn().click({force:true})
    })
    //--------------------------------------Approval-----------------------------------------
    And('logout the user',function(){
    
        welcomePage.getProfileIcon().click()
        cy.wait(2000)
        welcomePage.getLogOutbttn().click()
        cy.wait(2000)
          welcomePage.getLogOutYesbttn().click()
      })
    And('Click Add category approval.',function(){
    welcomePage.getCAtegoryApprovalOption().click({force:true})
    })
    Then('Select Category approval.',function(){
        cy.wait(2000)
        cy.readFile(DataFile).then((data) => {
          var CatNam = data.Domainname
          AddCategoryPage.getDomainName().select(CatNam,{force:true})
          data.CategoryDomainName =CatNam
          cy.writeFile(DataFile, data)
        })
        cy.readFile(DataFile).then((data) => {
          var CatNam = data.Domainname
          AddCategoryPage.getParentCategory().select(CatNam,{force:true})
          data.ParentCategoryName =CatNam
          cy.writeFile(DataFile, data)
        })
        cy.readFile(DataFile).then((data) => {
          var Catcode = data.DomainCode
          AddCategoryPage.getCategoryCode().type(Catcode,{force:true})
          data.CategoryCode =Catcode
          cy.writeFile(DataFile, data)
        })
      //  cy.iframe().find("#newCategoryCode").type(this.data4.CategoryData.categoryname,{force:true})
    
    })
    Then('Select the category that needs to be approved',function(){
      AddCategoryPage.getApprovalCategory().click({force:true})  
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