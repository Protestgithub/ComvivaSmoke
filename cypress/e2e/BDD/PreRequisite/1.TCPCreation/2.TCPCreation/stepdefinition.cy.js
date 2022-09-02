/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And,Before} from "@badeball/cypress-cucumber-preprocessor";
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


And('Add Marketing Profile Wholesaler', function () {
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

