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
import commisionDisbursment from './pageObjects/CommisionDisbursment/commisionDisbursment';


//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const commisionDisbursmentPage = new commisionDisbursment()

//---------------- Random value selection from drop down---------------
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

Cypress.Commands.add('cdmfsProvider', () => {
	cy.frameLoaded(pageLogin.getiFrame())
	commisionDisbursmentPage.getCDMFSProvider() // we get the select/option by finding the select by id
		.then(listing => {
			const randomNumber = getRandomInt(0, listing.length - 2); //generate a rendom number between 0 and length-1. In this case 0,1,2
			commisionDisbursmentPage.getCDMFSProvider().eq(randomNumber).then(($select) => {              //choose an option randomly
				const text = $select.text()       //get the option's text. For ex. "A"
				commisionDisbursmentPage.getCDMFSProviders().select(text)       // select the option on UI
			});
		})
})
