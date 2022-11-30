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
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import homePage from './pageObjects/homePage';
import register from './pageObjects/UserManagement/register';
import PricingEnginePage from './pageObjects/PricingEngine/PricingEnginePage';
import DateUtils from './Utility/DateUtils';
import 'cypress-file-upload';
import 'cypress-wait-until';
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
let BAlogin = 'cypress/fixtures/userData/BusinessAdminLogin.json'
let ApiService='cypress/fixtures/API/APIEndPoints.json'
var O2Cfile = "cypress/fixtures/userData/O2Cdata.json"
var TransactionFile = "cypress/fixtures/userData/TransactionFile.json"
let loginId, mobile, Password

//------------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------

Cypress.Commands.add('launchURL', (URL) => {
    cy.waitUntil(()=>{
      return  cy.visit(URL + '/dfscontainer/#/')
    })
})

  Cypress.Commands.add('checkWelcomeText', (Text) => {
    cy.wait(3000)
    cy.frameLoaded(pageLogin.getiFrame())
    cy.wait(3000)
    welcomePage.getUserMenu().should('be.visible').click()
    cy.wait(2000)
     welcomePage.getWelcomeText().should('contain.text',Text)
    welcomePage.getUserMenu().click()
})
Cypress.Commands.add('login', (Username, Password) => {
    cy.frameLoaded(pageLogin.getiFrame())
     cy.readFile(ApiService).then((data) =>{
        let dataapi= data.loginurl
        cy.intercept(dataapi).as('all')
    cy.waitUntil(()=>{
        return cy.iframe().find('.form-input').eq(0).type(Username)
    })
    pageLogin.getInputForm().eq(1).type(Password)
    pageLogin.getLoginBtn().eq(0).click()
    cy.checkAPI(dataapi)
})
})
Cypress.Commands.add('login1', (Password) => {
    cy.frameLoaded(pageLogin.getiFrame())
     cy.readFile(ApiService).then((data) =>{
        let dataapi= data.loginurl
        cy.intercept(dataapi).as('all')
        cy.waitUntil(()=>{
            return cy.iframe().find('.form-input').eq(0).type(Password)
        })
    pageLogin.getInputForm().eq(1).type(Password)
    pageLogin.getchangepassword().click({ force: true })
    cy.checkAPI(dataapi)
})
})

Cypress.Commands.add('Passwordchange', (Text) => {
    cy.frameLoaded(pageLogin.getiFrame())
    cy.waitUntil(()=>{
        return cy.iframe().find('p.text-content').should('contain', Text)
    })
})

Cypress.Commands.add('SysAdminlogin', () => {
    cy.frameLoaded(cy.waitUntil(()=>{
        return cy.frameLoaded('.fd-page.iframeContainer.svelte-1v5e28n > iframe')
    }))
    cy.readFile(Sysfilelogin).then((data) => {
        let loginID = data.LoginId
        let word = data.ChangePassword
        cy.wait(2000)
        cy.waitUntil(()=>{
            return cy.iframe().find('.form-input').eq(0).should('be.visible').type(loginID)
        })
        pageLogin.getInputForm().eq(1).type(word)
        pageLogin.getLoginBtn().eq(0).click()
    })
})


Cypress.Commands.add('SysAdminlogin2', () => {
    cy.frameLoaded(cy.waitUntil(()=>{
        return cy.frameLoaded('.fd-page.iframeContainer.svelte-1v5e28n > iframe')
    }))
        cy.readFile(Sysfilelogin).then((data) => {
        let loginID = data.LoginId2
        let word = data.ChangePassword2
        cy.wait(2000)
        cy.waitUntil(()=>{
            return cy.iframe().find('.form-input').eq(0).should('be.visible').type(loginID)
        })
        pageLogin.getInputForm().eq(1).type(word)
        pageLogin.getLoginBtn().eq(0).click()
})
})

Cypress.Commands.add('SysAdminlogin3', () => {
    cy.frameLoaded(cy.waitUntil(()=>{
        return cy.frameLoaded('.fd-page.iframeContainer.svelte-1v5e28n > iframe')
    }))
    cy.readFile(Sysfilelogin).then((data) => {
        let loginID = data.LoginId3
        let word = data.ChangePassword3
         cy.wait(2000)
         cy.waitUntil(()=>{
            return cy.iframe().find('.form-input').eq(0).should('be.visible').type(loginID)
        })
        pageLogin.getInputForm().eq(1).type(word)
        pageLogin.getLoginBtn().eq(0).click()
    })
})

Cypress.Commands.add('BAlogin', () => {
    cy.frameLoaded(pageLogin.getiFrame())
     cy.wait(2000)
    cy.readFile(BAlogin).then((data) => {
        let loginID = data.LoginId
        let word = data.ChangePassword
        pageLogin.getInputForm().eq(0).type(loginID)
        pageLogin.getInputForm().eq(1).type(word)
        pageLogin.getLoginBtn().eq(0).click()
        cy.wait(3000)
})
})
//-------------------------------------------------------------------------------

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



//----------------------------------------------------------------------------------------------

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

Cypress.Commands.add('FirstName', () => {
    let hi = getRandomName()
    registerPage.getFirstName().type(hi, { force: true })
    cy.readFile('cypress/fixtures/userData/UserManagement.json').then((data) => {
    data.firstName = hi
    cy.writeFile('cypress/fixtures/userData/UserManagement.json',data)
    })
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
        const serviceRequestID = resValues[1]
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

Cypress.Commands.add('getSubMessage', (apiURL) => {
    cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('getSubMessage')
    approvalPage.getApproveButton().click({ force: true })
    approvalPage.getApproveRequest().click({ force: true })
    cy.wait(2000)
    //approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.editUser)
    //  cy.iframe().find('[id="generate-otp-icon"]').eq(0).click()
    cy.wait('@getSubMessage').then((interception) => {
        let response = interception.response.body
        const resValues = Object.values(response)
        let serviceRequestID = resValues[0]
        cy.log(serviceRequestID)
        let url1 = apiURL + ':9012/notify/internal/getByMessageIdOrExternalIdAndByToWhom?messageId='
        let url2 = url1.concat(serviceRequestID)
        let url3 = url2.concat('&toWhom=')

        cy.fixture('userData/subscriberReg.json').then((usermobile) => {
            SubMobile = usermobile.subscriberMobile
            cy.log(SubMobile)
        })
        let getURL = url3.concat(SubMobile)

        cy.request({
            url: getURL,
            headers: {
                'Authorization': 'Basic YWRtaW46c2VjcmV0',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            let res1 = res.body
            cy.readFile('cypress/fixtures/userData/subscriberMsg.json').then((data)=>{
                data.subscriberMessage=res1
                cy.writeFile('cypress/fixtures/userData/subscriberMsg.json', data)
            })
        })
    })
})


Cypress.Commands.add('RPRandomName', () => {
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
Cypress.Commands.add('FolderCreation',()=>{
    cy.writeFile('cypress/fixtures/userData/SystemAdminLogin.json',{SysAdminMakerName:' '})
    cy.writeFile('cypress/fixtures/userData/TCPdata.json', { TcpProfileName: ' ' })
    cy.writeFile('cypress/fixtures/userData/TCPdata1.json', { TcpProfileNameSub: ' ' })
    cy.writeFile('cypress/fixtures/userData/CustTCPdata.json', { CustTCPProfileName: ' ' })
    cy.writeFile('cypress/fixtures/userData/CustTCPdata1.json', { CustTCPProfileNameSub:' ' })
    cy.writeFile('cypress/fixtures/userData/subscriberMsg.json', {subscriberMessage:' '})
    cy.writeFile('cypress/fixtures/userData/UserManagement.json', { firstName: ' ' })
    cy.writeFile('cypress/fixtures/userData/Regulatory&MarketingProfile.json', {RegulatoryProfileName: ' '})
    cy.writeFile('cypress/fixtures/userData/Gradedata.json', {GradeName:' '})
    cy.writeFile('cypress/fixtures/userData/AdministratorMsg.json', {ModifyMessage:' '})
    cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json',{registeredMobile: ' ' })
    cy.writeFile("cypress/fixtures/userData/BusinessUsersDataO2C.json",{registeredMobileO2C: ' '})
    cy.writeFile('cypress/fixtures/userData/BusinessUserSuspensionData.json', { registeredMobile: ' '})
    cy.writeFile('cypress/fixtures/userData/churnSubscriberReg.json', { churnSubscriberRegistration: ' ' })
    cy.writeFile('cypress/fixtures/userData/cashIn&cashout.json',{cashinTransactionID:' '} )
    cy.writeFile('cypress/fixtures/userData/Aservice.json',{ServiceRuleName: ' '})
    cy.writeFile('cypress/fixtures/userData/AdministratorData.json',{BAMobileNumber: ' '})
    cy.writeFile('cypress/fixtures/userData/BankData.json',{BAMobileNumber: ' '})
    cy.writeFile('cypress/fixtures/userData/BusinessAdminLogin.json',{BAMobileNumber: ' '})
    cy.writeFile('cypress/fixtures/userData/Domain&CAT.json',{BAMobileNumber: ' '})
    cy.writeFile('cypress/fixtures/userData/O2CBulkData.json',{BAMobileNumber: ' '})
    cy.writeFile('cypress/fixtures/userData/O2Cdata.json',{BAMobileNumber: ' '})
    cy.writeFile('cypress/fixtures/userData/subscriberReg.json',{BAMobileNumber: ' '})
    cy.writeFile('cypress/fixtures/userData/TransactionFile.json',{BAMobileNumber: ' '})
    cy.writeFile('cypress/fixtures/churnData/ChurnUserInitiation.json',{IMSI:' '})
    cy.writeFile('cypress/fixtures/profileData/AuthProfile.json',{SubscriberProfileName:' '})
    cy.writeFile('cypress/fixtures/profileData/Profile.json',{SystemAdminSecuirtyProfile: ' '})
    cy.writeFile('cypress/fixtures/profileData/SecurityProfileName.json',{subscriber: ' '})
    cy.writeFile('cypress/fixtures/userData/WalletManagementdata.json',{WalletName:' '})
    cy.writeFile('cypress/fixtures/userData/WalletManagementdata.json',{BankName:' '})
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
        let getURL = url3.concat(mobile)
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
        cy.readFile(GradeFile).then((data) => {
        data.GradeName = hi
        cy.writeFile(GradeFile, data)
        })
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
//--------------------------------------------------------------------------------------
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

Cypress.Commands.add('O2CTransactionReadData', () => {
    cy.readFile(TransactionFile).then((id => {
        let data = id.TransactionID
        manageUsersPage.getSearchTransactionID().type(data, "{force:true}", "{enter}")
    }))
})
//-------------------------------------------------------------------------------------------
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


//----------------------------------------Approval----------------------

Cypress.Commands.add('getApproval',(filename) =>
cy.readFile(filename).then((user)  => {
    let Time = user.CreatedOnTime
    let shouldStop = false
    cy.iframe().find('.mat-table.cdk-table.mat-sort>mat-row').each(($row=>{
        cy.then(() => {
            if(shouldStop){
                return
            }
        cy.wrap($row).within(function(){
            cy.get('mat-cell').each(($el=>{
                cy.log($el.text())
                if($el.text().includes(Time) /*&& $el.text().includes()*/)
                {
                cy.get('[role="gridcell"]').eq(0).click({force: true})    
                shouldStop = true
                }
            }))
        })
    })
}))
})
)



Cypress.Commands.add('getTransferApproval',(filename) =>
cy.readFile('cypress/fixtures/userData/Domain&CAT.json').then((user)  => {
    let Time = user.Domainname
    let shouldStop = false
    cy.iframe().find('.wwFormTableC>tbody>tr').each(($row=>{
        cy.then(() => {
            if(shouldStop){
                return
            }
        cy.wrap($row).within(function(){
            cy.get('td').each(($el=>{
                cy.log($el.text())
                if($el.text().includes(Time))
                {
                cy.get('[class="tabcol"]').contains("Approve").click({force: true})    
                cy.wait(5000)
                shouldStop = true
                }
            }))
        })
    })
}))
})
)
//----------------------------------------O2C Transaction Approval ----------------------------
Cypress.Commands.add('getO2CData',(filename) =>
cy.readFile('cypress/fixtures/userData/TransactionFile.json').then((data)  => {
   let ID = data.referenceNumber
   let shouldStop = false
    cy.iframe().find('#o2cApproval1_displayTransactionDetails .wwFormTableC>tbody>tr','{force:true}').each(($row=>{
        cy.then(() => {
            if(shouldStop){
                return
            }
        cy.wrap($row).within(function(){
            cy.get('td').eq(3).each(($el=>{
                cy.log($el.text())
                if($el.text().includes(ID))
                {
                    cy.get('.tabcol').eq(4).then((al)=>{
                        let q = al.text()
                        cy.log(q)
                        let a = q.trim()
                        cy.log(a)
                        cy.readFile(TransactionFile).then((data) => {
                            data.TransactionID = a
                            cy.writeFile(TransactionFile, data)
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
Cypress.Commands.add('getO2CData1',(filename) =>
cy.readFile('cypress/fixtures/userData/TransactionFile.json').then((data)  => {
   let ID = data.referenceNumber
   let shouldStop = false
    cy.iframe().find('#o2cApproval1_displayTransactionDetails .wwFormTableC>tbody>tr','{force:true}').each(($row=>{
        cy.then(() => {
            if(shouldStop){
                return
            }
        cy.wrap($row).within(function(){
            cy.get('td').eq(3).each(($el=>{
                cy.log($el.text())
                if($el.text().includes(ID))
                {
                    cy.get('.tabcol').eq(4).then((al)=>{
                        let q = al.text()
                        cy.log(q)
                        let a = q.trim()
                        cy.log(a)
                        cy.readFile(TransactionFile).then((data) => {
                            data.TransactionID1 = a
                            cy.writeFile(TransactionFile, data)
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
Cypress.Commands.add('getO2CData2',(filename) =>
cy.readFile('cypress/fixtures/userData/TransactionFile.json').then((data)  => {
   let ID = data.referenceNumber
   let shouldStop = false
    cy.iframe().find('#o2cApproval1_displayTransactionDetails .wwFormTableC>tbody>tr','{force:true}').each(($row=>{
        cy.then(() => {
            if(shouldStop){
                return
            }
        cy.wrap($row).within(function(){
            cy.get('td').eq(3).each(($el=>{
                cy.log($el.text())
                if($el.text().includes(ID))
                {
                    cy.get('.tabcol').eq(4).then((al)=>{
                        let q = al.text()
                        cy.log(q)
                        let a = q.trim()
                        cy.log(a)
                        cy.readFile(TransactionFile).then((data) => {
                            data.TransactionID2 = a
                            cy.writeFile(TransactionFile, data)
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
Cypress.Commands.add('getO2CData3',(filename) =>
cy.readFile('cypress/fixtures/userData/TransactionFile.json').then((data)  => {
   let ID = data.referenceNumber
   let shouldStop = false
    cy.iframe().find('#o2cApproval1_displayTransactionDetails .wwFormTableC>tbody>tr','{force:true}').each(($row=>{
        cy.then(() => {
            if(shouldStop){
                return
            }
        cy.wrap($row).within(function(){
            cy.get('td').eq(3).each(($el=>{
                cy.log($el.text())
                if($el.text().includes(ID))
                {
                    cy.get('.tabcol').eq(4).then((al)=>{
                        let q = al.text()
                        cy.log(q)
                        let a = q.trim()
                        cy.log(a)
                        cy.readFile(TransactionFile).then((data) => {
                            data.TransactionID3 = a
                            cy.writeFile(TransactionFile, data)
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

//-------------------Arpitha---------------------------
Cypress.Commands.add('checkAPI', (API) => {
    //cy.visit(URL + '/dfscontainer/#/')
    cy.intercept(API).as('all')
    cy.wait('@all', { timeout: 10000 }).then(inter => {
        if (inter.response.statusCode == 200) {
            cy.log('statusCode loop entered now')
            cy.log(JSON.stringify(inter.response.statusCode))
            console.log(JSON.stringify(inter.response.statusCode))
            cy.log('statusCode loop exit now')
        }
        else {
            cy.log('ERROR')
            cy.log(JSON.stringify(inter.response.statusCode))
            console.log(JSON.stringify(inter.response.statusCode))

        }

    })

})
