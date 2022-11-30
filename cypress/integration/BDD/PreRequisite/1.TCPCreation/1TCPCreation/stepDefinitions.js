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
  cy.SysAdminlogin()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminMakerName
    cy.checkWelcomeText(Name)
  })
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.fixture('userData/SystemAdminLogin.json').then((data) => {
    let Name = data.SysAdminChecker1Name
    cy.checkWelcomeText(Name)
  })
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
  cy.login(this.data1.masteradminmaker.superadminm, this.data1.masteradminmaker.superadminmPwd)
  cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
})

//superadminc
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.login(this.data1.masteradminchecker.superadminc, this.data1.masteradminchecker.superadmincPwd)
  cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
})

//--------------------------------------TCP creation---------------------------------------------------


When('Navigate to Transfer Control Profile', function () {
  welcomePage.getTransferControlProfileSA().click()
  cy.wait(3000)
})

And('Click on New Button', function () {
cy.wait(2000)
  tcpPage.getNew().should('be.visible').click({ force: true })
  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
  cy.fixture(fileRegulatoryProfile).then((user) => {
    RName = user.RegulatoryProfileName
    cy.log(RName)
    cy.waitUntil(()=>{
      return cy.iframe().find('#registrationType').select(RName, { force: true })
      })
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





And('Click on New Button for Subscriber', function () {

  tcpPage.getNew().should('be.visible').click({ force: true })
  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain1, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category1, { force: true })
  cy.fixture(fileRegulatoryProfile).then((user) => {
    RName = user.RegulatoryProfileName
    cy.log(RName)
    cy.waitUntil(()=>{
      return cy.iframe().find('#registrationType').select(RName, { force: true })
      })
  })
  cy.TCPMasRandomNameSub()
    tcpPage.getdescription().type(this.data5.TransferControlProfile.Description)
  tcpPage.getadd().click({ force: true })
  cy.wait(3000)
  const uuid = () => Cypress._.random(1e3)
  number = uuid()
  tcpPage.getAmount().each((e1, index, list) => {1
    cy.wrap(e1).type(number)
  })
  tcpPage.getcountmaster().each((e1, index, list) => {
    cy.wrap(e1).type(number)
  })
  tcpPage.getusermaxbalanceMaster().type(this.data5.TransferControlProfile.UserMaxBal)
  tcpPage.getNextEdit().click({ force: true })
  tcpPage.getConfirmEdit().click({ force: true })

})



And('Verify Add Intiation Message for Master1', function () {
  cy.fixture(CustTCPdata1).then((user) => {
    TcpnameSub1 = user.CustTCPProfileNameSub
    cy.log(TcpnameSub1)
    tcpPage.getReqtoAddIntiationMaster().should("contain", this.data5.confimationMessage.sucessMasterTcpIntiation + TcpnameSub1 + this.data5.confimationMessage.successpart2Sub)
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
    () => cy.iframe().find('.MuiButton-label').eq(1).click({force: true}),
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

