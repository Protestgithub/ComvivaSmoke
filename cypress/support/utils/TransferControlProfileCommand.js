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

import TransferControlProfile from "../pageObjects/TransferControlProfile";

//-------------------------Object Declaration----------------------------------------------------------

const tcpPage = new TransferControlProfile()
var name
const filenameTCP = 'userData/TCPdata.json'
const filenameTCP1 = 'userData/TCPdata1.json'
const CustTCPdata = 'userData/CustTCPdata.json'
const CustTCPdata1 = 'userData/CustTCPdata1.json'
var Tcpname, Tcpname1,TcpnameSub,TcpnameSub1
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

  cy.fixture(filenameTCP1).then((user) => {
      TcpnameSub = user.TcpProfileNameSub
      cy.log(TcpnameSub)
  })

})
Cypress.Commands.add('TcpNameSub1', (Text) => {

  cy.fixture(CustTCPdata1).then((user) => {
      TcpnameSub1 = user.CustTCPProfileNameSub
      cy.log(TcpnameSub1)
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
   cy.writeFile('cypress/fixtures/userData/TCPdata1.json', { TcpProfileNameSub: hi })
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
  cy.writeFile('cypress/fixtures/userData/CustTCPdata1.json', { CustTCPProfileNameSub: hi })
  function getRandomName() {
      name = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (var i = 0; i < 5; i++)
          name += possible.charAt(Math.floor(Math.random() * possible.length));
      return name;
  }

})