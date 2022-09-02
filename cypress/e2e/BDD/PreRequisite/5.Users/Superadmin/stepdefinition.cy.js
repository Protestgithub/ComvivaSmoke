/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';

import "../../../../../support/commands";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import ErrorMessage from '../../../../../support/pageObjects/UserManagement/ErrorMessage';

//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const ErrorM=new ErrorMessage()
let Sysfilelogin = 'cypress/fixtures/userData/SystemAdminLogin.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
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
   cy.fixture('userData/SystemAdminLogin.json').then(function (data6) {
    this.data6 = data6;
  })
}); 

//superadminm

And('Click on delete',function(){

  manageUsersPage.getdelete().click({force:true})
  manageUsersPage.getcomment().type(this.data2.comment)
  manageUsersPage.getreasonforclosure().select(this.data2.Reason)
  manageUsersPage.getintiatedelete().click({force:true})
})

And('Enter all required Fields for System admin',function(){
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

var SecurityProfile
cy.readFile(SubProfileName).then((user) => {
        SecurityProfile= user.SystemAdminSecuirtyProfile
        registerPage.getSecurityProfile().select(SecurityProfile, {force: true})
    })

registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile2, {force: true})
registerPage.getNextButtonProfile().click({force: true})
registerPage.getSubmitButton().click({force: true})

})
//------------------------------------Approve----------------------------------------------------------

And('User click on submitted user data', function () {
  approvalPage.getCurrentDateRowData().eq(0).click({ force: true })

})
And('Approve the Users and save loginID4', function () {
  approvalPage.getApproveButton().click({ force: true })
    cy.wait(3000)
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(3000)
  cy.readFile(Sysfilelogin).then((data) => {
    data.LoginId4 = loginId
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.ChangePassword4 = Password1
    cy.writeFile(Sysfilelogin, data)
    })
    cy.readFile(Sysfilelogin).then((data) => {
    data.MobileNumber4 = mobile
    cy.writeFile(Sysfilelogin, data)
})
cy.log(loginId)
})


And('User click on approve', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
  approvalPage.getApproveConfirmationMessage().should('have.text',this.data2.confirmationMessage.editUser)
})
And('User click on approve delete request', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
  //approvalPage.getApproveConfirmationMessage().should('have.text',this.data2.confirmationMessage.editUser)
})





And('Enter Mobile number or KYC number of superadmin in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getSearchUser().type(this.data2.mob4, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
And('Enter Mobile number or KYC number of subscriber user in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile(Sysfilelogin).then((data)=>{
    var mobileSys
    mobileSys = data.MobileNumber3
    manageUsersPage.getSearchUser().type(mobileSys, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
And('Enter Mobile number or KYC number of System admin in Search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile('cypress/fixtures/userData/SystemAdminLogin.json').then((data)=>{
   let mobileSys = data.MobileNumber2
    manageUsersPage.getSearchUser().type(mobileSys, {force: true})
  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})




  And('Edit the required details >> Click on Next',function(){
    manageUsersPage.getNextbttn().eq(0).click({force:true})
    manageUsersPage.getNextbttn().eq(1).click({force:true})
    manageUsersPage.getconfirm().click({force:true})
    
    })
    
And('Enter Mobile number or KYC number of systemadmin in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.wait(3000)
  manageUsersPage.getSearchUser().type(mobile, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
And('Enter Mobile number4 or KYC number of System admin in Search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  cy.readFile(Sysfilelogin).then((data)=>{
    var mobileSys
    mobileSys = data.MobileNumber4
    manageUsersPage.getSearchUser().type(mobileSys, { force: true })
  })
  manageUsersPage.getSearchUserButton().click({ force: true })

})

Then('Verify Sucess Message',function(){

  manageUsersPage.getsucessSYS().should('contain',this.data2.confirmationMessage.EdituserSys)
})


//--------------------------------------Monica--------------------------------------------------


//----------------Test Scripts---------------------------------------------------------------

//----------------Launch Mobiquity Portal URL and Login--------------------------------------

And('Fill All Required Fields and Enter Registered LoginID',function(){
    const uuid = () => Cypress._.random(1e8)
    mobile = "77" + uuid()
    registerPage.getFirstName().type(this.data2.personalInfo.firstName, {force: true})
    registerPage.getLastName().type(this.data2.personalInfo.lastName, {force: true})
    ErrorM.getLoginID().type(this.data6.LoginId,{force:true})
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
ErrorM.getEmailiD().type(this.data6.MobileNumber2,{force:true})
registerPage.getMobileNumber().type(mobile, {force:true})
    cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang,{force: true})
    registerPage.getCountry().select(this.data2.personalInfo.country,{force: true})
    ErrorM.getLoginID().type(LoginId1,{force:true})
})
Then('Email Id Error Message Should be dispalyed',function(){
    ErrorM.getEmailIDErrorMessage().should('have.text',this.data2.errorMessage.invaildemail,{force:true})
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







