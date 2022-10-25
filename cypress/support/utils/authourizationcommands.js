
import loginPage from "../pageObjects/loginPage"
//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()



Cypress.Commands.add('selectModule', () => {
	let lenn
	let len
	let newLen
	cy.frameLoaded(pageLogin.getiFrame())
	cy.iframe().find('[class="row profile-detail-row"]').within(function () {
		cy.get('[class="col-4 p-0 ng-star-inserted"] [class="mat-checkbox-label"]').then(function () {
			cy.get('.service-container > app-profile-list > div > .profile-list-container > div > button').then(data2 => {
				lenn = data2.length
				cy.log('Service Len' + lenn)
			})
			cy.get('[class="row mt-2 profile-list-container"]').eq(0).then(function () {
				cy.get('[class="col-12 px-0 ng-star-inserted"] button').then(data => {
					len = data.length
					newLen = len - lenn
					cy.log('New len' + newLen)
					let count = 0
					cy.wrap(data).each(($e1) => {
						count++
						cy.wrap($e1).click({ force: true })
						cy.get('.service-container > app-profile-list > div > .profile-list-container > div > button').then(data1 => {
							cy.wrap(data1).each(($e2) => {
								cy.wrap($e2).click({ force: true })
								cy.get('.mat-checkbox-label').contains('ALL').click({ force: true })
							})
						})
						if (count == newLen) return false
					})

				})
			})
		})
	})
})

