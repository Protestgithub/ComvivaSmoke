/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';

import "../../../../support/commands";
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

//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const ErrorM=new ErrorMessage()
let Sysfilelogin = 'cypress/fixtures/userData/SystemAdminLogin.json'
var mobile
var name
var LoginId1
const uuid12 = () => Cypress._.random(1e8)
LoginId1= uuid12()
const Password='000000'
const Password1 = 'Com@135'
var loginId
function getRandomName() {
name = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var i=0; i<5; i++)
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
  cy.fixture('TransferControlProfile').then(function (data5) {
    this.data5 = data5;
  })
  cy.fixture('userData/SystemAdminLogin.json').then(function (data6) {
    this.data6 = data6;
  })

}); 

//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
})
//superadminc
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
})
Given('Login into Mobiquity Portal as Super admin Maker after Logout', function () {
  cy.loginAgain(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.superadminm.superadminmaker)
})

Given('Login into Mobiquity Portal as Super admin Checker after Logout', function () {
  cy.loginAgain(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
})
Given('Login into Mobiquity Portal as System admin Created by Master', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.log(loginId)
  cy.login(loginId,Password)
  cy.log(loginId)
  cy.login1(Password1)
  cy.wait(2000)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword = Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber = mobile
    cy.writeFile(Sysfilelogin, data)
    }) })

Given('Login into Mobiquity Portal as System admin Created by Master2', function () {
  cy.log(loginId)
  cy.loginAgain(loginId,Password)
  cy.log(loginId)
  cy.login1Again(Password1)
  cy.wait(2000)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId2 = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword2 = Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber2 = mobile
    cy.writeFile(Sysfilelogin, data)
})})

Given('Login into Mobiquity Portal as System admin Created by Master3', function () {
  cy.log(loginId)
  cy.loginAgain(loginId,Password)
  cy.log(loginId)
  cy.login1Again(Password1)
  cy.wait(2000)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)  
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId3 = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword3 = Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber3 = mobile
    cy.writeFile(Sysfilelogin, data)
}) })
Given('Login into Mobiquity Portal as System admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})

And('Click on delete',function(){

  manageUsersPage.getdelete().click({force:true})
  manageUsersPage.getcomment().type(this.data2.comment)
  manageUsersPage.getreasonforclosure().select(this.data2.Reason)
  manageUsersPage.getintiatedelete().click({force:true})
})


When('Navigate to User Management and click on Register',function(){

  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()

})

And('Click On System Admin and select Single User',function(){
  registerPage.getUserRole().contains(this.data2.userRole4).click({force:true})
  registerPage.getRegistrationMode().eq(0).click({force: true})

})

And('Enter all required Fields',function(){
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  loginId = "SYS" + mobile
  registerPage.getFirstName().type(getRandomName(), {force: true})
registerPage.getLastName().type(getRandomName(), {force: true})
cy.getrandomUserEmailID()
registerPage.getLoginID().clear()
registerPage.getLoginID().type(loginId)
registerPage.getMobileNumber().type(mobile, {force:true})
/*recurse(
() => registerPage.getMobileNumber().type(mobile, {force:true}),
() => registerPage.getFirstName().type(getRandomName(), {force: true}),
(uniqueness) => (uniqueness) == registerPage.getuniqueness()
)
cy.writeFile(filename, {BAMobileNumber : mobile})*/
cy.writeFile('userData/SystemAdminLogin.json',{MobileNumber:mobile})
cy.iframe().find('select[data-test-id="preferredLanguage"]')
.select(this.data2.personalInfo.preferredLang,{force: true})
registerPage.getCountry().select(this.data2.personalInfo.country,{force: true})
registerPage.getNextButtonBasic().click({force: true})

//----------------------Profile Data-----------------------------------------------------------------

registerPage.getSecurityProfile().select(this.data2.personalInfo.securityProfile2, {force: true})
registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile2, {force: true})
registerPage.getNextButtonProfile().click({force: true})
registerPage.getSubmitButton().click({force: true})

})
Then('Confirmation message is displayed', function() {

  registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
  registerPage.getDoneButton().click()
  })
//------------------------------------Approve----------------------------------------------------------
When('Navigate to Approvals and filter by Submitted status', function () {
 // welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  cy.wait(2000)
  approvalPage.getAddUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })

})
And('User click on submitted user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })

})
And('Approve the Users and save loginID', function () {
  approvalPage.getApproveButton().click({ force: true })
    cy.wait(3000)
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(3000)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.DefaultPassword = Password
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber = mobile
    cy.writeFile(Sysfilelogin, data)
    })  
    cy.log(loginId)
})
And('Approve the Users and save loginID2', function () {
  approvalPage.getApproveButton().click({ force: true })
    cy.wait(3000)
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(3000)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId2 = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword2 = Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber2 = mobile
    cy.writeFile(Sysfilelogin, data)
}) 
  cy.log(loginId)
})
And('Approve the Users and save loginID3', function () {
  approvalPage.getApproveButton().click({ force: true })
    cy.wait(3000)
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(3000)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId3 = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword3 = Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber3 = mobile
    cy.writeFile(Sysfilelogin, data)
})
cy.log(loginId)
})

And('Approve the modification/Deletion Request', function () {
  approvalPage.getApproveButton().click({ force: true })
    cy.wait(3000)
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(3000)
})
Then('User status is approved', function() {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})



When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})

And('Enter Mobile number or KYC number of superadmin in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.wait(3000)
  manageUsersPage.getSearchUser().type(this.data2.mob4, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
And('Enter Mobile number or KYC number of subscriber user in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getSearchUser().type(this.data2.mob2, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
And('Enter Mobile number or KYC number of System admin in Search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile(Sysfilelogin).then((data)=>{
    var mobileSys
    mobileSys = data.MobileNumber3
    manageUsersPage.getSearchUser().type(mobileSys, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})

When('User Click on eye button', function () {

  manageUsersPage.getEyeIcon().click({ force: true })

})
Then('Verify View Details Page', function () {

  manageUsersPage.getViewDetails().contains(this.data2.confirmationMessage.viewDetails)
})
And('Click on edit',function(){
  manageUsersPage.getEditIcon().eq(1).click({force:true})
  })
  And('Edit the required details >> Click on Next',function(){
    manageUsersPage.getNextbttn().eq(0).click({force:true})
    manageUsersPage.getNextbttn().eq(1).click({force:true})
    manageUsersPage.getconfirm().click({force:true})
    
    })
    And('Click on save',function(){
      manageUsersPage.getConfirmButton().click({force:true})
      })

And('Enter Mobile number or KYC number of systemadmin in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.wait(3000)
  manageUsersPage.getSearchUser().type(mobile, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})

Then('Verify Sucess Message',function(){

  manageUsersPage.getsucessSYS().should('contain',this.data2.confirmationMessage.EdituserSys)
})


//--------------------------------------Monica--------------------------------------------------


//----------------Test Scripts---------------------------------------------------------------

//----------------Launch Mobiquity Portal URL and Login--------------------------------------

When('Navigate to User Management and click on Register',function(){
    welcomePage.getUserManagementOption().click()
    welcomePage.getRegisterOption().click()
})
And('Click On System Admin and select Single User',function(){
    registerPage.getUserRole().contains(this.data2.userRole3).click({force:true})
    registerPage.getRegistrationMode().eq(0).click({force: true})
})
And('Fill All Required Fields and Enter Registered LoginID',function(){
    const uuid = () => Cypress._.random(1e8)
    mobile = "77" + uuid()
    registerPage.getFirstName().type(this.data2.personalInfo.firstName, {force: true})
    registerPage.getLastName().type(this.data2.personalInfo.lastName, {force: true})
    ErrorM.getLoginID().type(this.data2.errorMessage.LoginId,{force:true})
    ErrorM.getEmailiD().type(this.data2.errorMessage.email1,{force:true})
    registerPage.getMobileNumber().type(mobile, {force:true})
    cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang,{force: true})
    registerPage.getCountry().select(this.data2.personalInfo.country,{force: true})
    
})
Then('Error Message Should be displayed',function(){
    ErrorM.getLoginIdErrorMessage().should('have.text',this.data2.errorMessage.loginerror,{force:true})
})
And('Fill All Required Fields and Enter Registered EmailID',function(){
    const uuid = () => Cypress._.random(1e8)
    mobile = "77" + uuid()
    registerPage.getFirstName().type(this.data2.personalInfo.firstName, {force: true})
    registerPage.getLastName().type(this.data2.personalInfo.lastName, {force: true})
    //cy.getrandomUserEmailID(this.data2.personalInfo.firstName, this.data2.personalInfo.lastName)
    ErrorM.getEmailiD().type(this.data2.errorMessage.emailid1,{force:true})
    registerPage.getMobileNumber().type(mobile, {force:true})
    cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang,{force: true})
    registerPage.getCountry().select(this.data2.personalInfo.country,{force: true})
    ErrorM.getLoginID().type(LoginId1,{force:true})
})
Then('Email Id Error Message Should be dispalyed',function(){
    ErrorM.getEmailIDErrorMessage().should('have.text',this.data2.errorMessage.emailerror,{force:true})
})
And('Fill All Required Fields and Enter Not Verified EmailID',function(){
    const uuid = () => Cypress._.random(1e8)
    mobile = "77" + uuid()
    registerPage.getFirstName().type(this.data2.personalInfo.firstName, {force: true})
    registerPage.getLastName().type(this.data2.personalInfo.lastName, {force: true})
    ErrorM.getEmailiD().type(this.data2.errorMessage.testemail,{force:true})
    registerPage.getMobileNumber().type(mobile, {force:true})
    cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang,{force: true})
    registerPage.getCountry().select(this.data2.personalInfo.country,{force: true})
    ErrorM.getLoginID().type(LoginId1,{force:true})
})
Then("Not Registered EmailId Error Message",function(){
    ErrorM.getinvalidemailidErrorMessage().should('have.text',this.data2.errorMessage.invaildemail,{force:true})
})
And('enter invalid value in mandatory field',function(){
    const uuid = () => Cypress._.random(1e8)
    mobile = "77" + uuid()
    registerPage.getFirstName().type(this.data2.personalInfo.firstName, {force: true})
    registerPage.getLastName().type(this.data2.errorMessage.Lname1, {force: true})
    cy.getrandomUserEmailID(this.data2.personalInfo.firstName, this.data2.personalInfo.lastName)
    registerPage.getMobileNumber().type(mobile, {force:true})
    cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang,{force: true})
    registerPage.getCountry().select(this.data2.personalInfo.country,{force: true})
    ErrorM.getLoginID().type(LoginId1,{force:true})
})
Then("Invaild Value Error Message",function(){
    ErrorM.getinvalidlname().should('have.text',this.data2.errorMessage.invalidlname,{force:true})
})







