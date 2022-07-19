/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';

import "../../../../support/commands";
import PricingEnginePage from '../../../../support/pageObjects/PricingEngine/PricingEnginePage';

//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const pricingEnginePage = new PricingEnginePage()

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('PricingEngine').then(function (data5) {
    this.data5 = data5;
  })
  cy.fixture('BankManagement').then(function (data3) {
    this.data3 = data3;
  })
  // cy.fixture('PEngineRuleName').then(function (data6){

  //       this.data6=data6;
  //   })
  if ( Cypress.browser.isHeadless ) {
    cy.clearCookie('shouldStop')
  } else {
    cy.getCookie('shouldStop').then(cookie => {
      if (
        cookie &&
        typeof cookie === 'object' &&
        cookie.value === 'true'
      ) {
        Cypress.runner.stop();
      }
    })
  }
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
Given('Login into Mobiquity Portal as System admin Maker after Logout', function () {
  cy.loginAgain(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
  cy.loginAgain(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)

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
})

//------TC_34---------------------Set Status of service Policy----------------------------------------------

/*When ('Click on Pricing Engine', function(){
  welcomePage.getPricingEngineLink().click({force:true})
})*/
And('Click on the Service Policy', function () {
  cy.wait(2000)
  pricingEnginePage.getCashIN().click({ force: true })
  cy.wait(4000)
})
Then('Set Status Active or Inactive', function () {
  cy.wait(2000)
  pricingEnginePage.getActiveOrInactive().click({ force: true })
  pricingEnginePage.getActiveOrInactive().click({ force: true })
  //pricingEnginePage.getActiveOrInactive().click({ force: true })
})

//-----TC_35---------------------------Search For service policy Rules------------------------------------------
And('Click on the Search Tab & Search by Rule Name', function () {
  cy.wait(3000)
  cy.readFile(fileis).then((data) => {
    let RuleName = data.ServiceRuleName
    pricingEnginePage.getSearchTab().type(RuleName)
  })
  //pricingEnginePage.getSearchTab().type(this.data5.Rule)
  cy.wait(2000)
  pricingEnginePage.getSearchButton().click({ force: true })

})
Then('Verify Search results should give the list of rule name with Condition,status,Validity,rule & Policytype', function () {
  // pricingEnginePage.getRule().should('have.text', this.data5.Rule)
  // pricingEnginePage.getPolicy().should('have.text', this.data5.Policy)
  // pricingEnginePage.getStatus().should('contain.text', this.data5.Status)
  // pricingEnginePage.getValidity().should('contain.value', this.data5.Validity)
  // expect()
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

/*When ('Click on Pricing Engine', function(){
  welcomePage.getPricingEngineLink().click({force:true})
})
And ('Click on the Service Policy',function(){
  cy.wait(2000)
  pricingEnginePage.getCashIN().click()
})*/
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


//--------TC_37-----------------------------------------------------------------------------------------

/*When ('Click on Pricing Engine', function(){
  welcomePage.getPricingEngineLink().click({force:true})
})
And ('Click on the Service Policy',function(){
  cy.wait(2000)
  pricingEnginePage.getCashIN().click()
})*/
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
  pricingEnginePage.getPolicyName().eq(0).should('contain.text','Cloned',{ force: true })
})
//--------------------------------------------------------------------------------------



//----------------------------Arpitha Pricing EEngine TestCases------------------------------------


//-------------------------------------------TC-27 View PricingEngine Module-----------------------------------------

Then('System admin should be able to view pricing engine module on web.', function () {
  cy.wait(4000)
  pricingEnginePage.getServiceChargeTab().should('be.visible', { force: true })
})

//----------------------------------------Tc-28---------------------------------------------------------

Given('Login into Mobiquity Portal as Super admin', function () {

  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
})

Then('User other than System admin should not able to view pricing engine module on web.', function () {
  cy.wait(4000)
  welcomePage.getPricingEngineLink().should('not.exist');
})

//------------------------------------------Tc-29---------------------------------------------------
Then('User should be redirected to a new page for pricing engine.', function () {
  cy.wait(4000)
  pricingEnginePage.getServiceChargeHeader().should("have.text", "Service Charge Policy")
})

//----------------------------------------------Tc-30-------------------------------------------------
And('Click on any service to add service charge.', function () {

  pricingEnginePage.getCashIN().click()
  pricingEnginePage.getAddNewRuleBtn().click()
  pricingEnginePage.getRuleName().type(getRandomName(), { force: true })
  cy.writeFile(PEngineRuleName, { Rule: getRandomName() })
  pricingEnginePage.getMinCharge().type(this.data5.MinCharge)
  pricingEnginePage.getMaxCharge().type(this.data5.MaxCharge)
  pricingEnginePage.getDatePickerStart().dblclick({ force: true })
  cy.wait(2000)
  pricingEnginePage.getCalanderStart().should('be.visible', { force: true })
  pricingEnginePage.getCurrentDateSelect().click({ force: true })
  pricingEnginePage.getDatePickerEnd().dblclick({ force: true })
  //Added
  // ERM.getvalidTo().click()
  //ERM.getnextyear().click()
  //ERM.getnextmonth().click
  //ERM.getdates().click({force:true})
  pricingEnginePage.getMonthNamerStart().contains(this.data5.month).click({ force: true })//(this.data5.month,{force: true}).click() 
  pricingEnginePage.getYearNameStart().contains(this.data5.year).click({ force: true })
  cy.wait(3000)
  pricingEnginePage.getCalanderDaysStart().filter(':visible').contains(this.data5.day).click({ force: true })
  pricingEnginePage.getWhoPays().select(this.data5.WhoPays, { force: true })
  pricingEnginePage.getSVAType().select(this.data5.SenderSVAtype, { force: true })
  pricingEnginePage.getWhomeToPay().select(this.data5.WhomeToPay, { force: true })
  pricingEnginePage.getChargeStatmentPricing().click({ force: true })
  pricingEnginePage.getPricingPercntage().type(this.data5.Percentage)
  pricingEnginePage.getPricingFixedAmt().type(this.data5.FixedAmt)
  pricingEnginePage.getSaveDraftBtn().trigger('mouseover').click({ force: true })

})


//---------------------------------------Tc-32---------------------------------------------------------
And('Click on commission', function () {
  cy.wait(3000)
  pricingEnginePage.getCommissionTab().dblclick({ force: true })
})

And('select the service  to add commission profile for.', function () {
  pricingEnginePage.getCashIN().click()
})
Then('User should be able to make commission profile with the same pricing engine module.', function () {


  pricingEnginePage.getAddNewRuleBtn().click()
  pricingEnginePage.getRuleName().type(getRandomName(), { force: true })
  pricingEnginePage.getMinCharge().type(this.data5.MinCharge)
  pricingEnginePage.getMaxCharge().type(this.data5.MaxCharge)
  pricingEnginePage.getDatePickerStart().dblclick({ force: true })
  cy.wait(2000)
  pricingEnginePage.getCalanderStart().should('be.visible', { force: true })
  pricingEnginePage.getCurrentDateSelect().click({ force: true })
  pricingEnginePage.getDatePickerEnd().dblclick({ force: true })
  //added
  // ERM.getvalidTo().click()
  // ERM.getnextyear().click()
  // ERM.getnextmonth().click
  //  ERM.getdates().click({force:true})
  //cy.selectYear(2023) 
  //cy.selectMonth('January')
  //cy.selectDay(17)  
  pricingEnginePage.getMonthNamerStart().contains(this.data5.month).click({ force: true })//(this.data5.month,{force: true}).click() 
  pricingEnginePage.getYearNameStart().contains(this.data5.year).click({ force: true })
  cy.wait(3000)
  pricingEnginePage.getCalanderDaysStart().filter(':visible').contains(this.data5.day).click({ force: true })
  pricingEnginePage.getWhoPays().select(this.data5.WhoPays, { force: true })
  pricingEnginePage.getSVAType().select(this.data5.SenderSVAtype, { force: true })
  pricingEnginePage.getWhomeToPay().select(this.data5.WhomeToPay, { force: true })
  pricingEnginePage.getChargeStatmentPricing().click({ force: true })
  pricingEnginePage.getPricingPercntage().type(this.data5.Percentage)
  pricingEnginePage.getPricingFixedAmt().type(this.data5.FixedAmt)
  pricingEnginePage.getSaveDraftBtn().trigger('mouseover').click({ force: true })


})

And('Click on commission and select the service you want to add commission profile for', function () {
  cy.wait(2000)
  pricingEnginePage.getCashIN().click()
  cy.wait(3000)
  pricingEnginePage.getAddNewRuleBtn().click()
  pricingEnginePage.getRuleName().type(this.data5.RuleName1, { force: true })
  pricingEnginePage.getMinCharge().type(this.data5.MinCharge)
  pricingEnginePage.getMaxCharge().type(this.data5.MaxCharge)
  pricingEnginePage.getDatePickerStart().dblclick({ force: true })
  cy.wait(2000)
  pricingEnginePage.getCalanderStart().should('be.visible', { force: true })
  pricingEnginePage.getCurrentDateSelect().click({ force: true })
  pricingEnginePage.getDatePickerEnd().dblclick({ force: true })
  //added
  // ERM.getvalidTo().click()
  //ERM.getnextyear().click()
  //ERM.getnextmonth().click
  // ERM.getdates().click({force:true})
  pricingEnginePage.getMonthNamerStart().contains(this.data5.month).click({ force: true })//(this.data5.month,{force: true}).click() 
  pricingEnginePage.getYearNameStart().contains(this.data5.year).click({ force: true })
  cy.wait(3000)
  pricingEnginePage.getCalanderDaysStart().filter(':visible').contains(this.data5.day).click({ force: true })
  //pricingEnginePage.getSenderRole().select(this.data5.SenderRole, { force: true })
  //pricingEnginePage.getSenderHierarchy().select(this.data5.SenderHierarchy, { force: true })
  //cy.wait(2000)
  // pricingEnginePage.getSenderGrade().select(this.data5.SenderGrade, { force: true })
  pricingEnginePage.getSenderRoleCom().select(this.data5.SenderRole, { force: true })
  pricingEnginePage.getSenderHierarchyCom().select(this.data5.SenderHierarchy, { force: true })
  cy.wait(2000)
  pricingEnginePage.getSenderGradeCom1().click({ force: true })
  cy.wait(2000)
  pricingEnginePage.getSenderGradeCom2().click({ force: true })
  pricingEnginePage.getGradebtnclick().click({ force: true })
  cy.wait(2000)
  pricingEnginePage.getWhoPays().select(this.data5.WhoPays, { force: true })
  pricingEnginePage.getSVAType().select(this.data5.SenderSVAtype, { force: true })
  pricingEnginePage.getWhomeToPay().select(this.data5.WhomeToPay, { force: true })
  pricingEnginePage.getChargeStatmentPricing().click({ force: true })
  pricingEnginePage.getPricingPercntage().type(this.data5.Percentage)
  pricingEnginePage.getPricingFixedAmt().type(this.data5.FixedAmt)
  pricingEnginePage.getSaveDraftBtn().trigger('mouseover')
  pricingEnginePage.getSubmitPolicy().dblclick({ force: true })
  pricingEnginePage.getSubmitBtn().dblclick({ force: true })
})
