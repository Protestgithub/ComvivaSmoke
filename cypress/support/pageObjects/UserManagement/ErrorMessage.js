
class ErrorMessage {
    getSystemAdminOption() {
        return cy.iframe().find('mat-radio-button[id="role-System Admin"]')
    }
    getSingleUser() {
        return cy.iframe().find('#Group_8476')
    }
    getTitle() {
        return cy.iframe().find('select[id="title"]')
    }
    getFirstName() {
        return cy.iframe().find('input[id="firstName"]')
    }
    getLastName() {
        return cy.iframe().find('input[id="lastName"]')
    }
    getPrefferedLanguage() {
        return cy.iframe().find('select[id="preferredLanguage"]')
    }
    getLoginID() {
        return cy.iframe().find('input[id="loginId"]')
    }
    getEmailiD() {
        return cy.iframe().find('input[id="emailId"]')
    }
    getContactNo() {
        return cy.iframe().find('input[id="mobileNumber"]')
    }
    getCountry() {
        return cy.iframe().find('select[id="country"]')
    }
    getLoginIdErrorMessage() {
        return cy.iframe().find('div div .text-danger')
    }
    getEmailIDErrorMessage() {
        return cy.iframe().find('div div .text-danger')
    }
    getinvalidemailidErrorMessage() {
        return cy.iframe().find('div div small[class = "text-danger ng-star-inserted"]')
    }
    getinvalidlname() {
        return cy.iframe().find('div div small[class = "text-danger ng-star-inserted"]')
    }
}

export default ErrorMessage

