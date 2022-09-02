/// <reference types="Cypress" />

/// <reference types = "Cypress-iframe"/>



//-------------------------------Imports---------------------------------------------------------------------

import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import RegulatoryProfile from '../../../../../support/pageObjects/UserManagement/RegulatoryProfile';
import MarketingProfile from '../../../../../support/pageObjects/UserManagement/MarketingProfile';

//import { when } from 'cypress/types/jquery';

//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()

const RegulatoryProfile1 = new RegulatoryProfile()

const MarketingProfile1 = new MarketingProfile()

const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
var RegulatoryFile = 'userData/Regulatory&MarketingProfile.json'



//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data) {
    this.data = data;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })

});


//----------------Test Scripts---------------------------------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------

//------------------------------  REGULATORY PROFILE--------------------------------------------


And('Under Actions tab click on Modify Regulatory Profile icon and Enter Profile Name', function () {
  cy.fixture(RegulatoryFile).then((user) => {
    var RPCode = user.RegulatoryProfileCode
    cy.log(RPCode)
    RegulatoryProfile1.getRPSearchProfileCode().type(RPCode)
  })
    RegulatoryProfile1.getRegulatoryProfileSearchbtn().click()
  cy.wait(3000)
  RegulatoryProfile1.getmodifyregulatoryprofile().eq(0).click({ force: true })
  RegulatoryProfile1.getregulatoryprofilename().clear()
  cy.RPRandomName1()

})

Then('Click On Save Modified Regulatory Profile', function () {

  RegulatoryProfile1.getmodifyregulatoryprofilesavebtn().click()
  cy.wait(3000)
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Sucess)
})

Then('Enter detail to seach in textbox and click search', function () {

  cy.fixture(RegulatoryFile).then((user) => {
    var RPCode = user.RegulatoryProfileCode
    cy.log(RPCode)
    RegulatoryProfile1.getRPSearchProfileCode().type(RPCode)
  })
  RegulatoryProfile1.getRegulatoryProfileSearchbtn().click()
})


And('Enter detail to search in textbox and click search', function () {

  cy.fixture(RegulatoryFile).then((user) => {
    var MPCode = user.MarketingProfileCode
    cy.log(MPCode)
    RegulatoryProfile1.getRPSearchProfileCode().type(MPCode)
  })
    MarketingProfile1.getsearchbtn().click()
})
