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
import TransferControlProfile from './pageObjects/TransferControlProfile';


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
    cy.readFile('cypress/fixtures/userData/TCPdata.json').then((data)=>{
      data.TcpProfileName=hi
      cy.writeFile('cypress/fixtures/userData/TCPdata.json', data)
    })
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
  cy.readFile('cypress/fixtures/userData/TCPdata1.json').then((data)=>{
    data.TcpProfileNameSub=hi
   cy.writeFile('cypress/fixtures/userData/TCPdata1.json', data)
  })
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
    cy.readFile('cypress/fixtures/userData/CustTCPdata.json').then((data)=>{
      data.CustTCPProfileName=hi
    cy.writeFile('cypress/fixtures/userData/CustTCPdata.json',data)
    })
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
  cy.readFile('cypress/fixtures/userData/CustTCPdata1.json').then((data)=>{
    data.CustTCPProfileNameSub=hi
  cy.writeFile('cypress/fixtures/userData/CustTCPdata1.json', data)
  })
  function getRandomName() {
      name = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (var i = 0; i < 5; i++)
          name += possible.charAt(Math.floor(Math.random() * possible.length));
      return name;
  }

})
Cypress.Commands.add('ViewDetails',()=>{
  let shouldStop = false
    tcpPage.getViewDetails().each(($row => {
      cy.then(() => {
        if(shouldStop){
            return
        }
        cy.wrap($row).within(function () {
    
          cy.get('td.name').each(($el => {
    
            if ($el.text() == Tcpname1) {
              cy.get('span.glyphicon.glyphicon-info-sign').click({ force: true })
              shouldStop = true
            }
          }))
        })
      })
      }))

})
Cypress.Commands.add('EditDetails',() =>{
  let shouldStop = false
    tcpPage.getViewDetails().each(($row => {

        cy.wrap($row).within(function () {
          cy.then(() => {
            if(shouldStop){
                return
            }
    
          cy.get('td.name').each(($el => {
    
            if ($el.text() == Tcpname1) {
              cy.get('span.glyphicon.glyphicon-edit').click({ force: true })
              shouldStop = true
            }
          }))
        })
      })
      }))
})
Cypress.Commands.add('DeleteDetails',()=>{
  let shouldStop = false
    tcpPage.getViewDetails().each(($row => {
      cy.then(() => {
        if(shouldStop){
            return
        }
        cy.wrap($row).within(function () {
    
          cy.get('td.name').each(($el => {
    
            if ($el.text() == Tcpname1) {
              cy.get('span.glyphicon.glyphicon-trash').click({ force: true })
              shouldStop = true
            }
          }))
        })
      })
      }))
})

Cypress.Commands.add('DeleteDetails1',()=>{
  let shouldStop = false
  cy.wait(5000)
  cy.fixture(filenameTCP).then((user) => {
    Tcpname = user.TcpProfileName
    cy.log(Tcpname)
})

    tcpPage.getViewDetails().each(($row => {
      cy.then(() => {
       
        cy.wrap($row).within(function () {
          if(shouldStop){
            return
        }
          cy.get('td.name').each($el => {
    
            if ($el.text() == Tcpname) {
              cy.get('span.glyphicon.glyphicon-trash').click({ force: true })
              shouldStop = true
            }
            else{
              cy.log('data unavailable')
               shouldStop = true
            }
          })
        })
      })
      }))
})

Cypress.Commands.add('getcumulativeamountpertransaction', () => {
  const uuid = () => Cypress._.random(1e3)
  var number = uuid()
  tcpPage.getcount1().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
  tcpPage.getcount2().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
  tcpPage.getcount3().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
  tcpPage.getcount4().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
  tcpPage.getcount5().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
  tcpPage.getcount6().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
  tcpPage.getcount7().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
  tcpPage.getcount8().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
  tcpPage.getcount9().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
  tcpPage.getcount10().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
  })
  
  