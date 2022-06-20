import loginPage from '../support/pageObjects/loginPage';
import BankManagement from './pageObjects/BankManagement';
//-------------------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const BankManagementPage = new BankManagement
var filename = 'cypress/fixtures/BankManagement.json'
var filename1 = 'cypress/fixtures/WalletManagementdata.json'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Cypress.Commands.add('getbankType', () => {
    pageLogin.getiFrame()
    cy.readFile(filename).then((user) => {
      let  bankType = user.BankName
        BankManagementPage.getDefaultBankType().select(bankType)
    })
})

Cypress.Commands.add('getBox',() =>
cy.readFile(filename).then((user)  => {
    let bankType = user.BankName
    cy.iframe().find('#MfsBankMapping_modifyBankMapping>.wwFormTableC>tbody>tr').each(($row=>{
        cy.wrap($row).within(function(){
            cy.get('td').eq(0).each(($el=>{
                cy.log($el.text())
                if($el.text().includes(bankType))
                {
                cy.get('input[type="checkbox"]').click({force: true})    
                }
            }))
        })
    }))
})
)


Cypress.Commands.add('geCheckBox',() =>
cy.readFile(filename1).then((user)  => {
    let bankType = user.WalletName
    cy.iframe().find('#multipleWalletMgmtModify_input>.wwFormTableC>tbody>tr').each(($row=>{
        cy.wrap($row).within(function(){
            cy.get('td').eq(0).each(($el=>{
                cy.log($el.text())
                if($el.text().includes(bankType))
                {
                cy.get('input[type="radio"]').click({force: true})    
                }
            }))
        })
    }))
})
)

Cypress.Commands.add('getprovider', () => {
    BankManagementPage.getProvider1().then(listing => {
        const randomNumber = getRandomInt(0, listing.length - 1);
        BankManagementPage.getProvider1().eq(randomNumber).then(($select) => {
            const text = $select.index()
            cy.wait(5000)
            BankManagementPage.getProvider().select(text, { force: true })
        });
    })
})


Cypress.Commands.add('getbanktype', () => {
    BankManagementPage.getBankType1().then(listing => {
        const randomNumber = getRandomInt(0, listing.length - 1);
        BankManagementPage.getBankType1().eq(randomNumber).then(($select) => {
            const text = $select.index()
            cy.wait(5000)
            BankManagementPage.getBankType().select(text, { force: true })
        });
    })
})

Cypress.Commands.add('getPoolAccounttype', () => {
    BankManagementPage.getPoolAccountType1().then(listing => {
        const randomNumber = getRandomInt(0, listing.length - 1);
        BankManagementPage.getPoolAccountType1().eq(randomNumber).then(($select) => {
            const text = $select.index()
            cy.wait(5000)
            BankManagementPage.getPoolAccountType().select(text, { force: true })
        });
    })
})

Cypress.Commands.add('getCBStype', () => {
    BankManagementPage.getCBSType1().then(listing => {
        const randomNumber = getRandomInt(0, listing.length - 1);
        BankManagementPage.getCBSType1().eq(randomNumber).then(($select) => {
            const text = $select.index()
            cy.wait(5000)
            BankManagementPage.getCBSType().select(text, { force: true })
        });
    })
})