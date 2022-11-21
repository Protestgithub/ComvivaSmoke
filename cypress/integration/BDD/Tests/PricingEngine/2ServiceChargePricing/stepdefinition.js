/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
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
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})


//------------------------------------Pricing Engine--------------------------------------------------
//-----------TC_33------------------Service Charge Calcultor-----------------------------------------
When('Click on Pricing Engine', function () {
  welcomePage.getPricingEngineLink().click({ force: true })
})



//------TC_34---------------------Set Status of service Policy----------------------------------------------

And('Click on the Service Policy', function () {
  cy.wait(2000)
  pricingEnginePage.getCashIN().should('be.visible').click({ force: true })
  cy.wait(4000)
})
Then('Set Status Active or Inactive', function () {
  cy.wait(2000)
  pricingEnginePage.getActiveOrInactive().click({ force: true })
  pricingEnginePage.getActiveOrInactive().click({ force: true })
})

//-----TC_35---------------------------Search For service policy Rules------------------------------------------
And('Click on the Search Tab & Search by Rule Name', function () {
  cy.wait(3000)
  cy.readFile(fileis).then((data) => {
    let RuleName = data.ServiceRuleName
    pricingEnginePage.getSearchTab().type(RuleName)
  })
  cy.wait(2000)
  pricingEnginePage.getSearchButton().click({ force: true })
})
Then('Verify Search results should give the list of rule name with Condition,status,Validity,rule & Policytype', function () {
  cy.readFile(fileis).then((data) => {
    let RuleName = data.ServiceRuleName
    pricingEnginePage.getRuleName1().should('contain.text', RuleName)
  })
  pricingEnginePage.getRule().then(data => {
    let rule = data.text()
    cy.log(rule)
  })
  pricingEnginePage.getPolicy().then(data => {
    let policy = data.text()
    cy.log(policy)
  })
  pricingEnginePage.getStatus().then(data => {
    let status = data.text()
    cy.log(status)
  })
  pricingEnginePage.getValidity().then(data => {
    let validity = data.text()
    cy.log(validity)
  })

})

//-------TC_36----------------------------------------------------------------------------------------------


Then('Click on View Previous Version Link, Enter available Ver no and Proceed to View the details', function () {
  cy.wait(4000)
  pricingEnginePage.getPolicyVersionLink().eq(1).click({ force: true })
  pricingEnginePage.getCurrentPolicyVersion().then(data => {
    let policyVersion = data.text()
    cy.log(policyVersion)
    let previousPolicyVersion = policyVersion - 1
    cy.log(previousPolicyVersion)
    pricingEnginePage.getPolicyVersionInPut().type(previousPolicyVersion, { force: true })
    cy.wait(2000)
    pricingEnginePage.getProceedButton().click()
    cy.wait(2000)
    pricingEnginePage.getPolicyVersionLink().should('contain.text', previousPolicyVersion)
  })
})

And('Click on any service to add service charge.', function () {
  const uuid = () => Cypress._.random(1e2)
  var number = "3" + uuid()
  const uuidone = () => Cypress._.random(1e3)
  var numberone = "8" + uuidone()
  cy.wait(4000)
  pricingEnginePage.getAddNewRuleBtn().click()
  cy.wait(3000)
  var nameone = getRandomName()
  pricingEnginePage.getRuleName().type(nameone, { force: true })
  cy.wait(5000)
  pricingEnginePage.getMinCharge().type(number)
  pricingEnginePage.getMaxCharge().type(numberone)
  pricingEnginePage.getDatePickerStart().dblclick({ force: true })
  cy.wait(2000)
  pricingEnginePage.getCalanderStart().should('be.visible', { force: true })
  pricingEnginePage.getCurrentDateSelect().click({ force: true })
  pricingEnginePage.getDatePickerEnd().dblclick({ force: true })
  cy.wait(2000)
  Cypress._.times(4, () => {
    pricingEnginePage.getnextmonth().click()
  })
  pricingEnginePage.getCurrentDateSelect().click({ force: true })
  pricingEnginePage.getWhoPays().select(this.data5.WhoPays, { force: true })
  pricingEnginePage.getSVAType().select(this.data5.SenderSVAtype, { force: true })
  pricingEnginePage.getWhomeToPay().select(this.data5.WhomeToPay, { force: true })
  pricingEnginePage.getChargeStatmentPricing().click({ force: true })
  pricingEnginePage.getPricingPercntage().type(number)
  pricingEnginePage.getPricingFixedAmt().type(numberone)
  cy.wait(5000)
  pricingEnginePage.getSaveDraftBtn().trigger('mouseover').click({ force: true })
  cy.wait(5000)
  pricingEnginePage.getSubmitClickBtn().click({ force: true })
  cy.wait(3000)
  pricingEnginePage.getSubmitBtn().click({ force: true })
  cy.wait(5000)
  pricingEnginePage.getServiceHeader().should('have.text', this.data5.textmsg)
})


//--------TC_37-----------------------------------------------------------------------------------------


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
  pricingEnginePage.getCurrentDateSelect().click({ force: true })
  pricingEnginePage.getWhoPays().select(this.data5.WhoPays, { force: true })
  pricingEnginePage.getSVAType().select(this.data5.SenderSVAtype, { force: true })
  pricingEnginePage.getWhomeToPay().select(this.data5.WhomeToPay, { force: true })
  pricingEnginePage.getChargeStatmentPricing().click({ force: true })
  pricingEnginePage.getPricingPercntage().type(this.data5.Percentage)
  pricingEnginePage.getPricingFixedAmt().type(this.data5.FixedAmt)
  pricingEnginePage.getSaveDraftBtn().trigger('mouseover').click()
  pricingEnginePage.getSavedDraftPageTitle().scrollIntoView().should('contain.text', this.data5.pageTitle)
})
Then('Check if user is able to view the saved draft', function () {
  cy.wait(2000)
  cy.readFile(fileis).then((data) => {
    let RuleName = data.ServiceRuleName1
    pricingEnginePage.getRuleName2().should('contain.text', RuleName)
  })
})

//-------TC_39---------------------------------CLONE----------------------------------------------------------

And('Click on Existing Service Policy Rule edit and save', function () {
  cy.wait(2000)
  pricingEnginePage.getPolicyName().eq(0).click({ force: true })
  pricingEnginePage.getPricingPercntage().type(this.data5.editPercentage)
  pricingEnginePage.getPricingFixedAmt().type(this.data5.editFixedAmt)
  pricingEnginePage.getSaveDraftBtn().trigger('mouseover').click()
})

Then('clone the edited Service Policy Rule with other service Policy', function () {
  pricingEnginePage.getCloneButton().eq(0).click({ force: true })
  pricingEnginePage.getCloneService().contains('Cash Out').click({ force: true })
  pricingEnginePage.getCloneButton1().click({ force: true })
  cy.wait(2000)
  pricingEnginePage.getPolicyName().eq(0).should('contain.text', 'Cloned', { force: true })
})
//--------------------------------------------------------------------------------------



//----------------------------Arpitha Pricing EEngine TestCases------------------------------------

//----------------------------------------------Tc-30-------------------------------------------------
var fileis = 'cypress/fixtures/userData/Aservice.json'
//----------------------------------------------Tc-30-------------------------------------------------
And('Click on any service to add service charge.', function () {
  const uuid = () => Cypress._.random(1e2)
  var number = "3" + uuid()
  const uuidone = () => Cypress._.random(1e3)
  var numberone = "8" + uuidone()
  cy.wait(4000)
  pricingEnginePage.getAddNewRuleBtn().click()
  cy.wait(3000)
  var nameone = getRandomName()
  pricingEnginePage.getRuleName().type(nameone, { force: true })
  cy.wait(5000)
  cy.writeFile(fileis, { ServiceRuleName: nameone })
  cy.wait(5000)
  pricingEnginePage.getMinCharge().type(number)
  pricingEnginePage.getMaxCharge().type(numberone)
  pricingEnginePage.getDatePickerStart().dblclick({ force: true })
  cy.wait(2000)
  pricingEnginePage.getCalanderStart().should('be.visible', { force: true })
  pricingEnginePage.getCurrentDateSelect().click({ force: true })
  pricingEnginePage.getDatePickerEnd().dblclick({ force: true })
  cy.wait(2000)
  Cypress._.times(4, () => {
    pricingEnginePage.getnextmonth().click()
  })
  pricingEnginePage.getCurrentDateSelect().click({ force: true })
  pricingEnginePage.getWhoPays().select(this.data5.WhoPays, { force: true })
  pricingEnginePage.getSVAType().select(this.data5.SenderSVAtype, { force: true })
  pricingEnginePage.getWhomeToPay().select(this.data5.WhomeToPay, { force: true })
  pricingEnginePage.getChargeStatmentPricing().click({ force: true })
  pricingEnginePage.getPricingPercntage().type(number)
  pricingEnginePage.getPricingFixedAmt().type(numberone)
  cy.wait(5000)
  pricingEnginePage.getSaveDraftBtn().trigger('mouseover').click({ force: true })
  cy.wait(5000)
  pricingEnginePage.getSubmitClickBtn().click({ force: true })
  cy.wait(3000)
  pricingEnginePage.getSubmitBtn().click({ force: true })
  cy.wait(5000)
  pricingEnginePage.getServiceHeader().should('have.text', this.data5.textmsg)
})
