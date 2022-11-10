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
var fileis='cypress/fixtures/userData/Aservice.json'
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
Given('Login into Mobiquity Portal as Super admin', function () {

  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
})


//------------------------------------Pricing Engine--------------------------------------------------
//-----------TC_33------------------Service Charge Calcultor-----------------------------------------
When('Click on Pricing Engine', function () {
  welcomePage.getPricingEngineLink().click({ force: true })
})
And('Click on Pricing Caluclator', function () {
  cy.wait(4000)
  pricingEnginePage.getPricingCalculator().click({ force: true })
  cy.wait(4000)
  pricingEnginePage.getCashIN().click({ force: true })
})
And('Enter the party Details', function () {
  cy.wait(2000)
  pricingEnginePage.getSenderBankName().select(this.data3.BankName, { force: true })
  pricingEnginePage.getSenderSVAType().select(this.data5.SenderSVAtype, { force: true })
  pricingEnginePage.getSenderRole().select(this.data5.SenderRole, { force: true })
  pricingEnginePage.getSenderHierarchy().select(this.data5.SenderHierarchy, { force: true })
  pricingEnginePage.getSenderGrade().select(this.data5.SenderGrade, { force: true })
  pricingEnginePage.getReceiverBankName().select(this.data3.BankName, { force: true })
  pricingEnginePage.getReceiverSVAType().select(this.data5.ReceiverSVAtype, { force: true })
  pricingEnginePage.getReceiverRole().select(this.data5.ReceiverRole, { force: true })
  pricingEnginePage.getReceiverHierarchy().select(this.data5.ReceiverHierarchy, { force: true })
  pricingEnginePage.getReceiverGrade().select(this.data5.ReceiverGrade, { force: true })
})
And('Enter Other Details', function () {
  pricingEnginePage.getCurrencyType().select(this.data5.Currency, { force: true })
  pricingEnginePage.getTransactionAmt().type(this.data5.TransactionAmt, { force: true })
  pricingEnginePage.getTransactionDateTime()
  pricingEnginePage.getBearerCode().select(this.data5.Bearer, { force: true })
})
Then('Calculate Service Charge', function () {
  pricingEnginePage.getCalculate().click({ force: true })
 pricingEnginePage.getassertpc().should('contain.text',this.data5.resumsg)
})

//------TC_34---------------------Set Status of service Policy----------------------------------------------

And('Click on the Service Policy', function () {
  cy.wait(2000)
  pricingEnginePage.getCashIN().click({ force: true })
  cy.wait(4000)
})




Then('Check if user is able to view the saved draft', function () {
  cy.wait(2000)

  cy.readFile(fileis).then((data) => {
    let RuleName = data.ServiceRuleName1
    pricingEnginePage.getRuleName2().should('contain.text', RuleName)
  })

})

//----------------------------Arpitha Pricing EEngine TestCases------------------------------------


//-------------------------------------------TC-27 View PricingEngine Module-----------------------------------------

Then('System admin should be able to view pricing engine module on web.', function () {
  cy.wait(7000)
  cy.waitUntil(()=>{
    return cy.iframe().find('#main-menu-service-charge-service-selector').should('be.visible', { force: true })
  })
})

//----------------------------------------Tc-28---------------------------------------------------------

Then('User other than System admin should not able to view pricing engine module on web.', function () {
  cy.wait(4000)
  welcomePage.getPricingEngineLink().should('not.exist');
})

//------------------------------------------Tc-29---------------------------------------------------
Then('User should be redirected to a new page for pricing engine.', function () {
  cy.wait(7000)
  cy.waitUntil(()=>{
    return cy.iframe().find('h5.page-heading').should("have.text", "Service Charge Policy")
  })
})


//----------------------------------------------Tc-30-------------------------------------------------
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
  pricingEnginePage.getWhoPays().select(this.data5.WhoPays, { force: true })
  pricingEnginePage.getSVAType().select(this.data5.SenderSVAtype, { force: true })
  pricingEnginePage.getWhomeToPay().select(this.data5.WhomeToPay, { force: true })
  pricingEnginePage.getChargeStatmentPricing().click({ force: true })
  pricingEnginePage.getPricingPercntage().type(number)
  pricingEnginePage.getPricingFixedAmt().type(numberone)
  cy.wait(5000)
  pricingEnginePage.getSaveDraftBtn().trigger('mouseover').click({ force: true })
  cy.wait(5000)
  pricingEnginePage.getSubmitClickBtn().click({force:true})
  cy.wait(3000)
  pricingEnginePage.getSubmitBtn().click({force:true})
  cy.wait(5000)
  pricingEnginePage.getServiceHeader().should('have.text', this.data5.textmsg)
})


//---------------------------------------Tc-32---------------------------------------------------------
And('Click on commission', function () {
  cy.wait(3000)
  pricingEnginePage.getCommissionTab().dblclick({ force: true })
})

And('Click on commission and select the service you want to add commission profile for', function () {
  const uuid = () => Cypress._.random(1e2)
  var number = "3" + uuid()
  const uuidone = () => Cypress._.random(1e3)
  var numberone="8" + uuidone()
  cy.wait(4000)
  pricingEnginePage.getCashIN().click()
  cy.wait(4000)
  pricingEnginePage.getAddNewRuleBtn().click()
  cy.wait(4000)
  pricingEnginePage.getRuleName().type(getRandomName() ,{ force: true })
  pricingEnginePage.getMinCharge().type(number)
  pricingEnginePage.getMaxCharge().type(numberone)
  pricingEnginePage.getDatePickerStart().dblclick({ force: true })
  cy.wait(2000)
  pricingEnginePage.getCalanderStart().should('be.visible', { force: true })
  pricingEnginePage.getCurrentDateSelect().click({ force: true })
  pricingEnginePage.getDatePickerEnd().dblclick({ force: true })
  pricingEnginePage.getMonthNamerStart().contains(this.data5.month).click({ force: true })//(this.data5.month,{force: true}).click() 
  pricingEnginePage.getYearNameStart().contains(this.data5.year).click({ force: true })
  cy.wait(3000)
  pricingEnginePage.getCalanderDaysStart().filter(':visible').contains(this.data5.day).click({ force: true })
  pricingEnginePage.getSenderRoleCom().select(this.data5.SenderRole, { force: true })
  pricingEnginePage.getSenderHierarchyCom().select(this.data5.SenderHierarchy, { force: true })
  cy.wait(2000)
  pricingEnginePage.getSenderGradeCom1().click({ force: true })
  cy.wait(2000)
  pricingEnginePage.getSenderGradeCom2().click({ force: true })
  cy.wait(3000)
  pricingEnginePage.getGradebtnclick().click({ force: true })
  cy.wait(4000)
  pricingEnginePage.getWhoPays().select(this.data5.WhoPaysCom, { force: true })
  pricingEnginePage.getSVAType().select(this.data5.SenderSVAtypeCom, { force: true })
  pricingEnginePage.getWhomeToPay().select(this.data5.WhomeToPayCom, { force: true })
  pricingEnginePage.getChargeStatmentPricing().click({ force: true })
  pricingEnginePage.getPricingPercntage().type(number)
  pricingEnginePage.getPricingFixedAmt().type(numberone)
  pricingEnginePage.getSaveDraftBtn().trigger('mouseover').click({force:true})
  cy.wait(4000)
  pricingEnginePage.getSubmitPolicy().dblclick({ force: true })
  cy.wait(4000)
  pricingEnginePage.getSubmitBtn().dblclick({ force: true })
  pricingEnginePage.getCommissionHeader().should('have.text', this.data5.comsuccess)
})


