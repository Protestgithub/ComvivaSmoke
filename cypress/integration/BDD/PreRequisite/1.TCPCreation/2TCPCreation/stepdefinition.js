/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';
import "../../../../../support/commands";
import "../../../../../support/TransferControlProfileCommand";
import TransferControlProfile from '../../../../../support/pageObjects/TransferControlProfile';
import RegulatoryProfile from '../../../../../support/pageObjects/UserManagement/RegulatoryProfile';
import MarketingProfile from '../../../../../support/pageObjects/UserManagement/MarketingProfile';

//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const tcpPage = new TransferControlProfile()
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
const uuid12 = () => Cypress._.random(1e8)
var LoginId1
LoginId1 = uuid12()
const filenameTCP = 'userData/TCPdata.json'
const filenameTCP1 = 'userData/TCPdata1.json'
const CustTCPdata = 'userData/CustTCPdata.json'
const CustTCPdata1= 'userData/CustTCPdata1.json'
const fileRegulatoryProfile = 'userData/Regulatory&MarketingProfile.json'
var Tcpname, Tcpname1,TcpnameSub,TcpnameSub1, RName
const ITCP="userData/TCPdata.json"
const ITCP1="userData/TCPdata1.json"





//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('TransferControlProfile').then(function (data5) {
    this.data5 = data5;
  })
  
}); 

//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})

Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})

//----------------------------------------------------------------------------------------------------
  //superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  
})
//superadminc
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
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
Then('Enter required Fields', function () {

  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
  tcpPage.getgrade().select(this.data5.TransferControlProfile.Grade, { force: true })
  tcpPage.getpaymentinstrument().select(this.data5.TransferControlProfile.PaymentInstrument, { force: true })
  tcpPage.getwallettype().select(this.data5.TransferControlProfile.Wallet, { force: true })
  cy.TCPRandomName()
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })
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
//tcpPage.getlocalwithdrawal2().type(number) 
//tcpPage.getlocalwithdrawal3().type(number) 
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
    cy.fixture(filenameTCP1).then((user) => {
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
  cy.fixture(filenameTCP1).then((user) => {
    TcpnameSub = user.TcpProfileNameSub
    cy.log(TcpnameSub)
    tcpPage.getsucessmessage().should("contain", this.data5.confimationMessage.successfulTcpIntiation + TcpnameSub + this.data5.confimationMessage.successpart2Sub)
  })
})

And('Verify Success Message for creation of TCP through Master admin1', function () {
  cy.fixture(CustTCPdata1).then((user) => {
    TcpnameSub1= user.CustTCPProfileNameSub
    cy.wait(2000)
    cy.log(TcpnameSub1)
    tcpPage.getReqtoAddMaster().should("have.text", this.data5.confimationMessage.addIntiationPart1Master + TcpnameSub1 + this.data5.confimationMessage.addIntiationPart3)
  })
})

Then('Approve the TCP1', function () {
  cy.fixture(CustTCPdata1).then((user) => {
    TcpnameSub1 = user.CustTCPProfileNameSub
    cy.log(TcpnameSub1)
    })
  tcpPage.getinstrumentlevelTCP().each(($row => {
    cy.wrap($row).within(function () {
      cy.get('td').each(($el => {
        if ($el.text() == TcpnameSub1) {
          cy.get('a').click({ force: true })

        }
      }))
    })
  }))
  tcpPage.getApproveTCP1().click({ force: true })
}) 



//------------------------------  MARKETING PROFILE--------------------------------------------

When('Navigate to UserManagement And Click on Marketing Profile', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getmarketingprofile().click()
  cy.wait(3000)
})

And('Add Marketing Profile', function () {
  cy.iframe().find('[id="profileCode"]').type(id)
  recurse(
    () => cy.iframe().find('[id="profileCode"]').clear().type(id),
    () => cy.iframe().find('.MuiButton-label').eq(1).click({force: true}),
    (uniqueness) => (uniqueness) == cy.iframe().find('table > tbody').should('have.length', "1")
  )
  MarketingProfile1.getAddMarketingProfile().click()
  MarketingProfile1.getMarketingProfileCode().type(id, { force: true })
  cy.MPRandomName1()
  MarketingProfile1.getMarketingProfileDomainName().click()
  MarketingProfile1.getMarketingProfileDomainName1().click()
  MarketingProfile1.getMarketingProfileCategoryName().click()
  MarketingProfile1.getMarketingProfileCategoryName1().click()
  MarketingProfile1.getMarketingProfileMFSProvider().click()
  MarketingProfile1.getMarketingProfileMFSProvider1().click()
  MarketingProfile1.getMarketingProfileWalletType().click()
  MarketingProfile1.getMarketingProfileWalletType1().click()
  MarketingProfile1.getMarketingProfileGrade().click()
  MarketingProfile1.getMarketingProfileGrade1().click()
  MarketingProfile1.getMarketingProfileInstrumentTCP().click()
  MarketingProfile1.getMarketingProfileInstrumentTCP1().click()
  MarketingProfile1.getMarketingProfileAddBtn().click()
  cy.wait(3000)
  cy.readFile(RegulatoryFile).then((data) => {
    data.MarketingProfileCodeDistributer = id
    cy.writeFile(RegulatoryFile, data)
  })
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Marketing)
})


And('Add Marketing Profile Wholesaler', function () {
  cy.iframe().find('[id="profileCode"]').type(LoginId1)
  recurse(
    () => cy.iframe().find('[id="profileCode"]').clear().type(LoginId1),
    () => cy.iframe().find('.MuiButton-label').eq(1).click({force: true}),
    (uniqueness) => (uniqueness) == cy.iframe().find('table > tbody').should('have.length', "1")
  )
  MarketingProfile1.getAddMarketingProfile().click()
  MarketingProfile1.getMarketingProfileCode().type(LoginId1, { force: true })
  cy.MPRandomName()
  MarketingProfile1.getMarketingProfileDomainName().click()
  MarketingProfile1.getMarketingProfileDomainWholesaler().click()
  MarketingProfile1.getMarketingProfileCategoryName().click()
  MarketingProfile1.getMarketingProfileCategoryWholesaler().click()
  MarketingProfile1.getMarketingProfileMFSProvider().click()
  MarketingProfile1.getMarketingProfileMFSProvider1().click()
  MarketingProfile1.getMarketingProfileWalletType().click()
  MarketingProfile1.getMarketingProfileWalletType1().click()
  MarketingProfile1.getMarketingProfileGrade().click()
  MarketingProfile1.getMarketingProfileGradeWholesaler().click()
  MarketingProfile1.getMarketingProfileInstrumentTCP().click()
  MarketingProfile1.getMarketingProfileInstrumentTCP1().click()
  MarketingProfile1.getMarketingProfileAddBtn1().click()
  cy.wait(3000)
  cy.readFile(RegulatoryFile).then((data) => {
    data.MarketingProfileCode = LoginId1
    cy.writeFile(RegulatoryFile, data)
  })
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Marketing)
})

