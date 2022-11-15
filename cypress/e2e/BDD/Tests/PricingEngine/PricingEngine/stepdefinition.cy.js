/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------

import 'cypress-iframe'
import { Given, When, Then, And,Before} from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/utils/Generic";
import PricingEnginePage from '../../../../../support/pageObjects/PricingEngine/PricingEnginePage';
import { readConfigFile } from 'typescript';

//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()
const pricingEnginePage = new PricingEnginePage()
var fileis = 'cypress/fixtures/userData/Aservice.json'
var name
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

//--------------------------------------------------------------------------------------------------------

When('Click on Pricing Engine', function () {
    welcomePage.getPricingEngineLink().click({ force: true })
    cy.wait(2000)
  })

And('Click on the Service Policy', function () {
    cy.wait(6000)
    pricingEnginePage.getCashIN().click({ force: true })
    cy.wait(4000)
})

//-----------------------------------------------------------------------------------------------
And('Click on any service to add service charge.', function () {
  const uuid = () => Cypress._.random(1e2)
  var number = "3" + uuid()
  const uuidone = () => Cypress._.random(1e3)

  var numberone="8" + uuidone()

  cy.wait(4000)
  pricingEnginePage.getAddNewRuleBtn().click()
  cy.wait(3000)
  var nameone=getRandomName()
  
  pricingEnginePage.getRuleName().type(nameone, { force: true })
  cy.wait(5000)
cy.writeFile(fileis,{ServiceRuleName:nameone})



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
  pricingEnginePage.getWhoPays().select(this.data05.WhoPays, { force: true })
  pricingEnginePage.getSVAType().select(this.data05.SenderSVAtype, { force: true })
  pricingEnginePage.getWhomeToPay().select(this.data05.WhomeToPay, { force: true })
  pricingEnginePage.getChargeStatmentPricing().click({ force: true })
  pricingEnginePage.getPricingPercntage().type(number)
  pricingEnginePage.getPricingFixedAmt().type(numberone)
  cy.wait(5000)
  pricingEnginePage.getSaveDraftBtn().trigger('mouseover').click({ force: true })
  cy.wait(5000)
  pricingEnginePage.getSubmitPolicy().click({force:true})
  cy.wait(3000)
  pricingEnginePage.getSubmitBtn().click({force:true})
  cy.wait(5000)
  pricingEnginePage.getServiceHeader().should('have.text', this.data05.textmsg)
})


Then('Aprove the created service charge', function () {

  pricingEnginePage.getApproval().click()
  cy.wait(2000)
  pricingEnginePage.getApprovalpolicy().click()
  cy.wait(2000)
  cy.readFile(fileis).then((data)=>{
  var ruleName = data.ServiceRuleName
   pricingEnginePage.getApprovalRuleName().contains(ruleName).click()
  })

  pricingEnginePage.getApprovalBtn().click()
  cy.wait(2000)
  pricingEnginePage.getApprovalBtn().eq(0).click()
  cy.wait(2000)
  pricingEnginePage.getApprovalSubmitBtn().click()
  cy.wait(2000)
  pricingEnginePage.getApprovalConfirmBtn().click()
  cy.wait(2000)
  pricingEnginePage.getApprovalsuccessText().should('contain.text','Approved changes successfully')  
})