/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import "../../../../support/commands";
import "../../../../support/AdministratorCommands"
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../support/pageObjects/UserManagement/manageUsers';
import myActivity from '../../../../support/pageObjects/MyActivity/myActivity';
import { recurse } from 'cypress-recurse';
import API from '../../../../support/pageObjects/API';



//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const APIPage = new API()
const myActivityPage = new myActivity()
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()
var mobile
var name
var filename = 'cypress/fixtures/userData/AdministratorData.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
let Profile
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
Given('Login into Mobiquity Portal as System admin Maker after Logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
})
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
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
//----------------Navigate to User Management tab and Click on Register---------------------------------
When('Navigate to User Management and Click on register', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})

//-----------------Select User Type-----------------------------------------------------------
And('Select User type as Adminstrator and click on BusinessAdmin', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).focused()
  registerPage.getUserRole().contains(this.data2.userRole).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })

})
//----------------------Basic Data---------------------------------------------------------------
And('Enter all the required details', function () {

  //-------------------Random Data-----------------------------------------------------------------
  cy.wait(2000)
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.getBArandomUserEmailID()
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.readFile(filename).then((data) => {
    data.BAMobileNumber = mobile
    cy.writeFile(filename, data)
  })
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  cy.wait(3000)
  registerPage.getCountry().select(this.data2.personalInfo.country)
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------Profile Data-----------------------------------------------------------------
  /*cy.readFile(SubProfileName).then((data) => {
    let Profile = data.businesAadmin*/
    registerPage.getSecurityProfile().select('BusinessAdminSecurityProfile', { force: true })
  //})
    /*cy.readFile(SubProfileName).then((data) => {
    let Profile = data.businesAadmin1*/
    registerPage.getAuthProfile().select('BusinessAdminDefault Profile', { force: true })
    //})
    registerPage.getNextButtonProfile().click({ force: true })
    registerPage.getSubmitButton().click({ force: true })

})

//-------------------------Confirmation Message displayed---------------------------------------------
Then('Confirmation message is displayed', function () {

  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
})


When('Navigate to Approvals and filter by Submitted status', function () {
  //welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
 cy.wait(2000)
 welcomePage.getApprovalButtonTab().click()
 cy.wait(2000)
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.wait(2000)
  approvalPage.getAddUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })

})

//------------------------------------Approve----------------------------------------------------------

And('User click on submitted user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })

})

And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})

Then('User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})

When('Navigate to Manage User, and search Business Admin', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

And('Search Business Admin', function () {
  cy.wait(2000)
  cy.getBAMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })
})
And('Assert Created Business Admin Mobile Number', function(){
  cy.wait(2000)
  cy.getBAMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })
  cy.readFile(filename).then((user) => {
  let BAMobile = user.BAMobileNumber
  var BBAMobile = " "+BAMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',BBAMobile)
})
})

And('Assert Created Business Admin Mobile Number', function(){
  cy.wait(2000)
  cy.getBAMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })
  cy.readFile(filename).then((user) => {
  let BAMobile = user.BAMobileNumber
  var BBAMobile = " "+BAMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',BBAMobile)
})
})

And('System Admin is able to view details', function () {
  (manageUsersPage.getViewIcon().click({ force: true }))
  cy.wait(3000)
})

And('System Admin is able to edit details', function () {
  manageUsersPage.getEditToolTip().eq(0).click({ force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })
  recurse(
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    () => cy.getrandomUserEmailID(),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )

  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  /*cy.readFile(SubProfileName).then((data) => {
    let Profile = data.businesAadmin
    registerPage.getSecurityProfile().select(Profile, { force: true })
  })
    cy.readFile(SubProfileName).then((data) => {
    let Profile = data.businesAadmin1
    registerPage.getAuthProfile().select(Profile, { force: true })
    })*/
    registerPage.getNextButtonProfile().click({ force: true })
})

Then('Confirm the edit details', function () {
  manageUsersPage.getConfirmButton().click({ force: true })
  manageUsersPage.getDoneButton().click({ force: true })

})
Then('User modified is approved', function () {
  approvalPage.getApproveConfirmationMessage()
})

//===================================USER MANAGEMENT======================================================
//---------------------------------------SC_42-------------------------------------------------------------

//----------------Navigate to User Management tab and Click on Register------------------------------------


And('Select User type as Adminstrator and click on Customer care Admin', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).focused()
  cy.wait(2000)
  registerPage.getUserRole().contains(this.data2.userRole1).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })

})

And('Enter all the details', function () {

  //-------------------Random Data-----------------------------------------------------------------
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()

  cy.wait(2000)
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.getCCArandomUserEmailID()
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.readFile(filename).then((data) => {
    data.CCAMobileNumber = mobile
    cy.writeFile(filename, data)
  })
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------Profile Data-----------------------------------------------------------------
 /* cy.readFile(SubProfileName).then((data) => {
   let Profile = data.CustomercareAdmin*/
   registerPage.getSecurityProfile().select('CustomerCareAdminSecurityProfile', { force: true })

 // })
 // cy.readFile(SubProfileName).then((data) => {
  //  let Profile = data.CustomercareAdmin1
    registerPage.getAuthProfile().select('CCEDefault Profile', { force: true })
 
   //})
  registerPage.getNextButtonProfile().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })

})
And('Assert Created Customer Admin Mobile Number', function(){
  cy.wait(2000)
  cy.getCCAMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })
  cy.readFile(filename).then((user) => {
  let CCAMobile = user.CCAMobileNumber
  var CAMobile = " "+CCAMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',CAMobile)
  cy.wait(2000)
})
})
//-----------------------------SC_45----------------------------------------------------------
//---------------------------Login with another Admin credentials------------------------------------

//------------------------------------MobileNumber------------------------------------------------------
And('Search with Mobile Number', function () {
  cy.wait(2000)
  cy.getCCAMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })

})

And('System Admin is able to edit details of the user', function () {
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()

  manageUsersPage.getEditToolTip().eq(0).click({ force: true })
  recurse(
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    () => registerPage.getLastName().clear().type(getRandomName()),

    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  manageUsersPage.getNextbttn().eq(0).click({ force: true })
  manageUsersPage.getNextbttn().eq(1).click({ force: true })
})

And('Confirm the edit details Of the User', function () {
  manageUsersPage.getConfirmButton().click({ force: true })
  cy.wait(2000)
  registerPage.getConfirmationText1().should('have.text', this.data2.confirmationMessage.editUser1)
  manageUsersPage.getDoneButton().click({ force: true })
})
And('Navigate to the Approvals', function () {
//  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
 cy.wait(2000)
 welcomePage.getApprovalButtonTab().click()
 cy.wait(2000)
  pageLogin.getiFrame()
})


//---------------------------EmailID------------------------------------------------------

And('Search with EmailID', function () {
  cy.wait(2000)
  cy.getCCAEmailID()
  manageUsersPage.getSearchUserButton().click({ force: true })
})
//---------------------LoginID-----------------------------------------------------------
And('Search with LoginID', function () {
  cy.wait(2000)
  cy.getCCALoginID()
  manageUsersPage.getSearchUserButton().click({ force: true })
})

//------------------------------------------TC_46------------------------------------------

And('Approve the Users and Check for SMS Notification sent to user', function () {
  cy.wait(2000)
  cy.getMessage(Cypress.env('apiBaseURL'))

})




//-------------------------------SC_48--------------------------------------------------------------

//---------------------------Login with another Admin credentials------------------------------------

And('Search Business or Customer care Admin', function () {
  cy.wait(2000)
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile(filename).then((user) => {
    let  CCAMobile = user.CCAMobileNumber
      manageUsersPage.getSearchUser().type(CCAMobile, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})

Then('System Admin is able to Delete the User', function () {
  (manageUsersPage.getViewIcon().click({ force: true }))
  cy.wait(2000)
  manageUsersPage.getDelete().eq(0).click({ force: true })
  manageUsersPage.getComment().type(getRandomName(), { force: true })
  cy.getreason()
  manageUsersPage.getDeleteButton().click({ force: true })
})

//-----------------------------------SC_50--------------------------------------------------------

Then('Reject the Users', function () {
  approvalPage.getRejectButton().click({ force: true })
  approvalPage.getRejectComment().type(getRandomName(), { force: true })
  approvalPage.getRejectRequest().click({ force: true })

})


//---------------------------------Kalyani_BA Login-------------------------------------------------------

Given('Login into Mobiquity Portal as Business admin User1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(8000)
  cy.readFile('cypress/fixtures/userData/AdministratorData.json').then((data)=>{
    var BALogin
    BALogin = data.BALoginID
    cy.login(BALogin, this.data1.DefaultPassword)
    cy.login1(this.data1.BAPassword)
    cy.wait(2000)
    cy.Passwordchange(this.data1.UserCreationSuccessMessage)
    pageLogin.getloginbtn1().click({force:true})
    cy.wait(5000)
    cy.login(BALogin, this.data1.BAPassword)
    })
    cy.checkWelcomeText(this.data1.BAAdminText)

})

Given('Login into Mobiquity Portal as System admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})


When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

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

And('Enter Mobile number or KYC number in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  //manageUsersPage.getdropdown().select(this.data2.business.userType, { force: true })
  //Fetching Business Admin mobile Number to see his details
  cy.readFile('cypress/fixtures/userData/AdministratorData.json').then((data) => {
    var Mobile
    Mobile = data.BAMobileNumber 
    cy.log(mobile)
  manageUsersPage.getSearchUser().type(Mobile, { force: true })
})
  manageUsersPage.getSearchUserButton().click({ force: true })

})

When('User Click on eye button', function () {

  manageUsersPage.getEyeIcon().click({ force: true })

})
Then('Verify View Details Page', function () {

  manageUsersPage.getViewDetails().should("contain", this.data2.confirmationMessage.viewDetails)
})


