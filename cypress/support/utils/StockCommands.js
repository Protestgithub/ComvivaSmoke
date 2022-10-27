
import loginPage from '../PageObjects/loginPage';
import stockManagement from '../pageObjects/StockManagement/stockManagement';
import stockInitiation from '../pageObjects/StockManagement/stockInitiation';
//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const stockManagementPage = new stockManagement()
const stockInitiationPage = new stockInitiation()




Cypress.Commands.add('StockTransactionWriteData', () => {
	let StockFile = 'cypress/fixtures/StockManagement.json'
	cy.wait(3000)
	stockInitiationPage.getSuccessMsg().then((al => {
	let q = al.text()
	cy.log(q)
	let a = q.split(':')
	let b = a[1].split(',')
	let c = b[0].trim()
	cy.log(c)
	cy.readFile(StockFile).then((data) => {
	data.trasanctionid = c
	cy.writeFile(StockFile, data)
	})
	}))
	})

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

Cypress.Commands.add('mfsprovider', () => {
	cy.frameLoaded(pageLogin.getiFrame())
	stockManagementPage.getMFSProvider() // we get the select/option by finding the select by id
		.then(listing => {
			const randomNumber = getRandomInt(0, listing.length - 1); //generate a rendom number between 0 and length-1. In this case 0,1,2
			stockManagementPage.getMFSProvider().eq(randomNumber).then(($select) => {              //choose an option randomly
				const text = $select.text()       //get the option's text. For ex. "A"
				stockManagementPage.getMFSProviders().select(text)       // select the option on UI
			});
		})
})

var Mobile
Cypress.Commands.add('getMobileNumber', () => {
	//pageLogin.getiFrame()
	cy.fixture('userData/BusinessUsersDataO2C.json').then((usermobile) => {
		Mobile = usermobile.registeredMobileO2C
		cy.log(Mobile)
		stockManagementPage.getMSISDN().type(Mobile, { force: true })

	})
})

Cypress.Commands.add('selectInstrumentType', () => {
	stockManagementPage.getOperatorInstrumentTypes()
		.each(($elem, index) => {
			if (index === 1) {
				cy.wrap($elem).check();
			}
		})
})





