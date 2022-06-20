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
import loginPage from '../support/pageObjects/loginPage';
import authorizationManagement from './pageObjects/AuthorizationProfileManagement/authorizationManagement';


//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const authorizationProfilePage = new authorizationManagement()


//---------------- Random value selection from drop down---------------
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

Cypress.Commands.add('selectModule', () => {
	cy.frameLoaded(pageLogin.getiFrame())
	authorizationProfilePage.getAllModules() // we get the select/option by finding the select by id
		.then(listing => {
			const randomNumber = getRandomInt(0, listing.length - 1); //generate a rendom number between 0 and length-1. In this case 0,1,2
			authorizationProfilePage.getAllModules().eq(randomNumber).then(($select) => {              //choose an option randomly
				cy.log($select)
				const text = $select.text()       //get the option's text. For ex. "A"
				cy.log(text)
				authorizationProfilePage.getAllModules().contains(text)       // select the option on UI
			});
		})
})
