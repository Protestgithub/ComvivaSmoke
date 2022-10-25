

import 'cypress-file-upload';
import SecurityProfilePage from '../pageObjects/SecurityProfile/SecurityProfilePage';
import loginPage from '../pageObjects/loginPage';
import homePage from '../pageObjects/homePage';
import register from '../pageObjects/UserManagement/register';
import manageUsers from '../pageObjects/UserManagement/manageUsers';
import API from '../pageObjects/API';

//-------------------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const manageUsersPage = new manageUsers()
const securityProfilePage = new SecurityProfilePage()
//var dateUtils = new DateUtils()
const APIPage = new API()
let SubMobile
let usermobile
var name

//------------

Cypress.Commands.add('getSecurityProfileName', () => {
    //manageUsersPage.getUserSearchDetails().click({ force: true })
    cy.fixture('profileData/securityProfile.json').then((userProfileName) => {
        SubSecurityProfileName = userProfileName.subscriber
        cy.log(SubSecurityProfileName)
        registerPage.getSecurityProfile().select(SubSecurityProfileName, { force: true })
    })
})


Cypress.Commands.add('randomProfileName', () => {
    securityProfilePage.getEnterProfileName().clear().type(getRandomName(), { force: true })
    function getRandomName() {
        name = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }
})



