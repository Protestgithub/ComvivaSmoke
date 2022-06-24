/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import ChurnManagement from '../../../../support/pageObjects/ChurnManagement/ChurnManagement';
import "../../../../support/subscriberCommands";
import "../../../../support/commands";
import "../../../../support/comissioncommands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import { recurse } from 'cypress-recurse';
import "../../../../support/ChurnCommands";


//----------------Object Declaration-----------------------------------------------------------

const pageLogin = new loginPage()
const churnManagementPage = new ChurnManagement()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()


const churnSubRegistration = 'cypress/fixtures/userData/churnSubscriberReg.json'
var mobile
var loginId
var KycValue
var CsvFile = 'cypress/fixtures/ChurnUserInitiation.csv'
var JSONFile = 'cypress/fixtures/churnData/ChurnUserInitiation.json'

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

});

//----------------Test Scripts-POC(code)--------------------------------------------------------------

//----------------Launch Mobiquity Portal URL and Login--------------------------------------

//............Navigate to security and click on security questions...............
Given('Login into Mobiquity Portal as System admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)
})

Given('Login into Mobiquity Portal as another System admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin User2', function () {
  cy.wait(2000)
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin User after Logout', function () {
  cy.loginAgain(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)

})

//SYSADM7774992569
Given('Login into Mobiquity Portal as System admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
///SYSADM7777205592
// Given('Login into Mobiquity Portal as System admin User2', function () {
//   cy.launchURL(Cypress.env('Adminurl'))
//   cy.login(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
//   cy.wait(2000)
//   cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
// })
//----------------Navigate to User Management tab and Click on Register---------------------------------
When('Navigate to User Management and Click on register', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getRegisterOption().click()
})

When('Navigate to Approvals and filter by Submitted status', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
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
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).click({ force: true })
  registerPage.getSelectSubUserTypeTab().contains(this.data2.subPersonalInfo.subUserType).focused()
  registerPage.getUserRole().contains(this.data2.subPersonalInfo.subUserRole).click({ force: true })
  cy.wait(2000)
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})
//----------------------Basic Data------
And('Enter all the required subscriber details', function () {

  //-------------------Random Data-------
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp


  cy.wait(2000)
  cy.SubRandomName()
  registerPage.getLastName().type(this.data2.personalInfo.lastName, { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })

  registerPage.getMobileNumber().type("7723456789", { force: true })
  registerPage.getAdressLine1().click({ force: true })

  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  cy.writeFile(churnSubRegistration, { churnSubscriberRegistration: mobile })

  cy.OTP()

  //---------------------------------------------    
  registerPage.getAdressLine1().type(this.data2.subPersonalInfo.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo.city, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------KYC---------------------
  registerPage.getKycDropDownButton().eq(0).click({ force: true })
  registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
  registerPage.getKycIDValue().type(KycValue, { force: true }),
    registerPage.getMakeThisPrimaryButton().click({ force: true }),
    registerPage.getKycGracePeriod().select(this.data2.KycInfo.KycGracePeriod, { force: true })
  registerPage.getNextButtonBasic1().click({ force: true })

  //-----------------------Profile------------------
  cy.wait(2000)
  registerPage.getSecurityProfile().select(this.data2.personalInfo.securityProfile1, { force: true })
  //cy.getSecurityProfileName()
  registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile1, { force: true })
  registerPage.getReguProfile().select(this.data2.KycInfo.ReguProfile, { force: true })
  registerPage.getMarketingProfile().select(this.data2.KycInfo.MarketProfile, { force: true })

})
Then('SubscrigReg Confirmation message is displayed', function () {

  registerPage.getNextButtonBasic2().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })


  registerPage.getConfirmationText()
})

//------------------------------Approve to (Reg Subscriber to churn)--------------------------------------------------

Then('Added User status is approved', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})

//-------------TC_102---------------------(Churn Management)--------------------------------------------------------

When('Click on Churn Management and Churn Initiation', function () {
  welcomePage.getChurnManagement().scrollIntoView()
  welcomePage.getChurnManagement().click()
  welcomePage.getChurnInitiation().click()
})
And('Download a File template', function () {
  cy.wait(3000)
  churnManagementPage.getDownloadFileTemplate().click({ force: true })
  cy.wait(5000)
})
And('Convert csv To JSON file', function () {
  cy.csvToJSON(CsvFile, JSONFile)
})
And('update the json data', function () {
  cy.readFile(JSONFile).then((data) => {
    data['MSISDN*'] = this.data8.churnSubscriberRegistration
    data['CHURN_SUBSCRIBER*'] = 'Y'
    data['CHURN_CHANNEL_USER*'] = 'N'
    cy.writeFile(JSONFile, data)
  })
})
And('convert json to csv', function () {
  cy.jsonToCSV(JSONFile, CsvFile)
  cy.wait(3000)
})

And('Upload csv file with valid details', function () {
  cy.wait(2000)
  churnManagementPage.getChurnInitiationUpload().attachFile('ChurnUserInitiation.csv')
  cy.wait(3000)
  churnManagementPage.getChurnInitiationUploadSubmit().click({ force: true })
  cy.wait(3000)
  churnManagementPage.getChurnInitiationMessage().should('have.text', 'Churn initiation is completed')
})

Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})
Given('Login into Mobiquity Portal as another System admin User after logout', function () {
  cy.loginAgain(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)
})
When('Click on Churn Management and Churn Approval', function () {
  welcomePage.getChurnManagement().scrollIntoView()
  welcomePage.getChurnManagement().click()
  welcomePage.getChurnApproval().click()
})
Then('Select the initiated churn request and Then click on Batch Reject', function () {
  cy.wait(3000)

  churnManagementPage.getRecentDatainchurn()
  churnManagementPage.getCBatchApprove().click({ force: true })

})
Then('Confirm the initiated churn request', function () {
  cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
    const $body = $iframe.contents().find('body')
    const $win = $iframe[0].contentWindow
    cy.stub($win, 'confirm', () => true)
      .as('windowConfirm')
    cy.stub($win.console, 'log').as('consoleLog')
    cy.wrap($body).churnManagementPage.getChurnApprovalSubmitButton().click({ force: true }).should(function () {
        expect(this.windowConfirm).to.be.calledWith('Are you sure you want to Approve?')
        expect(this.consoleLog).to.be.calledWith('CONFIRMED')  // passes
      })

  })
})
//-------TC_104--------------Again Initiating Subscriber using Churned MSISDN -------------------------------------------

And('Enter all the required subscriber details using Churned MSISDN', function () {

  //-------------------Random Data-----------------------------------------------------------------
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp

  cy.wait(2000)
  cy.SubRandomName()
  registerPage.getLastName().type(this.data2.personalInfo.lastName, { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })
  registerPage.getMobileNumber().type(this.data8.churnSubscriberRegistration, { force: true })
  registerPage.getAdressLine1().click({ force: true })


  cy.OTP()

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
  cy.wait(2000)
  registerPage.getSecurityProfile().select(this.data2.personalInfo.securityProfile1, { force: true })
  //cy.getSecurityProfileName()
  registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile1, { force: true })
  registerPage.getReguProfile().select(this.data2.KycInfo.ReguProfile, { force: true })
  registerPage.getMarketingProfile().select(this.data2.KycInfo.MarketProfile, { force: true })

})

Then('Save the Registered MSISDN in to fixture', function () {
  cy.readFile(churnSubRegistration).then((data) => {
    data.afterChurnSubscriberRegistration = churnSubscriberRegistration
    cy.writeFile(churnSubRegistration, { afterChurnSubscriberRegistration: data })
  })
})

//--------TC_105---------Churn Bulk Upload---------------------------------------------------------------------
And('Enter all the required subscriber details', function () {

  //-------------------Random Data-------
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp


  cy.wait(2000)
  cy.SubRandomName()
  registerPage.getLastName().type(this.data2.personalInfo.lastName, { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })

  registerPage.getMobileNumber().type("7723456789", { force: true })
  registerPage.getAdressLine1().click({ force: true })

  recurse(
    () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
    () => registerPage.getAdressLine1().click({ force: true }),
    (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().contains
      ('Value is not unique').should('be.visible'),
    registerPage.getAdressLine1().click({ force: true }),
  )
  cy.readFile(churnSubRegistration)
  cy.writeFile(churnSubRegistration, { churnSubscriberRegistration1: mobile })

  cy.OTP()

  //---------------------------------------------    
  registerPage.getAdressLine1().type(this.data2.subPersonalInfo.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo.city, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------KYC---------------------
  registerPage.getKycDropDownButton().eq(0).click({ force: true })
  registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
  registerPage.getKycIDValue().type(KycValue, { force: true }),
    registerPage.getMakeThisPrimaryButton().click({ force: true }),
    registerPage.getKycGracePeriod().select(this.data2.KycInfo.KycGracePeriod, { force: true })
  registerPage.getNextButtonBasic1().click({ force: true })

  //-----------------------Profile------------------
  cy.wait(2000)
  registerPage.getSecurityProfile().select(this.data2.personalInfo.securityProfile1, { force: true })
  //cy.getSecurityProfileName()
  registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile1, { force: true })
  registerPage.getReguProfile().select(this.data2.KycInfo.ReguProfile, { force: true })
  registerPage.getMarketingProfile().select(this.data2.KycInfo.MarketProfile, { force: true })
})


And('Upload Bulk csv file with valid details', function () {


})

//----------TC_107------------Churn Management-----To verify that the System admin can approve the initiated churn process as Batch Reject-----------------

Then('Select the initiated churn request and Then click on Batch Reject', function () {
  cy.wait(3000)
  churnManagementPage.getLastRadioButton().click({ force: true })
  churnManagementPage.getCBatchReject().click({ force: true })
  cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
    const $body = $iframe.contents().find('body')
    const $win = $iframe[0].contentWindow
    cy.stub($win, 'confirm', () => true)
      .as('windowConfirm')
    cy.stub($win.console, 'log').as('consoleLog')
    cy.wrap($body).churnManagementPage.getChurnApprovalSubmitButton().click({ force: true }).should(function () {
        expect(this.windowConfirm).to.be.calledWith('Are you sure you want to Reject?')
        expect(this.consoleLog).to.be.calledWith('CONFIRMED')  // passes
      })

  })
  cy.wait(3000)
  churnManagementPage.getChurnInitiationMessage().should('contain.text', this.data2.rejectmessage)
  //cy.on('window:confirm', () => true)
})
//----------TC_108------------Churn Management-----To verify that the System admin can approve the initiated churn process as Approve/Reject by Selection-----------------
Then('Select the initiated churn request and Then click on Approve and Reject by Selection', function () {
  cy.wait(3000)
  churnManagementPage.getLastRadioButton().click({ force: true })
  churnManagementPage.getCBatchApproveRejectBySelection().click({ force: true })
  churnManagementPage.getChurnApprovalSubmitButton().click({ force: true })
  cy.wait(3000)
  churnManagementPage.getCheckAll().click({ force: true })
  cy.wait(3000)
  cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
    const $body = $iframe.contents().find('body')
    const $win = $iframe[0].contentWindow
    cy.stub($win, 'confirm', () => true)
      .as('windowConfirm')
    cy.stub($win.console, 'log').as('consoleLog')
    cy.wrap($body).  churnManagementPage.getApprove().click({ force: true })
    .should(function () {
        expect(this.windowConfirm).to.be.calledWith('Are you sure you want to Reject?')
        expect(this.consoleLog).to.be.calledWith('CONFIRMED')  // passes
      })

  })

  churnManagementPage.getChurnInitiationMessage().should('contain.text', this.data2.approvalmessage)
  // cy.on('window:confirm', () => true)
})

