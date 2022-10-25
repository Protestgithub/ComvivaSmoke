/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
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
var BuisnessReg = 'cypress/fixtures/userData/BusinessUsersData.json'
var BankData = 'cypress/fixtures/userData/BusinessUsersDataO2C.json'
var BuisnessRegO2C = 'cypress/fixtures/userData/BusinessUsersDataO2C.json'

function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}



//----------------Test Scripts---------------------------------------------------------------------------

//--------------------------User Management--------------------------------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------
//----------------Navigate to User Management tab and Click on Register---------------------------------


//-----------------Select User Type-----------------------------------------------------------
And('Select User type as Business and Select user role', function () {

  pageLogin.getiFrame()
  cy.wait(2000)
  registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).click({ force: true })
  registerPage.getSelectUserTypeTab().contains(this.data2.userType2).focused()
  registerPage.getUserRole().contains(this.data2.userRole8).click({ force: true })
  registerPage.getRegistrationMode().eq(0).click({ force: true })
})


And('Enter all the required business user details Creation', function () {

  //const uuid = () => Cypress._.random(1e8)
  let mobileut;
  const m = parseInt(Date.now()/100000);
  mobileut = "77" + m

  cy.wait(2000)
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.name + lgid()
  cy.wait(2000)

  cy.iframe().find('select[data-test-id="title"]')
    .select(this.data2.personalInfo.Title, { force: true })
  //-----------------------Mobile Number OTP-------------------------------------------------------------------
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json',{registeredMobile:mobileut})
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.OTP(Cypress.env('apiBaseURL'))
  cy.wait(2000)
  //----------------email id otp---------------------------------------------------//
  cy.getBusinessrandomUserEmailID()
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
 cy.OTP(Cypress.env('apiBaseURL'))
  cy.wait(2000)

  registerPage.getSupportOnline().select(this.data2.personalInfo.online, { force: true })
  registerPage.getAdressLine1().type(this.data2.personalInfo.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.personalInfo.state, { force: true })
  registerPage.getCity().select(this.data2.personalInfo.city, { force: true })
  registerPage.getLatitude().type(this.data2.personalInfo.Latitude, { force: true })
  registerPage.getlongitude().type(this.data2.personalInfo.Longitude, { force: true })

  registerPage.getNextButtonBasic().eq(0).click({ force: true })

  
  //---------------------KYC-----------------------------------------------------------------------
  let kycut
  const k = parseInt(Date.now());

  kycut="A"+k
  registerPage.getKYCButton().eq(0).click({ force: true })
  cy.wait(2000)
  registerPage.getKYCIDType().select(this.data2.KycInfo8.KycIDType, { force: true })
  registerPage.getKYCIDValue().type(kycut, { force: true })
  cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
    data.RegisteredKyc = kycut
    cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json', data)

  })

  cy.wait(2000)
  registerPage.getMakeThisPrimaryButton().eq(2).click({ force: true })
  cy.wait(2000)
  registerPage.getNextButtonBasic1().click({ force: true })

  
  //-----------------------------Profile---------------------------------------------------------------

  cy.wait(5000)
  //cy.readFile(SubProfileName).then((data) => {
  //  let Profile = data.Distributer
    registerPage.getSecurityProfile().select('WholesalerDefaultSecurityProfile', { force: true })
 // })
 // cy.readFile(SubAuthProfileName).then((data) => {
  //  let Profile1 = data.BusinessDistributor
    registerPage.getAuthProfile().select('WholesalerDefault Profile', { force: true })
  //})
 // registerPage.getReguProfile().select(this.data2.personalInfo.ReguProfile, { force: true })
 // cy.readFile(RegulatoryMarketingProfile).then((data) => {
   //    let RegProfile = data.RegulatoryProfileName
     registerPage.getReguProfile().select('FullKycprofile', { force: true })
    // })
  //registerPage.getMarketingProfile().select(this.data2.personalInfo.MarketProfile, { force: true })
 // cy.readFile(RegulatoryMarketingProfile).then((data) => {
   //   let MarProfile = data.MarketingProfileNameDistributer
       registerPage.getMarketingProfile().select('WHSDefaultMP', { force: true })
   //  })
   registerPage.getNextButtonBasic2().click({force:true})
   

   /*const t = parseInt(Date.now()/1000);
  ifscnum="S"+t

    const uuidbkd = () => Cypress._.random(1e9)
    accnumber="4239346"+uuidbkd()
    registerPage.getCurrency().select(this.data2.Bank.Currency, { force: true })
    cy.wait(3000)

   cy.readFile(BankData).then((data) => {
    data.CurrencyDetail= this.data2.Bank.Currency
    cy.writeFile(BankData, data)
  })
   cy.wait(3000)


 registerPage.getBankName().select(this.data2.Bank.BankName, {force:true})
 cy.wait(3000)
 
 cy.readFile(BankData).then((data) => {
  data.BankNameDetail= this.data2.Bank.BankName
  cy.writeFile(BankData, data)
})
 
 registerPage.getAccountNum().type(accnumber, { force: true })
  cy.wait(3000)
 cy.readFile(BankData).then((data) => {
  data.Accnum= accnumber
  cy.writeFile(BankData, data)
})
 registerPage.getConfirmAccNum().type(accnumber, { force: true })
 
 registerPage.getNickName().type(getRandomName(), { force: true })
 registerPage.getBankAccountType().select(this.data2.Bank.BankAccountType,{force:true})
 cy.readFile(BankData).then((data) => {
  data.BankAccountTYpeDetail= this.data2.Bank.BankAccountType
  cy.writeFile(BankData, data)
})
 cy.wait(3000)
 
 registerPage.getBankIFSC().type(ifscnum, { force: true })
 */
  registerPage.getNextButtonBasic3().click({force:true})

  //Newly Added code
  cy.intercept('mobiquitypay/v1/ums/user').as('all')
  registerPage.getSubmitButton().click({ force: true })
  cy.wait('@all', {timeout: 70000}).then(inter => {
    if(inter.response.statusCode>500)
    {
   registerPage.getErrorMessage().should('include.text', 'It is taking too long to respond. You will receive a notification with the result soon')
   registerPage.getErrorDone().click({force:true})
    }
    else{
      return
    }
    cy.log(JSON.stringify(inter.response.statusCode))
    console.log(JSON.stringify(inter.response.statusCode))
  })


 //registerPage.getSubmitButton().click({ force: true })


})

And('User click on Buisness User submitted user data', function () {
  cy.intercept('/mobiquitypay/v1/languages').as('all')
  cy.getApproval(BuisnessReg)
  cy.checkAPI('/mobiquitypay/v1/languages')
  cy.wait(2000)
})




And('Enter all the required business user details for O2C', function () {

  //const uuid = () => Cypress._.random(1e8)
  let mobileut;
  const m = parseInt(Date.now() / 100000);
  mobileut = "77" + m

  cy.wait(2000)
  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.name + lgid()
  cy.wait(2000)

  cy.iframe().find('select[data-test-id="title"]')
    .select(this.data2.personalInfo.Title, { force: true })
  //-----------------------Mobile Number OTP-------------------------------------------------------------------
  recurse(
    () => registerPage.getMobileNumber().clear().type(mobileut, { force: true }),
    () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )

  cy.writeFile("cypress/fixtures/userData/BusinessUsersDataO2C.json", { registeredMobileO2C: mobileut })

  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.intercept('/mobiquitypay/v2/otp/generate').as('all')
  cy.OTP(Cypress.env('apiBaseURL'))
  cy.checkAPI('/mobiquitypay/v2/otp/generate')
  cy.wait(2000)
  //----------------email id otp---------------------------------------------------//
  cy.getBusinessrandomUserEmailIDO2C()
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  cy.intercept('/mobiquitypay/v2/otp/generate').as('all')
  cy.OTP(Cypress.env('apiBaseURL'))
  cy.checkAPI('/mobiquitypay/v2/otp/generate')
  cy.wait(2000)

  registerPage.getSupportOnline().select(this.data2.personalInfo.online, { force: true })
  registerPage.getAdressLine1().type(this.data2.personalInfo.addressLine1, { force: true })
  cy.intercept('/mobiquitypay/v1/user/enums?parent-value=').as('all')
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  cy.checkAPI('/mobiquitypay/v1/user/enums?parent-value=')
  cy.intercept('/mobiquitypay/v1/user/enums?parent-value=').as('all')
  registerPage.getState().select(this.data2.personalInfo.state, { force: true })
  cy.checkAPI('/mobiquitypay/v1/user/enums?parent-value=')
  registerPage.getCity().select(this.data2.personalInfo.city, { force: true })
  registerPage.getLatitude().type(this.data2.personalInfo.Latitude, { force: true })
  registerPage.getlongitude().type(this.data2.personalInfo.Longitude, { force: true })

  registerPage.getNextButtonBasic().eq(0).click({ force: true })


  //---------------------KYC-----------------------------------------------------------------------
  let kycut
  const k = parseInt(Date.now());

  kycut = "A" + k
  registerPage.getKYCButton().eq(0).click({ force: true })
  cy.wait(2000)
  cy.intercept('/mobiquitypay/v1/user/enums?parent-value=').as('all')
  registerPage.getKYCIDType().select(this.data2.KycInfo8.KycIDType, { force: true })
  cy.checkAPI('/mobiquitypay/v1/user/enums?parent-value=')
  registerPage.getKYCIDValue().type(kycut, { force: true })


  cy.wait(2000)
  registerPage.getMakeThisPrimaryButton().eq(2).click({ force: true })
  cy.wait(2000)
  cy.intercept('/mobiquitypay/v1/marketingProfiles?categoryCode=').as('all')
  registerPage.getNextButtonBasic1().click({ force: true })
  cy.checkAPI('/mobiquitypay/v1/marketingProfiles?categoryCode=')

  //-----------------------------Profile---------------------------------------------------------------

  cy.wait(5000)
  //cy.readFile(SubProfileName).then((data) => {
  //  let Profile = data.Distributer
  registerPage.getSecurityProfile().select('WholesalerDefaultSecurityProfile', { force: true })
  // })
  // cy.readFile(SubAuthProfileName).then((data) => {
  //  let Profile1 = data.BusinessDistributor
  registerPage.getAuthProfile().select('WholesalerDefault Profile', { force: true })
  //})
  // registerPage.getReguProfile().select(this.data2.personalInfo.ReguProfile, { force: true })
  // cy.readFile(RegulatoryMarketingProfile).then((data) => {
  //    let RegProfile = data.RegulatoryProfileName
  registerPage.getReguProfile().select('FullKycprofile', { force: true })
  // })
  //registerPage.getMarketingProfile().select(this.data2.personalInfo.MarketProfile, { force: true })
  // cy.readFile(RegulatoryMarketingProfile).then((data) => {
  //   let MarProfile = data.MarketingProfileNameDistributer
  registerPage.getMarketingProfile().select('WHSDefaultMP', { force: true })
  //  })
  registerPage.getNextButtonBasic2().click({ force: true })


  const t = parseInt(Date.now() / 1000);
  ifscnum = "S" + t

  const uuidbkd = () => Cypress._.random(1e9)
  accnumber = "4239346" + uuidbkd()
  registerPage.getCurrency().select(this.data2.Bank.Currency, { force: true })
  cy.wait(3000)

  cy.readFile(BankData).then((data) => {
    data.CurrencyDetail = this.data2.Bank.Currency
    cy.writeFile(BankData, data)
  })
  cy.wait(3000)


  registerPage.getBankName().select(this.data2.Bank.BankName, { force: true })
  cy.wait(3000)

  cy.readFile(BankData).then((data) => {
    data.BankNameDetail = this.data2.Bank.BankName
    cy.writeFile(BankData, data)
  })

  registerPage.getAccountNum().type(accnumber, { force: true })
  cy.wait(3000)
  cy.readFile(BankData).then((data) => {
    data.Accnum = accnumber
    cy.writeFile(BankData, data)
  })
  registerPage.getConfirmAccNum().type(accnumber, { force: true })

  registerPage.getNickName().type(getRandomName(), { force: true })
  registerPage.getBankAccountType().select(this.data2.Bank.BankAccountType, { force: true })
  cy.readFile(BankData).then((data) => {
    data.BankAccountTYpeDetail = this.data2.Bank.BankAccountType
    cy.writeFile(BankData, data)
  })
  cy.wait(3000)
  registerPage.getBankIFSC().type(ifscnum, { force: true })
  registerPage.getNextButtonBasic3().click({ force: true })
  cy.intercept('/mobiquitypay/v1/ums/user').as('all')
 registerPage.getSubmitButton().click({ force: true })
 cy.checkAPI('/mobiquitypay/v1/ums/user')



})
And('Assert Created Buissness User Mobile Number and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(BuisnessReg).then((user) => {
  let BUMobile = user.registeredMobile
  var BUDMobile = " "+BUMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',BUDMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(BuisnessReg).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(BuisnessReg,data)
  })
})
})


And('Assert Created Buissness User Mobile Number and Write Created on time for O2C', function () {
  cy.wait(2000)
  cy.readFile(BuisnessRegO2C).then((user) => {
    let BusinessMobile = user.registeredMobileO2C
    var BusinessUserMobile = " " + BusinessMobile
    manageUsersPage.getAssertMobile().eq(1).should('have.text', BusinessUserMobile)
  })
  cy.wait(2000)
  myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time) => {
    time = time.trim()
    cy.log(time)
    cy.readFile(BuisnessRegO2C).then((data) => {
      data.CreatedOnTime = time
      cy.writeFile(BuisnessRegO2C, data)
    })
  })
})


And('User click on Buissness Admin submitted user data for O2C', function () {
  cy.intercept('/mobiquitypay/v1/languages').as('all')
  cy.getApproval(BuisnessRegO2C)
  cy.checkAPI('/mobiquitypay/v1/languages')

  //  approvalPage.getUpload().click({ force: true })
  //  cy.wait(2000)
  //  approvalPage.getClickHere().selectFile('cypress/fixtures/Upload.png', { action: 'drag-drop' })
  //  cy.wait(5000)
  //  approvalPage.getUploadDocument().click()
  cy.wait(2000)
})