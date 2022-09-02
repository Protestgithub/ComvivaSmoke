/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import Reconcilation from '../../../../../support/pageObjects/Reconcilation/Reconcilation';

//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const ReconPage = new Reconcilation()

Before(() => {
    cy.fixture('login').then(function (data1) {
        this.data1 = data1;

    })
    cy.fixture('UserManagement').then(function (data2) {
        this.data2 = data2;
    })

});


//---------------------------------------------System Admin Login----------------------------------------------------
  And('Click on Reconcilation', function () {
    welcomePage.getreconcilationpage().click({ force: true })
    cy.wait(4000)
    ReconPage.getcolumn().within(function () {
        cy.wait(2000)
        cy.getprovider()
    })
    ReconPage.getsubmit().click({ force: true })
    cy.wait(5000)
    pageLogin.getiFrame()      
    ReconPage.getmismatch().within(function(){
    ReconPage.getmismatchvalue().should("contain","No Mismatch found")
      }) 

})

