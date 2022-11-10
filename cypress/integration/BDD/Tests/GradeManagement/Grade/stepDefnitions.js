/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from '../../../../../support/pageObjects/homePage';

import "../../../../../support/commands";
import ModifyGrades from '../../../../../support/pageObjects/GradeManagement/ModifyGrades';
import DeleteGrades from '../../../../../support/pageObjects/GradeManagement/DeleteGrades';

const ModifyGradePage = new ModifyGrades()
const welcomePage = new homePage()
const DeleteGradesPage = new DeleteGrades()


Before(() => {

    cy.fixture('login').then(function (data1) {
        this.data1 = data1;
    })
    cy.fixture('UserManagement').then(function (data2) {
        this.data2 = data2;
    })

});

Given('Login into Mobiquity Portal as masteradmin Maker', function () {
    cy.wait(3000)
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.masterAdmin2.masterchckr1, this.data1.masterAdmin2.mstAdminPwd1)
    cy.wait(2000)
    cy.checkWelcomeText(this.data2.SuperAdminChecker)
})




//----------------------------Modify----------------------------------------


When('Click on User Profile Management >> Modify Grade', function () {
    welcomePage.getUserprofileManagementOption().click({ force: true })
    welcomePage.getModifyGrades().click({ force: true })
})

And('Do required changes.', function () {
    cy.wait(2000)
    cy.ModifyRecord()

})
And('Click on Modify.', function () {
    cy.wait(2000)
    ModifyGradePage.getModifybttn().click({ force: true })
})
And('Click on confirm button.', function () {
    cy.wait(4000)
    ModifyGradePage.getConfirmbttn().click({ force: true })
    cy.wait(4000)
})

//-----------------------------delete-----------------------------------------


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