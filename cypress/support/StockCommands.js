import stockInitiation from './pageObjects/StockManagement/stockInitiation';
import stockManagement from './pageObjects/StockManagement/stockManagement';
import 'cypress-file-upload';
//-------------------------Object Declaration----------------------------------------------------------

const stockInitiationPage = new stockInitiation()
const stockManagementPage = new stockManagement()

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

Cypress.Commands.add('getprovider', () => {
	stockInitiationPage.getProvider1()
		.then(listing => {
			const randomNumber = getRandomInt(0, listing.length - 1);
			stockInitiationPage.getProvider1().eq(randomNumber).then(($select) => {
				const text = $select.index()
				cy.wait(5000)
				stockInitiationPage.getProvider().select(text, { force: true })
			});
		})
})



//---------------- Random value selection from drop down---------------

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

Cypress.Commands.add('mfsproviders', () => {
	cy.frameLoaded(pageLogin.getiFrame())
	stockManagementPage.getRAMFSProvider() // we get the select/option by finding the select by id
		.then(listing => {
			const randomNumber = getRandomInt(0, listing.length - 1); //generate a rendom number between 0 and length-1. In this case 0,1,2
			stockManagementPage.getRAMFSProvider().eq(randomNumber).then(($select) => {              //choose an option randomly
				const text = $select.text()       //get the option's text. For ex. "A"
				stockManagementPage.getRAMFSProvides().select(text)       // select the option on UI
			});
		})
})


Cypress.Commands.add('mfsproviders', () => {
	cy.frameLoaded(pageLogin.getiFrame())
	stockManagementPage.getRAMFSProvider() // we get the select/option by finding the select by id
		.then(listing => {
			const randomNumber = getRandomInt(0, listing.length - 1); //generate a rendom number between 0 and length-1. In this case 0,1,2
			stockManagementPage.getRAMFSProvider().eq(randomNumber).then(($select) => {              //choose an option randomly
				const text = $select.text()       //get the option's text. For ex. "A"
				stockManagementPage.getRAMFSProvides().select(text)       // select the option on UI
			});
		})
})

Cypress.Commands.add('reimbursementproviders', () => {
	cy.frameLoaded(pageLogin.getiFrame())
	stockManagementPage.getProvider() // we get the select/option by finding the select by id
		.then(listing => {
			const randomNumber = getRandomInt(0, listing.length - 1); //generate a rendom number between 0 and length-1. In this case 0,1,2
			stockManagementPage.getProvider().eq(randomNumber).then(($select) => {              //choose an option randomly
				const text = $select.text()       //get the option's text. For ex. "A"
				stockManagementPage.getProviders().select(text)       // select the option on UI
			});
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
