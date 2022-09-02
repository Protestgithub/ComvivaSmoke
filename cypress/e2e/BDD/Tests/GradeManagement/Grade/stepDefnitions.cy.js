/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';

import "../../../../../support/commands";
import AddGrades from '../../../../../support/pageObjects/GradeManagement/AddGrades';
import ModifyGrades from '../../../../../support/pageObjects/GradeManagement/ModifyGrades';
import DeleteGrades from '../../../../../support/pageObjects/GradeManagement/DeleteGrades';

const AddGradePage = new AddGrades()
const ModifyGradePage = new ModifyGrades()
const welcomePage = new homePage()
const DeleteGradesPage = new DeleteGrades()

var DataFile = "cypress/fixtures/userData/Domain&CAT.json"
var Gradedata = "cypress/fixtures/userData/Gradedata.json"


Before(() => {

    cy.fixture('login').then(function (data1) {
        this.data1 = data1;
    })
    cy.fixture('UserManagement').then(function (data2) {
        this.data2 = data2;
    })

});



//----------------------------Modify----------------------------------------


When('Click on User Profile Management >> Modify Grade', function () {
    welcomePage.getUserprofileManagementOption().click({ force: true })
    welcomePage.getModifyGrades().click({ force: true })
})

And('Do required changes.', function () {
    cy.wait(2000)
    // ModifyGradePage.getModifyRecord()
    cy.ModifyRecord()
    //  ModifyGradePage.getFirstData().type(this.data01.ModifyGrade.Firstdata,{force:true})

})
And('Click on Modify.', function () {
    cy.wait(2000)
    ModifyGradePage.getModifybttn().click({ force: true })
})
And('Click on confirm button for grade modification', function () {
    cy.wait(2000)
    ModifyGradePage.getConfirmbttn().click({ force: true })
    cy.wait(2000)
  //  ModifyGradePage.getsuccessMsg().should('have.text', this.data01.sucessModify)
})

//-----------------------------delete-----------------------------------------
And('logout the user', function () {

    welcomePage.getProfileIcon().click()
    cy.wait(2000)
    welcomePage.getLogOutbttn().click()
    cy.wait(2000)
    welcomePage.getLogOutYesbttn().click()
})

When('Click on User Profile Management >> Delete Grade', function () {
    welcomePage.getUserprofileManagementOption().click({ force: true })
    welcomePage.getDeleteGrades().click({ force: true })
    cy.wait(2000)
    DeleteGradesPage.getDeleteRecord()
    DeleteGradesPage.getDeleteBttn().click({ force: true })
    cy.wait(2000)
    DeleteGradesPage.getDeleteConfirm().click({ force: true })
    cy.wait(2000)

})