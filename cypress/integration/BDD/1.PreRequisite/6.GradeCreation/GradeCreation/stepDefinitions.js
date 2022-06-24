/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';

import "../../../../support/commands";
import "../../../../support/securityCommands";
import "../../../../support/TransferControlProfileCommand";
import BankManagement from '../../../../support/pageObjects/BankManagement';
import 'cypress-file-upload'
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../support/pageObjects/UserManagement/manageUsers';
import DomainFieldspage from '../../../../support/pageObjects/DomainManagement/DomainFieldspage';
import CircularJSON from 'circular-json';
import Flatted from 'flatted';
import TransferRulePage from '../../../../support/pageObjects/TransferRules/TransferRulePage';
import TransferControlProfile from '../../../../support/pageObjects/TransferControlProfile';
import TransactionCorrection from '../../../../support/pageObjects/TransactionCorrection';
import ErrorMessage from '../../../../support/pageObjects/UserManagement/ErrorMessage';
import walletManagement from '../../../../support/pageObjects/WalletManagement/walletManagement';
import AddGrades from '../../../../support/pageObjects/GradeManagement/AddGrades';
import ModifyGrades from '../../../../support/pageObjects/GradeManagement/ModifyGrades';
import DeleteGrades from '../../../../support/pageObjects/GradeManagement/DeleteGrades';
import AddCategory from '../../../../support/pageObjects/CategoryManagement/AddCategory';
import SecurityProfilePage from '../../../../support/pageObjects/SecurityProfile/SecurityProfilePage';
import "../../../../support/authourizationcommands"
import authorizationManagement from '../../../../support/pageObjects/AuthorizationProfileManagement/authorizationManagement';
import RegulatoryProfile from '../../../../support/pageObjects/UserManagement/RegulatoryProfile';
import MarketingProfile from '../../../../support/pageObjects/UserManagement/MarketingProfile';




//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const ErrorM = new ErrorMessage()
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
var mobile
var number
const uid = () => Cypress._.random(0, 1e6)
const id = uid()
const filenameTCP = 'userData/TCPdata.json'
const CustTCPdata = 'userData/CustTCPdata.json'
const fileRegulatoryProfile = 'userData/Regulatory&MarketingProfile.json'
var Tcpname
var Tcpname1
var RName



var filename1 = 'cypress/fixtures/WalletManagementdata.json'
const uuid = () => Cypress._.random(1e10)
const uud = () => Cypress._.random(1e3)
PoolAccountNo = uuid()
BankID = uuid()
Priority = uud()
var name
var PoolAccountNo
var BankID
var Priority
var filename = 'cypress/fixtures/BankManagement.json'
let Sysfilelogin = 'cypress/fixtures/userData/SystemAdminLogin.json'
var mobile
var name
var LoginId1
const uuid12 = () => Cypress._.random(1e8)
LoginId1 = uuid12()
const Password = '000000'
const Password1 = 'Com@135'
var loginId
let GradeCode
function getbankName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}




//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('BankManagement').then(function (data03) {
    this.data03 = data03;
  })
  cy.fixture('Domain&CategoryManagement').then(function (data4) {
    this.data4 = data4;
  })
  cy.fixture('TransferControlProfile').then(function (data5) {
    this.data5 = data5;
  })

  cy.fixture('GradeManagement').then(function (data01) {
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
Given('Login into Mobiquity Portal as System admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin User2', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin User after logout', function () {
  cy.loginAgain(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)

})
/* Given('Login into Mobiquity Portal as another System admin User after logout', function () {
   cy.SysAdminlogin2Again()
   cy.checkWelcomeText(this.data1.networkAdminWelcomeText)
 })*/
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as masteradmin Maker', function () {
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
Given('Login into Mobiquity Portal as System admin User after Logout', function () {
  cy.loginAgain(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as Super admin Checker after Logout', function () {
  cy.loginAgain(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data2.superadminc.superadminchecker)
})

Given('Login with Master Admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
})

//-----------------------------------------Grade Creation------------------------------------------

When('Click on User Profile Management >> Add Grade', function () {
  welcomePage.getUserprofileManagementOption().click({ force: true })
  welcomePage.getADDGrades().click({ force: true })

})
And('Select the domain & category for which grade needs to be added.', function () {
  const uuid = () => Cypress._.random(1e4)
  GradeCode = uuid()
  cy.wait(2000)
  AddGradePage.getAddbttn().click({ force: true })
  cy.wait(2000)
  AddGradePage.getDomainName().select(this.data01.AddGrades.domainName, { force: true })
  AddGradePage.getCatergoryName().select(this.data01.AddGrades.categoryname, { force: true })
  AddGradePage.getgradeCode().type(GradeCode, { force: true })
  cy.RandomName()
  AddGradePage.getSavebttn().click({ force: true })
  cy.wait(2000)
  AddGradePage.getConfirmbttn().click({ force: true })

})    
