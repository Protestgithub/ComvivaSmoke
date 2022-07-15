/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';
import "../../../../support/commands";
import "../../../../support/subscriberCommands";
import "../../../../support/BusinessUserCommands";
import register from '../../../../support/pageObjects/UserManagement/register';
import approvals from '../../../../support/pageObjects/UserManagement/approvals';
import manageUsers from '../../../../support/pageObjects/UserManagement/manageUsers';
import { recurse } from 'cypress-recurse';

//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const approvalPage = new approvals()
const manageUsersPage = new manageUsers()
const uuid = () => Cypress._.random(1e8)
const SubMob='userData/subscriberReg.json'

mobile = "77" + uuid()
var mobile
var loginId
var KycValue
var name
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
    if ( Cypress.browser.isHeadless ) {
    cy.clearCookie('shouldStop')
  } else {
    cy.getCookie('shouldStop').then(cookie => {
      if (
        cookie &&
        typeof cookie === 'object' &&
        cookie.value === 'true'
      ) {
        Cypress.runner.stop();
      }
    })
  }
});
//----------------Test Scripts---------------------------------------------------------------------------

//--------------------------User Management--------------------------------------------------------------

//---------------------------------------------System Admin Login----------------------------------------------------
Given('Login into Mobiquity Portal as System admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Checker1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as System admin Maker after Logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
    cy.wait(2000)
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
Given('Login into Mobiquity Portal as another System admin Checker1 after logout', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(2000)
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)

})

Then('Logout', function(){
  welcomePage.getUserMenu().click()
  welcomePage.getLogoutButton().click()
  welcomePage.getLogoutYesButton().click()  
})
//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.superadminm.superadminmaker)
})

//DIST7779064594
Given('Login into Mobiquity Portal as Business admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.launchURL(Cypress.env('Adminurl')) + 'Business/'
  cy.wait(8000)
  cy.login(this.data1.businessAdmin.businessadminUser1, this.data1.businessAdmin.businessadminPwd1)
  cy.wait(10000)
  cy.checkWelcomeText(this.data2.business.distributerUser)
})

Given('Login into Mobiquity Portal as Business admin User1', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.wait(8000)
  cy.readFile('cypress/fixtures/userData/AdministratorData.json').then((data)=>{
    var BALogin
    BALogin = data.BALoginID
    cy.login(BALogin, this.data1.BAPassword)
  })
    cy.checkWelcomeText(this.data1.BAAdminText)

})



//----------TC_129-------To verify that Admin user can view all the transaction details under Order details menu------------


When('Click on user management and Manage users', function () {

  manageUsersPage.getUsermanagement().scrollIntoView()
  manageUsersPage.getUsermanagement().click()
  manageUsersPage.getManageUsers().click()
})

And('Enter Mobile numberin search Menu', function () {
  cy.wait(3000)
  cy.getSubscriberMobNum()
})

And('Click on view Details', function () {
  cy.wait(3000)
  manageUsersPage.getViewAllDetailsButton().click({ force: true })
})

Then('Click on order details', function () {

  manageUsersPage.getOrderDetailsButton().click({ force: true })
  cy.wait(3000)
  manageUsersPage.getOrderDetailsMessage().should('have.text', ' Manage Users  > View Details')
})

//----------TC_130-------To verify that Admin user can check all the Order Details of a customer/ business users successfully------------


When('Click on user management and Manage users', function () {

  manageUsersPage.getUsermanagement().scrollIntoView()
  manageUsersPage.getUsermanagement().click()
  manageUsersPage.getManageUsers().click()
})


And('Enter Mobile number and KYC number in search menu for customer/ business users', function () {
  cy.wait(3000)

 cy.getBusinessUserMobNum()
  manageUsersPage.getBusinessUserDetail().should('have.text', ' Business')
})

And('Click on view Details', function () {
  cy.wait(3000)
  manageUsersPage.getViewAllDetailsButton().click({ force: true })
})

Then('Click on order details for customer/ business users', function () {
  cy.wait(3000)
  manageUsersPage.getOrderDetailsButton().click({ force: true })
  manageUsersPage.getOrderDetailsMessage().should('have.text', ' Manage Users  > View Details')
})

// //---------TC_131------To verify that latest order transactions will be displayed on the first page of Order details screen.------------

Then('Click on order details for latest order transactions', function () {
  cy.wait(3000)
  manageUsersPage.getOrderDetailsButton().click({ force: true })
  manageUsersPage.getWalletExpandButton().click({ force: true })
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  manageUsersPage.getLatestTrasanction().should('have.text', '1')
})


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

Then('Click on view Details for wallet transactions with id', function () {
  cy.wait(3000)
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  //  cy.get('.modal-content').should('have.text', 'Transaction ID')
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

Then('Click on view Details for transaction', function () {
  cy.wait(3000)
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })

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

Then('Click on view Details based on the Date range', function () {
  cy.wait(3000)
  manageUsersPage.getViewMoreDetailsButton().click({ force: true })
  manageUsersPage.getDateRangeAssert().should('contain.text', 'More Details')
})