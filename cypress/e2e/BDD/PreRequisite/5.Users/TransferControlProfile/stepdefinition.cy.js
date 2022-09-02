/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/TransferControlProfileCommand";
import TransferControlProfile from '../../../../../support/pageObjects/TransferControlProfile';
import MarketingProfile from '../../../../../support/pageObjects/UserManagement/MarketingProfile';
import RegulatoryProfile from '../../../../../support/pageObjects/UserManagement/RegulatoryProfile';

const pageLogin = new loginPage()
const welcomePage = new homePage()
const tcpPage = new TransferControlProfile()
const MarketingProfile1 = new MarketingProfile()
const RegulatoryProfile1 = new RegulatoryProfile()
var mobile
var number
const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const filenameTCP = 'userData/TCPdata.json'
const CustTCPdata = 'userData/CustTCPdata.json'
const filenameTCP1 = 'userData/TCPdata1.json'
const CustTCPdata1 = 'userData/CustTCPdata1.json'
const fileRegulatoryProfile = 'userData/Regulatory&MarketingProfile.json'
var Tcpname
var Tcpname1,TcpnameSub,TcpnameSub1, RName


Before(() => {
  cy.fixture('login').then(function (data1) {

    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('TransferControlProfile').then(function (data5) {
    this.data5 = data5;
  })
  cy.fixture('userData/Regulatory&MarketingProfile.json').then(function (data8) {
    this.data8 = data8;
  })
});

//---------------------------------------------System Admin Login----------------------------------------------------


When('Navigate to Transfer Control Profile to View Details', function () {

  welcomePage.getTransferControlProfileSA().click()
  cy.wait(3000)
  cy.TcpName1()
  cy.ViewDetails(Tcpname1)
  cy.log(Tcpname1)
  tcpPage.getback().contains("Back").click({ force: true })
})

When('Navigate to Transfer Control Profile to Edit Details', function () {

  welcomePage.getTransferControlProfileSA().click()
  cy.wait(3000)
  cy.TcpName1()
  cy.EditDetails(Tcpname1)
  tcpPage.getEditbutton().click({ force: true })
  cy.wait(3000)
  tcpPage.getNextEdit().click({ force: true })
  tcpPage.getConfirmEdit().click({ force: true })
})

Then('Verify Success Message for Edit', function () {
  cy.fixture(CustTCPdata).then((user) => {
    Tcpname1 = user.CustTCPProfileName
    cy.wait(2000)
    cy.log(Tcpname1)
    tcpPage.getSuccess().should("contain", this.data5.confimationMessage.editSucesspart1 + Tcpname1 + this.data5.confimationMessage.editSucesspart2)
  })
})

Then('Verify the Modification Request message', function () {
  cy.TcpName1()
  tcpPage.getSuccess().should("contain", this.data5.confimationMessage.editapproval1 + Tcpname1 + this.data5.confimationMessage.editapproval2)
})

Then('Verify Success Message for deletion', function () {

  tcpPage.getMarketingError().should("contain", this.data5.confimationMessage.DeletionError)

})

When('Navigate to Transfer Control Profile to Delete Details', function () {

  welcomePage.getTransferControlProfileSA().click()
  cy.wait(3000)
  cy.TcpName1()
  cy.DeleteDetails(Tcpname1)
})

Then('Verify Error Message for deletion', function () {

  tcpPage.getMarketingError().should("contain", this.data5.confimationMessage.ErrorMessMarketing)

})



Then('Enter required Fields for error message', function () {

  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
  tcpPage.getgrade().select(this.data5.TransferControlProfile.Grade, { force: true })
  tcpPage.getpaymentinstrument().select(this.data5.TransferControlProfile.PaymentInstrument, { force: true })
  tcpPage.getwallettype().select(this.data5.TransferControlProfile.Wallet, { force: true })
  cy.fixture(filenameTCP).then((user) => {
    Tcpname = user.TcpProfileName
    cy.log(Tcpname)
    tcpPage.getprofilename().type(Tcpname)
  })
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description)

})

Then('Verify Error Message', function () {

  tcpPage.getErrorMessage().should("contain", this.data5.confimationMessage.ErrorMessageApproval)
})

Then('Verify Error Message for Provider', function () {
  tcpPage.geterror().should("contain", this.data5.confimationMessage.Providererror)
})

Then('Verify Error Message for Domain', function () {
  tcpPage.geterror().should("contain", this.data5.confimationMessage.Domainerror)
})


Then('Click on delete icon', function () {

  cy.wait(4000)
  
    cy.TcpName()
    cy.DeleteDetails1(Tcpname)
   
})
