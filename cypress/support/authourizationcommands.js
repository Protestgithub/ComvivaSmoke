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
	cy.iframe().find('[class="row profile-detail-row"]').within(function () {
		cy.get('[class="col-4 p-0 ng-star-inserted"] [class="mat-checkbox-label"]').then(function () {
			cy.get('[class="row mt-2 profile-list-container"]').eq(0).then(function () {
				cy.get('[class="col-12 px-0 ng-star-inserted"] button').then(data => {
					let len = data.length - 1 //20
					cy.log(len + 'M')
					let count = 0
					cy.wrap(data).each(($e1) => {
						count++
						cy.wrap($e1).click({ force: true })

						cy.get('[class="row mt-2 profile-list-container"]').eq(1).then(function () {
							cy.get('[class="col-12 px-0 ng-star-inserted"] button').then(data1 => {
								let lenn = data1.length - 1 //20
								//	len = data.length-lenn // 0
									cy.log(len + 'M')
								cy.log(lenn + 'S')
								cy.wrap(data1).then(($e2) => {
									for (let j = len; j <= lenn; j++) {
										cy.wrap($e2).eq(j).click({ force: true })
										cy.get('.mat-checkbox-label').contains('ALL').click({ force: true })
									}
								})
							})
						})
						if (count == len) return false
					})
				})
			})
		})
	})
})
