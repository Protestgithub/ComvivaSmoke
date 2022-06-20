/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import { recurse } from 'cypress-recurse';

import "../../../../support/commands";
import "../../../../support/securityCommands";
import "../../../../support/TransferControlProfileCommand";
import BankManagement from '../../../../support/pageObjects/BankManagement';
import 'cypress-file-upload'
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
import walletManagement from '../../../../support/pageObjects/WalletManagement/walletManagement';
import AddGrades from '../../../../support/pageObjects/GradeManagement/AddGrades';
import ModifyGrades from '../../../../support/pageObjects/GradeManagement/ModifyGrades';
import DeleteGrades from '../../../../support/pageObjects/GradeManagement/DeleteGrades';
import AddCategory from '../../../../support/pageObjects/CategoryManagement/AddCategory';
import SecurityProfilePage from '../../../../support/pageObjects/SecurityProfile/SecurityProfilePage';
import "../../../../support/authourizationcommands"
import authorizationManagement from '../../../../support/pageObjects/AuthorizationProfileManagement/authorizationManagement';
import RegulatoryProfile from '../../../../support/pageObjects/UserManagement/RegulatoryProfile';
import MarketingProfile from '../../../../support/pageObjects/UserManagement/MarketingProfile';




//----------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const ErrorM=new ErrorMessage()
const AddCategoryPage = new AddCategory()
const BankManagementPage = new BankManagement()
const WalletManagementPage = new walletManagement()
const domainPage = new DomainFieldspage()
const AddGradePage = new AddGrades()
const tcpPage = new TransferControlProfile()
const securityProfilePage = new SecurityProfilePage()
const authorizationProfilePage = new authorizationManagement()
const uid1 = () => Cypress._.random(1e2)
const Id = uid1()
const profilename = `testname${id}`
var RegulatoryFile = 'cypress/fixtures/userData/Regulatory&MarketingProfile.json'
var SubProfileName = 'cypress/fixtures/profileData/Profile.json'
const MarketingProfile1 = new MarketingProfile()
const RegulatoryProfile1 = new RegulatoryProfile()
var mobile
var number
const uid = () => Cypress._.random(0, 1e6)
const id = uid()
const filenameTCP = 'userData/TCPdata.json'
const CustTCPdata = 'userData/CustTCPdata.json'
const fileRegulatoryProfile = 'userData/Regulatory&MarketingProfile.json'
var Tcpname
var Tcpname1
var RName



var filename1 = 'cypress/fixtures/WalletManagementdata.json'
const uuid = () => Cypress._.random(1e10)
const uud = () => Cypress._.random(1e3)
PoolAccountNo =  uuid()
BankID = uuid()
Priority = uud()
var name
var PoolAccountNo
var BankID
var Priority
var filename = 'cypress/fixtures/BankManagement.json'
let Sysfilelogin = 'cypress/fixtures/userData/SystemAdminLogin.json'
var mobile
var name
var LoginId1
const uuid12 = () => Cypress._.random(1e8)
LoginId1= uuid12()
const Password='000000'
const Password1 = 'Com@135'
var loginId
let GradeCode
function getbankName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i=0; i<5; i++)
  name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
  }
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
  cy.fixture('BankManagement').then(function(data03)
  {
     this.data03 = data03;
  })
  cy.fixture('Domain&CategoryManagement').then(function(data4)
  {
      this.data4 = data4;
  })
  cy.fixture('TransferControlProfile').then(function (data5) {
    this.data5 = data5;
  })

  cy.fixture('GradeManagement').then(function(data01)
  {
      this.data01 = data01;
  })
  cy.fixture('SecurityProfile').then(function (data6) {
    this.data6 = data6;
  })
  cy.fixture('authorizationProfile').then(function (data7) {
    this.data7 = data7;
  })

}); 

//---------------------------------------------Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin User', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.SysAdminlogin()
    cy.wait(2000)
    cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
  })
  Given('Login into Mobiquity Portal as System admin User2', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.SysAdminlogin2()
    cy.wait(2000)
    cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
  })
  Given('Login into Mobiquity Portal as another System admin User after logout', function () {
    cy.loginAgain(this.data1.sysAdmin2.sysAdminUser1, this.data1.sysAdmin2.sysAdminPwd1)
    cy.checkWelcomeText(this.data1.networkAdminWelcomeText)
  
  })
 /* Given('Login into Mobiquity Portal as another System admin User after logout', function () {
    cy.SysAdminlogin2Again()
    cy.checkWelcomeText(this.data1.networkAdminWelcomeText)
  })*/
  Given('Login into Mobiquity Portal as System admin Maker', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.SysAdminlogin()
    cy.wait(2000)
    cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
  Given('Login into Mobiquity Portal as masteradmin Maker', function(){
    cy.wait(3000)
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.masterAdmin2.masterchckr1, this.data1.masterAdmin2.mstAdminPwd1)
    cy.wait(2000)
   // cy.checkWelcomeText(this.data2.SuperAdminChecker)
  })  
//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
})
//superadminc
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
})
Given('Login into Mobiquity Portal as Super admin Maker after Logout', function () {
  cy.loginAgain(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data2.superadminm.superadminmaker)
})
Given('Login into Mobiquity Portal as System admin User after Logout', function () {
  cy.loginAgain(this.data1.sysAdmin1.sysAdminUser1, this.data1.sysAdmin1.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as Super admin Checker after Logout', function () {
  cy.loginAgain(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  //cy.checkWelcomeText(this.data2.superadminc.superadminchecker)
})

Given ('Login with Master Admin Checker', function(){
    cy.launchURL(Cypress.env('Adminurl'))
    cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
    cy.wait(2000)
  })

//---------------------------------SystemAdmin Creation-------------------------------------------------
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
registerPage.getLastName().type(getRandomName(), {force: true})
cy.getrandomUserEmailID()
registerPage.getLoginID().clear()
registerPage.getLoginID().type(loginId)
recurse(
  () => registerPage.getMobileNumber().clear().type(mobile, { force: true }),
  () => registerPage.getFirstName().clear().type(getRandomName(), { force: true }),
  (uniqueness) => (uniqueness) == registerPage.getuniqueness()
)
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
Then('User status is approved', function() {
  approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.addUser)
})

//-------------------------------------Bank Creation-------------------------------------------------
When ('Navigate to Bank Master and Click on it', function(){
    BankManagementPage.getBankMaster().click({force: true})
    cy.wait(3000)
  })
    
  And ('Enter All the Required Details', function(){
  BankManagementPage.getProvider().select(this.data03.bankMaster.Provider, {force:true})
  BankManagementPage.getBankName().type(getbankName(), {force:true})
  cy.readFile(filename).then((data) => {
    data.BankName = name
    cy.writeFile(filename, data)
  })
  BankManagementPage.getPoolAccountNo().type(PoolAccountNo)
  BankManagementPage.getBankId().type(BankID)
  BankManagementPage.getBankType().select(this.data03.bankMaster.BankType, {force:true})
  BankManagementPage.getPoolAccountType().select(this.data03.bankMaster.PoolAccountType, {force:true})
  BankManagementPage.getCBSType().select(this.data03.bankMaster.CBSType, {force:true})
  BankManagementPage.getPriority().type(Priority)
  BankManagementPage.getChooseFile().attachFile('AddBranches.csv')
  BankManagementPage.getSubmitButton().click({force: true})
  cy.wait(5000)
  BankManagementPage.getAssert().should('have.text',this.data03.bankMaster.assert)
  })

//--------------------------------------Wallet Creation----------------------------------------------


//------------------------------------Add Wallet------------------------------------------------------

When('Navigate Multiple Wallet Management and Click on Add Wallet', function () {
    WalletManagementPage.getMultipleWalletManagement().click()
    WalletManagementPage.getAddWallet().click()
    cy.wait(2000)
  })
  var name
  
  And('Enter Wallet name and click on save', function () {
    WalletManagementPage.getWalletName().type(getRandomName(), { force: true })

       cy.writeFile(filename1,{WalletName: name})
     
    WalletManagementPage.getSaveButton().click({ force: true })
    cy.wait(3000)
  })
  
  And('Enter Wallet name and click on Save', function () {
    WalletManagementPage.getWalletName().type(this.data2.Wallet.Name, { force: true })
    WalletManagementPage.getSaveButton().click({ force: true })
    cy.wait(3000)
    WalletManagementPage.getErrorMessage().should('have.text', this.data2.Wallet.ErrorMessage)
    cy.wait(2000)
  })

//----------------------------------------Domain Creation---------------------------------------------

  When('User Click on Domain Management >> Add Domain', function () {
    welcomePage.getDomainManagementOption().click()
})
And('Enter Domain Name and Domain Code.', function () {
    cy.wait(3000)
    domainPage.getDomainName().type(this.data4.domainData.domainName, { force: true })
    domainPage.getDomainCode().type(this.data4.domainData.domainCode, { force: true })
    domainPage.getDomainCategories().type(this.data4.domainData.domainCategories, { force: true })

})
Then('Click on submit button.', function () {
    domainPage.getDomainSubmitbtn().click({ force: true })
    cy.wait(2000)
    domainPage.getSUbMIT2().click({ force: true })
})


 //----------------------------------------- Category Creation ------------------------------------------
 
 
And('Click Category Management.',function(){
    welcomePage.getCategoryManagementOption().click({force:true})
    })
    Then('Select Add Category.',function(){
        welcomePage.getAddCategory().click({force:true})
    })
    And('Enter Category Code and Category Name.',function(){
        cy.wait(2000)
        AddCategoryPage.getCategoryName().type(this.data4.CategoryData.categoryname,{force:true})
        AddCategoryPage.getCategoryCode().type(this.data4.CategoryData.categoryCode,{force:true})
    })
    Then('Select Domain and Parent Category.',function(){
        AddCategoryPage.getDomainName().select(this.data4.CategoryData.Domain,{force:true})
        AddCategoryPage.getParentCategory().select(this.data4.CategoryData.ParentCategory,{force:true})
    })
    And('Click on Submit & confirm button.',function(){
        AddCategoryPage.getCategorySubmit().click({force:true})
        cy.wait(2000)
        AddCategoryPage.getConfirmbttn().click({force:true})
    })
    
    And('logout the user',function(){
    
        welcomePage.getProfileIcon().click()
        cy.wait(2000)
        welcomePage.getLogOutbttn().click()
        cy.wait(2000)
          welcomePage.getLogOutYesbttn().click()
      })
    And('Click Add category approval.',function(){
    welcomePage.getCAtegoryApprovalOption().click({force:true})
    cy.wait(2000)
    })
    Then('Select Category approval.',function(){
        AddCategoryPage.getDomainName().select(this.data4.CategoryData.Domain,{force:true})
        AddCategoryPage.getParentCategory().select(this.data4.CategoryData.ParentCategory,{force:true})
        AddCategoryPage.getCategoryCode().select(this.data4.CategoryData.categoryCode,{force:true})
    })

    Then('Select the category that needs to be approved',function(){
        AddCategoryPage.getApprovalCategory().click({force:true})  
        cy.wait(4000)
        AddCategoryPage.getAllCheckBox()
        cy.wait(4000)
        AddCategoryPage.getAllCheckBox()
        cy.wait(4000)
        AddCategoryPage.getAllCheckBox()
        cy.wait(4000)
      
       AddCategoryPage.getFinalSubmit()
      
        cy.wait(5000)
      
      })
//-----------------------------------------Grade Creation------------------------------------------

    When('Click on User Profile Management >> Add Grade',function(){
        welcomePage.getUserprofileManagementOption().click({force:true})
        welcomePage.getADDGrades().click({force:true})
     
       })
      And('Select the domain & category for which grade needs to be added.',function(){
         const uuid = () => Cypress._.random(1e4)
         GradeCode = uuid()
         cy.wait(2000)
           AddGradePage.getAddbttn().click({force:true})
           cy.wait(2000)
           AddGradePage.getDomainName().select(this.data01.AddGrades.domainName,{force:true})
           AddGradePage.getCatergoryName().select(this.data01.AddGrades.categoryname,{force:true})
     
     
           AddGradePage.getgradeCode().type(GradeCode,{force:true})
           cy.RandomName()
           AddGradePage.getSavebttn().click({force:true})
     
           cy.wait(2000)
           AddGradePage.getConfirmbttn().click({force:true})
     
     })    

//--------------------------------------TCP creation---------------------------------------------------


When('Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP', function () {
    welcomePage.getTransferControlProfile().click()
    cy.wait(3000)
    welcomePage.getManageInstrumentLevelTCP().click()
    cy.wait(3000)
  })
  When('Navigate to Transfer Control Profile', function () {
    welcomePage.getTransferControlProfileSA().click()
    cy.wait(3000)
  })
  And('Click on Add New Button', function () {
    pageLogin.getiFrame()
    cy.wait(3000)
    tcpPage.getNew().click({ force: true })
  
  })
  Then('Enter required Fields for error message', function () {

    tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
    tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
    tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
    tcpPage.getgrade().select(this.data5.TransferControlProfile.Grade, { force: true })
    tcpPage.getpaymentinstrument().select(this.data5.TransferControlProfile.PaymentInstrument, { force: true })
    tcpPage.getwallettype().select(this.data5.TransferControlProfile.Wallet, { force: true })
    cy.fixture(filenameTCP).then((user) => {
      Tcpname = user.TcpProfileName
      cy.log(Tcpname)
      tcpPage.getprofilename().type(Tcpname)
    })
    tcpPage.getdescription().type(this.data5.TransferControlProfile.Description)
  
  })
  Then('Enter required Fields', function () {

    tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
    tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
    tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
    tcpPage.getgrade().select(this.data5.TransferControlProfile.Grade, { force: true })
    tcpPage.getpaymentinstrument().select(this.data5.TransferControlProfile.PaymentInstrument, { force: true })
    tcpPage.getwallettype().select(this.data5.TransferControlProfile.Wallet, { force: true })
    cy.TCPRandomName()
    //tcpPage.getProfileName().type(getRandomName(), { force: true })
    tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })
    /* recurse( 
       ()=> getRandomName(), 
       ()=>tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true }), 
       ()=>cy.wait(200),  
       (uniqueness) => (uniqueness) == tcpPage.getErrorMessage().contains 
       ('Please select another profile name as this profile name is being used by an active profile').should('be.visible'), 
       tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })    
     )*/
  })
  And('Click on New Button', function () {
  
    tcpPage.getNew().click({ force: true })
    tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
    tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
    tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
    cy.fixture(fileRegulatoryProfile).then((user) => {
      RName = user.RegulatoryProfileName
      cy.log(RName)
      tcpPage.getregulatorytype().select(RName, { force: true })
    })
    cy.TCPMasRandomName()
    //tcpPage.getProfileName(getRandomName(),{force:true})
    tcpPage.getdescription().type(this.data5.TransferControlProfile.Description)
    /* recurse( 
       ()=> getRandomName(), 
       ()=>tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true }), 
       ()=>cy.wait(200),   
       (uniqueness) => (uniqueness) == tcpPage.getErrorMessage().contains 
       ('Please select another profile name as this profile name is being used by an active profile').should('be.visible'), 
       tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })    
      )*/
    tcpPage.getadd().click({ force: true })
    cy.wait(3000)
    const uuid = () => Cypress._.random(1e3)
    number = uuid()
    tcpPage.getAmount().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
    tcpPage.getcountmaster().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
    tcpPage.getusermaxbalanceMaster().type(this.data5.TransferControlProfile.UserMaxBal)
    tcpPage.getNextEdit().click({ force: true })
    tcpPage.getConfirmEdit().click({ force: true })
  
  })
  
  And('Verify Success Message for creation of TCP through Master admin', function () {
    cy.fixture(CustTCPdata).then((user) => {
      Tcpname1 = user.CustTCPProfileName
      cy.wait(2000)
      cy.log(Tcpname1)
      tcpPage.getReqtoAddMaster().should("have.text", this.data5.confimationMessage.addIntiationPart1Master + Tcpname1 + this.data5.confimationMessage.addIntiationPart2Master)
    })
  })
  And('Verify Add Intiation Message for Master', function () {
    cy.fixture(CustTCPdata).then((user) => {
      Tcpname1 = user.CustTCPProfileName
      cy.log(Tcpname1)
      tcpPage.getReqtoAddIntiationMaster().should("contain", this.data5.confimationMessage.sucessMasterTcpIntiation + Tcpname1 + this.data5.confimationMessage.successpart2Master)
      cy.wait(3000)
    })
    And('Verify Add Intiation Message', function () {
        cy.TcpName()
        tcpPage.getReqtoAdd().should("contain", this.data5.confimationMessage.addIntiationPart1 + Tcpname + this.data5.confimationMessage.addIntiationPart2)
        cy.wait(3000)
      })
})     
Then('Approve the TCP', function () {
    cy.fixture(CustTCPdata).then((user) => {
      Tcpname1 = user.CustTCPProfileName
      cy.log(Tcpname1)
    })
    tcpPage.getinstrumentlevelTCP().each(($row => {
      cy.wrap($row).within(function () {
        cy.get('td').each(($el => {
          if ($el.text() == Tcpname1) {
            cy.get('a').click({ force: true })
  
          }
        }))
      })
    }))
    tcpPage.getApproveTCP1().click({ force: true })
  }) 

  And('Click on Create Button', function () {
    tcpPage.getCreate().click({ force: true })
  })
  Then('Enter all required amount and count', function () {
    pageLogin.getiFrame()
    cy.wait(3000)
    const uuid = () => Cypress._.random(1e3)
    number = uuid()
    tcpPage.getcount().each((e1, index, list) => {
      cy.wrap(e1).type(number)
    })
    tcpPage.getLoadServiceReq().type(number)
    tcpPage.getLoadServiceReq2().type(number)
    tcpPage.getUserminbalance().type(this.data5.TransferControlProfile.UserMinBal)
    tcpPage.getUsermaximumbalance().type(this.data5.TransferControlProfile.UserMaxBal)
    tcpPage.getUserMinTransactionAmount().type(this.data5.TransferControlProfile.MinTranAmount)
    tcpPage.getUserMaxTransactionAmount().type(this.data5.TransferControlProfile.MaxTranAmount)
    tcpPage.getMaxPercentageTransferAllowed().type(this.data5.TransferControlProfile.MaxPerAllowed)
    tcpPage.getNext().click({ force: true })
    cy.wait(3000)
    tcpPage.getNext().click({ force: true })
    cy.wait(3000)
    welcomePage.getTransferControlProfile()
      .scrollIntoView()
  })
  
  And('Click on Instrument Level TCP', function () {
    welcomePage.getTransferControlProfile().click()
    welcomePage.getInstrumentLevelTCPApproval().click()
    cy.wait(4000)
    tcpPage.getinstrumentlevelTCP().within(function () {
      cy.fixture(filenameTCP).then((user) => {
        Tcpname = user.TcpProfileName
        cy.log(Tcpname)
        cy.get("td").eq(1)
        cy.get("a").contains(Tcpname).click({ force: true })
      })
    })
    tcpPage.getApproveTCP().click({ force: true })
  })
  Then('Verify Success Message', function () {
    cy.fixture(filenameTCP).then((user) => {
      Tcpname = user.TcpProfileName
      cy.log(Tcpname)
      tcpPage.getsucessmessage().should("contain", this.data5.confimationMessage.successfulTcpIntiation + Tcpname + this.data5.confimationMessage.successpart2)
    })
  })  
  And('Verify Add Intiation Message for Master', function () {
    cy.fixture(CustTCPdata).then((user) => {
      Tcpname1 = user.CustTCPProfileName
      cy.log(Tcpname1)
      tcpPage.getReqtoAddIntiationMaster().should("contain", this.data5.confimationMessage.sucessMasterTcpIntiation + Tcpname1 + this.data5.confimationMessage.successpart2Master)
      cy.wait(3000)
    })
  })  

  //---------------------------------------------Security Profile Creation -------------------------------
  //------------TC_109--------------------------Security Profile------------------------------------------------
//----------------------------------------Subscriber----------------------------------------------------

When('Navigate to Security and click to select security profile', function () {

    welcomePage.getSecurityLink().scrollIntoView()
    welcomePage.getSecurityLink().click({ force: true })
    welcomePage.getSecurityProfileLink().click({ force: true })
    securityProfilePage.getSecurityProfilePageTitle().should('have.text', this.data6.securityProfilePageTitle)
  })
  And('Click on add profile select user type as subscriber and fill the details', function () {
  
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectSubUserTypeTab().click({ force: true })
    securityProfilePage.getSelectSubUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(0).click({ force: true })
  })
  And('Fill the details-Subscriber Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
  
    cy.readFile(SubProfileName).then((data) => {
        data.subscriber = name
        cy.writeFile(SubProfileName, data)
      })  
  })
  And('Fill the details-PasswordRestrictios', function () {
    securityProfilePage.getMinPasswordLength().type(this.data6.minPasswordLength)
    securityProfilePage.getMaxPasswordLength().type(this.data6.maxPasswordLength)
    securityProfilePage.getCheckBox().contains(this.data6.checkBox1).click({ force: true })
    securityProfilePage.getCheckBox().contains(this.data6.checkBox2).click({ force: true })
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })
    securityProfilePage.getFailedPwdLoginCAPTCHA().type(this.data6.failedLoginCAPTCHA)
    securityProfilePage.getFailedPasswordAttempts().click({ force: true }).type(this.data6.failedPwdAttempts)
    securityProfilePage.getAllowedSplChar().type(this.data6.specialCharacters)
    securityProfilePage.getPasswordExpiry().type(this.data6.passwordExpiryDays)
    securityProfilePage.getLastNonRepeatingPWD().type(this.data6.lastNonRepeatingPassword)
    securityProfilePage.getCheckBox().contains(this.data6.resetForgetPassword).click({ force: true })
  
  })
  And('Fill the details-PinRestrictions', function () {
    securityProfilePage.getPIN().click({ force: true })
    securityProfilePage.getPinLength().type(this.data6.pinLength)
    securityProfilePage.getSequentialNumberCheckBox().click({ force: true })
    cy.wait(2000)
    securityProfilePage.getPinBlock().type(this.data6.failedAttemptsToBlock)
  
    cy.wait(2000)
    securityProfilePage.getFailedPinLoginCAPTCHA().type(this.data6.failedPin)
  
    securityProfilePage.getRepeatingNumberCheckBox().click({ force: true })
    securityProfilePage.getPinExpiry().type(this.data6.pinExpiry)
    securityProfilePage.getNonRepeatingLastPins().type(this.data6.lastNonRepeatingPin)
    securityProfilePage.getSelectAllorClearLink().click({ force: true })
  })
  And('Fill the details-AuthRestrictions', function () {
    securityProfilePage.getTwoFactorAuth().click({ force: true })
    securityProfilePage.getEverytime().click({ force: true })
  })
  And('Fill the details-loginRestrictions', function () {
    securityProfilePage.getLoginRestrictions().click({ force: true })
    securityProfilePage.getMultipleLoginsAllowedCount().type(this.data6.multipleLoginsAllowedCount)
    securityProfilePage.getSelectAllorClearLink().click({ force: true })
    securityProfilePage.getIpGroupRadioButton().click({ force: true })
    cy.wait(2000)
    securityProfilePage.getIpAddress().type(this.data6.getIpAddress)
    //securityProfilePage.getIpRangeTo().type(this.data6.getIpRangeTo)
    securityProfilePage.getCoolOffPeriod().type(this.data6.getCoolOffPeriod)
    securityProfilePage.getAutoLogoutTime().type(this.data6.getAutoLogoutTime)
    securityProfilePage.getAuthSystem().select(this.data6.authSystem)
    securityProfilePage.getNotifyOnDeviceChangeCheckBox().click({ force: true })
    securityProfilePage.getMinSecurityQuestionToResetCredentials().type(this.data6.minQuestions)
    securityProfilePage.getMaxSecurityQuestionToResetCredentials().type(this.data6.maxQuestions)
  })
    Then('Click on add and confirm',function () {
    securityProfilePage.getAddButton().click({ force: true })
    cy.wait(3000)
    securityProfilePage.getConfirmButton().click({ force: true })
    securityProfilePage.getSuccessMessage().should('have.text', this.data6.successMessage)
    securityProfilePage.getDoneButton().click({ force: true })
  })
  //--------------------------------Administrator -- BusinessAdmin-----------------------------------------------
  And('Fill the details-BusinessAdmin Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),  
    recurse(
    ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    //cy.writeFile(SubProfileName, { subscriber:cy.name})
    cy.readFile(SubProfileName).then((data) => {
      data.businesAadmin = name
      cy.writeFile(SubProfileName, data)
    })
    //cy.writeFile('cypress/fixtures/profileData/administratorProfile.json', { administrator: name })
  })
  And('Click on add profile select user type as BusinessAdmin and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectAdminUserTypeTab().click({ force: true })
    securityProfilePage.getSelectAdminUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(0).click({ force: true })
  })
  //--------------------------Administrator -- CustomercareAdmin----------------------------------------------
  And('Fill the details-CustomercareAdmin Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.CustomercareAdmin = name
      cy.writeFile(SubProfileName, data)
    })
    //cy.writeFile('cypress/fixtures/profileData/customercareAdminProfile.json', { customercareAdmin: name })
  })
  And('Click on add profile select user type as CustomercareAdmin and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectAdminUserTypeTab().click({ force: true })
    securityProfilePage.getSelectSubUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(1).click({ force: true })
  })
  //--------------------------------Business -- ATMMachine-----------------------------------------------------
  And('Fill the details-ATMMachine Profile Name', function () {
    
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.ATMMachine =name
      cy.writeFile(SubProfileName, data)
    })
    //cy.writeFile('cypress/fixtures/profileData/ATMMachineProfile.json', { ATMMachine: name })
  })
  And('Click on add profile select user type as ATMMachine and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
    securityProfilePage.getSelectBusinessUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(0).click({ force: true })
  })
  //-----------------------------Business -- HeadMerchant-----(Pin present)------------------------------------
  And('Fill the details-HeadMerchant Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.HeadMerchant =name
      cy.writeFile(SubProfileName, data)
    })
  })
  And('Click on add profile select user type as HeadMerchant and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
    securityProfilePage.getSelectBusinessUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(3).click({ force: true })
  })
  //------------------------------Business -- PaymentGateway-----------------------------------------------------
  And('Fill the details-PaymentGateway Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.PaymentGateway =name
      cy.writeFile(SubProfileName, data)
    })
  })
  And('Click on add profile select user type as PaymentGateway and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
    securityProfilePage.getSelectBusinessUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(6).click({ force: true })
  })
  //--------------------------------Business -- Biller-(PIN Present)----------------------------------------------
  And('Fill the details-Biller Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.Biller = name
      cy.writeFile(SubProfileName, data)
    })
  })
  And('Click on add profile select user type as Biller and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
    securityProfilePage.getSelectBusinessUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(9).click({ force: true })
  })
  //-----------------------------------Business -- Employee-(Pin Present)----------------------------------------
  And('Fill the details-Employee Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.Employee =name
      cy.writeFile(SubProfileName, data)
    })
  })
  And('Click on add profile select user type as Employee and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
    securityProfilePage.getSelectBusinessUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(1).click({ force: true })
  })
  //-----------------------------------Business -- Merchant-(Pin Present)-----------------------------------------
  And('Fill the details-Merchant Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.Merchant =name
      cy.writeFile(SubProfileName, data)
    })
  })
  And('Click on add profile select user type as Merchant and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
    securityProfilePage.getSelectBusinessUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(4).click({ force: true })
  })
  //-----------------------------------Business -- Agent - (Pin Present)-----------------------------------------
  And('Fill the details-Agent Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.Agent = name
      cy.writeFile(SubProfileName, data)
    })
  })
  And('Click on add profile select user type as Agent and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
    securityProfilePage.getSelectBusinessUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(7).click({ force: true })
  })
  //----------------------------------Business -- Distributer---(pin present)-------------------------------------
  And('Fill the details-Distributer Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.Distributer = name
      cy.writeFile(SubProfileName, data)
    })
  })
  And('Click on add profile select user type as Distributer and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
    securityProfilePage.getSelectBusinessUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(10).click({ force: true })
  })
  //-----------------------------------Business -- Corporate -- (Pin present)-------------------------------------
  And('Fill the details-Corporate Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=> securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.Corporate =name
      cy.writeFile(SubProfileName, data)
    })
  })
  And('Click on add profile select user type as Corporate and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
    securityProfilePage.getSelectBusinessUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(2).click({ force: true })
  })
  //------------------------------------Business -- TelcoOperator --(pin Present)--------------------------------
  And('Fill the details-TelcoOperator Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.TelcoOperator = name
      cy.writeFile(SubProfileName, data)
    })
  })
  And('Click on add profile select user type as TelcoOperator and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
    securityProfilePage.getSelectBusinessUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(5).click({ force: true })
  })
  //-------------------------------Business -- SuperAgent --(pin present)---------------------------------------
  And('Fill the details-SuperAgent Profile Name', function () {
    securityProfilePage.getEnterProfileName().type(getRandomName(), { force: true }),
    securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }),
    recurse(
      ()=>securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true }),
      ()=>securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true }), 
      ()=>cy.wait(200),   
      (uniqueness) => (uniqueness) == securityProfilePage.getProfileNameExist().contains
      ('Profile with same name already exists. Try another!').should('be.visible'),
      securityProfilePage.getCheckBox().contains(this.data6.checkBox3).click({ force: true })    
    )
    cy.readFile(SubProfileName).then((data) => {
      data.SuperAgent = name
      cy.writeFile(SubProfileName, data)
    })
  })
  And('Click on add profile select user type as SuperAgent and fill the details', function () {
    securityProfilePage.getAddProfile().click()
    securityProfilePage.getSelectBusinessUserTypeTab().click({ force: true })
    securityProfilePage.getSelectBusinessUserTypeTab().focused()
    securityProfilePage.getUserRole().eq(8).click({ force: true })
  })
  


  




//------------------------ Authorization Profile Management----------------------------------

//----------TC_149-----To verify that system admin should be able to add authorization profile------------------------------

When('Select Authorization profile and add profile', function () {

  authorizationProfilePage.getAuthorizationProfileManagement().scrollIntoView()
  authorizationProfilePage.getAuthorizationProfileManagement().click({ force: true })
  authorizationProfilePage.getAddProfile().click({ force: true })
})

And('select Subscriber user type and select user role', function () {
  // cy.wait(3000)
  authorizationProfilePage.getAuthorizationUserType().click({ force: true })
  authorizationProfilePage.getAuthorizationUserType().focused()
  authorizationProfilePage.getAuthorizationUserRole().click({ force: true })

})

Then('Fill all Details and Create Subscriber authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getProfileName().clear({force:true}).type(getRandomName(), { force: true }),
  authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({force:true}).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    ()=>authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  )
  cy.readFile(SubProfileName).then((data) => {
    data.SubscriberProfileName1 = name
    cy.writeFile(SubProfileName, data)
  })
  cy.selectModule().click({ force: true })
  cy.wait(3000)
  authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
 // authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})



//----------------------Approvals------------------------
Then('User approval for Authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getApprovals().scrollIntoView()
  authorizationProfilePage.getApprovals().click({ force: true })
  authorizationProfilePage.getApproveButton().click({ force: true })
  authorizationProfilePage.getApproveButtonSubmit().click({ force: true })
  //authorizationProfilePage.getApproveConfirmationMessage().should('contain.text'.this.data5.addconfirmationMessage)
})

//----------------------Administrator--------BusinessAdmin-----------------------------------
And('select BusinessAdmin user type and select user role', function () {
  //cy.wait(3000)
  authorizationProfilePage.getAdministratorType().click({ force: true })
  authorizationProfilePage.getAdministratorType().focused()
  authorizationProfilePage.getAdministratorBusinessAdmin().eq(0).click({ force: true })
})

Then('Fill all Details and Create BusinessAdmin authorization profile', function () {
  
  authorizationProfilePage.getProfileName().clear({force:true}).type(getRandomName(), { force: true }),
  authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({force:true}).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    ()=>authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })

  )
  cy.readFile(SubProfileName).then((data) => {
    data.businesAadmin1 = name
    cy.writeFile(SubProfileName, data)
  })
 // cy.wait(3000)
  cy.selectModule().click({ force: true })
  cy.wait(3000)
  authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
 // authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})
//----------------------Administrator--------CustomercareAdmin-----------------------------------
And('select CustomercareAdmin user type and select user role', function () {
  //cy.wait(3000)
  authorizationProfilePage.getAdministratorType().click({ force: true })
  authorizationProfilePage.getAdministratorType().focused()
  authorizationProfilePage.getAdministratorBusinessAdmin().eq(1).click({ force: true })
})

Then('Fill all Details and Create CustomercareAdmin authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getProfileName().clear({force:true}).type(getRandomName(), { force: true }),
  authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () =>authorizationProfilePage.getProfileName().clear({force:true}).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    ()=>authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })

  )
  cy.readFile(SubProfileName).then((data) => {
    data.CustomercareAdmin1 = name
    cy.writeFile(SubProfileName, data)
  })

  cy.selectModule().click({ force: true })
  cy.wait(3000)
  authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  //authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})
//----------------------Business-------------TelcoOperator---------------------------------------------------

And('select TelcoOperator user type and select user role', function () {
  // cy.wait(3000)
  authorizationProfilePage.getBusinessType().click({ force: true })
  authorizationProfilePage.getBusinessType().focused()
  authorizationProfilePage.getBusinessATMRole().eq(5).click({ force: true })

})

Then('Fill all Details and Create TelcoOperator authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getProfileName().clear({force:true}).type(getRandomName(), { force: true }),
  authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () => authorizationProfilePage.getProfileName().clear({force:true}).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    ()=>authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })

  )

  cy.readFile(SubProfileName).then((data) => {
    data.BusinesselcoOperator1 = name
    cy.writeFile(SubProfileName, data)
  })

  cy.selectModule().click({ force: true })
  cy.wait(3000)
  authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  //authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})

//----------------------Business-------------Agent---------------------------------------------------

And('select Agent user type and select user role', function () {
  // cy.wait(3000)
  authorizationProfilePage.getBusinessType().click({ force: true })
  authorizationProfilePage.getBusinessType().focused()
  authorizationProfilePage.getBusinessATMRole().eq(7).click({ force: true })

})

Then('Fill all Details and Create Agent authorization profile', function () {
  cy.wait(3000)
  authorizationProfilePage.getProfileName().clear({force:true}).type(getRandomName(), { force: true }),
  authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  recurse(
    () =>authorizationProfilePage.getProfileName().clear({force:true}).type(getRandomName(), { force: true }),
    () => cy.wait(2000),
    ()=>authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true }),
    () => cy.wait(2000),
    (uniqueness) => (uniqueness) == authorizationProfilePage.getProfileNameExist().contains
      ('Authorization profile name already exists,please try with different name').should('be.visible'),
    authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })

  )
  cy.readFile(SubProfileName).then((data) => {
    data.BusinessAgent1 = name
    cy.writeFile(SubProfileName, data)
  })
  cy.selectModule().click({ force: true })
  cy.wait(3000)
  authorizationProfilePage.getUserServicePreferences().contains('ALL').click({ force: true })
  authorizationProfilePage.getAdd().click({ force: true })
  authorizationProfilePage.getConfirm().click({ force: true })
  //authorizationProfilePage.getProfileSuccessMessage().should('contain.text', this.data5.authorizationprofilesuccess)
  authorizationProfilePage.getProfileDoneButton().click({ force: true })

})
//------------------------------  REGULATORY PROFILE--------------------------------------------

When('Navigate to UserManagement And Click on Regulatory Profile', function () {

    welcomePage.getUserManagementOption().scrollIntoView()
    welcomePage.getUserManagementOption().click()
    welcomePage.getregulatoryprofile().click()
    cy.wait(3000)
  })
  
  And('click on Add Regulatory Profile and Enter Profile Code and Profile Name', function () {
    cy.iframe().find('[id="profileCode"]').type(id)
    recurse(
      () => cy.iframe().find('[id="profileCode"]').clear().type(id),
      () => cy.iframe().find('.MuiButton-label').contains("Search").click({force: true}),
      (uniqueness) => (uniqueness) == cy.iframe().find('table > tbody').should('have.length', "1")
    )
    cy.log(id)
    RegulatoryProfile1.getaddregulatoryprofile().click(),
    RegulatoryProfile1.getregulatoryprofilecode().type(id,{force:true}),
    cy.RPRandomName(),
    RegulatoryProfile1.getregulatorysavebtn().click()
    cy.readFile(RegulatoryFile).then((data) => {
      data.RegulatoryProfileCode = id
      cy.writeFile(RegulatoryFile, data)

    })
  })
  
  Then('Click On Save Regulatory Profile', function () {
      RegulatoryProfile1.getrpsuccess().contains(this.data2.Sucess)
    cy.wait(3000)
  
  })

//------------------------------  MARKETING PROFILE--------------------------------------------

When('Navigate to UserManagement And Click on Marketing Profile', function () {

    welcomePage.getUserManagementOption().scrollIntoView()
    welcomePage.getUserManagementOption().click()
    welcomePage.getmarketingprofile().click()
    cy.wait(3000)
  })
  
  And('Add Marketing Profile', function () {
    cy.iframe().find('[id="profileCode"]').type(id)
    recurse(
      () => cy.iframe().find('[id="profileCode"]').clear().type(id),
      () => cy.iframe().find('.MuiButton-label').contains("Search").click({force: true}),
      (uniqueness) => (uniqueness) == cy.iframe().find('table > tbody').should('have.length', "1")
    )
    MarketingProfile1.getAddMarketingProfile().click()
    MarketingProfile1.getMarketingProfileCode().type(id, { force: true })
    cy.MPRandomName()
    MarketingProfile1.getMarketingProfileDomainName().click()
    MarketingProfile1.getMarketingProfileDomainName1().click()
    MarketingProfile1.getMarketingProfileCategoryName().click()
    MarketingProfile1.getMarketingProfileCategoryName1().click()
    MarketingProfile1.getMarketingProfileMFSProvider().click()
    MarketingProfile1.getMarketingProfileMFSProvider1().click()
    MarketingProfile1.getMarketingProfileWalletType().click()
    MarketingProfile1.getMarketingProfileWalletType1().click()
    MarketingProfile1.getMarketingProfileGrade().click()
    MarketingProfile1.getMarketingProfileGrade1().click()
    MarketingProfile1.getMarketingProfileInstrumentTCP().click()
    MarketingProfile1.getMarketingProfileInstrumentTCP1().click()
    MarketingProfile1.getMarketingProfileAddBtn().click()
    cy.wait(3000)
    cy.readFile(RegulatoryFile).then((data) => {
      data.MarketingProfileCode = id
      cy.writeFile(RegulatoryFile, data)
    })
    RegulatoryProfile1.getrpsuccess().contains(this.data2.Marketing)
  })
  
  