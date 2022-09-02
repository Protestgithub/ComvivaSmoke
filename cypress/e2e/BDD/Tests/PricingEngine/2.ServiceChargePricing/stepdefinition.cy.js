/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import PricingEnginePage from '../../../../../support/pageObjects/PricingEngine/PricingEnginePage';

//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()
const pricingEnginePage = new PricingEnginePage()
var fileis = 'cypress/fixtures/userData/Aservice.json'

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('BankManagement').then(function (data3) {
    this.data3 = data3;
  })
  cy.fixture('PricingEngine').then(function (data5) {
    this.data5 = data5;
  })
  
  
});

var name
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}
//----------------------------------------POC - CODE-------------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------

//------------------------------------Pricing Engine--------------------------------------------------

And('Click on add new rule buttton,add New service charge and save the policy as draft', function () {
  cy.wait(4000)
  pricingEnginePage.getAddNewRuleBtn().click()

  pricingEnginePage.getRuleName().type(getRandomName(), { force: true })

  cy.readFile(fileis).then((data) => {
    data.ServiceRuleName1 = name
    cy.writeFile(fileis, data)
  })
  pricingEnginePage.getMinCharge().type(this.data5.MinCharge)
  pricingEnginePage.getMaxCharge().type(this.data5.MaxCharge)
  pricingEnginePage.getDatePickerStart().dblclick({ force: true })
  cy.wait(2000)
  pricingEnginePage.getCalanderStart().should('be.visible', { force: true })
  pricingEnginePage.getCurrentDateSelect().click({ force: true })
  pricingEnginePage.getDatePickerEnd().dblclick({ force: true })
  cy.wait(2000)
  Cypress._.times(4, () => {
    pricingEnginePage.getnextmonth().click()
  })
  //ERM.getvalidTo().click()
  //ERM.getnextyear().click()
  //ERM.getnextmonth().click()
  //ERM.getdates().click({force:true})
  //pricingEnginePage.getMonthNamerStart().contains(this.data5.month).click({ force: true })//(this.data5.month,{force: true}).click() 
  //pricingEnginePage.getYearNameStart().contains(this.data5.year).click({ force: true })
  pricingEnginePage.getCurrentDateSelect().click({ force: true })
  //pricingEnginePage.getCalanderDaysStart().filter(':visible').contains(Date).click()
  pricingEnginePage.getWhoPays().select(this.data5.WhoPays, { force: true })
  pricingEnginePage.getSVAType().select(this.data5.SenderSVAtype, { force: true })
  pricingEnginePage.getWhomeToPay().select(this.data5.WhomeToPay, { force: true })
  pricingEnginePage.getChargeStatmentPricing().click({ force: true })
  pricingEnginePage.getPricingPercntage().type(this.data5.Percentage)
  pricingEnginePage.getPricingFixedAmt().type(this.data5.FixedAmt)
  pricingEnginePage.getSaveDraftBtn().trigger('mouseover').click()
  pricingEnginePage.getSavedDraftPageTitle().scrollIntoView().should('contain.text', this.data5.pageTitle)
})
