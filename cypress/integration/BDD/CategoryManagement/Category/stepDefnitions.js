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

Given('Login into Mobiquity Portal as System admin Checker', function() {

    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.logindata.sysAdminC.sysAdminUser1, this.logindata.sysAdminC.sysAdminPwd1)
    cy.getLoginConfirmation(this.logindata.networkAdmin)

})

And('Click Category Management.',function(){
welcomePage.getCategoryManagementOption().click({force:true})
})
Then('Select Add Category.',function(){
    welcomePage.getAddCategory().click({force:true})
})
And('Enter Category Code and Category Name.',function(){
    cy.wait(2000)
    AddCategoryPage.getCategoryName().type(this.data4.CategoryData.categoryname,{force:true})
    AddCategoryPage.getCategoryCode().type(this.data4.CategoryData.categoryCode,{force:true})
})
Then('Select Domain and Parent Category.',function(){
    AddCategoryPage.getDomainName().select(this.data4.CategoryData.Domain,{force:true})
    AddCategoryPage.getParentCategory().select(this.data4.CategoryData.ParentCategory,{force:true})
})
And('Click on Submit & confirm button.',function(){
    AddCategoryPage.getCategorySubmit().click({force:true})
    cy.wait(2000)
    AddCategoryPage.getConfirmbttn().click({force:true})
})

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
    AddCategoryPage.getDomainName().select(this.data4.CategoryData.Domain,{force:true})
    AddCategoryPage.getParentCategory().select(this.data4.CategoryData.ParentCategory,{force:true})
    AddCategoryPage.getCategoryCode().type(this.data4.CategoryData.categoryCode,{force:true})
})
Then('Select the category that needs to be approved/rejected.',function(){
  AddCategoryPage.getApprovalCategory().click({force:true})  
})