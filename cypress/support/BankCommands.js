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
    for (var i=0; i<5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
    return name;
    }
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

Cypress.Commands.add('getCSVfile', () => {
    cy.wait(3000)
    BankManagementPage.getDownloadFileTemplate().click({ force: true })
   cy.wait(2000)
   cy.readFile('cypress/downloads/AddBranches.csv')
   .then((data) => {
   cy.writeFile('cypress/fixtures/AddBranches.csv', data)
   })
   let result = [];
   cy.readFile('cypress/fixtures/AddBranches.csv')
   .then((data) => {
    var lines = data.split("\n")
    var headers = lines[0].split(",")
    for(var i=1;i<lines.length;i++){
     var obj = {};
     var currentline=lines[i].split(",");
       cy.log(currentline[0])
       for(var j=0;j<headers.length;j++){
           if(headers[j].includes("*")){
               let removeLastChar = headers[j].slice(0, headers[j].length - 1);
               cy.log(removeLastChar)
               obj[removeLastChar] = currentline[j];
              }
           else{
             obj[headers[j]] = currentline[j];
         }       
     }
     result.push(obj);
     cy.log(obj)
   }
   cy.writeFile('cypress/fixtures/AddBranches.json', obj)
   })
   
   cy.readFile("cypress/fixtures/AddBranches.json", (data) => {

}).then((data) => {
    data.BranchCode  = Code
    data.BranchName = getRandomName()
    cy.writeFile("cypress/fixtures/AddBranches.json", data)
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