/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And,Before} from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/commands";
import "../../../../../support/subscriberCommands";
import register from '../../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../../support/pageObjects/UserManagement/manageUsers';
import myActivity from '../../../../../support/pageObjects/MyActivity/myActivity';
import { recurse } from 'cypress-recurse';

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
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
var RegulatoryMarketingProfile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'



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



//----------------Navigate to User Management tab and Click on Register---------------------------------

//-----------------Select User Type-----------------------------------------------------------
//----------------------Basic Data---------------------------------------------------------------



//------------------------------------Approve----------------------------------------------------------





//---------------------------------------Narendra-------------------------------------------------
//-------------------------------TC_182------------------------------------------------------------

//----------------------Basic Data---------------------------------------------------------------
And('Fill all required details and Enter Email and Contact Number which are not verified and confirm Error message', function () {
  cy.wait(2000)
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.getrandomUserEmailID()
  recurse(
    () => registerPage.getMobileNumber().type(mobile, { force: true }),
    () => registerPage.getFirstName().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getAdressLine1().type(getRandomName(), { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo1.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo1.city, { force: true })

})

//---------------------------------------------TC_183--------------------------------------------------------
And('Fill all required details and Enter Invalid value and confirm Error message', function () {

  //-------------------Random Data-----------------------------------------------------------------
  cy.wait(2000)
  registerPage.getFirstName().type(this.data2.subPersonalInfo1.firstName, { force: true })
  cy.getrandomUserEmailID()
  recurse(
    () => registerPage.getMobileNumber().type(mobile, { force: true }),
    () => registerPage.getLastName().type(getRandomName(), { force: true }),
    (uniqueness) => (uniqueness) == registerPage.getuniqueness()
  )
  cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getAdressLine1().type(getRandomName(), { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo1.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo1.city, { force: true })

})


//---------------------------------TC_184--------------------------------------------------

And('Enter all the mandatory KYC details and click on next', function () {
  registerPage.getNextButtonBasic().click({ force: true })
  registerPage.getKYCButton().click({ force: true })
  registerPage.getKYCIDType().select(this.data2.subPersonalInfo1.KYCIDType, { force: true })
  registerPage.getKYCIDValue().type(this.data2.subPersonalInfo1.KYCValue, { force: true })
  registerPage.getKYCGracePeriod().select(this.data2.subPersonalInfo1.KYCGracePeriod, { force: true })
  registerPage.getMakeThisPrimaryButton().click({ force: true })
  registerPage.getNextButtonBasic1().click({ force: true })
})
Then('Enter all the marketing ,regulatory, authorization profile details and click on next', function () {
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
  registerPage.getNextButtonBasic2().click({ force: true })
})

//-------------------------------------TC_187-------------------------------------------------

And('Fill all required details and enter registered EmailID and confirm Error message', function () {

  cy.wait(2000)
  registerPage.getFirstName().type(this.data2.personalInfo.firstName, { force: true })
  registerPage.getLastName().type(this.data2.personalInfo.lastName, { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(this.data2.personalInfo.firstName, this.data2.personalInfo.lastName, { force: true })
  registerPage.getEmailID().type(this.data2.personalInfo.emailID, { force: true })
  registerPage.getMobileNumber().type(mobile, { force: true })
  registerPage.getAdressLine1().type(this.data2.subPersonalInfo1.addressLine1, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })
  registerPage.getState().select(this.data2.subPersonalInfo1.state, { force: true })
  registerPage.getCity().select(this.data2.subPersonalInfo1.city, { force: true })
})


//--------------------------------------------- Chethan--------------------------------------------

//--------------------------------------------- Chethan--------------------------------------------

//----TC_68--------------------------User Management(Subscriber)---------------------------------------

//----------------------Basic Data---------------------------------------------------------------
Then('SubscrigReg Confirmation message is displayed', function () {

  registerPage.getNextButtonBasic2().click({ force: true })
  registerPage.getSubmitButton().click({ force: true })
  registerPage.getConfirmationText()
})




//-----TC_69-------------------------Approve(Subscriber)--------------------------------------------------


//--------------------------------------------------------------------------------------------------------

And('Assert Suspension creation Subscriber Mobile Number and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(subRegistration).then((user) => {
  let SubMobile = user.subscriberMobileSuspend
  var SUBMobile = " "+SubMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',SUBMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(0).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(subRegistration).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(subRegistration,data)
  })
})
})
And('Assert Suspension of Subscriber Mobile Number and Write Created on time', function(){
  cy.wait(2000)
  cy.readFile(subRegistration).then((user) => {
  let SubMobile = user.subscriberMobileSuspend
  var SUBMobile = " "+SubMobile
  manageUsersPage.getAssertMobile().eq(1).should('have.text',SUBMobile)
})
cy.wait(2000)
myActivityPage.getCreatedOnTime().eq(1).invoke('text').then((time)=>{
  time= time.trim()
  cy.log(time)
  cy.readFile(subRegistration).then((data) => {
  data.CreatedOnTime = time
  cy.writeFile(subRegistration,data)
  })
})
})

//-----------------------------------------------------------------------------------------------

And('User click on submitted user data for Subscriber', function () {
  cy.getApproval(subRegistration)
})

//----------------------------Prerequisite Subscriber Creation for Suspension and Resumption-------------------------------


//----TC_70--------------------------------Modify Subscriber-------------------------------------------------

And('enter user mobile number and search the user', function () {

  cy.getSubscriberMobNum()
  manageUsersPage.getSearchUserButton().click({ force: true })

})
And('User Click on View Details', function () {
  (manageUsersPage.getEyeIcon().click({ force: true }))
  cy.wait(3000)
})

Then('Confirm the edit details', function () {
  manageUsersPage.getConfirmButton().click({ force: true })
  approvalPage.getSuccessMessage().should('have.text', this.data2.confirmationMessage.successMessage)
  manageUsersPage.getDoneButton().click({ force: true })
})





//--TC_71------------------------------------Approve Modified Subscriber-----------------------------------------
Then('Edited User status is approved', function () {

  approvalPage.getApproveConfirmationMessage().should('have.text', this.data2.confirmationMessage.editUser)
})


//------TC_72------------------------Notification to the User--------------------------------------------

And('System Admin is able to edit KYC details', function () {
  const timestamp = (new Date).getTime()
  KycValue = "A" + timestamp
  manageUsersPage.getEditToolTip().eq(0).click({ force: true })
  registerPage.getNextButtonBasic().eq(0).click({ force: true })
  registerPage.getKycDropDownButton().eq(0).click({ force: true })
  cy.wait(5000)
  registerPage.getMakeThisPrimaryButton().eq(0).click({ force: true })
  registerPage.getAddMoreButton().click({ force: true })
  registerPage.getKycDropDownButton().eq(1).click({ force: true })
  cy.wait(5000)
  registerPage.getKycIDType().select(this.data2.ModifyKycInfo.KycIDType, { force: true })

  // recurse(
  //     () => registerPage.getKycIDValue().type(KycValue, { force: true }),
  //     registerPage.getMakeThisPrimaryButton().click({ force: true }),
  //     (uniqueness) => (uniqueness) == registerPage.getValueIsNotUnique().should('be.visible'),
  //     registerPage.getKycGracePeriod().click()
  // )

  registerPage.getKycIDValue().clear({ force: true }).type(KycValue, { force: true })
  registerPage.getMakeThisPrimaryButton().eq(0).click({ force: true })
  registerPage.getNextButtonKYC().eq(1).click({ force: true })
  registerPage.getNextButtonBasic2().click({ force: true })
  cy.wait(2000)

})
Then('verify message sent to user', () => {
  cy.getMessage()

})

//------TC_73-------------------------Admin Suspends Subscriber-------------------------------------------

And('enter user mobile number and search the SuspendResume user', function () {

  manageUsersPage.getUserSearchDetails().click({ force: true })
  cy.getSubscriberMobileNumberSuspension()
  manageUsersPage.getSearchUserButton().click({ force: true })

})

And('Suspend the user by giving the comment', function () {
  manageUsersPage.getSuspendUser().click({ force: true })
  manageUsersPage.getCommentBox().type(this.data2.modifyPersonalInfo8.comments, { force: true })
  manageUsersPage.getSubmitSuspendResumeButton().click({ force: true })
})

Then('Verify the user suspend Confirmation message', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.suspendResumeConfirmationMessage.suspendResumeUser)
})


When('Navigate to Approvals', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getApprovalTab().click()
   cy.wait(2000)
 welcomePage.getApprovalButtonTab().click()
 
 //-------------------------Added waituntil----------------------------------------------------------
 cy.waitUntil(()=>{
    return cy.iframe().find('h4.text-secondary').contains('Approvals')
  })
  
 cy.wait(2000)
})

And('Admin click on Suspended user data', function () {
  cy.getApproval(subRegistration)

})
And('Approve to suspended the Users', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})

Then('Verify the user Suspended approval message', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.suspendResumeConfirmationMessage.userSuspended)
})


//--------TC_74-----------------------Admin Resumes Subscriber-------------------------------------------


And('Resume the user by giving the comment', function () {
  manageUsersPage.getEyeIcon().click({ force: true })
  manageUsersPage.getSuspendUser().click({ force: true })
  manageUsersPage.getCommentBox().type(this.data2.modifyPersonalInfo8.comments, { force: true })
  manageUsersPage.getSubmitSuspendResumeButton().click({ force: true })
})
And('Admin click on Resumeded user data', function () {
  cy.getApproval(subRegistration)
})
//----------------Approve----------------
And('Approve the Resumed User', function () {
  approvalPage.getApproveButton().click({ force: true })
  approvalPage.getApproveRequest().click({ force: true })
})
Then('Verify the user Resumed approval message', function () {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.suspendResumeConfirmationMessage.userResumed)
})

//------------------------------------------THE END-----------------------------------------------------------------
//---------------------------------------------------Kalyani----------------------------------------------
And('Enter Mobile number or KYC number of subscriber user in search', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getSearchUser().type(this.data2.mob2, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})




And('Select user type & enter Mobile number or KYC number for subscriber', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getdropdown().select(this.data2.business.userType, { force: true })
  manageUsersPage.getSearchUser().type(this.data2.mob7, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
And('Enter Mobile number and KYC number in search for suspension', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getSearchUser().type(this.data2.mob6, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})
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
And('Enter Mobile number or KYC number of subscriber user', function () {
  pageLogin.getiFrame()
  manageUsersPage.getSearchUser().click({ force: true })
  manageUsersPage.getSearchUser().type(this.data2.mob7, { force: true })
  manageUsersPage.getSearchUserButton().click({ force: true })

})


And('Assert the user login', function () {

  cy.frameLoaded(pageLogin.getiFrame()).should("not.contain", Submobile)
  cy.wait(10000)
  //cy.url().should("not.contain", "/business");
})




And('Assert the user login', function () {

  cy.frameLoaded(pageLogin.getiFrame()).should("not.contain", Submobile)
  cy.wait(10000)
  cy.url().should("not.contain", "/dfscontainer/#/business/");
})


//----------------------------------------------------Arpitha----------------------------------------------


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

Then('Login id Error message is displayed', function () {
  registerPage.getLoginError().find('small.text-danger').should('have.text', ' Value is not unique ');
})

//-------------------------------------------TC_170---------------------------------------------------------------------


Then('Email Error message is displayed', function () {
  registerPage.getLoginError().find('small.text-danger').should('have.text', ' Value is not unique ');


})

//-------------------------------------------TC_183---------------------------------------------------------------------


And('Enter Invalid Login id value details', function () {
  cy.iframe().find('select[data-test-id="title"]')
    .select(this.data2.personalInfo.Title, { force: true })
  registerPage.getFirstName().type(getRandomName(), { force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })
  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  registerPage.getLoginID().type(this.data2.InvalidLoginId, { force: true })
  registerPage.getCountry().select(this.data2.personalInfo.country, { force: true })


})
Then('invalid value message is displayed', function () {
  registerPage.getLoginError().find('small.text-danger').should('have.text', ' Only alphabets and digits are allowed and max length is 20 ');

})

//-------------------------------------------TC_182---------------------------------------------------------------------

And('Enter the basic details and do not verify contact number', function () {

  const lgid = () => Cypress._.random(1e5)
  loginId = this.data2.personalInfo.firstName + lgid()
  cy.wait(2000)
  registerPage.getFirstName().type(getRandomName(), { force: true })
  registerPage.getLastName().type(getRandomName(), { force: true })

  cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang, { force: true })
  cy.getrandomUserEmailID()
  registerPage.getAdressLine1().click({ force: true })
})


Then('Verify that error button of contact number should be visible', function () {
  registerPage.getErrorIcon().should('be.visible')
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


//---------------------USER MANAGEMENNT MANAGE USER--------------------------------------------


And('Enter Mobile number and KYC number in search menu1', function () {
  cy.fixture(SubMob).then((user) => {
    var SubMob1 = user.subscriberMobile
    cy.log(SubMob1)
    manageUsersPage.getSearchUser().type(SubMob1)
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
And('select either UNLock outgoing payments or UNLock incoming payments or Lock both', function () {

  manageUsersPage.getlockunclockWallets().click({ force: true })
  manageUsersPage.getUnlockoutgoingPayements().click({ force: true })

})
Then('Click On UNLock', function () {
  manageUsersPage.getunlockbtn().click({ force: true })
  manageUsersPage.getconfirmationlock().type(getRandomName(), { force: true })
  manageUsersPage.getconfirmationbtn().click({ force: true })
  manageUsersPage.getlockedmessage().should('have.text', this.data2.UnlockOutgoing)
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

//-------------------------------SUDHEER----------------------------------------------------------------

//----------TC_129-------To verify that Admin user can view all the transaction details under Order details menu------------



And('Enter Mobile numberin search Menu', function () {
  cy.wait(3000)
  cy.getSubscriberMobNum()
})




// //---------TC_131------To verify that latest order transactions will be displayed on the first page of Order details screen.------------



//---------TC_132-----To verify that all the wallet transactions are displayed in statement screen sucessfully.------------

And('Click on Wallet Payment History', function () {
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on expand button', function () {
  manageUsersPage.getWalletExpandButton().click({ force: true })
})

Then('Click on wallet view Details', function () {
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  manageUsersPage.getDateRangeAssert().should('contain.text', 'More Details')
})



//-------TC_133------To verify that user can able to view all the wallet transactions by entering valid transaction id.------------


And('Click on Wallet Payment History for valid transaction with id', function () {
  cy.wait(3000)
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on expand button on valid transaction with id', function () {

  manageUsersPage.getSearchTransactionId().type(this.data2.transactionid.validid, { force: true })
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})







//-----TC_134-----To verify that user can able to fetch the Statement based on the transaction type (success, fail etc.)------------


And('Click on Wallet Payment History for transaction type', function () {
  cy.wait(3000)
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on filter and Select status type and Select apply', function () {
  //cy.wait(3000)
  manageUsersPage.getFilterStatementButton().click({ force: true })
  manageUsersPage.getStatus().click()
  cy.wait(3000)
  manageUsersPage.getApplyFilterButton().click({ force: true })
})
And('Click on expand button for transaction type', function () {
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})



//-----TC_135-------To verify that user can able to fetch the Statement based on the Date range.------------

And('Click on Wallet Payment History based on the Date', function () {
  // cy.wait(3000)
  manageUsersPage.getWalletPaymentHistoryButton().click({ force: true })

})

And('Click on filter', function () {
  cy.wait(3000)
  manageUsersPage.getFilterStatementButton().click({ force: true })
})
And('Select start date and end date and  Click apply', function () {
  cy.wait(3000)

  manageUsersPage.getDatePickerStart().click({ force: true })
  manageUsersPage.getStartDate().contains(this.data2.usercalender.startday).click({ force: true })

  manageUsersPage.getDatePickerEnd().click({ force: true })
  manageUsersPage.getEndDate().contains(this.data2.usercalender.endday).click({ force: true })

  manageUsersPage.getApplyFilterButton().click({ force: true })

})

And('Click on expand button based on the Date', function () {
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})
And('Click on filter', function () {
  cy.wait(3000)
  manageUsersPage.getFilterStatementButton().click({ force: true })
})
And('Select start date and end date and  Click apply', function () {
  cy.wait(3000)

  manageUsersPage.getDatePickerStart().click({ force: true })
  manageUsersPage.getStartDate().contains(this.data4.usercalender.startday).click({ force: true })

  manageUsersPage.getDatePickerEnd().click({ force: true })
  manageUsersPage.getEndDate().contains(this.data4.usercalender.endday).click({ force: true })

  manageUsersPage.getApplyFilterButton().click({ force: true })

})
And('Click on expand button based on the Date', function () {
  cy.wait(3000)
  manageUsersPage.getWalletExpandButton().click({ force: true })
})







//------------------------------------------THE END-----------------------------------------------------------------

