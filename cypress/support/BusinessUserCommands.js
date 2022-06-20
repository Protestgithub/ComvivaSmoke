
import loginPage from '../support/pageObjects/loginPage';

import homePage from './pageObjects/homePage';

import register from './pageObjects/UserManagement/register';

//import DateUtils from './Utility/DateUtils';

import manageUsers from './pageObjects/UserManagement/manageUsers';
import 'cypress-file-upload';
import API from './pageObjects/API';

// ################Object Declaration##############################
const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const manageUsersPage = new manageUsers()
const APIPage = new API()
var name


let BsnuserMobile
let BusinessKyc
let BusinessLoginid
let BusinessEmail
var name,SubMobile




function getRandomName() {

    name = "";

    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++)

        name += possible.charAt(Math.floor(Math.random() * possible.length));

    return name;

}



Cypress.Commands.add('getBusinessrandomUserEmailID1', () => {
    let num = Math.floor((Math.random() * 100))
    let userID = getRandomName().concat(getRandomName() + num)
    let emailId = userID.concat('@comviva.com')
    registerPage.getLoginID().type(userID, { force: true })
    cy.readFile('cypress/fixtures/userData/BusinessUserSuspensionData.json').then((data) => {
        data.LoginId = userID
        cy.writeFile('cypress/fixtures/userData/BusinessUserSuspensionData.json', data)
    })   //registeredKycValue: KycValue
    registerPage.getEmailID().type(emailId, { force: true })
    cy.readFile('cypress/fixtures/userData/BusinessUserSuspensionData.json').then((data) => {
        data.EmailID = emailId
        cy.writeFile('cypress/fixtures/userData/BusinessUserSuspensionData.json', data)
    })
    
})


Cypress.Commands.add('getBusinessUserEmailID', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.fixture('userData/BusinessUsersData.json').then((user) => {
        BusinessEmail = user.EmailID
        manageUsersPage.getSearchUser().type(BusinessEmail, { force: true })
    })
})



Cypress.Commands.add('getBusinessUserLoginID', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
        let BusinessLoginid = data.LoginId
        manageUsersPage.getSearchUser().type(BusinessLoginid, { force: true })
    })
})
Cypress.Commands.add('getBusinessUserLoginIDSuspension', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.readFile('cypress/fixtures/userData/BusinessUserSuspensionData.json').then((data) => {
        let BusinessLoginid = data.LoginId
        manageUsersPage.getSearchUser().type(BusinessLoginid, { force: true })
    })
})
Cypress.Commands.add('getBusinessUserKycID', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.fixture('userData/BusinessUsersData.json').then((user) => {
        let BusinessKyc = user.RegisteredKyc
        manageUsersPage.getSearchUser().type(BusinessKyc, { force: true })
    })
})



Cypress.Commands.add('getBusinessUserMobileNumber', () => {

    pageLogin.getiFrame()
    manageUsersPage.getUserSearchDetails().click({ force: true })
    cy.fixture('userData/BusinessUsersData.json').then((usermobile) => {
        BsnuserMobile = usermobile.registeredMobile
        cy.log(BsnuserMobile)
        manageUsersPage.getUserSearchDetails().type(BsnuserMobile, { force: true })


    })
})




Cypress.Commands.add('getBusinessrandomUserEmailID', () => {
    let num = Math.floor((Math.random() * 100))
    let userID = getRandomName().concat(getRandomName() + num)
    let emailId = userID.concat('@comviva.com')
    registerPage.getLoginID().type(userID, { force: true })
    cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
        data.LoginId = userID
        cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json', data)
    })   //registeredKycValue: KycValue
    registerPage.getEmailID().type(emailId, { force: true })
    cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data) => {
        data.EmailID = emailId
        cy.writeFile('cypress/fixtures/userData/BusinessUsersData.json', data)
    })
    
})


Cypress.Commands.add('getBusinessUserEmailID', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.fixture('userData/BusinessUsersData.json').then((user) => {
        BusinessEmail = user.EmailID
        manageUsersPage.getSearchUser().type(BusinessEmail, { force: true })
    })
})
Cypress.Commands.add('getBusinessUserLoginID', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.fixture('userData/BusinessUsersData.json').then((user) => {
        BusinessLoginid = user.LoginId
        manageUsersPage.getSearchUser().type(BusinessLoginid, { force: true })
    })
})

Cypress.Commands.add('getBusinessUserKycID', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.fixture('userData/BusinessUsersData.json').then((user) => {
        BusinessKyc = user.registeredKyc
        manageUsersPage.getSearchUser().type(BusinessKyc, { force: true })
    })
})



Cypress.Commands.add('getSubscriberMobileNumber', () => {
	cy.fixture('userData/subscriberReg.json').then((usermobile) => {
		SubMobile = usermobile.subscriberMobile
		cy.log(SubMobile)
		manageUsersPage.getUserSearchDetails().type(SubMobile, { force: true })
		manageUsersPage.getSearchUserButton().click({ force: true })
	})
})