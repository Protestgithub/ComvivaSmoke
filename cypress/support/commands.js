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
import homePage from './pageObjects/homePage';
import register from './pageObjects/UserManagement/register';
import PricingEnginePage from './pageObjects/PricingEngine/PricingEnginePage';
import DateUtils from './Utility/DateUtils';
import 'cypress-file-upload';
import API from './pageObjects/API';
import RegulatoryProfile from './pageObjects/UserManagement/RegulatoryProfile';
import MarketingProfile from './pageObjects/UserManagement/MarketingProfile';
import TransferControlProfile from './pageObjects/TransferControlProfile';
import AddGrades from './pageObjects/GradeManagement/AddGrades';
import ModifyGrade from './pageObjects/GradeManagement/ModifyGrades';
import approvals from './pageObjects/UserManagement/approvals';
import Reconcilation from './pageObjects/Reconcilation/Reconcilation';
import manageUsers from './pageObjects/UserManagement/manageUsers';

import O2CTransferInitiate from './pageObjects/OperatorToChannel/O2CTransferInitiate'

//-------------------------Object Declaration----------------------------------------------------------
const O2CTransferInitiatePage = new O2CTransferInitiate()
const manageUsersPage = new manageUsers()
const ModifyGradePage = new ModifyGrade()
const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const tcpPage = new TransferControlProfile()
const AddGradePage = new AddGrades()
const APIPage = new API()
const approvalPage =new approvals
const ReconPage = new Reconcilation()
var pricingEnginePage = new PricingEnginePage()
var dateUtils = new DateUtils()
var SubMobile

var RegulatoryFile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
const RegulatoryProfile1 = new RegulatoryProfile()
const MarketingProfile1 = new MarketingProfile()
const filenameTCP = 'userData/TCPdata.json'
const CustTCPdata = 'userData/CustTCPdata.json'
var Tcpname, Tcpname1
const Password1 = 'Com@135'
var name
let Sysfilelogin = 'cypress/fixtures/userData/SystemAdminLogin.json'
let loginId, mobile, Password


function getRandomName() {
    name = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
        name += possible.charAt(Math.floor(Math.random() * possible.length));
    return name;
}
function getRandomInt(min, max) {



    return Math.floor(Math.random() * (max - min + 1)) + min;



}

Cypress.Commands.add('launchURL', (URL) => {
    cy.visit(URL + '/dfscontainer/#/')
})

Cypress.Commands.add('login', (Username, Password) => {
    cy.frameLoaded(pageLogin.getiFrame())
    pageLogin.getInputForm().eq(0).type(Username)
    pageLogin.getInputForm().eq(1).type(Password)
    pageLogin.getLoginBtn().eq(0).click()
    cy.wait(3000)
})
Cypress.Commands.add('loginAgain', (Username, Password) => {
    cy.wait(2000)
    pageLogin.getInputForm().eq(0).type(Username)
    pageLogin.getInputForm().eq(1).type(Password)
    pageLogin.getLoginBtn().eq(0).click()
    cy.wait(3000)
})
Cypress.Commands.add('login1', (Password) => {
    cy.frameLoaded(pageLogin.getiFrame())
    pageLogin.getInputForm().eq(0).type(Password)
    pageLogin.getInputForm().eq(1).type(Password)
    pageLogin.getchangepassword().click({ force: true })
    cy.wait(3000)
})
Cypress.Commands.add('login1Again', (Password) => {
    pageLogin.getInputForm().eq(0).type(Password)
    pageLogin.getInputForm().eq(1).type(Password)
    pageLogin.getchangepassword().click({ force: true })
    cy.wait(3000)
})

Cypress.Commands.add('SysAdminlogin', () => {
    cy.frameLoaded(pageLogin.getiFrame())
    cy.readFile(Sysfilelogin).then((data) => {
        let loginID = data.LoginId
        let word = data.ChangePassword
        pageLogin.getInputForm().eq(0).type(loginID)
        pageLogin.getInputForm().eq(1).type(word)
        pageLogin.getLoginBtn().eq(0).click()
        cy.wait(3000)
    })
})
Cypress.Commands.add('SysAdminloginAgain', () => {
    cy.readFile(Sysfilelogin).then((data) => {
        let loginID = data.LoginId
        let word = data.ChangePassword
        pageLogin.getInputForm().eq(0).type(loginID)
        pageLogin.getInputForm().eq(1).type(word)
        pageLogin.getLoginBtn().eq(0).click()
        cy.wait(3000)
    })
})
Cypress.Commands.add('SysAdminlogin2', () => {
    cy.frameLoaded(pageLogin.getiFrame())
    cy.readFile(Sysfilelogin).then((data) => {
        let loginID = data.LoginId2
        let word = data.ChangePassword2
        pageLogin.getInputForm().eq(0).type(loginID)
        pageLogin.getInputForm().eq(1).type(word)
        pageLogin.getLoginBtn().eq(0).click()
        cy.wait(3000)
    })
})
Cypress.Commands.add('SysAdminlogin2Again', () => {
    cy.readFile(Sysfilelogin).then((data) => {
        let loginID = data.LoginId2
        let word = data.ChangePassword2
        pageLogin.getInputForm().eq(0).type(loginID)
        pageLogin.getInputForm().eq(1).type(word)
        pageLogin.getLoginBtn().eq(0).click()
        cy.wait(3000)
    })
})
Cypress.Commands.add('SysAdminlogin3', () => {
    cy.readFile(Sysfilelogin).then((data) => {
        let loginID = data.LoginId3
        let word = data.ChangePassword3
        pageLogin.getInputForm().eq(0).type(loginID)
        pageLogin.getInputForm().eq(1).type(word)
        pageLogin.getLoginBtn().eq(0).click()
        cy.wait(3000)
    })
})

Cypress.Commands.add('csvToJSON', (CsvFile,JsonFile) => {
    let result = [];
    cy.readFile('cypress/fixtures/templates/BULK_O2C-template.csv')
    .then((data) => {
     var lines = data.split("\n")
     var headers = lines[0].split(",")
     
     for(var i=0;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(",");
      
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = '';
        
    }
   cy.log(obj)

      }
      cy.writeFile('cypress/fixtures/BulkData/BULK_O2C-template.json', obj)
      
  })
  // console.log(result

})
  Cypress.Commands.add('jsonToCSV', (JsonFile, CsvFile)=>{
    cy.readFile('cypress/fixtures/BulkData/BULK_O2C-template.json').then((data)=>{
        var fields =  Object.keys(data)
        var values = Object.values(data)
        var csv1 = fields.map(function() {})
        csv1.unshift(fields.join(','))   // add header column
        let str1 = csv1;
        let sl2 = str1.slice(0, 1)        
        var csv = values.map(function() {})
        csv.unshift(values.join(',')) // add header column
        let str2 = csv;
        let sl3 = str2.slice(0, 1)
        cy.writeFile('cypress/fixtures/templates/BULK_O2C-template.csv', sl2 + '\n' + sl3)
        })
        
    })




Cypress.Commands.add('Passwordchange', (Text) => {
    cy.frameLoaded(pageLogin.getiFrame())
    pageLogin.getchangepasswordmessage().should('contain', Text)
    cy.wait(3000)
})



Cypress.Commands.add('checkWelcomeText', (Text) => {
    cy.frameLoaded(pageLogin.getiFrame())
    welcomePage.getUserMenu().click()
    // welcomePage.getWelcomeText().should('contain.text',Text)
    welcomePage.getUserMenu().click()
})
Cypress.Commands.add('tcpPage', (Text) => {
    //---------------------Kalyani
    cy.iframe().find('.panel-heading tbody>tr', "{force:true}").last().within(function () {
        cy.wait(3000)
        cy.get("td").eq(2).within(function () {
            cy.wait(2000)
            cy.get("a").click()
        })

    })
})


Cypress.Commands.add('getrandomUserEmailID', () => {

    let num = Math.floor((Math.random() * 100))
    let userID = getRandomName().concat(getRandomName() + num)
    let emailId = userID.concat('@comviva.com')
    registerPage.getLoginID().type(userID, { force: true })
    registerPage.getEmailID().type(emailId, { force: true })

})

Cypress.Commands.add('getrandomUserEmailID1', () => {

    let num = Math.floor((Math.random() * 100))

    let userID = getRandomName().concat(getRandomName() + num)

    let emailId = userID.concat('@comviva.com')

    registerPage.getLoginID().type(userID, { force: true })

    registerPage.getEmailID().type(emailId, { force: true })

    cy.readFile(Sysfilelogin).then((data) => {

    data.SYSEmailId = emailId

    cy.writeFile(Sysfilelogin, data)

    })

    })
Cypress.Commands.add('TcpName', (Text) => {

    cy.fixture(filenameTCP).then((user) => {
        Tcpname = user.TcpProfileName
        cy.log(Tcpname)
    })

})
Cypress.Commands.add('TcpName1', (Text) => {

    cy.fixture(CustTCPdata).then((user) => {
        Tcpname1 = user.CustTCPProfileName
        cy.log(Tcpname1)
    })

})
Cypress.Commands.add('TCPRandomName', () => {
    let hi = getRandomName()
    tcpPage.getprofilename().type(hi, { force: true })
    cy.writeFile('cypress/fixtures/userData/TCPdata.json', { TcpProfileName: hi })
    function getRandomName() {
        name = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }

})
Cypress.Commands.add('TCPMasRandomName', () => {
    let hi = getRandomName()
    tcpPage.getprofilename().type(hi, { force: true })
    cy.writeFile('cypress/fixtures/userData/CustTCPdata.json', { CustTCPProfileName: hi })
    function getRandomName() {
        name = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }

})

Cypress.Commands.add('FirstName', () => {
    let hi = getRandomName()
    registerPage.getFirstName().type(hi, { force: true })
    cy.writeFile('cypress/fixtures/userData/UserManagement.json', { firstName: hi })
    function getRandomName() {
        name = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }

})


Cypress.Commands.add('selectYear', (yearName) => {

    const currentYear = new Date().getFullYear()

    pricingEnginePage.getYearNameStart().then(($year) => {

        if ($year.text == yearName) {
            cy.log(yearName + 'Year is Selected')
            return
        }

        else {
            if (yearName < currentYear) {
                pricingEnginePage.getNavigateBackStart().click()
            }
            else if (yearName > currentYear) {
                pricingEnginePage.getNavigateForwardStart().click()
            }
        }

        cy.selectYear(yearName)
    })

})
Cypress.Commands.add('selectMonth', (monthName) => {

    let currentMonth = new Date().getMonth() + 1
    let givenMonth = dateUtils.getMonthIndexFromName(monthName)

    pricingEnginePage.getMonthNamerStart().then(($month) => {

        if ($month.text().includes(monthName)) {
            cy.log(monthName + 'month is selected')
            return
        }
        else {
            if (givenMonth > currentMonth) {
                pricingEnginePage.getNavigateForwardStart().click()
            }
            else if (givenMonth < currentMonth) {
                pricingEnginePage.getNavigateBackStart().click()

            }
        }
        cy.selectMonth(monthName)

    })
})

Cypress.Commands.add('MPRandomName1', () => {
    let hi = getRandomName()
    MarketingProfile1.getMarketingProfileName().type(hi, { force: true })
    cy.readFile(RegulatoryFile).then((data) => {
        data.MarketingProfileNameDistributer = hi
        cy.writeFile(RegulatoryFile, data)
        })
        function getRandomName() {
        name = "MP";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }
})

Cypress.Commands.add('selectDay', (dayName) => {

    pricingEnginePage.getCalanderDaysStart().eq(dayName - 1).click()
    cy.log(dayName + 'day is selected')


})



// Cypress.Commands.add('OTP',() => {

//   cy.intercept(Cypress.api('getOtpMob')).as('getOTP')
//   APIPage.getOTPicon().eq(0).click()
//   cy.wait('@getOTP').then((interception)=>{
//       let response =  interception.response.body
//       const resValues = Object.values(response)
//       const serviceRequestID = resValues[0]
//       cy.log(serviceRequestID)
//       let url1 = (Cypress.api('getOtpMobUrl'))
//       let getURL = url1.concat(serviceRequestID)
//      cy.request({
//          url: getURL,
//          headers:{
//           'Authorization': 'Basic YWRtaW46c2VjcmV0',
//           'Content-Type': 'application/json'
//          }
//      }).then((res) => {
//           let res1 = res.body
//           const res3 = Object.values(res1)
//           let OTP = res3[4]
//           var OTPArr = Array.from({length:6}, (v, k) => k+1)
//           cy.wrap(OTPArr).each((index) => {
//              APIPage.getOTPDailogbox().eq(index-1).type(OTP[index-1])
//           })
//           APIPage.getVerifybttn().click()
//      })
//   })

// })
Cypress.Commands.add('OTP',(apiURL) => {


    cy.intercept('/mobiquitypay/v2/otp/generate').as('getOTP')
    APIPage.getOTPicon().eq(0).click({ force: true })
    cy.wait('@getOTP').then((interception) => {
        let response = interception.response.body
        const resValues = Object.values(response)
        const serviceRequestID = resValues[0]
        cy.log(serviceRequestID)
    let url1 = apiURL + '/otpservice/internal/genotp/'
        let getURL = url1.concat(serviceRequestID)
        cy.request({
            url: getURL,
            headers: {
                'Authorization': 'Basic YWRtaW46c2VjcmV0',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            let res1 = res.body
            const res3 = Object.values(res1)
            let OTP = res3[4]
            var OTPArr = Array.from({ length: 6 }, (v, k) => k + 1)
            cy.wrap(OTPArr).each((index) => {
                APIPage.getOTPDailogbox().eq(index - 1).type(OTP[index - 1])
            })
            APIPage.getVerifybttn().click()
        })
    })
})

Cypress.Commands.add('getMessage', (apiURL) => {
    cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('getmessage')
    approvalPage.getApproveButton().click({ force: true })
    approvalPage.getApproveRequest().click({ force: true })
    cy.wait(2000)
    //approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.editUser)

    //  cy.iframe().find('[id="generate-otp-icon"]').eq(0).click()
    cy.wait('@getmessage').then((interception) => {
        let response = interception.response.body
        const resValues = Object.values(response)
        let serviceRequestID = resValues[0]
        cy.log(serviceRequestID)
        let url1 = apiURL + '/notify/internal/getByMessageIdOrExternalIdAndByToWhom?messageId='
        let url2 = url1.concat(serviceRequestID)
        let url3 = url2.concat('&toWhom=')

        cy.fixture('userData/subscriberReg.json').then((usermobile) => {
            SubMobile = usermobile.subscriberMobile
            cy.log(SubMobile)
        })
        let getURL = url3.concat('971' + SubMobile)

        cy.request({
            url: getURL,
            headers: {
                'Authorization': 'Basic YWRtaW46c2VjcmV0',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            let res1 = res.body
            cy.writeFile('cypress/fixtures/userData/subscriberMsg.json', { subscriberMessage: res1 })
        })
    })
})




Cypress.Commands.add('RandomName', () => {

    let hi = getRandomName()
    tcpPage.getprofilename().type(hi, { force: true })
    cy.writeFile(filename, { TcpProfileName: hi })
    function getRandomName() {
        name = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }

})

Cypress.Commands.add('RPRandomName', () => {
    let hi = getRandomName()
    RegulatoryProfile1.getregulatoryprofilename().type(hi, { force: true })
    cy.writeFile(RegulatoryFile, { RegulatoryProfileName: hi })
    function getRandomName() {
        name = "RP";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }
})

Cypress.Commands.add('RPRandomName1', () => {
    let hi = getRandomName()
    RegulatoryProfile1.getregulatoryprofilename().type(hi, { force: true })
     cy.readFile(RegulatoryFile).then((data) => {
        data.RegulatoryProfileName = hi
        cy.writeFile(RegulatoryFile, data)
        })
       function getRandomName() {
        name = "RP";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }
})


Cypress.Commands.add('MPRandomName', () => {
    let hi = getRandomName()
    MarketingProfile1.getMarketingProfileName().type(hi, { force: true })
    cy.readFile(RegulatoryFile).then((data) => {
        data.MarketingProfileName = hi
        cy.writeFile(RegulatoryFile, data)
        })
        function getRandomName() {
        name = "MP";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }
})

Cypress.Commands.add('Password', (apiURL) => {
    cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('getOTP')
    //  cy.iframe().find('[id="generate-otp-icon"]').eq(0).click()
    cy.wait('@getOTP').then((interception) => {
        let response = interception.response.body
        const resValues = Object.values(response)
        serviceRequestID = resValues[0]
        cy.log(serviceRequestID)
        let url1 = apiURL +'/notify/internal/getByMessageIdOrExternalIdAndByToWhom?messageId='
        let url2 = url1.concat(serviceRequestID)
        let url3 = url2.concat('&toWhom=')
        let getURL = url3.concat('971' + mobile)
        cy.request({
            url: getURL,
            headers: {
                'Authorization': 'Basic YWRtaW46c2VjcmV0',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            let res1 = res.body
            const res3 = Object.values(res1)
            let str1 = res3[0].split(/[\s,}=]+/)
            const authenticationValue = str1[20]
            cy.log(authenticationValue)
        })

    })

})

//----------------------------------------------------------------
var name
Cypress.Commands.add('GradeName', () => {

        let hi = getRandomName()

        var GradeFile = 'cypress/fixtures/userData/Gradedata.json'



        AddGradePage.getGradeName().type(hi, { force: true })

        cy.writeFile(GradeFile, { GradeName: hi })



        function getRandomName() {

            name = "";

            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < 5; i++)

                name += possible.charAt(Math.floor(Math.random() * possible.length));

            return name;

        }

    })
var GradeFile = 'cypress/fixtures/userData/Gradedata.json'
Cypress.Commands.add('ModifyRecord', () => {

    cy.readFile('cypress/fixtures/userData/Gradedata.json').then((user) => {
        let Grad = user.GradeName
        cy.log(Grad)

        cy.wait(3000)
        ModifyGradePage.getModifyTable().each(($row => {
            cy.wrap($row).within(function () {
                cy.get('td').each(($el => {

                    if ($el.text() == Grad) {
                        ModifyGradePage.getCheckBox().click()
                        ModifyGradePage.getModData().type(this.data01.ModifyGrade.Firstdata, { force: true })
                    }
                }))
            })
        }))
    })
})
Cypress.Commands.add('O2CTransactionWriteData', () => {
    O2CTransferInitiatePage.getSuccessMsg().then((al => {
        let q = al.text()
        cy.log(q)
        let a = q.split(':')
        let b = a[1].trim()
        cy.log(b)
        cy.readFile(O2Cfile).then((data) => {
            data.TransactionID = b

            cy.writeFile(TransactionFile, data)
          })
    }))
})

Cypress.Commands.add('O2CTransactionWriteData1', () => {
    O2CTransferInitiatePage.getSuccessMsg().then((al => {
        let q = al.text()
        cy.log(q)
        let a = q.split(':')
        let b = a[1].trim()
        cy.log(b)
        cy.readFile(TransactionFile).then((data) => {
            data.TransactionID1 = b

            cy.writeFile(TransactionFile, data)
          })
    }))
})
Cypress.Commands.add('O2CTransactionWriteData2', () => {
    O2CTransferInitiatePage.getSuccessMsg().then((al => {
        let q = al.text()
        cy.log(q)
        let a = q.split(':')
        let b = a[1].trim()
        cy.log(b)
        cy.readFile(TransactionFile).then((data) => {
            data.TransactionID2 = b

            cy.writeFile(TransactionFile, data)
          })
    }))
})
var O2Cfile = "cypress/fixtures/userData/O2Cdata.json"
var TransactionFile = "cypress/fixtures/userData/TransactionFile.json"

Cypress.Commands.add('O2CTransactionReadData', () => {
    cy.readFile(TransactionFile).then((id => {
        let data = id.TransactionID
        manageUsersPage.getSearchTransactionID().type(data, "{force:true}", "{enter}")
    }))
})

Cypress.Commands.add('getprovider', () => {

    ReconPage.getprovider1().then(listing => {

            const randomNumber = getRandomInt(1, listing.length - 1);

            ReconPage.getprovider1().eq(randomNumber).then(($select) => {

            const text = $select.index()

            cy.wait(5000)

            cy.log(text)

            ReconPage.getProviderSelect().select(text,{force:true})  

        });

    })

})
