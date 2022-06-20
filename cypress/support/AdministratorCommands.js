import loginPage from '../support/pageObjects/loginPage';
import homePage from './pageObjects/homePage';
import register from './pageObjects/UserManagement/register';
import manageUsers from './pageObjects/UserManagement/manageUsers';
import 'cypress-file-upload';
import approvals from './pageObjects/UserManagement/approvals';
//-------------------------Object Declaration----------------------------------------------------------
const approvalPage = new approvals
const pageLogin = new loginPage()
const welcomePage = new homePage()
const registerPage = new register()
const manageUsersPage = new manageUsers()
let CCAMobile, BAMobile
var name
let MsgFile = 'cypress/fixtures/userData/AdministratorMsg.json'
var filename = 'cypress/fixtures/userData/AdministratorData.json'
function getRandomName() {
    name = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
        name += possible.charAt(Math.floor(Math.random() * possible.length));
    return name;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Cypress.Commands.add('getBArandomUserEmailID', () => {

    let num = Math.floor((Math.random() * 100))
    let userID = getRandomName().concat(getRandomName() + num)
    let emailId = userID.concat('@comviva.com')
    registerPage.getLoginID().type(userID, { force: true })
    cy.readFile(filename).then((data) => {
        data.BALoginID = userID
        cy.writeFile(filename, data)
    })
    registerPage.getEmailID().type(emailId, { force: true })
    cy.readFile(filename).then((data) => {
        data.BAEmailID = emailId
        cy.writeFile(filename, data)
    })
})

Cypress.Commands.add('getCCArandomUserEmailID', () => {

    let num = Math.floor((Math.random() * 100))
    let userID = getRandomName().concat(getRandomName() + num)
    let emailId = userID.concat('@comviva.com')
    registerPage.getLoginID().type(userID, { force: true })
    cy.readFile(filename).then((data) => {
        data.LoginID = userID
        cy.writeFile(filename, data)
    })
    registerPage.getEmailID().type(emailId, { force: true })
    cy.readFile(filename).then((data) => {
        data.EmailID = emailId
        cy.writeFile(filename, data)
    })
})


Cypress.Commands.add('getreason', () => {
    manageUsersPage.getReason1()
        .then(listing => {
            const randomNumber = getRandomInt(0, listing.length - 1);
            manageUsersPage.getReason1().eq(randomNumber).then(($select) => {
                const text = $select.index()
                cy.wait(5000)
                manageUsersPage.getReason().select(text, { force: true })
            });
        })
})


Cypress.Commands.add('getBAMobileNumber', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.readFile(filename).then((user) => {
        BAMobile = user.BAMobileNumber
        manageUsersPage.getSearchUser().type(BAMobile, { force: true })
    })
})

Cypress.Commands.add('getUpdatedBAMobileNumber', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.readFile(filename).then((user) => {
        BAMobile = user.updatedBAMobileNumber
        manageUsersPage.getSearchUser().type(BAMobile, { force: true })
    })
})

Cypress.Commands.add('getCCAMobileNumber', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.readFile(filename).then((user) => {
        CCAMobile = user.CCAMobileNumber
        manageUsersPage.getSearchUser().type(CCAMobile, { force: true })
    })
})

Cypress.Commands.add('getUpdatedCCAMobileNumber', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
        cy.fixture(filename).then((user) => {
        BAMobile = user.updatedCCAMobileNumber
        manageUsersPage.getSearchUser().type(BAMobile, { force: true })
    })
})

Cypress.Commands.add('getCCAEmailID', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.readFile(filename).then((user) => {
        CCAMobile = user.EmailID
        manageUsersPage.getSearchUser().type(CCAMobile, { force: true })
    })
})

Cypress.Commands.add('getCCALoginID', () => {
    pageLogin.getiFrame()
    manageUsersPage.getSearchUser().click({ force: true })
    cy.readFile(filename).then((user) => {
        CCAMobile = user.LoginID
        manageUsersPage.getSearchUser().type(CCAMobile, { force: true })
    })
})



Cypress.Commands.add('getMessage', () => {
    cy.intercept('http://ec2-35-161-219-222.us-west-2.compute.amazonaws.com/mobiquitypay/serviceRequest/resume/any').as('getmessage')
    approvalPage.getApproveButton().click({ force: true })
    approvalPage.getApproveRequest().click({ force: true })
    cy.wait(2000)
    //  cy.iframe().find('[id="generate-otp-icon"]').eq(0).click()
    cy.wait('@getmessage').then((interception) => {
        let response = interception.response.body
        const resValues = Object.values(response)
        let serviceRequestID = resValues[0]
        cy.log(serviceRequestID)
        let url1 = 'http://ec2-35-161-219-222.us-west-2.compute.amazonaws.com/notify/internal/getByMessageIdOrExternalIdAndByToWhom?messageId='
        let url2 = url1.concat(serviceRequestID)
        let url3 = url2.concat('&toWhom=')

        cy.readFile(filename).then((usermobile) => {
            BAMobile = usermobile.BAMobileNumber
            cy.log(BAMobile)
        })
        let getURL = url3.concat('971' + BAMobile)
        cy.request({
            url: getURL,
            headers: {
                'Authorization': 'Basic YWRtaW46c2VjcmV0',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            let res1 = res.body
                cy.writeFile(MsgFile,{ModifyMessage:res1 })
            
        })
    })
})
