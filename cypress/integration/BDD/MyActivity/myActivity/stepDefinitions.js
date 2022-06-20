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


//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage ()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const myActivityPage = new myActivity()
const uuid = () => Cypress._.random(1e8)
mobile = "77" + uuid()
var mobile
var name
var filename = 'cypress/fixtures/userData/BAdata.json'





function getRandomName() {
  name = "";
 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
 for (var i=0; i<5; i++)
 name += possible.charAt(Math.floor(Math.random() * possible.length));
 return name;
}



//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {      
  cy.fixture('login').then(function(data1)
   {
       this.data1 = data1;
   })
   cy.fixture('UserManagement').then(function(data2)
   {
       this.data2 = data2;
   })
  })
//----------------Test Scripts---------------------------------------------------------------------------

//--------------------------User Management--------------------------------------------------------------

//----------------Launch Mobiquity Portal URL and Login--------------------------------------------------
Given('Login into Mobiquity Portal as System admin User', function(){
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin User after Logout', function(){
  cy.SysAdminlogin2Again()
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)

})
Given('Login into Mobiquity Portal as System admin User after logout', function(){
  cy.SysAdminloginAgain()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})  
Then('Logout', function(){
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

//-----------------Select User Type-----------------------------------------------------------
And('Select User type as Adminstrator and click on BusinessAdmin', function()
{
 pageLogin.getiFrame()
 cy.wait(2000)
 registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
 registerPage.getSelectUserTypeTab().contains(this.data2.userType).click({force:true})
 registerPage.getSelectUserTypeTab().contains(this.data2.userType).focused()
 registerPage.getUserRole().contains(this.data2.userRole).click({force:true})
 registerPage.getRegistrationMode().eq(0).click({force: true})

})
//----------------------Basic Data---------------------------------------------------------------
And('Enter all the required details', function(){

//-------------------Random Data-----------------------------------------------------------------
cy.wait(2000)
registerPage.getFirstName().type(getRandomName(), {force: true})
registerPage.getLastName().type(getRandomName(), {force: true})
cy.getrandomUserEmailID()
registerPage.getMobileNumber().type(mobile, {force:true})
recurse(
() => registerPage.getMobileNumber().type(mobile, {force:true}),
() => registerPage.getFirstName().type(getRandomName(), {force: true}),
() => cy.getrandomUserEmailID(),
(uniqueness) => (uniqueness) == registerPage.getuniqueness()
)
cy.writeFile(filename, {BAMobileNumber : mobile})
cy.iframe().find('select[data-test-id="preferredLanguage"]').select(this.data2.personalInfo.preferredLang,{force: true})
cy.wait(3000)
cy.getcountry()
registerPage.getNextButtonBasic().click({force: true})

//----------------------Profile Data-----------------------------------------------------------------

cy.getsecurityProfile1({force:true})
registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile,{force: true})
registerPage.getNextButtonProfile().click({force: true})
registerPage.getSubmitButton().click({force: true})

})

//-------------------------Confirmation Message displayed---------------------------------------------
Then('Confirmation message is displayed', function() {

registerPage.getConfirmationText().should('have.text', this.data2.personalInfo.successConfirmationMessage)
registerPage.getDoneButton().click()
})


//---------------------------Login with another Admin credentials------------------------------------
Given('Login into Mobiquity Portal as another System admin User', function(){
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)

})

When ('Navigate to Approvals and filter by Submitted status', function() {
welcomePage.getUserManagementOption().scrollIntoView()
welcomePage.getApprovalTab().click()

//------------------------------------Filter the data--------------------------------------------------
pageLogin.getiFrame()
approvalPage.getFilter().click({force: true})
cy.wait(2000)
approvalPage.getAddUserCheckBox().click({force: true})
approvalPage.getApplyFilter().click({force: true}) 

})

//------------------------------------Approve----------------------------------------------------------

And ('User click on submitted user data', function(){
    approvalPage.getCurrentDateRowData().eq(0).click({force:true})
    
})

And ('Approve the Users', function() {
   approvalPage.getApproveButton().click({force:true})
   approvalPage.getApproveRequest().click({force:true})
})

Then('User status is approved', function() {
    approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})

When ('Navigate to Manage User, and search Business Admin', function(){
    welcomePage.getUserManagementOption().scrollIntoView()
    welcomePage.getUserManagementOption().click()
    welcomePage.getManageUsersLink().click()

})

And ('Search Business Admin', function(){
  cy.wait(2000)
  cy.getBAMobileNumber()
  manageUsersPage.getSearchUserButton().click({force: true})
})

And('System Admin is able to view details', function(){
   (manageUsersPage.getViewIcon().click({force:true}))
   cy.wait(3000)
})

And('System Admin is able to edit details', function(){
manageUsersPage.getEditToolTip().eq(0).click({force:true})
registerPage.getFirstName().type(getRandomName(), {force: true})
registerPage.getLastName().type(getRandomName(), {force: true})
cy.getrandomUserEmailID()
registerPage.getMobileNumber().type(mobile, {force:true})
recurse(
() => registerPage.getMobileNumber().type(mobile, {force:true}),
() => registerPage.getFirstName().type(getRandomName(), {force: true}),
() => cy.getrandomUserEmailID(),
(uniqueness) => (uniqueness) == registerPage.getuniqueness()
)
cy.readFile(filename).then((data) => {
data.updatedBAMobileNumber = mobile
cy.writeFile(filename, data)
})
cy.iframe().find('select[data-test-id="preferredLanguage"]')
.select(this.data2.personalInfo.preferredLang,{force: true})
registerPage.getCountry().select(this.data2.personalInfo.country,{force: true})
registerPage.getNextButtonBasic().click({force: true})

registerPage.getSecurityProfile().select(this.data2.personalInfo.securityProfile,{force: true})
registerPage.getAuthProfile().select(this.data2.personalInfo.authProfile,{force: true})
registerPage.getNextButtonProfile().click({force: true})
})

Then('Confirm the edit details', function(){
  manageUsersPage.getConfirmButton().click({force:true})
  manageUsersPage.getDoneButton().click({force:true})

})
Then('User modified is approved', function() {
  approvalPage.getApproveConfirmationMessage()
})




//-------------------------------------------------TC_123------------------------------------------------
And ('Navigate to My Activity and Add the not Approved filters', function(){
    welcomePage.getMyActivity().click() 
    myActivityPage.getFilter().click({force: true})
    cy.wait(2000)
    myActivityPage.getAddUser().click({force: true})
    myActivityPage.getSavedStatus().click()
    myActivityPage.getApply().click()
  })
  And('Enter all the User details', function(){
  
    //-------------------Random Data-----------------------------------------------------------------
    const uuid = () => Cypress._.random(1e8)
    mobile = "77" + uuid()
   cy.wait(2000)
   registerPage.getFirstName().type(getRandomName(), {force: true})
   registerPage.getLastName().type(getRandomName(), {force: true})
   cy.getrandomUserEmailID()
   registerPage.getMobileNumber().type(mobile, {force:true})
   cy.iframe().find('select[data-test-id="preferredLanguage"]')
   .select(this.data2.personalInfo.preferredLang,{force: true})
   registerPage.getCountry().select(this.data2.personalInfo.country,{force: true})
   registerPage.getNextButtonBasic().click({force: true})
      
      //----------------------Profile Data-----------------------------------------------------------------
      
      registerPage.getSecurityProfile().select(this.data2.ccaInfo.securityProfile,{force: true})
      registerPage.getAuthProfile().select(this.data2.ccaInfo.authProfile,{force: true})
      registerPage.getSaveButton().click({force: true})
    })  
  
  
  
   //----------------------------------------------TC_124---------------------------------------------------
  
  
And('Select User type as Adminstrator and click on Customer care Admin', function()
{
 pageLogin.getiFrame()
 cy.wait(2000)
 registerPage.getregisterPageTitle().should('have.text', this.data2.registerPageTitle)
 registerPage.getSelectUserTypeTab().contains(this.data2.userType).click({force:true})
 registerPage.getSelectUserTypeTab().contains(this.data2.userType).focused()
 cy.wait(2000)
 registerPage.getUserRole().contains(this.data2.userRole1).click({force:true})
 registerPage.getRegistrationMode().eq(0).click({force: true})

})
  When ('Navigate to My Activity and Add the required filter', function(){
   welcomePage.getMyActivity().click() 
   myActivityPage.getFilter().click({force: true})
   cy.wait(2000)
   myActivityPage.getAddUser().click({force: true})
   myActivityPage.getSavedStatus().click()
   myActivityPage.getApply().click()
  })
  Then ('Click on Expand and View Details button', function(){
  myActivityPage.getExpandButton().click({force: true})
  myActivityPage.getViewDetails().click({force: true})
  })
  
  
  //------------------------------------------TC_125--------------------------------------------------------------
  
  Then ('Click on Expand and Resume button', function(){
  myActivityPage.getExpandButton().click({force: true})
  myActivityPage.getViewDetails().click({force: true})
  myActivityPage.getResumeUser().click({force: true})
  cy.wait(3000)
  })
  
And ('Enter all the required details of the user', function(){
    cy.wait(2000)
    registerPage.getFirstName().clear({force: true})
    registerPage.getLastName().clear({force: true})
    registerPage.getMobileNumber().clear({force: true})
    registerPage.getFirstName().type(getRandomName(), {force: true})
    registerPage.getLastName().type(getRandomName(), {force: true})
    registerPage.getMobileNumber().type(mobile, {force:true})
    recurse(
      () => registerPage.getMobileNumber().type(mobile, {force:true}),
      () => registerPage.getFirstName().type(getRandomName(), {force: true}),
      (uniqueness) => (uniqueness) == registerPage.getuniqueness()
      )
    cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang,{force: true})
    cy.getCountry()
    registerPage.getNextButtonBasic().click({force: true})
    
    //----------------------Profile Data-----------------------------------------------------------------
    
    registerPage.getSecurityProfile().select(this.data2.ccaInfo.securityProfile,{force: true})
    registerPage.getAuthProfile().select(this.data2.ccaInfo.authProfile,{force: true})
    registerPage.getNextButtonProfile().click({force: true})
     
  })
  
  //--------------------------------------------TC_126---------------------------------------------------
  
  And ('Click the >> Submit Button', function(){
  cy.wait(2000)
  registerPage.getSubmitButton().click({force: true})
  })
  
  
  //--------------------------------------------TC_127---------------------------------------------------
  
  Then ('Click on Expand and Withdraw button', function(){
    myActivityPage.getExpandButton().click({force: true})
    myActivityPage.getWithDraw().click({force: true})
    myActivityPage.getYesButton().click({force: true})
  })
  
  //--------------------------------------------TC_128------------------------------------------------------
 
  
  When ('Navigate to My Activity and Add the Reject filter', function(){
    welcomePage.getMyActivity().click() 
    myActivityPage.getFilter().click({force: true})
    cy.wait(2000)
    myActivityPage.getModificationOfUser().click({force: true})
    myActivityPage.getRejectStatus().click({force: true})
    myActivityPage.getApply().click({force: true})
   })
   And('Enter all the details', function(){
    cy.wait(2000)
    registerPage.getFirstName().type(getRandomName(), {force: true})
    registerPage.getLastName().type(getRandomName(), {force: true})
    cy.getrandomUserEmailID()
    registerPage.getMobileNumber().type(mobile, {force:true})
    recurse(
      () => registerPage.getMobileNumber().type(mobile, {force:true}),
      () => registerPage.getFirstName().type(getRandomName(), {force: true}),
      () => cy.getrandomUserEmailID(),
      (uniqueness) => (uniqueness) == registerPage.getuniqueness()
      )
      
    cy.iframe().find('select[data-test-id="preferredLanguage"]')
    .select(this.data2.personalInfo.preferredLang,{force: true})
    registerPage.getcountry()
    registerPage.getNextButtonBasic().click({force: true})
    
    //----------------------Profile Data-----------------------------------------------------------------
    
    registerPage.getSecurityProfile().select(this.data2.ccaInfo.securityProfile,{force: true})
    registerPage.getAuthProfile().select(this.data2.ccaInfo.authProfile,{force: true})
    registerPage.getNextButtonProfile().click({force: true})
    registerPage.getSubmitButton().click({force: true})
   })     
    
    Then ('Reject the Users', function(){
      approvalPage.getRejectButton().click({force:true})
      approvalPage.getRejectComment().type(getRandomName(),{force: true})
      approvalPage.getRejectRequest().click({force: true})
    
    })
    
  