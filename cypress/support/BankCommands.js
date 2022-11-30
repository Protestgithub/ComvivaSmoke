import loginPage from '../support/pageObjects/loginPage';
import BankManagement from './pageObjects/BankManagement';
//-------------------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const BankManagementPage = new BankManagement
var filename = 'cypress/fixtures/BankManagement.json'
var filename1 = 'cypress/fixtures/WalletManagementdata.json'
var name
const uuid = () => Cypress._.random(1e4)
var Code = uuid()
function getRandomName() {
    name = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 5; i++)
        name += possible.charAt(Math.floor(Math.random() * possible.length));
    return name;
}


Cypress.Commands.add('getbankType', () => {
    pageLogin.getiFrame()
    cy.readFile(filename).then((user) => {
        let bankType = user.BankName
        BankManagementPage.getDefaultBankType().select(bankType)
    })
})

Cypress.Commands.add('getBox', () =>
    cy.readFile(filename).then((user) => {
        let bankType = user.BankName
        cy.iframe().find('#MfsBankMapping_modifyBankMapping>.wwFormTableC>tbody>tr').each(($row => {
            cy.wrap($row).within(function () {
                cy.get('td').eq(0).each(($el => {
                    cy.log($el.text())
                    if ($el.text().includes(bankType)) {
                        cy.get('input[type="checkbox"]').click({ force: true })
                    }
                }))
            })
        }))
    })
)


Cypress.Commands.add('geCheckBox', () =>
    cy.readFile(filename1).then((user) => {
        let bankType = user.WalletName
        let shouldStop = false
        cy.iframe().find('#multipleWalletMgmtModify_input>.wwFormTableC>tbody>tr').each(($row => {
            cy.then(() => {
                if (shouldStop) {
                    return
                }
                cy.wrap($row).within(function () {
                    cy.get('td').eq(2).each(($el => {
                        cy.log($el.text())
                        if ($el.text().includes(bankType)) {
                            cy.get('input[type="radio"]').click({ force: true })
                            shouldStop = true
                        }
                    }))
                })
            })
        }))
    })
)

Cypress.Commands.add('getCSVfile', () => {
    BankManagementPage.getDownloadFileTemplate().click({ force: true })
    cy.wait(2000)
    cy.readFile('cypress/fixtures/templates/AddBranches.csv')
        .then((data) => {
            cy.writeFile('cypress/fixtures/templates/AddBranches.csv', data)
        })
    let result = [];
    cy.readFile('cypress/fixtures/templates/AddBranches.csv')
        .then((data) => {
            var lines = data.split("\n")
            var headers = lines[0].split(",")
            for (var i = 1; i < lines.length; i++) {
                var obj = {};
                var currentline = lines[i].split(",");
                cy.log(currentline[0])
                for (var j = 0; j < headers.length; j++) {
                    if (headers[j].includes("*")) {
                        let removeLastChar = headers[j].slice(0, headers[j].length - 1);
                        cy.log(removeLastChar)
                        obj[removeLastChar] = currentline[j];
                    }
                    else {
                        obj[headers[j]] = currentline[j];
                    }
                }
                result.push(obj);
                cy.log(obj)
            }
            cy.writeFile('cypress/fixtures/AddBranches.json', obj)
        })

    cy.readFile("cypress/fixtures/AddBranches.json").then((data) => {
        data.BranchCode = Code
        data.BranchName = getRandomName()
        cy.writeFile("cypress/fixtures/AddBranches.json", data)
    })
    cy.readFile('cypress/fixtures/AddBranches.json').then((data) => {
        //var json = data
        var fields = Object.keys(data)
        var values = Object.values(data)
        var csv1 = fields.map(function () { })
        csv1.unshift(fields.join(','))   // add header column
        let str1 = csv1;
        let sl2 = str1.slice(0, 1)
        var csv = values.map(function () { })
        csv.unshift(values.join(',')) // add header column
        let str2 = csv;
        let sl3 = str2.slice(0, 1)
        cy.writeFile('cypress/fixtures/templates/AddBranches.csv', sl2 + '\n' + sl3)
    })
})

