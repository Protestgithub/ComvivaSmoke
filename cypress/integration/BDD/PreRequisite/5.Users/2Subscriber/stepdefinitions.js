/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/subscriberCommands";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';

//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const myActivityPage = new myActivity()
const manageUsersPage = new manageUsers()
const uuid = () => Cypress._.random(1e8)
const SubMob = 'userData/subscriberReg.json'
var lid, eid, CIF, mobile, Mobile, Submobile, loginId, KycValue, name
mobile = "77" + uuid()
Mobile = "77" + uuid()
var subRegistration = 'cypress/fixtures/userData/subscriberReg.json'


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

});
//----------------Test Scripts---------------------------------------------------------------------------

//--------------------------User Management--------------------------------------------------------------

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
//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  
})

//------------------------------------Approve----------------------------------------------------------
And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})

//--------------------------------------------- Chethan--------------------------------------------

//----TC_68--------------------------User Management(Subscriber)---------------------------------------

//-----------------------------------------------------------------------------------------------

//----------------------------Prerequisite Subscriber Creation for Suspension and Resumption-------------------------------


//----TC_70--------------------------------Modify Subscriber-------------------------------------------------
When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

//--TC_71------------------------------------Approve Modified Subscriber-----------------------------------------
When('Navigate to Approvals and filter by Modification of user status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
 cy.wait(2000)
 welcomePage.getApprovalButtonTab().click()
 cy.wait(2000)
 
 //-------------------Added waitUntil----------------------------------------------
 cy.waitUntil(()=>{
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })
  
  //----------Filter the data
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.wait(2000)
  approvalPage.getModificationUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })

})
Then('Edited User status is approved', function () {

  approvalPage.getApproveConfirmationMessage().should('have.text', this.data2.confirmationMessage.editUser)
})

//---------------------------------------------------Kalyani----------------------------------------------

And('Enter Mobile number or KYC number in Search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  //Reading Subscriber mobile number from Subscriber registration Fixture to check his details
  cy.readFile('cypress/fixtures/userData/subscriberReg.json').then((data) => {
    Submobile = data.subscriberMobile
    cy.log(Submobile)
    manageUsersPage.getSearchUser().type(Submobile, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
When('User Click on eye button', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
})
Then('Verify View Details Page', function () {
  manageUsersPage.getViewDetails().should("contain", this.data2.confirmationMessage.viewDetails)
})

//-------------------------------------------TC_169------------------------------------------------------------------------------------
And('Select User type as Business and Select Corporate', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).focused()
  registerPage.getUserRole().contains(this.data2.UserLoginId).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })

})

//--------------------------Search Subscriber Mobile NUmber---------------------------------------------
And('Enter Mobile number of subscriber in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile('cypress/fixtures/userData/subscriberReg.json').then((data) => {
    var mobile
    mobile = data.subscriberMobile
    cy.log(mobile)
    manageUsersPage.getSearchUser().type(mobile, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})

//------------------------------------Monica----------------------------------------------------------

//-----------------------------Test Scripts-----------------------------------------------------------------------------

//---------------------USER MANAGEMENNT MANAGE USER--------------------------------------------


And('Enter Mobile number and KYC number in search menu1', function () {
  cy.fixture(SubMob).then((user) => {
    var SubMob1 = user.subscriberMobile
    cy.log(SubMob1)
    manageUsersPage.getUserSearchDetails().type(SubMob1)
  })
  manageUsersPage.getSearchUserButton().click({ force: true })
})
And('Click on view Details and Click on Account info', function () {

  manageUsersPage.getViewIcon().eq(0).click({ force: true })
  manageUsersPage.getAccountInfo().click({ force: true })
})

Then('Check All Wallet Details', function () {
  cy.wait(3000)
})
And('select either Lock outgoing payments or Lock incoming payments or Lock both', function () {

  manageUsersPage.getlockunclockWallets().click({ force: true })
  manageUsersPage.getLockOutgoingPayements().click({ force: true })
})
Then('Click On lock all', function () {
  manageUsersPage.getlockallbtn().click({ force: true })
  manageUsersPage.getconfirmationlock().type(getRandomName(), { force: true })
  manageUsersPage.getconfirmationbtn().click({ force: true })
  manageUsersPage.getlockedmessage().should('have.text', this.data2.LockOutgoing)
})
And('Click on view Details and Click on Credentials', function () {

  manageUsersPage.getViewIcon().eq(0).click({ force: true })
  manageUsersPage.getcredentials().click({ force: true })
})
And('Click on refresh icon corresponding to the respective authentication factor', function () {
  manageUsersPage.getresetcredentials().eq(0).click({ force: true })
  manageUsersPage.getresetconfirmation().click({ force: true })
  manageUsersPage.getsuccessresetconfirmation().click({ force: true })
})
