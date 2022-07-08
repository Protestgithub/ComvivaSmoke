/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';

import "../../../../../support/commands";
import "../../../../../support/securityCommands";
import "../../../../../support/TransferControlProfileCommand";
import BankManagement from '../../../../../support/pageObjects/BankManagement';
import 'cypress-file-upload'
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import DomainFieldspage from '../../../../../support/pageObjects/DomainManagement/DomainFieldspage';
import CircularJSON from 'circular-json';
import Flatted from 'flatted';
import TransferRulePage from '../../../../../support/pageObjects/TransferRules/TransferRulePage';
import TransferControlProfile from '../../../../../support/pageObjects/TransferControlProfile';
import TransactionCorrection from '../../../../../support/pageObjects/TransactionCorrection';
import ErrorMessage from '../../../../../support/pageObjects/UserManagement/ErrorMessage';
import walletManagement from '../../../../../support/pageObjects/WalletManagement/walletManagement';
import AddGrades from '../../../../../support/pageObjects/GradeManagement/AddGrades';
import ModifyGrades from '../../../../../support/pageObjects/GradeManagement/ModifyGrades';
import DeleteGrades from '../../../../../support/pageObjects/GradeManagement/DeleteGrades';
import AddCategory from '../../../../../support/pageObjects/CategoryManagement/AddCategory';
import SecurityProfilePage from '../../../../../support/pageObjects/SecurityProfile/SecurityProfilePage';
import "../../../../../support/authourizationcommands"
import authorizationManagement from '../../../../../support/pageObjects/AuthorizationProfileManagement/authorizationManagement';
import RegulatoryProfile from '../../../../../support/pageObjects/UserManagement/RegulatoryProfile';
import MarketingProfile from '../../../../../support/pageObjects/UserManagement/MarketingProfile';




//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const ErrorM=new ErrorMessage()
const AddCategoryPage = new AddCategory()
const BankManagementPage = new BankManagement()
const WalletManagementPage = new walletManagement()
const domainPage = new DomainFieldspage()
const AddGradePage = new AddGrades()
const tcpPage = new TransferControlProfile()
const securityProfilePage = new SecurityProfilePage()
const authorizationProfilePage = new authorizationManagement()
const uid1 = () => Cypress._.random(1e2)
const Id = uid1()
const profilename = `testname${id}`
var RegulatoryFile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
const MarketingProfile1 = new MarketingProfile()
const RegulatoryProfile1 = new RegulatoryProfile()
var number
const uid = () => Cypress._.random(0, 1e6)
const id = uid()
const filenameTCP = 'userData/TCPdata.json'
const CustTCPdata = 'userData/CustTCPdata.json'
const fileRegulatoryProfile = 'userData/Regulatory&MarketingProfile.json'
var Tcpname
var Tcpname1
var TcpnameSub
var RName



var filename1 = 'cypress/fixtures/WalletManagementdata.json'
const uuid = () => Cypress._.random(1e10)
const uud = () => Cypress._.random(1e3)
PoolAccountNo =  uuid()
BankID = uuid()
Priority = uud()
var name
var PoolAccountNo
var BankID
var Priority
var LoginId1
const uuid12 = () => Cypress._.random(1e8)
LoginId1= uuid12()





//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('BankManagement').then(function(data03)
  {
     this.data03 = data03;
  })
  cy.fixture('Domain&CategoryManagement').then(function(data4)
  {
      this.data4 = data4;
  })
  cy.fixture('TransferControlProfile').then(function (data5) {
    this.data5 = data5;
  })

  cy.fixture('GradeManagement').then(function(data01)
  {
      this.data01 = data01;
  })
  cy.fixture('SecurityProfile').then(function (data6) {
    this.data6 = data6;
  })
  cy.fixture('authorizationProfile').then(function (data7) {
    this.data7 = data7;
  })

}); 

//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Maker after Logout', function () {
  cy.loginAgain(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
  cy.loginAgain(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)

})
Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})

//----------------------------------------------------------------------------------------------------
  Given('Login into Mobiquity Portal as masteradmin Maker', function(){
    cy.wait(3000)
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.masterAdmin2.masterchckr1, this.data1.masterAdmin2.mstAdminPwd1)
    cy.wait(2000)
   // cy.checkWelcomeText(this.data2.SuperAdminChecker)
  })  
//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
})
//superadminc
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
})
Given('Login into Mobiquity Portal as Super admin Maker after Logout', function () {
  cy.loginAgain(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data2.superadminm.superadminmaker)
})

Given('Login into Mobiquity Portal as Super admin Checker after Logout', function () {
  cy.loginAgain(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data2.superadminc.superadminchecker)
})

Given ('Login with Master Admin Checker', function(){
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
    cy.wait(2000)
  })

//--------------------------------------TCP creation---------------------------------------------------


When('Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP', function () {
  welcomePage.getTransferControlProfile().click()
  cy.wait(3000)
  welcomePage.getManageInstrumentLevelTCP().click()
  cy.wait(3000)
})
When('Navigate to Transfer Control Profile', function () {
  welcomePage.getTransferControlProfileSA().click()
  cy.wait(3000)
})
And('Click on Add New Button', function () {
  pageLogin.getiFrame()
  cy.wait(3000)
  tcpPage.getNew().click({ force: true })

})
Then('Enter required Fields for error message', function () {

  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
  tcpPage.getgrade().select(this.data5.TransferControlProfile.Grade, { force: true })
  tcpPage.getpaymentinstrument().select(this.data5.TransferControlProfile.PaymentInstrument, { force: true })
  tcpPage.getwallettype().select(this.data5.TransferControlProfile.Wallet, { force: true })
  cy.fixture(filenameTCP).then((user) => {
    Tcpname = user.TcpProfileName
    cy.log(Tcpname)
    tcpPage.getprofilename().type(Tcpname)
  })
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description)

})
Then('Enter required Fields', function () {

  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
  tcpPage.getgrade().select(this.data5.TransferControlProfile.Grade, { force: true })
  tcpPage.getpaymentinstrument().select(this.data5.TransferControlProfile.PaymentInstrument, { force: true })
  tcpPage.getwallettype().select(this.data5.TransferControlProfile.Wallet, { force: true })
  cy.TCPRandomName()
  //tcpPage.getProfileName().type(getRandomName(), { force: true })
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })
  /* recurse( 
     ()=> getRandomName(), 
     ()=>tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true }), 
     ()=>cy.wait(200),  
     (uniqueness) => (uniqueness) == tcpPage.getErrorMessage().contains 
     ('Please select another profile name as this profile name is being used by an active profile').should('be.visible'), 
     tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })    
   )*/
})
Then('Enter required Fields for Subscriber domain', function () {

  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain1, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category1, { force: true })
  tcpPage.getgrade().select(this.data5.TransferControlProfile.Grade1, { force: true })
  tcpPage.getpaymentinstrument().select(this.data5.TransferControlProfile.PaymentInstrument, { force: true })
  tcpPage.getwallettype().select(this.data5.TransferControlProfile.Wallet, { force: true })
  cy.TCPRandomNameSub()
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })
})

And('Click on New Button', function () {

  tcpPage.getNew().click({ force: true })
  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
  cy.fixture(fileRegulatoryProfile).then((user) => {
    RName = user.RegulatoryProfileName
    cy.log(RName)
    tcpPage.getregulatorytype().select(RName, { force: true })
  })
  cy.TCPMasRandomName()
  //tcpPage.getProfileName(getRandomName(),{force:true})
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description)
  /* recurse( 
     ()=> getRandomName(), 
     ()=>tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true }), 
     ()=>cy.wait(200),   
     (uniqueness) => (uniqueness) == tcpPage.getErrorMessage().contains 
     ('Please select another profile name as this profile name is being used by an active profile').should('be.visible'), 
     tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })    
    )*/
  tcpPage.getadd().click({ force: true })
  cy.wait(3000)
  const uuid = () => Cypress._.random(1e3)
  number = uuid()
  tcpPage.getAmount().each((e1, index, list) => {
    cy.wrap(e1).type(number)
  })
  tcpPage.getcountmaster().each((e1, index, list) => {
    cy.wrap(e1).type(number)
  })
  tcpPage.getusermaxbalanceMaster().type(this.data5.TransferControlProfile.UserMaxBal)
  tcpPage.getNextEdit().click({ force: true })
  tcpPage.getConfirmEdit().click({ force: true })

})

And('Verify Success Message for creation of TCP through Master admin', function () {
  cy.fixture(CustTCPdata).then((user) => {
    Tcpname1 = user.CustTCPProfileName
    cy.wait(2000)
    cy.log(Tcpname1)
    tcpPage.getReqtoAddMaster().should("have.text", this.data5.confimationMessage.addIntiationPart1Master + Tcpname1 + this.data5.confimationMessage.addIntiationPart2Master)
  })
})
And('Verify Add Intiation Message for Master', function () {
  cy.fixture(CustTCPdata).then((user) => {
    Tcpname1 = user.CustTCPProfileName
    cy.log(Tcpname1)
    tcpPage.getReqtoAddIntiationMaster().should("contain", this.data5.confimationMessage.sucessMasterTcpIntiation + Tcpname1 + this.data5.confimationMessage.successpart2Master)
    cy.wait(3000)
  })
})
  Then('Verify Add Intiation Message', function () {
      cy.TcpName()
      tcpPage.getReqtoAdd().should("contain", this.data5.confimationMessage.addIntiationPart1 + Tcpname + this.data5.confimationMessage.addIntiationPart2)
      cy.wait(3000)
    })
    Then('Verify Add Intiation Message for Subscriber domain', function () {
      cy.TcpNameSub()
      tcpPage.getReqtoAdd().should("contain", this.data5.confimationMessage.addIntiationPart1 + TcpnameSub + this.data5.confimationMessage.addIntiationPart3)
      cy.wait(3000)
    })  
Then('Approve the TCP', function () {
  cy.fixture(CustTCPdata).then((user) => {
    Tcpname1 = user.CustTCPProfileName
    cy.log(Tcpname1)
  })
  tcpPage.getinstrumentlevelTCP().each(($row => {
    cy.wrap($row).within(function () {
      cy.get('td').each(($el => {
        if ($el.text() == Tcpname1) {
          cy.get('a').click({ force: true })

        }
      }))
    })
  }))
  tcpPage.getApproveTCP1().click({ force: true })
}) 

And('Click on Create Button', function () {
  tcpPage.getCreate().click({ force: true })
})
Then('Enter all required amount and count', function () {
  pageLogin.getiFrame()
  cy.wait(3000)
  const uuid = () => Cypress._.random(1e3)
  number = uuid()
  tcpPage.getcount().each((e1, index, list) => {
    cy.wrap(e1).type(number)
  })
  tcpPage.getLoadServiceReq().type(number)
  tcpPage.getLoadServiceReq2().type(number)
  tcpPage.getLocalPoPurchase().type(number) 
tcpPage.getLocalPoPurchase1().type(number)  
tcpPage.getlocalwithdrawal().type(number)  
tcpPage.getlocalwithdrawal1().type(number)
tcpPage.getlocalwithdrawal2().type(number) 
tcpPage.getlocalwithdrawal3().type(number) 
tcpPage.getContactlessPayment().type(number)
tcpPage.getContactlessPayment1().type(number)
tcpPage.getCardATMPaymentCashout().type(number) 
tcpPage.getCardATMPaymentCashout1().type(number)  
tcpPage.getCardInternetPayment().type(number)  
tcpPage.getCardInternetPayment1().type(number)  
tcpPage.getLocalpospurchasecontactless().type(number) 
tcpPage.getLocalpospurchasecontactless1().type(number)  
tcpPage.getLoadReversalReqflow().type(number) 
tcpPage.getLoadReversalReqflow1().type(number)  
tcpPage.getcardpayment().type(number)
tcpPage.getcardpayment1().type(number)  
tcpPage.getcardadujsment().type(number)
tcpPage.getcardadujsment1().type(number)  
tcpPage.getQRMerchantPayment().type(number)
tcpPage.getQRMerchantPayment1().type(number)

  tcpPage.getUserminbalance().type(this.data5.TransferControlProfile.UserMinBal)
  tcpPage.getUsermaximumbalance().type(this.data5.TransferControlProfile.UserMaxBal)
  tcpPage.getUserMinTransactionAmount().type(this.data5.TransferControlProfile.MinTranAmount)
  tcpPage.getUserMaxTransactionAmount().type(this.data5.TransferControlProfile.MaxTranAmount)
  tcpPage.getMaxPercentageTransferAllowed().type(this.data5.TransferControlProfile.MaxPerAllowed)
  tcpPage.getNext().click({ force: true })
  cy.wait(3000)
  tcpPage.getNext().click({ force: true })
  cy.wait(3000)
  welcomePage.getTransferControlProfile()
    .scrollIntoView()
})
Then('Enter all required amount and count for Subscriber domain', function () {
  pageLogin.getiFrame()
  cy.wait(3000)
  const uuid = () => Cypress._.random(1e3)
  number = uuid()
  tcpPage.getcount().each((e1, index, list) => {
    cy.wrap(e1).type(number)
  })
  tcpPage.getUserminbalance().type(this.data5.TransferControlProfile.UserMinBal)
  tcpPage.getUsermaximumbalance().type(this.data5.TransferControlProfile.UserMaxBal)
  tcpPage.getUserMinTransactionAmount().type(this.data5.TransferControlProfile.MinTranAmount)
  tcpPage.getUserMaxTransactionAmount().type(this.data5.TransferControlProfile.MaxTranAmount)
  tcpPage.getMaxPercentageTransferAllowed().type(this.data5.TransferControlProfile.MaxPerAllowed)
  tcpPage.getNext().click({ force: true })
  cy.wait(3000)
  tcpPage.getNext().click({ force: true })
  cy.wait(3000)
  welcomePage.getTransferControlProfile()
    .scrollIntoView()
})

And('Click on Instrument Level TCP', function () {
  welcomePage.getTransferControlProfile().click()
  welcomePage.getInstrumentLevelTCPApproval().click()
  cy.wait(4000)
  tcpPage.getinstrumentlevelTCP().within(function () {
    cy.fixture(filenameTCP).then((user) => {
      Tcpname = user.TcpProfileName
      cy.log(Tcpname)
      cy.get("td").eq(1)
      cy.get("a").contains(Tcpname).click({ force: true })
    })
  })
  tcpPage.getApproveTCP().click({ force: true })
})
And('Click on Instrument Level TCP1', function () {
  welcomePage.getTransferControlProfile().click()
  welcomePage.getInstrumentLevelTCPApproval().click()
  cy.wait(4000)
  tcpPage.getinstrumentlevelTCP().within(function () {
    cy.fixture(filenameTCP).then((user) => {
      TcpnameSub = user.TcpProfileNameSub
      cy.log(TcpnameSub)
      cy.get("td").eq(1)
      cy.get("a").contains(TcpnameSub).click({ force: true })
    })
  })
  tcpPage.getApproveTCP().click({ force: true })
})

Then('Verify Success Message', function () {
  cy.fixture(filenameTCP).then((user) => {
    Tcpname = user.TcpProfileName
    cy.log(Tcpname)
    tcpPage.getsucessmessage().should("contain", this.data5.confimationMessage.successfulTcpIntiation + Tcpname + this.data5.confimationMessage.successpart2)
  })
})  
Then('Verify Success Message Subscriber domain', function () {
  cy.fixture(filenameTCP).then((user) => {
    TcpnameSub = user.TcpProfileNameSub
    cy.log(TcpnameSub)
    tcpPage.getsucessmessage().should("contain", this.data5.confimationMessage.successfulTcpIntiation + TcpnameSub + this.data5.confimationMessage.successpart2Sub)
  })
})
And('Verify Add Intiation Message for Master', function () {
  cy.fixture(CustTCPdata).then((user) => {
    Tcpname1 = user.CustTCPProfileName
    cy.log(Tcpname1)
    tcpPage.getReqtoAddIntiationMaster().should("contain", this.data5.confimationMessage.sucessMasterTcpIntiation + Tcpname1 + this.data5.confimationMessage.successpart2Master)
    cy.wait(3000)
  })
})  

//------------------------------  REGULATORY PROFILE--------------------------------------------

When('Navigate to UserManagement And Click on Regulatory Profile', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getregulatoryprofile().click()
  cy.wait(3000)
})

And('click on Add Regulatory Profile and Enter Profile Code and Profile Name', function () {
  cy.iframe().find('[id="profileCode"]').type(id)
  recurse(
    () => cy.iframe().find('[id="profileCode"]').clear().type(id),
    () => cy.iframe().find('.MuiButton-label').contains("Search").click({force: true}),
    (uniqueness) => (uniqueness) == cy.iframe().find('table > tbody').should('have.length', "1")
  )
  cy.log(id)
  RegulatoryProfile1.getaddregulatoryprofile().click(),
  RegulatoryProfile1.getregulatoryprofilecode().type(id,{force:true}),
  cy.RPRandomName(),
  RegulatoryProfile1.getregulatorysavebtn().click()
  cy.readFile(RegulatoryFile).then((data) => {
    data.RegulatoryProfileCode = id
    cy.writeFile(RegulatoryFile, data)

  })
})

Then('Click On Save Regulatory Profile', function () {
    RegulatoryProfile1.getrpsuccess().contains(this.data2.Sucess)
  cy.wait(3000)

})