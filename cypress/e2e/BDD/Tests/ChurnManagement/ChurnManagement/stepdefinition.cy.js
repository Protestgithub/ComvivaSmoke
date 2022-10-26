/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>
//----------------Imports---------------------------------------------------------------------

import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import ChurnManagement from '../../../../../support/pageObjects/ChurnManagement/ChurnManagement';
import "../../../../../support/utils/subscriberCommands";
import "../../../../../support/utils//Generic";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import { recurse } from 'cypress-recurse';
import "../../../../../support/utils/ChurnCommands";
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
const uuid = () => Cypress._.random(1e3)
Amount = uuid()


const churnSubRegistration = 'cypress/fixtures/userData/churnSubscriberReg.json'
var Amount
var name
var loginId
var KycValue
function getRandomName() {
    name = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
        name += possible.charAt(Math.floor(Math.random() * possible.length));
    return name;
}
//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {

    cy.fixture('userData/churnSubscriberReg').then(function (data008) {
        this.data008 = data008;
    })
    cy.fixture('ChurnManagement').then(function (data003) {

      this.data003 = data003;
  
    })

});

//-------------------------------------Subscriber Creation Prerequisite---------------------------------
var CsvFile = 'cypress/fixtures/templates/ChurnUserInitiation.csv'
var JSONFile = 'cypress/fixtures/churnData/ChurnUserInitiation.json'


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







//--------------------approval 









//-----------------------------Subscriber creation for Bulk Upload---------------------------------------
And('SubscrigReg Confirmation message is displayed', function () {

  registerPage.getNextButtonBasic2().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
  registerPage.getConfirmationText()
  cy.wait(20000)
})



And('Assert Created Subscriber churn Mobile Number and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(churnSubRegistration).then((user) => {
  let SubMobile = user.churnSubscriberRegistration
  var SUBMobile = " "+SubMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',SUBMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(churnSubRegistration).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(churnSubRegistration,data)
  })
})
}) 


And('Assert Created Subscriber Mobile Number for Bulk and Write Created on time', function(){

  cy.wait(2000)

  cy.readFile(churnSubRegistration).then((user) => {

  let SubMobile = user.churnSubscriberRegistrationBulkUpload

  var SUBMobile = " "+SubMobile

  manageUsersPage.getAssertMobile().eq(1).should('have.text',SUBMobile)

})

cy.wait(2000)

myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{

  time= time.trim()

  cy.log(time)

  cy.readFile(churnSubRegistration).then((data) => {

  data.CreatedOnTime = time

  cy.writeFile(churnSubRegistration,data)

  })

})

})


And('Enter all the required subscriber details for churn', function () {

  //-------------------Random Data-------
  /*const uuid = () => Cypress._.random(1e8)
  mobile = "77" + uuid()*/
  let mobileut1;
  const m = parseInt(Date.now()/100000);
  mobileut1 = "77" + m
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  CIF = lgid()
  cy.wait(2000)
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
  //cy.writeFile(subRegistration,{ subscriberMobile: mobile })
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
    // registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
    registerPage.getMakeThisPrimaryButton().click({ force: true }),
    registerPage.getKycGracePeriod().select(this.data2.KycInfo.KycGracePeriod, { force: true })
  registerPage.getNextButtonBasic1().click({ force: true })

  //-----------------------Profile------------------------------------------------------------------------
  cy.wait(2000)
      // cy.readFile(SubProfileName).then((data) => {
   // let Profile = data.subscriber
    registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
 // })
  //cy.readFile(SubProfileName).then((data) => {
 //   let Profile = data.SubscriberProfileName1
    registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
 // })
  //  registerPage.getReguProfile().select(this.data2.KycInfo.ReguProfile, { force: true })
  // cy.readFile(RegulatoryMarketingProfile).then((data) => {
   //  let Profile = data.RegulatoryProfileName
     registerPage.getReguProfile().select("NoKycprofile", { force: true })
  // })
  //registerPage.getMarketingProfile().select(this.data2.KycInfo.MarketProfile, { force: true })
   //cy.readFile(RegulatoryMarketingProfile).then((data) => {
  //  let Profile = data.MarketingProfileName
    registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })
  // })
})

And('User click on Subscriber submitted user data for churn', function () {
  cy.getApproval(churnSubRegistration)
})

And('Assert Created Subscriber churn Mobile Number and Write Created on time for churn', function(){
  cy.wait(2000)
  cy.readFile(churnSubRegistration).then((user) => {
  let SubMobile = user.churnSubscriberRegistration
  var SUBMobile = " "+SubMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',SUBMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(churnSubRegistration).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(churnSubRegistration,data)
  })
})
})

And('Enter all the required subscriber details for bulk upload', function () {

    //-------------------Random Data-------
    /*const uuid = () => Cypress._.random(1e8)
    mobile = "77" + uuid()*/
    let mobileut2;
    const m = parseInt(Date.now()/100000);
    mobileut2 = "77" + m
    const lgid = () => Cypress._.random(1e5)
    loginId = this.data2.personalInfo.firstName + lgid()
    CIF = lgid()
    cy.wait(2000)
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
    //cy.writeFile(subRegistration,{ subscriberMobile: mobile })
    
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
      // registerPage.getKycIDType().select(this.data2.KycInfo.KycIDType, { force: true })
      registerPage.getMakeThisPrimaryButton().click({ force: true }),
      registerPage.getKycGracePeriod().select(this.data2.KycInfo.KycGracePeriod, { force: true })
    registerPage.getNextButtonBasic1().click({ force: true })
  
    //-----------------------Profile------------------------------------------------------------------------
    cy.wait(2000)
        // cy.readFile(SubProfileName).then((data) => {
     // let Profile = data.subscriber
      registerPage.getSecurityProfile().select("subscriberSecurityProfile", { force: true })
   // })
    //cy.readFile(SubProfileName).then((data) => {
   //   let Profile = data.SubscriberProfileName1
      registerPage.getAuthProfile().select("SubsDefault Profile", { force: true })
   // })
    //  registerPage.getReguProfile().select(this.data2.KycInfo.ReguProfile, { force: true })
    // cy.readFile(RegulatoryMarketingProfile).then((data) => {
     //  let Profile = data.RegulatoryProfileName
       registerPage.getReguProfile().select("NoKycprofile", { force: true })
    // })
    //registerPage.getMarketingProfile().select(this.data2.KycInfo.MarketProfile, { force: true })
     //cy.readFile(RegulatoryMarketingProfile).then((data) => {
    //  let Profile = data.MarketingProfileName
      registerPage.getMarketingProfile().select("SUBSDefaultMP", { force: true })
    // })
  })

  //--------------------Churn Initiation -----------------------------------------------------------------

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
      data['MSISDN*'] = this.data008.churnSubscriberRegistration
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
    churnManagementPage.getChurnInitiationUpload().attachFile('templates/ChurnUserInitiation.csv')
    cy.wait(3000)
    churnManagementPage.getChurnInitiationUploadSubmit().click({ force: true })
    cy.wait(3000)
    churnManagementPage.getChurnInitiationMessage().should('have.text', 'Churn initiation is completed')
  })
  
  And('Click on Churn Management and Churn Approval', function () {
    welcomePage.getChurnManagement().scrollIntoView()
    welcomePage.getChurnManagement().click()
   cy.wait(2000)
    welcomePage.getChurnApproval().click()
  })
  And('Select the initiated churn request and click on Batch Approve', function () {
    cy.wait(2000)
    churnManagementPage.getRecentDatainchurn()
    churnManagementPage.getCBatchApprove().click({ force: true })
    cy.wait(2000)
    //churnManagementPage.getChurnApprovalSubmitButton().click({force:true})
  
  })
  Then('Confirm the initiated churn request', function () {  
    cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
      const $body = $iframe.contents().find('body')
      const $win = $iframe[0].contentWindow
      cy.stub($win, 'confirm', () => true)
        .as('windowConfirm')
      cy.stub($win.console, 'log').as('consoleLog')
      cy.wrap($body)
      .find('[id="appchurn"]').click({ force: true }).should(function () {
          expect(this.windowConfirm).to.be.calledWith('Are you sure you want to Approve?')
          //expect(this.consoleLog).to.be.calledWith('CONFIRMED')  // passes
        })
  
    })
  })

  //--------------------Churn Initiation Bulk Upload-----------------------------------------------------------------
  And('update the json data for bulkupload', function () {
    cy.readFile(JSONFile).then((data) => {
      data['MSISDN*'] = this.data008.churnSubscriberRegistrationBulkUpload 
      data['CHURN_SUBSCRIBER*'] = 'Y'
      data['CHURN_CHANNEL_USER*'] = 'N'
      // data['MSISDN*'] = this.data008.churnSubscriberRegistration 
      // data['CHURN_SUBSCRIBER*'] = 'Y'
      // data['CHURN_CHANNEL_USER*'] = 'N'
      cy.writeFile(JSONFile, data)
    })
  })

  Then('Select the initiated churn request and click on Batch Reject', function () {

    cy.wait(3000)
  
    churnManagementPage.getLastRadioButton().click({ force: true })
  
    churnManagementPage.getCBatchReject().click({ force: true })
  
    cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {
  
      const $body = $iframe.contents().find('body')
  
      const $win = $iframe[0].contentWindow
  
      cy.stub($win, 'confirm', () => true)
  
        .as('windowConfirm')
  
      cy.stub($win.console, 'log').as('consoleLog')
  
      cy.wrap($body)
  
      churnManagementPage.getChurnApprovalSubmitButton().click({ force: true }).should(function () {
  
          expect(this.windowConfirm).to.be.calledWith('Are you sure you want to Reject?')
  
          //expect(this.consoleLog).to.be.calledWith('CONFIRMED')  // passes
  
        })
  
  
  
    })
  
    cy.wait(3000)
  
    churnManagementPage.getChurnInitiationMessage().should('contain.text', this.data003.rejectmessage)
  
    //cy.on('window:confirm', () => true)
  
  })