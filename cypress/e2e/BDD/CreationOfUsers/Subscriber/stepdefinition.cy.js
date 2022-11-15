/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../support/pageObjects/homePage';
import "../../../../support/utils/Generic";
import "../../../../support/utils/subscriberCommands";
import register from '../../../../support/pageObjects/UserManagement/register';

//----------------Object Declaration-----------------------------------------------------------------

const welcomePage = new homePage()
const registerPage = new register()
const uuid = () => Cypress._.random(1e8)
var  mobile, Mobile, KycValue
mobile = "77" + uuid()
Mobile = "77" + uuid()
const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp



And('Select User type as Subscriber and click on Subscribers', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).click({ force: true })
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).focused()
  registerPage.getUserRole().contains(this.data2.subPersonalInfo.subUserRole).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})