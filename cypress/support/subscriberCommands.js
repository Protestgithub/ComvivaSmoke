import loginPage from '../support/pageObjects/loginPage';
import homePage from './pageObjects/homePage';

import register from './pageObjects/UserManagement/register';

//import DateUtils from './Utility/DateUtils';

import manageUsers from './pageObjects/UserManagement/manageUsers';

import 'cypress-file-upload';

import API from './pageObjects/API';



//-------------------------Object Declaration----------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const manageUsersPage = new manageUsers()
const APIPage = new API()
var name,SubMobile
var subRegistration = 'cypress/fixtures/userData/subscriberReg.json'

function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

Cypress.Commands.add('getSubscriberMobileNumber', () => {
    manageUsersPage.getUserSearchDetails().click({ force: true })
    cy.fixture('userData/subscriberReg.json').then((usermobile) => {
        SubMobile = usermobile.subscriberMobile
        cy.log(SubMobile)
        manageUsersPage.getUserSearchDetails().type(SubMobile, { force: true })
    })
})

Cypress.Commands.add('getSubscriberMobileNumberSuspension', () => {
    manageUsersPage.getUserSearchDetails().click({ force: true })
    cy.fixture('userData/subscriberReg.json').then((usermobile) => {
        SubMobile = usermobile.subscriberMobileSuspend
        cy.log(SubMobile)
        manageUsersPage.getUserSearchDetails().type(SubMobile, { force: true })
    })
})
Cypress.Commands.add('getSecurityProfileName', () => {
    //manageUsersPage.getUserSearchDetails().click({ force: true })
    cy.fixture('profileData/securityProfile.json').then((userProfileName) => {
        SubSecurityProfileName = userProfileName.subscriber
        cy.log(SubSecurityProfileName)
        registerPage.getSecurityProfile().select(SubSecurityProfileName, { force: true })
    })
})


function getRandomInt(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}
Cypress.Commands.add('Country', () => {

    cy.frameLoaded(pageLogin.getiFrame())

    registerPage.getCountry() // we get the select/option by finding the select by id

        .then(listing => {

            const randomNumber = getRandomInt(0, listing.length - 1); //generate a rendom number between 0 and length-1. In this case 0,1,2

            registerPage.getCountry().eq(randomNumber).then(($select) => {              //choose an option randomly

                const text = $select.text()       //get the option's text. For ex. "A"

                registerPage.getCountry().select(text)       // select the option on UI

            });

        })

})
Cypress.Commands.add('RandomName', () => {
    registerPage.getFirstName().clear().type(getRandomName(), { force: true })
    function getRandomName() {
        name = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }


})
Cypress.Commands.add('SubRandomName', () => {
    registerPage.getFirstName().clear().type(getRandomName(), { force: true })
    function getRandomName() {
        name = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; i < 5; i++)
            name += possible.charAt(Math.floor(Math.random() * possible.length));
        return name;
    }


})

var SubMobile
Cypress.Commands.add('getSubscriberMobNum', () => {
	pageLogin.getiFrame()
	cy.fixture('userData/subscriberReg.json').then((usermobile) => {
		SubMobile = usermobile.subscriberMobile
		cy.log(SubMobile)
		manageUsersPage.getUserSearchDetails().type(SubMobile, { force: true })
		manageUsersPage.getSearchUserButton().click({ force: true })
	})
})




// Cypress.Commands.add('getAdminSecurityProfileName',() => {
//     let num = Math.floor((Math.random() * 100))
//     let userID = getRandomName().concat(getRandomName() + num)
//     let emailId = userID.concat('@yopmail.com')
//     registerPage.getLoginID().type(userID, {force:true})
//     cy.writeFile('cypress/fixtures/userData/CCAModifydata.json', {LoginID : userID})
//     registerPage.getEmailID().type(emailId, {force: true})
//     cy.readFile('cypress/fixtures/userData/CCAModifydata.json').then((data) => {
//     data.EmailID = emailId
//     cy.writeFile('cypress/fixtures/userData/CCAModifydata.json', data)
//     })
//     })

