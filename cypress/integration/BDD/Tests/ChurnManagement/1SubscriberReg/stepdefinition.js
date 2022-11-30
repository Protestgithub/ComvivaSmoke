/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import ChurnManagement from '../../../../../support/pageObjects/ChurnManagement/ChurnManagement';
import "../../../../../support/subscriberCommands";
import "../../../../../support/commands";
import "../../../../../support/comissioncommands";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import { recurse } from 'cypress-recurse';
import "../../../../../support/ChurnCommands";
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
//----------------Object Declaration-----------------------------------------------------------

const pageLogin = new loginPage()
const churnManagementPage = new ChurnManagement()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const myActivityPage = new myActivity()
const manageUsersPage = new manageUsers()
const uuid = () => Cypress._.random(1e2)
Amount = uuid()

var CashFile = 'cypress/fixtures/userData/cashIn&cashout.json'
const churnSubRegistration = 'cypress/fixtures/userData/churnSubscriberReg.json'
var loginId, KycValue, name, Amount

const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp

//----------------------------------------------------------------------------------------
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
  cy.fixture('userData/churnSubscriberReg').then(function (data8) {
    this.data8 = data8;
  })
  cy.fixture('ChurnManagement').then(function (data3) {
    this.data3 = data3;
  })
  cy.fixture('userData/Regulatory&MarketingProfile').then(function (data4) {
    this.data4 = data4;
  })

});

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
Then('Logout', function () {
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

When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
  welcomePage.getApprovalButtonTab().click()
  cy.waitUntil(() => {
    return cy.iframe().find('h4.text-secondary')
  })
  //------------------------------------Filter the data--------------------------------------------------
  pageLogin.getiFrame()
  approvalPage.getFilter().click({ force: true })
  approvalPage.getAddUserCheckBox().click({ force: true })
  approvalPage.getApplyFilter().click({ force: true })
})

And('Navigate to My Activity and Aplly required filters', function () {
  welcomePage.getMyActivity().click()
  myActivityPage.getFilter().click({ force: true })
  myActivityPage.getAddUser().click({ force: true })
  myActivityPage.getSubmittedStatus().click()
  myActivityPage.getApply().click()
})
//--------------------------------------------------------------------------------------------------------

And('Assert Created Subscriber Mobile Number and Write Created on time', function () {
  cy.readFile(churnSubRegistration).then((user) => {
    let SubMobile = user.churnSubscriberRegistration
    var SUBMobile = " " + SubMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', SUBMobile)
  })
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(churnSubRegistration).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(churnSubRegistration, data)
    })
  })
})
And('Assert Created Subscriber Mobile Number for Batch Reject and Write Created on time', function () {
  cy.readFile(churnSubRegistration).then((user) => {
    let SubMobile = user.churnSubRegBatchReject
    var SUBMobile = " " + SubMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', SUBMobile)
  })
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(churnSubRegistration).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(churnSubRegistration, data)
    })
  })
})


And('Assert Created Subscriber Mobile Number for Bulk and Write Created on time', function () {
  cy.readFile(churnSubRegistration).then((user) => {
    let SubMobile = user.churnSubscriberRegistrationBulkUpload
    var SUBMobile = " " + SubMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', SUBMobile)
  })
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(churnSubRegistration).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(churnSubRegistration, data)
    })
  })
})
And('Assert Created Subscriber Mobile Number for ApprRej and Write Created on time', function () {
  cy.readFile(churnSubRegistration).then((user) => {
    let SubMobile = user.churnSubscriberRegistrationChurnAprRej
    var SUBMobile = " " + SubMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', SUBMobile)
  })
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(churnSubRegistration).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(churnSubRegistration, data)
    })
  })
})
//-----------------------------------------------------------------------------------------------

And('User click on Subscriber submitted user data', function () {
  cy.getApproval(churnSubRegistration)
})

And('Approve the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})
Then('Added User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})

//---------- Pre-Requisit ------ Subscriber initiation for Churn -------------------------------------------------

And('Select User type as Subscriber and click on Subscriber', function () {
  pageLogin.getiFrame()
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).click({ force: true })
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).focused()
  registerPage.getUserRole().contains(this.data2.subPersonalInfo.subUserRole).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
//----------------------Basic Data------
And('Enter all the required subscriber details', function () {
  let mobileut1;
  const m = parseInt(Date.now() / 100000);
  mobileut1 = "77" + m
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  registerPage.getFirstName().type(getRandomName(), { force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })

  recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut1, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  cy.writeFile(churnSubRegistration, { churnSubscriberRegistration: mobileut1 })
  cy.OTP(Cypress.env('apiBaseURL'))

  //------------------------------------------------------------------------------------------------------------    
  registerPage.getAdressLine1().type(this.data2.subPersonalInfo.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo.city, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------KYC-----------------------------------------------------------------------
  const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp
  registerPage.getKycDropDownButton().eq(0).click({ force: true })
  registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
  registerPage.getKycIDValue().type(KycValue, { force: true }),
    registerPage.getMakeThisPrimaryButton().click({ force: true }),
    registerPage.getKycGracePeriod().select(this.data2.KycInfo.KycGracePeriod, { force: true })
  registerPage.getNextButtonBasic1().click({ force: true })

  //-----------------------Profile------------------------------------------------------------------------
  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
  registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
  registerPage.getReguProfile().select("FullKycprofile", { force: true })
  registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })
})

And('Enter all the required subscriber details for bulk upload', function () {
  //-------------------Random Data-------
  let mobileut2;
  const m = parseInt(Date.now() / 100000);
  let k = m + 1
  mobileut2 = "77" + k
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  registerPage.getFirstName().type(getRandomName(), { force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })

  recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut2, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  cy.readFile(churnSubRegistration).then((data) => {
    data.churnSubscriberRegistrationBulkUpload = mobileut2
    cy.writeFile(churnSubRegistration, data)
  })

  cy.OTP(Cypress.env('apiBaseURL'))

  //------------------------------------------------------------------------------------------------------------    
  registerPage.getAdressLine1().type(this.data2.subPersonalInfo.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo.city, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------KYC-----------------------------------------------------------------------
  const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp
  registerPage.getKycDropDownButton().eq(0).click({ force: true })
  registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
  registerPage.getKycIDValue().type(KycValue, { force: true }),
    registerPage.getMakeThisPrimaryButton().click({ force: true }),
    registerPage.getKycGracePeriod().select(this.data2.KycInfo.KycGracePeriod, { force: true })
  registerPage.getNextButtonBasic1().click({ force: true })

  //-----------------------Profile------------------------------------------------------------------------
  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
  registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
  registerPage.getReguProfile().select("FullKycprofile", { force: true })
  registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })
})

Then('SubscrigReg Confirmation message is displayed', function () {
  registerPage.getNextButtonBasic2().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
  registerPage.getConfirmationText().should('have.text',this.data2.confirmationMessage.editUser1)
})




//-------------------------------- Subscriber Registration for churn Approve or Reject-------

And('Enter all the required subscriber details for churn approve or reject', function () {
  //-------------------Random Data-------
  let mobileut3;
  const m = parseInt(Date.now() / 100000);
  mobileut3 = "77" + m
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  registerPage.getFirstName().type(getRandomName(), { force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })

  recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut3, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  cy.readFile(churnSubRegistration).then((data) => {
    data.churnSubscriberRegistrationChurnAprRej = mobileut3
    cy.writeFile(churnSubRegistration, data)
  })

  cy.OTP(Cypress.env('apiBaseURL'))

  //------------------------------------------------------------------------------------------------------------    
  registerPage.getAdressLine1().type(this.data2.subPersonalInfo.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo.city, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })
  //----------------------KYC-----------------------------------------------------------------------
  
  registerPage.getKycDropDownButton().eq(0).click({ force: true })
  registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
  registerPage.getKycIDValue().type(KycValue, { force: true }),
    registerPage.getMakeThisPrimaryButton().click({ force: true }),
    registerPage.getKycGracePeriod().select(this.data2.KycInfo.KycGracePeriod, { force: true })
  registerPage.getNextButtonBasic1().click({ force: true })

  //-----------------------Profile------------------------------------------------------------------------
  registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
  registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
  registerPage.getReguProfile().select("NoKycprofile", { force: true })
  registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })
})

//----------------Business user login---------------------------------------------------------------------------

Given('Login into Mobiquity Portal as Business admin User3', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
  cy.wait(3000)
  cy.readFile('cypress/fixtures/userData/BusinessUsersDataO2C.json').then((data) => {
    var loginId
    loginId = data.LoginId
    cy.login(loginId, this.data1.businessAdmin.DefaultPassword)
    cy.login1(this.data1.businessAdmin.businessadminPwd1)
    cy.wait(2000)
    cy.Passwordchange(this.data1.UserCreationSuccessMessage)
    pageLogin.getloginbtn1().click({ force: true })
    cy.wait(3000)
    cy.login(loginId, this.data1.businessAdmin.businessadminPwd1)
  })
})

Given('Login into Mobiquity Portal as Business admin User4', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
  cy.wait(3000)
  cy.readFile('cypress/fixtures/userData/BusinessUsersDataO2C.json').then((data) => {
    var loginId
    loginId = data.LoginId
    cy.login(loginId, this.data1.businessAdmin.businessadminPwd1)
  })
})

When('Navigate to Cash in or Cash out and Click on Cash in', function () {
  welcomePage.getCashinOrCashout().click({ force: true })
  welcomePage.getCashin().click({ force: true })
})

And('Enter all Mandatory details', function () {
  cy.wait(3000)
  cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
    const $body = $iframe.contents().find('body')
    const $win = $iframe[0].contentWindow
    const stub = cy.stub()
    if (cy.stub($win, 'alert', () => false)
      .as('windowConfirm')) {
    }
    else {
      cy.stub($win.console, 'log').as('consoleLog')
      cy.wrap($body)
        .find('input[name="amount"]').click({ force: true })
        .should(function () {
          expect(this.windowConfirm).to.be.calledWith("You must enter value in MSISDN")
        })
    }
  })
  cy.readFile(churnSubRegistration).then((data) => {
    let Mobile = data.churnSubscriberRegistration
    cy.wait(3000)
    churnManagementPage.getMSISDN().type(Mobile)
  })
  churnManagementPage.getAmount().type(Amount)
  churnManagementPage.getPaymentID().type(Amount)
})

Then('Click on Submit and Click on Confirm Button', function () {
  churnManagementPage.getSubmitButton().click()
   cy.wait(3000)
  churnManagementPage.getConfirmButton().click()
  cy.wait(3000)
  churnManagementPage.getChurnInitiationMessage().then((al => {
    let q = al.text()
    cy.log(q)
    let a = q.split(':')
    let b = a[1].trim()
    cy.log(b)
    cy.writeFile(CashFile, { cashinTransactionID: b })
  }))
  cy.readFile(CashFile).then((data) => {
    let Msg = data.cashinTransactionID
    cy.wait(3000)
    churnManagementPage.getChurnInitiationMessage().should('have.text', this.data3.cashInSucsessMsg + Msg)
  })
})

Then('Click on Submit and Click on Confirm Button1', function () {
  churnManagementPage.getSubmitButton().click()
  cy.wait(3000)
  churnManagementPage.getConfirmButton().click()
  cy.wait(3000)
  cy.readFile(CashFile).then((data) => {
    churnManagementPage.getChurnInitiationMessage().then((al => {
      let q = al.text()
      cy.log(q)
      let a = q.split(':')
      let b = a[1].trim()
      cy.log(b)
      data.cashinTransactionID1 = b
      cy.writeFile(CashFile, data)
    }))
  })
  cy.readFile(CashFile).then((data) => {
    let Msg = data.cashinTransactionID1
    cy.wait(3000)
    churnManagementPage.getChurnInitiationMessage().should('have.text', this.data3.cashInSucsessMsg + Msg)
  })
})

Then('Click on Submit and Click on Confirm Button2', function () {
  churnManagementPage.getSubmitButton().click()
  cy.wait(3000)
  churnManagementPage.getConfirmButton().click()
  cy.wait(3000)
  cy.readFile(CashFile).then((data) => {
    churnManagementPage.getChurnInitiationMessage().then((al => {
      let q = al.text()
      cy.log(q)
      let a = q.split(':')
      let b = a[1].trim()
      cy.log(b)
      data.cashinTransactionID2 = b
      cy.writeFile(CashFile, data)
    }))
  })
  cy.readFile(CashFile).then((data) => {
    let Msg = data.cashinTransactionID2
    cy.wait(3000)
    churnManagementPage.getChurnInitiationMessage().should('have.text', this.data3.cashInSucsessMsg + Msg)
  })
})