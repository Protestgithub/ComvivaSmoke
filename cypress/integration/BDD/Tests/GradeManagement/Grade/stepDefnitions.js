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
    cy.fixture('API/APIEndPoints').then(function (data20) {
        this.data20 = data20;
      })
});

//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.masteradminmaker.superadminm, this.data1.masteradminmaker.superadminmPwd)
    cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
  })
  
  //superadminc
  Given('Login into Mobiquity Portal as Super admin Checker', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.masteradminchecker.superadminc, this.data1.masteradminchecker.superadmincPwd)
    cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
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
    ModifyGradePage.getModifybttn().click({ force: true })
})
And('Click on confirm button.', function () {
    ModifyGradePage.getConfirmbttn().click({ force: true })
})

//-----------------------------delete-----------------------------------------
When('Click on User Profile Management >> Delete Grade', function () {
    welcomePage.getUserprofileManagementOption().click({ force: true })
    welcomePage.getDeleteGrades().click({ force: true })
    cy.wait(3000)
    DeleteGradesPage.getDeleteRecord()
    cy.intercept(this.data20.DeleteBttn).as('getdeletegd')
    DeleteGradesPage.getDeleteBttn().click({ force: true })
    cy.wait('@getdeletegd') 
    DeleteGradesPage.getDeleteConfirm().click({ force: true })
})