/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';
import "../../../../../support/utils/Generic";
import "../../../../../support/utils/TransferControlProfileCommand";
import TransferControlProfile from '../../../../../support/pageObjects/TransferControlProfile';
import RegulatoryProfile from '../../../../../support/pageObjects/UserManagement/RegulatoryProfile';
import MarketingProfile from '../../../../../support/pageObjects/UserManagement/MarketingProfile';
//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const tcpPage = new TransferControlProfile()
var RegulatoryFile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
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
const CustTCPdata1 = 'userData/CustTCPdata1.json'
const fileRegulatoryProfile = 'userData/Regulatory&MarketingProfile.json'
var Tcpname, Tcpname1, TcpnameSub, TcpnameSub1, RName
const ITCP = "userData/TCPdata.json"
const ITCP1 = "userData/TCPdata1.json"




//---------------------------------------------Login----------------------------------------------------
//---------------------------------------------System Admin Login----------------------------------------------------

//----------------------------------------------------------------------------------------------------
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
  //cy.intercept('CoreWeb/tcprf/tcpUserLevel_loadProvidersNew.action').as('all')
  tcpPage.getNew().click({ force: true })
  //cy.checkAPI('CoreWeb/tcprf/tcpUserLevel_loadProvidersNew.action')

})
And('Enter required Fields', function () {

  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
  tcpPage.getgrade().select(this.data5.TransferControlProfile.Grade, { force: true })
  tcpPage.getpaymentinstrument().select(this.data5.TransferControlProfile.PaymentInstrument, { force: true })
  tcpPage.getwallettype().select(this.data5.TransferControlProfile.Wallet, { force: true })
  cy.TCPRandomName()
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })
tcpPage.getCreate().click({ force: true })
})
And('Enter required Fields for Subscriber domain', function () {

  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain1, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category1, { force: true })
  tcpPage.getgrade().select(this.data5.TransferControlProfile.Grade1, { force: true })
  tcpPage.getpaymentinstrument().select(this.data5.TransferControlProfile.PaymentInstrument, { force: true })
  tcpPage.getwallettype().select(this.data5.TransferControlProfile.Wallet, { force: true })
  cy.TCPRandomNameSub()
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })
tcpPage.getCreate().click({ force: true })
})

And('Click on New Button', function () {

  //cy.intercept('/CoreWeb/tcprf/tcpUserLevel_loadDomainsNew.action').as('all')
  tcpPage.getNew().click({ force: true })
  //cy.checkAPI('/CoreWeb/tcprf/tcpUserLevel_loadDomainsNew.action')
  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
  cy.fixture(fileRegulatoryProfile).then((user) => {
    RName = user.RegulatoryProfileName
    cy.log(RName)
    tcpPage.getregulatorytype().select(RName, { force: true })
  })
  cy.TCPMasRandomName()
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description)
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
  //cy.intercept('/CoreWeb/tcprf/tcpUserLevel_confirmInitCustAll.action').as('all')
  tcpPage.getNextEdit().click({ force: true })
  //cy.checkAPI('/CoreWeb/tcprf/tcpUserLevel_confirmInitCustAll.action')
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
Then('Verify Add Intiation Message for Master', function () {
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
And('Approve the TCP', function () {
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


And('Enter all required amount and count', function () {
  pageLogin.getiFrame()
  cy.wait(5000)
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
  //cy.intercept('/CoreWeb/tcprf/tcpInstrumentLevel_vaildateCountsNAmounts.action').as('all')
  tcpPage.getNext().click({ force: true })
  //cy.checkAPI('/CoreWeb/tcprf/tcpInstrumentLevel_vaildateCountsNAmounts.action')

  cy.wait(3000)
  //cy.intercept('/CoreWeb/tcprf/tcpInstrumentLevel_createNewTCP.action').as('all')
  tcpPage.getNext().click({ force: true })
  //cy.checkAPI('/CoreWeb/tcprf/tcpInstrumentLevel_createNewTCP.action')

  cy.wait(3000)
  welcomePage.getTransferControlProfile()
    .scrollIntoView()
})
And('Enter all required amount and count for Subscriber domain', function () {
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

  //cy.intercept('/CoreWeb/tcprf/tcpInstrumentLevel_vaildateCountsNAmounts.action').as('all')
  tcpPage.getNext().click({ force: true })
  //cy.checkAPI('/CoreWeb/tcprf/tcpInstrumentLevel_vaildateCountsNAmounts.action')

  cy.wait(3000)
 // cy.intercept('/CoreWeb/tcprf/tcpInstrumentLevel_createNewTCP.action').as('all')
  tcpPage.getNext().click({ force: true })
  //cy.checkAPI('/CoreWeb/tcprf/tcpInstrumentLevel_createNewTCP.action')
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
  //cy.intercept('/CoreWeb/tcprf/tcpInstrumentLevelAppr_approveTCP.action?statusCode=AI&requestType=approve').as('all')
  tcpPage.getApproveTCP().click({ force: true })
  //cy.checkAPI('/CoreWeb/tcprf/tcpInstrumentLevelAppr_approveTCP.action?statusCode=AI&requestType=approve')
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
  //cy.intercept('/CoreWeb/tcprf/tcpInstrumentLevelAppr_approveTCP.action?statusCode=AI&requestType=approve').as('all')
  tcpPage.getApproveTCP().click({ force: true })
  //cy.checkAPI('/CoreWeb/tcprf/tcpInstrumentLevelAppr_approveTCP.action?statusCode=AI&requestType=approve')
})

And('Verify Success Message', function () {
  cy.fixture(filenameTCP).then((user) => {
    Tcpname = user.TcpProfileName
    cy.log(Tcpname)
    tcpPage.getsucessmessage().should("contain", this.data5.confimationMessage.successfulTcpIntiation + Tcpname + this.data5.confimationMessage.successpart2)
  })
})
And('Verify Success Message Subscriber domain', function () {
  cy.fixture(filenameTCP1).then((user) => {
    TcpnameSub = user.TcpProfileNameSub
    cy.log(TcpnameSub)
    tcpPage.getsucessmessage().should("contain", this.data5.confimationMessage.successfulTcpIntiation + TcpnameSub + this.data5.confimationMessage.successpart2Sub)
  })
})
And('Click on New Button for Subscriber', function () {

  tcpPage.getNew().click({ force: true })
  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain1, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category1, { force: true })
  cy.fixture(fileRegulatoryProfile).then((user) => {
    RName = user.RegulatoryProfileName
    cy.log(RName)
    tcpPage.getregulatorytype().select(RName, { force: true })
  })
  cy.TCPMasRandomNameSub()
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description)
  tcpPage.getadd().click({ force: true })
  cy.wait(3000)
  const uuid = () => Cypress._.random(1e3)
  number = uuid()
  tcpPage.getAmount().each((e1, index, list) => {
    1
    cy.wrap(e1).type(number)
  })
  tcpPage.getcountmaster().each((e1, index, list) => {
    cy.wrap(e1).type(number)
  })
  tcpPage.getusermaxbalanceMaster().type(this.data5.TransferControlProfile.UserMaxBal)
  tcpPage.getNextEdit().click({ force: true })
  tcpPage.getConfirmEdit().click({ force: true })

})

And('Verify Success Message for creation of TCP through Master admin1', function () {
  cy.fixture(CustTCPdata1).then((user) => {
    TcpnameSub1 = user.CustTCPProfileNameSub
    cy.wait(2000)
    cy.log(TcpnameSub1)
    tcpPage.getReqtoAddMaster().should("have.text", this.data5.confimationMessage.addIntiationPart1Master + TcpnameSub1 + this.data5.confimationMessage.addIntiationPart3)
  })
})

Then('Verify Add Intiation Message for Master1', function () {
  cy.fixture(CustTCPdata1).then((user) => {
    TcpnameSub1 = user.CustTCPProfileNameSub
    cy.log(TcpnameSub1)
    tcpPage.getReqtoAddIntiationMaster().should("contain", this.data5.confimationMessage.sucessMasterTcpIntiation + TcpnameSub1 + this.data5.confimationMessage.successpart2Sub)
    cy.wait(3000)
  })
})

And('Approve the TCP1', function () {
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
  //cy.intercept('/CoreWeb/tcprf/tcpUserLevelAppr_approveProfile.action?requestType=approve&statusCode=AI').as('all')
  tcpPage.getApproveTCP1().click({ force: true })
  //cy.checkAPI('/CoreWeb/tcprf/tcpUserLevelAppr_approveProfile.action?requestType=approve&statusCode=AI')
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
    () => cy.iframe().find('.MuiButton-label').contains("Search").click({ force: true }),
    (uniqueness) => (uniqueness) == cy.iframe().find('table > tbody').should('have.length', "1")
  )
  cy.log(id)
  cy.intercept('mobiquitypay/v1/regulatoryProfile').as('all')
  RegulatoryProfile1.getaddregulatoryprofile().click(),
    RegulatoryProfile1.getregulatoryprofilecode().type(id, { force: true }),
    cy.RPRandomName(),
    RegulatoryProfile1.getregulatorysavebtn().click()
  cy.checkAPI('mobiquitypay/v1/regulatoryProfile')
  cy.readFile(RegulatoryFile).then((data) => {
    data.RegulatoryProfileCode = id
    cy.writeFile(RegulatoryFile, data)

  })

})

Then('Click On Save Regulatory Profile', function () {
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Sucess)
  cy.wait(3000)

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
    () => cy.iframe().find('.MuiButton-label').contains("Search").click({force: true}),
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
  cy.fixture(ITCP1).then((user)=>{
    var SITCP=user.TcpProfileNameSub
    cy.log(SITCP)
    MarketingProfile1.getMarketingProfileInstrumentTCP().click()
    MarketingProfile1.getMarketingProfileInstrumentTCP1().contains(SITCP).click()
  })
  MarketingProfile1.getMarketingProfileAddBtn().click()
  cy.wait(3000)
  cy.readFile(RegulatoryFile).then((data) => {
    data.MarketingProfileCodeDistributer = id
    cy.writeFile(RegulatoryFile, data)
  })
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Marketing)
})


Then('Add Marketing Profile Wholesaler', function () {
  cy.iframe().find('[id="profileCode"]').type(LoginId1)
  recurse(
    () => cy.iframe().find('[id="profileCode"]').clear().type(LoginId1),
    () => cy.iframe().find('.MuiButton-label').contains("Search").click({force: true}),
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
  cy.fixture(ITCP).then((user)=>{
    var WITCP=user.TcpProfileName
    cy.log(WITCP)
    MarketingProfile1.getMarketingProfileInstrumentTCP().click()
    MarketingProfile1.getMarketingProfileInstrumentTCP1().contains(WITCP).click()
  })
  MarketingProfile1.getMarketingProfileAddBtn1().click()
  cy.wait(3000)
  cy.readFile(RegulatoryFile).then((data) => {
    data.MarketingProfileCode = LoginId1
    cy.writeFile(RegulatoryFile, data)
  })
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Marketing)
})
