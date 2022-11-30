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
import securityQuestion from './pageObjects/SecurityQuestion/securityQuestion';

//----------------Object Declaration----------------------------------------------------------
const securityQuestionPage = new securityQuestion()
var q1
var q2
var q3
var question1
var filename = 'cypress/fixtures/securitys.json'

//---------------- Random value selection from drop down---------------
function getRandomName() {
    question1 = "What is your mobile number";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 6; i++)
        question1 += possible.charAt(Math.floor(Math.random() * possible.length));
    return question1;
}

Cypress.Commands.add('RandomQuestions', () => {
    q1 = getRandomName()
    securityQuestionPage.getSearchBox().clear({force:true}).type(q1, { force: true })
    cy.readFile(filename).then((data)=>{
        data.SecurityQuestion1 = q1
        cy.writeFile(filename, data)
    })
})


Cypress.Commands.add('RandomQuestion', () => {
    q2 = getRandomName()
    securityQuestionPage.getSearchBox().clear({force:true}).type(q2, { force: true })
    cy.readFile(filename).then((data)=>{
     data.SecurityQuestion2 =  q2
     cy.writeFile(filename,data)
    })
})

Cypress.Commands.add('RandomQuestion2', () => {
    q3 = getRandomName()
    securityQuestionPage.getSearchBox().clear({force:true}).type(q3, { force: true })
    cy.readFile(filename).then((data)=>{
        data. SecurityQuestion3 =  q3
        cy.writeFile(filename,data)
    })
})


