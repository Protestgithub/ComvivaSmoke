
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
import AddGrades from '../../../../support/pageObjects/GradeManagement/AddGrades';
import ModifyGrades from '../../../../support/pageObjects/GradeManagement/ModifyGrades';
import DeleteGrades from '../../../../support/pageObjects/GradeManagement/DeleteGrades';

const AddGradePage = new AddGrades()
const ModifyGradePage = new ModifyGrades()
const welcomePage = new homePage ()
const DeleteGradesPage = new DeleteGrades()

let GradeCode
Before(() => {      
   
    cy.fixture('login').then(function(data1)
    {
        this.data1 = data1;
    })
    cy.fixture('UserManagement').then(function(data2)
   {
       this.data2 = data2;
   })
   
     cy.fixture('GradeManagement').then(function(data01)
     {
         this.data01 = data01;
     })
    
     
  });

  Given('Login into Mobiquity Portal as masteradmin Maker', function(){
    cy.wait(3000)
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.masterAdmin2.masterchckr1, this.data1.masterAdmin2.mstAdminPwd1)
    cy.wait(2000)
    cy.checkWelcomeText(this.data2.SuperAdminChecker)
  })

  When('Click on User Profile Management >> Add Grade',function(){
   welcomePage.getUserprofileManagementOption().click({force:true})
   welcomePage.getADDGrades().click({force:true})

  })
 And('Select the domain & category for which grade needs to be added.',function(){
    const uuid = () => Cypress._.random(1e4)
    GradeCode = uuid()
    cy.wait(2000)
      AddGradePage.getAddbttn().click({force:true})
      cy.wait(2000)
      AddGradePage.getDomainName().select(this.data01.AddGrades.domainName,{force:true})
      AddGradePage.getCatergoryName().select(this.data01.AddGrades.categoryname,{force:true})


      AddGradePage.getgradeCode().type(GradeCode,{force:true})
      cy.RandomName()
      AddGradePage.getSavebttn().click({force:true})

      cy.wait(2000)
      AddGradePage.getConfirmbttn().click({force:true})

})


//----------------------------Modify----------------------------------------


 When('Click on User Profile Management >> Modify Grade',function(){
    welcomePage.getUserprofileManagementOption().click({force:true})
    welcomePage.getModifyGrades().click({force:true})
})

And('Do required changes.',function(){
    cy.wait(2000)
   // ModifyGradePage.getModifyRecord()
   cy.ModifyRecord()
  //  ModifyGradePage.getFirstData().type(this.data01.ModifyGrade.Firstdata,{force:true})
    
})
And('Click on Modify.',function(){
    cy.wait(2000)
    ModifyGradePage.getModifybttn().click({force:true})
})
And('Click on confirm button.',function(){
    cy.wait(2000)
    ModifyGradePage.getConfirmbttn().click({force:true})
    cy.wait(2000)
    ModifyGradePage.getsuccessMsg().should('have.text',this.data01.sucessModify)
})

//-----------------------------delete-----------------------------------------
And('logout the user',function(){

    welcomePage.getProfileIcon().click()
    cy.wait(2000)
    welcomePage.getLogOutbttn().click()
    cy.wait(2000)
      welcomePage.getLogOutYesbttn().click()
  })

When('Click on User Profile Management >> Delete Grade',function(){
    welcomePage.getUserprofileManagementOption().click({force:true})
    welcomePage.getDeleteGrades().click({force:true})
    cy.wait(2000)
    DeleteGradesPage.getDeleteRecord()
    DeleteGradesPage.getDeleteBttn().click({force:true})
    cy.wait(2000)
    DeleteGradesPage.getDeleteConfirm().click({force:true})
    cy.wait(2000)
    
})