import stockInitiation from './pageObjects/StockManagement/stockInitiation';
import stockManagement from './pageObjects/StockManagement/stockManagement';
import 'cypress-file-upload';
import loginPage from '../support/pageObjects/loginPage';
//-------------------------Object Declaration----------------------------------------------------------

const stockInitiationPage = new stockInitiation()
const stockManagementPage = new stockManagement()
const pageLogin = new loginPage()
var StockFile = 'cypress/fixtures/StockManagement.json'

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

	
Cypress.Commands.add('StockTransactionWriteData',(filename) =>
	cy.readFile(StockFile).then((data)  => {
	   let ID = data.ReferenceNumber
	   let shouldStop = false
		cy.iframe().find('#stockApprove1_approve .wwFormTableC>tbody>tr','{force:true}').each(($row=>{
			cy.then(() => {
				if(shouldStop){
					return
				}
			cy.wrap($row).within(function(){
				cy.get('td').each(($el=>{
					cy.log($el.text())
					if($el.text().includes(ID))
					{
						cy.get('.tabcol').eq(4).then((al)=>{
							let q = al.text()
							cy.log(q)
							let a = q.trim()
							cy.log(a)
							cy.readFile(StockFile).then((data) => {
								data.trasanctionid = a
								cy.writeFile(StockFile, data)
							})
						})
						cy.wait(2000)
						cy.get('input[type="radio"]').click()
						cy.wait(2000)
					shouldStop = true
					}
				 })
				)
			 }) 
		})
	}))
}))