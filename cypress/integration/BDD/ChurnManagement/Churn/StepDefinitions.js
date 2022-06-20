/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import ChurnManagement from '../../../../support/pageObjects/ChurnManagement/ChurnManagement';
import"../../../../support/subscriberCommands";
import "../../../../support/commands";
import "../../../../support/comissioncommands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import { recurse } from 'cypress-recurse';

//----------------Object Declaration-----------------------------------------------------------

const pageLogin = new loginPage()
const churnManagementPage = new ChurnManagement()
const welcomePage = new homePage ()
const registerPage = new register()
const approvalPage = new approvals()

const cdCSVFile = 'CommissionDisbursement.csv'
const churnSubRegistration = 'cypress/fixtures/userData/churnSubscriberReg.json'
var mobile
var loginId
var KycValue

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function(data2) {
       this.data2 = data2;
   })

});

//----------------Test Scripts-POC(code)--------------------------------------------------------------

//----------------Launch Mobiquity Portal URL and Login--------------------------------------

//............Navigate to security and click on security questions...............
Given('Login into Mobiquity Portal as System admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)
})

Given('Login into Mobiquity Portal as another System admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin User2', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})

Given('Login into Mobiquity Portal as another System admin User after Logout', function () {
  cy.loginAgain(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
  cy.checkWelcomeText(this.data1.networkAdminWelcomeText)

})
Then('Logout', function () {
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()
})
//----------------Navigate to User Management tab and Click on Register---------------------------------
When('Navigate to User Management and Click on register', function(){

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
And ('Approve the Users', function() {
  approvalPage.getApproveButton().click({force:true})
  approvalPage.getApproveRequest().click({force:true})
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
  KycValue = "ABX" + uuid()

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
  KycValue = "ABX" + uuid()
  registerPage.getKycDropDownButton().eq(0).click({ force: true })
  
  registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
  registerPage.getKycIDValue().type(KycValue, { force: true }),
 // registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
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
Then('SubscrigReg Confirmation message is displayed', function(){

  registerPage.getNextButtonBasic2().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
  
  // recurse(
  //   ()=>registerPage.getDoneButton().click({ force: true }),
  //   ()=>registerPage.getKycTab().click({ force: true }),
  //   ()=>cy.wait(2000),
  //   ()=>registerPage.getKycIDValue().clear().type('axpcceyd12', { force: true }),
  //   ()=>registerPage.getNextButtonBasic1().click({ force: true }),
  //   ()=>registerPage.getNextButtonBasic2().click({ force: true }),
  //   ()=>registerPage.getSubmitButton().click({ force: true }),
  //   registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true }), 
  //   (uniqueness) => (uniqueness) == registerPage.getErrorMaxKycReached().should('be.visible'),    
  //   )

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

cy.wait(2000)
cy.readFile('cypress/downloads/ChurnUserInitiation.csv')
.then((data) => {
cy.writeFile('cypress/fixtures/ChurnUserInitiation.csv', data)
})
})
// var csv="7784446420, ,Y,N"
// cy.writeFile("./ChurnUserInitiation.csv",csv,{flag:'a+'})
And('Convert .csv file to json file', function () {
  let result = [];
  cy.readFile('cypress/fixtures/ChurnUserInitiation.csv')
  .then((data) => {
   var lines = data.split("\n")
   var headers = lines[0].split(",")
   for(var i=1;i<lines.length;i++){
    var obj = {};
    var currentline=lines[i].split(",");
      cy.log(currentline[0])
      for(var j=0;j<headers.length;j++){
          if(headers[j].includes("*")){
              let removeLastChar = headers[j].slice(0, headers[j].length - 1);
              cy.log(removeLastChar)
              obj[removeLastChar] = currentline[j];
             }
          else{
            obj[headers[j]] = currentline[j];
        }       
    }
    result.push(obj);
    cy.log(obj)
  }
  cy.writeFile('cypress/fixtures/ChurnUserInitiation.json', obj)
})
// console.log(result
})
Then('update the json data', function(){

    cy.readFile("cypress/fixtures/ChurnUserInitiation.json", (data) => {

    }).then((data) => {

        data.MSISDN = cy.readFile("cypress/fixtures/churnSubscriberReg.json",churnSubscriberRegistration)
        data.CHURN_SUBSCRIBER  = "Y"
        data.CHURN_CHANNEL_USER = "N"

        cy.writeFile("cypress/fixtures/ChurnUserInitiation.json", data)

    })
          })


And('Upload .csv file with valid details', function () {
  cy.wait(10000)
  //ext:csv
  churnManagementPage.getChurnInitiationUpload().attachFile('ChurnUserInitiation.csv')
})

When('Click on Churn Management and Churn Approval', function () {
  welcomePage.getChurnManagement().scrollIntoView()
  welcomePage.getChurnManagement().click()
  welcomePage.getChurnApproval().click()
})
Then('Select the initiated churn request and Then click on Batch Reject', function () {
  cy.wait(3000)
  churnManagementPage.getCBatchApprove().click({ force: true })
  churnManagementPage.getChurnApprovalSubmitButton().click({ force: true })

})
Then('Confirm the initiated churn request', function(){
  cy.on('window:confirm')
churnManagementPage.getChurnInitiationMessage().should('contain.text', this.data2.rejectmessage) 
})
//-------TC_104--------------Again Initiating Subscriber using Churned MSISDN -------------------------------------------

And('Enter all the required subscriber details using Churned MSISDN', function () {

  //-------------------Random Data-----------------------------------------------------------------
  const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  KycValue = "ABX" + uuid()

  cy.wait(2000)
  cy.SubRandomName()
  registerPage.getLastName().type(this.data2.personalInfo.lastName, { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(loginId, { force: true })
  registerPage.getMobileNumber().type(churnSubRegistration, {churnSubscriberRegistration}, { force: true })
  registerPage.getAdressLine1().click({ force: true })

  
  cy.OTP()

  //------------------------------------------------------------------------------------------------------------    
  registerPage.getAdressLine1().type(this.data2.subPersonalInfo.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo.city, { force: true })
  registerPage.getNextButtonBasic().click({ force: true })

  //----------------------KYC-----------------------------------------------------------------------
  KycValue = "ABX" + uuid()
  registerPage.getKycDropDownButton().eq(0).click({ force: true })
  
  registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
  registerPage.getKycIDValue().type(KycValue, { force: true }),
 // registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
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

Then ('Save the Registered MSISDN in to fixture',function(){
cy.readFile(churnSubRegistration).then((data) => {
  data.afterChurnSubscriberRegistration = churnSubscriberRegistration  
cy.writeFile(churnSubRegistration, {afterChurnSubscriberRegistration: data })  
})
})

//--------TC_105---------Churn Bulk Upload---------------------------------------------------------------------
And ('Upload Bulk .csv file with valid details',function(){
  

})

//----------TC_107------------Churn Management-----To verify that the System admin can approve the initiated churn process as Batch Reject-----------------

// And('Download a File template', function () {
//   cy.wait(5000)
//   churnManagementPage.getDownloadFileTemplate().click({ force: true })
//   cy.wait(2000)
//  // cy.churnInitiation()
//   cy.readFile('cypress/downloads/ChurnUserInitiation.csv')
//     .then((data) => {
//       cy.writeFile('cypress/fixtures/ChurnUserInitiation.csv', data)
//     })
//   var csv = "7784446420, ,Y,N"
//   cy.writeFile("cypress/fixtures/ChurnUserInitiation", csv, { flag: 'a+' })
// })
// And('Upload .csv file with valid details', function () {
//   cy.wait(10000)
//   churnManagementPage.getChurnInitiationUpload().attachFile('ChurnUserInitiation.csv')
//   churnManagementPage.getChurnInitiationUploadSubmit().click({ force: true })
//   cy.wait(3000)
//   churnManagementPage.getChurnInitiationMessage().should('contain.text', this.data2.initiatemessage)
// })

When('Click on Churn Management and Churn Approval', function () {
  churnManagementPage.getChurnManagement().scrollIntoView()
  churnManagementPage.getChurnManagement().click()
  churnManagementPage.getChurnApproval().click()
})
Then('Select the initiated churn request and Then click on Batch Reject', function () {
  cy.wait(3000)
  churnManagementPage.getLastRadioButton().click({ force: true })
  churnManagementPage.getCBatchReject().click({ force: true })
  churnManagementPage.getChurnApprovalSubmitButton().click({ force: true })
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
  churnManagementPage.getApprove().click({ force: true })
  cy.wait(3000)
  churnManagementPage.getChurnInitiationMessage().should('contain.text', this.data2.approvalmessage)
  // cy.on('window:confirm', () => true)
})

