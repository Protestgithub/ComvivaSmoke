// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import loginPage from './pageObjects/loginPage';
import homePage from './pageObjects/homePage';
import register from './pageObjects/UserManagement/register';
import PricingEnginePage from './pageObjects/PricingEngine/PricingEnginePage';
import DateUtils from './Utility/DateUtils';
import 'cypress-file-upload';
import API from './pageObjects/API';
import RegulatoryProfile from './pageObjects/UserManagement/RegulatoryProfile';
import MarketingProfile from './pageObjects/UserManagement/MarketingProfile';
import manageUsers from './pageObjects/UserManagement/manageUsers';
import TransferControlProfile from './pageObjects/TransferControlProfile';
import AddGrades from './pageObjects/GradeManagement/AddGrades';

//-------------------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const tcpPage = new TransferControlProfile()
const AddGradePage = new AddGrades()
const APIPage = new API()
var pricingEnginePage = new PricingEnginePage()
var dateUtils = new DateUtils()
var name
var RegulatoryFile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
var MarketingFile = 'cypress/fixtures/userData/MarketingProfile.json'
const RegulatoryProfile1 = new RegulatoryProfile()
const MarketingProfile1 = new MarketingProfile()
const manageUsersPage = new manageUsers()
const filenameTCP = 'userData/TCPdata.json'
const CustTCPdata = 'userData/CustTCPdata.json'
const fileRegulatoryProfile = 'userData/Regulatory&MarketingProfile.json'
var Tcpname, Tcpname1,TcpnameSub
const Password1 = 'Com@135'
var name
let Sysfilelogin = 'cypress/fixtures/userData/SystemAdminLogin.json'
let loginId, mobile, Password
const timestamp = (new Date).getMilliseconds()


function getRandomName() {
    name = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
        name += possible.charAt(Math.floor(Math.random() * possible.length));
    return name;
}

Cypress.Commands.add('TcpName', (Text) => {

    cy.fixture(filenameTCP).then((user) => {
        Tcpname = user.TcpProfileName
        cy.log(Tcpname)
    })

})
Cypress.Commands.add('TcpNameSub', (Text) => {

  cy.fixture(filenameTCP).then((user) => {
      TcpnameSub = user.TcpProfileNameSub
      cy.log(TcpnameSub)
  })

})
Cypress.Commands.add('TcpName1', (Text) => {

    cy.fixture(CustTCPdata).then((user) => {
        Tcpname1 = user.CustTCPProfileName
        cy.log(Tcpname1)
    })

})
Cypress.Commands.add('TCPRandomName', () => {
    let hi ="InstTCP" +"" +getRandomName() + timestamp
    tcpPage.getprofilename().type(hi, { force: true })
    cy.writeFile('cypress/fixtures/userData/TCPdata.json', { TcpProfileName: hi })
    function getRandomName() {
        name = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }

})
Cypress.Commands.add('TCPRandomNameSub', () => {
  let hi ="InstTCP" +"" +getRandomName() + timestamp
  tcpPage.getprofilename().type(hi, { force: true })
  cy.fixture(filenameTCP).then((user) => {
      Tcpname = user.TcpProfileName
      cy.log(Tcpname)
    })

  cy.writeFile('cypress/fixtures/userData/TCPdata.json', { TcpProfileName:Tcpname,TcpProfileNameSub: hi })
  function getRandomName() {
      name = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (var i = 0; i < 5; i++)
          name += possible.charAt(Math.floor(Math.random() * possible.length));
      return name;
  }

})
Cypress.Commands.add('TCPMasRandomName', () => {
    let hi = "CustTCP" +"" +getRandomName() + timestamp
    tcpPage.getprofilename().type(hi, { force: true })
    cy.writeFile('cypress/fixtures/userData/CustTCPdata.json', { CustTCPProfileName: hi })
    function getRandomName() {
        name = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }

})
Cypress.Commands.add('TCPMasRandomNameSub', () => {
  let hi = "CustTCP" +"" +getRandomName() + timestamp
  tcpPage.getprofilename().type(hi, { force: true })
  cy.writeFile('cypress/fixtures/userData/CustTCPdata.json', { CustTCPProfileNameSub: hi })
  function getRandomName() {
      name = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (var i = 0; i < 5; i++)
          name += possible.charAt(Math.floor(Math.random() * possible.length));
      return name;
  }

})
Cypress.Commands.add('ViewDetails',()=>{
    tcpPage.getViewDetails().each(($row => {

        cy.wrap($row).within(function () {
    
          cy.get('td.name').each(($el => {
    
            if ($el.text() == Tcpname1) {
              cy.get('span.glyphicon.glyphicon-info-sign').click({ force: true })
    
            }
          }))
        })
      }))

})
Cypress.Commands.add('EditDetails',() =>{

    tcpPage.getViewDetails().each(($row => {

        cy.wrap($row).within(function () {
    
    
          cy.get('td.name').each(($el => {
    
            if ($el.text() == Tcpname1) {
              cy.get('span.glyphicon.glyphicon-edit').click({ force: true })
    
            }
          }))
        })
      }))
})
Cypress.Commands.add('DeleteDetails',()=>{

    tcpPage.getViewDetails().each(($row => {

        cy.wrap($row).within(function () {
    
          cy.get('td.name').each(($el => {
    
            if ($el.text() == Tcpname1) {
              cy.get('span.glyphicon.glyphicon-trash').click({ force: true })
    
            }
          }))
        })
      }))
})