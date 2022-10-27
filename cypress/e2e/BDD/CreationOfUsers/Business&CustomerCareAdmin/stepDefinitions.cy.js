/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And,Before} from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';
import "../../../../support/utils/Generic";
import "../../../../support/utils/subscriberCommands";
import "../../../../support/utils/AdministratorCommands";
import "../../../../support/utils/BusinessUserCommands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../support/pageObjects/UserManagement/manageUsers';
import myActivity from '../../../../support/pageObjects/MyActivity/myActivity';
import API from '../../../../support/pageObjects/API';



//----------------Object Declaration-----------------------------------------------------------------
const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const APIPage = new API()
let BAlogin = 'cypress/fixtures/userData/BusinessAdminLogin.json'
const myActivityPage = new myActivity()
const uuid = () => Cypress._.random(1e8)
const uuid1 = () => Cypress._.random(1e8)
const uuuid = () => Cypress._.random(1e3)
amount = uuuid()
var loginId, mobile, BusinessMobile, KycValue, amount, name, ifscnum, accnumber, BankData
const kycid = () => Cypress._.random(1e8)
const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp
mobile = "77" + uuid1()
var lid, eid, CIF, mobile1, Mobile, Submobile, loginId, name
mobile1 = "77" + uuid()
var filename = 'cypress/fixtures/userData/AdministratorData.json'
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

//----------------Test Scripts---------------------------------------------------------------------------

//--------------------------User Management--------------------------------------------------------------

When('Navigate to User Management and Click on register', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  cy.intercept('/mobiquitypay/v1/ums/workspace-categories?workspaceId=').as('all')
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
  cy.checkAPI('/mobiquitypay/v1/ums/workspace-categories?workspaceId=')

})


And('Click On Business Admin and select Single User',function(){
  cy.wait(3000)
  registerPage.getUserRole().contains(this.data2.userRole5).click({force:true})
  registerPage.getRegistrationMode().eq(0).click({force: true})

})
And('Enter all Maker required Fields for BA',function(){
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  loginId = "BA" + mobile
  let lastname=getRandomName()
  let firstname=getRandomName()
registerPage.getLastName().type(lastname, {force: true})
cy.getrandomUserEmailID1()
registerPage.getLoginID().clear()
registerPage.getLoginID().type(loginId)
recurse(
  () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
  () => registerPage.getFirstName().clear().type(firstname, { force: true }),

  (uniqueness) => (uniqueness) == registerPage.getuniqueness()
)

  cy.writeFile(BAlogin, {SysAdminName:firstname + '' + lastname})

cy.writeFile(BAlogin,{MobileNumber:mobile})
cy.iframe().find('select[data-test-id="preferredLanguage"]')
.select(this.data2.personalInfo.preferredLang,{force: true})
registerPage.getCountry().select(this.data2.personalInfo.country,{force: true})
registerPage.getNextButtonBasic().click({force: true})

//----------------------Profile Data-----------------------------------------------------------------

registerPage.getSecurityProfile().select(this.data2.personalInfo.securityProfile3, {force: true})
registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile3, {force: true})
registerPage.getNextButtonProfile().click({force: true})
registerPage.getSubmitButton().click({force: true})
})

And('Approve the Users and save loginID for BA', function () {
  approvalPage.getApproveButton().click({ force: true })
    cy.wait(3000)
  approvalPage.getApproveRequest().click({ force: true })
  cy.wait(3000)
  cy.readFile(BAlogin).then((data) => {
    data.LoginId = loginId
    cy.writeFile(BAlogin, data)
    })
    cy.readFile(BAlogin).then((data) => {
    data.DefaultPassword = this.data1.BAPassword
    cy.writeFile(BAlogin, data)
    })
    cy.readFile(BAlogin).then((data) => {
    data.MobileNumber = mobile
    cy.writeFile(BAlogin, data)
    })  
    cy.log(loginId)
})

Given('Login into Mobiquity Portal as Business admin Created by Master', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.readFile(BAlogin).then((data)=>{
    let loginId =data.LoginId
    cy.login(loginId,this.data1.DefaultPassword)
    cy.log(loginId)
  
  
  cy.login1(this.data1.BAPassword)
  cy.wait(2000)
  cy.Passwordchange(this.data1.UserCreationSuccessMessage)
    cy.readFile(BAlogin).then((data) => {
    data.MobileNumber = mobile
    cy.writeFile(BAlogin, data)
    })
    cy.readFile(BAlogin).then((data) => {
      data.ChangePassword = this.data1.BAPassword
      cy.writeFile(BAlogin, data)
    })
    cy.readFile(BAlogin).then((data) => {
      data.MobileNumber = mobile
      cy.writeFile(BAlogin, data)
    }) 
  })
  })


And('Select User type as Adminstrator and click on BusinessAdmin', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).focused()
  registerPage.getUserRole().contains(this.data2.userRole).click({ force: true })
  cy.intercept('/mobiquitypay/v1/view/user_registration_mapping_en?categoryCode=').as('all')
  registerPage.getRegistrationMode().eq(0).click({ force: true })
  cy.checkAPI('/mobiquitypay/v1/view/user_registration_mapping_en?categoryCode=')

})

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





And('Navigate to My Activity and Aplly required filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  cy.wait(2000)
  myActivityPage.getAddUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})

And('Assert Created Business Admin Mobile Number and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(filename).then((user) => {
  let BAMobile = user.BAMobileNumber
  var BBAMobile = " "+BAMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',BBAMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(filename).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(filename,data)
  })
})
})

When('Navigate to Approvals and filter by Submitted status', function () {
  //welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()

 cy.wait(2000)
 
 //----------------------------------Added waituntil------------------------
 
 welcomePage.getApprovalButtonTab().click()
 cy.waitUntil(()=>{
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })
  
 cy.wait(2000)
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  cy.waitUntil(()=>{
    return cy.iframe().find('.mat-button-wrapper > span').contains('Filters')
  })
  approvalPage.getFilter().click({ force: true })
  cy.wait(2000)
  approvalPage.getAddUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })

})

And('User click on Buissness Admin submitted user data', function () {
  cy.intercept('/mobiquitypay/v1/languages').as('all')
  cy.getApproval(filename)
  cy.checkAPI('/mobiquitypay/v1/languages')
})


And('Approve the Users', function () {
  cy.wait(2000)
  cy.intercept('/mobiquitypay/v2/workflow_management/workflow/pending_records/NetadminDefault/US').as('all')
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
  cy.checkAPI('/mobiquitypay/v2/workflow_management/workflow/pending_records/NetadminDefault/US')
  cy.wait(2000)
})



When('Navigate to Manage User, and search Business Admin', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

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
And('Select User type as Adminstrator and click on Customer care Admin', function () {
  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  cy.intercept('/mobiquitypay/v1/languages').as('all')
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType).focused()
  cy.wait(2000)
  registerPage.getUserRole().contains(this.data2.userRole1).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
  cy.checkAPI('/mobiquitypay/v1/languages')

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
  cy.intercept('/mobiquitypay/v1/authorization-profiles?user-types=CCE').as('all')
  registerPage.getNextButtonBasic().click({ force: true })
  cy.checkAPI('/mobiquitypay/v1/authorization-profiles?user-types=CCE')


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
  cy.intercept('/mobiquitypay/v1/ums/user').as('all')
  registerPage.getSubmitButton().click({ force: true })
  cy.checkAPI('/mobiquitypay/v1/ums/user')

})



And('Assert Created Customer care Admin Mobile Number and Write Created on time', function () {
  cy.wait(2000)
  cy.readFile(filename).then((user) => {
    let CAMobile = user.CCAMobileNumber
    var CCAMobile = " " + CAMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', CCAMobile)
  })
  cy.wait(2000)
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(filename).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(filename, data)
    })
  })
})




And('User click on submitted user data for Business Admin', function () {
  cy.intercept('/mobiquitypay/v1/languages').as('all')
  cy.getApproval(filename)
  cy.checkAPI('/mobiquitypay/v1/languages')
  cy.wait(2000)
})


And('Assert Created Customer Admin Mobile Number', function () {
  cy.wait(2000)
  cy.getCCAMobileNumber()
  manageUsersPage.getSearchUserButton().click({ force: true })
  cy.readFile(filename).then((user) => {
    let CCAMobile = user.CCAMobileNumber
    var CAMobile = " " + CCAMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', CAMobile)
    cy.wait(2000)
  })
})